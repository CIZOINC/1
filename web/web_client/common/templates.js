angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("index_template.html","<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>Cizo</title>\r\n    <link rel=\"stylesheet\" href=\"all.min.css\">\r\n</head>\r\n<body ng-controller=\"AppCtrl\">\r\n<svg width=\"0\" height=\"0\">\r\n    <defs>\r\n        <path\r\n                id=\"icon-expand\"\r\n                d=\"m 157.7,152.9 c 0.97037,2.82033 -2.11853,9.69993 1.87209,9.5 13.70931,0 27.41861,0 41.12791,0 0,-14.33333 0,\r\n            -28.66667 0,-43 -2.86799,0.95604 -9.74425,-2.09619 -9.6,1.87209 0,8.27597 0,16.55194 0,24.82791 -10.03333,\r\n            -10 -20.06667,-20 -30.1,-30 -1.29704,2.67459 -8.35334,5.34918 -5.37623,8.02377 9.59208,9.59208 19.18415,\r\n            19.18415 28.77623,28.77623 -8.9,0 -17.8,0 -26.7,0 z M 47.8,54.5 c 10,10.033333 20,20.066667 30,30.1 1.35799,\r\n            -2.7068 8.377682,-5.418311 5.474029,-8.121565 C 73.682686,66.918956 64.091343,57.359478 54.5,47.8 c 8.9,\r\n            0 17.8,0 26.7,0 -0.956042,-2.867989 2.096191,-9.744253 -1.872093,-9.6 -13.709303,0 -27.418605,0 -41.127907,\r\n            0 0,14.333333 0,28.666667 0,43 2.867989,-0.956042 9.744253,2.096191 9.6,-1.872093 0,-8.275969 0,-16.551938 0,\r\n            -24.827907 z m 183.5,138.6 c -74.56667,0 -149.133333,0 -223.7,0 0,-61.83333 0,-123.666667 0,-185.5 63.166667,\r\n            0 126.33333,0 189.5,0 1.27133,-2.2620764 7.83685,-6.86821676 5.65194,-7.6 C 135.16796,0 67.583979,0 0,0 c 0,\r\n            66.9 0,133.8 0,200.7 79.633333,0 159.26667,0 238.9,0 0,-54.63333 0,-109.266667 0,-163.9 -2.24724,\r\n            2.635264 -7.78818,3.606195 -7.6,7.472093 0,49.609303 0,99.218607 0,148.827907 z\"\r\n                ></path>\r\n        <path\r\n                id=\"icon-close\"\r\n                d=\"m 8.4,207.6 c -2.1,0 -4.3,-0.8 -5.9,-2.5 -3.3,-3.3 -3.3,-8.6 0,-11.8 L 193.3,2.5 c 3.3,-3.3 8.6,\r\n            -3.3 11.8,0 3.3,3.3 3.3,8.6 0,11.8 L 14.3,205.2 c -1.6,1.6 -3.8,2.4 -5.9,2.4 z m 190.8,0 c -2.1,0 -4.3,\r\n            -0.8 -5.9,-2.5 L 2.5,14.3 C -0.8,11 -0.8,5.7 2.5,2.5 c 3.3,-3.3 8.6,-3.3 11.8,0 l 190.9,190.9 c 3.3,\r\n            3.3 3.3,8.6 0,11.8 -1.7,1.6 -3.8,2.4 -6,2.4 z\"></path>\r\n        <path\r\n                id=\"icon-share\"\r\n                d=\"m 233.9,335.8 -233.8,0 0,-233.1 83.2,0 0,11.1 -71.3,0 0,210.1 210,0 0,-210.1 -63.4,0 0,\r\n            -11.1 75.3,0 z M 115,10.8 l 11.9,0 0,202.10001 -11.9,0 z M 168.3,66 120.6,18.3 72.9,66 63.9,\r\n            57 120.6,0.2 177.3,57 Z\"></path>\r\n        <path\r\n                id=\"icon-favorites\"\r\n                d=\"M 331.5,24.1 C 316.1,8.6 295.6,0.1 273.7,0.1 251.9,0.1 231.4,8.6 215.9,24 l -38,38 -38,-38 C 124.5,\r\n            8.6 104,0.1 82.2,0.1 60.4,0.1 39.9,8.6 24.4,24 c -31.8,31.8 -31.8,83.7 0,115.5 l 148.8,148.8 c 1,\r\n            1 2.3,1.5 3.6,1.5 0.4,0 0.7,0 1.1,-0.1 0.3,0.1 0.7,0.1 1.1,0.1 1.4,0 2.7,-0.5 3.6,-1.5 l 2.5,-2.5 L 31.7,\r\n            132.4 C 3.8,104.5 3.8,59.2 31.7,31.3 45.2,17.8 63.1,10.4 82.2,10.4 c 19.1,0 37,7.4 50.6,21 L 174.4,73 c 2,\r\n            2 5.2,2 7.2,0 l 41.6,-41.6 c 13.5,-13.5 31.4,-20.9 50.5,-20.9 19.1,0 37,7.4 50.5,20.9 13.5,13.5 20.9,\r\n            31.4 20.9,50.5 0,19.1 -7.4,37 -20.9,50.5 l -105,105 7.1,7.3 105.1,-105.1 c 15.4,-15.4 23.9,-35.9 23.9,\r\n            -57.8 0,-21.9 -8.4,-42.3 -23.8,-57.7 z\" ></path>\r\n        <path\r\n                id=\"icon-all\"\r\n                d=\"M 73,64.9 C 71,60.1 69.4,55.1 68.2,49.9 30.9,75.8 5.5,117.6 1.9,165.5 6.9,163.9 12,162.7 17.3,161.9 21.6,\r\n            122.3 42.6,87.6 73,64.9 Z M 294.7,162 c 5.3,0.8 10.4,2.1 15.4,3.8 -3.5,-48 -28.9,-90 -66.3,-115.9 -1.2,\r\n            5.2 -2.8,10.2 -4.8,15 30.5,22.7 51.4,57.4 55.7,97.1 z m -85.1,143.8 c -16.5,6.9 -34.6,10.7 -53.6,10.7 -19.3,\r\n            0 -37.6,-3.9 -54.4,-11 -3.2,4.2 -6.8,8.1 -10.6,11.7 19.8,9.2 41.8,14.4 65,14.4 22.9,0 44.7,-5 64.3,-14 -3.9,\r\n            -3.7 -7.5,-7.6 -10.7,-11.8 z M 60,251 A 30,30 0 0 1 30,281 30,30 0 0 1 0,251 30,30 0 0 1 30,221 30,\r\n            30 0 0 1 60,251 Z M 186,30 A 30,30 0 0 1 156,60 30,30 0 0 1 126,30 30,30 0 0 1 156,0 30,30 0 0 1 186,\r\n            30 Z m 125,221 a 30,30 0 0 1 -30,30 30,30 0 0 1 -30,-30 30,30 0 0 1 30,-30 30,30 0 0 1 30,30 z\" ></path>\r\n        <path\r\n                id=\"icon-games\"\r\n                d=\"m 121.5,110.9 -17.4,0 0,17.4 c 0,3.9 -4.5,7 -8.4,7 -3.9,0 -8.4,-3.1 -8.4,-7 l 0,-17.4 -16,0 c -3.9,\r\n            0 -7,-4.8 -7,-8.7 0,-3.8 3.1,-8.7 7,-8.7 l 16.1,0 0,-15.4 c 0,-3.9 4.5,-7 8.4,-7 3.9,0 8.4,3.1 8.4,7 l 0,\r\n            15.4 17.4,0 c 3.9,0 7,4.8 7,8.7 -0.1,3.9 -3.3,8.7 -7.1,8.7 z m 202.9,-6.6 c 0,-21.4 32.1,-21.4 32.1,0 0,\r\n            21.4 -32.1,21.4 -32.1,0 z M 289.6,69.6 c 0,-21.4 32.1,-21.4 32.1,0 0,21.4 -32.1,21.4 -32.1,0 z m 0,69.5 c 0,\r\n            -21.4 32.1,-21.4 32.1,0 0,21.4 -32.1,21.4 -32.1,0 z m -34.7,-34.8 c 0,-21.4 32.1,-21.4 32.1,0 0,21.4 -32.1,\r\n            21.4 -32.1,0 z M 373.6,31.1 C 354.5,11.6 329.2,0.8 302.4,0.8 l -61.9,0 0,12 61.9,0 c 23.6,0 45.8,9.5 62.7,\r\n            26.7 16.8,17.2 26.1,39.9 26.1,63.9 0,24 -9.3,46.7 -26.3,63.9 -17,17.2 -39.5,26.7 -63.3,26.7 -19.6,0 -38.6,\r\n            -6.8 -54.8,-19.5 -10.9,-8.6 -22,-23.6 -29.7,-40.1 l -1.6,-3.5 -27.5,0 -1.5,3.7 c -11.5,28.4 -42.8,59 -84.3,\r\n            59 C 53,193.6 13,152.9 13,102.8 13,78.9 22.3,56.4 39.2,39.3 56.1,22.2 78.5,12.8 102.2,12.8 l 61.4,0 0,-12 -61.4,\r\n            0 c -27,0 -52.4,10.7 -71.6,30.1 -19.2,19.4 -29.7,44.9 -29.7,72 0,56.7 45.4,102.8 101.2,102.8 45.2,0 79.7,\r\n            -31.8 93.8,-62.7 l 11.8,0 c 5.1,10.1 15.8,28.6 31.5,41 18.3,14.5 39.8,22.1 62.2,22.1 27.1,0 52.6,-10.7 71.9,\r\n            -30.3 19.2,-19.4 29.8,-45.1 29.8,-72.3 0,-27.2 -10.5,-52.9 -29.5,-72.4 z\" ></path>\r\n        <path\r\n                id=\"icon-movies\"\r\n                d=\"m 301,182.8 -295.2,0 0,-58.7 C 21.5,123 33.9,109.9 33.9,94 33.9,78.1 21.5,65 5.8,63.9 l 0,-58.7 336.3,\r\n            0 0,58.7 C 326.5,65 314.2,78.1 314.2,94 c 0,15.9 12.3,28.9 27.9,30.1 l 0,32.2 5,0 0,-37.2 -2.8,0 c -13.9,\r\n            0 -25.2,-11.3 -25.2,-25.2 0,-13.9 11.3,-25.2 25.2,-25.2 l 2.8,0 0,-68.5 -346.3,0 0,68.7 2.9,0 c 13.9,0 25.2,\r\n            11.3 25.2,25.2 0,13.9 -11.3,25.2 -25.2,25.2 l -2.9,0 0,68.7 300.2,0 0,-5.2 z m -31,-150.9 7.2,0 0,129.5 -7.2,\r\n            0 z m -192.699997,0 7.2,0 0,129.5 -7.2,0 z\" ></path>\r\n        <path\r\n                id=\"icon-tv-shows\"\r\n                d=\"m 134.8,169.4 -0.1,-9.2 83.3,0 0,-15.6 -202.7,0 c -4,0 -7.3,-3.3 -7.3,-7.3 L 8,14.7 c 0,-4 3.3,-7.3 7.3,\r\n            -7.3 l 227.5,0 c 4,0 7.3,3.3 7.3,7.3 l 0,97.5 7.8,0 0,-103.9 c 0,-4.3 -3.5,-7.8 -7.8,-7.8 L 8,0.5 C 3.7,\r\n            0.5 0.2,4 0.2,8.3 l 0,144.2 c 0,4.3 3.5,7.8 7.8,7.8 l 115.3,0 0,9.2 0,0 c 0,0 0.4,2.9 -5.6,5.1 l -47.7,0 0,\r\n            5 118,0 0,-5 -47.7,0 c -4.8,-1.9 -5.4,-4.4 -5.5,-5.2 z\" ></path>\r\n        <path\r\n                id=\"icon-lifestyles\"\r\n                d=\"M250,112.6c-1.9,0.1-3.9,0.2-5.9,0.2c-0.6,0-1.2,0-1.8,0c-55.6,0-60.8-49.1-68.7-63.6c0,0-4.8-5.5-11.5-5.5\r\n            c-3.3,0-7.2,1.4-11.1,5.6l-0.5,0.6c-7.9,14.6-12.9,63.8-68.8,63.8c-0.5,0-1,0-1.5,0c-53.8-0.8-52.9-32-62.9-68.5c0,0-2.7-6-6.6-6.2\r\n            l-0.2-21.3c0,0,25.5-6.7,60.4-6.7c22.8,0,49.7,2.9,76,12.3c4.8,0.9,9.4,1.2,13.4,1.2c9.8,0,16.6-1.9,16.6-1.9\r\n            c26.6-9.7,53.8-12.6,76.8-12.6c34.4,0,59.5,6.5,59.6,6.5L313.3,38c-3.9,0.2-6.6,6.2-6.6,6.2c-2.7,9.8-4.5,19.3-6.9,27.9h10.3\r\n            c0.9-3.6,1.8-7.4,2.7-11.1c1-4.3,2-8.6,3.2-13l7.2-0.4l0-9.4l0.1-21.3l0-10h-8.9c-6.7-1.6-30.1-6.5-60.7-6.5c-29,0-55.9,4.4-79.8,13\r\n            c-1.1,0.3-6.4,1.5-13.6,1.5c-3.7,0-7.3-0.3-10.8-0.9C126,5.4,99.5,1.1,71,1.1c-35.7,0-61.8,6.7-62.9,7l-7.5,2l0.1,7.8l0.2,21.3\r\n            l0.1,9.4L8,48.9c1.2,4.4,2.2,8.8,3.2,13c3.7,15.7,7.3,30.6,16.9,42.1C39,117.1,55.5,123.4,80,123.8c0.6,0,1.1,0,1.7,0\r\n            c22.9,0,41.1-7.5,54.3-22.4c10.8-12.2,15.9-26.7,19.7-37.3c1.2-3.3,2.3-6.5,3.3-8.5c0.9-0.8,2.1-1.8,3.1-1.8c1.2,0,2.5,0.9,3.3,1.5\r\n            c0.9,2,2,5,3.1,8.1c3.8,10.5,8.9,25,19.7,37.2c13.1,14.8,31.4,22.3,54.1,22.3c0.7,0,1.3,0,2,0c2,0,3.9-0.1,5.7-0.2V112.6z\" ></path>\r\n    </defs>\r\n</svg>\r\n\r\n<div ui-view></div>\r\n\r\n<script src=\"3d-party.min.js\"></script>\r\n<script src=\"ng.min.js\"></script>\r\n<script>\r\n    angular.bootstrap(document, [\'app\']);\r\n</script>\r\n\r\n\r\n\r\n</body>\r\n</html>");
$templateCache.put("components/player/player.html","<div class=\"container-fluid player\" video-id=\"{{::video.id}}\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-12 no-padding\">\r\n            <!-- video layer -->\r\n            <div class=\"col-xs-12 no-padding video-layer hidden-layer\">\r\n                <video class=\"col-xs-12 no-padding\"  preload=\'none\'>\r\n                    <source src=\"\">\r\n                    <source src=\"{{::videoLink}}\" type=\"video/mp4\">\r\n                </video>\r\n            </div>\r\n\r\n            <!-- hero image layer -->\r\n            <div class=\"col-xs-12 no-padding hero-image-layer\">\r\n                <img class=\"col-xs-12 no-padding\"  ng-src=\"{{::video.hero_image_link}}\">\r\n            </div>\r\n\r\n            <!-- buttons layer-->\r\n            <div class=\"player_buttons-layer\" ng-mouseenter=\"imageHover()\" ng-mouseleave=\"imageBlur()\" ng-click=\"toggleControlsVisibility()\">\r\n                <!-- top buttons-->\r\n                <div class=\"player_buttons-layer_top-elements\">\r\n\r\n                    <svg width=\"30\" preserveAspectRatio=\"xMinyMin meet\" viewBox=\"0 0 210 200\" class=\"player_buttons-layer_top-elements_close-button\">\r\n                        <use xlink:href=\"#icon-close\"></use>\r\n                    </svg>\r\n\r\n                    <div class=\"player_buttons-layer_top-elements_rightside\">\r\n                        <svg viewBox=\"-10 -10 380 260\" preserveAspectRatio=\"xMinyMin\" class=\"player_buttons-layer_top-elements_rightside_buttons\">\r\n                            <use xlink:href=\"#icon-favorites\"></use>\r\n                        </svg>\r\n                        <svg viewBox=\"-10 -10 290 240\" preserveAspectRatio=\"xMinyMin\" class=\"player_buttons-layer_top-elements_rightside_buttons\">\r\n                            <use xlink:href=\"#icon-share\"></use>\r\n                        </svg>\r\n                    </div>\r\n                </div>\r\n                <!-- center elements-->\r\n                <div class=\"player_buttons-layer_center-elements\">\r\n                    <img src=\"images/Web_Home_Flow/iconVidPlay.svg\" ng-click=\"togglePlayPause($event)\" class=\"player_buttons-layer_center-elements_play-button\">\r\n                </div>\r\n                <!-- top buttons-->\r\n                <div class=\"player_buttons-layer_bottom-elements\">\r\n                    <div class=\"player_buttons-layer_bottom-elements_titles hidden-layer\">\r\n                        <div class=\"player_buttons-layer_bottom-elements_titles_current\">\r\n                            <svg viewBox=\"0 0 350 200\" preserveAspectRatio=\"xMinYMin\" class=\"player_buttons-layer_bottom-elements_titles_current_category\">\r\n                                <use ng-href=\"#icon-{{::iconTitle}}\" xlink:href=\"\"></use>\r\n                            </svg>\r\n                            <div class=\"player_buttons-layer_bottom-elements_titles_current_title\">\r\n                                <span class=\"player_buttons-layer_bottom-elements_titles_current_title_created\">\r\n                                    {{::createdDate}}\r\n                                </span>\r\n                                <span class=\"player_buttons-layer_bottom-elements_titles_current_title\">\r\n                                    {{::video.title}}\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_titles_next hidden-layer\" style=\"background-image: url({{nextVideo.hero_image_link}})\" ng-show=\"nextVideo\">\r\n                            up next...\r\n                            {{nextVideo.title}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"player_buttons-layer_bottom-elements_controls hidden-layer\">\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_controls_time-position\">{{timePassed}}</div>\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_controls_slider\">\r\n                            <rzslider ng-click=\"$event.stopPropagation()\"\r\n                                      rz-slider-model=\"sliderModel.value\"\r\n                                      rz-slider-options=\"sliderModel.options\"\r\n                                      ></rzslider>\r\n                        </div>\r\n\r\n\r\n                        <div class=\"player_buttons-layer_bottom-elements_controls_duration\">{{duration}}</div>\r\n\r\n                        <svg viewBox=\"0 0 250 360\" preserveAspectRatio=\"xMinYMin\"\r\n                             class=\"player_buttons-layer_bottom-elements_controls_expand\" ng-click=\"toggleFullScreen()\">\r\n                            <use xlink:href=\"#icon-expand\"></use>\r\n                        </svg>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\" ng-show=\"video.isWatching\">\r\n        <div class=\"description\" style=\"color: white\">\r\n            <h4>{{::video.title}}</h4>\r\n            {{::video.description}}\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>");
$templateCache.put("views/main/main.html","<nav class=\"navbar\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"row\">\r\n            <span class=\"glyphicon glyphicon-menu-hamburger col-xs-1\">Menu</span>\r\n            <div class=\"col-xs-10 text-center\">Cizo</div>\r\n            <span class=\"glyphicon glyphicon-search col-xs-1\">Search</span>\r\n        </div>\r\n\r\n    </div>\r\n</nav>\r\n\r\n<div class=\"container-fluid\">\r\n    <div class=\"row\" ng-repeat=\"videoItem in videosList\">\r\n        <player class=\"col-xs-12 col-md-8 col-md-offset-2\" videos-list=\"videosList\" video=\"videoItem\"></player>\r\n    </div>\r\n</div>");
$templateCache.put("views/videos/videos.html","<div>\r\n    <h2>Videos</h2>\r\n\r\n    <div class=\"list-group\">\r\n        <div class=\"list-group-item\" ng-repeat=\"movie in videosList\">\r\n            <div class=\"list-group-item-heading\"><b>{{movie.title}}</b></div>\r\n            <div class=\"list-group-item-text\">{{movie.description}}</div>\r\n            <a ui-sref=\"watch({link: movie.streams[0].link })\">Watch</a>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("views/watch/watch.html","<!--<video autoplay preload=\"auto\" width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</video>-->\r\n\r\n<player width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</player>");}]);