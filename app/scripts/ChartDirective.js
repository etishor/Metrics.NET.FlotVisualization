(function ($) {
	'use strict';

	function ChartDirective() {
		return {
			restrict: 'E',
			templateUrl: '../templates/Chart.tmpl.html',
			scope: {
				metric: '='
			},
			link: function (scope, element) {
				var plotArea = $('.chart', element),
					plot = null;

				function init() {
					plot = $.plot(plotArea, scope.metric.chart.data, scope.metric.chart.options);
					var ylabel = $('<div class="axisLabel yaxisLabel"></div>')
						.text(scope.metric.unit)
						.appendTo(plotArea);
					ylabel.css('margin-top', ylabel.width() / 2 - 20);
					var xlabel = $('<div class="axisLabel xaxisLabel"></div>')
						.text(scope.metric.name + ' (' + scope.metric.unit + ')')
						.appendTo(plotArea);
				}

				scope.$watch('metric.chart.data', function (data) {
					if (plot) {
						plot.setData(data);
						plot.setupGrid();
						plot.draw();
					} else {
						init();
					}					
				});
				
				scope.$watch('metric.chart.options', init);
			}
		};
	}

	$.extend(true, this, { metrics: { ChartDirective: ChartDirective } });

}).call(this, this.jQuery);