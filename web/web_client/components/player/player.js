/*global angular*/
angular
    .module('app.directives', [])
    .directive('player', player);


/* @ngInject */
function player($log, moment, _, $sce) {
    "use strict";

    function linkFn(scope, element, attrs) {
        function togglePlayPause() {
            let screen = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] video`))[0];
            let playBtn = angular.element(document.querySelector(`div[video-id="${scope.video.id}"] div.play-button span`))[0];
            if (screen.paused) {
                screen.play();
                $log.info('start playing');
                playBtn.classList.add('glyphicon-play');
                playBtn.classList.remove('glyphicon-pause');

                scope.desriptionVisible = false;

                //scope.$apply();
            } else {
                screen.pause();
                $log.info('set to pause');
                playBtn.classList.add('glyphicon-pause');
                playBtn.classList.remove('glyphicon-play');
                //scope.$apply();

                scope.desriptionVisible = true;
            }

        }

        if (scope.video.streams) {
            let stream = _.find(scope.video.streams, (stream) => stream.stream_type === 'mp4');
            scope.videoLink = $sce.trustAs($sce.RESOURCE_URL, stream.link);
        }

        scope.togglePlayPause = togglePlayPause;
        scope.desriptionVisible = true;
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