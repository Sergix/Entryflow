(function($, win)
{
    var _scrollTargets = {},
        _EssayScroll = function() {};
    _EssayScroll.prototype = {
        _target: null,
        _targetHeight: 0,
        _targetScrollHeight: 0,
        _targetScrollTop: 0,
        _scrollTopPercent: 0,
        _scrollBar: null,
        _scrollBarHeight: 0,
        _scrollBarTopDiff: 0,
        _scrollBarStep: 0,
        _oldValueLength: 0,
        init: function(options) {
            var target = options.target,
                DIV = $('<div />'),
                scrollBarCss = options.scrollBarCss,
                scrollSpeed  = options.scrollSpeed || 30,
                around = DIV.clone().css('position', 'relative'),
                targetWidth = target.width(),
                shell,
                offset = 4;
            scrollBarCss.position = 'absolute';
            scrollBarCss.top   = scrollBarCss.top   || 0;
            scrollBarCss.right = scrollBarCss.right || 0;
            if(!$.support.opacity) {
                try {
                    var color = 0xFFFFFF,
                        R = (color & 0xFF0000) >> 16,
                        G = (color & 0x00FF00) >> 8,
                        B = (color & 0x0000FF),
                        alpha = 1 - scrollBarCss.opacity;
                    R = Math.floor(R * alpha + (0xFF - R) * alpha);
                    G = Math.floor(G * alpha + (0xFF - G) * alpha);
                    B = Math.floor(B * alpha + (0xFF - B) * alpha);
                    color = (R << 16) + (G << 8) + B;
                    scrollBarCss['background-color'] = '#' + color.toString(16);
                } catch(e) {
                    scrollBarCss['background-color'] = '#BFBFBF';
                }
            }

            target
                .scroll( $.proxy(this._onScrollAndChangeHeight, this))
                .keydown($.proxy(this._onKeyUp, this))
                .keyup(  $.proxy(this._onKeyUp, this))
                .css({
                    overflow: 'hidden',
                    width: (targetWidth - 6 - offset) + 'px'
                })
                .bind('mousewheel', function(e)
                {
                    e.stopPropagation();
                    e.preventDefault();
                    e = e.originalEvent;
                    var wheelDelta = 0;
                    if (e.wheelDelta){  wheelDelta = e.wheelDelta / 120; }
                    else if (e.detail){ wheelDelta = -e.detail / 3; }
                    if (wheelDelta){ this.scrollTop += -wheelDelta * scrollSpeed; } // 30 - normal scroll speed
                });
            this._oldValueLength = target.val().length;
            this._scrollBar = DIV.clone()
                .mousedown($.proxy(this._onStartDrag, this))
                .css(scrollBarCss);
            target.after(around);
            around.append(target);
            around.append(this._scrollBar);
            this._target = target;
        },
        onOpen: function() {
            var target = this._target,
                offset = (function(target) {
                    var style = {
                            margin: '',
                            padding: ''
                        },
                        arrow = ['Left', 'Bottom', 'Right', 'Top'],
                        targetCurrentStyle = target.currentStyle || window.getComputedStyle(target, null),
                        key, i;
                    for(key in style) {
                        for(i = 4; i--; ) {
                            style[key] += targetCurrentStyle[key + arrow[i]] + ' ';
                        }
                    }
                    return style;
                }(target[0]));
            target.css({
                margin: 0,
                padding: 0
            });
            target.parent().css(offset);

            this._changeScrollBarHeight();
            this.onOpen = $.proxy(function() {
                this._onScrollAndChangeHeight();
            }, this);
        },
        _changeScrollBarHeight: function() {
            var target = this._target,
                scrollBar = this._scrollBar,
                targetHeight = target.height(),
                scrollHeight = target[0].scrollHeight,
                newScrollHeight = Math.pow(targetHeight, 2) / (scrollHeight);
            if(newScrollHeight >= targetHeight) {
                scrollBar.hide();
            } else {
                scrollBar.show();
                scrollBar.height(newScrollHeight);
            }
            this._targetHeight = targetHeight;
            this._targetScrollHeight = scrollHeight;

            this._scrollBarHeight = newScrollHeight;
            this._scrollBarTopDiff = (targetHeight - newScrollHeight) / (scrollHeight - targetHeight);
            this._scrollBarStep = 1 / (targetHeight - newScrollHeight);
        },
        _onScrollAndChangeHeight: function() {
            this._changeScrollBarHeight();
            this._onScroll();
        },
        _onScroll: function() {
            var targetScrollTop = this._target.scrollTop();
            this._scrollBar.css('top', targetScrollTop * this._scrollBarTopDiff);
            this._targetScrollTop = targetScrollTop;
            this._scrollTopPercent = targetScrollTop / (this._targetScrollHeight - this._targetHeight);
        },
        _onKeyUp: function() {
            var newValueLength = this._target.val().length;
            if(this._oldValueLength !== newValueLength) {
                this._onScrollAndChangeHeight();
                this._oldValueLength = newValueLength;
            }
        },
        _onStartDrag: function(e) {
            this._startY = e.pageY;
            this._doc = $(document);
            this._doc
                .mousemove($.proxy(this._onDrag, this))
                .mouseup($.proxy(this._onEndDrag, this));
            e.stopPropagation();
            e.preventDefault();
        },
        _onDrag: function(e) {
            e.stopPropagation();
            e.preventDefault();
            var targetHeight = this._targetHeight,
                targetScrollHeight = this._targetScrollHeight,
                pageY = e.pageY,
                direction = this._startY - pageY, // -1 - down, 1 - up
                newScrollTop = (targetScrollHeight - targetHeight) * (this._scrollTopPercent - direction * this._scrollBarStep),
                newScrollTopPercent = newScrollTop / (targetScrollHeight - targetHeight);
            this._target.scrollTop(newScrollTop);

            if(newScrollTopPercent < 0) { this._scrollTopPercent = 0; }
            else if(newScrollTopPercent > 1) { this._scrollTopPercent = 1; }
            else { this._scrollTopPercent = newScrollTopPercent; }

            this._targetScrollTop = newScrollTop;
            this._startY = pageY;
        },
        _onEndDrag: function(e) {
            e.stopPropagation();
            e.preventDefault();
            this._doc.unbind('mousemove mouseup');
            delete this._startY;
            delete this._doc;
        }
    };

    win.EssayScroll = {
        set: function(options) {
            var target,
                essay,
                scrollTarget;
            if(typeof options !== 'object') {
                throw new Error('Wrong options.');
            } else if(typeof options.target !== 'string') {
                throw new Error('Don\'t set target.')
            } else if(typeof options.scrollBarCss !== 'object') {
                throw new Error('Bad scroll bar css settings.')
            } else {
                target = options.target;
            }

            if(typeof _scrollTargets[target] === 'undefined') {
                scrollTarget = $(target);
                if(scrollTarget.length) {
                    essay = new _EssayScroll;
                    options.target = scrollTarget;
                    essay.init(options);
                    _scrollTargets[target] = essay;
                } else {
                    throw new Error('Target with that ID don\'t exist.');
                }
            } else {
                throw new Error('Scroll with that ID already set.');
            }
        },
        get: function(name) {
            return _scrollTargets[name] || null;
        },
        clear: function() {
            _scrollTargets = {};
        }
    };
}(jQuery, window));