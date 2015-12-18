'use strict';

/*global angular*/
angular.module('app.services').factory('uploaderServ', uploaderServ);

/* @ngInject */
function uploaderServ($http, $q, $log) {
    "use strict";

    return {
        sendRequest: sendRequest
    };

    function sendRequest(id, link) {
        return $q(function (resolve, reject) {
            $http({
                method: 'GET',
                url: link + '/videos/' + id + '/raw_stream_upload_request'
            }).then(success, error);

            function success(response) {
                $log.info('request data received');
                resolve(response);
            }

            function error(response) {
                $log.info('request data receiving error with status ' + response.status);
                reject(response);
            }
        });
    }
}

uploaderServ.$inject = ['$http', '$q', '$log'];

//# sourceMappingURL=uploaderServ-compiled.js.map