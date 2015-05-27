/*var app = angular.module('slf', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'covis.ace.directives']);*/

var app = angular.module('slf', ['ngRoute', 'ngResource', 'ui.utils', 'ui.bootstrap', 'covis.ace.directives']);

app.config(['$routeProvider', function ($routeProvider, $routeParams) {
    $routeProvider
        .when('/customer', {
            templateUrl: "modules/customerSearch.html"

        })
        .when('/events', {
            templateUrl: "modules/eventSearch.html"

        })
        .when('/customer/:id', {
            templateUrl: 'modules/customerDetails.html'

        })

        .otherwise({ redirectTo: '/customer'});


}
]);



