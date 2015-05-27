var directives = angular.module('covis.ace.directives', []);

directives.directive('covisCalendar', [function() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            events: '=covEvents',
            settings: '=covSettings'
        },
        link: function ($scope, $element) {
            var calendar;
            var viewChangedCallback;
            var selectedCallback;
            var editEventCallback;
            if ($scope.settings) {
                viewChangedCallback = $scope.settings.viewUpdated;
                selectedCallback = $scope.settings.slotSelected;
                editEventCallback = $scope.settings.editEvent;
            }

            $scope.$watch('events', function(newValue, oldValue) {
                //if (newValue === oldValue) {
                //    return;
                //}
                if (calendar) {
                    $element.fullCalendar('removeEventSource', oldValue);
                    $element.fullCalendar('addEventSource', newValue);
                }

            });


            calendar = $element.fullCalendar({
                buttonText: {
                    /*prev: '<i class="fa fa-chevron-left"></i>',
                    next: '<i class="fa fa-chevron-right"></i>',*/
                    today: 'Heute',
                    month: 'Monat',
                    day: 'Tag',
                    week: 'Woche'
                },
                timeFormat: {
                    agenda: 'H:mm{ - H:mm}', // 15:00 - 16:30

                    // for all other views
                    '': 'H:mm'
                },
                monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
                dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: true,
                viewDisplay: function (view) {
                    if (viewChangedCallback) {
                        viewChangedCallback(view);
                    }
                },
                droppable: true, 
                drop: function (date, allDay) { 

                }
                ,
                selectable: true,
                selectHelper: true,
                select: function (start, end, allDay) {
                    if (selectedCallback) {
                        selectedCallback({
                            start: start,
                            end: end,
                            allDay: allDay
                        });
                    }

                    calendar.fullCalendar('unselect');
                }
                ,
                eventClick: function (calEvent) {
                    if (editEventCallback) {
                        editEventCallback(calEvent);
                    }
                }

            });
        }
    };
}]);

directives.directive('covisResourcePlaner', [function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            events: '=covEvents',
            settings: '=covSettings',
            resources: '=covResources',
            refresh: '=covRefresh'
        },
        link: function ($scope, $element) {
            var calendar;
            var viewChangedCallback;
            var selectedCallback;
            var editEventCallback;
            if ($scope.settings) {
                viewChangedCallback = $scope.settings.viewUpdated;
                selectedCallback = $scope.settings.slotSelected;
                editEventCallback = $scope.settings.editEvent;
            }
            
            var hasLoaded = false;
            $scope.$watch('refresh', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                if (!hasLoaded) {
                    hasLoaded = true;
                    renderCalendar();
                } else {

                    $element.fullCalendar('refetchEvents');
                    $element.fullCalendar('refetchResources');
                }
            });


            function renderCalendar() {
                calendar = $element.fullCalendar({
                    buttonText: {
                        prev: '<i class="fa fa-chevron-left"></i>',
                        next: '<i class="fa fa-chevron-right"></i>',
                        today: 'Heute',
                        month: 'Monat',
                        day: 'Tag',
                        week: 'Woche'
                    },
                    timeFormat: {
                        agenda: 'H:mm{ - H:mm}', // 15:00 - 16:30

                        // for all other views
                        '': 'H:mm'
                    },
                    monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                    monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
                    dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                    dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'resourceMonth,resourceWeek,resourceDay'
                    },
                    resources: function () {
                        return $scope.resources;
                    },
                    events: function (start, end, callback) {
                        callback($scope.events);
                    },
                    editable: true,
                    defaultView: 'resourceDay',
                    minTime: 7,
                    maxTime: 18,
                    refetchResources: true,
                    viewDisplay: function (view) {
                        if (viewChangedCallback) {
                            viewChangedCallback(view);
                        }
                    },
                    droppable: true,
                    drop: function (date, allDay) {

                    }
                    ,
                    selectable: true,
                    selectHelper: true,
                    select: function (start, end, allDay) {
                        if (selectedCallback) {
                            selectedCallback({
                                start: start,
                                end: end,
                                allDay: allDay
                            });
                        }

                        calendar.fullCalendar('unselect');
                    }
                    ,
                    eventClick: function (calEvent) {
                        if (editEventCallback) {
                            editEventCallback(calEvent);
                        }
                    }

                });
            }

        }
    };
}]);

directives.directive('covisResourceAvailability', [function() {
    return {
        restrict: 'EA',
        scope: {
            events: '=covEvents',
            slot: '=covSlot'
        },
        link: function ($scope, $element) {
            for (var i = 0; i < $scope.events.length; i++) {
                if ($scope.events[i].StartMinutes >= $scope.slot.start && $scope.events[i].StartMinutes < $scope.slot.end) {
                    var parent = $element.parent();
                    var parentWidth = parent.width();

                    var padding = $scope.events[i].Duration > 30 ? (($scope.events[i].Duration / 30) - 1) * 5 : 0;

                    $element.width($scope.events[i].Duration * parentWidth / 30 + padding);
                }
            }
        }
    };
}]);
