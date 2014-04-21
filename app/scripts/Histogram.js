(function ($, metrics) {
	'use strict';

	function Histogram(name, unit) {
		var options = { points: 100 },
			count = new metrics.ValueSeries(options.points),
			max = new metrics.ValueSeries(options.points),
			mean = new metrics.ValueSeries(options.points),
			min = new metrics.ValueSeries(options.points),
			stdDev = new metrics.ValueSeries(options.points),
			median = new metrics.ValueSeries(options.points),
			p75 = new metrics.ValueSeries(options.points),
			p95 = new metrics.ValueSeries(options.points),
			p98 = new metrics.ValueSeries(options.points),
			p99 = new metrics.ValueSeries(options.points),
			p999 = new metrics.ValueSeries(options.points),
			lastUpdate = null;

		this.name = name;
		this.unit = unit;

		this.countChart = new metrics.Chart(name, 'count', options.points);
		this.countChart.options.yaxis.min = 0;

		this.minMaxChart = new metrics.Chart({
			name: name + ' Min/Max',
			unit: unit,
			labels: [{ label: 'Max', visible: false }, 'Mean', 'Min', 'Std Dev']
		}, options.points);

		this.percentilesChart = new metrics.Chart({
			name: name + ' Percentiles',
			unit: unit,
			labels: ['75%', '95%', '98%', '99%', { label: '99.9%', visible: false }]
		}, options.points);
		this.percentilesChart.options.series.lines.fill = false;

		this.update = function (value, time) {
			count.push(value ? value.Count : undefined);
			max.push(value ? value.Max : undefined);
			mean.push(value ? value.Mean : undefined);
			min.push(value ? value.Min : undefined);
			stdDev.push(value ? value.StdDev : undefined);
			median.push(value ? value.Median : undefined);
			p75.push(value ? value.Percentile75 : undefined);
			p95.push(value ? value.Percentile95 : undefined);
			p98.push(value ? value.Percentile98 : undefined);
			p99.push(value ? value.Percentile99 : undefined);
			p999.push(value ? value.Percentile999 : undefined);

			if (value !== undefined) {
				lastUpdate = time;
			}

			this.countChart.updateValues(count);
			this.minMaxChart.updateValues([max, mean, min, stdDev]);
			this.percentilesChart.updateValues([p75, p95, p98, p99, p999]);
		};

		this.getCharts = function () {
			return [this.countChart, this.minMaxChart, this.percentilesChart];
		};

		this.toggle = function (value) {
			this.minMaxChart.toggle(value);
			this.percentilesChart.toggle(value);
		};

		this.isVisible = function () {
			return this.percentilesChart.isVisible() ||
				this.countChart.isVisible() ||
				this.minMaxChart.isVisible();
		};
	}

	$.extend(true, this, { metrics: { Histogram: Histogram } });

}).call(this, this.jQuery, this.metrics);