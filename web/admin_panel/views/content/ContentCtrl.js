/*global angular*/
angular
    .module('app.controls', ['ngSanitize'])
    .controller('ContentCtrl', ContentCtrl);

/* @ngInject */
function ContentCtrl($scope, $http, $log) {
    "use strict";
    let contentURL = 'views/content/videos.json';
    $http({
        method: 'GET',
        url: contentURL
    })
    .then(
        function success(response) {
            $scope.videosList = response.data.data;
            $log.info('data received');
        },
        function error(response) {
            $log.error('receiving error happened: ' + response);
        });

}

ContentCtrl.$inject = ['$scope', '$http', '$log'];