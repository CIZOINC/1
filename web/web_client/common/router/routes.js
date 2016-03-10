angular
    .module('app.routes', [])
    .constant('routesList', [
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
            state: 'reset',
            config: {
                url: '/reset',
                templateUrl: 'views/reset/reset.html',
                controller: 'ResetCtrl',
                controllerAs: 'reset'
            }
        },
        {
            state: 'home',
            config: {
                url: '',
                templateUrl: 'views/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            }
        },
        {
            state: 'main',
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
                url: '/play/:videoId/:categoryId',
                templateUrl: 'views/play/play.html',
                controller: 'PlayCtrl',
                controllerAs: 'play'
            }
        },
        {
            state: 'list',
            config: {
                url: '/list/:listType',
                templateUrl: 'views/list/list.html',
                controller: 'ListCtrl',
                controllerAs: 'list'
            }
        },
        {
            state: 'share',
            config: {
                url: '/share/:videoId',
                templateUrl: 'views/share/share.html',
                controller: 'ShareCtrl',
                controllerAs: 'share'
            }
        },
        {
            state: 'shared_play',
            config: {
                url: '/videos/:videoId',
                templateUrl: 'views/play/play.html',
                controller: 'PlayCtrl',
                controllerAs: 'play'
            }
        },
        {
            state: 'terms',
            config: {
                url: '/terms',
                templateUrl: 'views/terms/terms.html',
                controller: 'TermsCtrl',
                controllerAs: 'terms'
            }
        },
        {
            state: 'privacy',
            config: {
                url: '/privacy',
                templateUrl: 'views/privacy/privacy.html',
                controller: 'PrivacyCtrl',
                controllerAs: 'privacy'
            }
        },
        {
            state: 'resetPassword',
            config: {
                url: '/resetPassword/:resetToken',
                templateUrl: 'views/reset-password/reset-password.html',
                controller: 'resetPasswordCtrl',
                controllerAs: 'resetPassword'
            }
        }
    ]);