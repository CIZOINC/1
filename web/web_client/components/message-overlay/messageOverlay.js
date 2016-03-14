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

    function linkFn(scope) {
        scope = angular.extend(scope, {
            closeView: closeView
        });

        function closeView() {
            if (scope.params && scope.params.callback && typeof scope.params.callback === 'function') {
                scope.params.callback();
            }
            scope.params.isVisible = false;
        }


    }




}

messageOverlay.$inject = [];