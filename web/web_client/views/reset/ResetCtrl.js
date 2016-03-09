/*global angular*/
angular
    .module('app.controls')
    .controller('ResetCtrl', ResetCtrl);

/* @ngInject */
function ResetCtrl($scope, $state, userServ, storageServ) {
    "use strict";


    $scope = angular.extend($scope, {
        login: {
            email: '',
            password: ''
        }
    });


}

ResetCtrl.$inject = ['$scope', '$state', 'userServ', 'storageServ'];