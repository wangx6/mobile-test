(function() {
    'use strict';

    var menu, mask, menuBtn, body,

        initRef = function() {
            menu = $$('#side-menu');
            mask = $$('#page-mask');
            menuBtn = $$('#button-1');
            body = $$('body');
        },

        initEvents = function() {
            menuBtn.tap(_onMenuBtnTap);
            body.swipeRight(_onBodySwipeRight);
            body.swipeLeft(_onBodySwipeLeft);
            mask.tap(_onMaskTap);
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
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        };


    $$(document).ready(function() {
    	// Launch fullscreen for browsers that support it!
    	launchIntoFullscreen(document.documentElement); // the whole page
        initRef();
        initEvents();
    });

})();
