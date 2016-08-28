(function () {
    'use strict';

    angular.module('app.ui.crop')
        .directive('cropArea', cropArea);

    function cropArea() {
        return {
            restrict: 'AE',
            templateUrl: './app/croparea/croparea.html',
            replace: true,
            require: 'ngModel',
            scope: {
                img: '=',
                onupload: '='
            },
            controller: ['$scope', '$uibModal', function ($scope, $uibModal ) {
                $scope.uploadedImageBase64 = null;

                $scope.openCropModal = function (file) {
                    let modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: './app/croparea/cropModal.html',
                        controller: 'cropModalCtrl',
                        size: 'lg',
                        resolve: {
                            image: file
                        }
                    });

                    modalInstance.result.then(function (file) {
                        $scope.onupload(file);
                    }, function (result) {

                    });
                };


            }],
            link: function (scope, element, ctrl) {
                console.log('uploadFn', scope)
            }
        }
    }

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
