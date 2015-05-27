angular.module('slf')
    .controller('CalendarCtrl', ['$rootScope', '$scope', '$http', '$modal', function ($rootScope, $scope, $http, $modal) {
        'use strict';
        var now = new Date();

        $scope.events = [];

        $http.get('/api/Event').success(function(data) {
            $scope.events = data;});

        $scope.onCalendarUpdated = function () {
            $http.get('/api/Event').success(function(data) {
                $scope.events = data;})
        };
        
        $scope.onSlotSelected = function (slot) {
            $modal.open({
                templateUrl: 'modules/eventDetails.html',
                controller: 'EventCtrl',
                windowClass: 'appointmentPopup',
                resolve: {
                    slot: function() {
                        return slot;
                    }
                }
            });
        };
        
        $scope.showEvent = function (event) {
            $scope.selectedEvent = event;

            var modalInstance = $modal.open({
                templateUrl: 'modules/eventDetails.html',
                controller: 'EventCtrl',
                windowClass: 'appointmentPopup',
                scope: $scope
            });}

        $scope.calendarSettings = {

            events: $scope.events,
            viewUpdated: $scope.onCalendarUpdated,
            slotSelected: $scope.onSlotSelected,
            editEvent: $scope.showEvent
        };

    }])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider
            .when('/calendar', {
                templateUrl: 'modules/calendar.html',
                controller: 'CalendarCtrl'
            });
    }]);