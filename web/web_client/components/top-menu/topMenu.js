/*global angular*/
angular
    .module('app.directives')
    .directive('topMenu', topMenu);

/* @ngInject */
function topMenu($state, $anchorScroll, $http, $timeout, $q, $log, playerServ, _) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/top-menu/top-menu.html',
        link: linkFn,
        transclude: false,
        scope: {
            categories: '=',
            hostName: '@',
            videosList: '='
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {
            categoryList: undefined,
            searchText: '',
            searchResult: [],

            moveToHome: moveToHome,
            moveToLogin: moveToLogin,
            categoryClick: categoryClick,
            search: search,
            playFoundVideo: playFoundVideo
        });


        scope.$watch('categories', (newCategories) => {
            if (newCategories) {
                scope.categoryList = newCategories;
                /*scope.categoryList = [{
                    id: 0,
                    title: 'All'
                }].concat(newCategories);*/
            }
        });

        function moveToHome() {
            $state.go('home');
        }

        function moveToLogin() {
            $state.go('login');
        }


        /**
         * scrolls down to selected category on home page and loads category videos with playing first item on others
         * if user hits all category out of the home page then app plays first video on the video list
         *
         * @param event
         * @param id
         */
        function categoryClick(event, id) {
            if (event) {
                event.stopPropagation();
            }

            if ($state.includes('home') || $state.includes('main')) {
                $anchorScroll(`category-videos-${id}`);
            } else {

                if (scope.videosList && scope.videosList.length) {
                    if (Number(id) === 0) {
                        $state.go('play', {videoId: scope.videosList[0].id, categoryId: id});
                    } else {
                        let firstCategoryVideoList = _.filter(scope.videosList, video => video.category_id === Number(id));
                        if (firstCategoryVideoList.length) {
                            $state.go('play', {videoId: firstCategoryVideoList[0].id, categoryId: id});
                        }
                    }
                }
            }


        }

        function search() {
            $timeout(() => {
                if (scope.searchText.length > 2) {
                    searchVideos(scope.hostName, scope.searchText)
                        .then((response) => {
                            if (response.length) {
                                _.each(response, (videoItem) => {
                                    videoItem.iconName = playerServ.getIconName(videoItem.category_id);
                                });

                                scope.searchResult = response;
                            } else {
                                scope.searchResult = [];
                            }
                        });
                } else {
                    scope.searchResult = [];
                }
            }, 200);

        }

        function playFoundVideo(id) {
            scope.searchResult = [];
            scope.searchText = '';
            $state.go('play', { videoId: id, categoryId: 0 })
        }
    }

    function searchVideos(hostName, searchString) {
        return $q(function (resolve, reject) {

            $http({
                method: 'GET',
                url: hostName + `/search`,
                params: {
                    search: searchString
                }
            }).then(success, error);

            function success(response) {
                $log.info('searched videos found');
                resolve(response.data.data);
            }

            function error(response) {
                $log.info('searched videos returned error with status ' + response.status);
                reject(response);
            }
        });
    }
}

topMenu.$inject = ['$state', '$anchorScroll', '$http', '$timeout', '$q', '$log', 'playerServ', 'lodash'];