/*global angular*/
angular
    .module('app.wrappers')
    .factory('moment', _moment);

function _moment() {
    return moment;
}