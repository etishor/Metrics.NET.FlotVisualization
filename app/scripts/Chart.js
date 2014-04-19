(function ($) {
	'use strict';

	function Chart(name) {
		this.name = name;
		this.options = {
			grid: {
				margin: {
					top: 8,
					bottom: 20,
					left: 20
				}
			},
			canvas: true,
			legend: {
				show: false,
				position: 'nw'
			},
			xaxis: {
				show: false,
				min: 0,
				max: 2
			},
			yaxis: {
				show: true
			},
			series: {
				lines: {
					show: true,
					lineWidth: 2,
					fill: true
				},
				shadowSize: 2,
				color: 8
			}
		};

		this.data = [];

		this.updateValues = function (values) {
			this.options.xaxis.max = values.numberOfValues();
			this.data = [{
				data: values.getLast()
			}];
		};
	}

	$.extend(true, this, { metrics: { Chart: Chart } });

}).call(this, this.jQuery);