angular
    .module('app.routerHelper')
    .provider('routerHelper', routerHelperProvider);

routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
/* @ngInject */
function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    /* jshint validthis:true */
    this.$get = RouterHelper;

    //$locationProvider.html5Mode(true);

    RouterHelper.$inject = ['$state'];
    /* @ngInject */
    function RouterHelper($state) {
        var hasOtherwise = false;

        return {
            configureStates: configureStates,
            getStates: getStates
        };

        ///////////////

        function configureStates(states, otherwisePath) {

            for (let i=0; i < states.length; i++) {
                $stateProvider.state(states[i].state, states[i].config);
            }
            if (otherwisePath && !hasOtherwise) {
                hasOtherwise = true;
                $urlRouterProvider.otherwise(otherwisePath);
            }
        }

        function getStates() {
            return $state.get();
        }
    }
}