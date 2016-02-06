/*global angular*/
angular
    .module('app.directives')
    .directive('menu', menu);

/* @ngInject */
function menu() {
    "use strict";
    function linkFn(scope) {

        scope = angular.extend(scope, {
            isMenuVisible: true,

            menuContainer: document.querySelector('.menu_container'),
            navbar: document.querySelector('.navbar'),
            menuContainerOuter: document.querySelector('.menu_container_outer'),
            categoriesPanel: document.querySelector('.categories-panel'),

            toggleMenu: toggleMenu
        });

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
}
    return {
        restrict: 'E',
        templateUrl: 'components/menu/menu.html',
        link: linkFn,
        transclude: false,
        scope: {}
    }
}

menu.$inject = [];