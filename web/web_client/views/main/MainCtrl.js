/*global angular*/
angular
    .module('app.controls')
    .controller('MainCtrl', MainCtrl);

/* @ngInject */
function MainCtrl($scope, videoServ, categoriesServ, $q, _, $document) {
    "use strict";

    const selectedMenuItemCSSClass = 'categories-panel_item categories-panel_item--selected';
    const baseMenuItemCSSClass = 'categories-panel_item';

    $scope = angular.extend($scope, {
        filteredVideoList: [],
        featuredList: [],
        videosList: [],

        categories: {
            0: {
                icon: 'all',
                selected: true,
                cssClass: selectedMenuItemCSSClass
            },
            11: {
                icon: 'categorymovie',
                selected: false,
                cssClass: baseMenuItemCSSClass
            },
            12: {
                icon: 'categorytv',
                selected: false,
                cssClass: baseMenuItemCSSClass
            },
            13: {
                icon: 'categorygames',
                selected: false,
                cssClass: baseMenuItemCSSClass
            },
            14: {
                icon: 'categorylifestyle',
                selected: false,
                cssClass: baseMenuItemCSSClass
            }
        },
        needFullscreen: false,
        isMenuVisible: false,
        filterCategory: {
            category_id: ''
        },
        filterByCategory: filterByCategory,
        toggleMenu: toggleMenu
    });

    getCategories()
        .then(getVideos)
        .then(updateVideos);

    getFeaturedList();

    function filterByCategory(id) {
        $scope.filterCategory.category_id = id;
        let categoryId = id ? id : 0;
        _.each($scope.categories, (category) => {
            category.selected = false;
            category.cssClass = baseMenuItemCSSClass;
        });
        if ($scope.categories && $scope.categories[categoryId]) {
            $scope.categories[categoryId].selected = true;
            $scope.categories[categoryId].cssClass = selectedMenuItemCSSClass;
        }

        if (id) {
            $scope.filteredVideoList = _.filter($scope.videosList, item => item.category_id === id);
        } else {
            $scope.filteredVideoList = $scope.videosList;
        }
    }

    function toggleMenu(state) {
        let isVisible = typeof state !== 'undefined' ? state : $scope.isMenuVisible;

        let menuContainer = document.querySelector('.menu_container');
        let navbar = document.querySelector('.navbar');
        let menuContainerOuter = document.querySelector('.menu_container_outer');
        let categoriesPanel = document.querySelector('.categories-panel');

        if (isVisible) {
            $scope.isMenuVisible = false;
            menuContainer.classList.remove('menu_container--menu-visible');
            navbar.classList.remove('navbar--menu-visible');
            menuContainerOuter.classList.remove('menu_container_outer--menu-visible');
            categoriesPanel.classList.remove('categories-panel--menu-visible');
        } else {
            $scope.isMenuVisible = true;
            menuContainer.classList.add('menu_container--menu-visible');
            navbar.classList.add('navbar--menu-visible');
            menuContainerOuter.classList.add('menu_container_outer--menu-visible');
            categoriesPanel.classList.add('categories-panel--menu-visible');
        }
    }

    function getCategories() {
        return $q( (resolve) => {
            categoriesServ.getCategoriesList($scope)
                .then( (response) => {
                    $scope.categoriesList = response.data.data;
                    resolve();
                });
        });
    }

    function getVideos() {
        return $q( (resolve) => {
            videoServ.getVideosList($scope)
                .then( (response) => {
                    $scope.videosList = _.filter(response.data.data, item => item.hero_image_link && item.streams.length)  ;
                    resolve();
                });
        });
    }

    function updateVideos() {
        _.each($scope.videosList, (video) => {
            let category = _.find($scope.categoriesList, (category) => {
                return category.id === video.category_id;
            });
            if (category) {
                video.categoryName = category.title;
            }
            video.isWatching = false;
            video.isFullscreen = false;
            filterByCategory();
        });
    }

    function getFeaturedList() {
        return $q( (resolve) => {
            videoServ.getFeaturedList($scope)
                .then( (response) => {
                    $scope.featuredList = response.data.data;
                    $scope.featuredItem = $scope.featuredList[0];
                    resolve();
                });
        });
    }

}
MainCtrl.$inject = ['$scope', 'videoServ', 'categoriesServ', '$q', 'lodash', '$document'];