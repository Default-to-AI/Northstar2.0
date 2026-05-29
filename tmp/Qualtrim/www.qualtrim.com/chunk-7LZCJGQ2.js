import {
    a as H,
    b as G
} from "./chunk-TXK3PDXI.js";

function b(e) {
    return typeof e == "function"
}

function Oo(e) {
    return e && b(e.schedule)
}

function ca(e) {
    return e[e.length - 1]
}

function xt(e) {
    return b(ca(e)) ? e.pop() : void 0
}

function Se(e) {
    return Oo(ca(e)) ? e.pop() : void 0
}

function Id(e, t) {
    return typeof ca(e) == "number" ? e.pop() : t
}

function Cd(e, t, n, r) {
    function o(i) {
        return i instanceof n ? i : new n(function(s) {
            s(i)
        })
    }
    return new(n || (n = Promise))(function(i, s) {
        function a(l) {
            try {
                u(r.next(l))
            } catch (d) {
                s(d)
            }
        }

        function c(l) {
            try {
                u(r.throw(l))
            } catch (d) {
                s(d)
            }
        }

        function u(l) {
            l.done ? i(l.value) : o(l.value).then(a, c)
        }
        u((r = r.apply(e, t || [])).next())
    })
}

function wd(e) {
    var t = typeof Symbol == "function" && Symbol.iterator,
        n = t && e[t],
        r = 0;
    if (n) return n.call(e);
    if (e && typeof e.length == "number") return {
        next: function() {
            return e && r >= e.length && (e = void 0), {
                value: e && e[r++],
                done: !e
            }
        }
    };
    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
}

function qt(e) {
    return this instanceof qt ? (this.v = e, this) : new qt(e)
}

function bd(e, t, n) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var r = n.apply(e, t || []),
        o, i = [];
    return o = {}, s("next"), s("throw"), s("return"), o[Symbol.asyncIterator] = function() {
        return this
    }, o;

    function s(f) {
        r[f] && (o[f] = function(p) {
            return new Promise(function(h, y) {
                i.push([f, p, h, y]) > 1 || a(f, p)
            })
        })
    }

    function a(f, p) {
        try {
            c(r[f](p))
        } catch (h) {
            d(i[0][3], h)
        }
    }

    function c(f) {
        f.value instanceof qt ? Promise.resolve(f.value.v).then(u, l) : d(i[0][2], f)
    }

    function u(f) {
        a("next", f)
    }

    function l(f) {
        a("throw", f)
    }

    function d(f, p) {
        f(p), i.shift(), i.length && a(i[0][0], i[0][1])
    }
}

function Td(e) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var t = e[Symbol.asyncIterator],
        n;
    return t ? t.call(e) : (e = typeof wd == "function" ? wd(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
        return this
    }, n);

    function r(i) {
        n[i] = e[i] && function(s) {
            return new Promise(function(a, c) {
                s = e[i](s), o(a, c, s.done, s.value)
            })
        }
    }

    function o(i, s, a, c) {
        Promise.resolve(c).then(function(u) {
            i({
                value: u,
                done: a
            })
        }, s)
    }
}
var xn = e => e && typeof e.length == "number" && typeof e != "function";

function Fo(e) {
    return b(e ? .then)
}

function At(e) {
    let n = e(r => {
        Error.call(r), r.stack = new Error().stack
    });
    return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n
}
var ko = At(e => function(n) {
    e(this), this.message = n ? `${n.length} errors occurred during unsubscription:
${n.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}` : "", this.name = "UnsubscriptionError", this.errors = n
});

function Zt(e, t) {
    if (e) {
        let n = e.indexOf(t);
        0 <= n && e.splice(n, 1)
    }
}
var W = class e {
    constructor(t) {
        this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null
    }
    unsubscribe() {
        let t;
        if (!this.closed) {
            this.closed = !0;
            let {
                _parentage: n
            } = this;
            if (n)
                if (this._parentage = null, Array.isArray(n))
                    for (let i of n) i.remove(this);
                else n.remove(this);
            let {
                initialTeardown: r
            } = this;
            if (b(r)) try {
                r()
            } catch (i) {
                t = i instanceof ko ? i.errors : [i]
            }
            let {
                _finalizers: o
            } = this;
            if (o) {
                this._finalizers = null;
                for (let i of o) try {
                    _d(i)
                } catch (s) {
                    t = t ? ? [], s instanceof ko ? t = [...t, ...s.errors] : t.push(s)
                }
            }
            if (t) throw new ko(t)
        }
    }
    add(t) {
        var n;
        if (t && t !== this)
            if (this.closed) _d(t);
            else {
                if (t instanceof e) {
                    if (t.closed || t._hasParent(this)) return;
                    t._addParent(this)
                }(this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t)
            }
    }
    _hasParent(t) {
        let {
            _parentage: n
        } = this;
        return n === t || Array.isArray(n) && n.includes(t)
    }
    _addParent(t) {
        let {
            _parentage: n
        } = this;
        this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
    }
    _removeParent(t) {
        let {
            _parentage: n
        } = this;
        n === t ? this._parentage = null : Array.isArray(n) && Zt(n, t)
    }
    remove(t) {
        let {
            _finalizers: n
        } = this;
        n && Zt(n, t), t instanceof e && t._removeParent(this)
    }
};
W.EMPTY = (() => {
    let e = new W;
    return e.closed = !0, e
})();
var ua = W.EMPTY;

function Po(e) {
    return e instanceof W || e && "closed" in e && b(e.remove) && b(e.add) && b(e.unsubscribe)
}

function _d(e) {
    b(e) ? e() : e.unsubscribe()
}
var Le = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1
};
var An = {
    setTimeout(e, t, ...n) {
        let {
            delegate: r
        } = An;
        return r ? .setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
    },
    clearTimeout(e) {
        let {
            delegate: t
        } = An;
        return (t ? .clearTimeout || clearTimeout)(e)
    },
    delegate: void 0
};

function Lo(e) {
    An.setTimeout(() => {
        let {
            onUnhandledError: t
        } = Le;
        if (t) t(e);
        else throw e
    })
}

function je() {}
var Md = la("C", void 0, void 0);

function Sd(e) {
    return la("E", void 0, e)
}

function Nd(e) {
    return la("N", e, void 0)
}

function la(e, t, n) {
    return {
        kind: e,
        value: t,
        error: n
    }
}
var Yt = null;

function Rn(e) {
    if (Le.useDeprecatedSynchronousErrorHandling) {
        let t = !Yt;
        if (t && (Yt = {
                errorThrown: !1,
                error: null
            }), e(), t) {
            let {
                errorThrown: n,
                error: r
            } = Yt;
            if (Yt = null, n) throw r
        }
    } else e()
}

function xd(e) {
    Le.useDeprecatedSynchronousErrorHandling && Yt && (Yt.errorThrown = !0, Yt.error = e)
}
var Qt = class extends W {
        constructor(t) {
            super(), this.isStopped = !1, t ? (this.destination = t, Po(t) && t.add(this)) : this.destination = fv
        }
        static create(t, n, r) {
            return new Ve(t, n, r)
        }
        next(t) {
            this.isStopped ? fa(Nd(t), this) : this._next(t)
        }
        error(t) {
            this.isStopped ? fa(Sd(t), this) : (this.isStopped = !0, this._error(t))
        }
        complete() {
            this.isStopped ? fa(Md, this) : (this.isStopped = !0, this._complete())
        }
        unsubscribe() {
            this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
        }
        _next(t) {
            this.destination.next(t)
        }
        _error(t) {
            try {
                this.destination.error(t)
            } finally {
                this.unsubscribe()
            }
        }
        _complete() {
            try {
                this.destination.complete()
            } finally {
                this.unsubscribe()
            }
        }
    },
    lv = Function.prototype.bind;

function da(e, t) {
    return lv.call(e, t)
}
var pa = class {
        constructor(t) {
            this.partialObserver = t
        }
        next(t) {
            let {
                partialObserver: n
            } = this;
            if (n.next) try {
                n.next(t)
            } catch (r) {
                jo(r)
            }
        }
        error(t) {
            let {
                partialObserver: n
            } = this;
            if (n.error) try {
                n.error(t)
            } catch (r) {
                jo(r)
            } else jo(t)
        }
        complete() {
            let {
                partialObserver: t
            } = this;
            if (t.complete) try {
                t.complete()
            } catch (n) {
                jo(n)
            }
        }
    },
    Ve = class extends Qt {
        constructor(t, n, r) {
            super();
            let o;
            if (b(t) || !t) o = {
                next: t ? ? void 0,
                error: n ? ? void 0,
                complete: r ? ? void 0
            };
            else {
                let i;
                this && Le.useDeprecatedNextContext ? (i = Object.create(t), i.unsubscribe = () => this.unsubscribe(), o = {
                    next: t.next && da(t.next, i),
                    error: t.error && da(t.error, i),
                    complete: t.complete && da(t.complete, i)
                }) : o = t
            }
            this.destination = new pa(o)
        }
    };

function jo(e) {
    Le.useDeprecatedSynchronousErrorHandling ? xd(e) : Lo(e)
}

function dv(e) {
    throw e
}

function fa(e, t) {
    let {
        onStoppedNotification: n
    } = Le;
    n && An.setTimeout(() => n(e, t))
}
var fv = {
    closed: !0,
    next: je,
    error: dv,
    complete: je
};
var On = typeof Symbol == "function" && Symbol.observable || "@@observable";

function X(e) {
    return e
}

function pv(...e) {
    return ha(e)
}

function ha(e) {
    return e.length === 0 ? X : e.length === 1 ? e[0] : function(n) {
        return e.reduce((r, o) => o(r), n)
    }
}
var S = (() => {
    class e {
        constructor(n) {
            n && (this._subscribe = n)
        }
        lift(n) {
            let r = new e;
            return r.source = this, r.operator = n, r
        }
        subscribe(n, r, o) {
            let i = gv(n) ? n : new Ve(n, r, o);
            return Rn(() => {
                let {
                    operator: s,
                    source: a
                } = this;
                i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
            }), i
        }
        _trySubscribe(n) {
            try {
                return this._subscribe(n)
            } catch (r) {
                n.error(r)
            }
        }
        forEach(n, r) {
            return r = Ad(r), new r((o, i) => {
                let s = new Ve({
                    next: a => {
                        try {
                            n(a)
                        } catch (c) {
                            i(c), s.unsubscribe()
                        }
                    },
                    error: i,
                    complete: o
                });
                this.subscribe(s)
            })
        }
        _subscribe(n) {
            var r;
            return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)
        }[On]() {
            return this
        }
        pipe(...n) {
            return ha(n)(this)
        }
        toPromise(n) {
            return n = Ad(n), new n((r, o) => {
                let i;
                this.subscribe(s => i = s, s => o(s), () => r(i))
            })
        }
    }
    return e.create = t => new e(t), e
})();

function Ad(e) {
    var t;
    return (t = e ? ? Le.Promise) !== null && t !== void 0 ? t : Promise
}

function hv(e) {
    return e && b(e.next) && b(e.error) && b(e.complete)
}

function gv(e) {
    return e && e instanceof Qt || hv(e) && Po(e)
}

function Vo(e) {
    return b(e[On])
}

function Bo(e) {
    return Symbol.asyncIterator && b(e ? .[Symbol.asyncIterator])
}

function Ho(e) {
    return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
}

function mv() {
    return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator
}
var $o = mv();

function Uo(e) {
    return b(e ? .[$o])
}

function zo(e) {
    return bd(this, arguments, function*() {
        let n = e.getReader();
        try {
            for (;;) {
                let {
                    value: r,
                    done: o
                } = yield qt(n.read());
                if (o) return yield qt(void 0);
                yield yield qt(r)
            }
        } finally {
            n.releaseLock()
        }
    })
}

function Go(e) {
    return b(e ? .getReader)
}

function x(e) {
    if (e instanceof S) return e;
    if (e != null) {
        if (Vo(e)) return yv(e);
        if (xn(e)) return vv(e);
        if (Fo(e)) return Dv(e);
        if (Bo(e)) return Rd(e);
        if (Uo(e)) return Ev(e);
        if (Go(e)) return Iv(e)
    }
    throw Ho(e)
}

function yv(e) {
    return new S(t => {
        let n = e[On]();
        if (b(n.subscribe)) return n.subscribe(t);
        throw new TypeError("Provided object does not correctly implement Symbol.observable")
    })
}

function vv(e) {
    return new S(t => {
        for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
        t.complete()
    })
}

function Dv(e) {
    return new S(t => {
        e.then(n => {
            t.closed || (t.next(n), t.complete())
        }, n => t.error(n)).then(null, Lo)
    })
}

function Ev(e) {
    return new S(t => {
        for (let n of e)
            if (t.next(n), t.closed) return;
        t.complete()
    })
}

function Rd(e) {
    return new S(t => {
        wv(e, t).catch(n => t.error(n))
    })
}

function Iv(e) {
    return Rd(zo(e))
}

function wv(e, t) {
    var n, r, o, i;
    return Cd(this, void 0, void 0, function*() {
        try {
            for (n = Td(e); r = yield n.next(), !r.done;) {
                let s = r.value;
                if (t.next(s), t.closed) return
            }
        } catch (s) {
            o = {
                error: s
            }
        } finally {
            try {
                r && !r.done && (i = n.return) && (yield i.call(n))
            } finally {
                if (o) throw o.error
            }
        }
        t.complete()
    })
}

function ce(e, t, n, r = 0, o = !1) {
    let i = t.schedule(function() {
        n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
    }, r);
    if (e.add(i), !o) return i
}

function ga(e) {
    return b(e ? .lift)
}

function I(e) {
    return t => {
        if (ga(t)) return t.lift(function(n) {
            try {
                return e(n, this)
            } catch (r) {
                this.error(r)
            }
        });
        throw new TypeError("Unable to lift unknown Observable type")
    }
}

function w(e, t, n, r, o) {
    return new ma(e, t, n, r, o)
}
var ma = class extends Qt {
    constructor(t, n, r, o, i, s) {
        super(t), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = n ? function(a) {
            try {
                n(a)
            } catch (c) {
                t.error(c)
            }
        } : super._next, this._error = o ? function(a) {
            try {
                o(a)
            } catch (c) {
                t.error(c)
            } finally {
                this.unsubscribe()
            }
        } : super._error, this._complete = r ? function() {
            try {
                r()
            } catch (a) {
                t.error(a)
            } finally {
                this.unsubscribe()
            }
        } : super._complete
    }
    unsubscribe() {
        var t;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            let {
                closed: n
            } = this;
            super.unsubscribe(), !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this))
        }
    }
};

function Fn(e, t = 0) {
    return I((n, r) => {
        n.subscribe(w(r, o => ce(r, e, () => r.next(o), t), () => ce(r, e, () => r.complete(), t), o => ce(r, e, () => r.error(o), t)))
    })
}

function Wo(e, t = 0) {
    return I((n, r) => {
        r.add(e.schedule(() => n.subscribe(r), t))
    })
}

function Od(e, t) {
    return x(e).pipe(Wo(t), Fn(t))
}

function Fd(e, t) {
    return x(e).pipe(Wo(t), Fn(t))
}

function kd(e, t) {
    return new S(n => {
        let r = 0;
        return t.schedule(function() {
            r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule())
        })
    })
}

function Pd(e, t) {
    return new S(n => {
        let r;
        return ce(n, t, () => {
            r = e[$o](), ce(n, t, () => {
                let o, i;
                try {
                    ({
                        value: o,
                        done: i
                    } = r.next())
                } catch (s) {
                    n.error(s);
                    return
                }
                i ? n.complete() : n.next(o)
            }, 0, !0)
        }), () => b(r ? .return) && r.return()
    })
}

function qo(e, t) {
    if (!e) throw new Error("Iterable cannot be null");
    return new S(n => {
        ce(n, t, () => {
            let r = e[Symbol.asyncIterator]();
            ce(n, t, () => {
                r.next().then(o => {
                    o.done ? n.complete() : n.next(o.value)
                })
            }, 0, !0)
        })
    })
}

function Ld(e, t) {
    return qo(zo(e), t)
}

function jd(e, t) {
    if (e != null) {
        if (Vo(e)) return Od(e, t);
        if (xn(e)) return kd(e, t);
        if (Fo(e)) return Fd(e, t);
        if (Bo(e)) return qo(e, t);
        if (Uo(e)) return Pd(e, t);
        if (Go(e)) return Ld(e, t)
    }
    throw Ho(e)
}

function Ne(e, t) {
    return t ? jd(e, t) : x(e)
}

function kn(...e) {
    let t = Se(e);
    return Ne(e, t)
}
var {
    isArray: Cv
} = Array, {
    getPrototypeOf: bv,
    prototype: Tv,
    keys: _v
} = Object;

function Zo(e) {
    if (e.length === 1) {
        let t = e[0];
        if (Cv(t)) return {
            args: t,
            keys: null
        };
        if (Mv(t)) {
            let n = _v(t);
            return {
                args: n.map(r => t[r]),
                keys: n
            }
        }
    }
    return {
        args: e,
        keys: null
    }
}

function Mv(e) {
    return e && typeof e == "object" && bv(e) === Tv
}

function ge(e, t) {
    return I((n, r) => {
        let o = 0;
        n.subscribe(w(r, i => {
            r.next(e.call(t, i, o++))
        }))
    })
}
var {
    isArray: Sv
} = Array;

function Nv(e, t) {
    return Sv(t) ? e(...t) : e(t)
}

function Pn(e) {
    return ge(t => Nv(e, t))
}

function Yo(e, t) {
    return e.reduce((n, r, o) => (n[r] = t[o], n), {})
}

function xv(...e) {
    let t = xt(e),
        {
            args: n,
            keys: r
        } = Zo(e),
        o = new S(i => {
            let {
                length: s
            } = n;
            if (!s) {
                i.complete();
                return
            }
            let a = new Array(s),
                c = s,
                u = s;
            for (let l = 0; l < s; l++) {
                let d = !1;
                x(n[l]).subscribe(w(i, f => {
                    d || (d = !0, u--), a[l] = f
                }, () => c--, void 0, () => {
                    (!c || !d) && (u || i.next(r ? Yo(r, a) : a), i.complete())
                }))
            }
        });
    return t ? o.pipe(Pn(t)) : o
}
var Qo = class extends W {
    constructor(t, n) {
        super()
    }
    schedule(t, n = 0) {
        return this
    }
};
var wr = {
    setInterval(e, t, ...n) {
        let {
            delegate: r
        } = wr;
        return r ? .setInterval ? r.setInterval(e, t, ...n) : setInterval(e, t, ...n)
    },
    clearInterval(e) {
        let {
            delegate: t
        } = wr;
        return (t ? .clearInterval || clearInterval)(e)
    },
    delegate: void 0
};
var Qe = class extends Qo {
    constructor(t, n) {
        super(t, n), this.scheduler = t, this.work = n, this.pending = !1
    }
    schedule(t, n = 0) {
        var r;
        if (this.closed) return this;
        this.state = t;
        let o = this.id,
            i = this.scheduler;
        return o != null && (this.id = this.recycleAsyncId(i, o, n)), this.pending = !0, this.delay = n, this.id = (r = this.id) !== null && r !== void 0 ? r : this.requestAsyncId(i, this.id, n), this
    }
    requestAsyncId(t, n, r = 0) {
        return wr.setInterval(t.flush.bind(t, this), r)
    }
    recycleAsyncId(t, n, r = 0) {
        if (r != null && this.delay === r && this.pending === !1) return n;
        n != null && wr.clearInterval(n)
    }
    execute(t, n) {
        if (this.closed) return new Error("executing a cancelled action");
        this.pending = !1;
        let r = this._execute(t, n);
        if (r) return r;
        this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
    }
    _execute(t, n) {
        let r = !1,
            o;
        try {
            this.work(t)
        } catch (i) {
            r = !0, o = i || new Error("Scheduled action threw falsy error")
        }
        if (r) return this.unsubscribe(), o
    }
    unsubscribe() {
        if (!this.closed) {
            let {
                id: t,
                scheduler: n
            } = this, {
                actions: r
            } = n;
            this.work = this.state = this.scheduler = null, this.pending = !1, Zt(r, this), t != null && (this.id = this.recycleAsyncId(n, t, null)), this.delay = null, super.unsubscribe()
        }
    }
};
var Cr = {
    now() {
        return (Cr.delegate || Date).now()
    },
    delegate: void 0
};
var Ln = class e {
    constructor(t, n = e.now) {
        this.schedulerActionCtor = t, this.now = n
    }
    schedule(t, n = 0, r) {
        return new this.schedulerActionCtor(this, t).schedule(r, n)
    }
};
Ln.now = Cr.now;
var Ke = class extends Ln {
    constructor(t, n = Ln.now) {
        super(t, n), this.actions = [], this._active = !1
    }
    flush(t) {
        let {
            actions: n
        } = this;
        if (this._active) {
            n.push(t);
            return
        }
        let r;
        this._active = !0;
        do
            if (r = t.execute(t.state, t.delay)) break; while (t = n.shift());
        if (this._active = !1, r) {
            for (; t = n.shift();) t.unsubscribe();
            throw r
        }
    }
};
var Je = new Ke(Qe),
    ya = Je;

function Ko(e) {
    return e instanceof Date && !isNaN(e)
}

function Kt(e = 0, t, n = ya) {
    let r = -1;
    return t != null && (Oo(t) ? n = t : r = t), new S(o => {
        let i = Ko(e) ? +e - n.now() : e;
        i < 0 && (i = 0);
        let s = 0;
        return n.schedule(function() {
            o.closed || (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete())
        }, i)
    })
}

function Av(e = 0, t = Je) {
    return e < 0 && (e = 0), Kt(e, e, t)
}

function Jo(e, t, n, r, o, i, s, a) {
    let c = [],
        u = 0,
        l = 0,
        d = !1,
        f = () => {
            d && !c.length && !u && t.complete()
        },
        p = y => u < r ? h(y) : c.push(y),
        h = y => {
            i && t.next(y), u++;
            let m = !1;
            x(n(y, l++)).subscribe(w(t, g => {
                o ? .(g), i ? p(g) : t.next(g)
            }, () => {
                m = !0
            }, void 0, () => {
                if (m) try {
                    for (u--; c.length && u < r;) {
                        let g = c.shift();
                        s ? ce(t, s, () => h(g)) : h(g)
                    }
                    f()
                } catch (g) {
                    t.error(g)
                }
            }))
        };
    return e.subscribe(w(t, p, () => {
        d = !0, f()
    })), () => {
        a ? .()
    }
}

function lt(e, t, n = 1 / 0) {
    return b(t) ? lt((r, o) => ge((i, s) => t(r, i, o, s))(x(e(r, o))), n) : (typeof t == "number" && (n = t), I((r, o) => Jo(r, o, e, n)))
}

function br(e = 1 / 0) {
    return lt(X, e)
}
var dt = new S(e => e.complete());

function Rv(...e) {
    let t = Se(e),
        n = Id(e, 1 / 0),
        r = e;
    return r.length ? r.length === 1 ? x(r[0]) : br(n)(Ne(r, t)) : dt
}

function Xe(e, t) {
    return I((n, r) => {
        let o = 0;
        n.subscribe(w(r, i => e.call(t, i, o++) && r.next(i)))
    })
}

function va(e) {
    return I((t, n) => {
        let r = null,
            o = !1,
            i;
        r = t.subscribe(w(n, void 0, void 0, s => {
            i = x(e(s, va(e)(t))), r ? (r.unsubscribe(), r = null, i.subscribe(n)) : o = !0
        })), o && (r.unsubscribe(), r = null, i.subscribe(n))
    })
}

function Vd(e, t = Je) {
    return I((n, r) => {
        let o = null,
            i = null,
            s = null,
            a = () => {
                if (o) {
                    o.unsubscribe(), o = null;
                    let u = i;
                    i = null, r.next(u)
                }
            };

        function c() {
            let u = s + e,
                l = t.now();
            if (l < u) {
                o = this.schedule(void 0, u - l), r.add(o);
                return
            }
            a()
        }
        n.subscribe(w(r, u => {
            i = u, s = t.now(), o || (o = t.schedule(c, e), r.add(o))
        }, () => {
            a(), r.complete()
        }, void 0, () => {
            i = o = null
        }))
    })
}

function Tr(e) {
    return I((t, n) => {
        try {
            t.subscribe(n)
        } finally {
            n.add(e)
        }
    })
}
var Be = At(e => function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence"
});

function Da(e) {
    return e <= 0 ? () => dt : I((t, n) => {
        let r = [];
        t.subscribe(w(n, o => {
            r.push(o), e < r.length && r.shift()
        }, () => {
            for (let o of r) n.next(o);
            n.complete()
        }, void 0, () => {
            r = null
        }))
    })
}

function Xo(e = Ov) {
    return I((t, n) => {
        let r = !1;
        t.subscribe(w(n, o => {
            r = !0, n.next(o)
        }, () => r ? n.complete() : n.error(e())))
    })
}

function Ov() {
    return new Be
}

function _r(e) {
    return I((t, n) => {
        let r = !1;
        t.subscribe(w(n, o => {
            r = !0, n.next(o)
        }, () => {
            r || n.next(e), n.complete()
        }))
    })
}

function Bd(e, t) {
    let n = arguments.length >= 2;
    return r => r.pipe(e ? Xe((o, i) => e(o, i, r)) : X, Da(1), n ? _r(t) : Xo(() => new Be))
}

function ei(e, t) {
    return I((n, r) => {
        let o = null,
            i = 0,
            s = !1,
            a = () => s && !o && r.complete();
        n.subscribe(w(r, c => {
            o ? .unsubscribe();
            let u = 0,
                l = i++;
            x(e(c, l)).subscribe(o = w(r, d => r.next(t ? t(c, d, l, u++) : d), () => {
                o = null, a()
            }))
        }, () => {
            s = !0, a()
        }))
    })
}

function Hd(e, t, n) {
    let r = b(e) || t || n ? {
        next: e,
        error: t,
        complete: n
    } : e;
    return r ? I((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(w(i, c => {
            var u;
            (u = r.next) === null || u === void 0 || u.call(r, c), i.next(c)
        }, () => {
            var c;
            a = !1, (c = r.complete) === null || c === void 0 || c.call(r), i.complete()
        }, c => {
            var u;
            a = !1, (u = r.error) === null || u === void 0 || u.call(r, c), i.error(c)
        }, () => {
            var c, u;
            a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)), (u = r.finalize) === null || u === void 0 || u.call(r)
        }))
    }) : X
}

function Ea() {
    return I((e, t) => {
        let n = null;
        e._refCount++;
        let r = w(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount) {
                n = null;
                return
            }
            let o = e._connection,
                i = n;
            n = null, o && (!i || o === i) && o.unsubscribe(), t.unsubscribe()
        });
        e.subscribe(r), r.closed || (n = e.connect())
    })
}
var Ia = class extends S {
    constructor(t, n) {
        super(), this.source = t, this.subjectFactory = n, this._subject = null, this._refCount = 0, this._connection = null, ga(t) && (this.lift = t.lift)
    }
    _subscribe(t) {
        return this.getSubject().subscribe(t)
    }
    getSubject() {
        let t = this._subject;
        return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject
    }
    _teardown() {
        this._refCount = 0;
        let {
            _connection: t
        } = this;
        this._subject = this._connection = null, t ? .unsubscribe()
    }
    connect() {
        let t = this._connection;
        if (!t) {
            t = this._connection = new W;
            let n = this.getSubject();
            t.add(this.source.subscribe(w(n, void 0, () => {
                this._teardown(), n.complete()
            }, r => {
                this._teardown(), n.error(r)
            }, () => this._teardown()))), t.closed && (this._connection = null, t = W.EMPTY)
        }
        return t
    }
    refCount() {
        return Ea()(this)
    }
};
var jn = {
    schedule(e) {
        let t = requestAnimationFrame,
            n = cancelAnimationFrame,
            {
                delegate: r
            } = jn;
        r && (t = r.requestAnimationFrame, n = r.cancelAnimationFrame);
        let o = t(i => {
            n = void 0, e(i)
        });
        return new W(() => n ? .(o))
    },
    requestAnimationFrame(...e) {
        let {
            delegate: t
        } = jn;
        return (t ? .requestAnimationFrame || requestAnimationFrame)(...e)
    },
    cancelAnimationFrame(...e) {
        let {
            delegate: t
        } = jn;
        return (t ? .cancelAnimationFrame || cancelAnimationFrame)(...e)
    },
    delegate: void 0
};
var $d = At(e => function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
});
var Ee = (() => {
        class e extends S {
            constructor() {
                super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
            }
            lift(n) {
                let r = new ti(this, this);
                return r.operator = n, r
            }
            _throwIfClosed() {
                if (this.closed) throw new $d
            }
            next(n) {
                Rn(() => {
                    if (this._throwIfClosed(), !this.isStopped) {
                        this.currentObservers || (this.currentObservers = Array.from(this.observers));
                        for (let r of this.currentObservers) r.next(n)
                    }
                })
            }
            error(n) {
                Rn(() => {
                    if (this._throwIfClosed(), !this.isStopped) {
                        this.hasError = this.isStopped = !0, this.thrownError = n;
                        let {
                            observers: r
                        } = this;
                        for (; r.length;) r.shift().error(n)
                    }
                })
            }
            complete() {
                Rn(() => {
                    if (this._throwIfClosed(), !this.isStopped) {
                        this.isStopped = !0;
                        let {
                            observers: n
                        } = this;
                        for (; n.length;) n.shift().complete()
                    }
                })
            }
            unsubscribe() {
                this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
            }
            get observed() {
                var n;
                return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0
            }
            _trySubscribe(n) {
                return this._throwIfClosed(), super._trySubscribe(n)
            }
            _subscribe(n) {
                return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n)
            }
            _innerSubscribe(n) {
                let {
                    hasError: r,
                    isStopped: o,
                    observers: i
                } = this;
                return r || o ? ua : (this.currentObservers = null, i.push(n), new W(() => {
                    this.currentObservers = null, Zt(i, n)
                }))
            }
            _checkFinalizedStatuses(n) {
                let {
                    hasError: r,
                    thrownError: o,
                    isStopped: i
                } = this;
                r ? n.error(o) : i && n.complete()
            }
            asObservable() {
                let n = new S;
                return n.source = this, n
            }
        }
        return e.create = (t, n) => new ti(t, n), e
    })(),
    ti = class extends Ee {
        constructor(t, n) {
            super(), this.destination = t, this.source = n
        }
        next(t) {
            var n, r;
            (r = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || r === void 0 || r.call(n, t)
        }
        error(t) {
            var n, r;
            (r = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || r === void 0 || r.call(n, t)
        }
        complete() {
            var t, n;
            (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || n === void 0 || n.call(t)
        }
        _subscribe(t) {
            var n, r;
            return (r = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && r !== void 0 ? r : ua
        }
    };
var Mr = class extends Ee {
    constructor(t) {
        super(), this._value = t
    }
    get value() {
        return this.getValue()
    }
    _subscribe(t) {
        let n = super._subscribe(t);
        return !n.closed && t.next(this._value), n
    }
    getValue() {
        let {
            hasError: t,
            thrownError: n,
            _value: r
        } = this;
        if (t) throw n;
        return this._throwIfClosed(), r
    }
    next(t) {
        super.next(this._value = t)
    }
};
var Jt = class extends Ee {
    constructor(t = 1 / 0, n = 1 / 0, r = Cr) {
        super(), this._bufferSize = t, this._windowTime = n, this._timestampProvider = r, this._buffer = [], this._infiniteTimeWindow = !0, this._infiniteTimeWindow = n === 1 / 0, this._bufferSize = Math.max(1, t), this._windowTime = Math.max(1, n)
    }
    next(t) {
        let {
            isStopped: n,
            _buffer: r,
            _infiniteTimeWindow: o,
            _timestampProvider: i,
            _windowTime: s
        } = this;
        n || (r.push(t), !o && r.push(i.now() + s)), this._trimBuffer(), super.next(t)
    }
    _subscribe(t) {
        this._throwIfClosed(), this._trimBuffer();
        let n = this._innerSubscribe(t),
            {
                _infiniteTimeWindow: r,
                _buffer: o
            } = this,
            i = o.slice();
        for (let s = 0; s < i.length && !t.closed; s += r ? 1 : 2) t.next(i[s]);
        return this._checkFinalizedStatuses(t), n
    }
    _trimBuffer() {
        let {
            _bufferSize: t,
            _timestampProvider: n,
            _buffer: r,
            _infiniteTimeWindow: o
        } = this, i = (o ? 1 : 2) * t;
        if (t < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o) {
            let s = n.now(),
                a = 0;
            for (let c = 1; c < r.length && r[c] <= s; c += 2) a = c;
            a && r.splice(0, a + 1)
        }
    }
};
var Fv = 1,
    wa, Ca = {};

function Ud(e) {
    return e in Ca ? (delete Ca[e], !0) : !1
}
var zd = {
    setImmediate(e) {
        let t = Fv++;
        return Ca[t] = !0, wa || (wa = Promise.resolve()), wa.then(() => Ud(t) && e()), t
    },
    clearImmediate(e) {
        Ud(e)
    }
};
var {
    setImmediate: kv,
    clearImmediate: Pv
} = zd, Sr = {
    setImmediate(...e) {
        let {
            delegate: t
        } = Sr;
        return (t ? .setImmediate || kv)(...e)
    },
    clearImmediate(e) {
        let {
            delegate: t
        } = Sr;
        return (t ? .clearImmediate || Pv)(e)
    },
    delegate: void 0
};
var ni = class extends Qe {
    constructor(t, n) {
        super(t, n), this.scheduler = t, this.work = n
    }
    requestAsyncId(t, n, r = 0) {
        return r !== null && r > 0 ? super.requestAsyncId(t, n, r) : (t.actions.push(this), t._scheduled || (t._scheduled = Sr.setImmediate(t.flush.bind(t, void 0))))
    }
    recycleAsyncId(t, n, r = 0) {
        var o;
        if (r != null ? r > 0 : this.delay > 0) return super.recycleAsyncId(t, n, r);
        let {
            actions: i
        } = t;
        n != null && ((o = i[i.length - 1]) === null || o === void 0 ? void 0 : o.id) !== n && (Sr.clearImmediate(n), t._scheduled === n && (t._scheduled = void 0))
    }
};
var ri = class extends Ke {
    flush(t) {
        this._active = !0;
        let n = this._scheduled;
        this._scheduled = void 0;
        let {
            actions: r
        } = this, o;
        t = t || r.shift();
        do
            if (o = t.execute(t.state, t.delay)) break; while ((t = r[0]) && t.id === n && r.shift());
        if (this._active = !1, o) {
            for (;
                (t = r[0]) && t.id === n && r.shift();) t.unsubscribe();
            throw o
        }
    }
};
var Lv = new ri(ni);
var oi = class extends Qe {
    constructor(t, n) {
        super(t, n), this.scheduler = t, this.work = n
    }
    schedule(t, n = 0) {
        return n > 0 ? super.schedule(t, n) : (this.delay = n, this.state = t, this.scheduler.flush(this), this)
    }
    execute(t, n) {
        return n > 0 || this.closed ? super.execute(t, n) : this._execute(t, n)
    }
    requestAsyncId(t, n, r = 0) {
        return r != null && r > 0 || r == null && this.delay > 0 ? super.requestAsyncId(t, n, r) : (t.flush(this), 0)
    }
};
var ii = class extends Ke {};
var jv = new ii(oi);
var si = class extends Qe {
    constructor(t, n) {
        super(t, n), this.scheduler = t, this.work = n
    }
    requestAsyncId(t, n, r = 0) {
        return r !== null && r > 0 ? super.requestAsyncId(t, n, r) : (t.actions.push(this), t._scheduled || (t._scheduled = jn.requestAnimationFrame(() => t.flush(void 0))))
    }
    recycleAsyncId(t, n, r = 0) {
        var o;
        if (r != null ? r > 0 : this.delay > 0) return super.recycleAsyncId(t, n, r);
        let {
            actions: i
        } = t;
        n != null && n === t._scheduled && ((o = i[i.length - 1]) === null || o === void 0 ? void 0 : o.id) !== n && (jn.cancelAnimationFrame(n), t._scheduled = void 0)
    }
};
var ai = class extends Ke {
    flush(t) {
        this._active = !0;
        let n;
        t ? n = t.id : (n = this._scheduled, this._scheduled = void 0);
        let {
            actions: r
        } = this, o;
        t = t || r.shift();
        do
            if (o = t.execute(t.state, t.delay)) break; while ((t = r[0]) && t.id === n && r.shift());
        if (this._active = !1, o) {
            for (;
                (t = r[0]) && t.id === n && r.shift();) t.unsubscribe();
            throw o
        }
    }
};
var Vv = new ai(si);

function Bv(e, t) {
    let n = b(e) ? e : () => e,
        r = o => o.error(n());
    return new S(t ? o => t.schedule(r, 0, o) : r)
}

function Hv(e) {
    return !!e && (e instanceof S || b(e.lift) && b(e.subscribe))
}

function $v(e, t) {
    let n = typeof t == "object";
    return new Promise((r, o) => {
        let i = !1,
            s;
        e.subscribe({
            next: a => {
                s = a, i = !0
            },
            error: o,
            complete: () => {
                i ? r(s) : n ? r(t.defaultValue) : o(new Be)
            }
        })
    })
}

function Uv(e, t) {
    let n = typeof t == "object";
    return new Promise((r, o) => {
        let i = new Ve({
            next: s => {
                r(s), i.unsubscribe()
            },
            error: o,
            complete: () => {
                n ? r(t.defaultValue) : o(new Be)
            }
        });
        e.subscribe(i)
    })
}
var zv = At(e => function(n = null) {
    e(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this.info = n
});

function Gd(e, t) {
    let {
        first: n,
        each: r,
        with: o = Gv,
        scheduler: i = t ? ? Je,
        meta: s = null
    } = Ko(e) ? {
        first: e
    } : typeof e == "number" ? {
        each: e
    } : e;
    if (n == null && r == null) throw new TypeError("No timeout provided.");
    return I((a, c) => {
        let u, l, d = null,
            f = 0,
            p = h => {
                l = ce(c, i, () => {
                    try {
                        u.unsubscribe(), x(o({
                            meta: s,
                            lastValue: d,
                            seen: f
                        })).subscribe(c)
                    } catch (y) {
                        c.error(y)
                    }
                }, h)
            };
        u = a.subscribe(w(c, h => {
            l ? .unsubscribe(), f++, c.next(d = h), r > 0 && p(r)
        }, void 0, void 0, () => {
            l ? .closed || l ? .unsubscribe(), d = null
        })), !f && p(n != null ? typeof n == "number" ? n : +n - i.now() : r)
    })
}

function Gv(e) {
    throw new zv(e)
}

function Wv(...e) {
    let t = Se(e),
        n = xt(e),
        {
            args: r,
            keys: o
        } = Zo(e);
    if (r.length === 0) return Ne([], t);
    let i = new S(qv(r, t, o ? s => Yo(o, s) : X));
    return n ? i.pipe(Pn(n)) : i
}

function qv(e, t, n = X) {
    return r => {
        Wd(t, () => {
            let {
                length: o
            } = e, i = new Array(o), s = o, a = o;
            for (let c = 0; c < o; c++) Wd(t, () => {
                let u = Ne(e[c], t),
                    l = !1;
                u.subscribe(w(r, d => {
                    i[c] = d, l || (l = !0, a--), a || r.next(n(i.slice()))
                }, () => {
                    --s || r.complete()
                }))
            }, r)
        }, r)
    }
}

function Wd(e, t, n) {
    e ? ce(n, e, t) : t()
}

function ci() {
    return br(1)
}

function Vn(...e) {
    return ci()(Ne(e, Se(e)))
}

function Zv(e) {
    return new S(t => {
        x(e()).subscribe(t)
    })
}
var Yv = ["addListener", "removeListener"],
    Qv = ["addEventListener", "removeEventListener"],
    Kv = ["on", "off"];

function ba(e, t, n, r) {
    if (b(n) && (r = n, n = void 0), r) return ba(e, t, n).pipe(Pn(r));
    let [o, i] = eD(e) ? Qv.map(s => a => e[s](t, a, n)) : Jv(e) ? Yv.map(qd(e, t)) : Xv(e) ? Kv.map(qd(e, t)) : [];
    if (!o && xn(e)) return lt(s => ba(s, t, n))(x(e));
    if (!o) throw new TypeError("Invalid event target");
    return new S(s => {
        let a = (...c) => s.next(1 < c.length ? c : c[0]);
        return o(a), () => i(a)
    })
}

function qd(e, t) {
    return n => r => e[n](t, r)
}

function Jv(e) {
    return b(e.addListener) && b(e.removeListener)
}

function Xv(e) {
    return b(e.on) && b(e.off)
}

function eD(e) {
    return b(e.addEventListener) && b(e.removeEventListener)
}
var tD = new S(je);
var {
    isArray: nD
} = Array;

function ui(e) {
    return e.length === 1 && nD(e[0]) ? e[0] : e
}

function rD(...e) {
    return e = ui(e), e.length === 1 ? x(e[0]) : new S(oD(e))
}

function oD(e) {
    return t => {
        let n = [];
        for (let r = 0; n && !t.closed && r < e.length; r++) n.push(x(e[r]).subscribe(w(t, o => {
            if (n) {
                for (let i = 0; i < n.length; i++) i !== r && n[i].unsubscribe();
                n = null
            }
            t.next(o)
        })))
    }
}

function iD(...e) {
    let t = xt(e),
        n = ui(e);
    return n.length ? new S(r => {
        let o = n.map(() => []),
            i = n.map(() => !1);
        r.add(() => {
            o = i = null
        });
        for (let s = 0; !r.closed && s < n.length; s++) x(n[s]).subscribe(w(r, a => {
            if (o[s].push(a), o.every(c => c.length)) {
                let c = o.map(u => u.shift());
                r.next(t ? t(...c) : c), o.some((u, l) => !u.length && i[l]) && r.complete()
            }
        }, () => {
            i[s] = !0, !o[s].length && r.complete()
        }));
        return () => {
            o = i = null
        }
    }) : dt
}

function Zd(e) {
    return I((t, n) => {
        let r = !1,
            o = null,
            i = null,
            s = !1,
            a = () => {
                if (i ? .unsubscribe(), i = null, r) {
                    r = !1;
                    let u = o;
                    o = null, n.next(u)
                }
                s && n.complete()
            },
            c = () => {
                i = null, s && n.complete()
            };
        t.subscribe(w(n, u => {
            r = !0, o = u, i || x(e(u)).subscribe(i = w(n, a, c))
        }, () => {
            s = !0, (!r || !i || i.closed) && n.complete()
        }))
    })
}

function sD(e, t = Je) {
    return Zd(() => Kt(e, t))
}

function li(e, t, n, r, o) {
    return (i, s) => {
        let a = n,
            c = t,
            u = 0;
        i.subscribe(w(s, l => {
            let d = u++;
            c = a ? e(c, l, d) : (a = !0, l), r && s.next(c)
        }, o && (() => {
            a && s.next(c), s.complete()
        })))
    }
}

function Yd(e, t) {
    return I(li(e, t, arguments.length >= 2, !1, !0))
}
var aD = (e, t) => (e.push(t), e);

function cD() {
    return I((e, t) => {
        Yd(aD, [])(e).subscribe(t)
    })
}

function Ta(e, t) {
    return b(t) ? lt(e, t, 1) : lt(e, 1)
}

function Qd(...e) {
    let t = Se(e);
    return I((n, r) => {
        ci()(Ne([n, ...e], t)).subscribe(r)
    })
}

function uD(...e) {
    return Qd(...e)
}

function di(e) {
    return e <= 0 ? () => dt : I((t, n) => {
        let r = 0;
        t.subscribe(w(n, o => {
            ++r <= e && (n.next(o), e <= r && n.complete())
        }))
    })
}

function lD() {
    return I((e, t) => {
        e.subscribe(w(t, je))
    })
}

function dD(e) {
    return ge(() => e)
}

function Kd(e, t = X) {
    return e = e ? ? fD, I((n, r) => {
        let o, i = !0;
        n.subscribe(w(r, s => {
            let a = t(s);
            (i || !e(o, a)) && (i = !1, o = a, r.next(s))
        }))
    })
}

function fD(e, t) {
    return e === t
}

function pD(...e) {
    return t => Vn(t, kn(...e))
}

function hD(e, t = 1 / 0, n) {
    return t = (t || 0) < 1 ? 1 / 0 : t, I((r, o) => Jo(r, o, e, t, void 0, !0, n))
}

function Jd(e, t) {
    let n = arguments.length >= 2;
    return r => r.pipe(e ? Xe((o, i) => e(o, i, r)) : X, di(1), n ? _r(t) : Xo(() => new Be))
}

function gD() {
    return I((e, t) => {
        let n, r = !1;
        e.subscribe(w(t, o => {
            let i = n;
            n = o, r && t.next([i, o]), r = !0
        }))
    })
}

function mD(e = 1 / 0) {
    let t;
    e && typeof e == "object" ? t = e : t = {
        count: e
    };
    let {
        count: n = 1 / 0,
        delay: r,
        resetOnSuccess: o = !1
    } = t;
    return n <= 0 ? X : I((i, s) => {
        let a = 0,
            c, u = () => {
                let l = !1;
                c = i.subscribe(w(s, d => {
                    o && (a = 0), s.next(d)
                }, void 0, d => {
                    if (a++ < n) {
                        let f = () => {
                            c ? (c.unsubscribe(), c = null, u()) : l = !0
                        };
                        if (r != null) {
                            let p = typeof r == "number" ? Kt(r) : x(r(d, a)),
                                h = w(s, () => {
                                    h.unsubscribe(), f()
                                }, () => {
                                    s.complete()
                                });
                            p.subscribe(h)
                        } else f()
                    } else s.error(d)
                })), l && (c.unsubscribe(), c = null, u())
            };
        u()
    })
}

function Xd(e, t) {
    return I(li(e, t, arguments.length >= 2, !0))
}

function ef(e = {}) {
    let {
        connector: t = () => new Ee,
        resetOnError: n = !0,
        resetOnComplete: r = !0,
        resetOnRefCountZero: o = !0
    } = e;
    return i => {
        let s, a, c, u = 0,
            l = !1,
            d = !1,
            f = () => {
                a ? .unsubscribe(), a = void 0
            },
            p = () => {
                f(), s = c = void 0, l = d = !1
            },
            h = () => {
                let y = s;
                p(), y ? .unsubscribe()
            };
        return I((y, m) => {
            u++, !d && !l && f();
            let g = c = c ? ? t();
            m.add(() => {
                u--, u === 0 && !d && !l && (a = _a(h, o))
            }), g.subscribe(m), !s && u > 0 && (s = new Ve({
                next: R => g.next(R),
                error: R => {
                    d = !0, f(), a = _a(p, n, R), g.error(R)
                },
                complete: () => {
                    l = !0, f(), a = _a(p, r), g.complete()
                }
            }), x(y).subscribe(s))
        })(i)
    }
}

function _a(e, t, ...n) {
    if (t === !0) {
        e();
        return
    }
    if (t === !1) return;
    let r = new Ve({
        next: () => {
            r.unsubscribe(), e()
        }
    });
    return x(t(...n)).subscribe(r)
}

function tf(e, t, n) {
    let r, o = !1;
    return e && typeof e == "object" ? {
        bufferSize: r = 1 / 0,
        windowTime: t = 1 / 0,
        refCount: o = !1,
        scheduler: n
    } = e : r = e ? ? 1 / 0, ef({
        connector: () => new Jt(r, t, n),
        resetOnError: !0,
        resetOnComplete: !1,
        resetOnRefCountZero: o
    })
}

function nf(e) {
    return Xe((t, n) => e <= n)
}

function rf(...e) {
    let t = Se(e);
    return I((n, r) => {
        (t ? Vn(e, n, t) : Vn(e, n)).subscribe(r)
    })
}

function fi(e) {
    return I((t, n) => {
        x(e).subscribe(w(n, () => n.complete(), je)), !n.closed && t.subscribe(n)
    })
}

function yD(e, t = !1) {
    return I((n, r) => {
        let o = 0;
        n.subscribe(w(r, i => {
            let s = e(i, o++);
            (s || t) && r.next(i), !s && r.complete()
        }))
    })
}

function vD(...e) {
    let t = xt(e);
    return I((n, r) => {
        let o = e.length,
            i = new Array(o),
            s = e.map(() => !1),
            a = !1;
        for (let c = 0; c < o; c++) x(e[c]).subscribe(w(r, u => {
            i[c] = u, !a && !s[c] && (s[c] = !0, (a = s.every(X)) && (s = null))
        }, je));
        n.subscribe(w(r, c => {
            if (a) {
                let u = [c, ...i];
                r.next(t ? t(...u) : u)
            }
        }))
    })
}
var Ma;

function pi() {
    return Ma
}

function et(e) {
    let t = Ma;
    return Ma = e, t
}
var of = Symbol("NotFound");

function Bn(e) {
    return e === of || e ? .name === "\u0275NotFound"
}
var ue = null,
    hi = !1,
    Sa = 1,
    DD = null,
    ee = Symbol("SIGNAL");

function M(e) {
    let t = ue;
    return ue = e, t
}

function vi() {
    return ue
}
var Xt = {
    version: 0,
    lastCleanEpoch: 0,
    dirty: !1,
    producers: void 0,
    producersTail: void 0,
    consumers: void 0,
    consumersTail: void 0,
    recomputing: !1,
    consumerAllowSignalWrites: !1,
    consumerIsAlwaysLive: !1,
    kind: "unknown",
    producerMustRecompute: () => !1,
    producerRecomputeValue: () => {},
    consumerMarkedDirty: () => {},
    consumerOnSignalRead: () => {}
};

function en(e) {
    if (hi) throw new Error("");
    if (ue === null) return;
    ue.consumerOnSignalRead(e);
    let t = ue.producersTail;
    if (t !== void 0 && t.producer === e) return;
    let n, r = ue.recomputing;
    if (r && (n = t !== void 0 ? t.nextProducer : ue.producers, n !== void 0 && n.producer === e)) {
        ue.producersTail = n, n.lastReadVersion = e.version;
        return
    }
    let o = e.consumersTail;
    if (o !== void 0 && o.consumer === ue && (!r || ID(o, ue))) return;
    let i = Un(ue),
        s = {
            producer: e,
            consumer: ue,
            nextProducer: n,
            prevConsumer: o,
            lastReadVersion: e.version,
            nextConsumer: void 0
        };
    ue.producersTail = s, t !== void 0 ? t.nextProducer = s : ue.producers = s, i && uf(e, s)
}

function sf() {
    Sa++
}

function Di(e) {
    if (!(Un(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Sa)) {
        if (!e.producerMustRecompute(e) && !$n(e)) {
            yi(e);
            return
        }
        e.producerRecomputeValue(e), yi(e)
    }
}

function Na(e) {
    if (e.consumers === void 0) return;
    let t = hi;
    hi = !0;
    try {
        for (let n = e.consumers; n !== void 0; n = n.nextConsumer) {
            let r = n.consumer;
            r.dirty || ED(r)
        }
    } finally {
        hi = t
    }
}

function xa() {
    return ue ? .consumerAllowSignalWrites !== !1
}

function ED(e) {
    e.dirty = !0, Na(e), e.consumerMarkedDirty ? .(e)
}

function yi(e) {
    e.dirty = !1, e.lastCleanEpoch = Sa
}

function tn(e) {
    return e && af(e), M(e)
}

function af(e) {
    e.producersTail = void 0, e.recomputing = !0
}

function Hn(e, t) {
    M(t), e && cf(e)
}

function cf(e) {
    e.recomputing = !1;
    let t = e.producersTail,
        n = t !== void 0 ? t.nextProducer : e.producers;
    if (n !== void 0) {
        if (Un(e))
            do n = Aa(n); while (n !== void 0);
        t !== void 0 ? t.nextProducer = void 0 : e.producers = void 0
    }
}

function $n(e) {
    for (let t = e.producers; t !== void 0; t = t.nextProducer) {
        let n = t.producer,
            r = t.lastReadVersion;
        if (r !== n.version || (Di(n), r !== n.version)) return !0
    }
    return !1
}

function nn(e) {
    if (Un(e)) {
        let t = e.producers;
        for (; t !== void 0;) t = Aa(t)
    }
    e.producers = void 0, e.producersTail = void 0, e.consumers = void 0, e.consumersTail = void 0
}

function uf(e, t) {
    let n = e.consumersTail,
        r = Un(e);
    if (n !== void 0 ? (t.nextConsumer = n.nextConsumer, n.nextConsumer = t) : (t.nextConsumer = void 0, e.consumers = t), t.prevConsumer = n, e.consumersTail = t, !r)
        for (let o = e.producers; o !== void 0; o = o.nextProducer) uf(o.producer, o)
}

function Aa(e) {
    let t = e.producer,
        n = e.nextProducer,
        r = e.nextConsumer,
        o = e.prevConsumer;
    if (e.nextConsumer = void 0, e.prevConsumer = void 0, r !== void 0 ? r.prevConsumer = o : t.consumersTail = o, o !== void 0) o.nextConsumer = r;
    else if (t.consumers = r, !Un(t)) {
        let i = t.producers;
        for (; i !== void 0;) i = Aa(i)
    }
    return n
}

function Un(e) {
    return e.consumerIsAlwaysLive || e.consumers !== void 0
}

function Ei(e) {
    DD ? .(e)
}

function ID(e, t) {
    let n = t.producersTail;
    if (n !== void 0) {
        let r = t.producers;
        do {
            if (r === e) return !0;
            if (r === n) break;
            r = r.nextProducer
        } while (r !== void 0)
    }
    return !1
}

function Ii(e, t) {
    return Object.is(e, t)
}

function xr(e, t) {
    let n = Object.create(wD);
    n.computation = e, t !== void 0 && (n.equal = t);
    let r = () => {
        if (Di(n), en(n), n.value === Nr) throw n.error;
        return n.value
    };
    return r[ee] = n, Ei(n), r
}
var gi = Symbol("UNSET"),
    mi = Symbol("COMPUTING"),
    Nr = Symbol("ERRORED"),
    wD = G(H({}, Xt), {
        value: gi,
        dirty: !0,
        error: null,
        equal: Ii,
        kind: "computed",
        producerMustRecompute(e) {
            return e.value === gi || e.value === mi
        },
        producerRecomputeValue(e) {
            if (e.value === mi) throw new Error("");
            let t = e.value;
            e.value = mi;
            let n = tn(e),
                r, o = !1;
            try {
                r = e.computation(), M(null), o = t !== gi && t !== Nr && r !== Nr && e.equal(t, r)
            } catch (i) {
                r = Nr, e.error = i
            } finally {
                Hn(e, n)
            }
            if (o) {
                e.value = t;
                return
            }
            e.value = r, e.version++
        }
    });

function CD() {
    throw new Error
}
var lf = CD;

function df(e) {
    lf(e)
}

function Ra(e) {
    lf = e
}
var bD = null;

function Oa(e, t) {
    let n = Object.create(wi);
    n.value = e, t !== void 0 && (n.equal = t);
    let r = () => ff(n);
    return r[ee] = n, Ei(n), [r, s => rn(n, s), s => Fa(n, s)]
}

function ff(e) {
    return en(e), e.value
}

function rn(e, t) {
    xa() || df(e), e.equal(e.value, t) || (e.value = t, TD(e))
}

function Fa(e, t) {
    xa() || df(e), rn(e, t(e.value))
}
var wi = G(H({}, Xt), {
    equal: Ii,
    value: void 0,
    kind: "signal"
});

function TD(e) {
    e.version++, sf(), Na(e), bD ? .(e)
}

function pf(e) {
    let t = M(null);
    try {
        return e()
    } finally {
        M(t)
    }
}
var hf = G(H({}, Xt), {
    consumerIsAlwaysLive: !0,
    consumerAllowSignalWrites: !0,
    dirty: !0,
    kind: "effect"
});

function gf(e) {
    if (e.dirty = !1, e.version > 0 && !$n(e)) return;
    e.version++;
    let t = tn(e);
    try {
        e.cleanup(), e.fn()
    } finally {
        Hn(e, t)
    }
}
var _i = "https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",
    D = class extends Error {
        code;
        constructor(t, n) {
            super(ht(t, n)), this.code = t
        }
    };

function _D(e) {
    return `NG0${Math.abs(e)}`
}

function ht(e, t) {
    return `${_D(e)}${t?": "+t:""}`
}
var $e = globalThis;

function k(e) {
    for (let t in e)
        if (e[t] === k) return t;
    throw Error("")
}

function vf(e, t) {
    for (let n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n])
}

function pt(e) {
    if (typeof e == "string") return e;
    if (Array.isArray(e)) return `[${e.map(pt).join(", ")}]`;
    if (e == null) return "" + e;
    let t = e.overriddenName || e.name;
    if (t) return `${t}`;
    let n = e.toString();
    if (n == null) return "" + n;
    let r = n.indexOf(`
`);
    return r >= 0 ? n.slice(0, r) : n
}

function Mi(e, t) {
    return e ? t ? `${e} ${t}` : e : t || ""
}
var MD = k({
    __forward_ref__: k
});

function Si(e) {
    return e.__forward_ref__ = Si, e.toString = function() {
        return pt(this())
    }, e
}

function oe(e) {
    return Ga(e) ? e() : e
}

function Ga(e) {
    return typeof e == "function" && e.hasOwnProperty(MD) && e.__forward_ref__ === Si
}

function Df(e, t, n) {
    e != t && Ef(n, e, t, "==")
}

function Ef(e, t, n, r) {
    throw new Error(`ASSERTION ERROR: ${e}` + (r == null ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
}

function A(e) {
    return {
        token: e.token,
        providedIn: e.providedIn || null,
        factory: e.factory,
        value: void 0
    }
}

function Gn(e) {
    return {
        providers: e.providers || [],
        imports: e.imports || []
    }
}

function kr(e) {
    return ND(e, Ni)
}

function SD(e) {
    return kr(e) !== null
}

function ND(e, t) {
    return e.hasOwnProperty(t) && e[t] || null
}

function xD(e) {
    let t = e ? .[Ni] ? ? null;
    return t || null
}

function Pa(e) {
    return e && e.hasOwnProperty(bi) ? e[bi] : null
}
var Ni = k({\
        u0275prov: k
    }),
    bi = k({\
        u0275inj: k
    }),
    T = class {
        _desc;
        ngMetadataName = "InjectionToken";\
        u0275prov;
        constructor(t, n) {
            this._desc = t, this.\u0275prov = void 0, typeof n == "number" ? this.__NG_ELEMENT_ID__ = n : n !== void 0 && (this.\u0275prov = A({
                token: this,
                providedIn: n.providedIn || "root",
                factory: n.factory
            }))
        }
        get multi() {
            return this
        }
        toString() {
            return `InjectionToken ${this._desc}`
        }
    };

function Wa(e) {
    return e && !!e.\u0275providers
}
var qa = k({\
        u0275cmp: k
    }),
    Za = k({\
        u0275dir: k
    }),
    Ya = k({\
        u0275pipe: k
    }),
    Qa = k({\
        u0275mod: k
    }),
    Rr = k({\
        u0275fac: k
    }),
    un = k({
        __NG_ELEMENT_ID__: k
    }),
    mf = k({
        __NG_ENV_ID__: k
    });

function le(e) {
    return typeof e == "string" ? e : e == null ? "" : String(e)
}

function If(e) {
    return typeof e == "function" ? e.name || e.toString() : typeof e == "object" && e != null && typeof e.type == "function" ? e.type.name || e.type.toString() : le(e)
}
var wf = k({
        ngErrorCode: k
    }),
    AD = k({
        ngErrorMessage: k
    }),
    RD = k({
        ngTokenPath: k
    });

function Ka(e, t) {
    return Cf("", -200, t)
}

function xi(e, t) {
    throw new D(-201, !1)
}

function Cf(e, t, n) {
    let r = new D(t, e);
    return r[wf] = t, r[AD] = e, n && (r[RD] = n), r
}

function OD(e) {
    return e[wf]
}
var La;

function bf() {
    return La
}

function me(e) {
    let t = La;
    return La = e, t
}

function Ja(e, t, n) {
    let r = kr(e);
    if (r && r.providedIn == "root") return r.value === void 0 ? r.value = r.factory() : r.value;
    if (n & 8) return null;
    if (t !== void 0) return t;
    xi(e, "Injector")
}
var FD = {},
    on = FD,
    kD = "__NG_DI_FLAG__",
    ja = class {
        injector;
        constructor(t) {
            this.injector = t
        }
        retrieve(t, n) {
            let r = sn(n) || 0;
            try {
                return this.injector.get(t, r & 8 ? null : on, r)
            } catch (o) {
                if (Bn(o)) return o;
                throw o
            }
        }
    };

function PD(e, t = 0) {
    let n = pi();
    if (n === void 0) throw new D(-203, !1);
    if (n === null) return Ja(e, void 0, t); {
        let r = LD(t),
            o = n.retrieve(e, r);
        if (Bn(o)) {
            if (r.optional) return null;
            throw o
        }
        return o
    }
}

function F(e, t = 0) {
    return (bf() || PD)(oe(e), t)
}

function v(e, t) {
    return F(e, sn(t))
}

function sn(e) {
    return typeof e > "u" || typeof e == "number" ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
}

function LD(e) {
    return {
        optional: !!(e & 8),
        host: !!(e & 1),
        self: !!(e & 2),
        skipSelf: !!(e & 4)
    }
}

function Va(e) {
    let t = [];
    for (let n = 0; n < e.length; n++) {
        let r = oe(e[n]);
        if (Array.isArray(r)) {
            if (r.length === 0) throw new D(900, !1);
            let o, i = 0;
            for (let s = 0; s < r.length; s++) {
                let a = r[s],
                    c = jD(a);
                typeof c == "number" ? c === -1 ? o = a.token : i |= c : o = a
            }
            t.push(F(o, i))
        } else t.push(F(r))
    }
    return t
}

function jD(e) {
    return e[kD]
}

function Rt(e, t) {
    let n = e.hasOwnProperty(Rr);
    return n ? e[Rr] : null
}

function Tf(e, t, n) {
    if (e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++) {
        let o = e[r],
            i = t[r];
        if (n && (o = n(o), i = n(i)), i !== o) return !1
    }
    return !0
}

function _f(e) {
    return e.flat(Number.POSITIVE_INFINITY)
}

function Ai(e, t) {
    e.forEach(n => Array.isArray(n) ? Ai(n, t) : t(n))
}

function Xa(e, t, n) {
    t >= e.length ? e.push(n) : e.splice(t, 0, n)
}

function Pr(e, t) {
    return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
}

function Mf(e, t) {
    let n = [];
    for (let r = 0; r < e; r++) n.push(t);
    return n
}

function Sf(e, t, n, r) {
    let o = e.length;
    if (o == t) e.push(n, r);
    else if (o === 1) e.push(r, e[0]), e[0] = n;
    else {
        for (o--, e.push(e[o - 1], e[o]); o > t;) {
            let i = o - 2;
            e[o] = e[i], o--
        }
        e[t] = n, e[t + 1] = r
    }
}

function Lr(e, t, n) {
    let r = Wn(e, t);
    return r >= 0 ? e[r | 1] = n : (r = ~r, Sf(e, r, t, n)), r
}

function Ri(e, t) {
    let n = Wn(e, t);
    if (n >= 0) return e[n | 1]
}

function Wn(e, t) {
    return VD(e, t, 1)
}

function VD(e, t, n) {
    let r = 0,
        o = e.length >> n;
    for (; o !== r;) {
        let i = r + (o - r >> 1),
            s = e[i << n];
        if (t === s) return i << n;
        s > t ? o = i : r = i + 1
    }
    return ~(o << n)
}
var Ft = {},
    ie = [],
    ln = new T(""),
    ec = new T("", -1),
    tc = new T(""),
    Or = class {
        get(t, n = on) {
            if (n === on) {
                let o = Cf("", -201);
                throw o.name = "\u0275NotFound", o
            }
            return n
        }
    };

function nc(e) {
    return e[Qa] || null
}

function nt(e) {
    return e[qa] || null
}

function rc(e) {
    return e[Za] || null
}

function oc(e) {
    return e[Ya] || null
}

function jr(e) {
    return {\
        u0275providers: e
    }
}

function Nf(...e) {
    return {\
        u0275providers: ic(!0, e),
        \u0275fromNgModule: !0
    }
}

function ic(e, ...t) {
    let n = [],
        r = new Set,
        o, i = s => {
            n.push(s)
        };
    return Ai(t, s => {
        let a = s;
        Ti(a, i, [], r) && (o || = [], o.push(a))
    }), o !== void 0 && xf(o, i), n
}

function xf(e, t) {
    for (let n = 0; n < e.length; n++) {
        let {
            ngModule: r,
            providers: o
        } = e[n];
        sc(o, i => {
            t(i, r)
        })
    }
}

function Ti(e, t, n, r) {
    if (e = oe(e), !e) return !1;
    let o = null,
        i = Pa(e),
        s = !i && nt(e);
    if (!i && !s) {
        let c = e.ngModule;
        if (i = Pa(c), i) o = c;
        else return !1
    } else {
        if (s && !s.standalone) return !1;
        o = e
    }
    let a = r.has(o);
    if (s) {
        if (a) return !1;
        if (r.add(o), s.dependencies) {
            let c = typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
            for (let u of c) Ti(u, t, n, r)
        }
    } else if (i) {
        if (i.imports != null && !a) {
            r.add(o);
            let u;
            try {
                Ai(i.imports, l => {
                    Ti(l, t, n, r) && (u || = [], u.push(l))
                })
            } finally {}
            u !== void 0 && xf(u, t)
        }
        if (!a) {
            let u = Rt(o) || (() => new o);
            t({
                provide: o,
                useFactory: u,
                deps: ie
            }, o), t({
                provide: tc,
                useValue: o,
                multi: !0
            }, o), t({
                provide: ln,
                useValue: () => F(o),
                multi: !0
            }, o)
        }
        let c = i.providers;
        if (c != null && !a) {
            let u = e;
            sc(c, l => {
                t(l, u)
            })
        }
    } else return !1;
    return o !== e && e.providers !== void 0
}

function sc(e, t) {
    for (let n of e) Wa(n) && (n = n.\u0275providers), Array.isArray(n) ? sc(n, t) : t(n)
}
var BD = k({
    provide: String,
    useValue: k
});

function Af(e) {
    return e !== null && typeof e == "object" && BD in e
}

function HD(e) {
    return !!(e && e.useExisting)
}

function $D(e) {
    return !!(e && e.useFactory)
}

function an(e) {
    return typeof e == "function"
}

function Rf(e) {
    return !!e.useClass
}
var ac = new T(""),
    Ci = {},
    yf = {},
    ka;

function qn() {
    return ka === void 0 && (ka = new Or), ka
}
var Ie = class {},
    cn = class extends Ie {
        parent;
        source;
        scopes;
        records = new Map;
        _ngOnDestroyHooks = new Set;
        _onDestroyHooks = [];
        get destroyed() {
            return this._destroyed
        }
        _destroyed = !1;
        injectorDefTypes;
        constructor(t, n, r, o) {
            super(), this.parent = n, this.source = r, this.scopes = o, Ha(t, s => this.processProvider(s)), this.records.set(ec, zn(void 0, this)), o.has("environment") && this.records.set(Ie, zn(void 0, this));
            let i = this.records.get(ac);
            i != null && typeof i.value == "string" && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(tc, ie, {
                self: !0
            }))
        }
        retrieve(t, n) {
            let r = sn(n) || 0;
            try {
                return this.get(t, on, r)
            } catch (o) {
                if (Bn(o)) return o;
                throw o
            }
        }
        destroy() {
            Ar(this), this._destroyed = !0;
            let t = M(null);
            try {
                for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
                let n = this._onDestroyHooks;
                this._onDestroyHooks = [];
                for (let r of n) r()
            } finally {
                this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), M(t)
            }
        }
        onDestroy(t) {
            return Ar(this), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t)
        }
        runInContext(t) {
            Ar(this);
            let n = et(this),
                r = me(void 0),
                o;
            try {
                return t()
            } finally {
                et(n), me(r)
            }
        }
        get(t, n = on, r) {
            if (Ar(this), t.hasOwnProperty(mf)) return t[mf](this);
            let o = sn(r),
                i, s = et(this),
                a = me(void 0);
            try {
                if (!(o & 4)) {
                    let u = this.records.get(t);
                    if (u === void 0) {
                        let l = qD(t) && kr(t);
                        l && this.injectableDefInScope(l) ? u = zn(Ba(t), Ci) : u = null, this.records.set(t, u)
                    }
                    if (u != null) return this.hydrate(t, u, o)
                }
                let c = o & 2 ? qn() : this.parent;
                return n = o & 8 && n === on ? null : n, c.get(t, n)
            } catch (c) {
                let u = OD(c);
                throw u === -200 || u === -201 ? new D(u, null) : c
            } finally {
                me(a), et(s)
            }
        }
        resolveInjectorInitializers() {
            let t = M(null),
                n = et(this),
                r = me(void 0),
                o;
            try {
                let i = this.get(ln, ie, {
                    self: !0
                });
                for (let s of i) s()
            } finally {
                et(n), me(r), M(t)
            }
        }
        toString() {
            let t = [],
                n = this.records;
            for (let r of n.keys()) t.push(pt(r));
            return `R3Injector[${t.join(", ")}]`
        }
        processProvider(t) {
            t = oe(t);
            let n = an(t) ? t : oe(t && t.provide),
                r = zD(t);
            if (!an(t) && t.multi === !0) {
                let o = this.records.get(n);
                o || (o = zn(void 0, Ci, !0), o.factory = () => Va(o.multi), this.records.set(n, o)), n = t, o.multi.push(t)
            }
            this.records.set(n, r)
        }
        hydrate(t, n, r) {
            let o = M(null);
            try {
                if (n.value === yf) throw Ka(pt(t));
                return n.value === Ci && (n.value = yf, n.value = n.factory(void 0, r)), typeof n.value == "object" && n.value && WD(n.value) && this._ngOnDestroyHooks.add(n.value), n.value
            } finally {
                M(o)
            }
        }
        injectableDefInScope(t) {
            if (!t.providedIn) return !1;
            let n = oe(t.providedIn);
            return typeof n == "string" ? n === "any" || this.scopes.has(n) : this.injectorDefTypes.has(n)
        }
        removeOnDestroy(t) {
            let n = this._onDestroyHooks.indexOf(t);
            n !== -1 && this._onDestroyHooks.splice(n, 1)
        }
    };

function Ba(e) {
    let t = kr(e),
        n = t !== null ? t.factory : Rt(e);
    if (n !== null) return n;
    if (e instanceof T) throw new D(204, !1);
    if (e instanceof Function) return UD(e);
    throw new D(204, !1)
}

function UD(e) {
    if (e.length > 0) throw new D(204, !1);
    let n = xD(e);
    return n !== null ? () => n.factory(e) : () => new e
}

function zD(e) {
    if (Af(e)) return zn(void 0, e.useValue); {
        let t = cc(e);
        return zn(t, Ci)
    }
}

function cc(e, t, n) {
    let r;
    if (an(e)) {
        let o = oe(e);
        return Rt(o) || Ba(o)
    } else if (Af(e)) r = () => oe(e.useValue);
    else if ($D(e)) r = () => e.useFactory(...Va(e.deps || []));
    else if (HD(e)) r = (o, i) => F(oe(e.useExisting), i !== void 0 && i & 8 ? 8 : void 0);
    else {
        let o = oe(e && (e.useClass || e.provide));
        if (GD(e)) r = () => new o(...Va(e.deps));
        else return Rt(o) || Ba(o)
    }
    return r
}

function Ar(e) {
    if (e.destroyed) throw new D(205, !1)
}

function zn(e, t, n = !1) {
    return {
        factory: e,
        value: t,
        multi: n ? [] : void 0
    }
}

function GD(e) {
    return !!e.deps
}

function WD(e) {
    return e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
}

function qD(e) {
    return typeof e == "function" || typeof e == "object" && e.ngMetadataName === "InjectionToken"
}

function Ha(e, t) {
    for (let n of e) Array.isArray(n) ? Ha(n, t) : n && Wa(n) ? Ha(n.\u0275providers, t) : t(n)
}

function Zn(e, t) {
    let n;
    e instanceof cn ? (Ar(e), n = e) : n = new ja(e);
    let r, o = et(n),
        i = me(void 0);
    try {
        return t()
    } finally {
        et(o), me(i)
    }
}

function uc() {
    return bf() !== void 0 || pi() != null
}
var xe = 0,
    C = 1,
    _ = 2,
    te = 3,
    Ae = 4,
    de = 5,
    dn = 6,
    Yn = 7,
    q = 8,
    gt = 9,
    rt = 10,
    O = 11,
    Qn = 12,
    lc = 13,
    fn = 14,
    se = 15,
    kt = 16,
    pn = 17,
    ot = 18,
    Vr = 19,
    dc = 20,
    ft = 21,
    Oi = 22,
    mt = 23,
    Ce = 24,
    hn = 25,
    gn = 26,
    P = 27,
    fc = 1,
    pc = 6,
    Pt = 7,
    Br = 8,
    mn = 9,
    Z = 10;

function it(e) {
    return Array.isArray(e) && typeof e[fc] == "object"
}

function Ue(e) {
    return Array.isArray(e) && e[fc] === !0
}

function hc(e) {
    return (e.flags & 4) !== 0
}

function yt(e) {
    return e.componentOffset > -1
}

function Kn(e) {
    return (e.flags & 1) === 1
}

function ze(e) {
    return !!e.template
}

function Jn(e) {
    return (e[_] & 512) !== 0
}

function yn(e) {
    return (e[_] & 256) === 256
}
var gc = "svg",
    Of = "math";

function be(e) {
    for (; Array.isArray(e);) e = e[xe];
    return e
}

function mc(e) {
    for (; Array.isArray(e);) {
        if (typeof e[fc] == "object") return e;
        e = e[xe]
    }
    return null
}

function yc(e, t) {
    return be(t[e])
}

function Re(e, t) {
    return be(t[e.index])
}

function Hr(e, t) {
    return e.data[t]
}

function Xn(e, t) {
    return e[t]
}

function $r(e, t, n, r) {
    n >= e.data.length && (e.data[n] = null, e.blueprint[n] = null), t[n] = r
}

function Oe(e, t) {
    let n = t[e];
    return it(n) ? n : n[xe]
}

function Ff(e) {
    return (e[_] & 4) === 4
}

function Fi(e) {
    return (e[_] & 128) === 128
}

function kf(e) {
    return Ue(e[te])
}

function Te(e, t) {
    return t == null ? null : e[t]
}

function vc(e) {
    e[pn] = 0
}

function Dc(e) {
    e[_] & 1024 || (e[_] |= 1024, Fi(e) && Lt(e))
}

function Pf(e, t) {
    for (; e > 0;) t = t[fn], e--;
    return t
}

function Ur(e) {
    return !!(e[_] & 9216 || e[Ce] ? .dirty)
}

function ki(e) {
    e[rt].changeDetectionScheduler ? .notify(8), e[_] & 64 && (e[_] |= 1024), Ur(e) && Lt(e)
}

function Lt(e) {
    e[rt].changeDetectionScheduler ? .notify(0);
    let t = Ot(e);
    for (; t !== null && !(t[_] & 8192 || (t[_] |= 8192, !Fi(t)));) t = Ot(t)
}

function Ec(e, t) {
    if (yn(e)) throw new D(911, !1);
    e[ft] === null && (e[ft] = []), e[ft].push(t)
}

function Lf(e, t) {
    if (e[ft] === null) return;
    let n = e[ft].indexOf(t);
    n !== -1 && e[ft].splice(n, 1)
}

function Ot(e) {
    let t = e[te];
    return Ue(t) ? t[te] : t
}

function Ic(e) {
    return e[Yn] ? ? = []
}

function wc(e) {
    return e.cleanup ? ? = []
}

function jf(e, t, n, r) {
    let o = Ic(t);
    o.push(n), e.firstCreatePass && wc(e).push(r, o.length - 1)
}
var N = {
    lFrame: Zf(null),
    bindingsEnabled: !0,
    skipHydrationRootTNode: null
};
var $a = !1;

function Vf() {
    return N.lFrame.elementDepthCount
}

function Bf() {
    N.lFrame.elementDepthCount++
}

function Cc() {
    N.lFrame.elementDepthCount--
}

function Pi() {
    return N.bindingsEnabled
}

function bc() {
    return N.skipHydrationRootTNode !== null
}

function Tc(e) {
    return N.skipHydrationRootTNode === e
}

function _c() {
    N.skipHydrationRootTNode = null
}

function E() {
    return N.lFrame.lView
}

function L() {
    return N.lFrame.tView
}

function Hf(e) {
    return N.lFrame.contextLView = e, e[q]
}

function $f(e) {
    return N.lFrame.contextLView = null, e
}

function Q() {
    let e = Mc();
    for (; e !== null && e.type === 64;) e = e.parent;
    return e
}

function Mc() {
    return N.lFrame.currentTNode
}

function er() {
    let e = N.lFrame,
        t = e.currentTNode;
    return e.isParent ? t : t.parent
}

function st(e, t) {
    let n = N.lFrame;
    n.currentTNode = e, n.isParent = t
}

function Sc() {
    return N.lFrame.isParent
}

function Nc() {
    N.lFrame.isParent = !1
}

function xc() {
    return N.lFrame.contextLView
}

function Ac() {
    return $a
}

function tr(e) {
    let t = $a;
    return $a = e, t
}

function Fe() {
    let e = N.lFrame,
        t = e.bindingRootIndex;
    return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
}

function Li() {
    return N.lFrame.bindingIndex
}

function Uf(e) {
    return N.lFrame.bindingIndex = e
}

function Ge() {
    return N.lFrame.bindingIndex++
}

function nr(e) {
    let t = N.lFrame,
        n = t.bindingIndex;
    return t.bindingIndex = t.bindingIndex + e, n
}

function zf() {
    return N.lFrame.inI18n
}

function Rc(e) {
    N.lFrame.inI18n = e
}

function Gf(e, t) {
    let n = N.lFrame;
    n.bindingIndex = n.bindingRootIndex = e, ji(t)
}

function Wf() {
    return N.lFrame.currentDirectiveIndex
}

function ji(e) {
    N.lFrame.currentDirectiveIndex = e
}

function Oc(e) {
    let t = N.lFrame.currentDirectiveIndex;
    return t === -1 ? null : e[t]
}

function Vi() {
    return N.lFrame.currentQueryIndex
}

function zr(e) {
    N.lFrame.currentQueryIndex = e
}

function ZD(e) {
    let t = e[C];
    return t.type === 2 ? t.declTNode : t.type === 1 ? e[de] : null
}

function Fc(e, t, n) {
    if (n & 4) {
        let o = t,
            i = e;
        for (; o = o.parent, o === null && !(n & 1);)
            if (o = ZD(i), o === null || (i = i[fn], o.type & 10)) break;
        if (o === null) return !1;
        t = o, e = i
    }
    let r = N.lFrame = qf();
    return r.currentTNode = t, r.lView = e, !0
}

function Bi(e) {
    let t = qf(),
        n = e[C];
    N.lFrame = t, t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1
}

function qf() {
    let e = N.lFrame,
        t = e === null ? null : e.child;
    return t === null ? Zf(e) : t
}

function Zf(e) {
    let t = {
        currentTNode: null,
        isParent: !0,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: e,
        child: null,
        inI18n: !1
    };
    return e !== null && (e.child = t), t
}

function Yf() {
    let e = N.lFrame;
    return N.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
}
var kc = Yf;

function Hi() {
    let e = Yf();
    e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
}

function Qf(e) {
    return (N.lFrame.contextLView = Pf(e, N.lFrame.contextLView))[q]
}

function _e() {
    return N.lFrame.selectedIndex
}

function jt(e) {
    N.lFrame.selectedIndex = e
}

function vn() {
    let e = N.lFrame;
    return Hr(e.tView, e.selectedIndex)
}

function Kf() {
    N.lFrame.currentNamespace = gc
}

function Jf() {
    YD()
}

function YD() {
    N.lFrame.currentNamespace = null
}

function Xf() {
    return N.lFrame.currentNamespace
}
var ep = !0;

function Gr() {
    return ep
}

function rr(e) {
    ep = e
}

function Ua(e, t = null, n = null, r) {
    let o = Pc(e, t, n, r);
    return o.resolveInjectorInitializers(), o
}

function Pc(e, t = null, n = null, r, o = new Set) {
    let i = [n || ie, Nf(e)];
    return r = r || (typeof e == "object" ? void 0 : pt(e)), new cn(i, t || qn(), r || null, o)
}
var ye = class e {
        static THROW_IF_NOT_FOUND = on;
        static NULL = new Or;
        static create(t, n) {
            if (Array.isArray(t)) return Ua({
                name: ""
            }, n, t, ""); {
                let r = t.name ? ? "";
                return Ua({
                    name: r
                }, t.parent, t.providers, r)
            }
        }
        static\ u0275prov = A({
            token: e,
            providedIn: "any",
            factory: () => F(ec)
        });
        static __NG_ELEMENT_ID__ = -1
    },
    vt = new T(""),
    fe = (() => {
        class e {
            static __NG_ELEMENT_ID__ = QD;
            static __NG_ENV_ID__ = n => n
        }
        return e
    })(),
    Fr = class extends fe {
        _lView;
        constructor(t) {
            super(), this._lView = t
        }
        get destroyed() {
            return yn(this._lView)
        }
        onDestroy(t) {
            let n = this._lView;
            return Ec(n, t), () => Lf(n, t)
        }
    };

function QD() {
    return new Fr(E())
}
var tt = class {
        _console = console;
        handleError(t) {
            this._console.error("ERROR", t)
        }
    },
    We = new T("", {
        providedIn: "root",
        factory: () => {
            let e = v(Ie),
                t;
            return n => {
                e.destroyed && !t ? setTimeout(() => {
                    throw n
                }) : (t ? ? = e.get(tt), t.handleError(n))
            }
        }
    }),
    tp = {
        provide: ln,
        useValue: () => void v(tt),
        multi: !0
    };

function Lc(e) {
    return typeof e == "function" && e[ee] !== void 0
}

function Dn(e, t) {
    let [n, r, o] = Oa(e, t ? .equal), i = n, s = i[ee];
    return i.set = r, i.update = o, i.asReadonly = $i.bind(i), i
}

function $i() {
    let e = this[ee];
    if (e.readonlyFn === void 0) {
        let t = () => this();
        t[ee] = e, e.readonlyFn = t
    }
    return e.readonlyFn
}

function jc(e) {
    return Lc(e) && typeof e.set == "function"
}
var or = (() => {
    class e {
        view;
        node;
        constructor(n, r) {
            this.view = n, this.node = r
        }
        static __NG_ELEMENT_ID__ = KD
    }
    return e
})();

function KD() {
    return new or(E(), Q())
}
var He = class {},
    Ui = new T("", {
        providedIn: "root",
        factory: () => !1
    });
var Vc = new T(""),
    Bc = new T(""),
    Vt = (() => {
        class e {
            taskId = 0;
            pendingTasks = new Set;
            destroyed = !1;
            pendingTask = new Mr(!1);
            get hasPendingTasks() {
                return this.destroyed ? !1 : this.pendingTask.value
            }
            get hasPendingTasksObservable() {
                return this.destroyed ? new S(n => {
                    n.next(!1), n.complete()
                }) : this.pendingTask
            }
            add() {
                !this.hasPendingTasks && !this.destroyed && this.pendingTask.next(!0);
                let n = this.taskId++;
                return this.pendingTasks.add(n), n
            }
            has(n) {
                return this.pendingTasks.has(n)
            }
            remove(n) {
                this.pendingTasks.delete(n), this.pendingTasks.size === 0 && this.hasPendingTasks && this.pendingTask.next(!1)
            }
            ngOnDestroy() {
                this.pendingTasks.clear(), this.hasPendingTasks && this.pendingTask.next(!1), this.destroyed = !0, this.pendingTask.unsubscribe()
            }
            static\ u0275prov = A({
                token: e,
                providedIn: "root",
                factory: () => new e
            })
        }
        return e
    })(),
    En = (() => {
        class e {
            internalPendingTasks = v(Vt);
            scheduler = v(He);
            errorHandler = v(We);
            add() {
                let n = this.internalPendingTasks.add();
                return () => {
                    this.internalPendingTasks.has(n) && (this.scheduler.notify(11), this.internalPendingTasks.remove(n))
                }
            }
            run(n) {
                let r = this.add();
                n().catch(this.errorHandler).finally(r)
            }
            static\ u0275prov = A({
                token: e,
                providedIn: "root",
                factory: () => new e
            })
        }
        return e
    })();

function In(...e) {}
var Wr = (() => {
        class e {
            static\ u0275prov = A({
                token: e,
                providedIn: "root",
                factory: () => new za
            })
        }
        return e
    })(),
    za = class {
        dirtyEffectCount = 0;
        queues = new Map;
        add(t) {
            this.enqueue(t), this.schedule(t)
        }
        schedule(t) {
            t.dirty && this.dirtyEffectCount++
        }
        remove(t) {
            let n = t.zone,
                r = this.queues.get(n);
            r.has(t) && (r.delete(t), t.dirty && this.dirtyEffectCount--)
        }
        enqueue(t) {
            let n = t.zone;
            this.queues.has(n) || this.queues.set(n, new Set);
            let r = this.queues.get(n);
            r.has(t) || r.add(t)
        }
        flush() {
            for (; this.dirtyEffectCount > 0;) {
                let t = !1;
                for (let [n, r] of this.queues) n === null ? t || = this.flushQueue(r) : t || = n.run(() => this.flushQueue(r));
                t || (this.dirtyEffectCount = 0)
            }
        }
        flushQueue(t) {
            let n = !1;
            for (let r of t) r.dirty && (this.dirtyEffectCount--, n = !0, r.run());
            return n
        }
    };

function so(e) {
    return {
        toString: e
    }.toString()
}

function Pp(e) {
    let t = $e.ng;
    if (t && t.\u0275compilerFacade) return t.\u0275compilerFacade;
    throw new Error("JIT compiler unavailable")
}

function rE(e) {
    return typeof e == "function"
}
var ns = class {
    previousValue;
    currentValue;
    firstChange;
    constructor(t, n, r) {
        this.previousValue = t, this.currentValue = n, this.firstChange = r
    }
    isFirstChange() {
        return this.firstChange
    }
};

function Lp(e, t, n, r) {
    t !== null ? t.applyValueToInputSignal(t, r) : e[n] = r
}
var zu = (() => {
    let e = () => jp;
    return e.ngInherit = !0, e
})();

function jp(e) {
    return e.type.prototype.ngOnChanges && (e.setInput = iE), oE
}

function oE() {
    let e = Bp(this),
        t = e ? .current;
    if (t) {
        let n = e.previous;
        if (n === Ft) e.previous = t;
        else
            for (let r in t) n[r] = t[r];
        e.current = null, this.ngOnChanges(t)
    }
}

function iE(e, t, n, r, o) {
    let i = this.declaredInputs[r],
        s = Bp(e) || sE(e, {
            previous: Ft,
            current: null
        }),
        a = s.current || (s.current = {}),
        c = s.previous,
        u = c[i];
    a[i] = new ns(u && u.currentValue, n, c === Ft), Lp(e, t, o, n)
}
var Vp = "__ngSimpleChanges__";

function Bp(e) {
    return e[Vp] || null
}

function sE(e, t) {
    return e[Vp] = t
}
var np = [];
var B = function(e, t = null, n) {
    for (let r = 0; r < np.length; r++) {
        let o = np[r];
        o(e, t, n)
    }
};

function aE(e, t, n) {
    let {
        ngOnChanges: r,
        ngOnInit: o,
        ngDoCheck: i
    } = t.type.prototype;
    if (r) {
        let s = jp(t);
        (n.preOrderHooks ? ? = []).push(e, s), (n.preOrderCheckHooks ? ? = []).push(e, s)
    }
    o && (n.preOrderHooks ? ? = []).push(0 - e, o), i && ((n.preOrderHooks ? ? = []).push(e, i), (n.preOrderCheckHooks ? ? = []).push(e, i))
}

function Hp(e, t) {
    for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
        let i = e.data[n].type.prototype,
            {
                ngAfterContentInit: s,
                ngAfterContentChecked: a,
                ngAfterViewInit: c,
                ngAfterViewChecked: u,
                ngOnDestroy: l
            } = i;
        s && (e.contentHooks ? ? = []).push(-n, s), a && ((e.contentHooks ? ? = []).push(n, a), (e.contentCheckHooks ? ? = []).push(n, a)), c && (e.viewHooks ? ? = []).push(-n, c), u && ((e.viewHooks ? ? = []).push(n, u), (e.viewCheckHooks ? ? = []).push(n, u)), l != null && (e.destroyHooks ? ? = []).push(n, l)
    }
}

function Qi(e, t, n) {
    $p(e, t, 3, n)
}

function Ki(e, t, n, r) {
    (e[_] & 3) === n && $p(e, t, n, r)
}

function Hc(e, t) {
    let n = e[_];
    (n & 3) === t && (n &= 16383, n += 1, e[_] = n)
}

function $p(e, t, n, r) {
    let o = r !== void 0 ? e[pn] & 65535 : 0,
        i = r ? ? -1,
        s = t.length - 1,
        a = 0;
    for (let c = o; c < s; c++)
        if (typeof t[c + 1] == "number") {
            if (a = t[c], r != null && a >= r) break
        } else t[c] < 0 && (e[pn] += 65536), (a < i || i == -1) && (cE(e, n, t, c), e[pn] = (e[pn] & 4294901760) + c + 2), c++
}

function rp(e, t) {
    B(4, e, t);
    let n = M(null);
    try {
        t.call(e)
    } finally {
        M(n), B(5, e, t)
    }
}

function cE(e, t, n, r) {
    let o = n[r] < 0,
        i = n[r + 1],
        s = o ? -n[r] : n[r],
        a = e[s];
    o ? e[_] >> 14 < e[pn] >> 16 && (e[_] & 3) === t && (e[_] += 16384, rp(a, i)) : rp(a, i)
}
var sr = -1,
    Cn = class {
        factory;
        name;
        injectImpl;
        resolving = !1;
        canSeeViewProviders;
        multi;
        componentProviders;
        index;
        providerFactory;
        constructor(t, n, r, o) {
            this.factory = t, this.name = o, this.canSeeViewProviders = n, this.injectImpl = r
        }
    };

function uE(e) {
    return (e.flags & 8) !== 0
}

function lE(e) {
    return (e.flags & 16) !== 0
}

function dE(e, t, n) {
    let r = 0;
    for (; r < n.length;) {
        let o = n[r];
        if (typeof o == "number") {
            if (o !== 0) break;
            r++;
            let i = n[r++],
                s = n[r++],
                a = n[r++];
            e.setAttribute(t, s, a, i)
        } else {
            let i = o,
                s = n[++r];
            fE(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++
        }
    }
    return r
}

function Up(e) {
    return e === 3 || e === 4 || e === 6
}

function fE(e) {
    return e.charCodeAt(0) === 64
}

function ar(e, t) {
    if (!(t === null || t.length === 0))
        if (e === null || e.length === 0) e = t.slice();
        else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
                let o = t[r];
                typeof o == "number" ? n = o : n === 0 || (n === -1 || n === 2 ? op(e, n, o, null, t[++r]) : op(e, n, o, null, null))
            }
        }
    return e
}

function op(e, t, n, r, o) {
    let i = 0,
        s = e.length;
    if (t === -1) s = -1;
    else
        for (; i < e.length;) {
            let a = e[i++];
            if (typeof a == "number") {
                if (a === t) {
                    s = -1;
                    break
                } else if (a > t) {
                    s = i - 1;
                    break
                }
            }
        }
    for (; i < e.length;) {
        let a = e[i];
        if (typeof a == "number") break;
        if (a === n) {
            o !== null && (e[i + 1] = o);
            return
        }
        i++, o !== null && i++
    }
    s !== -1 && (e.splice(s, 0, t), i = s + 1), e.splice(i++, 0, n), o !== null && e.splice(i++, 0, o)
}

function zp(e) {
    return e !== sr
}

function rs(e) {
    return e & 32767
}

function pE(e) {
    return e >> 16
}

function os(e, t) {
    let n = pE(e),
        r = t;
    for (; n > 0;) r = r[fn], n--;
    return r
}
var Xc = !0;

function is(e) {
    let t = Xc;
    return Xc = e, t
}
var hE = 256,
    Gp = hE - 1,
    Wp = 5,
    gE = 0,
    at = {};

function mE(e, t, n) {
    let r;
    typeof n == "string" ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(un) && (r = n[un]), r == null && (r = n[un] = gE++);
    let o = r & Gp,
        i = 1 << o;
    t.data[e + (o >> Wp)] |= i
}

function ss(e, t) {
    let n = qp(e, t);
    if (n !== -1) return n;
    let r = t[C];
    r.firstCreatePass && (e.injectorIndex = t.length, $c(r.data, e), $c(t, null), $c(r.blueprint, null));
    let o = Gu(e, t),
        i = e.injectorIndex;
    if (zp(o)) {
        let s = rs(o),
            a = os(o, t),
            c = a[C].data;
        for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | c[s + u]
    }
    return t[i + 8] = o, i
}

function $c(e, t) {
    e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
}

function qp(e, t) {
    return e.injectorIndex === -1 || e.parent && e.parent.injectorIndex === e.injectorIndex || t[e.injectorIndex + 8] === null ? -1 : e.injectorIndex
}

function Gu(e, t) {
    if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
    let n = 0,
        r = null,
        o = t;
    for (; o !== null;) {
        if (r = Jp(o), r === null) return sr;
        if (n++, o = o[fn], r.injectorIndex !== -1) return r.injectorIndex | n << 16
    }
    return sr
}

function eu(e, t, n) {
    mE(e, t, n)
}

function yE(e, t) {
    if (t === "class") return e.classes;
    if (t === "style") return e.styles;
    let n = e.attrs;
    if (n) {
        let r = n.length,
            o = 0;
        for (; o < r;) {
            let i = n[o];
            if (Up(i)) break;
            if (i === 0) o = o + 2;
            else if (typeof i == "number")
                for (o++; o < r && typeof n[o] == "string";) o++;
            else {
                if (i === t) return n[o + 1];
                o = o + 2
            }
        }
    }
    return null
}

function Zp(e, t, n) {
    if (n & 8 || e !== void 0) return e;
    xi(t, "NodeInjector")
}

function Yp(e, t, n, r) {
    if (n & 8 && r === void 0 && (r = null), (n & 3) === 0) {
        let o = e[gt],
            i = me(void 0);
        try {
            return o ? o.get(t, r, n & 8) : Ja(t, r, n & 8)
        } finally {
            me(i)
        }
    }
    return Zp(r, t, n)
}

function Qp(e, t, n, r = 0, o) {
    if (e !== null) {
        if (t[_] & 2048 && !(r & 2)) {
            let s = wE(e, t, n, r, at);
            if (s !== at) return s
        }
        let i = Kp(e, t, n, r, at);
        if (i !== at) return i
    }
    return Yp(t, n, r, o)
}

function Kp(e, t, n, r, o) {
    let i = DE(n);
    if (typeof i == "function") {
        if (!Fc(t, e, r)) return r & 1 ? Zp(o, n, r) : Yp(t, n, r, o);
        try {
            let s;
            if (s = i(r), s == null && !(r & 8)) xi(n);
            else return s
        } finally {
            kc()
        }
    } else if (typeof i == "number") {
        let s = null,
            a = qp(e, t),
            c = sr,
            u = r & 1 ? t[se][de] : null;
        for ((a === -1 || r & 4) && (c = a === -1 ? Gu(e, t) : t[a + 8], c === sr || !sp(r, !1) ? a = -1 : (s = t[C], a = rs(c), t = os(c, t))); a !== -1;) {
            let l = t[C];
            if (ip(i, a, l.data)) {
                let d = vE(a, t, n, s, r, u);
                if (d !== at) return d
            }
            c = t[a + 8], c !== sr && sp(r, t[C].data[a + 8] === u) && ip(i, a, t) ? (s = l, a = rs(c), t = os(c, t)) : a = -1
        }
    }
    return o
}

function vE(e, t, n, r, o, i) {
    let s = t[C],
        a = s.data[e + 8],
        c = r == null ? yt(a) && Xc : r != s && (a.type & 3) !== 0,
        u = o & 1 && i === a,
        l = Ji(a, s, n, c, u);
    return l !== null ? Qr(t, s, l, a, o) : at
}

function Ji(e, t, n, r, o) {
    let i = e.providerIndexes,
        s = t.data,
        a = i & 1048575,
        c = e.directiveStart,
        u = e.directiveEnd,
        l = i >> 20,
        d = r ? a : a + l,
        f = o ? a + l : u;
    for (let p = d; p < f; p++) {
        let h = s[p];
        if (p < c && n === h || p >= c && h.type === n) return p
    }
    if (o) {
        let p = s[c];
        if (p && ze(p) && p.type === n) return c
    }
    return null
}

function Qr(e, t, n, r, o) {
    let i = e[n],
        s = t.data;
    if (i instanceof Cn) {
        let a = i;
        if (a.resolving) {
            let p = If(s[n]);
            throw Ka(p)
        }
        let c = is(a.canSeeViewProviders);
        a.resolving = !0;
        let u = s[n].type || s[n],
            l, d = a.injectImpl ? me(a.injectImpl) : null,
            f = Fc(e, r, 0);
        try {
            i = e[n] = a.factory(void 0, o, s, e, r), t.firstCreatePass && n >= r.directiveStart && aE(n, s[n], t)
        } finally {
            d !== null && me(d), is(c), a.resolving = !1, kc()
        }
    }
    return i
}

function DE(e) {
    if (typeof e == "string") return e.charCodeAt(0) || 0;
    let t = e.hasOwnProperty(un) ? e[un] : void 0;
    return typeof t == "number" ? t >= 0 ? t & Gp : EE : t
}

function ip(e, t, n) {
    let r = 1 << e;
    return !!(n[t + (e >> Wp)] & r)
}

function sp(e, t) {
    return !(e & 2) && !(e & 1 && t)
}
var wn = class {
    _tNode;
    _lView;
    constructor(t, n) {
        this._tNode = t, this._lView = n
    }
    get(t, n, r) {
        return Qp(this._tNode, this._lView, t, sn(r), n)
    }
};

function EE() {
    return new wn(Q(), E())
}

function IE(e) {
    return so(() => {
        let t = e.prototype.constructor,
            n = t[Rr] || tu(t),
            r = Object.prototype,
            o = Object.getPrototypeOf(e.prototype).constructor;
        for (; o && o !== r;) {
            let i = o[Rr] || tu(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o)
        }
        return i => new i
    })
}

function tu(e) {
    return Ga(e) ? () => {
        let t = tu(oe(e));
        return t && t()
    } : Rt(e)
}

function wE(e, t, n, r, o) {
    let i = e,
        s = t;
    for (; i !== null && s !== null && s[_] & 2048 && !Jn(s);) {
        let a = Kp(i, s, n, r | 2, at);
        if (a !== at) return a;
        let c = i.parent;
        if (!c) {
            let u = s[dc];
            if (u) {
                let l = u.get(n, at, r);
                if (l !== at) return l
            }
            c = Jp(s), s = s[fn]
        }
        i = c
    }
    return o
}

function Jp(e) {
    let t = e[C],
        n = t.type;
    return n === 2 ? t.declTNode : n === 1 ? e[de] : null
}

function Wu(e) {
    return yE(Q(), e)
}

function CE() {
    return mr(Q(), E())
}

function mr(e, t) {
    return new Ct(Re(e, t))
}
var Ct = (() => {
    class e {
        nativeElement;
        constructor(n) {
            this.nativeElement = n
        }
        static __NG_ELEMENT_ID__ = CE
    }
    return e
})();

function Xp(e) {
    return e instanceof Ct ? e.nativeElement : e
}

function bE() {
    return this._results[Symbol.iterator]()
}
var as = class {
    _emitDistinctChangesOnly;
    dirty = !0;
    _onDirty = void 0;
    _results = [];
    _changesDetected = !1;
    _changes = void 0;
    length = 0;
    first = void 0;
    last = void 0;
    get changes() {
        return this._changes ? ? = new Ee
    }
    constructor(t = !1) {
        this._emitDistinctChangesOnly = t
    }
    get(t) {
        return this._results[t]
    }
    map(t) {
        return this._results.map(t)
    }
    filter(t) {
        return this._results.filter(t)
    }
    find(t) {
        return this._results.find(t)
    }
    reduce(t, n) {
        return this._results.reduce(t, n)
    }
    forEach(t) {
        this._results.forEach(t)
    }
    some(t) {
        return this._results.some(t)
    }
    toArray() {
        return this._results.slice()
    }
    toString() {
        return this._results.toString()
    }
    reset(t, n) {
        this.dirty = !1;
        let r = _f(t);
        (this._changesDetected = !Tf(this._results, r, n)) && (this._results = r, this.length = r.length, this.last = r[this.length - 1], this.first = r[0])
    }
    notifyOnChanges() {
        this._changes !== void 0 && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.next(this)
    }
    onDirty(t) {
        this._onDirty = t
    }
    setDirty() {
        this.dirty = !0, this._onDirty ? .()
    }
    destroy() {
        this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe())
    }[Symbol.iterator] = bE
};

function eh(e) {
    return (e.flags & 128) === 128
}
var qu = (function(e) {
        return e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default", e
    })(qu || {}),
    th = new Map,
    TE = 0;

function _E() {
    return TE++
}

function ME(e) {
    th.set(e[Vr], e)
}

function nu(e) {
    th.delete(e[Vr])
}
var ap = "__ngContext__";

function cr(e, t) {
    it(t) ? (e[ap] = t[Vr], ME(t)) : e[ap] = t
}

function nh(e) {
    return oh(e[Qn])
}

function rh(e) {
    return oh(e[Ae])
}

function oh(e) {
    for (; e !== null && !Ue(e);) e = e[Ae];
    return e
}
var ru;

function SE(e) {
    ru = e
}

function Cs() {
    if (ru !== void 0) return ru;
    if (typeof document < "u") return document;
    throw new D(210, !1)
}
var NE = new T("", {
        providedIn: "root",
        factory: () => xE
    }),
    xE = "ng",
    ih = new T(""),
    AE = new T("", {
        providedIn: "platform",
        factory: () => "unknown"
    });
var RE = new T(""),
    OE = new T("", {
        providedIn: "root",
        factory: () => Cs().body ? .querySelector("[ngCspNonce]") ? .getAttribute("ngCspNonce") || null
    });
var FE = "h",
    kE = "b";
var sh = "r";
var ah = "di";
var ch = !1,
    uh = new T("", {
        providedIn: "root",
        factory: () => ch
    });
var PE = new T("");
var LE = (e, t, n, r) => {};

function jE(e, t, n, r) {
    LE(e, t, n, r)
}

function bs(e) {
    return (e.flags & 32) === 32
}
var VE = () => null;

function lh(e, t, n = !1) {
    return VE(e, t, n)
}

function dh(e, t) {
    let n = e.contentQueries;
    if (n !== null) {
        let r = M(null);
        try {
            for (let o = 0; o < n.length; o += 2) {
                let i = n[o],
                    s = n[o + 1];
                if (s !== -1) {
                    let a = e.data[s];
                    zr(i), a.contentQueries(2, t[s], s)
                }
            }
        } finally {
            M(r)
        }
    }
}

function ou(e, t, n) {
    zr(0);
    let r = M(null);
    try {
        t(e, n)
    } finally {
        M(r)
    }
}

function Zu(e, t, n) {
    if (hc(t)) {
        let r = M(null);
        try {
            let o = t.directiveStart,
                i = t.directiveEnd;
            for (let s = o; s < i; s++) {
                let a = e.data[s];
                if (a.contentQueries) {
                    let c = n[s];
                    a.contentQueries(1, c, s)
                }
            }
        } finally {
            M(r)
        }
    }
}
var ur = (function(e) {
        return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e
    })(ur || {}),
    zi;

function BE() {
    if (zi === void 0 && (zi = null, $e.trustedTypes)) try {
        zi = $e.trustedTypes.createPolicy("angular", {
            createHTML: e => e,
            createScript: e => e,
            createScriptURL: e => e
        })
    } catch {}
    return zi
}

function Ts(e) {
    return BE() ? .createHTML(e) || e
}
var Gi;

function fh() {
    if (Gi === void 0 && (Gi = null, $e.trustedTypes)) try {
        Gi = $e.trustedTypes.createPolicy("angular#unsafe-bypass", {
            createHTML: e => e,
            createScript: e => e,
            createScriptURL: e => e
        })
    } catch {}
    return Gi
}

function cp(e) {
    return fh() ? .createHTML(e) || e
}

function up(e) {
    return fh() ? .createScriptURL(e) || e
}
var It = class {
        changingThisBreaksApplicationSecurity;
        constructor(t) {
            this.changingThisBreaksApplicationSecurity = t
        }
        toString() {
            return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${_i})`
        }
    },
    iu = class extends It {
        getTypeName() {
            return "HTML"
        }
    },
    su = class extends It {
        getTypeName() {
            return "Style"
        }
    },
    au = class extends It {
        getTypeName() {
            return "Script"
        }
    },
    cu = class extends It {
        getTypeName() {
            return "URL"
        }
    },
    uu = class extends It {
        getTypeName() {
            return "ResourceURL"
        }
    };

function $t(e) {
    return e instanceof It ? e.changingThisBreaksApplicationSecurity : e
}

function _s(e, t) {
    let n = ph(e);
    if (n != null && n !== t) {
        if (n === "ResourceURL" && t === "URL") return !0;
        throw new Error(`Required a safe ${t}, got a ${n} (see ${_i})`)
    }
    return n === t
}

function ph(e) {
    return e instanceof It && e.getTypeName() || null
}

function HE(e) {
    return new iu(e)
}

function $E(e) {
    return new su(e)
}

function UE(e) {
    return new au(e)
}

function zE(e) {
    return new cu(e)
}

function GE(e) {
    return new uu(e)
}

function hh(e) {
    let t = new du(e);
    return WE() ? new lu(t) : t
}
var lu = class {
        inertDocumentHelper;
        constructor(t) {
            this.inertDocumentHelper = t
        }
        getInertBodyElement(t) {
            t = "<body><remove></remove>" + t;
            try {
                let n = new window.DOMParser().parseFromString(Ts(t), "text/html").body;
                return n === null ? this.inertDocumentHelper.getInertBodyElement(t) : (n.firstChild ? .remove(), n)
            } catch {
                return null
            }
        }
    },
    du = class {
        defaultDoc;
        inertDocument;
        constructor(t) {
            this.defaultDoc = t, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")
        }
        getInertBodyElement(t) {
            let n = this.inertDocument.createElement("template");
            return n.innerHTML = Ts(t), n
        }
    };

function WE() {
    try {
        return !!new window.DOMParser().parseFromString(Ts(""), "text/html")
    } catch {
        return !1
    }
}
var qE = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;

function Ms(e) {
    return e = String(e), e.match(qE) ? e : "unsafe:" + e
}

function bt(e) {
    let t = {};
    for (let n of e.split(",")) t[n] = !0;
    return t
}

function ao(...e) {
    let t = {};
    for (let n of e)
        for (let r in n) n.hasOwnProperty(r) && (t[r] = !0);
    return t
}
var gh = bt("area,br,col,hr,img,wbr"),
    mh = bt("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
    yh = bt("rp,rt"),
    ZE = ao(yh, mh),
    YE = ao(mh, bt("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),
    QE = ao(yh, bt("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),
    fu = ao(gh, YE, QE, ZE),
    Yu = bt("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
    KE = bt("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),
    JE = bt("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),
    vh = ao(Yu, KE, JE),
    XE = bt("script,style,template"),
    pu = class {
        sanitizedSomething = !1;
        buf = [];
        sanitizeChildren(t) {
            let n = t.firstChild,
                r = !0,
                o = [];
            for (; n;) {
                if (n.nodeType === Node.ELEMENT_NODE ? r = this.startElement(n) : n.nodeType === Node.TEXT_NODE ? this.chars(n.nodeValue) : this.sanitizedSomething = !0, r && n.firstChild) {
                    o.push(n), n = nI(n);
                    continue
                }
                for (; n;) {
                    n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                    let i = tI(n);
                    if (i) {
                        n = i;
                        break
                    }
                    n = o.pop()
                }
            }
            return this.buf.join("")
        }
        startElement(t) {
            let n = lp(t).toLowerCase();
            if (!fu.hasOwnProperty(n)) return this.sanitizedSomething = !0, !XE.hasOwnProperty(n);
            this.buf.push("<"), this.buf.push(n);
            let r = t.attributes;
            for (let o = 0; o < r.length; o++) {
                let i = r.item(o),
                    s = i.name,
                    a = s.toLowerCase();
                if (!vh.hasOwnProperty(a)) {
                    this.sanitizedSomething = !0;
                    continue
                }
                let c = i.value;
                Yu[a] && (c = Ms(c)), this.buf.push(" ", s, '="', dp(c), '"')
            }
            return this.buf.push(">"), !0
        }
        endElement(t) {
            let n = lp(t).toLowerCase();
            fu.hasOwnProperty(n) && !gh.hasOwnProperty(n) && (this.buf.push("</"), this.buf.push(n), this.buf.push(">"))
        }
        chars(t) {
            this.buf.push(dp(t))
        }
    };

function eI(e, t) {
    return (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !== Node.DOCUMENT_POSITION_CONTAINED_BY
}

function tI(e) {
    let t = e.nextSibling;
    if (t && e !== t.previousSibling) throw Dh(t);
    return t
}

function nI(e) {
    let t = e.firstChild;
    if (t && eI(e, t)) throw Dh(t);
    return t
}

function lp(e) {
    let t = e.nodeName;
    return typeof t == "string" ? t : "FORM"
}

function Dh(e) {
    return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)
}
var rI = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    oI = /([^\#-~ |!])/g;

function dp(e) {
    return e.replace(/&/g, "&amp;").replace(rI, function(t) {
        let n = t.charCodeAt(0),
            r = t.charCodeAt(1);
        return "&#" + ((n - 55296) * 1024 + (r - 56320) + 65536) + ";"
    }).replace(oI, function(t) {
        return "&#" + t.charCodeAt(0) + ";"
    }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
var Wi;

function Eh(e, t) {
    let n = null;
    try {
        Wi = Wi || hh(e);
        let r = t ? String(t) : "";
        n = Wi.getInertBodyElement(r);
        let o = 5,
            i = r;
        do {
            if (o === 0) throw new Error("Failed to sanitize html because the input is unstable");
            o--, r = i, i = n.innerHTML, n = Wi.getInertBodyElement(r)
        } while (r !== i);
        let a = new pu().sanitizeChildren(hu(n) || n);
        return Ts(a)
    } finally {
        if (n) {
            let r = hu(n) || n;
            for (; r.firstChild;) r.firstChild.remove()
        }
    }
}

function hu(e) {
    return "content" in e && iI(e) ? e.content : null
}

function iI(e) {
    return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE"
}
var co = (function(e) {
    return e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL", e
})(co || {});

function sI(e) {
    let t = Qu();
    return t ? cp(t.sanitize(co.HTML, e) || "") : _s(e, "HTML") ? cp($t(e)) : Eh(Cs(), le(e))
}

function Ih(e) {
    let t = Qu();
    return t ? t.sanitize(co.URL, e) || "" : _s(e, "URL") ? $t(e) : Ms(le(e))
}

function wh(e) {
    let t = Qu();
    if (t) return up(t.sanitize(co.RESOURCE_URL, e) || "");
    if (_s(e, "ResourceURL")) return up($t(e));
    throw new D(904, !1)
}

function aI(e, t) {
    return t === "src" && (e === "embed" || e === "frame" || e === "iframe" || e === "media" || e === "script") || t === "href" && (e === "base" || e === "link") ? wh : Ih
}

function cI(e, t, n) {
    return aI(t, n)(e)
}

function Qu() {
    let e = E();
    return e && e[rt].sanitizer
}
var uI = /^>|^->|<!--|-->|--!>|<!-$/g,
    lI = /(<|>)/g,
    dI = "\u200B$1\u200B";

function fI(e) {
    return e.replace(uI, t => t.replace(lI, dI))
}

function pI(e) {
    return e.ownerDocument.defaultView
}

function hI(e) {
    return e.ownerDocument
}

function Ch(e) {
    return e instanceof Function ? e() : e
}

function gI(e, t, n) {
    let r = e.length;
    for (;;) {
        let o = e.indexOf(t, n);
        if (o === -1) return o;
        if (o === 0 || e.charCodeAt(o - 1) <= 32) {
            let i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o
        }
        n = o + 1
    }
}
var bh = "ng-template";

function mI(e, t, n, r) {
    let o = 0;
    if (r) {
        for (; o < t.length && typeof t[o] == "string"; o += 2)
            if (t[o] === "class" && gI(t[o + 1].toLowerCase(), n, 0) !== -1) return !0
    } else if (Ku(e)) return !1;
    if (o = t.indexOf(1, o), o > -1) {
        let i;
        for (; ++o < t.length && typeof(i = t[o]) == "string";)
            if (i.toLowerCase() === n) return !0
    }
    return !1
}

function Ku(e) {
    return e.type === 4 && e.value !== bh
}

function yI(e, t, n) {
    let r = e.type === 4 && !n ? bh : e.value;
    return t === r
}

function vI(e, t, n) {
    let r = 4,
        o = e.attrs,
        i = o !== null ? II(o) : 0,
        s = !1;
    for (let a = 0; a < t.length; a++) {
        let c = t[a];
        if (typeof c == "number") {
            if (!s && !qe(r) && !qe(c)) return !1;
            if (s && qe(c)) continue;
            s = !1, r = c | r & 1;
            continue
        }
        if (!s)
            if (r & 4) {
                if (r = 2 | r & 1, c !== "" && !yI(e, c, n) || c === "" && t.length === 1) {
                    if (qe(r)) return !1;
                    s = !0
                }
            } else if (r & 8) {
            if (o === null || !mI(e, o, c, n)) {
                if (qe(r)) return !1;
                s = !0
            }
        } else {
            let u = t[++a],
                l = DI(c, o, Ku(e), n);
            if (l === -1) {
                if (qe(r)) return !1;
                s = !0;
                continue
            }
            if (u !== "") {
                let d;
                if (l > i ? d = "" : d = o[l + 1].toLowerCase(), r & 2 && u !== d) {
                    if (qe(r)) return !1;
                    s = !0
                }
            }
        }
    }
    return qe(r) || s
}

function qe(e) {
    return (e & 1) === 0
}

function DI(e, t, n, r) {
    if (t === null) return -1;
    let o = 0;
    if (r || !n) {
        let i = !1;
        for (; o < t.length;) {
            let s = t[o];
            if (s === e) return o;
            if (s === 3 || s === 6) i = !0;
            else if (s === 1 || s === 2) {
                let a = t[++o];
                for (; typeof a == "string";) a = t[++o];
                continue
            } else {
                if (s === 4) break;
                if (s === 0) {
                    o += 4;
                    continue
                }
            }
            o += i ? 1 : 2
        }
        return -1
    } else return wI(t, e)
}

function Th(e, t, n = !1) {
    for (let r = 0; r < t.length; r++)
        if (vI(e, t[r], n)) return !0;
    return !1
}

function EI(e) {
    let t = e.attrs;
    if (t != null) {
        let n = t.indexOf(5);
        if ((n & 1) === 0) return t[n + 1]
    }
    return null
}

function II(e) {
    for (let t = 0; t < e.length; t++) {
        let n = e[t];
        if (Up(n)) return t
    }
    return e.length
}

function wI(e, t) {
    let n = e.indexOf(4);
    if (n > -1)
        for (n++; n < e.length;) {
            let r = e[n];
            if (typeof r == "number") return -1;
            if (r === t) return n;
            n++
        }
    return -1
}

function CI(e, t) {
    e: for (let n = 0; n < t.length; n++) {
        let r = t[n];
        if (e.length === r.length) {
            for (let o = 0; o < e.length; o++)
                if (e[o] !== r[o]) continue e;
            return !0
        }
    }
    return !1
}

function fp(e, t) {
    return e ? ":not(" + t.trim() + ")" : t
}

function bI(e) {
    let t = e[0],
        n = 1,
        r = 2,
        o = "",
        i = !1;
    for (; n < e.length;) {
        let s = e[n];
        if (typeof s == "string")
            if (r & 2) {
                let a = e[++n];
                o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
            } else r & 8 ? o += "." + s : r & 4 && (o += " " + s);
        else o !== "" && !qe(s) && (t += fp(i, o), o = ""), r = s, i = i || !qe(r);
        n++
    }
    return o !== "" && (t += fp(i, o)), t
}

function TI(e) {
    return e.map(bI).join(",")
}

function _I(e) {
    let t = [],
        n = [],
        r = 1,
        o = 2;
    for (; r < e.length;) {
        let i = e[r];
        if (typeof i == "string") o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i);
        else {
            if (!qe(o)) break;
            o = i
        }
        r++
    }
    return n.length && t.push(1, ...n), t
}
var K = {};

function _h(e, t) {
    return e.createText(t)
}

function MI(e, t, n) {
    e.setValue(t, n)
}

function Mh(e, t) {
    return e.createComment(fI(t))
}

function Ju(e, t, n) {
    return e.createElement(t, n)
}

function lr(e, t, n, r, o) {
    e.insertBefore(t, n, r, o)
}

function Sh(e, t, n) {
    e.appendChild(t, n)
}

function pp(e, t, n, r, o) {
    r !== null ? lr(e, t, n, r, o) : Sh(e, t, n)
}

function Nh(e, t, n, r) {
    e.removeChild(null, t, n, r)
}

function SI(e, t, n) {
    e.setAttribute(t, "style", n)
}

function NI(e, t, n) {
    n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
}

function xh(e, t, n) {
    let {
        mergedAttrs: r,
        classes: o,
        styles: i
    } = n;
    r !== null && dE(e, t, r), o !== null && NI(e, t, o), i !== null && SI(e, t, i)
}

function Xu(e, t, n, r, o, i, s, a, c, u, l) {
    let d = P + r,
        f = d + o,
        p = xI(d, f),
        h = typeof u == "function" ? u() : u;
    return p[C] = {
        type: e,
        blueprint: p,
        template: n,
        queries: null,
        viewQuery: a,
        declTNode: t,
        data: p.slice().fill(null, d),
        bindingStartIndex: d,
        expandoStartIndex: f,
        hostBindingOpCodes: null,
        firstCreatePass: !0,
        firstUpdatePass: !0,
        staticViewQueries: !1,
        staticContentQueries: !1,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: typeof i == "function" ? i() : i,
        pipeRegistry: typeof s == "function" ? s() : s,
        firstChild: null,
        schemas: c,
        consts: h,
        incompleteFirstPass: !1,
        ssrId: l
    }
}

function xI(e, t) {
    let n = [];
    for (let r = 0; r < t; r++) n.push(r < e ? null : K);
    return n
}

function AI(e) {
    let t = e.tView;
    return t === null || t.incompleteFirstPass ? e.tView = Xu(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t
}

function el(e, t, n, r, o, i, s, a, c, u, l) {
    let d = t.blueprint.slice();
    return d[xe] = o, d[_] = r | 4 | 128 | 8 | 64 | 1024, (u !== null || e && e[_] & 2048) && (d[_] |= 2048), vc(d), d[te] = d[fn] = e, d[q] = n, d[rt] = s || e && e[rt], d[O] = a || e && e[O], d[gt] = c || e && e[gt] || null, d[de] = i, d[Vr] = _E(), d[dn] = l, d[dc] = u, d[se] = t.type == 2 ? e[se] : d, d
}

function RI(e, t, n) {
    let r = Re(t, e),
        o = AI(n),
        i = e[rt].rendererFactory,
        s = tl(e, el(e, o, null, Ah(n), r, t, null, i.createRenderer(r, n), null, null, null));
    return e[t.index] = s
}

function Ah(e) {
    let t = 16;
    return e.signals ? t = 4096 : e.onPush && (t = 64), t
}

function uo(e, t, n, r) {
    if (n === 0) return -1;
    let o = t.length;
    for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
    return o
}

function tl(e, t) {
    return e[Qn] ? e[lc][Ae] = t : e[Qn] = t, e[lc] = t, t
}

function OI(e = 1) {
    Rh(L(), E(), _e() + e, !1)
}

function Rh(e, t, n, r) {
    if (!r)
        if ((t[_] & 3) === 3) {
            let i = e.preOrderCheckHooks;
            i !== null && Qi(t, i, n)
        } else {
            let i = e.preOrderHooks;
            i !== null && Ki(t, i, 0, n)
        }
    jt(n)
}
var Ss = (function(e) {
    return e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform", e
})(Ss || {});

function gu(e, t, n, r) {
    let o = M(null);
    try {
        let [i, s, a] = e.inputs[n], c = null;
        (s & Ss.SignalBased) !== 0 && (c = t[i][ee]), c !== null && c.transformFn !== void 0 ? r = c.transformFn(r) : a !== null && (r = a.call(t, r)), e.setInput !== null ? e.setInput(t, c, r, n, i) : Lp(t, c, i, r)
    } finally {
        M(o)
    }
}
var dr = (function(e) {
        return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e
    })(dr || {}),
    mu;

function nl(e, t) {
    return mu(e, t)
}

function FI(e) {
    mu === void 0 && (mu = e())
}
var Kr = new Set,
    Ns = (function(e) {
        return e[e.CHANGE_DETECTION = 0] = "CHANGE_DETECTION", e[e.AFTER_NEXT_RENDER = 1] = "AFTER_NEXT_RENDER", e
    })(Ns || {}),
    lo = new T(""),
    hp = new Set;

function Tt(e) {
    hp.has(e) || (hp.add(e), performance ? .mark ? .("mark_feature_usage", {
        detail: {
            feature: e
        }
    }))
}
var Oh = !1,
    yu = class extends Ee {
        __isAsync;
        destroyRef = void 0;
        pendingTasks = void 0;
        constructor(t = !1) {
            super(), this.__isAsync = t, uc() && (this.destroyRef = v(fe, {
                optional: !0
            }) ? ? void 0, this.pendingTasks = v(Vt, {
                optional: !0
            }) ? ? void 0)
        }
        emit(t) {
            let n = M(null);
            try {
                super.next(t)
            } finally {
                M(n)
            }
        }
        subscribe(t, n, r) {
            let o = t,
                i = n || (() => null),
                s = r;
            if (t && typeof t == "object") {
                let c = t;
                o = c.next ? .bind(c), i = c.error ? .bind(c), s = c.complete ? .bind(c)
            }
            this.__isAsync && (i = this.wrapInTimeout(i), o && (o = this.wrapInTimeout(o)), s && (s = this.wrapInTimeout(s)));
            let a = super.subscribe({
                next: o,
                error: i,
                complete: s
            });
            return t instanceof W && t.add(a), a
        }
        wrapInTimeout(t) {
            return n => {
                let r = this.pendingTasks ? .add();
                setTimeout(() => {
                    try {
                        t(n)
                    } finally {
                        r !== void 0 && this.pendingTasks ? .remove(r)
                    }
                })
            }
        }
    },
    Et = yu;

function Fh(e) {
    let t, n;

    function r() {
        e = In;
        try {
            n !== void 0 && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(n), t !== void 0 && clearTimeout(t)
        } catch {}
    }
    return t = setTimeout(() => {
        e(), r()
    }), typeof requestAnimationFrame == "function" && (n = requestAnimationFrame(() => {
        e(), r()
    })), () => r()
}

function gp(e) {
    return queueMicrotask(() => e()), () => {
        e = In
    }
}
var rl = "isAngularZone",
    cs = rl + "_ID",
    kI = 0,
    re = class e {
        hasPendingMacrotasks = !1;
        hasPendingMicrotasks = !1;
        isStable = !0;
        onUnstable = new Et(!1);
        onMicrotaskEmpty = new Et(!1);
        onStable = new Et(!1);
        onError = new Et(!1);
        constructor(t) {
            let {
                enableLongStackTrace: n = !1,
                shouldCoalesceEventChangeDetection: r = !1,
                shouldCoalesceRunChangeDetection: o = !1,
                scheduleInRootZone: i = Oh
            } = t;
            if (typeof Zone > "u") throw new D(908, !1);
            Zone.assertZonePatched();
            let s = this;
            s._nesting = 0, s._outer = s._inner = Zone.current, Zone.TaskTrackingZoneSpec && (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec)), n && Zone.longStackTraceZoneSpec && (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)), s.shouldCoalesceEventChangeDetection = !o && r, s.shouldCoalesceRunChangeDetection = o, s.callbackScheduled = !1, s.scheduleInRootZone = i, jI(s)
        }
        static isInAngularZone() {
            return typeof Zone < "u" && Zone.current.get(rl) === !0
        }
        static assertInAngularZone() {
            if (!e.isInAngularZone()) throw new D(909, !1)
        }
        static assertNotInAngularZone() {
            if (e.isInAngularZone()) throw new D(909, !1)
        }
        run(t, n, r) {
            return this._inner.run(t, n, r)
        }
        runTask(t, n, r, o) {
            let i = this._inner,
                s = i.scheduleEventTask("NgZoneEvent: " + o, t, PI, In, In);
            try {
                return i.runTask(s, n, r)
            } finally {
                i.cancelTask(s)
            }
        }
        runGuarded(t, n, r) {
            return this._inner.runGuarded(t, n, r)
        }
        runOutsideAngular(t) {
            return this._outer.run(t)
        }
    },
    PI = {};

function ol(e) {
    if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable) try {
        e._nesting++, e.onMicrotaskEmpty.emit(null)
    } finally {
        if (e._nesting--, !e.hasPendingMicrotasks) try {
            e.runOutsideAngular(() => e.onStable.emit(null))
        } finally {
            e.isStable = !0
        }
    }
}

function LI(e) {
    if (e.isCheckStableRunning || e.callbackScheduled) return;
    e.callbackScheduled = !0;

    function t() {
        Fh(() => {
            e.callbackScheduled = !1, vu(e), e.isCheckStableRunning = !0, ol(e), e.isCheckStableRunning = !1
        })
    }
    e.scheduleInRootZone ? Zone.root.run(() => {
        t()
    }) : e._outer.run(() => {
        t()
    }), vu(e)
}

function jI(e) {
    let t = () => {
            LI(e)
        },
        n = kI++;
    e._inner = e._inner.fork({
        name: "angular",
        properties: {
            [rl]: !0,
            [cs]: n,
            [cs + n]: !0
        },
        onInvokeTask: (r, o, i, s, a, c) => {
            if (VI(c)) return r.invokeTask(i, s, a, c);
            try {
                return mp(e), r.invokeTask(i, s, a, c)
            } finally {
                (e.shouldCoalesceEventChangeDetection && s.type === "eventTask" || e.shouldCoalesceRunChangeDetection) && t(), yp(e)
            }
        },
        onInvoke: (r, o, i, s, a, c, u) => {
            try {
                return mp(e), r.invoke(i, s, a, c, u)
            } finally {
                e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !BI(c) && t(), yp(e)
            }
        },
        onHasTask: (r, o, i, s) => {
            r.hasTask(i, s), o === i && (s.change == "microTask" ? (e._hasPendingMicrotasks = s.microTask, vu(e), ol(e)) : s.change == "macroTask" && (e.hasPendingMacrotasks = s.macroTask))
        },
        onHandleError: (r, o, i, s) => (r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1)
    })
}

function vu(e) {
    e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.callbackScheduled === !0 ? e.hasPendingMicrotasks = !0 : e.hasPendingMicrotasks = !1
}

function mp(e) {
    e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
}

function yp(e) {
    e._nesting--, ol(e)
}
var Jr = class {
    hasPendingMicrotasks = !1;
    hasPendingMacrotasks = !1;
    isStable = !0;
    onUnstable = new Et;
    onMicrotaskEmpty = new Et;
    onStable = new Et;
    onError = new Et;
    run(t, n, r) {
        return t.apply(n, r)
    }
    runGuarded(t, n, r) {
        return t.apply(n, r)
    }
    runOutsideAngular(t) {
        return t()
    }
    runTask(t, n, r, o) {
        return t.apply(n, r)
    }
};

function VI(e) {
    return kh(e, "__ignore_ng_zone__")
}

function BI(e) {
    return kh(e, "__scheduler_tick__")
}

function kh(e, t) {
    return !Array.isArray(e) || e.length !== 1 ? !1 : e[0] ? .data ? .[t] === !0
}

function Ph(e = "zone.js", t) {
    return e === "noop" ? new Jr : e === "zone.js" ? new re(t) : e
}
var il = (() => {
        class e {
            impl = null;
            execute() {
                this.impl ? .execute()
            }
            static\ u0275prov = A({
                token: e,
                providedIn: "root",
                factory: () => new e
            })
        }
        return e
    })(),
    Lh = [0, 1, 2, 3],
    jh = (() => {
        class e {
            ngZone = v(re);
            scheduler = v(He);
            errorHandler = v(tt, {
                optional: !0
            });
            sequences = new Set;
            deferredRegistrations = new Set;
            executing = !1;
            constructor() {
                v(lo, {
                    optional: !0
                })
            }
            execute() {
                let n = this.sequences.size > 0;
                n && B(16), this.executing = !0;
                for (let r of Lh)
                    for (let o of this.sequences)
                        if (!(o.erroredOrDestroyed || !o.hooks[r])) try {
                            o.pipelinedValue = this.ngZone.runOutsideAngular(() => this.maybeTrace(() => {
                                let i = o.hooks[r];
                                return i(o.pipelinedValue)
                            }, o.snapshot))
                        } catch (i) {
                            o.erroredOrDestroyed = !0, this.errorHandler ? .handleError(i)
                        }
                this.executing = !1;
                for (let r of this.sequences) r.afterRun(), r.once && (this.sequences.delete(r), r.destroy());
                for (let r of this.deferredRegistrations) this.sequences.add(r);
                this.deferredRegistrations.size > 0 && this.scheduler.notify(7), this.deferredRegistrations.clear(), n && B(17)
            }
            register(n) {
                let {
                    view: r
                } = n;
                r !== void 0 ? ((r[hn] ? ? = []).push(n), Lt(r), r[_] |= 8192) : this.executing ? this.deferredRegistrations.add(n) : this.addSequence(n)
            }
            addSequence(n) {
                this.sequences.add(n), this.scheduler.notify(7)
            }
            unregister(n) {
                this.executing && this.sequences.has(n) ? (n.erroredOrDestroyed = !0, n.pipelinedValue = void 0, n.once = !0) : (this.sequences.delete(n), this.deferredRegistrations.delete(n))
            }
            maybeTrace(n, r) {
                return r ? r.run(Ns.AFTER_NEXT_RENDER, n) : n()
            }
            static\ u0275prov = A({
                token: e,
                providedIn: "root",
                factory: () => new e
            })
        }
        return e
    })(),
    us = class {
        impl;
        hooks;
        view;
        once;
        snapshot;
        erroredOrDestroyed = !1;
        pipelinedValue = void 0;
        unregisterOnDestroy;
        constructor(t, n, r, o, i, s = null) {
            this.impl = t, this.hooks = n, this.view = r, this.once = o, this.snapshot = s, this.unregisterOnDestroy = i ? .onDestroy(() => this.destroy())
        }
        afterRun() {
            this.erroredOrDestroyed = !1, this.pipelinedValue = void 0, this.snapshot ? .dispose(), this.snapshot = null
        }
        destroy() {
            this.impl.unregister(this), this.unregisterOnDestroy ? .();
            let t = this.view ? .[hn];
            t && (this.view[hn] = t.filter(n => n !== this))
        }
    };

function HI(e, t) {
    let n = t ? .injector ? ? v(ye);
    return Tt("NgAfterNextRender"), UI(e, n, t, !0)
}

function $I(e) {
    return e instanceof Function ? [void 0, void 0, e, void 0] : [e.earlyRead, e.write, e.mixedReadWrite, e.read]
}

function UI(e, t, n, r) {
    let o = t.get(il);
    o.impl ? ? = t.get(jh);
    let i = t.get(lo, null, {
            optional: !0
        }),
        s = n ? .manualCleanup !== !0 ? t.get(fe) : null,
        a = t.get(or, null, {
            optional: !0
        }),
        c = new us(o.impl, $I(e), a ? .view, r, s, i ? .snapshot(null));
    return o.impl.register(c), c
}
var Vh = new T("", {
    providedIn: "root",
    factory: () => ({
        queue: new Set,
        isScheduled: !1,
        scheduler: null
    })
});

function Bh(e, t, n) {
    let r = e.get(Vh);
    if (Array.isArray(t))
        for (let o of t) r.queue.add(o), n ? .detachedLeaveAnimationFns ? .push(o);
    else r.queue.add(t), n ? .detachedLeaveAnimationFns ? .push(t);
    r.scheduler && r.scheduler(e)
}

function zI(e, t) {
    let n = e.get(Vh);
    if (t.detachedLeaveAnimationFns) {
        for (let r of t.detachedLeaveAnimationFns) n.queue.delete(r);
        t.detachedLeaveAnimationFns = void 0
    }
}

function GI(e, t) {
    for (let [n, r] of t) Bh(e, r.animateFns)
}

function vp(e, t, n, r) {
    let o = e ? .[gn] ? .enter;
    t !== null && o && o.has(n.index) && GI(r, o)
}

function ir(e, t, n, r, o, i, s, a) {
    if (o != null) {
        let c, u = !1;
        Ue(o) ? c = o : it(o) && (u = !0, o = o[xe]);
        let l = be(o);
        e === 0 && r !== null ? (vp(a, r, i, n), s == null ? Sh(t, r, l) : lr(t, r, l, s || null, !0)) : e === 1 && r !== null ? (vp(a, r, i, n), lr(t, r, l, s || null, !0)) : e === 2 ? Dp(a, i, n, d => {
            Nh(t, l, u, d)
        }) : e === 3 && Dp(a, i, n, () => {
            t.destroyNode(l)
        }), c != null && XI(t, e, n, c, i, r, s)
    }
}

function WI(e, t) {
    Hh(e, t), t[xe] = null, t[de] = null
}

function qI(e, t, n, r, o, i) {
    r[xe] = o, r[de] = t, As(e, r, n, 1, o, i)
}

function Hh(e, t) {
    t[rt].changeDetectionScheduler ? .notify(9), As(e, t, t[O], 2, null, null)
}

function ZI(e) {
    let t = e[Qn];
    if (!t) return Uc(e[C], e);
    for (; t;) {
        let n = null;
        if (it(t)) n = t[Qn];
        else {
            let r = t[Z];
            r && (n = r)
        }
        if (!n) {
            for (; t && !t[Ae] && t !== e;) it(t) && Uc(t[C], t), t = t[te];
            t === null && (t = e), it(t) && Uc(t[C], t), n = t && t[Ae]
        }
        t = n
    }
}

function sl(e, t) {
    let n = e[mn],
        r = n.indexOf(t);
    n.splice(r, 1)
}

function xs(e, t) {
    if (yn(t)) return;
    let n = t[O];
    n.destroyNode && As(e, t, n, 3, null, null), ZI(t)
}

function Uc(e, t) {
    if (yn(t)) return;
    let n = M(null);
    try {
        t[_] &= -129, t[_] |= 256, t[Ce] && nn(t[Ce]), KI(e, t), QI(e, t), t[C].type === 1 && t[O].destroy();
        let r = t[kt];
        if (r !== null && Ue(t[te])) {
            r !== t[te] && sl(r, t);
            let o = t[ot];
            o !== null && o.detachView(e)
        }
        nu(t)
    } finally {
        M(n)
    }
}

function Dp(e, t, n, r) {
    let o = e ? .[gn];
    if (o == null || o.leave == null || !o.leave.has(t.index)) return r(!1);
    e && Kr.add(e), Bh(n, () => {
        if (o.leave && o.leave.has(t.index)) {
            let s = o.leave.get(t.index),
                a = [];
            if (s) {
                for (let c = 0; c < s.animateFns.length; c++) {
                    let u = s.animateFns[c],
                        {
                            promise: l
                        } = u();
                    a.push(l)
                }
                o.detachedLeaveAnimationFns = void 0
            }
            o.running = Promise.allSettled(a), YI(e, r)
        } else e && Kr.delete(e), r(!1)
    }, o)
}

function YI(e, t) {
    let n = e[gn] ? .running;
    if (n) {
        n.then(() => {
            e[gn].running = void 0, Kr.delete(e), t(!0)
        });
        return
    }
    t(!1)
}

function QI(e, t) {
    let n = e.cleanup,
        r = t[Yn];
    if (n !== null)
        for (let s = 0; s < n.length - 1; s += 2)
            if (typeof n[s] == "string") {
                let a = n[s + 3];
                a >= 0 ? r[a]() : r[-a].unsubscribe(), s += 2
            } else {
                let a = r[n[s + 1]];
                n[s].call(a)
            }
    r !== null && (t[Yn] = null);
    let o = t[ft];
    if (o !== null) {
        t[ft] = null;
        for (let s = 0; s < o.length; s++) {
            let a = o[s];
            a()
        }
    }
    let i = t[mt];
    if (i !== null) {
        t[mt] = null;
        for (let s of i) s.destroy()
    }
}

function KI(e, t) {
    let n;
    if (e != null && (n = e.destroyHooks) != null)
        for (let r = 0; r < n.length; r += 2) {
            let o = t[n[r]];
            if (!(o instanceof Cn)) {
                let i = n[r + 1];
                if (Array.isArray(i))
                    for (let s = 0; s < i.length; s += 2) {
                        let a = o[i[s]],
                            c = i[s + 1];
                        B(4, a, c);
                        try {
                            c.call(a)
                        } finally {
                            B(5, a, c)
                        }
                    } else {
                        B(4, o, i);
                        try {
                            i.call(o)
                        } finally {
                            B(5, o, i)
                        }
                    }
            }
        }
}

function $h(e, t, n) {
    return Uh(e, t.parent, n)
}

function Uh(e, t, n) {
    let r = t;
    for (; r !== null && r.type & 168;) t = r, r = t.parent;
    if (r === null) return n[xe];
    if (yt(r)) {
        let {
            encapsulation: o
        } = e.data[r.directiveStart + r.componentOffset];
        if (o === ur.None || o === ur.Emulated) return null
    }
    return Re(r, n)
}

function zh(e, t, n) {
    return Wh(e, t, n)
}

function Gh(e, t, n) {
    return e.type & 40 ? Re(e, n) : null
}
var Wh = Gh,
    Du;

function qh(e, t) {
    Wh = e, Du = t
}

function al(e, t, n, r) {
    let o = $h(e, r, t),
        i = t[O],
        s = r.parent || t[de],
        a = zh(s, r, t);
    if (o != null)
        if (Array.isArray(n))
            for (let c = 0; c < n.length; c++) pp(i, o, n[c], a, !1);
        else pp(i, o, n, a, !1);
    Du !== void 0 && Du(i, r, t, n, o)
}

function qr(e, t) {
    if (t !== null) {
        let n = t.type;
        if (n & 3) return Re(t, e);
        if (n & 4) return Eu(-1, e[t.index]);
        if (n & 8) {
            let r = t.child;
            if (r !== null) return qr(e, r); {
                let o = e[t.index];
                return Ue(o) ? Eu(-1, o) : be(o)
            }
        } else {
            if (n & 128) return qr(e, t.next);
            if (n & 32) return nl(t, e)() || be(e[t.index]); {
                let r = Zh(e, t);
                if (r !== null) {
                    if (Array.isArray(r)) return r[0];
                    let o = Ot(e[se]);
                    return qr(o, r)
                } else return qr(e, t.next)
            }
        }
    }
    return null
}

function Zh(e, t) {
    if (t !== null) {
        let r = e[se][de],
            o = t.projection;
        return r.projection[o]
    }
    return null
}

function Eu(e, t) {
    let n = Z + e + 1;
    if (n < t.length) {
        let r = t[n],
            o = r[C].firstChild;
        if (o !== null) return qr(r, o)
    }
    return t[Pt]
}

function cl(e, t, n, r, o, i, s) {
    for (; n != null;) {
        let a = r[gt];
        if (n.type === 128) {
            n = n.next;
            continue
        }
        let c = r[n.index],
            u = n.type;
        if (s && t === 0 && (c && cr(be(c), r), n.flags |= 2), !bs(n))
            if (u & 8) cl(e, t, n.child, r, o, i, !1), ir(t, e, a, o, c, n, i, r);
            else if (u & 32) {
            let l = nl(n, r),
                d;
            for (; d = l();) ir(t, e, a, o, d, n, i, r);
            ir(t, e, a, o, c, n, i, r)
        } else u & 16 ? Yh(e, t, r, n, o, i) : ir(t, e, a, o, c, n, i, r);
        n = s ? n.projectionNext : n.next
    }
}

function As(e, t, n, r, o, i) {
    cl(n, r, e.firstChild, t, o, i, !1)
}

function JI(e, t, n) {
    let r = t[O],
        o = $h(e, n, t),
        i = n.parent || t[de],
        s = zh(i, n, t);
    Yh(r, 0, t, n, o, s)
}

function Yh(e, t, n, r, o, i) {
    let s = n[se],
        c = s[de].projection[r.projection];
    if (Array.isArray(c))
        for (let u = 0; u < c.length; u++) {
            let l = c[u];
            ir(t, e, n[gt], o, l, r, i, n)
        } else {
            let u = c,
                l = s[te];
            eh(r) && (u.flags |= 128), cl(e, t, u, l, o, i, !0)
        }
}

function XI(e, t, n, r, o, i, s) {
    let a = r[Pt],
        c = be(r);
    a !== c && ir(t, e, n, i, a, o, s);
    for (let u = Z; u < r.length; u++) {
        let l = r[u];
        As(l[C], l, e, t, i, a)
    }
}

function ew(e, t, n, r, o) {
    if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
    else {
        let i = r.indexOf("-") === -1 ? void 0 : dr.DashCase;
        o == null ? e.removeStyle(n, r, i) : (typeof o == "string" && o.endsWith("!important") && (o = o.slice(0, -10), i |= dr.Important), e.setStyle(n, r, o, i))
    }
}

function Qh(e, t, n, r, o) {
    let i = _e(),
        s = r & 2;
    try {
        jt(-1), s && t.length > P && Rh(e, t, P, !1), B(s ? 2 : 0, o, n), n(r, o)
    } finally {
        jt(i), B(s ? 3 : 1, o, n)
    }
}

function Rs(e, t, n) {
    iw(e, t, n), (n.flags & 64) === 64 && sw(e, t, n)
}

function fo(e, t, n = Re) {
    let r = t.localNames;
    if (r !== null) {
        let o = t.index + 1;
        for (let i = 0; i < r.length; i += 2) {
            let s = r[i + 1],
                a = s === -1 ? n(t, e) : e[s];
            e[o++] = a
        }
    }
}

function tw(e, t, n, r) {
    let i = r.get(uh, ch) || n === ur.ShadowDom,
        s = e.selectRootElement(t, i);
    return nw(s), s
}

function nw(e) {
    rw(e)
}
var rw = () => null;

function ow(e) {
    return e === "class" ? "className" : e === "for" ? "htmlFor" : e === "formaction" ? "formAction" : e === "innerHtml" ? "innerHTML" : e === "readonly" ? "readOnly" : e === "tabindex" ? "tabIndex" : e
}

function Kh(e, t, n, r, o, i) {
    let s = t[C];
    if (Os(e, s, t, n, r)) {
        yt(e) && Jh(t, e.index);
        return
    }
    e.type & 3 && (n = ow(n)), ul(e, t, n, r, o, i)
}

function ul(e, t, n, r, o, i) {
    if (e.type & 3) {
        let s = Re(e, t);
        r = i != null ? i(r, e.value || "", n) : r, o.setProperty(s, n, r)
    } else e.type & 12
}

function Jh(e, t) {
    let n = Oe(t, e);
    n[_] & 16 || (n[_] |= 64)
}

function iw(e, t, n) {
    let r = n.directiveStart,
        o = n.directiveEnd;
    yt(n) && RI(t, n, e.data[r + n.componentOffset]), e.firstCreatePass || ss(n, t);
    let i = n.initialInputs;
    for (let s = r; s < o; s++) {
        let a = e.data[s],
            c = Qr(t, e, s, n);
        if (cr(c, t), i !== null && uw(t, s - r, c, a, n, i), ze(a)) {
            let u = Oe(n.index, t);
            u[q] = Qr(t, e, s, n)
        }
    }
}

function sw(e, t, n) {
    let r = n.directiveStart,
        o = n.directiveEnd,
        i = n.index,
        s = Wf();
    try {
        jt(i);
        for (let a = r; a < o; a++) {
            let c = e.data[a],
                u = t[a];
            ji(a), (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) && aw(c, u)
        }
    } finally {
        jt(-1), ji(s)
    }
}

function aw(e, t) {
    e.hostBindings !== null && e.hostBindings(1, t)
}

function ll(e, t) {
    let n = e.directiveRegistry,
        r = null;
    if (n)
        for (let o = 0; o < n.length; o++) {
            let i = n[o];
            Th(t, i.selectors, !1) && (r ? ? = [], ze(i) ? r.unshift(i) : r.push(i))
        }
    return r
}

function cw(e, t, n, r, o, i) {
    let s = Re(e, t);
    Xh(t[O], s, i, e.value, n, r, o)
}

function Xh(e, t, n, r, o, i, s) {
    if (i == null) e.removeAttribute(t, o, n);
    else {
        let a = s == null ? le(i) : s(i, r || "", o);
        e.setAttribute(t, o, a, n)
    }
}

function uw(e, t, n, r, o, i) {
    let s = i[t];
    if (s !== null)
        for (let a = 0; a < s.length; a += 2) {
            let c = s[a],
                u = s[a + 1];
            gu(r, n, c, u)
        }
}

function dl(e, t, n, r, o) {
    let i = P + n,
        s = t[C],
        a = o(s, t, e, r, n);
    t[i] = a, st(e, !0);
    let c = e.type === 2;
    return c ? (xh(t[O], a, e), (Vf() === 0 || Kn(e)) && cr(a, t), Bf()) : cr(a, t), Gr() && (!c || !bs(e)) && al(s, t, a, e), e
}

function fl(e) {
    let t = e;
    return Sc() ? Nc() : (t = t.parent, st(t, !1)), t
}

function lw(e, t, n) {
    return (e === null || ze(e)) && (n = mc(n[t.index])), n[O]
}

function dw(e, t) {
    let n = e[gt];
    if (!n) return;
    let r;
    try {
        r = n.get(We, null)
    } catch {
        r = null
    }
    r ? .(t)
}

function Os(e, t, n, r, o) {
    let i = e.inputs ? .[r],
        s = e.hostDirectiveInputs ? .[r],
        a = !1;
    if (s)
        for (let c = 0; c < s.length; c += 2) {
            let u = s[c],
                l = s[c + 1],
                d = t.data[u];
            gu(d, n[u], l, o), a = !0
        }
    if (i)
        for (let c of i) {
            let u = n[c],
                l = t.data[c];
            gu(l, u, r, o), a = !0
        }
    return a
}

function fw(e, t) {
    let n = Oe(t, e),
        r = n[C];
    pw(r, n);
    let o = n[xe];
    o !== null && n[dn] === null && (n[dn] = lh(o, n[gt])), B(18), pl(r, n, n[q]), B(19, n[q])
}

function pw(e, t) {
    for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n])
}

function pl(e, t, n) {
    Bi(t);
    try {
        let r = e.viewQuery;
        r !== null && ou(1, r, n);
        let o = e.template;
        o !== null && Qh(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), t[ot] ? .finishViewCreation(e), e.staticContentQueries && dh(e, t), e.staticViewQueries && ou(2, e.viewQuery, n);
        let i = e.components;
        i !== null && hw(t, i)
    } catch (r) {
        throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r
    } finally {
        t[_] &= -5, Hi()
    }
}

function hw(e, t) {
    for (let n = 0; n < t.length; n++) fw(e, t[n])
}

function po(e, t, n, r) {
    let o = M(null);
    try {
        let i = t.tView,
            a = e[_] & 4096 ? 4096 : 16,
            c = el(e, i, n, a, null, t, null, null, r ? .injector ? ? null, r ? .embeddedViewInjector ? ? null, r ? .dehydratedView ? ? null),
            u = e[t.index];
        c[kt] = u;
        let l = e[ot];
        return l !== null && (c[ot] = l.createEmbeddedView(i)), pl(i, c, n), c
    } finally {
        M(o)
    }
}

function fr(e, t) {
    return !t || t.firstChild === null || eh(e)
}

function Xr(e, t, n, r, o = !1) {
    for (; n !== null;) {
        if (n.type === 128) {
            n = o ? n.projectionNext : n.next;
            continue
        }
        let i = t[n.index];
        i !== null && r.push(be(i)), Ue(i) && eg(i, r);
        let s = n.type;
        if (s & 8) Xr(e, t, n.child, r);
        else if (s & 32) {
            let a = nl(n, t),
                c;
            for (; c = a();) r.push(c)
        } else if (s & 16) {
            let a = Zh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
                let c = Ot(t[se]);
                Xr(c[C], c, a, r, !0)
            }
        }
        n = o ? n.projectionNext : n.next
    }
    return r
}

function eg(e, t) {
    for (let n = Z; n < e.length; n++) {
        let r = e[n],
            o = r[C].firstChild;
        o !== null && Xr(r[C], r, o, t)
    }
    e[Pt] !== e[xe] && t.push(e[Pt])
}

function tg(e) {
    if (e[hn] !== null) {
        for (let t of e[hn]) t.impl.addSequence(t);
        e[hn].length = 0
    }
}
var ng = [];

function gw(e) {
    return e[Ce] ? ? mw(e)
}

function mw(e) {
    let t = ng.pop() ? ? Object.create(vw);
    return t.lView = e, t
}

function yw(e) {
    e.lView[Ce] !== e && (e.lView = null, ng.push(e))
}
var vw = G(H({}, Xt), {
    consumerIsAlwaysLive: !0,
    kind: "template",
    consumerMarkedDirty: e => {
        Lt(e.lView)
    },
    consumerOnSignalRead() {
        this.lView[Ce] = this
    }
});

function Dw(e) {
    let t = e[Ce] ? ? Object.create(Ew);
    return t.lView = e, t
}
var Ew = G(H({}, Xt), {
    consumerIsAlwaysLive: !0,
    kind: "template",
    consumerMarkedDirty: e => {
        let t = Ot(e.lView);
        for (; t && !rg(t[C]);) t = Ot(t);
        t && Dc(t)
    },
    consumerOnSignalRead() {
        this.lView[Ce] = this
    }
});

function rg(e) {
    return e.type !== 2
}

function og(e) {
    if (e[mt] === null) return;
    let t = !0;
    for (; t;) {
        let n = !1;
        for (let r of e[mt]) r.dirty && (n = !0, r.zone === null || Zone.current === r.zone ? r.run() : r.zone.run(() => r.run()));
        t = n && !!(e[_] & 8192)
    }
}
var Iw = 100;

function ig(e, t = 0) {
    let r = e[rt].rendererFactory,
        o = !1;
    o || r.begin ? .();
    try {
        ww(e, t)
    } finally {
        o || r.end ? .()
    }
}

function ww(e, t) {
    let n = Ac();
    try {
        tr(!0), Iu(e, t);
        let r = 0;
        for (; Ur(e);) {
            if (r === Iw) throw new D(103, !1);
            r++, Iu(e, 1)
        }
    } finally {
        tr(n)
    }
}

function Cw(e, t, n, r) {
    if (yn(t)) return;
    let o = t[_],
        i = !1,
        s = !1;
    Bi(t);
    let a = !0,
        c = null,
        u = null;
    i || (rg(e) ? (u = gw(t), c = tn(u)) : vi() === null ? (a = !1, u = Dw(t), c = tn(u)) : t[Ce] && (nn(t[Ce]), t[Ce] = null));
    try {
        vc(t), Uf(e.bindingStartIndex), n !== null && Qh(e, t, n, 2, r);
        let l = (o & 3) === 3;
        if (!i)
            if (l) {
                let p = e.preOrderCheckHooks;
                p !== null && Qi(t, p, null)
            } else {
                let p = e.preOrderHooks;
                p !== null && Ki(t, p, 0, null), Hc(t, 0)
            }
        if (s || bw(t), og(t), sg(t, 0), e.contentQueries !== null && dh(e, t), !i)
            if (l) {
                let p = e.contentCheckHooks;
                p !== null && Qi(t, p)
            } else {
                let p = e.contentHooks;
                p !== null && Ki(t, p, 1), Hc(t, 1)
            }
        _w(e, t);
        let d = e.components;
        d !== null && cg(t, d, 0);
        let f = e.viewQuery;
        if (f !== null && ou(2, f, r), !i)
            if (l) {
                let p = e.viewCheckHooks;
                p !== null && Qi(t, p)
            } else {
                let p = e.viewHooks;
                p !== null && Ki(t, p, 2), Hc(t, 2)
            }
        if (e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Oi]) {
            for (let p of t[Oi]) p();
            t[Oi] = null
        }
        i || (tg(t), t[_] &= -73)
    } catch (l) {
        throw i || Lt(t), l
    } finally {
        u !== null && (Hn(u, c), a && yw(u)), Hi()
    }
}

function sg(e, t) {
    for (let n = nh(e); n !== null; n = rh(n))
        for (let r = Z; r < n.length; r++) {
            let o = n[r];
            ag(o, t)
        }
}

function bw(e) {
    for (let t = nh(e); t !== null; t = rh(t)) {
        if (!(t[_] & 2)) continue;
        let n = t[mn];
        for (let r = 0; r < n.length; r++) {
            let o = n[r];
            Dc(o)
        }
    }
}

function Tw(e, t, n) {
    B(18);
    let r = Oe(t, e);
    ag(r, n), B(19, r[q])
}

function ag(e, t) {
    Fi(e) && Iu(e, t)
}

function Iu(e, t) {
    let r = e[C],
        o = e[_],
        i = e[Ce],
        s = !!(t === 0 && o & 16);
    if (s || = !!(o & 64 && t === 0), s || = !!(o & 1024), s || = !!(i ? .dirty && $n(i)), s || = !1, i && (i.dirty = !1), e[_] &= -9217, s) Cw(r, e, r.template, e[q]);
    else if (o & 8192) {
        let a = M(null);
        try {
            og(e), sg(e, 1);
            let c = r.components;
            c !== null && cg(e, c, 1), tg(e)
        } finally {
            M(a)
        }
    }
}

function cg(e, t, n) {
    for (let r = 0; r < t.length; r++) Tw(e, t[r], n)
}

function _w(e, t) {
    let n = e.hostBindingOpCodes;
    if (n !== null) try {
        for (let r = 0; r < n.length; r++) {
            let o = n[r];
            if (o < 0) jt(~o);
            else {
                let i = o,
                    s = n[++r],
                    a = n[++r];
                Gf(s, i);
                let c = t[i];
                B(24, c), a(2, c), B(25, c)
            }
        }
    } finally {
        jt(-1)
    }
}

function hl(e, t) {
    let n = Ac() ? 64 : 1088;
    for (e[rt].changeDetectionScheduler ? .notify(t); e;) {
        e[_] |= n;
        let r = Ot(e);
        if (Jn(e) && !r) return e;
        e = r
    }
    return null
}

function ug(e, t, n, r) {
    return [e, !0, 0, t, null, r, null, n, null, null]
}

function lg(e, t) {
    let n = Z + t;
    if (n < e.length) return e[n]
}

function ho(e, t, n, r = !0) {
    let o = t[C];
    if (Mw(o, t, e, n), r) {
        let s = Eu(n, e),
            a = t[O],
            c = a.parentNode(e[Pt]);
        c !== null && qI(o, e[de], a, t, c, s)
    }
    let i = t[dn];
    i !== null && i.firstChild !== null && (i.firstChild = null)
}

function dg(e, t) {
    let n = eo(e, t);
    return n !== void 0 && xs(n[C], n), n
}

function eo(e, t) {
    if (e.length <= Z) return;
    let n = Z + t,
        r = e[n];
    if (r) {
        let o = r[kt];
        o !== null && o !== e && sl(o, r), t > 0 && (e[n - 1][Ae] = r[Ae]);
        let i = Pr(e, Z + t);
        WI(r[C], r);
        let s = i[ot];
        s !== null && s.detachView(i[C]), r[te] = null, r[Ae] = null, r[_] &= -129
    }
    return r
}

function Mw(e, t, n, r) {
    let o = Z + r,
        i = n.length;
    r > 0 && (n[o - 1][Ae] = t), r < i - Z ? (t[Ae] = n[o], Xa(n, Z + r, t)) : (n.push(t), t[Ae] = null), t[te] = n;
    let s = t[kt];
    s !== null && n !== s && fg(s, t);
    let a = t[ot];
    a !== null && a.insertView(e), ki(t), t[_] |= 128
}

function fg(e, t) {
    let n = e[mn],
        r = t[te];
    if (it(r)) e[_] |= 2;
    else {
        let o = r[te][se];
        t[se] !== o && (e[_] |= 2)
    }
    n === null ? e[mn] = [t] : n.push(t)
}
var Bt = class {
    _lView;
    _cdRefInjectingView;
    _appRef = null;
    _attachedToViewContainer = !1;
    exhaustive;
    get rootNodes() {
        let t = this._lView,
            n = t[C];
        return Xr(n, t, n.firstChild, [])
    }
    constructor(t, n) {
        this._lView = t, this._cdRefInjectingView = n
    }
    get context() {
        return this._lView[q]
    }
    set context(t) {
        this._lView[q] = t
    }
    get destroyed() {
        return yn(this._lView)
    }
    destroy() {
        if (this._appRef) this._appRef.detachView(this);
        else if (this._attachedToViewContainer) {
            let t = this._lView[te];
            if (Ue(t)) {
                let n = t[Br],
                    r = n ? n.indexOf(this) : -1;
                r > -1 && (eo(t, r), Pr(n, r))
            }
            this._attachedToViewContainer = !1
        }
        xs(this._lView[C], this._lView)
    }
    onDestroy(t) {
        Ec(this._lView, t)
    }
    markForCheck() {
        hl(this._cdRefInjectingView || this._lView, 4)
    }
    detach() {
        this._lView[_] &= -129
    }
    reattach() {
        ki(this._lView), this._lView[_] |= 128
    }
    detectChanges() {
        this._lView[_] |= 1024, ig(this._lView)
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
        if (this._appRef) throw new D(902, !1);
        this._attachedToViewContainer = !0
    }
    detachFromAppRef() {
        this._appRef = null;
        let t = Jn(this._lView),
            n = this._lView[kt];
        n !== null && !t && sl(n, this._lView), Hh(this._lView[C], this._lView)
    }
    attachToAppRef(t) {
        if (this._attachedToViewContainer) throw new D(902, !1);
        this._appRef = t;
        let n = Jn(this._lView),
            r = this._lView[kt];
        r !== null && !n && fg(r, this._lView), ki(this._lView)
    }
};
var wt = (() => {
    class e {
        _declarationLView;
        _declarationTContainer;
        elementRef;
        static __NG_ELEMENT_ID__ = Sw;
        constructor(n, r, o) {
            this._declarationLView = n, this._declarationTContainer = r, this.elementRef = o
        }
        get ssrId() {
            return this._declarationTContainer.tView ? .ssrId || null
        }
        createEmbeddedView(n, r) {
            return this.createEmbeddedViewImpl(n, r)
        }
        createEmbeddedViewImpl(n, r, o) {
            let i = po(this._declarationLView, this._declarationTContainer, n, {
                embeddedViewInjector: r,
                dehydratedView: o
            });
            return new Bt(i)
        }
    }
    return e
})();

function Sw() {
    return Fs(Q(), E())
}

function Fs(e, t) {
    return e.type & 4 ? new wt(t, e, mr(e, t)) : null
}

function pg(e, t, n) {
    let r = t.insertBeforeIndex,
        o = Array.isArray(r) ? r[0] : r;
    return o === null ? Gh(e, t, n) : be(n[o])
}

function hg(e, t, n, r, o) {
    let i = t.insertBeforeIndex;
    if (Array.isArray(i)) {
        let s = r,
            a = null;
        if (t.type & 3 || (a = s, s = o), s !== null && t.componentOffset === -1)
            for (let c = 1; c < i.length; c++) {
                let u = n[i[c]];
                lr(e, s, u, a, !1)
            }
    }
}

function _n(e, t, n, r, o) {
    let i = e.data[t];
    if (i === null) i = gl(e, t, n, r, o), zf() && (i.flags |= 32);
    else if (i.type & 64) {
        i.type = n, i.value = r, i.attrs = o;
        let s = er();
        i.injectorIndex = s === null ? -1 : s.injectorIndex
    }
    return st(i, !0), i
}

function gl(e, t, n, r, o) {
    let i = Mc(),
        s = Sc(),
        a = s ? i : i && i.parent,
        c = e.data[t] = xw(e, a, n, t, r, o);
    return Nw(e, c, i, s), c
}

function Nw(e, t, n, r) {
    e.firstChild === null && (e.firstChild = t), n !== null && (r ? n.child == null && t.parent !== null && (n.child = t) : n.next === null && (n.next = t, t.prev = n))
}

function xw(e, t, n, r, o, i) {
    let s = t ? t.injectorIndex : -1,
        a = 0;
    return bc() && (a |= 128), {
        type: n,
        index: r,
        insertBeforeIndex: null,
        injectorIndex: s,
        directiveStart: -1,
        directiveEnd: -1,
        directiveStylingLast: -1,
        componentOffset: -1,
        propertyBindings: null,
        flags: a,
        providerIndexes: 0,
        value: o,
        attrs: i,
        mergedAttrs: null,
        localNames: null,
        initialInputs: null,
        inputs: null,
        hostDirectiveInputs: null,
        outputs: null,
        hostDirectiveOutputs: null,
        directiveToIndex: null,
        tView: null,
        next: null,
        prev: null,
        projectionNext: null,
        child: null,
        parent: t,
        projection: null,
        styles: null,
        stylesWithoutHost: null,
        residualStyles: void 0,
        classes: null,
        classesWithoutHost: null,
        residualClasses: void 0,
        classBindings: 0,
        styleBindings: 0
    }
}

function gg(e, t) {
    if (e.push(t), e.length > 1)
        for (let n = e.length - 2; n >= 0; n--) {
            let r = e[n];
            mg(r) || Aw(r, t) && Rw(r) === null && Ow(r, t.index)
        }
}

function mg(e) {
    return !(e.type & 64)
}

function Aw(e, t) {
    return mg(t) || e.index > t.index
}

function Rw(e) {
    let t = e.insertBeforeIndex;
    return Array.isArray(t) ? t[0] : t
}

function Ow(e, t) {
    let n = e.insertBeforeIndex;
    Array.isArray(n) ? n[0] = t : (qh(pg, hg), e.insertBeforeIndex = t)
}

function Fw(e, t, n) {
    let r = e.data[t];
    r === null ? e.data[t] = n : r.value = n
}

function kw(e, t) {
    let n = e.insertBeforeIndex;
    n === null ? (qh(pg, hg), n = e.insertBeforeIndex = [null, t]) : (Df(Array.isArray(n), !0, "Expecting array here"), n.push(t))
}

function Pw(e, t, n) {
    let r = gl(e, n, 64, null, null);
    return gg(t, r), r
}

function Lw(e, t) {
    let n = t[e.currentCaseLViewIndex];
    return n === null ? n : n < 0 ? ~n : n
}

function jw(e, t, n) {
    return e | t << 17 | n << 1
}

function Vw(e) {
    return e === -1
}

function yg(e, t, n) {
    e.index = 0;
    let r = Lw(t, n);
    r !== null ? e.removes = t.remove[r] : e.removes = ie
}

function wu(e) {
    if (e.index < e.removes.length) {
        let t = e.removes[e.index++];
        if (t > 0) return e.lView[t]; {
            e.stack.push(e.index, e.removes);
            let n = ~t,
                r = e.lView[C].data[n];
            return yg(e, r, e.lView), wu(e)
        }
    } else return e.stack.length === 0 ? (e.lView = void 0, null) : (e.removes = e.stack.pop(), e.index = e.stack.pop(), wu(e))
}

function Bw() {
    let e = {
        stack: [],
        index: -1
    };

    function t(n, r) {
        for (e.lView = r; e.stack.length;) e.stack.pop();
        return yg(e, n.value, r), wu.bind(null, e)
    }
    return t
}
var f1 = new RegExp(`^(\\d+)*(${kE}|${FE})*(.*)`);
var Hw = () => {};

function $w(e, t, n, r) {
    Hw(e, t, n, r)
}

function Uw(e) {
    let t = e[pc] ? ? [],
        r = e[te][O],
        o = [];
    for (let i of t) i.data[ah] !== void 0 ? o.push(i) : zw(i, r);
    e[pc] = o
}

function zw(e, t) {
    let n = 0,
        r = e.firstChild;
    if (r) {
        let o = e.data[sh];
        for (; n < o;) {
            let i = r.nextSibling;
            Nh(t, r, !1), r = i, n++
        }
    }
}
var Gw = () => null,
    Ww = () => null;

function ls(e, t) {
    return Gw(e, t)
}

function vg(e, t, n) {
    return Ww(e, t, n)
}
var Dg = class {},
    ks = class {},
    Cu = class {
        resolveComponentFactory(t) {
            throw new D(917, !1)
        }
    },
    go = class {
        static NULL = new Cu
    },
    to = class {},
    mo = (() => {
        class e {
            destroyNode = null;
            static __NG_ELEMENT_ID__ = () => qw()
        }
        return e
    })();

function qw() {
    let e = E(),
        t = Q(),
        n = Oe(t.index, e);
    return (it(n) ? n : e)[O]
}
var Eg = (() => {
    class e {
        static\ u0275prov = A({
            token: e,
            providedIn: "root",
            factory: () => null
        })
    }
    return e
})();
var Xi = {},
    bu = class {
        injector;
        parentInjector;
        constructor(t, n) {
            this.injector = t, this.parentInjector = n
        }
        get(t, n, r) {
            let o = this.injector.get(t, Xi, r);
            return o !== Xi || n === Xi ? o : this.parentInjector.get(t, n, r)
        }
    };

function ds(e, t, n) {
    let r = n ? e.styles : null,
        o = n ? e.classes : null,
        i = 0;
    if (t !== null)
        for (let s = 0; s < t.length; s++) {
            let a = t[s];
            if (typeof a == "number") i = a;
            else if (i == 1) o = Mi(o, a);
            else if (i == 2) {
                let c = a,
                    u = t[++s];
                r = Mi(r, c + ": " + u + ";")
            }
        }
    n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = o : e.classesWithoutHost = o
}

function j(e, t = 0) {
    let n = E();
    if (n === null) return F(e, t);
    let r = Q();
    return Qp(r, n, oe(e), t)
}

function Zw() {
    let e = "invalid";
    throw new Error(e)
}

function Ig(e, t, n, r, o) {
    let i = r === null ? null : {
            "": -1
        },
        s = o(e, n);
    if (s !== null) {
        let a = s,
            c = null,
            u = null;
        for (let l of s)
            if (l.resolveHostDirectives !== null) {
                [a, c, u] = l.resolveHostDirectives(s);
                break
            }
        Kw(e, t, n, a, i, c, u)
    }
    i !== null && r !== null && Yw(n, r, i)
}

function Yw(e, t, n) {
    let r = e.localNames = [];
    for (let o = 0; o < t.length; o += 2) {
        let i = n[t[o + 1]];
        if (i == null) throw new D(-301, !1);
        r.push(t[o], i)
    }
}

function Qw(e, t, n) {
    t.componentOffset = n, (e.components ? ? = []).push(t.index)
}

function Kw(e, t, n, r, o, i, s) {
    let a = r.length,
        c = !1;
    for (let f = 0; f < a; f++) {
        let p = r[f];
        !c && ze(p) && (c = !0, Qw(e, n, f)), eu(ss(n, t), e, p.type)
    }
    rC(n, e.data.length, a);
    for (let f = 0; f < a; f++) {
        let p = r[f];
        p.providersResolver && p.providersResolver(p)
    }
    let u = !1,
        l = !1,
        d = uo(e, t, a, null);
    a > 0 && (n.directiveToIndex = new Map);
    for (let f = 0; f < a; f++) {
        let p = r[f];
        if (n.mergedAttrs = ar(n.mergedAttrs, p.hostAttrs), Xw(e, n, t, d, p), nC(d, p, o), s !== null && s.has(p)) {
            let [y, m] = s.get(p);
            n.directiveToIndex.set(p.type, [d, y + n.directiveStart, m + n.directiveStart])
        } else(i === null || !i.has(p)) && n.directiveToIndex.set(p.type, d);
        p.contentQueries !== null && (n.flags |= 4), (p.hostBindings !== null || p.hostAttrs !== null || p.hostVars !== 0) && (n.flags |= 64);
        let h = p.type.prototype;
        !u && (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) && ((e.preOrderHooks ? ? = []).push(n.index), u = !0), !l && (h.ngOnChanges || h.ngDoCheck) && ((e.preOrderCheckHooks ? ? = []).push(n.index), l = !0), d++
    }
    Jw(e, n, i)
}

function Jw(e, t, n) {
    for (let r = t.directiveStart; r < t.directiveEnd; r++) {
        let o = e.data[r];
        if (n === null || !n.has(o)) Ep(0, t, o, r), Ep(1, t, o, r), wp(t, r, !1);
        else {
            let i = n.get(o);
            Ip(0, t, i, r), Ip(1, t, i, r), wp(t, r, !0)
        }
    }
}

function Ep(e, t, n, r) {
    let o = e === 0 ? n.inputs : n.outputs;
    for (let i in o)
        if (o.hasOwnProperty(i)) {
            let s;
            e === 0 ? s = t.inputs ? ? = {} : s = t.outputs ? ? = {}, s[i] ? ? = [], s[i].push(r), wg(t, i)
        }
}

function Ip(e, t, n, r) {
    let o = e === 0 ? n.inputs : n.outputs;
    for (let i in o)
        if (o.hasOwnProperty(i)) {
            let s = o[i],
                a;
            e === 0 ? a = t.hostDirectiveInputs ? ? = {} : a = t.hostDirectiveOutputs ? ? = {}, a[s] ? ? = [], a[s].push(r, i), wg(t, s)
        }
}

function wg(e, t) {
    t === "class" ? e.flags |= 8 : t === "style" && (e.flags |= 16)
}

function wp(e, t, n) {
    let {
        attrs: r,
        inputs: o,
        hostDirectiveInputs: i
    } = e;
    if (r === null || !n && o === null || n && i === null || Ku(e)) {
        e.initialInputs ? ? = [], e.initialInputs.push(null);
        return
    }
    let s = null,
        a = 0;
    for (; a < r.length;) {
        let c = r[a];
        if (c === 0) {
            a += 4;
            continue
        } else if (c === 5) {
            a += 2;
            continue
        } else if (typeof c == "number") break;
        if (!n && o.hasOwnProperty(c)) {
            let u = o[c];
            for (let l of u)
                if (l === t) {
                    s ? ? = [], s.push(c, r[a + 1]);
                    break
                }
        } else if (n && i.hasOwnProperty(c)) {
            let u = i[c];
            for (let l = 0; l < u.length; l += 2)
                if (u[l] === t) {
                    s ? ? = [], s.push(u[l + 1], r[a + 1]);
                    break
                }
        }
        a += 2
    }
    e.initialInputs ? ? = [], e.initialInputs.push(s)
}

function Xw(e, t, n, r, o) {
    e.data[r] = o;
    let i = o.factory || (o.factory = Rt(o.type, !0)),
        s = new Cn(i, ze(o), j, null);
    e.blueprint[r] = s, n[r] = s, eC(e, t, r, uo(e, n, o.hostVars, K), o)
}

function eC(e, t, n, r, o) {
    let i = o.hostBindings;
    if (i) {
        let s = e.hostBindingOpCodes;
        s === null && (s = e.hostBindingOpCodes = []);
        let a = ~t.index;
        tC(s) != a && s.push(a), s.push(n, r, i)
    }
}

function tC(e) {
    let t = e.length;
    for (; t > 0;) {
        let n = e[--t];
        if (typeof n == "number" && n < 0) return n
    }
    return 0
}

function nC(e, t, n) {
    if (n) {
        if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
        ze(t) && (n[""] = e)
    }
}

function rC(e, t, n) {
    e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t
}

function ml(e, t, n, r, o, i, s, a) {
    let c = t[C],
        u = c.consts,
        l = Te(u, s),
        d = _n(c, e, n, r, l);
    return i && Ig(c, t, d, Te(u, a), o), d.mergedAttrs = ar(d.mergedAttrs, d.attrs), d.attrs !== null && ds(d, d.attrs, !1), d.mergedAttrs !== null && ds(d, d.mergedAttrs, !0), c.queries !== null && c.queries.elementStart(c, d), d
}

function yl(e, t) {
    Hp(e, t), hc(t) && e.queries.elementEnd(t)
}

function oC(e, t, n, r, o, i) {
    let s = t.consts,
        a = Te(s, o),
        c = _n(t, e, n, r, a);
    if (c.mergedAttrs = ar(c.mergedAttrs, c.attrs), i != null) {
        let u = Te(s, i);
        c.localNames = [];
        for (let l = 0; l < u.length; l += 2) c.localNames.push(u[l], -1)
    }
    return c.attrs !== null && ds(c, c.attrs, !1), c.mergedAttrs !== null && ds(c, c.mergedAttrs, !0), t.queries !== null && t.queries.elementStart(t, c), c
}

function vl(e) {
    return Ps(e) ? Array.isArray(e) || !(e instanceof Map) && Symbol.iterator in e : !1
}

function Cg(e, t) {
    if (Array.isArray(e))
        for (let n = 0; n < e.length; n++) t(e[n]);
    else {
        let n = e[Symbol.iterator](),
            r;
        for (; !(r = n.next()).done;) t(r.value)
    }
}

function Ps(e) {
    return e !== null && (typeof e == "function" || typeof e == "object")
}

function Ut(e, t, n) {
    return e[t] = n
}

function Ls(e, t) {
    return e[t]
}

function ae(e, t, n) {
    if (n === K) return !1;
    let r = e[t];
    return Object.is(r, n) ? !1 : (e[t] = n, !0)
}

function pr(e, t, n, r) {
    let o = ae(e, t, n);
    return ae(e, t + 1, r) || o
}

function Dl(e, t, n, r, o) {
    let i = pr(e, t, n, r);
    return ae(e, t + 2, o) || i
}

function yo(e, t, n, r, o, i) {
    let s = pr(e, t, n, r);
    return pr(e, t + 2, o, i) || s
}

function es(e, t, n) {
    return function r(o) {
        let i = yt(e) ? Oe(e.index, t) : t;
        hl(i, 5);
        let s = t[q],
            a = Cp(t, s, n, o),
            c = r.__ngNextListenerFn__;
        for (; c;) a = Cp(t, s, c, o) && a, c = c.__ngNextListenerFn__;
        return a
    }
}

function Cp(e, t, n, r) {
    let o = M(null);
    try {
        return B(6, t, n), n(r) !== !1
    } catch (i) {
        return dw(e, i), !1
    } finally {
        B(7, t, n), M(o)
    }
}

function bg(e, t, n, r, o, i, s, a) {
    let c = Kn(e),
        u = !1,
        l = null;
    if (!r && c && (l = sC(t, n, i, e.index)), l !== null) {
        let d = l.__ngLastListenerFn__ || l;
        d.__ngNextListenerFn__ = s, l.__ngLastListenerFn__ = s, u = !0
    } else {
        let d = Re(e, n),
            f = r ? r(d) : d;
        jE(n, f, i, a);
        let p = o.listen(f, i, a);
        if (!iC(i)) {
            let h = r ? y => r(be(y[e.index])) : e.index;
            Tg(h, t, n, i, a, p, !1)
        }
    }
    return u
}

function iC(e) {
    return e.startsWith("animation") || e.startsWith("transition")
}

function sC(e, t, n, r) {
    let o = e.cleanup;
    if (o != null)
        for (let i = 0; i < o.length - 1; i += 2) {
            let s = o[i];
            if (s === n && o[i + 1] === r) {
                let a = t[Yn],
                    c = o[i + 2];
                return a && a.length > c ? a[c] : null
            }
            typeof s == "string" && (i += 2)
        }
    return null
}

function Tg(e, t, n, r, o, i, s) {
    let a = t.firstCreatePass ? wc(t) : null,
        c = Ic(n),
        u = c.length;
    c.push(o, i), a && a.push(r, e, u, (u + 1) * (s ? -1 : 1))
}

function bp(e, t, n, r, o, i) {
    let s = t[n],
        a = t[C],
        u = a.data[n].outputs[r],
        d = s[u].subscribe(i);
    Tg(e.index, a, t, o, i, d, !0)
}
var Tu = Symbol("BINDING");
var fs = class extends go {
    ngModule;
    constructor(t) {
        super(), this.ngModule = t
    }
    resolveComponentFactory(t) {
        let n = nt(t);
        return new Ht(n, this.ngModule)
    }
};

function aC(e) {
    return Object.keys(e).map(t => {
        let [n, r, o] = e[t], i = {
            propName: n,
            templateName: t,
            isSignal: (r & Ss.SignalBased) !== 0
        };
        return o && (i.transform = o), i
    })
}

function cC(e) {
    return Object.keys(e).map(t => ({
        propName: e[t],
        templateName: t
    }))
}

function uC(e, t, n) {
    let r = t instanceof Ie ? t : t ? .injector;
    return r && e.getStandaloneInjector !== null && (r = e.getStandaloneInjector(r) || r), r ? new bu(n, r) : n
}

function lC(e) {
    let t = e.get(to, null);
    if (t === null) throw new D(407, !1);
    let n = e.get(Eg, null),
        r = e.get(He, null);
    return {
        rendererFactory: t,
        sanitizer: n,
        changeDetectionScheduler: r,
        ngReflect: !1
    }
}

function dC(e, t) {
    let n = _g(e);
    return Ju(t, n, n === "svg" ? gc : n === "math" ? Of : null)
}

function _g(e) {
    return (e.selectors[0][0] || "div").toLowerCase()
}
var Ht = class extends ks {
    componentDef;
    ngModule;
    selector;
    componentType;
    ngContentSelectors;
    isBoundToModule;
    cachedInputs = null;
    cachedOutputs = null;
    get inputs() {
        return this.cachedInputs ? ? = aC(this.componentDef.inputs), this.cachedInputs
    }
    get outputs() {
        return this.cachedOutputs ? ? = cC(this.componentDef.outputs), this.cachedOutputs
    }
    constructor(t, n) {
        super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = TI(t.selectors), this.ngContentSelectors = t.ngContentSelectors ? ? [], this.isBoundToModule = !!n
    }
    create(t, n, r, o, i, s) {
        B(22);
        let a = M(null);
        try {
            let c = this.componentDef,
                u = fC(r, c, s, i),
                l = uC(c, o || this.ngModule, t),
                d = lC(l),
                f = d.rendererFactory.createRenderer(null, c),
                p = r ? tw(f, r, c.encapsulation, l) : dC(c, f),
                h = s ? .some(Tp) || i ? .some(g => typeof g != "function" && g.bindings.some(Tp)),
                y = el(null, u, null, 512 | Ah(c), null, null, d, f, l, null, lh(p, l, !0));
            y[P] = p, Bi(y);
            let m = null;
            try {
                let g = ml(P, y, 2, "#host", () => u.directiveRegistry, !0, 0);
                xh(f, p, g), cr(p, y), Rs(u, y, g), Zu(u, g, y), yl(u, g), n !== void 0 && hC(g, this.ngContentSelectors, n), m = Oe(g.index, y), y[q] = m[q], pl(u, y, null)
            } catch (g) {
                throw m !== null && nu(m), nu(y), g
            } finally {
                B(23), Hi()
            }
            return new ps(this.componentType, y, !!h)
        } finally {
            M(a)
        }
    }
};

function fC(e, t, n, r) {
    let o = e ? ["ng-version", "20.3.13"] : _I(t.selectors[0]),
        i = null,
        s = null,
        a = 0;
    if (n)
        for (let l of n) a += l[Tu].requiredVars, l.create && (l.targetIdx = 0, (i ? ? = []).push(l)), l.update && (l.targetIdx = 0, (s ? ? = []).push(l));
    if (r)
        for (let l = 0; l < r.length; l++) {
            let d = r[l];
            if (typeof d != "function")
                for (let f of d.bindings) {
                    a += f[Tu].requiredVars;
                    let p = l + 1;
                    f.create && (f.targetIdx = p, (i ? ? = []).push(f)), f.update && (f.targetIdx = p, (s ? ? = []).push(f))
                }
        }
    let c = [t];
    if (r)
        for (let l of r) {
            let d = typeof l == "function" ? l : l.type,
                f = rc(d);
            c.push(f)
        }
    return Xu(0, null, pC(i, s), 1, a, c, null, null, null, [o], null)
}

function pC(e, t) {
    return !e && !t ? null : n => {
        if (n & 1 && e)
            for (let r of e) r.create();
        if (n & 2 && t)
            for (let r of t) r.update()
    }
}

function Tp(e) {
    let t = e[Tu].kind;
    return t === "input" || t === "twoWay"
}
var ps = class extends Dg {
    _rootLView;
    _hasInputBindings;
    instance;
    hostView;
    changeDetectorRef;
    componentType;
    location;
    previousInputValues = null;
    _tNode;
    constructor(t, n, r) {
        super(), this._rootLView = n, this._hasInputBindings = r, this._tNode = Hr(n[C], P), this.location = mr(this._tNode, n), this.instance = Oe(this._tNode.index, n)[q], this.hostView = this.changeDetectorRef = new Bt(n, void 0), this.componentType = t
    }
    setInput(t, n) {
        this._hasInputBindings;
        let r = this._tNode;
        if (this.previousInputValues ? ? = new Map, this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n)) return;
        let o = this._rootLView,
            i = Os(r, o[C], o, t, n);
        this.previousInputValues.set(t, n);
        let s = Oe(r.index, o);
        hl(s, 1)
    }
    get injector() {
        return new wn(this._tNode, this._rootLView)
    }
    destroy() {
        this.hostView.destroy()
    }
    onDestroy(t) {
        this.hostView.onDestroy(t)
    }
};

function hC(e, t, n) {
    let r = e.projection = [];
    for (let o = 0; o < t.length; o++) {
        let i = n[o];
        r.push(i != null && i.length ? Array.from(i) : null)
    }
}
var _t = (() => {
    class e {
        static __NG_ELEMENT_ID__ = gC
    }
    return e
})();

function gC() {
    let e = Q();
    return Sg(e, E())
}
var mC = _t,
    Mg = class extends mC {
        _lContainer;
        _hostTNode;
        _hostLView;
        constructor(t, n, r) {
            super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r
        }
        get element() {
            return mr(this._hostTNode, this._hostLView)
        }
        get injector() {
            return new wn(this._hostTNode, this._hostLView)
        }
        get parentInjector() {
            let t = Gu(this._hostTNode, this._hostLView);
            if (zp(t)) {
                let n = os(t, this._hostLView),
                    r = rs(t),
                    o = n[C].data[r + 8];
                return new wn(o, n)
            } else return new wn(null, this._hostLView)
        }
        clear() {
            for (; this.length > 0;) this.remove(this.length - 1)
        }
        get(t) {
            let n = _p(this._lContainer);
            return n !== null && n[t] || null
        }
        get length() {
            return this._lContainer.length - Z
        }
        createEmbeddedView(t, n, r) {
            let o, i;
            typeof r == "number" ? o = r : r != null && (o = r.index, i = r.injector);
            let s = ls(this._lContainer, t.ssrId),
                a = t.createEmbeddedViewImpl(n || {}, i, s);
            return this.insertImpl(a, o, fr(this._hostTNode, s)), a
        }
        createComponent(t, n, r, o, i, s, a) {
            let c = t && !rE(t),
                u;
            if (c) u = n;
            else {
                let m = n || {};
                u = m.index, r = m.injector, o = m.projectableNodes, i = m.environmentInjector || m.ngModuleRef, s = m.directives, a = m.bindings
            }
            let l = c ? t : new Ht(nt(t)),
                d = r || this.parentInjector;
            if (!i && l.ngModule == null) {
                let g = (c ? d : this.parentInjector).get(Ie, null);
                g && (i = g)
            }
            let f = nt(l.componentType ? ? {}),
                p = ls(this._lContainer, f ? .id ? ? null),
                h = p ? .firstChild ? ? null,
                y = l.create(d, o, h, i, s, a);
            return this.insertImpl(y.hostView, u, fr(this._hostTNode, p)), y
        }
        insert(t, n) {
            return this.insertImpl(t, n, !0)
        }
        insertImpl(t, n, r) {
            let o = t._lView;
            if (kf(o)) {
                let a = this.indexOf(t);
                if (a !== -1) this.detach(a);
                else {
                    let c = o[te],
                        u = new Mg(c, c[de], c[te]);
                    u.detach(u.indexOf(t))
                }
            }
            let i = this._adjustIndex(n),
                s = this._lContainer;
            return ho(s, o, i, r), t.attachToViewContainerRef(), Xa(zc(s), i, t), t
        }
        move(t, n) {
            return this.insert(t, n)
        }
        indexOf(t) {
            let n = _p(this._lContainer);
            return n !== null ? n.indexOf(t) : -1
        }
        remove(t) {
            let n = this._adjustIndex(t, -1),
                r = eo(this._lContainer, n);
            r && (Pr(zc(this._lContainer), n), xs(r[C], r))
        }
        detach(t) {
            let n = this._adjustIndex(t, -1),
                r = eo(this._lContainer, n);
            return r && Pr(zc(this._lContainer), n) != null ? new Bt(r) : null
        }
        _adjustIndex(t, n = 0) {
            return t ? ? this.length + n
        }
    };

function _p(e) {
    return e[Br]
}

function zc(e) {
    return e[Br] || (e[Br] = [])
}

function Sg(e, t) {
    let n, r = t[e.index];
    return Ue(r) ? n = r : (n = ug(r, t, null, e), t[e.index] = n, tl(t, n)), vC(n, t, e, r), new Mg(n, e, t)
}

function yC(e, t) {
    let n = e[O],
        r = n.createComment(""),
        o = Re(t, e),
        i = n.parentNode(o);
    return lr(n, i, r, n.nextSibling(o), !1), r
}
var vC = IC,
    DC = () => !1;

function EC(e, t, n) {
    return DC(e, t, n)
}

function IC(e, t, n, r) {
    if (e[Pt]) return;
    let o;
    n.type & 8 ? o = be(r) : o = yC(t, n), e[Pt] = o
}
var _u = class e {
        queryList;
        matches = null;
        constructor(t) {
            this.queryList = t
        }
        clone() {
            return new e(this.queryList)
        }
        setDirty() {
            this.queryList.setDirty()
        }
    },
    Mu = class e {
        queries;
        constructor(t = []) {
            this.queries = t
        }
        createEmbeddedView(t) {
            let n = t.queries;
            if (n !== null) {
                let r = t.contentQueries !== null ? t.contentQueries[0] : n.length,
                    o = [];
                for (let i = 0; i < r; i++) {
                    let s = n.getByIndex(i),
                        a = this.queries[s.indexInDeclarationView];
                    o.push(a.clone())
                }
                return new e(o)
            }
            return null
        }
        insertView(t) {
            this.dirtyQueriesWithMatches(t)
        }
        detachView(t) {
            this.dirtyQueriesWithMatches(t)
        }
        finishViewCreation(t) {
            this.dirtyQueriesWithMatches(t)
        }
        dirtyQueriesWithMatches(t) {
            for (let n = 0; n < this.queries.length; n++) Il(t, n).matches !== null && this.queries[n].setDirty()
        }
    },
    hs = class {
        flags;
        read;
        predicate;
        constructor(t, n, r = null) {
            this.flags = n, this.read = r, typeof t == "string" ? this.predicate = MC(t) : this.predicate = t
        }
    },
    Su = class e {
        queries;
        constructor(t = []) {
            this.queries = t
        }
        elementStart(t, n) {
            for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(t, n)
        }
        elementEnd(t) {
            for (let n = 0; n < this.queries.length; n++) this.queries[n].elementEnd(t)
        }
        embeddedTView(t) {
            let n = null;
            for (let r = 0; r < this.length; r++) {
                let o = n !== null ? n.length : 0,
                    i = this.getByIndex(r).embeddedTView(t, o);
                i && (i.indexInDeclarationView = r, n !== null ? n.push(i) : n = [i])
            }
            return n !== null ? new e(n) : null
        }
        template(t, n) {
            for (let r = 0; r < this.queries.length; r++) this.queries[r].template(t, n)
        }
        getByIndex(t) {
            return this.queries[t]
        }
        get length() {
            return this.queries.length
        }
        track(t) {
            this.queries.push(t)
        }
    },
    Nu = class e {
        metadata;
        matches = null;
        indexInDeclarationView = -1;
        crossesNgTemplate = !1;
        _declarationNodeIndex;
        _appliesToNextNode = !0;
        constructor(t, n = -1) {
            this.metadata = t, this._declarationNodeIndex = n
        }
        elementStart(t, n) {
            this.isApplyingToNode(n) && this.matchTNode(t, n)
        }
        elementEnd(t) {
            this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
        }
        template(t, n) {
            this.elementStart(t, n)
        }
        embeddedTView(t, n) {
            return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, n), new e(this.metadata)) : null
        }
        isApplyingToNode(t) {
            if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
                let n = this._declarationNodeIndex,
                    r = t.parent;
                for (; r !== null && r.type & 8 && r.index !== n;) r = r.parent;
                return n === (r !== null ? r.index : -1)
            }
            return this._appliesToNextNode
        }
        matchTNode(t, n) {
            let r = this.metadata.predicate;
            if (Array.isArray(r))
                for (let o = 0; o < r.length; o++) {
                    let i = r[o];
                    this.matchTNodeWithReadOption(t, n, wC(n, i)), this.matchTNodeWithReadOption(t, n, Ji(n, t, i, !1, !1))
                } else r === wt ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1) : this.matchTNodeWithReadOption(t, n, Ji(n, t, r, !1, !1))
        }
        matchTNodeWithReadOption(t, n, r) {
            if (r !== null) {
                let o = this.metadata.read;
                if (o !== null)
                    if (o === Ct || o === _t || o === wt && n.type & 4) this.addMatch(n.index, -2);
                    else {
                        let i = Ji(n, t, o, !1, !1);
                        i !== null && this.addMatch(n.index, i)
                    }
                else this.addMatch(n.index, r)
            }
        }
        addMatch(t, n) {
            this.matches === null ? this.matches = [t, n] : this.matches.push(t, n)
        }
    };

function wC(e, t) {
    let n = e.localNames;
    if (n !== null) {
        for (let r = 0; r < n.length; r += 2)
            if (n[r] === t) return n[r + 1]
    }
    return null
}

function CC(e, t) {
    return e.type & 11 ? mr(e, t) : e.type & 4 ? Fs(e, t) : null
}

function bC(e, t, n, r) {
    return n === -1 ? CC(t, e) : n === -2 ? TC(e, t, r) : Qr(e, e[C], n, t)
}

function TC(e, t, n) {
    if (n === Ct) return mr(t, e);
    if (n === wt) return Fs(t, e);
    if (n === _t) return Sg(t, e)
}

function Ng(e, t, n, r) {
    let o = t[ot].queries[r];
    if (o.matches === null) {
        let i = e.data,
            s = n.matches,
            a = [];
        for (let c = 0; s !== null && c < s.length; c += 2) {
            let u = s[c];
            if (u < 0) a.push(null);
            else {
                let l = i[u];
                a.push(bC(t, l, s[c + 1], n.metadata.read))
            }
        }
        o.matches = a
    }
    return o.matches
}

function xu(e, t, n, r) {
    let o = e.queries.getByIndex(n),
        i = o.matches;
    if (i !== null) {
        let s = Ng(e, t, o, n);
        for (let a = 0; a < i.length; a += 2) {
            let c = i[a];
            if (c > 0) r.push(s[a / 2]);
            else {
                let u = i[a + 1],
                    l = t[-c];
                for (let d = Z; d < l.length; d++) {
                    let f = l[d];
                    f[kt] === f[te] && xu(f[C], f, u, r)
                }
                if (l[mn] !== null) {
                    let d = l[mn];
                    for (let f = 0; f < d.length; f++) {
                        let p = d[f];
                        xu(p[C], p, u, r)
                    }
                }
            }
        }
    }
    return r
}

function El(e, t) {
    return e[ot].queries[t].queryList
}

function xg(e, t, n) {
    let r = new as((n & 4) === 4);
    return jf(e, t, r, r.destroy), (t[ot] ? ? = new Mu).queries.push(new _u(r)) - 1
}

function Ag(e, t, n) {
    let r = L();
    return r.firstCreatePass && (Rg(r, new hs(e, t, n), -1), (t & 2) === 2 && (r.staticViewQueries = !0)), xg(r, E(), t)
}

function _C(e, t, n, r) {
    let o = L();
    if (o.firstCreatePass) {
        let i = Q();
        Rg(o, new hs(t, n, r), i.index), SC(o, e), (n & 2) === 2 && (o.staticContentQueries = !0)
    }
    return xg(o, E(), n)
}

function MC(e) {
    return e.split(",").map(t => t.trim())
}

function Rg(e, t, n) {
    e.queries === null && (e.queries = new Su), e.queries.track(new Nu(t, n))
}

function SC(e, t) {
    let n = e.contentQueries || (e.contentQueries = []),
        r = n.length ? n[n.length - 1] : -1;
    t !== r && n.push(e.queries.length - 1, t)
}

function Il(e, t) {
    return e.queries.getByIndex(t)
}

function Og(e, t) {
    let n = e[C],
        r = Il(n, t);
    return r.crossesNgTemplate ? xu(n, e, t, []) : Ng(n, e, r, t)
}

function Fg(e, t, n) {
    let r, o = xr(() => {
        r._dirtyCounter();
        let i = xC(r, e);
        if (t && i === void 0) throw new D(-951, !1);
        return i
    });
    return r = o[ee], r._dirtyCounter = Dn(0), r._flatValue = void 0, o
}

function kg(e) {
    return Fg(!0, !1, e)
}

function Pg(e) {
    return Fg(!0, !0, e)
}

function NC(e, t) {
    let n = e[ee];
    n._lView = E(), n._queryIndex = t, n._queryList = El(n._lView, t), n._queryList.onDirty(() => n._dirtyCounter.update(r => r + 1))
}

function xC(e, t) {
    let n = e._lView,
        r = e._queryIndex;
    if (n === void 0 || r === void 0 || n[_] & 4) return t ? void 0 : ie;
    let o = El(n, r),
        i = Og(n, r);
    return o.reset(i, Xp), t ? o.first : o._changesDetected || e._flatValue === void 0 ? e._flatValue = o.toArray() : e._flatValue
}

function Lg(e) {
    let t = [],
        n = new Map;

    function r(o) {
        let i = n.get(o);
        if (!i) {
            let s = e(o);
            n.set(o, i = s.then(a => RC(o, a)))
        }
        return i
    }
    return gs.forEach((o, i) => {
        let s = [];
        o.templateUrl && s.push(r(o.templateUrl).then(u => {
            o.template = u
        }));
        let a = typeof o.styles == "string" ? [o.styles] : o.styles || [];
        if (o.styles = a, o.styleUrl && o.styleUrls ? .length) throw new Error("@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple");
        if (o.styleUrls ? .length) {
            let u = o.styles.length,
                l = o.styleUrls;
            o.styleUrls.forEach((d, f) => {
                a.push(""), s.push(r(d).then(p => {
                    a[u + f] = p, l.splice(l.indexOf(d), 1), l.length == 0 && (o.styleUrls = void 0)
                }))
            })
        } else o.styleUrl && s.push(r(o.styleUrl).then(u => {
            a.push(u), o.styleUrl = void 0
        }));
        let c = Promise.all(s).then(() => OC(i));
        t.push(c)
    }), jg(), Promise.all(t).then(() => {})
}
var gs = new Map,
    AC = new Set;

function jg() {
    let e = gs;
    return gs = new Map, e
}

function Vg() {
    return gs.size === 0
}

function RC(e, t) {
    return typeof t == "string" ? t : t.status !== void 0 && t.status !== 200 ? Promise.reject(new D(918, !1)) : t.text()
}

function OC(e) {
    AC.delete(e)
}
var bn = class {},
    Bg = class {};
var no = class extends bn {
        ngModuleType;
        _parent;
        _bootstrapComponents = [];
        _r3Injector;
        instance;
        destroyCbs = [];
        componentFactoryResolver = new fs(this);
        constructor(t, n, r, o = !0) {
            super(), this.ngModuleType = t, this._parent = n;
            let i = nc(t);
            this._bootstrapComponents = Ch(i.bootstrap), this._r3Injector = Pc(t, n, [{
                provide: bn,
                useValue: this
            }, {
                provide: go,
                useValue: this.componentFactoryResolver
            }, ...r], pt(t), new Set(["environment"])), o && this.resolveInjectorInitializers()
        }
        resolveInjectorInitializers() {
            this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(this.ngModuleType)
        }
        get injector() {
            return this._r3Injector
        }
        destroy() {
            let t = this._r3Injector;
            !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null
        }
        onDestroy(t) {
            this.destroyCbs.push(t)
        }
    },
    ro = class extends Bg {
        moduleType;
        constructor(t) {
            super(), this.moduleType = t
        }
        create(t) {
            return new no(this.moduleType, t, [])
        }
    };

function Hg(e, t, n) {
    return new no(e, t, n, !1)
}
var ms = class extends bn {
    injector;
    componentFactoryResolver = new fs(this);
    instance = null;
    constructor(t) {
        super();
        let n = new cn([...t.providers, {
            provide: bn,
            useValue: this
        }, {
            provide: go,
            useValue: this.componentFactoryResolver
        }], t.parent || qn(), t.debugName, new Set(["environment"]));
        this.injector = n, t.runEnvironmentInitializers && n.resolveInjectorInitializers()
    }
    destroy() {
        this.injector.destroy()
    }
    onDestroy(t) {
        this.injector.onDestroy(t)
    }
};

function $g(e, t, n = null) {
    return new ms({
        providers: e,
        parent: t,
        debugName: n,
        runEnvironmentInitializers: !0
    }).injector
}
var FC = (() => {
    class e {
        _injector;
        cachedInjectors = new Map;
        constructor(n) {
            this._injector = n
        }
        getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
                let r = ic(!1, n.type),
                    o = r.length > 0 ? $g([r], this._injector, `Standalone[${n.type.name}]`) : null;
                this.cachedInjectors.set(n, o)
            }
            return this.cachedInjectors.get(n)
        }
        ngOnDestroy() {
            try {
                for (let n of this.cachedInjectors.values()) n !== null && n.destroy()
            } finally {
                this.cachedInjectors.clear()
            }
        }
        static\ u0275prov = A({
            token: e,
            providedIn: "environment",
            factory: () => new e(F(Ie))
        })
    }
    return e
})();

function kC(e) {
    return so(() => {
        let t = zg(e),
            n = G(H({}, t), {
                decls: e.decls,
                vars: e.vars,
                template: e.template,
                consts: e.consts || null,
                ngContentSelectors: e.ngContentSelectors,
                onPush: e.changeDetection === qu.OnPush,
                directiveDefs: null,
                pipeDefs: null,
                dependencies: t.standalone && e.dependencies || null,
                getStandaloneInjector: t.standalone ? o => o.get(FC).getOrCreateStandaloneInjector(n) : null,
                getExternalStyles: null,
                signals: e.signals ? ? !1,
                data: e.data || {},
                encapsulation: e.encapsulation || ur.Emulated,
                styles: e.styles || ie,
                _: null,
                schemas: e.schemas || null,
                tView: null,
                id: ""
            });
        t.standalone && Tt("NgStandalone"), Gg(n);
        let r = e.dependencies;
        return n.directiveDefs = ys(r, Ug), n.pipeDefs = ys(r, oc), n.id = jC(n), n
    })
}

function Ug(e) {
    return nt(e) || rc(e)
}

function vo(e) {
    return so(() => ({
        type: e.type,
        bootstrap: e.bootstrap || ie,
        declarations: e.declarations || ie,
        imports: e.imports || ie,
        exports: e.exports || ie,
        transitiveCompileScopes: null,
        schemas: e.schemas || null,
        id: e.id || null
    }))
}

function PC(e, t) {
    if (e == null) return Ft;
    let n = {};
    for (let r in e)
        if (e.hasOwnProperty(r)) {
            let o = e[r],
                i, s, a, c;
            Array.isArray(o) ? (a = o[0], i = o[1], s = o[2] ? ? i, c = o[3] || null) : (i = o, s = o, a = Ss.None, c = null), n[i] = [r, a, c], t[i] = s
        }
    return n
}

function LC(e) {
    if (e == null) return Ft;
    let t = {};
    for (let n in e) e.hasOwnProperty(n) && (t[e[n]] = n);
    return t
}

function Mt(e) {
    return so(() => {
        let t = zg(e);
        return Gg(t), t
    })
}

function ct(e) {
    return {
        type: e.type,
        name: e.name,
        factory: null,
        pure: e.pure !== !1,
        standalone: e.standalone ? ? !0,
        onDestroy: e.type.prototype.ngOnDestroy || null
    }
}

function zg(e) {
    let t = {};
    return {
        type: e.type,
        providersResolver: null,
        factory: null,
        hostBindings: e.hostBindings || null,
        hostVars: e.hostVars || 0,
        hostAttrs: e.hostAttrs || null,
        contentQueries: e.contentQueries || null,
        declaredInputs: t,
        inputConfig: e.inputs || Ft,
        exportAs: e.exportAs || null,
        standalone: e.standalone ? ? !0,
        signals: e.signals === !0,
        selectors: e.selectors || ie,
        viewQuery: e.viewQuery || null,
        features: e.features || null,
        setInput: null,
        resolveHostDirectives: null,
        hostDirectives: null,
        inputs: PC(e.inputs, t),
        outputs: LC(e.outputs),
        debugInfo: null
    }
}

function Gg(e) {
    e.features ? .forEach(t => t(e))
}

function ys(e, t) {
    return e ? () => {
        let n = typeof e == "function" ? e() : e,
            r = [];
        for (let o of n) {
            let i = t(o);
            i !== null && r.push(i)
        }
        return r
    } : null
}

function jC(e) {
    let t = 0,
        n = typeof e.consts == "function" ? "" : e.consts,
        r = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, n, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery];
    for (let i of r.join("|")) t = Math.imul(31, t) + i.charCodeAt(0) << 0;
    return t += 2147483648, "c" + t
}

function VC(e) {
    return Object.getPrototypeOf(e.prototype).constructor
}

function Wg(e) {
    let t = VC(e.type),
        n = !0,
        r = [e];
    for (; t;) {
        let o;
        if (ze(e)) o = t.\u0275cmp || t.\u0275dir;
        else {
            if (t.\u0275cmp) throw new D(903, !1);
            o = t.\u0275dir
        }
        if (o) {
            if (n) {
                r.push(o);
                let s = e;
                s.inputs = Gc(e.inputs), s.declaredInputs = Gc(e.declaredInputs), s.outputs = Gc(e.outputs);
                let a = o.hostBindings;
                a && zC(e, a);
                let c = o.viewQuery,
                    u = o.contentQueries;
                if (c && $C(e, c), u && UC(e, u), BC(e, o), vf(e.outputs, o.outputs), ze(o) && o.data.animation) {
                    let l = e.data;
                    l.animation = (l.animation || []).concat(o.data.animation)
                }
            }
            let i = o.features;
            if (i)
                for (let s = 0; s < i.length; s++) {
                    let a = i[s];
                    a && a.ngInherit && a(e), a === Wg && (n = !1)
                }
        }
        t = Object.getPrototypeOf(t)
    }
    HC(r)
}

function BC(e, t) {
    for (let n in t.inputs) {
        if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n)) continue;
        let r = t.inputs[n];
        r !== void 0 && (e.inputs[n] = r, e.declaredInputs[n] = t.declaredInputs[n])
    }
}

function HC(e) {
    let t = 0,
        n = null;
    for (let r = e.length - 1; r >= 0; r--) {
        let o = e[r];
        o.hostVars = t += o.hostVars, o.hostAttrs = ar(o.hostAttrs, n = ar(n, o.hostAttrs))
    }
}

function Gc(e) {
    return e === Ft ? {} : e === ie ? [] : e
}

function $C(e, t) {
    let n = e.viewQuery;
    n ? e.viewQuery = (r, o) => {
        t(r, o), n(r, o)
    } : e.viewQuery = t
}

function UC(e, t) {
    let n = e.contentQueries;
    n ? e.contentQueries = (r, o, i) => {
        t(r, o, i), n(r, o, i)
    } : e.contentQueries = t
}

function zC(e, t) {
    let n = e.hostBindings;
    n ? e.hostBindings = (r, o) => {
        t(r, o), n(r, o)
    } : e.hostBindings = t
}

function qg(e, t, n, r, o, i, s, a) {
    if (n.firstCreatePass) {
        e.mergedAttrs = ar(e.mergedAttrs, e.attrs);
        let l = e.tView = Xu(2, e, o, i, s, n.directiveRegistry, n.pipeRegistry, null, n.schemas, n.consts, null);
        n.queries !== null && (n.queries.template(n, e), l.queries = n.queries.embeddedTView(e))
    }
    a && (e.flags |= a), st(e, !1);
    let c = WC(n, t, e, r);
    Gr() && al(n, t, c, e), cr(c, t);
    let u = ug(c, t, c, e);
    t[r + P] = u, tl(t, u), EC(u, e, t)
}

function GC(e, t, n, r, o, i, s, a, c, u, l) {
    let d = n + P,
        f;
    return t.firstCreatePass ? (f = _n(t, d, 4, s || null, a || null), Pi() && Ig(t, e, f, Te(t.consts, u), ll), Hp(t, f)) : f = t.data[d], qg(f, e, t, n, r, o, i, c), Kn(f) && Rs(t, e, f), u != null && fo(e, f, l), f
}

function oo(e, t, n, r, o, i, s, a, c, u, l) {
    let d = n + P,
        f;
    if (t.firstCreatePass) {
        if (f = _n(t, d, 4, s || null, a || null), u != null) {
            let p = Te(t.consts, u);
            f.localNames = [];
            for (let h = 0; h < p.length; h += 2) f.localNames.push(p[h], -1)
        }
    } else f = t.data[d];
    return qg(f, e, t, n, r, o, i, c), u != null && fo(e, f, l), f
}

function Zg(e, t, n, r, o, i, s, a) {
    let c = E(),
        u = L(),
        l = Te(u.consts, i);
    return GC(c, u, e, t, n, r, o, l, void 0, s, a), Zg
}
var WC = qC;

function qC(e, t, n, r) {
    return rr(!0), t[O].createComment("")
}
var ZC = (() => {
    class e {
        log(n) {
            console.log(n)
        }
        warn(n) {
            console.warn(n)
        }
        static\ u0275fac = function(r) {
            return new(r || e)
        };
        static\ u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "platform"
        })
    }
    return e
})();
var Yg = new T(""),
    Qg = new T(""),
    YC = (() => {
        class e {
            _ngZone;
            registry;
            _isZoneStable = !0;
            _callbacks = [];
            _taskTrackingZone = null;
            _destroyRef;
            constructor(n, r, o) {
                this._ngZone = n, this.registry = r, uc() && (this._destroyRef = v(fe, {
                    optional: !0
                }) ? ? void 0), wl || (Jg(o), o.addToWindow(r)), this._watchAngularEvents(), n.run(() => {
                    this._taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                })
            }
            _watchAngularEvents() {
                let n = this._ngZone.onUnstable.subscribe({
                        next: () => {
                            this._isZoneStable = !1
                        }
                    }),
                    r = this._ngZone.runOutsideAngular(() => this._ngZone.onStable.subscribe({
                        next: () => {
                            re.assertNotInAngularZone(), queueMicrotask(() => {
                                this._isZoneStable = !0, this._runCallbacksIfReady()
                            })
                        }
                    }));
                this._destroyRef ? .onDestroy(() => {
                    n.unsubscribe(), r.unsubscribe()
                })
            }
            isStable() {
                return this._isZoneStable && !this._ngZone.hasPendingMacrotasks
            }
            _runCallbacksIfReady() {
                if (this.isStable()) queueMicrotask(() => {
                    for (; this._callbacks.length !== 0;) {
                        let n = this._callbacks.pop();
                        clearTimeout(n.timeoutId), n.doneCb()
                    }
                });
                else {
                    let n = this.getPendingTasks();
                    this._callbacks = this._callbacks.filter(r => r.updateCb && r.updateCb(n) ? (clearTimeout(r.timeoutId), !1) : !0)
                }
            }
            getPendingTasks() {
                return this._taskTrackingZone ? this._taskTrackingZone.macroTasks.map(n => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data
                })) : []
            }
            addCallback(n, r, o) {
                let i = -1;
                r && r > 0 && (i = setTimeout(() => {
                    this._callbacks = this._callbacks.filter(s => s.timeoutId !== i), n()
                }, r)), this._callbacks.push({
                    doneCb: n,
                    timeoutId: i,
                    updateCb: o
                })
            }
            whenStable(n, r, o) {
                if (o && !this._taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                this.addCallback(n, r, o), this._runCallbacksIfReady()
            }
            registerApplication(n) {
                this.registry.registerApplication(n, this)
            }
            unregisterApplication(n) {
                this.registry.unregisterApplication(n)
            }
            findProviders(n, r, o) {
                return []
            }
            static\ u0275fac = function(r) {
                return new(r || e)(F(re), F(Kg), F(Qg))
            };
            static\ u0275prov = A({
                token: e,
                factory: e.\u0275fac
            })
        }
        return e
    })(),
    Kg = (() => {
        class e {
            _applications = new Map;
            registerApplication(n, r) {
                this._applications.set(n, r)
            }
            unregisterApplication(n) {
                this._applications.delete(n)
            }
            unregisterAllApplications() {
                this._applications.clear()
            }
            getTestability(n) {
                return this._applications.get(n) || null
            }
            getAllTestabilities() {
                return Array.from(this._applications.values())
            }
            getAllRootElements() {
                return Array.from(this._applications.keys())
            }
            findTestabilityInTree(n, r = !0) {
                return wl ? .findTestabilityInTree(this, n, r) ? ? null
            }
            static\ u0275fac = function(r) {
                return new(r || e)
            };
            static\ u0275prov = A({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            })
        }
        return e
    })();

function Jg(e) {
    wl = e
}
var wl;

function Do(e) {
    return !!e && typeof e.then == "function"
}

function js(e) {
    return !!e && typeof e.subscribe == "function"
}
var Cl = new T("");

function QC(e) {
    return jr([{
        provide: Cl,
        multi: !0,
        useValue: e
    }])
}
var bl = (() => {
        class e {
            resolve;
            reject;
            initialized = !1;
            done = !1;
            donePromise = new Promise((n, r) => {
                this.resolve = n, this.reject = r
            });
            appInits = v(Cl, {
                optional: !0
            }) ? ? [];
            injector = v(ye);
            constructor() {}
            runInitializers() {
                if (this.initialized) return;
                let n = [];
                for (let o of this.appInits) {
                    let i = Zn(this.injector, o);
                    if (Do(i)) n.push(i);
                    else if (js(i)) {
                        let s = new Promise((a, c) => {
                            i.subscribe({
                                complete: a,
                                error: c
                            })
                        });
                        n.push(s)
                    }
                }
                let r = () => {
                    this.done = !0, this.resolve()
                };
                Promise.all(n).then(() => {
                    r()
                }).catch(o => {
                    this.reject(o)
                }), n.length === 0 && r(), this.initialized = !0
            }
            static\ u0275fac = function(r) {
                return new(r || e)
            };
            static\ u0275prov = A({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })(),
    Xg = new T("");

function em() {
    Ra(() => {
        let e = "";
        throw new D(600, e)
    })
}

function tm(e) {
    return e.isBoundToModule
}
var KC = 10;

function Tl(e, t) {
    return Array.isArray(t) ? t.reduce(Tl, e) : H(H({}, e), t)
}
var Mn = (() => {
    class e {
        _runningTick = !1;
        _destroyed = !1;
        _destroyListeners = [];
        _views = [];
        internalErrorHandler = v(We);
        afterRenderManager = v(il);
        zonelessEnabled = v(Ui);
        rootEffectScheduler = v(Wr);
        dirtyFlags = 0;
        tracingSnapshot = null;
        allTestViews = new Set;
        autoDetectTestViews = new Set;
        includeAllTestViews = !1;
        afterTick = new Ee;
        get allViews() {
            return [...(this.includeAllTestViews ? this.allTestViews : this.autoDetectTestViews).keys(), ...this._views]
        }
        get destroyed() {
            return this._destroyed
        }
        componentTypes = [];
        components = [];
        internalPendingTask = v(Vt);
        get isStable() {
            return this.internalPendingTask.hasPendingTasksObservable.pipe(ge(n => !n))
        }
        constructor() {
            v(lo, {
                optional: !0
            })
        }
        whenStable() {
            let n;
            return new Promise(r => {
                n = this.isStable.subscribe({
                    next: o => {
                        o && r()
                    }
                })
            }).finally(() => {
                n.unsubscribe()
            })
        }
        _injector = v(Ie);
        _rendererFactory = null;
        get injector() {
            return this._injector
        }
        bootstrap(n, r) {
            return this.bootstrapImpl(n, r)
        }
        bootstrapImpl(n, r, o = ye.NULL) {
            return this._injector.get(re).run(() => {
                B(10);
                let s = n instanceof ks;
                if (!this._injector.get(bl).done) {
                    let h = "";
                    throw new D(405, h)
                }
                let c;
                s ? c = n : c = this._injector.get(go).resolveComponentFactory(n), this.componentTypes.push(c.componentType);
                let u = tm(c) ? void 0 : this._injector.get(bn),
                    l = r || c.selector,
                    d = c.create(o, [], l, u),
                    f = d.location.nativeElement,
                    p = d.injector.get(Yg, null);
                return p ? .registerApplication(f), d.onDestroy(() => {
                    this.detachView(d.hostView), Zr(this.components, d), p ? .unregisterApplication(f)
                }), this._loadComponent(d), B(11, d), d
            })
        }
        tick() {
            this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick()
        }
        _tick() {
            B(12), this.tracingSnapshot !== null ? this.tracingSnapshot.run(Ns.CHANGE_DETECTION, this.tickImpl) : this.tickImpl()
        }
        tickImpl = () => {
            if (this._runningTick) throw new D(101, !1);
            let n = M(null);
            try {
                this._runningTick = !0, this.synchronize()
            } finally {
                this._runningTick = !1, this.tracingSnapshot ? .dispose(), this.tracingSnapshot = null, M(n), this.afterTick.next(), B(13)
            }
        };
        synchronize() {
            this._rendererFactory === null && !this._injector.destroyed && (this._rendererFactory = this._injector.get(to, null, {
                optional: !0
            }));
            let n = 0;
            for (; this.dirtyFlags !== 0 && n++ < KC;) B(14), this.synchronizeOnce(), B(15)
        }
        synchronizeOnce() {
            this.dirtyFlags & 16 && (this.dirtyFlags &= -17, this.rootEffectScheduler.flush());
            let n = !1;
            if (this.dirtyFlags & 7) {
                let r = !!(this.dirtyFlags & 1);
                this.dirtyFlags &= -8, this.dirtyFlags |= 8;
                for (let {
                        _lView: o
                    } of this.allViews) {
                    if (!r && !Ur(o)) continue;
                    let i = r && !this.zonelessEnabled ? 0 : 1;
                    ig(o, i), n = !0
                }
                if (this.dirtyFlags &= -5, this.syncDirtyFlagsWithViews(), this.dirtyFlags & 23) return
            }
            n || (this._rendererFactory ? .begin ? .(), this._rendererFactory ? .end ? .()), this.dirtyFlags & 8 && (this.dirtyFlags &= -9, this.afterRenderManager.execute()), this.syncDirtyFlagsWithViews()
        }
        syncDirtyFlagsWithViews() {
            if (this.allViews.some(({
                    _lView: n
                }) => Ur(n))) {
                this.dirtyFlags |= 2;
                return
            } else this.dirtyFlags &= -8
        }
        attachView(n) {
            let r = n;
            this._views.push(r), r.attachToAppRef(this)
        }
        detachView(n) {
            let r = n;
            Zr(this._views, r), r.detachFromAppRef()
        }
        _loadComponent(n) {
            this.attachView(n.hostView);
            try {
                this.tick()
            } catch (o) {
                this.internalErrorHandler(o)
            }
            this.components.push(n), this._injector.get(Xg, []).forEach(o => o(n))
        }
        ngOnDestroy() {
            if (!this._destroyed) try {
                this._destroyListeners.forEach(n => n()), this._views.slice().forEach(n => n.destroy())
            } finally {
                this._destroyed = !0, this._views = [], this._destroyListeners = []
            }
        }
        onDestroy(n) {
            return this._destroyListeners.push(n), () => Zr(this._destroyListeners, n)
        }
        destroy() {
            if (this._destroyed) throw new D(406, !1);
            let n = this._injector;
            n.destroy && !n.destroyed && n.destroy()
        }
        get viewCount() {
            return this._views.length
        }
        static\ u0275fac = function(r) {
            return new(r || e)
        };
        static\ u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        })
    }
    return e
})();

function Zr(e, t) {
    let n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}

function nm(e, t) {
    let n = E(),
        r = Ge();
    if (ae(n, r, t)) {
        let o = L(),
            i = vn();
        if (Os(i, o, n, e, t)) yt(i) && Jh(n, i.index);
        else {
            let a = Re(i, n);
            Xh(n[O], a, null, i.value, e, t, null)
        }
    }
    return nm
}

function rm(e, t, n, r) {
    let o = E(),
        i = Ge();
    if (ae(o, i, t)) {
        let s = L(),
            a = vn();
        cw(a, o, e, t, n, r)
    }
    return rm
}
var D1 = typeof document < "u" && typeof document ? .documentElement ? .getAnimations == "function";

function JC() {
    return E()[se][q]
}
var Au = class {
    destroy(t) {}
    updateValue(t, n) {}
    swap(t, n) {
        let r = Math.min(t, n),
            o = Math.max(t, n),
            i = this.detach(o);
        if (o - r > 1) {
            let s = this.detach(r);
            this.attach(r, i), this.attach(o, s)
        } else this.attach(r, i)
    }
    move(t, n) {
        this.attach(n, this.detach(t))
    }
};

function Wc(e, t, n, r, o) {
    return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0
}

function XC(e, t, n) {
    let r, o, i = 0,
        s = e.length - 1,
        a = void 0;
    if (Array.isArray(t)) {
        let c = t.length - 1;
        for (; i <= s && i <= c;) {
            let u = e.at(i),
                l = t[i],
                d = Wc(i, u, i, l, n);
            if (d !== 0) {
                d < 0 && e.updateValue(i, l), i++;
                continue
            }
            let f = e.at(s),
                p = t[c],
                h = Wc(s, f, c, p, n);
            if (h !== 0) {
                h < 0 && e.updateValue(s, p), s--, c--;
                continue
            }
            let y = n(i, u),
                m = n(s, f),
                g = n(i, l);
            if (Object.is(g, m)) {
                let R = n(c, p);
                Object.is(R, y) ? (e.swap(i, s), e.updateValue(s, p), c--, s--) : e.move(s, i), e.updateValue(i, l), i++;
                continue
            }
            if (r ? ? = new vs, o ? ? = Sp(e, i, s, n), Ru(e, r, i, g)) e.updateValue(i, l), i++, s++;
            else if (o.has(g)) r.set(y, e.detach(i)), s--;
            else {
                let R = e.create(i, t[i]);
                e.attach(i, R), i++, s++
            }
        }
        for (; i <= c;) Mp(e, r, n, i, t[i]), i++
    } else if (t != null) {
        let c = t[Symbol.iterator](),
            u = c.next();
        for (; !u.done && i <= s;) {
            let l = e.at(i),
                d = u.value,
                f = Wc(i, l, i, d, n);
            if (f !== 0) f < 0 && e.updateValue(i, d), i++, u = c.next();
            else {
                r ? ? = new vs, o ? ? = Sp(e, i, s, n);
                let p = n(i, d);
                if (Ru(e, r, i, p)) e.updateValue(i, d), i++, s++, u = c.next();
                else if (!o.has(p)) e.attach(i, e.create(i, d)), i++, s++, u = c.next();
                else {
                    let h = n(i, l);
                    r.set(h, e.detach(i)), s--
                }
            }
        }
        for (; !u.done;) Mp(e, r, n, e.length, u.value), u = c.next()
    }
    for (; i <= s;) e.destroy(e.detach(s--));
    r ? .forEach(c => {
        e.destroy(c)
    })
}

function Ru(e, t, n, r) {
    return t !== void 0 && t.has(r) ? (e.attach(n, t.get(r)), t.delete(r), !0) : !1
}

function Mp(e, t, n, r, o) {
    if (Ru(e, t, r, n(r, o))) e.updateValue(r, o);
    else {
        let i = e.create(r, o);
        e.attach(r, i)
    }
}

function Sp(e, t, n, r) {
    let o = new Set;
    for (let i = t; i <= n; i++) o.add(r(i, e.at(i)));
    return o
}
var vs = class {
    kvMap = new Map;
    _vMap = void 0;
    has(t) {
        return this.kvMap.has(t)
    }
    delete(t) {
        if (!this.has(t)) return !1;
        let n = this.kvMap.get(t);
        return this._vMap !== void 0 && this._vMap.has(n) ? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n)) : this.kvMap.delete(t), !0
    }
    get(t) {
        return this.kvMap.get(t)
    }
    set(t, n) {
        if (this.kvMap.has(t)) {
            let r = this.kvMap.get(t);
            this._vMap === void 0 && (this._vMap = new Map);
            let o = this._vMap;
            for (; o.has(r);) r = o.get(r);
            o.set(r, n)
        } else this.kvMap.set(t, n)
    }
    forEach(t) {
        for (let [n, r] of this.kvMap)
            if (t(r, n), this._vMap !== void 0) {
                let o = this._vMap;
                for (; o.has(r);) r = o.get(r), t(r, n)
            }
    }
};

function eb(e, t, n, r, o, i, s, a) {
    Tt("NgControlFlow");
    let c = E(),
        u = L(),
        l = Te(u.consts, i);
    return oo(c, u, e, t, n, r, o, l, 256, s, a), _l
}

function _l(e, t, n, r, o, i, s, a) {
    Tt("NgControlFlow");
    let c = E(),
        u = L(),
        l = Te(u.consts, i);
    return oo(c, u, e, t, n, r, o, l, 512, s, a), _l
}

function tb(e, t) {
    Tt("NgControlFlow");
    let n = E(),
        r = Ge(),
        o = n[r] !== K ? n[r] : -1,
        i = o !== -1 ? Ds(n, P + o) : void 0,
        s = 0;
    if (ae(n, r, e)) {
        let a = M(null);
        try {
            if (i !== void 0 && dg(i, s), e !== -1) {
                let c = P + e,
                    u = Ds(n, c),
                    l = Pu(n[C], c),
                    d = vg(u, l, n),
                    f = po(n, l, t, {
                        dehydratedView: d
                    });
                ho(u, f, s, fr(l, d))
            }
        } finally {
            M(a)
        }
    } else if (i !== void 0) {
        let a = lg(i, s);
        a !== void 0 && (a[q] = t)
    }
}
var Ou = class {
    lContainer;
    $implicit;
    $index;
    constructor(t, n, r) {
        this.lContainer = t, this.$implicit = n, this.$index = r
    }
    get $count() {
        return this.lContainer.length - Z
    }
};

function nb(e) {
    return e
}

function rb(e, t) {
    return t
}
var Fu = class {
    hasEmptyBlock;
    trackByFn;
    liveCollection;
    constructor(t, n, r) {
        this.hasEmptyBlock = t, this.trackByFn = n, this.liveCollection = r
    }
};

function ob(e, t, n, r, o, i, s, a, c, u, l, d, f) {
    Tt("NgControlFlow");
    let p = E(),
        h = L(),
        y = c !== void 0,
        m = E(),
        g = a ? s.bind(m[se][q]) : s,
        R = new Fu(y, g);
    m[P + e] = R, oo(p, h, e + 1, t, n, r, o, Te(h.consts, i), 256), y && oo(p, h, e + 2, c, u, l, d, Te(h.consts, f), 512)
}
var ku = class extends Au {
    lContainer;
    hostLView;
    templateTNode;
    operationsCounter = void 0;
    needsIndexUpdate = !1;
    constructor(t, n, r) {
        super(), this.lContainer = t, this.hostLView = n, this.templateTNode = r
    }
    get length() {
        return this.lContainer.length - Z
    }
    at(t) {
        return this.getLView(t)[q].$implicit
    }
    attach(t, n) {
        let r = n[dn];
        this.needsIndexUpdate || = t !== this.length, ho(this.lContainer, n, t, fr(this.templateTNode, r)), sb(this.lContainer, t)
    }
    detach(t) {
        return this.needsIndexUpdate || = t !== this.length - 1, ab(this.lContainer, t), cb(this.lContainer, t)
    }
    create(t, n) {
        let r = ls(this.lContainer, this.templateTNode.tView.ssrId),
            o = po(this.hostLView, this.templateTNode, new Ou(this.lContainer, n, t), {
                dehydratedView: r
            });
        return this.operationsCounter ? .recordCreate(), o
    }
    destroy(t) {
        xs(t[C], t), this.operationsCounter ? .recordDestroy()
    }
    updateValue(t, n) {
        this.getLView(t)[q].$implicit = n
    }
    reset() {
        this.needsIndexUpdate = !1, this.operationsCounter ? .reset()
    }
    updateIndexes() {
        if (this.needsIndexUpdate)
            for (let t = 0; t < this.length; t++) this.getLView(t)[q].$index = t
    }
    getLView(t) {
        return ub(this.lContainer, t)
    }
};

function ib(e) {
    let t = M(null),
        n = _e();
    try {
        let r = E(),
            o = r[C],
            i = r[n],
            s = n + 1,
            a = Ds(r, s);
        if (i.liveCollection === void 0) {
            let u = Pu(o, s);
            i.liveCollection = new ku(a, r, u)
        } else i.liveCollection.reset();
        let c = i.liveCollection;
        if (XC(c, e, i.trackByFn), c.updateIndexes(), i.hasEmptyBlock) {
            let u = Ge(),
                l = c.length === 0;
            if (ae(r, u, l)) {
                let d = n + 2,
                    f = Ds(r, d);
                if (l) {
                    let p = Pu(o, d),
                        h = vg(f, p, r),
                        y = po(r, p, void 0, {
                            dehydratedView: h
                        });
                    ho(f, y, 0, fr(p, h))
                } else o.firstUpdatePass && Uw(f), dg(f, 0)
            }
        }
    } finally {
        M(t)
    }
}

function Ds(e, t) {
    return e[t]
}

function sb(e, t) {
    if (e.length <= Z) return;
    let n = Z + t,
        r = e[n],
        o = r ? r[gn] : void 0;
    if (r && o && o.detachedLeaveAnimationFns && o.detachedLeaveAnimationFns.length > 0) {
        let i = r[gt];
        zI(i, o), Kr.delete(r), o.detachedLeaveAnimationFns = void 0
    }
}

function ab(e, t) {
    if (e.length <= Z) return;
    let n = Z + t,
        r = e[n],
        o = r ? r[gn] : void 0;
    o && o.leave && o.leave.size > 0 && (o.detachedLeaveAnimationFns = [])
}

function cb(e, t) {
    return eo(e, t)
}

function ub(e, t) {
    return lg(e, t)
}

function Pu(e, t) {
    return Hr(e, t)
}

function om(e, t, n) {
    let r = E(),
        o = Ge();
    if (ae(r, o, t)) {
        let i = L(),
            s = vn();
        Kh(s, r, e, t, r[O], n)
    }
    return om
}

function Lu(e, t, n, r, o) {
    Os(t, e, n, o ? "class" : "style", r)
}

function Ml(e, t, n, r) {
    let o = E(),
        i = o[C],
        s = e + P,
        a = i.firstCreatePass ? ml(s, o, 2, t, ll, Pi(), n, r) : i.data[s];
    if (dl(a, o, e, t, am), Kn(a)) {
        let c = o[C];
        Rs(c, o, a), Zu(c, a, o)
    }
    return r != null && fo(o, a), Ml
}

function Sl() {
    let e = L(),
        t = Q(),
        n = fl(t);
    return e.firstCreatePass && yl(e, n), Tc(n) && _c(), Cc(), n.classesWithoutHost != null && uE(n) && Lu(e, n, E(), n.classesWithoutHost, !0), n.stylesWithoutHost != null && lE(n) && Lu(e, n, E(), n.stylesWithoutHost, !1), Sl
}

function im(e, t, n, r) {
    return Ml(e, t, n, r), Sl(), im
}

function Nl(e, t, n, r) {
    let o = E(),
        i = o[C],
        s = e + P,
        a = i.firstCreatePass ? oC(s, i, 2, t, n, r) : i.data[s];
    return dl(a, o, e, t, am), r != null && fo(o, a), Nl
}

function xl() {
    let e = Q(),
        t = fl(e);
    return Tc(t) && _c(), Cc(), xl
}

function sm(e, t, n, r) {
    return Nl(e, t, n, r), xl(), sm
}
var am = (e, t, n, r, o) => (rr(!0), Ju(t[O], r, Xf()));

function Al(e, t, n) {
    let r = E(),
        o = r[C],
        i = e + P,
        s = o.firstCreatePass ? ml(i, r, 8, "ng-container", ll, Pi(), t, n) : o.data[i];
    if (dl(s, r, e, "ng-container", lb), Kn(s)) {
        let a = r[C];
        Rs(a, r, s), Zu(a, s, r)
    }
    return n != null && fo(r, s), Al
}

function Rl() {
    let e = L(),
        t = Q(),
        n = fl(t);
    return e.firstCreatePass && yl(e, n), Rl
}

function cm(e, t, n) {
    return Al(e, t, n), Rl(), cm
}
var lb = (e, t, n, r, o) => (rr(!0), Mh(t[O], ""));

function db() {
    return E()
}

function um(e, t, n) {
    let r = E(),
        o = Ge();
    if (ae(r, o, t)) {
        let i = L(),
            s = vn();
        ul(s, r, e, t, r[O], n)
    }
    return um
}

function lm(e, t, n) {
    let r = E(),
        o = Ge();
    if (ae(r, o, t)) {
        let i = L(),
            s = vn(),
            a = Oc(i.data),
            c = lw(a, s, r);
        ul(s, r, e, t, c, n)
    }
    return lm
}
var qi = void 0;

function fb(e) {
    let t = Math.floor(Math.abs(e)),
        n = e.toString().replace(/^[^.]*\.?/, "").length;
    return t === 1 && n === 0 ? 1 : 5
}
var pb = ["en", [
            ["a", "p"],
            ["AM", "PM"]
        ],
        [
            ["AM", "PM"]
        ],
        [
            ["S", "M", "T", "W", "T", "F", "S"],
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        ], qi, [
            ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        ], qi, [
            ["B", "A"],
            ["BC", "AD"],
            ["Before Christ", "Anno Domini"]
        ], 0, [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", qi, "{1} 'at' {0}", qi],
        [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"],
        ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", fb
    ],
    qc = {};

function ve(e) {
    let t = hb(e),
        n = Np(t);
    if (n) return n;
    let r = t.split("-")[0];
    if (n = Np(r), n) return n;
    if (r === "en") return pb;
    throw new D(701, !1)
}

function Np(e) {
    return e in qc || (qc[e] = $e.ng && $e.ng.common && $e.ng.common.locales && $e.ng.common.locales[e]), qc[e]
}
var z = (function(e) {
    return e[e.LocaleId = 0] = "LocaleId", e[e.DayPeriodsFormat = 1] = "DayPeriodsFormat", e[e.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", e[e.DaysFormat = 3] = "DaysFormat", e[e.DaysStandalone = 4] = "DaysStandalone", e[e.MonthsFormat = 5] = "MonthsFormat", e[e.MonthsStandalone = 6] = "MonthsStandalone", e[e.Eras = 7] = "Eras", e[e.FirstDayOfWeek = 8] = "FirstDayOfWeek", e[e.WeekendRange = 9] = "WeekendRange", e[e.DateFormat = 10] = "DateFormat", e[e.TimeFormat = 11] = "TimeFormat", e[e.DateTimeFormat = 12] = "DateTimeFormat", e[e.NumberSymbols = 13] = "NumberSymbols", e[e.NumberFormats = 14] = "NumberFormats", e[e.CurrencyCode = 15] = "CurrencyCode", e[e.CurrencySymbol = 16] = "CurrencySymbol", e[e.CurrencyName = 17] = "CurrencyName", e[e.Currencies = 18] = "Currencies", e[e.Directionality = 19] = "Directionality", e[e.PluralCase = 20] = "PluralCase", e[e.ExtraData = 21] = "ExtraData", e
})(z || {});

function hb(e) {
    return e.toLowerCase().replace(/_/g, "-")
}
var Eo = "en-US",
    gb = "USD",
    mb = {
        marker: "element"
    },
    yb = {
        marker: "ICU"
    },
    Dt = (function(e) {
        return e[e.SHIFT = 2] = "SHIFT", e[e.APPEND_EAGERLY = 1] = "APPEND_EAGERLY", e[e.COMMENT = 2] = "COMMENT", e
    })(Dt || {}),
    vb = Eo;

function dm(e) {
    typeof e == "string" && (vb = e.toLowerCase().replace(/_/g, "-"))
}

function Db(e, t, n) {
    let r = e[O];
    switch (n) {
        case Node.COMMENT_NODE:
            return Mh(r, t);
        case Node.TEXT_NODE:
            return _h(r, t);
        case Node.ELEMENT_NODE:
            return Ju(r, t, null)
    }
}
var Eb = (e, t, n, r) => (rr(!0), Db(e, n, r));

function Ib(e, t, n, r) {
    let o = e[O];
    for (let i = 0; i < t.length; i++) {
        let s = t[i++],
            a = t[i],
            c = (s & Dt.COMMENT) === Dt.COMMENT,
            u = (s & Dt.APPEND_EAGERLY) === Dt.APPEND_EAGERLY,
            l = s >>> Dt.SHIFT,
            d = e[l],
            f = !1;
        d === null && (d = e[l] = Eb(e, l, a, c ? Node.COMMENT_NODE : Node.TEXT_NODE), f = Gr()), u && n !== null && f && lr(o, n, d, r, !1)
    }
}
var Es = /�(\d+):?\d*�/gi;
var wb = /�(\d+)�/,
    fm = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/,
    Yr = "\uFFFD",
    Cb = /�\/?\*(\d+:\d+)�/gi,
    bb = /�(\/?[#*]\d+):?\d*�/gi,
    Tb = /\uE500/g;

function _b(e) {
    return e.replace(Tb, " ")
}

function Mb(e, t, n, r, o, i) {
    let s = er(),
        a = [],
        c = [],
        u = [
            []
        ],
        l = [
            []
        ];
    o = Nb(o, i);
    let d = _b(o).split(bb);
    for (let f = 0; f < d.length; f++) {
        let p = d[f];
        if ((f & 1) === 0) {
            let h = ju(p);
            for (let y = 0; y < h.length; y++) {
                let m = h[y];
                if ((y & 1) === 0) {
                    let g = m;
                    g !== "" && Sb(l[0], e, s, u[0], a, c, n, g)
                } else {
                    let g = m;
                    if (typeof g != "object") throw new Error(`Unable to parse ICU expression in "${o}" message.`);
                    let De = pm(e, s, u[0], n, a, "", !0).index;
                    gm(l[0], e, n, c, t, g, De)
                }
            }
        } else {
            let h = p.charCodeAt(0) === 47,
                y = p.charCodeAt(h ? 1 : 0),
                m = P + Number.parseInt(p.substring(h ? 2 : 1));
            if (h) u.shift(), l.shift(), st(er(), !1);
            else {
                let g = Pw(e, u[0], m);
                u.unshift([]), st(g, !0);
                let R = {
                    kind: 2,
                    index: m,
                    children: [],
                    type: y === 35 ? 0 : 1
                };
                l[0].push(R), l.unshift(R.children)
            }
        }
    }
    e.data[r] = {
        create: a,
        update: c,
        ast: l[0],
        parentTNodeIndex: t
    }
}

function pm(e, t, n, r, o, i, s) {
    let a = uo(e, r, 1, null),
        c = a << Dt.SHIFT,
        u = er();
    t === u && (u = null), u === null && (c |= Dt.APPEND_EAGERLY), s && (c |= Dt.COMMENT, FI(Bw)), o.push(c, i === null ? "" : i);
    let l = gl(e, a, s ? 32 : 1, i === null ? "" : i, null);
    gg(n, l);
    let d = l.index;
    return st(l, !1), u !== null && t !== u && kw(u, d), l
}

function Sb(e, t, n, r, o, i, s, a) {
    let c = a.match(Es),
        l = pm(t, n, r, s, o, c ? null : a, !1).index;
    c && ts(i, a, l, null, 0, null), e.push({
        kind: 0,
        index: l
    })
}

function ts(e, t, n, r, o, i) {
    let s = e.length,
        a = s + 1;
    e.push(null, null);
    let c = s + 2,
        u = t.split(Es),
        l = 0;
    for (let d = 0; d < u.length; d++) {
        let f = u[d];
        if (d & 1) {
            let p = o + parseInt(f, 10);
            e.push(-1 - p), l = l | hm(p)
        } else f !== "" && e.push(f)
    }
    return e.push(n << 2 | (r ? 1 : 0)), r && e.push(r, i), e[s] = l, e[a] = e.length - c, l
}

function hm(e) {
    return 1 << Math.min(e, 31)
}

function xp(e) {
    let t, n = "",
        r = 0,
        o = !1,
        i;
    for (;
        (t = Cb.exec(e)) !== null;) o ? t[0] === `${Yr}/*${i}${Yr}` && (r = t.index, o = !1) : (n += e.substring(r, t.index + t[0].length), i = t[1], o = !0);
    return n += e.slice(r), n
}

function Nb(e, t) {
    if (Vw(t)) return xp(e); {
        let n = e.indexOf(`:${t}${Yr}`) + 2 + t.toString().length,
            r = e.search(new RegExp(`${Yr}\\/\\*\\d+:${t}${Yr}`));
        return xp(e.substring(n, r))
    }
}

function gm(e, t, n, r, o, i, s) {
    let a = 0,
        c = {
            type: i.type,
            currentCaseLViewIndex: uo(t, n, 1, null),
            anchorIdx: s,
            cases: [],
            create: [],
            remove: [],
            update: []
        };
    Ob(r, i, s), Fw(t, s, c);
    let u = i.values,
        l = [];
    for (let d = 0; d < u.length; d++) {
        let f = u[d],
            p = [];
        for (let y = 0; y < f.length; y++) {
            let m = f[y];
            if (typeof m != "string") {
                let g = p.push(m) - 1;
                f[y] = `<!--\uFFFD${g}\uFFFD-->`
            }
        }
        let h = [];
        l.push(h), a = Ab(h, t, c, n, r, o, i.cases[d], f.join(""), p) | a
    }
    a && Fb(r, a, s), e.push({
        kind: 3,
        index: s,
        cases: l,
        currentCaseLViewIndex: c.currentCaseLViewIndex
    })
}

function xb(e) {
    let t = [],
        n = [],
        r = 1,
        o = 0;
    e = e.replace(fm, function(s, a, c) {
        return c === "select" ? r = 0 : r = 1, o = parseInt(a.slice(1), 10), ""
    });
    let i = ju(e);
    for (let s = 0; s < i.length;) {
        let a = i[s++].trim();
        r === 1 && (a = a.replace(/\s*(?:=)?(\w+)\s*/, "$1")), a.length && t.push(a);
        let c = ju(i[s++]);
        t.length > n.length && n.push(c)
    }
    return {
        type: r,
        mainBinding: o,
        cases: t,
        values: n
    }
}

function ju(e) {
    if (!e) return [];
    let t = 0,
        n = [],
        r = [],
        o = /[{}]/g;
    o.lastIndex = 0;
    let i;
    for (; i = o.exec(e);) {
        let a = i.index;
        if (i[0] == "}") {
            if (n.pop(), n.length == 0) {
                let c = e.substring(t, a);
                fm.test(c) ? r.push(xb(c)) : r.push(c), t = a + 1
            }
        } else {
            if (n.length == 0) {
                let c = e.substring(t, a);
                r.push(c), t = a + 1
            }
            n.push("{")
        }
    }
    let s = e.substring(t);
    return r.push(s), r
}

function Ab(e, t, n, r, o, i, s, a, c) {
    let u = [],
        l = [],
        d = [];
    n.cases.push(s), n.create.push(u), n.remove.push(l), n.update.push(d);
    let p = hh(Cs()).getInertBodyElement(a),
        h = hu(p) || p;
    return h ? mm(e, t, n, r, o, u, l, d, h, i, c, 0) : 0
}

function mm(e, t, n, r, o, i, s, a, c, u, l, d) {
    let f = 0,
        p = c.firstChild;
    for (; p;) {
        let h = uo(t, r, 1, null);
        switch (p.nodeType) {
            case Node.ELEMENT_NODE:
                let y = p,
                    m = y.tagName.toLowerCase();
                if (fu.hasOwnProperty(m)) {
                    Zc(i, mb, m, u, h), t.data[h] = m;
                    let U = y.attributes;
                    for (let Pe = 0; Pe < U.length; Pe++) {
                        let ut = U.item(Pe),
                            Ed = ut.name.toLowerCase();
                        !!ut.value.match(Es) ? vh.hasOwnProperty(Ed) && (Yu[Ed] ? ts(a, ut.value, h, ut.name, 0, Ms) : ts(a, ut.value, h, ut.name, 0, null)) : kb(i, h, ut)
                    }
                    let he = {
                        kind: 1,
                        index: h,
                        children: []
                    };
                    e.push(he), f = mm(he.children, t, n, r, o, i, s, a, p, h, l, d + 1) | f, Ap(s, h, d)
                }
                break;
            case Node.TEXT_NODE:
                let g = p.textContent || "",
                    R = g.match(Es);
                Zc(i, null, R ? "" : g, u, h), Ap(s, h, d), R && (f = ts(a, g, h, null, 0, null) | f), e.push({
                    kind: 0,
                    index: h
                });
                break;
            case Node.COMMENT_NODE:
                let De = wb.exec(p.textContent || "");
                if (De) {
                    let U = parseInt(De[1], 10),
                        he = l[U];
                    Zc(i, yb, "", u, h), gm(e, t, r, o, u, he, h), Rb(s, h, d)
                }
                break
        }
        p = p.nextSibling
    }
    return f
}

function Ap(e, t, n) {
    n === 0 && e.push(t)
}

function Rb(e, t, n) {
    n === 0 && (e.push(~t), e.push(t))
}

function Ob(e, t, n) {
    e.push(hm(t.mainBinding), 2, -1 - t.mainBinding, n << 2 | 2)
}

function Fb(e, t, n) {
    e.push(t, 1, n << 2 | 3)
}

function Zc(e, t, n, r, o) {
    t !== null && e.push(t), e.push(n, o, jw(0, r, o))
}

function kb(e, t, n) {
    e.push(t << 1 | 1, n.name, n.value)
}

function ym(e, t, n = -1) {
    let r = L(),
        o = E(),
        i = P + e,
        s = Te(r.consts, t),
        a = er();
    if (r.firstCreatePass && Mb(r, a === null ? 0 : a.index, o, i, s, n), r.type === 2) {
        let f = o[se];
        f[_] |= 32
    } else o[_] |= 32;
    let c = r.data[i],
        u = a === o[de] ? null : a,
        l = Uh(r, u, o),
        d = a && a.type & 8 ? o[a.index] : null;
    $w(o, i, a, n), Ib(o, c.create, l, d), Rc(!0)
}

function vm() {
    Rc(!1)
}

function Pb(e, t, n) {
    ym(e, t, n), vm()
}

function Dm(e, t, n) {
    let r = E(),
        o = L(),
        i = Q();
    return Im(o, r, r[O], i, e, t, n), Dm
}

function Em(e, t, n) {
    let r = E(),
        o = L(),
        i = Q();
    return (i.type & 3 || n) && bg(i, o, r, n, r[O], e, t, es(i, r, t)), Em
}

function Im(e, t, n, r, o, i, s) {
    let a = !0,
        c = null;
    if ((r.type & 3 || s) && (c ? ? = es(r, t, i), bg(r, e, t, s, n, o, i, c) && (a = !1)), a) {
        let u = r.outputs ? .[o],
            l = r.hostDirectiveOutputs ? .[o];
        if (l && l.length)
            for (let d = 0; d < l.length; d += 2) {
                let f = l[d],
                    p = l[d + 1];
                c ? ? = es(r, t, i), bp(r, t, f, p, o, c)
            }
        if (u && u.length)
            for (let d of u) c ? ? = es(r, t, i), bp(r, t, d, o, o, c)
    }
}

function Lb(e = 1) {
    return Qf(e)
}

function jb(e, t) {
    let n = null,
        r = EI(e);
    for (let o = 0; o < t.length; o++) {
        let i = t[o];
        if (i === "*") {
            n = o;
            continue
        }
        if (r === null ? Th(e, i, !0) : CI(r, i)) return o
    }
    return n
}

function Vb(e) {
    let t = E()[se][de];
    if (!t.projection) {
        let n = e ? e.length : 1,
            r = t.projection = Mf(n, null),
            o = r.slice(),
            i = t.child;
        for (; i !== null;) {
            if (i.type !== 128) {
                let s = e ? jb(i, e) : 0;
                s !== null && (o[s] ? o[s].projectionNext = i : r[s] = i, o[s] = i)
            }
            i = i.next
        }
    }
}

function Bb(e, t = 0, n, r, o, i) {
    let s = E(),
        a = L(),
        c = r ? e + 1 : null;
    c !== null && oo(s, a, c, r, o, i, null, n);
    let u = _n(a, P + e, 16, null, n || null);
    u.projection === null && (u.projection = t), Nc();
    let d = !s[dn] || bc();
    s[se][de].projection[u.projection] === null && c !== null ? Hb(s, a, c) : d && !bs(u) && JI(a, s, u)
}

function Hb(e, t, n) {
    let r = P + n,
        o = t.data[r],
        i = e[r],
        s = ls(i, o.tView.ssrId),
        a = po(e, o, void 0, {
            dehydratedView: s
        });
    ho(i, a, 0, fr(o, s))
}

function $b(e, t, n, r) {
    _C(e, t, n, r)
}

function Ub(e, t, n) {
    Ag(e, t, n)
}

function zb(e) {
    let t = E(),
        n = L(),
        r = Vi();
    zr(r + 1);
    let o = Il(n, r);
    if (e.dirty && Ff(t) === ((o.metadata.flags & 2) === 2)) {
        if (o.matches === null) e.reset([]);
        else {
            let i = Og(t, r);
            e.reset(i, Xp), e.notifyOnChanges()
        }
        return !0
    }
    return !1
}

function Gb() {
    return El(E(), Vi())
}

function Wb(e, t, n, r) {
    NC(e, Ag(t, n, r))
}

function qb(e = 1) {
    zr(Vi() + e)
}

function Zb(e) {
    let t = xc();
    return Xn(t, P + e)
}

function Zi(e, t) {
    return e << 17 | t << 2
}

function Tn(e) {
    return e >> 17 & 32767
}

function Yb(e) {
    return (e & 2) == 2
}

function Qb(e, t) {
    return e & 131071 | t << 17
}

function Vu(e) {
    return e | 2
}

function hr(e) {
    return (e & 131068) >> 2
}

function Yc(e, t) {
    return e & -131069 | t << 2
}

function Kb(e) {
    return (e & 1) === 1
}

function Bu(e) {
    return e | 1
}

function Jb(e, t, n, r, o, i) {
    let s = i ? t.classBindings : t.styleBindings,
        a = Tn(s),
        c = hr(s);
    e[r] = n;
    let u = !1,
        l;
    if (Array.isArray(n)) {
        let d = n;
        l = d[1], (l === null || Wn(d, l) > 0) && (u = !0)
    } else l = n;
    if (o)
        if (c !== 0) {
            let f = Tn(e[a + 1]);
            e[r + 1] = Zi(f, a), f !== 0 && (e[f + 1] = Yc(e[f + 1], r)), e[a + 1] = Qb(e[a + 1], r)
        } else e[r + 1] = Zi(a, 0), a !== 0 && (e[a + 1] = Yc(e[a + 1], r)), a = r;
    else e[r + 1] = Zi(c, 0), a === 0 ? a = r : e[c + 1] = Yc(e[c + 1], r), c = r;
    u && (e[r + 1] = Vu(e[r + 1])), Rp(e, l, r, !0), Rp(e, l, r, !1), Xb(t, l, e, r, i), s = Zi(a, c), i ? t.classBindings = s : t.styleBindings = s
}

function Xb(e, t, n, r, o) {
    let i = o ? e.residualClasses : e.residualStyles;
    i != null && typeof t == "string" && Wn(i, t) >= 0 && (n[r + 1] = Bu(n[r + 1]))
}

function Rp(e, t, n, r) {
    let o = e[n + 1],
        i = t === null,
        s = r ? Tn(o) : hr(o),
        a = !1;
    for (; s !== 0 && (a === !1 || i);) {
        let c = e[s],
            u = e[s + 1];
        eT(c, t) && (a = !0, e[s + 1] = r ? Bu(u) : Vu(u)), s = r ? Tn(u) : hr(u)
    }
    a && (e[n + 1] = r ? Vu(o) : Bu(o))
}

function eT(e, t) {
    return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t ? !0 : Array.isArray(e) && typeof t == "string" ? Wn(e, t) >= 0 : !1
}
var ne = {
    textEnd: 0,
    key: 0,
    keyEnd: 0,
    value: 0,
    valueEnd: 0
};

function wm(e) {
    return e.substring(ne.key, ne.keyEnd)
}

function tT(e) {
    return e.substring(ne.value, ne.valueEnd)
}

function nT(e) {
    return Tm(e), Cm(e, gr(e, 0, ne.textEnd))
}

function Cm(e, t) {
    let n = ne.textEnd;
    return n === t ? -1 : (t = ne.keyEnd = oT(e, ne.key = t, n), gr(e, t, n))
}

function rT(e) {
    return Tm(e), bm(e, gr(e, 0, ne.textEnd))
}

function bm(e, t) {
    let n = ne.textEnd,
        r = ne.key = gr(e, t, n);
    return n === r ? -1 : (r = ne.keyEnd = iT(e, r, n), r = Op(e, r, n, 58), r = ne.value = gr(e, r, n), r = ne.valueEnd = sT(e, r, n), Op(e, r, n, 59))
}

function Tm(e) {
    ne.key = 0, ne.keyEnd = 0, ne.value = 0, ne.valueEnd = 0, ne.textEnd = e.length
}

function gr(e, t, n) {
    for (; t < n && e.charCodeAt(t) <= 32;) t++;
    return t
}

function oT(e, t, n) {
    for (; t < n && e.charCodeAt(t) > 32;) t++;
    return t
}

function iT(e, t, n) {
    let r;
    for (; t < n && ((r = e.charCodeAt(t)) === 45 || r === 95 || (r & -33) >= 65 && (r & -33) <= 90 || r >= 48 && r <= 57);) t++;
    return t
}

function Op(e, t, n, r) {
    return t = gr(e, t, n), t < n && t++, t
}

function sT(e, t, n) {
    let r = -1,
        o = -1,
        i = -1,
        s = t,
        a = s;
    for (; s < n;) {
        let c = e.charCodeAt(s++);
        if (c === 59) return a;
        c === 34 || c === 39 ? a = s = Fp(e, c, s, n) : t === s - 4 && i === 85 && o === 82 && r === 76 && c === 40 ? a = s = Fp(e, 41, s, n) : c > 32 && (a = s), i = o, o = r, r = c & -33
    }
    return a
}

function Fp(e, t, n, r) {
    let o = -1,
        i = n;
    for (; i < r;) {
        let s = e.charCodeAt(i++);
        if (s == t && o !== 92) return i;
        s == 92 && o === 92 ? o = 0 : o = s
    }
    throw new Error
}

function _m(e, t, n) {
    return Sm(e, t, n, !1), _m
}

function Mm(e, t) {
    return Sm(e, t, null, !0), Mm
}

function aT(e) {
    Nm(Rm, cT, e, !1)
}

function cT(e, t) {
    for (let n = rT(t); n >= 0; n = bm(t, n)) Rm(e, wm(t), tT(t))
}

function uT(e) {
    Nm(mT, lT, e, !0)
}

function lT(e, t) {
    for (let n = nT(t); n >= 0; n = Cm(t, n)) Lr(e, wm(t), !0)
}

function Sm(e, t, n, r) {
    let o = E(),
        i = L(),
        s = nr(2);
    if (i.firstUpdatePass && Am(i, e, s, r), t !== K && ae(o, s, t)) {
        let a = i.data[_e()];
        Om(i, a, o, o[O], e, o[s + 1] = vT(t, n), r, s)
    }
}

function Nm(e, t, n, r) {
    let o = L(),
        i = nr(2);
    o.firstUpdatePass && Am(o, null, i, r);
    let s = E();
    if (n !== K && ae(s, i, n)) {
        let a = o.data[_e()];
        if (Fm(a, r) && !xm(o, i)) {
            let c = r ? a.classesWithoutHost : a.stylesWithoutHost;
            c !== null && (n = Mi(c, n || "")), Lu(o, a, s, n, r)
        } else yT(o, a, s, s[O], s[i + 1], s[i + 1] = gT(e, t, n), r, i)
    }
}

function xm(e, t) {
    return t >= e.expandoStartIndex
}

function Am(e, t, n, r) {
    let o = e.data;
    if (o[n + 1] === null) {
        let i = o[_e()],
            s = xm(e, n);
        Fm(i, r) && t === null && !s && (t = !1), t = dT(o, i, t, r), Jb(o, i, t, n, s, r)
    }
}

function dT(e, t, n, r) {
    let o = Oc(e),
        i = r ? t.residualClasses : t.residualStyles;
    if (o === null)(r ? t.classBindings : t.styleBindings) === 0 && (n = Qc(null, e, t, n, r), n = io(n, t.attrs, r), i = null);
    else {
        let s = t.directiveStylingLast;
        if (s === -1 || e[s] !== o)
            if (n = Qc(o, e, t, n, r), i === null) {
                let c = fT(e, t, r);
                c !== void 0 && Array.isArray(c) && (c = Qc(null, e, t, c[1], r), c = io(c, t.attrs, r), pT(e, t, r, c))
            } else i = hT(e, t, r)
    }
    return i !== void 0 && (r ? t.residualClasses = i : t.residualStyles = i), n
}

function fT(e, t, n) {
    let r = n ? t.classBindings : t.styleBindings;
    if (hr(r) !== 0) return e[Tn(r)]
}

function pT(e, t, n, r) {
    let o = n ? t.classBindings : t.styleBindings;
    e[Tn(o)] = r
}

function hT(e, t, n) {
    let r, o = t.directiveEnd;
    for (let i = 1 + t.directiveStylingLast; i < o; i++) {
        let s = e[i].hostAttrs;
        r = io(r, s, n)
    }
    return io(r, t.attrs, n)
}

function Qc(e, t, n, r, o) {
    let i = null,
        s = n.directiveEnd,
        a = n.directiveStylingLast;
    for (a === -1 ? a = n.directiveStart : a++; a < s && (i = t[a], r = io(r, i.hostAttrs, o), i !== e);) a++;
    return e !== null && (n.directiveStylingLast = a), r
}

function io(e, t, n) {
    let r = n ? 1 : 2,
        o = -1;
    if (t !== null)
        for (let i = 0; i < t.length; i++) {
            let s = t[i];
            typeof s == "number" ? o = s : o === r && (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]), Lr(e, s, n ? !0 : t[++i]))
        }
    return e === void 0 ? null : e
}

function gT(e, t, n) {
    if (n == null || n === "") return ie;
    let r = [],
        o = $t(n);
    if (Array.isArray(o))
        for (let i = 0; i < o.length; i++) e(r, o[i], !0);
    else if (typeof o == "object")
        for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
    else typeof o == "string" && t(r, o);
    return r
}

function Rm(e, t, n) {
    Lr(e, t, $t(n))
}

function mT(e, t, n) {
    let r = String(t);
    r !== "" && !r.includes(" ") && Lr(e, r, n)
}

function yT(e, t, n, r, o, i, s, a) {
    o === K && (o = ie);
    let c = 0,
        u = 0,
        l = 0 < o.length ? o[0] : null,
        d = 0 < i.length ? i[0] : null;
    for (; l !== null || d !== null;) {
        let f = c < o.length ? o[c + 1] : void 0,
            p = u < i.length ? i[u + 1] : void 0,
            h = null,
            y;
        l === d ? (c += 2, u += 2, f !== p && (h = d, y = p)) : d === null || l !== null && l < d ? (c += 2, h = l) : (u += 2, h = d, y = p), h !== null && Om(e, t, n, r, h, y, s, a), l = c < o.length ? o[c] : null, d = u < i.length ? i[u] : null
    }
}

function Om(e, t, n, r, o, i, s, a) {
    if (!(t.type & 3)) return;
    let c = e.data,
        u = c[a + 1],
        l = Kb(u) ? kp(c, t, n, o, hr(u), s) : void 0;
    if (!Is(l)) {
        Is(i) || Yb(u) && (i = kp(c, null, n, o, a, s));
        let d = yc(_e(), n);
        ew(r, s, d, o, i)
    }
}

function kp(e, t, n, r, o, i) {
    let s = t === null,
        a;
    for (; o > 0;) {
        let c = e[o],
            u = Array.isArray(c),
            l = u ? c[1] : c,
            d = l === null,
            f = n[o + 1];
        f === K && (f = d ? ie : void 0);
        let p = d ? Ri(f, r) : l === r ? f : void 0;
        if (u && !Is(p) && (p = Ri(c, r)), Is(p) && (a = p, s)) return a;
        let h = e[o + 1];
        o = s ? Tn(h) : hr(h)
    }
    if (t !== null) {
        let c = i ? t.residualClasses : t.residualStyles;
        c != null && (a = Ri(c, r))
    }
    return a
}

function Is(e) {
    return e !== void 0
}

function vT(e, t) {
    return e == null || e === "" || (typeof t == "string" ? e = e + t : typeof e == "object" && (e = pt($t(e)))), e
}

function Fm(e, t) {
    return (e.flags & (t ? 8 : 16)) !== 0
}

function DT(e, t = "") {
    let n = E(),
        r = L(),
        o = e + P,
        i = r.firstCreatePass ? _n(r, o, 1, t, null) : r.data[o],
        s = ET(r, n, i, t, e);
    n[o] = s, Gr() && al(r, n, s, i), st(i, !1)
}
var ET = (e, t, n, r, o) => (rr(!0), _h(t[O], r));

function km(e, t, n, r = "") {
    return ae(e, Ge(), n) ? t + le(n) + r : K
}

function IT(e, t, n, r, o, i = "") {
    let s = Li(),
        a = pr(e, s, n, o);
    return nr(2), a ? t + le(n) + r + le(o) + i : K
}

function wT(e, t, n, r, o, i, s, a = "") {
    let c = Li(),
        u = Dl(e, c, n, o, s);
    return nr(3), u ? t + le(n) + r + le(o) + i + le(s) + a : K
}

function CT(e, t, n, r, o, i, s, a, c, u = "") {
    let l = Li(),
        d = yo(e, l, n, o, s, c);
    return nr(4), d ? t + le(n) + r + le(o) + i + le(s) + a + le(c) + u : K
}

function Pm(e) {
    return Ol("", e), Pm
}

function Ol(e, t, n) {
    let r = E(),
        o = km(r, e, t, n);
    return o !== K && Vs(r, _e(), o), Ol
}

function Lm(e, t, n, r, o) {
    let i = E(),
        s = IT(i, e, t, n, r, o);
    return s !== K && Vs(i, _e(), s), Lm
}

function jm(e, t, n, r, o, i, s) {
    let a = E(),
        c = wT(a, e, t, n, r, o, i, s);
    return c !== K && Vs(a, _e(), c), jm
}

function Vm(e, t, n, r, o, i, s, a, c) {
    let u = E(),
        l = CT(u, e, t, n, r, o, i, s, a, c);
    return l !== K && Vs(u, _e(), l), Vm
}

function Vs(e, t, n) {
    let r = yc(t, e);
    MI(e[O], r, n)
}

function Bm(e, t, n) {
    jc(t) && (t = t());
    let r = E(),
        o = Ge();
    if (ae(r, o, t)) {
        let i = L(),
            s = vn();
        Kh(s, r, e, t, r[O], n)
    }
    return Bm
}

function bT(e, t) {
    let n = jc(e);
    return n && e.set(t), n
}

function Hm(e, t) {
    let n = E(),
        r = L(),
        o = Q();
    return Im(r, n, n[O], o, e, t), Hm
}
var $m = {};

function Um(e) {
    let t = L(),
        n = E(),
        r = e + P,
        o = _n(t, r, 128, null, null);
    return st(o, !1), $r(t, n, r, $m), Um
}

function TT(e) {
    Tt("NgLet");
    let t = L(),
        n = E(),
        r = _e();
    return $r(t, n, r, e), e
}

function _T(e) {
    let t = xc(),
        n = Xn(t, P + e);
    if (n === $m) throw new D(314, !1);
    return n
}

function MT(e) {
    return ae(E(), Ge(), e) ? le(e) : K
}

function ST(e, t, n = "") {
    return km(E(), e, t, n)
}

function NT(e, t, n) {
    let r = L();
    if (r.firstCreatePass) {
        let o = ze(e);
        Hu(n, r.data, r.blueprint, o, !0), Hu(t, r.data, r.blueprint, o, !1)
    }
}

function Hu(e, t, n, r, o) {
    if (e = oe(e), Array.isArray(e))
        for (let i = 0; i < e.length; i++) Hu(e[i], t, n, r, o);
    else {
        let i = L(),
            s = E(),
            a = Q(),
            c = an(e) ? e : oe(e.provide),
            u = cc(e),
            l = a.providerIndexes & 1048575,
            d = a.directiveStart,
            f = a.providerIndexes >> 20;
        if (an(e) || !e.multi) {
            let p = new Cn(u, o, j, null),
                h = Jc(c, t, o ? l : l + f, d);
            h === -1 ? (eu(ss(a, s), i, c), Kc(i, e, t.length), t.push(c), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), n.push(p), s.push(p)) : (n[h] = p, s[h] = p)
        } else {
            let p = Jc(c, t, l + f, d),
                h = Jc(c, t, l, l + f),
                y = p >= 0 && n[p],
                m = h >= 0 && n[h];
            if (o && !m || !o && !y) {
                eu(ss(a, s), i, c);
                let g = RT(o ? AT : xT, n.length, o, r, u, e);
                !o && m && (n[h].providerFactory = g), Kc(i, e, t.length, 0), t.push(c), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), n.push(g), s.push(g)
            } else {
                let g = zm(n[o ? h : p], u, !o && r);
                Kc(i, e, p > -1 ? p : h, g)
            }!o && r && m && n[h].componentProviders++
        }
    }
}

function Kc(e, t, n, r) {
    let o = an(t),
        i = Rf(t);
    if (o || i) {
        let c = (i ? oe(t.useClass) : t).prototype.ngOnDestroy;
        if (c) {
            let u = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
                let l = u.indexOf(n);
                l === -1 ? u.push(n, [r, c]) : u[l + 1].push(r, c)
            } else u.push(n, c)
        }
    }
}

function zm(e, t, n) {
    return n && e.componentProviders++, e.multi.push(t) - 1
}

function Jc(e, t, n, r) {
    for (let o = n; o < r; o++)
        if (t[o] === e) return o;
    return -1
}

function xT(e, t, n, r, o) {
    return $u(this.multi, [])
}

function AT(e, t, n, r, o) {
    let i = this.multi,
        s;
    if (this.providerFactory) {
        let a = this.providerFactory.componentProviders,
            c = Qr(r, r[C], this.providerFactory.index, o);
        s = c.slice(0, a), $u(i, s);
        for (let u = a; u < c.length; u++) s.push(c[u])
    } else s = [], $u(i, s);
    return s
}

function $u(e, t) {
    for (let n = 0; n < e.length; n++) {
        let r = e[n];
        t.push(r())
    }
    return t
}

function RT(e, t, n, r, o, i) {
    let s = new Cn(e, n, j, null);
    return s.multi = [], s.index = t, s.componentProviders = 0, zm(s, o, r && !n), s
}

function OT(e, t = []) {
    return n => {
        n.providersResolver = (r, o) => NT(r, o ? o(e) : e, t)
    }
}

function FT(e, t, n) {
    let r = e.\u0275cmp;
    r.directiveDefs = ys(t, Ug), r.pipeDefs = ys(n, oc)
}

function kT(e, t, n) {
    let r = Fe() + e,
        o = E();
    return o[r] === K ? Ut(o, r, n ? t.call(n) : t()) : Ls(o, r)
}

function PT(e, t, n, r) {
    return Gm(E(), Fe(), e, t, n, r)
}

function LT(e, t, n, r, o) {
    return Wm(E(), Fe(), e, t, n, r, o)
}

function jT(e, t, n, r, o, i) {
    return UT(E(), Fe(), e, t, n, r, o, i)
}

function VT(e, t, n, r, o, i, s) {
    return qm(E(), Fe(), e, t, n, r, o, i, s)
}

function BT(e, t, n, r, o, i, s, a) {
    let c = Fe() + e,
        u = E(),
        l = yo(u, c, n, r, o, i);
    return ae(u, c + 4, s) || l ? Ut(u, c + 5, a ? t.call(a, n, r, o, i, s) : t(n, r, o, i, s)) : Ls(u, c + 5)
}

function HT(e, t, n, r, o, i, s, a, c) {
    let u = Fe() + e,
        l = E(),
        d = yo(l, u, n, r, o, i);
    return pr(l, u + 4, s, a) || d ? Ut(l, u + 6, c ? t.call(c, n, r, o, i, s, a) : t(n, r, o, i, s, a)) : Ls(l, u + 6)
}

function $T(e, t, n, r, o, i, s, a, c, u) {
    let l = Fe() + e,
        d = E(),
        f = yo(d, l, n, r, o, i);
    return Dl(d, l + 4, s, a, c) || f ? Ut(d, l + 7, u ? t.call(u, n, r, o, i, s, a, c) : t(n, r, o, i, s, a, c)) : Ls(d, l + 7)
}

function Bs(e, t) {
    let n = e[t];
    return n === K ? void 0 : n
}

function Gm(e, t, n, r, o, i) {
    let s = t + n;
    return ae(e, s, o) ? Ut(e, s + 1, i ? r.call(i, o) : r(o)) : Bs(e, s + 1)
}

function Wm(e, t, n, r, o, i, s) {
    let a = t + n;
    return pr(e, a, o, i) ? Ut(e, a + 2, s ? r.call(s, o, i) : r(o, i)) : Bs(e, a + 2)
}

function UT(e, t, n, r, o, i, s, a) {
    let c = t + n;
    return Dl(e, c, o, i, s) ? Ut(e, c + 3, a ? r.call(a, o, i, s) : r(o, i, s)) : Bs(e, c + 3)
}

function qm(e, t, n, r, o, i, s, a, c) {
    let u = t + n;
    return yo(e, u, o, i, s, a) ? Ut(e, u + 4, c ? r.call(c, o, i, s, a) : r(o, i, s, a)) : Bs(e, u + 4)
}

function zT(e, t) {
    let n = L(),
        r, o = e + P;
    n.firstCreatePass ? (r = GT(t, n.pipeRegistry), n.data[o] = r, r.onDestroy && (n.destroyHooks ? ? = []).push(o, r.onDestroy)) : r = n.data[o];
    let i = r.factory || (r.factory = Rt(r.type, !0)),
        s, a = me(j);
    try {
        let c = is(!1),
            u = i();
        return is(c), $r(n, E(), o, u), u
    } finally {
        me(a)
    }
}

function GT(e, t) {
    if (t)
        for (let n = t.length - 1; n >= 0; n--) {
            let r = t[n];
            if (e === r.name) return r
        }
}

function WT(e, t, n) {
    let r = e + P,
        o = E(),
        i = Xn(o, r);
    return Fl(o, r) ? Gm(o, Fe(), t, i.transform, n, i) : i.transform(n)
}

function qT(e, t, n, r) {
    let o = e + P,
        i = E(),
        s = Xn(i, o);
    return Fl(i, o) ? Wm(i, Fe(), t, s.transform, n, r, s) : s.transform(n, r)
}

function ZT(e, t, n, r, o, i) {
    let s = e + P,
        a = E(),
        c = Xn(a, s);
    return Fl(a, s) ? qm(a, Fe(), t, c.transform, n, r, o, i, c) : c.transform(n, r, o, i)
}

function Fl(e, t) {
    return e[C].data[t].pure
}

function YT(e, t) {
    return Fs(e, t)
}
var Yi = null;

function Zm(e) {
    Yi !== null && (e.defaultEncapsulation !== Yi.defaultEncapsulation || e.preserveWhitespaces !== Yi.preserveWhitespaces) || (Yi = e)
}
var ws = class {
        ngModuleFactory;
        componentFactories;
        constructor(t, n) {
            this.ngModuleFactory = t, this.componentFactories = n
        }
    },
    QT = (() => {
        class e {
            compileModuleSync(n) {
                return new ro(n)
            }
            compileModuleAsync(n) {
                return Promise.resolve(this.compileModuleSync(n))
            }
            compileModuleAndAllComponentsSync(n) {
                let r = this.compileModuleSync(n),
                    o = nc(n),
                    i = Ch(o.declarations).reduce((s, a) => {
                        let c = nt(a);
                        return c && s.push(new Ht(c)), s
                    }, []);
                return new ws(r, i)
            }
            compileModuleAndAllComponentsAsync(n) {
                return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
            }
            clearCache() {}
            clearCacheFor(n) {}
            getModuleId(n) {}
            static\ u0275fac = function(r) {
                return new(r || e)
            };
            static\ u0275prov = A({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })(),
    Ym = new T("");
var KT = (() => {
    class e {
        zone = v(re);
        changeDetectionScheduler = v(He);
        applicationRef = v(Mn);
        applicationErrorHandler = v(We);
        _onMicrotaskEmptySubscription;
        initialize() {
            this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    this.changeDetectionScheduler.runningTick || this.zone.run(() => {
                        try {
                            this.applicationRef.dirtyFlags |= 1, this.applicationRef._tick()
                        } catch (n) {
                            this.applicationErrorHandler(n)
                        }
                    })
                }
            }))
        }
        ngOnDestroy() {
            this._onMicrotaskEmptySubscription ? .unsubscribe()
        }
        static\ u0275fac = function(r) {
            return new(r || e)
        };
        static\ u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        })
    }
    return e
})();

function Qm({
    ngZoneFactory: e,
    ignoreChangesOutsideZone: t,
    scheduleInRootZone: n
}) {
    return e ? ? = () => new re(G(H({}, kl()), {
        scheduleInRootZone: n
    })), [{
        provide: re,
        useFactory: e
    }, {
        provide: ln,
        multi: !0,
        useFactory: () => {
            let r = v(KT, {
                optional: !0
            });
            return () => r.initialize()
        }
    }, {
        provide: ln,
        multi: !0,
        useFactory: () => {
            let r = v(JT);
            return () => {
                r.initialize()
            }
        }
    }, t === !0 ? {
        provide: Vc,
        useValue: !0
    } : [], {
        provide: Bc,
        useValue: n ? ? Oh
    }, {
        provide: We,
        useFactory: () => {
            let r = v(re),
                o = v(Ie),
                i;
            return s => {
                r.runOutsideAngular(() => {
                    o.destroyed && !i ? setTimeout(() => {
                        throw s
                    }) : (i ? ? = o.get(tt), i.handleError(s))
                })
            }
        }
    }]
}

function kl(e) {
    return {
        enableLongStackTrace: !1,
        shouldCoalesceEventChangeDetection: e ? .eventCoalescing ? ? !1,
        shouldCoalesceRunChangeDetection: e ? .runCoalescing ? ? !1
    }
}
var JT = (() => {
    class e {
        subscription = new W;
        initialized = !1;
        zone = v(re);
        pendingTasks = v(Vt);
        initialize() {
            if (this.initialized) return;
            this.initialized = !0;
            let n = null;
            !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (n = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
                this.subscription.add(this.zone.onStable.subscribe(() => {
                    re.assertNotInAngularZone(), queueMicrotask(() => {
                        n !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(n), n = null)
                    })
                }))
            }), this.subscription.add(this.zone.onUnstable.subscribe(() => {
                re.assertInAngularZone(), n ? ? = this.pendingTasks.add()
            }))
        }
        ngOnDestroy() {
            this.subscription.unsubscribe()
        }
        static\ u0275fac = function(r) {
            return new(r || e)
        };
        static\ u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        })
    }
    return e
})();
var Km = (() => {
    class e {
        applicationErrorHandler = v(We);
        appRef = v(Mn);
        taskService = v(Vt);
        ngZone = v(re);
        zonelessEnabled = v(Ui);
        tracing = v(lo, {
            optional: !0
        });
        disableScheduling = v(Vc, {
            optional: !0
        }) ? ? !1;
        zoneIsDefined = typeof Zone < "u" && !!Zone.root.run;
        schedulerTickApplyArgs = [{
            data: {
                __scheduler_tick__: !0
            }
        }];
        subscriptions = new W;
        angularZoneId = this.zoneIsDefined ? this.ngZone._inner ? .get(cs) : null;
        scheduleInRootZone = !this.zonelessEnabled && this.zoneIsDefined && (v(Bc, {
            optional: !0
        }) ? ? !1);
        cancelScheduledCallback = null;
        useMicrotaskScheduler = !1;
        runningTick = !1;
        pendingRenderTaskId = null;
        constructor() {
            this.subscriptions.add(this.appRef.afterTick.subscribe(() => {
                this.runningTick || this.cleanup()
            })), this.subscriptions.add(this.ngZone.onUnstable.subscribe(() => {
                this.runningTick || this.cleanup()
            })), this.disableScheduling || = !this.zonelessEnabled && (this.ngZone instanceof Jr || !this.zoneIsDefined)
        }
        notify(n) {
            if (!this.zonelessEnabled && n === 5) return;
            let r = !1;
            switch (n) {
                case 0:
                    {
                        this.appRef.dirtyFlags |= 2;
                        break
                    }
                case 3:
                case 2:
                case 4:
                case 5:
                case 1:
                    {
                        this.appRef.dirtyFlags |= 4;
                        break
                    }
                case 6:
                    {
                        this.appRef.dirtyFlags |= 2,
                        r = !0;
                        break
                    }
                case 12:
                    {
                        this.appRef.dirtyFlags |= 16,
                        r = !0;
                        break
                    }
                case 13:
                    {
                        this.appRef.dirtyFlags |= 2,
                        r = !0;
                        break
                    }
                case 11:
                    {
                        r = !0;
                        break
                    }
                case 9:
                case 8:
                case 7:
                case 10:
                default:
                    this.appRef.dirtyFlags |= 8
            }
            if (this.appRef.tracingSnapshot = this.tracing ? .snapshot(this.appRef.tracingSnapshot) ? ? null, !this.shouldScheduleTick(r)) return;
            let o = this.useMicrotaskScheduler ? gp : Fh;
            this.pendingRenderTaskId = this.taskService.add(), this.scheduleInRootZone ? this.cancelScheduledCallback = Zone.root.run(() => o(() => this.tick())) : this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() => o(() => this.tick()))
        }
        shouldScheduleTick(n) {
            return !(this.disableScheduling && !n || this.appRef.destroyed || this.pendingRenderTaskId !== null || this.runningTick || this.appRef._runningTick || !this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(cs + this.angularZoneId))
        }
        tick() {
            if (this.runningTick || this.appRef.destroyed) return;
            if (this.appRef.dirtyFlags === 0) {
                this.cleanup();
                return
            }!this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1);
            let n = this.taskService.add();
            try {
                this.ngZone.run(() => {
                    this.runningTick = !0, this.appRef._tick()
                }, void 0, this.schedulerTickApplyArgs)
            } catch (r) {
                this.taskService.remove(n), this.applicationErrorHandler(r)
            } finally {
                this.cleanup()
            }
            this.useMicrotaskScheduler = !0, gp(() => {
                this.useMicrotaskScheduler = !1, this.taskService.remove(n)
            })
        }
        ngOnDestroy() {
            this.subscriptions.unsubscribe(), this.cleanup()
        }
        cleanup() {
            if (this.runningTick = !1, this.cancelScheduledCallback ? .(), this.cancelScheduledCallback = null, this.pendingRenderTaskId !== null) {
                let n = this.pendingRenderTaskId;
                this.pendingRenderTaskId = null, this.taskService.remove(n)
            }
        }
        static\ u0275fac = function(r) {
            return new(r || e)
        };
        static\ u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        })
    }
    return e
})();

function XT() {
    return typeof $localize < "u" && $localize.locale || Eo
}
var zt = new T("", {
        providedIn: "root",
        factory: () => v(zt, {
            optional: !0,
            skipSelf: !0
        }) || XT()
    }),
    Pl = new T("", {
        providedIn: "root",
        factory: () => gb
    });
var Io = class {
    destroyed = !1;
    listeners = null;
    errorHandler = v(tt, {
        optional: !0
    });
    destroyRef = v(fe);
    constructor() {
        this.destroyRef.onDestroy(() => {
            this.destroyed = !0, this.listeners = null
        })
    }
    subscribe(t) {
        if (this.destroyed) throw new D(953, !1);
        return (this.listeners ? ? = []).push(t), {
            unsubscribe: () => {
                let n = this.listeners ? .indexOf(t);
                n !== void 0 && n !== -1 && this.listeners ? .splice(n, 1)
            }
        }
    }
    emit(t) {
        if (this.destroyed) {
            console.warn(ht(953, !1));
            return
        }
        if (this.listeners === null) return;
        let n = M(null);
        try {
            for (let r of this.listeners) try {
                r(t)
            } catch (o) {
                this.errorHandler ? .handleError(o)
            }
        } finally {
            M(n)
        }
    }
};

function Sn(e) {
    return pf(e)
}

function jl(e, t) {
    return xr(e, t ? .equal)
}
var Ll = class {
    [ee];
    constructor(t) {
        this[ee] = t
    }
    destroy() {
        this[ee].destroy()
    }
};

function Vl(e, t) {
    let n = t ? .injector ? ? v(ye),
        r = t ? .manualCleanup !== !0 ? n.get(fe) : null,
        o, i = n.get(or, null, {
            optional: !0
        }),
        s = n.get(He);
    return i !== null ? (o = n_(i.view, s, e), r instanceof Fr && r._lView === i.view && (r = null)) : o = r_(e, n.get(Wr), s), o.injector = n, r !== null && (o.onDestroyFn = r.onDestroy(() => o.destroy())), new Ll(o)
}
var Jm = G(H({}, hf), {
        cleanupFns: void 0,
        zone: null,
        onDestroyFn: In,
        run() {
            let e = tr(!1);
            try {
                gf(this)
            } finally {
                tr(e)
            }
        },
        cleanup() {
            if (!this.cleanupFns ? .length) return;
            let e = M(null);
            try {
                for (; this.cleanupFns.length;) this.cleanupFns.pop()()
            } finally {
                this.cleanupFns = [], M(e)
            }
        }
    }),
    e_ = G(H({}, Jm), {
        consumerMarkedDirty() {
            this.scheduler.schedule(this), this.notifier.notify(12)
        },
        destroy() {
            nn(this), this.onDestroyFn(), this.cleanup(), this.scheduler.remove(this)
        }
    }),
    t_ = G(H({}, Jm), {
        consumerMarkedDirty() {
            this.view[_] |= 8192, Lt(this.view), this.notifier.notify(13)
        },
        destroy() {
            nn(this), this.onDestroyFn(), this.cleanup(), this.view[mt] ? .delete(this)
        }
    });

function n_(e, t, n) {
    let r = Object.create(t_);
    return r.view = e, r.zone = typeof Zone < "u" ? Zone.current : null, r.notifier = t, r.fn = Xm(r, n), e[mt] ? ? = new Set, e[mt].add(r), r.consumerMarkedDirty(r), r
}

function r_(e, t, n) {
    let r = Object.create(e_);
    return r.fn = Xm(r, e), r.scheduler = t, r.notifier = n, r.zone = typeof Zone < "u" ? Zone.current : null, r.scheduler.add(r), r.notifier.notify(12), r
}

function Xm(e, t) {
    return () => {
        t(n => (e.cleanupFns ? ? = []).push(n))
    }
}
var Us = Symbol("InputSignalNode#UNSET"),
    dy = G(H({}, wi), {
        transformFn: void 0,
        applyValueToInputSignal(e, t) {
            rn(e, t)
        }
    });

function fy(e, t) {
    let n = Object.create(dy);
    n.value = e, n.transformFn = t ? .transform;

    function r() {
        if (en(n), n.value === Us) {
            let o = null;
            throw new D(-950, o)
        }
        return n.value
    }
    return r[ee] = n, r
}
var ey = class {
        attributeName;
        constructor(t) {
            this.attributeName = t
        }
        __NG_ELEMENT_ID__ = () => Wu(this.attributeName);
        toString() {
            return `HostAttributeToken ${this.attributeName}`
        }
    },
    h_ = new T("");
h_.__NG_ELEMENT_ID__ = e => {
    let t = Q();
    if (t === null) throw new D(204, !1);
    if (t.type & 2) return t.value;
    if (e & 8) return null;
    throw new D(204, !1)
};

function RH(e) {
    return new Io
}

function ty(e, t) {
    return fy(e, t)
}

function g_(e) {
    return fy(Us, e)
}
var OH = (ty.required = g_, ty);

function ny(e, t) {
    return kg(t)
}

function m_(e, t) {
    return Pg(t)
}
var FH = (ny.required = m_, ny);

function py(e, t) {
    let n = Object.create(dy),
        r = new Io;
    n.value = e;

    function o() {
        return en(n), ry(n.value), n.value
    }
    return o[ee] = n, o.asReadonly = $i.bind(o), o.set = i => {
        n.equal(n.value, i) || (rn(n, i), r.emit(i))
    }, o.update = i => {
        ry(n.value), o.set(i(n.value))
    }, o.subscribe = r.subscribe.bind(r), o.destroyRef = r.destroyRef, o
}

function ry(e) {
    if (e === Us) throw new D(952, !1)
}

function oy(e, t) {
    return py(e, t)
}

function y_(e) {
    return py(Us, e)
}
var kH = (oy.required = y_, oy);

function v_(e, t, n) {
    let r = new ro(n);
    return Promise.resolve(r)
}

function iy(e) {
    for (let t = e.length - 1; t >= 0; t--)
        if (e[t] !== void 0) return e[t]
}
var Hs = new T(""),
    D_ = new T("");

function wo(e) {
    return !e.moduleRef
}

function E_(e) {
    let t = wo(e) ? e.r3Injector : e.moduleRef.injector,
        n = t.get(re);
    return n.run(() => {
        wo(e) ? e.r3Injector.resolveInjectorInitializers() : e.moduleRef.resolveInjectorInitializers();
        let r = t.get(We),
            o;
        if (n.runOutsideAngular(() => {
                o = n.onError.subscribe({
                    next: r
                })
            }), wo(e)) {
            let i = () => t.destroy(),
                s = e.platformInjector.get(Hs);
            s.add(i), t.onDestroy(() => {
                o.unsubscribe(), s.delete(i)
            })
        } else {
            let i = () => e.moduleRef.destroy(),
                s = e.platformInjector.get(Hs);
            s.add(i), e.moduleRef.onDestroy(() => {
                Zr(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i)
            })
        }
        return w_(r, n, () => {
            let i = t.get(Vt),
                s = i.add(),
                a = t.get(bl);
            return a.runInitializers(), a.donePromise.then(() => {
                let c = t.get(zt, Eo);
                if (dm(c || Eo), !t.get(D_, !0)) return wo(e) ? t.get(Mn) : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
                if (wo(e)) {
                    let l = t.get(Mn);
                    return e.rootComponent !== void 0 && l.bootstrap(e.rootComponent), l
                } else return hy ? .(e.moduleRef, e.allPlatformModules), e.moduleRef
            }).finally(() => void i.remove(s))
        })
    })
}
var hy;

function sy() {
    hy = I_
}

function I_(e, t) {
    let n = e.injector.get(Mn);
    if (e._bootstrapComponents.length > 0) e._bootstrapComponents.forEach(r => n.bootstrap(r));
    else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(n);
    else throw new D(-403, !1);
    t.push(e)
}

function w_(e, t, n) {
    try {
        let r = n();
        return Do(r) ? r.catch(o => {
            throw t.runOutsideAngular(() => e(o)), o
        }) : r
    } catch (r) {
        throw t.runOutsideAngular(() => e(r)), r
    }
}
var gy = (() => {
        class e {
            _injector;
            _modules = [];
            _destroyListeners = [];
            _destroyed = !1;
            constructor(n) {
                this._injector = n
            }
            bootstrapModuleFactory(n, r) {
                let o = r ? .scheduleInRootZone,
                    i = () => Ph(r ? .ngZone, G(H({}, kl({
                        eventCoalescing: r ? .ngZoneEventCoalescing,
                        runCoalescing: r ? .ngZoneRunCoalescing
                    })), {
                        scheduleInRootZone: o
                    })),
                    s = r ? .ignoreChangesOutsideZone,
                    a = [Qm({
                        ngZoneFactory: i,
                        ignoreChangesOutsideZone: s
                    }), {
                        provide: He,
                        useExisting: Km
                    }, tp],
                    c = Hg(n.moduleType, this.injector, a);
                return sy(), E_({
                    moduleRef: c,
                    allPlatformModules: this._modules,
                    platformInjector: this.injector
                })
            }
            bootstrapModule(n, r = []) {
                let o = Tl({}, r);
                return sy(), v_(this.injector, o, n).then(i => this.bootstrapModuleFactory(i, o))
            }
            onDestroy(n) {
                this._destroyListeners.push(n)
            }
            get injector() {
                return this._injector
            }
            destroy() {
                if (this._destroyed) throw new D(404, !1);
                this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
                let n = this._injector.get(Hs, null);
                n && (n.forEach(r => r()), n.clear()), this._destroyed = !0
            }
            get destroyed() {
                return this._destroyed
            }
            static\ u0275fac = function(r) {
                return new(r || e)(F(ye))
            };
            static\ u0275prov = A({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            })
        }
        return e
    })(),
    ql = null;

function C_(e) {
    if (Zl()) throw new D(400, !1);
    em(), ql = e;
    let t = e.get(gy);
    return M_(e), t
}

function b_(e, t, n = []) {
    let r = `Platform: ${t}`,
        o = new T(r);
    return (i = []) => {
        let s = Zl();
        if (!s) {
            let a = [...n, ...i, {
                provide: o,
                useValue: !0
            }];
            s = e ? .(a) ? ? C_(T_(a, r))
        }
        return __(o)
    }
}

function T_(e = [], t) {
    return ye.create({
        name: t,
        providers: [{
            provide: ac,
            useValue: "platform"
        }, {
            provide: Hs,
            useValue: new Set([() => ql = null])
        }, ...e]
    })
}

function __(e) {
    let t = Zl();
    if (!t) throw new D(-401, !1);
    return t
}

function Zl() {
    return ql ? .get(gy) ? ? null
}

function M_(e) {
    let t = e.get(ih, null);
    Zn(e, () => {
        t ? .forEach(n => n())
    })
}

function PH() {
    return !1
}
var Yl = (() => {
    class e {
        static __NG_ELEMENT_ID__ = S_
    }
    return e
})();

function S_(e) {
    return N_(Q(), E(), (e & 16) === 16)
}

function N_(e, t, n) {
    if (yt(e) && !n) {
        let r = Oe(e.index, t);
        return new Bt(r, r)
    } else if (e.type & 175) {
        let r = t[se];
        return new Bt(r, t)
    }
    return null
}
var Bl = class {
        constructor() {}
        supports(t) {
            return vl(t)
        }
        create(t) {
            return new Hl(t)
        }
    },
    x_ = (e, t) => t,
    Hl = class {
        length = 0;
        collection;
        _linkedRecords = null;
        _unlinkedRecords = null;
        _previousItHead = null;
        _itHead = null;
        _itTail = null;
        _additionsHead = null;
        _additionsTail = null;
        _movesHead = null;
        _movesTail = null;
        _removalsHead = null;
        _removalsTail = null;
        _identityChangesHead = null;
        _identityChangesTail = null;
        _trackByFn;
        constructor(t) {
            this._trackByFn = t || x_
        }
        forEachItem(t) {
            let n;
            for (n = this._itHead; n !== null; n = n._next) t(n)
        }
        forEachOperation(t) {
            let n = this._itHead,
                r = this._removalsHead,
                o = 0,
                i = null;
            for (; n || r;) {
                let s = !r || n && n.currentIndex < ay(r, o, i) ? n : r,
                    a = ay(s, o, i),
                    c = s.currentIndex;
                if (s === r) o--, r = r._nextRemoved;
                else if (n = n._next, s.previousIndex == null) o++;
                else {
                    i || (i = []);
                    let u = a - o,
                        l = c - o;
                    if (u != l) {
                        for (let f = 0; f < u; f++) {
                            let p = f < i.length ? i[f] : i[f] = 0,
                                h = p + f;
                            l <= h && h < u && (i[f] = p + 1)
                        }
                        let d = s.previousIndex;
                        i[d] = l - u
                    }
                }
                a !== c && t(s, a, c)
            }
        }
        forEachPreviousItem(t) {
            let n;
            for (n = this._previousItHead; n !== null; n = n._nextPrevious) t(n)
        }
        forEachAddedItem(t) {
            let n;
            for (n = this._additionsHead; n !== null; n = n._nextAdded) t(n)
        }
        forEachMovedItem(t) {
            let n;
            for (n = this._movesHead; n !== null; n = n._nextMoved) t(n)
        }
        forEachRemovedItem(t) {
            let n;
            for (n = this._removalsHead; n !== null; n = n._nextRemoved) t(n)
        }
        forEachIdentityChange(t) {
            let n;
            for (n = this._identityChangesHead; n !== null; n = n._nextIdentityChange) t(n)
        }
        diff(t) {
            if (t == null && (t = []), !vl(t)) throw new D(900, !1);
            return this.check(t) ? this : null
        }
        onDestroy() {}
        check(t) {
            this._reset();
            let n = this._itHead,
                r = !1,
                o, i, s;
            if (Array.isArray(t)) {
                this.length = t.length;
                for (let a = 0; a < this.length; a++) i = t[a], s = this._trackByFn(a, i), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, i, s, a), r = !0) : (r && (n = this._verifyReinsertion(n, i, s, a)), Object.is(n.item, i) || this._addIdentityChange(n, i)), n = n._next
            } else o = 0, Cg(t, a => {
                s = this._trackByFn(o, a), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, a, s, o), r = !0) : (r && (n = this._verifyReinsertion(n, a, s, o)), Object.is(n.item, a) || this._addIdentityChange(n, a)), n = n._next, o++
            }), this.length = o;
            return this._truncate(n), this.collection = t, this.isDirty
        }
        get isDirty() {
            return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null
        }
        _reset() {
            if (this.isDirty) {
                let t;
                for (t = this._previousItHead = this._itHead; t !== null; t = t._next) t._nextPrevious = t._next;
                for (t = this._additionsHead; t !== null; t = t._nextAdded) t.previousIndex = t.currentIndex;
                for (this._additionsHead = this._additionsTail = null, t = this._movesHead; t !== null; t = t._nextMoved) t.previousIndex = t.currentIndex;
                this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
            }
        }
        _mismatch(t, n, r, o) {
            let i;
            return t === null ? i = this._itTail : (i = t._prev, this._remove(t)), t = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(r, null), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, i, o)) : (t = this._linkedRecords === null ? null : this._linkedRecords.get(r, o), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, i, o)) : t = this._addAfter(new $l(n, r), i, o)), t
        }
        _verifyReinsertion(t, n, r, o) {
            let i = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(r, null);
            return i !== null ? t = this._reinsertAfter(i, t._prev, o) : t.currentIndex != o && (t.currentIndex = o, this._addToMoves(t, o)), t
        }
        _truncate(t) {
            for (; t !== null;) {
                let n = t._next;
                this._addToRemovals(this._unlink(t)), t = n
            }
            this._unlinkedRecords !== null && this._unlinkedRecords.clear(), this._additionsTail !== null && (this._additionsTail._nextAdded = null), this._movesTail !== null && (this._movesTail._nextMoved = null), this._itTail !== null && (this._itTail._next = null), this._removalsTail !== null && (this._removalsTail._nextRemoved = null), this._identityChangesTail !== null && (this._identityChangesTail._nextIdentityChange = null)
        }
        _reinsertAfter(t, n, r) {
            this._unlinkedRecords !== null && this._unlinkedRecords.remove(t);
            let o = t._prevRemoved,
                i = t._nextRemoved;
            return o === null ? this._removalsHead = i : o._nextRemoved = i, i === null ? this._removalsTail = o : i._prevRemoved = o, this._insertAfter(t, n, r), this._addToMoves(t, r), t
        }
        _moveAfter(t, n, r) {
            return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t
        }
        _addAfter(t, n, r) {
            return this._insertAfter(t, n, r), this._additionsTail === null ? this._additionsTail = this._additionsHead = t : this._additionsTail = this._additionsTail._nextAdded = t, t
        }
        _insertAfter(t, n, r) {
            let o = n === null ? this._itHead : n._next;
            return t._next = o, t._prev = n, o === null ? this._itTail = t : o._prev = t, n === null ? this._itHead = t : n._next = t, this._linkedRecords === null && (this._linkedRecords = new $s), this._linkedRecords.put(t), t.currentIndex = r, t
        }
        _remove(t) {
            return this._addToRemovals(this._unlink(t))
        }
        _unlink(t) {
            this._linkedRecords !== null && this._linkedRecords.remove(t);
            let n = t._prev,
                r = t._next;
            return n === null ? this._itHead = r : n._next = r, r === null ? this._itTail = n : r._prev = n, t
        }
        _addToMoves(t, n) {
            return t.previousIndex === n || (this._movesTail === null ? this._movesTail = this._movesHead = t : this._movesTail = this._movesTail._nextMoved = t), t
        }
        _addToRemovals(t) {
            return this._unlinkedRecords === null && (this._unlinkedRecords = new $s), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, this._removalsTail === null ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
        }
        _addIdentityChange(t, n) {
            return t.item = n, this._identityChangesTail === null ? this._identityChangesTail = this._identityChangesHead = t : this._identityChangesTail = this._identityChangesTail._nextIdentityChange = t, t
        }
    },
    $l = class {
        item;
        trackById;
        currentIndex = null;
        previousIndex = null;
        _nextPrevious = null;
        _prev = null;
        _next = null;
        _prevDup = null;
        _nextDup = null;
        _prevRemoved = null;
        _nextRemoved = null;
        _nextAdded = null;
        _nextMoved = null;
        _nextIdentityChange = null;
        constructor(t, n) {
            this.item = t, this.trackById = n
        }
    },
    Ul = class {
        _head = null;
        _tail = null;
        add(t) {
            this._head === null ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
        }
        get(t, n) {
            let r;
            for (r = this._head; r !== null; r = r._nextDup)
                if ((n === null || n <= r.currentIndex) && Object.is(r.trackById, t)) return r;
            return null
        }
        remove(t) {
            let n = t._prevDup,
                r = t._nextDup;
            return n === null ? this._head = r : n._nextDup = r, r === null ? this._tail = n : r._prevDup = n, this._head === null
        }
    },
    $s = class {
        map = new Map;
        put(t) {
            let n = t.trackById,
                r = this.map.get(n);
            r || (r = new Ul, this.map.set(n, r)), r.add(t)
        }
        get(t, n) {
            let r = t,
                o = this.map.get(r);
            return o ? o.get(t, n) : null
        }
        remove(t) {
            let n = t.trackById;
            return this.map.get(n).remove(t) && this.map.delete(n), t
        }
        get isEmpty() {
            return this.map.size === 0
        }
        clear() {
            this.map.clear()
        }
    };

function ay(e, t, n) {
    let r = e.previousIndex;
    if (r === null) return r;
    let o = 0;
    return n && r < n.length && (o = n[r]), r + t + o
}
var zl = class {
        constructor() {}
        supports(t) {
            return t instanceof Map || Ps(t)
        }
        create() {
            return new Gl
        }
    },
    Gl = class {
        _records = new Map;
        _mapHead = null;
        _appendAfter = null;
        _previousMapHead = null;
        _changesHead = null;
        _changesTail = null;
        _additionsHead = null;
        _additionsTail = null;
        _removalsHead = null;
        _removalsTail = null;
        get isDirty() {
            return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null
        }
        forEachItem(t) {
            let n;
            for (n = this._mapHead; n !== null; n = n._next) t(n)
        }
        forEachPreviousItem(t) {
            let n;
            for (n = this._previousMapHead; n !== null; n = n._nextPrevious) t(n)
        }
        forEachChangedItem(t) {
            let n;
            for (n = this._changesHead; n !== null; n = n._nextChanged) t(n)
        }
        forEachAddedItem(t) {
            let n;
            for (n = this._additionsHead; n !== null; n = n._nextAdded) t(n)
        }
        forEachRemovedItem(t) {
            let n;
            for (n = this._removalsHead; n !== null; n = n._nextRemoved) t(n)
        }
        diff(t) {
            if (!t) t = new Map;
            else if (!(t instanceof Map || Ps(t))) throw new D(900, !1);
            return this.check(t) ? this : null
        }
        onDestroy() {}
        check(t) {
            this._reset();
            let n = this._mapHead;
            if (this._appendAfter = null, this._forEach(t, (r, o) => {
                    if (n && n.key === o) this._maybeAddToChanges(n, r), this._appendAfter = n, n = n._next;
                    else {
                        let i = this._getOrCreateRecordForKey(o, r);
                        n = this._insertBeforeOrAppend(n, i)
                    }
                }), n) {
                n._prev && (n._prev._next = null), this._removalsHead = n;
                for (let r = n; r !== null; r = r._nextRemoved) r === this._mapHead && (this._mapHead = null), this._records.delete(r.key), r._nextRemoved = r._next, r.previousValue = r.currentValue, r.currentValue = null, r._prev = null, r._next = null
            }
            return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
        }
        _insertBeforeOrAppend(t, n) {
            if (t) {
                let r = t._prev;
                return n._next = t, n._prev = r, t._prev = n, r && (r._next = n), t === this._mapHead && (this._mapHead = n), this._appendAfter = t, t
            }
            return this._appendAfter ? (this._appendAfter._next = n, n._prev = this._appendAfter) : this._mapHead = n, this._appendAfter = n, null
        }
        _getOrCreateRecordForKey(t, n) {
            if (this._records.has(t)) {
                let o = this._records.get(t);
                this._maybeAddToChanges(o, n);
                let i = o._prev,
                    s = o._next;
                return i && (i._next = s), s && (s._prev = i), o._next = null, o._prev = null, o
            }
            let r = new Wl(t);
            return this._records.set(t, r), r.currentValue = n, this._addToAdditions(r), r
        }
        _reset() {
            if (this.isDirty) {
                let t;
                for (this._previousMapHead = this._mapHead, t = this._previousMapHead; t !== null; t = t._next) t._nextPrevious = t._next;
                for (t = this._changesHead; t !== null; t = t._nextChanged) t.previousValue = t.currentValue;
                for (t = this._additionsHead; t != null; t = t._nextAdded) t.previousValue = t.currentValue;
                this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
            }
        }
        _maybeAddToChanges(t, n) {
            Object.is(n, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = n, this._addToChanges(t))
        }
        _addToAdditions(t) {
            this._additionsHead === null ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t)
        }
        _addToChanges(t) {
            this._changesHead === null ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t)
        }
        _forEach(t, n) {
            t instanceof Map ? t.forEach(n) : Object.keys(t).forEach(r => n(t[r], r))
        }
    },
    Wl = class {
        key;
        previousValue = null;
        currentValue = null;
        _nextPrevious = null;
        _next = null;
        _prev = null;
        _nextAdded = null;
        _nextRemoved = null;
        _nextChanged = null;
        constructor(t) {
            this.key = t
        }
    };

function cy() {
    return new Ql([new Bl])
}
var Ql = (() => {
    class e {
        factories;
        static\ u0275prov = A({
            token: e,
            providedIn: "root",
            factory: cy
        });
        constructor(n) {
            this.factories = n
        }
        static create(n, r) {
            if (r != null) {
                let o = r.factories.slice();
                n = n.concat(o)
            }
            return new e(n)
        }
        static extend(n) {
            return {
                provide: e,
                useFactory: () => {
                    let r = v(e, {
                        optional: !0,
                        skipSelf: !0
                    });
                    return e.create(n, r || cy())
                }
            }
        }
        find(n) {
            let r = this.factories.find(o => o.supports(n));
            if (r != null) return r;
            throw new D(901, !1)
        }
    }
    return e
})();

function uy() {
    return new Kl([new zl])
}
var Kl = (() => {
    class e {
        static\ u0275prov = A({
            token: e,
            providedIn: "root",
            factory: uy
        });
        factories;
        constructor(n) {
            this.factories = n
        }
        static create(n, r) {
            if (r) {
                let o = r.factories.slice();
                n = n.concat(o)
            }
            return new e(n)
        }
        static extend(n) {
            return {
                provide: e,
                useFactory: () => {
                    let r = v(e, {
                        optional: !0,
                        skipSelf: !0
                    });
                    return e.create(n, r || uy())
                }
            }
        }
        find(n) {
            let r = this.factories.find(o => o.supports(n));
            if (r) return r;
            throw new D(901, !1)
        }
    }
    return e
})();
var LH = b_(null, "core", []),
    jH = (() => {
        class e {
            constructor(n) {}
            static\ u0275fac = function(r) {
                return new(r || e)(F(Mn))
            };
            static\ u0275mod = vo({
                type: e
            });
            static\ u0275inj = Gn({})
        }
        return e
    })();

function A_(e) {
    return typeof e == "boolean" ? e : e != null && e !== "false"
}

function R_(e, t = NaN) {
    return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t
}

function VH(e, t) {
    let n = nt(e),
        r = t.elementInjector || qn();
    return new Ht(n).create(r, t.projectableNodes, t.hostElement, t.environmentInjector, t.directives, t.bindings)
}

function BH(e) {
    let t = nt(e);
    if (!t) return null;
    let n = new Ht(t);
    return {
        get selector() {
            return n.selector
        },
        get type() {
            return n.componentType
        },
        get inputs() {
            return n.inputs
        },
        get outputs() {
            return n.outputs
        },
        get ngContentSelectors() {
            return n.ngContentSelectors
        },
        get isStandalone() {
            return t.standalone
        },
        get isSignal() {
            return t.signals
        }
    }
}
var vy = null;

function zs() {
    return vy
}

function O_(e) {
    vy ? ? = e
}
var Xl = class {},
    Co = (() => {
        class e {
            historyGo(n) {
                throw new Error("")
            }
            static\ u0275fac = function(r) {
                return new(r || e)
            };
            static\ u0275prov = A({
                token: e,
                factory: () => v(Dy),
                providedIn: "platform"
            })
        }
        return e
    })(),
    F_ = new T(""),
    Dy = (() => {
        class e extends Co {
            _location;
            _history;
            _doc = v(vt);
            constructor() {
                super(), this._location = window.location, this._history = window.history
            }
            getBaseHrefFromDOM() {
                return zs().getBaseHref(this._doc)
            }
            onPopState(n) {
                let r = zs().getGlobalEventTarget(this._doc, "window");
                return r.addEventListener("popstate", n, !1), () => r.removeEventListener("popstate", n)
            }
            onHashChange(n) {
                let r = zs().getGlobalEventTarget(this._doc, "window");
                return r.addEventListener("hashchange", n, !1), () => r.removeEventListener("hashchange", n)
            }
            get href() {
                return this._location.href
            }
            get protocol() {
                return this._location.protocol
            }
            get hostname() {
                return this._location.hostname
            }
            get port() {
                return this._location.port
            }
            get pathname() {
                return this._location.pathname
            }
            get search() {
                return this._location.search
            }
            get hash() {
                return this._location.hash
            }
            set pathname(n) {
                this._location.pathname = n
            }
            pushState(n, r, o) {
                this._history.pushState(n, r, o)
            }
            replaceState(n, r, o) {
                this._history.replaceState(n, r, o)
            }
            forward() {
                this._history.forward()
            }
            back() {
                this._history.back()
            }
            historyGo(n = 0) {
                this._history.go(n)
            }
            getState() {
                return this._history.state
            }
            static\ u0275fac = function(r) {
                return new(r || e)
            };
            static\ u0275prov = A({
                token: e,
                factory: () => new e,
                providedIn: "platform"
            })
        }
        return e
    })();

function Gs(e, t) {
    return e ? t ? e.endsWith("/") ? t.startsWith("/") ? e + t.slice(1) : e + t : t.startsWith("/") ? e + t : `${e}/${t}` : e : t
}

function my(e) {
    let t = e.search(/#|\?|$/);
    return e[t - 1] === "/" ? e.slice(0, t - 1) + e.slice(t) : e
}

function Ze(e) {
    return e && e[0] !== "?" ? `?${e}` : e
}
var yr = (() => {
        class e {
            historyGo(n) {
                throw new Error("")
            }
            static\ u0275fac = function(r) {
                return new(r || e)
            };
            static\ u0275prov = A({
                token: e,
                factory: () => v(Ey),
                providedIn: "root"
            })
        }
        return e
    })(),
    Ws = new T(""),
    Ey = (() => {
        class e extends yr {
            _platformLocation;
            _baseHref;
            _removeListenerFns = [];
            constructor(n, r) {
                super(), this._platformLocation = n, this._baseHref = r ? ? this._platformLocation.getBaseHrefFromDOM() ? ? v(vt).location ? .origin ? ? ""
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
            }
            onPopState(n) {
                this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
            }
            getBaseHref() {
                return this._baseHref
            }
            prepareExternalUrl(n) {
                return Gs(this._baseHref, n)
            }
            path(n = !1) {
                let r = this._platformLocation.pathname + Ze(this._platformLocation.search),
                    o = this._platformLocation.hash;
                return o && n ? `${r}${o}` : r
            }
            pushState(n, r, o, i) {
                let s = this.prepareExternalUrl(o + Ze(i));
                this._platformLocation.pushState(n, r, s)
            }
            replaceState(n, r, o, i) {
                let s = this.prepareExternalUrl(o + Ze(i));
                this._platformLocation.replaceState(n, r, s)
            }
            forward() {
                this._platformLocation.forward()
            }
            back() {
                this._platformLocation.back()
            }
            getState() {
                return this._platformLocation.getState()
            }
            historyGo(n = 0) {
                this._platformLocation.historyGo ? .(n)
            }
            static\ u0275fac = function(r) {
                return new(r || e)(F(Co), F(Ws, 8))
            };
            static\ u0275prov = A({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
        return e
    })(),
    Iy = (() => {
        class e {
            _subject = new Ee;
            _basePath;
            _locationStrategy;
            _urlChangeListeners = [];
            _urlChangeSubscription = null;
            constructor(n) {
                this._locationStrategy = n;
                let r = this._locationStrategy.getBaseHref();
                this._basePath = L_(my(yy(r))), this._locationStrategy.onPopState(o => {
                    this._subject.next({
                        url: this.path(!0),
                        pop: !0,
                        state: o.state,
                        type: o.type
                    })
                })
            }
            ngOnDestroy() {
                this._urlChangeSubscription ? .unsubscribe(), this._urlChangeListeners = []
            }
            path(n = !1) {
                return this.normalize(this._locationStrategy.path(n))
            }
            getState() {
                return this._locationStrategy.getState()
            }
            isCurrentPathEqualTo(n, r = "") {
                return this.path() == this.normalize(n + Ze(r))
            }
            normalize(n) {
                return e.stripTrailingSlash(P_(this._basePath, yy(n)))
            }
            prepareExternalUrl(n) {
                return n && n[0] !== "/" && (n = "/" + n), this._locationStrategy.prepareExternalUrl(n)
            }
            go(n, r = "", o = null) {
                this._locationStrategy.pushState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Ze(r)), o)
            }
            replaceState(n, r = "", o = null) {
                this._locationStrategy.replaceState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Ze(r)), o)
            }
            forward() {
                this._locationStrategy.forward()
            }
            back() {
                this._locationStrategy.back()
            }
            historyGo(n = 0) {
                this._locationStrategy.historyGo ? .(n)
            }
            onUrlChange(n) {
                return this._urlChangeListeners.push(n), this._urlChangeSubscription ? ? = this.subscribe(r => {
                    this._notifyUrlChangeListeners(r.url, r.state)
                }), () => {
                    let r = this._urlChangeListeners.indexOf(n);
                    this._urlChangeListeners.splice(r, 1), this._urlChangeListeners.length === 0 && (this._urlChangeSubscription ? .unsubscribe(), this._urlChangeSubscription = null)
                }
            }
            _notifyUrlChangeListeners(n = "", r) {
                this._urlChangeListeners.forEach(o => o(n, r))
            }
            subscribe(n, r, o) {
                return this._subject.subscribe({
                    next: n,
                    error: r ? ? void 0,
                    complete: o ? ? void 0
                })
            }
            static normalizeQueryParams = Ze;
            static joinWithSlash = Gs;
            static stripTrailingSlash = my;
            static\ u0275fac = function(r) {
                return new(r || e)(F(yr))
            };
            static\ u0275prov = A({
                token: e,
                factory: () => k_(),
                providedIn: "root"
            })
        }
        return e
    })();

function k_() {
    return new Iy(F(yr))
}

function P_(e, t) {
    if (!e || !t.startsWith(e)) return t;
    let n = t.substring(e.length);
    return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t
}

function yy(e) {
    return e.replace(/\/index.html$/, "")
}

function L_(e) {
    if (new RegExp("^(https?:)?//").test(e)) {
        let [, n] = e.split(/\/\/[^\/]+/);
        return n
    }
    return e
}
var j_ = (() => {
        class e extends yr {
            _platformLocation;
            _baseHref = "";
            _removeListenerFns = [];
            constructor(n, r) {
                super(), this._platformLocation = n, r != null && (this._baseHref = r)
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
            }
            onPopState(n) {
                this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
            }
            getBaseHref() {
                return this._baseHref
            }
            path(n = !1) {
                let r = this._platformLocation.hash ? ? "#";
                return r.length > 0 ? r.substring(1) : r
            }
            prepareExternalUrl(n) {
                let r = Gs(this._baseHref, n);
                return r.length > 0 ? "#" + r : r
            }
            pushState(n, r, o, i) {
                let s = this.prepareExternalUrl(o + Ze(i)) || this._platformLocation.pathname;
                this._platformLocation.pushState(n, r, s)
            }
            replaceState(n, r, o, i) {
                let s = this.prepareExternalUrl(o + Ze(i)) || this._platformLocation.pathname;
                this._platformLocation.replaceState(n, r, s)
            }
            forward() {
                this._platformLocation.forward()
            }
            back() {
                this._platformLocation.back()
            }
            getState() {
                return this._platformLocation.getState()
            }
            historyGo(n = 0) {
                this._platformLocation.historyGo ? .(n)
            }
            static\ u0275fac = function(r) {
                return new(r || e)(F(Co), F(Ws, 8))
            };
            static\ u0275prov = A({
                token: e,
                factory: e.\u0275fac
            })
        }
        return e
    })(),
    Sy = {
        ADP: [void 0, void 0, 0],
        AFN: [void 0, "\u060B", 0],
        ALL: [void 0, void 0, 0],
        AMD: [void 0, "\u058F", 2],
        AOA: [void 0, "Kz"],
        ARS: [void 0, "$"],
        AUD: ["A$", "$"],
        AZN: [void 0, "\u20BC"],
        BAM: [void 0, "KM"],
        BBD: [void 0, "$"],
        BDT: [void 0, "\u09F3"],
        BHD: [void 0, void 0, 3],
        BIF: [void 0, void 0, 0],
        BMD: [void 0, "$"],
        BND: [void 0, "$"],
        BOB: [void 0, "Bs"],
        BRL: ["R$"],
        BSD: [void 0, "$"],
        BWP: [void 0, "P"],
        BYN: [void 0, void 0, 2],
        BYR: [void 0, void 0, 0],
        BZD: [void 0, "$"],
        CAD: ["CA$", "$", 2],
        CHF: [void 0, void 0, 2],
        CLF: [void 0, void 0, 4],
        CLP: [void 0, "$", 0],
        CNY: ["CN\xA5", "\xA5"],
        COP: [void 0, "$", 2],
        CRC: [void 0, "\u20A1", 2],
        CUC: [void 0, "$"],
        CUP: [void 0, "$"],
        CZK: [void 0, "K\u010D", 2],
        DJF: [void 0, void 0, 0],
        DKK: [void 0, "kr", 2],
        DOP: [void 0, "$"],
        EGP: [void 0, "E\xA3"],
        ESP: [void 0, "\u20A7", 0],
        EUR: ["\u20AC"],
        FJD: [void 0, "$"],
        FKP: [void 0, "\xA3"],
        GBP: ["\xA3"],
        GEL: [void 0, "\u20BE"],
        GHS: [void 0, "GH\u20B5"],
        GIP: [void 0, "\xA3"],
        GNF: [void 0, "FG", 0],
        GTQ: [void 0, "Q"],
        GYD: [void 0, "$", 2],
        HKD: ["HK$", "$"],
        HNL: [void 0, "L"],
        HRK: [void 0, "kn"],
        HUF: [void 0, "Ft", 2],
        IDR: [void 0, "Rp", 2],
        ILS: ["\u20AA"],
        INR: ["\u20B9"],
        IQD: [void 0, void 0, 0],
        IRR: [void 0, void 0, 0],
        ISK: [void 0, "kr", 0],
        ITL: [void 0, void 0, 0],
        JMD: [void 0, "$"],
        JOD: [void 0, void 0, 3],
        JPY: ["\xA5", void 0, 0],
        KHR: [void 0, "\u17DB"],
        KMF: [void 0, "CF", 0],
        KPW: [void 0, "\u20A9", 0],
        KRW: ["\u20A9", void 0, 0],
        KWD: [void 0, void 0, 3],
        KYD: [void 0, "$"],
        KZT: [void 0, "\u20B8"],
        LAK: [void 0, "\u20AD", 0],
        LBP: [void 0, "L\xA3", 0],
        LKR: [void 0, "Rs"],
        LRD: [void 0, "$"],
        LTL: [void 0, "Lt"],
        LUF: [void 0, void 0, 0],
        LVL: [void 0, "Ls"],
        LYD: [void 0, void 0, 3],
        MGA: [void 0, "Ar", 0],
        MGF: [void 0, void 0, 0],
        MMK: [void 0, "K", 0],
        MNT: [void 0, "\u20AE", 2],
        MRO: [void 0, void 0, 0],
        MUR: [void 0, "Rs", 2],
        MXN: ["MX$", "$"],
        MYR: [void 0, "RM"],
        NAD: [void 0, "$"],
        NGN: [void 0, "\u20A6"],
        NIO: [void 0, "C$"],
        NOK: [void 0, "kr", 2],
        NPR: [void 0, "Rs"],
        NZD: ["NZ$", "$"],
        OMR: [void 0, void 0, 3],
        PHP: ["\u20B1"],
        PKR: [void 0, "Rs", 2],
        PLN: [void 0, "z\u0142"],
        PYG: [void 0, "\u20B2", 0],
        RON: [void 0, "lei"],
        RSD: [void 0, void 0, 0],
        RUB: [void 0, "\u20BD"],
        RWF: [void 0, "RF", 0],
        SBD: [void 0, "$"],
        SEK: [void 0, "kr", 2],
        SGD: [void 0, "$"],
        SHP: [void 0, "\xA3"],
        SLE: [void 0, void 0, 2],
        SLL: [void 0, void 0, 0],
        SOS: [void 0, void 0, 0],
        SRD: [void 0, "$"],
        SSP: [void 0, "\xA3"],
        STD: [void 0, void 0, 0],
        STN: [void 0, "Db"],
        SYP: [void 0, "\xA3", 0],
        THB: [void 0, "\u0E3F"],
        TMM: [void 0, void 0, 0],
        TND: [void 0, void 0, 3],
        TOP: [void 0, "T$"],
        TRL: [void 0, void 0, 0],
        TRY: [void 0, "\u20BA"],
        TTD: [void 0, "$"],
        TWD: ["NT$", "$", 2],
        TZS: [void 0, void 0, 2],
        UAH: [void 0, "\u20B4"],
        UGX: [void 0, void 0, 0],
        USD: ["$"],
        UYI: [void 0, void 0, 0],
        UYU: [void 0, "$"],
        UYW: [void 0, void 0, 4],
        UZS: [void 0, void 0, 2],
        VEF: [void 0, "Bs", 2],
        VND: ["\u20AB", void 0, 0],
        VUV: [void 0, void 0, 0],
        XAF: ["FCFA", void 0, 0],
        XCD: ["EC$", "$"],
        XOF: ["F\u202FCFA", void 0, 0],
        XPF: ["CFPF", void 0, 0],
        XXX: ["\xA4"],
        YER: [void 0, void 0, 0],
        ZAR: [void 0, "R"],
        ZMK: [void 0, void 0, 0],
        ZMW: [void 0, "ZK"],
        ZWD: [void 0, void 0, 0]
    },
    So = (function(e) {
        return e[e.Decimal = 0] = "Decimal", e[e.Percent = 1] = "Percent", e[e.Currency = 2] = "Currency", e[e.Scientific = 3] = "Scientific", e
    })(So || {});
var pe = (function(e) {
        return e[e.Format = 0] = "Format", e[e.Standalone = 1] = "Standalone", e
    })(pe || {}),
    V = (function(e) {
        return e[e.Narrow = 0] = "Narrow", e[e.Abbreviated = 1] = "Abbreviated", e[e.Wide = 2] = "Wide", e[e.Short = 3] = "Short", e
    })(V || {}),
    we = (function(e) {
        return e[e.Short = 0] = "Short", e[e.Medium = 1] = "Medium", e[e.Long = 2] = "Long", e[e.Full = 3] = "Full", e
    })(we || {}),
    Y = {
        Decimal: 0,
        Group: 1,
        List: 2,
        PercentSign: 3,
        PlusSign: 4,
        MinusSign: 5,
        Exponential: 6,
        SuperscriptingExponent: 7,
        PerMille: 8,
        Infinity: 9,
        NaN: 10,
        TimeSeparator: 11,
        CurrencyDecimal: 12,
        CurrencyGroup: 13
    };

function Ny(e) {
    return ve(e)[z.LocaleId]
}

function xy(e, t, n) {
    let r = ve(e),
        o = [r[z.DayPeriodsFormat], r[z.DayPeriodsStandalone]],
        i = ke(o, t);
    return ke(i, n)
}

function Ay(e, t, n) {
    let r = ve(e),
        o = [r[z.DaysFormat], r[z.DaysStandalone]],
        i = ke(o, t);
    return ke(i, n)
}

function Ry(e, t, n) {
    let r = ve(e),
        o = [r[z.MonthsFormat], r[z.MonthsStandalone]],
        i = ke(o, t);
    return ke(i, n)
}

function Oy(e, t) {
    let r = ve(e)[z.Eras];
    return ke(r, t)
}

function bo(e, t) {
    let n = ve(e);
    return ke(n[z.DateFormat], t)
}

function To(e, t) {
    let n = ve(e);
    return ke(n[z.TimeFormat], t)
}

function _o(e, t) {
    let r = ve(e)[z.DateTimeFormat];
    return ke(r, t)
}

function Me(e, t) {
    let n = ve(e),
        r = n[z.NumberSymbols][t];
    if (typeof r > "u") {
        if (t === Y.CurrencyDecimal) return n[z.NumberSymbols][Y.Decimal];
        if (t === Y.CurrencyGroup) return n[z.NumberSymbols][Y.Group]
    }
    return r
}

function na(e, t) {
    return ve(e)[z.NumberFormats][t]
}

function V_(e) {
    return ve(e)[z.Currencies]
}

function Fy(e) {
    if (!e[z.ExtraData]) throw new D(2303, !1)
}

function ky(e) {
    let t = ve(e);
    return Fy(t), (t[z.ExtraData][2] || []).map(r => typeof r == "string" ? ed(r) : [ed(r[0]), ed(r[1])])
}

function Py(e, t, n) {
    let r = ve(e);
    Fy(r);
    let o = [r[z.ExtraData][0], r[z.ExtraData][1]],
        i = ke(o, t) || [];
    return ke(i, n) || []
}

function ke(e, t) {
    for (let n = t; n > -1; n--)
        if (typeof e[n] < "u") return e[n];
    throw new D(2304, !1)
}

function ed(e) {
    let [t, n] = e.split(":");
    return {
        hours: +t,
        minutes: +n
    }
}

function Ly(e, t, n = "en") {
    let r = V_(n)[e] || Sy[e] || [],
        o = r[1];
    return t === "narrow" && typeof o == "string" ? o : r[0] || e
}
var B_ = 2;

function jy(e) {
    let t, n = Sy[e];
    return n && (t = n[2]), typeof t == "number" ? t : B_
}
var H_ = /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
    qs = {},
    $_ = /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;

function Vy(e, t, n, r) {
    let o = K_(e);
    t = St(n, t) || t;
    let s = [],
        a;
    for (; t;)
        if (a = $_.exec(t), a) {
            s = s.concat(a.slice(1));
            let l = s.pop();
            if (!l) break;
            t = l
        } else {
            s.push(t);
            break
        }
    let c = o.getTimezoneOffset();
    r && (c = Hy(r, c), o = Q_(o, r));
    let u = "";
    return s.forEach(l => {
        let d = Z_(l);
        u += d ? d(o, n, c) : l === "''" ? "'" : l.replace(/(^'|'$)/g, "").replace(/''/g, "'")
    }), u
}

function Js(e, t, n) {
    let r = new Date(0);
    return r.setFullYear(e, t, n), r.setHours(0, 0, 0), r
}

function St(e, t) {
    let n = Ny(e);
    if (qs[n] ? ? = {}, qs[n][t]) return qs[n][t];
    let r = "";
    switch (t) {
        case "shortDate":
            r = bo(e, we.Short);
            break;
        case "mediumDate":
            r = bo(e, we.Medium);
            break;
        case "longDate":
            r = bo(e, we.Long);
            break;
        case "fullDate":
            r = bo(e, we.Full);
            break;
        case "shortTime":
            r = To(e, we.Short);
            break;
        case "mediumTime":
            r = To(e, we.Medium);
            break;
        case "longTime":
            r = To(e, we.Long);
            break;
        case "fullTime":
            r = To(e, we.Full);
            break;
        case "short":
            let o = St(e, "shortTime"),
                i = St(e, "shortDate");
            r = Zs(_o(e, we.Short), [o, i]);
            break;
        case "medium":
            let s = St(e, "mediumTime"),
                a = St(e, "mediumDate");
            r = Zs(_o(e, we.Medium), [s, a]);
            break;
        case "long":
            let c = St(e, "longTime"),
                u = St(e, "longDate");
            r = Zs(_o(e, we.Long), [c, u]);
            break;
        case "full":
            let l = St(e, "fullTime"),
                d = St(e, "fullDate");
            r = Zs(_o(e, we.Full), [l, d]);
            break
    }
    return r && (qs[n][t] = r), r
}

function Zs(e, t) {
    return t && (e = e.replace(/\{([^}]+)}/g, function(n, r) {
        return t != null && r in t ? t[r] : n
    })), e
}

function Ye(e, t, n = "-", r, o) {
    let i = "";
    (e < 0 || o && e <= 0) && (o ? e = -e + 1 : (e = -e, i = n));
    let s = String(e);
    for (; s.length < t;) s = "0" + s;
    return r && (s = s.slice(s.length - t)), i + s
}

function U_(e, t) {
    return Ye(e, 3).substring(0, t)
}

function J(e, t, n = 0, r = !1, o = !1) {
    return function(i, s) {
        let a = z_(e, i);
        if ((n > 0 || a > -n) && (a += n), e === 3) a === 0 && n === -12 && (a = 12);
        else if (e === 6) return U_(a, t);
        let c = Me(s, Y.MinusSign);
        return Ye(a, t, c, r, o)
    }
}

function z_(e, t) {
    switch (e) {
        case 0:
            return t.getFullYear();
        case 1:
            return t.getMonth();
        case 2:
            return t.getDate();
        case 3:
            return t.getHours();
        case 4:
            return t.getMinutes();
        case 5:
            return t.getSeconds();
        case 6:
            return t.getMilliseconds();
        case 7:
            return t.getDay();
        default:
            throw new D(2301, !1)
    }
}

function $(e, t, n = pe.Format, r = !1) {
    return function(o, i) {
        return G_(o, i, e, t, n, r)
    }
}

function G_(e, t, n, r, o, i) {
    switch (n) {
        case 2:
            return Ry(t, o, r)[e.getMonth()];
        case 1:
            return Ay(t, o, r)[e.getDay()];
        case 0:
            let s = e.getHours(),
                a = e.getMinutes();
            if (i) {
                let u = ky(t),
                    l = Py(t, o, r),
                    d = u.findIndex(f => {
                        if (Array.isArray(f)) {
                            let [p, h] = f, y = s >= p.hours && a >= p.minutes, m = s < h.hours || s === h.hours && a < h.minutes;
                            if (p.hours < h.hours) {
                                if (y && m) return !0
                            } else if (y || m) return !0
                        } else if (f.hours === s && f.minutes === a) return !0;
                        return !1
                    });
                if (d !== -1) return l[d]
            }
            return xy(t, o, r)[s < 12 ? 0 : 1];
        case 3:
            return Oy(t, r)[e.getFullYear() <= 0 ? 0 : 1];
        default:
            let c = n;
            throw new D(2302, !1)
    }
}

function Ys(e) {
    return function(t, n, r) {
        let o = -1 * r,
            i = Me(n, Y.MinusSign),
            s = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60);
        switch (e) {
            case 0:
                return (o >= 0 ? "+" : "") + Ye(s, 2, i) + Ye(Math.abs(o % 60), 2, i);
            case 1:
                return "GMT" + (o >= 0 ? "+" : "") + Ye(s, 1, i);
            case 2:
                return "GMT" + (o >= 0 ? "+" : "") + Ye(s, 2, i) + ":" + Ye(Math.abs(o % 60), 2, i);
            case 3:
                return r === 0 ? "Z" : (o >= 0 ? "+" : "") + Ye(s, 2, i) + ":" + Ye(Math.abs(o % 60), 2, i);
            default:
                throw new D(2310, !1)
        }
    }
}
var W_ = 0,
    Ks = 4;

function q_(e) {
    let t = Js(e, W_, 1).getDay();
    return Js(e, 0, 1 + (t <= Ks ? Ks : Ks + 7) - t)
}

function By(e) {
    let t = e.getDay(),
        n = t === 0 ? -3 : Ks - t;
    return Js(e.getFullYear(), e.getMonth(), e.getDate() + n)
}

function td(e, t = !1) {
    return function(n, r) {
        let o;
        if (t) {
            let i = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1,
                s = n.getDate();
            o = 1 + Math.floor((s + i) / 7)
        } else {
            let i = By(n),
                s = q_(i.getFullYear()),
                a = i.getTime() - s.getTime();
            o = 1 + Math.round(a / 6048e5)
        }
        return Ye(o, e, Me(r, Y.MinusSign))
    }
}

function Qs(e, t = !1) {
    return function(n, r) {
        let i = By(n).getFullYear();
        return Ye(i, e, Me(r, Y.MinusSign), t)
    }
}
var nd = {};

function Z_(e) {
    if (nd[e]) return nd[e];
    let t;
    switch (e) {
        case "G":
        case "GG":
        case "GGG":
            t = $(3, V.Abbreviated);
            break;
        case "GGGG":
            t = $(3, V.Wide);
            break;
        case "GGGGG":
            t = $(3, V.Narrow);
            break;
        case "y":
            t = J(0, 1, 0, !1, !0);
            break;
        case "yy":
            t = J(0, 2, 0, !0, !0);
            break;
        case "yyy":
            t = J(0, 3, 0, !1, !0);
            break;
        case "yyyy":
            t = J(0, 4, 0, !1, !0);
            break;
        case "Y":
            t = Qs(1);
            break;
        case "YY":
            t = Qs(2, !0);
            break;
        case "YYY":
            t = Qs(3);
            break;
        case "YYYY":
            t = Qs(4);
            break;
        case "M":
        case "L":
            t = J(1, 1, 1);
            break;
        case "MM":
        case "LL":
            t = J(1, 2, 1);
            break;
        case "MMM":
            t = $(2, V.Abbreviated);
            break;
        case "MMMM":
            t = $(2, V.Wide);
            break;
        case "MMMMM":
            t = $(2, V.Narrow);
            break;
        case "LLL":
            t = $(2, V.Abbreviated, pe.Standalone);
            break;
        case "LLLL":
            t = $(2, V.Wide, pe.Standalone);
            break;
        case "LLLLL":
            t = $(2, V.Narrow, pe.Standalone);
            break;
        case "w":
            t = td(1);
            break;
        case "ww":
            t = td(2);
            break;
        case "W":
            t = td(1, !0);
            break;
        case "d":
            t = J(2, 1);
            break;
        case "dd":
            t = J(2, 2);
            break;
        case "c":
        case "cc":
            t = J(7, 1);
            break;
        case "ccc":
            t = $(1, V.Abbreviated, pe.Standalone);
            break;
        case "cccc":
            t = $(1, V.Wide, pe.Standalone);
            break;
        case "ccccc":
            t = $(1, V.Narrow, pe.Standalone);
            break;
        case "cccccc":
            t = $(1, V.Short, pe.Standalone);
            break;
        case "E":
        case "EE":
        case "EEE":
            t = $(1, V.Abbreviated);
            break;
        case "EEEE":
            t = $(1, V.Wide);
            break;
        case "EEEEE":
            t = $(1, V.Narrow);
            break;
        case "EEEEEE":
            t = $(1, V.Short);
            break;
        case "a":
        case "aa":
        case "aaa":
            t = $(0, V.Abbreviated);
            break;
        case "aaaa":
            t = $(0, V.Wide);
            break;
        case "aaaaa":
            t = $(0, V.Narrow);
            break;
        case "b":
        case "bb":
        case "bbb":
            t = $(0, V.Abbreviated, pe.Standalone, !0);
            break;
        case "bbbb":
            t = $(0, V.Wide, pe.Standalone, !0);
            break;
        case "bbbbb":
            t = $(0, V.Narrow, pe.Standalone, !0);
            break;
        case "B":
        case "BB":
        case "BBB":
            t = $(0, V.Abbreviated, pe.Format, !0);
            break;
        case "BBBB":
            t = $(0, V.Wide, pe.Format, !0);
            break;
        case "BBBBB":
            t = $(0, V.Narrow, pe.Format, !0);
            break;
        case "h":
            t = J(3, 1, -12);
            break;
        case "hh":
            t = J(3, 2, -12);
            break;
        case "H":
            t = J(3, 1);
            break;
        case "HH":
            t = J(3, 2);
            break;
        case "m":
            t = J(4, 1);
            break;
        case "mm":
            t = J(4, 2);
            break;
        case "s":
            t = J(5, 1);
            break;
        case "ss":
            t = J(5, 2);
            break;
        case "S":
            t = J(6, 1);
            break;
        case "SS":
            t = J(6, 2);
            break;
        case "SSS":
            t = J(6, 3);
            break;
        case "Z":
        case "ZZ":
        case "ZZZ":
            t = Ys(0);
            break;
        case "ZZZZZ":
            t = Ys(3);
            break;
        case "O":
        case "OO":
        case "OOO":
        case "z":
        case "zz":
        case "zzz":
            t = Ys(1);
            break;
        case "OOOO":
        case "ZZZZ":
        case "zzzz":
            t = Ys(2);
            break;
        default:
            return null
    }
    return nd[e] = t, t
}

function Hy(e, t) {
    e = e.replace(/:/g, "");
    let n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
    return isNaN(n) ? t : n
}

function Y_(e, t) {
    return e = new Date(e.getTime()), e.setMinutes(e.getMinutes() + t), e
}

function Q_(e, t, n) {
    let o = e.getTimezoneOffset(),
        i = Hy(t, o);
    return Y_(e, -1 * (i - o))
}

function K_(e) {
    if (wy(e)) return e;
    if (typeof e == "number" && !isNaN(e)) return new Date(e);
    if (typeof e == "string") {
        if (e = e.trim(), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e)) {
            let [o, i = 1, s = 1] = e.split("-").map(a => +a);
            return Js(o, i - 1, s)
        }
        let n = parseFloat(e);
        if (!isNaN(e - n)) return new Date(n);
        let r;
        if (r = e.match(H_)) return J_(r)
    }
    let t = new Date(e);
    if (!wy(t)) throw new D(2311, !1);
    return t
}

function J_(e) {
    let t = new Date(0),
        n = 0,
        r = 0,
        o = e[8] ? t.setUTCFullYear : t.setFullYear,
        i = e[8] ? t.setUTCHours : t.setHours;
    e[9] && (n = Number(e[9] + e[10]), r = Number(e[9] + e[11])), o.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
    let s = Number(e[4] || 0) - n,
        a = Number(e[5] || 0) - r,
        c = Number(e[6] || 0),
        u = Math.floor(parseFloat("0." + (e[7] || 0)) * 1e3);
    return i.call(t, s, a, c, u), t
}

function wy(e) {
    return e instanceof Date && !isNaN(e.valueOf())
}
var X_ = /^(\d+)?\.((\d+)(-(\d+))?)?$/,
    Cy = 22,
    Xs = ".",
    Mo = "0",
    eM = ";",
    tM = ",",
    rd = "#",
    by = "\xA4",
    nM = "%";

function ud(e, t, n, r, o, i, s = !1) {
    let a = "",
        c = !1;
    if (!isFinite(e)) a = Me(n, Y.Infinity);
    else {
        let u = oM(e);
        s && (u = rM(u));
        let l = t.minInt,
            d = t.minFrac,
            f = t.maxFrac;
        if (i) {
            let R = i.match(X_);
            if (R === null) throw new D(2306, !1);
            let De = R[1],
                U = R[3],
                he = R[5];
            De != null && (l = od(De)), U != null && (d = od(U)), he != null ? f = od(he) : U != null && d > f && (f = d)
        }
        iM(u, d, f);
        let p = u.digits,
            h = u.integerLen,
            y = u.exponent,
            m = [];
        for (c = p.every(R => !R); h < l; h++) p.unshift(0);
        for (; h < 0; h++) p.unshift(0);
        h > 0 ? m = p.splice(h, p.length) : (m = p, p = [0]);
        let g = [];
        for (p.length >= t.lgSize && g.unshift(p.splice(-t.lgSize, p.length).join("")); p.length > t.gSize;) g.unshift(p.splice(-t.gSize, p.length).join(""));
        p.length && g.unshift(p.join("")), a = g.join(Me(n, r)), m.length && (a += Me(n, o) + m.join("")), y && (a += Me(n, Y.Exponential) + "+" + y)
    }
    return e < 0 && !c ? a = t.negPre + a + t.negSuf : a = t.posPre + a + t.posSuf, a
}

function $y(e, t, n, r, o) {
    let i = na(t, So.Currency),
        s = ld(i, Me(t, Y.MinusSign));
    return s.minFrac = jy(r), s.maxFrac = s.minFrac, ud(e, s, t, Y.CurrencyGroup, Y.CurrencyDecimal, o).replace(by, n).replace(by, "").trim()
}

function Uy(e, t, n) {
    let r = na(t, So.Percent),
        o = ld(r, Me(t, Y.MinusSign));
    return ud(e, o, t, Y.Group, Y.Decimal, n, !0).replace(new RegExp(nM, "g"), Me(t, Y.PercentSign))
}

function zy(e, t, n) {
    let r = na(t, So.Decimal),
        o = ld(r, Me(t, Y.MinusSign));
    return ud(e, o, t, Y.Group, Y.Decimal, n)
}

function ld(e, t = "-") {
    let n = {
            minInt: 1,
            minFrac: 0,
            maxFrac: 0,
            posPre: "",
            posSuf: "",
            negPre: "",
            negSuf: "",
            gSize: 0,
            lgSize: 0
        },
        r = e.split(eM),
        o = r[0],
        i = r[1],
        s = o.indexOf(Xs) !== -1 ? o.split(Xs) : [o.substring(0, o.lastIndexOf(Mo) + 1), o.substring(o.lastIndexOf(Mo) + 1)],
        a = s[0],
        c = s[1] || "";
    n.posPre = a.substring(0, a.indexOf(rd));
    for (let l = 0; l < c.length; l++) {
        let d = c.charAt(l);
        d === Mo ? n.minFrac = n.maxFrac = l + 1 : d === rd ? n.maxFrac = l + 1 : n.posSuf += d
    }
    let u = a.split(tM);
    if (n.gSize = u[1] ? u[1].length : 0, n.lgSize = u[2] || u[1] ? (u[2] || u[1]).length : 0, i) {
        let l = o.length - n.posPre.length - n.posSuf.length,
            d = i.indexOf(rd);
        n.negPre = i.substring(0, d).replace(/'/g, ""), n.negSuf = i.slice(d + l).replace(/'/g, "")
    } else n.negPre = t + n.posPre, n.negSuf = n.posSuf;
    return n
}

function rM(e) {
    if (e.digits[0] === 0) return e;
    let t = e.digits.length - e.integerLen;
    return e.exponent ? e.exponent += 2 : (t === 0 ? e.digits.push(0, 0) : t === 1 && e.digits.push(0), e.integerLen += 2), e
}

function oM(e) {
    let t = Math.abs(e) + "",
        n = 0,
        r, o, i, s, a;
    for ((o = t.indexOf(Xs)) > -1 && (t = t.replace(Xs, "")), (i = t.search(/e/i)) > 0 ? (o < 0 && (o = i), o += +t.slice(i + 1), t = t.substring(0, i)) : o < 0 && (o = t.length), i = 0; t.charAt(i) === Mo; i++);
    if (i === (a = t.length)) r = [0], o = 1;
    else {
        for (a--; t.charAt(a) === Mo;) a--;
        for (o -= i, r = [], s = 0; i <= a; i++, s++) r[s] = Number(t.charAt(i))
    }
    return o > Cy && (r = r.splice(0, Cy - 1), n = o - 1, o = 1), {
        digits: r,
        exponent: n,
        integerLen: o
    }
}

function iM(e, t, n) {
    if (t > n) throw new D(2307, !1);
    let r = e.digits,
        o = r.length - e.integerLen,
        i = Math.min(Math.max(t, o), n),
        s = i + e.integerLen,
        a = r[s];
    if (s > 0) {
        r.splice(Math.max(e.integerLen, s));
        for (let d = s; d < r.length; d++) r[d] = 0
    } else {
        o = Math.max(0, o), e.integerLen = 1, r.length = Math.max(1, s = i + 1), r[0] = 0;
        for (let d = 1; d < s; d++) r[d] = 0
    }
    if (a >= 5)
        if (s - 1 < 0) {
            for (let d = 0; d > s; d--) r.unshift(0), e.integerLen++;
            r.unshift(1), e.integerLen++
        } else r[s - 1]++;
    for (; o < Math.max(0, i); o++) r.push(0);
    let c = i !== 0,
        u = t + e.integerLen,
        l = r.reduceRight(function(d, f, p, h) {
            return f = f + d, h[p] = f < 10 ? f : f - 10, c && (h[p] === 0 && p >= u ? h.pop() : c = !1), f >= 10 ? 1 : 0
        }, 0);
    l && (r.unshift(l), e.integerLen++)
}

function od(e) {
    let t = parseInt(e);
    if (isNaN(t)) throw new D(2305, !1);
    return t
}
var id = /\s+/,
    Ty = [],
    sM = (() => {
        class e {
            _ngEl;
            _renderer;
            initialClasses = Ty;
            rawClass;
            stateMap = new Map;
            constructor(n, r) {
                this._ngEl = n, this._renderer = r
            }
            set klass(n) {
                this.initialClasses = n != null ? n.trim().split(id) : Ty
            }
            set ngClass(n) {
                this.rawClass = typeof n == "string" ? n.trim().split(id) : n
            }
            ngDoCheck() {
                for (let r of this.initialClasses) this._updateState(r, !0);
                let n = this.rawClass;
                if (Array.isArray(n) || n instanceof Set)
                    for (let r of n) this._updateState(r, !0);
                else if (n != null)
                    for (let r of Object.keys(n)) this._updateState(r, !!n[r]);
                this._applyStateDiff()
            }
            _updateState(n, r) {
                let o = this.stateMap.get(n);
                o !== void 0 ? (o.enabled !== r && (o.changed = !0, o.enabled = r), o.touched = !0) : this.stateMap.set(n, {
                    enabled: r,
                    changed: !0,
                    touched: !0
                })
            }
            _applyStateDiff() {
                for (let n of this.stateMap) {
                    let r = n[0],
                        o = n[1];
                    o.changed ? (this._toggleClass(r, o.enabled), o.changed = !1) : o.touched || (o.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)), o.touched = !1
                }
            }
            _toggleClass(n, r) {
                n = n.trim(), n.length > 0 && n.split(id).forEach(o => {
                    r ? this._renderer.addClass(this._ngEl.nativeElement, o) : this._renderer.removeClass(this._ngEl.nativeElement, o)
                })
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(Ct), j(mo))
            };
            static\ u0275dir = Mt({
                type: e,
                selectors: [
                    ["", "ngClass", ""]
                ],
                inputs: {
                    klass: [0, "class", "klass"],
                    ngClass: "ngClass"
                }
            })
        }
        return e
    })();
var ea = class {
        $implicit;
        ngForOf;
        index;
        count;
        constructor(t, n, r, o) {
            this.$implicit = t, this.ngForOf = n, this.index = r, this.count = o
        }
        get first() {
            return this.index === 0
        }
        get last() {
            return this.index === this.count - 1
        }
        get even() {
            return this.index % 2 === 0
        }
        get odd() {
            return !this.even
        }
    },
    Gy = (() => {
        class e {
            _viewContainer;
            _template;
            _differs;
            set ngForOf(n) {
                this._ngForOf = n, this._ngForOfDirty = !0
            }
            set ngForTrackBy(n) {
                this._trackByFn = n
            }
            get ngForTrackBy() {
                return this._trackByFn
            }
            _ngForOf = null;
            _ngForOfDirty = !0;
            _differ = null;
            _trackByFn;
            constructor(n, r, o) {
                this._viewContainer = n, this._template = r, this._differs = o
            }
            set ngForTemplate(n) {
                n && (this._template = n)
            }
            ngDoCheck() {
                if (this._ngForOfDirty) {
                    this._ngForOfDirty = !1;
                    let n = this._ngForOf;
                    !this._differ && n && (this._differ = this._differs.find(n).create(this.ngForTrackBy))
                }
                if (this._differ) {
                    let n = this._differ.diff(this._ngForOf);
                    n && this._applyChanges(n)
                }
            }
            _applyChanges(n) {
                let r = this._viewContainer;
                n.forEachOperation((o, i, s) => {
                    if (o.previousIndex == null) r.createEmbeddedView(this._template, new ea(o.item, this._ngForOf, -1, -1), s === null ? void 0 : s);
                    else if (s == null) r.remove(i === null ? void 0 : i);
                    else if (i !== null) {
                        let a = r.get(i);
                        r.move(a, s), _y(a, o)
                    }
                });
                for (let o = 0, i = r.length; o < i; o++) {
                    let a = r.get(o).context;
                    a.index = o, a.count = i, a.ngForOf = this._ngForOf
                }
                n.forEachIdentityChange(o => {
                    let i = r.get(o.currentIndex);
                    _y(i, o)
                })
            }
            static ngTemplateContextGuard(n, r) {
                return !0
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(_t), j(wt), j(Ql))
            };
            static\ u0275dir = Mt({
                type: e,
                selectors: [
                    ["", "ngFor", "", "ngForOf", ""]
                ],
                inputs: {
                    ngForOf: "ngForOf",
                    ngForTrackBy: "ngForTrackBy",
                    ngForTemplate: "ngForTemplate"
                }
            })
        }
        return e
    })();

function _y(e, t) {
    e.context.$implicit = t.item
}
var aM = (() => {
        class e {
            _viewContainer;
            _context = new ta;
            _thenTemplateRef = null;
            _elseTemplateRef = null;
            _thenViewRef = null;
            _elseViewRef = null;
            constructor(n, r) {
                this._viewContainer = n, this._thenTemplateRef = r
            }
            set ngIf(n) {
                this._context.$implicit = this._context.ngIf = n, this._updateView()
            }
            set ngIfThen(n) {
                My(n, !1), this._thenTemplateRef = n, this._thenViewRef = null, this._updateView()
            }
            set ngIfElse(n) {
                My(n, !1), this._elseTemplateRef = n, this._elseViewRef = null, this._updateView()
            }
            _updateView() {
                this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
            }
            static ngIfUseIfTypeGuard;
            static ngTemplateGuard_ngIf;
            static ngTemplateContextGuard(n, r) {
                return !0
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(_t), j(wt))
            };
            static\ u0275dir = Mt({
                type: e,
                selectors: [
                    ["", "ngIf", ""]
                ],
                inputs: {
                    ngIf: "ngIf",
                    ngIfThen: "ngIfThen",
                    ngIfElse: "ngIfElse"
                }
            })
        }
        return e
    })(),
    ta = class {
        $implicit = null;
        ngIf = null
    };

function My(e, t) {
    if (e && !e.createEmbeddedView) throw new D(2020, !1)
}
var sd = class {
        _viewContainerRef;
        _templateRef;
        _created = !1;
        constructor(t, n) {
            this._viewContainerRef = t, this._templateRef = n
        }
        create() {
            this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef)
        }
        destroy() {
            this._created = !1, this._viewContainerRef.clear()
        }
        enforceState(t) {
            t && !this._created ? this.create() : !t && this._created && this.destroy()
        }
    },
    Wy = (() => {
        class e {
            _defaultViews = [];
            _defaultUsed = !1;
            _caseCount = 0;
            _lastCaseCheckIndex = 0;
            _lastCasesMatched = !1;
            _ngSwitch;
            set ngSwitch(n) {
                this._ngSwitch = n, this._caseCount === 0 && this._updateDefaultCases(!0)
            }
            _addCase() {
                return this._caseCount++
            }
            _addDefault(n) {
                this._defaultViews.push(n)
            }
            _matchCase(n) {
                let r = n === this._ngSwitch;
                return this._lastCasesMatched || = r, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), r
            }
            _updateDefaultCases(n) {
                if (this._defaultViews.length > 0 && n !== this._defaultUsed) {
                    this._defaultUsed = n;
                    for (let r of this._defaultViews) r.enforceState(n)
                }
            }
            static\ u0275fac = function(r) {
                return new(r || e)
            };
            static\ u0275dir = Mt({
                type: e,
                selectors: [
                    ["", "ngSwitch", ""]
                ],
                inputs: {
                    ngSwitch: "ngSwitch"
                }
            })
        }
        return e
    })(),
    cM = (() => {
        class e {
            ngSwitch;
            _view;
            ngSwitchCase;
            constructor(n, r, o) {
                this.ngSwitch = o, o._addCase(), this._view = new sd(n, r)
            }
            ngDoCheck() {
                this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase))
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(_t), j(wt), j(Wy, 9))
            };
            static\ u0275dir = Mt({
                type: e,
                selectors: [
                    ["", "ngSwitchCase", ""]
                ],
                inputs: {
                    ngSwitchCase: "ngSwitchCase"
                }
            })
        }
        return e
    })();
var uM = (() => {
        class e {
            _ngEl;
            _differs;
            _renderer;
            _ngStyle = null;
            _differ = null;
            constructor(n, r, o) {
                this._ngEl = n, this._differs = r, this._renderer = o
            }
            set ngStyle(n) {
                this._ngStyle = n, !this._differ && n && (this._differ = this._differs.find(n).create())
            }
            ngDoCheck() {
                if (this._differ) {
                    let n = this._differ.diff(this._ngStyle);
                    n && this._applyChanges(n)
                }
            }
            _setStyle(n, r) {
                let [o, i] = n.split("."), s = o.indexOf("-") === -1 ? void 0 : dr.DashCase;
                r != null ? this._renderer.setStyle(this._ngEl.nativeElement, o, i ? `${r}${i}` : r, s) : this._renderer.removeStyle(this._ngEl.nativeElement, o, s)
            }
            _applyChanges(n) {
                n.forEachRemovedItem(r => this._setStyle(r.key, null)), n.forEachAddedItem(r => this._setStyle(r.key, r.currentValue)), n.forEachChangedItem(r => this._setStyle(r.key, r.currentValue))
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(Ct), j(Kl), j(mo))
            };
            static\ u0275dir = Mt({
                type: e,
                selectors: [
                    ["", "ngStyle", ""]
                ],
                inputs: {
                    ngStyle: "ngStyle"
                }
            })
        }
        return e
    })(),
    lM = (() => {
        class e {
            _viewContainerRef;
            _viewRef = null;
            ngTemplateOutletContext = null;
            ngTemplateOutlet = null;
            ngTemplateOutletInjector = null;
            constructor(n) {
                this._viewContainerRef = n
            }
            ngOnChanges(n) {
                if (this._shouldRecreateView(n)) {
                    let r = this._viewContainerRef;
                    if (this._viewRef && r.remove(r.indexOf(this._viewRef)), !this.ngTemplateOutlet) {
                        this._viewRef = null;
                        return
                    }
                    let o = this._createContextForwardProxy();
                    this._viewRef = r.createEmbeddedView(this.ngTemplateOutlet, o, {
                        injector: this.ngTemplateOutletInjector ? ? void 0
                    })
                }
            }
            _shouldRecreateView(n) {
                return !!n.ngTemplateOutlet || !!n.ngTemplateOutletInjector
            }
            _createContextForwardProxy() {
                return new Proxy({}, {
                    set: (n, r, o) => this.ngTemplateOutletContext ? Reflect.set(this.ngTemplateOutletContext, r, o) : !1,
                    get: (n, r, o) => {
                        if (this.ngTemplateOutletContext) return Reflect.get(this.ngTemplateOutletContext, r, o)
                    }
                })
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(_t))
            };
            static\ u0275dir = Mt({
                type: e,
                selectors: [
                    ["", "ngTemplateOutlet", ""]
                ],
                inputs: {
                    ngTemplateOutletContext: "ngTemplateOutletContext",
                    ngTemplateOutlet: "ngTemplateOutlet",
                    ngTemplateOutletInjector: "ngTemplateOutletInjector"
                },
                features: [zu]
            })
        }
        return e
    })();

function Gt(e, t) {
    return new D(2100, !1)
}
var ad = class {
        createSubscription(t, n, r) {
            return Sn(() => t.subscribe({
                next: n,
                error: r
            }))
        }
        dispose(t) {
            Sn(() => t.unsubscribe())
        }
    },
    cd = class {
        createSubscription(t, n, r) {
            return t.then(o => n ? .(o), o => r ? .(o)), {
                unsubscribe: () => {
                    n = null, r = null
                }
            }
        }
        dispose(t) {
            t.unsubscribe()
        }
    },
    dM = new cd,
    fM = new ad,
    pM = (() => {
        class e {
            _ref;
            _latestValue = null;
            markForCheckOnValueUpdate = !0;
            _subscription = null;
            _obj = null;
            _strategy = null;
            applicationErrorHandler = v(We);
            constructor(n) {
                this._ref = n
            }
            ngOnDestroy() {
                this._subscription && this._dispose(), this._ref = null
            }
            transform(n) {
                if (!this._obj) {
                    if (n) try {
                        this.markForCheckOnValueUpdate = !1, this._subscribe(n)
                    } finally {
                        this.markForCheckOnValueUpdate = !0
                    }
                    return this._latestValue
                }
                return n !== this._obj ? (this._dispose(), this.transform(n)) : this._latestValue
            }
            _subscribe(n) {
                this._obj = n, this._strategy = this._selectStrategy(n), this._subscription = this._strategy.createSubscription(n, r => this._updateLatestValue(n, r), r => this.applicationErrorHandler(r))
            }
            _selectStrategy(n) {
                if (Do(n)) return dM;
                if (js(n)) return fM;
                throw Gt(e, n)
            }
            _dispose() {
                this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null
            }
            _updateLatestValue(n, r) {
                n === this._obj && (this._latestValue = r, this.markForCheckOnValueUpdate && this._ref ? .markForCheck())
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(Yl, 16))
            };
            static\ u0275pipe = ct({
                name: "async",
                type: e,
                pure: !1
            })
        }
        return e
    })();
var hM = /(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])\S*/g,
    gM = (() => {
        class e {
            transform(n) {
                if (n == null) return null;
                if (typeof n != "string") throw Gt(e, n);
                return n.replace(hM, r => r[0].toUpperCase() + r.slice(1).toLowerCase())
            }
            static\ u0275fac = function(r) {
                return new(r || e)
            };
            static\ u0275pipe = ct({
                name: "titlecase",
                type: e,
                pure: !0
            })
        }
        return e
    })(),
    mM = (() => {
        class e {
            transform(n) {
                if (n == null) return null;
                if (typeof n != "string") throw Gt(e, n);
                return n.toUpperCase()
            }
            static\ u0275fac = function(r) {
                return new(r || e)
            };
            static\ u0275pipe = ct({
                name: "uppercase",
                type: e,
                pure: !0
            })
        }
        return e
    })(),
    yM = "mediumDate",
    qy = new T(""),
    Zy = new T(""),
    vM = (() => {
        class e {
            locale;
            defaultTimezone;
            defaultOptions;
            constructor(n, r, o) {
                this.locale = n, this.defaultTimezone = r, this.defaultOptions = o
            }
            transform(n, r, o, i) {
                if (n == null || n === "" || n !== n) return null;
                try {
                    let s = r ? ? this.defaultOptions ? .dateFormat ? ? yM,
                        a = o ? ? this.defaultOptions ? .timezone ? ? this.defaultTimezone ? ? void 0;
                    return Vy(n, s, i || this.locale, a)
                } catch (s) {
                    throw Gt(e, s.message)
                }
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(zt, 16), j(qy, 24), j(Zy, 24))
            };
            static\ u0275pipe = ct({
                name: "date",
                type: e,
                pure: !0
            })
        }
        return e
    })();
var DM = (() => {
        class e {
            _locale;
            constructor(n) {
                this._locale = n
            }
            transform(n, r, o) {
                if (!dd(n)) return null;
                o || = this._locale;
                try {
                    let i = fd(n);
                    return zy(i, o, r)
                } catch (i) {
                    throw Gt(e, i.message)
                }
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(zt, 16))
            };
            static\ u0275pipe = ct({
                name: "number",
                type: e,
                pure: !0
            })
        }
        return e
    })(),
    EM = (() => {
        class e {
            _locale;
            constructor(n) {
                this._locale = n
            }
            transform(n, r, o) {
                if (!dd(n)) return null;
                o || = this._locale;
                try {
                    let i = fd(n);
                    return Uy(i, o, r)
                } catch (i) {
                    throw Gt(e, i.message)
                }
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(zt, 16))
            };
            static\ u0275pipe = ct({
                name: "percent",
                type: e,
                pure: !0
            })
        }
        return e
    })(),
    IM = (() => {
        class e {
            _locale;
            _defaultCurrencyCode;
            constructor(n, r = "USD") {
                this._locale = n, this._defaultCurrencyCode = r
            }
            transform(n, r = this._defaultCurrencyCode, o = "symbol", i, s) {
                if (!dd(n)) return null;
                s || = this._locale, typeof o == "boolean" && (o = o ? "symbol" : "code");
                let a = r || this._defaultCurrencyCode;
                o !== "code" && (o === "symbol" || o === "symbol-narrow" ? a = Ly(a, o === "symbol" ? "wide" : "narrow", s) : a = o);
                try {
                    let c = fd(n);
                    return $y(c, s, a, r, i)
                } catch (c) {
                    throw Gt(e, c.message)
                }
            }
            static\ u0275fac = function(r) {
                return new(r || e)(j(zt, 16), j(Pl, 16))
            };
            static\ u0275pipe = ct({
                name: "currency",
                type: e,
                pure: !0
            })
        }
        return e
    })();

function dd(e) {
    return !(e == null || e === "" || e !== e)
}

function fd(e) {
    if (typeof e == "string" && !isNaN(Number(e) - parseFloat(e))) return Number(e);
    if (typeof e != "number") throw new D(2309, !1);
    return e
}
var wM = (() => {
    class e {
        transform(n, r, o) {
            if (n == null) return null;
            if (!(typeof n == "string" || Array.isArray(n))) throw Gt(e, n);
            return n.slice(r, o)
        }
        static\ u0275fac = function(r) {
            return new(r || e)
        };
        static\ u0275pipe = ct({
            name: "slice",
            type: e,
            pure: !1
        })
    }
    return e
})();
var CM = (() => {
    class e {
        static\ u0275fac = function(r) {
            return new(r || e)
        };
        static\ u0275mod = vo({
            type: e
        });
        static\ u0275inj = Gn({})
    }
    return e
})();

function pd(e, t) {
    t = encodeURIComponent(t);
    for (let n of e.split(";")) {
        let r = n.indexOf("="),
            [o, i] = r == -1 ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
        if (o.trim() === t) return decodeURIComponent(i)
    }
    return null
}
var No = class {};
var bM = "browser";

function L$(e) {
    return e === bM
}
var j$ = (() => {
        class e {
            static\ u0275prov = A({
                token: e,
                providedIn: "root",
                factory: () => new hd(v(vt), window)
            })
        }
        return e
    })(),
    hd = class {
        document;
        window;
        offset = () => [0, 0];
        constructor(t, n) {
            this.document = t, this.window = n
        }
        setOffset(t) {
            Array.isArray(t) ? this.offset = () => t : this.offset = t
        }
        getScrollPosition() {
            return [this.window.scrollX, this.window.scrollY]
        }
        scrollToPosition(t, n) {
            this.window.scrollTo(G(H({}, n), {
                left: t[0],
                top: t[1]
            }))
        }
        scrollToAnchor(t, n) {
            let r = TM(this.document, t);
            r && (this.scrollToElement(r, n), r.focus())
        }
        setHistoryScrollRestoration(t) {
            try {
                this.window.history.scrollRestoration = t
            } catch {
                console.warn(ht(2400, !1))
            }
        }
        scrollToElement(t, n) {
            let r = t.getBoundingClientRect(),
                o = r.left + this.window.pageXOffset,
                i = r.top + this.window.pageYOffset,
                s = this.offset();
            this.window.scrollTo(G(H({}, n), {
                left: o - s[0],
                top: i - s[1]
            }))
        }
    };

function TM(e, t) {
    let n = e.getElementById(t) || e.getElementsByName(t)[0];
    if (n) return n;
    if (typeof e.createTreeWalker == "function" && e.body && typeof e.body.attachShadow == "function") {
        let r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT),
            o = r.currentNode;
        for (; o;) {
            let i = o.shadowRoot;
            if (i) {
                let s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                if (s) return s
            }
            o = r.nextNode()
        }
    }
    return null
}
var Er = class {},
    xo = class {},
    Wt = class e {
        headers;
        normalizedNames = new Map;
        lazyInit;
        lazyUpdate = null;
        constructor(t) {
            t ? typeof t == "string" ? this.lazyInit = () => {
                this.headers = new Map, t.split(`
`).forEach(n => {
                    let r = n.indexOf(":");
                    if (r > 0) {
                        let o = n.slice(0, r),
                            i = n.slice(r + 1).trim();
                        this.addHeaderEntry(o, i)
                    }
                })
            } : typeof Headers < "u" && t instanceof Headers ? (this.headers = new Map, t.forEach((n, r) => {
                this.addHeaderEntry(r, n)
            })) : this.lazyInit = () => {
                this.headers = new Map, Object.entries(t).forEach(([n, r]) => {
                    this.setHeaderEntries(n, r)
                })
            } : this.headers = new Map
        }
        has(t) {
            return this.init(), this.headers.has(t.toLowerCase())
        }
        get(t) {
            this.init();
            let n = this.headers.get(t.toLowerCase());
            return n && n.length > 0 ? n[0] : null
        }
        keys() {
            return this.init(), Array.from(this.normalizedNames.values())
        }
        getAll(t) {
            return this.init(), this.headers.get(t.toLowerCase()) || null
        }
        append(t, n) {
            return this.clone({
                name: t,
                value: n,
                op: "a"
            })
        }
        set(t, n) {
            return this.clone({
                name: t,
                value: n,
                op: "s"
            })
        }
        delete(t, n) {
            return this.clone({
                name: t,
                value: n,
                op: "d"
            })
        }
        maybeSetNormalizedName(t, n) {
            this.normalizedNames.has(n) || this.normalizedNames.set(n, t)
        }
        init() {
            this.lazyInit && (this.lazyInit instanceof e ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(t => this.applyUpdate(t)), this.lazyUpdate = null))
        }
        copyFrom(t) {
            t.init(), Array.from(t.headers.keys()).forEach(n => {
                this.headers.set(n, t.headers.get(n)), this.normalizedNames.set(n, t.normalizedNames.get(n))
            })
        }
        clone(t) {
            let n = new e;
            return n.lazyInit = this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this, n.lazyUpdate = (this.lazyUpdate || []).concat([t]), n
        }
        applyUpdate(t) {
            let n = t.name.toLowerCase();
            switch (t.op) {
                case "a":
                case "s":
                    let r = t.value;
                    if (typeof r == "string" && (r = [r]), r.length === 0) return;
                    this.maybeSetNormalizedName(t.name, n);
                    let o = (t.op === "a" ? this.headers.get(n) : void 0) || [];
                    o.push(...r), this.headers.set(n, o);
                    break;
                case "d":
                    let i = t.value;
                    if (!i) this.headers.delete(n), this.normalizedNames.delete(n);
                    else {
                        let s = this.headers.get(n);
                        if (!s) return;
                        s = s.filter(a => i.indexOf(a) === -1), s.length === 0 ? (this.headers.delete(n), this.normalizedNames.delete(n)) : this.headers.set(n, s)
                    }
                    break
            }
        }
        addHeaderEntry(t, n) {
            let r = t.toLowerCase();
            this.maybeSetNormalizedName(t, r), this.headers.has(r) ? this.headers.get(r).push(n) : this.headers.set(r, [n])
        }
        setHeaderEntries(t, n) {
            let r = (Array.isArray(n) ? n : [n]).map(i => i.toString()),
                o = t.toLowerCase();
            this.headers.set(o, r), this.maybeSetNormalizedName(t, o)
        }
        forEach(t) {
            this.init(), Array.from(this.normalizedNames.keys()).forEach(n => t(this.normalizedNames.get(n), this.headers.get(n)))
        }
    };
var oa = class {
    encodeKey(t) {
        return Yy(t)
    }
    encodeValue(t) {
        return Yy(t)
    }
    decodeKey(t) {
        return decodeURIComponent(t)
    }
    decodeValue(t) {
        return decodeURIComponent(t)
    }
};

function _M(e, t) {
    let n = new Map;
    return e.length > 0 && e.replace(/^\?/, "").split("&").forEach(o => {
        let i = o.indexOf("="),
            [s, a] = i == -1 ? [t.decodeKey(o), ""] : [t.decodeKey(o.slice(0, i)), t.decodeValue(o.slice(i + 1))],
            c = n.get(s) || [];
        c.push(a), n.set(s, c)
    }), n
}
var MM = /%(\d[a-f0-9])/gi,
    SM = {
        40: "@",
        "3A": ":",
        24: "$",
        "2C": ",",
        "3B": ";",
        "3D": "=",
        "3F": "?",
        "2F": "/"
    };

function Yy(e) {
    return encodeURIComponent(e).replace(MM, (t, n) => SM[n] ? ? t)
}

function ra(e) {
    return `${e}`
}
var Nt = class e {
    map;
    encoder;
    updates = null;
    cloneFrom = null;
    constructor(t = {}) {
        if (this.encoder = t.encoder || new oa, t.fromString) {
            if (t.fromObject) throw new D(2805, !1);
            this.map = _M(t.fromString, this.encoder)
        } else t.fromObject ? (this.map = new Map, Object.keys(t.fromObject).forEach(n => {
            let r = t.fromObject[n],
                o = Array.isArray(r) ? r.map(ra) : [ra(r)];
            this.map.set(n, o)
        })) : this.map = null
    }
    has(t) {
        return this.init(), this.map.has(t)
    }
    get(t) {
        this.init();
        let n = this.map.get(t);
        return n ? n[0] : null
    }
    getAll(t) {
        return this.init(), this.map.get(t) || null
    }
    keys() {
        return this.init(), Array.from(this.map.keys())
    }
    append(t, n) {
        return this.clone({
            param: t,
            value: n,
            op: "a"
        })
    }
    appendAll(t) {
        let n = [];
        return Object.keys(t).forEach(r => {
            let o = t[r];
            Array.isArray(o) ? o.forEach(i => {
                n.push({
                    param: r,
                    value: i,
                    op: "a"
                })
            }) : n.push({
                param: r,
                value: o,
                op: "a"
            })
        }), this.clone(n)
    }
    set(t, n) {
        return this.clone({
            param: t,
            value: n,
            op: "s"
        })
    }
    delete(t, n) {
        return this.clone({
            param: t,
            value: n,
            op: "d"
        })
    }
    toString() {
        return this.init(), this.keys().map(t => {
            let n = this.encoder.encodeKey(t);
            return this.map.get(t).map(r => n + "=" + this.encoder.encodeValue(r)).join("&")
        }).filter(t => t !== "").join("&")
    }
    clone(t) {
        let n = new e({
            encoder: this.encoder
        });
        return n.cloneFrom = this.cloneFrom || this, n.updates = (this.updates || []).concat(t), n
    }
    init() {
        this.map === null && (this.map = new Map), this.cloneFrom !== null && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(t => this.map.set(t, this.cloneFrom.map.get(t))), this.updates.forEach(t => {
            switch (t.op) {
                case "a":
                case "s":
                    let n = (t.op === "a" ? this.map.get(t.param) : void 0) || [];
                    n.push(ra(t.value)), this.map.set(t.param, n);
                    break;
                case "d":
                    if (t.value !== void 0) {
                        let r = this.map.get(t.param) || [],
                            o = r.indexOf(ra(t.value));
                        o !== -1 && r.splice(o, 1), r.length > 0 ? this.map.set(t.param, r) : this.map.delete(t.param)
                    } else {
                        this.map.delete(t.param);
                        break
                    }
            }
        }), this.cloneFrom = this.updates = null)
    }
};
var ia = class {
    map = new Map;
    set(t, n) {
        return this.map.set(t, n), this
    }
    get(t) {
        return this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t)
    }
    delete(t) {
        return this.map.delete(t), this
    }
    has(t) {
        return this.map.has(t)
    }
    keys() {
        return this.map.keys()
    }
};

function NM(e) {
    switch (e) {
        case "DELETE":
        case "GET":
        case "HEAD":
        case "OPTIONS":
        case "JSONP":
            return !1;
        default:
            return !0
    }
}

function Qy(e) {
    return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer
}

function Ky(e) {
    return typeof Blob < "u" && e instanceof Blob
}

function Jy(e) {
    return typeof FormData < "u" && e instanceof FormData
}

function xM(e) {
    return typeof URLSearchParams < "u" && e instanceof URLSearchParams
}
var Xy = "Content-Type",
    ev = "Accept",
    nv = "X-Request-URL",
    rv = "text/plain",
    ov = "application/json",
    AM = `${ov}, ${rv}, */*`,
    vr = class e {
        url;
        body = null;
        headers;
        context;
        reportProgress = !1;
        withCredentials = !1;
        credentials;
        keepalive = !1;
        cache;
        priority;
        mode;
        redirect;
        referrer;
        integrity;
        responseType = "json";
        method;
        params;
        urlWithParams;
        transferCache;
        timeout;
        constructor(t, n, r, o) {
            this.url = n, this.method = t.toUpperCase();
            let i;
            if (NM(this.method) || o ? (this.body = r !== void 0 ? r : null, i = o) : i = r, i) {
                if (this.reportProgress = !!i.reportProgress, this.withCredentials = !!i.withCredentials, this.keepalive = !!i.keepalive, i.responseType && (this.responseType = i.responseType), i.headers && (this.headers = i.headers), i.context && (this.context = i.context), i.params && (this.params = i.params), i.priority && (this.priority = i.priority), i.cache && (this.cache = i.cache), i.credentials && (this.credentials = i.credentials), typeof i.timeout == "number") {
                    if (i.timeout < 1 || !Number.isInteger(i.timeout)) throw new D(2822, "");
                    this.timeout = i.timeout
                }
                i.mode && (this.mode = i.mode), i.redirect && (this.redirect = i.redirect), i.integrity && (this.integrity = i.integrity), i.referrer && (this.referrer = i.referrer), this.transferCache = i.transferCache
            }
            if (this.headers ? ? = new Wt, this.context ? ? = new ia, !this.params) this.params = new Nt, this.urlWithParams = n;
            else {
                let s = this.params.toString();
                if (s.length === 0) this.urlWithParams = n;
                else {
                    let a = n.indexOf("?"),
                        c = a === -1 ? "?" : a < n.length - 1 ? "&" : "";
                    this.urlWithParams = n + c + s
                }
            }
        }
        serializeBody() {
            return this.body === null ? null : typeof this.body == "string" || Qy(this.body) || Ky(this.body) || Jy(this.body) || xM(this.body) ? this.body : this.body instanceof Nt ? this.body.toString() : typeof this.body == "object" || typeof this.body == "boolean" || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
        }
        detectContentTypeHeader() {
            return this.body === null || Jy(this.body) ? null : Ky(this.body) ? this.body.type || null : Qy(this.body) ? null : typeof this.body == "string" ? rv : this.body instanceof Nt ? "application/x-www-form-urlencoded;charset=UTF-8" : typeof this.body == "object" || typeof this.body == "number" || typeof this.body == "boolean" ? ov : null
        }
        clone(t = {}) {
            let n = t.method || this.method,
                r = t.url || this.url,
                o = t.responseType || this.responseType,
                i = t.keepalive ? ? this.keepalive,
                s = t.priority || this.priority,
                a = t.cache || this.cache,
                c = t.mode || this.mode,
                u = t.redirect || this.redirect,
                l = t.credentials || this.credentials,
                d = t.referrer || this.referrer,
                f = t.integrity || this.integrity,
                p = t.transferCache ? ? this.transferCache,
                h = t.timeout ? ? this.timeout,
                y = t.body !== void 0 ? t.body : this.body,
                m = t.withCredentials ? ? this.withCredentials,
                g = t.reportProgress ? ? this.reportProgress,
                R = t.headers || this.headers,
                De = t.params || this.params,
                U = t.context ? ? this.context;
            return t.setHeaders !== void 0 && (R = Object.keys(t.setHeaders).reduce((he, Pe) => he.set(Pe, t.setHeaders[Pe]), R)), t.setParams && (De = Object.keys(t.setParams).reduce((he, Pe) => he.set(Pe, t.setParams[Pe]), De)), new e(n, r, y, {
                params: De,
                headers: R,
                context: U,
                reportProgress: g,
                responseType: o,
                withCredentials: m,
                transferCache: p,
                keepalive: i,
                cache: a,
                priority: s,
                timeout: h,
                mode: c,
                redirect: u,
                credentials: l,
                referrer: d,
                integrity: f
            })
        }
    },
    Nn = (function(e) {
        return e[e.Sent = 0] = "Sent", e[e.UploadProgress = 1] = "UploadProgress", e[e.ResponseHeader = 2] = "ResponseHeader", e[e.DownloadProgress = 3] = "DownloadProgress", e[e.Response = 4] = "Response", e[e.User = 5] = "User", e
    })(Nn || {}),
    Ir = class {
        headers;
        status;
        statusText;
        url;
        ok;
        type;
        redirected;
        constructor(t, n = 200, r = "OK") {
            this.headers = t.headers || new Wt, this.status = t.status !== void 0 ? t.status : n, this.statusText = t.statusText || r, this.url = t.url || null, this.redirected = t.redirected, this.ok = this.status >= 200 && this.status < 300
        }
    },
    sa = class e extends Ir {
        constructor(t = {}) {
            super(t)
        }
        type = Nn.ResponseHeader;
        clone(t = {}) {
            return new e({
                headers: t.headers || this.headers,
                status: t.status !== void 0 ? t.status : this.status,
                statusText: t.statusText || this.statusText,
                url: t.url || this.url || void 0
            })
        }
    },
    Ao = class e extends Ir {
        body;
        constructor(t = {}) {
            super(t), this.body = t.body !== void 0 ? t.body : null
        }
        type = Nn.Response;
        clone(t = {}) {
            return new e({
                body: t.body !== void 0 ? t.body : this.body,
                headers: t.headers || this.headers,
                status: t.status !== void 0 ? t.status : this.status,
                statusText: t.statusText || this.statusText,
                url: t.url || this.url || void 0,
                redirected: t.redirected ? ? this.redirected
            })
        }
    },
    Dr = class extends Ir {
        name = "HttpErrorResponse";
        message;
        error;
        ok = !1;
        constructor(t) {
            super(t, 0, "Unknown Error"), this.status >= 200 && this.status < 300 ? this.message = `Http failure during parsing for ${t.url||"(unknown url)"}` : this.message = `Http failure response for ${t.url||"(unknown url)"}: ${t.status} ${t.statusText}`, this.error = t.error || null
        }
    },
    RM = 200,
    OM = 204;

function gd(e, t) {
    return {
        body: t,
        headers: e.headers,
        context: e.context,
        observe: e.observe,
        params: e.params,
        reportProgress: e.reportProgress,
        responseType: e.responseType,
        withCredentials: e.withCredentials,
        credentials: e.credentials,
        transferCache: e.transferCache,
        timeout: e.timeout,
        keepalive: e.keepalive,
        priority: e.priority,
        cache: e.cache,
        mode: e.mode,
        redirect: e.redirect,
        integrity: e.integrity,
        referrer: e.referrer
    }
}
var iv = (() => {
    class e {
        handler;
        constructor(n) {
            this.handler = n
        }
        request(n, r, o = {}) {
            let i;
            if (n instanceof vr) i = n;
            else {
                let c;
                o.headers instanceof Wt ? c = o.headers : c = new Wt(o.headers);
                let u;
                o.params && (o.params instanceof Nt ? u = o.params : u = new Nt({
                    fromObject: o.params
                })), i = new vr(n, r, o.body !== void 0 ? o.body : null, {
                    headers: c,
                    context: o.context,
                    params: u,
                    reportProgress: o.reportProgress,
                    responseType: o.responseType || "json",
                    withCredentials: o.withCredentials,
                    transferCache: o.transferCache,
                    keepalive: o.keepalive,
                    priority: o.priority,
                    cache: o.cache,
                    mode: o.mode,
                    redirect: o.redirect,
                    credentials: o.credentials,
                    referrer: o.referrer,
                    integrity: o.integrity,
                    timeout: o.timeout
                })
            }
            let s = kn(i).pipe(Ta(c => this.handler.handle(c)));
            if (n instanceof vr || o.observe === "events") return s;
            let a = s.pipe(Xe(c => c instanceof Ao));
            switch (o.observe || "body") {
                case "body":
                    switch (i.responseType) {
                        case "arraybuffer":
                            return a.pipe(ge(c => {
                                if (c.body !== null && !(c.body instanceof ArrayBuffer)) throw new D(2806, !1);
                                return c.body
                            }));
                        case "blob":
                            return a.pipe(ge(c => {
                                if (c.body !== null && !(c.body instanceof Blob)) throw new D(2807, !1);
                                return c.body
                            }));
                        case "text":
                            return a.pipe(ge(c => {
                                if (c.body !== null && typeof c.body != "string") throw new D(2808, !1);
                                return c.body
                            }));
                        case "json":
                        default:
                            return a.pipe(ge(c => c.body))
                    }
                case "response":
                    return a;
                default:
                    throw new D(2809, !1)
            }
        }
        delete(n, r = {}) {
            return this.request("DELETE", n, r)
        }
        get(n, r = {}) {
            return this.request("GET", n, r)
        }
        head(n, r = {}) {
            return this.request("HEAD", n, r)
        }
        jsonp(n, r) {
            return this.request("JSONP", n, {
                params: new Nt().append(r, "JSONP_CALLBACK"),
                observe: "body",
                responseType: "json"
            })
        }
        options(n, r = {}) {
            return this.request("OPTIONS", n, r)
        }
        patch(n, r, o = {}) {
            return this.request("PATCH", n, gd(o, r))
        }
        post(n, r, o = {}) {
            return this.request("POST", n, gd(o, r))
        }
        put(n, r, o = {}) {
            return this.request("PUT", n, gd(o, r))
        }
        static\ u0275fac = function(r) {
            return new(r || e)(F(Er))
        };
        static\ u0275prov = A({
            token: e,
            factory: e.\u0275fac
        })
    }
    return e
})();
var FM = new T("");

function sv(e, t) {
    return t(e)
}

function kM(e, t) {
    return (n, r) => t.intercept(n, {
        handle: o => e(o, r)
    })
}

function PM(e, t, n) {
    return (r, o) => Zn(n, () => t(r, i => e(i, o)))
}
var av = new T(""),
    yd = new T(""),
    cv = new T(""),
    vd = new T("", {
        providedIn: "root",
        factory: () => !0
    });

function LM() {
    let e = null;
    return (t, n) => {
        e === null && (e = (v(av, {
            optional: !0
        }) ? ? []).reduceRight(kM, sv));
        let r = v(En);
        if (v(vd)) {
            let i = r.add();
            return e(t, n).pipe(Tr(i))
        } else return e(t, n)
    }
}
var aa = (() => {
    class e extends Er {
        backend;
        injector;
        chain = null;
        pendingTasks = v(En);
        contributeToStability = v(vd);
        constructor(n, r) {
            super(), this.backend = n, this.injector = r
        }
        handle(n) {
            if (this.chain === null) {
                let r = Array.from(new Set([...this.injector.get(yd), ...this.injector.get(cv, [])]));
                this.chain = r.reduceRight((o, i) => PM(o, i, this.injector), sv)
            }
            if (this.contributeToStability) {
                let r = this.pendingTasks.add();
                return this.chain(n, o => this.backend.handle(o)).pipe(Tr(r))
            } else return this.chain(n, r => this.backend.handle(r))
        }
        static\ u0275fac = function(r) {
            return new(r || e)(F(xo), F(Ie))
        };
        static\ u0275prov = A({
            token: e,
            factory: e.\u0275fac
        })
    }
    return e
})();
var jM = /^\)\]\}',?\n/,
    VM = RegExp(`^${nv}:`, "m");

function BM(e) {
    return "responseURL" in e && e.responseURL ? e.responseURL : VM.test(e.getAllResponseHeaders()) ? e.getResponseHeader(nv) : null
}
var md = (() => {
        class e {
            xhrFactory;
            constructor(n) {
                this.xhrFactory = n
            }
            handle(n) {
                if (n.method === "JSONP") throw new D(-2800, !1);
                let r = this.xhrFactory;
                return kn(null).pipe(ei(() => new S(i => {
                    let s = r.build();
                    if (s.open(n.method, n.urlWithParams), n.withCredentials && (s.withCredentials = !0), n.headers.forEach((m, g) => s.setRequestHeader(m, g.join(","))), n.headers.has(ev) || s.setRequestHeader(ev, AM), !n.headers.has(Xy)) {
                        let m = n.detectContentTypeHeader();
                        m !== null && s.setRequestHeader(Xy, m)
                    }
                    if (n.timeout && (s.timeout = n.timeout), n.responseType) {
                        let m = n.responseType.toLowerCase();
                        s.responseType = m !== "json" ? m : "text"
                    }
                    let a = n.serializeBody(),
                        c = null,
                        u = () => {
                            if (c !== null) return c;
                            let m = s.statusText || "OK",
                                g = new Wt(s.getAllResponseHeaders()),
                                R = BM(s) || n.url;
                            return c = new sa({
                                headers: g,
                                status: s.status,
                                statusText: m,
                                url: R
                            }), c
                        },
                        l = () => {
                            let {
                                headers: m,
                                status: g,
                                statusText: R,
                                url: De
                            } = u(), U = null;
                            g !== OM && (U = typeof s.response > "u" ? s.responseText : s.response), g === 0 && (g = U ? RM : 0);
                            let he = g >= 200 && g < 300;
                            if (n.responseType === "json" && typeof U == "string") {
                                let Pe = U;
                                U = U.replace(jM, "");
                                try {
                                    U = U !== "" ? JSON.parse(U) : null
                                } catch (ut) {
                                    U = Pe, he && (he = !1, U = {
                                        error: ut,
                                        text: U
                                    })
                                }
                            }
                            he ? (i.next(new Ao({
                                body: U,
                                headers: m,
                                status: g,
                                statusText: R,
                                url: De || void 0
                            })), i.complete()) : i.error(new Dr({
                                error: U,
                                headers: m,
                                status: g,
                                statusText: R,
                                url: De || void 0
                            }))
                        },
                        d = m => {
                            let {
                                url: g
                            } = u(), R = new Dr({
                                error: m,
                                status: s.status || 0,
                                statusText: s.statusText || "Unknown Error",
                                url: g || void 0
                            });
                            i.error(R)
                        },
                        f = d;
                    n.timeout && (f = m => {
                        let {
                            url: g
                        } = u(), R = new Dr({
                            error: new DOMException("Request timed out", "TimeoutError"),
                            status: s.status || 0,
                            statusText: s.statusText || "Request timeout",
                            url: g || void 0
                        });
                        i.error(R)
                    });
                    let p = !1,
                        h = m => {
                            p || (i.next(u()), p = !0);
                            let g = {
                                type: Nn.DownloadProgress,
                                loaded: m.loaded
                            };
                            m.lengthComputable && (g.total = m.total), n.responseType === "text" && s.responseText && (g.partialText = s.responseText), i.next(g)
                        },
                        y = m => {
                            let g = {
                                type: Nn.UploadProgress,
                                loaded: m.loaded
                            };
                            m.lengthComputable && (g.total = m.total), i.next(g)
                        };
                    return s.addEventListener("load", l), s.addEventListener("error", d), s.addEventListener("timeout", f), s.addEventListener("abort", d), n.reportProgress && (s.addEventListener("progress", h), a !== null && s.upload && s.upload.addEventListener("progress", y)), s.send(a), i.next({
                        type: Nn.Sent
                    }), () => {
                        s.removeEventListener("error", d), s.removeEventListener("abort", d), s.removeEventListener("load", l), s.removeEventListener("timeout", f), n.reportProgress && (s.removeEventListener("progress", h), a !== null && s.upload && s.upload.removeEventListener("progress", y)), s.readyState !== s.DONE && s.abort()
                    }
                })))
            }
            static\ u0275fac = function(r) {
                return new(r || e)(F(No))
            };
            static\ u0275prov = A({
                token: e,
                factory: e.\u0275fac
            })
        }
        return e
    })(),
    uv = new T(""),
    HM = "XSRF-TOKEN",
    $M = new T("", {
        providedIn: "root",
        factory: () => HM
    }),
    UM = "X-XSRF-TOKEN",
    zM = new T("", {
        providedIn: "root",
        factory: () => UM
    }),
    Ro = class {},
    GM = (() => {
        class e {
            doc;
            cookieName;
            lastCookieString = "";
            lastToken = null;
            parseCount = 0;
            constructor(n, r) {
                this.doc = n, this.cookieName = r
            }
            getToken() {
                let n = this.doc.cookie || "";
                return n !== this.lastCookieString && (this.parseCount++, this.lastToken = pd(n, this.cookieName), this.lastCookieString = n), this.lastToken
            }
            static\ u0275fac = function(r) {
                return new(r || e)(F(vt), F($M))
            };
            static\ u0275prov = A({
                token: e,
                factory: e.\u0275fac
            })
        }
        return e
    })();

function WM(e, t) {
    let n = e.url.toLowerCase();
    if (!v(uv) || e.method === "GET" || e.method === "HEAD" || n.startsWith("http://") || n.startsWith("https://")) return t(e);
    let r = v(Ro).getToken(),
        o = v(zM);
    return r != null && !e.headers.has(o) && (e = e.clone({
        headers: e.headers.set(o, r)
    })), t(e)
}
var Dd = (function(e) {
    return e[e.Interceptors = 0] = "Interceptors", e[e.LegacyInterceptors = 1] = "LegacyInterceptors", e[e.CustomXsrfConfiguration = 2] = "CustomXsrfConfiguration", e[e.NoXsrfProtection = 3] = "NoXsrfProtection", e[e.JsonpSupport = 4] = "JsonpSupport", e[e.RequestsMadeViaParent = 5] = "RequestsMadeViaParent", e[e.Fetch = 6] = "Fetch", e
})(Dd || {});

function qM(e, t) {
    return {\
        u0275kind: e,
        \u0275providers: t
    }
}

function ZM(...e) {
    let t = [iv, md, aa, {
        provide: Er,
        useExisting: aa
    }, {
        provide: xo,
        useFactory: () => v(FM, {
            optional: !0
        }) ? ? v(md)
    }, {
        provide: yd,
        useValue: WM,
        multi: !0
    }, {
        provide: uv,
        useValue: !0
    }, {
        provide: Ro,
        useClass: GM
    }];
    for (let n of e) t.push(...n.\u0275providers);
    return jr(t)
}
var tv = new T("");

function YM() {
    return qM(Dd.LegacyInterceptors, [{
        provide: tv,
        useFactory: LM
    }, {
        provide: yd,
        useExisting: tv,
        multi: !0
    }])
}

function MU(e) {
    e || (e = v(fe));
    let t = new S(n => {
        if (e.destroyed) {
            n.next();
            return
        }
        return e.onDestroy(n.next.bind(n))
    });
    return n => n.pipe(fi(t))
}

function SU(e, t) {
    let n = t ? .injector ? ? v(ye),
        r = new Jt(1),
        o = Vl(() => {
            let i;
            try {
                i = e()
            } catch (s) {
                Sn(() => r.error(s));
                return
            }
            Sn(() => r.next(i))
        }, {
            injector: n,
            manualCleanup: !0
        });
    return n.get(fe).onDestroy(() => {
        o.destroy(), r.complete()
    }), r.asObservable()
}

function NU(e, t) {
    let r = !t ? .manualCleanup ? t ? .injector ? .get(fe) ? ? v(fe) : null,
        o = QM(t ? .equal),
        i;
    t ? .requireSync ? i = Dn({
        kind: 0
    }, {
        equal: o
    }) : i = Dn({
        kind: 1,
        value: t ? .initialValue
    }, {
        equal: o
    });
    let s, a = e.subscribe({
        next: c => i.set({
            kind: 1,
            value: c
        }),
        error: c => {
            i.set({
                kind: 2,
                error: c
            }), s ? .()
        },
        complete: () => {
            s ? .()
        }
    });
    if (t ? .requireSync && i().kind === 0) throw new D(601, !1);
    return s = r ? .onDestroy(a.unsubscribe.bind(a)), jl(() => {
        let c = i();
        switch (c.kind) {
            case 1:
                return c.value;
            case 2:
                throw c.error;
            case 0:
                throw new D(601, !1)
        }
    }, {
        equal: t ? .equal
    })
}

function QM(e = Object.is) {
    return (t, n) => t.kind === 1 && n.kind === 1 && e(t.value, n.value)
}
export {
    W as a, pv as b, S as c, Ea as d, Ia as e, Ee as f, Mr as g, Jt as h, Lv as i, Je as j, jv as k, Vv as l, dt as m, Fn as n, Ne as o, kn as p, Bv as q, Hv as r, Be as s, $v as t, Uv as u, Gd as v, ge as w, Wv as x, lt as y, br as z, Vn as A, Zv as B, xv as C, ba as D, Kt as E, Av as F, Rv as G, tD as H, Xe as I, rD as J, iD as K, sD as L, va as M, cD as N, Ta as O, uD as P, Vd as Q, _r as R, di as S, lD as T, dD as U, Kd as V, pD as W, hD as X, Tr as Y, Jd as Z, Da as _, Bd as $, gD as aa, mD as ba, Xd as ca, tf as da, nf as ea, rf as fa, ei as ga, fi as ha, yD as ia, Hd as ja, vD as ka, D as la, ht as ma, $e as na, Si as oa, A as pa, Gn as qa, SD as ra, T as sa, F as ta, v as ua, jr as va, ac as wa, Ie as xa, Zn as ya, Hf as za, $f as Aa, Kf as Ba, Jf as Ca, ye as Da, vt as Ea, fe as Fa, tt as Ga, We as Ha, Dn as Ia, Vt as Ja, zu as Ka, IE as La, Wu as Ma, Ct as Na, SE as Oa, NE as Pa, ih as Qa, AE as Ra, RE as Sa, OE as Ta, PE as Ua, ur as Va, $t as Wa, _s as Xa, HE as Ya, $E as Za, UE as _a, zE as $a, GE as ab, Ms as bb, Eh as cb, co as db, sI as eb, Ih as fb, wh as gb, cI as hb, pI as ib, hI as jb, OI as kb, dr as lb, Kr as mb, lo as nb, Tt as ob, Et as pb, re as qb, HI as rb, wt as sb, go as tb, to as ub, mo as vb, j as wb, Zw as xb, _t as yb, bn as zb, Bg as Ab, $g as Bb, kC as Cb, vo as Db, Mt as Eb, ct as Fb, Wg as Gb, Zg as Hb, ZC as Ib, Yg as Jb, Qg as Kb, YC as Lb, Kg as Mb, Do as Nb, QC as Ob, Xg as Pb, Mn as Qb, nm as Rb, rm as Sb, JC as Tb, eb as Ub, _l as Vb, tb as Wb, nb as Xb, rb as Yb, ob as Zb, ib as _b, om as $b, Ml as ac, Sl as bc, im as cc, Nl as dc, xl as ec, sm as fc, Al as gc, Rl as hc, cm as ic, db as jc, um as kc, lm as lc, Pb as mc, Dm as nc, Em as oc, Lb as pc, Vb as qc, Bb as rc, $b as sc, Ub as tc, zb as uc, Gb as vc, Wb as wc, qb as xc, Zb as yc, _m as zc, Mm as Ac, aT as Bc, uT as Cc, DT as Dc, Pm as Ec, Ol as Fc, Lm as Gc, jm as Hc, Vm as Ic, Bm as Jc, bT as Kc, Hm as Lc, Um as Mc, TT as Nc, _T as Oc, MT as Pc, ST as Qc, OT as Rc, FT as Sc, kT as Tc, PT as Uc, LT as Vc, jT as Wc, VT as Xc, BT as Yc, HT as Zc, $T as _c, zT as $c, WT as ad, qT as bd, ZT as cd, YT as dd, QT as ed, Sn as fd, jl as gd, Vl as hd, ey as id, RH as jd, OH as kd, FH as ld, kH as md, b_ as nd, PH as od, Yl as pd, LH as qd, jH as rd, A_ as sd, R_ as td, VH as ud, BH as vd, zs as wd, O_ as xd, Xl as yd, F_ as zd, yr as Ad, Ey as Bd, Iy as Cd, j_ as Dd, Vy as Ed, $y as Fd, Uy as Gd, zy as Hd, sM as Id, Gy as Jd, aM as Kd, Wy as Ld, cM as Md, uM as Nd, lM as Od, pM as Pd, gM as Qd, mM as Rd, vM as Sd, DM as Td, EM as Ud, IM as Vd, wM as Wd, CM as Xd, pd as Yd, No as Zd, bM as _d, L$ as $d, j$ as ae, Nt as be, Ao as ce, Dr as de, iv as ee, av as fe, ZM as ge, YM as he, MU as ie, SU as je, NU as ke
};