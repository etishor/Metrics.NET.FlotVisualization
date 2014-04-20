(function () {
	'use strict';

	function HeaderController($scope, registry, healthMonitor) {
		$scope.registry = registry;
		$scope.healthMonitor = healthMonitor;

		$scope.setInterval = function (interval) {
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
		
	}

	$.extend(true, this, { metrics: { HeaderController: HeaderController } });

}).call(this);