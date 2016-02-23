/*global angular*/

angular
    .module('app.services')
    .service('playerServ', playerServ);


function playerServ($q) {
    "use strict";

    return {
        toggleFullScreen: toggleFullScreen,
        getElementFullscreenState: getElementFullscreenState,
        getPreviousVideo: getPreviousVideo,
        getNextVideo: getNextVideo
    };

    function getElementFullscreenState() {
        return (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && document.webkitFullscreenElement !== null && !document.msFullscreenElement)
    }

    function toggleFullScreen(scope) {
        return $q((resolve) => {
            let fullscreenState = getElementFullscreenState();
            if (fullscreenState) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                else if ($document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                resolve();
            }
            else {
                if (scope.screen.requestFullscreen) {
                    scope.screen.requestFullscreen();
                }
                else if (scope.screen.mozRequestFullScreen) {
                    scope.screen.mozRequestFullScreen();
                }
                else if (scope.screen.webkitRequestFullScreen) {
                    scope.screen.webkitRequestFullScreen();
                }
                else if (scope.screen.msRequestFullscreen) {
                    scope.screen.msRequestFullscreen();
                }
                resolve();
            }
        });
    }

    function getPreviousVideo(video, videoList) {
        if (!video || !video.id) {
            return;
        }
        let currentVideoId = video.id;
        let prevVideo;

        let index = _.findIndex(videoList, (item) => {
            return item.id === currentVideoId;
        });
        if (index > 0) {
            prevVideo = videoList[index - 1];
        }
        return prevVideo;
    }

    function getNextVideo(video, videoList) {

        if (!video) {
            return;
        }

        let currentVideoId = video.id;
        let nextVideo;

        let index = _.findIndex(videoList, (item) => {
            return item.id === currentVideoId;
        });
        if (index + 1 < videoList.length) {
            nextVideo = videoList[index + 1];
        }

        return nextVideo;
    }

}
playerServ.$inject = ['$q'];