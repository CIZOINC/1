/*global angular*/
angular
    .module('app.controls')
    .controller('RegisterCtrl', RegisterCtrl);

/* @ngInject */
function RegisterCtrl($scope, $log, $state, userServ, moment, playerServ, _, storageServ) {
    "use strict";

    let months = [
        { 'key': 0, 'name': 'January'},
        { 'key': 1, 'name': 'February'},
        { 'key': 2, 'name': 'March'},
        { 'key': 3, 'name': 'April'},
        { 'key': 4, 'name': 'May'},
        { 'key': 5, 'name': 'June'},
        { 'key': 6, 'name': 'July'},
        { 'key': 7, 'name': 'August'},
        { 'key': 8, 'name': 'September'},
        { 'key': 9, 'name': 'October'},
        { 'key': 10, 'name': 'November'},
        { 'key': 11, 'name': 'December'}
    ];

    $scope = angular.extend($scope, {
        register: {
            email: '',
            password: '',
            month: { 'key': 0, 'name': 'January'},
            day: '',
            year: ''
        },
        months: months,

        registerUser: registerUser,
        facebookRegister: facebookRegister,
        closeView: closeView,
        loginClick: loginClick,
        message: {
            title: '123',
            description: 'this is it',
            isVisible: false,
            callback: function () {

            }
        }
    });

    function registerUser() {
        let birthday = moment({
            year: $scope.register.year,
            month: $scope.register.month.key,
            day: $scope.register.day
        });

        if (birthday.isValid()) {
            userServ.registerUser($scope.hostName, {
                email: $scope.register.email,
                password: $scope.register.password,
                password_confirmation: $scope.register.password,
                birthday: birthday.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
            })
                .then( (response) => {
                    if (response.status === 200) {
                        playerServ.showMessage($scope, 'Success', 'You\'re successfully registered. Please enter your credentials in login screen.', () => {
                            $state.go('login');
                        })
                    }
                })
                .catch((response) => {
                    let errors = _.map(response.data.errors, (error) => {
                        return error.message;
                    });
                    playerServ.showMessage($scope, 'Error', errors.join(', '));
                });
        } else {
            playerServ.showMessage($scope, 'Error', 'Please enter correct date');
        }
    }

    function facebookRegister() {
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


                $state.go('home');
            })
            .catch(() => {
                playerServ.showMessage($scope, 'Error', 'Please try to register via Facebook later');
            });
    }

    function loginClick() {
        $state.go('login');
    }

    function closeView() {
        $state.go('home');
    }

}

RegisterCtrl.$inject = ['$scope', '$log', '$state', 'userServ', 'moment', 'playerServ', 'lodash', 'storageServ'];