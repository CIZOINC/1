'use strict';

angular.module('app.services').factory('videoServ', videoServ);

/* @ngInject */
function videoServ($http, $q, $log) {
    "use strict";

    return {
        getVideosList: getVideosList,

        makeVideo: makeVideo,
        getVideo: getVideo,
        setVideo: setVideo,
        deleteVideo: deleteVideo,

        uploadHeroImage: uploadHeroImage
    };

    function getVideosList(scope) {
        return $q(function (resolve, reject) {
            $http({
                method: 'GET',
                url: scope.hostName + '/videos'
            }).then(success, error);

            function success(response) {
                $log.info('video list obtained');
                resolve(response);
            }

            function error(response) {
                $log.info('video list obtaining error with status ' + response.status);
                reject(response);
            }
        });
    }

    function makeVideo(scope, videoData) {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: scope.hostName + '/videos',
                data: videoData
            }).then(success, error);

            function success(response) {
                $log.info('video data created');
                resolve(response);
            }

            function error(response) {
                $log.info('video data creation error with status ' + response.status);
                reject(response);
            }
        });
    }

    function getVideo(scope, id) {
        return $q(function (resolve, reject) {
            $http({
                method: 'GET',
                url: scope.hostName + '/videos/' + id
            }).then(success, error);

            function success(response) {
                $log.info('video data delivered');
                resolve(response);
            }

            function error(response) {
                $log.info('video data getting error with status ' + response.status);
                reject(response);
            }
        });
    }

    function setVideo(scope, id, videoData) {
        return $q(function (resolve, reject) {
            var sendDate = angular.toJson(videoData);
            $http({
                method: 'PUT',
                url: scope.hostName + '/videos/' + id,
                data: sendDate
            }).then(success, error);

            function success(response) {
                $log.info('video data updated');
                resolve(response);
            }

            function error(response) {
                $log.info('video data updating error with status ' + response.status);
                reject(response);
            }
        });
    }

    function deleteVideo(scope, id) {
        return $q(function (resolve, reject) {
            $http({
                method: 'DELETE',
                url: scope.hostName + '/videos/' + id
            }).then(success, error);

            function success(response) {
                $log.info('video data deleted');
                resolve(response);
            }

            function error(response) {
                $log.info('video data deleting error with status ' + response.status);
                reject(response);
            }
        });
    }

    function uploadHeroImage(scope, id, file) {
        var formData = new FormData();
        formData.append('file', file);
        return $q(function (resolve, reject) {
            $http.post(scope.hostLink + '/videos/' + id + '/hero_image', formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(success, error);

            function success(response) {
                $log.info('hero image uploaded');
                resolve(response);
            }

            function error(response) {
                $log.info('hero image uploading error with status ' + response.status);
                reject(response);
            }
        });
    }
}

videoServ.$inject = ['$http', '$q', '$log'];

//# sourceMappingURL=videoServ-compiled.js.map