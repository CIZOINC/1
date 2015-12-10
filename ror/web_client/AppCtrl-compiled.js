'use strict';

angular.module('app', ['app.controls', 'app.directives', 'app.routerHelper', 'app.wrappers', 'app.routes', 'ngSanitize']).controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope'];

function AppCtrl($scope) {
    $scope.title = 'Cizo';
}

//# sourceMappingURL=AppCtrl-compiled.js.map