'use strict'

/*global angular*/
;
angular.module('app.controls').controller('VideosCtrl', VideosCtrl);

/* @ngInject */
function VideosCtrl($scope) {
    "use strict";

    $scope.videosList = [{
        "id": 1,
        "created_at": "2015-12-09T09:23:13.990Z",
        "updated_at": "2015-12-09T09:23:13.990Z",
        "title": "Simpsons",
        "description": "Long movie about the family",
        "mpaa_rating": "G",
        "category_id": 0,
        "viewable": true,
        "tags": ["string"],
        "streams": [{
            "link": "https://s3.amazonaws.com/cizo-assets/staging/stream/simpsons/mp4/video.mp4",
            "type": "mp4",
            "transcode_status": "string"
        }],
        "hero_image_link": "string",
        "liked": false,
        "view_count": 0
    }, {
        "id": 2,
        "created_at": "2015-12-09T09:23:13.990Z",
        "updated_at": "2015-12-09T09:23:13.990Z",
        "title": "Star wars",
        "description": "string",
        "mpaa_rating": "G",
        "category_id": 3,
        "viewable": true,
        "tags": ["string"],
        "streams": [{
            "link": "https://s3.amazonaws.com/cizo-assets/staging/stream/starwars/mp4/video.mp4",
            "type": "mp4",
            "transcode_status": "string"
        }],
        "hero_image_link": "string",
        "liked": true,
        "view_count": 0
    }, {
        "id": 3,
        "created_at": "2015-12-04T09:23:13.990Z",
        "updated_at": "2015-12-04T09:23:13.990Z",
        "title": "None",
        "description": "string",
        "mpaa_rating": "PG-13",
        "category_id": 2,
        "viewable": true,
        "tags": ["string"],
        "streams": [{
            "link": "string",
            "type": "string",
            "transcode_status": "string"
        }],
        "hero_image_link": "string",
        "liked": true,
        "view_count": 0
    }];
}

VideosCtrl.$inject = ['$scope'];

//# sourceMappingURL=videosCtrl-compiled.js.map

//# sourceMappingURL=VideosCtrl-compiled-compiled.js.map