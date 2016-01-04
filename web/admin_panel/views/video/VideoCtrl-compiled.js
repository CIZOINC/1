'use strict';

/*global angular*/
angular.module('app.controls').controller('VideoCtrl', VideoCtrl);

/* @ngInject */
function VideoCtrl($scope, $log, $state, $stateParams, videoServ, categoriesServ) {
    "use strict";

    function loadCategories() {
        categoriesServ.getCategoriesList($scope).then(function success(response) {
            $scope.categoriesList = response.data.data;
            loadVideo();
        }, function error(response) {
            $log.error('receiving error happened: ' + response);
            loadVideo();
        });
    }

    function loadVideo() {
        if (Number($stateParams.id)) {
            videoServ.getVideo($scope, $stateParams.id).then(function success(response) {
                $scope.videoItem = response.data;
                $scope.videoItem.category_id = String(response.data.category_id);
                $scope.createdDate = moment($scope.videoItem.created_at).format('MM.DD.YYYY HH:mm');
                $scope.updatedDate = moment($scope.videoItem.updated_at).format('MM.DD.YYYY HH:mm');
                $log.info('data received');
            }, function error(response) {
                $log.error('receiving error happened: ' + response);
            });
        } else {
            $scope.createdDate = moment().format('MM.DD.YYYY HH:mm');
            $scope.updatedDate = moment().format('MM.DD.YYYY HH:mm');
        }
    }

    $scope.mpaaRatingList = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

    $scope.screenTitle = Number($stateParams.id) > 0 ? 'Edit' : 'Create';
    $scope.hostNameUpload = $scope.hostName;

    loadCategories();

    $scope.updateVideo = function () {
        if (Number($stateParams.id)) {
            $scope.videoItem.updated_at = new Date();
            videoServ.setVideo($scope, $stateParams.id, $scope.videoItem).then(function () {
                $log.info('successfully sent');
                $state.go('content');
            }, function (resp) {
                $log.info('error happened with status ' + resp.status);
            });
        } else {
            $scope.videoItem.created_at = new Date();
            $scope.videoItem.updated_at = new Date();

            $scope.videoItem.tags = [];
            videoServ.makeVideo($scope, $scope.videoItem).then(function () {
                $state.go('content');
            });
        }
    };
}

VideoCtrl.$inject = ['$scope', '$log', '$state', '$stateParams', 'videoServ', 'categoriesServ'];

//# sourceMappingURL=VideoCtrl-compiled.js.map