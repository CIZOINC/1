'use strict';

(function () {
    angular.module('app.featured').controller('FeaturedCtrl', function FeaturedCtrl($scope, $filter, $http, $window, configuration) {
        if (!$window.sessionStorage.token) {
            // Fail out to root without an admin token
            $location.url('/');
        }

        function videoNotifier(type, title, message, onClickEvent) {
            // Pop-up toasters for featured videos
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

        function getCategories(callback) {
            // Get the available categories from the API
            let options = {
                method: 'GET',
                url: configuration.url + '/categories',
                headers: {
                    authorization: `Bearer ${$window.sessionStorage.token}`
                }
            };

            $http(options).then(function successCB(response) {
                callback(null, response.data);
            }, function errorCB(error) {
                callback(error.data);
            });
        }

        function getFeaturedVideos(callback) {
            // Get the featured videos from the API
            let options = {
                method: 'GET',
                url: configuration.url + '/featured',
                headers: {
                    authorization: `Bearer ${$window.sessionStorage.token}`
                }
            };

            $http(options).then(function successCB(response) {
                callback(null, response.data);
            }, function errorCB(response) {
                callback(response.data);
            });
        }

        function updateFeaturedOrder(videoID, featuredOrder, callback) {
            // Update the featured_order of a specific video
            let options = {
                method: 'PUT',
                url: configuration.url + `/featured/${videoID}`,
                data: {
                    featured_order: featuredOrder
                },
                headers: {
                    authorization: `Bearer ${$window.sessionStorage.token}`
                }
            };

            $http(options).then(function successCB(response) {
                callback(null, response);
            }, function errorCB(error) {
                callback(error);
            });
        }

        function removeFeatured(videoID, callback) {
            // Update the featured_order of a specific video
            let options = {
                method: 'DELETE',
                url: configuration.url + `/featured/${videoID}`,
                headers: {
                    authorization: `Bearer ${$window.sessionStorage.token}`
                }
            };

            $http(options).then(function successCB(response) {
                callback(null, response.data);
            }, function errorCB(error) {
                callback(error.data);
            });
        }

        var inputFeaturedVideos = [],
            inputFeaturedOrder = {},
            init;

        $scope.videoModels = {
            locked: true
        };

        $scope.removeFeatured = function (video) {
            // Remove a featured video from the featured list
            for (let r in $scope.featuredVideos.data) {
                if (video.id === $scope.featuredVideos.data[r].id) {
                    $scope.featuredVideos.data.splice(r, 1);
                }
            }
            removeFeatured(video.id, function (err, res) {
                if (err) {
                    videoNotifier('danger', 'Error', 'Unable to remove featured video.', function (clicked) {
                        console.error(clicked);
                    });
                } else {
                    videoNotifier('success', 'Success', 'The video has been removed from featured carousel.', function (clicked) {
                        console.log(clicked, res);
                    });
                }
            });
        };

        $scope.updateFeaturedArray = function ($index) {
            // Slice the array at the right position
            $scope.featuredVideos.data.splice($index, 1);
        };

        $scope.updateOrder = function (cancelled) {
            if (cancelled && $scope.videoModels.locked === false) {
                $scope.featuredVideos.data = inputFeaturedVideos;
                $scope.videoModels.locked = true;
                inputFeaturedVideos = [];
            } else if ($scope.videoModels.locked === false) {
                let videoIndex = 1,
                    updateSuccess = true;

                for (let o in $scope.featuredVideos.data) {
                    updateFeaturedOrder($scope.featuredVideos.data[o].id, videoIndex, function (err, result) {
                        if (err) {
                            updateSuccess = false;
                            videoNotifier('danger', 'Error', 'Unable to update featured video order.', function (clicked) {
                                console.error(err, clicked);
                            });
                        } else {
                            if (parseInt(o) === ($scope.featuredVideos.data.length - 1) && updateSuccess === true) {
                                videoNotifier('success', 'Success', 'The featured video order has been updated.', function (clicked) {
                                    console.log(clicked, result);
                                });
                            }
                        }
                    });
                    videoIndex++;
                }

                $scope.videoModels.locked = true;
                inputFeaturedVideos = [];
            } else {
                let videoIndex = 1;

                // Save the initial order
                for (let inputVideo of $scope.featuredVideos.data) {
                    inputFeaturedVideos.push(inputVideo);
                    inputFeaturedOrder[inputVideo.id] = videoIndex;
                    videoIndex++;
                }

                $scope.videoModels.locked = false;
            }
        };

        init = function init() {
            getCategories(function gotCategories(err, categories) {
                if (err) throw new Error(err);
                $scope.videoCategories = categories.data;

                $scope.categoryLookup = {};

                for (let category of categories.data) {
                    $scope.categoryLookup[category.id] = category;
                }

                getFeaturedVideos(function gotFeaturedVideos(err, featuredVids) {
                    if (err) throw new Error(err);

                    $scope.featuredVideos = featuredVids;
                });
            });
        };

        init();
    });
})();
