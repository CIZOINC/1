/*global angular*/
angular.module('app.directives').directive('uploader', uploader);

/* @ngInject */
function uploader($log, _) {
    "use strict";

    function handleFiles(files) {
        /*files.forEach((file) => {
            let imageType = /^image\//;
              if (!imageType.test(file.type.match)) {
                return;
            }
              let img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
              var reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);
        });*/
    }

    function linkFn(scope, element) {
        let dropZone = angular.element(document.querySelector('.drop-zone'));

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
            $log.info('sent');
            let dataTransfer = event.dataTransfer;
            let files = dataTransfer.files;

            handleFiles(files);

            return false;
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

uploader.$inject = ['$log', 'lodash'];

//# sourceMappingURL=uploader-compiled.js.map