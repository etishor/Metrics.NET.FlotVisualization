(function ($) {
	'use strict';

	function DashboardController($scope, registry, configService) {
		$scope.registry = registry;

		$scope.small = configService.chartConfig().size === 1;
		$scope.medium = configService.chartConfig().size === 2;
		$scope.large = configService.chartConfig().size === 3;

		/* jshint unused:true */
		$scope.$on('resize-chart', function (event, size) {
			$scope.small = size === 1;
			$scope.medium = size === 2;
			$scope.large = size === 3;
		});
	}

	$.extend(true, this, { metrics: { DashboardController: DashboardController } });

}).call(this, this.jQuery);