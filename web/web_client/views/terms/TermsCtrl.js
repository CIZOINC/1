/*global angular*/
angular
    .module('app.controls')
    .controller('TermsCtrl', TermsCtrl);

/* @ngInject */
function TermsCtrl($scope, $state) {
    "use strict";

    $scope = angular.extend($scope, {
        closeView: closeView
    });

    function closeView() {
        $state.go('register');
    }
}

TermsCtrl.$inject = ['$scope', '$state'];