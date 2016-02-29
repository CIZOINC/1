/*global angular*/
angular
    .module('app.controls')
    .controller('ShareCtrl', ShareCtrl);

/* @ngInject */
function ShareCtrl($scope, $rootScope, $stateParams, _, $state, playerServ) {
    "use strict";

    $scope = angular.extend($scope, {
        video: undefined,

        shareVideoItem: shareVideoItem,
        closeShare: closeShare,
        shareLink: undefined
    });


    if ($rootScope.videosList && $rootScope.videosList.length) {
        setupView();
    } else {
        playerServ.getVideos($scope)
            .then(playerServ.updateVideos)
            .then(()=>{
                setupView();
            });
    }

    function setupView() {
        if ($stateParams.videoId) {
            let videosArray = _.filter($rootScope.videosList, video => video.id === Number($stateParams.videoId));
            if (videosArray.length) {
                $scope.video = videosArray[0];
                $scope.shareLink = `${$scope.sharingPath}#/videos/${$scope.video.id}`;
            }
        }
    }


    function shareVideoItem(type) {
        let socialMap = {
            'facebook': 'https://www.facebook.com/dialog/share?' +
                `app_id=${$scope.facebookAppIdStage}&display=popup` +
                `&href=${encodeURIComponent($scope.sharingPath)}` +
                `&redirect_uri=${encodeURIComponent($scope.sharingPath)}`,
            'google': 'https://plus.google.com/share?url=',
            'twitter': 'https://twitter.com/home?status=',
            'reddit': 'https://www.reddit.com/submit?url='
        };

        if (type !== 'facebook') {
            let path = `${encodeURIComponent($scope.sharingPath)}#/videos/${$scope.video.id}`;
            window.location = socialMap[type] + path;
        } else {
            window.location = socialMap[type];
        }

    }

    function closeShare() {
        $state.go('home');
    }
}
ShareCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'lodash', '$state', 'playerServ'];