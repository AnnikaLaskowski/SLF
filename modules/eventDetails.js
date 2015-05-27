angular.module('slf')
    .controller('EventCtrl', function($scope, $modalInstance, slot) {
        'use strict';
        $scope.events = [];
        $scope.resources = [];
        $scope.dates = {
            currentDate: slot.start
        };

        var dateNow = new Date();
        var convertedDate = moment($scope.dates.currentDate).format('DD.MM.YYYY');

        $scope.event = {
            date : convertedDate
        };

    })

