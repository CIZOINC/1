/*global angular*/
angular
    .module('app.controls')
    .controller('TermsCtrl', TermsCtrl);

/* @ngInject */
function TermsCtrl($scope, $state, $rootScope) {
    "use strict";

    $scope = angular.extend($scope, {
        closeView: closeView
    });

    function closeView() {
        $rootScope.goBack();
    }
}

TermsCtrl.$inject = ['$scope', '$state', '$rootScope'];