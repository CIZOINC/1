/*global angular*/
angular
    .module('app.directives')
    .directive('playItems', playItems);

/* @ngInject */
function playItems($state, _) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/play-items/playItems.html',
        link: linkFn,
        transclude: false,
        scope: {
            videos: '=',
            categoryId: '@',
            categories: '='
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {
            videosList: [],
            title: '',

            moveToPlayPage: moveToPlayPage
        });

        scope.$watch('videos', (videos) => {
            scope.videosList = filterVideos(videos, scope.categoryId);
        });

        scope.$watch('categories', (categories) => {
            scope.title = getCategoryName(categories, scope.categoryId);
            if (scope.title) {
                scope.iconName = scope.title.toLowerCase();
            }
        });


        function filterVideos(videos, id) {
            let videosList;
            if (parseInt(id)) {
                videosList = _.filter(videos, video => video.category_id === parseInt(id));
            } else {
                videosList = videos;
            }
            return videosList;
        }

        function getCategoryName(categories, id) {
            let result;
            if (parseInt(id)) {
                let category = _.find(categories, category => category.id === parseInt(id));
                if (category && category.title) {
                    result = category.title;
                }
            } else {
                result = 'All';
            }
            return result;
        }

        function moveToPlayPage(id) {
            $state.go('play', {videoId: id});
        }
    }
};
playItems.$inject = ['$state', 'lodash'];