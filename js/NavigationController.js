app.controller('NavCtrl', function ($scope,$http) {
    $http.get('/api/Navigation/GetMenuItems').then(function(response) {
        $scope.menuItems = response.data;
    });
});