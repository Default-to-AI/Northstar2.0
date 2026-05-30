import {
    a as we
} from "./chunk-6FMDYVJO.js";
import {
    $b as _,
    Aa as M,
    Ac as v,
    Cb as z,
    Cc as $,
    D as N,
    Da as Y,
    Db as p,
    Dc as R,
    E as ke,
    Ea as ae,
    Eb as G,
    Ec as k,
    Hb as C,
    I as te,
    Id as De,
    J as Ie,
    Jd as Je,
    K as se,
    Ka as Be,
    Kd as We,
    Na as K,
    Od as de,
    Qb as Ue,
    Rc as le,
    S as me,
    Sb as Q,
    Ub as q,
    Uc as Te,
    Vc as P,
    W as Ne,
    Wb as Z,
    Wc as ne,
    Xb as Le,
    Xd as Ye,
    Zb as He,
    _b as Ge,
    ac as f,
    bc as g,
    c as Pe,
    dc as Ve,
    dd as D,
    ec as $e,
    f as x,
    ga as Ae,
    ha as O,
    ic as X,
    ja as Fe,
    jc as E,
    ka as ye,
    kb as c,
    m as xe,
    mc as ie,
    nc as b,
    oa as oe,
    p as fe,
    pa as A,
    pb as F,
    pc as d,
    pd as J,
    qa as u,
    qb as re,
    qc as je,
    rb as be,
    rc as ze,
    sb as B,
    sc as V,
    tc as Qe,
    ua as h,
    uc as U,
    ud as ce,
    vc as L,
    w as ge,
    wb as H,
    xa as ve,
    yc as T,
    za as S
} from "./chunk-7LZCJGQ2.js";
import {
    a as _e,
    b as Re
} from "./chunk-TXK3PDXI.js";
var Tt = ["*"];
var Dt = ["dialog"];
var wt = (t, e, o) => ({
        $implicit: t,
        pages: e,
        disabled: o
    }),
    Ot = t => ({
        disabled: !0,
        currentPage: t
    }),
    St = (t, e, o) => ({
        disabled: t,
        $implicit: e,
        currentPage: o
    }),
    Me = (t, e) => ({
        disabled: t,
        currentPage: e
    }),
    Mt = t => ({
        disabled: t
    });

function Ct(t, e) {
    t & 1 && (f(0, "span", 13), ie(1, 7), g())
}

function Et(t, e) {
    t & 1 && (f(0, "span", 13), ie(1, 8), g())
}

function Rt(t, e) {
    t & 1 && (f(0, "span", 13), ie(1, 9), g())
}

function Pt(t, e) {
    t & 1 && (f(0, "span", 13), ie(1, 10), g())
}

function xt(t, e) {
    t & 1 && R(0, "...")
}

function kt(t, e) {
    if (t & 1 && R(0), t & 2) {
        let o = e.$implicit;
        k(o)
    }
}

function It(t, e) {}

function Nt(t, e) {
    if (t & 1 && (f(0, "a", 16), C(1, It, 0, 0, "ng-template", 12), g()), t & 2) {
        let o = d(2).$implicit,
            i = d(),
            n = T(9);
        c(), _("ngTemplateOutlet", (i.tplEllipsis == null ? null : i.tplEllipsis.templateRef) || n)("ngTemplateOutletContext", Te(2, Ot, o))
    }
}

function At(t, e) {}

function Ft(t, e) {
    if (t & 1) {
        let o = E();
        f(0, "a", 18), b("click", function(n) {
            S(o);
            let s = d().$implicit;
            return d(2).selectPage(s), M(n.preventDefault())
        }), C(1, At, 0, 0, "ng-template", 12), g()
    }
    if (t & 2) {
        let o = d().$implicit,
            i = d(),
            n = i.$implicit,
            s = i.disabled,
            a = d(),
            r = T(11);
        Q("tabindex", s ? "-1" : null)("aria-disabled", s ? "true" : null)("aria-current", o === n ? "page" : null), c(), _("ngTemplateOutlet", (a.tplNumber == null ? null : a.tplNumber.templateRef) || r)("ngTemplateOutletContext", ne(5, St, s, o, n))
    }
}

function Bt(t, e) {
    if (t & 1 && (f(0, "li", 15), q(1, Nt, 2, 4, "a", 16)(2, Ft, 2, 9, "a", 17), g()), t & 2) {
        let o = e.$implicit,
            i = d(),
            n = i.$implicit,
            s = i.disabled,
            a = d();
        v("active", o === n)("disabled", a.isEllipsis(o) || s), c(), Z(a.isEllipsis(o) ? 1 : 2)
    }
}

function Ut(t, e) {
    if (t & 1 && He(0, Bt, 3, 5, "li", 14, Le), t & 2) {
        let o = e.pages;
        Ge(o)
    }
}

function Lt(t, e) {}

function Ht(t, e) {
    if (t & 1) {
        let o = E();
        f(0, "li", 15)(1, "a", 19), b("click", function(n) {
            return S(o), d().selectPage(1), M(n.preventDefault())
        }), C(2, Lt, 0, 0, "ng-template", 12), g()()
    }
    if (t & 2) {
        let o = d(),
            i = T(1);
        v("disabled", o.previousDisabled()), c(), Q("tabindex", o.previousDisabled() ? "-1" : null)("aria-disabled", o.previousDisabled() ? "true" : null), c(), _("ngTemplateOutlet", (o.tplFirst == null ? null : o.tplFirst.templateRef) || i)("ngTemplateOutletContext", P(6, Me, o.previousDisabled(), o.page))
    }
}

function Gt(t, e) {}

function Vt(t, e) {
    if (t & 1) {
        let o = E();
        f(0, "li", 15)(1, "a", 20), b("click", function(n) {
            S(o);
            let s = d();
            return s.selectPage(s.page - 1), M(n.preventDefault())
        }), C(2, Gt, 0, 0, "ng-template", 12), g()()
    }
    if (t & 2) {
        let o = d(),
            i = T(3);
        v("disabled", o.previousDisabled()), c(), Q("tabindex", o.previousDisabled() ? "-1" : null)("aria-disabled", o.previousDisabled() ? "true" : null), c(), _("ngTemplateOutlet", (o.tplPrevious == null ? null : o.tplPrevious.templateRef) || i)("ngTemplateOutletContext", Te(6, Mt, o.previousDisabled()))
    }
}

function $t(t, e) {}

function jt(t, e) {}

function zt(t, e) {
    if (t & 1) {
        let o = E();
        f(0, "li", 15)(1, "a", 21), b("click", function(n) {
            S(o);
            let s = d();
            return s.selectPage(s.page + 1), M(n.preventDefault())
        }), C(2, jt, 0, 0, "ng-template", 12), g()()
    }
    if (t & 2) {
        let o = d(),
            i = T(5);
        v("disabled", o.nextDisabled()), c(), Q("tabindex", o.nextDisabled() ? "-1" : null)("aria-disabled", o.nextDisabled() ? "true" : null), c(), _("ngTemplateOutlet", (o.tplNext == null ? null : o.tplNext.templateRef) || i)("ngTemplateOutletContext", P(6, Me, o.nextDisabled(), o.page))
    }
}

function Qt(t, e) {}

