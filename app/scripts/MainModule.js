(function ($, angular, metrics) {
	'use strict';

	this.MainModule = angular.module('MainModule', ['ngRoute', 'LocalStorageModule'])
		.value('endpoint', window.metricsEndpoint || '/')
		.service('config', ['localStorageService', metrics.ConfigService])
		.service('registry', ['$timeout', '$http', 'endpoint', 'config' , metrics.Registry])
		.service('healthMonitor', ['$timeout', '$http', 'endpoint', 'config', metrics.HealthMonitor])
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
		.controller('DashboardController', ['$scope', 'registry','config', metrics.DashboardController])
		.controller('HeaderController', ['$scope', 'registry','healthMonitor', 'config', '$rootScope', metrics.HeaderController])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/', { templateUrl: 'templates/Dashboard.tmpl.html', controller: 'DashboardController' });
		}]);

}).call(this, this.jQuery, this.angular, this.metrics);