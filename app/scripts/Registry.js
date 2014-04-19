(function ($, _, moment, metrics) {
	'use strict';

	function Registry($timeout, $http, endpoint) {
		var self = this,
			interval = 500,
			timer = null,
			gauges = [],
			counters = [];			

		this.lastUpdate = moment(0);
		this.updateError = null;

		function updateValues() {
			$http.get(endpoint).success(function (data) {
				update(data);
				if (interval > 0) {
					timer = $timeout(updateValues, interval);
				}
			}).error(function () {
				self.updateError = 'Error reading metric data from ' + endpoint;
			});
		}

		updateValues();
		
		this.setUpdateInterval = function (updateInterval) {
			interval = updateInterval;
		};

		this.clearData = function () {
			gauges = []
		};

		function updateSimpleMetrics(currentMetrics, newData, units, lastUpdate) {
			var existing = _(currentMetrics).map('name');
			_(newData).each(function (value, name) {
				if (!_(existing).contains(name)) {
					currentMetrics.push(new metrics.SimpleMetric(name, units[name]));
				}
			});
			_(currentMetrics).each(function (g) {
				g.update(newData[g.name], lastUpdate);
			});
		}

		function update(data) {
			self.lastUpdate = moment(data.lastUpdate);

			updateSimpleMetrics(gauges, data.Gauges, data.Units.Gauges, self.lastUpdate);
			updateSimpleMetrics(counters, data.Counters, data.Units.Counters, self.lastUpdate);		
		}

		this.getMetrics = function () {
			return _(counters).union(gauges).value();
		};
	}

	$.extend(true, this, { metrics: { Registry: Registry } });

}).call(this, this.jQuery, this._, this.moment, this.metrics);