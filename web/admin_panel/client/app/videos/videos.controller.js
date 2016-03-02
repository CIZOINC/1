'use strict';

(function () {
    angular.module('app.videos').controller('VideosCtrl', function VideosCtrl($scope, $filter, $http, $location, $window, Upload, videoNotifier) {
        if (!$window.sessionStorage.token) {
            $location.url('/');
        }

        var init;

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

        function flagMature(videoID, maturedFlag, callback) {
            if ($window.sessionStorage.token) {
                let options = {
                    method: 'PUT',
                    url: `https://staging.cizo.com/videos/${videoID}`,
                    data: {
                        mature_content: maturedFlag
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
            } else {
                throw new Error('No Admin Token');
            }
        }

        function flagVisible($scope, $http, videoID, visibleFlag, callback) {
            if ($window.sessionStorage.token) {
                let options = {
                    method: 'PUT',
                    url: `https://staging.cizo.com/videos/${videoID}`,
                    data: {
                        visible: visibleFlag
                    },
                    headers: {
                        authorization: `Bearer ${$window.sessionStorage.token}`
                    }
                };
                console.log(options);
                $http(options).then(function successCB(response) {
                    callback(null, response.data);
                }, function errorCB(error) {
                    callback(error.data);
                });
            } else {
                throw new Error('No Admin Token');
            }
        }

        function getCategories(processed) {
            processed = processed ? processed : false;

            var videoCategories = {
                data: [{
                    id: 11,
                    title: 'Movies'
                }, {
                    id: 12,
                    title: 'TV'
                }, {
                    id: 13,
                    title: 'Games'
                }, {
                    id: 14,
                    title: 'Lifestyle'
                }]
            };

            if (processed === true) {
                var categoryObject = {};
                for (var c = 0; c < videoCategories.data.length; c++) {
                    categoryObject[videoCategories.data[c].id] = videoCategories.data[c];
                }
                videoCategories = categoryObject;
            }

            return videoCategories;
        }

        $scope.videoCategories = getCategories();

        $scope.categoryLookup = getCategories(true);

        $scope.allVideos = {
            data: []
        };

        getVideos(null, null, null, $window, $scope, $http, function gotVideos(err, videos) {
            if (err) throw new Error(err);

            $scope.allVideos = videos;
            $scope.search();
        });

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
            $scope.filteredVideos = $filter('filter')($scope.allVideos.data, $scope.searchKeywords);
            return $scope.onFilterChange();
        };

        $scope.order = function (rowName) {
            if ($scope.row === rowName) {
                return;
            }
            $scope.row = rowName;
            $scope.filteredVideos = $filter('orderBy')($scope.allVideos.data, rowName);
            $scope.onOrderChange();
            return;
        };

        $scope.videoValid = function validateVideo(video) {
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
        };


        $scope.matureContent = function (video) {
            flagMature(video.id, video.mature_content, function (err, res) {
                if (err) {
                    console.error(err);
                } else if (res) {
                    console.log(res);
                }
            });
        };

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
                flagVisible($scope, $http, video.id, video.visible, function (err, res) {
                    if (err) {
                        console.error(err);
                    } else if (res) {
                        console.log(res);
                    }
                });
                videoNotifier.logWarning('Video has been removed from the video feed', 'Video Removed');
            } else if (!video.visible) {
                video.visible = true;
                flagVisible($scope, $http, video.id, video.visible, function (err, res) {
                    if (err) {
                        console.error(err);
                    } else if (res) {
                        console.log(res);
                    }
                });
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
            $scope.search();
            return $scope.select($scope.currentPage);
        };

        init();
    }).controller('VideoModalCtrl', function VideoModalCtrl($scope, $uibModal, $log) {
        $scope.animationsEnabled = true;

        $scope.openModal = function () {
            return openModal($scope, $uibModal, $log);
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    }).controller('VideoModalInstanceCtrl', function VideoModalInstanceCtrl($scope, $uibModalInstance, video) {
        $scope.video = video;

        $scope.videoCategories = getCategories();

        $scope.categoryLookup = getCategories(true);

        $scope.ok = function () {
            $uibModalInstance.close($scope.video);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }).filter('readyNotReady', function readyNotReadyFilter() {
        return function (video) {
            var videoValidation = validateVideo(video);
            if (videoValidation) {
                return video.visible ? '✓ Online' : 'Ready';
            } else {
                return 'Not Ready';
            }
        };
    }).factory('videoNotifier', function videoNotifier() {
        var logIt;

        toastr.options = {
            closeButton: true,
            positionClass: 'toast-top-right',
            timeOut: 3000
        };

        logIt = function logIt(message, title, type, onClickEvent) {
            if (onClickEvent) {
                toastr.options.onclick = function () {
                    return console.log('Trigger Modal');
                };
            }
            return toastr[type](message, title);
        };

        return {
            log: function log(message, title, onClickEvent) {
                logIt(message, title, 'info', onClickEvent);
            },
            logWarning: function logWarning(message, title, onClickEvent) {
                logIt(message, title, 'warning', onClickEvent);
            },
            logSuccess: function logSuccess(message, title, onClickEvent) {
                logIt(message, title, 'success', onClickEvent);
            },
            logError: function logError(message, title, onClickEvent) {
                logIt(message, title, 'error', onClickEvent);
            }
        };
    });

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

    function openModal($scope, $uibModal, $log) {
        var size = 'lg';

        var emptyVideo = {
            title: 'Add title',
            description: 'Add a video description',
            mature_content: false,
            category_id: 11,
            visible: false,
            featured: null,
            tag_list: 'Add, Movie, Tags',
            streams: [{
                link: null,
                stream_type: 'hls',
                transcode_status: 'pending'
            }, {
                link: null,
                stream_type: 'mp4',
                transcode_status: 'pending'
            }]
        };

        $scope.video = $scope.video || emptyVideo;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'videoModal.html',
            controller: 'VideoModalInstanceCtrl',
            size: size,
            resolve: {
                video: function video() {
                    return $scope.video || null;
                }
            }
        });

        modalInstance.result.then(function (video) {
            $scope.video = video;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    function getVideos(createdBefore, createdAfter, count, $window, $scope, $http, callback) {
        createdBefore = createdBefore ? createdBefore : null;
        createdAfter = createdAfter ? createdAfter : null;
        count = count ? count : 200;

        $http({
            method: 'GET',
            url: 'https://staging.cizo.com/videos',
            headers: {
                authorization: `Bearer ${$window.sessionStorage.token}`
            }
        }).then(function successCB(response) {
            callback(null, response.data);
        }, function errorCB(response) {
            callback(response.data);
        });
    }
})();
