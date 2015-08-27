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
        { name: 'id', displayName: "Заказ", enableCellEdit: false },
        { name: 'age', enableCellEditOnFocus:false, displayName:'age (f2/dblClick edit)', width: 200  },
        { name: 'address.city', enableCellEdit: true, width: 300 },
        { name: 'name', displayName: 'Name (editOnFocus)', width: 200}
    ];

    $http.get('/app/data/500_complex.json')
        .success(function(data) {
            $scope.gridOptions.data = data;
        });

    $scope.currentFocused = "";

    $scope.getCurrentFocus = function(){
        var rowCol = $scope.gridApi.cellNav.getFocusedCell();
        if(rowCol !== null) {
            $scope.currentFocused = 'Row Id:' + rowCol.row.entity.id + ' col:' + rowCol.col.colDef.name;
        }
    },

    $scope.gridOptions.onRegisterApi = function(gridApi){
        $scope.gridApi = gridApi;
    };
}]);

