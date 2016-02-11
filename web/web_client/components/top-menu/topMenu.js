/*global angular*/
angular
    .module('app.directives')
    .directive('topMenu', topMenu);

/* @ngInject */
function topMenu() {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/top-menu/top-menu.html',
        link: linkFn,
        transclude: false,
        scope: {

        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {

        });
    }
}

topMenu.$inject = ['$http', '$q', '$log', '$sce', '$state'];