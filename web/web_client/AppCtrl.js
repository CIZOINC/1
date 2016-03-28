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
function AppCtrl($rootScope, $scope, routerHelper, routesList, $state, storageServ, userServ, $timeout) {

    $scope = angular.extend($scope, {
        title: 'Cizo',
        hostName: `https://staging.cizo.com`,
        sharingPath: 'https://staging.cizo.com/app',
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
        linkToHome: linkToHome

    });

    function linkToLogin() {
        $scope.storage.showMatureScreen = false;
        $state.go('login');
    }

    function linkToHome() {
        $scope.storage.showMatureScreen = false;
        $state.go('home', {}, {reload: true});
    }

    routerHelper.configureStates(routesList);

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
    $scope.storage.skippedItems = storageServ.getItem($scope.storage.storageFavoritesKey);
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
                let unseenArray = _.map(skipped, skippedItem => skippedItem.id);
                let storedArray = storageServ.getItem($scope.storage.storageSkippedKey);

                let newArray = _.union(unseenArray, storedArray);
                storageServ.setItem($scope.storage.storageSkippedKey, newArray);
                $scope.storage.skippedItems = newArray;
            });
    }


}
AppCtrl.$inject = ['$rootScope', '$scope', 'routerHelper', 'routesList', '$state', 'storageServ', 'userServ', '$timeout'];