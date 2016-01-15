(function() {
    'use strict';

    var menu, mask, menuBtn, body,
    	fullScreenBtn,

        initRef = function() {
            menu = $$('#side-menu');
            mask = $$('#page-mask');
            menuBtn = $$('#button-1');
            body = $$('body');
            fullScreenBtn = $$('#fullscreen-btn');
        },

        initEvents = function() {
            menuBtn.tap(_onMenuBtnTap);
            body.swipeRight(_onBodySwipeRight);
            body.swipeLeft(_onBodySwipeLeft);
            mask.tap(_onMaskTap);
            fullScreenBtn.tap(function(){
            	launchIntoFullscreen(document.documentElement);
            });
        },

        toggleMenu = function(flag) {
            menu.style('transform', 'translateX(' + (flag ? '0' : '-100%') + ')');
        },

        toggleMask = function(flag) {
            mask.style('visibility', flag ? 'visible' : 'hidden');
            mask.style('opacity', flag ? '1' : '0');
        },

        _onBodySwipeLeft = function() {
            toggleMenu(false);
            toggleMask(false);
        },

        _onBodySwipeRight = function() {
            toggleMask(true);
            toggleMenu(true);
        },

        _onMenuBtnTap = function() {
            toggleMask(true);
            toggleMenu(true);
        },

        _onMaskTap = function() {
            toggleMenu(false);
            toggleMask(false);
        },

        // Find the right method, call on correct element
        launchIntoFullscreen = function(element) {
        	var fn = element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen || element.msRequestFullscreen;
        	return fn.call(element);
        };


    $$(document).ready(function() {
        // Launch fullscreen for browsers that support it!
        // the whole page
        initRef();
        initEvents();
    });

})();
