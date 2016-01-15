/*global angular*/
angular
    .module('app.controls')
    .controller('MainCtrl', MainCtrl);

/* @ngInject */
function MainCtrl($scope, videoServ, categoriesServ, $q, _) {
    "use strict";

    $scope = angular.extend($scope, {
        filteredVideoList: [],
        videosList: [],
        filterCategory: {
            category_id: ''
        },
        filterByCategory: filterByCategory
    });

    getCategories()
        .then(getVideos)
        .then(updateVideos);



    function filterByCategory(id) {
        $scope.filterCategory.category_id = id;

        if (id) {
            $scope.filteredVideoList = _.filter($scope.videosList, item => item.category_id === id);
        } else {
            $scope.filteredVideoList = $scope.videosList;
        }
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
                    $scope.videosList = response.data.data;
                    resolve();
                });
        });
    }

    function updateVideos() {
        _.each($scope.videosList, (video) => {
            let category = _.find($scope.categoriesList, (category) => {
                return category.id === video.category_id;
            });
            video.categoryName = category.title;
            video.isWatching = false;
            video.isFullscreen = false;
            filterByCategory();
        });
    }



}
MainCtrl.$inject = ['$scope', 'videoServ', 'categoriesServ', '$q', 'lodash'];