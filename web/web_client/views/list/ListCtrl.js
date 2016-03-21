/*global angular*/
angular
    .module('app.controls')
    .controller('ListCtrl', ListCtrl);

/* @ngInject */
function ListCtrl($scope, $state, $stateParams, $rootScope, userServ, playerServ) {
    "use strict";

    if ($rootScope.featuredList && $rootScope.featuredList.length && $rootScope.videosList && $rootScope.videosList.length) {
        viewSetup();
    } else {
        playerServ.getFeaturedList($scope)
            .then(playerServ.getCategories)
            .then(playerServ.getVideos)
            .then(playerServ.updateVideos)
            .then((videos) => {
                if ($scope.storage.userAuthorized) {
                    userServ.getLiked($scope.hostName, $scope.storage.token.access_token)
                        .then((favorites) => {
                            _.each(videos, (videoItem) => {
                                let favItem = _.filter(favorites, item => item.id === videoItem.id);
                                videoItem.favorites = !!favItem.length;
                            });
                        });
                }
            })
            .then(viewSetup);
    }

    function viewSetup() {
        $scope = angular.extend($scope, {
            listName: undefined,
            videosFullList: undefined,
            listItem: undefined,
            listType: [
                'seen',
                'unseen',
                'favorite',
                'skipped'
            ]
        });

        if (!$scope.videosList || !$scope.videosList.length) {
            $scope.videosList = $rootScope.videosList;
        }
        $scope.videosFullList = $scope.videosList;

        if (!$scope.featuredList || !$scope.featuredList.length) {
            $scope.featuredList = $rootScope.featuredList;
        }

        if ($stateParams.listType && _.some($scope.listType, state => state === $stateParams.listType)) {

            let storagesMap = {
                'seen': 'seenItems',
                'favorite': 'favoritesItems',
                'unseen': 'unseenItems',
                'skipped': 'skippedItems'
            };
            let storage = $scope.storage[storagesMap[$stateParams.listType]];
            $scope.listItem = $stateParams.listType;
            $scope.videosList = _.filter($scope.videosFullList, (video) => {
                return _.some(storage, storageItem => storageItem === video.id);
            });
        } else {
            $state.go('home');
        }
    }
}

ListCtrl.$inject = ['$scope', '$state', '$stateParams', '$rootScope', 'userServ', 'playerServ'];