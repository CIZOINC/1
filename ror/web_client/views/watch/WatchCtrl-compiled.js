'use strict';

/*global angular*/
angular.module('app.controls').controller('WatchCtrl', WatchCtrl);

WatchCtrl.$inject = ['$scope', '$stateParams', '$sce', '$window'];

function WatchCtrl($scope, $stateParams, $sce, $window) {
    "use strict";

    var decoded;
    if ($stateParams.link) {
        decoded = $sce.trustAs($sce.RESOURCE_URL, $stateParams.link.replace(/%2F/g, '/'));
    }
    $scope.page = 'Watch';
    $scope.playerSettings = {
        width: $window.innerWidth,
        link: decoded
    };
}

//# sourceMappingURL=WatchCtrl-compiled.js.map