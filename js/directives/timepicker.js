var directives = angular.module('covis.ace.directives');

directives.directive('covisTimepicker', [function() {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/covis/timepicker/timepicker.html',
        scope: {
            minTime: '@covMinTime',
            maxTime: '@covMaxTime'
        },
        link: function ($scope) {
            $scope.times = [];
            if ($scope.minTime && $scope.maxTime) {
                for (var i = parseInt($scope.minTime); i <= parseInt($scope.maxTime); i++) {
                    $scope.times.push(i + ':00');
                    $scope.times.push(i + ':30');
                }
            }
        }
    };
}]);
