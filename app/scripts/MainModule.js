(function (angular, metrics) {
	'use strict';

	this.MainModule = angular.module('MainModule', ['ngRoute'])
		.value('endpoint', window.metricsEndpoint || '/json')
		.service('registry', ['$timeout', '$http', 'endpoint', metrics.Registry])
		.directive('chart', metrics.ChartDirective)
		.controller('DashboardController', ['$scope', 'registry', metrics.DashboardController])
		.controller('HeaderController', ['$scope', 'registry', metrics.HeaderController])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/', { templateUrl: 'templates/Dashboard.tmpl.html', controller: 'DashboardController' });
		}]);

}).call(this, this.angular, this.metrics);