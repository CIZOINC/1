'use strict';
(function () {
    angular.module('app.featured')
        .controller('VideosCtrl', function VideosCtrl($scope, $filter, videoNotifier) {
            // Init
            var init;

            $scope.allVideos = getVideos();

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
                $scope.filteredVideos = $filter('filter')($scope.allVideos.data, $scope.searchKeywords);
                return $scope.onFilterChange();
            };

            $scope.order = function (rowName) {
                if ($scope.row === rowName) {
                    return;
                }
                $scope.row = rowName;
                $scope.filteredVideos = $filter('orderBy')($scope.allVideos.data, rowName);
                return $scope.onOrderChange();
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

            init = function () {
                $scope.search();
                return $scope.select($scope.currentPage);
            };

            init();
        })
        .controller('VideoModalCtrl', function VideoModalCtrl($scope, $uibModal, $log) {
            // The video edit & add modal
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

            $scope.videoCategories = getCategories();

            $scope.categoryLookup = getCategories(true);

            $scope.ok = function () {
                $uibModalInstance.close($scope.video);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        .filter('readyNotReady', function readyNotReadyFilter() {
            return function (video) {
                var videoValidation = validateVideo(video);
                if (videoValidation) {
                    return video.visible ? '✓ Online' : 'Ready';
                } else {
                    return 'Not Ready';
                }
            };
        })
        .factory('videoNotifier', function videoNotifier() {
            var logIt;

            // toastr setting.
            toastr.options = {
                closeButton: true,
                positionClass: 'toast-top-right',
                timeOut: 3000
            };

            logIt = function (message, title, type, onClickEvent) {
                if (onClickEvent) {
                    toastr.options.onclick = function () {
                        return console.log('Trigger Modal');
                    };
                }
                return toastr[type](message, title);
            };

            return {
                log: function (message, title, onClickEvent) {
                    logIt(message, title, 'info', onClickEvent);
                },
                logWarning: function (message, title, onClickEvent) {
                    logIt(message, title, 'warning', onClickEvent);
                },
                logSuccess: function (message, title, onClickEvent) {
                    logIt(message, title, 'success', onClickEvent);
                },
                logError: function (message, title, onClickEvent) {
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
                video: function () {
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
            for (var stream of video.streams) {
                if (!stream.transcode_status) {
                    ++validStreams;
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

    function getVideos(createdBefore, createdAfter, count) {
        // Get the videos, optionally with created before / after / count (max 200)
        createdBefore = createdBefore ? createdBefore : null;
        createdAfter = createdAfter ? createdAfter : null;
        count = count ? count : 200;

        // Load the categories
        var categories = getCategories(true);

        // Mock data - 'All Videos' from http://staging.cizo.com/videos
        var allVideos = {
            data: [{
                id: 3279,
                created_at: '2016-02-06T05:26:31.593Z',
                updated_at: '2016-02-06T05:33:44.759Z',
                title: 'Batman v Superman - Trailer 2',
                description: 'Batman v Superman: Dawn of Justice Trailer 2 featured on Jimmy Kimmel - http://bit.ly/JKLSubscribe',
                mature_content: false,
                category_id: 11,
                visible: true,
                featured: null,
                tag_list: null,
                streams: [{
                    link: 'http://staging.cizo.com/videos/3279/streams/mp4',
                    stream_type: 'mp4'
                }, {
                    link: 'http://staging.cizo.com/videos/3279/streams/hls',
                    stream_type: 'hls'
                }]
            }, {
                id: 1063,
                created_at: '2016-01-21T23:40:56.860Z',
                updated_at: '2016-02-05T19:50:25.942Z',
                title: 'Suicide Squad',
                description: 'A secret government agency recruits imprisoned supervillains to execute dangerous black ops missions in exchange for clemency.',
                mature_content: true,
                category_id: 11,
                visible: true,
                featured: false,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/1063/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/1063/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/1063/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/1063/thumb_banner_original_filename.jpeg'
                },
                tag_list: 'action, horror',
                streams: [{
                    link: 'http://staging.cizo.com/videos/1063/streams/mp4',
                    stream_type: 'mp4'
                }, {
                    link: 'http://staging.cizo.com/videos/1063/streams/hls',
                    stream_type: 'hls'
                }]
            }, {
                id: 23,
                created_at: '2015-12-23T20:48:40.639Z',
                updated_at: '2016-02-05T19:59:51.063Z',
                title: 'Mad Max: Fury Road',
                description: 'A woman rebels against a tyrannical ruler in post apocalyptic Australia in search for her homeland with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
                mature_content: false,
                category_id: 11,
                visible: false,
                featured: false,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/thumb_banner_original_filename.jpeg'
                },
                tag_list: 'action',
                streams: [{
                    link: null,
                    stream_type: 'hls',
                    transcode_status: 'pending'
                }, {
                    link: null,
                    stream_type: 'mp4',
                    transcode_status: 'pending'
                }]
            }, {
                id: 31,
                created_at: '2015-12-23T22:27:31.935Z',
                updated_at: '2016-02-08T17:29:44.776Z',
                title: 'Mr. Robot',
                description: 'Follows a young computer programmer who suffers from social anxiety disorder and forms connections through hacking. He\'s recruited by a mysterious anarchist, who calls himself Mr. Robot.',
                mature_content: false,
                category_id: 12,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/31/Mr-Robot-Season-1-Finale-TV-Series-Review-Tom-Lorenzo-Site-TLO.jpg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/31/large_banner_Mr-Robot-Season-1-Finale-TV-Series-Review-Tom-Lorenzo-Site-TLO.jpg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/31/medium_banner_Mr-Robot-Season-1-Finale-TV-Series-Review-Tom-Lorenzo-Site-TLO.jpg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/31/thumb_banner_Mr-Robot-Season-1-Finale-TV-Series-Review-Tom-Lorenzo-Site-TLO.jpg'
                },
                tag_list: 'action, horror',
                streams: [{
                    link: 'http://staging.cizo.com/videos/31/streams/mp4',
                    stream_type: 'mp4'
                }, {
                    link: 'http://staging.cizo.com/videos/31/streams/hls',
                    stream_type: 'hls'
                }]
            }, {
                id: 30,
                created_at: '2015-12-23T20:51:36.450Z',
                updated_at: '2016-02-05T19:57:39.235Z',
                title: 'Star Wars',
                description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the universe from the Empire\'s world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.',
                mature_content: false,
                category_id: 11,
                visible: true,
                featured: false,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/30/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/30/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/30/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/30/thumb_banner_original_filename.jpeg'
                },
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/30/hls/index.m3u8',
                    stream_type: 'hls'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/30/mp4/video.mp4',
                    stream_type: 'mp4'
                }]
            }, {
                id: 29,
                created_at: '2015-12-23T20:51:21.059Z',
                updated_at: '2016-02-05T19:58:10.345Z',
                title: 'Fallout 4',
                description: 'Fallout 4',
                mature_content: false,
                category_id: 13,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/29/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/29/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/29/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/29/thumb_banner_original_filename.jpeg'
                },
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/29/mp4/video.mp4',
                    stream_type: 'mp4'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/29/hls/index.m3u8',
                    stream_type: 'hls'
                }]
            }, {
                id: 28,
                created_at: '2015-12-23T20:51:12.807Z',
                updated_at: '2016-02-05T19:58:35.513Z',
                title: 'Uncharted 4',
                description: 'Uncharted 4',
                mature_content: false,
                category_id: 13,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/28/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/28/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/28/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/28/thumb_banner_original_filename.jpeg'
                },
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/28/hls/index.m3u8',
                    stream_type: 'hls'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/28/mp4/video.mp4',
                    stream_type: 'mp4'
                }]
            }, {
                id: 27,
                created_at: '2015-12-23T20:51:01.197Z',
                updated_at: '2016-02-05T19:58:49.437Z',
                title: 'The Simpsons Movie',
                description: 'After Homer accidentally pollutes the town\'s water supply, Springfield is encased in a gigantic dome by the EPA and the Simpson family are declared fugitives.',
                mature_content: false,
                category_id: 11,
                visible: false,
                featured: false,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/27/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/27/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/27/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/27/thumb_banner_original_filename.jpeg'
                },
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/27/mp4/video.mp4',
                    stream_type: 'mp4'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/27/hls/index.m3u8',
                    stream_type: 'hls'
                }]
            }, {
                id: 26,
                created_at: '2015-12-23T20:50:03.793Z',
                updated_at: '2016-02-05T19:59:04.977Z',
                title: 'EDC Las Vegas',
                description: 'EDC Las Vegas',
                mature_content: false,
                category_id: 14,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/26/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/26/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/26/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/26/thumb_banner_original_filename.jpeg'
                },
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/26/hls/index.m3u8',
                    stream_type: 'hls'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/26/mp4/video.mp4',
                    stream_type: 'mp4'
                }]
            }, {
                id: 25,
                created_at: '2015-12-23T20:49:26.217Z',
                updated_at: '2016-02-05T19:59:23.753Z',
                title: ' Watch',
                description: ' Watch',
                mature_content: false,
                category_id: 14,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/25/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/25/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/25/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/25/thumb_banner_original_filename.jpeg'
                },
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/25/mp4/video.mp4',
                    stream_type: 'mp4'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/25/hls/index.m3u8',
                    stream_type: 'hls'
                }]
            }, {
                id: 24,
                created_at: '2015-12-23T20:49:02.230Z',
                updated_at: '2016-02-05T19:59:40.578Z',
                title: 'Avengers: Age of Ultron',
                description: 'When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it\'s up to Earth \'s Mightiest Heroes to stop the villainous Ultron from enacting his terrible plans.',
                mature_content: true,
                category_id: 11,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/thumb_banner_original_filename.jpeg'
                },
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/25/mp4/video.mp4',
                    stream_type: 'mp4'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/25/hls/index.m3u8',
                    stream_type: 'hls'
                }]
            }]
        };

        return allVideos;
    }

    function getFeatured() {
        var featuredVideos = {
            data: [{
                id: 25,
                created_at: '2015-12-23T20:49:26.217Z',
                updated_at: '2016-02-05T19:59:23.753Z',
                title: ' Watch',
                description: ' Watch',
                mature_content: false,
                category_id: 14,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/25/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/25/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/25/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/25/thumb_banner_original_filename.jpeg'
                },
                featured_order: 1,
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/25/mp4/video.mp4',
                    stream_type: 'mp4'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/25/hls/index.m3u8',
                    stream_type: 'hls'
                }]
            }, {
                id: 29,
                created_at: '2015-12-23T20:51:21.059Z',
                updated_at: '2016-02-05T19:58:10.345Z',
                title: 'Fallout 4',
                description: 'Fallout 4',
                mature_content: false,
                category_id: 13,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/29/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/29/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/29/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/29/thumb_banner_original_filename.jpeg'
                },
                featured_order: 2,
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/29/mp4/video.mp4',
                    stream_type: 'mp4'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/29/hls/index.m3u8',
                    stream_type: 'hls'
                }]
            }, {
                id: 28,
                created_at: '2015-12-23T20:51:12.807Z',
                updated_at: '2016-02-05T19:58:35.513Z',
                title: 'Uncharted 4',
                description: 'Uncharted 4',
                mature_content: false,
                category_id: 13,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/28/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/28/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/28/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/28/thumb_banner_original_filename.jpeg'
                },
                featured_order: 3,
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/28/hls/index.m3u8',
                    stream_type: 'hls'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/28/mp4/video.mp4',
                    stream_type: 'mp4'
                }]
            }, {
                id: 31,
                created_at: '2015-12-23T22:27:31.935Z',
                updated_at: '2016-02-08T17:29:44.776Z',
                title: 'Mr. Robot',
                description: 'Follows a young computer programmer who suffers from social anxiety disorder and forms connections through hacking. He\'s recruited by a mysterious anarchist, who calls himself Mr. Robot.',
                mature_content: false,
                category_id: 12,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/31/Mr-Robot-Season-1-Finale-TV-Series-Review-Tom-Lorenzo-Site-TLO.jpg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/31/large_banner_Mr-Robot-Season-1-Finale-TV-Series-Review-Tom-Lorenzo-Site-TLO.jpg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/31/medium_banner_Mr-Robot-Season-1-Finale-TV-Series-Review-Tom-Lorenzo-Site-TLO.jpg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/31/thumb_banner_Mr-Robot-Season-1-Finale-TV-Series-Review-Tom-Lorenzo-Site-TLO.jpg'
                },
                featured_order: 4,
                tag_list: 'action, horror',
                streams: [{
                    link: 'http://staging.cizo.com/videos/31/streams/mp4',
                    stream_type: 'mp4'
                }, {
                    link: 'http://staging.cizo.com/videos/31/streams/hls',
                    stream_type: 'hls'
                }]
            }, {
                id: 26,
                created_at: '2015-12-23T20:50:03.793Z',
                updated_at: '2016-02-05T19:59:04.977Z',
                title: 'EDC Las Vegas',
                description: 'EDC Las Vegas',
                mature_content: false,
                category_id: 14,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/26/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/26/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/26/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/26/thumb_banner_original_filename.jpeg'
                },
                featured_order: 5,
                tag_list: null,
                streams: [{
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/26/hls/index.m3u8',
                    stream_type: 'hls'
                }, {
                    link: 'https://cizo-assets.s3.amazonaws.com/staging/stream/26/mp4/video.mp4',
                    stream_type: 'mp4'
                }]
            }, {
                id: 24,
                created_at: '2015-12-23T20:49:02.230Z',
                updated_at: '2016-02-05T19:59:40.578Z',
                title: 'Avengers: Age of Ultron',
                description: 'When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it\'s up to Earth \'s Mightiest Heroes to stop the villainous Ultron from enacting his terrible plans.',
                mature_content: true,
                category_id: 11,
                visible: true,
                featured: true,
                hero_images: {
                    hero_image_link: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/original_filename.jpeg',
                    hero_image_link_large_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/large_banner_original_filename.jpeg',
                    hero_image_link_medium_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/medium_banner_original_filename.jpeg',
                    hero_image_link_thumb_banner: 'https://cizo-assets.s3.amazonaws.com/staging/images/videos/24/thumb_banner_original_filename.jpeg'
                },
                featured_order: 7,
                tag_list: null,
                streams: null
            }]
        };
        return featuredVideos;
    }

    function getCategories(processed) {
        // Get the categories and optionally process them into an object for reference (set 'processed' to true)
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
            for (var cat of videoCategories.data) {
                categoryObject[cat.id] = cat;
            }
            videoCategories = categoryObject;
        }

        return videoCategories;
    }
})();
