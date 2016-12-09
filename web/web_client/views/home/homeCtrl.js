/*global angular*/
angular
    .module('app.controls')
    .controller('HomeCtrl', HomeCtrl);

/* @ngInject */
function HomeCtrl($scope, $rootScope, playerServ, userServ, _, storageServ) {
    "use strict";

    $scope = angular.extend($scope, {
        featuredList: [],
        featuredItem: undefined
    });

    playerServ.getFeaturedList($scope)
        .then(playerServ.getCategories)
        .then(playerServ.getVideos)
        .then(playerServ.updateCategories)
        .then(playerServ.updateVideos)
        .then((videos) => {
            $rootScope.featuredList = $scope.featuredList;
            $rootScope.videosList = videos;
            if ($scope.featuredList && $scope.featuredList.length) {
                $scope.featuredItem = $scope.featuredList[0];
            }
        });

    if ($scope.userAuthorized) {
        userServ.refreshFavoritesFromNetwork($scope.hostName, $scope.storage);
    }

}
HomeCtrl.$inject = ['$scope', '$rootScope', 'playerServ', 'userServ', 'lodash', 'storageServ'];