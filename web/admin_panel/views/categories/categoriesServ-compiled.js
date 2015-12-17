'use strict';

angular.module('app.services', []).factory('categoriesServ', categoriesServ);

/* @ngInject */
function categoriesServ($http, $q, $log) {
    "use strict";

    return {
        makeCategory: makeCategory,
        getCategory: getCategory,
        setCategory: setCategory,
        deleteCategory: deleteCategory
    };

    function makeCategory(scope, categoryData) {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: scope.hostName + '/categories',
                data: categoryData
            }).then(success, error);

            function success(response) {
                $log.info('category data created');
                resolve(response);
            }

            function error(response) {
                $log.info('category data creation error with status ' + response.status);
                reject(response);
            }
        });
    }

    function getCategory(id) {
        return $q(function (resolve, reject) {
            $http({
                method: 'GET',
                url: $scope.hostName + '/categories/' + id
            }).then(success, error);

            function success(response) {
                $log.info('category data delivered');
                resolve(response);
            }

            function error(response) {
                $log.info('category data getting error with status ' + response.status);
                reject(response);
            }
        });
    }

    function setCategory(id) {
        return $q(function (resolve, reject) {
            $http({
                method: 'PUT',
                url: $scope.hostName + '/categories/' + id
            }).then(success, error);

            function success(response) {
                $log.info('category data updated');
                resolve(response);
            }

            function error(response) {
                $log.info('category data updating error with status ' + response.status);
                reject(response);
            }
        });
    }

    function deleteCategory() {
        return $q(function (resolve, reject) {
            $http({
                method: 'DELETE',
                url: $scope.hostName + '/categories/' + id
            }).then(success, error);

            function success(response) {
                $log.info('category data deleted');
                resolve(response);
            }

            function error(response) {
                $log.info('category data deleting error with status ' + response.status);
                reject(response);
            }
        });
    }
}

categoriesServ.$inject = ['$http', '$q', '$log'];

//# sourceMappingURL=categoriesServ-compiled.js.map