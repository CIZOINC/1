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
        return JSON.parse($window.localStorage.getItem(key));
    }

    function setItem(key, value) {
        $window.localStorage.setItem(key, JSON.stringify(value));
    }

    function deleteItem(key) {
        $window.localStorage.removeItem(key);
    }

}

storageServ.$inject = ['$window'];