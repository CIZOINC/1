/*global angular*/
angular
    .module('app.controls')
    .controller('HomeCtrl', HomeCtrl);

/* @ngInject */
function HomeCtrl($scope, $rootScope, playerServ, userServ, _) {
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
            if ($scope.userAuthorized) {
                userServ.getLiked($scope.hostName, $scope.storage.token.access_token)
                    .then((favorites) => {
                        _.each(videos, (videoItem) => {
                            let favItem = _.filter(favorites, item => item.id === videoItem.id);
                            videoItem.favorites = !!favItem.length;
                        });

                        _.each($scope.featuredList, (videoItem) => {
                            let favItem = _.filter(favorites, item => item.id === videoItem.id);
                            videoItem.favorites = !!favItem.length;
                        });

                        $scope.featuredItem = $scope.featuredList[0];
                        $rootScope.featuredList = $scope.featuredList;
                        $rootScope.videosList = videos;
                    });
            } else {
                $rootScope.featuredList = $scope.featuredList;
                $rootScope.videosList = videos;

            }
        });


}
HomeCtrl.$inject = ['$scope', '$rootScope', 'playerServ', 'userServ', 'lodash'];