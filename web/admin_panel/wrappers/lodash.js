/*global angular*/
angular
    .module('app.wrappers')
    .factory('lodash', _lodash);

/* @ngInject */
function _lodash() {
    return lodash._;
}