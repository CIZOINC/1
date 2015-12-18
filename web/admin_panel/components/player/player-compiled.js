'use strict';

/*global angular*/
angular.module('app.directives', ['app.services']).directive('player', player);

/* @ngInject */
function player($log, moment) {
    "use strict";

    function clickScreen() {}

    function linkFn(scope, element, attrs) {
        function togglePlayPause() {
            var screen = angular.element(document.querySelector("video.screen"))[0];
            var playBtn = angular.element(document.querySelector('div.play-button span'))[0];
            if (screen.paused) {
                screen.play();
                $log.info('start playing');
                playBtn.classList.add('glyphicon-play');
                playBtn.classList.remove('glyphicon-pause');
                scope.$apply();
            } else {
                screen.pause();
                $log.info('set to pause');
                playBtn.classList.add('glyphicon-pause');
                playBtn.classList.remove('glyphicon-play');
                scope.$apply();
            }
        }

        var screen = angular.element(document.querySelector('video.screen'));
        screen.on('click', clickScreen);
        screen.on('timeupdate', function () {
            scope.timePassed = moment().startOf('year').add(screen[0].currentTime, 's').format('mm:ss');
            scope.duration = moment().startOf('year').add(screen[0].duration, 's').format('mm:ss');
            scope.$apply();
        });

        var likeBtn = angular.element(document.querySelector('div.play-button span'));
        likeBtn.on('click', togglePlayPause);
    }

    return {
        restrict: 'E',
        templateUrl: 'components/player/player.html',
        link: linkFn,
        transclude: true,
        scope: {
            width: '@'
        }
    };
}
player.$inject = ['$log', 'moment'];

//# sourceMappingURL=player-compiled.js.map