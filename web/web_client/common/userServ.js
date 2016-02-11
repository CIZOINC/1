/*global angular*/
angular
    .module('app.services')
    .factory('userServ', userServ);

/* @ngInject */
function userServ($http, $q, $log, moment) {
    "use strict";

    return {
        registerUser: registerUser,
        login: login,
        facebookAuth: facebookAuth,
        updateToken: updateToken,
        isUnexpiredToken: isUnexpiredToken
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
        return $q(function (resolve, reject) {
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
        });
    }

    function facebookAuth(hostName) {
        $http({
            method: 'GET',
            url: hostName + `/users/auth/facebook`
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

    function updateToken(hostName, tokenData) {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: hostName + `/oauth/token?grant_type=refresh_token&refresh_token=${tokenData.refresh_token}`
            }).then(success, error);

            function success(response) {
                $log.info('user logged in');
                resolve(response);
            }

            function error(response) {
                $log.info('user login obtaining error with status ' + response.status);
                reject(response);
            }
        });
    }

    function isUnexpiredToken(token) {
        let createdDate = moment(token.created_at);
        let now = moment();
        let expirationDate = createdDate.add(token.expires_in);
        return now.diff(expirationDate) > 0;
    }
}

userServ.$inject = ['$http', '$q', '$log', 'moment'];
