/*global angular*/
angular
    .module('app.controls')
    .controller('ContactCtrl', ContactCtrl);

/* @ngInject */
function ContactCtrl($scope, $state) {
    "use strict";

    $scope = angular.extend($scope, {
        closeView: closeView
    });

    function closeView() {
        $state.go('home');
    }
}

ContactCtrl.$inject = ['$scope', '$state'];