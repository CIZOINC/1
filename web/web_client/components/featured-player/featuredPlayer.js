/*global angular*/
angular
    .module('app.directives')
    .directive('featuredPlayer', featuredPlayer);


/* @ngInject */
function featuredPlayer($log, moment, _, $sce, $timeout, $anchorScroll, $q, $interval, playerServ) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/featured-player/featuredPlayer.html',
        link: linkFn,
        transclude: true,
        scope: {
            video: '=',
            filteredList: '=',
            feedList: '='
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

            featuredPlayer: angular.element(document.querySelector(`featured-player`))[0],

            titlesOverlayLayer: angular.element(element[0].querySelector(`.featured-player_buttons-layer_bottom-elements_titles`))[0],
            controlsOverlayLayer: angular.element(element[0].querySelector(`.featured-player_buttons-layer_bottom-elements_controls`))[0],
            topElementsLayer: angular.element(element[0].querySelector(`.featured-player_buttons-layer_top-elements`))[0],
            topElementsClose: angular.element(element[0].querySelector(`.featured-player_buttons-layer_top-elements_close-button`))[0],
            topElementsRightSide: angular.element(element[0].querySelector(`.featured-player_buttons-layer_top-elements_rightside`))[0],
            currentTitle: angular.element(element[0].querySelector(`.featured-player_buttons-layer_bottom-elements_titles_current_title`))[0],
            currentBlock: angular.element(element[0].querySelector(`.featured-player_buttons-layer_bottom-elements_titles_current`))[0],

            buttonLayer: angular.element(element[0].querySelectorAll(`.featured-player_buttons-layer`))[0],
            videoLayer: angular.element(element[0].querySelector(`div.video-layer`))[0],
            nextVideoLayer: angular.element(element[0].querySelector(`.featured-player_buttons-layer_bottom-elements_titles_next`))[0],
            imageLayer: angular.element(element[0].querySelector(`div.hero-image-layer`))[0],
            imageNextLayer: angular.element(element[0].querySelector(`div.featured-player_hero-image-layer-next`))[0],
            descriptionLayer: angular.element(element[0].querySelector(`div.featured-player_description-layer`))[0],
            playButton: angular.element(element[0].querySelector(`.featured-player_buttons-layer_center-elements_play-button`))[0],
            pauseButton: angular.element(element[0].querySelector(`.featured-player_buttons-layer_center-elements_pause-button`))[0],

            // intermission elements
            prevButton: angular.element(element[0].querySelector(`.featured-player_buttons-layer_center-elements_prev`))[0],
            nextButton: angular.element(element[0].querySelector(`.featured-player_buttons-layer_center-elements_next`))[0],
            countDown: angular.element(element[0].querySelector(`.featured-player_buttons-layer_center-elements_group_controls_progress`))[0],
            intermissionTitle: angular.element(element[0].querySelector(`.featured-player_buttons-layer_center-elements_group_title`))[0],
            intermissionPause: angular.element(element[0].querySelector(`.featured-player_buttons-layer_center-elements_group_bottom`))[0],

            // bottom elements
            slider: angular.element(element[0].querySelector(`.featured-player_buttons-layer_bottom-elements_controls_slider`))[0],
            expandButton: angular.element(element[0].querySelector(`.featured-player_buttons-layer_bottom-elements_controls_expand`))[0],
            collapseButton: angular.element(element[0].querySelector(`.featured-player_buttons-layer_bottom-elements_controls_collapse`))[0],

            togglePlayPause: togglePlayPause,
            imageHover: imageHover,
            imageBlur: imageBlur,

            toggleFullScreen: toggleFullScreen,
            toggleControlsVisibility: toggleControlsVisibility,
            toggleDescription: toggleDescription,
            setIntermission: setIntermission,
            pauseIntermissionToggle: pauseIntermissionToggle,
            closeFeatured: closeFeatured,
            nextVideo: getNextVideo(),
            playNextVideo: playNextVideo,
            getNextVideo: getNextVideo,
            playPreviousVideo: playPreviousVideo,
            getPreviousVideo: getPreviousVideo,

            showControlsOnMove: showControlsOnMove
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
                        scope.setIntermission();
                    });
            } else {
                scope.setIntermission();
            }
        });

        scope.$watch('video', (oldList, newList) => {
            if (scope.video && scope.video.streams) {
                scope.sources = scope.video.streams.map((source) => {
                    return {src: $sce.trustAsResourceUrl(source.link), type: `video/${source.stream_type}`}
                });
                scope.iconTitle = scope.video && scope.video.category_id ? categoryIcon(scope.video.category_id) : '';
                scope.createdDate = scope.video && scope.video.created_at ? createdTimeHumanized(scope.video.created_at): undefined;
                scope.nextVideo = getNextVideo();

                $timeout( () => {
                    if (!scope.featuredPlayer.classList.contains('hidden-layer')) {
                        togglePlayPause();
                        $anchorScroll(`featured-player`);
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

        function setIntermission() {
            scope.isIntermissionState = true;
            imageBlur();
            setIntermissionState(true);
            scope.intermissionCountdownValue = 0;

            scope.intermissionStopTimer = $interval(() => {
                scope.intermissionCountdownValue++;
                if (scope.intermissionCountdownValue > scope.intermissionCountdownMax) {
                    $interval.cancel(scope.intermissionStopTimer);
                    scope.playNextVideo();
                }
            }, 50);
        }

        function pauseIntermissionToggle(event,isForced) {
            if (event) {
                event.stopPropagation();
            }

            if (isForced) {
                scope.isIntermissionPaused = false;
                if (scope.intermissionStopTimer) {
                    $interval.cancel(scope.intermissionStopTimer);
                }
            }

            if (scope.isIntermissionPaused) {
                scope.intermissionStopTimer = $interval(() => {
                    scope.intermissionCountdownValue++;
                    if (scope.intermissionCountdownValue > scope.intermissionCountdownMax) {
                        $interval.cancel(scope.intermissionStopTimer);
                        scope.playNextVideo();
                    }
                }, 50);
                scope.isIntermissionPaused = false;
            } else {
                if (scope.intermissionStopTimer) {
                    $interval.cancel(scope.intermissionStopTimer);
                }
                scope.isIntermissionPaused = true;
            }
        }

        function closeFeatured(event) {
            if (event) {
                event.stopPropagation();
            }
            if (playerServ.getElementFullscreenState()) {
                toggleFullScreen();
            }
            scope.featuredPlayer.classList.add('hidden-layer');
            scope.screen.pause();
        }

        function getNextVideo() {

            if (!scope.video) {
                return;
            }

            let currentVideoId = scope.video.id;
            let nextVideo;

            let index = _.findIndex(scope.filteredList, (item) => {
                return item.id === currentVideoId;
            });
            if (index + 1 < scope.filteredList.length) {
                nextVideo = scope.filteredList[index + 1];
            }

            if (!nextVideo) {
                nextVideo = scope.feedList[0];
            }

            return nextVideo;
        }

        function playNextVideo(event) {
            if (event) {
                event.stopPropagation();
            }
            pauseIntermissionToggle(undefined, true);
            let nextVideo = getNextVideo();
            if (nextVideo && nextVideo.featured) {
                scope.screen.pause();
                if (playerServ.getElementFullscreenState()) {
                    toggleFullScreen(true);
                }

                scope.video = nextVideo;
                scope.isIntermissionState = false;
                setIntermissionState(false);
                $timeout( () => {
                    scope.screen.play();
                }, 500);
            } else {
                scope.screen.pause();
                scope.featuredPlayer.classList.add('hidden-layer');
                scope.feedList[0].isWatching = true;
            }
        }

        function playPreviousVideo(event) {
            if (event) {
                event.stopPropagation();
            }
            pauseIntermissionToggle(undefined, true);
            let prevVideo = getPreviousVideo(scope.video, scope.filteredList);
            if (prevVideo) {
                scope.screen.pause();
                if (playerServ.getElementFullscreenState()) {
                    toggleFullScreen(true);
                }

                scope.video = prevVideo;
                scope.isIntermissionState = false;
                setIntermissionState(false);
                $timeout( () => {
                    scope.screen.play();
                }, 500);
            }
        }

        function getPreviousVideo() {
            if (!scope.video || !scope.video.id) {
                return;
            }
            let currentVideoId = scope.video.id;
            let prevVideo;

            let index = _.findIndex(scope.filteredList, (item) => {
                return item.id === currentVideoId;
            });
            if (index > 0) {
                prevVideo = scope.filteredList[index - 1];
            }
            return prevVideo;
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

        function categoryIcon(id) {
            let iconMap = {
                '11': 'movie',
                '12': 'tv',
                '13': 'games',
                '14': 'lifestyle'
            };
            return `featured-player_buttons-layer_bottom-elements_titles_current_category icon-category${$sce.trustAsHtml(iconMap[String(id)])}`;
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
                scope.buttonLayer.classList.remove('featured-player_buttons-layer--hover');
            } else {
                scope.buttonLayer.classList.add('featured-player_buttons-layer--hover');
            }

        }

        function imageBlur() {
            toggleControlsVisibility(true);
            scope.topElementsRightSide.classList.add('hidden-layer');
            scope.buttonLayer.classList.remove('featured-player_buttons-layer--hover');
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
            if (scope.isIntermissionState) {
                return;
            }
            let showControls = typeof hideControls !== 'undefined' ? !hideControls : scope.controlsOverlayLayer.classList.contains('hidden-layer');

            $timeout(function () {
                scope.$broadcast('rzSliderForceRender');
            });
            if (scope.imageLayer.classList.contains('hidden-layer')) {
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
            element[0].classList[_classAdd(isWatched)]('featured-player--play-state');
            scope.currentTitle.classList[_classAdd(isWatched)]('featured-player_buttons-layer_bottom-elements_titles_current_title--play-state');
            scope.currentBlock.classList[_classAdd(isWatched)]('featured-player_buttons-layer_bottom-elements_titles_current--play-state');
            scope.titlesOverlayLayer.classList[_classAdd(!isWatched)]('featured-player_buttons-layer_bottom-elements_titles--hero-image');
            scope.titlesOverlayLayer.classList[_classAdd(!isWatched)]('hidden-layer');
            scope.controlsOverlayLayer.classList[_classAdd(!isWatched)]('hidden-layer');
            scope.nextVideoLayer.classList[_classAdd(!isWatched)]('hidden-layer');
        }

        function setShowHideControlsState(isShowed) {
            scope.titlesOverlayLayer.classList[_classAdd(!isShowed)]('hidden-layer');
            scope.controlsOverlayLayer.classList[_classAdd(!isShowed)]('hidden-layer');
            scope.playButton.classList[_classAdd(!isShowed)]('hidden-layer');
            scope.pauseButton.classList[_classAdd(!isShowed)]('hidden-layer');
            scope.topElementsRightSide.classList[_classAdd(!isShowed)]('hidden-layer');
            scope.buttonLayer.classList[_classAdd(isShowed)]('featured-player_buttons-layer--show-buttons');
            if (isShowed) {
                scope.topElementsClose.classList[_classAdd(!isShowed)]('hidden-layer');
            } else {
                scope.topElementsClose.classList.add('hidden-layer');
            }
        }

        function setFullscreenState(isFullscreen) {
            scope.descriptionLayer.classList[_classAdd(isFullscreen)]('featured-player_description-layer--fullscreen');
            scope.buttonLayer.classList[_classAdd(isFullscreen)]('featured-player_buttons-layer--fullscreen');
            scope.buttonLayer.classList[_classAdd(!isFullscreen)]('featured-player_buttons-layer--hover');
            scope.topElementsClose.classList[_classAdd(!isFullscreen)]('hidden-layer');
            scope.expandButton.classList[_classAdd(isFullscreen)]('hidden-layer');
            scope.collapseButton.classList[_classAdd(!isFullscreen)]('hidden-layer');
        }

        function setIntermissionState(isIntermission) {
            scope.buttonLayer.classList.remove('player_buttons-layer--hover');
            scope.buttonLayer.classList[_classAdd(isIntermission)]('featured-player_buttons-layer--intermission');
            scope.prevButton.classList[_classAdd(!isIntermission)]('hidden-layer');
            scope.nextButton.classList[_classAdd(!isIntermission)]('hidden-layer');
            scope.countDown.classList[_classAdd(!isIntermission)]('hidden-layer');
            scope.intermissionTitle.classList[_classAdd(!isIntermission)]('hidden-layer');
            scope.intermissionPause.classList[_classAdd(!isIntermission)]('hidden-layer');

            scope.titlesOverlayLayer.classList[_classAdd(isIntermission)]('hidden-layer');
            scope.controlsOverlayLayer.classList[_classAdd(isIntermission)]('hidden-layer');
            scope.imageNextLayer.classList[_classAdd(!isIntermission)]('hidden-layer');
            scope.videoLayer.classList[_classAdd(isIntermission)]('hidden-layer');
            setPlayPauseState(false);

        }

        function setDescriptionState(isDescription) {
            scope.descriptionLayer.classList[_classAdd(!isDescription)]('hidden-layer');
            scope.titlesOverlayLayer.classList[_classAdd(isDescription)]('hidden-layer');
            if (playerServ.getElementFullscreenState()) {
                scope.buttonLayer.classList[_classAdd(!isDescription)]('featured-player_buttons-layer--fullscreen');
            } else {
                scope.buttonLayer.classList[_classAdd(false)]('featured-player_buttons-layer--fullscreen');
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
featuredPlayer.$inject = ['$log', 'moment', 'lodash', '$sce', '$timeout', '$anchorScroll', '$q', '$interval', 'playerServ'];