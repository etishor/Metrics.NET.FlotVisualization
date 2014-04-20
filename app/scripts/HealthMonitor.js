(function ($, _, moment, metrics) {
	'use strict';

	function HealthMonitor($timeout, $http, endpoint) {
		var self = this,
			interval = 1000,
			timer = null;

		this.isHealthy = true;
		this.unhealthy = [];
		this.healthy = [];
		this.updateError = null;

		this.retry = function () {
			updateStatus();
		};

		this.setUpdateInterval = function (updateInterval) {
			interval = updateInterval;
			updateStatus();
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
			if (interval > 0) {
				timer = $timeout(updateStatus, interval);
			}			
		}

		function updateStatus() {
			$http.get(endpoint + '/health').success(function (data) {
				update(data);
			}).error(function (data, status) {
				if (status == 500 && _(data).isObject() && data.IsHealthy === false) {
					update(data);
				} else {
					self.updateError = 'Error reading Health Status data from ' + endpoint + '/health. Update stopped.';
				}
			});
		}

		updateStatus();
	}

	$.extend(true, this, { metrics: { HealthMonitor: HealthMonitor } });

}).call(this, this.jQuery, this._, this.moment, this.metrics);