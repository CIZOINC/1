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
        .controller('cropModalCtrl', ['$scope', '$uibModalInstance', 'Upload', 'image', function ($scope, $uibModalInstance, Upload, image) {
            $scope.bounds = {};
            $scope.bounds.left = 0;
            $scope.bounds.right = 0;
            $scope.bounds.top = 0;
            $scope.bounds.bottom = 0;

            Upload.base64DataUrl(image).then(
                function (url){
                    $scope.cropper = {};
                    $scope.cropper.sourceImage = url;
                    $scope.cropper.croppedImage = null;
                });

            $scope.ok = function () {
                Upload.urlToBlob($scope.cropper.croppedImage).then(function (blob) {
                    var fileOfBlob = new File([blob], 'example.jpg',  {type: blob.type});
                    $uibModalInstance.close(fileOfBlob);
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);

})();
