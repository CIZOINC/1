/*global angular*/
angular
    .module('app.directives')
    .directive('categoryItems', categoryItems);

/* @ngInject */
function categoryItems($state, _, playerServ) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/category-items/category-items.html',
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
            manyItems: false,
            moveToPlayPage: moveToPlayPage,
            iconName:  playerServ.getIconName(scope.categoryId)
        });

        scope.$watch('videos', (videos) => {
            scope.videosList = filterVideos(videos, scope.categoryId);
        });

        scope.$watch('categories', (categories) => {
            scope.title = getCategoryName(categories, scope.categoryId);
        });


        function filterVideos(videos, id) {
            let videosList;
            if (parseInt(id)) {
                videosList = _.filter(videos, video => video.category_id === parseInt(id));
            } else {
                videosList = videos;
            }
            if (videosList.length > 7) {
                let filteredList = [];
                for (let i = 0; i < 7; i++) {
                    filteredList.push(videosList[i]);
                }

                scope.manyItems = true;

                videosList = filteredList;
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
            $state.go('play', {videoId: id, categoryId: scope.categoryId});
        }
    }
};
categoryItems.$inject = ['$state', 'lodash', 'playerServ'];