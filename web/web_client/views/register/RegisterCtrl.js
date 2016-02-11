/*global angular*/
angular
    .module('app.controls')
    .controller('RegisterCtrl', RegisterCtrl);

/* @ngInject */
function RegisterCtrl($scope, $log, userServ, moment) {
    "use strict";

    let months = [
        { 'key': 0, 'name': 'January'},
        { 'key': 1, 'name': 'February'},
        { 'key': 2, 'name': 'March'},
        { 'key': 3, 'name': 'April'},
        { 'key': 4, 'name': 'May'},
        { 'key': 5, 'name': 'June'},
        { 'key': 6, 'name': 'July'},
        { 'key': 7, 'name': 'August'},
        { 'key': 8, 'name': 'September'},
        { 'key': 9, 'name': 'October'},
        { 'key': 10, 'name': 'November'},
        { 'key': 11, 'name': 'December'}
    ];

    $scope = angular.extend($scope, {
        register: {
            email: '',
            password: '',
            month: 0,
            day: '',
            year: ''
        },
        months: months,

        registerUser: registerUser,
        facebookRegister: facebookRegister
    });

    function registerUser() {
        let birthday = moment({
            year: $scope.register.year,
            month: $scope.register.month.key + 1,
            day: $scope.register.day
        });

        if (birthday.isValid()) {
            userServ.registerUser($scope.hostName, {
                email: $scope.register.email,
                password: $scope.register.password,
                password_confirmation: $scope.register.password,
                birthday: birthday.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
            });
        } else {
            $log.log('date error');
        }
    }

    function facebookRegister() {
        userServ.facebookAuth($scope.hostName);
    }
}

RegisterCtrl.$inject = ['$scope', '$log', 'userServ', 'moment'];