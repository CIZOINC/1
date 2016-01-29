/*global angular*/
angular
    .module('app.directives')
    .directive('player', player);


/* @ngInject */
function player($log, moment, _, $sce, $timeout, $anchorScroll, $q, $interval) {
    "use strict";

    function linkFn(scope, element, attrs) {

        scope = angular.extend(scope, {

            isIntermissionState: false,
            intermissionCountdownValue: 0,
            intermissionCountdownMax: 100,
            iconTitle: categoryIcon(scope.video.category_id),
            createdDate: createdTimeHumanized(scope.video.created_at),
            screenList: angular.element(element[0].querySelector('div.video-layer video')),
            screen: angular.element(element[0].querySelector('div.video-layer video'))[0],
            sliderModel: new SliderModel(),

            titlesOverlayLayer: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_titles`))[0],
            controlsOverlayLayer: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_controls`))[0],
            topElementsLayer: angular.element(element[0].querySelector(`.player_buttons-layer_top-elements`))[0],
            topElementsClose: angular.element(element[0].querySelector(`.player_buttons-layer_top-elements_close-button`))[0],
            topElementsRightSide: angular.element(element[0].querySelector(`.player_buttons-layer_top-elements_rightside`))[0],
            currentTitle: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_titles_current_title`))[0],
            currentBlock: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_titles_current`))[0],

            buttonLayer: angular.element(element[0].querySelectorAll(`.player_buttons-layer`))[0],
            videoLayer: angular.element(element[0].querySelector(`div.video-layer`))[0],
            nextVideoLayer: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_titles_next`))[0],
            imageLayer: angular.element(element[0].querySelector(`div.hero-image-layer`))[0],
            imageNextLayer: angular.element(element[0].querySelector(`div.player_hero-image-layer-next`))[0],
            playButton: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_play-button`))[0],
            pauseButton: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_pause-button`))[0],

            // intermission elements
            prevButton: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_prev`))[0],
            nextButton: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_next`))[0],
            countDown: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_group_controls_progress`))[0],
            intermissionTitle: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_group_title`))[0],
            intermissionPause: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_group_bottom`))[0],

            // bottom elements
            slider: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_controls_slider`))[0],
            expandButton: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_controls_expand`))[0],
            collapseButton: angular.element(element[0].querySelector(`.player_buttons-layer_bottom-elements_controls_collapse`))[0],

            togglePlayPause: togglePlayPause,
            imageHover: imageHover,
            imageBlur: imageBlur,
            mouseMoveOnVideo: mouseMoveOnVideo,

            toggleFullScreen: toggleFullScreen,
            toggleControlsVisibility: toggleControlsVisibility,
            setIntermission: setIntermission,
            pauseIntermissionFinish: pauseIntermissionFinish,
            nextVideo: getNextVideo(),
            playNextVideo: playNextVideo,
            getNextVideo: getNextVideo,
            playPreviousVideo: playPreviousVideo,
            getPreviousVideo: getPreviousVideo
        });

        ///////////////// setup ////////////////////
        $anchorScroll.yOffset = 150;
        updateNextVideo();

        scope.screenList.bind('timeupdate', () => {
            scope.timePassed = moment().startOf('year').add(scope.screen.currentTime, 's').format('mm:ss');
            scope.duration = moment().startOf('year').add(scope.screen.duration, 's').format('mm:ss');

            scope.sliderModel.value = scope.screen.currentTime;
            scope.sliderModel.options.ceil = scope.screen.duration;
            scope.$apply();
        });

        scope.screenList.bind('ended', () => {
            if (scope.video.isFullscreen) {
                toggleFullScreen(true)
                    .then(() => {
                        scope.setIntermission();
                    });
            } else {
                scope.setIntermission();
            }
        });

        scope.$watch('filteredList', (oldList, newList) => {
            if (!angular.equals(oldList, newList)) {
                scope.nextVideo = getNextVideo();
                updateNextVideo();

                let video = _.find(scope.filteredList, (item) => {
                    return scope.video.id === item.id;
                });
                if (video.isWatching) {
                    scope.togglePlayPause();
                }
            }
        });
        scope.$watch('video.isWatching', (oldList, newList) => {
            if (!angular.equals(oldList, newList)) {
                if (scope.video.isWatching) {
                    scope.togglePlayPause();
                    if (scope.needFullscreen) {
                        toggleFullScreen();
                    }
                }
            }
        });
        if (scope.video.streams) {
            let stream = _.find(scope.video.streams, (stream) => stream.stream_type === 'mp4');
            scope.videoLink = $sce.trustAs($sce.RESOURCE_URL, stream.link);
        }


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

        function updateNextVideo() {
            if (scope.nextVideo) {
                scope.nextVideoBackground = `background-image: url(${scope.nextVideo.hero_image_link})`;
            } else {
                scope.nextVideoBackground = `display: none`;
            }
        }

        function setIntermission() {
            scope.isIntermissionState = true;
            scope.video.isWatching = false;
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

        function pauseIntermissionFinish(event) {
            if (event) {
                event.stopPropagation();
            }
            if (scope.intermissionStopTimer) {
                $interval.cancel(scope.intermissionStopTimer);
            }
        }

        function getNextVideo() {
            let currentVideoId = scope.video.id;
            let nextVideo;

            let index = _.findIndex(scope.filteredList, (item) => {
                return item.id === currentVideoId;
            });
            if (index + 1 < scope.filteredList.length) {
                nextVideo = scope.filteredList[index + 1];
            }
            return nextVideo;
        }

        function playNextVideo(event) {
            if (event) {
                event.stopPropagation();
            }
            pauseIntermissionFinish();
            let nextVideo = getNextVideo();
            if (nextVideo) {
                scope.screen.pause();
                if (getElementFullscreenState()) {
                    toggleFullScreen(true)
                        .then(() => {
                            $anchorScroll(`player${nextVideo.id}`);
                        });
                } else {
                    $anchorScroll(`player${nextVideo.id}`);
                }

                updatePlayerItems();

                nextVideo.isWatching = true;

            }
        }

        function playPreviousVideo(event) {
            if (event) {
                event.stopPropagation();
            }
            pauseIntermissionFinish();
            let prevVideo = getPreviousVideo();
            if (prevVideo) {
                scope.screen.pause();
                if (getElementFullscreenState()) {
                    toggleFullScreen(true)
                        .then(() => {
                            $anchorScroll(`player${prevVideo.id}`);
                        });
                } else {
                    $anchorScroll(`player${prevVideo.id}`);
                }

                updatePlayerItems();

                prevVideo.isWatching = true;

            }
        }

        function getPreviousVideo() {
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

        function categoryIcon(id) {
            let iconMap = {
                '11': 'movie',
                '12': 'tv',
                '13': 'games',
                '14': 'lifestyle'
            };
            return $sce.trustAsHtml(iconMap[String(id)]);
        }

        function createdTimeHumanized(date) {
            var start = moment(date);
            var end   = moment();
            return end.to(start);
        }

        function imageHover() {
            scope.topElementsRightSide.classList.remove('hidden-layer');
            if (getElementFullscreenState() || scope.isIntermissionState) {
                scope.buttonLayer.classList.remove('player_buttons-layer--hover');
            } else {
                scope.buttonLayer.classList.add('player_buttons-layer--hover');
            }

        }

        function imageBlur() {
            scope.topElementsRightSide.classList.add('hidden-layer');
            scope.buttonLayer.classList.remove('player_buttons-layer--hover');
        }

        function mouseMoveOnVideo() {
            const waitTime = 4000;
            if (scope.fadeControlsTimer) {
                $timeout.cancel(scope.fadeControlsTimer);
            }
            if (!scope.video.isWatching || scope.isIntermissionState) {
                return;
            }

            scope.fadeControlsTimer = $timeout(() => {
                toggleControlsVisibility(true);
            }, waitTime);
        }

        function getElementFullscreenState() {
            return (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && document.webkitFullscreenElement !== null && !document.msFullscreenElement)
        }

        function toggleFullScreen(skipChangeState) {
            return $q((resolve) => {
                let fullscreenState = getElementFullscreenState();
                if (fullscreenState) {
                    setFullscreenState(false);
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
                    if (!skipChangeState) {
                        scope.needFullscreen = false;
                    }
                    resolve();
                }
                else {
                    setFullscreenState(true);
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
                    if (!skipChangeState) {
                        scope.needFullscreen = true;
                    }
                    resolve();
                }
            });
        }

        function toggleControlsVisibility(hideControls) {
            if (scope.isIntermissionState) {
                return;
            }
            let showControls = hideControls ? !hideControls : scope.controlsOverlayLayer.classList.contains('hidden-layer');

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

        function updatePlayerItems() {
            function updateClassBySelector(action, selector, setClass) {
                _.each(angular.element(document.querySelectorAll(selector)), (item) => {
                    item.classList[action](setClass);
                });
            }
            updateClassBySelector('remove', 'player', 'player--play-state');
            updateClassBySelector('add', 'player .video-layer', 'hidden-layer');
            updateClassBySelector('remove', 'player .hero-image-layer', 'hidden-layer');
            updateClassBySelector('add', '.player_buttons-layer_bottom-elements_titles', 'player_buttons-layer_bottom-elements_titles--hero-image');
            updateClassBySelector('add', '.player_buttons-layer_bottom-elements_controls', 'hidden-layer');
            updateClassBySelector('add', '.player_buttons-layer_bottom-elements_titles_next', 'hidden-layer');
            updateClassBySelector('remove', '.player_buttons-layer_center-elements_play-button', 'hidden-layer');
            updateClassBySelector('add', '.player_buttons-layer_center-elements_pause-button', 'hidden-layer');
            updateClassBySelector('remove', '.player_buttons-layer', 'player_buttons-layer--fullscreen');
            updateClassBySelector('remove', '.player_buttons-layer_bottom-elements_titles_current_title', 'player_buttons-layer_bottom-elements_titles_current_title--play-state');
            updateClassBySelector('remove', '.player_buttons-layer_bottom-elements_titles_current', 'player_buttons-layer_bottom-elements_titles_current--play-state');//
            updateClassBySelector('remove', '.player_buttons-layer', 'player_buttons-layer--intermission');
            updateClassBySelector('add', '.player_buttons-layer_center-elements_prev', 'hidden-layer');
            updateClassBySelector('add', '.player_buttons-layer_center-elements_next', 'hidden-layer');
            updateClassBySelector('add', '.player_buttons-layer_center-elements_group_controls_progress', 'hidden-layer');
            updateClassBySelector('add', '.player_buttons-layer_center-elements_group_title', 'hidden-layer');
            updateClassBySelector('add', '.player_buttons-layer_center-elements_group_bottom', 'hidden-layer');
            updateClassBySelector('add', '.player_hero-image-layer-next', 'hidden-layer');

            _.each(angular.element(document.querySelectorAll('video')), (item) => {
                item.pause();
            });
            _.each(scope.filteredList, (video) => {
                video.isWatching = false;
            });
        }

        function togglePlayPause(event, state) {
            if (event) {
                event.stopPropagation();
            }
            scope.isIntermissionState = false;
            pauseIntermissionFinish();
            if (!scope.video.isWatching) {
                updatePlayerItems();
            }
            if (scope.videoLayer.classList.contains('hidden-layer')) {
                scope.videoLayer.classList.remove('hidden-layer');
                scope.imageLayer.classList.add('hidden-layer');
                if (!scope.video.isWatching) {
                    scope.video.isWatching = true;
                    return;
                }
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
            element[0].classList[_classAdd(isWatched)]('player--play-state');
            scope.currentTitle.classList[_classAdd(isWatched)]('player_buttons-layer_bottom-elements_titles_current_title--play-state');
            scope.currentBlock.classList[_classAdd(isWatched)]('player_buttons-layer_bottom-elements_titles_current--play-state');
            scope.titlesOverlayLayer.classList[_classAdd(!isWatched)]('player_buttons-layer_bottom-elements_titles--hero-image');
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
            scope.buttonLayer.classList[_classAdd(isShowed)]('player_buttons-layer--show-buttons');
            if (getElementFullscreenState() && isShowed) {
                scope.topElementsClose.classList[_classAdd(!isShowed)]('hidden-layer');
            } else {
                scope.topElementsClose.classList.add('hidden-layer');
            }
        }

        function setFullscreenState(isFullscreen) {
            scope.buttonLayer.classList[_classAdd(isFullscreen)]('player_buttons-layer--fullscreen');
            scope.buttonLayer.classList[_classAdd(!isFullscreen)]('player_buttons-layer--hover');
            scope.topElementsClose.classList[_classAdd(!isFullscreen)]('hidden-layer');
            scope.expandButton.classList[_classAdd(isFullscreen)]('hidden-layer');
            scope.collapseButton.classList[_classAdd(!isFullscreen)]('hidden-layer');
        }

        function setIntermissionState(isIntermission) {
            scope.buttonLayer.classList.remove('player_buttons-layer--hover');
            scope.buttonLayer.classList[_classAdd(isIntermission)]('player_buttons-layer--intermission');
            scope.prevButton.classList[_classAdd(!isIntermission)]('hidden-layer');
            scope.nextButton.classList[_classAdd(!isIntermission)]('hidden-layer');
            scope.countDown.classList[_classAdd(!isIntermission)]('hidden-layer');
            scope.intermissionTitle.classList[_classAdd(!isIntermission)]('hidden-layer');
            scope.intermissionPause.classList[_classAdd(!isIntermission)]('hidden-layer');

            scope.titlesOverlayLayer.classList[_classAdd(isIntermission)]('hidden-layer');
            scope.controlsOverlayLayer.classList[_classAdd(isIntermission)]('hidden-layer');
            scope.imageNextLayer.classList[_classAdd(!isIntermission)]('hidden-layer');
            scope.videoLayer.classList[_classAdd(isIntermission)]('hidden-layer');

        }
    }

    return {
        restrict: 'E',
        templateUrl: 'components/player/player.html',
        link: linkFn,
        transclude: true,
        scope: {
            video: '=',
            filteredList: '=',
            needFullscreen: '='
        }
    }
}
player.$inject = ['$log', 'moment', 'lodash', '$sce', '$timeout', '$anchorScroll', '$q', '$interval'];