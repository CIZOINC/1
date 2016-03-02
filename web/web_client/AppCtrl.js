angular.module('app.helpers', []);
angular.module('app.controls', ['ngSanitize']);
angular.module('app.wrappers', []);
angular.module('app.routerHelper', ['ui.router', 'app.wrappers']);
angular.module('app.services', []);
angular.module('app.directives', ['app.services', 'app.helpers']);
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
function AppCtrl($scope, routerHelper, routesList, $state, storageServ, userServ, playerServ) {

    $scope = angular.extend($scope, {
        title: 'Cizo',
        hostName: `https://staging.cizo.com`,
        sharingPath: 'https://staging.cizo.com/app',
        facebookAppIdStage: '459923084193687',
        facebookAppIdProd: '459778204208175',
        videosList: [],
        categoriesList: [],
        featuredList: [],
        userAuthorized: false,

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

    if (!userServ.isUnexpiredToken($scope.storage.token)) {
        storageServ.deleteItem($scope.storage.storageUserToken);
        $scope.userAuthorized = false;
    } else {
        $scope.userAuthorized = true;
    }

}
AppCtrl.$inject = ['$scope', 'routerHelper', 'routesList', '$state', 'storageServ', 'userServ', 'playerServ'];