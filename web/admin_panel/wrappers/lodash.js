/*global angular*/
angular
    .module('app.wrappers', [])
    .factory('lodash', _lodash);

/* @ngInject */
function _lodash($log) {
    return _;
}

_lodash.$inject = ['$log'];