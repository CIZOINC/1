/*global angular*/
angular
    .module('app.directives')
    .directive('topMenu', topMenu);

/* @ngInject */
function topMenu($state, $anchorScroll) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/top-menu/top-menu.html',
        link: linkFn,
        transclude: false,
        scope: {
            categories: '='
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {
            categoryList: undefined,

            moveToHome: moveToHome,
            categoryClick: categoryClick
        });


        scope.$watch('categories', (newCategories) => {
            if (newCategories) {
                scope.categoryList = [{
                    id: 0,
                    title: 'All'
                }].concat(newCategories);
            }
        });

        function moveToHome() {
            $state.go('home');
        }

        function categoryClick(event, id) {
            if (event) {
                event.stopPropagation();
            }
            $anchorScroll(`category-videos-${id}`);
        }
    }
}

topMenu.$inject = ['$state', '$anchorScroll'];