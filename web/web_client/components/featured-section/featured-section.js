/*global angular*/
angular
    .module('app.directives')
    .directive('featuredSection', featuredSection);


/* @ngInject */
function featuredSection(_, $state, playerServ) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/featured-section/featured-section.html',
        link: linkFn,
        scope: {
            video: '=',
            featuredList: '=',
            featuredItem: '=',
            categoriesList: '=',
            hostName: '@',
            storage: '=',
            videos: '='
        }
    };


    function linkFn(scope, element, attrs) {
        scope = angular.extend(scope, {
            category: undefined,
            featuredListCut: (scope.featuredList || []).slice(0, 4),
            getIconName: getIconName,
            selectVideo: selectVideo,
            playVideo: playVideo,
            scroll: scroll
        });

        function onFeaturesUpdate() {
            scope.featuredListCut = (scope.featuredList || []).slice(0, 4);
        }

        function onVideoUpdate() {
            scope.category = scope.categoriesList && scope.categoriesList.find(item => item.id === scope.video.category_id);
        }

        function getIconName(category) {
            return category && playerServ.getIconName(category.id);
        }

        function selectVideo(video) {
            scope.video = video;
        }

        function scroll(scrollBy) {
            if (!scope.featuredListCut.length) return;

            let idx = scope.featuredListCut.indexOf(scope.video);
            idx = idx + scrollBy;
            if (idx<0) {
                idx += scope.featuredListCut.length;
            } else
            if (idx>=scope.featuredListCut.length) {
                idx -= scope.featuredListCut.length;
            }
            scope.video = scope.featuredListCut[idx];
        }

        function playVideo(video) {
            $state.go('play', {videoId: video.id});
        }

        onFeaturesUpdate();
        onVideoUpdate();
        scope.$watchCollection('featuredList', onFeaturesUpdate);
        scope.$watchCollection('video', onVideoUpdate);
    }


}
featuredSection.$inject = ['lodash', '$state', 'playerServ'];