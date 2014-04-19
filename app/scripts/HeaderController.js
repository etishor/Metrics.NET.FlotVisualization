(function () {
	'use strict';

	function HeaderController($scope, registry) {
		$scope.registry = registry;

		$scope.setInterval = function (interval) {
			registry.setUpdateInterval(interval);
		};

		$scope.clearData = registry.clearData;
	}

	$.extend(true, this, { metrics: { HeaderController: HeaderController } });

}).call(this);