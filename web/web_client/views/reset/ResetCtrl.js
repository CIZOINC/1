/*global angular*/
angular
    .module('app.controls')
    .controller('ResetCtrl', ResetCtrl);

/* @ngInject */
function ResetCtrl($scope, $rootScope, $state, userServ, playerServ) {
    "use strict";


    $scope = angular.extend($scope, {
        email: '',
        message: {
            title: '123',
            description: 'this is it',
            isVisible: false,
            callback: function () {

            }
        },
        closeView: closeView,
        resetPassword: resetPassword
    });

    function closeView() {
        $state.go($rootScope.wentFrom, $rootScope.wentFromParams);
    }

    function resetPassword() {
        if ($scope.email.length) {
            userServ.resetPassword($scope.hostName, $scope.email)
                .then(() => {
                    playerServ.showMessage($scope, 'Success', 'Check your email to reset password', () => {
                        //$state.go('home');
                    });
                })
                .catch((response) => {
                    let errors = _.map(response.data.errors, (error) => {
                        return error.message;
                    });
                    playerServ.showMessage($scope, 'Error', errors.join(', '));
                })
        } else {
            playerServ.showMessage($scope, 'Error', 'Please enter your email');
        }
    }
}

ResetCtrl.$inject = ['$scope', '$rootScope', '$state', 'userServ', 'playerServ'];