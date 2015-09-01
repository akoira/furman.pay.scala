'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.resizeColumns'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {
    $scope.gridOptions = {  };
    $scope.gridOptions.enableCellEditOnFocus = true;

    $scope.gridOptions.columnDefs = [
        { field: "order", displayName: "Заказ", enableCellEdit: false, cellTemplate: "<div>{{row.entity.order.number}}/{{row.entity.order.name}}</div>"},
        { field: 'relay.name', displayName: "Смена", enableCellEdit: false },
        { field: 'service.name', displayName: "Распил", enableCellEdit: false},
        { field: 'value', displayName: 'Распил', enableCellEdit: false}
    ];

    $http.get('/app/data/orders.json')
        .success(function(data) {
            $scope.gridOptions.data = data;
        });

    $scope.gridOptions.onRegisterApi = function(gridApi){
        $scope.gridApi = gridApi;
    };
    $scope.order2String = function(order) {
        console.log(order.number);
        return order.number + "/" + order.name;
    }
}]);

