'use strict';
(function () {
    angular.module('app')
        .config(['$routeProvider', function ($routeProvider) {
            var routes, setRoutes;

            routes = [
                'dashboard',
                'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/boxes', 'ui/timeline', 'ui/nested-lists', 'ui/pricing-tables', 'ui/maps',
                'table/static', 'table/dynamic', 'table/responsive',
                'form/elements', 'form/layouts', 'form/validation', 'form/wizard',
                'chart/echarts', 'chart/echarts-line', 'chart/echarts-bar', 'chart/echarts-pie', 'chart/echarts-scatter', 'chart/echarts-more',
                'page/404', 'page/500', 'page/blank', 'page/forgot-password', 'page/invoice', 'page/lock-screen', 'page/profile', 'page/invoice', 'page/signin', 'page/signup', 'page/about', 'page/services', 'page/contact',
                'mail/compose', 'mail/inbox', 'mail/single',
                'app/tasks', 'app/calendar',
                'app/videos', 'app/featured', 'app/users'
            ];

            setRoutes = function (route) {
                var config, url;
                url = '/' + route;
                config = {
                    templateUrl: 'app/' + route + '.html'
                };
                $routeProvider.when(url, config);
                return $routeProvider;
            };

            routes.forEach(function (route) {
                return setRoutes(route);
            });

            $routeProvider
                .when('/', {
                    redirectTo: '/page/signin'
                })
                .when('/dashboard', {
                    templateUrl: 'app/dashboard/dashboard.html'
                })
                .when('/videos', {
                    templateUrl: 'app/videos/videos.html'
                })
                .when('/featured', {
                    templateUrl: 'app/featured/featured.html'
                })
                .when('/users', {
                    templateUrl: 'app/users/users.html'
                })
                .when('/404', {
                    templateUrl: 'app/page/404.html'
                })
                .otherwise({
                    redirectTo: '/404'
                });
        }]);
})();
