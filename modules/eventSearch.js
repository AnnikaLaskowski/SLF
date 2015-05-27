/**
 * Created by al on 11.05.2015.
 */

angular.module('slf')
    .controller('EventCtrl', ['$rootScope', '$scope', '$http', '$modal', function ($rootScope, $scope, $http, $modal) {
        'use strict';

        $scope.defaultColumns = [
            { type: { name: 'text' }, title: 'Firma', property: 'Firma' },
            { type: { name: 'text' }, title: 'Strasse', property: 'Strasse'},
            { type: { name: 'text' }, title: 'Plz', property: 'Plz' },
            { type: { name: 'text' }, title: 'Ort', property: 'Ort' },
            { type: { name: 'text' }, title: 'Telefon', property: 'Telefon' }

        ];



}])