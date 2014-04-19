(function ($, _, metrics) {
	'use strict';

	function Timer(name, unit) {
		var meter = new metrics.Meter(name, unit.Rate),
			histogram = new metrics.Histogram(name, unit.Duration, true),
			lastUpdate = null;

		this.name = name;
		this.unit = unit;

		this.update = function (value, time) {
			meter.update(value.Rate);
			histogram.update(value.Histogram);

			if (value !== undefined) {
				lastUpdate = time;
			}
		};

		this.getCharts = function () {
			return _(meter.getCharts()).union(histogram.getCharts()).value();
		};
	}

	$.extend(true, this, { metrics: { Timer: Timer } });

}).call(this, this.jQuery, this._, this.metrics);