'use strict';

/*global angular*/
angular.module('app.directives', []).directive('player', player);

player.$inject = ['$log', 'moment'];

function player($log, moment) {
    "use strict";

    function clickScreen() {
        //alert('screeeen!');
    }

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
            scope.timePassed = moment().startOf('year').add(screen[0].currentTime, 's').format('mm:ss'); //moment({seconds: screen[0].currentTime}).format('mm:ss'); // getMinutes(screen[0].currentTime) + ':' +getSeconds(screen[0].currentTime);
            scope.duration = moment().startOf('year').add(screen[0].duration, 's').format('mm:ss'); //moment({seconds: screen[0].duration}).format('mm:ss'); // getMinutes(screen[0].duration) + ':' +getSeconds(screen[0].duration);
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

//# sourceMappingURL=player-compiled.js.map