/*global angular*/
angular
    .module('app.controls')
    .controller('HomeCtrl', HomeCtrl);

/* @ngInject */
function HomeCtrl($scope, videoServ, categoriesServ, $q, _, $document, $timeout, storageServ) {
    "use strict";

    $scope = angular.extend($scope, {
        featuredList: [],
        featuredItem: undefined,
        videosList: []
    });

    getFeaturedList();

    getCategories()
        .then(getVideos)
        .then(updateVideos);

    function getFeaturedList() {
        return $q( (resolve) => {
            videoServ.getFeaturedList($scope)
                .then( (response) => {
                    $scope.featuredList = response.data.data;
                    $scope.featuredItem = $scope.featuredList[0];
                    resolve();
                });
        });
    }

    function getCategories() {
        return $q( (resolve) => {
            categoriesServ.getCategoriesList($scope)
                .then( (response) => {
                    $scope.categoriesList = response.data.data;
                    resolve();
                });
        });
    }

    function getVideos() {
        return $q( (resolve) => {
            videoServ.getVideosList($scope)
                .then( (response) => {
                    $scope.videosList = _.filter(response.data.data, item => item.hero_images && item.hero_images.hero_image_link && item.streams && item.streams.length)  ;
                    resolve();
                });
        });
    }

    function updateVideos() {
        return $q( (resolve) => {
            _.each($scope.videosList, (video) => {
                let category = _.find($scope.categoriesList, (category) => {
                    return category.id === video.category_id;
                });
                if (category) {
                    video.categoryName = category.title;
                }
                video.isWatching = false;
                video.isFullscreen = false;
            });
            resolve($scope.videosList);
        });
    }
}
HomeCtrl.$inject = ['$scope', 'videoServ', 'categoriesServ', '$q', 'lodash', '$document', '$timeout', 'storageServ'];