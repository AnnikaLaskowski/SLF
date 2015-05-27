/**
 * Created by al on 11.05.2015.
 */
app.controller('EventCtrl', function ($scope, $http, $modal) {
    $http.get('/api/Event').success(function(data) {
        $scope.events = data;
    }).error(function(err){
//handle error here
    });

    $scope.toggleSearch = function () {
        $scope.showFilter = !$scope.showFilter;
    };

    $scope.addNewEvent = function() {
        var modalInstance = $modal.open({
            templateUrl: 'modules/eventDetails.html',
            controller: 'EventCtrl',
            windowClass: 'appointmentPopup'
        });}

    $scope.showEvent = function (event) {
        $scope.selectedEvent = event;

        var modalInstance = $modal.open({
            templateUrl: 'modules/eventDetails.html',
            controller: 'EventCtrl',
            windowClass: 'appointmentPopup',
            scope: $scope
        });}

});