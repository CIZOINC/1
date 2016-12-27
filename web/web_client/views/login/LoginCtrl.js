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
        $rootScope.goBack();
    }

    function registerOpen() {
        $state.go('register');
    }

    function resetPassword() {
        $state.go('reset');
    }
}

LoginCtrl.$inject = ['$scope', '$rootScope', '$state'];