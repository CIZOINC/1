angular
    .module('app.routes', [])
    .constant('routesList', [
        /*{
            state: 'main',
            config: {
                url: '/',
                templateUrl: 'views/main/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            }
        },*/
        {
            state: 'register',
            config: {
                url: '/register',
                templateUrl: 'views/register/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'videos'
            }
        },
        {
            state: 'login',
            config: {
                url: '/login',
                templateUrl: 'views/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            }
        },
        {
            state: 'home',
            config: {
                url: '/',
                templateUrl: 'views/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            }
        },
        {
            state: 'play',
            config: {
                url: '/play/:videoId',
                templateUrl: 'views/play/play.html',
                controller: 'PlayCtrl',
                controllerAs: 'play'
            }
        },
        {
            state: 'list',
            config: {
                url: '/list',
                templateUrl: 'views/list/list.html',
                controller: 'ListCtrl',
                controllerAs: 'list'
            }
        }
    ]);