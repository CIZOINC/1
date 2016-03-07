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
            listType: '@'
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {
            videosList: [],
            title: '',
            iconName:  playerServ.getIconName(scope.categoryId),
            message: undefined,
            isListShown: false,
            moveToPlayPage: moveToPlayPage,
            moveToHomePage: moveToHomePage
        });

        scope.$watch('videos', (videos) => {
            scope.videosList = videos;
            scope.isListShown = videos.length;
        });

        scope.$watch('listType', (oldType, newType) => {
            scope.message = getMessage(newType);
        });

        function getMessage(name) {
            switch (name) {
                case 'seen':
                    return {
                        iconName: 'icon-seen',
                        title: 'Seen',
                        noItemsTitle: 'You haven\'t seen any vids',
                        noItemsDescription: 'Choose and see any video up to the end'
                     };
                break;
                case 'unseen':
                    return {
                        iconName: 'icon-unseen',
                        title: 'Unseen',
                        noItemsTitle: 'You have no unseen vids',
                        noItemsDescription: 'Visit us next time'
                    };
                break;
                case 'skipped':
                    return {
                        iconName: 'icon-skipped',
                        title: 'Skipped',
                        noItemsTitle: 'You haven\'t skipped any vids',
                        noItemsDescription: ''
                    };
                break;
                case 'favorite':
                    return {
                        iconName: 'icon-favorites',
                        title: 'Favorites',
                        noItemsTitle: 'You haven\'t favorited any vids',
                        noItemsDescription: 'Find a video you like? Add it to your favorites.'
                    };
                break;
            }

        }


        function moveToPlayPage(id) {
            $state.go('play', {videoId: id});
        }

        function moveToHomePage() {
            $state.go('home');
        }
    }
};
listItems.$inject = ['$state', 'lodash', 'playerServ', '$timeout'];