function Jt(t, e) {
    if (t & 1) {
        let o = E();
        f(0, "li", 15)(1, "a", 22), b("click", function(n) {
            S(o);
            let s = d();
            return s.selectPage(s.pageCount), M(n.preventDefault())
        }), C(2, Qt, 0, 0, "ng-template", 12), g()()
    }
    if (t & 2) {
        let o = d(),
            i = T(7);
        v("disabled", o.nextDisabled()), c(), Q("tabindex", o.nextDisabled() ? "-1" : null)("aria-disabled", o.nextDisabled() ? "true" : null), c(), _("ngTemplateOutlet", (o.tplLast == null ? null : o.tplLast.templateRef) || i)("ngTemplateOutletContext", P(6, Me, o.nextDisabled(), o.page))
    }
}
var qe = {
        animation: !0,
        transitionTimerDelayMs: 5
    },
    Wt = (() => {
        let e = class e {
            constructor() {
                this.animation = qe.animation
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        });
        let t = e;
        return t
    })();

function Yt(t) {
    let {
        transitionDelay: e,
        transitionDuration: o
    } = window.getComputedStyle(t), i = parseFloat(e), n = parseFloat(o);
    return (i + n) * 1e3
}

function Kt(t) {
    return parseInt(`${t}`, 10)
}

function qt(t, e, o = 0) {
    return Math.max(Math.min(t, e), o)
}

function Ze(t) {
    return typeof t == "string"
}

function Ke(t) {
    return !isNaN(Kt(t))
}

function Ce(t) {
    return t != null
}

function Zt(t) {
    return t && t.then
}

function Xe(t) {
    return (t || document.body).getBoundingClientRect()
}

function Xt(t) {
    return e => new Pe(o => {
        let i = a => t.run(() => o.next(a)),
            n = a => t.run(() => o.error(a)),
            s = () => t.run(() => o.complete());
        return e.subscribe({
            next: i,
            error: n,
            complete: s
        })
    })
}
var ei = () => {},
    {
        transitionTimerDelayMs: ti
    } = qe,
    he = new Map,
    W = (t, e, o, i) => {
        let n = i.context || {},
            s = he.get(e);
        if (s) switch (i.runningTransition) {
            case "continue":
                return xe;
            case "stop":
                t.run(() => s.transition$.complete()), n = Object.assign(s.context, n), he.delete(e)
        }
        let a = o(e, i.animation, n) || ei;
        if (!i.animation || window.getComputedStyle(e).transitionProperty === "none") return t.run(() => a()), fe(void 0).pipe(Xt(t));
        let r = new x,
            m = new x,
            l = r.pipe(Ne(!0));
        he.set(e, {
            transition$: r,
            complete: () => {
                m.next(), m.complete()
            },
            context: n
        });
        let y = Yt(e);
        return t.runOutsideAngular(() => {
            let w = N(e, "transitionend").pipe(O(l), te(({
                    target: j
                }) => j === e)),
                I = ke(y + ti).pipe(O(l));
            Ie(I, w, m).pipe(O(l)).subscribe(() => {
                he.delete(e), t.run(() => {
                    a(), r.next(), r.complete()
                })
            })
        }), r.asObservable()
    };
var et = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var tt = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var it = (() => {
        let e = class e {};
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275mod = p({
            type: e
        }), e.\u0275inj = u({});
        let t = e;
        return t
    })(),
    nt = (() => {
        let e = class e {};
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275mod = p({
            type: e
        }), e.\u0275inj = u({});
        let t = e;
        return t
    })();
var Vn = (() => {
    let t = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2,
        e = () => /Android/.test(navigator.userAgent);
    return typeof navigator < "u" ? !!navigator.userAgent && (t() || e()) : !1
})();
var ii = ["a[href]", "button:not([disabled])", 'input:not([disabled]):not([type="hidden"])', "select:not([disabled])", "textarea:not([disabled])", "[contenteditable]", '[tabindex]:not([tabindex="-1"])'].join(", ");

function st(t) {
    let e = Array.from(t.querySelectorAll(ii)).filter(o => o.tabIndex !== -1);
    return [e[0], e[e.length - 1]]
}
var ni = (t, e, o, i = !1) => {
    t.runOutsideAngular(() => {
        let n = N(e, "focusin").pipe(O(o), ge(s => s.target));
        N(e, "keydown").pipe(O(o), te(s => s.key === "Tab"), ye(n)).subscribe(([s, a]) => {
            let [r, m] = st(e);
            (a === r || a === e) && s.shiftKey && (m.focus(), s.preventDefault()), a === m && !s.shiftKey && (r.focus(), s.preventDefault())
        }), i && N(e, "click").pipe(O(o), ye(n), ge(s => s[1])).subscribe(s => s.focus())
    })
};
var $n = new Date(1882, 10, 12),
    jn = new Date(2174, 10, 25);
var zn = 1e3 * 60 * 60 * 24;
var Ee = 1080,
    si = 24 * Ee,
    oi = 12 * Ee + 793,
    Qn = 29 * si + oi,
    Jn = 11 * Ee + 204;
var ot = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var at = (() => {
        let e = class e {};
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275mod = p({
            type: e
        }), e.\u0275inj = u({});
        let t = e;
        return t
    })(),
    ai = (() => {
        let e = class e {
            constructor() {
                this._ngbConfig = h(Wt), this.backdrop = !0, this.fullscreen = !1, this.keyboard = !0, this.role = "dialog"
            }
            get animation() {
                return this._animation ? ? this._ngbConfig.animation
            }
            set animation(i) {
                this._animation = i
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        });
        let t = e;
        return t
    })(),
    ee = class {
        constructor(e, o, i) {
            this.nodes = e, this.viewRef = o, this.componentRef = i
        }
    };
