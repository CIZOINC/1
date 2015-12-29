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
            imageBlur: imageBlur
        });

        let imageLayer = element[0].querySelector('.row');
        angular.element(imageLayer).bind('mouseenter', imageHover);
        angular.element(imageLayer).bind('mouseleave', imageBlur);
        angular.element(imageLayer).bind('click', togglePlayPause);
        if (scope.video.streams) {
            let stream = _.find(scope.video.streams, (stream) => stream.stream_type === 'mp4');
            scope.videoLink = $sce.trustAs($sce.RESOURCE_URL, stream.link);
        }

        function categoryIcon(id) {
            let iconMap = {
                '11': 'Movie',
                '12': 'TV',
                '13': 'Games',
                '14': 'Lifestyle'
            };

            return iconMap[String(id)];
        }

        function imageHover() {
            let textOverlayLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] div.text-overlay-layer`))[0];
            let screen = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] video`))[0];

            if (screen.paused) {
                textOverlayLayer.classList.remove('hidden-layer');
            }
        }

        function imageBlur() {
            let textOverlayLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] div.text-overlay-layer`))[0];
            textOverlayLayer.classList.add('hidden-layer');
        }

        function togglePlayPause() {
            let screen = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] video`))[0];
            //let playBtn = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] div.play-button span`))[0];

            let videoLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] div.video-layer`))[0];
            let imageLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] div.hero-image-layer`))[0];
            let playButtonLayer = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] div.play-button-layer`))[0];

            if (screen.paused) {
                screen.play();
                $log.info('start playing');
                //playBtn.classList.add('glyphicon-play');
                //playBtn.classList.remove('glyphicon-pause');

                videoLayer.classList.remove('hidden-layer');
                imageLayer.classList.add('hidden-layer');
                playButtonLayer.classList.add('hidden-layer');

                scope.descriptionVisible = true;
                scope.$apply();
                imageBlur();

            } else {
                screen.pause();
                $log.info('set to pause');
                //playBtn.classList.add('glyphicon-pause');
                //playBtn.classList.remove('glyphicon-play');

                videoLayer.classList.add('hidden-layer');
                imageLayer.classList.remove('hidden-layer');
                playButtonLayer.classList.remove('hidden-layer');

                scope.descriptionVisible = false;
                scope.$apply();
                imageHover();
            }

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