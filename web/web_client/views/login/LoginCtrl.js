/*global angular*/
angular
    .module('app.controls')
    .controller('LoginCtrl', LoginCtrl);

/* @ngInject */
function LoginCtrl($scope, $state, userServ, storageServ) {
    "use strict";


    $scope = angular.extend($scope, {
        login: {
            email: '',
            password: ''
        },

        processLogin: processLogin,
        registerClick: registerClick
    });

    function processLogin() {
        userServ.login($scope.hostName, {
            login: $scope.login.email,
            password: $scope.login.password
        }).then((response) => {
            storageServ.setItem($scope.storage.storageUserToken, response.data);
            $scope.storage.token = response.data;
            $scope.storage.userAuthorized = true;

/**/
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
            /**/


            $state.go('home');
        });
    }

    function registerClick() {
        $state.go('register');
    }
}

LoginCtrl.$inject = ['$scope', '$state', 'userServ', 'storageServ'];