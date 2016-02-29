angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("index_template.html","<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>Cizo</title>\r\n    <link rel=\"stylesheet\" href=\"all.min.css\">\r\n</head>\r\n<body ng-controller=\"AppCtrl\">\r\n\r\n<div ui-view></div>\r\n\r\n<script src=\"3d-party.min.js\"></script>\r\n<script src=\"ng.min.js\"></script>\r\n<script>\r\n    angular.bootstrap(document, [\'app\']);\r\n</script>\r\n\r\n</body>\r\n</html>");
$templateCache.put("components/category-items/category-items.html","<div class=\"category-items\" id=\"category-videos-{{::categoryId}}\">\r\n    <div class=\"category-items_title\">\r\n        <span class=\"icon-category{{::iconName}} category-items_title_icon\"></span>\r\n        <span class=\"category-items_title_name\">{{::title}}</span>\r\n    </div>\r\n\r\n    <div class=\"category-items_videos\">\r\n        <div class=\"category-items_videos_item\"\r\n             ng-repeat=\"video in videosList\"\r\n             style=\"background-image: url(\'{{video.hero_images.hero_image_link}}\')\"\r\n             ng-click=\"moveToPlayPage(video.id)\"\r\n        >\r\n            <div class=\"category-items_videos_item_title\">\r\n                <span class=\"category-items_videos_item_title_date\">{{::video.humanizedDate}}</span>\r\n                <span class=\"category-items_videos_item_title_caption\">{{::video.title}}</span>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"category-items_videos_item-view-all\" ng-show=\"manyItems\" ng-click=\"moveToPlayPage(videosList[0].id)\">\r\n            <span class=\"category-items_videos_item-view-all_title\">View all</span>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("components/featured-carousel/featured-carousel.html","<div class=\"featured-carousel\">\r\n    <button class=\"featured-carousel_left icon-back\"  ng-click=\"movePrev()\"></button>\r\n    <div class=\"featured-carousel_content\">\r\n        <div class=\"featured-carousel_content_wrapper\" ng-style=\"{\'margin-left\': itemsOffset}\">\r\n            <div class=\"featured-carousel_content_item\"\r\n                 ng-repeat=\"featured in featuredList\"\r\n                 ng-click=\"playFeatured(featured.id)\"\r\n                 ng-attr-id=\"{{\'featured-carousel-video-\' + featured.id}}\"\r\n            >\r\n                <div class=\"featured-carousel_content_item_image\" style=\"background-image: url(\'{{::featured.hero_images.hero_image_link}}\')\"></div>\r\n\r\n                <div class=\"featured-carousel_content_item_label\">Featured</div>\r\n                <div class=\"featured-carousel_content_item_intermission hidden-layer\">\r\n                    <span class=\"icon-share featured-carousel_content_item_intermission_button\"></span>\r\n                    <span class=\"icon-replay featured-carousel_content_item_intermission_button\" ng-click=\"replay()\"></span>\r\n                </div>\r\n                <div class=\"featured-carousel_content_item_title\">{{::featured.title}}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <button class=\"featured-carousel_right icon-forward\" ng-click=\"moveNext()\"></button>\r\n</div>");
$templateCache.put("components/featured-player/featuredPlayer.html","\r\n\r\n<div class=\"featured-player\" video-id=\"{{video.id}}\">\r\n    <top-menu categories=\"categoriesList\"></top-menu>\r\n    <!-- video layer -->\r\n    <div class=\"video-layer featured-player_video-layer\">\r\n        <video class=\"featured-player_video-layer_video\" video-src=\"sources\" preload=\'none\'></video>\r\n    </div>\r\n\r\n    <!-- next hero image layer -->\r\n    <div class=\"col-xs-12 no-padding hero-image-layer featured-player_hero-image-layer-next hidden-layer\" style=\"background-image: url({{nextVideo.hero_images.hero_image_link}})\">\r\n    </div>\r\n\r\n    <featured-carousel featured-list=\"featuredList\" selected-video=\"featuredItem\" on-replay=\"replayVideo()\"></featured-carousel>\r\n</div>\r\n\r\n<!-- description layer-->\r\n<div class=\"col-xs-12 no-padding featured-player_description-layer hidden-layer\">\r\n    <div class=\"featured-player_description-layer_container\">\r\n        <div class=\"featured-player_description-layer_container_close-container\">\r\n            <div class=\"featured-player_description-layer_container_close-container_button icon-close\" ng-click=\"toggleDescription($event, false)\"></div>\r\n        </div>\r\n\r\n        <div class=\"featured-player_description-layer_container_titles\">\r\n            <div class=\"featured-player_description-layer_container_titles_category icon-category{{iconTitle}}\"></div>\r\n\r\n            <div class=\"featured-player_description-layer_container_titles_labels\">\r\n                        <span class=\"featured-player_description-layer_container_titles_labels_created\">\r\n                            {{createdDate}}\r\n                        </span>\r\n                        <span class=\"featured-player_description-layer_container_titles_labels_title\">\r\n                            {{video.title}}\r\n                        </span>\r\n            </div>\r\n        </div>\r\n        <div class=\"featured-player_description-layer_container_text\">\r\n            {{video.description}}\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n<!-- buttons layer-->\r\n<div class=\"featured-player_buttons-layer\"\r\n     ng-mouseenter=\"imageHover()\"\r\n     ng-mouseleave=\"imageBlur()\"\r\n     ng-click=\"togglePlayPause()\"\r\n     ng-dblclick=\"toggleFullScreen()\"\r\n     ng-mousemove=\"showControlsOnMove()\"\r\n>\r\n    <!-- top buttons-->\r\n    <div class=\"featured-player_buttons-layer_top-elements\">\r\n        <div>\r\n\r\n        </div>\r\n\r\n\r\n        <div class=\"featured-player_buttons-layer_top-elements_rightside\">\r\n            <span class=\"icon-favorites featured-player_buttons-layer_top-elements_rightside_buttons\"></span>\r\n            <span class=\"icon-info featured-player_buttons-layer_top-elements_rightside_buttons\" ng-click=\"toggleDescription($event, true)\"></span>\r\n            <span class=\"icon-share featured-player_buttons-layer_top-elements_rightside_buttons\" ng-click=\"shareVideo($event)\"></span>\r\n        </div>\r\n    </div>\r\n    <!-- center elements-->\r\n    <div class=\"featured-player_buttons-layer_center-elements stop-selection\">\r\n\r\n        <div class=\"featured-player_buttons-layer_center-elements_group\">\r\n            <div class=\"featured-player_buttons-layer_center-elements_group_title hidden-layer\" ng-show=\"getNextVideo()\">\r\n                Up next\r\n                <div class=\"featured-player_buttons-layer_center-elements_group_title_caption\">{{nextVideo.title}}</div>\r\n            </div>\r\n            <div class=\"featured-player_buttons-layer_center-elements_group_controls\">\r\n                <div class=\"featured-player_buttons-layer_center-elements_prev-next-wrapper\">\r\n                    <span class=\"icon-back featured-player_buttons-layer_center-elements_prev hidden-layer\" ng-click=\"playPreviousVideo($event)\"  ng-show=\"getPreviousVideo()\"></span>\r\n                </div>\r\n\r\n                <div class=\"featured-player_buttons-layer_center-elements_group_controls_wrapper\">\r\n                    <div  class=\"featured-player_buttons-layer_center-elements_group_controls_progress hidden-layer\"\r\n                          round-progress\r\n                          max=\"intermissionCountdownMax\"\r\n                          current=\"intermissionCountdownValue\"\r\n                          color=\"url(#progress-gradient)\"\r\n                          bgcolor=\"rgba(255, 255, 255, 0.4)\"\r\n                          stroke=\"20\"\r\n                          semi=\"false\"\r\n                          round=\"100\"\r\n                          rounded=\"false\"\r\n                          clockwise=\"true\"\r\n                          responsive=\"false\"\r\n                          duration=\"800\"\r\n                          animation=\"easeInOutQuart\"\r\n                          animation-delay=\"0\">\r\n                        <svg>\r\n                            <linearGradient id=\"progress-gradient\" x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\">\r\n                                <stop offset=\"5%\"  stop-color=\"#24abbc\"></stop>\r\n                                <stop offset=\"95%\" stop-color=\"#3bfcec\"></stop>\r\n                            </linearGradient>\r\n                        </svg>\r\n                    </div>\r\n                    <div class=\"featured-player_buttons-layer_center-elements_group_controls_wrapper-play-pause\">\r\n                        <img src=\"images/iconVideoPlay.svg\" ng-click=\"togglePlayPause($event)\" class=\"featured-player_buttons-layer_center-elements_play-button\">\r\n                        <img src=\"images/iconVideoPause.svg\" ng-click=\"togglePlayPause($event)\" class=\"featured-player_buttons-layer_center-elements_pause-button hidden-layer\">\r\n                    </div>\r\n\r\n                </div>\r\n                <div class=\"featured-player_buttons-layer_center-elements_prev-next-wrapper\">\r\n                    <span class=\"icon-forward featured-player_buttons-layer_center-elements_next hidden-layer\" ng-click=\"playNextVideo($event)\" ng-show=\"getNextVideo()\"></span>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"featured-player_buttons-layer_center-elements_group_bottom hidden-layer\">\r\n                <span class=\"featured-player_buttons-layer_center-elements_pause-intermission\" ng-click=\"pauseIntermissionToggle($event)\">{{isIntermissionPaused ? \'Continue\' : \'Pause\'}}</span>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <!-- bottom elements-->\r\n    <div class=\"featured-player_buttons-layer_bottom-elements hidden-layer\">\r\n        <div class=\"featured-player_buttons-layer_bottom-elements_titles featured-player_buttons-layer_bottom-elements_titles--hero-image\">\r\n            <div class=\"featured-player_buttons-layer_bottom-elements_titles_current\">\r\n                <div ng-class=\"iconTitle\"></div>\r\n\r\n                <div class=\"featured-player_buttons-layer_bottom-elements_titles_current_title\">\r\n                            <span class=\"featured-player_buttons-layer_bottom-elements_titles_current_title_created\">\r\n                                {{createdDate}}\r\n                            </span>\r\n                            <span class=\"featured-player_buttons-layer_bottom-elements_titles_current_title\">\r\n                                {{video.title}}\r\n                            </span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"featured-player_buttons-layer_bottom-elements_titles_next hidden-layer\" ng-show=\"nextVideo\" ng-click=\"playNextVideo($event)\">\r\n\r\n                <div class=\"featured-player_buttons-layer_bottom-elements_titles_next_image\" style=\"background-image: url({{nextVideo.hero_images.hero_image_link}})\"></div>\r\n                <div class=\"featured-player_buttons-layer_bottom-elements_titles_next_up-text\">up next...</div>\r\n                <div class=\"featured-player_buttons-layer_bottom-elements_titles_next_up-title\">{{nextVideo.title}}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"featured-player_buttons-layer_bottom-elements_controls\">\r\n\r\n            <div class=\"featured-player_buttons-layer_bottom-elements_controls_time-position\">{{timePassed}}</div>\r\n\r\n            <div class=\"featured-player_buttons-layer_bottom-elements_controls_slider\">\r\n                <rzslider ng-click=\"$event.stopPropagation()\"\r\n                          rz-slider-high=\"sliderModel.value\"\r\n                          rz-slider-model=\"sliderModel.start\"\r\n                          rz-slider-options=\"sliderModel.options\"\r\n                >\r\n                </rzslider>\r\n            </div>\r\n\r\n            <div class=\"featured-player_buttons-layer_bottom-elements_controls_duration\">{{duration}}</div>\r\n\r\n            <span class=\"icon-expand featured-player_buttons-layer_bottom-elements_controls_expand\" ng-click=\"toggleFullScreen($event)\"></span>\r\n            <span class=\"icon-collapse featured-player_buttons-layer_bottom-elements_controls_collapse hidden-layer\" ng-click=\"toggleFullScreen($event)\"></span>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- hero image layer -->\r\n<img class=\"featured-player_hero-image-layer image-layer\" ng-src=\"{{video.hero_images.hero_image_link}}\">");
$templateCache.put("components/menu/menu.html","<nav class=\"navbar\">\r\n    <div class=\"navbar-main\">\r\n        <div class=\"icon-menu navbar-main_button\" ng-click=\"toggleMenu()\" ></div>\r\n        <img class=\"navbar-main_logo\" src=\"images/logo.svg\">\r\n        <div class=\"icon-search navbar-main_button\" ng-click=\"toggleMenuType(true)\"></div>\r\n    </div>\r\n\r\n    <div class=\"navbar_search hidden-layer\">\r\n        <span class=\"navbar_search_back icon-back navbar_search_buttons\" ng-click=\"toggleMenuType(false)\"></span>\r\n        <input class=\"navbar_search_input\" ng-model=\"searchText\" ng-keyup=\"searchInputUpdate()\">\r\n        <span class=\"navbar_search_clear icon-close navbar_search_buttons\" ng-click=\"clearSearchInput()\"></span>\r\n    </div>\r\n</nav>\r\n\r\n<div class=\"menu\">\r\n    <div class=\"menu_container\">\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-home\"></span>\r\n            <span class=\"menu_item_title\">Home</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-unseen\"></span>\r\n            <span class=\"menu_item_title\">Unseen</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-skipped\"></span>\r\n            <span class=\"menu_item_title\">Skipped</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-seen\"></span>\r\n            <span class=\"menu_item_title\">Seen</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-favorites\"></span>\r\n            <span class=\"menu_item_title\">Favorites</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n        <div class=\"menu_item\" ng-click=\"signInClick()\">\r\n            <span class=\"menu_item_icon icon-profile\"></span>\r\n            <span class=\"menu_item_title\">Sign in</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n    </div>\r\n    <div class=\"menu_container_outer\"  ng-click=\"toggleMenu(true)\"></div>\r\n\r\n</div>\r\n\r\n<div class=\"search-results  hidden-layer\">\r\n    <div ng-repeat=\"foundedVideo in searchResult\" class=\"search-results_item\" ng-click=\"searchItemClick(foundedVideo)\">\r\n        <span class=\"search-results_item_category  icon-category{{categoryIconMap(foundedVideo.category_id)}}\"></span>\r\n        <span class=\"search-results_item_title\">{{foundedVideo.title}}</span>\r\n        <span class=\"search-results_item_play icon-play\"></span>\r\n    </div>\r\n</div>");
$templateCache.put("components/play-items/playItems.html","<div class=\"play-items\" id=\"category-videos-{{::categoryId}}\">\r\n    <div class=\"play-items_title\">\r\n        <span class=\"icon-category{{::iconName}} play-items_title_icon\"></span>\r\n        <span class=\"play-items_title_name\">{{::title}}</span>\r\n    </div>\r\n\r\n    <div class=\"play-items_videos\">\r\n        <div class=\"play-items_videos_item\"\r\n             ng-repeat=\"video in videosList\"\r\n             style=\"background-image: url(\'{{video.hero_images.hero_image_link}}\')\"\r\n             ng-click=\"moveToPlayPage(video.id)\"\r\n             ng-attr-id=\"play-video-item-{{video.id}}\"\r\n        >\r\n            <div class=\"play-items_videos_item_title\">\r\n                <span class=\"play-items_videos_item_title_date\">{{::video.humanizedDate}}</span>\r\n                <span class=\"play-items_videos_item_title_caption\">{{::video.title}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("components/show-player/showPlayer.html","\r\n\r\n<div class=\"show-player\" video-id=\"{{video.id}}\">\r\n    <top-menu categories=\"categoriesList\"></top-menu>\r\n    <!-- video layer -->\r\n    <div class=\"video-layer show-player_video-layer\">\r\n        <video class=\"show-player_video-layer_video\" video-src=\"sources\" preload=\'none\'></video>\r\n    </div>\r\n\r\n    <!-- next hero image layer -->\r\n    <div class=\"col-xs-12 no-padding hero-image-layer show-player_hero-image-layer-next hidden-layer\" style=\"background-image: url({{nextVideo.hero_images.hero_image_link}})\">\r\n    </div>\r\n\r\n    <featured-carousel featured-list=\"featuredList\" selected-video=\"featuredItem\" on-replay=\"replayVideo()\"></featured-carousel>\r\n</div>\r\n\r\n<!-- description layer-->\r\n<div class=\"col-xs-12 no-padding show-player_description-layer hidden-layer\">\r\n    <div class=\"show-player_description-layer_container\">\r\n        <div class=\"show-player_description-layer_container_close-container\">\r\n            <div class=\"show-player_description-layer_container_close-container_button icon-close\" ng-click=\"toggleDescription($event, false)\"></div>\r\n        </div>\r\n\r\n        <div class=\"show-player_description-layer_container_titles\">\r\n            <div class=\"show-player_description-layer_container_titles_category icon-category{{iconTitle}}\"></div>\r\n\r\n            <div class=\"show-player_description-layer_container_titles_labels\">\r\n                        <span class=\"show-player_description-layer_container_titles_labels_created\">\r\n                            {{createdDate}}\r\n                        </span>\r\n                        <span class=\"show-player_description-layer_container_titles_labels_title\">\r\n                            {{video.title}}\r\n                        </span>\r\n            </div>\r\n        </div>\r\n        <div class=\"show-player_description-layer_container_text\">\r\n            {{video.description}}\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n<!-- buttons layer-->\r\n<div class=\"show-player_buttons-layer\"\r\n     ng-mouseenter=\"imageHover()\"\r\n     ng-mouseleave=\"imageBlur()\"\r\n     ng-click=\"togglePlayPause()\"\r\n     ng-dblclick=\"toggleFullScreen()\"\r\n     ng-mousemove=\"showControlsOnMove()\"\r\n>\r\n    <!-- top buttons-->\r\n    <div class=\"show-player_buttons-layer_top-elements\">\r\n        <div>\r\n\r\n        </div>\r\n\r\n\r\n        <div class=\"show-player_buttons-layer_top-elements_rightside\">\r\n            <span class=\"icon-favorites show-player_buttons-layer_top-elements_rightside_buttons\"></span>\r\n            <span class=\"icon-info show-player_buttons-layer_top-elements_rightside_buttons\" ng-click=\"toggleDescription($event, true)\"></span>\r\n            <span class=\"icon-share show-player_buttons-layer_top-elements_rightside_buttons\" ng-click=\"shareVideo($event)\"></span>\r\n        </div>\r\n    </div>\r\n    <!-- center elements-->\r\n    <div class=\"show-player_buttons-layer_center-elements stop-selection\">\r\n\r\n        <div class=\"show-player_buttons-layer_center-elements_group\">\r\n            <div class=\"show-player_buttons-layer_center-elements_group_title hidden-layer\" ng-show=\"getNextVideo()\">\r\n                Up next\r\n                <div class=\"show-player_buttons-layer_center-elements_group_title_caption\">{{nextVideo.title}}</div>\r\n            </div>\r\n            <div class=\"show-player_buttons-layer_center-elements_group_controls\">\r\n                <div class=\"show-player_buttons-layer_center-elements_prev-next-wrapper\">\r\n                    <span class=\"icon-back show-player_buttons-layer_center-elements_prev hidden-layer\" ng-click=\"playPreviousVideo($event)\"  ng-show=\"getPreviousVideo()\"></span>\r\n                </div>\r\n\r\n                <div class=\"show-player_buttons-layer_center-elements_group_controls_wrapper\">\r\n                    <div  class=\"show-player_buttons-layer_center-elements_group_controls_progress hidden-layer\"\r\n                          round-progress\r\n                          max=\"intermissionCountdownMax\"\r\n                          current=\"intermissionCountdownValue\"\r\n                          color=\"url(#progress-gradient)\"\r\n                          bgcolor=\"rgba(255, 255, 255, 0.4)\"\r\n                          stroke=\"20\"\r\n                          semi=\"false\"\r\n                          round=\"100\"\r\n                          rounded=\"false\"\r\n                          clockwise=\"true\"\r\n                          responsive=\"false\"\r\n                          duration=\"800\"\r\n                          animation=\"easeInOutQuart\"\r\n                          animation-delay=\"0\">\r\n                        <svg>\r\n                            <linearGradient id=\"progress-gradient\" x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\">\r\n                                <stop offset=\"5%\"  stop-color=\"#24abbc\"></stop>\r\n                                <stop offset=\"95%\" stop-color=\"#3bfcec\"></stop>\r\n                            </linearGradient>\r\n                        </svg>\r\n                    </div>\r\n                    <div class=\"show-player_buttons-layer_center-elements_group_controls_wrapper-play-pause\">\r\n                        <img src=\"images/iconVideoPlay.svg\" ng-click=\"togglePlayPause($event)\" class=\"show-player_buttons-layer_center-elements_play-button\">\r\n                        <img src=\"images/iconVideoPause.svg\" ng-click=\"togglePlayPause($event)\" class=\"show-player_buttons-layer_center-elements_pause-button hidden-layer\">\r\n                    </div>\r\n\r\n                </div>\r\n                <div class=\"show-player_buttons-layer_center-elements_prev-next-wrapper\">\r\n                    <span class=\"icon-forward show-player_buttons-layer_center-elements_next hidden-layer\" ng-click=\"playNextVideo($event)\" ng-show=\"getNextVideo()\"></span>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"show-player_buttons-layer_center-elements_group_bottom hidden-layer\">\r\n                <span class=\"show-player_buttons-layer_center-elements_pause-intermission\" ng-click=\"pauseIntermissionToggle($event)\">{{isIntermissionPaused ? \'Continue\' : \'Pause\'}}</span>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <!-- bottom elements-->\r\n    <div class=\"show-player_buttons-layer_bottom-elements hidden-layer\">\r\n        <div class=\"show-player_buttons-layer_bottom-elements_titles show-player_buttons-layer_bottom-elements_titles--hero-image\">\r\n            <div class=\"show-player_buttons-layer_bottom-elements_titles_current\">\r\n                <div ng-class=\"iconTitle\"></div>\r\n\r\n                <div class=\"show-player_buttons-layer_bottom-elements_titles_current_title\">\r\n                            <span class=\"show-player_buttons-layer_bottom-elements_titles_current_title_created\">\r\n                                {{createdDate}}\r\n                            </span>\r\n                            <span class=\"show-player_buttons-layer_bottom-elements_titles_current_title\">\r\n                                {{video.title}}\r\n                            </span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"show-player_buttons-layer_bottom-elements_titles_next hidden-layer\" ng-show=\"nextVideo\" ng-click=\"playNextVideo($event)\">\r\n\r\n                <div class=\"show-player_buttons-layer_bottom-elements_titles_next_image\" style=\"background-image: url({{nextVideo.hero_images.hero_image_link}})\"></div>\r\n                <div class=\"show-player_buttons-layer_bottom-elements_titles_next_up-text\">up next...</div>\r\n                <div class=\"show-player_buttons-layer_bottom-elements_titles_next_up-title\">{{nextVideo.title}}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"show-player_buttons-layer_bottom-elements_controls\">\r\n\r\n            <div class=\"show-player_buttons-layer_bottom-elements_controls_time-position\">{{timePassed}}</div>\r\n\r\n            <div class=\"show-player_buttons-layer_bottom-elements_controls_slider\">\r\n                <rzslider ng-click=\"$event.stopPropagation()\"\r\n                          rz-slider-high=\"sliderModel.value\"\r\n                          rz-slider-model=\"sliderModel.start\"\r\n                          rz-slider-options=\"sliderModel.options\"\r\n                >\r\n                </rzslider>\r\n            </div>\r\n\r\n            <div class=\"show-player_buttons-layer_bottom-elements_controls_duration\">{{duration}}</div>\r\n\r\n            <span class=\"icon-expand show-player_buttons-layer_bottom-elements_controls_expand\" ng-click=\"toggleFullScreen($event)\"></span>\r\n            <span class=\"icon-collapse show-player_buttons-layer_bottom-elements_controls_collapse hidden-layer\" ng-click=\"toggleFullScreen($event)\"></span>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- hero image layer -->\r\n<img class=\"show-player_hero-image-layer image-layer\" ng-src=\"{{video.hero_images.hero_image_link}}\">");
$templateCache.put("components/top-menu/top-menu.html","<div class=\"top-menu\">\r\n\r\n    <div class=\"top-menu_navigation\">\r\n        <div class=\"top-menu_main\">\r\n            <span class=\"icon-menu top-menu_icon\"></span>\r\n            <img class=\"top-menu_logo\" src=\"images/logo.svg\" ng-click=\"moveToHome()\">\r\n        </div>\r\n\r\n        <div class=\"top-menu_categories\">\r\n            <div class=\"top-menu_categories_item\" ng-repeat=\"category in categoryList\" ng-click=\"categoryClick($event, category.id)\">{{category.title}}</div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"top-menu_advanced\">\r\n        <div class=\"top-menu_search\">\r\n            <button class=\"top-menu_search_button icon-search\"></button>\r\n            <input class=\"top-menu_search_input\" placeholder=\"Search\">\r\n        </div>\r\n        <button class=\"top-menu_login\" ng-click=\"moveToLogin()\"><span class=\"icon-profile top-menu_login_icon\"></span>Sign Up/Log In</button>\r\n    </div>\r\n\r\n\r\n</div>");
$templateCache.put("views/home/home.html","<div class=\"home\">\r\n\r\n    <featured-player id=\"featured-player\" video=\"featuredItem\" featured-list=\"featuredList\" categories-list=\"categoriesList\" featured-item=\"featuredItem\"></featured-player>\r\n\r\n    <div class=\"home_video-items\">\r\n        <category-items category-id=\"0\" videos=\"videosList\" categories=\"categoriesList\"></category-items>\r\n        <category-items category-id=\"11\" videos=\"videosList\" categories=\"categoriesList\"></category-items>\r\n        <category-items category-id=\"12\" videos=\"videosList\" categories=\"categoriesList\"></category-items>\r\n        <category-items category-id=\"13\" videos=\"videosList\" categories=\"categoriesList\"></category-items>\r\n        <category-items category-id=\"14\" videos=\"videosList\" categories=\"categoriesList\"></category-items>\r\n    </div>\r\n\r\n</div>\r\n\r\n");
$templateCache.put("views/list/list.html","<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>Title</title>\r\n</head>\r\n<body>\r\n\r\n</body>\r\n</html>");
$templateCache.put("views/login/login.html","<form>\r\n    <nav class=\"navbar\">\r\n        <div class=\"navbar-login\">\r\n            <img class=\"navbar-login_logo\" src=\"images/logo.svg\">\r\n        </div>\r\n    </nav>\r\n\r\n    <div class=\"col-xs-12 col-md-6 col-md-offset-3 login-form\">\r\n        <button class=\"login-form_facebook-login\">\r\n            <span class=\"icon-facebook\"></span>\r\n            Log in with Facebook\r\n        </button>\r\n\r\n        <div class=\"login-form_title\">Or, log in with your email address.</div>\r\n\r\n        <input ng-model=\"login.email\" class=\"login-form_input\" placeholder=\"Email Address\" type=\"email\">\r\n        <input ng-model=\"login.password\" class=\"login-form_input\" placeholder=\"Password\" type=\"password\">\r\n\r\n        <button class=\"login-form_login\" ng-click=\"processLogin()\">Log In</button>\r\n\r\n        <div class=\"login-form_forgot-password\">Forgot email address and/or password?</div>\r\n    </div>\r\n\r\n    <div class=\"want-account\">\r\n        Want an account? <span class=\"want-account_login\" ng-click=\"registerClick()\">Sign Up</span>\r\n    </div>\r\n</form>");
$templateCache.put("views/play/play.html","<div class=\"play\">\r\n    <top-menu categories=\"categoriesList\"></top-menu>\r\n\r\n    <show-player class=\"play_player\" video=\"videoItem\" videos-list=\"videosList\" featured-list=\"featuredList\"></show-player>\r\n\r\n    <div class=\"play_video-items\">\r\n        <play-items category-id=\"{{videoCategoryId}}\" videos=\"videosList\" categories=\"categoriesList\"></play-items>\r\n    </div>\r\n\r\n</div>");
$templateCache.put("views/register/register.html","<form>\r\n    <nav class=\"navbar\">\r\n        <div class=\"navbar-register\">\r\n            <img class=\"navbar-register_logo\" src=\"images/logo.svg\">\r\n        </div>\r\n    </nav>\r\n\r\n    <div class=\"col-xs-12 col-md-6 col-md-offset-3 register-form\">\r\n        <button class=\"register-form_facebook-login\" ng-click=\"facebookRegister()\">\r\n            <span class=\"icon-facebook\"></span>\r\n            Continue with Facebook\r\n        </button>\r\n\r\n        <div class=\"register-form_title\">Or, sign up with your email address</div>\r\n\r\n        <input ng-model=\"register.email\" class=\"register-form_input\" placeholder=\"Email Address\" type=\"email\">\r\n        <input ng-model=\"register.password\" class=\"register-form_input\" placeholder=\"Password\" type=\"password\">\r\n        <div class=\"register-form_input_date\">\r\n            <select name=\"month\" ng-model=\"register.month\" class=\"register-form_input--date-month\"\r\n                    ng-options=\"month as month.name for month in months track by month.key\"></select>\r\n            <input ng-model=\"register.day\" class=\"register-form_input--date\" placeholder=\"Day\">\r\n            <input ng-model=\"register.year\" class=\"register-form_input--date\" placeholder=\"Year\">\r\n        </div>\r\n\r\n        <div class=\"register-form_description\">\r\n            By clicking on Sign Up, you agree to<br>\r\n            <span class=\"register-form_terms\">Cizo\'s terms of use</span> and <span class=\"register-form_terms\">privacy policy</span>\r\n        </div>\r\n\r\n        <button class=\"register-form_sign-up\" ng-click=\"registerUser()\">Sign up</button>\r\n\r\n    </div>\r\n\r\n    <div class=\"have-account\">\r\n        Already have an account? <span class=\"have-account_login\">Log in</span>\r\n    </div>\r\n</form>\r\n");
$templateCache.put("views/share/share.html","<div class=\"share\" style=\"background-image: url(\'{{video.hero_images.hero_image_link}}\')\"> </div>\r\n\r\n<div class=\"share_close-button icon-close\" ng-click=\"closeShare()\"></div>\r\n\r\n<div class=\"share-wrapper\">\r\n    <div class=\"share_group\">\r\n        <div class=\"share_group_title\">\r\n            <span class=\"icon-share\"></span>\r\n            <span>Share this video</span>\r\n        </div>\r\n\r\n        <div class=\"share_group_video\"\r\n             style=\"background-image: url(\'{{video.hero_images.hero_image_link}}\')\"\r\n        >\r\n            <div class=\"share_group_video_title\">\r\n                <span class=\"share_group_video_title_caption\">{{::video.title}}</span>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"share_group_social\">\r\n            <div class=\"share_group_social_item social-facebook\" ng-click=\"shareVideoItem(\'facebook\')\">\r\n                <span class=\"icon-facebook\"></span>\r\n                <span>Facebook</span>\r\n            </div>\r\n            <div class=\"share_group_social_item social-twitter\" ng-click=\"shareVideoItem(\'twitter\')\">\r\n                <span class=\"icon-twitter icon-adjust-twitter\"></span>\r\n                <span>Twitter</span>\r\n            </div>\r\n            <div class=\"share_group_social_item social-google\" ng-click=\"shareVideoItem(\'google\')\">\r\n                <span class=\"icon-google icon-adjust-google\"></span>\r\n                <span>Google</span>\r\n            </div>\r\n            <div class=\"share_group_social_item social-reddit\" ng-click=\"shareVideoItem(\'reddit\')\">\r\n                <span class=\"icon-reddit icon-adjust-reddit\"></span>\r\n                <span>Reddit</span>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"share_group_link-title\">\r\n            <div class=\"share_group_link-title_decoration\"></div>\r\n            <span class=\"share_group_link-title_caption\">Link</span>\r\n            <div class=\"share_group_link-title_decoration\"></div>\r\n        </div>\r\n\r\n        <span class=\"share_group_link\">{{shareLink}}</span>\r\n\r\n\r\n    </div>\r\n</div>\r\n\r\n<div class=\"share_overlay\"></div>");}]);