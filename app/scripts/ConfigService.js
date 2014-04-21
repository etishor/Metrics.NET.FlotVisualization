(function ($) {
	'use strict';

	function ConfigService(localStorageService) {
		var registryConfig = localStorageService.get('Metrics.Registry.Config') || {
			interval: 500,
			maxValues: 100
		}, healthConfig = localStorageService.get('Metrics.Health.Config') || {
			interval: 5000
		}, chartConfig = localStorageService.get('Metrics.Chart.Config') || {
			size : 2
		};

		this.registryConfig = function (config) {
			if (config) {
				$.extend(true,registryConfig,config);
				save();
			}
			return registryConfig;
		};

		this.healthConfig = function (config) {
			if (config) {
				healthConfig = config;
				save();
			}
			return healthConfig;
		};

		this.chartConfig = function (config) {
			if (config) {
				chartConfig = config;
				save();
			}
			return chartConfig;
		};

		this.clear = function () {			
			registryConfig.interval = 500;
			registryConfig.maxValues = 100;
			healthConfig.interval = 5000;
			chartConfig.size = 2;

			localStorageService.remove('Metrics.Registry.Config');
			localStorageService.remove('Metrics.Health.Config');			
			localStorageService.remove('Metrics.Chart.Config');			
		};

		function save() {
			localStorageService.add('Metrics.Registry.Config', registryConfig);
			localStorageService.add('Metrics.Health.Config', healthConfig);
			localStorageService.add('Metrics.Chart.Config', chartConfig);
		}
	}

	$.extend(true, this, { metrics: { ConfigService: ConfigService } });

}).call(this, this.jQuery);