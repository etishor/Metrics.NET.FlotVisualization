(function ($, _) {
	'use strict';

	function HealthMonitor($timeout, $http, endpoint, configService) {
		var self = this,
			config = configService.healthConfig(),
			timer = null;

		this.isHealthy = true;
		this.unhealthy = [];
		this.healthy = [];
		this.updateError = null;

		this.retry = function () {
			updateStatus();
		};

		this.updateInterval = function (interval) {
			if (interval !== undefined) {
				config.interval = interval;
				configService.healthConfig(config);
				updateStatus();
			}
			return config.interval;
		};

		function mapSection(section) {
			return _(section).map(function (h, key) {
				return { name: key, text: h };
			}).value();
		}

		function update(status) {
			self.updateError = null;
			self.isHealthy = status.IsHealthy;
			self.unhealthy = mapSection(status.Unhealthy);
			self.healthy = mapSection(status.Healthy);
			if (config.interval > 0) {
				timer = $timeout(updateStatus, config.interval);
			}
		}

		function updateStatus() {
		    var healthUri = 'health';
		    if (endpoint) {
		        if (endpoint[endpoint.length - 1] === '/') {
		            healthUri = endpoint + healthUri;
		        } else {
		            healthUri = endpoint + '/' + healthUri;
		        }
		    }

		    $http.get(healthUri).success(function (data) {
				update(data);
			}).error(function (data, status) {
				if (status === 500 && _(data).isObject() && data.IsHealthy === false) {
					update(data);
				} else {
					self.updateError = 'Error reading Health Status data from ' + (endpoint || '') + '/health. Update stopped.';
				}
			});
		}

		updateStatus();
	}

	$.extend(true, this, { metrics: { HealthMonitor: HealthMonitor } });

}).call(this, this.jQuery, this._);