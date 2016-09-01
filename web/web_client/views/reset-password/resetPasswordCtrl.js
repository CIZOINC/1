/*global angular*/
angular
    .module('app.controls')
    .controller('resetPasswordCtrl', resetPasswordCtrl);

/* @ngInject */
function resetPasswordCtrl($scope, $state, userServ, playerServ, $stateParams) {
    "use strict";

    $scope.message = {
        title: '',
        description: '',
        isVisible: false,
        callback: function () {

        }
    };

    $scope = angular.extend($scope, {
        password: '',
        repeatPassword: '',
        updatePassword: updatePassword
    });

    function updatePassword() {
        if ($scope.password === $scope.repeatPassword && $stateParams.resetToken) {
            userServ.updatePassword($scope.hostName, $scope.password, $stateParams.resetToken)
                .then(() => {
                    $state.go('home');
                }, (response) => {
                    let errors = _.map(response.data.errors, (error) => {
                        return error.message;
                    });
                    playerServ.showMessage($scope, 'Error', errors.join(', '));
                })
        }
    }
}

resetPasswordCtrl.$inject = ['$scope', '$state', 'userServ', 'playerServ', '$stateParams'];