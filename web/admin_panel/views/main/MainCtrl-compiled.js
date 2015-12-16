'use strict';

/*global angular*/
angular.module('app.controls').controller('MainCtrl', MainCtrl);

/* @ngInject */
function MainCtrl($scope) {
    "use strict";

    $scope.trending = 'Trending';
    $scope.categories = 'Categories';
    $scope.videos = 'Videos';
}
MainCtrl.$inject = ['$scope'];

//# sourceMappingURL=MainCtrl-compiled.js.map