'use strict';

/*global angular*/
angular.module('app.services').factory('uploaderServ', uploaderServ);

/* @ngInject */
function uploaderServ($http, $q, $log) {
    "use strict";

    return {
        sendRequest: sendRequest,
        updateStreams: updateStreams
    };

    function processFileName(fileName) {
        var processedName = fileName.toLowerCase();
        processedName = processedName.replace(/^[^a-z0-9]/g, '');
        processedName = processedName.replace(/[^a-z0-9\-\.]/g, '_');
        if (processedName.length > 25) {
            processedName = processedName.substr(0, 25);
        }
        return processedName;
    }

    function sendRequest(id, filename, link) {
        return $q(function (resolve, reject) {
            $http({
                method: 'GET',
                url: link + '/videos/' + id + '/raw_stream_upload_request',
                params: { filename: processFileName(filename) }
            }).then(success, error);

            function success(response) {
                $log.info('request data received');
                $log.info(JSON.stringify(response));
                resolve(response);
            }

            function error(response) {
                $log.info('request data receiving error with status ' + response.status);
                reject(response);
            }
        });
    }

    function updateStreams(id, link) {
        return $http({
            method: 'POST',
            url: link + '/videos/' + id + '/streams'
        });
    }
}

uploaderServ.$inject = ['$http', '$q', '$log'];

//# sourceMappingURL=uploaderServ-compiled.js.map