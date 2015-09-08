'use strict';

angular.module('myApp.orders', ['ngRoute',
    'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.autoResize',
    'shagstrom.angular-split-pane',
    'ui.layout'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/orders', {
            templateUrl: 'orders/orders.html',
            controller: 'OrdersCtrl'
        });
    }])

    .controller('OrdersCtrl', ['$scope', '$http', function ($scope, $http) {

        function initOrdersGrid() {
            $scope.gridOptions = {};
            $scope.gridOptions.enableCellEditOnFocus = true;
            $scope.gridOptions.rowHeight = 25;
            $scope.gridOptions.multiSelect = false;
            $scope.gridOptions.rowEditWaitInterval = -1;
            $http.get('/app/data/orders.columns.json')
                .success(function (data) {
                    $scope.gridOptions.columnDefs = data;
                });
            //$http.get('/app/data/orders.json')
            //    .success(function(data) {
            //        $scope.gridOptions.data = data;
            //    });
            $scope.gridOptions.data = generateOrdersData();
            $scope.gridOptions.onRegisterApi = function (gridApi) {
                $scope.gridApi = gridApi;
            };
        }


        function initDatesGrid() {
            var setGroupValues = function (columns, rows) {
                columns.forEach(function (column) {
                    if (column.grouping && column.grouping.groupPriority > -1) {
                        // Put the balance next to all group labels.
                        column.treeAggregationFn = function (aggregation, fieldValue, numValue, row) {
                            if (typeof(aggregation.value) === 'undefined') {
                                aggregation.value = 0;
                            }
                            aggregation.value = aggregation.value + row.entity.balance;
                        };
                        column.customTreeAggregationFinalizerFn = function (aggregation) {
                            if (typeof(aggregation.groupVal) !== 'undefined') {
                                aggregation.rendered = aggregation.groupVal + ' (' + $filter('currency')(aggregation.value) + ')';
                            } else {
                                aggregation.rendered = null;
                            }
                        };
                    }
                });
                return columns;
            };


            $scope.gridOptions1 = {};
            $http.get('/app/data/dates.columns.json')
                .success(function (data) {
                    $scope.gridOptions1.columnDefs = data;
                });
            $scope.gridOptions1.data = generateDateData();


            $scope.gridOptions.onRegisterApi = function (gridApi) {
                $scope.gridApi = gridApi;
            };

            $scope.monthCellValue = function (grid, row, col) {
                if (row.groupHeader && col.grouping.groupPriority === row.treeLevel) {
                    return row.treeNode.children[0].row.entity.month.name;
                }
                else {
                    return "";
                }
            };

            $scope.yearCellValue = function (grid, row, col) {
                if (row.groupHeader && col.grouping.groupPriority === row.treeLevel) {
                    return row.treeNode.aggregations[0].groupVal;
                }
                else {
                    return "";
                }
            };


        }

        initOrdersGrid();
        initDatesGrid();
    }]);

