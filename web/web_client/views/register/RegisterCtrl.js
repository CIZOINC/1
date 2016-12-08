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
        if ($rootScope.wentFrom && $rootScope.wentFrom.name) {
            $state.go($rootScope.wentFrom, $rootScope.wentFromParams);
            $rootScope.wentFrom = undefined;
            $rootScope.wentFromParams = undefined;
        } else {
            $state.go('home');
        }
    }

    function loginOpen() {
        $state.go('login')
    }
}

RegisterCtrl.$inject = ['$scope', '$state', '$rootScope'];