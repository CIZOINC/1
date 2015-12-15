'use strict'

//angular.bootstrap(document, ['app']);

;
angular.module('app', ['app.controls', 'app.directives', 'app.routerHelper', 'app.wrappers', 'app.routes', 'ngSanitize']).controller('AppCtrl', AppCtrl);

/* @ngInject */
function AppCtrl($scope, routerHelper, routesList, $state) {
    $scope.title = 'Cizo';
    applicationStart(routerHelper, routesList, $state);
}
AppCtrl.$inject = ['$scope', 'routerHelper', 'routesList', '$state'];

function applicationStart(routerHelper, routesList, $state) {
    "use strict";

    routerHelper.configureStates(routesList);
    $state.go('main');
}

//# sourceMappingURL=AppCtrl-compiled.js.map

//# sourceMappingURL=AppCtrl-compiled-compiled.js.map