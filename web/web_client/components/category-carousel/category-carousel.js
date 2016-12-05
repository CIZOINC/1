/*global angular*/
(function(){
    angular
        .module('app.directives')
        .directive('categoryCarousel', categoryCarousel);

    /* @ngInject */
    function categoryCarousel(_, $state, userServ, playerServ) {
        "use strict";
        const numberOfVisibleItems = 4;
        const contentWidth = 1232;

        return {
            restrict: 'E',
            templateUrl: 'components/category-carousel/category-carousel.html',
            link: linkFn,
            transclude: false,
            scope: {
                videos: '=',
                selectedVideo: '=',
                category: '=',
                storage: '=',
                categoryOnly: '@'
            }
        };

        function linkFn(scope) {
            scope = angular.extend(scope, {
                itemsOffset: 0,
                currentStep: 0,
                videosForCategory: [],
                moveNext: moveNext,
                movePrev: movePrev,
                selectVideo: selectVideo,
                replayVideo: selectVideo,
                getIconName: getIconName
            });

            scope.$watch('videos', updateVideos);
            scope.$watch('selectedVideo', updateVideos);

            function isMatureVideo(video) {
                return video.mature_content && !userServ.isUnexpiredToken(scope.storage.token);
            }

            function showMatureVideoScreen() {
                scope.storage.showMatureScreen = true;
            }

            function evalItemsOffset() {
                scope.itemsOffset = -1 * contentWidth * scope.currentStep + 'px';
            }

            function moveNext() {
                let hasItems = scope.videosForCategory.length > (scope.currentStep + 1) * numberOfVisibleItems;
                if (hasItems) {
                    scope.currentStep++;
                    evalItemsOffset();
                }
            }

            function getIconName(category) {
                return playerServ.getIconName(category.id);
            }

            function movePrev() {
                if (scope.currentStep > 0) {
                    scope.currentStep--;
                }
                evalItemsOffset();
            }

            function updateVideos() {
                if (scope.category && scope.category.id) {
                    scope.videosForCategory = _.filter(scope.videos || [], item => item.category_id === scope.category.id);
                } else {
                    scope.videosForCategory = scope.videos || [];
                }
                const videoIdx = _.findIndex(scope.videosForCategory, item => item === scope.selectedVideo);
                if (videoIdx<0) {
                    scope.currentStep = 0;
                } else {
                    scope.currentStep = Math.trunc(videoIdx / numberOfVisibleItems);
                }
                evalItemsOffset();
            }

            function selectVideo(category, video) {
                if (isMatureVideo(video)) {
                    showMatureVideoScreen();
                } else {
                    if (scope.categoryOnly === 'true') {
                        $state.go('play', {videoId: video.id, categoryId: category.id});
                    } else {
                        $state.go('play', {videoId: video.id});
                    }
                }
            }

        }
    }
    categoryCarousel.$inject = ['lodash', '$state', 'userServ', 'playerServ'];
})();
