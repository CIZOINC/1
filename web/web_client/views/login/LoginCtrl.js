/*global angular*/
angular
    .module('app.controls')
    .controller('LoginCtrl', LoginCtrl);

/* @ngInject */
function LoginCtrl($scope, $rootScope, $state, userServ, storageServ, playerServ) {
    "use strict";


    $scope = angular.extend($scope, {
        login: {
            email: '',
            password: ''
        },
        message: {
            title: '',
            description: '',
            isVisible: false,
            callback: function () {

            }
        },

        processLogin: processLogin,
        facebookLogin: facebookLogin,
        registerClick: registerClick,
        resetPasswordClick: resetPasswordClick,
        closeView: closeView,
        changeFocusOnEnter: changeFocusOnEnter,
        loginOnEnter: loginOnEnter
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


            $state.go($rootScope.wentFrom, $rootScope.wentFromParams);
        })
        .catch((response) => {
            let errors = _.map(response.data.errors, (error) => {
                return error.message;
            });
            playerServ.showMessage($scope, 'Error', errors.join(', '));
        });
    }

    function facebookLogin() {
        userServ.facebookAuth($scope.hostName)
            .then((response) => {
                storageServ.setItem($scope.storage.storageUserToken, response);
                $scope.storage.token = response;
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


                $state.go($rootScope.wentFrom, $rootScope.wentFromParams);
            })
            .catch(() => {
                playerServ.showMessage($scope, 'Error', 'Please try to register via Facebook later');
            });
    }

    function registerClick() {
        $state.go('register');
    }

    function resetPasswordClick() {
        $state.go('reset');
    }

    function closeView() {
        $state.go($rootScope.wentFrom, $rootScope.wentFromParams);
    }

    function changeFocusOnEnter(event) {
        if (event && event.keyCode === 13) {
            let passInput = document.querySelector('.login-form_input--pass');
            if (passInput) {
                passInput.focus();
            }
        }
    }
    
    function loginOnEnter(event) {
        if (event && event.keyCode === 13) {
            processLogin();
        }
    }
}

LoginCtrl.$inject = ['$scope', '$rootScope', '$state', 'userServ', 'storageServ', 'playerServ'];