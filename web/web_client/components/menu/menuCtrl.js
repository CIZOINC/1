/*global angular*/
angular
    .module('app.directives')
    .directive('menu', menu);

/* @ngInject */
function menu($http, $q, $log, $sce) {
    "use strict";
    function linkFn(scope) {
        const debounceSearchWaitTime = 600;
        scope = angular.extend(scope, {
            isMenuVisible: true,
            searchText: '',
            searchResult: [],

            menuContainer: document.querySelector('.menu_container'),
            navbar: document.querySelector('.navbar'),
            menuContainerOuter: document.querySelector('.menu_container_outer'),
            categoriesPanel: document.querySelector('.categories-panel'),

            mainMenu: document.querySelector('.navbar-main'),
            searchMenu: document.querySelector('.navbar_search'),

            backToMainButton: document.querySelector('.navbar_search_back'),
            searchInput: document.querySelector('.navbar_search_input'),
            clearSearchButton: document.querySelector('.navbar_search_clear'),

            toggleMenu: toggleMenu,
            toggleMenuType: toggleMenuType,
            clearSearchInput: clearSearchInput,
            searchInputUpdate: searchInputUpdate,
            categoryIconMap: categoryIconMap,
            debouncedSearch: _.debounce(() => {
                getSearchData(scope.searchText)
                    .then((result) => {
                        scope.searchResult = result.data.data;
                    });
            }, debounceSearchWaitTime)
        });

        function _applyClass(state, element, className) {
            if (state) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        }

        function toggleMenu(state) {
            let isVisible = typeof state !== 'undefined' ? state : scope.isMenuVisible;

            if (isVisible) {
                scope.isMenuVisible = false;
                scope.menuContainer.classList.remove('menu_container--menu-visible');
                scope.navbar.classList.remove('navbar--menu-visible');
                scope.menuContainerOuter.classList.remove('menu_container_outer--menu-visible');
                scope.categoriesPanel.classList.remove('categories-panel--menu-visible');
            } else {
                scope.isMenuVisible = true;
                scope.menuContainer.classList.add('menu_container--menu-visible');
                scope.navbar.classList.add('navbar--menu-visible');
                scope.menuContainerOuter.classList.add('menu_container_outer--menu-visible');
                scope.categoriesPanel.classList.add('categories-panel--menu-visible');
            }
        }

        function toggleMenuType(isSearch) {
            _applyClass(!isSearch, scope.searchMenu, 'hidden-layer');
            _applyClass(isSearch, scope.mainMenu, 'hidden-layer');
            if (isSearch) {
                scope.searchInput.focus();
            }
        }

        function clearSearchInput() {
            scope.searchText = '';
            scope.searchResult = [];
            scope.searchInput.focus();
        }

        function getSearchData(searchText) {
            return $q((resolve) => {
                $http({
                    method: 'GET',
                    url: `${scope.host}/search?search=${searchText}`
                }).then(success, error);

                function success(response) {
                    $log.info('search list obtained');
                    resolve(response);
                }

                function error(response) {
                    $log.info(`search list obtaining error with status ${response.status}`);
                    reject(response);
                }
            })
        }

        function searchInputUpdate() {
            if (scope.searchText.length > 2) {
                scope.debouncedSearch();
            }
        }

        function categoryIconMap(id) {
            let iconMap = {
                '11': 'movie',
                '12': 'tv',
                '13': 'games',
                '14': 'lifestyle'
            };
            return $sce.trustAsHtml(iconMap[String(id)]);
        }

}
    return {
        restrict: 'E',
        templateUrl: 'components/menu/menu.html',
        link: linkFn,
        transclude: false,
        scope: {
            host: '='
        }
    }
}

menu.$inject = ['$http', '$q', '$log', '$sce'];