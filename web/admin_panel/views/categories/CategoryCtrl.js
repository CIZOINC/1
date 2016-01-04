/*global angular*/
angular
    .module('app.controls')
    .controller('CategoryCtrl', CategoryCtrl);

/* @ngInject */
function CategoryCtrl($scope, $log, $state, $stateParams, categoriesServ) {
    "use strict";

    $scope.screenTitle = Number($stateParams.id) > 0 ? 'Edit' : 'Create';

    if (Number($stateParams.id)) {
        categoriesServ.getCategory($scope, $stateParams.id)
            .then(
                function success(response) {
                    $scope.categoryItem = response.data;
                    $log.info('data received');
                },
                function error(response) {
                    $log.error('receiving error happened: ' + response);
                })
    }

    $scope.updateCategory = function() {
        if (Number($stateParams.id)) {
            categoriesServ.setCategory($scope, $stateParams.id, $scope.categoryItem)
                .then(function () {
                        $log.info('successfully sent');
                        $state.go('categories');
                    },
                    function (resp) {
                        $log.info(`error happened with status ${resp.status}`);
                    });
        } else {
            categoriesServ.makeCategory($scope, $scope.categoryItem)
                .then( () => {
                    $state.go('categories');
                });
        }

    };

}
CategoryCtrl.$inject = ['$scope', '$log', '$state', '$stateParams', 'categoriesServ'];
