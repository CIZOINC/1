"use strict";

angular.module("templates").run(["$templateCache", function ($templateCache) {
  $templateCache.put("components/player/player.html", "<div class=\"container\">\r\n    <video class=\"screen\" width=\"{{width}}\" autoplay  ng-transclude></video>\r\n    <div class=\"like-button\">\r\n        <span class=\"glyphicon glyphicon-heart-empty\"></span>\r\n    </div>\r\n    <div class=\"play-button\">\r\n        <span class=\"glyphicon glyphicon-play\"></span>\r\n    </div>\r\n    <div class=\"info-panel\">\r\n        <span>{{timePassed}} / {{duration}}</span>\r\n    </div>\r\n</div>");
  $templateCache.put("views/main/main.html", "<div>\r\n    <div class=\"btn-group-vertical\">\r\n        <a class=\"btn btn-default\" ui-sref=\"videos\">{{videos}}</a>\r\n        <a class=\"btn btn-default\">{{categories}}</a>\r\n        <a class=\"btn btn-default\">{{trending}}</a>\r\n    </div>\r\n</div>");
  $templateCache.put("views/videos/videos.html", "<div>\r\n    <h2>Videos</h2>\r\n    <div>\r\n        <div ng-repeat=\"video in videosList\">\r\n            <div>{{video.title}}</div>\r\n            <div>{{video.description}}</div>\r\n            {{video.streams.link}}\r\n            <a ui-sref=\"watch({link: video.streams[0].link })\">Watch</a>\r\n        </div>\r\n    </div>\r\n</div>");
  $templateCache.put("views/watch/watch.html", "<!--<video autoplay preload=\"auto\" width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</video>-->\r\n\r\n<player width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</player>");
}]);

//# sourceMappingURL=templates-compiled.js.map