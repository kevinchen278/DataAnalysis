"use strict";

var app = angular.module('app',['ui.router','ui.grid',
  'ui.grid.edit']);
 
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider

	.when('/',['$state', function($state){
		$state.go("home");
	}])

	.otherwise("/");

	$stateProvider
		.state("master", {
			abstract: true,
			views: {
				'master': {
					templateUrl: "/modules/layout/master/views/master.html",
					controller: 'masterController'
					}
				}
			})

		.state("home", {
			parent: 'master',
			templateUrl: '/modules/layout/home/views/home.html',
			controller: "homeController"

		})

		.state("home.hailRawData", {
			parent: 'home',
			templateUrl: '/modules/overview/views/HailRawData.html',
			controller: "hailRawDataController"
		})

		.state("home.ClaimRawData", {
			parent: 'home',
			templateUrl: '/modules/claims/views/ClaimRawData.html',
			controller: "ClaimRawDataController"
		})


		.state("home.PopulationAffected", {
			parent: 'home',
			templateUrl: '/modules/hail/views/PopulationAffected.html',
			controller: "PopulationAffectedController"

		})


		.state("home.hail", {
			parent: 'home',
			templateUrl: '/modules/hail/views/hail.html',
			controller: "hailController"

		})

		.state("home.AverageClaim", {
			parent: 'home',
			templateUrl: '/modules/claims/views/AverageClaim.html',
			controller: "AverageClaimController"

		});





}]);
