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
        const numberOfVisibleItems = 4;
        const contentWidth = 1220;
        scope = angular.extend(scope, {
            itemsOffset: 0,
            currentStep: 1,


            moveNext: moveNext,
            movePrev: movePrev
        });

        function moveNext() {
            let hasItems = (scope.featuredList.length / (scope.currentStep * numberOfVisibleItems)) > 1;
            if (hasItems) {
                scope.currentStep++;
                scope.itemsOffset = -1 * contentWidth * (scope.currentStep - 1) +'px';
            }
        }

        function movePrev() {
            if (scope.currentStep > 1) {
                scope.currentStep--;
                scope.itemsOffset = -1 * contentWidth * scope.currentStep;
            }
        }
    }
};
featuredCarousel.$inject = ['$http', '$q', '$log', '$sce', '$state'];