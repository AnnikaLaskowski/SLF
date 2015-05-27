app.controller('CustomerCtrl', function ($rootScope, $scope, $http, $modal, $location) {
    $http.get('/api/Customer/GetCustomers').success(function(data) {
        $scope.customers = data;
    }).error(function(err){
//handle error here
    });

    $scope.toggleSearch = function () {
        $scope.showFilter = !$scope.showFilter;
    };

    $scope.addCustomer = function() {

        $scope.newCustomer = true;

        var modalInstance = $modal.open({
            templateUrl: 'modules/customerDetails.html',
            controller: 'CustomerCtrl',
            windowClass: 'customerPopup'
        });}

    $scope.showCustomer = function (customer) {
        $scope.selectedCustomer = customer;

        var modalInstance = $modal.open({
            templateUrl: 'modules/customerDetails.html',
            controller: 'CustomerCtrl',
            windowClass: 'customerPopup',
            scope: $scope
        });}

});