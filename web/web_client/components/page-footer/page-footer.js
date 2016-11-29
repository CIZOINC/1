'use strict';
/*global angular*/
(function () {
    angular
        .module('app.directives')
        .directive('pageFooter', function pageFooter() {
        "use strict";

        return {
            restrict: 'E',
            templateUrl: 'components/page-footer/page-footer.html',
            replace: true,
            link: linkFn,
            scope: false
        };

        function linkFn(scope) {

        }
    });
})();
