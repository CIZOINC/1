'use strict';

(function () {
    angular.module('app.users')
        .controller('UsersCtrl', function UsersCtrl($scope, $filter, $http, $location, $window, $uibModal, $timeout, configuration) {
            if (!$window.sessionStorage.token) {
                // Fail out to root without an admin token
                $location.url('/');
            }

            moment.updateLocale('en', {
                relativeTime: {
                    future: 'in %s',
                    past: '%s ago',
                    s: 'seconds',
                    m: 'a minute',
                    mm: '%d minutes',
                    h: 'an hour',
                    hh: '%d hours',
                    d: 'a day',
                    dd: '%d days',
                    M: 'a month',
                    MM: '%d months',
                    y: 'a year',
                    yy: '%d'
                }
            });

            var init;

            function userNotifier(type, title, message, onClickEvent) {
                // Pop-up toasters for featured users
                toastr.options = {
                    closeButton: true,
                    positionClass: 'toast-top-right',
                    timeOut: 3000
                };

                if (onClickEvent) {
                    toastr.options.onclick = onClickEvent;
                }

                return toastr[type](message, title);
            }

            function getUsers(callback) {
                // Get the featured users from the API
                let options = {
                    method: 'GET',
                    url: `${configuration.url}/users`,
                    headers: {
                        authorization: `Bearer ${$window.sessionStorage.token}`
                    }
                };

                $http(options).then(function successCB(response) {
                    for (let user of response.data.data) {
                        if (user.birthday) {
                            user.birthday = moment(user.birthday).toDate();
                        }
                    }
                    callback(null, response.data);
                }, function errorCB(response) {
                    callback(response.data);
                });
            }

            let modifyUserProperty = {
                flagAdmin: function (userID, adminStatus, callback) {
                    if ($window.sessionStorage.token) {
                        let options = {
                            method: 'PUT',
                            url: `${configuration.url}/users/${userID}`,
                            data: {
                                user: {
                                    is_admin: adminStatus
                                }
                            },
                            headers: {
                                authorization: `Bearer ${$window.sessionStorage.token}`
                            }
                        };

                        $http(options).then(function successCB(response) {
                            callback(null, response.data);
                        }, function errorCB(error) {
                            callback(error);
                        });
                    } else {
                        throw new Error('No Admin Token');
                    }
                },
                updateBirthday: function (userID, birthDate, callback) {
                    if ($window.sessionStorage.token) {
                        let options = {
                            method: 'PUT',
                            url: `${configuration.url}/users/${userID}`,
                            data: {
                                user: {
                                    birthday: birthDate
                                }
                            },
                            headers: {
                                authorization: `Bearer ${$window.sessionStorage.token}`
                            }
                        };

                        $http(options).then(function successCB(response) {
                            callback(null, response.data);
                        }, function errorCB(error) {
                            callback(error);
                        });
                    } else {
                        throw new Error('No Admin Token');
                    }
                },
                resetPassword: function (user, callback) {
                    if ($window.sessionStorage.token) {
                        let options = {
                            method: 'POST',
                            url: `${configuration.url}/users/password_reset`,
                            params: {
                                email: user.email
                            }
                        };

                        $http(options).then(function successCB(response) {
                            callback(null, response.data);
                        }, function errorCB(error) {
                            callback(error);
                        });
                    } else {
                        throw new Error('No Admin Token');
                    }
                }
            };

            $scope.users = {
                data: []
            };

            $scope.searchKeywords = '';

            $scope.filteredUsers = [];

            $scope.row = '';

            $scope.select = function (page) {
                var end, start;
                start = (page - 1) * $scope.numPerPage;
                end = start + $scope.numPerPage;
                $scope.currentPageUsers = $scope.filteredUsers.slice(start, end);
                return $scope.currentPageUsers;
            };

            $scope.onFilterChange = function () {
                $scope.select(1);
                $scope.currentPage = 1;
                $scope.row = '';
                return $scope.row;
            };

            $scope.onNumPerPageChange = function () {
                $scope.select(1);
                $scope.currentPage = 1;
                return $scope.currentPage;
            };

            $scope.onOrderChange = function () {
                $scope.select(1);
                $scope.currentPage = 1;
                return $scope.currentPage;
            };

            $scope.search = function () {
                $scope.filteredUsers = $filter('filter')($scope.users.data, $scope.searchKeywords);
                return $scope.onFilterChange();
            };

            $scope.order = function (rowName) {
                if ($scope.row === rowName) {
                    return;
                }
                $scope.row = rowName;
                $scope.filteredUsers = $filter('orderBy')($scope.users.data, rowName);
                $scope.onOrderChange();
                return;
            };

            $scope.calculateAge = function (user) {
                return moment(user.birthday).toNow(true);
            };

            $scope.modifyBirthdate = function (user, newBirthday) {
                modifyUserProperty.updateBirthday(user.id, moment(newBirthday).toDate(), function (err, res) {
                    if (err) {
                        userNotifier('danger', 'Error', `${err.toString()}`, function (clicked) {
                            console.error(clicked);
                        });
                    } else {
                        console.log(res);
                        userNotifier('success', 'Setting Modified', 'User\'s birthdate has been updated!', function (clicked) {
                            console.error(clicked);
                        });
                    }
                });
            };

            $scope.toggleAdmin = function (user) {
                modifyUserProperty.flagAdmin(user.id, user.is_admin, function (err) {
                    if (err) {
                        userNotifier('danger', 'Error', `${err.toString()}`, function (clicked) {
                            console.error(clicked);
                        });
                    } else {
                        userNotifier('success', 'Setting Modified', 'User\'s admin status has been updated!', function (clicked) {
                            console.error(clicked);
                        });
                    }
                });
            };

            $scope.resetPassword = function (user) {
                modifyUserProperty.resetPassword(user, function (err) {
                    if (err) {
                        userNotifier('danger', 'Error', `${err.toString()}`, function (clicked) {
                            console.error(clicked);
                        });
                    } else {
                        userNotifier('success', 'Reset requested', 'User\'s password reset has been requested!', function (clicked) {
                            console.error(clicked);
                        });
                    }
                });
            };

            $scope.picker = {
                opened: false
            };

            $scope.openPicker = function () {
                $timeout(function () {
                    $scope.picker.opened = true;
                });
            };

            $scope.closePicker = function () {
                $scope.picker.opened = false;
            };

            $scope.numPerPageOpt = [5, 10, 25, 50, 200];

            $scope.numPerPage = $scope.numPerPageOpt[1];

            $scope.currentPage = 1;

            $scope.currentPageUsers = [];

            $scope.animationsEnabled = true;

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };

            init = function init() {
                getUsers(function (err, users) {
                    if (err) {
                        throw new Error(err);
                    } else {
                        $scope.users = users;
                        $scope.search();
                        if ($location.search().add_user) {
                            openModal(null, $scope, $uibModal);
                            return $scope.select($scope.currentPage);
                        } else {
                            return $scope.select($scope.currentPage);
                        }
                    }
                });
            };

            init();
        });
})();
