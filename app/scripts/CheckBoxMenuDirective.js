(function ($) {
	'use strict';
	
	function CheckBoxMenuDirective() {
		return {
			restrict: 'A',
			/* jshint unused:true */
			link: function (scope, element) {
				$(element).click(function (e) {
					e.stopPropagation();
				});
			}
		};
	}

	$.extend(true, this, { metrics: { CheckBoxMenuDirective: CheckBoxMenuDirective } });

}).call(this, this.jQuery);