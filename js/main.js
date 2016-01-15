(function() {
    'use strict';

    var menu, mask, menuBtn, body,
        fullScreenBtn,
        navigation,

        initRef = function() {
            menu = $$('#side-menu');
            mask = $$('#page-mask');
            menuBtn = $$('#button-1');
            body = $$('body');
            fullScreenBtn = $$('#fullscreen-btn');
            navigation = $$('#navigation');
        },

        initEvents = function() {
            menuBtn.tap(_onMenuBtnTap);
            body.swipeRight(_onBodySwipeRight);
            body.swipeLeft(_onBodySwipeLeft);
            mask.tap(_onMaskTap);
            fullScreenBtn.tap(function() {
                launchIntoFullscreen(document.documentElement);
            });
            navigation.tap(function() {
                history.pushState({
                    page: 1
                }, "title 1", "?page=1");
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

        _onHashChange = function() {
            console.log('#routing new');
        },

        changeUrl = function() {

        },

        // Find the right method, call on correct element
        launchIntoFullscreen = function(element) {
            var fn = element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen || element.msRequestFullscreen;
            return fn.call(element);
        };


    $$(document).ready(function() {
        initRef();
        initEvents();
        window.onpopstate = function(event) {
            //event.preventDefault();
            //alert("location: " + document.location);
        };
    });




    /**
     * Router
     * @param
     * @return
     */
    var Router = {
        routes: [],
        mode: null,
        root: location,

        config: function(options) {
            this.mode = options && options.mode && options.mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
            this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
            return this;
        },

        getFragment: function() {
            var fragment = '';
            if (this.mode === 'history') {
                fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
                fragment = fragment.replace(/\?(.*)$/, '');
                fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
            } else {
                var match = window.location.href.match(/#(.*)$/);
                fragment = match ? match[1] : '';
            }
            return this.clearSlashes(fragment);
        },

        clearSlashes: function(path) {
            return path.toString().replace(/\/$/, '').replace(/^\//, '');
        },

        add: function(re, handler) {
            if (typeof re == 'function') {
                handler = re;
                re = ''; 
            }
            this.routes.push({ re: re, handler: handler });
            return this;
        },

        remove: function(param) {
            for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
                if (r.handler === param || r.re.toString() === param.toString()) {
                    this.routes.splice(i, 1);
                    return this;
                }
            }
            return this;
        },

        flush: function() {
            this.routes = [];
            this.mode = null;
            this.root = '/';
            return this;
        },

        check: function(f) {
            var fragment = f || this.getFragment(),
            	ln = this.routes.length,
            	match, i = 0;

            for (; i < ln; i++) {
                match = fragment.match(this.routes[i].re);
                if (match) {
                    match.shift();
                    this.routes[i].handler.apply({}, match);
                    return this;
                }
            }
            return this;
        },

        listen: function() {
            var self = this;
            var current = self.getFragment();
            var fn = function() {
                if (current !== self.getFragment()) {
                    current = self.getFragment();
                    self.check(current);
                }
            };
            clearInterval(this.interval);
            this.interval = setInterval(fn, 50);
            return this;
        },
 
        navigate: function(path) {
            path = path ? path : '';
            if (this.mode === 'history') {
                history.pushState(null, null, this.root + this.clearSlashes(path));
            } else {
                window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
            }
            return this;
        }
    };

    // configuration
    Router.config({
        mode: 'history'
    });

    // returning the user to the initial state
    //Router.navigate();

    // adding routes
    Router
        .add(/about/, function() {
            console.log('about');
        })
        .add(/products\/(.*)\/edit\/(.*)/, function() {
            console.log('products', arguments);
        })
        .add(function() {
            console.log('default');
        })
        .check('/products/12/edit/22').listen();

    // forwarding
    setTimeout(function() {
    	Router.navigate('/about');
    }, 2000);

})();
