'use strict';

(function () {
    angular.module('app.page')
        .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
        .controller('authCtrl', ['$scope', '$window', '$location', '$http', authCtrl]);

    function invoiceCtrl($scope, $window) {
        var printContents, originalContents, popupWin;

        $scope.printInvoice = function () {
            printContents = document.getElementById('invoice').innerHTML;
            originalContents = document.body.innerHTML;
            popupWin = window.open();
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">' + printContents + '</html>');
            popupWin.document.close();
        };
    }

    function authCtrl($scope, $window, $location, $http) {
        if ($location.search().logout) {
            delete $window.sessionStorage.token;
        }

        function authenticate(apiUsername, apiPassword, $window, $http, callback) {
            var authBody = {
                grant_type: 'password',
                username: apiUsername,
                password: apiPassword,
                scope: 'admin'
            };

            $http({
                method: 'POST',
                url: 'https://staging.cizo.com/oauth/token',
                data: authBody
            }).then(function successCB(response) {
                $window.sessionStorage.token = response.data.access_token;
                callback(null, response.data);
            }, function errorCB(response) {
                callback(response.data);
            });
        }

        $scope.userLogin = function () {
            if ($scope.user_email && $scope.user_password) {
                $scope.invalidLogin = false;
                authenticate($scope.user_email, $scope.user_password, $window, $http, function (err, res) {
                    if (err) {
                        $window.sessionStorage.token = undefined;
                        $scope.invalidLogin = true;
                        throw new Error(err);
                    } else {
                        $location.url('/dashboard');
                    }
                });
            } else {
                $window.sessionStorage.token = undefined;
                $scope.invalidLogin = true;
            }
        };

        var init = function init() {
            if ($window.sessionStorage.token) {
                $location.url('/dashboard');
            }
        };

        init();

        $scope.login = function () {
            $location.url('/');
        };

        $scope.signup = function () {
            $location.url('/');
        };

        $scope.reset = function () {
            $location.url('/');
        };

        $scope.unlock = function () {
            $location.url('/');
        };
    }
})();
