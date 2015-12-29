/*global angular*/
angular
    .module('app.controls')
    .controller('ContentCtrl', ContentCtrl);

/* @ngInject */
function ContentCtrl($scope, $log, $state, videoServ) {
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


    $scope.deleteVideo = function (id) {
        videoServ.deleteVideo($scope, id)
            .then(() => {
                $state.go($state.current, {}, {reload: true});
            });
    }
}

ContentCtrl.$inject = ['$scope', '$log', '$state', 'videoServ'];