/*global angular*/
angular
    .module('app.directives')
    .directive('categoryItems', categoryItems);

/* @ngInject */
function categoryItems($state, $rootScope, _, playerServ, $timeout) {
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
            iconName:  playerServ.getIconName(scope.categoryId),
            moveToCategory: moveToCategory
        });

        scope.$watch('videos', (videos) => {
            scope.videosList = filterVideos(videos, scope.categoryId);
            $timeout(() => {
                _.each(scope.videosList, (video) => {
                    let videoItem = document.querySelector(`#category-play-item-${video.id}`);
                    if (videoItem && video.isWatched) {
                        videoItem.querySelector('.category-items_videos_item_overlay').classList.add('category-items_videos_item_overlay--watched');
                        videoItem.querySelector('.category-items_videos_item_title').classList.add('category-items_videos_item_title--watched');
                        videoItem.querySelector('.icon-play').classList.add('hidden-layer');
                        videoItem.querySelector('.icon-replay').classList.remove('hidden-layer');
                    }
                });
            });
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
            let obj = {videoId: id};
            $rootScope.$emit('replayVideo', obj);
            $rootScope.$broadcast('replayVideo', obj);
            $state.go('play', obj);
        }

        /**
         * app plays first video on the video list
         *
         * @param categoryId
         */
        function moveToCategory(categoryId) {
            $state.go('play', {videoId: scope.videosList[0].id, categoryId: categoryId});
        }
    }
};
categoryItems.$inject = ['$state', '$rootScope', 'lodash', 'playerServ', '$timeout'];