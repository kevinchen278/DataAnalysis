
"use strict";

var app = angular.module('app');


app.controller('hailRawDataController', ['$scope',"DBService", '$filter', 'ChartFactory', function($scope, DBService, $filter, ChartFactory){

	var req = {
		MethodName: "getHailRawData",
		Params: []
	};

	var hailRawData = [];

	DBService.callService("POST",req).then(
		function(response){
			if (response.data) {
				response.data.forEach(function(item, index){
					hailRawData.push({
						"No": index + 1, 
						"Date": new Date(item.Data).toISOString().slice(0, 10),
						"State": item.State,
						"Hail Size": item["Hail Size"],
						"Population Affected": item["Population Affected"]
					});
				});
			}
		}
	);

	$scope.hailRawData = hailRawData;


	$scope.refreshData = function() {
  		$scope.hailRawData = $filter('filter')(hailRawData, $scope.searchText, undefined);
	};


	
}]);