/*global angular*/
angular
    .module('app.services')
    .factory('userServ', userServ);

/* @ngInject */
function userServ($http, $q, $log) {
    "use strict";

    return {
        registerUser: registerUser,
        login: login
    };


    function registerUser(hostName, userData) {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: hostName + '/users',
                data: {
                    user: userData
                }
            }).then(success, error);

            function success(response) {
                $log.info('user registered');
                resolve(response);
            }

            function error(response) {
                $log.info('user register obtaining error with status ' + response.status);
                reject(response);
            }
        });
    }

    function login(hostName, loginData) {
        $http({
            method: 'POST',
            url: hostName + `/oauth/token?grant_type=password&username=${loginData.login}&password=${loginData.password}`
        }).then(success, error);

        function success(response) {
            $log.info('user logged in');
            resolve(response);
        }

        function error(response) {
            $log.info('user login obtaining error with status ' + response.status);
            reject(response);
        }
    }
}

userServ.$inject = ['$http', '$q', '$log'];
