angular
    .module('app.services', [])
    .factory('initServ', initServ);

/* @ngInject */
function initServ($log) {
    "use strict";
    $log.info('services initialized');
}

initServ.$inject = ['$log'];