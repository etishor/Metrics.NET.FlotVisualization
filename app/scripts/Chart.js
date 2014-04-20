(function ($, _) {
	'use strict';

	function mapLabels(options) {
		if (!options.labels) {
			return [];
		}

		return _(options.labels).map(function (l) {
			if (_(l).isString()) {
				return { label: l, visible: true };
			} else {
				return l;
			}
		}).value();
	}

	function Chart(options) {
		var visible = false,
			maxValues = options.maxValues || 100,
			labels = mapLabels(options),
			isSingleSeries = labels.length <= 1,
			chartOptions = $.extend(true, {
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
			}, options.options);

		this.name = options.name;
		this.unit = options.unit;
		this.labels = labels;

		this.data = [];
		this.options = chartOptions;

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

		this.updateValues = function (values) {
			if (!_(values).isArray()) {
				this.data = [{
					data: values.getLast()
				}];
			} else {
				this.data = _(values).map(function (v, idx) {
					var label;
					if (idx < labels.length) {
						if (!labels[idx].visible) {
							return;
						}
						label = labels[idx].label;
					}

					return {
						label: label,
						data: v.getLast()
					};
				}).compact().value();
			}
		};
	}

	$.extend(true, this, { metrics: { Chart: Chart } });

}).call(this, this.jQuery, this._);