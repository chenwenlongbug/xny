/* WebUploader 0.1.0 */
!function (a) {
    var b = function (a, b) {
        var c = {}, d = function (a, b) {
            var c, d, e;
            if ("string" == typeof a) return g(a);
            for (c = [], d = a.length, e = 0; d > e; e++) c.push(g(a[e]));
            return b.apply(null, c)
        }, e = function (a, b, c) {
            if (2 === arguments.length && (c = b, b = null), "string" != typeof a || !c) throw new Error("Define Error");
            d(b || [], function () {
                f(a, c, arguments)
            })
        }, f = function (a, e, f) {
            var g, h = {exports: e};
            "function" == typeof e && (f.length || (f = [d, h.exports, h]), g = e.apply(null, f), g !== b && (h.exports = g)), c[a] = h.exports
        }, g = function (b) {
            var d = c[b] || a[b];
            if (!d) throw new Error("`" + b + "` is undefined");
            return d
        };
        return {define: e, require: d, modules: c}
    }(a), c = (b.require, b.define);
    c("base", ["jQuery"], function (b) {
        function c(a) {
            return function () {
                return g.apply(a, arguments)
            }
        }

        function d(a, b) {
            return a.bind ? a.bind(b) : function () {
                return a.apply(b, arguments)
            }
        }

        function e(a) {
            var b;
            return Object.create ? Object.create(a) : (b = function () {
            }, b.prototype = a, new b)
        }

        var f = function () {
        }, g = Function.call;
        return {
            version: "0.1.0", $: b, Deferred: b.Deferred, isPromise: function (a) {
                return a && "function" == typeof a.then
            }, when: b.when, browser: function (a) {
                var b = {}, c = a.match(/WebKit\/([\d.]+)/), d = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/), e = a.match(/MSIE\s([\d.]+)/), f = a.match(/Firefox\/([\d.]+)/), g = a.match(/Safari\/([\d.]+)/),
                    h = a.match(/OPR\/([\d.]+)/);
                return c && (b.webkit = parseFloat(c[1])), d && (b.chrome = parseFloat(d[1])), e && (b.ie = parseFloat(e[1])), f && (b.firefox = parseFloat(f[1])), g && (b.safari = parseFloat(g[1])), h && (b.opera = parseFloat(h[1])), b
            }(navigator.userAgent), inherits: function (a, c, d) {
                var f;
                return "function" == typeof c ? (f = c, c = null) : f = c && c.hasOwnProperty("constructor") ? c.constructor : function () {
                    return a.apply(this, arguments)
                }, b.extend(!0, f, a, d || {}), f.__super__ = a.prototype, f.prototype = e(a.prototype), c && b.extend(!0, f.prototype, c), f
            }, noop: f, bindFn: d, log: function () {
                return a.console.log ? d(console.log, console) : f
            }(), nextTick: function () {
                return function (a) {
                    setTimeout(a, 1)
                }
            }(), slice: c([].slice), guid: function () {
                var a = 0;
                return function (b) {
                    for (var c = (+new Date).toString(32), d = 0; 5 > d; d++) c += Math.floor(65535 * Math.random()).toString(32);
                    return (b || "wu_") + c + (a++).toString(32)
                }
            }(), formatSize: function (a, b, c) {
                var d;
                for (c = c || ["B", "K", "M", "G", "TB"]; (d = c.shift()) && a > 1024;) a /= 1024;
                return ("B" === d ? a : a.toFixed(b || 2)) + d
            }
        }
    }), c("mediator", ["base"], function (a) {
        function b(a, b, c, d) {
            return f.grep(a, function (a) {
                return !(!a || b && a.e !== b || c && a.cb !== c && a.cb._cb !== c || d && a.ctx !== d)
            })
        }

        function c(a, b, c) {
            (a || "").split(h).forEach(function (a) {
                c(a, b)
            })
        }

        function d(a, b) {
            for (var c, d = !1, e = -1, f = a.length; ++e < f;) if (c = a[e], c.cb.apply(c.ctx2, b) === !1) {
                d = !0;
                break
            }
            return !d
        }

        var e, f = a.$, g = [].slice, h = /\s+/;
        return e = {
            on: function (a, b, d) {
                var e, f = this;
                return b ? (e = this._events || (this._events = []), c(a, b, function (a, b) {
                    var c = {e: a};
                    c.cb = b, c.ctx = d, c.ctx2 = d || f, c.id = e.length, e.push(c)
                }), this) : this
            }, once: function (a, b, d) {
                var e = this;
                return b ? (c(a, b, function (a, b) {
                    var c = function () {
                        return e.off(a, c), b.apply(d || e, arguments)
                    };
                    c._cb = b, e.on(a, c, d)
                }), e) : e
            }, off: function (a, d, e) {
                var g = this._events;
                return g ? a || d || e ? (c(a, d, function (a, c) {
                    f.each(b(g, a, c, e), function () {
                        delete g[this.id]
                    })
                }), this) : (this._events = [], this) : this
            }, trigger: function (a) {
                var c, e, f;
                return this._events && a ? (c = g.call(arguments, 1), e = b(this._events, a), f = b(this._events, "all"), d(e, c) && d(f, arguments)) : this
            }
        }, f.extend({
            installTo: function (a) {
                return f.extend(a, e)
            }
        }, e)
    }), c("uploader", ["base", "mediator"], function (a, b) {
        function c(a) {
            this.options = d.extend(!0, {}, c.options, a), this._init(this.options)
        }

        var d = a.$;
        return c.options = {}, b.installTo(c.prototype), d.each({
            upload: "start-upload",
            stop: "stop-upload",
            getFile: "get-file",
            getFiles: "get-files",
            removeFile: "remove-file",
            skipFile: "skip-file",
            retry: "retry",
            isInProgress: "is-in-progress",
            makeThumb: "make-thumb",
            getDimension: "get-dimension",
            addButton: "add-btn",
            getRuntimeType: "get-runtime-type",
            refresh: "refresh",
            disable: "disable",
            enable: "enable"
        }, function (a, b) {
            c.prototype[a] = function () {
                return this.request(b, arguments)
            }
        }), d.extend(c.prototype, {
            state: "pending", _init: function (a) {
                var b = this;
                b.request("init", a, function () {
                    b.state = "ready", b.trigger("ready")
                })
            }, option: function (a, b) {
                var c = this.options;
                return arguments.length > 1 ? (d.isPlainObject(b) && d.isPlainObject(c[a]) ? d.extend(c[a], b) : c[a] = b, void 0) : a ? c[a] : c
            }, getStats: function () {
                var a = this.request("get-stats");
                return {successNum: a.numOfSuccess, cancelNum: a.numOfCancel, invalidNum: a.numOfInvalid, uploadFailNum: a.numOfUploadFailed, queueNum: a.numOfQueue}
            }, trigger: function (a) {
                var c = [].slice.call(arguments, 1), e = this.options, f = "on" + a.substring(0, 1).toUpperCase() + a.substring(1);
                return b.trigger.apply(this, arguments) === !1 ? !1 : d.isFunction(e[f]) && e[f].apply(this, c) === !1 ? !1 : d.isFunction(this[f]) && this[f].apply(this, c) === !1 ? !1 : !0
            }, request: a.noop, reset: function () {
            }
        }), a.create = function (a) {
            return new c(a)
        }, a.Uploader = c, c
    }), c("runtime/runtime", ["base", "mediator"], function (a, b) {
        function c(b) {
            this.options = d.extend({container: document.body}, b), this.uid = a.guid("rt_")
        }

        var d = a.$, e = {}, f = function (a) {
            for (var b in a) if (a.hasOwnProperty(b)) return b;
            return null
        };
        return d.extend(c.prototype, {
            getContainer: function () {
                var a, b, c = this.options;
                return this._container ? this._container : (a = c.container || d(document.body), b = d(document.createElement("div")), b.attr("id", "rt_" + this.uid), b.css({
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden"
                }), a.append(b), a.addClass("webuploader-container"), this._container = b, b)
            }, init: a.noop, exec: a.noop, destroy: function () {
                this._container && this._container.parentNode.removeChild(this.__container), this.off()
            }
        }), c.orders = "html5,flash", c.addRuntime = function (a, b) {
            e[a] = b
        }, c.hasRuntime = function (a) {
            return !!(a ? e[a] : f(e))
        }, c.create = function (a, b) {
            var g, h;
            if (b = b || c.orders, d.each(b.split(/\s*,\s*/g), function () {
                    return e[this] ? (g = this, !1) : void 0
                }), g = g || f(e), !g) throw new Error("Runtime Error");
            return h = new e[g](a)
        }, b.installTo(c.prototype), c
    }), c("runtime/client", ["base", "mediator", "runtime/runtime"], function (a, b, c) {
        function d(b, d) {
            var f, g = a.Deferred();
            this.uid = a.guid("client_"), this.runtimeReady = function (a) {
                return g.done(a)
            }, this.connectRuntime = function (a, b) {
                return f ? void 0 : (g.done(b), "string" == typeof a && e.get(a) ? f = e.get(a) : !d && e.has() && (f = e.get()), f ? (f.promise.then(g.resolve), f.client++, f) : (f = c.create(a, a.runtimeOrder), e.add(f), f.promise = g.promise(), f.once("ready", g.resolve), f.init(), f.client = 1, f))
            }, this.getRuntime = function () {
                return f
            }, this.disconnectRuntime = function () {
                f && (f.client--, f.client <= 0 && (e.remove(f), delete f.promise, f.destroy()), f = null)
            }, this.exec = function () {
                if (f) {
                    var c = a.slice(arguments);
                    return b && c.unshift(b), f.exec.apply(this, c)
                }
            }, this.getRuid = function () {
                return f && f.uid
            }, this.destroy = function (a) {
                return function () {
                    a && a.apply(this, arguments), this.trigger("destroy"), this.off(), this.exec("destroy"), this.disconnectRuntime()
                }
            }(this.destroy)
        }

        var e = function () {
            var a = {};
            return {
                add: function (b) {
                    a[b.uid] = b
                }, get: function (b) {
                    var c;
                    if (b) return a[b];
                    for (c in a) return a[c];
                    return null
                }, remove: function (b) {
                    delete a[b.uid]
                }, has: function () {
                    return !!this.get.apply(this, arguments)
                }
            }
        }();
        return b.installTo(d.prototype), d
    }), c("lib/blob", ["base", "runtime/client"], function (a, b) {
        function c(a, c) {
            var d = this;
            d.source = c, d.ruid = a, b.call(d, "Blob"), this.uid = c.uid || this.uid, this.type = c.type || "", this.size = c.size || 0, a && d.connectRuntime(a)
        }

        return a.inherits(b, {
            constructor: c, slice: function (a, b) {
                return this.exec("slice", a, b)
            }, getSource: function () {
                return this.source
            }
        }), c
    }), c("lib/file", ["base", "lib/blob"], function (a, b) {
        function c(a, c) {
            var f;
            b.apply(this, arguments), this.name = c.name || "untitled" + d++, this.type || (f = e.exec(c.name) ? RegExp.$1.toLowerCase() : "", ~"jpg,jpeg,png,gif,bmp".indexOf(f) && (this.type = "image/" + f)), this.ext = f, this.lastModifiedDate = c.lastModifiedDate || (new Date).toLocaleString()
        }

        var d = 0, e = /\.([^.]+)$/;
        return a.inherits(b, c)
    }), c("lib/filepicker", ["base", "runtime/client", "lib/file"], function (b, c, d) {
        function e(a) {
            if (a = this.options = f.extend({}, e.options, a), a.container = f(a.id), !a.container.length) throw new Error("按钮指定错误");
            a.label = a.label || a.container.text() || "选择文件", a.button = f(a.button || document.createElement("div")), a.button.text(a.label), a.container.html(a.button), c.call(this, "FilePicker", !0)
        }

        var f = b.$;
        return e.options = {button: null, container: null, label: null, multiple: !0, accept: null}, b.inherits(c, {
            constructor: e, init: function () {
                var b = this, c = b.options, e = c.button;
                e.addClass("webuploader-pick"), b.on("all", function (a) {
                    var c;
                    switch (a) {
                        case"mouseenter":
                            e.addClass("webuploader-pick-hover");
                            break;
                        case"mouseleave":
                            e.removeClass("webuploader-pick-hover");
                            break;
                        case"change":
                            c = b.exec("getFiles"), b.trigger("select", f.map(c, function (a) {
                                return new d(b.getRuid(), a)
                            }))
                    }
                }), b.connectRuntime(c, function () {
                    b.refresh(), b.exec("init", c)
                }), f(a).on("resize", function () {
                    b.refresh()
                })
            }, refresh: function () {
                var a = this.getRuntime().getContainer(), b = this.options.button, c = b.outerWidth(), d = b.outerHeight(), e = b.offset();
                c && a.css({width: c + "px", height: d + "px"}).offset(e)
            }, destroy: function () {
                this.runtime && (this.exec("destroy"), this.disconnectRuntime())
            }
        }), e
    }), c("widgets/widget", ["base", "uploader"], function (a, b) {
        function c(a) {
            if (!a) return !1;
            var b = a.length, c = e.type(a);
            return 1 === a.nodeType && b ? !0 : "array" === c || "function" !== c && "string" !== c && (0 === b || "number" == typeof b && b > 0 && b - 1 in a)
        }

        function d(a) {
            this.owner = a, this.options = a.options
        }

        var e = a.$, f = b.prototype._init, g = {}, h = [];
        return e.extend(d.prototype, {
            init: a.noop, invoke: function (a, b) {
                var c = this.responseMap;
                return c && a in c && c[a] in this && e.isFunction(this[c[a]]) ? this[c[a]].apply(this, b) : g
            }, request: function () {
                return this.owner.request.apply(this.owner, arguments)
            }
        }), e.extend(b.prototype, {
            _init: function () {
                var a = this, b = a._widgets = [];
                return e.each(h, function (c, d) {
                    b.push(new d(a))
                }), f.apply(a, arguments)
            }, request: function (b, d, e) {
                var f, h, i = 0, j = this._widgets, k = j.length, l = [], m = [];
                for (d = c(d) ? d : [d]; k > i; i++) f = j[i], h = f.invoke(b, d), h !== g && (a.isPromise(h) ? m.push(h) : l.push(h));
                return e || m.length ? a.when.apply(a, m).then(function () {
                    var b = a.Deferred(), c = arguments;
                    return setTimeout(function () {
                        b.resolve.apply(b, c)
                    }, 1), b.promise()
                }).then(e || a.noop) : l[0]
            }
        }), b.register = d.register = function (b, c) {
            var f, g = {init: "init"};
            return 1 === arguments.length ? (c = b, c.responseMap = g) : c.responseMap = e.extend(g, b), f = a.inherits(d, c), h.push(f), f
        }, d
    }), c("widgets/filepicker", ["base", "uploader", "lib/filepicker", "widgets/widget"], function (a, b, c) {
        return a.$.extend(b.options, {pick: null, accept: null}), b.register({"add-btn": "addButton", refresh: "refresh"}, {
            init: function (a) {
                return this.pickers = [], a.pick && this.addButton(a.pick)
            }, refresh: function () {
                $.each(this.pickers, function () {
                    this.refresh()
                })
            }, addButton: function (b) {
                var d, e, f, g = this, h = g.options, i = h.accept;
                if (b) return f = a.Deferred(), "string" == typeof b && (b = {id: b}), d = $.extend({}, b, {
                    accept: $.isPlainObject(i) ? [i] : i,
                    swf: h.swf,
                    runtimeOrder: h.runtimeOrder
                }), e = new c(d), e.once("ready", f.resolve), e.on("select", function (a) {
                    g.owner.request("add-file", [a])
                }), e.init(), this.pickers.push(e), f.promise()
            }
        })
    }), c("file", ["base", "mediator"], function (a, b) {
        function c() {
            return f + g++
        }

        function d(a) {
            this.name = a.name || "Untitled", this.size = a.size || 0, this.type = a.type || "image/png", this.lastModifiedDate = a.lastModifiedDate || 1 * new Date, this.id = c(), this.ext = h.exec(this.name) ? RegExp.$1 : "", this.statusText = "", i[this.id] = d.Status.INITED, this.source = a, this.loaded = 0, this.on("error", function (a) {
                this.setStatus(d.Status.ERROR, a)
            })
        }

        var e = a.$, f = "WU_FILE_", g = 0, h = /\.([^.]+)$/, i = {};
        return e.extend(d.prototype, {
            setStatus: function (a, b) {
                var c = i[this.id];
                "undefined" != typeof b && (this.statusText = b), a !== c && (i[this.id] = a, this.trigger("statuschange", a, c))
            }, getStatus: function () {
                return i[this.id]
            }, getSource: function () {
                return this.source
            }, destory: function () {
                delete i[this.id]
            }
        }), b.installTo(d.prototype), d.Status = {INITED: "inited", QUEUED: "queued", PROGRESS: "progress", ERROR: "error", COMPLETE: "complete", CANCELLED: "cancelled", INTERRUPT: "interrupt", INVALID: "invalid"}, d
    }), c("lib/dnd", ["base", "mediator", "runtime/client"], function (a, b, c) {
        function d(a) {
            a = this.options = e.extend({}, d.options, a), a.container = e(a.container), a.container.length && c.call(this, "DragAndDrop")
        }

        var e = a.$;
        return d.options = {accept: null, disableGlobalDnd: !0}, a.inherits(c, {
            constructor: d, init: function () {
                var a = this;
                a.connectRuntime(a.options, function () {
                    a.exec("init")
                })
            }, destroy: function () {
                this.disconnectRuntime()
            }
        }), b.installTo(d.prototype), d
    }), c("lib/filepaste", ["base", "mediator", "runtime/client"], function (a, b, c) {
        function d(a) {
            a = this.options = e.extend({}, a), a.container = e(a.container || document.body), c.call(this, "FilePaste")
        }

        var e = a.$;
        return a.inherits(c, {
            constructor: d, init: function () {
                var a = this;
                a.connectRuntime(a.options, function () {
                    a.exec("init")
                })
            }, destroy: function () {
                this.exec("destroy"), this.disconnectRuntime(), this.off()
            }
        }), b.installTo(d.prototype), d
    }), c("lib/image", ["base", "runtime/client", "lib/blob"], function (a, b, c) {
        function d(a) {
            this.options = e.extend({}, d.options, a), b.call(this, "Image"), this.on("load", function () {
                this._info = this.exec("info"), this._meta = this.exec("meta")
            })
        }

        var e = a.$;
        return d.options = {quality: 90, crop: !1, preserveHeaders: !0, allowMagnify: !0}, a.inherits(b, {
            constructor: d, info: function (a) {
                return a ? (this._info = a, this) : this._info
            }, meta: function (a) {
                return a ? (this._meta = a, this) : this._meta
            }, loadFromBlob: function (a) {
                var b = this, c = a.getRuid();
                this.connectRuntime(c, function () {
                    b.exec("init", b.options), b.exec("loadFromBlob", a)
                })
            }, resize: function () {
                var b = a.slice(arguments);
                return this.exec.apply(this, ["resize"].concat(b))
            }, getAsDataUrl: function (a) {
                return this.exec("getAsDataUrl", a)
            }, getAsBlob: function (a) {
                var b = this.exec("getAsBlob", a);
                return new c(this.getRuid(), b)
            }
        }), d
    }), c("lib/transport", ["base", "runtime/client", "mediator"], function (a, b, c) {
        function d(a) {
            var c = this;
            a = c.options = e.extend(!0, {}, d.options, a || {}), b.call(this, "Transport"), this._blob = null, this._formData = a.formData || {}, this._headers = a.headers || {}, this.on("progress", this._timeout), this.on("load error", function () {
                c.trigger("progress", 1), clearTimeout(c._timer)
            })
        }

        var e = a.$;
        return d.options = {server: "", method: "POST", withCredentials: !1, fileVar: "file", timeout: 12e4, formData: {}, headers: {}, sendAsBinary: !1}, e.extend(d.prototype, {
            appendBlob: function (a, b, c) {
                var d = this, e = d.options;
                d.getRuid() && d.disconnectRuntime(), d.connectRuntime(b.ruid, function () {
                    d.exec("init")
                }), d._blob = b, e.fileVar = a || e.fileVar, e.filename = c || e.filename
            }, append: function (a, b) {
                "object" == typeof a ? e.extend(this._formData, a) : this._formData[a] = b
            }, setRequestHeader: function (a, b) {
                "object" == typeof a ? e.extend(this._headers, a) : this._headers[a] = b
            }, send: function (a) {
                this.exec("send", a), this._timeout()
            }, abort: function () {
                return clearTimeout(this._timer), this.exec("abort")
            }, destroy: function () {
                this.trigger("destroy"), this.off(), this.exec("destroy"), this.disconnectRuntime()
            }, getResponse: function () {
                return this.exec("getResponse")
            }, getResponseAsJson: function () {
                return this.exec("getResponseAsJson")
            }, getStatus: function () {
                return this.exec("getStatus")
            }, _timeout: function () {
                var a = this, b = a.options.timeout;
                b && (clearTimeout(a._timer), a._timer = setTimeout(function () {
                    a.abort(), a.trigger("error", "timeout")
                }, b))
            }
        }), c.installTo(d.prototype), d
    }), c("queue", ["base", "mediator", "file"], function (a, b, c) {
        function d() {
            this.stats = {numOfQueue: 0, numOfSuccess: 0, numOfCancel: 0, numOfProgress: 0, numOfUploadFailed: 0, numOfInvalid: 0}, this._queue = [], this._map = {}
        }

        var e = a.$, f = c.Status;
        return e.extend(d.prototype, {
            append: function (a) {
                return this._queue.push(a), this._fileAdded(a), this
            }, prepend: function (a) {
                return this._queue.unshift(a), this._fileAdded(a), this
            }, getFile: function (a) {
                return "string" != typeof a ? a : this._map[a]
            }, fetch: function (a) {
                var b, c, d = this._queue.length;
                for (a = a || f.QUEUED, b = 0; d > b; b++) if (c = this._queue[b], a === c.getStatus()) return c;
                return null
            }, getFiles: function () {
                for (var a, b = [].slice.call(arguments, 0), c = [], d = 0, f = this._queue.length; f > d; d++) a = this._queue[d], (!b.length || ~e.inArray(a.getStatus(), b)) && c.push(a);
                return c
            }, _fileAdded: function (a) {
                var b = this, c = this._map[a.id];
                c || (this._map[a.id] = a, a.on("statuschange", function (a, c) {
                    b._onFileStatusChange(a, c)
                })), a.setStatus(f.QUEUED)
            }, _onFileStatusChange: function (a, b) {
                var c = this.stats;
                switch (b) {
                    case f.PROGRESS:
                        c.numOfProgress--;
                        break;
                    case f.QUEUED:
                        c.numOfQueue--;
                        break;
                    case f.ERROR:
                        c.numOfUploadFailed--;
                        break;
                    case f.INVALID:
                        c.numOfInvalid--
                }
                switch (a) {
                    case f.QUEUED:
                        c.numOfQueue++;
                        break;
                    case f.PROGRESS:
                        c.numOfProgress++;
                        break;
                    case f.ERROR:
                        c.numOfUploadFailed++;
                        break;
                    case f.COMPLETE:
                        c.numOfSuccess++;
                        break;
                    case f.CANCELLED:
                        c.numOfCancel++;
                        break;
                    case f.INVALID:
                        c.numOfInvalid++
                }
            }
        }), b.installTo(d.prototype), d
    }), c("runtime/compbase", function () {
        function a(a, b) {
            this.owner = a, this.options = a.options, this.getRuntime = function () {
                return b
            }, this.getRuid = function () {
                return b.uid
            }, this.trigger = function () {
                return a.trigger.apply(a, arguments)
            }
        }

        return a
    }), c("runtime/flash/runtime", ["base", "runtime/runtime", "runtime/compbase"], function (b, c, d) {
        function e() {
            var a;
            try {
                a = navigator.plugins["Shockwave Flash"], a = a.description
            } catch (b) {
                try {
                    a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
                } catch (c) {
                    a = "0.0"
                }
            }
            return a = a.match(/\d+/g), parseFloat(a[0] + "." + a[1], 10)
        }

        function f() {
            function d(a, b) {
                var c, d, e = a.type || a;
                c = e.split("::"), d = c[0], e = c[1], "Ready" === e && d === j.uid ? j.trigger("ready") : f[d] && f[d].trigger(e.toLowerCase(), a, b)
            }

            var e = {}, f = {}, g = this.destory, j = this, k = b.guid("webuploader_");
            c.apply(j, arguments), j.type = h, j.exec = function (a, c) {
                var d, g = this, h = g.uid, k = b.slice(arguments, 2);
                return f[h] = g, i[a] && (e[h] || (e[h] = new i[a](g, j)), d = e[h], d[c]) ? d[c].apply(d, k) : j.flashExec.apply(g, arguments)
            }, a[k] = function () {
                var a = arguments;
                setTimeout(function () {
                    d.apply(null, a)
                }, 1)
            }, this.jsreciver = k, this.destory = function () {
                return g && g.apply(this, arguments)
            }, this.flashExec = function (a, c) {
                var d = j.getFlash(), e = b.slice(arguments, 2);
                return d.exec(this.uid, a, c, e)
            }
        }

        var g = b.$, h = "flash", i = {};
        return b.inherits(c, {
            constructor: f, init: function () {
                var a, c = this.getContainer(), d = this.options;
                c.css({
                    position: "absolute",
                    top: "-8px",
                    left: "-8px",
                    width: "9px",
                    height: "9px",
                    overflow: "hidden"
                }), a = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + d.swf + '" ', b.isIE && (a += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '), a += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + d.swf + '" /><param name="flashvars" value="uid=' + this.uid + "&jsreciver=" + this.jsreciver + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>', c.html(a)
            }, getFlash: function () {
                return this._flash ? this._flash : (this._flash = g("#" + this.uid).get(0), this._flash)
            }
        }), f.register = function (a, c) {
            return c = i[a] = b.inherits(d, g.extend({
                flashExec: function () {
                    var a = this.owner, b = this.getRuntime();
                    return b.flashExec.apply(a, arguments)
                }
            }, c))
        }, e() >= 11.3 && c.addRuntime(h, f), f
    }), c("runtime/flash/filepicker", ["base", "runtime/flash/runtime"], function (a, b) {
        var c = a.$;
        return b.register("FilePicker", {
            init: function (a) {
                var b = c.extend({}, a);
                delete b.button, delete b.container, this.flashExec("FilePicker", "init", b)
            }, destroy: function () {
            }
        })
    }), c("runtime/flash/image", ["runtime/flash/runtime"], function (a) {
        return a.register("Image", {
            loadFromBlob: function (a) {
                var b = this.owner;
                b.info() && this.flashExec("Image", "info", b.info()), b.meta() && this.flashExec("Image", "meta", b.meta()), this.flashExec("Image", "loadFromBlob", a.uid)
            }
        })
    }), c("runtime/flash/transport", ["base", "runtime/flash/runtime", "runtime/client"], function (a, b, c) {
        return b.register("Transport", {
            init: function () {
                this._status = 0, this._response = null, this._responseJson = null
            }, send: function () {
                var a, b = this.owner, c = this.options, d = this._initAjax(), e = b._blob, f = c.server;
                d.connectRuntime(e.ruid), c.sendAsBinary ? (f += (/\?/.test(f) ? "&" : "?") + $.param(b._formData), a = e.uid) : ($.each(b._formData, function (a, b) {
                    d.exec("append", a, b)
                }), d.exec("appendBlob", c.fileVar, e.uid, c.filename || b._formData.name || "")), this._setRequestHeader(d, c.headers), d.exec("send", {method: c.method, url: f}, a)
            }, getStatus: function () {
                return this._status
            }, getResponse: function () {
                return this._response
            }, getResponseAsJson: function () {
                return this._responseJson
            }, abort: function () {
                var a = this._xhr;
                a && (a.exec("abort"), a.destroy(), this._xhr = a = null)
            }, destroy: function () {
                this.abort()
            }, _initAjax: function () {
                {
                    var a = this, b = new c("XMLHttpRequest");
                    this.options
                }
                return b.on("uploadprogress progress", function (b) {
                    return a.trigger("progress", b.loaded / b.total)
                }), b.on("load", function () {
                    var c = b.exec("getStatus");
                    return b.off(), a._xhr = null, 200 === c ? (a._response = b.exec("getResponse"), a._responseJson = b.exec("getResponseAsJson"), a.trigger("load")) : (a._status = c, b.destroy(), b = null, a.trigger("error", "http"))
                }), b.on("error", function () {
                    b.off(), a._xhr = null, a.trigger("error", "http")
                }), a._xhr = b, b
            }, _setRequestHeader: function (a, b) {
                $.each(b, function (b, c) {
                    a.exec("setRequestHeader", b, c)
                })
            }
        })
    }), c("runtime/html5/runtime", ["base", "runtime/runtime", "runtime/compbase"], function (b, c, d) {
        function e() {
            var a = {}, d = this, e = this.destory;
            c.apply(d, arguments), d.type = f, d.exec = function (c, e) {
                var f, h = this, i = h.uid, j = b.slice(arguments, 2);
                return g[c] && (f = a[i] = a[i] || new g[c](h, d), f[e]) ? f[e].apply(f, j) : void 0
            }, d.destory = function () {
                return e && e.apply(this, arguments)
            }
        }

        var f = "html5", g = {};
        return b.inherits(c, {
            constructor: e, init: function () {
                var a = this;
                setTimeout(function () {
                    a.trigger("ready")
                }, 1)
            }
        }), e.register = function (a, c) {
            var e = g[a] = b.inherits(d, c);
            return e
        }, a.Blob && a.FileReader && a.DataView && c.addRuntime(f, e), e
    }), c("runtime/html5/blob", ["runtime/html5/runtime", "lib/blob"], function (a, b) {
        return a.register("Blob", {
            slice: function (a, c) {
                var d = this.owner.source, e = d.slice || d.webkitSlice || d.mozSlice;
                return d = e.call(d, a, c), new b(this.getRuid(), d)
            }
        })
    }), c("runtime/html5/dnd", ["base", "runtime/html5/runtime", "lib/file"], function (a, b, c) {
        var d = a.$;
        return b.register("DragAndDrop", {
            init: function () {
                var b = this.elem = this.options.container;
                this.dragEnterHandler = a.bindFn(this._dragEnterHandler, this), this.dragOverHandler = a.bindFn(this._dragOverHandler, this), this.dragLeaveHandler = a.bindFn(this._dragLeaveHandler, this), this.dropHandler = a.bindFn(this._dropHandler, this), b.on("dragenter", this.dragEnterHandler), b.on("dragover", this.dragOverHandler), b.on("dragleave", this.dragLeaveHandler), b.on("drop", this.dropHandler), this.options.disableGlobalDnd && (d(document).on("dragover", this.dragOverHandler), d(document).on("drop", this.dropHandler))
            }, _dragEnterHandler: function (a) {
                return this.elem.addClass("webuploader-dnd-over"), a = a.originalEvent || a, a.dataTransfer.dropEffect = "copy", !1
            }, _dragOverHandler: function (a) {
                return d.contains(this.elem.parent().get(0), a.target) ? (this._dragEnterHandler.call(this, a), !1) : !1
            }, _dragLeaveHandler: function () {
                return this.elem.removeClass("webuploader-dnd-over"), !1
            }, _dropHandler: function (b) {
                var e, f, g, h, i, j, k, l = [], m = [], n = this, o = n.getRuid();
                if (!d.contains(n.elem.parent().get(0), b.target)) return !1;
                for (b = b.originalEvent || b, g = b.dataTransfer, e = g.items, f = g.files, k = !(!e || !e[0].webkitGetAsEntry), i = 0, j = f.length; j > i; i++) h = f[i], h.type ? l.push(h) : !h.type && k && m.push(this._traverseDirectoryTree(e[i].webkitGetAsEntry(), l));
                return a.when.apply(a, m).done(function () {
                    n.trigger("drop", d.map(l, function (a) {
                        return new c(o, a)
                    }))
                }), this.elem.removeClass("webuploader-dnd-over"), !1
            }, _traverseDirectoryTree: function (b, c) {
                var d = a.Deferred(), e = this;
                return b.isFile ? b.file(function (a) {
                    a.type && c.push(a), d.resolve(!0)
                }) : b.isDirectory && b.createReader().readEntries(function (b) {
                    var f, g = b.length, h = [], i = [];
                    for (f = 0; g > f; f++) h.push(e._traverseDirectoryTree(b[f], i));
                    a.when.apply(a, h).then(function () {
                        c.push.apply(c, i), d.resolve(!0)
                    }, d.reject)
                }), d.promise()
            }, destroy: function () {
                var a = this.elem;
                a.off("dragenter", this.dragEnterHandler), a.off("dragover", this.dragEnterHandler), a.off("dragleave", this.dragLeaveHandler), a.off("drop", this.dropHandler), this.options.disableGlobalDnd && (d(document).off("dragover", this.dragOverHandler), d(document).off("drop", this.dropHandler))
            }
        })
    }), c("runtime/html5/filepaste", ["base", "runtime/html5/runtime"], function (a, b) {
        return b.register("FilePaste", {
            init: function () {
                var b, c, d, e, f = this.options, g = this.elem = f.container, h = ".*";
                if (f.accept) {
                    for (b = [], c = 0, d = f.accept.length; d > c; c++) e = f.accept[c].mimeTypes, e && b.push(e);
                    b.length && (h = b.join(","), h = h.replace(/,/g, "|").replace(/\*/g, ".*"))
                }
                this.accept = h = new RegExp(h, "i"), this.hander = a.bindFn(this._pasteHander, this), g.on("paste", this.hander)
            }, _pasteHander: function (a) {
                var b, c, d, e, f, g = [];
                for (a = a.originalEvent || a, a.preventDefault(), a.stopPropagation(), b = a.clipboardData.items, e = 0, f = b.length; f > e; e++) c = b[e], !c.type || !(d = c.getAsFile()) || d.size < 6 || g.push(d);
                g.length && this.trigger("paste", g)
            }, destroy: function () {
                this.elem.off("paste", this.hander)
            }
        })
    }), c("runtime/html5/filepicker", ["base", "runtime/html5/runtime"], function (a, b) {
        var c = a.$;
        return b.register("FilePicker", {
            init: function () {
                var a, b, d, e, f = this.getRuntime().getContainer(), g = this, h = g.owner, i = g.options, j = c(document.createElement("label")), k = c(document.createElement("input"));
                if (k.attr("type", "file"), k.css({position: "absolute", clip: "rect(1px,1px,1px,1px)"}), j.on("click", function () {
                        k.trigger("click")
                    }), j.css({opacity: 0, width: "100%", height: "100%", display: "block", cursor: "pointer", background: "#ffffff"}), i.multiple && k.attr("multiple", "multiple"), i.accept && i.accept.length > 0) {
                    for (a = [], b = 0, d = i.accept.length; d > b; b++) a.push(i.accept[b].mimeTypes);
                    k.attr("accept", a.join(","))
                }
                f.append(k), f.append(j), e = function (a) {
                    h.trigger(a.type)
                }, k.on("change", function (a) {
                    var b, d = arguments.callee;
                    g.files = a.target.files, b = this.cloneNode(!0), this.parentNode.replaceChild(b, this), k.off(), k = c(b).on("change", d).on("mouseenter mouseleave", e), h.trigger("change")
                }), j.on("mouseenter mouseleave", e)
            }, getFiles: function () {
                return this.files
            }, destroy: function () {
            }
        })
    }), c("runtime/html5/util", function () {
        var b = a.createObjectURL && a || a.URL && URL.revokeObjectURL && URL || a.webkitURL;
        return {
            createObjectURL: b && b.createObjectURL, revokeObjectURL: b && b.revokeObjectURL, dataURL2Blob: function (a) {
                var b, c, d, e, f, g;
                for (g = a.split(","), b = ~g[0].indexOf("base64") ? atob(g[1]) : decodeURIComponent(g[1]), d = new ArrayBuffer(b.length), c = new Uint8Array(d), e = 0; e < b.length; e++) c[e] = b.charCodeAt(e);
                return f = g[0].split(":")[1].split(";")[0], new Blob([d], {type: f})
            }, dataURL2ArrayBuffer: function (a) {
                var b, c, d, e;
                for (e = a.split(","), b = ~e[0].indexOf("base64") ? atob(e[1]) : decodeURIComponent(e[1]), c = new Uint8Array(b.length), d = 0; d < b.length; d++) c[d] = b.charCodeAt(d);
                return c.buffer
            }, arrayBufferToBlob: function (a, b) {
                return new Blob([a], b ? {type: b} : {})
            }
        }
    }), c("runtime/html5/imagemeta", ["runtime/html5/util"], function () {
        var a;
        return a = {
            parsers: {65505: []}, maxMetaDataSize: 262144, parse: function (a, b) {
                var c = this, d = new FileReader;
                d.onload = function () {
                    b(!1, c._parse(this.result)), d = d.onload = d.onerror = null
                }, d.onerror = function (a) {
                    b(a.message), d = d.onload = d.onerror = null
                }, a = a.slice(0, c.maxMetaDataSize), d.readAsArrayBuffer(a.getSource())
            }, _parse: function (b, c) {
                if (!(b.byteLength < 6)) {
                    var d, e, f, g, h = new DataView(b), i = 2, j = h.byteLength - 4, k = i, l = {};
                    if (65496 === h.getUint16(0)) {
                        for (; j > i && (d = h.getUint16(i), d >= 65504 && 65519 >= d || 65534 === d) && (e = h.getUint16(i + 2) + 2, !(i + e > h.byteLength));) {
                            if (f = a.parsers[d], !c && f) for (g = 0; g < f.length; g += 1) f[g].call(a, h, i, e, l);
                            i += e, k = i
                        }
                        k > 6 && (l.imageHead = b.slice ? b.slice(2, k) : new Uint8Array(b).subarray(2, k))
                    }
                    return l
                }
            }, updateImageHead: function (a, b) {
                var c, d, e, f = this._parse(a, !0);
                return e = 2, f.imageHead && (e = 2 + f.imageHead.byteLength), d = a.slice ? a.slice(e) : new Uint8Array(a).subarray(e), c = new Uint8Array(b.byteLength + 2 + d.byteLength), c[0] = 255, c[1] = 216, c.set(new Uint8Array(b), 2), c.set(new Uint8Array(d), b.byteLength + 2), c.buffer
            }
        }
    }), c("runtime/html5/image", ["runtime/html5/runtime", "runtime/html5/util", "runtime/html5/imagemeta"], function (a, b, c) {
        var d = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
        return a.register("Image", {
            modified: !1, init: function () {
                var a = this, b = new Image;
                b.onload = function () {
                    a._info = {type: a.type, width: this.width, height: this.height}, !a._metas && ~"image/jpegimage/jpg".indexOf(a.type) ? c.parse(a._blob, function (b, c) {
                        a._metas = c, a.owner.trigger("load")
                    }) : a.owner.trigger("load")
                }, b.onerror = function () {
                    a.owner.trigger("error")
                }, a._img = b
            }, loadFromBlob: function (a) {
                var c = this, d = c._img;
                c._blob = a, c.type = a.type, d.src = b.createObjectURL(a.getSource()), c.owner.once("load", function () {
                    b.revokeObjectURL(d.src)
                })
            }, resize: function (a, b) {
                var c = this._canvas || (this._canvas = document.createElement("canvas"));
                this._resize(this._img, c, a, b), this._blob = null, this.modified = !0, this.owner.trigger("complete")
            }, getAsBlob: function (a) {
                var d, e = this._blob, f = this.options;
                if (a = a || this.type, this.modified || this.type !== a) {
                    if (d = this._canvas, "image/jpeg" === a) {
                        if (e = d.toDataURL("image/jpeg", f.quality / 100), f.preserveHeaders && this._metas && this._metas.imageHead) return e = b.dataURL2ArrayBuffer(e), e = c.updateImageHead(e, this._metas.imageHead), e = b.arrayBufferToBlob(e, a)
                    } else e = d.toDataURL(a);
                    e = b.dataURL2Blob(e)
                }
                return e
            }, getAsDataUrl: function (a) {
                var b = this.options;
                return a = a || this.type, "image/jpeg" === a ? this._canvas.toDataURL(a, b.quality / 100) : this._canvas.toDataURL(a)
            }, getOrientation: function () {
                return this._metas && this._metas.exif && this._metas.exif.get("Orientation") || 1
            }, info: function (a) {
                return a ? (this._info = a, this) : this._info
            }, meta: function (a) {
                return a ? (this._meta = a, this) : this._meta
            }, destroy: function () {
                var a = this._canvas;
                this._img.onload = null, a && (a.getContext("2d").clearRect(0, 0, a.width, a.height), a.width = a.height = 0, this._canvas = null), this._img.src = d, this._img = this._blob = null
            }, _resize: function (a, b, c, d) {
                var e, f, g, h, i, j = this.options, k = a.width, l = a.height, m = this.getOrientation();
                ~[5, 6, 7, 8].indexOf(m) && (c ^= d, d ^= c, c ^= d), e = Math[j.crop ? "max" : "min"](c / k, d / l), j.allowMagnify && (e = Math.min(1, e)), f = k * e, g = l * e, j.crop ? (b.width = c, b.height = d) : (b.width = f, b.height = g), h = (b.width - f) / 2, i = (b.height - g) / 2, j.preserveHeaders || this._rotateToOrientaion(b, m), this._renderImageToCanvas(b, a, h, i, f, g)
            }, _rotateToOrientaion: function (a, b) {
                var c = a.width, d = a.height, e = a.getContext("2d");
                switch (b) {
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        a.width = d, a.height = c
                }
                switch (b) {
                    case 2:
                        e.translate(c, 0), e.scale(-1, 1);
                        break;
                    case 3:
                        e.translate(c, d), e.rotate(Math.PI);
                        break;
                    case 4:
                        e.translate(0, d), e.scale(1, -1);
                        break;
                    case 5:
                        e.rotate(.5 * Math.PI), e.scale(1, -1);
                        break;
                    case 6:
                        e.rotate(.5 * Math.PI), e.translate(0, -d);
                        break;
                    case 7:
                        e.rotate(.5 * Math.PI), e.translate(c, -d), e.scale(-1, 1);
                        break;
                    case 8:
                        e.rotate(-.5 * Math.PI), e.translate(-c, 0)
                }
            }, _renderImageToCanvas: function (a, b, c, d, e, f) {
                a.getContext("2d").drawImage(b, c, d, e, f)
            }
        })
    }), c("runtime/html5/imagemeta/exif", ["base", "runtime/html5/imagemeta"], function (a, b) {
        var c = {};
        return c.ExifMap = function () {
            return this
        }, c.ExifMap.prototype.map = {Orientation: 274}, c.ExifMap.prototype.get = function (a) {
            return this[a] || this[this.map[a]]
        }, c.exifTagTypes = {
            1: {
                getValue: function (a, b) {
                    return a.getUint8(b)
                }, size: 1
            }, 2: {
                getValue: function (a, b) {
                    return String.fromCharCode(a.getUint8(b))
                }, size: 1, ascii: !0
            }, 3: {
                getValue: function (a, b, c) {
                    return a.getUint16(b, c)
                }, size: 2
            }, 4: {
                getValue: function (a, b, c) {
                    return a.getUint32(b, c)
                }, size: 4
            }, 5: {
                getValue: function (a, b, c) {
                    return a.getUint32(b, c) / a.getUint32(b + 4, c)
                }, size: 8
            }, 9: {
                getValue: function (a, b, c) {
                    return a.getInt32(b, c)
                }, size: 4
            }, 10: {
                getValue: function (a, b, c) {
                    return a.getInt32(b, c) / a.getInt32(b + 4, c)
                }, size: 8
            }
        }, c.exifTagTypes[7] = c.exifTagTypes[1], c.getExifValue = function (b, d, e, f, g, h) {
            var i, j, k, l, m, n, o = c.exifTagTypes[f];
            if (!o) return a.log("Invalid Exif data: Invalid tag type."), void 0;
            if (i = o.size * g, j = i > 4 ? d + b.getUint32(e + 8, h) : e + 8, j + i > b.byteLength) return a.log("Invalid Exif data: Invalid data offset."), void 0;
            if (1 === g) return o.getValue(b, j, h);
            for (k = [], l = 0; g > l; l += 1) k[l] = o.getValue(b, j + l * o.size, h);
            if (o.ascii) {
                for (m = "", l = 0; l < k.length && (n = k[l], "\x00" !== n); l += 1) m += n;
                return m
            }
            return k
        }, c.parseExifTag = function (a, b, d, e, f) {
            var g = a.getUint16(d, e);
            f.exif[g] = c.getExifValue(a, b, d, a.getUint16(d + 2, e), a.getUint32(d + 4, e), e)
        }, c.parseExifTags = function (b, c, d, e, f) {
            var g, h, i;
            if (d + 6 > b.byteLength) return a.log("Invalid Exif data: Invalid directory offset."), void 0;
            if (g = b.getUint16(d, e), h = d + 2 + 12 * g, h + 4 > b.byteLength) return a.log("Invalid Exif data: Invalid directory size."), void 0;
            for (i = 0; g > i; i += 1) this.parseExifTag(b, c, d + 2 + 12 * i, e, f);
            return b.getUint32(h, e)
        }, c.parseExifData = function (b, d, e, f) {
            var g, h, i = d + 10;
            if (1165519206 === b.getUint32(d + 4)) {
                if (i + 8 > b.byteLength) return a.log("Invalid Exif data: Invalid segment size."), void 0;
                if (0 !== b.getUint16(d + 8)) return a.log("Invalid Exif data: Missing byte alignment offset."), void 0;
                switch (b.getUint16(i)) {
                    case 18761:
                        g = !0;
                        break;
                    case 19789:
                        g = !1;
                        break;
                    default:
                        return a.log("Invalid Exif data: Invalid byte alignment marker."), void 0
                }
                if (42 !== b.getUint16(i + 2, g)) return a.log("Invalid Exif data: Missing TIFF marker."), void 0;
                h = b.getUint32(i + 4, g), f.exif = new c.ExifMap, h = c.parseExifTags(b, i, i + h, g, f)
            }
        }, b.parsers[65505].push(c.parseExifData), c
    }), c("runtime/html5/transport", ["base", "runtime/html5/runtime"], function (a, b) {
        var c = a.noop, d = a.$;
        return b.register("Transport", {
            init: function () {
                this._status = 0, this._response = null
            }, send: function () {
                var a, b, c = this.owner, e = this.options, f = this._initAjax(), g = c._blob, h = e.server;
                e.sendAsBinary ? (h += (/\?/.test(h) ? "&" : "?") + d.param(c._formData), b = g.getSource()) : (a = new FormData, d.each(c._formData, function (b, c) {
                    a.append(b, c)
                }), a.append(e.fileVar, g.getSource(), e.filename || c._formData.name || "")), e.withCredentials && "withCredentials" in f ? (f.open(e.method, h, !0), f.withCredentials = !0) : f.open(e.method, h), this._setRequestHeader(f, e.headers), b && f.overrideMimeType("application/octet-stream"), f.send(b || a)
            }, getResponse: function () {
                return this._response
            }, getResponseAsJson: function () {
                return this._parseJson(this._response)
            }, getStatus: function () {
                return this._status
            }, abort: function () {
                var a = this._xhr;
                a && (a.upload.onprogress = c, a.onreadystatechange = c, a.abort(), this._xhr = a = null)
            }, destroy: function () {
                this.abort()
            }, _initAjax: function () {
                var a = this, b = new XMLHttpRequest, d = this.options;
                return !d.withCredentials || "withCredentials" in b || "undefined" == typeof XDomainRequest || (b = new XDomainRequest), b.upload.onprogress = function (b) {
                    var c = 0;
                    return b.lengthComputable && (c = b.loaded / b.total), a.trigger("progress", c)
                }, b.onreadystatechange = function () {
                    return 4 === b.readyState ? (b.upload.onprogress = c, b.onreadystatechange = c, a._xhr = null, 200 === b.status ? (a._response = b.responseText, a.trigger("load")) : (a._status = b.status, b = null, a.trigger("error", a._status ? "http" : "abort"))) : void 0
                }, a._xhr = b, b
            }, _setRequestHeader: function (a, b) {
                d.each(b, function (b, c) {
                    a.setRequestHeader(b, c)
                })
            }, _parseJson: function (a) {
                var b;
                try {
                    b = JSON.parse(a)
                } catch (c) {
                    b = {}
                }
                return b
            }
        })
    }), c("widgets/filednd", ["base", "uploader", "lib/dnd", "widgets/widget"], function (a, b, c) {
        return b.options.dnd = "", b.register({
            init: function (b) {
                if (b.dnd && "html5" === this.request("get-runtime-type")) {
                    var d, e = this, f = a.Deferred(), g = $.extend({}, {container: b.dnd, accept: b.accept});
                    return d = new c(g), d.once("ready", f.resolve), d.on("drop", function (a) {
                        e.request("add-file", [a])
                    }), d.init(), f.promise()
                }
            }
        })
    }), c("widgets/filepaste", ["base", "uploader", "lib/filepaste", "widgets/widget"], function (a, b, c) {
        return b.register({
            init: function (b) {
                if (b.paste && "html5" === this.request("get-runtime-type")) {
                    var d, e = this, f = a.Deferred(), g = $.extend({}, {container: b.paste, accept: b.accept});
                    return d = new c(g), d.once("ready", f.resolve), d.on("paste", function (a) {
                        e.owner.request("add-file", [a])
                    }), d.init(), f.promise()
                }
            }
        })
    }), c("widgets/image", ["base", "uploader", "lib/image", "widgets/widget"], function (a, b, c) {
        var d, e = a.$;
        return d = function (a) {
            var b = 0, c = [], d = function () {
                for (var d; c.length && a > b;) d = c.shift(), b += d[0], d[1]()
            };
            return function (a, e, f) {
                c.push([e, f]), a.once("destroy", function () {
                    b -= e, setTimeout(d, 1)
                }), setTimeout(d, 1)
            }
        }(5242880), e.extend(b.options, {
            thumb: {width: 110, height: 110, quality: 70, allowMagnify: !0, crop: !0, preserveHeaders: !1, type: "image/jpeg"},
            compress: {width: 1600, height: 1600, quality: 90, allowMagnify: !1, crop: !1, preserveHeaders: !0}
        }), b.register({"make-thumb": "makeThumb", "before-send-file": "compressImage"}, {
            makeThumb: function (a, b, f, g) {
                var h, i;
                return a = this.request("get-file", a), a.type.match(/^image/) ? (h = e.extend({}, this.options.thumb), e.isPlainObject(f) && (h = e.extend(h, f), f = null), f = f || h.width, g = g || h.height, i = new c(h), i.once("load", function () {
                    a._info = a._info || i.info(), a._meta = a._meta || i.meta(), i.resize(f, g)
                }), i.once("complete", function () {
                    b(!1, i.getAsDataUrl(h.type)), i.destroy()
                }), i.once("error", function () {
                    b(!0), i.destroy()
                }), d(i, a.source.size, function () {
                    a._info && i.info(a._info), a._meta && i.meta(a._meta), i.loadFromBlob(a.source)
                }), void 0) : (b(!0), void 0)
            }, compressImage: function (b) {
                var d, f, g = this.options.compress || this.options.resize, h = g && g.compressSize || 307200;
                return b = this.request("get-file", b), !g || !~"image/jpeg,image/jpg".indexOf(b.type) || b.size < h || b._compressed ? void 0 : (g = e.extend({}, g), f = a.Deferred(), d = new c(g), f.always(function () {
                    d.destroy(), d = null
                }), d.once("error", f.reject), d.once("load", function () {
                    b._info = b._info || d.info(), b._meta = b._meta || d.meta(), d.resize(g.width, g.height)
                }), d.once("complete", function () {
                    var a, c;
                    a = d.getAsBlob(g.type), c = b.size, a.size < c && (b.source = a, b.size = a.size, b.trigger("resize", a.size, c)), b._compressed = !0, f.resolve(!0)
                }), b._info && d.info(b._info), b._meta && d.meta(b._meta), d.loadFromBlob(b.source), f.promise())
            }
        })
    }), c("widgets/queue", ["base", "uploader", "queue", "file", "widgets/widget"], function (a, b, c, d) {
        var e = a.$, f = d.Status;
        return b.register({"add-file": "addFiles", "get-file": "getFile", "fetch-file": "fetchFile", "get-stats": "getStats", "get-files": "getFiles", "remove-file": "removeFile", retry: "retry"}, {
            init: function (a) {
                var b, d, f, g, h;
                if (e.isPlainObject(a.accept) && (a.accept = [a.accept]), a.accept) {
                    for (g = [], d = 0, b = a.accept.length; b > d; d++) f = a.accept[d].extensions, f && g.push(f);
                    g.length && (h = g.join(",").replace(/,/g, "$|").replace(/\*/g, ".*")), this.accept = new RegExp(h, "i")
                }
                this.queue = new c, this.stats = this.queue.stats
            }, _addFile: function (a) {
                var b = this;
                if (!(!a || a.size < 6 || b.accept && !b.accept.test(a.name)) && (a instanceof d || (a = new d(a)), b.owner.trigger("beforeFileQueued", a))) return b.queue.append(a), b.owner.trigger("fileQueued", a), a
            }, getFile: function (a) {
                return this.queue.getFile(a)
            }, addFiles: function (a) {
                var b = this;
                a.length || (a = [a]), a = e.map(a, function (a) {
                    return b._addFile(a)
                }), b.owner.trigger("filesQueued", a), b.options.auto && b.request("start-upload")
            }, getStats: function () {
                return this.stats
            }, removeFile: function (a) {
                var b = this;
                a = a.id ? a : b.queue.getFile(a), a.setStatus(f.CANCELLED), b.owner.trigger("fileDequeued", a)
            }, getFiles: function () {
                return this.queue.getFiles.apply(this.queue, arguments)
            }, fetchFile: function () {
                return this.queue.fetch.apply(this.queue, arguments)
            }, retry: function (a, b) {
                var c, d, e, g = this;
                if (a) return a = a.id ? a : g.queue.getFile(a), a.setStatus(f.QUEUED), b || g.request("start-upload"), void 0;
                for (c = g.queue.getFiles(f.ERROR), d = 0, e = c.length; e > d; d++) a = c[d], a.setStatus(f.QUEUED);
                g.request("start-upload")
            }
        })
    }), c("widgets/runtime", ["uploader", "runtime/runtime", "widgets/widget"], function (a, b) {
        return a.support = function () {
            return b.hasRuntime.apply(b, arguments)
        }, a.register({"get-runtime-type": "getRuntmeType"}, {
            init: function () {
                if (!this.getRuntmeType()) throw Error("Runtime Error")
            }, getRuntmeType: function () {
                var a, c, d = this.options.runtimeOrder || b.orders, e = this.type;
                if (!e) for (d = d.split(/\s*,\s*/g), a = 0, c = d.length; c > a; a++) if (b.hasRuntime(d[a])) {
                    this.type = e = d[a];
                    break
                }
                return e
            }
        })
    }), c("widgets/upload", ["base", "uploader", "file", "lib/transport", "widgets/widget"], function (a, b, c, d) {
        function e(a, b) {
            for (var c, d = [], e = a.source, f = e.size, g = b ? Math.ceil(f / b) : 1, h = 0, i = 0; g > i;) c = Math.min(b, f - h), d.push({file: a, start: h, end: h + c, total: f, chunks: g, chunk: i++}), h += c;
            return a.blocks = d.concat(), a.remaning = d.length, {
                file: a, has: function () {
                    return !!d.length
                }, fetch: function () {
                    return d.shift()
                }
            }
        }

        var f = a.$, g = a.isPromise, h = c.Status;
        f.extend(b.options, {prepareNextFile: !1, chunked: !1, chunkSize: 5242880, chunkRetry: 2, threads: 3}), b.register({
            "start-upload": "start",
            "stop-upload": "stop",
            "skip-file": "skipFile",
            "is-in-progress": "isInProgress"
        }, {
            init: function () {
                var b = this.owner;
                this.runing = !1, this.pool = [], this.pending = [], this.remaning = 0, this.__tick = a.bindFn(this._tick, this), b.on("uploadComplete", function (a) {
                    a.blocks && f.each(a.blocks, function (a, b) {
                        b.transport && (b.transport.abort(), b.transport.destroy()), delete b.transport
                    }), delete a.blocks, delete a.remaning
                })
            }, start: function () {
                var b = this;
                f.each(b.request("get-files", h.INVALID), function () {
                    b.request("remove-file", this)
                }), b.runing || (b.runing = !0, f.each(b.pool, function (a, c) {
                    var d = c.file;
                    d.getStatus() === h.INTERRUPT && (d.setStatus(h.PROGRESS), b._trigged = !1, c.transport && c.transport.send())
                }), b._trigged = !1, b.owner.trigger("startUpload"), a.nextTick(b.__tick))
            }, stop: function (a) {
                var b = this;
                b.runing !== !1 && (b.runing = !1, a && f.each(b.pool, function (a, b) {
                    b.transport && b.transport.abort(), b.file.setStatus(h.INTERRUPT)
                }), b.owner.trigger("stopUpload"))
            }, isInProgress: function () {
                return !!this.runing
            }, getStats: function () {
                return this.request("get-stats")
            }, skipFile: function (a, b) {
                a = this.request("get-file", a), a.setStatus(b || h.COMPLETE), a.skipped = !0, a.blocks && f.each(a.blocks, function (a, b) {
                    var c = b.transport;
                    c && (c.abort(), c.destroy(), delete b.transport)
                }), this.owner.trigger("uploadSkip", a)
            }, _tick: function () {
                var b, c, d = this, e = d.options;
                return d._promise ? d._promise.always(d.__tick) : (d.pool.length < e.threads && (c = d._nextBlock()) ? (d._trigged = !1, b = function (b) {
                    d._promise = null, b && b.file && d._startSend(b), a.nextTick(d.__tick)
                }, d._promise = g(c) ? c.always(b) : b(c)) : d.remaning || d.getStats().numOfQueue || (d.runing = !1, d._trigged || a.nextTick(function () {
                    d.owner.trigger("uploadFinished")
                }), d._trigged = !0), void 0)
            }, _nextBlock: function () {
                var a, b, c = this, d = c._act, f = c.options;
                return d && d.has() && d.file.getStatus() === h.PROGRESS ? (f.prepareNextFile && !c.pending.length && c._prepareNextFile(), d.fetch()) : c.runing ? (!c.pending.length && c.getStats().numOfQueue && c._prepareNextFile(), a = c.pending.shift(), b = function (a) {
                    return a ? (d = e(a, f.chunked ? f.chunkSize : 0), c._act = d, d.fetch()) : null
                }, g(a) ? a.then(b) : b(a)) : void 0
            }, _prepareNextFile: function () {
                var a, b = this, c = b.request("fetch-file"), d = b.pending;
                c && (a = b.request("before-send-file", c, function () {
                    return c.getStatus() === h.QUEUED ? (b.owner.trigger("uploadStart", c), c.setStatus(h.PROGRESS), c) : b._finishFile(c)
                }), a.done(function () {
                    var b = f.inArray(a, d);
                    ~b && d.splice(b, 1, c)
                }), a.fail(function (a) {
                    c.setStatus(h.ERROR, a), b.owner.trigger("uploadError", c, type), b.owner.trigger("uploadComplete", c)
                }), d.push(a))
            }, _popBlock: function (a) {
                var b = f.inArray(a, this.pool);
                this.pool.splice(b, 1), a.file.remaning--, this.remaning--
            }, _startSend: function (b) {
                var c, d = this, e = b.file;
                d.pool.push(b), d.remaning++, b.blob = 1 === b.chunks ? e.source : e.source.slice(b.start, b.end), c = d.request("before-send", b, function () {
                    e.getStatus() === h.PROGRESS ? d._doSend(b) : (d._popBlock(b), a.nextTick(d.__tick))
                }), c.fail(function () {
                    1 === e.remaning ? d._finishFile(e).always(function () {
                        b.percentage = 1, d._popBlock(b), d.owner.trigger("uploadComplete", e), a.nextTick(d.__tick)
                    }) : (b.percentage = 1, d._popBlock(b), a.nextTick(d.__tick))
                })
            }, _doSend: function (b) {
                var c = this, e = c.owner, g = c.options, i = b.file, j = new d(g), k = f.extend({}, g.formData), l = f.extend({}, g.headers);
                b.transport = j, j.on("destroy", function () {
                    delete b.transport, c._popBlock(b), a.nextTick(c.__tick)
                }), j.on("progress", function (a) {
                    var c = 0, d = 0;
                    c = b.percentage = a, b.chunks > 1 && (f.each(i.blocks, function (a, b) {
                        d += (b.percentage || 0) * (b.end - b.start)
                    }), c = d / i.size), e.trigger("uploadProgress", i, c || 0)
                }), j.on("error", function (a) {
                    b.retried = b.retried || 0, b.chunks > 1 && ~"http,abort".indexOf(a) && b.retried < g.chunkRetry ? (b.retried++, j.send()) : (i.setStatus(h.ERROR, a), e.trigger("uploadError", i, a), e.trigger("uploadComplete", i))
                }), j.on("load", function () {
                    var a, d, f = j.getResponseAsJson() || {};
                    return f._raw = j.getResponse(), d = function (b) {
                        a = b
                    }, e.trigger("uploadAccept", b, f, d) || (a = a || "server"), a ? (j.trigger("error", a), void 0) : (1 === i.remaning ? c._finishFile(i, f) : j.destroy(), void 0)
                }), k = f.extend(k, {id: i.id, name: i.name, type: i.type, lastModifiedDate: i.lastModifiedDate, size: i.size}), b.chunks > 1 && f.extend(k, {
                    chunks: b.chunks,
                    chunk: b.chunk
                }), e.trigger("uploadBeforeSend", b, k, l), j.appendBlob(g.fileVal, b.blob, i.name), j.append(k), j.setRequestHeader(l), j.send()
            }, _finishFile: function (a, b, c) {
                var d = this.owner;
                return d.request("after-send-file", arguments, function () {
                    a.setStatus(h.COMPLETE), d.trigger("uploadSuccess", a, b, c)
                }).fail(function (b) {
                    a.getStatus() === h.PROGRESS && a.setStatus(h.ERROR, b), d.trigger("uploadError", a, b)
                }).always(function () {
                    d.trigger("uploadComplete", a)
                })
            }
        })
    }), c("widgets/validator", ["base", "uploader", "file", "widgets/widget"], function (a, b, c) {
        var d, e = a.$, f = {};
        return d = {
            addValidator: function (a, b) {
                f[a] = b
            }, removeValidator: function (a) {
                delete f[a]
            }
        }, b.register({
            init: function () {
                var a = this;
                e.each(f, function () {
                    this.call(a.owner)
                })
            }
        }), d.addValidator("fileNumLimit", function () {
            var a = this, b = a.options, c = 0, d = b.fileNumLimit >> 0, e = !0;
            d && (a.on("beforeFileQueued", function () {
                return c >= d && e && (e = !1, this.trigger("error", "Q_EXCEED_NUM_LIMIT", d), setTimeout(function () {
                    e = !0
                }, 1)), c >= d ? !1 : !0
            }), a.on("fileQueued", function () {
                c++
            }), a.on("fileDequeued", function () {
                c--
            }))
        }), d.addValidator("fileSizeLimit", function () {
            var a = this, b = a.options, c = 0, d = b.fileSizeLimit >> 0, e = !0;
            d && (a.on("beforeFileQueued", function (a) {
                var b = c + a.size > d;
                return b && e && (e = !1, this.trigger("error", "Q_EXCEED_SIZE_LIMIT", d), setTimeout(function () {
                    e = !0
                }, 1)), b ? !1 : !0
            }), a.on("fileQueued", function (a) {
                c += a.size
            }), a.on("fileDequeued", function (a) {
                c -= a.size
            }))
        }), d.addValidator("fileSingleSizeLimit", function () {
            var a = this, b = a.options, d = b.fileSingleSizeLimit;
            d && a.on("fileQueued", function (a) {
                a.size > d && a.setStatus(c.Status.INVALID, "exceed_size")
            })
        }), d.addValidator("duplicate", function () {
            function a(a) {
                for (var b, c = 0, d = 0, e = a.length; e > d; d++) b = a.charCodeAt(d), c = b + (c << 6) + (c << 16) - c;
                return c
            }

            var b = this, c = b.options, d = {};
            c.duplicate || (b.on("beforeFileQueued", function (b) {
                var c = a(b.name + b.size + b.lastModifiedDate);
                return d[c] ? !1 : void 0
            }), b.on("fileQueued", function (b) {
                var c = a(b.name + b.size + b.lastModifiedDate);
                d[c] = !0
            }), b.on("fileDequeued", function (b) {
                var c = a(b.name + b.size + b.lastModifiedDate);
                delete d[c]
            }))
        }), d
    }), function (b) {
        var c, d, e, f, g, h, i = function (a) {
            return a && a.charAt(0).toUpperCase() + a.substr(1)
        }, j = "WebUploader", k = b.base;
        for (c in b) if (d = k, b.hasOwnProperty(c)) {
            for (e = c.split("/"), g = i(e.pop()); f = i(e.shift());) d[f] = d[f] || {}, d = d[f];
            d[g] = b[c]
        }
        "object" == typeof module && "object" == typeof module.exports ? module.exports = k : a.define && a.define.amd ? a.define("../build/outro", j, k) : (h = a[j], a[j] = k, a[j].noConflict = function () {
            a[j] = h
        })
    }(b.modules)
}(this);