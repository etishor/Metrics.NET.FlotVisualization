(function ($, _, metrics) {
	'use strict';

	function Timer(name, unit) {
		var activeSessions = new metrics.ValueSeries(),
			meter = new metrics.Meter(name, unit.Rate),
			histogram = new metrics.Histogram(name, unit.Duration, true),
			lastUpdate = null;

		this.name = name;
		this.unit = unit;

		this.activeSessionsChart = new metrics.Chart({
		    name: name + 'Active Sessions',
		    unit: 'sessions',
		    options: { yaxis: { min: 0 } }
		});

		this.update = function (value, time) {
		    activeSessions.push(value.ActiveSessions);
			meter.update(value ? value.Rate : undefined);
			histogram.update( value ? value.Histogram : undefined);

			if (value !== undefined) {
				lastUpdate = time;
			}

			this.activeSessionsChart.updateValues(activeSessions);
		};

		this.getCharts = function () {
			return _(meter.getCharts()).union(histogram.getCharts()).union([this.activeSessionsChart]).value();
		};

		this.toggle = function (value) {
		    this.activeSessionsChart.toggle(value);
			meter.toggle(value);
			histogram.toggle(value);
		};

		this.isVisible = function () {
			return this.activeSessionsChart.visible || meter.isVisible() || histogram.isVisible();
		};
	}

	$.extend(true, this, { metrics: { Timer: Timer } });

}).call(this, this.jQuery, this._, this.metrics);