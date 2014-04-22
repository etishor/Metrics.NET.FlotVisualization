(function ($, metrics) {
	'use strict';

	function SimpleMetric(name, unit, maxValues) {
		var values = new metrics.ValueSeries(maxValues);

		this.name = name;
		this.unit = unit;

		this.chart = new metrics.Chart({
			name: name,
			unit: unit
		});

		this.update = function (value) {
			values.push(value);
			this.chart.updateValues(values);
		};

		this.getCharts = function () {
			return [this.chart];
		};

		this.toggle = function (value) {
			this.chart.toggle(value);
		};

		this.isVisible = function () {
		    return this.chart.visible;
		};
	}

	$.extend(true, this, { metrics: { SimpleMetric: SimpleMetric } });

}).call(this, this.jQuery, this.metrics);