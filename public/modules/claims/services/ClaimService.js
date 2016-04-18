"use strict";

var app = angular.module('app');

app.service('ClaimService', ["DBService",'$q',  function(DBService,$q){

	var CriteriaData = {};
	var finishedTask = 0;

	var requestCriteriaData = function(Catagories){

		return $q(function(resolve, reject){

			Catagories.forEach(function(item){
				if (item.key === "ClaimAmount") {
					CriteriaData[item.key]=[];
					finishedTask++;
					return;
				}


				var req = {
					MethodName: "getDistinct",
					Params: {"FieldName": item.desc}
				};
				DBService.callService("POST",req).then(
					function(response){
						finishedTask++;
						if (response.data) {
							CriteriaData[item.key]=[];
							response.data.forEach(function(elem, index){
							   CriteriaData[item.key].push({key: index, desc: elem});	
							});
						}
					if (finishedTask == Catagories.length) {
						resolve('Success Batch Tasks.');
					}
				   },
				   function(){
				   	 reject("Batch Tasks Run Error.");
				   }
				);	

			});
		});
	};


	var getCriteriaData = function(){
		return CriteriaData;

	};


	return {
		requestCatagories: requestCriteriaData,
		getCriteriaData: getCriteriaData
	};

}]);