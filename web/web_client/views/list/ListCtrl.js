/*global angular*/
angular
    .module('app.controls')
    .controller('ListCtrl', ListCtrl);

/* @ngInject */
function ListCtrl($scope, $state, userServ, storageServ) {
    "use strict";


    $scope = angular.extend($scope, {

    });


}

ListCtrl.$inject = ['$scope', '$state', 'userServ', 'storageServ'];