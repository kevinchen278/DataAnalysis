"use strict";

var app = angular.module('app',['ui.router','ui.grid',
  'ui.grid.edit']);
 
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider

	.when('/',['$state', function($state){
		$state.go("hail");
	}])

	.otherwise("/");

	$stateProvider
		.state("master", {
			abstract: true,
			views: {
				'master': {
					templateUrl: "/modules/layout/master.html",
					controller: 'masterController'
					}
				}
			})

		.state("home", {
			parent: 'master',
			templateUrl: '/modules/layout/home.html',
			controller: "homeController"

		})

		.state("hail", {
			parent: 'home',
			templateUrl: '/modules/hail/hail.html',
			controller: "hailController"

		});


}]);
