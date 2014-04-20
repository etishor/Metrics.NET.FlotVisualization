(function () {
	'use strict';

	function HeaderController($scope, registry, healthMonitor) {
		$scope.registry = registry;
		$scope.healthMonitor = healthMonitor;

		$scope.interval = 500;

		$scope.setInterval = function (interval) {
			$scope.interval = interval;
			registry.setUpdateInterval(interval);
		};

		$scope.clearData = registry.clearData;

		$scope.setHealthItem = function (isHealthy, item) {
			$scope.healthItem = {
				isHealthy: isHealthy,
				name: item.name,
				text : item.text
			}
		};

		$scope.healthInterval = 1000;
		$scope.setHealthUpdateIntervel = function (interval) {
			$scope.healthInterval = interval;
			healthMonitor.setUpdateInterval(interval);
		};
	}

	$.extend(true, this, { metrics: { HeaderController: HeaderController } });

}).call(this);