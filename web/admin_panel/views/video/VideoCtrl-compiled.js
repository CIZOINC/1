'use strict';

/*global angular*/
angular.module('app.controls').controller('VideoCtrl', VideoCtrl);

/* @ngInject */
function VideoCtrl($scope, $log, videoServ) {
    "use strict";

    $scope.self = $scope;
    $scope.srv = videoServ;
    $log.info(videoServ);
}

VideoCtrl.$inject = ['$scope', '$log', 'videoServ'];

//# sourceMappingURL=VideoCtrl-compiled.js.map