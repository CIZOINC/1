'use strict';

(function () {
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

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './app/videos/addvideo.html',
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

    angular
        .module('app.videos').controller('VideosCtrl', function VideosCtrl($scope, $filter, $http, $location, $window, Upload) {
            if (!$window.sessionStorage.token) {
                // Fail out to root without an admin token
                $location.url('/');
            }

            var init;

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
                    callback(error);
                });
            }

            let modifyVideo = {
                flagMature: function (videoID, maturedFlag, callback) {
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
                            callback(error);
                        });
                    } else {
                        throw new Error('No Admin Token');
                    }
                },
                flagFeatured: function (videoID, featuredFlag, callback) {
                    // Flag a video as featured and add to end of list
                    if ($window.sessionStorage.token) {
                        let options;
                        if (featuredFlag === false) {
                            options = {
                                method: 'DELETE',
                                url: `https://staging.cizo.com/featured/${videoID}`,
                                headers: {
                                    authorization: `Bearer ${$window.sessionStorage.token}`
                                }
                            };
                        } else if (featuredFlag === true) {
                            options = {
                                method: 'PUT',
                                url: `https://staging.cizo.com/featured/${videoID}`,
                                headers: {
                                    authorization: `Bearer ${$window.sessionStorage.token}`
                                }
                            };
                        }

                        $http(options).then(function successCB(response) {
                            callback(null, response.data);
                        }, function errorCB(error) {
                            callback(error);
                        });
                    } else {
                        throw new Error('No Admin Token');
                    }
                },
                flagVisible: function (videoID, visibleFlag, callback) {
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

                        $http(options).then(function successCB(response) {
                            callback(null, response.data);
                        }, function errorCB(error) {
                            callback(error);
                        });
                    } else {
                        throw new Error('No Admin Token');
                    }
                },
                editDescription: function (videoID, videoDescription, callback) {
                    if ($window.sessionStorage.token) {
                        let options = {
                            method: 'PUT',
                            url: `https://staging.cizo.com/videos/${videoID}`,
                            data: {
                                description: videoDescription
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
                editTitle: function (videoID, videoTitle, callback) {
                    if ($window.sessionStorage.token) {
                        let options = {
                            method: 'PUT',
                            url: `https://staging.cizo.com/videos/${videoID}`,
                            data: {
                                title: videoTitle
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
                editCategory: function (videoID, categoryId, callback) {
                    if ($window.sessionStorage.token) {
                        let options = {
                            method: 'PUT',
                            url: `https://staging.cizo.com/videos/${videoID}`,
                            data: {
                                category_id: categoryId
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
                editTaglist: function (videoID, tagList, callback) {
                    if ($window.sessionStorage.token) {
                        let options = {
                            method: 'PUT',
                            url: `https://staging.cizo.com/videos/${videoID}`,
                            data: {
                                tag_list: tagList
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
                }
            };

            $scope.videos = {
                data: []
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
                $scope.filteredVideos = $filter('filter')($scope.videos.data, $scope.searchKeywords);
                return $scope.onFilterChange();
            };

            $scope.order = function (rowName) {
                if ($scope.row === rowName) {
                    return;
                }
                $scope.row = rowName;
                $scope.filteredVideos = $filter('orderBy')($scope.videos.data, rowName);
                $scope.onOrderChange();
                return;
            };

            $scope.validateVideo = validateVideo;

            $scope.featuredVideo = function (video) {
                modifyVideo.flagFeatured(video.id, video.featured, function (err, res) {
                    let responseType = {
                        errorText: null,
                        successText: null
                    };

                    if (video.featured === false) {
                        responseType.errorText = 'remove from';
                        responseType.successText = 'removed from';
                    } else {
                        responseType.errorText = 'add to';
                        responseType.successText = 'added to';
                    }

                    if (err) {
                        videoNotifier('danger', 'Error', `Unable to ${responseType.errorText} featured carousel.`, function (clicked) {
                            console.error(clicked);
                        });
                    } else {
                        videoNotifier('success', 'Success', `Successfully ${responseType.successText} featured carousel.`, function (clicked) {
                            console.log(clicked, res);
                        });
                    }
                });
            };

            $scope.matureContent = function (video) {
                modifyVideo.flagMature(video.id, video.mature_content, function (err, res) {
                    if (err) {
                        console.error(err);
                    } else if (res) {
                        console.log(res);
                    }
                });
            };

            $scope.videoClasses = function (video) {
                if ($scope.validateVideo(video)) {
                    if (video.visible && video.featured) {
                        return 'btn btn-w-sm btn-gap-v btn-warning';
                    } else if (video.visible) {
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
                    videoNotifier('log', 'Oops!', 'This video isn’t ready for adding, click \'Edit\' and upload an image / video', function (clicked) {
                        console.log(clicked, video);
                    });
                } else if (video.visible) {
                    video.visible = false;
                    if (video.featured) {
                        video.featured = false;
                        modifyVideo.flagFeatured(video.id, video.featured, function (err, res) {
                            let responseType = {
                                errorText: null,
                                successText: null
                            };

                            if (video.featured === false) {
                                responseType.errorText = 'remove from';
                                responseType.successText = 'removed from';
                            } else {
                                responseType.errorText = 'add to';
                                responseType.successText = 'added to';
                            }

                            if (err) {
                                videoNotifier('danger', 'Error', `Unable to ${responseType.errorText} featured carousel.`, function (clicked) {
                                    console.error(clicked);
                                });
                            } else {
                                videoNotifier('success', 'Success', `Successfully ${responseType.successText} featured carousel.`, function (clicked) {
                                    console.log(clicked, res);
                                });
                                modifyVideo.flagVisible(video.id, video.visible, function (err, res) {
                                    if (err) {
                                        videoNotifier('danger', 'Error', 'Unable to remove the video from the feed.', function (clicked) {
                                            console.error(clicked);
                                        });
                                    } else {
                                        videoNotifier('warning', 'Video Removed', 'Video has been removed from the video feed', function (clicked) {
                                            console.log(clicked, res, video);
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        modifyVideo.flagVisible(video.id, video.visible, function (err, res) {
                            if (err) {
                                console.error(err);
                            } else {
                                videoNotifier('warning', 'Video Removed', 'Video has been removed from the video feed', function (clicked) {
                                    console.log(clicked, res, video);
                                });
                            }
                        });
                    }
                } else if (!video.visible) {
                    video.visible = true;
                    modifyVideo.flagVisible(video.id, video.visible, function (err, res) {
                        if (err) {
                            console.error(err);
                        } else {
                            videoNotifier('success', 'Video Added', 'Video has been added to the video feed', function (clicked) {
                                console.log(clicked, res, video);
                            });
                        }
                    });
                } else {
                    console.log('error');
                }
            };

            $scope.modifyDescription = function (video, description) {
                if (description) {
                    modifyVideo.editDescription(video.id, description, function (err, res) {
                        if (err) {
                            videoNotifier('danger', 'Error', 'Unable to modify the video\'s description due to a server error.', function (clicked) {
                                console.error(clicked);
                            });
                            return 'Server error';
                        } else {
                            console.log(res);
                            return true;
                        }
                    });
                } else {
                    return 'Invalid description, must contain at least one character.';
                }
            };

            $scope.modifyTitle = function (video, title) {
                if (title) {
                    modifyVideo.editTitle(video.id, title, function (err, res) {
                        if (err) {
                            videoNotifier('danger', 'Error', 'Unable to modify the video\'s title due to a server error.', function (clicked) {
                                console.error(clicked);
                            });
                            return 'Server error';
                        } else {
                            console.log(res);
                            return true;
                        }
                    });
                } else {
                    return 'Invalid title, must contain at least one character.';
                }
            };

            $scope.modifyCategory = function (video, category) {
                if (category) {
                    modifyVideo.editCategory(video.id, category, function (err, res) {
                        if (err) {
                            videoNotifier('danger', 'Error', 'Unable to modify the video\'s category due to a server error.', function (clicked) {
                                console.error(clicked);
                            });
                            return 'Server error';
                        } else {
                            console.log(res);
                            return true;
                        }
                    });
                } else {
                    return 'Invalid category, must contain at least one character.';
                }
            };

            $scope.numPerPageOpt = [5, 10, 25, 50, 200];

            $scope.numPerPage = $scope.numPerPageOpt[1];

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
                    console.log($scope.videoCategories);
                    getVideos(function gotVideos(err, videos) {
                        if (err) throw new Error(err);

                        $scope.videos = videos;
                        $scope.search();
                        return $scope.select($scope.currentPage);
                    });
                });
            };

            init();
        })
        .controller('VideoModalCtrl', function VideoModalCtrl($scope, $uibModal, $log) {
            $scope.animationsEnabled = true;

            $scope.openModal = function () {
                return openModal($scope, $uibModal, $log);
            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };
        })
        .controller('VideoModalInstanceCtrl', function VideoModalInstanceCtrl($scope, $uibModalInstance, video) {
            $scope.video = video;

            $scope.ok = function () {
                $uibModalInstance.close($scope.video);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        .filter('readyNotReady', function readyNotReadyFilter() {
            return function (video) {
                let videoValidation = validateVideo(video);
                if (videoValidation && video.featured) {
                    return '✓ Featured';
                } else if (videoValidation) {
                    return video.visible ? '✓ Online' : 'Ready';
                } else {
                    return 'Not Ready';
                }
            };
        });
})();
