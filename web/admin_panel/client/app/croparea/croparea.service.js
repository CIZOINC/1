(function () {
    'use strict';

    angular.module('app.ui.crop')
        .service('cropArea', cropArea);

    function cropArea($uibModal) {
        let service = this;

        service.openCropModal = (file) => {
            let modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './app/croparea/cropModal.html',
                controller: 'cropModalCtrl',
                size: 'lg',
                resolve: {
                    image: file
                }
            });

            return modalInstance.result;
        };

        return service;
    }

    cropArea.$inject = ['$uibModal'];

    angular.module('app.ui.crop')
        .controller('cropModalCtrl', ['$scope', '$uibModalInstance', '$timeout', 'Upload', 'image',
            function ($scope, $uibModalInstance, $timeout, Upload, image) {
            Upload.base64DataUrl(image).then(
                function (url){
                    $scope.sourceImage = url;
                    $scope.croppedImage = null;
                });

            $scope.cropCallback = function (croppedImage) {
                $scope.croppedImage = croppedImage;
                $scope.$apply();
            };

            $scope.myButtonLabels = {
                rotateLeft: ' <span>Rotate left</span> ',
                rotateRight: ' <span>Rotate right</span>',
                zoomIn: ' <i class="glyphicon glyphicon-zoom-in"></i>Zoom in',
                zoomOut: ' <i class="glyphicon glyphicon-zoom-out"></i>Zoom out ',
                fit: 'Fit image',
                crop: '<i>class="glyphicon glyphicon-scissors></i>Crop!'
            };

            $scope.getCropperApi = function (api) {
                let zoomStep = 0.5;
                $scope.zoomIn = function () {
                    api.zoomIn(zoomStep);
                };
                $scope.zoomOut = function () {
                    api.zoomOut(zoomStep);
                };
                $scope.crop = () => {
                    $timeout(function () {
                        api.crop();
                    }, 0);

                }

            };

            $scope.ok = function () {
                Upload.urlToBlob($scope.croppedImage).then(function (blob) {
                    var fileOfBlob = new File([blob], 'example.jpg',  {type: blob.type});
                    $uibModalInstance.close(fileOfBlob);
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);

})();
