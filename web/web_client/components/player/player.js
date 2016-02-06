/*global angular*/
angular
    .module('app.directives')
    .directive('player', player);


/* @ngInject */
function player($log, moment, _, $sce, $timeout, $anchorScroll, $q, $interval, storageServ) {
    "use strict";

    function linkFn(scope, element, attrs) {

        scope = angular.extend(scope, {

            isIntermissionState: false,
            iconTitle: scope.video && scope.video.category_id ? categoryIcon(scope.video.category_id) : '',
            createdDate: scope.video && scope.video.created_at ? createdTimeHumanized(scope.video.created_at): undefined,
            intermissionCountdownValue: 0,
            intermissionCountdownMax: 100,
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
            descriptionLayer: angular.element(element[0].querySelector(`div.player_description-layer`))[0],
            playButton: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_play-button`))[0],
            pauseButton: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_pause-button`))[0],
            replayButton: angular.element(element[0].querySelector(`.player_buttons-layer_center-elements_replay-button`))[0],

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

            toggleFullScreen: toggleFullScreen,
            toggleControlsVisibility: toggleControlsVisibility,
            toggleDescription: toggleDescription,
            setIntermission: setIntermission,
            pauseIntermissionToggle: pauseIntermissionToggle,
            nextVideo: getNextVideo(),
            playNextVideo: playNextVideo,
            getNextVideo: getNextVideo,
            playPreviousVideo: playPreviousVideo,
            getPreviousVideo: getPreviousVideo,

            showControlsOnMove: showControlsOnMove
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

            checkForSeenStatus(scope.screen.currentTime, scope.screen.duration);
        });

        scope.screenList.bind('ended', () => {
            if (getElementFullscreenState()) {
                toggleFullScreen()
                    .then(() => {
                        if (scope.nextVideo) {
                            scope.setIntermission();
                        }
                    });
            } else {
                if (scope.nextVideo) {
                    scope.setIntermission();
                }
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
        if (scope.video && scope.video.streams) {
            let stream = _.find(scope.video.streams, (stream) => stream.stream_type === 'mp4');
            scope.videoLink = $sce.trustAs($sce.RESOURCE_URL, stream.link);
        }

        setReplayState(scope.video.isSeen);


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

        function checkForSeenStatus(currentTime, duration) {
            if (!scope.video.isSeen) {
                const seenTriggerTime = 10;
                if (currentTime >= duration - seenTriggerTime) {
                    scope.video.isSeen = true;
                    scope.storage.seenItems.push(scope.video.id);
                    storageServ.setItem( scope.storage.storageSeenKey, scope.storage.seenItems );
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

        function toggleDescription(event, state) {
            if (event) {
                event.stopPropagation();
            }
            setDescriptionState(state);
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

        function pauseIntermissionToggle(event, isForced) {
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
            return nextVideo;
        }

        function playNextVideo(event) {
            if (event) {
                event.stopPropagation();
            }
            pauseIntermissionToggle(undefined, true);
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
            pauseIntermissionToggle(undefined, true);
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
            return $sce.trustAsHtml(iconMap[String(id)]);
        }

        function createdTimeHumanized(date) {
            var start = moment(date);
            var end   = moment();
            return end.to(start);
        }

        function imageHover() {
            toggleControlsVisibility(false);
            scope.topElementsRightSide.classList.remove('hidden-layer');
            if (getElementFullscreenState() || scope.isIntermissionState) {
                scope.buttonLayer.classList.remove('player_buttons-layer--hover');
            } else {
                scope.buttonLayer.classList.add('player_buttons-layer--hover');
            }

        }

        function imageBlur() {
            toggleControlsVisibility(true);
            scope.topElementsRightSide.classList.add('hidden-layer');
            scope.buttonLayer.classList.remove('player_buttons-layer--hover');
        }

        function getElementFullscreenState() {
            return (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && document.webkitFullscreenElement !== null && !document.msFullscreenElement)
        }

        function toggleFullScreen(event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
            return $q((resolve) => {
                let fullscreenState = getElementFullscreenState();

                if (!scope.video.isWatching) {
                    return;
                }

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
                    resolve();
                }
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
            updateClassBySelector('add', '.player_description-layer', 'hidden-layer');
            updateClassBySelector('remove', '.player_buttons-layer_bottom-elements_titles', 'hidden-layer');

            _.each(angular.element(document.querySelectorAll('video')), (item) => {
                item.pause();
            });
            _.each(scope.filteredList, (video) => {
                video.isWatching = false;

                let btnLayer = document.querySelectorAll(`#player${video.id} .player_buttons-layer`)[0];
                let playButton =  angular.element(btnLayer.querySelector(`.player_buttons-layer_center-elements_play-button`))[0];
                let pauseButton = angular.element(btnLayer.querySelector(`.player_buttons-layer_center-elements_pause-button`))[0];
                let replayButton = angular.element(btnLayer.querySelector(`.player_buttons-layer_center-elements_replay-button`))[0];

                if (video.isSeen) {
                    btnLayer.classList.add('player_buttons-layer--replay');
                    playButton.classList.add('hidden-layer');
                    pauseButton.classList.add('hidden-layer');
                    replayButton.classList.remove('hidden-layer');

                } else {
                    btnLayer.classList.remove('player_buttons-layer--replay');
                    replayButton.classList.add('hidden-layer');
                }
            });
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

            scope.replayButton.classList[_classAdd(isWatched)]('hidden-layer');
            scope.buttonLayer.classList[_classAdd(!isWatched)]('player_buttons-layer--replay');
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
            scope.descriptionLayer.classList[_classAdd(isFullscreen)]('player_description-layer--fullscreen');
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
            setPlayPauseState(false);

        }

        function setDescriptionState(isDescription) {
            scope.descriptionLayer.classList[_classAdd(!isDescription)]('hidden-layer');
            scope.titlesOverlayLayer.classList[_classAdd(isDescription)]('hidden-layer');
            if (getElementFullscreenState()) {
                scope.buttonLayer.classList[_classAdd(!isDescription)]('player_buttons-layer--fullscreen');
            } else {
                scope.buttonLayer.classList[_classAdd(false)]('player_buttons-layer--fullscreen');
            }

            if (scope.video.isWatching) {
                scope.controlsOverlayLayer.classList[_classAdd(isDescription)]('hidden-layer');
            } else {
                scope.controlsOverlayLayer.classList[_classAdd(true)]('hidden-layer');
            }

            scope.topElementsRightSide.classList[_classAdd(isDescription)]('hidden-layer');
            if (!isDescription) {
                if (scope.video.isSeen) {
                    scope.replayButton.classList[_classAdd(false)]('hidden-layer');
                } else {
                    if (scope.screen.paused ) {
                        setPlayPauseState(false);
                    } else {
                        setPlayPauseState(true);
                    }
                }
            } else {
                scope.playButton.classList[_classAdd(isDescription)]('hidden-layer');
                scope.pauseButton.classList[_classAdd(isDescription)]('hidden-layer');
                scope.replayButton.classList[_classAdd(isDescription)]('hidden-layer');
            }
        }

        function setReplayState(isSeen) {
            scope.buttonLayer.classList[_classAdd(isSeen)]('player_buttons-layer--replay');
            if (scope.isWatching) {
                scope.replayButton.classList[_classAdd(true)]('hidden-layer');
            } else {
                scope.replayButton.classList[_classAdd(!isSeen)]('hidden-layer');

                if (isSeen) {
                    scope.playButton.classList[_classAdd(true)]('hidden-layer');
                    scope.pauseButton.classList[_classAdd(true)]('hidden-layer');
                } else {
                    if (scope.screen.paused ) {
                        setPlayPauseState(false);
                    } else {
                        setPlayPauseState(true);
                    }
                }
            }
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
            storage: '='
        }
    }
}
player.$inject = ['$log', 'moment', 'lodash', '$sce', '$timeout', '$anchorScroll', '$q', '$interval', 'storageServ'];