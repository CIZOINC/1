/*global angular*/
angular
    .module('app.directives')
    .directive('featuredCarousel', featuredCarousel);

/* @ngInject */
function featuredCarousel($http, $q, $log, $sce, $state) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/featured-carousel/featured-carousel.html',
        link: linkFn,
        transclude: false,
        scope: {
            featuredList: '='
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {

        });
    }
};
featuredCarousel.$inject = ['$http', '$q', '$log', '$sce', '$state'];