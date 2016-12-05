/*global angular*/
angular
    .module('app.directives')
    .directive('listItems', listItems);

/* @ngInject */
function listItems($state, $rootScope, _, playerServ, userServ, $timeout) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/list-items/list-items.html',
        link: linkFn,
        transclude: false,
        scope: {
            videos: '=',
            selectedVideo: '=',
            storage: '=',
            listType: '@',
            tagName: '@',
            categoryName: '@'
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {
            videosList: [],
            title: '',
            iconName: playerServ.getIconName(scope.categoryId),
            message: undefined,
            isListShown: false,
            isListLoaded: false,
            moveToPlayPage: moveToPlayPage,
            moveToHomePage: moveToHomePage
        });

        scope.$watch('videos', (videos) => {
            scope.isListLoaded = true;
            scope.videosList = videos;
            scope.isListShown = videos.length;
        });

        scope.$watch('listType', (oldType, newType) => {
            if (oldType.length) {
                scope.message = getMessage(oldType);
            }
            if (newType.length) {
                scope.message = getMessage(newType);
            }
        });

        if (scope.tagName) {
            scope.listType = 'listTag';
        }

        if (scope.categoryName) {
            scope.listType = 'category';
        }

        function getMessage(name) {
            function returner(originObj) {
                let newObj = {};
                let isAuth = scope.storage.userAuthorized;
                _.each(originObj, function (item, key) {
                    if (!item.hasOwnProperty('authValue')) {
                        newObj[key] = item;
                    }
                    if (item.hasOwnProperty('authValue')) {
                        if (isAuth && item.authValue) {
                            newObj[key] = item.authValue;
                        } else if (!isAuth && item.value) {
                            newObj[key] = item.value;
                        }
                    }
                });
                return newObj;
            }

            switch (name) {
                // all categories
                case 'all':
                    return {
                        iconName: '',
                        title: 'All',
                        noItemsTitle: 'There are no videos at all. Stay tuned.'
                    };
                    break;
                // all categories
                case 'category':
                    return {
                        iconName: '',
                        title: scope.categoryName,
                        noItemsTitle: 'There are no videos in this category. Stay tuned.'
                    };
                    break;
                case 'listTag':
                    return {
                        iconName: '',
                        title: `Filtered by ${scope.tagName}`,
                        noItemsTitle: 'There are no videos with this tag. Stay tuned.'
                    };
                    break;
                case 'seen':
                    return {
                        iconName: 'icon-seen',
                        title: 'Seen',
                        noItemsTitle: 'You haven\'t WATCHED ANY VIDEOS, THAT MAKES US SAD. DON\'T MAKE US SAD.'
                    };
                    break;
                case 'unseen':
                    return {
                        iconName: 'icon-unseen',
                        title: 'Unseen',
                        noItemsTitle: 'BRACE YOURSELF, NEW VIDEOS ARE COMING...'
                    };
                    break;
                case 'skipped':
                    return {
                        iconName: 'icon-skipped',
                        title: 'Skipped',
                        noItemsTitle: 'YOU HAVEN\'T SKIPPED ANY VIDEOS. YOU\'RE A TRUE PATRIOT.',
                        noItemsDescription: ''
                    };
                    break;
                case 'favorite':
                    let msgObj = {
                        iconName: 'icon-favorites',
                        title: 'Favorites',
                        noItemsTitle: {
                            value: 'TO SEE YOUR FAVORITES, LOGIN OR SIGN UP.',
                            authValue: 'YOU HAVEN\'T LIKED ANY VIDEOS... YET'
                        },
                        noItemsDescription: {
                            value: 'See something you like? Just tap the heart!',
                            authValue: ''
                        }
                    };
                    return returner(msgObj);
                    break;
            }

        }

        function isMatureVideo(video) {
            const isMatureVideo = video.mature_content && !userServ.isUnexpiredToken(scope.storage.token);
            if (isMatureVideo) {
                scope.storage.showMatureScreen = true;
            }
            return isMatureVideo;
        }

        function moveToPlayPage(video) {
            if (isMatureVideo(video)) {
                return;
            }
            let obj = {videoId: video.id};
            if (scope.listType === 'category') {
                obj.categoryId = video.category_id;
            }
            $rootScope.$emit('replayVideo', obj);
            $rootScope.$broadcast('replayVideo', obj);
            $state.go('play', obj);
        }

        function moveToHomePage() {
            $state.go('home');
        }
    }
}

listItems.$inject = ['$state', '$rootScope', 'lodash', 'playerServ', 'userServ', '$timeout'];