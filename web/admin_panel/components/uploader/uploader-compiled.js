'use strict';

/*global angular*/
angular.module('app.directives').directive('uploader', uploader);

/* @ngInject */
function uploader($log, _, $timeout) {
    "use strict";

    function uploadProgress(event) {
        var dropZone = angular.element(document.querySelector('.drop-zone'));
        var percent = parseInt(event.loaded / event.total * 100);
        dropZone.text('Upload: ' + percent + '%');
    }

    function stateChange(event) {
        var dropZone = angular.element(document.querySelector('.drop-zone'));
        if (event.target.readyState == 4) {
            if (event.target.status == 200) {
                dropZone.text('Upload successfully finished');
            } else {
                dropZone.text('Error occurred with status ' + event.target.status);
                dropZone.addClass('error');
                $timeout(function () {
                    dropZone.text('Drag file or click to select');
                    dropZone.removeClass('error');
                }, 3000);
            }
        }
    }

    function handleFiles(files) {
        var dropZone = angular.element(document.querySelector('.drop-zone'));
        _.each(files, function (file) {

            var timeToRestore = 3000;

            dropZone[0].classList.remove('drop');

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

            var xhr = new XMLHttpRequest();
            var postURL = 'localhost:8080/v1/videos/2/stream_transcode_request';

            xhr.upload.addEventListener('progress', uploadProgress, false);
            xhr.onreadystatechange = stateChange;
            xhr.open('POST', postURL);
            xhr.send(file);
        });
    }

    function linkFn() {
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
                handleFiles(files);
            }

            return false;
        });

        fileInput.on('change', function () {
            var files = angular.element(document.querySelector('.file-input'))[0].files;
            handleFiles(files);
        });
    }

    return {
        restrict: 'E',
        templateUrl: 'components/uploader/uploader.html',
        link: linkFn,
        transclude: true,
        scope: {}
    };
}

uploader.$inject = ['$log', 'lodash', '$timeout'];

//# sourceMappingURL=uploader-compiled.js.map