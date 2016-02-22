/*global angular*/
angular
    .module('app.controls')
    .controller('LoginCtrl', LoginCtrl);

/* @ngInject */
function LoginCtrl($scope, $state, userServ, storageServ) {
    "use strict";


    $scope = angular.extend($scope, {
        login: {
            email: '',
            password: ''
        },

        processLogin: processLogin,
        registerClick: registerClick
    });

    function processLogin() {
        userServ.login($scope.hostName, {
            login: $scope.login.email,
            password: $scope.login.password
        }).then((response) => {
            storageServ.setItem($scope.storage.storageUserToken, response.data);
            $scope.storage.token = response.data;
            $state.go('home');
        });
    }

    function registerClick() {
        $state.go('register');
    }
}

LoginCtrl.$inject = ['$scope', '$state', 'userServ', 'storageServ'];