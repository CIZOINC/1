/*global angular*/

angular
    .module('app.services')
    .service('playerServ', playerServ);


function playerServ($q, $state, $rootScope, categoriesServ, videoServ) {
    "use strict";

    return {
        toggleFullScreen: toggleFullScreen,
        getElementFullscreenState: getElementFullscreenState,
        getPreviousVideo: getPreviousVideo,
        getNextVideo: getNextVideo,
        shareVideo: shareVideo,

        getFeaturedList: getFeaturedList,
        getCategories: getCategories,
        getVideos: getVideos,
        updateVideos: updateVideos,

        getIconName: getIconName
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

    function shareVideo(id) {
        $state.go('share', {videoId: id});
    }

    function getFeaturedList(scope) {
        return $q( (resolve) => {
            videoServ.getFeaturedList(scope)
                .then( (response) => {
                    $rootScope.featuredList = scope.featuredList;
                    scope.featuredList = response.data.data;
                    scope.featuredItem = scope.featuredList[0];

                    resolve(scope);
                });
        });
    }

    function getCategories(scope) {
        return $q( (resolve) => {
            categoriesServ.getCategoriesList(scope)
                .then( (response) => {
                    scope.categoriesList = response.data.data;
                    $rootScope.categoriesList = response.data.data;
                    resolve(scope);
                });
        });
    }

    function getVideos(scope) {
        return $q( (resolve) => {
            videoServ.getVideosList(scope)
                .then( (response) => {
                    scope.videosList = _.filter(response.data.data, item => item.hero_images && item.hero_images.hero_image_link && item.streams && item.streams.length)  ;
                    resolve(scope);
                });
        });
    }

    function createdTimeHumanized(date) {
        var start = moment(date);
        var end   = moment();
        return end.to(start);
    }

    function updateVideos(scope) {
        return $q( (resolve) => {
            _.each(scope.videosList, (video) => {
                let category = _.find(scope.categoriesList, (category) => {
                    return category.id === video.category_id;
                });
                if (category) {
                    video.categoryName = category.title;
                    video.categoryId = category.category_id;
                    video.humanizedDate = video && video.created_at ? createdTimeHumanized(video.created_at): undefined;
                    video.instantPlay = false;
                }
            });
            $rootScope.videosList = scope.videosList;
            resolve(scope.videosList);
        });
    }

    function getIconName(iconId) {
        let iconMap = {
            0: 'all',
            11: 'movie',
            12: 'tv',
            13: 'games',
            14: 'lifestyle'
        };
        return iconMap[Number(iconId)];
    }

}
playerServ.$inject = ['$q', '$state', '$rootScope', 'categoriesServ', 'videoServ'];