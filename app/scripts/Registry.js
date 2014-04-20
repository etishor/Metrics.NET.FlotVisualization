(function ($, _, moment, metrics) {
	'use strict';

	function Registry($timeout, $http, endpoint) {
		var self = this,
			interval = 500,
			maxValues = 100,
			timer = null,
			charts = [],
			gauges = [],
			counters = [],
			meters = [],
			histograms = [],
			timers = [],
			meta = [
				{ name: 'Timers', data: timers },
				{ name: 'Meters', data: meters },
				{ name: 'Counters', data: counters },
				{ name: 'Gauges', data: gauges },
				{ name: 'Histograms', data: histograms }
			];
		
		this.showAll = function (metrics) {
			_(metrics).each(function (m) {
				m.toggle(true);
			});
		};

		this.hideAll = function (metrics) {
			_(metrics).each(function (m) {
				m.toggle(false);
			});
		};

		this.lastUpdate = moment(0);
		this.updateError = null;
		
		this.setUpdateInterval = function (updateInterval) {
			interval = updateInterval;
		};

		this.clearData = function () {
			gauges = [];
			counters = [];
			meters = [];
			histograms = [];
			timers = [];
		};

		this.getMetricsMeta = function () {
			return meta;
		};

		this.getGauges = function () { return gauges; };
		this.getCounters = function () { return counters; };
		this.getMeters = function () { return meters; };
		this.getHistograms = function () { return histograms; };
		this.getTimers = function () { return timers; };

		this.hideGauges = function () {
			_(gauges).each(function (g) {
				g.chart.isVisible = false;
			});
		};

		this.hideCounters = function () {
			_(counters).each(function (c) {
				c.chart.isVisible = false;
			});
		};

		this.hideMeters = function () {
			_(meters).each(function (m) {
				m.toggle(false);
			});
		};

		function updateMetrics(InstanceType, currentMetrics, newData, units) {
			var existing = _(currentMetrics).map('name');
			_(newData).each(function (value, name) {
				if (!_(existing).contains(name)) {
					var metric = new InstanceType(name, units[name], maxValues);
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
			updateMetrics(metrics.Histogram, histograms, data.Histograms, data.Units.Histograms);
			updateMetrics(metrics.Meter, meters, data.Meters, data.Units.Meters);
			updateMetrics(metrics.SimpleMetric, counters, data.Counters, data.Units.Counters);
			updateMetrics(metrics.SimpleMetric, gauges, data.Gauges, data.Units.Gauges);
		}

		this.getCharts = function () {
			return charts;
		};

		function updateValues() {
			$http.get(endpoint).success(function (data) {
				update(data);
				if (timer === null) {
					self.showAll(timers);
				}
				if (interval > 0) {
					timer = $timeout(updateValues, interval);
				}
			}).error(function () {
				self.updateError = 'Error reading metric data from ' + endpoint;
			});
		}

		updateValues();
	}

	$.extend(true, this, { metrics: { Registry: Registry } });

}).call(this, this.jQuery, this._, this.moment, this.metrics);