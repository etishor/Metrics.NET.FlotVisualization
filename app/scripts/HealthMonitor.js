(function ($, _, moment, metrics) {
	'use strict';

	function HealthMonitor($timeout, $http, endpoint) {
		var self = this,
			interval = 1000,
			timer = null;

		this.isHealthy = true;
		this.unhealthy = [];
		this.healthy = [];

		function mapSection(section) {
			return _(section).map(function (h, key) {
				return { name: key, text: h };
			}).value();
		}

		function update(status) {
			self.isHealthy = status.IsHealthy;
			self.unhealthy = mapSection(status.Unhealthy);
			self.healthy = mapSection(status.Healthy);
		}

		function updateStatus() {
			$http.get(endpoint + '/health').success(function (data) {
				update(data);
			}).error(function (data) {
				update(data);
			}).finally(function () {
				if (interval > 0) {
					timer = $timeout(updateStatus, interval);
				}
			});
		}

		updateStatus();
	}

	$.extend(true, this, { metrics: { HealthMonitor: HealthMonitor } });

}).call(this, this.jQuery, this._, this.moment, this.metrics);