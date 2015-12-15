angular.module('app.routes', []).constant('routesList', [{
    state: 'main',
    config: {
        url: '/',
        templateUrl: 'views/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    }
}, {
    state: 'content',
    config: {
        url: '/content',
        templateUrl: 'views/content/content.html',
        controller: 'ContentCtrl',
        controllerAs: 'content'
    }
}, {
    state: 'video',
    config: {
        url: '/video/:id',
        templateUrl: 'views/video/video.html',
        controller: 'VideoCtrl',
        controllerAs: 'video'
    }
}]);

//# sourceMappingURL=routes-compiled.js.map