(function ($, moment, metrics) {
	'use strict';

	function SimpleMetric(name, unit) {
		var options = { points: 100 },
			values = new metrics.ValueSeries(options.points),
			lastUpdate = null;

		this.name = name;
		this.unit = unit === '%' ? 'Percent' : unit;
		this.chart = new metrics.Chart(name, this.unit, options.points);

		this.update = function (value, time) {
			values.push(value);
			if (value !== undefined) {
				lastUpdate = time;
			}
			this.chart.updateValues(values);
		};

		this.getCharts = function () {
			return [this.chart];
		};

		this.toggle = function (value) {
			this.chart.toggle(value);
		};
	}

	$.extend(true, this, { metrics: { SimpleMetric: SimpleMetric } });

}).call(this, this.jQuery, this.moment, this.metrics);