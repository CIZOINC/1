/*global angular*/
angular
    .module('app.controls')
    .controller('ResetCtrl', ResetCtrl);

/* @ngInject */
function ResetCtrl($scope, $state, userServ) {
    "use strict";


    $scope = angular.extend($scope, {
        email: '',
        closeView: closeView,
        resetPassword: resetPassword
    });

    function closeView() {
        $state.go('home');
    }

    function resetPassword() {
        if ($scope.email.length) {
            userServ.resetPassword($scope.hostName, $scope.email)
                .then(() => {
                    $state.go('home');
                })
        }
    }
}

ResetCtrl.$inject = ['$scope', '$state', 'userServ'];