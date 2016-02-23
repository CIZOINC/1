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

    if (Number($stateParams.videoId)) {
        let video = _.find($scope.videosList, video => video.id === Number($stateParams.videoId));
        video.instantPlay = true;
        $scope.videoItem = video;

    }

    if ($stateParams.categoryId) {
        $scope.videoCategoryId = Number($stateParams.categoryId);
    }
}

PlayCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'lodash'];