angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("index_template.html","<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>Cizo</title>\r\n    <link rel=\"stylesheet\" href=\"all.min.css\">\r\n</head>\r\n<body ng-controller=\"AppCtrl\">\r\n<div class=\"nav visible-xs\">\r\n    <div class=\"dropdown\">\r\n        <button class=\"btn btn-default\" data-toggle=\"dropdown\">\r\n            <span>Menu</span>\r\n            <span class=\"glyphicon glyphicon-menu-hamburger\"></span>\r\n        </button>\r\n        <ul class=\"dropdown-menu\" >\r\n            <li><a ui-sref=\"content\">Content</a></li>\r\n            <li><a ui-sref=\"categories\">Categories</a></li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"container-fluid main-container\">\r\n    <div class=\"row\">\r\n        <sidebar class=\"col-sm-3 col-lg-2 hidden-xs\">\r\n            <li>Manage Users</li>\r\n            <li ui-sref=\"content\">Content</li>\r\n            <li ui-sref=\"categories\">Categories</li>\r\n            <li>Settings</li>\r\n        </sidebar>\r\n        <div ui-view class=\"col-sm-9 col-lg-10\"></div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<script src=\"3d-party.min.js\"></script>\r\n<script src=\"ng.min.js\"></script>\r\n\r\n<script>\r\n    angular.bootstrap(document, [\'app\']);\r\n</script>\r\n\r\n\r\n</body>\r\n</html>");
$templateCache.put("components/image_upload/imageUploader.html","<div class=\"image-drop-zone\">\r\n    Click to select image for uploading\r\n</div>\r\n<form>\r\n    <input type=\"file\" class=\"image-file-input\" name=\"file\" />\r\n</form>");
$templateCache.put("components/player/player.html","<div class=\"container\">\r\n    <video class=\"screen\" width=\"{{width}}\" autoplay  ng-transclude></video>\r\n    <div class=\"like-button\">\r\n        <span class=\"glyphicon glyphicon-heart-empty\"></span>\r\n    </div>\r\n    <div class=\"play-button\">\r\n        <span class=\"glyphicon glyphicon-play\"></span>\r\n    </div>\r\n    <div class=\"info-panel\">\r\n        <span>{{timePassed}} / {{duration}}</span>\r\n    </div>\r\n</div>");
$templateCache.put("components/sidebar/sidebar.html","<h1>\r\n    <a href=\"#/\">\r\n        <img src=\"images/cizo-logo.svg\" alt=\"Cizo\">\r\n\r\n    </a>\r\n    <span>Admin Panel</span>\r\n</h1>\r\n\r\n<ul ng-transclude class=\"menu-list\"></ul>");
$templateCache.put("components/uploader/uploader.html","<div class=\"drop-zone\">\r\n    Click to select file for uploading\r\n</div>\r\n<form>\r\n    <input type=\"file\" class=\"file-input\" name=\"file\" />\r\n</form>");
$templateCache.put("views/content/content.html","<div class=\"page\">\r\n    <h2>Videos</h2>\r\n\r\n\r\n    <div class=\"container-fluid\">\r\n        <div class=\"col-sm-4 col-md-2\">\r\n            <button class=\"btn btn-lg\" ui-sref=\"video({id: 0})\">Add video</button>\r\n        </div>\r\n\r\n        <div class=\"col-sm-4 col-md-2 col-xs-6\">\r\n            <h4>Filter</h4>\r\n            <select ng-model=\"content.category_id\" class=\"col-sm-12\">\r\n                <option ng-repeat=\"option in categoriesList\" value=\"{{option.id}}\">{{option.title}}</option>\r\n            </select>\r\n        </div>\r\n        <div class=\"col-sm-4 col-md-2 col-xs-6\">\r\n            <h4>Order</h4>\r\n            <select ng-model=\"contentOrder.order_by\" class=\"col-sm-12\">\r\n                <option ng-repeat=\"orderItem in orderList\" value=\"{{orderItem.name}}\">{{orderItem.title}}</option>\r\n            </select>\r\n        </div>\r\n\r\n    </div>\r\n\r\n\r\n        <div class=\"container-fluid\">\r\n            <div class=\"row\" ng-repeat=\"movie in videosList | filter:content | orderBy:contentOrder.order_by\" style=\"border: solid #d9f1fb 1px\">\r\n                <div class=\"col-xs-12 col-sm-3 col-lg-2 col-md-3\">\r\n                    <img class=\"media-object\" ng-src=\"{{movie.hero_image_link}}\" alt=\"{{movie.title}}\" style=\"width: 100%\">\r\n                </div>\r\n                <div class=\" col-sm-9 col-lg-10 col-md-9\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <h3 class=\"media-heading\">{{movie.title}}</h3>\r\n                            <span>{{movie.createdDate}}</span>\r\n                        </div>\r\n                        <div class=\"col-md-2 col-md-offset-4\">\r\n                            <h4>{{movie.categoryName}}</h4>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-8\">\r\n                            {{movie.description}}\r\n                            <br>\r\n                            <a ui-sref=\"video({id: movie.id })\">Edit</a>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n\r\n</div>");
$templateCache.put("views/categories/categories.html","<div class=\"page\">\r\n    <h2>Categories</h2>\r\n    <div>\r\n        <button class=\"btn btn-lg\" ui-sref=\"category({id: 0})\">Add category</button>\r\n\r\n        <div class=\"list-group\">\r\n            <div class=\"list-group-item\" ng-repeat=\"item in categoriesList\">\r\n                <div class=\"list-group-item-heading\">{{item.title}}</div>\r\n                <a ui-sref=\"category({id: item.id })\">Edit</a>\r\n                <a ng-click=\"deleteCategory(item.id)\">Delete</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("views/categories/category.html","<div class=\"page\">\r\n    <h2>{{screenTitle}} Category</h2>\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-8\">\r\n            <div class=\"row\">\r\n                <label class=\"col-md-offset-3 col-sm-3\">Title</label>\r\n                <input class=\"col-sm-6\" ng-model=\"categoryItem.title\" required>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <button ng-click=\"updateCategory()\">Update category</button>\r\n\r\n</div>");
$templateCache.put("views/upload/upload.html","<h1>Upload video</h1>\r\n\r\n<uploader></uploader>\r\n\r\n<button class=\"btn btn-lg btn-success\" ui-sref=\"content\">Apply</button>\r\n<button class=\"btn btn-lg btn-danger\" ui-sref=\"content\">Cancel</button>");
$templateCache.put("views/main/main.html","<div>\r\n    <div class=\"btn-group-vertical\">\r\n\r\n    </div>\r\n</div>");
$templateCache.put("views/watch/watch.html","<!--<video autoplay preload=\"auto\" width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</video>-->\r\n\r\n<player width=\"{{playerSettings.width}}\">\r\n    <source src=\"{{playerSettings.link}}\">\r\n</player>");
$templateCache.put("views/video/video.html","<div class=\"container page\">\r\n    <h2>{{::screenTitle}} Video</h2>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-8 col-xs-12\">\r\n            <div class=\"row\">\r\n                <label class=\"col-lg-offset-2 col-md-offset-1 col-xs-offset-0 col-sm-3 col-xs-12\">Created</label>\r\n                <span class=\"col-sm-6 col-xs-12\">{{::createdDate}}</span>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-lg-offset-2 col-md-offset-1 col-xs-offset-0 col-sm-3 col-xs-12\">Last Update</label>\r\n                <span class=\"col-sm-6 col-xs-12\">{{::updatedDate}}</span>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-lg-offset-2 col-md-offset-1 col-xs-offset-0 col-sm-3 col-xs-12\">Title</label>\r\n                <input class=\"col-sm-6 col-xs-12\" ng-model=\"videoItem.title\" required>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-lg-offset-2 col-md-offset-1 col-xs-offset-0 col-sm-3 col-xs-12\">Description</label>\r\n                <textarea class=\"col-sm-6 col-xs-12\" ng-model=\"videoItem.description\" required></textarea>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-lg-offset-2 col-md-offset-1 col-xs-offset-0 col-sm-3 col-xs-12\">Rating</label>\r\n                <select class=\"col-sm-6 col-xs-12\" ng-model=\"videoItem.mpaa_rating\" ng-options=\"rate for rate in mpaaRatingList\" required></select>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-lg-offset-2 col-md-offset-1 col-xs-offset-0 col-sm-3 col-xs-12\">Category</label>\r\n                <select class=\"col-sm-6 col-xs-12\" ng-model=\"videoItem.category_id\" required>\r\n                    <option ng-repeat=\"option in categoriesList\" value=\"{{option.id}}\">{{option.title}}</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-lg-offset-2 col-md-offset-1 col-sm-3\">Viewable</label>\r\n                <input type=\"checkbox\" class=\"col-sm-7 col-xs-12\" ng-model=\"videoItem.viewable\"></input>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm-4 col-xs-12\">\r\n            <div class=\"row\">\r\n                <label class=\"col-sm-3\">Video</label>\r\n            </div>\r\n            <div class=\"row\">\r\n                <uploader link=\"hostNameUpload\"></uploader>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label class=\"col-sm-3\">Hero Image</label>\r\n            </div>\r\n            <div class=\"row\">\r\n                <image-uploader link=\"hostNameUpload\"></image-uploader>\r\n            </div>\r\n        </div>\r\n    </div>\r\n   <button ng-click=\"updateVideo()\">Update video</button>\r\n\r\n</div>");}]);