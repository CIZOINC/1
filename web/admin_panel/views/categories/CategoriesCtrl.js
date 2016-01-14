/*global angular*/
angular
    .module('app.controls')
    .controller('CategoriesCtrl', CategoriesCtrl);

/* @ngInject */
function CategoriesCtrl($scope, $log, $state, categoriesServ) {
    "use strict";

    categoriesServ.getCategoriesList($scope)
        .then(
            function success(response) {
                $scope.categoriesList = response.data.data;
                $log.info('data received');
            },
            function error(response) {
                $log.error('receiving error happened: ' + response);
            });


    $scope.deleteCategory = function (id) {
        categoriesServ.deleteCategory($scope, id)
            .then(() => {
                $state.go($state.current, {}, {reload: true});
            });
    }
}
CategoriesCtrl.$inject = ['$scope', '$log', '$state', 'categoriesServ'];
