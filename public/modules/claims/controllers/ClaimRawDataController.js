
"use strict";

var app = angular.module('app');

app.controller('ClaimRawDataController', ['$scope',"DBService", 'ClaimService', function($scope, DBService,ClaimService){
	var CriteriaData = [];

	$scope.Catagories = [{key:'state', desc: "State" },
					  {key:'education', desc: "Education"},
					  {key:"ClaimAmount", desc:"Claim Amount"},
					  {key:"MaritalStatus", desc:"Marital Status"},
					  {key:"EmploymentStatus", desc: "EmploymentStatus" },
					  {key:"gender", desc: "Gender"}];


	ClaimService.requestCatagories($scope.Catagories).then(
		function(){
			CriteriaData = ClaimService.getCriteriaData();
			$scope.catagoryControl.setItem(0);
			$scope.curDropdownData = CriteriaData[$scope.Catagories[0].key];
			$scope.criteriaControl.setItem(-1);
			$scope.ClaimRawData = [];
		}
	);

	$scope.onCatagoryChange = function(item){
		$scope.curDropdownData = CriteriaData[item.key];
		$scope.criteriaControl.setItem(-1);

		$scope.isClaimAmount = (item.key ==='ClaimAmount');
		$scope.ClaimRawData = [];

	};

	$scope.onSearch = function() {

		$scope.ClaimRawData = [];
		var req;


		if ($scope.catagoryControl.getSelectedItem().key === "ClaimAmount") {
			req ={"MethodName": "getRawClaims",
				  "Params": {"ClaimAmount": { upValue: parseFloat($scope.upValue) , downValue:parseFloat($scope.downValue)}}
			      };
		} else {
			req ='{"MethodName": "getRawClaims","Params": {"' +
			       $scope.catagoryControl.getSelectedItem().key +'":"' + 
			       $scope.criteriaControl.getSelectedItem().desc + '"}}';
			req = JSON.parse(req);
		}

	
		DBService.callService("POST",req).then(
		function(response){
			if (response.data && (response.data.length>0)) {
				var fields=Object.getOwnPropertyNames(response.data[0]);
				var i, record;
				response.data.forEach(function(item,index){
					record = {};
					for (i=4; i< fields.length-10; i++) {
						record.No = index +1;
						record[fields[i]] = item[fields[i]];
					}
					$scope.ClaimRawData.push(record);
				});
			}
			}
		);
	};

 

}]);




