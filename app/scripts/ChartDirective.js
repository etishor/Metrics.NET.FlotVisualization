(function ($) {
	'use strict';

	function ChartDirective() {
		return {
			restrict: 'E',
			templateUrl: '../templates/Chart.tmpl.html',
			scope: {
				chart: '='
			},
			link: function (scope, element) {
				var plotArea = $('.chart', element),
					plot = null;

				function init() {
					plot = $.plot(plotArea, scope.chart.data, scope.chart.options);
					var ylabel = $('<div class="axisLabel yaxisLabel"></div>')
						.text(scope.chart.unit)
						.appendTo(plotArea);
					ylabel.css('margin-top', ylabel.width() / 2 - 20);

					$('<div class="axisLabel xaxisLabel"></div>')
						.text(scope.chart.name + ' (' + scope.chart.unit + ')')
						.appendTo(plotArea);
				}

				scope.$watch('chart.data', function (data) {
					if (plot) {
						plot.setData(data);
						plot.setupGrid();
						plot.draw();
					} else {
						init();
					}					
				});
				
				scope.$watch('chart.options', init);
			}
		};
	}

	$.extend(true, this, { metrics: { ChartDirective: ChartDirective } });

}).call(this, this.jQuery);