/*global angular*/
angular
    .module('app.directives')
    .directive('messageOverlay', messageOverlay);

/* @ngInject */
function messageOverlay() {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/message-overlay/message-overlay.html',
        link: linkFn,
        transclude: false,
        scope: {
            params: '='
        }
    };

    function linkFn(scope, element) {
        scope = angular.extend(scope, {
            closeView: closeView
        });

        function closeView() {
            angular.element(element[0])[0].classList.add('hidden-layer');
            if (scope.params && scope.params.callback && typeof scope.params.callback === 'function') {
                scope.params.callback();
            }
        }


    }




}

messageOverlay.$inject = [];