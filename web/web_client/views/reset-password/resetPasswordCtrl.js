/*global angular*/
angular
    .module('app.controls')
    .controller('resetPasswordCtrl', resetPasswordCtrl);

/* @ngInject */
function resetPasswordCtrl($scope, $state, userServ, $stateParams) {
    "use strict";


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
                })
        }
    }
}

resetPasswordCtrl.$inject = ['$scope', '$state', 'userServ', '$stateParams'];