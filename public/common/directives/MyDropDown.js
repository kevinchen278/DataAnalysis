"use strict";

var app = angular.module('app');

app.directive('myDropDown', [function(){
	var dropdownStyle = "<style>.my-dropdown {position: absolute;}" + 
						".my-dropdown .btn-default {width: 100%; height: 35px; background-color: white; text-align: left;}" +
						".my-dropdown .dropdown-menu {background-color: white; width: 100%; text-align: left; overflow-y: scroll;}" + 
						".btn .caret {position:absolute; right: 5%; top: 45%;}" +
						".my-dropdown .dropdown-toggle.btn-default:hover, .my-dropdown .dropdown-toggle.btn-default:focus, .my-dropdown .dropdown-toggle.btn-default{background-color: white;}</style>";

	return {
		restrict: "E",
		scope: {
			options: "=",
			control: "=",
			size: "@",
			onChange: "="
		},

		template: '<div class="dropdown my-dropdown">' + 
				 '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">' +
				 '<span class="displayItem"> {{selectedItem.desc}}</span><span class="caret"></span></button>'+
				 '<ul class="dropdown-menu"><li ng-repeat="d in options"><a ng-click="itemClick(d)">{{d.desc}}</a></li></ul></div>',
		compile: function(elem) {
			var maxh = elem.attr('max-height'), 
				width = elem.attr('width');

		    var head = angular.element(document.getElementsByTagName('head')[0]);
		    head.append(dropdownStyle);

		    angular.element(elem.children().children()[1]).css({'max-height': maxh});
		    angular.element(elem.children()[0]).css({'width':width});

		    var linkFun = function($scope, $elem, $attrs){

		    	var controlFun = {
		    		getSelectedItem: function(){
		    			return $scope.selectedItem;
		    		},
		    		setItem: function(i) {
		    			if (i===-1) {
					    	$scope.selectedItem = {key: -1, desc: "select ..."};
		    			} else {
			    			if (i < $scope.options.length) {$scope.selectedItem = $scope.options[i];}
		    			}
		    		}
		    	};

		    	if ($scope.control) {
		    		angular.extend($scope.control, controlFun);
		    	} else {
		    		$scope.control = controlFun;
		    	}

		    	$scope.selectedItem = {key: -1, desc: "select ..."};
		    	$scope.itemClick = function(item){
		    		$scope.selectedItem = item;
		    		if ($scope.onChange) {$scope.onChange(item);}
		    	};
		    };

		    return linkFun;
		}
	};
}]);

