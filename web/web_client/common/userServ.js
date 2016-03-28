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
        resetPassword: resetPassword,
        updatePassword: updatePassword,
        updatePasswordOnline: updatePasswordOnline,
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
        return $q(function (resolve, reject) {
            let fbAuthWindow = window.open(hostName + `/users/auth/facebook`, "_blank", "height=600, width=550, status=yes, toolbar=no, menubar=no, location=no, addressbar=no");
            let timer = setInterval(checkChild, 500);

            function checkChild() {
                if (fbAuthWindow.closed) {
                    $log.log('facebook auth window was closed');
                    clearInterval(timer);
                    reject();
                }
                let dataContainer = fbAuthWindow.document.querySelector('pre');
                if (dataContainer) {
                    clearInterval(timer);
                    let tokenRaw = dataContainer.innerHTML;
                    let token = JSON.parse(tokenRaw);
                    fbAuthWindow.close();
                    resolve(token);
                }

            }
        });
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

    function resetPassword(hostName, email) {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: hostName + `/users/password_reset?email=${email}`
            }).then(success, error);

            function success(response) {
                $log.info('password link successfully sent');
                resolve(response);
            }

            function error(response) {
                $log.info('password link sending error with status ' + response.status);
                reject(response);
            }
        });
    }

    function updatePasswordOnline(hostName, pass, token) {
        return $q(function (resolve, reject) {
            $http({
                method: 'PUT',
                url: hostName + `/users/me`,
                data: {
                    "user": {
                        "password": pass,
                        "password_confirmation": pass
                    }
                },
                headers: {'Authorization': `Bearer ${token}`}
            }).then(success, error);

            function success(response) {
                $log.info('password successfully updated');
                resolve(response);
            }

            function error(response) {
                $log.info('password updating error with status ' + response.status);
                reject(response);
            }
        });
    }

    function updatePassword(hostName, pass, token) {
        return $q(function (resolve, reject) {
            $http({
                method: 'PUT',
                url: hostName + `/users/password?password=${pass}&reset_password_token=${token}`
            }).then(success, error);

            function success(response) {
                $log.info('password successfully updated');
                resolve(response);
            }

            function error(response) {
                $log.info('password updating error with status ' + response.status);
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
