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
        .then(playerServ.updateVideos)
        .then((videos) => {
            $rootScope.featuredList = $scope.featuredList;
            $rootScope.videosList = videos;
            if ($scope.featuredList && $scope.featuredList.length) {
                $scope.featuredItem = $scope.featuredList[0];
            }
        });

    if ($scope.userAuthorized) {
        userServ.getLiked($scope.hostName, $scope.storage.token.access_token)
            .then((favorites) => {
                let favoritesArray = _.map(favorites, fav => fav.id);
                let storedArray = storageServ.getItem($scope.storage.storageFavoritesKey);

                let newArray = _.union(favoritesArray, storedArray);
                storageServ.setItem($scope.storage.storageFavoritesKey, newArray);
                $scope.storage.favoritesItems = newArray;
            });
    }

}
HomeCtrl.$inject = ['$scope', '$rootScope', 'playerServ', 'userServ', 'lodash', 'storageServ'];