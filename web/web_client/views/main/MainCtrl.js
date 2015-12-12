/*global angular*/
angular
    .module('app.controls', ['ngSanitize'])
    .controller('MainCtrl', MainCtrl);

/* @ngInject */
function MainCtrl($scope) {
    "use strict";

    $scope.trending = 'Trending';
    $scope.categories = 'Categories';
    $scope.videos = 'Videos';
}
MainCtrl.$inject = ['$scope'];