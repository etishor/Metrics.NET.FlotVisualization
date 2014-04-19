(function (_, moment, metrics) {
	'use strict';

	function DashboardController($scope, registry) {
		$scope.registry = registry;		
	}

	$.extend(true, this, { metrics: { DashboardController: DashboardController } });

}).call(this, this._, this.moment, this.metrics);