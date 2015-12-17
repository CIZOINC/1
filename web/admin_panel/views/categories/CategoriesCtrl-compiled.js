'use strict';

/*global angular*/
angular.module('app.controls', ['ngSanitize']).controller('CategoriesCtrl', CategoriesCtrl);

/* @ngInject */
function CategoriesCtrl($scope, $log) {
    "use strict";

    $log.info('categories started');
}
CategoriesCtrl.$inject = ['$scope', '$log'];

//# sourceMappingURL=CategoriesCtrl-compiled.js.map