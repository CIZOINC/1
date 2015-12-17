'use strict';

/*global angular*/
angular.module('app.wrappers').factory('moment', _moment);

/* @ngInject */
function _moment($log) {
    return moment;
}

_moment.$inject = ['$log'];

//# sourceMappingURL=moment-compiled.js.map