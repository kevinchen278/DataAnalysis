
"use strict";

var app = angular.module('app');

app.controller('AverageClaimController', ['$scope',"DBService",'ChartFactory', function($scope, DBService, ChartFactory){
	var req = {
		MethodName: "getAverageClaimByState",
		Params: []
	};

	var chartData = [];
	var AverageClaimData = [];

	DBService.callService("POST",req).then(
		function(response){

			if (response.data) {
				chartData = [];
				response.data.forEach(function(item, index){
					AverageClaimData.push({
						"No": index + 1, 
						"State": item._id,
						"Average Claims": item.average.toFixed(2)
					});
					chartData.push([item._id, parseFloat(item.average.toFixed(2))]);
				});

				ChartFactory.DrawAverageClaimChart($('#average-claim-chart'),chartData);

			}
		}
	);


	$scope.AverageClaimData = AverageClaimData;

	
}]);