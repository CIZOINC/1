/*global angular*/
angular
    .module('app.controls')
    .controller('PrivacyCtrl', PrivacyCtrl);

/* @ngInject */
function PrivacyCtrl($scope, $state) {
    "use strict";

    $scope = angular.extend($scope, {
        closeView: closeView
    });

    function closeView() {
        $state.go('register');
    }
}

PrivacyCtrl.$inject = ['$scope', '$state'];