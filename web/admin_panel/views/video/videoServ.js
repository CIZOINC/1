angular
    .module('app.services')
    .factory('videoServ', videoServ);

/* @ngInject */
function videoServ($http, $q, $log) {
    "use strict";

    return {
        makeVideo: makeVideo,
        getVideo: getVideo,
        setVideo: setVideo,
        deleteVideo: deleteVideo,

        uploadHeroImage: uploadHeroImage
    };

    function makeVideo(scope, videoData) {
        return $q( (resolve, reject) => {
            $http({
                method: 'POST',
                url: `${scope.hostName}/videos`,
                data: videoData
            }).then(success, error);

            function success(response) {
                $log.info('video data created');
                resolve(response);
            }

            function error(response) {
                $log.info(`video data creation error with status ${response.status}`);
                reject(response);
            }
        });
    }

    function getVideo(scope, id) {
        return $q( (resolve, reject) => {
            $http({
                method: 'GET',
                url: `${scope.hostName}/videos/${id}`
            }).then(success, error);

            function success(response) {
                $log.info('video data delivered');
                resolve(response);
            }

            function error(response) {
                $log.info(`video data getting error with status ${response.status}`);
                reject(response);
            }
        });
    }

    function setVideo(scope, id) {
        return $q( (resolve, reject) => {
            $http({
                method: 'PUT',
                url: `${scope.hostName}/videos/${id}`
            }).then(success, error);

            function success(response) {
                $log.info('video data updated');
                resolve(response);
            }

            function error(response) {
                $log.info(`video data updating error with status ${response.status}`);
                reject(response);
            }
        });
    }

    function deleteVideo(scope, id) {
        return $q( (resolve, reject) => {
            $http({
                method: 'DELETE',
                url: `${scope.hostName}/videos/${id}`
            }).then(success, error);

            function success(response) {
                $log.info('video data deleted');
                resolve(response);
            }

            function error(response) {
                $log.info(`video data deleting error with status ${response.status}`);
                reject(response);
            }
        });
    }

    function uploadHeroImage(scope, id, data) {
        let formData = new FormData();
        let encodedData = formData.append('heroImage', data)
        return $q( (resolve, reject) => {
            $http({
                method: 'POST',
                url: `${scope.hostName}/videos/${id}/heroimage`,
                data: encodedData
            }).then(success, error);

            function success(response) {
                $log.info('hero image uploaded');
                resolve(response);
            }

            function error(response) {
                $log.info(`hero image uploading error with status ${response.status}`);
                reject(response);
            }
        });
    }
}

videoServ.$inject = ['$http', '$q', '$log'];