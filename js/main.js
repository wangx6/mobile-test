(function() {
    'use strict';

    var menu;
    var mask;
    var menuBtn;

    $$(document).ready(function() {
    	initRef();
	    menuBtn.tap(function() {
	    	toggleMaks(true);
            menu.style('transform', 'translateX(0)').addClass('menu--show');
        });
    });

    var toggleMaks = function( flag ) {
    	if(mask) {
    		mask.style('display', flag ? 'block' : 'none');
    	}
    };

    var initRef = function() {
    	menu = $$('#side-menu');
    	mask = $$('#page-mask');
    	menuBtn = $$('#button-1');
    	mask.tap(_onMaskTap);
    };

    var _onMaskTap = function() {
    	menu.style('transform', 'translateX(-100%)');
    	toggleMaks(false);
    };


})();
