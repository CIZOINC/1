'use strict';

(function () {
    angular.module('app.featured').controller('FeaturedCtrl', function FeaturedCtrl($scope, $filter, $http, $window) {
        if (!$window.sessionStorage.token) {
            $location.url('/');
        }

        function videoNotifier(type, title, message, onClickEvent) {
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
                url: 'https://staging.cizo.com/categories',
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
                url: 'https://staging.cizo.com/featured',
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

        function getVideos(callback) {
            // Get the featured videos from the API
            let options = {
                method: 'GET',
                url: 'https://staging.cizo.com/videos',
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
                url: `https://staging.cizo.com/featured/${videoID}`,
                data: {
                    featured_order: featuredOrder
                },
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

        function removeFeatured(videoID, callback) {
            // Update the featured_order of a specific video
            let options = {
                method: 'DELETE',
                url: `https://staging.cizo.com/featured/${videoID}`,
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

        function validateVideo(video) {
            if (typeof video.hero_images !== 'undefined') {
                var streamsCount = video.streams.length,
                    validStreams = 0;
                for (let stream of video.streams) {
                    if (stream.transcode_status !== 'pending' && stream.transcode_status !== 'processing') {
                        validStreams++;
                    }
                }

                if (streamsCount === validStreams) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        var inputFeaturedVideos = [],
            inputFeaturedOrder = {},
            videoIndex,
            init;

        $scope.videoModels = {
            locked: true,
            selected: null
        };

        $scope.removeFeatured = function (video) {
            for (let r in $scope.featuredVideos.data) {
                if (video.id === $scope.featuredVideos.data[r].id) {
                    $scope.featuredVideos.data.splice(r, 1);
                }
            }
            removeFeatured(video.id, function (err, res) {
                if (err) {
                    videoNotifier('danger', 'Error:', 'Unable to remove featured video.', function (clicked) {
                        console.log(clicked);
                    });
                } else {
                    videoNotifier('success', 'Success', 'The video has been removed from featured carousel.', function (clicked) {
                        console.log(clicked, res);
                    });
                }
            });
        };

        $scope.updateOrder = function (cancelled) {
            if (cancelled && $scope.videoModels.locked === false) {
                $scope.featuredVideos.data = inputFeaturedVideos;
                $scope.videoModels.locked = true;
                inputFeaturedVideos = [];
            } else if ($scope.videoModels.locked === false) {
                videoIndex = 1;

                for (let outputVideo of $scope.featuredVideos.data) {
                    updateFeaturedOrder(outputVideo.id, videoIndex, function (err, result) {
                        if (err) {
                            console.error(err);
                        } else if (result) {
                            console.log(result);
                        }
                    });
                    videoIndex++;
                }

                $scope.videoModels.locked = true;
                inputFeaturedVideos = [];
            } else {
                videoIndex = 1;

                // Save the initial order
                for (let inputVideo of $scope.featuredVideos.data) {
                    inputFeaturedVideos.push(inputVideo);
                    inputFeaturedOrder[inputVideo.id] = videoIndex;
                    videoIndex++;
                }

                $scope.videoModels.locked = false;
            }
        };

        $scope.updateFeatured = function ($index) {
            $scope.featuredVideos.data.splice($index, 1);
        };

        $scope.searchKeywords = '';

        $scope.filteredVideos = [];

        $scope.row = '';

        $scope.select = function (page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            $scope.currentPageVideos = $scope.filteredVideos.slice(start, end);
            return $scope.currentPageVideos;
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
            $scope.filteredVideos = $filter('filter')($scope.featuredVideos.data, $scope.searchKeywords);
            return $scope.onFilterChange();
        };

        $scope.order = function (rowName) {
            if ($scope.row === rowName) {
                return;
            }
            $scope.row = rowName;
            $scope.filteredVideos = $filter('orderBy')($scope.featuredVideos.data, rowName);
            $scope.onOrderChange();
            return;
        };

        $scope.videoValid = validateVideo;

        $scope.videoClasses = function (video) {
            if ($scope.videoValid(video)) {
                if (video.visible) {
                    return 'btn btn-w-sm btn-gap-v btn-primary';
                } else {
                    return 'btn btn-w-sm btn-gap-v btn-dark';
                }
            } else {
                return 'btn btn-w-sm btn-gap-v btn-line-default';
            }
        };

        $scope.modifyVisible = function (video) {
            if (!validateVideo(video)) {
                videoNotifier.log('This video isn’t ready for adding, click \'Edit\' and upload an image / video', 'Oops!', true);
            } else if (video.visible) {
                video.visible = false;
                videoNotifier.logWarning('Video has been removed from the video feed', 'Video Removed');
            } else if (!video.visible) {
                video.visible = true;
                videoNotifier.logSuccess('Video has been added to the video feed', 'Video Added');
            } else {
                console.log('error');
            }
        };

        $scope.numPerPageOpt = [3, 5, 10, 20];

        $scope.numPerPage = $scope.numPerPageOpt[2];

        $scope.currentPage = 1;

        $scope.currentPageVideos = [];

        init = function init() {
            getCategories(function gotCategories(err, categories) {
                if (err) throw new Error(err);
                $scope.videoCategories = categories.data;

                $scope.categoryLookup = {};

                for (let category of categories.data) {
                    $scope.categoryLookup[category.id] = category;
                }

                getVideos(function gotVideos(err, videos) {
                    if (err) throw new Error(err);

                    $scope.videos = videos;
                });

                getFeaturedVideos(function gotFeaturedVideos(err, featuredVids) {
                    if (err) throw new Error(err);

                    $scope.featuredVideos = featuredVids;
                    $scope.search();
                    return $scope.select($scope.currentPage);
                });
            });
        };

        init();
    });
})();
