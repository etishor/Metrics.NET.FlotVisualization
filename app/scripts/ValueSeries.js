(function ($) {
	'use strict';

	function ValueSeries(maxValues) {
		var values = [],
			max = maxValues || 100;

		this.push = function (value) {
			if (values.length > max) {
				values = values.slice(1);
			}
			values.push(value);
		};

		this.count = function () {
			return values.length;
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

	$.extend(true, this, { metrics: { ValueSeries: ValueSeries } });

}).call(this, this.jQuery);