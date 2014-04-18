(function ($, _) {
	'use strict';

	function Registry() {
		var gauges = [];

		this.lastUpdate = null;

		this.update = function (data) {
			this.lastUpdate = data.lastUpdate;
			var existing = _(gauges).map('name');
			_(data.Gauges).each(function (value, name) {
				if (!_(existing).contains(name)) {
					gauges.push(new Gauge(name, data.Units.Gauges[name]));
				}
			});
			_(gauges).each(function (g) {
				g.update(data.Gauges[g.name], data.lastUpdate);
			});
		};

		this.getMetrics = function () {
			return gauges;
		};
	}


	function ValueSeries(maxValues) {
		var values = [];

		this.push = function (value) {
			if (values.length >= maxValues) {
				values = values.slice(1);
			}
			values.push(value);
		};

		this.count = function () {
			return values.length;
		};

		this.numberOfValues = function () {
			return maxValues;
		};

		this.getLast = function (count) {
			var data = [],
				index = 0,
				start = count ? values.length - count : 0;

			if (start < 0) {
				start = 0;
			}

			for (var i = start; i < values.length; ++i) {
				data.push([index++, values[i]]);
			}
			return data;
		};
	}

	function Chart(name) {
		this.name = name;
		this.options = {
			legend: { margin: [-130, 0] },
			xaxis: { show: false, min: 0, max: 2 },
			series: {
				lines: {
					name: name,
					show: true,
					lineWidth: 1
				},
				shadowSize: 2,
				color: 8
			}
		};

		this.data = [];

		this.updateValues = function (values) {
			this.options.xaxis.max = values.numberOfValues();
			this.data = [{ data: values.getLast() }];
		};
	}

	function Gauge(name, unit) {
		console.log(unit);
		this.name = name;
		this.unit = unit;
		this.options = {
			width: 500,
			height: 200,
			points: 100
		};

		var values = new ValueSeries(this.options.points);

		this.chart = new Chart(name, 5);
		this.lastUpdate = null;
		
		this.update = function (value, time) {
			values.push(value);
			if (value !== undefined) {
				this.lastUpdate = time;
			}
			this.chart.updateValues(values);
			this.chart.options.xaxis.max++;
		};
	}

	$.extend(true, this, { metrics: { Gauge: Gauge, Registry : Registry } });

}).call(this, this.jQuery, this._);