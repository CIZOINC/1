/*global angular*/
angular
    .module('app.controls')
    .controller('VideosCtrl', VideosCtrl);

/* @ngInject */
function VideosCtrl($scope, $log, videoServ) {
    "use strict";

    videoServ.getVideosList($scope)
        .then(
            function success(response) {
                $scope.videosList = response.data.data;
                $log.info('data received');
            },
            function error(response) {
                $log.error('receiving error happened: ' + response);
            });

}

VideosCtrl.$inject = ['$scope', '$log', 'videoServ'];