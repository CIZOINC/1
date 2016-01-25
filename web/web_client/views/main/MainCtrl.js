/*global angular*/
angular
    .module('app.controls')
    .controller('MainCtrl', MainCtrl);

/* @ngInject */
function MainCtrl($scope, videoServ, categoriesServ, $q, _, $document) {
    "use strict";

    $scope = angular.extend($scope, {
        filteredVideoList: [],
        videosList: [],
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



    function filterByCategory(id) {
        $scope.filterCategory.category_id = id;

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



}
MainCtrl.$inject = ['$scope', 'videoServ', 'categoriesServ', '$q', 'lodash', '$document'];