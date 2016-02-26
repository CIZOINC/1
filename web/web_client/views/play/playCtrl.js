/*global angular*/
angular
    .module('app.controls')
    .controller('PlayCtrl', PlayCtrl);

/* @ngInject */
function PlayCtrl($scope, $rootScope, $stateParams, _) {
    "use strict";


    $scope = angular.extend($scope, {
        categoriesList: $rootScope.categoriesList,
        videosList: $rootScope.videosList,
        featuredList: $rootScope.featuredList,
        featuredItem: $rootScope.featuredList[0],
        videoItem: undefined,
        videoCategoryId: undefined
    });



    if ($stateParams.categoryId && $stateParams.categoryId !== '0') {
        $scope.videoCategoryId = Number($stateParams.categoryId);
        let filteredVideos = _.filter($rootScope.videosList, videos => videos.category_id === Number($stateParams.categoryId));
        $scope.videosList = $scope.featuredList.concat(filteredVideos);
    } else {
        $scope.videosList = $scope.featuredList.concat($rootScope.videosList);
    }

    if (Number($stateParams.videoId)) {
        let video = _.find($scope.videosList, video => video.id === Number($stateParams.videoId));
        video.instantPlay = true;
        $scope.videoItem = video;

    }


}

PlayCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'lodash'];