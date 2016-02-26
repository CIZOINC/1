/*global angular*/
angular
    .module('app.controls')
    .controller('ShareCtrl', ShareCtrl);

/* @ngInject */
function ShareCtrl($scope, $rootScope, $stateParams, _) {
    "use strict";

    $scope = angular.extend($scope, {
        video: undefined
    });


    if ($stateParams.videoId) {
        let videosArray = _.filter($rootScope.videosList, video => video.id === Number($stateParams.videoId));
        if (videosArray.length) {
            $scope.video = videosArray[0];
        }

        let t=0;
    }

}
ShareCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'lodash'];