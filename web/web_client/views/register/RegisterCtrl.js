/*global angular*/
angular
    .module('app.controls')
    .controller('RegisterCtrl', RegisterCtrl);

/* @ngInject */
function RegisterCtrl($scope, $state, $rootScope) {
    "use strict";

    $scope = angular.extend($scope, {
        registerClose: registerClose,
        loginOpen: loginOpen
    });

    function registerClose() {
        $rootScope.goBack();
    }

    function loginOpen() {
        $state.go('login')
    }
}

RegisterCtrl.$inject = ['$scope', '$state', '$rootScope'];