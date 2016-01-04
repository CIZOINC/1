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
        },
        {
            state: 'watch',
            config: {
                url: '/watch/:link',
                templateUrl: 'views/watch/watch.html',
                controller: 'WatchCtrl',
                controllerAs: 'watch'
            }
        }
    ]);