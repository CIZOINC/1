/*global angular*/
angular
    .module('app.controls')
    .controller('HomeCtrl', HomeCtrl);

/* @ngInject */
function HomeCtrl($scope, videoServ, categoriesServ, $q, _, moment, $rootScope, playerServ) {
    "use strict";

    $scope = angular.extend($scope, {
        featuredList: [],
        featuredItem: undefined
    });

    playerServ.getFeaturedList($scope)
        .then(playerServ.getCategories)
        .then(playerServ.getVideos)
        .then(playerServ.updateVideos);


}
HomeCtrl.$inject = ['$scope', 'videoServ', 'categoriesServ', '$q', 'lodash', 'moment', '$rootScope', 'playerServ'];