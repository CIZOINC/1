angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("index_template.html","<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>Cizo</title>\r\n    <link rel=\"stylesheet\" href=\"all.min.css\">\r\n</head>\r\n<body ng-controller=\"AppCtrl\">\r\n\r\n<div ui-view></div>\r\n\r\n<script src=\"3d-party.min.js\"></script>\r\n<script src=\"ng.min.js\"></script>\r\n<script>\r\n    angular.bootstrap(document, [\'app\']);\r\n</script>\r\n\r\n</body>\r\n</html>");
$templateCache.put("components/player/player.html","<div class=\"container-fluid player\" video-id=\"{{::video.id}}\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-12 no-padding\">\r\n            <!-- video layer -->\r\n            <div class=\"col-xs-12 no-padding video-layer hidden-layer\">\r\n                <video class=\"col-xs-12 no-padding\"  preload=\'none\'>\r\n                    <source src=\"\">\r\n                    <source src=\"{{::videoLink}}\" type=\"video/mp4\">\r\n                </video>\r\n            </div>\r\n\r\n            <!-- hero image layer -->\r\n            <div class=\"col-xs-12 no-padding hero-image-layer player_hero-image-layer\" style=\"background-image: url({{::video.hero_image_link}})\">\r\n                <!--<img class=\"col-xs-12 no-padding content\"  ng-src=\"{{::video.hero_image_link}}\">-->\r\n            </div>\r\n\r\n            <!-- buttons layer-->\r\n            <div class=\"player_buttons-layer\"\r\n                 ng-mouseenter=\"imageHover()\"\r\n                 ng-mouseleave=\"imageBlur()\"\r\n                 ng-click=\"toggleControlsVisibility()\"\r\n                 ng-mousemove=\"mouseMoveOnVideo()\"\r\n                 ng-dblclick=\"toggleFullScreen()\"\r\n                    >\r\n                <!-- top buttons-->\r\n                <div class=\"player_buttons-layer_top-elements\">\r\n                    <div>\r\n                        <span class=\"icon-close player_buttons-layer_top-elements_close-button hidden-layer\"></span>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"player_buttons-layer_top-elements_rightside hidden-layer\">\r\n                        <span class=\"icon-favorites player_buttons-layer_top-elements_rightside_buttons\"></span>\r\n                        <span class=\"icon-info player_buttons-layer_top-elements_rightside_buttons\"></span>\r\n                        <span class=\"icon-share player_buttons-layer_top-elements_rightside_buttons\"></span>\r\n                    </div>\r\n                </div>\r\n                <!-- center elements-->\r\n                <div class=\"player_buttons-layer_center-elements\">\r\n                    <img src=\"images/iconVideoPlay.svg\" ng-click=\"togglePlayPause($event)\" class=\"player_buttons-layer_center-elements_play-button\">\r\n                    <img src=\"images/iconVideoPause.svg\" ng-click=\"togglePlayPause($event)\" class=\"player_buttons-layer_center-elements_pause-button hidden-layer\">\r\n                </div>\r\n                <!-- bottom elements-->\r\n                <div class=\"player_buttons-layer_bottom-elements\">\r\n                    <div class=\"player_buttons-layer_bottom-elements_titles player_buttons-layer_bottom-elements_titles--hero-image\">\r\n                        <div class=\"player_buttons-layer_bottom-elements_titles_current\">\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_current_category icon-category{{::iconTitle}}\"></div>\r\n\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_current_title\">\r\n                                <span class=\"player_buttons-layer_bottom-elements_titles_current_title_created\">\r\n                                    {{::createdDate}}\r\n                                </span>\r\n                                <span class=\"player_buttons-layer_bottom-elements_titles_current_title\">\r\n                                    {{::video.title}}\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_titles_next hidden-layer\" ng-show=\"nextVideo\" ng-click=\"playNextVideo($event)\">\r\n\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_next_image\" style=\"background-image: url({{nextVideo.hero_image_link}})\"></div>\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_next_up-text\">up next...</div>\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_next_up-title\">{{nextVideo.title}}</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"player_buttons-layer_bottom-elements_controls hidden-layer\">\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_controls_time-position\">{{timePassed}}</div>\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_controls_slider\">\r\n                            <rzslider ng-click=\"$event.stopPropagation()\"\r\n                                      rz-slider-high=\"sliderModel.value\"\r\n                                      rz-slider-model=\"sliderModel.start\"\r\n                                      rz-slider-options=\"sliderModel.options\"\r\n                                      ></rzslider>\r\n                        </div>\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_controls_duration\">{{duration}}</div>\r\n\r\n                        <span class=\"icon-expand player_buttons-layer_bottom-elements_controls_expand\" ng-click=\"toggleFullScreen()\"></span>\r\n                        <span class=\"icon-collapse player_buttons-layer_bottom-elements_controls_collapse hidden-layer\" ng-click=\"toggleFullScreen()\"></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!--<div class=\"row\" ng-show=\"video.isWatching\">\r\n        <div class=\"description\" style=\"color: white\">\r\n            <h4>{{::video.title}}</h4>\r\n            {{::video.description}}\r\n        </div>\r\n    </div>-->\r\n\r\n\r\n</div>");
$templateCache.put("views/main/main.html","<nav class=\"navbar\">\r\n    <div class=\"navbar-main\">\r\n        <div class=\"icon-menu navbar-main_button\"></div>\r\n        <img class=\"navbar-main_logo\" src=\"images/splashLogo.png\">\r\n        <div class=\"icon-search navbar-main_button\"></div>\r\n    </div>\r\n</nav>\r\n\r\n<div>\r\n    <div class=\"categories-panel categories-panel--margin\">\r\n        <div class=\"categories-panel_item\" ng-click=\"filterByCategory()\">\r\n            <div class=\"categories-panel_item_icon categories-panel_item_icon--all-icon icon-all  \">\r\n            </div>\r\n            <div class=\"categories-panel_item_title\">All</div>\r\n        </div>\r\n        <div class=\"categories-panel_item\" ng-click=\"filterByCategory(11)\">\r\n            <div class=\"categories-panel_item_icon icon-categorymovie\" ></div>\r\n            Movies\r\n        </div>\r\n        <div class=\"categories-panel_item\" ng-click=\"filterByCategory(12)\">\r\n            <div class=\"categories-panel_item_icon icon-categorytv\" ></div>\r\n            TV Shows\r\n        </div>\r\n        <div class=\"categories-panel_item\" ng-click=\"filterByCategory(13)\">\r\n            <div class=\"categories-panel_item_icon icon-categorygames\" ></div>\r\n            Games\r\n        </div>\r\n        <div class=\"categories-panel_item\" ng-click=\"filterByCategory(14)\">\r\n            <div class=\"categories-panel_item_icon icon-categorylifestyle\" ></div>\r\n            Lifestyle\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"container-fluid player-list\">\r\n    <div class=\"row\" ng-repeat=\"videoItem in filteredVideoList\")>\r\n        <player id=\"player{{videoItem.id}}\"  class=\"col-xs-12 col-md-8 col-md-offset-2\" video=\"videoItem\" filtered-list=\"filteredVideoList\" need-fullscreen=\"needFullscreen\"></player>\r\n    </div>\r\n</div>");
$templateCache.put("views/watch/watch.html","<!--<video autoplay preload=\"auto\" width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</video>-->\r\n\r\n<player width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</player>");
$templateCache.put("views/videos/videos.html","<div>\r\n    <h2>Videos</h2>\r\n\r\n    <div class=\"list-group\">\r\n        <div class=\"list-group-item\" ng-repeat=\"movie in videosList\">\r\n            <div class=\"list-group-item-heading\"><b>{{movie.title}}</b></div>\r\n            <div class=\"list-group-item-text\">{{movie.description}}</div>\r\n            <a ui-sref=\"watch({link: movie.streams[0].link })\">Watch</a>\r\n        </div>\r\n    </div>\r\n</div>");}]);