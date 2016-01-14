(function() {
	'use strict';
	console.log($$);
	$$(document).ready(function() {
		$$('#button-1').tap(function() {
			alert('###');
		});		
	});
})();