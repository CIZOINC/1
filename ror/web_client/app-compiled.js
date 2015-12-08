'use strict';

/*global angular*/
angular.module('app').run(applicationStart);

applicationStart.$inject = ['routerHelper', 'routesList', '$state'];

function applicationStart(routerHelper, routesList, $state) {
    "use strict";

    routerHelper.configureStates(routesList);
    $state.go('main');
}

//# sourceMappingURL=app-compiled.js.map