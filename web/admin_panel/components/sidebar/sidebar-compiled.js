'use strict';

/*global angular*/
angular.module('app.directives').directive('sidebar', sidebar);

/* @ngInject */
function sidebar($log) {
    "use strict";

    function linkFn(scope) {
        //scope.$apply();
        $log.info('linked');
    }

    return {
        restrict: 'E',
        templateUrl: 'components/sidebar/sidebar.html',
        link: linkFn,
        transclude: true,
        scope: {}
    };
}

sidebar.$inject = ['$log'];

//# sourceMappingURL=sidebar-compiled.js.map