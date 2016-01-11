'use strict';

angular.module('app', ['app.services', 'app.controls', 'app.directives', 'app.routerHelper', 'app.wrappers', 'app.routes', 'ngSanitize', 'templates']).controller('AppCtrl', AppCtrl);

/* @ngInject */
function AppCtrl($scope, routerHelper, routesList, $state) {
    $scope.title = 'Cizo';
    $scope.hostName = 'http://staging.cizo.com';
    applicationStart(routerHelper, routesList, $state);
}
AppCtrl.$inject = ['$scope', 'routerHelper', 'routesList', '$state'];

function applicationStart(routerHelper, routesList, $state) {
    "use strict";

    routerHelper.configureStates(routesList);
    $state.go('main');
}

//# sourceMappingURL=AppCtrl-compiled.js.map