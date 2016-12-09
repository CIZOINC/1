/*global angular*/
angular
    .module('app.directives')
    .directive('loginForm', loginForm);

/* @ngInject */
function loginForm($rootScope, $state, userServ, storageServ, playerServ) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/login-form/login-form.html',
        link: linkFn,
        transclude: false,
        scope: {
            hostName: '@',
            storage: '=',
            onLoginClose: '&',
            onRegisterOpen: '&',
            onResetPassword: '&'
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {
            login: {
                email: '',
                password: ''
            },
            message: {
                title: '',
                description: '',
                isVisible: false,
                callback: function () {

                }
            },

            processLogin: processLogin,
            facebookLogin: facebookLogin,
            registerClick: registerClick,
            resetPasswordClick: resetPasswordClick,
            closeView: closeView,
            changeFocusOnEnter: changeFocusOnEnter,
            loginOnEnter: loginOnEnter

        });

        function loginClose() {
            if (scope.onLoginClose) {
                scope.onLoginClose();
            }
        }

        function registerOpen() {
            if (scope.onRegisterOpen) {
                scope.onRegisterOpen();
            }
        }

        function resetPassword() {
            if (scope.onResetPassword) {
                scope.onResetPassword();
            }
        }

        function processLogin() {
            userServ.login(scope.hostName, {
                login: scope.login.email,
                password: scope.login.password
            }).then((response) => {
                userServ.storeAuthToken(scope.storage, response.data);
                userServ.refreshStoragesFromNetwork(scope.hostName, scope.storage, response.data);
                loginClose();
            })
                .catch((response) => {
                    let errors = _.map(response.data.errors, (error) => {
                        return error.message;
                    });
                    playerServ.showMessage(scope, 'Error', errors.join(', '));
                });
        }

        function facebookLogin() {
            userServ.facebookAuth(scope.hostName)
                .then((response) => {
                    userServ.storeAuthToken(scope.storage, response);
                    userServ.refreshStoragesFromNetwork(scope.hostName, scope.storage);
                    loginClose();
                })
                .catch(() => {
                    playerServ.showMessage(scope, 'Error', 'Please try to register via Facebook later');
                });
        }

        function registerClick() {
            registerOpen();
        }

        function resetPasswordClick() {
            resetPassword();
        }

        function closeView() {
            loginClose();
        }

        function changeFocusOnEnter(event) {
            if (event && event.keyCode === 13) {
                let passInput = document.querySelector('.login-form_input--pass');
                if (passInput) {
                    passInput.focus();
                }
            }
        }

        function loginOnEnter(event) {
            if (event && event.keyCode === 13) {
                processLogin();
            }
        }
    }
}

loginForm.$inject = ['$rootScope', '$state', 'userServ', 'storageServ', 'playerServ'];
