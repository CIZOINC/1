/*global angular*/
angular
    .module('app.directives')
    .directive('searchedPlayer', searchedPlayer);


/* @ngInject */
function searchedPlayer($log, moment, _, $sce, $timeout, $anchorScroll, $q, $interval, playerServ) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/searched-player/searchedPlayer.html',
        link: linkFn,
        transclude: true,
        scope: {
            video: '='
        }
    };

    function linkFn(scope, element, attrs) {

        scope = angular.extend(scope, {

            isIntermissionState: false,
            isIntermissionPaused: false,
            intermissionCountdownValue: 0,
            intermissionCountdownMax: 100,
            screenList: angular.element(element[0].querySelector('div.video-layer video')),
            screen: angular.element(element[0].querySelector('div.video-layer video'))[0],
            sliderModel: new SliderModel(),

            searchedPlayer: angular.element(document.querySelector(`searched-player`))[0],

            titlesOverlayLayer: angular.element(element[0].querySelector(`.searched-player_buttons-layer_bottom-elements_titles`))[0],
            controlsOverlayLayer: angular.element(element[0].querySelector(`.searched-player_buttons-layer_bottom-elements_controls`))[0],
            topElementsLayer: angular.element(element[0].querySelector(`.searched-player_buttons-layer_top-elements`))[0],
            topElementsClose: angular.element(element[0].querySelector(`.searched-player_buttons-layer_top-elements_close-button`))[0],
            topElementsRightSide: angular.element(element[0].querySelector(`.searched-player_buttons-layer_top-elements_rightside`))[0],
            currentTitle: angular.element(element[0].querySelector(`.searched-player_buttons-layer_bottom-elements_titles_current_title`))[0],
            currentBlock: angular.element(element[0].querySelector(`.searched-player_buttons-layer_bottom-elements_titles_current`))[0],

            buttonLayer: angular.element(element[0].querySelectorAll(`.searched-player_buttons-layer`))[0],
            videoLayer: angular.element(element[0].querySelector(`div.video-layer`))[0],
            imageLayer: angular.element(element[0].querySelector(`div.hero-image-layer`))[0],
            descriptionLayer: angular.element(element[0].querySelector(`div.searched-player_description-layer`))[0],
            playButton: angular.element(element[0].querySelector(`.searched-player_buttons-layer_center-elements_play-button`))[0],
            pauseButton: angular.element(element[0].querySelector(`.searched-player_buttons-layer_center-elements_pause-button`))[0],


            // bottom elements
            slider: angular.element(element[0].querySelector(`.searched-player_buttons-layer_bottom-elements_controls_slider`))[0],
            expandButton: angular.element(element[0].querySelector(`.searched-player_buttons-layer_bottom-elements_controls_expand`))[0],
            collapseButton: angular.element(element[0].querySelector(`.searched-player_buttons-layer_bottom-elements_controls_collapse`))[0],

            togglePlayPause: togglePlayPause,
            imageHover: imageHover,
            imageBlur: imageBlur,

            toggleFullScreen: toggleFullScreen,
            toggleControlsVisibility: toggleControlsVisibility,
            toggleDescription: toggleDescription,

            showControlsOnMove: showControlsOnMove,
            closeVideo: closeVideo
        });

        ///////////////// setup ////////////////////
        $anchorScroll.yOffset = 150;


        scope.screenList.bind('timeupdate', () => {
            scope.timePassed = moment().startOf('year').add(scope.screen.currentTime, 's').format('mm:ss');
            scope.duration = moment().startOf('year').add(scope.screen.duration, 's').format('mm:ss');

            scope.sliderModel.value = scope.screen.currentTime;
            scope.sliderModel.options.ceil = scope.screen.duration;
            scope.$apply();
        });

        scope.screenList.bind('ended', () => {
            if (playerServ.getElementFullscreenState()) {
                toggleFullScreen()
                    .then(() => {
                        scope.video = undefined;
                    });
            } else {
                scope.video = undefined;
            }
        });

        scope.$watch('video', (oldList, newList) => {
            if (scope.video && scope.video.streams) {
                scope.sources = scope.video.streams.map((source) => {
                    return {src: $sce.trustAsResourceUrl(source.link), type: `video/${source.stream_type}`}
                });
                scope.iconTitle = scope.video && scope.video.category_id ? categoryIcon(scope.video.category_id) : '';
                scope.createdDate = scope.video && scope.video.created_at ? createdTimeHumanized(scope.video.created_at): undefined;

                $timeout( () => {
                    if (!scope.searchedPlayer.classList.contains('hidden-layer')) {
                        togglePlayPause();
                        $anchorScroll(`searched-player`);
                    }
                });
            }
        });


        ////////////////////////////////////////////

        function SliderModel() {
            return {
                start: 0,
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
            }
        }

        function toggleDescription(event, state) {
            if (event) {
                event.stopPropagation();
            }
            setDescriptionState(state);
        }

        function  showControlsOnMove() {
            const waitTime = 3000; //ms for hiding controls

            if (scope.waitingTimer) {
                $timeout.cancel(scope.waitingTimer);
            }

            toggleControlsVisibility(false);
            scope.topElementsRightSide.classList.remove('hidden-layer');
            scope.buttonLayer.classList.add('player_buttons-layer--hover');

            scope.waitingTimer = $timeout(() => {
                toggleControlsVisibility(true);
                scope.topElementsRightSide.classList.add('hidden-layer');
                scope.buttonLayer.classList.remove('player_buttons-layer--hover');
            }, waitTime)
        }

        function closeVideo(event) {
            if (event) {
                event.stopPropagation();
            }
            scope.screen.pause();
            if (playerServ.getElementFullscreenState()) {
                toggleFullScreen()
                    .then(() => {
                        scope.video = undefined;
                    });
            } else {
                scope.video = undefined;
            }
        }

        function categoryIcon(id) {
            let iconMap = {
                '11': 'movie',
                '12': 'tv',
                '13': 'games',
                '14': 'lifestyle'
            };
            return `searched-player_buttons-layer_bottom-elements_titles_current_category icon-category${$sce.trustAsHtml(iconMap[String(id)])}`;
        }

        function createdTimeHumanized(date) {
            var start = moment(date);
            var end   = moment();
            return end.to(start);
        }

        function imageHover() {
            toggleControlsVisibility(false);
            scope.topElementsRightSide.classList.remove('hidden-layer');
            if (playerServ.getElementFullscreenState() && scope.isIntermissionState) {
                scope.buttonLayer.classList.remove('searched-player_buttons-layer--hover');
            } else {
                scope.buttonLayer.classList.add('searched-player_buttons-layer--hover');
            }

        }

        function imageBlur() {
            toggleControlsVisibility(true);
            scope.topElementsRightSide.classList.add('hidden-layer');
            scope.buttonLayer.classList.remove('searched-player_buttons-layer--hover');
        }

        function toggleFullScreen(event) {
            if (event) {
                event.stopPropagation();
            }
            return $q((resolve) => {
                playerServ.toggleFullScreen(scope)
                    .then(() => {
                        let fullscreenState = playerServ.getElementFullscreenState();
                        setFullscreenState(fullscreenState);
                        resolve();
                    })
            });
        }

        function toggleControlsVisibility(hideControls) {

            let showControls = typeof hideControls !== 'undefined' ? !hideControls : scope.controlsOverlayLayer.classList.contains('hidden-layer');

            $timeout(function () {
                scope.$broadcast('rzSliderForceRender');
            });
            if (showControls) {
                setShowHideControlsState(true);
                if (scope.screen.paused) {
                    setPlayPauseState(false);
                } else {
                    setPlayPauseState(true);
                }
            } else {
                setShowHideControlsState(false);
            }

        }

        function togglePlayPause(event) {
            if (event) {
                event.stopPropagation();
            }
            if (scope.isIntermissionState) {
                scope.isIntermissionState = false;
                pauseIntermissionToggle(undefined, true);
                playNextVideo();
                return;
            }

            setVideoPlayState(true);

            //update slider after showing it parent element
            $timeout(function () {
                scope.$broadcast('rzSliderForceRender');
            });

            if (scope.screen.paused) {
                scope.screen.play();
                $log.info('start playing');
                setPlayPauseState(true);

            } else {
                scope.screen.pause();
                $log.info('set to pause');
                setPlayPauseState(false);
            }
        }

        function _classAdd(value) {
            return value ? 'add' : 'remove';
        }

        function setPlayPauseState(isPaused) {
            scope.pauseButton.classList[_classAdd(!isPaused)]('hidden-layer');
            scope.playButton.classList[_classAdd(isPaused)]('hidden-layer');
        }

        function setVideoPlayState(isWatched) {
            element[0].classList[_classAdd(isWatched)]('searched-player--play-state');
            scope.currentTitle.classList[_classAdd(isWatched)]('searched-player_buttons-layer_bottom-elements_titles_current_title--play-state');
            scope.currentBlock.classList[_classAdd(isWatched)]('searched-player_buttons-layer_bottom-elements_titles_current--play-state');
            scope.titlesOverlayLayer.classList[_classAdd(!isWatched)]('searched-player_buttons-layer_bottom-elements_titles--hero-image');
            scope.titlesOverlayLayer.classList[_classAdd(!isWatched)]('hidden-layer');
            scope.controlsOverlayLayer.classList[_classAdd(!isWatched)]('hidden-layer');
        }

        function setShowHideControlsState(isShowed) {
            scope.titlesOverlayLayer.classList[_classAdd(!isShowed)]('hidden-layer');
            scope.controlsOverlayLayer.classList[_classAdd(!isShowed)]('hidden-layer');
            scope.playButton.classList[_classAdd(!isShowed)]('hidden-layer');
            scope.pauseButton.classList[_classAdd(!isShowed)]('hidden-layer');
            scope.topElementsRightSide.classList[_classAdd(!isShowed)]('hidden-layer');
            scope.buttonLayer.classList[_classAdd(isShowed)]('searched-player_buttons-layer--show-buttons');
            if (isShowed) {
                scope.topElementsClose.classList[_classAdd(!isShowed)]('hidden-layer');
            } else {
                scope.topElementsClose.classList.add('hidden-layer');
            }
        }

        function setFullscreenState(isFullscreen) {
            scope.descriptionLayer.classList[_classAdd(isFullscreen)]('searched-player_description-layer--fullscreen');
            scope.buttonLayer.classList[_classAdd(isFullscreen)]('searched-player_buttons-layer--fullscreen');
            scope.buttonLayer.classList[_classAdd(!isFullscreen)]('searched-player_buttons-layer--hover');
            scope.topElementsClose.classList[_classAdd(!isFullscreen)]('hidden-layer');
            scope.expandButton.classList[_classAdd(isFullscreen)]('hidden-layer');
            scope.collapseButton.classList[_classAdd(!isFullscreen)]('hidden-layer');
        }

        function setIntermissionState(isIntermission) {
            scope.buttonLayer.classList.remove('player_buttons-layer--hover');
            scope.buttonLayer.classList[_classAdd(isIntermission)]('searched-player_buttons-layer--intermission');

            scope.titlesOverlayLayer.classList[_classAdd(isIntermission)]('hidden-layer');
            scope.controlsOverlayLayer.classList[_classAdd(isIntermission)]('hidden-layer');
            scope.videoLayer.classList[_classAdd(isIntermission)]('hidden-layer');
            setPlayPauseState(false);

        }

        function setDescriptionState(isDescription) {
            scope.descriptionLayer.classList[_classAdd(!isDescription)]('hidden-layer');
            scope.titlesOverlayLayer.classList[_classAdd(isDescription)]('hidden-layer');
            if (playerServ.getElementFullscreenState()) {
                scope.buttonLayer.classList[_classAdd(!isDescription)]('searched-player_buttons-layer--fullscreen');
            } else {
                scope.buttonLayer.classList[_classAdd(false)]('searched-player_buttons-layer--fullscreen');
            }

            if (scope.video.isWatching) {
                scope.controlsOverlayLayer.classList[_classAdd(isDescription)]('hidden-layer');
            } else {
                scope.controlsOverlayLayer.classList[_classAdd(true)]('hidden-layer');
            }

            scope.topElementsRightSide.classList[_classAdd(isDescription)]('hidden-layer');
            if (!isDescription) {
                if (scope.screen.paused ) {
                    setPlayPauseState(false);
                } else {
                    setPlayPauseState(true);
                }
            } else {
                scope.playButton.classList[_classAdd(isDescription)]('hidden-layer');
                scope.pauseButton.classList[_classAdd(isDescription)]('hidden-layer');
            }
        }
    }

}
searchedPlayer.$inject = ['$log', 'moment', 'lodash', '$sce', '$timeout', '$anchorScroll', '$q', '$interval', 'playerServ'];