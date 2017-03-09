
(function (name, definition) {
    if (typeof define === 'function') {
        define(definition);
    } else {
        this[name] = definition();
    }
})('Swiper', function () {
    /**
     *
     * @param options
     * @constructor
     */
    function Swiper(options) {
        this.version = '1.0.0';
        this._default = {
            // 容器
            container: '.swiper',
            // 每页 className
            item: '.item',
            // next
            next: '.next',
            // active
            active: '.active',
            // prev
            prev: '.prev',
            // 滑动切换距离阀值
            threshold: 30,
            // 切换动画时间
            duration: 500,
            // 自动切换，默认为 false，自动切换必须 infinite:true
            autoSwitch: true,
            // 切换间隔
            loopTime: 3000,
            // 缓动函数，默认为 linear，可传入 cubic-bezier()
            easing: "linear",
            // 转向，默认为顺时针，可选逆时针 'counterclockwise'
            turn: 'clockwise'
        };

        this._options = extend(this._default, options);

        this.$container = document.querySelector(this._options.container);
        this.$items = this.$container.querySelectorAll(this._options.item);
        this.$activeElem = this.$container.querySelector(this._options.active);
        this.$nextElem = this.$container.querySelector(this._options.next);
        this.$prevElem = this.$container.querySelector(this._options.prev);

        this._start = {};
        this._end = {};
        this._count = 0;
        this._lock = false;
        this._marqueeInterval = null;
        this._isIntervene = false;
        this._defaultTurn = this._options.turn;

        this._bind();
        this._init();

        if(this._options.autoSwitch) {
            this._marquee();
        }
        
    }

    /**
     * Set css transform params
     */
    Swiper.prototype._setCssParams = function () {
        // 顺时针
        if (this._defaultTurn === 'clockwise') {
            // three different states
            this._activeTransformCss = {
                '-webkit-transform': 'scale(0.9) translateX(10px)',
                'transform': 'scale(0.9) translateX(10px)',
                '-webkit-transform-origin': 'right center',
                'transform-origin': 'right center',
                'opacity': '0.5',
                'z-index': '1'
            };
            this._nextTransformCss = {
                '-webkit-transform': 'scale(1) translateX(0px)',
                'transform': 'scale(1) translateX(0px)',
                '-webkit-transform-origin': 'center center',
                'transform-origin': 'center center',
                'opacity': '1',
                'z-index': '100'
            };
            this._prevTransformCss = {
                '-webkit-transform': 'scale(0.9) translateX(-10px)',
                'transform': 'scale(0.9) translateX(-10px)',
                '-webkit-transform-origin': 'left center',
                'transform-origin': 'left center',
                'opacity': '0.5',
                'z-index': '10'
            };
        } else {
            // three different states
            this._activeTransformCss = {
                '-webkit-transform': 'scale(0.9) translateX(-10px)',
                'transform': 'scale(0.9) translateX(-10px)',
                '-webkit-transform-origin': 'left center',
                'transform-origin': 'left center',
                'opacity': '0.5',
                'z-index': '10'
            };
            this._nextTransformCss = {
                '-webkit-transform': 'scale(0.9) translateX(10px)',
                'transform': 'scale(0.9) translateX(10px)',
                '-webkit-transform-origin': 'right center',
                'transform-origin': 'right center',
                'opacity': '0.5',
                'z-index': '1'
            };
            this._prevTransformCss = {
                '-webkit-transform': 'scale(1) translateX(0px)',
                'transform': 'scale(1) translateX(0px)',
                '-webkit-transform-origin': 'center center',
                'transform-origin': 'center center',
                'opacity': '1',
                'z-index': '100'
            };
        }
    }

    /**
     * initial
     * @private
     */
    Swiper.prototype._init = function () {
        var me = this;
        var duration = this._options.duration + 'ms ' + this._options.easing;

        for (var i = 0; i < 3; i++) {
            (function (j) {
                var elem = me.$items[j];
                elem.style['-webkit-transition'] = duration;
                elem.style.transition = duration;
            })(i)
        }
    };

    /**
     * set marquee loop
     * @private
     */
    Swiper.prototype._marquee = function () {
        var me = this;

        if (this._marqueeInterval) {
            clearInterval(this._marqueeInterval);
        }

        this._marqueeInterval = setInterval(function () {
            me._next();
        }, this._options.loopTime);
    };

    /**
     * swiper switch
     */
    Swiper.prototype._next = function () {
        var me = this;

        this._lock = true;

        this._setCssParams();

        for (var i = 0; i < 3; i++) {
            (function (j) {
                var elem = me.$items[j];
                var curState = elem.getAttribute('class').split(' ')[1];
                var curCssName = '_' + curState + 'TransformCss';

                for (var key in me[curCssName]) {
                    me['$' + curState + 'Elem'].style[key] = me[curCssName][key];
                }
            })(i);
        }
    };

    /**
     * swiper class change
     */
    Swiper.prototype._classChange = function (curState) {
        var me = this;

        if (me._defaultTurn === "clockwise") {
            switch (true) {
                case curState === 'active':
                    me.$activeElem.setAttribute('class', 'item prev');
                    break;
                case curState === 'next':
                    me.$nextElem.setAttribute('class', 'item active');
                    break;
                case curState === 'prev':
                    me.$prevElem.setAttribute('class', 'item next');
                    break;
            }
        } else {
            switch (true) {
                case curState === 'active':
                    me.$activeElem.setAttribute('class', 'item next');
                    break;
                case curState === 'next':
                    me.$nextElem.setAttribute('class', 'item prev');
                    break;
                case curState === 'prev':
                    me.$prevElem.setAttribute('class', 'item active');
                    break;
            }
        }
    };

    /**
     * swiper event bind
     */
    Swiper.prototype._bind = function () {
        var me = this;

        this.$container.addEventListener('touchstart', function (e) {
            e.stopPropagation();

            if (me._lock) {
                return;
            }

            me._start.x = e.changedTouches[0].pageX;

        }, false);

        this.$container.addEventListener('touchend', function (e) {
            e.stopPropagation();

            if (me._lock) {
                return;
            }

            me._end.x = e.changedTouches[0].pageX;

            var distance = me._end.x - me._start.x;

            if (Math.abs(distance) >= me._options.threshold) {
                // clear old interval
                if (me._marqueeInterval) {
                    clearInterval(me._marqueeInterval);
                }

                // change the intervene flag
                me._isIntervene = true;

                // counterclockwise Or clockwise
                if (distance < me._options.threshold) {
                    me._defaultTurn = "counterclockwise";
                }else {
                    me._defaultTurn = "clockwise";   
                }

                // new move
                me._next();
            }
        }, false);


        // add event listen to every li
        for (var i = 0; i < 3; i++) {
            (function (j) {
                var elem = me.$items[j];

                elem.addEventListener('webkitTransitionEnd', function (e) {
                    var propertyName = e.propertyName;

                    if (propertyName === "transform") {
                        var curState = elem.getAttribute('class').split(' ')[1];

                        me._classChange(curState);
                        me._count++;
                        me._domSelectorReset();
                    }
                }, false);
            })(i)
        }
    };

    /**
     * something reset
     */
    Swiper.prototype._domSelectorReset = function () {
        if (this._count == 3) {

            this.$activeElem = this.$container.querySelector(this._options.active);
            this.$nextElem = this.$container.querySelector(this._options.next);
            this.$prevElem = this.$container.querySelector(this._options.prev);

            this._count = 0;
            this._lock = false;
            this._defaultTurn = this._options.turn;

            // open the auto loop again
            if (this._isIntervene && this._options.autoSwitch) {
                this._marquee();
            }
        }
    }

    /**
     * simple `extend` method
     * @param target
     * @param source
     * @returns {*}
     */
    function extend(target, source) {
        for (var key in source) {
            target[key] = source[key];
        }

        return target;
    }

    /**
     * export
     */
    return Swiper;
});

