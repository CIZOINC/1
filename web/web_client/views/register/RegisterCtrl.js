/*global angular*/
angular
    .module('app.controls')
    .controller('RegisterCtrl', RegisterCtrl);

/* @ngInject */
function RegisterCtrl($scope, $log, $state, userServ, moment, playerServ) {
    "use strict";

    let months = [
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

    $scope = angular.extend($scope, {
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

    function registerUser() {
        let birthday = moment({
            year: $scope.register.year,
            month: $scope.register.month.key + 1,
            day: $scope.register.day
        });

        if (birthday.isValid()) {
            userServ.registerUser($scope.hostName, {
                email: $scope.register.email,
                password: $scope.register.password,
                password_confirmation: $scope.register.password,
                birthday: birthday.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
            })
                .then( (response) => {
                    if (response.status === 200) {
                        showMessage($scope, 'Success', 'You\'re successfully registered. Please enter your credentials in login screen.', () => {
                            $state.go('home');
                        })
                    }
                })
                .catch((response) => {
                    let errors = _.map(response.data.errors, (error) => {
                        return error.message;
                    });
                    playerServ.showMessage($scope, 'Error', errors.join(', '));
                });
        } else {
            showMessage($scope, 'Error', 'Please enter correct date');
        }
    }

    function facebookRegister() {
        userServ.facebookAuth($scope.hostName);
    }

    function loginClick() {
        $state.go('login');
    }

    function closeView() {
        $state.go('home');
    }

}

RegisterCtrl.$inject = ['$scope', '$log', '$state', 'userServ', 'moment', 'playerServ'];