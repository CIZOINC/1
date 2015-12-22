'use strict';

/*global angular*/
angular.module('app.controls').controller('MainCtrl', MainCtrl);

/* @ngInject */
function MainCtrl($scope, $log) {
    "use strict";

    $scope.trending = 'Trending';
    $scope.categories = 'Categories';
    $scope.videos = 'Videos';
}
MainCtrl.$inject = ['$scope', '$log'];

//# sourceMappingURL=MainCtrl-compiled.js.map