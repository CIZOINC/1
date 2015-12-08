'use strict';

angular.module('app', ['app.controls', 'app.routerHelper', 'app.routes']).controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope'];

function AppCtrl($scope) {
    $scope.title = 'Cizo';
}

//# sourceMappingURL=AppCtrl-compiled.js.map