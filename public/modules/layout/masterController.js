
"use strict";

var app = angular.module('app');


app.controller('masterController', ['$scope',"DBService", function($scope, DBService){

	var req = {
		"byType": "state"
	};

	DBService.callService("POST",req).then(
		function(data){
			console.log(data);

		}
	);



	
}]);