(function ($, moment, metrics) {
	'use strict';

	function Histogram(name, unit, noCount) {
		var options = { points: 100 },
			hasCounter = !noCount,
			count = !hasCounter ? null : new metrics.ValueSeries(options.points),
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

		if (hasCounter) {
			this.countChart = new metrics.Chart(name, 'count', options.points);
			this.countChart.options.yaxis.min = 0;
		}

		this.minMaxChart = new metrics.Chart({
			name: name + 'Min/Max',
			unit: unit,
			labels: ['max', 'mean', 'min', 'Std Dev']
		}, options.points);

		this.percentilesChart = new metrics.Chart({
			name: name + 'Percentiles',
			unit: unit,
			labels: ['75%', '95%', '98%', '99%', '99.9%']
		}, options.points);
		this.percentilesChart.options.series.lines.fill = false;


		this.update = function (value, time) {
			if (hasCounter) {
				count.push(value.Count);
			}

			max.push(value.Max);
			mean.push(value.Mean);
			min.push(value.Min);
			stdDev.push(value.StdDev);
			median.push(value.Median);
			p75.push(value.Percentile75);
			p95.push(value.Percentile95);
			p98.push(value.Percentile98);
			p99.push(value.Percentile99);
			p999.push(value.Percentile999);

			if (value !== undefined) {
				lastUpdate = time;
			}

			if (hasCounter) {
				this.countChart.updateValues(count);
			}
			this.minMaxChart.updateValues([max, mean, min, stdDev]);
			this.percentilesChart.updateValues([p75, p95, p98, p99, p999]);
		};

		this.getCharts = function () {
			var charts = [];
			if (hasCounter) {
				charts.push(this.countChart);
			}
			charts.push(this.minMaxChart);
			charts.push(this.percentilesChart);
			return charts;
		};
	}

	$.extend(true, this, { metrics: { Histogram: Histogram } });

}).call(this, this.jQuery, this.moment, this.metrics);