'use strict';

/*global angular*/
angular.module('app.directives').directive('uploader', uploader);

/* @ngInject */
function uploader($log, _, $timeout, uploaderServ, $stateParams) {
    "use strict";

    function handleFiles(files, scope) {
        var dropZone = angular.element(document.querySelector('.drop-zone'));
        _.each(files, function (file) {
            var timeToRestore = 3000;

            if (file.type !== 'video/mp4') {
                $log.warn('Unsupported file format');
                dropZone.text('Unsupported file format');
                dropZone.addClass('error');
                $timeout(function () {
                    dropZone.text('Drag file or click to select');
                    dropZone.removeClass('error');
                }, timeToRestore);
                return;
            }
            if (Number($stateParams.id)) {
                uploaderServ.sendRequest(Number($stateParams.id), file.name, scope.hostLink).then(function (awsData) {
                    scope.postData = {
                        url: awsData.data['url'],
                        key: awsData.data['key'],
                        expires: awsData.data['Expires'],
                        policy: awsData.data['policy'],
                        credential: awsData.data['x-amz-credential'],
                        algorithm: awsData.data['x-amz-algorithm'],
                        date: awsData.data['x-amz-date'],
                        token: awsData.data['x-amz-security-token'],
                        signature: awsData.data['x-amz-signature']
                    };
                    $timeout(function () {
                        var form = document.querySelector('form');
                        form.submit();
                    }, 800);
                });
            }

            dropZone[0].classList.remove('drop');
            return;
        });
    }

    function linkFn(scope) {
        var dropZone = angular.element(document.querySelector('.drop-zone'));
        var fileInput = angular.element(document.querySelector('.file-input'));

        dropZone.on('click', function () {
            var fileInput = angular.element(document.querySelector('.file-input'));
            fileInput[0].click();
        });

        dropZone.on('dragover', function (e) {
            e.preventDefault();
            dropZone[0].classList.add('hover');
            return false;
        });

        dropZone.on('dragleave', function (e) {
            e.preventDefault();
            dropZone[0].classList.remove('hover');
            return false;
        });

        dropZone.on('drop', function (event) {
            event.stopPropagation();
            event.preventDefault();
            dropZone[0].classList.remove('hover');
            dropZone[0].classList.add('drop');

            if (event && event.dataTransfer && event.dataTransfer.files) {
                var files = event.dataTransfer.files;
                handleFiles(files, scope);
            }

            return false;
        });

        fileInput.on('change', function () {
            var files = angular.element(document.querySelector('.file-input'))[0].files;
            handleFiles(files, scope);
        });
    }

    return {
        restrict: 'E',
        templateUrl: 'components/uploader/uploader.html',
        link: linkFn,
        transclude: true,
        scope: {
            hostLink: '=link',
            postData: '@'
        }
    };
}

uploader.$inject = ['$log', 'lodash', '$timeout', 'uploaderServ', '$stateParams'];

//# sourceMappingURL=uploader-compiled.js.map