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
    };
    
    $$(document).ready(function() {
        initRef();
        initEvents();
    });

})();
