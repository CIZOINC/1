/*global angular*/
angular
    .module('app.controls')
    .controller('MainCtrl', MainCtrl);

/* @ngInject */
function MainCtrl($scope, videoServ, categoriesServ, $q, _) {
    "use strict";

    function testCategory(text) {
        $scope.filterCategory.category_id = text;
        console.log(text);
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
            video.list = $scope.videosList;

        });
    }
    $scope.filteredVideoList = [];
    $scope.videosList = [];
    $scope.testCategory = testCategory;
    $scope.filterCategory = {
        category_id: ''
    };

    getCategories()
        .then(getVideos)
        .then(updateVideos);

}
MainCtrl.$inject = ['$scope', 'videoServ', 'categoriesServ', '$q', 'lodash'];