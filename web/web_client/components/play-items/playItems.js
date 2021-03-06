/*global angular*/
angular
    .module('app.directives')
    .directive('playItems', playItems);

/* @ngInject */
function playItems($state, $rootScope, _, playerServ, userServ, $timeout) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/play-items/playItems.html',
        link: linkFn,
        transclude: false,
        scope: {
            videos: '=',
            categoryId: '@',
            categories: '=',
            storage: '='
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {
            videosList: [],
            title: '',
            iconName:  playerServ.getIconName(scope.categoryId),
            moveToPlayPage: moveToPlayPage
        });

        scope.$watch('videos', (videos) => {
            scope.videosList = filterVideos(videos, scope.categoryId);
            $timeout(() => {
                _.each(scope.videosList, (video) => {
                    let videoItem = document.querySelector(`#play-video-item-${video.id}`);
                    if (videoItem && video.isWatched) {
                        videoItem.querySelector('.play-items_videos_item_overlay').classList.add('play-items_videos_item_overlay--watched');
                        videoItem.querySelector('.play-items_videos_item_title').classList.add('play-items_videos_item_title--watched');
                        videoItem.querySelector('.icon-play').classList.add('hidden-layer');
                        videoItem.querySelector('.icon-replay').classList.remove('hidden-layer');
                    } else {
                        videoItem.querySelector('.icon-replay').classList.add('hidden-layer');
                    }
                });
            });
        });

        scope.$watch('categoryId', () => {
            scope.iconName =  playerServ.getIconName(scope.categoryId);
            scope.title = getCategoryName(scope.categories, scope.categoryId);
        });


        function filterVideos(videos, id) {
            let videosList;
            if (parseInt(id)) {
                videosList = _.filter(videos, video => video.category_id === parseInt(id));
            } else {
                videosList = videos;
            }
            return videosList;
        }

        function getCategoryName(categories, id) {
            let result;
            if (parseInt(id)) {
                let category = _.find(categories, category => category.id === parseInt(id));
                if (category && category.title) {
                    result = category.title;
                }
            } else {
                result = 'All';
            }
            return result;
        }

        function isMatureVideo(video) {
            const isMatureVideo = video.mature_content && !userServ.isUnexpiredToken(scope.storage.token);
            if (isMatureVideo) {
                scope.storage.showMatureScreen = true;
            }
            return isMatureVideo;
        }

        function moveToPlayPage(video) {
            if (isMatureVideo(video)) {
                return;
            }
            const id = video.id;
            let obj = {videoId: id};
            $rootScope.$emit('replayVideo', obj);
            $rootScope.$broadcast('replayVideo', obj);
            $state.go('play', obj);
        }
    }
};
playItems.$inject = ['$state', '$rootScope', 'lodash', 'playerServ', 'userServ', '$timeout'];