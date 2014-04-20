(function ($, angular, metrics) {
	'use strict';

	this.MainModule = angular.module('MainModule', ['ngRoute'])
		.value('endpoint', window.metricsEndpoint || '/')
		.service('registry', ['$timeout', '$http', 'endpoint', metrics.Registry])
		.service('healthMonitor', ['$timeout', '$http', 'endpoint', metrics.HealthMonitor])
		.directive('chart', metrics.ChartDirective)
		.directive('checkBoxMenu', function () {
			return {
				restrict: 'A',
				link: function (scope, element) {
					$(element).click(function (e) {
						e.stopPropagation();
					});
				}
			};
		})
		.controller('DashboardController', ['$scope', 'registry', metrics.DashboardController])
		.controller('HeaderController', ['$scope', 'registry','healthMonitor', metrics.HeaderController])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/', { templateUrl: 'templates/Dashboard.tmpl.html', controller: 'DashboardController' });
		}]);

}).call(this, this.jQuery, this.angular, this.metrics);