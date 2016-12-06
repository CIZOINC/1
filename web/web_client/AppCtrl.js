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
        'angular-svg-round-progress',
        'ezfb',
        'angular-perfect-scrollbar-2',
    ])
    .controller('AppCtrl', AppCtrl)
    .filter('nl2br', function($sce){
        return function(msg) {
            var newMsg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br>' +'$2');
            return $sce.trustAsHtml(newMsg);
        }
    })
    .filter('parseLinks', function ($sce) {
        return function(msg) {
            var exp = /\b((https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            var newMsg = (msg+'').replace(exp, "<a href='$1'>$1</a>");
            return $sce.trustAsHtml(newMsg);
        }
    });


/* @ngInject */
function AppCtrl($rootScope, $scope, routerHelper, routesList, $state, storageServ, userServ, $timeout, ezfb) {

    $rootScope.isInitLoad = true;

    $scope = angular.extend($scope, {
        title: 'CIZO',
        hostName: `https://staging.cizo.com`,
        sharingPath: 'https://staging.cizo.com/app',
        // Dont forget to revert
        facebookAppId: '459923084193687',
        videosList: [],
        categoriesList: [],
        featuredList: [],

        checkMature: function () {
            return $scope.storage.showMatureScreen;
        },

        storage: {
            userAuthorized: false,
            showMatureScreen: false,


            storageSeenKey: 'seen',
            storageFavoritesKey: 'favorites',
            storageUnseenKey: 'unseen',
            storageSkippedKey: 'skipped',
            storageUserToken: 'token',

            seenItems: [],
            favoritesItems: [],
            unseenItems: [],
            skippedItems: [],
            token: undefined
        },

        linkToLogin: linkToLogin,
        linkToHome: linkToHome,
        closeMatureScreen: closeMatureScreen

    });

    ezfb.init({
        appId: $scope.facebookAppId
    });

    function linkToLogin() {
        $scope.storage.showMatureScreen = false;
        $state.go('login');
    }

    function linkToHome() {
        $scope.storage.showMatureScreen = false;
        $state.go('home', {}, {reload: true});
    }

    function closeMatureScreen() {
        $scope.storage.showMatureScreen = false;
    }

    function loadUserToken() {
        $scope.storage.token = storageServ.getItem($scope.storage.storageUserToken);

        if ($scope.storage.token && userServ.isUnexpiredToken($scope.storage.token)) {

            $timeout(() => {
                "use strict";
                userServ.updateToken($scope.hostName, $scope.storage.token)
                    .then((response) => {
                        storageServ.setItem($scope.storage.storageUserToken, response.data);
                        $scope.storage.token = response.data;
                    });
            }, 30000);

        }

        if (!userServ.isUnexpiredToken($scope.storage.token)) {
            storageServ.deleteItem($scope.storage.storageUserToken);
            $scope.storage.userAuthorized = false;
        } else {
            $scope.storage.userAuthorized = true;
        }
    }

    function setupBackLinksTracking() {
        $rootScope.wentFrom = '';
        $rootScope.wentFromParams = undefined;
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            $rootScope.wentFrom = from;
            $rootScope.wentFromParams = fromParams;
        });
    }

    loadUserToken();

    routerHelper.configureStates(routesList);

    setupBackLinksTracking();

    // upload storage
    $scope.storage.seenItems = storageServ.getItem($scope.storage.storageSeenKey);
    if ($scope.storage.seenItems == null) {
        $scope.storage.seenItems = [];
    }
    $scope.storage.unseenItems = storageServ.getItem($scope.storage.storageUnseenKey);
    if ($scope.storage.unseenItems == null) {
        $scope.storage.unseenItems = [];
    }
    $scope.storage.favoritesItems = storageServ.getItem($scope.storage.storageFavoritesKey);
    if ($scope.storage.favoritesItems == null) {
        $scope.storage.favoritesItems = [];
    }
    $scope.storage.skippedItems = storageServ.getItem($scope.storage.storageSkippedKey);
    if ($scope.storage.skippedItems == null) {
        $scope.storage.skippedItems = [];
    }

    if ($scope.storage.userAuthorized) {
        userServ.getLiked($scope.hostName, $scope.storage.token.access_token)
            .then((favorites) => {
                let favoritesArray = _.map(favorites, fav => fav.id);
                let storedArray = storageServ.getItem($scope.storage.storageFavoritesKey);

                let newArray = _.union(favoritesArray, storedArray);
                storageServ.setItem($scope.storage.storageFavoritesKey, newArray);
                $scope.storage.favoritesItems = newArray;
            });

        userServ.getVideoSeen($scope.hostName, $scope.storage.token.access_token)
            .then((seen) => {
                let seenArray = _.map(seen, seenItem => seenItem.id);
                let storedArray = storageServ.getItem($scope.storage.storageSeenKey);

                let newArray = _.union(seenArray, storedArray);
                storageServ.setItem($scope.storage.storageSeenKey, newArray);
                $scope.storage.seenItems = newArray;
            });

        userServ.getUnseenList($scope.hostName, $scope.storage.token.access_token)
            .then((unseen) => {
                let unseenArray = _.map(unseen, unseenItem => unseenItem.id);
                let storedArray = storageServ.getItem($scope.storage.storageUnseenKey);

                let newArray = _.union(unseenArray, storedArray);
                storageServ.setItem($scope.storage.storageUnseenKey, newArray);
                $scope.storage.unseenItems = newArray;
            });

        userServ.getSkipped($scope.hostName, $scope.storage.token.access_token)
            .then((skipped) => {
                let skippedArray = _.map(skipped, skippedItem => skippedItem.id);
                let storedArray = storageServ.getItem($scope.storage.storageSkippedKey);

                let newArray = _.union(skippedArray, storedArray);
                storageServ.setItem($scope.storage.storageSkippedKey, newArray);
                $scope.storage.skippedItems = newArray;
            });
    }


}
AppCtrl.$inject = ['$rootScope', '$scope', 'routerHelper', 'routesList', '$state', 'storageServ', 'userServ', '$timeout', 'ezfb'];
