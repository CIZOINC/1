/*global angular*/
angular
    .module('app.controls')
    .controller('ShareCtrl', ShareCtrl);

/* @ngInject */
function ShareCtrl($scope, $rootScope, $stateParams, _, $state) {
    "use strict";

    $scope = angular.extend($scope, {
        video: undefined,

        shareVideoItem: shareVideoItem,
        closeShare: closeShare
    });


    if ($stateParams.videoId) {
        let videosArray = _.filter($rootScope.videosList, video => video.id === Number($stateParams.videoId));
        if (videosArray.length) {
            $scope.video = videosArray[0];
        }
    }


    function shareVideoItem(type) {
        let socialMap = {
            'facebook': 'https://www.facebook.com/sharer/sharer.php?u=',
            'google': 'https://plus.google.com/share?url=',
            'twitter': 'https://twitter.com/home?status=',
            'reddit': 'https://www.reddit.com/submit?url='
        };

        let path = `https%3A//staging.cizo.com/public/web_client/index.html#/play/${$scope.video.id}}/0`;

        window.location = socialMap[type] + path;
    }

    function closeShare() {
        $state.go('home');
    }
}
ShareCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'lodash', '$state'];