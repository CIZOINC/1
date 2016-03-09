/*global angular*/
angular
    .module('app.directives')
    .directive('leftSideMenu', leftSideMenu);

/* @ngInject */
function leftSideMenu($state) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/left-side-menu/left-side-menu.html',
        link: linkFn,
        transclude: false,
        scope: {
            storage: '='
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {
            isMenuVisible: false,
            searchText: '',
            searchResult: [],

            menuContainer: document.querySelector('.menu_container'),
            menuContainerOuter: document.querySelector('.menu_container_outer'),

            toggleSideMenu: toggleSideMenu,
            goHome: goHome
        });

        function _applyClass(state, element, className) {
            if (state) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
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

        function goHome() {
            $state.go('home');
        }

    }

}

leftSideMenu.$inject = ['$state'];