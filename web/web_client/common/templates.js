angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("index_template.html","<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>Cizo</title>\r\n    <link rel=\"stylesheet\" href=\"css/all.min.css\">\r\n</head>\r\n<body ng-controller=\"AppCtrl\">\r\n\r\n{{title}}\r\n\r\n<div ui-view></div>\r\n\r\n<script src=\"all.min.js\"></script>\r\n<script src=\"all-ng.min.js\"></script>\r\n<script>\r\n    angular.bootstrap(document, [\'app\']);\r\n</script>\r\n\r\n\r\n\r\n</body>\r\n</html>");
$templateCache.put("components/player/player.html","<div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-12 no-padding\" video-id=\"{{::video.id}}\">\r\n            <video class=\"col-xs-12 no-padding\"  preload=\'none\'>\r\n                <source src=\"\">\r\n                <source src=\"{{::videoLink}}\" type=\"video/mp4\">\r\n            </video>\r\n            <div class=\"like-button\">\r\n                <span class=\"glyphicon glyphicon-heart-empty\"></span>\r\n            </div>\r\n            <div class=\"play-button\">\r\n                <span class=\"glyphicon glyphicon-play\" ng-click=\"togglePlayPause()\"></span>\r\n            </div>\r\n            <div class=\"info-panel\">\r\n                <span>{{timePassed}} / {{duration}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"description\" style=\"color: white\">\r\n            {{::video.title}}\r\n            <br>\r\n            {{::video.description}}\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>");
$templateCache.put("views/main/main.html","<nav class=\"navbar\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"row\">\r\n            <span class=\"glyphicon glyphicon-menu-hamburger col-xs-1\">Menu</span>\r\n            <div class=\"col-xs-10 text-center\">Cizo</div>\r\n            <span class=\"glyphicon glyphicon-search col-xs-1\">Search</span>\r\n        </div>\r\n\r\n    </div>\r\n</nav>\r\n\r\n<div class=\"container-fluid\">\r\n    <div class=\"row\" ng-repeat=\"videoItem in videosList\">\r\n        <player class=\"col-xs-12 col-md-8 col-md-offset-2\" video=\"videoItem\"></player>\r\n    </div>\r\n</div>\r\n\r\n<!--<div>\r\n    <div class=\"btn-group-vertical\">\r\n        <a class=\"btn btn-default\" ui-sref=\"videos\">{{videos}}</a>\r\n        <a class=\"btn btn-default\">{{categories}}</a>\r\n        <a class=\"btn btn-default\">{{trending}}</a>\r\n    </div>\r\n</div>-->");
$templateCache.put("views/videos/videos.html","<div>\r\n    <h2>Videos</h2>\r\n\r\n    <div class=\"list-group\">\r\n        <div class=\"list-group-item\" ng-repeat=\"movie in videosList\">\r\n            <div class=\"list-group-item-heading\"><b>{{movie.title}}</b></div>\r\n            <div class=\"list-group-item-text\">{{movie.description}}</div>\r\n            <a ui-sref=\"watch({link: movie.streams[0].link })\">Watch</a>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("views/watch/watch.html","<!--<video autoplay preload=\"auto\" width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</video>-->\r\n\r\n<player width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</player>");}]);