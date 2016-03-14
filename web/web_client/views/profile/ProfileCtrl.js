/*global angular*/
angular
    .module('app.controls')
    .controller('ProfileCtrl', ProfileCtrl);

/* @ngInject */
function ProfileCtrl($scope, $state, userServ, playerServ) {
    "use strict";


    $scope = angular.extend($scope, {
        pass: '',
        message: {
            title: '123',
            description: 'this is it',
            isVisible: false,
            callback: function () {

            }
        },
        closeView: closeView,
        updatePassword: updatePassword
    });

    function closeView() {
        $state.go('home');
    }

    function updatePassword() {
        if ($scope.pass.length) {
            userServ.updatePasswordOnline($scope.hostName, $scope.pass, $scope.storage.token.access_token)
                .then(() => {
                    playerServ.showMessage($scope, 'Success', 'Password successfully updated', () => {
                        $state.go('home');
                    });
                })
                .catch((response) => {
                    let errors = _.map(response.data.errors, (error) => {
                        return error.message;
                    });
                    playerServ.showMessage($scope, 'Error', errors.join(', '));
                })
        } else {
            playerServ.showMessage($scope, 'Error', 'Please enter your new password');
        }
    }
}

ProfileCtrl.$inject = ['$scope', '$state', 'userServ', 'playerServ'];