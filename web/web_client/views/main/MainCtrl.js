/*global angular*/
angular
    .module('app.controls')
    .controller('MainCtrl', MainCtrl);

/* @ngInject */
function MainCtrl($scope, videoServ, categoriesServ, $q, _, $document, $timeout, storageServ) {
    "use strict";

    const selectedMenuItemCSSClass = 'categories-panel_item categories-panel_item--selected';
    const baseMenuItemCSSClass = 'categories-panel_item';

    $scope = angular.extend($scope, {
        filteredVideoList: [],
        featuredList: [],
        videosList: [],
        isFeaturedScrolled: false,

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
        toggleMenu: toggleMenu,

        featuredMouseDown: featuredMouseDown,
        featuredMouseUp: featuredMouseUp,
        featuredMouseMove: featuredMouseMove,
        featuredPlay: featuredPlay
    });

    getCategories()
        .then(getVideos)
        .then(updateVideos)
        .then(updateVideosSeenStatus);

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

    function featuredMouseDown(event) {
        $scope.isFeaturedScrolled = true;
        $scope.featuredScrollLeft = event.pageX;
        console.log('mouse down');
    }

    function featuredMouseUp() {
        $scope.isFeaturedScrolled = false;
        console.log('mouse up');
    }

    function featuredMouseMove(event) {
        if (!$scope.isFeaturedScrolled) {
            return;
        }
        let featured = document.querySelectorAll('.featured')[0];
        featured.scrollLeft = featured.scrollLeft - (event.pageX - $scope.featuredScrollLeft) / 20;
    }

    function featuredPlay(event) {
        if (event) {
            event.stopPropagation();
        }
        else {
            return;
        }
        let featureId = parseInt(event.target.id.replace('featured-', ''));
        let featuredIndex = _.findIndex($scope.featuredList, video => video.id === featureId);

        let firstVideo = angular.extend({}, $scope.featuredList[featuredIndex]);
        $scope.featuredList.splice(featuredIndex, 1);
        $scope.featuredList.unshift(firstVideo);
        let featured = document.querySelectorAll('.featured')[0];

        let featuredPlayer = document.querySelectorAll('featured-player')[0];
        featuredPlayer.classList.remove('hidden-layer');
        featured.scrollLeft = 0;

        $timeout(function () {
            $scope.featuredItem = $scope.featuredList[0];
        });
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
        return $q( (resolve) => {
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
            resolve($scope.videosList);
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

    function updateVideosSeenStatus(videosList) {
        return $q( (resolve) => {
            let $scope.storage.seenItems = storageServ.getItem($scope.storage.storageSeenKey) || [];
            _.each(videosList, (video) => {
                video.isSeen = !!seenItems[video.id];
            });
            resolve();
        });
    }

}
MainCtrl.$inject = ['$scope', 'videoServ', 'categoriesServ', '$q', 'lodash', '$document', '$timeout', 'storageServ'];