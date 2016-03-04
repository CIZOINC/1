/*global angular*/

angular
    .module('app.services')
    .service('playerServ', playerServ);


function playerServ($q, $state, $rootScope, categoriesServ, videoServ, storageServ, userServ, _) {
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

        getIconName: getIconName,
        setVideoWatched: setVideoWatched
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
            let updatedVideos = _.map(scope.videosList, (video) => {
                let category = _.find(scope.categoriesList, (category) => {
                    return category.id === video.category_id;
                });
                if (category) {
                    video.categoryName = category.title;
                    video.categoryId = category.category_id;
                    video.humanizedDate = video && video.created_at ? createdTimeHumanized(video.created_at): undefined;
                    video.instantPlay = false;
                }

                if (scope.userAuthorized) {
                    if (scope.storage.seenItems && scope.storage.seenItems.length) {
                        video.isWatched = _.some(scope.storage.seenItems, item => item === video.id);
                    }

                    if (scope.storage.favoritesItems && scope.storage.favoritesItems.length) {
                        video.favorites = _.some(scope.storage.favoritesItems, item => item === video.id);
                    } else {
                        video.favorites = false;
                    }
                }
                return video;
            });
            scope.videosList = updatedVideos;
            resolve(scope.videosList);
        });
    }

    function setVideoWatched(storage, hostName, videoId) {
        storage.seenItems.push(videoId);
        storage.seenItems = _.uniq(storage.seenItems);
        storageServ.setItem(storage.storageSeenKey, storage.seenItems);
        userServ.setVideoSeen(hostName, storage.token.access_token, videoId);
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
playerServ.$inject = ['$q', '$state', '$rootScope', 'categoriesServ', 'videoServ', 'storageServ', 'userServ', 'lodash'];