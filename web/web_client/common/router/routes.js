angular
    .module('app.routes', [])
    .constant('routesList', [
        {
            state: 'main',
            config: {
                url: '/',
                templateUrl: 'views/main/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            }
        },
        {
            state: 'videos',
            config: {
                url: '/videos',
                templateUrl: 'views/videos/videos.html',
                controller: 'VideosCtrl',
                controllerAs: 'videos'
            }
        }
    ]);