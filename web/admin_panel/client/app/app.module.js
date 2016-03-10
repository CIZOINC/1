'use strict';
(function () {
    angular
        .module('app', [
            // Angular modules
            'ngRoute',
            'ngAnimate',
            'ngAria',

            // 3rd Party Modules
            'ui.bootstrap',
            'ui.tree',
            'ngTagsInput',
            'textAngular',
            'angular-loading-bar',
            'duScroll',
            // 'mgo-angular-wizard',
            'xeditable',
            'dndLists',
            'ngFileUpload',

            // Custom modules
            'app.nav',
            'app.i18n',
            'app.chart',
            'app.ui',
            'app.ui.form',
            'app.ui.form.validation',
            'app.page',
            'app.table',
            // 'app.task',
            // 'app.calendar',
            'app.videos',
            'app.featured',
            'app.users',
            'app.featured',
            'services.config'
        ])
        .run(function (editableOptions) {
            editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        });
})();
