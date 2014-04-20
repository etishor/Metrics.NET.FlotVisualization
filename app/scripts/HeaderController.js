(function () {
	'use strict';

	function HeaderController($scope, registry, healthMonitor) {
		$scope.registry = registry;
		$scope.healthMonitor = healthMonitor;

		$scope.clearData = registry.clearData;

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

}).call(this);