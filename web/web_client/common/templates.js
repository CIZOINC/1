angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("index_template.html","<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>Cizo</title>\r\n    <link rel=\"stylesheet\" href=\"all.min.css\">\r\n</head>\r\n<body ng-controller=\"AppCtrl\">\r\n\r\n<div ui-view></div>\r\n\r\n<script src=\"3d-party.min.js\"></script>\r\n<script src=\"ng.min.js\"></script>\r\n<script>\r\n    angular.bootstrap(document, [\'app\']);\r\n</script>\r\n\r\n</body>\r\n</html>");
$templateCache.put("components/featured-player/featuredPlayer.html","<div class=\"container-fluid featured-player\" video-id=\"{{video.id}}\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-12 no-padding\">\r\n            <!-- video layer -->\r\n            <div class=\"col-xs-12 no-padding video-layer\">\r\n                <video class=\"col-xs-12 no-padding\" video-src=\"sources\" preload=\'none\'></video>\r\n            </div>\r\n\r\n            <!-- next hero image layer -->\r\n            <div class=\"col-xs-12 no-padding hero-image-layer featured-player_hero-image-layer-next hidden-layer\" style=\"background-image: url({{nextVideo.hero_image_link}})\">\r\n            </div>\r\n\r\n            <!-- description layer-->\r\n            <div class=\"col-xs-12 no-padding featured-player_description-layer hidden-layer\">\r\n                <div class=\"featured-player_description-layer_container\">\r\n                    <div class=\"featured-player_description-layer_container_close-container\">\r\n                        <div class=\"featured-player_description-layer_container_close-container_button icon-close\" ng-click=\"toggleDescription($event, false)\"></div>\r\n                    </div>\r\n\r\n                    <div class=\"featured-player_description-layer_container_titles\">\r\n                        <div class=\"featured-player_description-layer_container_titles_category icon-category{{iconTitle}}\"></div>\r\n\r\n                        <div class=\"featured-player_description-layer_container_titles_labels\">\r\n                            <span class=\"featured-player_description-layer_container_titles_labels_created\">\r\n                                {{createdDate}}\r\n                            </span>\r\n                            <span class=\"featured-player_description-layer_container_titles_labels_title\">\r\n                                {{video.title}}\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"featured-player_description-layer_container_text\">\r\n                        {{video.description}}\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- buttons layer-->\r\n            <div class=\"featured-player_buttons-layer\"\r\n                 ng-mouseenter=\"imageHover()\"\r\n                 ng-mouseleave=\"imageBlur()\"\r\n                 ng-click=\"togglePlayPause()\"\r\n                 ng-dblclick=\"toggleFullScreen()\"\r\n                    >\r\n                <!-- top buttons-->\r\n                <div class=\"featured-player_buttons-layer_top-elements\">\r\n                    <div>\r\n                        <div class=\"icon-close featured-player_buttons-layer_top-elements_close-button\" ng-click=\"closeFeatured($event)\"></div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"featured-player_buttons-layer_top-elements_rightside\">\r\n                        <span class=\"icon-favorites featured-player_buttons-layer_top-elements_rightside_buttons\"></span>\r\n                        <span class=\"icon-info featured-player_buttons-layer_top-elements_rightside_buttons\" ng-click=\"toggleDescription($event, true)\"></span>\r\n                        <span class=\"icon-share featured-player_buttons-layer_top-elements_rightside_buttons\"></span>\r\n                    </div>\r\n                </div>\r\n                <!-- center elements-->\r\n                <div class=\"featured-player_buttons-layer_center-elements stop-selection\">\r\n\r\n                    <div class=\"featured-player_buttons-layer_center-elements_group\">\r\n                        <div class=\"featured-player_buttons-layer_center-elements_group_title hidden-layer\" ng-show=\"getNextVideo()\">\r\n                            Up next\r\n                            <div class=\"featured-player_buttons-layer_center-elements_group_title_caption\">{{nextVideo.title}}</div>\r\n                        </div>\r\n                        <div class=\"featured-player_buttons-layer_center-elements_group_controls\">\r\n                            <div class=\"featured-player_buttons-layer_center-elements_prev-next-wrapper\">\r\n                                <span class=\"icon-back featured-player_buttons-layer_center-elements_prev hidden-layer\" ng-click=\"playPreviousVideo($event)\"  ng-show=\"getPreviousVideo()\"></span>\r\n                            </div>\r\n\r\n                            <div class=\"featured-player_buttons-layer_center-elements_group_controls_wrapper\">\r\n                                <div  class=\"featured-player_buttons-layer_center-elements_group_controls_progress hidden-layer\"\r\n                                      round-progress\r\n                                      max=\"intermissionCountdownMax\"\r\n                                      current=\"intermissionCountdownValue\"\r\n                                      color=\"url(#progress-gradient)\"\r\n                                      bgcolor=\"rgba(255, 255, 255, 0.4)\"\r\n                                      stroke=\"20\"\r\n                                      semi=\"false\"\r\n                                      round=\"100\"\r\n                                      rounded=\"false\"\r\n                                      clockwise=\"true\"\r\n                                      responsive=\"false\"\r\n                                      duration=\"800\"\r\n                                      animation=\"easeInOutQuart\"\r\n                                      animation-delay=\"0\">\r\n                                    <svg>\r\n                                        <linearGradient id=\"progress-gradient\" x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\">\r\n                                            <stop offset=\"5%\"  stop-color=\"#24abbc\"></stop>\r\n                                            <stop offset=\"95%\" stop-color=\"#3bfcec\"></stop>\r\n                                        </linearGradient>\r\n                                    </svg>\r\n                                </div>\r\n                                <div class=\"featured-player_buttons-layer_center-elements_group_controls_wrapper-play-pause\">\r\n                                    <img src=\"images/iconVideoPlay.svg\" ng-click=\"togglePlayPause($event)\" class=\"featured-player_buttons-layer_center-elements_play-button\">\r\n                                    <img src=\"images/iconVideoPause.svg\" ng-click=\"togglePlayPause($event)\" class=\"featured-player_buttons-layer_center-elements_pause-button hidden-layer\">\r\n                                </div>\r\n\r\n                            </div>\r\n                            <div class=\"featured-player_buttons-layer_center-elements_prev-next-wrapper\">\r\n                                <span class=\"icon-forward featured-player_buttons-layer_center-elements_next hidden-layer\" ng-click=\"playNextVideo($event)\" ng-show=\"getNextVideo()\"></span>\r\n                            </div>\r\n\r\n                        </div>\r\n                        <div class=\"featured-player_buttons-layer_center-elements_group_bottom hidden-layer\">\r\n                            <span class=\"featured-player_buttons-layer_center-elements_pause-intermission\" ng-click=\"pauseIntermissionToggle($event)\">{{isIntermissionPaused ? \'Continue\' : \'Pause\'}}</span>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n                <!-- bottom elements-->\r\n                <div class=\"featured-player_buttons-layer_bottom-elements\">\r\n                    <div class=\"featured-player_buttons-layer_bottom-elements_titles featured-player_buttons-layer_bottom-elements_titles--hero-image\">\r\n                        <div class=\"featured-player_buttons-layer_bottom-elements_titles_current\">\r\n                            <div ng-class=\"iconTitle\"></div>\r\n\r\n                            <div class=\"featured-player_buttons-layer_bottom-elements_titles_current_title\">\r\n                                <span class=\"featured-player_buttons-layer_bottom-elements_titles_current_title_created\">\r\n                                    {{createdDate}}\r\n                                </span>\r\n                                <span class=\"featured-player_buttons-layer_bottom-elements_titles_current_title\">\r\n                                    {{video.title}}\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"featured-player_buttons-layer_bottom-elements_titles_next hidden-layer\" ng-show=\"nextVideo\" ng-click=\"playNextVideo($event)\">\r\n\r\n                            <div class=\"featured-player_buttons-layer_bottom-elements_titles_next_image\" style=\"background-image: url({{nextVideo.hero_image_link}})\"></div>\r\n                            <div class=\"featured-player_buttons-layer_bottom-elements_titles_next_up-text\">up next...</div>\r\n                            <div class=\"featured-player_buttons-layer_bottom-elements_titles_next_up-title\">{{nextVideo.title}}</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"featured-player_buttons-layer_bottom-elements_controls hidden-layer\">\r\n\r\n                        <div class=\"featured-player_buttons-layer_bottom-elements_controls_time-position\">{{timePassed}}</div>\r\n\r\n                        <div class=\"featured-player_buttons-layer_bottom-elements_controls_slider\">\r\n                            <rzslider ng-click=\"$event.stopPropagation()\"\r\n                                      rz-slider-high=\"sliderModel.value\"\r\n                                      rz-slider-model=\"sliderModel.start\"\r\n                                      rz-slider-options=\"sliderModel.options\"\r\n                                      >\r\n                            </rzslider>\r\n                        </div>\r\n\r\n                        <div class=\"featured-player_buttons-layer_bottom-elements_controls_duration\">{{duration}}</div>\r\n\r\n                        <span class=\"icon-expand featured-player_buttons-layer_bottom-elements_controls_expand\" ng-click=\"toggleFullScreen($event)\"></span>\r\n                        <span class=\"icon-collapse featured-player_buttons-layer_bottom-elements_controls_collapse hidden-layer\" ng-click=\"toggleFullScreen($event)\"></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>");
$templateCache.put("components/player/player.html","<div class=\"container-fluid player\" video-id=\"{{::video.id}}\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-12 no-padding\">\r\n            <!-- video layer -->\r\n            <div class=\"col-xs-12 no-padding video-layer hidden-layer\">\r\n                <video class=\"col-xs-12 no-padding\"  preload=\'none\'>\r\n                    <source src=\"{{::videoLink}}\" type=\"video/mp4\">\r\n                </video>\r\n            </div>\r\n\r\n            <!-- hero image layer -->\r\n            <div class=\"col-xs-12 no-padding hero-image-layer player_hero-image-layer\" style=\"background-image: url({{::video.hero_image_link}})\">\r\n            </div>\r\n\r\n            <!-- next hero image layer -->\r\n            <div class=\"col-xs-12 no-padding hero-image-layer player_hero-image-layer-next hidden-layer\" style=\"background-image: url({{::nextVideo.hero_image_link}})\">\r\n            </div>\r\n\r\n\r\n\r\n            <!-- description layer-->\r\n            <div class=\"col-xs-12 no-padding player_description-layer hidden-layer\">\r\n                <div class=\"player_description-layer_container\">\r\n                    <div class=\"player_description-layer_container_close-container\">\r\n                        <div class=\"player_description-layer_container_close-container_button icon-close\" ng-click=\"toggleDescription($event, false)\"></div>\r\n                    </div>\r\n\r\n                    <div class=\"player_description-layer_container_titles\">\r\n                        <div class=\"player_description-layer_container_titles_category icon-category{{::iconTitle}}\"></div>\r\n\r\n                        <div class=\"player_description-layer_container_titles_labels\">\r\n                            <span class=\"player_description-layer_container_titles_labels_created\">\r\n                                {{::createdDate}}\r\n                            </span>\r\n                            <span class=\"player_description-layer_container_titles_labels_title\">\r\n                                {{::video.title}}\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"player_description-layer_container_text\">\r\n                        {{video.description}}\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- buttons layer-->\r\n            <div class=\"player_buttons-layer\"\r\n                 ng-mouseenter=\"imageHover()\"\r\n                 ng-mouseleave=\"imageBlur()\"\r\n                 ng-click=\"togglePlayPause()\"\r\n                 ng-dblclick=\"toggleFullScreen()\"\r\n                    >\r\n                <!-- top buttons-->\r\n                <div class=\"player_buttons-layer_top-elements\">\r\n                    <div>\r\n                        <span class=\"icon-close player_buttons-layer_top-elements_close-button hidden-layer\"></span>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"player_buttons-layer_top-elements_rightside hidden-layer\">\r\n                        <span class=\"icon-favorites player_buttons-layer_top-elements_rightside_buttons\"></span>\r\n                        <span class=\"icon-info player_buttons-layer_top-elements_rightside_buttons\" ng-click=\"toggleDescription($event, true)\"></span>\r\n                        <span class=\"icon-share player_buttons-layer_top-elements_rightside_buttons\"></span>\r\n                    </div>\r\n                </div>\r\n                <!-- center elements-->\r\n                <div class=\"player_buttons-layer_center-elements stop-selection\">\r\n\r\n                    <div class=\"player_buttons-layer_center-elements_group\">\r\n                        <div class=\"player_buttons-layer_center-elements_group_title hidden-layer\" ng-show=\"getNextVideo()\">\r\n                            Up next\r\n                            <div class=\"player_buttons-layer_center-elements_group_title_caption\">{{nextVideo.title}}</div>\r\n                        </div>\r\n                        <div class=\"player_buttons-layer_center-elements_group_controls\">\r\n                            <div class=\"player_buttons-layer_center-elements_prev-next-wrapper\">\r\n                                <span class=\"icon-back player_buttons-layer_center-elements_prev hidden-layer\" ng-click=\"playPreviousVideo($event)\"  ng-show=\"getPreviousVideo()\"></span>\r\n                            </div>\r\n\r\n                            <div class=\"player_buttons-layer_center-elements_group_controls_wrapper\">\r\n                                <div  class=\"player_buttons-layer_center-elements_group_controls_progress hidden-layer\"\r\n                                      round-progress\r\n                                      max=\"intermissionCountdownMax\"\r\n                                      current=\"intermissionCountdownValue\"\r\n                                      color=\"url(#progress-gradient)\"\r\n                                      bgcolor=\"rgba(255, 255, 255, 0.4)\"\r\n                                      stroke=\"20\"\r\n                                      semi=\"false\"\r\n                                      round=\"100\"\r\n                                      rounded=\"false\"\r\n                                      clockwise=\"true\"\r\n                                      responsive=\"false\"\r\n                                      duration=\"800\"\r\n                                      animation=\"easeInOutQuart\"\r\n                                      animation-delay=\"0\">\r\n                                    <svg>\r\n                                        <linearGradient id=\"progress-gradient\" x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\">\r\n                                            <stop offset=\"5%\"  stop-color=\"#24abbc\"/>\r\n                                            <stop offset=\"95%\" stop-color=\"#3bfcec\"/>\r\n                                        </linearGradient>\r\n                                    </svg>\r\n                                </div>\r\n                                <div class=\"player_buttons-layer_center-elements_group_controls_wrapper-play-pause\">\r\n                                    <img src=\"images/iconVideoPlay.svg\" ng-click=\"togglePlayPause($event)\" class=\"player_buttons-layer_center-elements_play-button\">\r\n                                    <img src=\"images/iconVideoPause.svg\" ng-click=\"togglePlayPause($event)\" class=\"player_buttons-layer_center-elements_pause-button hidden-layer\">\r\n                                    <img src=\"images/iconVideoReplay.svg\" ng-click=\"togglePlayPause($event)\" class=\"player_buttons-layer_center-elements_replay-button\">\r\n                                </div>\r\n\r\n                            </div>\r\n                            <div class=\"player_buttons-layer_center-elements_prev-next-wrapper\">\r\n                                <span class=\"icon-forward player_buttons-layer_center-elements_next hidden-layer\" ng-click=\"playNextVideo($event)\" ng-show=\"getNextVideo()\"></span>\r\n                            </div>\r\n\r\n                        </div>\r\n                        <div class=\"player_buttons-layer_center-elements_group_bottom hidden-layer\">\r\n                            <span class=\"player_buttons-layer_center-elements_pause-intermission\" ng-click=\"pauseIntermissionToggle($event)\">{{isIntermissionPaused ? \'Continue\' : \'Pause\'}}</span>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n                <!-- bottom elements-->\r\n                <div class=\"player_buttons-layer_bottom-elements\">\r\n                    <div class=\"player_buttons-layer_bottom-elements_titles player_buttons-layer_bottom-elements_titles--hero-image\">\r\n                        <div class=\"player_buttons-layer_bottom-elements_titles_current\">\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_current_category icon-category{{::iconTitle}}\"></div>\r\n\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_current_title\">\r\n                                <span class=\"player_buttons-layer_bottom-elements_titles_current_title_created\">\r\n                                    {{::createdDate}}\r\n                                </span>\r\n                                <span class=\"player_buttons-layer_bottom-elements_titles_current_title\">\r\n                                    {{::video.title}}\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_titles_next hidden-layer\" ng-show=\"nextVideo\" ng-click=\"playNextVideo($event)\">\r\n\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_next_image\" style=\"background-image: url({{nextVideo.hero_image_link}})\"></div>\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_next_up-text\">up next...</div>\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_next_up-title\">{{nextVideo.title}}</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"player_buttons-layer_bottom-elements_controls hidden-layer\">\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_controls_time-position\">{{timePassed}}</div>\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_controls_slider\">\r\n                            <rzslider ng-click=\"$event.stopPropagation()\"\r\n                                      rz-slider-high=\"sliderModel.value\"\r\n                                      rz-slider-model=\"sliderModel.start\"\r\n                                      rz-slider-options=\"sliderModel.options\"\r\n                                      ></rzslider>\r\n                        </div>\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_controls_duration\">{{duration}}</div>\r\n\r\n                        <span class=\"icon-expand player_buttons-layer_bottom-elements_controls_expand\" ng-click=\"toggleFullScreen($event)\"></span>\r\n                        <span class=\"icon-collapse player_buttons-layer_bottom-elements_controls_collapse hidden-layer\" ng-click=\"toggleFullScreen($event)\"></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>");
$templateCache.put("views/main/main.html","<nav class=\"navbar\">\r\n    <div class=\"navbar-main\">\r\n        <div class=\"icon-menu navbar-main_button\" ng-click=\"toggleMenu()\"></div>\r\n        <img class=\"navbar-main_logo\" src=\"images/logo.svg\">\r\n        <div class=\"icon-search navbar-main_button\"></div>\r\n    </div>\r\n</nav>\r\n\r\n<div class=\"featured\"\r\n     ng-mousedown=\"featuredMouseDown($event)\"\r\n     ng-mouseup=\"featuredMouseUp()\"\r\n     ng-mousemove=\"featuredMouseMove($event)\"\r\n     >\r\n    <div  style=\"background-image: url({{::featured.hero_image_link}})\"\r\n          ng-attr-id=\"{{ \'featured-\' + featured.id }}\"\r\n          ng-repeat=\"featured in featuredList\"\r\n          class=\"featured_hero-image\"\r\n          ng-click=\"featuredPlay($event)\" >\r\n    </div>\r\n</div>\r\n\r\n<div class=\"menu\">\r\n    <div class=\"menu_container\">\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-home\"></span>\r\n            <span class=\"menu_item_title\">Home</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-unseen\"></span>\r\n            <span class=\"menu_item_title\">Unseen</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-skipped\"></span>\r\n            <span class=\"menu_item_title\">Skipped</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-seen\"></span>\r\n            <span class=\"menu_item_title\">Seen</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-favorites\"></span>\r\n            <span class=\"menu_item_title\">Favorites</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n        <div class=\"menu_item\">\r\n            <span class=\"menu_item_icon icon-profile\"></span>\r\n            <span class=\"menu_item_title\">Sign in</span>\r\n            <span class=\"menu_item_counter\"></span>\r\n            <span class=\"menu_item_next icon-forward\"></span>\r\n        </div>\r\n    </div>\r\n    <div class=\"menu_container_outer\"  ng-click=\"toggleMenu(true)\"></div>\r\n\r\n</div>\r\n\r\n\r\n<div class=\"categories-panel categories-panel--margin\">\r\n    <div class=\"categories-panel_item\" ng-click=\"filterByCategory()\" ng-class=\"categories[0].cssClass\">\r\n        <div class=\"categories-panel_item_icon categories-panel_item_icon--all-icon icon-all  \"></div>\r\n        <div class=\"categories-panel_item_title\">All</div>\r\n    </div>\r\n    <div class=\"categories-panel_item\" ng-click=\"filterByCategory(11)\" ng-class=\"categories[11].cssClass\">\r\n        <div class=\"categories-panel_item_icon icon-{{categories[11].icon}}\" ></div>\r\n        Movies\r\n    </div>\r\n    <div class=\"categories-panel_item\" ng-click=\"filterByCategory(13)\" ng-class=\"categories[13].cssClass\">\r\n        <div class=\"categories-panel_item_icon icon-{{categories[13].icon}}\" ></div>\r\n        Games\r\n    </div>\r\n    <div class=\"categories-panel_item\" ng-click=\"filterByCategory(12)\" ng-class=\"categories[12].cssClass\">\r\n        <div class=\"categories-panel_item_icon icon-{{categories[12].icon}}\" ></div>\r\n        TV Shows\r\n    </div>\r\n    <div class=\"categories-panel_item\" ng-click=\"filterByCategory(14)\" ng-class=\"categories[14].cssClass\">\r\n        <div class=\"categories-panel_item_icon icon-{{categories[14].icon}}\" ></div>\r\n        Lifestyle\r\n    </div>\r\n</div>\r\n\r\n\r\n<featured-player class=\"col-xs-12 col-md-8 col-md-offset-2 hidden-layer\" id=\"featured-player\" video=\"featuredItem\" filtered-list=\"featuredList\" feed-list=\"filteredVideoList\"></featured-player>\r\n\r\n\r\n<div class=\"container-fluid player-list\">\r\n    <div class=\"row\" ng-repeat=\"videoItem in filteredVideoList\")>\r\n        <player id=\"player{{videoItem.id}}\"  class=\"col-xs-12 col-md-8 col-md-offset-2\" video=\"videoItem\" filtered-list=\"filteredVideoList\" storage=\"storage\"></player>\r\n    </div>\r\n</div>");
$templateCache.put("views/videos/videos.html","<div>\r\n    <h2>Videos</h2>\r\n\r\n    <div class=\"list-group\">\r\n        <div class=\"list-group-item\" ng-repeat=\"movie in videosList\">\r\n            <div class=\"list-group-item-heading\"><b>{{movie.title}}</b></div>\r\n            <div class=\"list-group-item-text\">{{movie.description}}</div>\r\n            <a ui-sref=\"watch({link: movie.streams[0].link })\">Watch</a>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("views/watch/watch.html","<!--<video autoplay preload=\"auto\" width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</video>-->\r\n\r\n<player width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</player>");}]);