angular
    .module('app', [
        'app.services',
        'app.controls',
        'app.directives',
        'app.routerHelper',
        'app.wrappers',
        'app.routes',
        'ngSanitize'])
    .controller('AppCtrl', AppCtrl);


/* @ngInject */
function AppCtrl($scope, routerHelper, routesList, $state) {
    $scope.title = 'Cizo';
    $scope.versionAPI = 'v1';
    $scope.hostName = `http://localhost:63342/${$scope.versionAPI}`;
    applicationStart(routerHelper, routesList, $state);
}
AppCtrl.$inject = ['$scope', 'routerHelper', 'routesList', '$state'];

function applicationStart(routerHelper, routesList, $state) {
    "use strict";
    routerHelper.configureStates(routesList);
    $state.go('main');
}


