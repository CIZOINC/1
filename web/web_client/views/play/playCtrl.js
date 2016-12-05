/*global angular*/
angular
    .module('app.controls')
    .controller('PlayCtrl', PlayCtrl);

/* @ngInject */
function PlayCtrl($scope, $rootScope,  $stateParams, _, playerServ, userServ) {
    "use strict";

    if ($rootScope.featuredList && $rootScope.featuredList.length && $rootScope.videosList && $rootScope.videosList.length) {
        viewSetup();
    } else {
        playerServ.getFeaturedList($scope)
            .then(playerServ.getCategories)
            .then(playerServ.getVideos)
            .then(playerServ.updateCategories)
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


    function categorySortPredicate(a, b) {
        if (a.id === $scope.videoItem.category_id) {
            return -1;
        } else
        if (b.id === $scope.videoItem.category_id) {
            return 1;
        } else {
            return $scope.categoriesList.indexOf(a) - $scope.categoriesList.indexOf(b);
        }
    }

    function viewSetup() {
        $scope = angular.extend($scope, {
            featuredItem: ($rootScope.featuredList && $rootScope.featuredList)? $rootScope.featuredList[0] : $scope.featuredList[0],
            videoItem: undefined,
            videoCategoryId: undefined,
            categoriesList: $rootScope.categoriesList,
            sortedCategoriesList: [],
            selectedCategory: undefined,
            videoCategory: undefined,
            videosFullList: undefined
        });

        if (!$scope.videosList || !$scope.videosList.length) {
            $scope.videosList = $rootScope.videosList;
        }
        $scope.videosFullList = $scope.videosList;

        if (!$scope.featuredList || !$scope.featuredList.length) {
            $scope.featuredList = $rootScope.featuredList;
        }

        if (Number($stateParams.videoId)) {
            let video = _.find($scope.videosList, video => video.id === Number($stateParams.videoId));
            $scope.videoCategory = _.filter($rootScope.categoriesList, item => item.id === video.category_id)[0];
            $scope.videoCategoryId = video.category_id;
            video.instantPlay = true;
            $scope.videoItem = video;
        }

        if ($stateParams.categoryId && $stateParams.categoryId !== '0') {
            $scope.selectedCategory = _.filter($rootScope.categoriesList, item => item.id === $scope.videoCategoryId)[0];
        }

        if ($scope.videoCategoryId) {
            $scope.sortedCategoriesList = $scope.categoriesList.slice().sort(categorySortPredicate);
        } else {
            $scope.sortedCategoriesList = $scope.categoriesList;
        }
    }

}

PlayCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'lodash', 'playerServ', 'userServ'];