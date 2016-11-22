'use strict';

(function () {
    function validateVideo(video) {
        if (typeof video.hero_images !== 'undefined') {
            var streamsCount = video.streams.length,
                validStreams = 0;
            for (let stream of video.streams) {
                if (stream.transcode_status !== 'pending' && stream.transcode_status !== 'progressing') {
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

    angular.module('app.videos')
        .controller('VideosCtrl', function VideosCtrl($scope, $filter, $http, $location, $window, $uibModal, configuration) {
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
                    url: configuration.url + '/videos',
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
                    url: configuration.url + '/categories',
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

            function createVideo(inputValues, callback) {
                if (inputValues) {
                    let options = {
                        method: 'POST',
                        url: configuration.url + '/videos',
                        data: inputValues,
                        headers: {
                            authorization: `Bearer ${$window.sessionStorage.token}`
                        }
                    };

                    console.log(options);

                    $http(options).then(function successCB(response) {
                        callback(null, response.data);
                    }, function errorCB(error) {
                        callback(error);
                    });
                }
            }

            function updateVideo(videoObject, callback) {
                if ($window.sessionStorage.token) {
                    let videoUpdateBody = {
                            category_id: videoObject.category_id,
                            title: videoObject.title,
                            subtitle: videoObject.subtitle,
                            description: videoObject.description,
                            description_title: videoObject.description_title,
                            mature_content: videoObject.mature_content,
                            tag_list: videoObject.tag_list
                        },
                        options = {
                            method: 'PUT',
                            url: configuration.url + `/videos/${videoObject.id}`,
                            data: videoUpdateBody,
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

            function deleteVideo(videoId, callback) {
                let options = {
                    method: 'DELETE',
                    url: configuration.url + `/videos/${videoId}`,
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

            function openModal(video, $scope, $uibModal) {
                let emptyVideo = {
                    title: 'Add title',
                    subtitle: '',
                    description_title: '',
                    description: 'Add a video description',
                    mature_content: false,
                    visible: false,
                    featured: false,
                    tag_list: 'Add Tags'
                };

                function isEmptyVideo(video) {
                    return video.category_id === emptyVideo.category_id &&
                        video.description === emptyVideo.description &&
                        video.description_title === emptyVideo.description_title &&
                        video.title === emptyVideo.title &&
                        video.subtitle === emptyVideo.subtitle &&
                        video.tag_list === emptyVideo.tag_list;
                }

                if ($scope.videoCategories && $scope.videoCategories[0] && $scope.videoCategories[0].id) {
                    emptyVideo.category_id = $scope.videoCategories[0].id;
                } else {
                    emptyVideo.category_id = 11;
                }

                let updateVideoList = function () {
                    return getVideos(function gotVideos(err, videos) {
                        if (err) throw new Error(err);

                        $scope.videos = videos;
                        $scope.search();
                        if ($location.search().add_video) {
                            openModal($scope, $uibModal);
                        }
                        return $scope.select($scope.currentPage);
                    });
                };

                let deleteVideoCB = function (resultVideo) {
                        return deleteVideo(resultVideo.id, function (err) {
                            if (err) {
                                console.error(err);
                                updateVideoList();
                            } else {
                                console.log(`Deleted ${resultVideo.id}`);
                                updateVideoList();
                            }
                        });
                    },
                    updateVideoCB = function (resultVideo) {
                        return updateVideo(resultVideo, function (err, res) {
                            if (err) {
                                console.error(err);
                                updateVideoList();
                            } else {
                                console.log(res);
                                updateVideoList();
                            }
                        });
                    };

                if (!video) {
                    createVideo(emptyVideo, function (err, res) {
                        if (err) {
                            throw err;
                        } else {
                            console.log(`Created ${res.id}`);

                            $scope.video = res;

                            let modalInstance = $uibModal.open({
                                animation: true,
                                templateUrl: './app/videos/addvideo.html',
                                controller: 'VideoModalInstanceCtrl',
                                size: 'lg',
                                resolve: {
                                    video: function video() {
                                        return $scope.video;
                                    }
                                }
                            });

                            modalInstance.result.then(function (resultVideo) {
                                if (isEmptyVideo(resultVideo)) {
                                    deleteVideoCB(resultVideo);
                                } else {
                                    updateVideoCB(resultVideo);
                                }
                            }, function (result) {
                                if (isEmptyVideo($scope.video) || result === 'delete') {
                                    deleteVideoCB($scope.video);
                                }
                            });
                        }
                    });
                } else {
                    $scope.video = video;

                    let modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: './app/videos/addvideo.html',
                        controller: 'VideoModalInstanceCtrl',
                        size: 'lg',
                        resolve: {
                            video: function video() {
                                return $scope.video;
                            }
                        }
                    });

                    modalInstance.result.then(function (resultVideo) {
                        if (isEmptyVideo(resultVideo)) {
                            deleteVideoCB(resultVideo);
                        } else {
                            updateVideoCB(resultVideo);
                        }
                    }, function (result) {
                        if (isEmptyVideo($scope.video) || result === 'delete') {
                            deleteVideoCB($scope.video);
                        }
                    });
                }
            }

            let modifyVideoProperty = {
                flagMature: function (videoID, maturedFlag, callback) {
                    if ($window.sessionStorage.token) {
                        let options = {
                            method: 'PUT',
                            url: configuration.url + `/videos/${videoID}`,
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
                                url: configuration.url + `/featured/${videoID}`,
                                headers: {
                                    authorization: `Bearer ${$window.sessionStorage.token}`
                                }
                            };
                        } else if (featuredFlag === true) {
                            options = {
                                method: 'PUT',
                                url: configuration.url + `/featured/${videoID}`,
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
                            url: configuration.url + `/videos/${videoID}`,
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
                            url: configuration.url + `/videos/${videoID}`,
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
                            url: configuration.url + `/videos/${videoID}`,
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
                editSubTitle: function (videoID, subtitle, callback) {
                    if ($window.sessionStorage.token) {
                        let options = {
                            method: 'PUT',
                            url: configuration.url + `/videos/${videoID}`,
                            data: {
                                subtitle: subtitle
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
                            url: configuration.url + `/videos/${videoID}`,
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
                            url: configuration.url + `/videos/${videoID}`,
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
                modifyVideoProperty.flagFeatured(video.id, video.featured, function (err, res) {
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
                modifyVideoProperty.flagMature(video.id, video.mature_content, function (err, res) {
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
                        modifyVideoProperty.flagFeatured(video.id, video.featured, function (err, res) {
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
                                modifyVideoProperty.flagVisible(video.id, video.visible, function (err, res) {
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
                        modifyVideoProperty.flagVisible(video.id, video.visible, function (err, res) {
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
                    modifyVideoProperty.flagVisible(video.id, video.visible, function (err, res) {
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
                    modifyVideoProperty.editDescription(video.id, description, function (err, res) {
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
                    modifyVideoProperty.editTitle(video.id, title, function (err, res) {
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

            $scope.modifySubTitle = function (video, subtitle) {
                modifyVideoProperty.editSubTitle(video.id, subtitle, function (err, res) {
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
            };

            $scope.modifyCategory = function (video, category) {
                if (category) {
                    modifyVideoProperty.editCategory(video.id, category, function (err, res) {
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

            $scope.animationsEnabled = true;

            $scope.openModal = function (video) {
                return openModal(video, $scope, $uibModal);
            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };

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
                        $scope.search();
                        if ($location.search().add_video) {
                            openModal(null, $scope, $uibModal);
                            return $scope.select($scope.currentPage);
                        } else {
                            return $scope.select($scope.currentPage);
                        }
                    });
                });
            };

            init();
        })
        .controller('VideoModalInstanceCtrl', function VideoModalInstanceCtrl($scope, $window, $http, $filter, $uibModalInstance, Upload, $timeout, video, configuration, cropArea) {
            $scope.video = video;
            $scope.file = {};

            $scope.log = '';

            Upload.defaults.blobUrlsMaxMemory = 805306368;

            function generateSafeFilename(fileName) {
                return `${Math.random().toString(36).substring(7)}.${fileName.split('.').pop()}`;
            }

            function getUploadTicket(videoId, fileName, callback) {
                let safeFileName = generateSafeFilename(fileName);

                let options = {
                    method: 'GET',
                    url: configuration.url + `/videos/${videoId}/upload_ticket`,
                    headers: {
                        authorization: `Bearer ${$window.sessionStorage.token}`
                    },
                    params: {
                        filename: safeFileName
                    }
                };

                console.log(options);

                $http(options).then(function successCB(response) {
                    callback(null, response.data);
                }, function errorCB(error) {
                    callback(error);
                });
            }

            function triggerStreamTranscode(videoId, keyName, callback) {
                let options = {
                    method: 'POST',
                    url: configuration.url + `/videos/${videoId}/streams`,
                    headers: {
                        authorization: `Bearer ${$window.sessionStorage.token}`
                    },
                    params: {
                        key: keyName
                    }
                };

                $http(options).then(function successCB(response) {
                    callback(null, response.data);
                }, function errorCB(error) {
                    callback(error);
                });
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
                    callback(error);
                });
            }

            getCategories(function (err, res) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(res);
                    $scope.videoCategories = res.data;

                    $scope.categoryLookup = {};

                    for (let category of res.data) {
                        $scope.categoryLookup[category.id] = category;
                    }
                }
            });

            $scope.uploadFile = function (file) {
                if (!file) {
                    return false;
                }
                let fileType = file.type.split('/')[0].toLowerCase();

                if (fileType === 'image') {
                    //open crop dialog
                    cropArea.openCropModal(file).then(function (file) {
                        // Upload hero image
                        Upload.upload({
                            url: configuration.url + `/videos/${$scope.video.id}/hero_image`,
                            headers: {
                                authorization: `Bearer ${$window.sessionStorage.token}`
                            },
                            data: {
                                file: file
                            }
                        }).then(function (resp) {
                            $timeout(function () {
                                $scope.log = `file: ${resp.config.data.file.name}, Response: ${JSON.stringify(resp.data)}
                            ${$scope.log}`;
                            });
                        }, null, function (evt) {
                            let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log(progressPercentage);
                            if (progressPercentage < 100) {
                                $scope.progress = progressPercentage;
                            } else {
                                $scope.progress = null;
                            }
                        });
                    }, function (err) {

                    });
                } else if (fileType === 'video') {
                    // Upload video
                    getUploadTicket(video.id, file.name, function (err, res) {
                        if (err) {
                            console.error(err);
                        } else {
                            let options = {
                                url: res.url,
                                data: {
                                    key: res.key,
                                    'x-amz-date': res['x-amz-date'],
                                    Expires: res.Expires,
                                    'x-amz-credential': res['x-amz-credential'],
                                    'x-amz-algorithm': res['x-amz-algorithm'],
                                    policy: res.policy,
                                    'x-amz-security-token': res['x-amz-security-token'],
                                    'x-amz-signature': res['x-amz-signature'],
                                    file: file
                                }
                            };

                            Upload.upload(options).then(function (resp) {
                                console.log(resp);
                                $timeout(function () {
                                    $scope.log = `file: ${resp.config.data.file.name}, Response: ${JSON.stringify(resp.data)}
                                    ${$scope.log}`;
                                    triggerStreamTranscode($scope.video.id, res.key, function (err, res) {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            console.log(res);
                                        }
                                    });
                                });
                            }, null, function (evt) {
                                let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                console.log(progressPercentage);
                                if (progressPercentage < 100) {
                                    $scope.progress = progressPercentage;
                                } else {
                                    $scope.progress = null;
                                }
                            });
                        }
                    });
                }
            };

            $scope.tags = $scope.video.tag_list.split(/,\s?/);

            $scope.tagAdded = function (tags) {
                let tag_list = '';
                for (let tag in tags) {
                    console.log(tags.length, tag, tags[tag]);
                    if (parseInt(tag) === tags.length - 1) {
                        tag_list += tags[tag].text;
                    } else {
                        tag_list += `${tags[tag].text}, `;
                    }
                }
                video.tag_list = tag_list;
            };

            $scope.ok = function () {
                $uibModalInstance.close($scope.video);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.deleteCancel = function (result) {
                $uibModalInstance.dismiss(result);
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
