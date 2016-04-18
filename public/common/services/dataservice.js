"use strict";

var app = angular.module('app');

app.service('DBService', ['$http',"$q",  function($http, $q){

	var callService = function(methodName, requestObj){
		var cur_time = new Date();
		var requestHead = {
			"Content-Type": "application/json",
			"RequestTime": cur_time
		};


		var request = $http({
			url:  "http://dataanalysis-kevinchen278.rhcloud.com", //"http://localhost:8080", //
			method: methodName,
			headers: requestHead,
			data: requestObj
		});

		var handleSuccess = function(response){
			if (angular.isObject(response.data)) {
				return response.data;
			} else {
				return ($q.reject("System Error Occured."));
			}
		};

		var handleError = function(response){

			if (!angular.isObject(response.data)  || !angular.isObject(response.Error)) {
				return $q.reject("Unkown Error.");
			}

			return $q.reject(response.error);
		};


		var promise = request.then(
			handleSuccess, 
			handleError
			);

		promise.abort = function(){
			return $q.reject("Aborted");
		};

		promise.finally( function(){
			promise.abort = angular.noop;
			request = promise = null;
		});

		return promise;

	};


	return {

		callService: callService
	};
	
}]);