(function(){
    var box = ''
    // 用于脱离jq的依赖，在保障移动端兼容性的前提下，完成一些简单的jq功能
    var $ = function(query){
        var dom
        // 获取dom节点
        if (typeof query === 'string'){
            dom = document.querySelectorAll(query)
        } else if (query instanceof HTMLElement){
            dom = [query]
        }else{
            dom = query
        }
         
        // 字符串转化为dom
        function parseDom(arg) {
            var objE = document.createElement("div");
            objE.innerHTML = arg;
            return objE.childNodes;
        };

        // 遍历类数组对象
        function forEach(cb){
            var _dom = dom || []
            Array.prototype.forEach.call(_dom, function (item, index) {
                cb(item, index)
            })
        }
        
        // 动画函数
        function animate(obj, options, time, fn) {
            time = time || 500
            var ease = Math.sqrt
            var start = (new Date()).getTime()
            var initValus = {}
            var unit = '', units
            for(attr in options){
                initValus[attr] = getStyle(obj, attr)
            }
            proress()
            function proress(){
                var elapsed = (new Date()).getTime() - start
                var fraction = elapsed/time
                if( fraction < 1){
                    for(attr in options){
                        if( attr == 'opacity'){
                            unit = ''
                        }else{
                           units = options[attr].match(/[^\d+-.]+/)
                           unit = (units && units[0]) || 'px'
                        }
                        obj.style[attr] = parseFloat(initValus[attr]) + ( parseFloat(options[attr]) - parseFloat(initValus[attr]) ) * fraction + unit
                    }
                    setTimeout(proress, Math.min(1, time-elapsed))
                }else{
                    
                    for(attr in options){
                        obj.style[attr] = options[attr]
                        if(fn){
                            fn()
                        }
                    }
                }
            }
            function getStyle(obj, attr) {
                if (obj.currentStyle) {
                    return obj.currentStyle[attr];    //针对ie
                } else {
                    return document.defaultView.getComputedStyle(obj, null)[attr];
                }
            }
        }
        var actions = {
            html: function (htmlStr) {
                forEach(function (item, index) {
                    item.innerHTML = parseDom(htmlStr)[0]
                })
                return actions
            },
            append: function(htmlStr){
                forEach(function (item, index) {
                    item.appendChild(parseDom(htmlStr)[0])
                })
                return actions
            },
            on: function(event, callback){
                forEach(function (item, index) {
                    if (item.addEventListener){
                        item.addEventListener(event, callback)
                    } else if (item.attachEvent){
                        item.attachEvent('on' + event, callback)
                    }
                })
                var remove = function (){
                    forEach(function (item, index) {
                        if (item.addEventListener) {
                            item.removeEventListener(event, callback)
                        } else if (item.attachEvent) {
                            item.detachEvent('on' + event, callback)
                        }
                    })
                }
                return actions
            },
            addClass: function(className){
                forEach(function (item, index) {
                    var classList = item.classList
                    classList.add(className)
                })
                return actions
            },
            removeClass: function (className) {
                forEach(function (item, index) {
                    var classList = item.classList
                    classList.remove(className)
                })
                return actions
            },
            css: function(options){
                forEach(function (item, index) {
                    for (var attr in options) {
                        item.style[attr] = options[attr];
                    }
                })
                return actions
            },
            show: function (interval, sp, fn){
                forEach(function (item, index) {
                    item.style.display='block'
                })
                return actions
            },
            hide: function (interval, sp, fn) {
                forEach(function (item, index) {
                    item.style.display = 'none'
                })
                return actions
            }, 
            animate: function (options, time, fn ) {
                forEach(function (item, index) {
                    animate(item, options, time, fn)
                })
                return actions
            },
            find: function(subQuery){
                var nodes = []
                forEach(function(item, index){
                    var subDoms = item.querySelectorAll(subQuery)
                    Array.prototype.forEach.call(subDoms, function(_item){
                        nodes.push(_item)
                    })
                })
                return $(nodes)
            },
            eq: function(index){
                return $(dom[index])
            },
            siblings: function(){
                function getSiblingElems(elem) {
                    var nodes = [];
                    var _elem = elem;
                    while ((elem = elem.previousSibling)) {
                        if (elem.nodeType == 1) {
                            nodes.push(elem);
                        }
                    }
                    var elem = _elem;
                    while ((elem = elem.nextSibling)) {
                        if (elem.nodeType == 1) {
                            nodes.push(elem);
                        }
                    }
                    return nodes
                }
                var nodes = []
                forEach(function (item, index) {
                    getSiblingElems(item).forEach(function(_item, _index){
                        nodes.indexOf(_item) === -1 && nodes.push(_item)
                    })
                })
                return $(nodes)
            },
            prevAll: function() {
                function getSiblingElems(elem) {
                    var nodes = [];
                    var _elem = elem;
                    while ((elem = elem.previousSibling)) {
                        if (elem.nodeType == 1) {
                            nodes.push(elem);
                        }
                    }
                    return nodes
                }
                var nodes = []
                forEach(function (item, index) {
                    getSiblingElems(item).forEach(function (_item, _index) {
                        nodes.indexOf(_item) === -1 && nodes.push(_item)
                    })
                })
                return $(nodes)
            },
            nextAll: function () {
                function getSiblingElems(elem) {
                    var nodes = [];
                    while ((elem = elem.nextSibling)) {
                        if (elem.nodeType == 1) {
                            nodes.push(elem);
                        }
                    }
                    return nodes
                }
                var nodes = []
                forEach(function (item, index) {
                    getSiblingElems(item).forEach(function (_item, _index) {
                        nodes.indexOf(_item) === -1 && nodes.push(_item)
                    })
                })
                return $(nodes)
            },
            dom: dom
        }
        return actions
    }
    var styles = '<style type="text/css"></style>'
    $('head').append(styles)
    function payBoard() {
        var hash = (new Date).getTime()
        var box =   '<div class="pay-board-layer" id="pay-board-box-' + hash + '">' +
                        '<div class="pay-board-wrapper">' +
                            '<div class="pay-board-box">' +
                                '<div class="pay-board-head">' +
                                    '请输入密码' +
                                '<div class="pay-board-back-wrapper">' +
                                    '<img class="pay-board-back" src="data:image/png;base64,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" alt="">' +
                                '</div>' +
                            '</div>' +
                            '<div class="pay-board-content">' +
                                '<div class="pay-board-alieditContainer" id="pay-board-payPassword-container">' +
                                    '<div class="pay-board-sixDigitPassword" tabindex="0">' +
                                        '<i class="pay-board-active"><b></b></i>' +
                                        '<i><b></b></i>' +
                                        '<i><b></b></i>' +
                                        '<i><b></b></i>' +
                                        '<i><b></b></i>' +
                                        '<i><b></b></i>' +
                                        '<span class="pay-board-guangbiao" style="left:0px;"></span>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="pay-board-forget-wrapper">' +
                                    '<span class="pay-board-forget">忘记密码?</span>' +
                                '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="pay-board-form-edit pay-board-clearfix">' +
                                '<div class="pay-board-num">1</div>' +
                                '<div class="pay-board-num">2</div>' +
                                '<div class="pay-board-num">3</div>' +
                                '<div class="pay-board-num">4</div>' +
                                '<div class="pay-board-num">5</div>' +
                                '<div class="pay-board-num">6</div>' +
                                '<div class="pay-board-num">7</div>' +
                                '<div class="pay-board-num">8</div>' +
                                '<div class="pay-board-num">9</div>' +
                                '<div id="pay-board-blank"></div>' +
                                '<div class="pay-board-num">0</div>' +
                                '<div id="pay-board-remove">' +
                                    '<img src="data:image/png;base64,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" alt="">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
        $('body').append(box)
        this.id ='#pay-board-box-'+hash
        this.hash = hash
        this.inputVal = ''
        this._plugins = {}
        // 最简单的调用插件
        this.applyPlugins = function (name) {
            if (!this._plugins[name]) return;
            var args = Array.prototype.slice.call(arguments, 1);
            var plugins = this._plugins[name];
            for (var i = 0; i < plugins.length; i++)
                plugins[i].apply(this, args);
        };

        // 单参数调用插件
        this.applyPlugins1 = function applyPlugins1(name, param) {
            var plugins = this._plugins[name];
            if (!plugins) return;
            for (var i = 0; i < plugins.length; i++)
                plugins[i].call(this, param);
        };
        var _this = this
        // 数字键盘-数字
        $(this.id+' .pay-board-form-edit .pay-board-num').on('touchstart', function() {
            $(this).addClass('pay-board-touched')
            // 触发input插件
            if (_this.inputVal.length >= 6) {
                _this.applyPlugins('overInput')
                return
            }
            _this.inputVal += this.innerHTML;
            _this.applyPlugins1('input', this.innerHTML)
            _this.inputPassWord(_this.inputVal.length)
        })
        $('.pay-board-form-edit .pay-board-num').on('touchend', function () {
            $(this).removeClass('pay-board-touched')
        })
        // 数字键盘-删除
        $(this.id+' #pay-board-remove').on('touchstart', function () {
            $(this).addClass('pay-board-touched')
            if (_this.inputVal.length <= 0) {
                return
            }
            _this.inputVal = _this.inputVal.substring(0, _this.inputVal.length - 1);
            _this.applyPlugins1('delete',_this.inputVal)
            _this.inputPassWord(_this.inputVal.length)
        })
        $(this.id+' #pay-board-remove').on('touchend', function () {
            $(this).removeClass('pay-board-touched')
        })
        $(this.id + ' .pay-board-forget').on('touchstart', function () {
            _this.applyPlugins('forget')
        })
        $(this.id + ' .pay-board-back').on('touchstart',function(){
            _this.applyPlugins('back')
        })
    }
    payBoard.prototype.show = function(duration) {
        var duration = duration || 200
        $(this.id+'.pay-board-layer').show()
        $(this.id +' .pay-board-wrapper').animate({
            bottom: '0',
            opacity: 1
        }, duration);
    }
    payBoard.prototype.hide = function(duration) {
        var duration = duration || 200
        var _this = this
        $(this.id +' .pay-board-wrapper').animate({
            bottom: '-432px',
            opacity: 0
        }, duration, function () {
            $(_this.id).hide()
        });
    }
    payBoard.prototype.reset = function () {
        this.inputVal = ''
        $(this.id+" .pay-board-sixDigitPassword b").css({ "display": "none" });
        $(this.id+" .pay-board-guangbiao").css({ "left": '0' });
        $(this.id+" .pay-board-sixDigitPassword").find("i").eq(0).addClass("pay-board-active")
    }
    payBoard.prototype.on = function (type,cb) {
        if(this._plugins[type]){
            this._plugins[type].push(cb)
        }else{
            this._plugins[type]=[cb]
        }
    }
    payBoard.prototype.input = function(num){
        if(this.inputVal.length + num.length > 6){
            return 
        }
        this.inputVal = this.inputVal + '' + num
        _this.applyPlugins1('input', num)
        this.inputPassWord(this.inputVal.length)
    }
    payBoard.prototype.delete = function(num){
        num = num || 1 
        if (this.inputVal.length <= 0) {
            return
        } else if (this.inputVal.length - num <= 0){
            this.inputVal = ''
            this.inputPassWord(0)
            return
        }
        this.applyPlugins('del')
        this.inpVal = this.inputVal.substring(0, this.inputVal.length - num);
        this.applyPlugins1('delete', this.inputVal)
        this.inputPassWord(this.inpVal.length)

    }
    payBoard.prototype.inputPassWord = function(inp_l) {
        $(this.id+" p").html(inp_l);//测试

        $(this.id+" .pay-board-sixDigitPassword").find("i").eq(inp_l).addClass("pay-board-active").siblings("i").removeClass("pay-board-active");
        $(this.id+" .pay-board-sixDigitPassword").find("i").eq(inp_l).prevAll("i").find("b").css({ "display": "block" });
        $(this.id+" .pay-board-sixDigitPassword").find("i").eq(inp_l - 1).nextAll("i").find("b").css({ "display": "none" });

        if (inp_l == 0) {
            $(this.id+" .pay-board-sixDigitPassword").find("i").eq(0).addClass("pay-board-active").siblings("i").removeClass("pay-board-active");
            $(this.id+" .pay-board-sixDigitPassword").find("b").css({ "display": "none" });
            $(this.id+" .pay-board-guangbiao").css({ "left": 0 });
        } else if (inp_l < 6) {
            $(this.id+" .pay-board-guangbiao").css({ "left": inp_l * 16.666 + '%' });//光标位置
        } else if (inp_l == 6) {
            $(this.id+" .pay-board-sixDigitPassword").find("b").css({ "display": "block" });
            $(this.id+" .pay-board-sixDigitPassword").find("i").eq(5).removeClass("pay-board-active").siblings("i").removeClass("pay-board-active");
            $(this.id+" .pay-board-guangbiao").css({ "left": '100000px' });
            this.applyPlugins1('complete',this.inputVal)
        }
    }
    window.PayBoard=payBoard
})()