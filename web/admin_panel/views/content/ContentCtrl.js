/*global angular*/
angular
    .module('app.controls')
    .controller('ContentCtrl', ContentCtrl);

/* @ngInject */
function ContentCtrl($scope, $log, $state, videoServ, categoriesServ, _) {
    "use strict";

    function loadCategories() {
        categoriesServ.getCategoriesList($scope)
            .then(
                function success(response) {
                    $scope.categoriesList = response.data.data;
                    $scope.categoriesList.unshift({id: '', title: 'All'});
                    loadVideo();
                },
                function error(response) {
                    $log.error('receiving error happened: ' + response);
                    loadVideo();
                }
            );
    }

    function loadVideo() {
        videoServ.getVideosList($scope)
            .then(
                function success(response) {
                    $scope.videosList = response.data.data;
                    extendLists($scope.videosList, $scope.categoriesList);
                    $log.info('data received');
                },
                function error(response) {
                    $log.error('receiving error happened: ' + response);
                });
    }

    function extendLists(videos, categories) {
        _.each(videos, (video) => {
            video.categoryName = _.find(categories, (category) => {
                return category.id === video.category_id;
            }).title;
            video.createdDate = moment(video.created_at).format('MM.DD.YYYY');
        })
    }


    $scope.orderList = [
         {
             name: '',
             title: 'All'
         },
         {
             name: 'title',
             title: 'by Title'
         },
         {
             name: 'created_at',
             title: 'by Creation Date'
         }
    ];

    loadCategories();


    $scope.deleteVideo = function (id) {
        videoServ.deleteVideo($scope, id)
            .then(() => {
                $state.go($state.current, {}, {reload: true});
            });
    }
}

ContentCtrl.$inject = ['$scope', '$log', '$state', 'videoServ', 'categoriesServ', 'lodash'];