'use strict';

(function () {
    angular.module('app.featured').controller('FeaturedCtrl', function FeaturedCtrl($scope, $filter, $http, videoNotifier) {
        var init;
        $scope.videoModels = {
            locked: false,
            selected: null
        }
        $scope.featuredVideos = {
            data: []
        };
        $scope.updateFeatured = function ($index, video) {
            $scope.featuredVideos.data.splice($index, 1);

            console.log($scope.featuredVideos);
        }
        getFeaturedVideos($scope, $http, function gotFeatured(err, videos) {
            if (err) throw new Error(err);

            $scope.featuredVideos = videos;
            $scope.search();
        });

        $scope.videoCategories = getCategories();

        $scope.categoryLookup = getCategories(true);

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

    function validateVideo(video) {
        if (typeof video.hero_images !== 'undefined') {
            var streamsCount = video.streams.length,
                validStreams = 0;
            for (var stream = 0; stream < video.streams.length; stream++) {
                if (video.streams[stream].transcode_status !== 'pending' && video.streams[stream].transcode_status !== 'processing') {
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

    function authenticate(apiUsername, apiPassword, $http, callback) {
        var authBody = {
            grant_type: 'password',
            username: apiUsername,
            password: apiPassword,
            scope: 'admin'
        };

        $http({
            method: 'POST',
            url: 'https://staging.cizo.com/oauth/token',
            data: authBody
        }).then(function successCB(response) {
            callback(null, response.data);
        }, function errorCB(response) {
            callback(response.data);
        });
    }

    function getFeaturedVideos($scope, $http, callback) {
        authenticate('hank@weezlabs.com', 'weezlabs', $http, function (err, response) {
            if (err) throw new Error(err);
            $http({
                method: 'GET',
                url: 'https://staging.cizo.com/featured',
                headers: {
                    authorization: 'Bearer ' + response.access_token
                }
            }).then(function successCB(response) {
                callback(null, response.data);
            }, function errorCB(response) {
                callback(response.data);
            });
        });
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
})();
