(function () {
	'use strict';

	function DashboardController($scope, registry) {
		$scope.registry = registry;		
	}

	$.extend(true, this, { metrics: { DashboardController: DashboardController } });

}).call(this);