var ri = (() => {
        let e = class e {
            constructor() {
                this._document = h(ae)
            }
            hide() {
                let i = Math.abs(window.innerWidth - this._document.documentElement.clientWidth),
                    n = this._document.body,
                    s = n.style,
                    {
                        overflow: a,
                        paddingRight: r
                    } = s;
                if (i > 0) {
                    let m = parseFloat(window.getComputedStyle(n).paddingRight);
                    s.paddingRight = `${m+i}px`
                }
                return s.overflow = "hidden", () => {
                    i > 0 && (s.paddingRight = r), s.overflow = a
                }
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        });
        let t = e;
        return t
    })(),
    li = ["animation", "backdropClass"],
    ci = (() => {
        let e = class e {
            constructor() {
                this._nativeElement = h(K).nativeElement, this._zone = h(re), this._injector = h(Y), this._cdRef = h(J)
            }
            ngOnInit() {
                be({
                    mixedReadWrite: () => W(this._zone, this._nativeElement, (i, n) => {
                        n && Xe(i), i.classList.add("show")
                    }, {
                        animation: this.animation,
                        runningTransition: "continue"
                    })
                }, {
                    injector: this._injector
                })
            }
            hide() {
                return W(this._zone, this._nativeElement, ({
                    classList: i
                }) => i.remove("show"), {
                    animation: this.animation,
                    runningTransition: "stop"
                })
            }
            updateOptions(i) {
                li.forEach(n => {
                    Ce(i[n]) && (this[n] = i[n])
                }), this._cdRef.markForCheck()
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275cmp = z({
            type: e,
            selectors: [
                ["ngb-modal-backdrop"]
            ],
            hostAttrs: [2, "z-index", "1055"],
            hostVars: 6,
            hostBindings: function(n, s) {
                n & 2 && ($("modal-backdrop" + (s.backdropClass ? " " + s.backdropClass : "")), v("show", !s.animation)("fade", s.animation))
            },
            inputs: {
                animation: "animation",
                backdropClass: "backdropClass"
            },
            decls: 0,
            vars: 0,
            template: function(n, s) {},
            encapsulation: 2
        });
        let t = e;
        return t
    })(),
    ue = class {
        update(e) {}
        close(e) {}
        dismiss(e) {}
    },
    Oe = class {
        update(e) {
            this._windowCmptRef.instance.updateOptions(e), this._backdropCmptRef && this._backdropCmptRef.instance && this._backdropCmptRef.instance.updateOptions(e)
        }
        get componentInstance() {
            if (this._contentRef && this._contentRef.componentRef) return this._contentRef.componentRef.instance
        }
        get closed() {
            return this._closed.asObservable().pipe(O(this._hidden))
        }
        get dismissed() {
            return this._dismissed.asObservable().pipe(O(this._hidden))
        }
        get hidden() {
            return this._hidden.asObservable()
        }
        get shown() {
            return this._windowCmptRef.instance.shown.asObservable()
        }
        constructor(e, o, i, n) {
            this._windowCmptRef = e, this._contentRef = o, this._backdropCmptRef = i, this._beforeDismiss = n, this._closed = new x, this._dismissed = new x, this._hidden = new x, e.instance.dismissEvent.subscribe(s => {
                this.dismiss(s)
            }), this.result = new Promise((s, a) => {
                this._resolve = s, this._reject = a
            }), this.result.then(null, () => {})
        }
        close(e) {
            this._windowCmptRef && (this._closed.next(e), this._resolve(e), this._removeModalElements())
        }
        _dismiss(e) {
            this._dismissed.next(e), this._reject(e), this._removeModalElements()
        }
        dismiss(e) {
            if (this._windowCmptRef)
                if (!this._beforeDismiss) this._dismiss(e);
                else {
                    let o = this._beforeDismiss();
                    Zt(o) ? o.then(i => {
                        i !== !1 && this._dismiss(e)
                    }, () => {}) : o !== !1 && this._dismiss(e)
                }
        }
        _removeModalElements() {
            let e = this._windowCmptRef.instance.hide(),
                o = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : fe(void 0);
            e.subscribe(() => {
                let {
                    nativeElement: i
                } = this._windowCmptRef.location;
                i.parentNode.removeChild(i), this._windowCmptRef.destroy(), this._contentRef ? .viewRef ? .destroy(), this._windowCmptRef = null, this._contentRef = null
            }), o.subscribe(() => {
                if (this._backdropCmptRef) {
                    let {
                        nativeElement: i
                    } = this._backdropCmptRef.location;
                    i.parentNode.removeChild(i), this._backdropCmptRef.destroy(), this._backdropCmptRef = null
                }
            }), se(e, o).subscribe(() => {
                this._hidden.next(), this._hidden.complete()
            })
        }
    },
    Se = (function(t) {
        return t[t.BACKDROP_CLICK = 0] = "BACKDROP_CLICK", t[t.ESC = 1] = "ESC", t
    })(Se || {}),
    di = ["animation", "ariaLabelledBy", "ariaDescribedBy", "backdrop", "centered", "fullscreen", "keyboard", "role", "scrollable", "size", "windowClass", "modalDialogClass"],
    hi = (() => {
        let e = class e {
            constructor() {
                this._document = h(ae), this._elRef = h(K), this._zone = h(re), this._injector = h(Y), this._cdRef = h(J), this._closed$ = new x, this._elWithFocus = null, this.backdrop = !0, this.keyboard = !0, this.role = "dialog", this.dismissEvent = new F, this.shown = new x, this.hidden = new x
            }
            get fullscreenClass() {
                return this.fullscreen === !0 ? " modal-fullscreen" : Ze(this.fullscreen) ? ` modal-fullscreen-${this.fullscreen}-down` : ""
            }
            dismiss(i) {
                this.dismissEvent.emit(i)
            }
            ngOnInit() {
                this._elWithFocus = this._document.activeElement, be({
                    mixedReadWrite: () => this._show()
                }, {
                    injector: this._injector
                })
            }
            ngOnDestroy() {
                this._disableEventHandling()
            }
            hide() {
                let {
                    nativeElement: i
                } = this._elRef, n = {
                    animation: this.animation,
                    runningTransition: "stop"
                }, s = W(this._zone, i, () => i.classList.remove("show"), n), a = W(this._zone, this._dialogEl.nativeElement, () => {}, n), r = se(s, a);
                return r.subscribe(() => {
                    this.hidden.next(), this.hidden.complete()
                }), this._disableEventHandling(), this._restoreFocus(), r
            }
            updateOptions(i) {
                di.forEach(n => {
                    Ce(i[n]) && (this[n] = i[n])
                }), this._cdRef.markForCheck()
            }
            _show() {
                let i = {
                        animation: this.animation,
                        runningTransition: "continue"
                    },
                    n = W(this._zone, this._elRef.nativeElement, (a, r) => {
                        r && Xe(a), a.classList.add("show")
                    }, i),
                    s = W(this._zone, this._dialogEl.nativeElement, () => {}, i);
                se(n, s).subscribe(() => {
                    this.shown.next(), this.shown.complete()
                }), this._enableEventHandling(), this._setFocus()
            }
            _enableEventHandling() {
                let {
                    nativeElement: i
                } = this._elRef;
                this._zone.runOutsideAngular(() => {
                    N(i, "keydown").pipe(O(this._closed$), te(s => s.key === "Escape")).subscribe(s => {
                        this.keyboard ? requestAnimationFrame(() => {
                            s.defaultPrevented || this._zone.run(() => this.dismiss(Se.ESC))
                        }) : this.backdrop === "static" && this._bumpBackdrop()
                    });
                    let n = !1;
                    N(this._dialogEl.nativeElement, "mousedown").pipe(O(this._closed$), Fe(() => n = !1), Ae(() => N(i, "mouseup").pipe(O(this._closed$), me(1))), te(({
                        target: s
                    }) => i === s)).subscribe(() => {
                        n = !0
                    }), N(i, "click").pipe(O(this._closed$)).subscribe(({
                        target: s
                    }) => {
                        i === s && (this.backdrop === "static" ? this._bumpBackdrop() : this.backdrop === !0 && !n && this._zone.run(() => this.dismiss(Se.BACKDROP_CLICK))), n = !1
                    })
                })
            }
            _disableEventHandling() {
                this._closed$.next()
            }
            _setFocus() {
                let {
                    nativeElement: i
                } = this._elRef;
                if (!i.contains(document.activeElement)) {
                    let n = i.querySelector("[ngbAutofocus]"),
                        s = st(i)[0];
                    (n || s || i).focus()
                }
            }
            _restoreFocus() {
                let i = this._document.body,
                    n = this._elWithFocus,
                    s;
                n && n.focus && i.contains(n) ? s = n : s = i, this._zone.runOutsideAngular(() => {
                    setTimeout(() => s.focus()), this._elWithFocus = null
                })
            }
            _bumpBackdrop() {
                this.backdrop === "static" && W(this._zone, this._elRef.nativeElement, ({
                    classList: i
                }) => (i.add("modal-static"), () => i.remove("modal-static")), {
                    animation: this.animation,
                    runningTransition: "continue"
                })
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275cmp = z({
            type: e,
            selectors: [
                ["ngb-modal-window"]
            ],
            viewQuery: function(n, s) {
                if (n & 1 && Qe(Dt, 7), n & 2) {
                    let a;
                    U(a = L()) && (s._dialogEl = a.first)
                }
            },
            hostAttrs: ["tabindex", "-1"],
            hostVars: 8,
            hostBindings: function(n, s) {
                n & 2 && (Q("aria-modal", !0)("aria-labelledby", s.ariaLabelledBy)("aria-describedby", s.ariaDescribedBy)("role", s.role), $("modal d-block" + (s.windowClass ? " " + s.windowClass : "")), v("fade", s.animation))
            },
            inputs: {
                animation: "animation",
                ariaLabelledBy: "ariaLabelledBy",
                ariaDescribedBy: "ariaDescribedBy",
                backdrop: "backdrop",
                centered: "centered",
                fullscreen: "fullscreen",
                keyboard: "keyboard",
                role: "role",
                scrollable: "scrollable",
                size: "size",
                windowClass: "windowClass",
                modalDialogClass: "modalDialogClass"
            },
            outputs: {
                dismissEvent: "dismiss"
            },
            ngContentSelectors: Tt,
            decls: 4,
            vars: 2,
            consts: [
                ["dialog", ""],
                ["role", "document"],
                [1, "modal-content"]
            ],
            template: function(n, s) {
                n & 1 && (je(), Ve(0, "div", 1, 0)(2, "div", 2), ze(3), $e()()), n & 2 && $("modal-dialog" + (s.size ? " modal-" + s.size : "") + (s.centered ? " modal-dialog-centered" : "") + s.fullscreenClass + (s.scrollable ? " modal-dialog-scrollable" : "") + (s.modalDialogClass ? " " + s.modalDialogClass : ""))
            },
            styles: [`ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}
`],
            encapsulation: 2
        });
        let t = e;
        return t
    })(),
    ui = (() => {
        let e = class e {
            constructor() {
                this._applicationRef = h(Ue), this._injector = h(Y), this._environmentInjector = h(ve), this._document = h(ae), this._scrollBar = h(ri), this._activeWindowCmptHasChanged = new x, this._ariaHiddenValues = new Map, this._scrollBarRestoreFn = null, this._modalRefs = [], this._windowCmpts = [], this._activeInstances = new F;
                let i = h(re);
                this._activeWindowCmptHasChanged.subscribe(() => {
                    if (this._windowCmpts.length) {
                        let n = this._windowCmpts[this._windowCmpts.length - 1];
                        ni(i, n.location.nativeElement, this._activeWindowCmptHasChanged), this._revertAriaHidden(), this._setAriaHidden(n.location.nativeElement)
                    }
                })
            }
            _restoreScrollBar() {
                let i = this._scrollBarRestoreFn;
                i && (this._scrollBarRestoreFn = null, i())
            }
            _hideScrollBar() {
                this._scrollBarRestoreFn || (this._scrollBarRestoreFn = this._scrollBar.hide())
            }
            open(i, n, s) {
                let a = s.container instanceof HTMLElement ? s.container : Ce(s.container) ? this._document.querySelector(s.container) : this._document.body;
                if (!a) throw new Error(`The specified modal container "${s.container||"body"}" was not found in the DOM.`);
                this._hideScrollBar();
                let r = new ue;
                i = s.injector || i;
                let m = i.get(ve, null) || this._environmentInjector,
                    l = this._getContentRef(i, m, n, r, s),
                    y = s.backdrop !== !1 ? this._attachBackdrop(a) : void 0,
                    w = this._attachWindowComponent(a, l.nodes),
                    I = new Oe(w, l, y, s.beforeDismiss);
                return this._registerModalRef(I), this._registerWindowCmpt(w), I.hidden.pipe(me(1)).subscribe(() => Promise.resolve(!0).then(() => {
                    this._modalRefs.length || (this._document.body.classList.remove("modal-open"), this._restoreScrollBar(), this._revertAriaHidden())
                })), r.close = j => {
                    I.close(j)
                }, r.dismiss = j => {
                    I.dismiss(j)
                }, r.update = j => {
                    I.update(j)
                }, I.update(s), this._modalRefs.length === 1 && this._document.body.classList.add("modal-open"), y && y.instance && y.changeDetectorRef.detectChanges(), w.changeDetectorRef.detectChanges(), I
            }
            get activeInstances() {
                return this._activeInstances
            }
            dismissAll(i) {
                this._modalRefs.forEach(n => n.dismiss(i))
            }
            hasOpenModals() {
                return this._modalRefs.length > 0
            }
            _attachBackdrop(i) {
                let n = ce(ci, {
                    environmentInjector: this._applicationRef.injector,
                    elementInjector: this._injector
                });
                return this._applicationRef.attachView(n.hostView), i.appendChild(n.location.nativeElement), n
            }
            _attachWindowComponent(i, n) {
                let s = ce(hi, {
                    environmentInjector: this._applicationRef.injector,
                    elementInjector: this._injector,
                    projectableNodes: n
                });
                return this._applicationRef.attachView(s.hostView), i.appendChild(s.location.nativeElement), s
            }
            _getContentRef(i, n, s, a, r) {
                return s ? s instanceof B ? this._createFromTemplateRef(s, a) : Ze(s) ? this._createFromString(s) : this._createFromComponent(i, n, s, a, r) : new ee([])
            }
            _createFromTemplateRef(i, n) {
                let s = {
                        $implicit: n,
                        close(r) {
                            n.close(r)
                        },
                        dismiss(r) {
                            n.dismiss(r)
                        }
                    },
                    a = i.createEmbeddedView(s);
                return this._applicationRef.attachView(a), new ee([a.rootNodes], a)
            }
            _createFromString(i) {
                let n = this._document.createTextNode(`${i}`);
                return new ee([
                    [n]
                ])
            }
            _createFromComponent(i, n, s, a, r) {
                let m = Y.create({
                        providers: [{
                            provide: ue,
                            useValue: a
                        }],
                        parent: i
                    }),
                    l = ce(s, {
                        environmentInjector: n,
                        elementInjector: m
                    }),
                    y = l.location.nativeElement;
                return r.scrollable && y.classList.add("component-host-scrollable"), this._applicationRef.attachView(l.hostView), new ee([
                    [y]
                ], l.hostView, l)
            }
            _setAriaHidden(i) {
                let n = i.parentElement;
                n && i !== this._document.body && (Array.from(n.children).forEach(s => {
                    s !== i && s.nodeName !== "SCRIPT" && (this._ariaHiddenValues.set(s, s.getAttribute("aria-hidden")), s.setAttribute("aria-hidden", "true"))
                }), this._setAriaHidden(n))
            }
            _revertAriaHidden() {
                this._ariaHiddenValues.forEach((i, n) => {
                    i ? n.setAttribute("aria-hidden", i) : n.removeAttribute("aria-hidden")
                }), this._ariaHiddenValues.clear()
            }
            _registerModalRef(i) {
                let n = () => {
                    let s = this._modalRefs.indexOf(i);
                    s > -1 && (this._modalRefs.splice(s, 1), this._activeInstances.emit(this._modalRefs))
                };
                this._modalRefs.push(i), this._activeInstances.emit(this._modalRefs), i.result.then(n, n)
            }
            _registerWindowCmpt(i) {
                this._windowCmpts.push(i), this._activeWindowCmptHasChanged.next(), i.onDestroy(() => {
                    let n = this._windowCmpts.indexOf(i);
                    n > -1 && (this._windowCmpts.splice(n, 1), this._activeWindowCmptHasChanged.next())
                })
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        });
        let t = e;
        return t
    })(),
    pi = (() => {
        let e = class e {
            constructor() {
                this._injector = h(Y), this._modalStack = h(ui), this._config = h(ai)
            }
            open(i, n = {}) {
                let s = _e(Re(_e({}, this._config), {
                    animation: this._config.animation
                }), n);
                return this._modalStack.open(this._injector, i, s)
            }
            get activeInstances() {
                return this._modalStack.activeInstances
            }
            dismissAll(i) {
                this._modalStack.dismissAll(i)
            }
            hasOpenModals() {
                return this._modalStack.hasOpenModals()
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        });
        let t = e;
        return t
    })(),
    rt = (() => {
        let e = class e {};
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275mod = p({
            type: e
        }), e.\u0275inj = u({
            providers: [pi]
        });
        let t = e;
        return t
    })();
var lt = (() => {
        let e = class e {};
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275mod = p({
            type: e
        }), e.\u0275inj = u({});
        let t = e;
        return t
    })(),
    _i = (() => {
        let e = class e {
            constructor() {
                this.disabled = !1, this.boundaryLinks = !1, this.directionLinks = !0, this.ellipses = !0, this.maxSize = 0, this.pageSize = 10, this.rotate = !1
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        });
        let t = e;
        return t
    })(),
    fi = (() => {
        let e = class e {
            constructor() {
                this.templateRef = h(B)
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275dir = G({
            type: e,
            selectors: [
                ["ng-template", "ngbPaginationEllipsis", ""]
            ]
        });
        let t = e;
        return t
    })(),
    gi = (() => {
        let e = class e {
            constructor() {
                this.templateRef = h(B)
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275dir = G({
            type: e,
            selectors: [
                ["ng-template", "ngbPaginationFirst", ""]
            ]
        });
        let t = e;
        return t
    })(),
    mi = (() => {
        let e = class e {
            constructor() {
                this.templateRef = h(B)
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275dir = G({
            type: e,
            selectors: [
                ["ng-template", "ngbPaginationLast", ""]
            ]
        });
        let t = e;
        return t
    })(),
    yi = (() => {
        let e = class e {
            constructor() {
                this.templateRef = h(B)
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275dir = G({
            type: e,
            selectors: [
                ["ng-template", "ngbPaginationNext", ""]
            ]
        });
        let t = e;
        return t
    })(),
    vi = (() => {
        let e = class e {
            constructor() {
                this.templateRef = h(B)
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275dir = G({
            type: e,
            selectors: [
                ["ng-template", "ngbPaginationNumber", ""]
            ]
        });
        let t = e;
        return t
    })(),
    bi = (() => {
        let e = class e {
            constructor() {
                this.templateRef = h(B)
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275dir = G({
            type: e,
            selectors: [
                ["ng-template", "ngbPaginationPrevious", ""]
            ]
        });
        let t = e;
        return t
    })(),
    Ti = (() => {
        let e = class e {
            constructor() {
                this.templateRef = h(B)
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275dir = G({
            type: e,
            selectors: [
                ["ng-template", "ngbPaginationPages", ""]
            ]
        });
        let t = e;
        return t
    })(),
    Wn = (() => {
        let e = class e {
            constructor() {
                this._config = h(_i), this.pageCount = 0, this.pages = [], this.disabled = this._config.disabled, this.boundaryLinks = this._config.boundaryLinks, this.directionLinks = this._config.directionLinks, this.ellipses = this._config.ellipses, this.rotate = this._config.rotate, this.maxSize = this._config.maxSize, this.page = 1, this.pageSize = this._config.pageSize, this.pageChange = new F(!0), this.size = this._config.size
            }
            hasPrevious() {
                return this.page > 1
            }
            hasNext() {
                return this.page < this.pageCount
            }
            nextDisabled() {
                return !this.hasNext() || this.disabled
            }
            previousDisabled() {
                return !this.hasPrevious() || this.disabled
            }
            selectPage(i) {
                this._updatePages(i)
            }
            ngOnChanges(i) {
                this._updatePages(this.page)
            }
            isEllipsis(i) {
                return i === -1
            }
            _applyEllipses(i, n) {
                this.ellipses && (i > 0 && (i > 2 ? this.pages.unshift(-1) : i === 2 && this.pages.unshift(2), this.pages.unshift(1)), n < this.pageCount && (n < this.pageCount - 2 ? this.pages.push(-1) : n === this.pageCount - 2 && this.pages.push(this.pageCount - 1), this.pages.push(this.pageCount)))
            }
            _applyRotation() {
                let i = 0,
                    n = this.pageCount,
                    s = Math.floor(this.maxSize / 2),
                    a = this.maxSize % 2 === 0 ? s - 1 : s;
                return this.page <= s ? n = this.maxSize : this.pageCount - this.page < s ? i = this.pageCount - this.maxSize : (i = this.page - s - 1, n = this.page + a), [i, n]
            }
            _applyPagination() {
                let n = (Math.ceil(this.page / this.maxSize) - 1) * this.maxSize,
                    s = n + this.maxSize;
                return [n, s]
            }
            _setPageInRange(i) {
                let n = this.page;
                this.page = qt(i, this.pageCount, 1), this.page !== n && Ke(this.collectionSize) && this.pageChange.emit(this.page)
            }
            _updatePages(i) {
                this.pageCount = Math.ceil(this.collectionSize / this.pageSize), Ke(this.pageCount) || (this.pageCount = 0), this.pages.length = 0;
                for (let n = 1; n <= this.pageCount; n++) this.pages.push(n);
                if (this._setPageInRange(i), this.maxSize > 0 && this.pageCount > this.maxSize) {
                    let n = 0,
                        s = this.pageCount;
                    this.rotate ? [n, s] = this._applyRotation() : [n, s] = this._applyPagination(), this.pages = this.pages.slice(n, s), this._applyEllipses(n, s)
                }
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275cmp = z({
            type: e,
            selectors: [
                ["ngb-pagination"]
            ],
            contentQueries: function(n, s, a) {
                if (n & 1 && (V(a, fi, 5), V(a, gi, 5), V(a, mi, 5), V(a, yi, 5), V(a, vi, 5), V(a, bi, 5), V(a, Ti, 5)), n & 2) {
                    let r;
                    U(r = L()) && (s.tplEllipsis = r.first), U(r = L()) && (s.tplFirst = r.first), U(r = L()) && (s.tplLast = r.first), U(r = L()) && (s.tplNext = r.first), U(r = L()) && (s.tplNumber = r.first), U(r = L()) && (s.tplPrevious = r.first), U(r = L()) && (s.tplPages = r.first)
                }
            },
            hostAttrs: ["role", "navigation"],
            inputs: {
                disabled: "disabled",
                boundaryLinks: "boundaryLinks",
                directionLinks: "directionLinks",
                ellipses: "ellipses",
                rotate: "rotate",
                collectionSize: "collectionSize",
                maxSize: "maxSize",
                page: "page",
                pageSize: "pageSize",
                size: "size"
            },
            outputs: {
                pageChange: "pageChange"
            },
            features: [Be],
            decls: 20,
            vars: 12,
            consts: () => {
                let i;
                i = $localize `:@@ngb.pagination.first:««`;
                let n;
                n = $localize `:@@ngb.pagination.previous:«`;
                let s;
                s = $localize `:@@ngb.pagination.next:»`;
                let a;
                a = $localize `:@@ngb.pagination.last:»»`;
                let r;
                r = $localize `:@@ngb.pagination.first-aria:First`;
                let m;
                m = $localize `:@@ngb.pagination.previous-aria:Previous`;
                let l;
                l = $localize `:@@ngb.pagination.next-aria:Next`;
                let y;
                return y = $localize `:@@ngb.pagination.last-aria:Last`, [
                    ["first", ""],
                    ["previous", ""],
                    ["next", ""],
                    ["last", ""],
                    ["ellipsis", ""],
                    ["defaultNumber", ""],
                    ["defaultPages", ""], i, n, s, a, [1, "page-item", 3, "disabled"],
                    [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
                    ["aria-hidden", "true"],
                    [1, "page-item", 3, "active", "disabled"],
                    [1, "page-item"],
                    ["tabindex", "-1", "aria-disabled", "true", 1, "page-link"],
                    ["href", "", 1, "page-link"],
                    ["href", "", 1, "page-link", 3, "click"],
                    ["aria-label", r, "href", "", 1, "page-link", 3, "click"],
                    ["aria-label", m, "href", "", 1, "page-link", 3, "click"],
                    ["aria-label", l, "href", "", 1, "page-link", 3, "click"],
                    ["aria-label", y, "href", "", 1, "page-link", 3, "click"]
                ]
            },
            template: function(n, s) {
                if (n & 1 && (C(0, Ct, 2, 0, "ng-template", null, 0, D)(2, Et, 2, 0, "ng-template", null, 1, D)(4, Rt, 2, 0, "ng-template", null, 2, D)(6, Pt, 2, 0, "ng-template", null, 3, D)(8, xt, 1, 0, "ng-template", null, 4, D)(10, kt, 1, 1, "ng-template", null, 5, D)(12, Ut, 2, 0, "ng-template", null, 6, D), f(14, "ul"), q(15, Ht, 3, 9, "li", 11), q(16, Vt, 3, 8, "li", 11), C(17, $t, 0, 0, "ng-template", 12), q(18, zt, 3, 9, "li", 11), q(19, Jt, 3, 9, "li", 11), g()), n & 2) {
                    let a = T(13);
                    c(14), $("pagination" + (s.size ? " pagination-" + s.size : "")), c(), Z(s.boundaryLinks ? 15 : -1), c(), Z(s.directionLinks ? 16 : -1), c(), _("ngTemplateOutlet", (s.tplPages == null ? null : s.tplPages.templateRef) || a)("ngTemplateOutletContext", ne(8, wt, s.page, s.pages, s.disabled)), c(), Z(s.directionLinks ? 18 : -1), c(), Z(s.boundaryLinks ? 19 : -1)
                }
            },
            dependencies: [de],
            encapsulation: 2,
            changeDetection: 0
        });
        let t = e;
        return t
    })();
var ct = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var dt = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var ht = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var ut = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var pt = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var _t = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var ft = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var gt = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var mt = (() => {
    let e = class e {};
    e.\u0275fac = function(n) {
        return new(n || e)
    }, e.\u0275mod = p({
        type: e
    }), e.\u0275inj = u({});
    let t = e;
    return t
})();
var yt = (() => {
        let e = class e {};
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275mod = p({
            type: e
        }), e.\u0275inj = u({});
        let t = e;
        return t
    })(),
    Di = [et, tt, it, nt, ot, at, rt, lt, yt, ct, dt, ht, ut, pt, _t, ft, gt, mt],
    Yn = (() => {
        let e = class e {};
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275mod = p({
            type: e
        }), e.\u0275inj = u({
            imports: [Di, et, tt, it, nt, ot, at, rt, lt, yt, ct, dt, ht, ut, pt, _t, ft, gt, mt]
        });
        let t = e;
        return t
    })();
var wi = (t, e) => ({
        "pull-left": t,
        "float-left": e
    }),
    Oi = (t, e) => ({
        "pull-right": t,
        "float-right": e
    }),
    pe = (t, e) => ({
        disabled: t,
        currentPage: e
    }),
    Si = (t, e, o) => ({
        disabled: t,
        $implicit: e,
        currentPage: o
    });

function Mi(t, e) {
    if (t & 1) {
        let o = E();
        f(0, "li", 11)(1, "a", 12), b("click", function(n) {
            S(o);
            let s = d();
            return M(s.selectPage(1, n))
        }), X(2, 13), g()()
    }
    if (t & 2) {
        let o = d(),
            i = T(13);
        v("disabled", o.noPrevious() || o.disabled), c(2), _("ngTemplateOutlet", o.customFirstTemplate || i)("ngTemplateOutletContext", P(4, pe, o.noPrevious() || o.disabled, o.page))
    }
}

function Ci(t, e) {
    if (t & 1) {
        let o = E();
        f(0, "li", 14)(1, "a", 12), b("click", function(n) {
            S(o);
            let s = d();
            return M(s.selectPage(s.page - 1, n))
        }), X(2, 13), g()()
    }
    if (t & 2) {
        let o = d(),
            i = T(11);
        v("disabled", o.noPrevious() || o.disabled), c(2), _("ngTemplateOutlet", o.customPreviousTemplate || i)("ngTemplateOutletContext", P(4, pe, o.noPrevious() || o.disabled, o.page))
    }
}

function Ei(t, e) {
    if (t & 1) {
        let o = E();
        f(0, "li", 15)(1, "a", 12), b("click", function(n) {
            let s = S(o).$implicit,
                a = d();
            return M(a.selectPage(s.number, n))
        }), X(2, 13), g()()
    }
    if (t & 2) {
        let o = e.$implicit,
            i = d(),
            n = T(7);
        v("active", o.active)("disabled", i.disabled && !o.active), c(2), _("ngTemplateOutlet", i.customPageTemplate || n)("ngTemplateOutletContext", ne(6, Si, i.disabled, o, i.page))
    }
}

function Ri(t, e) {
    if (t & 1) {
        let o = E();
        f(0, "li", 16)(1, "a", 12), b("click", function(n) {
            S(o);
            let s = d();
            return M(s.selectPage(s.page + 1, n))
        }), X(2, 13), g()()
    }
    if (t & 2) {
        let o = d(),
            i = T(9);
        v("disabled", o.noNext() || o.disabled), c(2), _("ngTemplateOutlet", o.customNextTemplate || i)("ngTemplateOutletContext", P(4, pe, o.noNext() || o.disabled, o.page))
    }
}

function Pi(t, e) {
    if (t & 1) {
        let o = E();
        f(0, "li", 17)(1, "a", 12), b("click", function(n) {
            S(o);
            let s = d();
            return M(s.selectPage(s.totalPages, n))
        }), X(2, 13), g()()
    }
    if (t & 2) {
        let o = d(),
            i = T(15);
        v("disabled", o.noNext() || o.disabled), c(2), _("ngTemplateOutlet", o.customLastTemplate || i)("ngTemplateOutletContext", P(4, pe, o.noNext() || o.disabled, o.page))
    }
}

function xi(t, e) {
    if (t & 1 && R(0), t & 2) {
        let o = e.$implicit;
        k(o.text)
    }
}

function ki(t, e) {
    if (t & 1 && R(0), t & 2) {
        let o = d();
        k(o.getText("next"))
    }
}

function Ii(t, e) {
    if (t & 1 && R(0), t & 2) {
        let o = d();
        k(o.getText("previous"))
    }
}

function Ni(t, e) {
    if (t & 1 && R(0), t & 2) {
        let o = d();
        k(o.getText("first"))
    }
}

function Ai(t, e) {
    if (t & 1 && R(0), t & 2) {
        let o = d();
        k(o.getText("last"))
    }
}
var vt = (() => {
        let e = class e {
            constructor() {
                this.main = {
                    itemsPerPage: 10,
                    boundaryLinks: !1,
                    directionLinks: !0,
                    firstText: "First",
                    previousText: "Previous",
                    nextText: "Next",
                    lastText: "Last",
                    pageBtnClass: "",
                    rotate: !0
                }, this.pager = {
                    itemsPerPage: 15,
                    previousText: "\xAB Previous",
                    nextText: "Next \xBB",
                    pageBtnClass: "",
                    align: !0
                }
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275prov = A({
            token: e,
            factory: e.\u0275fac,
            providedIn: "root"
        });
        let t = e;
        return t
    })(),
    Fi = {
        provide: we,
        useExisting: oe(() => Bi),
        multi: !0
    },
    Bi = (() => {
        let e = class e {
            constructor(i, n, s) {
                this.elementRef = i, this.changeDetection = s, this.align = !1, this.boundaryLinks = !1, this.directionLinks = !0, this.firstText = "First", this.previousText = "\xAB Previous", this.nextText = "Next \xBB", this.lastText = "Last", this.rotate = !0, this.pageBtnClass = "", this.disabled = !1, this.numPages = new F, this.pageChanged = new F, this.onChange = Function.prototype, this.onTouched = Function.prototype, this.classMap = "", this.inited = !1, this._itemsPerPage = 15, this._totalItems = 0, this._totalPages = 0, this._page = 1, this.elementRef = i, this.config || this.configureOptions(Object.assign({}, n.main, n.pager))
            }
            get itemsPerPage() {
                return this._itemsPerPage
            }
            set itemsPerPage(i) {
                this._itemsPerPage = i, this.totalPages = this.calculateTotalPages()
            }
            get totalItems() {
                return this._totalItems
            }
            set totalItems(i) {
                this._totalItems = i, this.totalPages = this.calculateTotalPages()
            }
            get totalPages() {
                return this._totalPages
            }
            set totalPages(i) {
                this._totalPages = i, this.numPages.emit(i), this.inited && this.selectPage(this.page)
            }
            get page() {
                return this._page
            }
            set page(i) {
                let n = this._page;
                this._page = i > this.totalPages ? this.totalPages : i || 1, this.changeDetection.markForCheck(), !(n === this._page || typeof n > "u") && this.pageChanged.emit({
                    page: this._page,
                    itemsPerPage: this.itemsPerPage
                })
            }
            configureOptions(i) {
                this.config = Object.assign({}, i)
            }
            ngOnInit() {
                typeof window < "u" && (this.classMap = this.elementRef.nativeElement.getAttribute("class") || ""), typeof this.maxSize > "u" && (this.maxSize = this.config ? .maxSize || 0), typeof this.rotate > "u" && (this.rotate = !!this.config ? .rotate), typeof this.boundaryLinks > "u" && (this.boundaryLinks = !!this.config ? .boundaryLinks), typeof this.directionLinks > "u" && (this.directionLinks = !!this.config ? .directionLinks), typeof this.pageBtnClass > "u" && (this.pageBtnClass = this.config ? .pageBtnClass || ""), typeof this.itemsPerPage > "u" && (this.itemsPerPage = this.config ? .itemsPerPage || 0), this.totalPages = this.calculateTotalPages(), this.pages = this.getPages(this.page, this.totalPages), this.inited = !0
            }
            writeValue(i) {
                this.page = i, this.pages = this.getPages(this.page, this.totalPages)
            }
            getText(i) {
                return this[`${i}Text`] || this.config[`${i}Text`]
            }
            noPrevious() {
                return this.page === 1
            }
            noNext() {
                return this.page === this.totalPages
            }
            registerOnChange(i) {
                this.onChange = i
            }
            registerOnTouched(i) {
                this.onTouched = i
            }
            selectPage(i, n) {
                n && n.preventDefault(), this.disabled || (n && n.target && n.target.blur(), this.writeValue(i), this.onChange(this.page))
            }
            makePage(i, n, s) {
                return {
                    text: n,
                    number: i,
                    active: s
                }
            }
            getPages(i, n) {
                let s = [],
                    a = 1,
                    r = n,
                    m = typeof this.maxSize < "u" && this.maxSize < n;
                m && this.maxSize && (this.rotate ? (a = Math.max(i - Math.floor(this.maxSize / 2), 1), r = a + this.maxSize - 1, r > n && (r = n, a = r - this.maxSize + 1)) : (a = (Math.ceil(i / this.maxSize) - 1) * this.maxSize + 1, r = Math.min(a + this.maxSize - 1, n)));
                for (let l = a; l <= r; l++) {
                    let y = this.makePage(l, l.toString(), l === i);
                    s.push(y)
                }
                if (m && !this.rotate) {
                    if (a > 1) {
                        let l = this.makePage(a - 1, "...", !1);
                        s.unshift(l)
                    }
                    if (r < n) {
                        let l = this.makePage(r + 1, "...", !1);
                        s.push(l)
                    }
                }
                return s
            }
            calculateTotalPages() {
                let i = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
                return Math.max(i || 0, 1)
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)(H(K), H(vt), H(J))
        }, e.\u0275cmp = z({
            type: e,
            selectors: [
                ["pager"]
            ],
            inputs: {
                align: "align",
                maxSize: "maxSize",
                boundaryLinks: "boundaryLinks",
                directionLinks: "directionLinks",
                firstText: "firstText",
                previousText: "previousText",
                nextText: "nextText",
                lastText: "lastText",
                rotate: "rotate",
                pageBtnClass: "pageBtnClass",
                disabled: "disabled",
                itemsPerPage: "itemsPerPage",
                totalItems: "totalItems"
            },
            outputs: {
                numPages: "numPages",
                pageChanged: "pageChanged"
            },
            features: [le([Fi])],
            decls: 7,
            vars: 22,
            consts: [
                [1, "pager"],
                [3, "ngClass"],
                ["href", "", 3, "click"]
            ],
            template: function(n, s) {
                n & 1 && (f(0, "ul", 0)(1, "li", 1)(2, "a", 2), b("click", function(r) {
                    return s.selectPage(s.page - 1, r)
                }), R(3), g()(), f(4, "li", 1)(5, "a", 2), b("click", function(r) {
                    return s.selectPage(s.page + 1, r)
                }), R(6), g()()()), n & 2 && (c(), $(s.pageBtnClass), v("disabled", s.noPrevious())("previous", s.align), _("ngClass", P(16, wi, s.align, s.align)), c(2), k(s.getText("previous")), c(), $(s.pageBtnClass), v("disabled", s.noNext())("next", s.align), _("ngClass", P(19, Oi, s.align, s.align)), c(2), k(s.getText("next")))
            },
            dependencies: [De],
            encapsulation: 2
        });
        let t = e;
        return t
    })(),
    Ui = {
        provide: we,
        useExisting: oe(() => Li),
        multi: !0
    },
    Li = (() => {
        let e = class e {
            constructor(i, n, s) {
                this.elementRef = i, this.changeDetection = s, this.align = !0, this.boundaryLinks = !1, this.directionLinks = !0, this.rotate = !0, this.pageBtnClass = "", this.disabled = !1, this.numPages = new F, this.pageChanged = new F, this.onChange = Function.prototype, this.onTouched = Function.prototype, this.classMap = "", this.inited = !1, this._itemsPerPage = 10, this._totalItems = 0, this._totalPages = 0, this._page = 1, this.elementRef = i, this.config || this.configureOptions(n.main)
            }
            get itemsPerPage() {
                return this._itemsPerPage
            }
            set itemsPerPage(i) {
                this._itemsPerPage = i, this.totalPages = this.calculateTotalPages()
            }
            get totalItems() {
                return this._totalItems
            }
            set totalItems(i) {
                this._totalItems = i, this.totalPages = this.calculateTotalPages()
            }
            get totalPages() {
                return this._totalPages
            }
            set totalPages(i) {
                this._totalPages = i, this.numPages.emit(i), this.inited && this.selectPage(this.page)
            }
            get page() {
                return this._page
            }
            set page(i) {
                let n = this._page;
                this._page = i > this.totalPages ? this.totalPages : i || 1, this.changeDetection.markForCheck(), !(n === this._page || typeof n > "u") && this.pageChanged.emit({
                    page: this._page,
                    itemsPerPage: this.itemsPerPage
                })
            }
            configureOptions(i) {
                this.config = Object.assign({}, i)
            }
            ngOnInit() {
                typeof window < "u" && (this.classMap = this.elementRef.nativeElement.getAttribute("class") || ""), typeof this.maxSize > "u" && (this.maxSize = this.config ? .maxSize || 0), typeof this.rotate > "u" && (this.rotate = !!this.config ? .rotate), typeof this.boundaryLinks > "u" && (this.boundaryLinks = !!this.config ? .boundaryLinks), typeof this.directionLinks > "u" && (this.directionLinks = !!this.config ? .directionLinks), typeof this.pageBtnClass > "u" && (this.pageBtnClass = this.config ? .pageBtnClass || ""), typeof this.itemsPerPage > "u" && (this.itemsPerPage = this.config ? .itemsPerPage || 0), this.totalPages = this.calculateTotalPages(), this.pages = this.getPages(this.page, this.totalPages), this.inited = !0
            }
            writeValue(i) {
                this.page = i, this.pages = this.getPages(this.page, this.totalPages)
            }
            getText(i) {
                return this[`${i}Text`] || this.config[`${i}Text`]
            }
            noPrevious() {
                return this.page === 1
            }
            noNext() {
                return this.page === this.totalPages
            }
            registerOnChange(i) {
                this.onChange = i
            }
            registerOnTouched(i) {
                this.onTouched = i
            }
            selectPage(i, n) {
                n && n.preventDefault(), this.disabled || (n && n.target && n.target.blur(), this.writeValue(i), this.onChange(this.page))
            }
            makePage(i, n, s) {
                return {
                    text: n,
                    number: i,
                    active: s
                }
            }
            getPages(i, n) {
                let s = [],
                    a = 1,
                    r = n,
                    m = typeof this.maxSize < "u" && this.maxSize < n;
                m && this.maxSize && (this.rotate ? (a = Math.max(i - Math.floor(this.maxSize / 2), 1), r = a + this.maxSize - 1, r > n && (r = n, a = r - this.maxSize + 1)) : (a = (Math.ceil(i / this.maxSize) - 1) * this.maxSize + 1, r = Math.min(a + this.maxSize - 1, n)));
                for (let l = a; l <= r; l++) {
                    let y = this.makePage(l, l.toString(), l === i);
                    s.push(y)
                }
                if (m && !this.rotate) {
                    if (a > 1) {
                        let l = this.makePage(a - 1, "...", !1);
                        s.unshift(l)
                    }
                    if (r < n) {
                        let l = this.makePage(r + 1, "...", !1);
                        s.push(l)
                    }
                }
                return s
            }
            calculateTotalPages() {
                let i = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
                return Math.max(i || 0, 1)
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)(H(K), H(vt), H(J))
        }, e.\u0275cmp = z({
            type: e,
            selectors: [
                ["pagination"]
            ],
            inputs: {
                align: "align",
                maxSize: "maxSize",
                boundaryLinks: "boundaryLinks",
                directionLinks: "directionLinks",
                firstText: "firstText",
                previousText: "previousText",
                nextText: "nextText",
                lastText: "lastText",
                rotate: "rotate",
                pageBtnClass: "pageBtnClass",
                disabled: "disabled",
                customPageTemplate: "customPageTemplate",
                customNextTemplate: "customNextTemplate",
                customPreviousTemplate: "customPreviousTemplate",
                customFirstTemplate: "customFirstTemplate",
                customLastTemplate: "customLastTemplate",
                itemsPerPage: "itemsPerPage",
                totalItems: "totalItems"
            },
            outputs: {
                numPages: "numPages",
                pageChanged: "pageChanged"
            },
            features: [le([Ui])],
            decls: 16,
            vars: 6,
            consts: [
                ["defaultPageTemplate", ""],
                ["defaultNextTemplate", ""],
                ["defaultPreviousTemplate", ""],
                ["defaultFirstTemplate", ""],
                ["defaultLastTemplate", ""],
                [1, "pagination", 3, "ngClass"],
                ["class", "pagination-first page-item", 3, "disabled", 4, "ngIf"],
                ["class", "pagination-prev page-item", 3, "disabled", 4, "ngIf"],
                ["class", "pagination-page page-item", 3, "active", "disabled", 4, "ngFor", "ngForOf"],
                ["class", "pagination-next page-item", 3, "disabled", 4, "ngIf"],
                ["class", "pagination-last page-item", 3, "disabled", 4, "ngIf"],
                [1, "pagination-first", "page-item"],
                ["href", "", 1, "page-link", 3, "click"],
                [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
                [1, "pagination-prev", "page-item"],
                [1, "pagination-page", "page-item"],
                [1, "pagination-next", "page-item"],
                [1, "pagination-last", "page-item"]
            ],
            template: function(n, s) {
                n & 1 && (f(0, "ul", 5), C(1, Mi, 3, 7, "li", 6)(2, Ci, 3, 7, "li", 7)(3, Ei, 3, 10, "li", 8)(4, Ri, 3, 7, "li", 9)(5, Pi, 3, 7, "li", 10), g(), C(6, xi, 1, 1, "ng-template", null, 0, D)(8, ki, 1, 1, "ng-template", null, 1, D)(10, Ii, 1, 1, "ng-template", null, 2, D)(12, Ni, 1, 1, "ng-template", null, 3, D)(14, Ai, 1, 1, "ng-template", null, 4, D)), n & 2 && (_("ngClass", s.classMap), c(), _("ngIf", s.boundaryLinks), c(), _("ngIf", s.directionLinks), c(), _("ngForOf", s.pages), c(), _("ngIf", s.directionLinks), c(), _("ngIf", s.boundaryLinks))
            },
            dependencies: [De, We, de, Je],
            encapsulation: 2
        });
        let t = e;
        return t
    })(),
    as = (() => {
        let e = class e {
            static forRoot() {
                return {
                    ngModule: e,
                    providers: []
                }
            }
        };
        e.\u0275fac = function(n) {
            return new(n || e)
        }, e.\u0275mod = p({
            type: e
        }), e.\u0275inj = u({
            imports: [Ye]
        });
        let t = e;
        return t
    })();
export {
    Wn as a, ct as b, Yn as c, as as d
};