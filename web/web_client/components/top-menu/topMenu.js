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
            videosList: '=',
            storage: '=',
            showAdvanced: '='
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
            playFoundVideo: playFoundVideo,
            toggleSideMenu: toggleSideMenu,
            logout: logout,
            onShowAdvanced: () => scope.showAdvanced
        });


        scope.$watch('categories', (newCategories) => {
            if (newCategories) {
                scope.categoryList = newCategories;
            }
        });

        function moveToHome() {
            $state.go('home');
        }

        function moveToLogin() {
            $state.go('login');
        }


        /**
         * app plays first video on the video list
         *
         * @param event
         * @param category
         */
        function categoryClick(event, category) {
            if (event) {
                event.stopPropagation();
            }
            let id = category.id;
            let videos = scope.$parent.videos ? scope.$parent.videos : scope.videosList;
            if (!category.empty) {
                let firstCategoryVideoList = _.filter(videos, video => video.category_id === Number(id));
                if (firstCategoryVideoList.length) {
                    $state.go('play', {videoId: firstCategoryVideoList[0].id, categoryId: id});
                }
            }


        }

        function logout() {
            playerServ.userLogout(scope.storage);
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

        function toggleSideMenu() {
            let sideMenu = document.querySelector('left-side-menu .menu_container');
            let sideMenuOuter = document.querySelector('left-side-menu .menu_container_outer');
            let sideMenuVisibleSelector = 'menu_container--menu-visible';
            let sideMenuOuterVisibleSelector = 'menu_container_outer--menu-visible';
            if (sideMenu.classList.contains(sideMenuVisibleSelector)) {
                sideMenu.classList.remove(sideMenuVisibleSelector);
                sideMenuOuter.classList.remove(sideMenuOuterVisibleSelector);
            } else {
                sideMenu.classList.add(sideMenuVisibleSelector);
                sideMenuOuter.classList.add(sideMenuOuterVisibleSelector);
            }
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