/*global angular*/
angular
    .module('app.directives')
    .directive('registerForm', registerForm);

/* @ngInject */
function registerForm($rootScope, userServ, moment, playerServ, _) {
    "use strict";

    const months = [
        { 'key': 0, 'name': 'January'},
        { 'key': 1, 'name': 'February'},
        { 'key': 2, 'name': 'March'},
        { 'key': 3, 'name': 'April'},
        { 'key': 4, 'name': 'May'},
        { 'key': 5, 'name': 'June'},
        { 'key': 6, 'name': 'July'},
        { 'key': 7, 'name': 'August'},
        { 'key': 8, 'name': 'September'},
        { 'key': 9, 'name': 'October'},
        { 'key': 10, 'name': 'November'},
        { 'key': 11, 'name': 'December'}
    ];


    return {
        restrict: 'E',
        templateUrl: 'components/register-form/register-form.html',
        link: linkFn,
        transclude: false,
        scope: {
            hostName: '@',
            storage: '=',
            onRegisterClose: '&',
            onLoginOpen: '&'
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {
            register: {
                email: '',
                password: '',
                month: { 'key': 0, 'name': 'January'},
                day: '',
                year: ''
            },
            months: months,

            registerUser: registerUser,
            facebookRegister: facebookRegister,
            closeView: closeView,
            loginClick: loginClick,
            message: {
                title: '123',
                description: 'this is it',
                isVisible: false,
                callback: function () {

                }
            }
        });

        function loginOpen() {
            if (scope.onLoginOpen) {
                scope.onLoginOpen();
            }
        }

        function registerClose() {
            if (scope.onRegisterClose) {
                scope.onRegisterClose();
            }
        }

        function registerUser() {
            let birthday = moment({
                year: scope.register.year,
                month: scope.register.month.key,
                day: scope.register.day
            });

            if (birthday.isValid()) {
                userServ.registerUser(scope.hostName, {
                    email: scope.register.email,
                    password: scope.register.password,
                    password_confirmation: scope.register.password,
                    birthday: birthday.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
                })
                    .then( (response) => {
                        if (response.status === 200) {
                            playerServ.showMessage(scope, 'Success', 'You\'re successfully registered. Please enter your credentials in login screen.', () => {
                                loginOpen();
                            })
                        }
                    })
                    .catch((response) => {
                        let errors = _.map(response.data.errors, (error) => {
                            return error.message;
                        });
                        playerServ.showMessage(scope, 'Error', errors.join(', '));
                    });
            } else {
                playerServ.showMessage(scope, 'Error', 'Please enter correct date');
            }
        }

        function facebookRegister() {
            userServ.facebookAuth(scope.hostName)
                .then((response) => {
                    userServ.storeAuthToken(scope.storage, response);
                    userServ.refreshStoragesFromNetwork(scope.hostName, scope.storage);
                    registerClose();
                })
                .catch(() => {
                    playerServ.showMessage(scope, 'Error', 'Please try to register via Facebook later');
                });
        }

        function loginClick() {
            loginOpen();
        }

        function closeView() {
            registerClose();
        }


    }
}
registerForm.$inject = ['$rootScope', 'userServ', 'moment', 'playerServ', 'lodash'];
