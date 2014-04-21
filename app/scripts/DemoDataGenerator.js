(function (angular, _) {
	'use strict';

	var count = 0,
		meter = 0,
		histo = 0,
		timerMeter = 0,
		timerHisto = 0;

	function getDemoData() {
		meter += meter > 20 ? -(Math.random() * 10) : (Math.random() * 10);
		histo += histo > 40 ? -(Math.random() * 10) : (Math.random() * 10);
		timerMeter += timerMeter > 30 ? -(Math.random() * 10) : (Math.random() * 10);
		timerHisto += timerHisto > 50 ? -(Math.random() * 10) : (Math.random() * 10);
				
		if (count > 20) {
			count = count - Math.random() * 20;
		} else {
			count++;
		}

		return {
			'Gauges': { 'Sample Gauge': Math.random() * 10 },
			'Counters': { 'Sample Counter': Math.random() * 100 },
			'Meters': {
				'Exceptions': {
					'Count': count,
					'MeanRate': meter,
					'OneMinuteRate': meter * 0.8,
					'FiveMinuteRate': meter * 0.6,
					'FifteenMinuteRate': meter * 0.5
				}
			},
			'Histograms': {
				'Search Results': {
					'Count': count,
					'Min': histo * 0.1,
					'Mean': histo * 0.5,
					'Max': histo,
					'StdDev': histo * 0.6,
					'Median': histo * 0.5,
					'Percentile75': histo * 0.75,
					'Percentile95': histo * 0.95,
					'Percentile98': histo * 0.95,
					'Percentile99': histo * 0.99,
					'Percentile999': histo * 0.999,
					'SampleSize': 10
				}
			},
			'Timers': {
				'Requests': {
					'Rate': {
						'Count': count,
						'MeanRate': timerMeter,
						'OneMinuteRate': timerMeter * 0.8,
						'FiveMinuteRate': timerMeter * 0.6,
						'FifteenMinuteRate': timerMeter * 0.5
					},
					'Histogram': {
						'Count': count,
						'Min': timerHisto * 0.1,
						'Mean': timerHisto * 0.5,
						'Max': timerHisto,
						'StdDev': timerHisto * 0.6,
						'Median': timerHisto * 0.5,
						'Percentile75': timerHisto * 0.75,
						'Percentile95': timerHisto * 0.95,
						'Percentile98': timerHisto * 0.95,
						'Percentile99': timerHisto * 0.99,
						'Percentile999': timerHisto * 0.999,
						'SampleSize': 10
					}
				}
			},
			Units: {
				Gauges: { 'Sample Gauge': 'Mb' },
				Counters: { 'Sample Counter': 'Items' },
				Meters: { 'Exceptions': 'Exceptions/s' },
				Histograms: { 'Search Results': 'Items' },
				Timers: { 'Requests': { 'Rate': 'Requests/s', 'Duration': 'ms' } }
			}
		};
	}

	function getHealthDemoData() {
		return {};
	}

	angular.module('MainModule')
		.config(['$provide', function ($provide) {
			$provide.decorator('$http', ['$delegate', function ($delegate) {
				var original = $delegate.get;

				$delegate.get = function (url) {
					var result = {};
					if (_(url).isString() && url.indexOf('/json') > 0) {
						result.success = function (fn) {
							fn(getDemoData());
							return result;
						};
						result.error = function () {
							return result;
						};
						return result;
					}

					if (_(url).isString() && url.indexOf('/health') > 0) {
						result.success = function (fn) {
							fn(getHealthDemoData());
							return result;
						};
						result.error = function () {
							return result;
						};
						return result;
					}
					return original(url);
				};

				return $delegate;
			}]);
		}]);

}).call(this, this.angular, this._);