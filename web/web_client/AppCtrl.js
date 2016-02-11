angular.module('app.controls', ['ngSanitize']);
angular.module('app.wrappers', []);
angular.module('app.routerHelper', ['ui.router', 'app.wrappers']);
angular.module('app.services', []);
angular.module('app.directives', ['app.services']);
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
        'rzModule',
        'angular-svg-round-progress'
    ])
    .controller('AppCtrl', AppCtrl);


/* @ngInject */
function AppCtrl($scope, routerHelper, routesList, $state, storageServ, userServ) {

    $scope = angular.extend($scope, {
        title: 'Cizo',
        hostName: `http://staging.cizo.com`,
        categoriesList: [],

        storage: {
            storageSeenKey: 'seen',
            storageUserToken: 'token',

            seenItems: [],
            token: undefined
        }

    });

    routerHelper.configureStates(routesList);

    $scope.storage.token = storageServ.getItem($scope.storage.storageUserToken);
    if ($scope.storage.token && userServ.isUnexpiredToken($scope.storage.token)) {
        userServ.updateToken($scope.hostName, $scope.storage.token)
            .then((response) => {
                storageServ.setItem($scope.storage.storageUserToken, response.data);
                $scope.storage.token = response.data;
            });
    }


    $state.go('main');

}
AppCtrl.$inject = ['$scope', 'routerHelper', 'routesList', '$state', 'storageServ', 'userServ'];