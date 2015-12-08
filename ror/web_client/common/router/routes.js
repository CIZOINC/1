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
        }
    ]);