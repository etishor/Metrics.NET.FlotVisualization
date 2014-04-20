(function ($, _, moment, metrics) {
	'use strict';

	function Registry($timeout, $http, endpoint, configService) {
		var self = this,
			initialized = false,
			config = configService.registryConfig(),
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

		this.chartUpdated = function (chart) {
			saveChartState();
		};

		function saveChartState() {
			if (!initialized) {
				return;
			}

			config.chartState = _(charts).map(function (c) {
				return {
					name: c.name,
					unit: c.unit,
					visible: c.isVisible()
				}}).value();
			configService.registryConfig(config);
		}

		function initialSetup() {
			if (!config.chartState) {
				self.showAll(timers);
			} else {
				_(config.chartState).each(function (s) {
					_(charts).where(function (c) {
						return c.name === s.name && c.unit === s.unit;
					}).each(function (c) {
						c.toggle(s.visible);
					});
				});
			}
			initialized = true;
		}

		this.showAll = function (metrics) {
			if (metrics) {
				_(metrics).each(function (m) {
					m.toggle(true);
				});
			} else {
				this.showAll(gauges);
				this.showAll(counters);
				this.showAll(meters);
				this.showAll(histograms);
				this.showAll(timers);
			}
		};

		this.hideAll = function (metrics) {
			if (metrics) {
				_(metrics).each(function (m) {
					m.toggle(false);
				});
			} else {
				this.hideAll(gauges);
				this.hideAll(counters);
				this.hideAll(meters);
				this.hideAll(histograms);
				this.hideAll(timers);
			}
		};

		this.lastUpdate = moment(0);
		this.updateError = null;

		this.updateInterval = function (interval) {
			if (interval !== undefined) {
				config.interval = interval;
				configService.registryConfig(config);
				updateValues();
			}
			return config.interval;
		};

		this.clearData = function () {
			charts.length = 0;
			gauges.length = 0;
			counters.length = 0;
			meters.length = 0;
			histograms.length = 0;
			timers.length = 0;
		};

		this.getMetricsMeta = function () {
			return meta;
		};

		this.retry = function () {
			updateValues();
		};

		function updateMetrics(InstanceType, currentMetrics, newData, units) {
			var existing = _(currentMetrics).map('name');
			_(newData).each(function (value, name) {
				if (!_(existing).contains(name)) {
					var metric = new InstanceType(name, units[name], config.maxValues);
					currentMetrics.push(metric);
					_(metric.getCharts()).each(function (c) {
						charts.push(c);
						c.registry = self;
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
			$http.get(endpoint + '/json').success(function (data) {
				self.updateError = null;
				update(data);
				if (timer === null) {
					initialSetup();
				}
				if (config.interval > 0) {
					timer = $timeout(updateValues, config.interval);
				}
			}).error(function () {
				self.updateError = 'Error reading metric data from ' + endpoint + '/json. Update stopped.';
			});
		}

		updateValues();
	}

	$.extend(true, this, { metrics: { Registry: Registry } });

}).call(this, this.jQuery, this._, this.moment, this.metrics);