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
        .controller('cropModalCtrl', ['$scope', '$uibModalInstance', '$timeout', 'Upload', 'image', 'logger',
            function ($scope, $uibModalInstance, $timeout, Upload, image, logger) {

                const MinWidth = 1366;
                const MinHeight = 768;
                $scope.croppedImage = null;

                Upload.base64DataUrl(image).then(
                    function (url){
                        var testingImage = new Image();
                        testingImage.onload = function() {
                            if (testingImage.height >= MinHeight && testingImage.width >= MinWidth) {
                                $scope.sourceImage = url;
                            } else {
                                logger.logError('The image size too small! You should upload image 1366x768 or bigger.');
                                $scope.cancel();
                            }
                        };
                        testingImage.src = url;
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
                    let zoomStep = 0.05;
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
                        var fileOfBlob = new File([blob], 'cropped'+Date.now()+'.jpg',  {type: blob.type});
                        $uibModalInstance.close(fileOfBlob);
                    });
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }]);

})();
