/*global angular*/
angular
    .module('app.directives')
    .directive('player', player);


/* @ngInject */
function player($log, moment, _, $sce, $timeout) {
    "use strict";

    function linkFn(scope, element, attrs) {

        scope = angular.extend(scope, {

            descriptionVisible: false,
            iconTitle: categoryIcon(scope.video.category_id),
            createdDate: createdTimeHumanized(scope.video.created_at),
            screenList: angular.element(element[0].querySelector('div.video-layer video')),
            screen: angular.element(element[0].querySelector('div.video-layer video'))[0],

            titlesOverlayLayer: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_titles`))[0],
            controlsOverlayLayer: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_controls`))[0],
            topElementsLayer: angular.element(element[0].querySelector(`.player_buttons-layer_top-elements`))[0],
            topElementsClose: angular.element(element[0].querySelector(`.player_buttons-layer_top-elements_close-button`))[0],
            topElementsRightSide: angular.element(element[0].querySelector(`.player_buttons-layer_top-elements_rightside`))[0],

            buttonLayer: angular.element(element[0].querySelectorAll(`.player_buttons-layer`))[0],
            videoLayer: angular.element(element[0].querySelector(`div.video-layer`))[0],
            nextVideoLayer: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_titles_next`))[0],
            imageLayer: angular.element(element[0].querySelector(`div.hero-image-layer`))[0],
            playButton: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_play-button`))[0],
            pauseButton: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_pause-button`))[0],
            slider: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_controls_slider`))[0],

            togglePlayPause: togglePlayPause,
            imageHover: imageHover,
            imageBlur: imageBlur,
            mouseMoveOnVideo: mouseMoveOnVideo,

            toggleFullScreen: toggleFullScreen,
            toggleControlsVisibility: toggleControlsVisibility,
            nextVideo: getNextVideo()
        });

        scope.sliderModel = {
            value: 0,
            options: {
                floor: 0,
                ceil: 500,
                hideLimitLabels: true,
                onChange: function () {
                    console.log('change to ' + scope.sliderModel.value);
                    scope.screen.currentTime = scope.sliderModel.value;
                }
            }
        };
        if (scope.nextVideo) {
            scope.nextVideoBackground = `background-image: url(${scope.nextVideo.hero_image_link})`;
        } else {
            scope.nextVideoBackground = `display: none`;
        }


        scope.screenList.bind('timeupdate', () => {
            scope.timePassed = moment().startOf('year').add(scope.screen.currentTime, 's').format('mm:ss');
            scope.duration = moment().startOf('year').add(scope.screen.duration, 's').format('mm:ss');

            scope.sliderModel.value = scope.screen.currentTime;
            scope.sliderModel.options.ceil = scope.screen.duration;
            scope.$apply();
        });




        if (scope.video.streams) {
            let stream = _.find(scope.video.streams, (stream) => stream.stream_type === 'mp4');
            scope.videoLink = $sce.trustAs($sce.RESOURCE_URL, stream.link);
        }

        function getNextVideo() {
            let currentVideoId = scope.video.id;
            let nextVideo;

            let index = _.findIndex(scope.video.list, (item) => {
                return item.id === currentVideoId;
            });
            if (index + 1 < scope.video.list.length) {
                nextVideo = scope.video.list[index + 1];
            }
            return nextVideo;
        }

        function categoryIcon(id) {
            let iconMap = {
                '11': 'movies',
                '12': 'tv-shows',
                '13': 'games',
                '14': 'lifestyles'
            };
            return $sce.trustAsHtml(iconMap[String(id)]);
        }

        function createdTimeHumanized(date) {
            var start = moment(date);
            var end   = moment();
            return end.to(start);
        }

        function imageHover() {
            scope.topElementsClose.classList.remove('hidden-layer');
            scope.topElementsRightSide.classList.remove('hidden-layer');
        }

        function imageBlur() {
            scope.topElementsClose.classList.add('hidden-layer');
            scope.topElementsRightSide.classList.add('hidden-layer');
        }

        function mouseMoveOnVideo() {
            if (!scope.video.isWatching) {
                return;
            }

            const waitTime = 4000;
            if (scope.fadeControlsTimer) {
                $timeout.cancel(scope.fadeControlsTimer);
            }
            scope.fadeControlsTimer = $timeout(() => {
                toggleControlsVisibility(false);
            }, waitTime);
        }

        function toggleFullScreen() {
            if (!document.fullscreenElement &&    // alternative standard method
                !document.mozFullScreenElement && document.webkitFullscreenElement !== null && !document.msFullscreenElement) {
                scope.buttonLayer.classList.remove('player_buttons-layer--fullscreen');
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
            }
            else {
                scope.buttonLayer.classList.add('player_buttons-layer--fullscreen');
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
            }
        }

        function toggleControlsVisibility(state) {
            let showControls = state ? state : scope.controlsOverlayLayer.classList.contains('hidden-layer')

            $timeout(function () {
                scope.$broadcast('rzSliderForceRender');
            });
            if (scope.imageLayer.classList.contains('hidden-layer')) {
                if (showControls) {
                    scope.titlesOverlayLayer.classList.remove('hidden-layer');
                    scope.controlsOverlayLayer.classList.remove('hidden-layer');
                    if (scope.screen.paused) {
                        scope.playButton.classList.remove('hidden-layer');
                    } else {
                        scope.pauseButton.classList.remove('hidden-layer');
                    }
                    scope.topElementsClose.classList.remove('hidden-layer');
                    scope.topElementsRightSide.classList.remove('hidden-layer');
                } else {
                    scope.titlesOverlayLayer.classList.add('hidden-layer');
                    scope.controlsOverlayLayer.classList.add('hidden-layer');
                    scope.playButton.classList.add('hidden-layer');
                    scope.pauseButton.classList.add('hidden-layer');
                    scope.topElementsClose.classList.add('hidden-layer');
                    scope.topElementsRightSide.classList.add('hidden-layer');
                }
            }
        }

        function togglePlayPause(event) {
            function updateClassBySelector(action, selector, setClass) {
                _.each(angular.element(document.querySelectorAll(selector)), (item) => {
                    item.classList[action](setClass);
                });
            }

            event.stopPropagation();
            if (!scope.video.isWatching) {
                updateClassBySelector('add', 'player .video-layer', 'hidden-layer');
                updateClassBySelector('remove', 'player .hero-image-layer', 'hidden-layer');
                updateClassBySelector('add', '.player_buttons-layer_bottom-elements_titles', 'player_buttons-layer_bottom-elements_titles--hero-image');
                updateClassBySelector('add', '.player_buttons-layer_bottom-elements_controls', 'hidden-layer');
                updateClassBySelector('add', '.player_buttons-layer_bottom-elements_titles_next', 'hidden-layer');
                updateClassBySelector('remove', '.player_buttons-layer_center-elements_play-button', 'hidden-layer');
                updateClassBySelector('add', '.player_buttons-layer_center-elements_pause-button', 'hidden-layer');

                _.each(angular.element(document.querySelectorAll('video')), (item) => {
                    item.pause();
                });
                _.each(scope.video.list, (video) => {
                    video.isWatching = false;
                });
                scope.video.isWatching = true;

                scope.videoLayer.classList.remove('hidden-layer');
                scope.imageLayer.classList.add('hidden-layer');
                scope.titlesOverlayLayer.classList.remove('player_buttons-layer_bottom-elements_titles--hero-image');
                scope.titlesOverlayLayer.classList.remove('hidden-layer');
                scope.controlsOverlayLayer.classList.remove('hidden-layer');
                scope.nextVideoLayer.classList.remove('hidden-layer');
                scope.descriptionVisible = true;
                $timeout(function () {
                    scope.$broadcast('rzSliderForceRender');
                });
            }
            if (scope.screen.paused) {
                scope.screen.play();
                $log.info('start playing');
                scope.pauseButton.classList.remove('hidden-layer');
                scope.playButton.classList.add('hidden-layer');

            } else {
                scope.screen.pause();
                $log.info('set to pause');
                scope.pauseButton.classList.add('hidden-layer');
                scope.playButton.classList.remove('hidden-layer');
            }
        }
    }

    return {
        restrict: 'E',
        templateUrl: 'components/player/player.html',
        link: linkFn,
        transclude: true,
        scope: {
            video: '=video',
            filtered: '=filtered'
        }
    }
}
player.$inject = ['$log', 'moment', 'lodash', '$sce', '$timeout'];