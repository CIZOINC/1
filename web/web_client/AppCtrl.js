angular.module('app.controls', ['ngSanitize']);
angular.module('app.wrappers', []);
angular.module('app.services', []);
angular.module('app.directives', ['app.services']);
angular.module('app.routerHelper', ['ui.router', 'app.wrappers']);
angular.module('templates', []);

angular
    .module('app', [
        'app.services',
        'app.controls',
        'app.directives',
        'app.routerHelper',
        'app.wrappers',
        'app.routes',
        'ngSanitize',
        'templates',
        'rzModule'])
    .controller('AppCtrl', AppCtrl);


/* @ngInject */
function AppCtrl($scope, routerHelper, routesList, $state) {
    $scope.title = 'Cizo';
    $scope.hostName = `http://staging.cizo.com`;

    $scope.categoriesList = [];

    applicationStart(routerHelper, routesList, $state);
}
AppCtrl.$inject = ['$scope', 'routerHelper', 'routesList', '$state'];

function applicationStart(routerHelper, routesList, $state) {
    "use strict";

    routerHelper.configureStates(routesList);
    $state.go('main');
}


