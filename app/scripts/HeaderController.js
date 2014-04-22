(function ($) {
	'use strict';

	function HeaderController($scope, registry, healthMonitor, configService, $rootScope) {
		$scope.registry = registry;
		$scope.healthMonitor = healthMonitor;
		$scope.config = configService.chartConfig();

		$scope.clearData = function () {
			registry.clearData();
			configService.clear();
		};
		
		$scope.setChartSize = function (size) {
			$scope.config.size = size;
			configService.chartConfig($scope.config);
			$rootScope.$broadcast('resize-chart', size);
		};

		$scope.setInterval = function (interval) {
			$scope.interval = interval;
			registry.updateInterval(interval);
		};

		$scope.setHealthUpdateIntervel = function (interval) {
			$scope.healthInterval = interval;
			healthMonitor.updateInterval(interval);
		};

		$scope.setHealthItem = function (isHealthy, item) {
			$scope.healthItem = {
				isHealthy: isHealthy,
				name: item.name,
				text: item.text
			};
		};
	}

	$.extend(true, this, { metrics: { HeaderController: HeaderController } });

}).call(this, this.jQuery);