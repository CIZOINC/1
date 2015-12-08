'use strict';

/*global angular*/
angular.module('app.controls', []).controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope'];

function MainCtrl($scope) {
    "use strict";

    $scope.trending = 'Trending';
    $scope.categories = 'Categories';
    $scope.videos = 'Videos';
}

//# sourceMappingURL=MainCtrl-compiled.js.map