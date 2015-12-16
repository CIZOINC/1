/*global angular*/
angular
    .module('app.wrappers')
    .factory('moment', _moment);

/* @ngInject */
function _moment() {
    return moment;
}

_moment.$inject = [];