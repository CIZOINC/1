/*global angular*/
angular
    .module('app.directives')
    .directive('listItems', listItems);

/* @ngInject */
function listItems($state, _, playerServ, $timeout) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/list-items/list-items.html',
        link: linkFn,
        transclude: false,
        scope: {
            videos: '=',
            listId: '@'
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {
            videosList: [],
            title: '',
            iconName:  playerServ.getIconName(scope.categoryId),
            moveToPlayPage: moveToPlayPage
        });

        scope.$watch('videos', (videos) => {
            scope.videosList = filterVideos(videos, scope.categoryId);
        });

        scope.$watch('categoryId', () => {
            scope.iconName =  playerServ.getIconName(scope.categoryId);
            scope.title = getCategoryName(scope.categories, scope.categoryId);
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
listItems.$inject = ['$state', 'lodash', 'playerServ', '$timeout'];