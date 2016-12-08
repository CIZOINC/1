/*global angular*/
angular
    .module('app.controls')
    .controller('LoginCtrl', LoginCtrl);

/* @ngInject */
function LoginCtrl($scope, $rootScope, $state) {
    "use strict";


    $scope = angular.extend($scope, {
        loginClose: loginClose,
        registerOpen: registerOpen,
        resetPassword: resetPassword
    });

    function loginClose() {
        if ($rootScope.wentFrom && $rootScope.wentFrom.name) {
            $state.go($rootScope.wentFrom, $rootScope.wentFromParams);
            $rootScope.wentFrom = undefined;
            $rootScope.wentFromParams = undefined;
        } else {
            $state.go('home');
        }
    }

    function registerOpen() {
        $state.go('register');
    }

    function resetPassword() {
        $state.go('reset');
    }
}

LoginCtrl.$inject = ['$scope', '$rootScope', '$state'];