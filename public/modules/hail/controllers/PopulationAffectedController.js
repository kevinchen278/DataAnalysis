
"use strict";

var app = angular.module('app');

app.controller('PopulationAffectedController', ['$scope',"DBService", '$filter', 'ChartFactory', function($scope, DBService, $filter, ChartFactory){

var req = {
		MethodName: "getStateCodes"
	};

	$scope.myData = [];
	$scope.states = [];
	var mapData = [];

	DBService.callService("POST",req).then(
		function(response){
			$scope.states = response.data; 
			callback();
		}
	);

	req = {
		MethodName: "tallyByState"
	};

	DBService.callService("POST",req).then(
		function(response){
			$scope.myData = [];
			response.data.forEach(function(item,index){
				$scope.myData.push({state: item._id, Affected: item.total});
			});

			callback();
		}

	);

	var callback = function(){
       var code;
		if ($scope.states && $scope.myData) {
			$scope.myData.forEach(function(item){
				var state = item.state;
				var curState = $filter('filter')($scope.states, {state: state});
				if (curState.length>0) {
					code = curState[0].statecode;
				} else {
					code = item.state;
				}

				if (item.Affected>0) {
					mapData.push({code: code, value: item.Affected});
				}
			});


		console.log(mapData);
		ChartFactory.drawStateAffected($('#mapContainer'), mapData);


		}

		console.log($scope.myData);

	};


	
}]);