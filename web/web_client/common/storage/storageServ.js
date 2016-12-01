/*global angular*/

angular.module('app.services')
    .factory('storageServ', storageServ);


function storageServ($window) {
    "use strict";

    return {
        getItem: getItem,
        setItem: setItem,
        deleteItem: deleteItem
    };

    function getItem(key) {
        let value = $window.localStorage.getItem(key);

        return (value === 'undefined')? undefined : JSON.parse($window.localStorage.getItem(key));
    }

    function setItem(key, value) {
        let parsedValue = value ? JSON.stringify(value) : undefined;
        $window.localStorage.setItem(key, parsedValue);
        if ($window.localStorage.getItem(key) !== parsedValue) {
            console.warn('Failed to save value to localstorage');
        }
    }

    function deleteItem(key) {
        $window.localStorage.removeItem(key);
    }

}

storageServ.$inject = ['$window'];