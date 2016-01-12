/*global angular*/
angular
    .module('app.directives', [])
    .directive('player', player);


/* @ngInject */
function player($log, moment, _, $sce) {
    "use strict";

    function linkFn(scope, element, attrs) {

        scope = angular.extend(scope, {
            togglePlayPause: togglePlayPause,
            descriptionVisible: false,
            iconTitle: categoryIcon(scope.video.category_id),
            imageHover: imageHover,
            imageBlur: imageBlur,
            createdDate: createdTimeHumanized(scope.video.created_at)
        });

        let imageLayer = element[0].querySelector('.row');
        angular.element(imageLayer).bind('mouseenter', imageHover);
        angular.element(imageLayer).bind('mouseleave', imageBlur);
        angular.element(imageLayer).bind('click', togglePlayPause);

        let screen = element[0].querySelector('div.video-layer video');
        angular.element(screen).bind('timeupdate', () => {
            let screen = element[0].querySelector('div.video-layer video');
            let screenElement = angular.element(screen)[0];
            scope.timePassed = moment().startOf('year').add(screenElement.currentTime, 's').format('mm:ss');
            scope.duration = moment().startOf('year').add(screenElement.duration, 's').format('mm:ss');
            scope.$apply();
        });


        if (scope.video.streams) {
            let stream = _.find(scope.video.streams, (stream) => stream.stream_type === 'mp4');
            scope.videoLink = $sce.trustAs($sce.RESOURCE_URL, stream.link);
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
            if (!scope.video.isWatching) {
                let titlesOverlayLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] .player_buttons-layer_bottom-elements_titles`))[0];
                let screen = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] video`))[0];
                titlesOverlayLayer.classList.remove('hidden-layer');
                titlesOverlayLayer.classList.add('player_buttons-layer_bottom-elements_titles--hovered');
            }
        }

        function imageBlur() {
            if (!scope.video.isWatching) {
                let titlesOverlayLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] .player_buttons-layer_bottom-elements_titles`))[0];
                titlesOverlayLayer.classList.add('hidden-layer');
                titlesOverlayLayer.classList.remove('player_buttons-layer_bottom-elements_titles--hovered');
            }
        }

        function togglePlayPause() {
            let screen = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] video`))[0];

            let videoLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] div.video-layer`))[0];
            let imageLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] div.hero-image-layer`))[0];
            let playButton = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] .player_buttons-layer_center-elements_play-button`))[0];

            let titlesOverlayLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] .player_buttons-layer_bottom-elements_titles`))[0];
            let controlsOverlayLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] .player_buttons-layer_bottom-elements_controls`))[0];

            if (!scope.video.isWatching) {
                _.each(angular.element(document.querySelectorAll('player .video-layer')), (item) => {
                    item.classList.add('hidden-layer');
                });
                _.each(angular.element(document.querySelectorAll('player .hero-image-layer')), (item) => {
                    item.classList.remove('hidden-layer');
                });
                _.each(angular.element(document.querySelectorAll('.player_buttons-layer_bottom-elements_titles')), (item) => {
                    item.classList.add('hidden-layer');
                });
                _.each(angular.element(document.querySelectorAll('.player_buttons-layer_bottom-elements_controls')), (item) => {
                    item.classList.add('hidden-layer');
                });
                _.each(angular.element(document.querySelectorAll('video')), (item) => {
                    item.pause();
                });
                _.each(scope.video.list, (video) => {
                    video.isWatching = false;
                });
                scope.video.isWatching = true;

                videoLayer.classList.remove('hidden-layer');
                imageLayer.classList.add('hidden-layer');
                titlesOverlayLayer.classList.remove('player_buttons-layer_bottom-elements_titles--hovered');
                titlesOverlayLayer.classList.remove('hidden-layer');
                controlsOverlayLayer.classList.remove('hidden-layer');
                scope.descriptionVisible = true;
                scope.$apply();
            }
            if (screen.paused) {
                screen.play();
                playButton.classList.add('hidden-layer');
                $log.info('start playing');
            } else {
                screen.pause();
                playButton.classList.remove('hidden-layer');
                $log.info('set to pause');
            }

            /*if (screen.paused) {
                screen.play();
                $log.info('start playing');

                videoLayer.classList.remove('hidden-layer');
                playButton.classList.add('hidden-layer');
                imageLayer.classList.add('hidden-layer');
                titlesOverlayLayer.classList.remove('player_buttons-layer_bottom-elements_titles--hovered');
                titlesOverlayLayer.classList.remove('hidden-layer');
                controlsOverlayLayer.classList.remove('hidden-layer');

                scope.descriptionVisible = true;
                scope.$apply();
                imageBlur();

            } else {
                screen.pause();
                $log.info('set to pause');
                playButton.classList.remove('hidden-layer');

                scope.descriptionVisible = false;
                scope.$apply();
            }*/
        }
    }

    return {
        restrict: 'E',
        templateUrl: 'components/player/player.html',
        link: linkFn,
        transclude: true,
        scope: {
            video: '=video'
        }
    }
}
player.$inject = ['$log', 'moment', 'lodash', '$sce'];