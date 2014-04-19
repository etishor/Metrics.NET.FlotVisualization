(function ($, moment, metrics) {
	'use strict';

	function Gauge(name, unit) {
		this.name = name;
		this.unit = unit === '%' ? 'Percent' : unit;
		this.options = {
			points: 100
		};

		var values = new metrics.ValueSeries(this.options.points);
		this.chart = new metrics.Chart(name);
		this.lastUpdate = null;
		
		this.update = function (value, time) {
			values.push(value);
			if (value !== undefined) {
				this.lastUpdate = time;
			}
			this.chart.updateValues(values);
		};
	}

	$.extend(true, this, { metrics: { Gauge: Gauge } });

}).call(this, this.jQuery, this.moment, this.metrics);