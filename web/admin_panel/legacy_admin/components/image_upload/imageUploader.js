/*global angular*/
angular
    .module('app.directives')
    .directive('imageUploader', imageUploader);

/* @ngInject */
function imageUploader($log, _, $timeout, $stateParams, videoServ) {
    "use strict";

    function handleFiles(files, scope) {
        let imageDropZone = angular.element(document.querySelector('image-uploader .image-drop-zone'));
        _.each(files, (file) => {
            const timeToRestore = 3000;
            const supportedMimeTypes = [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/bmp'
            ];

            if (supportedMimeTypes.indexOf(file.type) < 0) {
                $log.warn('Unsupported file format');
                imageDropZone.text('Unsupported file format');
                imageDropZone.addClass('error');
                $timeout(() => {
                    imageDropZone.text('Click to select image for uploading');
                    imageDropZone.removeClass('error');
                }, timeToRestore);
                return;
            }
            if (Number($stateParams.id)) {
                videoServ.uploadHeroImage(scope, Number($stateParams.id), file);
            }

            imageDropZone[0].classList.remove('drop');
        });

    }

    function linkFn(scope) {
        let imageDropZone = angular.element(document.querySelector('image-uploader .image-drop-zone'));
        let fileInput = angular.element(document.querySelector('image-uploader .image-file-input'));

        imageDropZone.on('click', () => {
            let fileInput = angular.element(document.querySelector('image-uploader .image-file-input'));
            fileInput[0].click();
        });

        imageDropZone.on('dragover', function (e) {
            e.preventDefault();
            imageDropZone[0].classList.add('hover');
            return false;
        });

        imageDropZone.on('dragleave', (e) => {
            e.preventDefault();
            imageDropZone[0].classList.remove('hover');
            return false;
        });

        imageDropZone.on('drop', (event) => {
            event.stopPropagation();
            event.preventDefault();
            imageDropZone[0].classList.remove('hover');
            imageDropZone[0].classList.add('drop');

            if (event && event.dataTransfer && event.dataTransfer.files) {
                let files = event.dataTransfer.files;
                handleFiles(files, scope);
            }

            return false;
        });

        fileInput.on('change', () => {
            let files = angular.element(document.querySelector('image-uploader .image-file-input'))[0].files;
            handleFiles(files, scope);
        });

    }


    return {
        restrict: 'E',
        templateUrl: 'components/image_upload/imageUploader.html',
        link: linkFn,
        scope: {
            hostLink: '=link'
        }
    }
}

imageUploader.$inject = ['$log', 'lodash', '$timeout', '$stateParams', 'videoServ'];