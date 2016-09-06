/*global angular*/
angular
    .module('app.directives')
    .directive('featuredCarousel', featuredCarousel);

/* @ngInject */
function featuredCarousel( _) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/featured-carousel/featured-carousel.html',
        link: linkFn,
        transclude: false,
        scope: {
            featuredList: '=',
            selectedVideo: '=',
            replay: '&onReplay'
        }
    };

    function linkFn(scope) {
        const numberOfVisibleItems = 4;
        const contentWidth = 1220;
        scope = angular.extend(scope, {
            itemsOffset: 0,
            currentStep: 1,
            playFeatured: playFeatured,
            moveNext: moveNext,
            movePrev: movePrev
        });

        function playFeatured(id) {
            let selected = _.find(scope.featuredList, featured => featured.id === parseInt(id));
            selected.instantPlay = true;
            scope.selectedVideo = selected;
            scope.$emit('replayVideo', {videoId: selected.id});
            scope.$broadcast('replayVideo', {videoId: selected.id});
        }

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
                scope.itemsOffset = -1 * contentWidth * (scope.currentStep - 1) +'px';
            }
        }
    }
};
featuredCarousel.$inject = ['lodash'];