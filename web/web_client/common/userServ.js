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
        isUnexpiredToken: isUnexpiredToken,

        getUnseenList: getUnseenList,
        setVideoSeen: setVideoSeen,
        getVideoSeen: getVideoSeen,

        getSkipped: getSkipped,
        setSkipped: setSkipped,

        getLiked: getLiked,
        setLiked: setLiked,
        deleteLiked: deleteLiked
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
        if (!token || token === null) {
            return false;
        }
        let createdDate = moment(token.created_at);
        let now = moment();
        let expirationDate = createdDate.add(token.expires_in);
        return now.diff(expirationDate) > 0;
    }

    function getUnseenList(hostName, token, params) {
        return $q(function (resolve, reject) {
            if (!token) {
                reject();
            }
            $http({
                method: 'GET',
                url: hostName + '/users/me/videos/unseen',
                params: params,
                headers: {'Authorization': `Bearer ${token}`}
            }).then(success, error);

            function success(response) {
                $log.info('unseen videos obtained');
                resolve(response.data.data);
            }

            function error(response) {
                $log.info('unseen videos obtaining error with status ' + response.status);
                reject(response);
            }
        });
    }

    function getVideoSeen(hostName, token, params) {
        return $q(function (resolve, reject) {
            if (!token) {
                reject();
            }
            $http({
                method: 'GET',
                url: hostName + '/users/me/videos/seen',
                params: params,
                headers: {'Authorization': `Bearer ${token}`}
            }).then(success, error);

            function success(response) {
                $log.info('seen videos obtained');
                resolve(response.data.data);
            }

            function error(response) {
                $log.info('seen videos obtaining error with status ' + response.status);
                reject(response);
            }
        });
    }

    function setVideoSeen(hostName, token, videoId) {
        return $q(function (resolve, reject) {
            if (!token) {
                reject();
            }
            $http({
                method: 'PUT',
                url: hostName + `/users/me/videos/seen/${videoId}`,
                headers: {'Authorization': `Bearer ${token}`}
            }).then(success, error);

            function success(response) {
                $log.info('seen videos set');
                resolve(response.data.data);
            }

            function error(response) {
                $log.info('seen videos set error with status ' + response.status);
                reject(response);
            }
        });
    }

    function getSkipped(hostName, token, params) {
        return $q(function (resolve, reject) {
            if (!token) {
                reject();
            }
            $http({
                method: 'GET',
                url: hostName + '/users/me/videos/skipped',
                params: params,
                headers: {'Authorization': `Bearer ${token}`}
            }).then(success, error);

            function success(response) {
                $log.info('skipped videos obtained');
                resolve(response.data.data);
            }

            function error(response) {
                $log.info('skipped videos obtaining error with status ' + response.status);
                reject(response);
            }
        });
    }

    function setSkipped(hostName, token, videoId) {
        return $q(function (resolve, reject) {
            if (!token) {
                reject();
            }
            $http({
                method: 'PUT',
                url: hostName + `/users/me/videos/skipped/${videoId}`,
                headers: {'Authorization': `Bearer ${token}`}
            }).then(success, error);

            function success(response) {
                $log.info('skipped videos set');
                resolve(response.data.data);
            }

            function error(response) {
                $log.info('skipped videos set error with status ' + response.status);
                reject(response);
            }
        });
    }

    function getLiked(hostName, token, params) {
        return $q(function (resolve, reject) {
            if (!token) {
                reject();
            }
            $http({
                method: 'GET',
                url: hostName + '/users/me/videos/liked',
                params: params,
                headers: {'Authorization': `Bearer ${token}`}
            }).then(success, error);

            function success(response) {
                $log.info('liked videos obtained');
                resolve(response.data.data);
            }

            function error(response) {
                $log.info('liked videos obtaining error with status ' + response.status);
                reject(response);
            }
        });
    }

    function setLiked(hostName, token, videoId) {
        return $q(function (resolve, reject) {
            if (!token) {
                reject();
            }
            $http({
                method: 'PUT',
                url: hostName + `/users/me/videos/liked/${videoId}`,
                headers: {'Authorization': `Bearer ${token}`}
            }).then(success, error);

            function success(response) {
                $log.info('liked videos set');
                resolve(response.data.data);
            }

            function error(response) {
                $log.info('liked videos set error with status ' + response.status);
                reject(response);
            }
        });
    }

    function deleteLiked(hostName, token, videoId) {
        return $q(function (resolve, reject) {
            if (!token) {
                reject();
            }
            $http({
                method: 'DELETE',
                url: hostName + `/users/me/videos/liked/${videoId}`,
                headers: {'Authorization': `Bearer ${token}`}
            }).then(success, error);

            function success(response) {
                $log.info('liked videos deleted');
                resolve(response.data.data);
            }

            function error(response) {
                $log.info('liked videos delete error with status ' + response.status);
                reject(response);
            }
        });
    }

}

userServ.$inject = ['$http', '$q', '$log', 'moment'];
