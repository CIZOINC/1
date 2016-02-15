/*global angular*/
angular
    .module('app.directives')
    .directive('categoryItems', categoryItems);

/* @ngInject */
function categoryItems($http, $q, $log, $sce, $state) {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'components/category-items/category-items.html',
        link: linkFn,
        transclude: false,
        scope: {
            videos: '=',
            title: '@',
            iconName: '@'
        }
    };

    function linkFn(scope) {
        scope = angular.extend(scope, {

        });
    }
};
categoryItems.$inject = ['$http', '$q', '$log', '$sce', '$state'];