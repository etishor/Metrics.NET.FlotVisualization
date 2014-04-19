(function ($, _) {
	'use strict';

	function Chart(name, unit, maxValues) {
		var self = this,
			isSingleSeries = true,
			visible = false;

		if (_(name).isString()) {
			this.name = name;
			this.unit = unit;
		} else {
			this.name = name.name;
			this.labels = name.labels;
			this.unit = name.unit;
			isSingleSeries = false;
			maxValues = unit;
		}

		this.options = {
			grid: { margin: { top: 8, bottom: 20, left: 20 } },
			canvas: true,
			legend: { show: !isSingleSeries, position: 'nw' },
			xaxis: { show: false, min: 0, max: maxValues },
			yaxis: { show: true, min: 0 },
			series: {
				lines: {
					show: true,
					lineWidth: isSingleSeries ? 2 : 2,
					fill: isSingleSeries
				},
				shadowSize: isSingleSeries ? 2 : 1,
				color: isSingleSeries ? 3 : undefined
			}
		};

		this.toggle = function (value) {
			if (value === undefined) {
				visible = !visible;
			} else {
				visible = value;
			}
		};

		this.isVisible = function () {
			return visible;
		};

		this.data = [];

		this.updateValues = function (values) {
			if (!_(values).isArray()) {
				this.data = [{
					data: values.getLast()
				}];
			} else {
				this.data = _(values).map(function (v, idx) {
					return {
						label: self.labels[idx],
						data: v.getLast()
					};
				}).value();
			}
		};
	}

	$.extend(true, this, { metrics: { Chart: Chart } });

}).call(this, this.jQuery, this._);