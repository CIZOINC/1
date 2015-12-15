'use strict'

/*global angular*/
;
angular.module('app.controls').controller('WatchCtrl', WatchCtrl);

/* @ngInject */
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

WatchCtrl.$inject = ['$scope', '$stateParams', '$sce', '$window'];

//# sourceMappingURL=WatchCtrl-compiled.js.map

//# sourceMappingURL=WatchCtrl-compiled-compiled.js.map