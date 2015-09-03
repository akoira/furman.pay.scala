'use strict';

angular.module('myApp.orders', ['ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/orders', {
            templateUrl: 'orders/orders.html',
            controller: 'OrdersCtrl'
        });
    }])

    .controller('OrdersCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.gridOptions = {};
        $scope.gridOptions.enableCellEditOnFocus = true;
        $scope.gridOptions.rowHeight = 25;
        $scope.gridOptions.multiSelect = false;

        $http.get('/app/data/orders.columns.json')
            .success(function (data) {
                $scope.gridOptions.columnDefs = data;
            });

        //$http.get('/app/data/orders.json')
        //    .success(function(data) {
        //        $scope.gridOptions.data = data;
        //    });

        var data = [];
        for (var i= 0; i<100; i++){
            data.push(
                {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "order": {
                        "id":  Math.floor((Math.random() * 1000) + 1),
                        "number": Math.floor((Math.random() * 10) + 1) + "-" + Math.floor((Math.random() * 1000) + 1),
                        "name": "Order " + Math.floor((Math.random() * 10) + 1) + "-" + Math.floor((Math.random() * 1000) + 1),
                    },
                    "cutting": {
                        "id": Math.floor((Math.random() * 1000) + 1),
                        "value": Math.floor(Math.random() * 1000 + 1)/100
                    },
                    "directGlueing": {
                        "id": Math.floor((Math.random() * 1000) + 1),
                        "value": Math.floor(Math.random() * 1000 + 1)/100
                    },
                    "curveGlueing": {
                        "id": Math.floor((Math.random() * 1000) + 1),
                        "value": Math.floor(Math.random() * 1000 + 1)/100
                    },
                    "milling": {
                        "id": Math.floor((Math.random() * 1000) + 1),
                        "value": Math.floor(Math.random() * 1000 + 1)/100
                    },
                    "drilling": {
                        "id": Math.floor((Math.random() * 1000) + 1),
                        "value": Math.floor(Math.random() * 1000 + 1)/100
                    },
                    "groove": {
                        "id": Math.floor((Math.random() * 1000) + 1),
                        "value": Math.floor(Math.random() * 1000 + 1)/100
                    },
                    "angle": {
                        "id": Math.floor((Math.random() * 1000) + 1),
                        "value": Math.floor(Math.random() * 1000 + 1)/100
                    },
                    "patch": {
                        "id": Math.floor((Math.random() * 1000) + 1),
                        "value": Math.floor(Math.random() * 1000 + 1)/100
                    },
                    "cutoff": {
                        "id": Math.floor((Math.random() * 1000) + 1),
                        "value": Math.floor(Math.random() * 1000 + 1)/100
                    }
                }
            );
        }


        $scope.gridOptions.data = data;

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };
        $scope.order2String = function (order) {
            console.log(order.number);
            return order.number + "/" + order.name;
        }
    }]);

