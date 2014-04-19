(function ($, _, moment, metrics) {
	'use strict';

	function Registry($timeout, $http, endpoint) {
		var self = this,
			interval = 500,
			timer = null,
			charts = [],
			gauges = [],
			counters = [],
			meters = [],
			histograms = [],
			timers = [];

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
			gauges = [];
		};

		function updateMetrics(InstanceType, currentMetrics, newData, units) {
			var existing = _(currentMetrics).map('name');
			_(newData).each(function (value, name) {
				if (!_(existing).contains(name)) {
					var metric = new InstanceType(name, units[name]);
					currentMetrics.push(metric);
					_(metric.getCharts()).each(function (c) {
						charts.push(c);
					});
				}
			});
			_(currentMetrics).each(function (g) {
				g.update(newData[g.name], self.lastUpdate);
			});
		}

		function update(data) {
			self.lastUpdate = moment(data.lastUpdate);

			updateMetrics(metrics.Timer, timers, data.Timers, data.Units.Timers);
			//updateMetrics(metrics.Histogram, histograms, data.Histograms, data.Units.Histograms);
			//updateMetrics(metrics.Meter, meters, data.Meters, data.Units.Meters);
			//updateMetrics(metrics.SimpleMetric, counters, data.Counters, data.Units.Counters);
			//updateMetrics(metrics.SimpleMetric, gauges, data.Gauges, data.Units.Gauges);
		}

		this.getCharts = function () {
			//return _(meters).union(counters).union(gauges).value();
			return charts;
		};
	}

	$.extend(true, this, { metrics: { Registry: Registry } });

}).call(this, this.jQuery, this._, this.moment, this.metrics);