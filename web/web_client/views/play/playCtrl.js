/*global angular*/
angular
    .module('app.controls')
    .controller('PlayCtrl', PlayCtrl);

/* @ngInject */
function PlayCtrl($scope, $state, userServ, storageServ, $rootScope) {
    "use strict";


    $scope = angular.extend($scope, {
        categoriesList: $rootScope.categoriesList
    });


}

PlayCtrl.$inject = ['$scope', '$state', 'userServ', 'storageServ', '$rootScope'];