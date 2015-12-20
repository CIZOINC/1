"use strict";

angular.module("templates").run(["$templateCache", function ($templateCache) {
  $templateCache.put("components/player/player.html", "<div class=\"container\">\r\n    <video class=\"screen\" width=\"{{width}}\" autoplay  ng-transclude></video>\r\n    <div class=\"like-button\">\r\n        <span class=\"glyphicon glyphicon-heart-empty\"></span>\r\n    </div>\r\n    <div class=\"play-button\">\r\n        <span class=\"glyphicon glyphicon-play\"></span>\r\n    </div>\r\n    <div class=\"info-panel\">\r\n        <span>{{timePassed}} / {{duration}}</span>\r\n    </div>\r\n</div>");
  $templateCache.put("components/sidebar/sidebar.html", "<h1>\r\n    <a href=\"#/\">\r\n        <img src=\"images/cizo-logo.svg\" alt=\"Cizo\">\r\n\r\n    </a>\r\n    <span>Admin Panel</span>\r\n</h1>\r\n\r\n<ul ng-transclude class=\"menu-list\"></ul>");
  $templateCache.put("components/uploader/uploader.html", "<div class=\"drop-zone\">\r\n    Drag file or click to select\r\n</div>\r\n<form action=\"{{postData.url}}\" method=\"post\" enctype=\"multipart/form-data\">\r\n    <input type=\"hidden\" name=\"success_action_redirect\" value=\"http://examplebucket.s3.amazonaws.com/successful_upload.html\" />\r\n    <input name=\"key\" ng-model=\"postData.url\">\r\n    <input name=\"Expires\" ng-model=\"postData.expires\">\r\n    <input name=\"policy\" ng-model=\"postData.policy\">\r\n    <input name=\"x-amz-credential\" ng-model=\"postData.credential\">\r\n    <input name=\"x-amz-algorithm\" ng-model=\"postData.algorithm\">\r\n    <input name=\"x-amz-date\" ng-model=\"postData.date\">\r\n    <input name=\"x-amz-security-token\" ng-model=\"postData.token\">\r\n    <input name=\"x-amz-signature\" ng-model=\"postData.signature\">\r\n\r\n    <input name=\"acl\" value=\"public-read\" />\r\n    <input name=\"Content-Type\" value=\"video/mp4\" />\r\n\r\n    <input type=\"file\" class=\"file-input\"   name=\"file\" />\r\n    <input type=\"submit\" name=\"submit\" value=\"Upload to Amazon S3\" />\r\n</form>");
  $templateCache.put("views/categories/categories.html", "<div>categories</div>");
  $templateCache.put("views/content/content.html", "<div>\r\n    <h2>Videos</h2>\r\n    <div>\r\n\r\n        <button class=\"btn btn-lg\" ui-sref=\"video({id: 0})\">Add video</button>\r\n        <button class=\"btn btn-lg\" ui-sref=\"upload\">Upload video</button>\r\n\r\n        <div class=\"list-group\">\r\n            <div class=\"list-group-item\" ng-repeat=\"movie in videosList\">\r\n                <div class=\"list-group-item-heading\">{{movie.title}}</div>\r\n                <div class=\"list-group-item-text\">{{movie.description}}</div>\r\n                {{movie.streams.link}}\r\n                <a ui-sref=\"video({id: movie.id })\">Edit</a>\r\n                <a ng-click=\"deleteVideo(movie.id)\">Delete</a>\r\n                deleteVideo\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  $templateCache.put("views/main/main.html", "<div>\r\n    <div class=\"btn-group-vertical\">\r\n\r\n    </div>\r\n</div>");
  $templateCache.put("views/upload/upload.html", "<h1>Upload video</h1>\r\n\r\n<uploader></uploader>\r\n\r\n<button class=\"btn btn-lg btn-success\" ui-sref=\"content\">Apply</button>\r\n<button class=\"btn btn-lg btn-danger\" ui-sref=\"content\">Cancel</button>");
  $templateCache.put("views/video/video.html", "<div class=\"container\">\r\n    <h2>{{::screenTitle}} Video</h2>\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-8\">\r\n            <div class=\"row\">\r\n                <label class=\"col-md-offset-3 col-sm-3\">Created</label>\r\n                <span class=\"col-sm-6\">{{::createdDate}}</span>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-md-offset-3 col-sm-3\">Last Update</label>\r\n                <span class=\"col-sm-6\">{{::updatedDate}}</span>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-md-offset-3 col-sm-3\">Title</label>\r\n                <input class=\"col-sm-6\" ng-model=\"videoItem.title\" required>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-md-offset-3 col-sm-3\">Description</label>\r\n                <textarea class=\"col-sm-6\" ng-model=\"videoItem.description\" required></textarea>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-md-offset-3 col-sm-3\">Rating</label>\r\n                <select class=\"col-sm-6\" ng-model=\"videoItem.mpaa_rating\" ng-options=\"rate for rate in mpaaRatingList\" required></select>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n            <uploader link=\"hostNameUpload\"></uploader>\r\n        </div>\r\n    </div>\r\n   <button ng-click=\"updateVideo()\">Update video</button>\r\n\r\n</div>");
  $templateCache.put("views/watch/watch.html", "<!--<video autoplay preload=\"auto\" width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</video>-->\r\n\r\n<player width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</player>");
}]);

//# sourceMappingURL=templates-compiled.js.map