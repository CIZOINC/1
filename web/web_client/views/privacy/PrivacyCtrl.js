/*global angular*/
angular
    .module('app.controls')
    .controller('PrivacyCtrl', PrivacyCtrl);

/* @ngInject */
function PrivacyCtrl($scope, $state, $rootScope) {
    "use strict";

    $scope = angular.extend($scope, {
        closeView: closeView
    });

    function closeView() {
        $rootScope.goBack();
    }
}

PrivacyCtrl.$inject = ['$scope', '$state', '$rootScope'];