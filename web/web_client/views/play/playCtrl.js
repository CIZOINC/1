/*global angular*/
angular
    .module('app.controls')
    .controller('PlayCtrl', PlayCtrl);

/* @ngInject */
function PlayCtrl($scope, $rootScope, $stateParams, _, playerServ, userServ) {
    "use strict";

    if ($rootScope.featuredList && $rootScope.featuredList.length && $rootScope.videosList && $rootScope.videosList.length) {
        viewSetup();
    } else {
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
                        });
                }
            })
            .then(viewSetup);
    }




    function viewSetup() {
        $scope = angular.extend($scope, {
            categoriesList: $scope.categoriesList || $rootScope.categoriesList,
            videosList: $scope.videosList || $rootScope.videosList,
            featuredItem: $rootScope.featuredList ? $rootScope.featuredList[0] : {},
            videoItem: undefined,
            videoCategoryId: undefined
        });



        if ($stateParams.categoryId && $stateParams.categoryId !== '0') {
            $scope.videoCategoryId = Number($stateParams.categoryId);
            let filteredVideos = _.filter($rootScope.videosList, videos => videos.category_id === Number($stateParams.categoryId));

            if ($scope.featuredList) {
                $scope.videosList =  _.unionBy($scope.featuredList, filteredVideos, 'id');
            } else {
                $scope.videosList = filteredVideos;
            }

        } else {
            if ($scope.featuredList) {
                $scope.videosList = _.unionBy($scope.featuredList, $rootScope.videosList, 'id');
            } else {
                $scope.videosList = $rootScope.videosList;
            }

        }

        if (Number($stateParams.videoId)) {
            let video = _.find($scope.videosList, video => video.id === Number($stateParams.videoId));
            video.instantPlay = true;
            $scope.videoItem = video;

        }
    }

}

PlayCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'lodash', 'playerServ', 'userServ'];