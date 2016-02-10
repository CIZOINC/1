/*global angular*/
angular
    .module('app.controls')
    .controller('LoginCtrl', LoginCtrl);

/* @ngInject */
function LoginCtrl($scope, $state, userServ) {
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
        })
    }

    function registerClick() {
        $state.go('register');
    }
}

RegisterCtrl.$inject = ['$scope', '$state', 'userServ'];