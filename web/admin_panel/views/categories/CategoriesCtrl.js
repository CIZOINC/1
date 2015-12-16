/*global angular*/
angular
    .module('app.controls')
    .controller('CategoriesCtrl', CategoriesCtrl);

/* @ngInject */
function CategoriesCtrl($scope, $log) {
    "use strict";

    let t = 3;
}

CategoriesCtrl.$inject = ['$scope', '$log'];
