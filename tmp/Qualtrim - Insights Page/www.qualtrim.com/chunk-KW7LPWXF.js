import {
    a as lt,
    b as dt,
    d as ci
} from "./chunk-ORQPS5D2.js";
import {
    a as mi,
    b as pi,
    c as ui
} from "./chunk-WAKQ47PO.js";
import {
    a as li,
    c as di
} from "./chunk-GOWZIF6K.js";
import {
    a as oi,
    b as si
} from "./chunk-J53P3FH5.js";
import {
    $a as Be,
    Ac as ii,
    Bc as ni,
    E as Yt,
    J as mt,
    Ja as Jt,
    Kc as ri,
    Lc as ai,
    Ma as ut,
    U as pt,
    Ya as we,
    Za as Ue,
    _a as Zt,
    ab as We,
    eb as gt,
    gb as qe,
    q as Gt,
    u as Qt,
    ud as Te,
    vc as Xt,
    vd as ke,
    yc as ei,
    zc as ti
} from "./chunk-NO4XYT7V.js";
import {
    b as rt,
    c as J,
    e as Q,
    g as z,
    h as ye,
    i as Wt,
    j as se,
    k as ze,
    l as at,
    n as qt,
    o as xe,
    p as ve,
    q as Ce,
    r as le,
    s as de,
    t as ot,
    u as st,
    v as Kt,
    x as Se,
    y as ce,
    z as Me
} from "./chunk-6FMDYVJO.js";
import {
    g as Ot,
    h as Le,
    i as zt,
    l as Oe,
    m as Ut,
    n as Bt,
    o as Ye
} from "./chunk-MOBVBKOE.js";
import {
    l as Ht,
    m as ct
} from "./chunk-SUZ3XW2S.js";
import {
    $b as u,
    $c as M,
    Aa as C,
    Ac as et,
    Ba as B,
    Ca as oe,
    Cb as E,
    Cc as tt,
    Db as It,
    Dc as l,
    E as Ie,
    Ec as T,
    F as Ft,
    Fc as x,
    Gc as ge,
    Hb as Y,
    Hc as it,
    I as Et,
    Ia as F,
    Id as fe,
    Jc as ie,
    Jd as $e,
    Kc as ne,
    Kd as nt,
    Lc as re,
    M as Ee,
    Na as Dt,
    Pc as $t,
    Pd as _e,
    Q as Re,
    S as vt,
    Sd as je,
    Td as be,
    Ub as _,
    Uc as he,
    V as Ne,
    Vc as Qe,
    Wb as b,
    Wc as jt,
    Xd as D,
    Y as V,
    Yb as Ve,
    Zb as $,
    _b as j,
    ac as n,
    ad as k,
    ba as Xe,
    bc as a,
    bd as Pe,
    cc as g,
    da as L,
    dc as Ct,
    dd as Lt,
    ec as St,
    ee as H,
    f as W,
    g as I,
    ga as ae,
    gd as O,
    ha as q,
    ia as Pt,
    ja as He,
    jc as A,
    kb as c,
    kc as Rt,
    nc as h,
    p as xt,
    pa as K,
    pc as p,
    q as Ze,
    qa as At,
    ta as G,
    tc as X,
    uc as ee,
    vc as te,
    w as U,
    wb as w,
    yc as Nt,
    za as v,
    zc as Vt
} from "./chunk-7LZCJGQ2.js";
import {
    a as P,
    b as pe
} from "./chunk-TXK3PDXI.js";
var ht = (() => {
    let o = class o {
        constructor(e) {
            this._http = e, this._currentFilter = new I({}), this._userLoading = new I(!0), this._usersResponse = this._currentFilter.pipe(He(() => this._userLoading.next(!0)), ae(t => this._http.get("/api/admin/users", {
                params: P({}, t)
            }).pipe(V(() => this._userLoading.next(!1)))), L({
                bufferSize: 1,
                refCount: !0
            })), this.users$ = this._usersResponse.pipe(U(t => t.users), L({
                bufferSize: 1,
                refCount: !0
            })), this.userStats$ = this._http.get("/api/admin/users/stats").pipe(U(t => t), L({
                bufferSize: 1,
                refCount: !0
            })), this.meta$ = this._usersResponse.pipe(U(t => t.meta), L({
                bufferSize: 1,
                refCount: !0
            })), this.currentFilter$ = this._currentFilter.pipe(L({
                refCount: !0,
                bufferSize: 1
            })), this.loading$ = this._userLoading.pipe(Ne(), L({
                bufferSize: 1,
                refCount: !0
            }))
        }
        setFilter(e) {
            this._currentFilter.next(e)
        }
        updateUser(e, t) {
            return this._http.patch(`/api/admin/users/${e}`, t)
        }
        toggleUserAdmin(e) {
            return this._http.patch(`/api/admin/users/${e.id}`, {
                isAdmin: !e.isAdmin
            })
        }
        loginAsUser(e) {
            return this._http.post(`/api/admin/login-as/${e}`, {})
        }
        setTemporaryPassword(e, t) {
            return this._http.patch(`/api/admin/users/${t}`, {
                temporaryPassword: e
            })
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(G(H))
    }, o.\u0275prov = K({
        token: o,
        factory: o.\u0275fac,
        providedIn: "root"
    });
    let r = o;
    return r
})();

function Li(r, o) {
    if (r & 1 && (n(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "div", 6)(5, "div", 7)(6, "div", 8), l(7), M(8, "number"), a()(), n(9, "div", 9), l(10, " Total Current Users "), a()(), n(11, "div", 6)(12, "div", 7)(13, "div", 10), l(14), M(15, "number"), a()(), n(16, "div", 9), l(17, " Active Users "), a()(), n(18, "div", 6)(19, "div", 7)(20, "div", 10), l(21), M(22, "number"), a()(), n(23, "div", 9), l(24, " Subscriptions Ending Soon "), a()(), n(25, "div", 6)(26, "div", 7)(27, "div", 10), l(28), M(29, "number"), a()(), n(30, "div", 9), l(31, " Temporary Passwords "), a()(), n(32, "div", 6)(33, "div", 7)(34, "div", 10), l(35), M(36, "number"), a()(), n(37, "div", 9), l(38, " Permanent Subs "), a()()()()()()), r & 2) {
        let s = o;
        c(7), x(" ", k(8, 5, s.total), " "), c(7), x(" ", k(15, 7, s.subscribed), " "), c(7), x(" ", k(22, 9, s.endingSoon), " "), c(7), x(" ", k(29, 11, s.temporaryPassword), " "), c(7), x(" ", k(36, 13, s.permanentSubscription), " ")
    }
}
var hi = (() => {
    let o = class o {
        constructor(e) {
            this._users = e, this.userStats$ = this._users.userStats$
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(w(ht))
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-user-stats"]
        ],
        standalone: !1,
        decls: 4,
        vars: 3,
        consts: [
            [1, "card", "mb-5", "mb-xxl-8"],
            [1, "card-body", "pt-8", "pb-6"],
            [1, "flex-grow-1"],
            [1, "d-flex", "flex-wrap", "flex-stack"],
            [1, "d-flex", "flex-column", "flex-grow-1", "pe-8"],
            [1, "d-flex", "flex-wrap"],
            [1, "border", "border-gray-300", "dark:border-gray-600", "border-dashed", "rounded", "min-w-125px", "py-3", "px-4", "me-6", "mb-3"],
            [1, "d-flex", "align-items-center"],
            [1, "fs-2", "fw-bold", "counted"],
            [1, "fw-semibold", "fs-6", "text-gray-400", "dark:text-gray-300"],
            ["data-kt-countup", "true", "data-kt-countup-value", "80", "data-kt-initialized", "1", 1, "fs-2", "fw-bold", "counted"]
        ],
        template: function(t, i) {
            if (t & 1 && (n(0, "div", 0)(1, "div", 1), _(2, Li, 39, 15, "div", 2), M(3, "async"), a()()), t & 2) {
                let d;
                c(2), b((d = k(3, 1, i.userStats$)) ? 2 : -1, d)
            }
        },
        dependencies: [_e, be],
        encapsulation: 2
    });
    let r = o;
    return r
})();
var Bi = ["temporaryPassword"],
    ft = (r, o) => ({
        "text-bg-primary": r,
        "text-bg-secondary": o
    }),
    Wi = (r, o) => o.id;

function qi(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 8)(1, "span", 9), h("click", function() {
            v(s);
            let t = p();
            return C(t.setPresetFilter("active"))
        }), l(2, "Active"), a(), l(3, "\xA0 "), n(4, "span", 9), h("click", function() {
            v(s);
            let t = p();
            return C(t.setPresetFilter("endingSoon"))
        }), l(5, "Ending Soon"), a(), l(6, "\xA0 "), n(7, "span", 9), h("click", function() {
            v(s);
            let t = p();
            return C(t.setPresetFilter("temporaryPassword"))
        }), l(8, "Temporary Passwords"), a(), l(9, "\xA0 "), n(10, "span", 9), h("click", function() {
            v(s);
            let t = p();
            return C(t.setPresetFilter("permanentSubscription"))
        }), l(11, "Permanent Sub"), a()(), n(12, "div", 10), g(13, "input", 11), n(14, "label", 12), l(15, "Search"), a()()
    }
    if (r & 2) {
        let s = o,
            e = p();
        c(), u("ngClass", Qe(5, ft, s === "active", s !== "active")), c(3), u("ngClass", Qe(8, ft, s === "endingSoon", s !== "endingSoon")), c(3), u("ngClass", Qe(11, ft, s === "temporaryPassword", s !== "temporaryPassword")), c(3), u("ngClass", Qe(14, ft, s === "permanentSubscription", s !== "permanentSubscription")), c(3), u("formControl", e.searchControl)
    }
}

function Ki(r, o) {
    if (r & 1 && (n(0, "span", 36), l(1), M(2, "date"), a()), r & 2) {
        let s = p().$implicit;
        c(), T(k(2, 1, s.subscription.startDate))
    }
}

function Gi(r, o) {
    r & 1 && (n(0, "span", 36), l(1, "Not Subscribed"), a())
}

function Hi(r, o) {
    if (r & 1 && (n(0, "span", 36), l(1), M(2, "date"), a()), r & 2) {
        let s = p().$implicit;
        c(), T(k(2, 1, s.subscription.endDate))
    }
}

function Qi(r, o) {
    r & 1 && (n(0, "span", 36), l(1, "Not Subscribed"), a())
}

function Yi(r, o) {
    r & 1 && (n(0, "span", 39), l(1, "Admin"), a())
}

function Ji(r, o) {
    r & 1 && (n(0, "span", 45), l(1, "Subscribed"), a())
}

function Zi(r, o) {
    r & 1 && (n(0, "span", 46), l(1, "Not Active"), a())
}

function Xi(r, o) {
    r & 1 && (n(0, "span", 47), l(1, "Not subscribed"), a())
}

function en(r, o) {
    if (r & 1 && _(0, Ji, 2, 0, "span", 45)(1, Zi, 2, 0, "span", 46)(2, Xi, 2, 0, "span", 47), r & 2) {
        let s = p().$implicit;
        b(s.hasSubscription && s.hasActiveSubscription ? 0 : s.hasSubscription && !s.hasActiveSubscription ? 1 : s.hasSubscription ? -1 : 2)
    }
}

function tn(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "ul", 51)(1, "li", 52)(2, "a", 53), h("click", function() {
            v(s);
            let t = p(2).$implicit,
                i = p(2),
                d = Nt(17);
            return C(i.openTemporaryPassword(d, t))
        }), l(3, "Set Temporary Password"), a()(), n(4, "li", 52)(5, "a", 53), h("click", function() {
            v(s);
            let t = p(2).$implicit,
                i = p(2);
            return C(i.loginAsUser(t))
        }), l(6, "Login as"), a()()()
    }
}

function nn(r, o) {
    if (r & 1 && (n(0, "div", 44)(1, "button", 48), g(2, "fa-icon", 49), a(), Y(3, tn, 7, 0, "ul", 50), a()), r & 2) {
        let s = p(3);
        c(2), u("icon", s.icons.ellipsis)
    }
}

function rn(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "tr")(1, "td")(2, "div", 29)(3, "div", 30)(4, "span", 31), l(5), a()(), n(6, "div", 32)(7, "span", 33), l(8), a(), n(9, "span", 34), l(10), a()()()(), n(11, "td", 35)(12, "span", 36), l(13), M(14, "date"), a()(), n(15, "td", 35), _(16, Ki, 3, 3, "span", 36)(17, Gi, 2, 0, "span", 36), a(), n(18, "td", 35), _(19, Hi, 3, 3, "span", 36)(20, Qi, 2, 0, "span", 36), a(), n(21, "td", 37)(22, "span", 36), l(23), a()(), n(24, "td", 37)(25, "span", 36), l(26), a()(), n(27, "td", 38), _(28, Yi, 2, 0, "span", 39)(29, en, 3, 1), a(), n(30, "td", 40)(31, "div", 41)(32, "ng-select", 42), h("change", function(t) {
            let i = v(s).$implicit,
                d = p(2);
            return C(d.changeRole(t, i))
        }), a()()(), n(33, "td", 40)(34, "div", 41)(35, "input", 43), h("change", function(t) {
            let i = v(s).$implicit,
                d = p(2);
            return C(d.togglePermanentSubscription(t, i))
        }), a()()(), n(36, "td", 40)(37, "div", 41)(38, "input", 43), h("change", function(t) {
            let i = v(s).$implicit,
                d = p(2);
            return C(d.toggleDisabled(t, i))
        }), a()()(), n(39, "td", 40)(40, "div", 41)(41, "input", 43), h("change", function(t) {
            let i = v(s).$implicit,
                d = p(2);
            return C(d.toggleStaging(t, i))
        }), a()()(), n(42, "td", 40), _(43, nn, 4, 1, "div", 44), a()()
    }
    if (r & 2) {
        let s = o.$implicit,
            e = p(),
            t = p();
        c(5), ge("", s.firstName.slice(0, 1), "", s.lastName.slice(0, 1)), c(3), ge("", s.firstName, " ", s.lastName), c(2), T(s.email), c(3), T(k(14, 27, s.createdAt)), c(3), b(s.subscription && s.subscription.startDate ? 16 : 17), c(3), b(s.subscription ? 19 : 20), c(4), T((s.portfolios == null ? null : s.portfolios.length) || 0), c(3), T((s.watchlists == null ? null : s.watchlists.length) || 0), c(2), b(s.role === "admin" ? 28 : 29), c(4), u("items", t.userRoles)("clearable", !1)("disabled", e.id === s.id)("searchable", !1)("placeholder", "Select Role")("ngModel", s.role), c(3), u("disabled", e.id === s.id)("checked", s.permanentSubscription)("id", s.id + "permanentSubscription"), c(3), u("disabled", e.id === s.id)("checked", s.isDisabled)("id", s.id + "disabled"), c(3), u("disabled", e.id === s.id)("checked", s.isStaging)("id", s.id + "staging"), c(2), b(e.id !== s.id ? 43 : -1)
    }
}

function an(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 13)(1, "qualtrim-loading-overlay", 14), M(2, "async"), n(3, "table", 15)(4, "thead")(5, "tr", 16)(6, "th", 17), l(7, "USER"), a(), n(8, "th", 17), l(9, "CREATED"), a(), n(10, "th", 17), l(11, "SUBSCRIBED AT"), a(), n(12, "th", 18), l(13, "END AT"), a(), n(14, "th", 19), l(15, "PORTFOLIOS"), a(), n(16, "th", 19), l(17, "WATCHLISTS"), a(), n(18, "th", 20), l(19, "STATUS"), a(), n(20, "th", 21), l(21, "ROLE"), a(), n(22, "th", 19), l(23, "PERM SUB"), a(), n(24, "th", 19), l(25, "DISABLED"), a(), n(26, "th", 19), l(27, "STAGING"), a(), g(28, "th", 22), a()(), n(29, "tbody"), $(30, rn, 44, 29, "tr", null, Wi), M(32, "async"), a()()()(), n(33, "div", 23)(34, "ngb-pagination", 24), M(35, "async"), M(36, "async"), M(37, "async"), h("pageChange", function(t) {
            v(s);
            let i = p();
            return C(i.pageChanged(t))
        }), a(), n(38, "div", 25)(39, "select", 26), M(40, "async"), h("change", function(t) {
            v(s);
            let i = p();
            return C(i.pageSizeChanged(t))
        }), n(41, "option", 27), l(42, "10"), a(), n(43, "option", 27), l(44, "20"), a(), n(45, "option", 27), l(46, "30"), a(), n(47, "option", 27), l(48, "40"), a()(), n(49, "label", 28), l(50, "Page Size"), a()()()
    }
    if (r & 2) {
        let s = p();
        c(), u("loading", k(2, 11, s.loading$)), c(29), j(k(32, 13, s.users$)), c(4), u("collectionSize", k(35, 15, s.totalItems$) || 10)("pageSize", k(36, 17, s.pageSize$) || 10)("maxSize", 5)("rotate", !0)("page", k(37, 19, s.currentPage$) || 1), c(5), u("value", k(40, 21, s.pageSize$)), c(2), u("value", 10), c(2), u("value", 20), c(2), u("value", 30), c(2), u("value", 40)
    }
}

function on(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 54)(1, "h4", 55), l(2, "Set Temporary Password"), a(), n(3, "button", 56), h("click", function() {
            v(s);
            let t = p();
            return C(t.modalRef == null ? null : t.modalRef.hide())
        }), n(4, "span", 57), l(5, "\xD7"), a()()(), n(6, "div", 58)(7, "form", 59), g(8, "input", 60), n(9, "div", 61), g(10, "input", 62), n(11, "label", 63), l(12, "Temporary Password"), a()()()(), n(13, "div", 64)(14, "button", 65), h("click", function() {
            v(s);
            let t = p();
            return C(t.modalRef == null ? null : t.modalRef.hide())
        }), l(15, " Close "), a(), n(16, "button", 66), M(17, "async"), h("click", function() {
            v(s);
            let t = p();
            return C(t.setTemporaryPassword())
        }), n(18, "qualtrim-loading-indicator", 14), M(19, "async"), l(20, "Set Temporary Password"), a()()()
    }
    if (r & 2) {
        let s = p();
        c(7), u("formGroup", s.temporaryPasswordForm), c(9), u("disabled", k(17, 3, s.setTemporaryPasswordLoading$) || s.temporaryPasswordForm.pristine), c(2), u("loading", k(19, 5, s.setTemporaryPasswordLoading$) === !0)
    }
}
var _i = (() => {
    let o = class o {
        constructor(e, t, i, d, m, f, y, S) {
            this._users = e, this._http = t, this._fb = i, this._modalService = d, this._currentUser = m, this._toastr = f, this._activatedRoute = y, this._router = S, this._onDestroy = new W, this._setTemporaryPasswordLoading = new I(!1), this._currentPage = new I(1), this._search = new I(""), this._pageSize = new I(10), this.setTemporaryPasswordLoading$ = this._setTemporaryPasswordLoading.asObservable(), this.users$ = this._users.users$, this.currentUser$ = this._currentUser.currentUser$, this.loading$ = this._users.loading$, this.totalItems$ = this._users.meta$.pipe(U(N => N.total)), this.icons = {
                ellipsis: Yt
            }, this.temporaryPasswordForm = this._fb.group({
                id: ["", Q.required],
                temporaryPassword: ["", Q.compose([Q.required, Q.minLength(6)])]
            }), this.currentPage$ = this._currentPage.asObservable(), this.pageSize$ = this._pageSize.asObservable(), this.searchControl = new Wt(""), this.currentPresetFilter$ = this._activatedRoute.queryParamMap.pipe(U(N => N.get("presetFilter") || "all")), this.userRoles = [{
                value: ct.User,
                label: "User"
            }, {
                value: ct.Admin,
                label: "Admin"
            }, {
                value: ct.KPI,
                label: "KPI"
            }]
        }
        ngOnInit() {
            this._setFilterFormFromQuery(this._activatedRoute.snapshot.queryParamMap), this._activatedRoute.queryParamMap.pipe(q(this._onDestroy)).subscribe(e => {
                let t = {};
                e.has("search") && (t.search = e.get("search")), e.has("currentPage") && (t.currentPage = parseInt(e.get("currentPage") || "1")), e.has("pageSize") && (t.pageSize = parseInt(e.get("pageSize") || "10")), e.has("presetFilter") && (t.presetFilter = e.get("presetFilter")), this._users.setFilter(t)
            }), this._pageSize.pipe(q(this._onDestroy)).subscribe(e => {
                e !== parseInt(this._activatedRoute.snapshot.queryParams.pageSize || "1") && this._router.navigate(["."], {
                    relativeTo: this._activatedRoute,
                    queryParams: {
                        pageSize: e
                    },
                    queryParamsHandling: "merge"
                })
            }), this.searchControl.valueChanges.pipe(q(this._onDestroy), Re(500)).subscribe(e => {
                if (e === "" && this._activatedRoute.snapshot.queryParams.search) {
                    let t = P({}, this._activatedRoute.snapshot.queryParams);
                    delete t.search, this._router.navigate(["."], {
                        relativeTo: this._activatedRoute,
                        queryParams: t
                    })
                } else e !== "" && this._activatedRoute.snapshot.queryParams.search !== e && this._router.navigate(["."], {
                    relativeTo: this._activatedRoute,
                    queryParams: {
                        search: e
                    },
                    queryParamsHandling: "merge"
                })
            }), this._currentPage.pipe(q(this._onDestroy)).subscribe(e => {
                e !== parseInt(this._activatedRoute.snapshot.queryParams.currentPage || "1") && this._router.navigate(["."], {
                    relativeTo: this._activatedRoute,
                    queryParams: {
                        currentPage: e
                    },
                    queryParamsHandling: "merge"
                })
            })
        }
        ngOnDestroy() {
            this._onDestroy.next(void 0)
        }
        toggleAdmin(e, t) {
            this.toggleValue(t.id, e.target.checked, "isAdmin")
        }
        togglePermanentSubscription(e, t) {
            this.toggleValue(t.id, e.target.checked, "permanentSubscription")
        }
        toggleDisabled(e, t) {
            this.toggleValue(t.id, e.target.checked, "isDisabled")
        }
        toggleStaging(e, t) {
            this.toggleValue(t.id, e.target.checked, "isStaging")
        }
        toggleValue(e, t, i) {
            this._users.updateUser(e, {
                [i]: t
            }).subscribe(() => {
                this._toastr.success("Successfully changed user")
            })
        }
        openTemporaryPassword(e, t) {
            this.temporaryPasswordForm.setValue({
                id: t.id,
                temporaryPassword: null
            }), this.modalRef = this._modalService.show(e)
        }
        setTemporaryPassword() {
            if (this.temporaryPasswordForm.valid) {
                let e = this.temporaryPasswordForm.value;
                this._setTemporaryPasswordLoading.next(!0), this._users.setTemporaryPassword(e.temporaryPassword, e.id).pipe(V(() => this._setTemporaryPasswordLoading.next(!1))).subscribe({
                    next: () => {
                        this._toastr.success("Successfully set temporary password"), this.modalRef ? .hide()
                    },
                    error: t => {
                        let i = t ? .error ? .message || "Failed to set temporary password";
                        this._toastr.error(i)
                    }
                })
            }
        }
        _setFilterFormFromQuery(e) {
            e.has("search") && (this._search.next(e.get("search")), this.searchControl.setValue(e.get("search"))), e.has("currentPage") && this._currentPage.next(parseInt(e.get("currentPage"))), e.has("pageSize") && this._pageSize.next(parseInt(e.get("pageSize")))
        }
        pageChanged(e) {
            this._currentPage.next(e)
        }
        pageSizeChanged(e) {
            this._pageSize.next(parseInt(e.target.value))
        }
        searchChanged(e) {
            this._search.next(e)
        }
        setPresetFilter(e) {
            e === this._activatedRoute.snapshot.queryParams.presetFilter ? this._router.navigate(["."], {
                relativeTo: this._activatedRoute,
                queryParams: {
                    presetFilter: null
                },
                queryParamsHandling: "merge"
            }) : this._router.navigate(["."], {
                relativeTo: this._activatedRoute,
                queryParams: {
                    presetFilter: e
                },
                queryParamsHandling: "merge"
            })
        }
        changeRole({
            value: e
        }, t) {
            this._users.updateUser(t.id, {
                role: e
            }).subscribe(() => {
                this._toastr.success("Successfully changed user role")
            })
        }
        loginAsUser(e) {
            confirm(`Are you sure you want to login as ${e.firstName} ${e.lastName}?`) && this._users.loginAsUser(e.id).subscribe(() => {
                this._toastr.success(`Successfully logged in as ${e.firstName} ${e.lastName}`), window.location.href = "/"
            }, t => {
                this._toastr.error("Failed to login as user"), console.error("Login as user failed:", t)
            })
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(w(ht), w(H), w(Se), w(Ue), w(Qt), w(Gt), w(Le), w(Oe))
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-users-list"]
        ],
        viewQuery: function(t, i) {
            if (t & 1 && X(Bi, 5), t & 2) {
                let d;
                ee(d = te()) && (i.temporaryPasswordDropdown = d.first)
            }
        },
        standalone: !1,
        decls: 18,
        vars: 11,
        consts: [
            ["temporaryPassword", ""],
            [1, "card", "card-flush", "h-md-100"],
            [1, "card-header", "pt-7"],
            [1, "card-title", "align-items-start", "flex-column"],
            [1, "card-label", "fw-bold", "text-gray-800", "dark:text-white"],
            [1, "text-gray-800", "dark:text-white"],
            [1, "card-toolbar", "d-flex", "align-items-center"],
            [1, "card-body", "pt-6"],
            [1, "navigation"],
            [1, "badge", "rounded-pill", "hoverable", 3, "click", "ngClass"],
            [1, "form-floating", "ms-4"],
            ["required", "", "type", "text", "placeholder", "Search", "autocomplete", "off", "id", "password", 1, "form-control", 3, "formControl"],
            ["for", "password"],
            [1, "table-responsive"],
            [3, "loading"],
            [1, "table", "table-row-dashed", "align-middle", "gs-0", "gy-3", "my-0"],
            [1, "fs-7", "fw-bold", "text-gray-400", "dark:text-gray-300", "border-bottom-0"],
            [1, "p-0", "pb-3", "min-w-175px", "text-start"],
            [1, "p-0", "pb-3", "min-w-100px", "text-start"],
            [1, "p-0", "pb-3", "min-w-100px", "text-end"],
            [1, "p-0", "pb-3", "min-w-175px", "text-end", "pe-12"],
            [1, "p-0", "pb-3", "min-w-150px", "text-end"],
            [1, "p-0", "pb-3", "w-50px", "text-end"],
            [1, "d-flex", "justify-content-between", "mt-5", "pt-5"],
            ["aria-label", "Default pagination", 3, "pageChange", "collectionSize", "pageSize", "maxSize", "rotate", "page"],
            [1, "form-floating"],
            ["id", "pageSize", 1, "form-select", "form-select-sm", "w-125px", 3, "change", "value"],
            [3, "value"],
            ["for", "pageSize"],
            [1, "d-flex", "align-items-center"],
            [1, "symbol", "symbol-50px", "me-3"],
            [1, "symbol-label"],
            [1, "d-flex", "justify-content-start", "flex-column"],
            ["href", "#", 1, "text-gray-800", "dark:text-white", "fw-bold", "mb-1", "fs-6"],
            [1, "text-gray-400", "dark:text-gray-300", "fw-semibold", "d-block", "fs-7"],
            [1, "text-start"],
            [1, "text-gray-600", "dark:text-gray-300", "fw-bold", "fs-6"],
            [1, "text-end", "pe-0"],
            [1, "text-end", "pe-12"],
            [1, "badge", "badge-info", "fw-bold", "py-3", "px-4", "fs-7"],
            [1, "text-end"],
            [1, "d-flex", "justify-content-end", "form-check", "form-switch"],
            ["bindLabel", "label", "bindValue", "value", 3, "change", "items", "clearable", "disabled", "searchable", "placeholder", "ngModel"],
            ["type", "checkbox", "role", "switch", 1, "form-check-input", 3, "change", "disabled", "checked", "id"],
            ["dropdown", "", "container", "body", "placement", "bottom right"],
            [1, "badge", "badge-success", "fw-bold", "py-3", "px-4", "fs-7"],
            [1, "badge", "badge-warning", "fw-bold", "py-3", "px-4", "fs-7"],
            [1, "badge", "badge-danger", "fw-bold", "py-3", "px-4", "fs-7"],
            ["dropdownToggle", "", 1, "btn", "btn-sm", "btn-icon", "btn-bg-light", "btn-active-color-primary"],
            [3, "icon"],
            ["class", "dropdown-menu dropdown-menu-end", 4, "dropdownMenu"],
            [1, "dropdown-menu", "dropdown-menu-end"],
            ["role", "menuitem"],
            ["href", "javascript:;", 1, "dropdown-item", 3, "click"],
            [1, "modal-header"],
            [1, "modal-title", "pull-left"],
            ["type", "button", "aria-label", "Close", 1, "btn-close", "close", "pull-right", 3, "click"],
            ["aria-hidden", "true", 1, "visually-hidden"],
            [1, "modal-body"],
            [3, "formGroup"],
            ["type", "hidden", "formControlName", "id"],
            [1, "form-floating", "mb-3"],
            ["type", "text", "id", "symbol", "placeholder", "Symbol", "formControlName", "temporaryPassword", 1, "form-control", "disabled"],
            ["for", "symbol"],
            [1, "modal-footer"],
            ["type", "button", 1, "btn", "btn-light", 3, "click"],
            ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"]
        ],
        template: function(t, i) {
            if (t & 1 && (g(0, "qualtrim-user-stats"), n(1, "div", 1)(2, "div", 2)(3, "h3", 3)(4, "span", 4), l(5, "Total Users: "), n(6, "span", 5), l(7), M(8, "async"), M(9, "number"), a()()(), n(10, "div", 6), _(11, qi, 16, 17), M(12, "async"), a()(), n(13, "div", 7), _(14, an, 51, 23), M(15, "async"), a()(), Y(16, on, 21, 7, "ng-template", null, 0, Lt)), t & 2) {
                let d, m;
                c(7), T(k(9, 5, k(8, 3, i.totalItems$))), c(4), b((d = k(12, 7, i.currentPresetFilter$)) ? 11 : -1, d), c(3), b((m = k(15, 9, i.currentUser$)) ? 14 : -1, m)
            }
        },
        dependencies: [fe, Be, ti, ii, ei, ze, le, de, J, z, ye, Kt, qt, xe, ve, Te, lt, se, gt, ri, hi, _e, be, je],
        encapsulation: 2
    });
    let r = o;
    return r
})();
var bi = (() => {
    let o = class o {
        constructor(e) {
            this._http = e, this._syncStatus = new I(null), this._loading = new I(!1), this._error = new I(null), this.syncStatus$ = this._syncStatus.asObservable(), this.loading$ = this._loading.asObservable(), this.error$ = this._error.asObservable(), this.syncStatus$.pipe(ae(t => t ? .inProgress ? Ft(1e4).pipe(ae(() => this.refreshStatus())) : xt(null))).subscribe(), this.refreshStatus().subscribe()
        }
        refreshStatus() {
            return this._http.get("/api/admin/sync/stocks/status").pipe(He(e => {
                e.lastSyncTime && (e.lastSyncTime = new Date(e.lastSyncTime)), this._syncStatus.next(e), this._error.next(null)
            }), Ee(e => (console.error("Failed to fetch sync status:", e), this._error.next("Failed to fetch sync status"), xt({
                inProgress: !1,
                lastSyncTime: null,
                lastSyncResult: null
            }))))
        }
        triggerSync() {
            return this._loading.next(!0), this._error.next(null), this._http.post("/api/admin/sync/stocks", {}).pipe(He(() => {
                setTimeout(() => {
                    this.refreshStatus().subscribe()
                }, 1e3)
            }), Ee(e => {
                throw console.error("Failed to trigger sync:", e), this._error.next("Failed to trigger sync"), e
            }), V(() => {
                this._loading.next(!1)
            }))
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(G(H))
    }, o.\u0275prov = K({
        token: o,
        factory: o.\u0275fac,
        providedIn: "root"
    });
    let r = o;
    return r
})();
var yi = (() => {
    let o = class o {
        constructor(e) {
            this._http = e
        }
        searchCacheEntries(e) {
            return this._http.post("/api/admin/cache/search", e)
        }
        clearCacheEntries(e) {
            return this._http.post("/api/admin/cache/clear", e)
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(G(H))
    }, o.\u0275prov = K({
        token: o,
        factory: o.\u0275fac,
        providedIn: "root"
    });
    let r = o;
    return r
})();
var xi = (r, o) => o.symbol,
    vi = (r, o) => o.cacheKey;

function dn(r, o) {
    if (r & 1 && (n(0, "div", 24), l(1), a()), r & 2) {
        let s = p().$implicit;
        c(), x(" Symbol: ", s.symbol, " ")
    }
}

function cn(r, o) {
    if (r & 1 && (n(0, "div", 26)(1, "span"), l(2), a(), n(3, "span", 27), l(4), a()()), r & 2) {
        let s = o.$implicit,
            e = p(3);
        c(2), T(e.getCacheKeyLabel(s.cacheKey)), c(2), x("", s.count, " entries")
    }
}

function mn(r, o) {
    if (r & 1 && (n(0, "div"), _(1, dn, 2, 1, "div", 24), n(2, "div", 25), $(3, cn, 5, 2, "div", 26, vi), a()()), r & 2) {
        let s = o.$implicit;
        c(), b(s.symbol ? 1 : -1), c(2), j(s.results)
    }
}

function pn(r, o) {
    if (r & 1 && (n(0, "div", 6)(1, "h6", 22), l(2), a(), n(3, "div", 23), $(4, mn, 5, 1, "div", null, xi), a()()), r & 2) {
        let s = p();
        c(2), x(" Search Results (Total: ", s.getTotalSearchCount(), " entries) "), c(2), j(s.getGroupedSearchResults())
    }
}

function un(r, o) {
    if (r & 1 && (n(0, "div", 29), l(1), a()), r & 2) {
        let s = p().$implicit;
        c(), x(" Symbol: ", s.symbol, " ")
    }
}

function gn(r, o) {
    if (r & 1 && (n(0, "div", 30)(1, "span"), l(2), a(), n(3, "span", 27), l(4), a()()), r & 2) {
        let s = o.$implicit,
            e = p(3);
        c(2), T(e.getCacheKeyLabel(s.cacheKey)), c(2), x("", s.deletedCount, " deleted")
    }
}

function hn(r, o) {
    if (r & 1 && (n(0, "div"), _(1, un, 2, 1, "div", 29), n(2, "div", 25), $(3, gn, 5, 2, "div", 30, vi), a()()), r & 2) {
        let s = o.$implicit;
        c(), b(s.symbol ? 1 : -1), c(2), j(s.results)
    }
}

function fn(r, o) {
    if (r & 1 && (n(0, "div", 6)(1, "h6", 28), l(2), a(), n(3, "div", 23), $(4, hn, 5, 1, "div", null, xi), a()()), r & 2) {
        let s = p();
        c(2), x(" Clear Results (Total: ", s.getTotalClearedCount(), " entries deleted) "), c(2), j(s.getGroupedClearResults())
    }
}

function _n(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 15)(1, "input", 31), h("change", function(t) {
            let i = v(s).$implicit,
                d = p();
            return C(d.onCacheKeyChange(i, t))
        }), a(), n(2, "label", 32), l(3), a()()
    }
    if (r & 2) {
        let s = o.$implicit,
            e = o.$index,
            t = p();
        c(), u("id", "cache-" + e)("checked", t.isCacheKeyChecked(s)), c(), u("for", "cache-" + e), c(), x(" ", t.getCacheKeyLabel(s), " ")
    }
}
var _t = (() => {
    let o = class o {
        constructor(e, t, i) {
            this.modalRef = e, this._fb = t, this._cacheService = i, this.searching = F(!1), this.clearing = F(!1), this.searchResults = F([]), this.clearResults = F([]), this.availableCacheKeys = Object.values(Ht), this.cacheForm = this._fb.group({
                symbol: this._fb.control(""),
                cacheKeys: this._fb.array(this.availableCacheKeys.map(() => this._fb.control(!1)))
            })
        }
        ngOnInit() {}
        get cacheKeysArray() {
            return this.cacheForm.get("cacheKeys")
        }
        getCacheKeyLabel(e) {
            return e.replace(/-/g, " ").replace(/\b\w/g, t => t.toUpperCase())
        }
        isCacheKeyChecked(e) {
            let t = this.availableCacheKeys.indexOf(e);
            return this.cacheKeysArray.at(t) ? .value || !1
        }
        setCacheKeyChecked(e, t) {
            let i = this.availableCacheKeys.indexOf(e);
            this.cacheKeysArray.at(i) ? .setValue(t)
        }
        onCacheKeyChange(e, t) {
            this.setCacheKeyChecked(e, t.target.checked)
        }
        getSelectedCacheKeys() {
            return this.availableCacheKeys.filter((e, t) => this.cacheKeysArray.at(t) ? .value)
        }
        search() {
            let e = this.getSelectedCacheKeys();
            if (e.length === 0) return;
            let t = {
                cacheKeys: e,
                symbol: this.cacheForm.value.symbol || void 0
            };
            this.searching.set(!0), this._cacheService.searchCacheEntries(t).pipe(V(() => this.searching.set(!1))).subscribe(i => {
                this.searchResults.set(i), this.clearResults.set([])
            })
        }
        getTotalSearchCount() {
            return this.searchResults().reduce((e, t) => e + t.count, 0)
        }
        getTotalClearedCount() {
            return this.clearResults().reduce((e, t) => e + t.deletedCount, 0)
        }
        getGroupedSearchResults() {
            let e = new Map;
            for (let t of this.searchResults()) {
                let i = t.symbol || "ALL";
                e.has(i) || e.set(i, []), e.get(i).push(t)
            }
            return Array.from(e.entries()).map(([t, i]) => ({
                symbol: t === "ALL" ? void 0 : t,
                results: i
            }))
        }
        getGroupedClearResults() {
            let e = new Map;
            for (let t of this.clearResults()) {
                let i = t.symbol || "ALL";
                e.has(i) || e.set(i, []), e.get(i).push(t)
            }
            return Array.from(e.entries()).map(([t, i]) => ({
                symbol: t === "ALL" ? void 0 : t,
                results: i
            }))
        }
        parseSymbols(e) {
            return e ? .trim() ? e.split(",").map(t => t.trim().toUpperCase()).filter(t => t.length > 0) : []
        }
        clear() {
            let e = this.getSelectedCacheKeys();
            if (e.length === 0) return;
            let t = this.cacheForm.value.symbol,
                i = this.parseSymbols(t || void 0),
                d = "";
            i.length > 0 && (d = ` for symbol${i.length>1?"s":""} "${i.join(", ")}"`);
            let f = `Are you sure you want to clear cache entries for:

Cache Types: ${e.map(S=>this.getCacheKeyLabel(S)).join(", ")}${d}

This action cannot be undone.`;
            if (!confirm(f)) return;
            let y = {
                cacheKeys: e,
                symbol: this.cacheForm.value.symbol || void 0
            };
            this.clearing.set(!0), this._cacheService.clearCacheEntries(y).pipe(V(() => this.clearing.set(!1))).subscribe(S => {
                this.clearResults.set(S), this.search()
            })
        }
        selectAll() {
            this.availableCacheKeys.forEach(e => {
                this.setCacheKeyChecked(e, !0)
            })
        }
        selectNone() {
            this.availableCacheKeys.forEach(e => {
                this.setCacheKeyChecked(e, !1)
            })
        }
        close() {
            this.modalRef.hide()
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(w(we), w(Se), w(yi))
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-cache-management-modal"]
        ],
        decls: 39,
        vars: 9,
        consts: [
            [1, "modal-header", "bg-white", "dark:bg-slate-800", "dark:text-white", "border-b", "border-gray-200", "dark:border-gray-700"],
            [1, "modal-title", "font-semibold", "text-lg"],
            ["type", "button", "aria-label", "Close", 1, "btn-close", "dark:text-white", 3, "click"],
            ["aria-hidden", "true"],
            [1, "modal-body", "bg-white", "dark:bg-slate-800", "dark:text-white", "p-6", "overflow-y-auto"],
            [1, "space-y-6", 3, "formGroup"],
            [1, "border-t", "border-gray-200", "dark:border-gray-700", "pt-4"],
            ["for", "symbol", 1, "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "mb-2"],
            ["id", "symbol", "type", "text", "formControlName", "symbol", "placeholder", "e.g. AAPL, TSLA, MSFT (comma-separated)", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "dark:border-gray-600", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "dark:bg-slate-700", "dark:text-white"],
            [1, "mt-1", "text-xs", "text-gray-500", "dark:text-gray-400"],
            [1, "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "mb-3"],
            [1, "flex", "space-x-2", "mb-3"],
            ["type", "button", 1, "px-3", "py-1", "text-xs", "bg-blue-100", "dark:bg-blue-900", "text-blue-800", "dark:text-blue-200", "rounded-md", "hover:bg-blue-200", "dark:hover:bg-blue-800", 3, "click"],
            ["type", "button", 1, "px-3", "py-1", "text-xs", "bg-gray-100", "dark:bg-gray-700", "text-gray-800", "dark:text-gray-200", "rounded-md", "hover:bg-gray-200", "dark:hover:bg-gray-600", 3, "click"],
            [1, "grid", "grid-cols-2", "gap-2", "max-h-40", "overflow-y-auto"],
            [1, "flex", "items-center"],
            [1, "modal-footer", "bg-gray-50", "dark:bg-slate-900", "border-t", "border-gray-200", "dark:border-gray-700", "px-6", "py-3", "flex", "justify-between"],
            ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "bg-white", "dark:bg-slate-700", "border", "border-gray-300", "dark:border-gray-600", "rounded-md", "hover:bg-gray-50", "dark:hover:bg-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "click"],
            [1, "flex", "space-x-2"],
            ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-blue-600", "hover:bg-blue-700", "disabled:bg-gray-400", "disabled:cursor-not-allowed", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "flex", "items-center", "space-x-2", 3, "click", "disabled"],
            [3, "loading"],
            ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-red-600", "hover:bg-red-700", "disabled:bg-gray-400", "disabled:cursor-not-allowed", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-red-500", "flex", "items-center", "space-x-2", 3, "click", "disabled"],
            [1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "mb-2"],
            [1, "space-y-3", "max-h-32", "overflow-y-auto"],
            [1, "text-xs", "font-medium", "text-blue-600", "dark:text-blue-400", "mb-1"],
            [1, "space-y-1", "ml-2"],
            [1, "flex", "justify-between", "text-xs", "text-gray-600", "dark:text-gray-400"],
            [1, "font-mono"],
            [1, "text-sm", "font-medium", "text-green-700", "dark:text-green-300", "mb-2"],
            [1, "text-xs", "font-medium", "text-green-600", "dark:text-green-400", "mb-1"],
            [1, "flex", "justify-between", "text-xs", "text-green-600", "dark:text-green-400"],
            ["type", "checkbox", 1, "h-4", "w-4", "text-blue-600", "focus:ring-blue-500", "border-gray-300", "dark:border-gray-600", "rounded", "dark:bg-slate-700", 3, "change", "id", "checked"],
            [1, "ml-2", "text-sm", "text-gray-700", "dark:text-gray-300", "cursor-pointer", 3, "for"]
        ],
        template: function(t, i) {
            t & 1 && (n(0, "div", 0)(1, "h5", 1), l(2, "Cache Management"), a(), n(3, "button", 2), h("click", function() {
                return i.close()
            }), n(4, "span", 3), l(5, "\xD7"), a()()(), n(6, "div", 4)(7, "form", 5), _(8, pn, 6, 1, "div", 6), _(9, fn, 6, 1, "div", 6), n(10, "div")(11, "label", 7), l(12, " Symbol (Optional) "), a(), g(13, "input", 8), n(14, "p", 9), l(15, " Leave empty to search/clear all entries for selected cache types. Use comma-separated symbols for multiple stocks. "), a()(), n(16, "div")(17, "label", 10), l(18, " Cache Types to Search/Clear "), a(), n(19, "div", 11)(20, "button", 12), h("click", function() {
                return i.selectAll()
            }), l(21, " Select All "), a(), n(22, "button", 13), h("click", function() {
                return i.selectNone()
            }), l(23, " Select None "), a()(), n(24, "div", 14), $(25, _n, 4, 4, "div", 15, Ve), a()()()(), n(27, "div", 16)(28, "button", 17), h("click", function() {
                return i.close()
            }), l(29, " Close "), a(), n(30, "div", 18)(31, "button", 19), h("click", function() {
                return i.search()
            }), n(32, "span")(33, "qualtrim-loading-indicator", 20), l(34), a()()(), n(35, "button", 21), h("click", function() {
                return i.clear()
            }), n(36, "span")(37, "qualtrim-loading-indicator", 20), l(38), a()()()()()), t & 2 && (c(7), u("formGroup", i.cacheForm), c(), b(i.searchResults().length > 0 ? 8 : -1), c(), b(i.clearResults().length > 0 ? 9 : -1), c(16), j(i.availableCacheKeys), c(6), u("disabled", i.searching() || i.getSelectedCacheKeys().length === 0), c(2), u("loading", i.searching()), c(), T(i.searching() ? "Searching..." : "Search"), c(), u("disabled", i.clearing() || i.getSelectedCacheKeys().length === 0), c(2), u("loading", i.clearing()), c(), T(i.clearing() ? "Clearing..." : "Clear"))
        },
        dependencies: [Me, ze, J, z, ye, xe, ve, ke, Te],
        styles: [".modal-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.btn-close[_ngcontent-%COMP%]{background:none;border:none;font-size:1.5rem;cursor:pointer;padding:.5rem}.btn-close[_ngcontent-%COMP%]:hover{opacity:.7}.overflow-y-auto[_ngcontent-%COMP%]{scrollbar-width:thin;scrollbar-color:#cbd5e0 transparent}.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:transparent}.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#cbd5e0;border-radius:3px}.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#a0aec0}.dark[_nghost-%COMP%]   .overflow-y-auto[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .overflow-y-auto[_ngcontent-%COMP%]{scrollbar-color:#4a5568 transparent}.dark[_nghost-%COMP%]   .overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, .dark   [_nghost-%COMP%]   .overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#4a5568}.dark[_nghost-%COMP%]   .overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, .dark   [_nghost-%COMP%]   .overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#2d3748}"]
    });
    let r = o;
    return r
})();
var Ci = (() => {
    let o = class o {
        constructor(e) {
            this._http = e
        }
        startSync() {
            return this._http.post("/api/admin/sync/subscriptions", {})
        }
        getProgress(e) {
            return this._http.get(`/api/admin/sync/subscriptions/${e}`)
        }
        pollProgress(e, t = 1e3) {
            return Ie(0, t).pipe(ae(() => this.getProgress(e)), Pt(i => i !== null && i.status !== "completed" && i.status !== "failed", !0))
        }
        getLastSyncStatus() {
            return this._http.get("/api/admin/sync/subscriptions-status")
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(G(H))
    }, o.\u0275prov = K({
        token: o,
        factory: o.\u0275fac,
        providedIn: "root"
    });
    let r = o;
    return r
})();
var yn = (r, o, s) => ({
        "bg-blue-600": r,
        "bg-green-600": o,
        "bg-red-600": s
    }),
    xn = (r, o) => o.userId,
    vn = (r, o) => o.id;

function Cn(r, o) {
    if (r & 1 && (n(0, "div", 8)(1, "h6", 6), l(2, " Last Sync "), a(), n(3, "div", 16)(4, "div", 17), l(5, "Time:"), a(), n(6, "div", 18), l(7), M(8, "date"), a(), n(9, "div", 17), l(10, "Duration:"), a(), n(11, "div", 18), l(12), M(13, "number"), a(), n(14, "div", 17), l(15, "Synced:"), a(), n(16, "div", 18), l(17), a(), n(18, "div", 17), l(19, "Fixed:"), a(), n(20, "div", 19), l(21), a(), n(22, "div", 17), l(23, "Errors:"), a(), n(24, "div", 20), l(25), a()()()), r & 2) {
        let s, e, t, i, d = p();
        c(7), T(Pe(8, 5, d.lastSyncTime(), "medium")), c(5), x("", Pe(13, 8, (((s = d.lastSyncStatus()) == null ? null : s.durationMs) || 0) / 1e3, "1.1-1"), "s"), c(5), T(((e = d.lastSyncStatus()) == null ? null : e.totalSynced) || 0), c(4), T(((t = d.lastSyncStatus()) == null ? null : t.fixed) || 0), c(4), T(((i = d.lastSyncStatus()) == null ? null : i.errors) || 0)
    }
}

function Sn(r, o) {
    if (r & 1 && (n(0, "span", 17), l(1, "Amount:"), a(), n(2, "span", 33), l(3), a()), r & 2) {
        let s = p().$implicit;
        c(3), ge("", s.amount, "/", s.interval)
    }
}

function Mn(r, o) {
    if (r & 1 && (n(0, "div", 30)(1, "div", 31)(2, "span", 17), l(3, "Stripe ID:"), a(), n(4, "span", 32), l(5), a(), n(6, "span", 17), l(7, "Status:"), a(), n(8, "span", 33), l(9), a(), n(10, "span", 17), l(11, "Start Date:"), a(), n(12, "span", 33), l(13), M(14, "date"), a(), _(15, Sn, 4, 2), a()()), r & 2) {
        let s = o.$implicit;
        c(4), u("title", $t(s.externalRef)), c(), T(s.externalRef), c(4), T(s.status), c(4), T(Pe(14, 6, s.startDate, "shortDate")), c(2), b(s.amount ? 15 : -1)
    }
}

function wn(r, o) {
    if (r & 1 && (n(0, "div", 27)(1, "div", 28), l(2), a(), n(3, "div", 29), $(4, Mn, 16, 9, "div", 30, vn), a()()), r & 2) {
        let s = o.$implicit;
        c(2), x(" ", s.email, " "), c(2), j(s.subscriptions)
    }
}

function Tn(r, o) {
    if (r & 1 && (n(0, "div", 9)(1, "div", 21), B(), n(2, "svg", 22), g(3, "path", 23), a(), oe(), n(4, "h6", 24), l(5), a()(), n(6, "p", 25), l(7, " The following users have multiple active Stripe subscriptions. This indicates a billing issue that needs manual resolution. "), a(), n(8, "div", 26), $(9, wn, 6, 1, "div", 27, xn), a()()), r & 2) {
        let s = p();
        c(5), x(" Duplicate Subscriptions Detected (", s.duplicateUsers().length, " users) "), c(4), j(s.duplicateUsers())
    }
}

function kn(r, o) {
    if (r & 1 && (n(0, "div", 10)(1, "p", 34), l(2), a()()), r & 2) {
        let s = p();
        c(2), T(s.error())
    }
}

function Fn(r, o) {
    if (r & 1 && (n(0, "div", 58), l(1), a()), r & 2) {
        let s = o.$implicit;
        c(), x(" ", s, " ")
    }
}

function En(r, o) {
    if (r & 1 && (n(0, "div", 54)(1, "h6", 56), l(2), a(), n(3, "div", 57), $(4, Fn, 2, 1, "div", 58, Ve), a()()), r & 2) {
        let s = p(2);
        c(2), x(" Error Details (", s.progress().errorMessages.length, ") "), c(2), j(s.progress().errorMessages)
    }
}

function Pn(r, o) {
    if (r & 1 && (n(0, "div", 55), l(1), M(2, "date"), a()), r & 2) {
        let s = p(2);
        c(), x(" Completed at: ", Pe(2, 1, s.progress().completedAt, "medium"), " ")
    }
}

function An(r, o) {
    if (r & 1 && (n(0, "div", 11)(1, "div", 35)(2, "span", 36), l(3, "Status:"), a(), n(4, "span", 37), l(5), a()(), n(6, "div")(7, "div", 38)(8, "span"), l(9), a(), n(10, "span"), l(11), a()(), n(12, "div", 39), g(13, "div", 40), a()(), n(14, "div", 41)(15, "div", 42)(16, "div", 43), l(17, "In Sync"), a(), n(18, "div", 44), l(19), a()(), n(20, "div", 45)(21, "div", 46), l(22, "Fixed"), a(), n(23, "div", 47), l(24), a()(), n(25, "div", 48)(26, "div", 49), l(27, "Errors"), a(), n(28, "div", 50), l(29), a()(), n(30, "div", 51)(31, "div", 52), l(32, "Scanned"), a(), n(33, "div", 53), l(34), a()()(), _(35, En, 6, 1, "div", 54), _(36, Pn, 3, 4, "div", 55), a()), r & 2) {
        let s, e, t, i, d, m, f, y = p();
        c(4), u("ngClass", y.getStatusColor()), c(), x(" ", y.getStatusLabel(), " "), c(4), ge("Progress (Batch ", y.currentBatch(), " of ", y.totalBatches(), ")"), c(2), it("", ((s = y.progress()) == null ? null : s.scanned) || 0, " / ", ((s = y.progress()) == null ? null : s.total) || 0, " (", y.progressPercent(), "%)"), c(2), Vt("width", y.progressPercent(), "%"), u("ngClass", jt(16, yn, y.isRunning(), y.isCompleted(), y.isFailed())), c(6), x(" ", ((e = y.progress()) == null ? null : e.inSync) || 0, " "), c(5), x(" ", ((t = y.progress()) == null ? null : t.fixed) || 0, " "), c(5), x(" ", ((i = y.progress()) == null ? null : i.errors) || 0, " "), c(5), x(" ", ((d = y.progress()) == null ? null : d.scanned) || 0, " "), c(), b((m = y.progress()) != null && m.errorMessages && y.progress().errorMessages.length > 0 ? 35 : -1), c(), b((f = y.progress()) != null && f.completedAt ? 36 : -1)
    }
}

function Dn(r, o) {
    r & 1 && (n(0, "div", 12), B(), n(1, "svg", 59), g(2, "path", 60), a(), oe(), n(3, "p", 61), l(4, ' Click "Start Sync" to begin synchronizing subscriptions with Stripe. '), a()())
}

function In(r, o) {
    r & 1 && (n(0, "div", 12), B(), n(1, "svg", 62), g(2, "circle", 63)(3, "path", 64), a(), oe(), n(4, "p", 61), l(5, " Starting sync job... "), a()())
}

function Rn(r, o) {
    r & 1 && (B(), n(0, "svg", 65), g(1, "circle", 63)(2, "path", 64), a(), oe(), n(3, "span"), l(4, "Running..."), a())
}

function Nn(r, o) {
    r & 1 && (B(), n(0, "svg", 66), g(1, "path", 60), a(), oe(), n(2, "span"), l(3, "Start Sync"), a())
}
var bt = (() => {
    let o = class o {
        constructor(e, t) {
            this.modalRef = e, this._syncService = t, this._destroy$ = new W, this.jobId = F(null), this.progress = F(null), this.error = F(null), this.isStarting = F(!1), this.lastSyncStatus = F(null), this.isLoadingLastSync = F(!0), this.isRunning = O(() => this.progress() ? .status === "running" || this.progress() ? .status === "pending"), this.isCompleted = O(() => this.progress() ? .status === "completed"), this.isFailed = O(() => this.progress() ? .status === "failed"), this.canStart = O(() => !this.isStarting() && !this.isRunning()), this.progressPercent = O(() => {
                let i = this.progress();
                return !i || i.total === 0 ? 0 : Math.round(i.scanned / i.total * 100)
            }), this.currentBatch = O(() => {
                let i = this.progress();
                return !i || i.total === 0 ? 0 : Math.floor(i.scanned / 100) + 1
            }), this.totalBatches = O(() => {
                let i = this.progress();
                return !i || i.total === 0 ? 0 : Math.ceil(i.total / 100)
            }), this.duplicateUsers = O(() => this.lastSyncStatus() ? .duplicateUsers || []), this.hasDuplicates = O(() => this.duplicateUsers().length > 0), this.lastSyncTime = O(() => {
                let i = this.lastSyncStatus();
                return i ? new Date(i.completedAt) : null
            })
        }
        ngOnInit() {
            this.loadLastSyncStatus()
        }
        ngOnDestroy() {
            this._destroy$.next(), this._destroy$.complete()
        }
        loadLastSyncStatus() {
            this._syncService.getLastSyncStatus().pipe(q(this._destroy$)).subscribe({
                next: e => {
                    this.lastSyncStatus.set(e), this.isLoadingLastSync.set(!1)
                },
                error: () => {
                    this.isLoadingLastSync.set(!1)
                }
            })
        }
        startSync() {
            this.canStart() && (this.isStarting.set(!0), this.error.set(null), this.progress.set(null), this._syncService.startSync().subscribe({
                next: e => {
                    this.jobId.set(e.jobId), this.isStarting.set(!1), this.startPolling(e.jobId)
                },
                error: e => {
                    this.isStarting.set(!1), this.error.set(e.error ? .message || "Failed to start sync")
                }
            }))
        }
        startPolling(e) {
            this._syncService.pollProgress(e, 1e3).pipe(q(this._destroy$)).subscribe({
                next: t => {
                    t && (this.progress.set(t), (t.status === "completed" || t.status === "failed") && this.loadLastSyncStatus())
                },
                error: t => {
                    this.error.set(t.error ? .message || "Failed to get progress")
                }
            })
        }
        getStatusLabel() {
            let e = this.progress();
            if (!e) return "Not started";
            switch (e.status) {
                case "pending":
                    return "Pending...";
                case "running":
                    return "Running...";
                case "completed":
                    return "Completed";
                case "failed":
                    return "Failed";
                default:
                    return e.status
            }
        }
        getStatusColor() {
            let e = this.progress();
            if (!e) return "text-gray-500 dark:text-gray-400";
            switch (e.status) {
                case "pending":
                    return "text-yellow-500 dark:text-yellow-400";
                case "running":
                    return "text-blue-500 dark:text-blue-400";
                case "completed":
                    return "text-green-500 dark:text-green-400";
                case "failed":
                    return "text-red-500 dark:text-red-400";
                default:
                    return "text-gray-500 dark:text-gray-400"
            }
        }
        close() {
            this.modalRef.hide()
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(w(we), w(Ci))
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-subscription-sync-modal"]
        ],
        decls: 33,
        vars: 8,
        consts: [
            [1, "modal-header", "bg-white", "dark:bg-slate-800", "dark:text-white", "border-b", "border-gray-200", "dark:border-gray-700"],
            [1, "modal-title", "font-semibold", "text-lg"],
            ["type", "button", "aria-label", "Close", 1, "btn-close", "dark:text-white", 3, "click"],
            ["aria-hidden", "true"],
            [1, "modal-body", "bg-white", "dark:bg-slate-800", "dark:text-white", "p-6", "overflow-y-auto"],
            [1, "mb-6"],
            [1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "mb-2"],
            [1, "text-sm", "text-gray-600", "dark:text-gray-400", "space-y-1", "list-disc", "list-inside"],
            [1, "mb-6", "p-4", "bg-gray-50", "dark:bg-slate-700", "rounded-lg"],
            [1, "mb-6", "p-4", "bg-red-50", "dark:bg-red-900/30", "border-2", "border-red-300", "dark:border-red-700", "rounded-lg"],
            [1, "mb-4", "p-3", "bg-red-100", "dark:bg-red-900/30", "border", "border-red-300", "dark:border-red-700", "rounded-md"],
            [1, "space-y-4"],
            [1, "text-center", "py-8"],
            [1, "modal-footer", "bg-gray-50", "dark:bg-slate-900", "border-t", "border-gray-200", "dark:border-gray-700", "px-6", "py-3", "flex", "justify-between"],
            ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "bg-white", "dark:bg-slate-700", "border", "border-gray-300", "dark:border-gray-600", "rounded-md", "hover:bg-gray-50", "dark:hover:bg-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "click"],
            ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-blue-600", "hover:bg-blue-700", "disabled:bg-gray-400", "disabled:cursor-not-allowed", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "flex", "items-center", "space-x-2", 3, "click", "disabled"],
            [1, "grid", "grid-cols-2", "gap-2", "text-sm"],
            [1, "text-gray-500", "dark:text-gray-400"],
            [1, "text-gray-700", "dark:text-gray-200"],
            [1, "text-green-600", "dark:text-green-400"],
            [1, "text-red-600", "dark:text-red-400"],
            [1, "flex", "items-center", "gap-2", "mb-3"],
            ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "text-red-600", "dark:text-red-400"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"],
            [1, "text-sm", "font-bold", "text-red-700", "dark:text-red-300"],
            [1, "text-sm", "text-red-600", "dark:text-red-400", "mb-3"],
            [1, "space-y-3", "max-h-64", "overflow-y-auto"],
            [1, "bg-white", "dark:bg-slate-800", "rounded-md", "p-3", "border", "border-red-200", "dark:border-red-800"],
            [1, "font-medium", "text-gray-800", "dark:text-gray-200", "mb-2"],
            [1, "space-y-2"],
            [1, "text-xs", "bg-gray-50", "dark:bg-slate-700", "rounded", "p-2"],
            [1, "grid", "grid-cols-2", "gap-1"],
            [1, "font-mono", "text-gray-700", "dark:text-gray-300", "truncate", 3, "title"],
            [1, "text-gray-700", "dark:text-gray-300"],
            [1, "text-sm", "text-red-700", "dark:text-red-300"],
            [1, "flex", "items-center", "justify-between"],
            [1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            [1, "text-sm", "font-semibold", 3, "ngClass"],
            [1, "flex", "justify-between", "text-xs", "text-gray-500", "dark:text-gray-400", "mb-1"],
            [1, "w-full", "bg-gray-200", "dark:bg-gray-700", "rounded-full", "h-2.5"],
            [1, "h-2.5", "rounded-full", "transition-all", "duration-300", 3, "ngClass"],
            [1, "grid", "grid-cols-2", "gap-4", "pt-2"],
            [1, "bg-gray-50", "dark:bg-slate-700", "rounded-lg", "p-3"],
            [1, "text-xs", "text-gray-500", "dark:text-gray-400"],
            [1, "text-lg", "font-semibold", "text-gray-700", "dark:text-gray-200"],
            [1, "bg-green-50", "dark:bg-green-900/30", "rounded-lg", "p-3"],
            [1, "text-xs", "text-green-600", "dark:text-green-400"],
            [1, "text-lg", "font-semibold", "text-green-700", "dark:text-green-300"],
            [1, "bg-red-50", "dark:bg-red-900/30", "rounded-lg", "p-3"],
            [1, "text-xs", "text-red-600", "dark:text-red-400"],
            [1, "text-lg", "font-semibold", "text-red-700", "dark:text-red-300"],
            [1, "bg-blue-50", "dark:bg-blue-900/30", "rounded-lg", "p-3"],
            [1, "text-xs", "text-blue-600", "dark:text-blue-400"],
            [1, "text-lg", "font-semibold", "text-blue-700", "dark:text-blue-300"],
            [1, "mt-4"],
            [1, "text-xs", "text-gray-500", "dark:text-gray-400", "text-right"],
            [1, "text-sm", "font-medium", "text-red-700", "dark:text-red-300", "mb-2"],
            [1, "max-h-32", "overflow-y-auto", "bg-red-50", "dark:bg-red-900/20", "rounded-md", "p-2"],
            [1, "text-xs", "text-red-600", "dark:text-red-400", "py-1", "border-b", "border-red-200", "dark:border-red-800", "last:border-0"],
            ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "mx-auto", "h-12", "w-12", "text-gray-400", "dark:text-gray-500"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"],
            [1, "mt-2", "text-sm", "text-gray-500", "dark:text-gray-400"],
            ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "mx-auto", "h-8", "w-8", "text-blue-500"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
            ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-4", "w-4"],
            ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"]
        ],
        template: function(t, i) {
            t & 1 && (n(0, "div", 0)(1, "h5", 1), l(2, "Subscription Sync"), a(), n(3, "button", 2), h("click", function() {
                return i.close()
            }), n(4, "span", 3), l(5, "\xD7"), a()()(), n(6, "div", 4)(7, "div", 5)(8, "h6", 6), l(9, " What this does: "), a(), n(10, "ul", 7)(11, "li"), l(12, "Syncs subscription data with Stripe API in batches of 100"), a(), n(13, "li"), l(14, "Fixes erroneous endDate values on active subscriptions"), a(), n(15, "li"), l(16, "Safe to run - only reads from Stripe and updates local DB"), a(), n(17, "li"), l(18, "Uses parallel processing (10 concurrent API calls) for speed"), a(), n(19, "li"), l(20, "Detects users with multiple active Stripe subscriptions"), a()()(), _(21, Cn, 26, 11, "div", 8), _(22, Tn, 11, 1, "div", 9), _(23, kn, 3, 1, "div", 10), _(24, An, 37, 20, "div", 11), _(25, Dn, 5, 0, "div", 12), _(26, In, 6, 0, "div", 12), a(), n(27, "div", 13)(28, "button", 14), h("click", function() {
                return i.close()
            }), l(29, " Close "), a(), n(30, "button", 15), h("click", function() {
                return i.startSync()
            }), _(31, Rn, 5, 0)(32, Nn, 4, 0), a()()), t & 2 && (c(21), b(i.lastSyncTime() ? 21 : -1), c(), b(i.hasDuplicates() ? 22 : -1), c(), b(i.error() ? 23 : -1), c(), b(i.progress() ? 24 : -1), c(), b(!i.progress() && !i.isStarting() ? 25 : -1), c(), b(i.isStarting() ? 26 : -1), c(4), u("disabled", !i.canStart()), c(), b(i.isRunning() ? 31 : 32))
        },
        dependencies: [D, fe, be, je],
        encapsulation: 2
    });
    let r = o;
    return r
})();
var Si = (() => {
    let o = class o {
        constructor(e) {
            this._http = e
        }
        getSettings() {
            return this._http.get("/api/admin/maintenance")
        }
        updateSettings(e) {
            return this._http.put("/api/admin/maintenance", e)
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(G(H))
    }, o.\u0275prov = K({
        token: o,
        factory: o.\u0275fac,
        providedIn: "root"
    });
    let r = o;
    return r
})();

function $n(r, o) {
    r & 1 && (n(0, "div", 3), B(), n(1, "svg", 8), g(2, "circle", 9)(3, "path", 10), a()())
}

function jn(r, o) {
    if (r & 1 && (n(0, "div", 11), l(1), a()), r & 2) {
        let s = p(2);
        c(), x(" ", s.error(), " ")
    }
}

function Ln(r, o) {
    if (r & 1 && (n(0, "div", 12), l(1), a()), r & 2) {
        let s = p(2);
        c(), x(" ", s.success(), " ")
    }
}

function On(r, o) {
    if (r & 1 && (n(0, "option", 34), l(1), a()), r & 2) {
        let s = o.$implicit,
            e = p(2);
        u("value", s), c(), x(" ", e.getSeverityLabel(s), " ")
    }
}

function zn(r, o) {
    if (r & 1) {
        let s = A();
        _(0, jn, 2, 1, "div", 11), _(1, Ln, 2, 1, "div", 12), n(2, "form", 13)(3, "div", 14)(4, "button", 15), h("click", function() {
            v(s);
            let t = p();
            return C(t.enableMaintenanceNow())
        }), l(5, " Enable Now "), a(), n(6, "button", 16), h("click", function() {
            v(s);
            let t = p();
            return C(t.disableMaintenance())
        }), l(7, " Disable Maintenance "), a()(), n(8, "div", 17)(9, "div")(10, "label", 18), l(11, " Maintenance Mode Enabled "), a(), n(12, "p", 19), l(13, " When enabled, the maintenance banner will be shown to users "), a()(), g(14, "input", 20), a(), n(15, "div", 21)(16, "p", 22), l(17, " All times are entered in Mountain Time (MST/MDT) and will be displayed to users in their local timezone. "), a()(), n(18, "div")(19, "label", 23), l(20, " Maintenance Start Time (Mountain Time) "), a(), g(21, "input", 24), n(22, "p", 25), l(23, " When maintenance will begin (in Mountain Time) "), a()(), n(24, "div")(25, "label", 26), l(26, " Maintenance End Time (Mountain Time, Optional) "), a(), g(27, "input", 27), n(28, "p", 25), l(29, " Estimated completion time in Mountain Time (for user information) "), a()(), n(30, "div")(31, "label", 28), l(32, " Banner Lead Time (Hours) "), a(), g(33, "input", 29), n(34, "p", 25), l(35, " How many hours before the start time to show the banner (1-168) "), a()(), n(36, "div")(37, "label", 30), l(38, " Custom Message (Optional) "), a(), g(39, "textarea", 31), n(40, "p", 25), l(41, " Leave empty to use the default message with start time "), a()(), n(42, "div")(43, "label", 32), l(44, " Banner Severity "), a(), n(45, "select", 33), $(46, On, 2, 2, "option", 34, Ve), a(), n(48, "p", 25), l(49, " Controls the color of the banner "), a()(), n(50, "div", 35)(51, "div")(52, "label", 36), l(53, " Block Site Access "), a(), n(54, "p", 37), l(55, " When enabled, users will be redirected to the maintenance page. This requires additional AWS Amplify configuration. "), a()(), g(56, "input", 38), a()()
    }
    if (r & 2) {
        let s = p();
        b(s.error() ? 0 : -1), c(), b(s.success() ? 1 : -1), c(), u("formGroup", s.maintenanceForm), c(44), j(s.severityOptions)
    }
}
var Mi = "America/Denver",
    wi = (() => {
        let o = class o {
            constructor(e, t, i) {
                this.modalRef = e, this._fb = t, this._maintenanceService = i, this.loading = F(!1), this.saving = F(!1), this.error = F(null), this.success = F(null), this.severityOptions = ["info", "warning", "critical"], this.maintenanceForm = this._fb.group({
                    enabled: [!1],
                    startTime: [""],
                    endTime: [""],
                    bannerLeadTimeHours: [24, [Q.min(1), Q.max(168)]],
                    message: [""],
                    severity: ["warning"],
                    blockAccess: [!1]
                })
            }
            ngOnInit() {
                this.loadSettings()
            }
            loadSettings() {
                this.loading.set(!0), this.error.set(null), this._maintenanceService.getSettings().pipe(V(() => this.loading.set(!1))).subscribe({
                    next: e => {
                        this.populateForm(e)
                    },
                    error: e => {
                        this.error.set(e.error ? .message || "Failed to load maintenance settings")
                    }
                })
            }
            populateForm(e) {
                this.maintenanceForm.patchValue({
                    enabled: e.enabled,
                    startTime: e.startTime ? this.formatDateTimeLocal(e.startTime) : "",
                    endTime: e.endTime ? this.formatDateTimeLocal(e.endTime) : "",
                    bannerLeadTimeHours: e.bannerLeadTimeHours,
                    message: e.message || "",
                    severity: e.severity,
                    blockAccess: e.blockAccess
                })
            }
            formatDateTimeLocal(e) {
                let t = new Date(e),
                    d = new Intl.DateTimeFormat("en-CA", {
                        timeZone: Mi,
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: !1
                    }).formatToParts(t),
                    m = Z => d.find(Je => Je.type === Z) ? .value || "",
                    f = m("year"),
                    y = m("month"),
                    S = m("day"),
                    N = m("hour"),
                    me = m("minute");
                return `${f}-${y}-${S}T${N}:${me}`
            }
            convertMountainTimeToUTC(e) {
                let [t, i] = e.split("T"), [d, m, f] = t.split("-").map(Number), [y, S] = i.split(":").map(Number), N = new Date(d, m - 1, f, y, S), kt = (new Intl.DateTimeFormat("en-US", {
                    timeZone: Mi,
                    timeZoneName: "shortOffset"
                }).formatToParts(N).find(ji => ji.type === "timeZoneName") ? .value || "").match(/GMT([+-]\d+)/), $i = kt ? parseInt(kt[1], 10) : -7;
                return new Date(Date.UTC(d, m - 1, f, y - $i, S)).toISOString()
            }
            save() {
                if (this.maintenanceForm.invalid) return;
                this.saving.set(!0), this.error.set(null), this.success.set(null);
                let e = this.maintenanceForm.value,
                    t = {
                        enabled: e.enabled,
                        startTime: e.startTime ? this.convertMountainTimeToUTC(e.startTime) : null,
                        endTime: e.endTime ? this.convertMountainTimeToUTC(e.endTime) : null,
                        bannerLeadTimeHours: e.bannerLeadTimeHours,
                        message: e.message || null,
                        severity: e.severity,
                        blockAccess: e.blockAccess
                    };
                this._maintenanceService.updateSettings(t).pipe(V(() => this.saving.set(!1))).subscribe({
                    next: i => {
                        this.success.set("Maintenance settings updated successfully"), this.populateForm(i)
                    },
                    error: i => {
                        this.error.set(i.error ? .message || "Failed to update maintenance settings")
                    }
                })
            }
            getSeverityLabel(e) {
                switch (e) {
                    case "info":
                        return "Info (Blue)";
                    case "warning":
                        return "Warning (Yellow)";
                    case "critical":
                        return "Critical (Red)";
                    default:
                        return e
                }
            }
            enableMaintenanceNow() {
                let e = new Date;
                this.maintenanceForm.patchValue({
                    enabled: !0,
                    startTime: this.formatDateTimeLocal(e.toISOString())
                }), this.save()
            }
            disableMaintenance() {
                this.maintenanceForm.patchValue({
                    enabled: !1
                }), this.save()
            }
            close() {
                this.modalRef.hide()
            }
        };
        o.\u0275fac = function(t) {
            return new(t || o)(w(we), w(Se), w(Si))
        }, o.\u0275cmp = E({
            type: o,
            selectors: [
                ["qualtrim-maintenance-settings-modal"]
            ],
            decls: 12,
            vars: 4,
            consts: [
                [1, "modal-header", "bg-white", "dark:bg-slate-800", "dark:text-white", "border-b", "border-gray-200", "dark:border-gray-700"],
                [1, "modal-title", "font-semibold", "text-lg"],
                [1, "modal-body", "bg-white", "dark:bg-slate-800", "dark:text-white", "p-6", "overflow-y-auto"],
                [1, "flex", "justify-center", "items-center", "py-8"],
                [1, "modal-footer", "bg-gray-50", "dark:bg-slate-900", "border-t", "border-gray-200", "dark:border-gray-700", "px-6", "py-3", "flex", "justify-between"],
                ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "bg-white", "dark:bg-slate-700", "border", "border-gray-300", "dark:border-gray-600", "rounded-md", "hover:bg-gray-50", "dark:hover:bg-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "click"],
                ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-blue-600", "hover:bg-blue-700", "disabled:bg-gray-400", "disabled:cursor-not-allowed", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "flex", "items-center", "space-x-2", 3, "click", "disabled"],
                [3, "loading"],
                ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-8", "w-8", "text-blue-600"],
                ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"],
                ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
                [1, "mb-4", "p-3", "bg-red-100", "dark:bg-red-900", "text-red-700", "dark:text-red-200", "rounded-md"],
                [1, "mb-4", "p-3", "bg-green-100", "dark:bg-green-900", "text-green-700", "dark:text-green-200", "rounded-md"],
                [1, "space-y-6", 3, "formGroup"],
                [1, "flex", "space-x-3", "p-4", "bg-gray-50", "dark:bg-slate-700", "rounded-lg"],
                ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-yellow-600", "hover:bg-yellow-700", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-yellow-500", 3, "click"],
                ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-green-600", "hover:bg-green-700", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-green-500", 3, "click"],
                [1, "flex", "items-center", "justify-between"],
                ["for", "enabled", 1, "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
                [1, "text-xs", "text-gray-500", "dark:text-gray-400"],
                ["id", "enabled", "type", "checkbox", "formControlName", "enabled", 1, "h-5", "w-5", "text-blue-600", "focus:ring-blue-500", "border-gray-300", "dark:border-gray-600", "rounded", "dark:bg-slate-700"],
                [1, "p-3", "bg-blue-50", "dark:bg-blue-900/20", "rounded-lg", "border", "border-blue-200", "dark:border-blue-800"],
                [1, "text-sm", "text-blue-700", "dark:text-blue-300"],
                ["for", "startTime", 1, "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "mb-2"],
                ["id", "startTime", "type", "datetime-local", "formControlName", "startTime", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "dark:border-gray-600", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "dark:bg-slate-700", "dark:text-white"],
                [1, "mt-1", "text-xs", "text-gray-500", "dark:text-gray-400"],
                ["for", "endTime", 1, "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "mb-2"],
                ["id", "endTime", "type", "datetime-local", "formControlName", "endTime", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "dark:border-gray-600", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "dark:bg-slate-700", "dark:text-white"],
                ["for", "bannerLeadTimeHours", 1, "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "mb-2"],
                ["id", "bannerLeadTimeHours", "type", "number", "formControlName", "bannerLeadTimeHours", "min", "1", "max", "168", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "dark:border-gray-600", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "dark:bg-slate-700", "dark:text-white"],
                ["for", "message", 1, "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "mb-2"],
                ["id", "message", "formControlName", "message", "rows", "3", "placeholder", "We are performing scheduled maintenance...", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "dark:border-gray-600", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "dark:bg-slate-700", "dark:text-white"],
                ["for", "severity", 1, "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "mb-2"],
                ["id", "severity", "formControlName", "severity", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "dark:border-gray-600", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", "dark:bg-slate-700", "dark:text-white"],
                [3, "value"],
                [1, "flex", "items-center", "justify-between", "p-4", "bg-red-50", "dark:bg-red-900/20", "rounded-lg", "border", "border-red-200", "dark:border-red-800"],
                ["for", "blockAccess", 1, "block", "text-sm", "font-medium", "text-red-700", "dark:text-red-300"],
                [1, "text-xs", "text-red-600", "dark:text-red-400"],
                ["id", "blockAccess", "type", "checkbox", "formControlName", "blockAccess", 1, "h-5", "w-5", "text-red-600", "focus:ring-red-500", "border-gray-300", "dark:border-gray-600", "rounded", "dark:bg-slate-700"]
            ],
            template: function(t, i) {
                t & 1 && (n(0, "div", 0)(1, "h5", 1), l(2, "Maintenance Mode Settings"), a()(), n(3, "div", 2), _(4, $n, 4, 0, "div", 3)(5, zn, 57, 3), a(), n(6, "div", 4)(7, "button", 5), h("click", function() {
                    return i.close()
                }), l(8, " Close "), a(), n(9, "button", 6), h("click", function() {
                    return i.save()
                }), n(10, "qualtrim-loading-indicator", 7), l(11), a()()()), t & 2 && (c(4), b(i.loading() ? 4 : 5), c(5), u("disabled", i.saving() || i.loading() || i.maintenanceForm.invalid), c(), u("loading", i.saving()), c(), x(" ", i.saving() ? "Saving..." : "Save Settings", " "))
            },
            dependencies: [D, Me, ze, le, de, J, at, rt, Ce, z, ye, st, ot, xe, ve, ke, Te],
            encapsulation: 2
        });
        let r = o;
        return r
    })();

function Un(r, o) {
    if (r & 1 && (n(0, "span"), l(1), a()), r & 2) {
        let s = p();
        tt(s.lastSyncResult === "success" ? "text-green-600" : "text-red-600"), c(), x(" (", s.lastSyncResult, ") ")
    }
}

function Bn(r, o) {
    r & 1 && (n(0, "span", 20), B(), n(1, "svg", 21), g(2, "circle", 22)(3, "path", 23), a(), l(4, " Syncing... "), a())
}

function Wn(r, o) {
    if (r & 1 && (n(0, "div", 13)(1, "div", 16)(2, "span", 17), l(3, "Last sync:"), a(), n(4, "span", 18), l(5), a(), _(6, Un, 2, 3, "span", 19), _(7, Bn, 5, 0, "span", 20), a()()), r & 2) {
        let s = o,
            e = p();
        c(5), T(e.formatLastSyncTime(s.lastSyncTime)), c(), b(s.lastSyncResult ? 6 : -1), c(), b(s.inProgress ? 7 : -1)
    }
}

function qn(r, o) {
    r & 1 && (B(), n(0, "svg", 15), g(1, "circle", 22)(2, "path", 23), a())
}

function Kn(r, o) {
    r & 1 && (B(), n(0, "svg", 5), g(1, "path", 9), a())
}
var Ti = (() => {
    let o = class o {
        constructor(e, t, i) {
            this._router = e, this.stockSyncService = t, this._modalService = i, this._lastRoute = new I("users"), this.lastRoute$ = this._lastRoute.asObservable(), this.syncStatus$ = this.stockSyncService.syncStatus$, this.syncLoading$ = this.stockSyncService.loading$, this.syncError$ = this.stockSyncService.error$
        }
        ngOnInit() {
            this._router.events.subscribe(e => {
                if (e instanceof Ot) {
                    let i = e.urlAfterRedirects.split("/");
                    this._lastRoute.next(i[i.length - 1])
                }
            })
        }
        triggerStockSync() {
            this.stockSyncService.triggerSync().subscribe({
                error: e => {
                    console.error("Failed to trigger stock sync:", e)
                }
            })
        }
        formatLastSyncTime(e) {
            return e ? new Intl.DateTimeFormat("en-US", {
                dateStyle: "short",
                timeStyle: "short"
            }).format(e) : "Never"
        }
        openCacheManagement() {
            this._modalService.show(_t, {
                class: "modal-lg",
                backdrop: "static",
                keyboard: !1
            })
        }
        openSubscriptionSync() {
            this._modalService.show(bt, {
                class: "modal-lg",
                backdrop: "static",
                keyboard: !1
            })
        }
        openMaintenanceSettings() {
            this._modalService.show(wi, {
                class: "modal-lg",
                backdrop: "static",
                keyboard: !1
            })
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(w(Oe), w(bi), w(Ue))
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-admin-wrapper"]
        ],
        decls: 42,
        vars: 26,
        consts: [
            [1, "bg-white", "dark:bg-slate-800", "dark:text-white", "w-full", "flex", "flex-row", "justify-between", "items-center", "rounded", "px-8", "py-6", "mb-8"],
            [1, "flex", "flex-row"],
            ["routerLinkActive", "bg-blue-500 text-white", 1, "mr-4", "cursor-pointer", "px-6", "py-3", "dark:text-white", "hover:bg-blue-500", "hover:text-white", "text-black", "rounded", 3, "routerLink"],
            [1, "flex", "items-center", "space-x-3"],
            ["aria-label", "Maintenance Settings", 1, "px-4", "py-2", "bg-yellow-600", "hover:bg-yellow-700", "text-white", "rounded-md", "font-medium", "text-sm", "transition-colors", "duration-200", "flex", "items-center", "space-x-2", 3, "click"],
            ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"],
            [1, "px-4", "py-2", "bg-blue-600", "hover:bg-blue-700", "text-white", "rounded-md", "font-medium", "text-sm", "transition-colors", "duration-200", "flex", "items-center", "space-x-2", 3, "click"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"],
            [1, "px-4", "py-2", "bg-purple-600", "hover:bg-purple-700", "text-white", "rounded-md", "font-medium", "text-sm", "transition-colors", "duration-200", "flex", "items-center", "space-x-2", 3, "click"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"],
            [1, "flex", "flex-row", "items-center", "space-x-4"],
            [1, "text-sm"],
            [1, "px-4", "py-2", "bg-green-600", "hover:bg-green-700", "disabled:bg-gray-400", "disabled:cursor-not-allowed", "text-white", "rounded-md", "font-medium", "text-sm", "transition-colors", "duration-200", "flex", "items-center", "space-x-2", 3, "click", "disabled"],
            ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-4", "w-4"],
            [1, "flex", "items-center", "space-x-2"],
            [1, "text-gray-600", "dark:text-gray-400"],
            [1, "font-medium"],
            [3, "class"],
            [1, "inline-flex", "items-center", "text-blue-600"],
            ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "-ml-1", "mr-2", "h-4", "w-4"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"]
        ],
        template: function(t, i) {
            if (t & 1 && (n(0, "div", 0)(1, "div", 1)(2, "a", 2), l(3, " Users "), a(), n(4, "a", 2), l(5, " UI Messages "), a(), n(6, "a", 2), l(7, " Chart Presets "), a()(), n(8, "div", 3)(9, "button", 4), h("click", function() {
                    return i.openMaintenanceSettings()
                }), B(), n(10, "svg", 5), g(11, "path", 6)(12, "path", 7), a(), oe(), n(13, "span"), l(14, "Maintenance"), a()(), n(15, "button", 8), h("click", function() {
                    return i.openSubscriptionSync()
                }), B(), n(16, "svg", 5), g(17, "path", 9), a(), oe(), n(18, "span"), l(19, "Sync Subscriptions"), a()(), n(20, "button", 10), h("click", function() {
                    return i.openCacheManagement()
                }), B(), n(21, "svg", 5), g(22, "path", 11), a(), oe(), n(23, "span"), l(24, "Manage Cache"), a()()(), n(25, "div", 12), _(26, Wn, 8, 3, "div", 13), M(27, "async"), n(28, "button", 14), M(29, "async"), M(30, "async"), h("click", function() {
                    return i.triggerStockSync()
                }), _(31, qn, 3, 0, ":svg:svg", 15), M(32, "async"), M(33, "async"), _(34, Kn, 2, 0, ":svg:svg", 5), M(35, "async"), M(36, "async"), n(37, "span"), l(38), M(39, "async"), M(40, "async"), a()()()(), g(41, "router-outlet")), t & 2) {
                let d, m, f, y, S;
                c(2), u("routerLink", "/app/admin/users"), c(2), u("routerLink", "/app/admin/ai-messages"), c(2), u("routerLink", "/app/admin/presets"), c(20), b((d = k(27, 8, i.syncStatus$)) ? 26 : -1, d), c(2), u("disabled", k(29, 10, i.syncLoading$) || ((m = k(30, 12, i.syncStatus$)) == null ? null : m.inProgress)), c(3), b(k(32, 14, i.syncLoading$) || (f = k(33, 16, i.syncStatus$)) != null && f.inProgress ? 31 : -1), c(3), b(k(35, 18, i.syncLoading$) || (y = k(36, 20, i.syncStatus$)) != null && y.inProgress ? -1 : 34), c(4), x(" ", k(39, 22, i.syncLoading$) || (S = k(40, 24, i.syncStatus$)) != null && S.inProgress ? "Syncing..." : "Sync Stocks", " ")
            }
        },
        dependencies: [D, Ye, zt, Ut, Bt, _e],
        encapsulation: 2
    });
    let r = o;
    return r
})();
var Fe = (() => {
    let o = class o {
        constructor(e) {
            this._http = e, this._currentFilter = new I(null), this._refreshFilter = new I(!1), this._loading = new I(!1), this.aiMessages$ = this._currentFilter.pipe(Et(t => !!t), Ne((t, i) => t.key === i.key && t.type === i.type && t.page === i.page && t.pageSize === i.pageSize), ae(t => this._refreshFilter.pipe(ae(() => this._http.get("/api/admin/ai-messages", {
                params: P({}, t)
            })))), L({
                bufferSize: 1,
                refCount: !0
            })), this.loading$ = this._loading.pipe(L({
                bufferSize: 1,
                refCount: !0
            }))
        }
        setCurrentFilter(e) {
            this._currentFilter.next(e)
        }
        refreshMessages() {
            this._refreshFilter.next(!0)
        }
        getAiMessagesWithFilter(e) {
            return this._loading.next(!0), this._http.get("/api/admin/ai-messages", {
                params: P(P(P(P(P(P(P(P({}, e), e.type && {
                    type: Array.isArray(e.type) ? e.type.join(",") : e.type
                }), e.model && {
                    model: Array.isArray(e.model) ? e.model.join(",") : e.model
                }), e.key && {
                    key: e.key
                }), e.dateFrom && {
                    dateFrom: e.dateFrom
                }), e.dateTo && {
                    dateTo: e.dateTo
                }), e.page && {
                    page: e.page.toString()
                }), e.pageSize && {
                    pageSize: e.pageSize.toString()
                })
            }).pipe(V(() => this._loading.next(!1)))
        }
        regenerateAiMessage(e, t, i) {
            return this._http.post("/api/admin/ai-messages/regenerate", {
                prompt: e,
                responseType: t,
                model: i
            })
        }
        regenerateAiMessageWithDetails(e, t, i) {
            return this._http.post("/api/admin/ai-messages/regenerate-with-details", {
                prompt: e,
                responseType: t,
                model: i
            })
        }
        buildResponsesApiRequest(e, t) {
            let i = {
                input: e.input || "",
                config: P({
                    model: t
                }, e.config)
            };
            return e.config ? .text ? .format && (i.config.text = {
                format: e.config.text.format
            }), e.tools && Array.isArray(e.tools) && (i.config.tools = e.tools), Object.keys(i.config).forEach(d => {
                i.config[d] === void 0 && delete i.config[d]
            }), i
        }
        validateResponsesApiConfig(e, t) {
            return this._http.post("/api/admin/ai-messages/validate-config", {
                config: e,
                model: t
            })
        }
        formatRequestForDisplay(e, t, i) {
            if (typeof e == "object" && "input" in e && "config" in e) return this.buildResponsesApiRequest(e, t);
            let d = {
                input: e,
                config: {
                    model: t,
                    text: i === "json_schema" ? {
                        format: {
                            type: i,
                            name: "response_schema",
                            strict: !0
                        }
                    } : void 0
                }
            };
            return this.buildResponsesApiRequest(d, t)
        }
        estimateRequestSize(e) {
            let t = JSON.stringify(e),
                i = new Blob([t]).size,
                d = Math.ceil(t.length / 4),
                m = "low";
            return e.config.tools && e.config.tools.length > 3 ? m = "high" : (e.config.tools && e.config.tools.length > 0 || d > 1e3) && (m = "medium"), d > 4e3 && (m = "high"), {
                bytesEstimate: i,
                tokensEstimate: d,
                complexity: m
            }
        }
        generateCurlCommand(e) {
            return ["curl -X POST", '"https://api.openai.com/v1/responses"', ...['-H "Content-Type: application/json"', '-H "Authorization: Bearer [API_KEY]"', '-H "User-Agent: Qualtrim-Admin-Debug"'], `-d '${JSON.stringify(e,null,2)}'`].join(` \\
  `)
        }
        updateAiMessage(e) {
            return this._http.put(`/api/admin/ai-messages/${e.id}`, e)
        }
        updateAiMessageEnhanced(e, t = {}) {
            return this._http.put(`/api/admin/ai-messages/${e.id}/enhanced`, {
                aiMessage: e,
                options: t
            })
        }
        createAiMessage(e) {
            return this._http.post("/api/admin/ai-messages", e)
        }
        createAiMessageEnhanced(e, t = !0) {
            return this._http.post("/api/admin/ai-messages/enhanced", {
                aiMessage: e,
                useResponsesFormat: t
            })
        }
        batchOperation(e, t, i = {}) {
            return this._http.post("/api/admin/ai-messages/batch", {
                operation: e,
                messageIds: t,
                options: i
            })
        }
        searchMessagesForGrid(e) {
            return this._http.post("/api/admin/ai-messages/search-grid", e)
        }
        deleteAiMessage(e) {
            return this._http.delete(`/api/admin/ai-messages/${e}`)
        }
        getMessageTypes() {
            return this._http.get("/api/message-types")
        }
        getMessageTypesByCategory(e) {
            return this._http.get(`/api/message-types/category/${e}`)
        }
        getMessageType(e) {
            return this._http.get(`/api/message-types/${e}`)
        }
        interpolateMessageTypeTemplates(e, t) {
            return this._http.post(`/api/message-types/${e}/interpolate`, t)
        }
        createAiMessageWithType(e, t, i, d = {}) {
            return this._http.post("/api/admin/ai-messages/create-with-type", {
                messageTypeId: e,
                customFields: t,
                model: i,
                advancedConfig: d
            })
        }
        updateAiMessageWithType(e, t, i, d, m = {}) {
            return this._http.put(`/api/admin/ai-messages/${e}/update-with-type`, {
                messageTypeId: t,
                customFields: i,
                model: d,
                advancedConfig: m
            })
        }
        validateMessageTypeFields(e, t) {
            return this._http.post(`/api/message-types/${e}/validate`, t)
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(G(H))
    }, o.\u0275prov = K({
        token: o,
        factory: o.\u0275fac,
        providedIn: "root"
    });
    let r = o;
    return r
})();
var ki = (() => {
    let o = class o {
        constructor(e) {
            this.aiMessageAdminService = e, this.performanceMetrics$ = new I(null), this.errorInfo$ = new I(null), this.isLoading$ = new I(!1), this.transformationCache = new Map, this.CACHE_SIZE_LIMIT = 1e3, this.RETRY_ATTEMPTS = 3, this.RETRY_DELAY = 1e3
        }
        initialize(e) {
            this.gridApi = e, this.clearErrors()
        }
        getPerformanceMetrics() {
            return this.performanceMetrics$.asObservable()
        }
        getErrorInfo() {
            return this.errorInfo$.asObservable()
        }
        getLoadingState() {
            return this.isLoading$.asObservable()
        }
        loadMessages() {
            let e = performance.now();
            return this.isLoading$.next(!0), this.clearErrors(), this.aiMessageAdminService.aiMessages$.pipe(vt(1), Xe({
                count: this.RETRY_ATTEMPTS,
                delay: (t, i) => (console.warn(`Retry attempt ${i} for loading messages:`, t), Ie(this.RETRY_DELAY * i))
            }), U(t => {
                let i = performance.now(),
                    d = this.transformMessagesForGrid(t.messages),
                    m = performance.now(),
                    f = {
                        loadTime: performance.now() - e,
                        rowCount: d.length,
                        transformTime: m - i,
                        memoryUsage: this.estimateMemoryUsage(d),
                        timestamp: new Date
                    };
                return this.performanceMetrics$.next(f), this.isLoading$.next(!1), d
            }), Ee(t => (this.isLoading$.next(!1), this.handleError("Failed to load AI messages", t), Ze(() => t))), L({
                bufferSize: 1,
                refCount: !0
            }))
        }
        loadMessagesWithServerFilters(e) {
            let t = performance.now();
            return this.isLoading$.next(!0), this.clearErrors(), this.aiMessageAdminService.getAiMessagesWithFilter(e).pipe(Xe({
                count: this.RETRY_ATTEMPTS,
                delay: (i, d) => (console.warn(`Retry attempt ${d} for loading filtered messages:`, i), Ie(this.RETRY_DELAY * d))
            }), U(i => {
                let d = performance.now(),
                    m = this.transformMessagesForGrid(i.messages),
                    f = performance.now(),
                    y = {
                        loadTime: performance.now() - t,
                        rowCount: m.length,
                        transformTime: f - d,
                        memoryUsage: this.estimateMemoryUsage(m),
                        timestamp: new Date
                    };
                return this.performanceMetrics$.next(y), this.isLoading$.next(!1), {
                    transformedMessages: m,
                    totalCount: i.meta ? .total || m.length
                }
            }), Ee(i => (this.isLoading$.next(!1), this.handleError("Failed to load filtered AI messages", i), Ze(() => i))), L({
                bufferSize: 1,
                refCount: !0
            }))
        }
        transformMessagesForGrid(e) {
            return e.map(t => {
                let i = `${t.id}_${t.updatedAt}`;
                if (this.transformationCache.has(i)) return this.transformationCache.get(i);
                let d = this.transformSingleMessage(t);
                if (this.transformationCache.size >= this.CACHE_SIZE_LIMIT) {
                    let m = this.transformationCache.keys().next().value;
                    m !== void 0 && this.transformationCache.delete(m)
                }
                return this.transformationCache.set(i, d), d
            })
        }
        transformSingleMessage(e) {
            return pe(P({}, e), {
                promptFormat: this.detectPromptFormat(e.prompt),
                messagePreview: this.createMessagePreview(e.message),
                hasTools: this.detectHasTools(e.prompt),
                toolTypes: this.extractToolTypes(e.prompt),
                formattedCreatedAt: this.formatDate(e.createdAt),
                formattedUpdatedAt: this.formatDate(e.updatedAt)
            })
        }
        detectPromptFormat(e) {
            return !e || typeof e != "object" ? "legacy" : "input" in e && ("config" in e || "tools" in e) || "input" in e && ("instructions" in e || "temperature" in e || "tools" in e || "tool_choice" in e || "text" in e || "max_output_tokens" in e) ? "responses" : Array.isArray(e) && e.length > 0 && e[0] ? .role ? "chat" : "legacy"
        }
        createMessagePreview(e) {
            if (!e) return "";
            let t = e.replace(/\s+/g, " ").trim(),
                i = 100;
            return t.length > i ? t.substring(0, i) + "..." : t
        }
        detectHasTools(e) {
            return !e || typeof e != "object" ? !1 : !!(e.tools && Array.isArray(e.tools) && e.tools.length > 0)
        }
        extractToolTypes(e) {
            if (!this.detectHasTools(e)) return [];
            try {
                return e.tools.map(t => t.type || "unknown")
            } catch {
                return []
            }
        }
        formatDate(e) {
            try {
                return new Date(e).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })
            } catch {
                return "Invalid Date"
            }
        }
        createServerSideDatasource() {
            return {
                getRows: e => {
                    let t = performance.now();
                    this.isLoading$.next(!0);
                    let i = this.buildFilterFromRequest(e);
                    this.aiMessageAdminService.setCurrentFilter(pe(P({}, i), {
                        page: Math.floor(e.startRow / (e.endRow - e.startRow)) + 1,
                        pageSize: e.endRow - e.startRow
                    })), this.aiMessageAdminService.aiMessages$.pipe(vt(1), Xe({
                        count: this.RETRY_ATTEMPTS,
                        delay: (d, m) => Ie(this.RETRY_DELAY * m)
                    }), Ee(d => (this.handleError("Server-side data loading failed", d, {
                        params: e
                    }), e.failCallback(), Ze(() => d)))).subscribe({
                        next: d => {
                            let m = this.transformMessagesForGrid(d.messages),
                                f = performance.now() - t;
                            this.performanceMetrics$.next({
                                loadTime: f,
                                rowCount: m.length,
                                transformTime: 0,
                                timestamp: new Date
                            }), this.isLoading$.next(!1), e.successCallback(m, d.meta.total)
                        },
                        error: d => {
                            this.isLoading$.next(!1), this.handleError("Server-side data loading failed", d, {
                                params: e
                            }), e.failCallback()
                        }
                    })
                }
            }
        }
        buildFilterFromRequest(e) {
            let t = {};
            return e.filterModel && Object.entries(e.filterModel).forEach(([i, d]) => {
                if (i === "type" && d && typeof d == "object") {
                    let m = d;
                    m.values && m.values.length > 0 && (t.type = m.values[0])
                }
                if (i === "key" && d && typeof d == "object") {
                    let m = d;
                    m.filter && (t.key = m.filter)
                }
            }), t
        }
        handleError(e, t, i) {
            let d = {
                message: e,
                code: t ? .code || t ? .status || "UNKNOWN",
                timestamp: new Date,
                context: i
            };
            console.error("AiMessagesTableService Error:", d, t), this.errorInfo$.next(d)
        }
        clearErrors() {
            this.errorInfo$.next(null)
        }
        estimateMemoryUsage(e) {
            return e.length * 2048
        }
        clearCache() {
            this.transformationCache.clear()
        }
        getCacheStats() {
            return {
                size: this.transformationCache.size,
                limit: this.CACHE_SIZE_LIMIT,
                hitRatio: this.transformationCache.size > 0 ? Math.min(this.transformationCache.size / this.CACHE_SIZE_LIMIT, 1) : 0
            }
        }
        refreshData() {
            return this.clearCache(), this.clearErrors(), this.aiMessageAdminService.refreshMessages(), this.loadMessages()
        }
        destroy() {
            this.clearCache(), this.performanceMetrics$.complete(), this.errorInfo$.complete(), this.isLoading$.complete(), this.gridApi = void 0
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(G(Fe))
    }, o.\u0275prov = K({
        token: o,
        factory: o.\u0275fac,
        providedIn: "root"
    });
    let r = o;
    return r
})();
var De = r => ({
        "is-invalid": r
    }),
    Hn = (r, o) => o.id,
    Qn = (r, o) => o.name,
    Yn = (r, o) => o.value;

function Jn(r, o) {
    if (r & 1 && (l(0, " Edit Message - "), n(1, "span", 24), l(2), a(), l(3, " - "), n(4, "span", 24), l(5), a()), r & 2) {
        let s = p();
        c(2), T(s.message.type), c(3), T(s.message.key)
    }
}

function Zn(r, o) {
    r & 1 && l(0, " Create New Message ")
}

function Xn(r, o) {
    if (r & 1 && (n(0, "option", 30), l(1), a()), r & 2) {
        let s = o.$implicit;
        u("value", s.id), c(), x(" ", s.name, " ")
    }
}

function er(r, o) {
    r & 1 && (n(0, "div", 31), l(1, "Message type is required"), a())
}

function tr(r, o) {
    if (r & 1 && (n(0, "small", 32), l(1), a()), r & 2) {
        let s, e = p(2);
        c(), T((s = e.selectedMessageTypeDetails()) == null ? null : s.description)
    }
}

function ir(r, o) {
    r & 1 && (n(0, "span", 37), l(1, "*"), a())
}

function nr(r, o) {
    if (r & 1 && (n(0, "option", 30), l(1), a()), r & 2) {
        let s = o.$implicit;
        u("value", s.value), c(), x(" ", s.label, " ")
    }
}

function rr(r, o) {
    if (r & 1 && (n(0, "select", 38)(1, "option", 42), l(2), a(), $(3, nr, 2, 2, "option", 30, Yn), a()), r & 2) {
        let s = p().$implicit,
            e = p(3);
        u("id", "custom_" + s.name)("formControlName", "custom_" + s.name)("ngClass", he(4, De, e.validationErrors()["custom_" + s.name])), c(2), x(" Select ", s.label, " "), c(), j(s.options)
    }
}

function ar(r, o) {
    if (r & 1 && g(0, "input", 39), r & 2) {
        let s = p().$implicit,
            e = p(3);
        u("id", "custom_" + s.name)("formControlName", "custom_" + s.name)("placeholder", s.helpText || "")("ngClass", he(4, De, e.validationErrors()["custom_" + s.name]))
    }
}

function or(r, o) {
    if (r & 1 && g(0, "input", 40), r & 2) {
        let s = p().$implicit,
            e = p(3);
        u("id", "custom_" + s.name)("formControlName", "custom_" + s.name)("ngClass", he(3, De, e.validationErrors()["custom_" + s.name]))
    }
}

function sr(r, o) {
    if (r & 1 && (n(0, "div", 41), g(1, "input", 43), n(2, "label", 44), l(3), a()()), r & 2) {
        let s = p().$implicit,
            e = p(3);
        c(), u("id", "custom_" + s.name)("formControlName", "custom_" + s.name)("ngClass", he(5, De, e.validationErrors()["custom_" + s.name])), c(), u("for", "custom_" + s.name), c(), x(" ", s.helpText || s.label, " ")
    }
}

function lr(r, o) {
    if (r & 1 && g(0, "textarea", 45), r & 2) {
        let s = p(2).$implicit,
            e = p(3);
        u("id", "custom_" + s.name)("formControlName", "custom_" + s.name)("placeholder", s.helpText || "")("ngClass", he(4, De, e.validationErrors()["custom_" + s.name]))
    }
}

function dr(r, o) {
    if (r & 1 && g(0, "input", 46), r & 2) {
        let s = p(2).$implicit,
            e = p(3);
        u("id", "custom_" + s.name)("formControlName", "custom_" + s.name)("placeholder", s.helpText || "")("ngClass", he(4, De, e.validationErrors()["custom_" + s.name]))
    }
}

function cr(r, o) {
    if (r & 1 && _(0, lr, 1, 6, "textarea", 45)(1, dr, 1, 6, "input", 46), r & 2) {
        let s = p().$implicit;
        b(s.textArea ? 0 : 1)
    }
}

function mr(r, o) {
    if (r & 1 && (n(0, "div", 31), l(1), a()), r & 2) {
        let s = p().$implicit,
            e = p(3);
        c(), x(" ", e.validationErrors()["custom_" + s.name], " ")
    }
}

function pr(r, o) {
    if (r & 1 && (n(0, "small", 32), l(1), a()), r & 2) {
        let s = p().$implicit;
        c(), T(s.helpText)
    }
}

function ur(r, o) {
    if (r & 1 && (n(0, "div", 26)(1, "label", 36), l(2), _(3, ir, 2, 0, "span", 37), a(), _(4, rr, 5, 6, "select", 38)(5, ar, 1, 6, "input", 39)(6, or, 1, 5, "input", 40)(7, sr, 4, 7, "div", 41)(8, cr, 2, 1), _(9, mr, 2, 1, "div", 31), _(10, pr, 2, 1, "small", 32), a()), r & 2) {
        let s, e = o.$implicit,
            t = p(3);
        c(), u("for", "custom_" + e.name), c(), x(" ", e.label, " "), c(), b(e.required ? 3 : -1), c(), b((s = e.type) === "select" ? 4 : s === "number" ? 5 : s === "date" ? 6 : s === "boolean" ? 7 : 8), c(5), b(t.validationErrors()["custom_" + e.name] ? 9 : -1), c(), b(e.helpText && e.type !== "boolean" ? 10 : -1)
    }
}

function gr(r, o) {
    if (r & 1 && (n(0, "div", 33)(1, "h6", 35), l(2, "Custom Fields"), a(), $(3, ur, 11, 6, "div", 26, Qn), a()), r & 2) {
        let s = p(2);
        c(3), j(s.selectedMessageTypeDetails().customFields)
    }
}

function hr(r, o) {
    if (r & 1 && (n(0, "div", 34)(1, "small", 47), l(2, "Generated Key:"), a(), n(3, "div", 48), l(4), a()()), r & 2) {
        let s = p(2);
        c(4), x(" ", s.generatedKey(), " ")
    }
}

function fr(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 7)(1, "h4", 25), l(2, " Message Configuration "), a(), n(3, "div", 26)(4, "label", 27), l(5, "Message Type"), a(), n(6, "select", 28), h("change", function(t) {
            v(s);
            let i = p();
            return C(i.onMessageTypeChange(t))
        }), n(7, "option", 29), l(8, " Select a message type "), a(), $(9, Xn, 2, 2, "option", 30, Hn), a(), _(11, er, 2, 0, "div", 31), _(12, tr, 2, 1, "small", 32), a(), _(13, gr, 5, 0, "div", 33), _(14, hr, 5, 1, "div", 34), a()
    }
    if (r & 2) {
        let s = p();
        c(6), u("ngClass", he(5, De, s.validationErrors().messageType)), c(3), j(s.availableMessageTypes()), c(2), b(s.validationErrors().messageType ? 11 : -1), c(), b(s.selectedMessageTypeDetails() ? 12 : -1), c(), b(s.selectedMessageTypeDetails() && s.selectedMessageTypeDetails().customFields.length > 0 ? 13 : -1), c(), b(s.generatedKey() ? 14 : -1)
    }
}

function _r(r, o) {
    if (r & 1 && (n(0, "div", 8)(1, "h4", 49), l(2, "Editing Message"), a(), n(3, "div", 50)(4, "strong"), l(5, "Type:"), a(), n(6, "span", 24), l(7), a()(), n(8, "div", 50)(9, "strong"), l(10, "Key:"), a(), n(11, "span", 51), l(12), a()()()), r & 2) {
        let s = p();
        c(7), T(s.message.type), c(5), T(s.message.key)
    }
}

function br(r, o) {
    r & 1 && (g(0, "i", 71), l(1, " Hide Advanced "))
}

function yr(r, o) {
    r & 1 && (g(0, "i", 72), l(1, " Show Advanced "))
}

function xr(r, o) {
    r & 1 && (n(0, "div", 69)(1, "label", 58)(2, "span", 73), l(3, "Reasoning"), a(), l(4, " Reasoning Effort "), a(), n(5, "select", 74)(6, "option", 75), l(7, "Default (Model decides)"), a(), n(8, "option", 76), l(9, "Low - Quick reasoning"), a(), n(10, "option", 77), l(11, " Medium - Balanced reasoning "), a(), n(12, "option", 78), l(13, "High - Deep reasoning"), a()()())
}

function vr(r, o) {
    if (r & 1 && (n(0, "div", 70)(1, "h6", 79), g(2, "i", 80), l(3, " Prompt Preview "), a(), n(4, "div", 81)(5, "div", 26)(6, "small", 82), l(7, "System Instructions:"), a(), n(8, "div", 83), l(9), a()(), n(10, "div")(11, "small", 82), l(12, "User Input:"), a(), n(13, "div", 83), l(14), a()()(), n(15, "small", 84), g(16, "i", 85), l(17, " This preview shows the final prompts that will be sent to the AI model. "), a()()), r & 2) {
        let s = p(2);
        c(9), x(" ", s.generatedPrompts().systemPrompt, " "), c(5), x(" ", s.generatedPrompts().userPrompt, " ")
    }
}

function Cr(r, o) {
    r & 1 && (n(0, "div")(1, "label", 58)(2, "span", 86), l(3, "Instructions"), a(), l(4, " System Instructions "), a(), g(5, "textarea", 87), a(), n(6, "div")(7, "label", 58)(8, "span", 86), l(9, "Input"), a(), l(10, " User Input "), a(), g(11, "textarea", 88), a())
}

function Sr(r, o) {
    r & 1 && (n(0, "div", 100)(1, "label", 101), l(2, "Schema Name"), a(), g(3, "input", 111), a())
}

function Mr(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 105)(1, "label", 101), l(2, "Schema Definition"), a(), n(3, "textarea", 112), h("input", function(t) {
            v(s);
            let i = p(3);
            return C(i.updateJsonSchemaFromText(t))
        }), a(), n(4, "div", 113)(5, "small", 114), l(6, " Enter a valid JSON schema object. This will be used to validate the AI response structure. "), a()()()
    }
    if (r & 2) {
        let s = p(3);
        c(3), u("value", s.getJsonSchemaText())
    }
}

function wr(r, o) {
    if (r & 1 && (g(0, "hr", 89), n(1, "div", 90)(2, "h6", 91), g(3, "i", 92), l(4, " Advanced Configuration "), a(), n(5, "div", 70)(6, "h6", 79), g(7, "i", 93), l(8, " Tools & Search "), a(), n(9, "div", 94)(10, "div", 69)(11, "div", 41), g(12, "input", 95), n(13, "label", 96), l(14, " Enable Web Search "), a()()(), n(15, "div", 69)(16, "select", 97)(17, "option", 76), l(18, "Low Context"), a(), n(19, "option", 77), l(20, "Medium Context"), a(), n(21, "option", 78), l(22, "High Context"), a()()()()(), n(23, "div", 70)(24, "h6", 79), g(25, "i", 98), l(26, " Response Format "), a(), n(27, "div", 99)(28, "div", 100)(29, "label", 101), l(30, "Format Type"), a(), n(31, "select", 102)(32, "option", 103), l(33, "Text (Markdown)"), a(), n(34, "option", 104), l(35, "JSON Schema"), a()()(), _(36, Sr, 4, 0, "div", 100), a(), _(37, Mr, 7, 1, "div", 105), a(), n(38, "div", 70)(39, "h6", 79), g(40, "i", 106), l(41, " Parameters "), a(), n(42, "div", 94)(43, "div", 107)(44, "label", 101), l(45, "Temperature"), a(), g(46, "input", 108), a(), n(47, "div", 107)(48, "label", 101), l(49, "Top P"), a(), g(50, "input", 109), a(), n(51, "div", 107)(52, "label", 101), l(53, "Max Tokens"), a(), g(54, "input", 110), a()()()()), r & 2) {
        let s, e, t = p(2);
        c(36), b(((s = t.promptForm.get("responseFormatType")) == null ? null : s.value) === "json_schema" ? 36 : -1), c(), b(((e = t.promptForm.get("responseFormatType")) == null ? null : e.value) === "json_schema" ? 37 : -1)
    }
}

function Tr(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 9)(1, "div", 52)(2, "div", 53)(3, "h3", 13), l(4, " Basic Configuration "), a(), n(5, "button", 54), h("click", function() {
            v(s);
            let t = p();
            return C(t.showAdvancedConfig.set(!t.showAdvancedConfig()))
        }), _(6, br, 2, 0)(7, yr, 2, 0), a()()(), n(8, "div", 55)(9, "div", 56)(10, "div", 57)(11, "div")(12, "label", 58)(13, "span", 59), l(14, "Model"), a(), l(15, " AI Model "), a(), n(16, "select", 60)(17, "option", 61), l(18, "GPT 5.0"), a(), n(19, "option", 62), l(20, "GPT 5.0 Mini"), a(), n(21, "option", 63), l(22, "GPT 5.0 Nano"), a(), n(23, "option", 64), l(24, "GPT 4.1"), a(), n(25, "option", 65), l(26, "GPT 4o"), a(), n(27, "option", 66), l(28, "GPT 4.1-mini"), a(), n(29, "option", 67), l(30, "GPT 4o-mini"), a(), n(31, "option", 68), l(32, "GPT o4-mini"), a()()(), _(33, xr, 14, 0, "div", 69), a(), _(34, vr, 18, 2, "div", 70), _(35, Cr, 12, 0), a(), _(36, wr, 55, 2), a()()
    }
    if (r & 2) {
        let s = p();
        c(6), b(s.showAdvancedConfig() ? 6 : 7), c(5), tt(s.isModelReasoningCapable() ? "col-md-6" : "col-md-12"), c(22), b(s.isModelReasoningCapable() ? 33 : -1), c(), b(s.isUsingMessageType() && s.generatedPrompts().systemPrompt ? 34 : -1), c(), b(s.isUsingMessageType() ? -1 : 35), c(), b(s.showAdvancedConfig() ? 36 : -1)
    }
}

function kr(r, o) {
    r & 1 && g(0, "span", 16)
}

function Fr(r, o) {
    r & 1 && l(0, " Regenerate ")
}

function Er(r, o) {
    r & 1 && l(0, " Generate ")
}

function Pr(r, o) {
    if (r & 1 && (n(0, "div", 115)(1, "span", 116), g(2, "i", 117), l(3, " Markdown Response "), a()(), n(4, "div", 118), g(5, "markdown", 119), a()), r & 2) {
        let s = p();
        c(5), u("data", s.formattedJsonMessage())
    }
}

function Ar(r, o) {
    r & 1 && (n(0, "div", 19), g(1, "i", 120), n(2, "p", 121), l(3, ' No response yet. Click "Generate" to create a response. '), a()())
}
var Tt = (() => {
    let o = class o {
        constructor(e, t, i) {
            this.modalRef = e, this._fb = t, this._aiService = i, this.saving = F(!1), this.currentMessage = F(""), this.currentPrompts = F([]), this.messageUpdate = F(null), this.keyError = F(null), this.isResponsesFormat = F(!1), this.availableMessageTypes = F([]), this.selectedMessageTypeDetails = F(null), this.generatedKey = F(""), this.customFieldValues = F({}), this.generatedPrompts = F({
                systemPrompt: "",
                userPrompt: ""
            }), this.showAdvancedConfig = F(!1), this.validationErrors = F({}), this.modelReasoningCapable = F(!1), this.isUsingMessageType = O(() => !!this.selectedMessageTypeDetails()), this.isModelReasoningCapable = O(() => this.modelReasoningCapable()), this.isJsonMessage = O(() => {
                let d = this.currentMessage();
                if (!d) return !1;
                try {
                    let m = JSON.parse(d);
                    return typeof m == "object" && m !== null
                } catch {
                    return !1
                }
            }), this.isJsonResponse = O(() => !!(this.isJsonMessage() || this.promptForm.get("responseFormatType") ? .value === "json_schema" || this.message ? .prompt && typeof this.message.prompt == "object" && "config" in this.message.prompt && this.message.prompt.config ? .text ? .format ? .type === "json_schema")), this.formattedJsonMessage = O(() => {
                let d = this.currentMessage();
                if (!d || !this.isJsonMessage()) return d;
                try {
                    let m = JSON.parse(this.message ? .message || ""),
                        f = "",
                        y = S => S.replace(/(^|_)(\w)/g, (N, me, Z) => Z.toUpperCase());
                    for (let [S, N] of Object.entries(m)) f += `

### ${y(S).trim()}:

 ${N}
`;
                    return f
                } catch {
                    return d
                }
            }), this.message = null, this.promptForm = this._fb.group({
                system: this._fb.control(""),
                user: this._fb.control(""),
                model: this._fb.control("gpt-4.1"),
                key: this._fb.control("", [Q.required, this.keyFormatValidator()]),
                type: this._fb.control("", [Q.required]),
                messageType: this._fb.control(""),
                reasoningEffort: this._fb.control({
                    value: null,
                    disabled: !0
                }),
                temperature: this._fb.control(null),
                topP: this._fb.control(null),
                maxOutputTokens: this._fb.control(null),
                responseFormatType: this._fb.control("text"),
                jsonSchemaName: this._fb.control(""),
                jsonSchema: this._fb.control(null),
                enableWebSearch: this._fb.control(!1),
                enableFileSearch: this._fb.control(!1),
                webSearchContext: this._fb.control({
                    value: "medium",
                    disabled: !0
                }),
                store: this._fb.control(!0),
                parallelToolCalls: this._fb.control(!0)
            }), this.responsesFormatTypes = ["recent-news-ai"]
        }
        keyFormatValidator() {
            return e => {
                if (!e.value) return null;
                if (this.promptForm ? .get("type") ? .value === "recent-news-ai") {
                    if (!/^[A-Z]+-recent-news-\d{4}-\d{2}-\d{2}$/.test(e.value)) return {
                        keyFormat: !0
                    }
                } else if (!/^[A-Z]+-\d{4}-[1-4]$/.test(e.value)) return {
                    keyFormat: !0
                };
                return null
            }
        }
        getKeyErrorMessage() {
            let e = this.promptForm.get("key"),
                i = this.promptForm.get("type") ? .value;
            if (e ? .errors) {
                if (e.errors.required) return "Key is required";
                if (e.errors.keyFormat) return i === "recent-news-ai" ? "Key must be in format: TICKER-recent-news-YYYY-MM-DD (e.g., TSLA-recent-news-2024-01-15)" : "Key must be in format: TICKER-YEAR-QUARTER (e.g., TSLA-2025-1)"
            }
            return ""
        }
        ngOnInit() {
            this.loadMessageTypes();
            let e = this.promptForm.get("model") ? .value || "",
                t = this.checkModelReasoningCapability(e);
            this.modelReasoningCapable.set(t);
            let i = this.promptForm.get("reasoningEffort");
            if (i && (t ? i.enable() : i.disable()), this.currentMessage.set(this.message ? .message || ""), this.message ? .prompt) {
                let d = "",
                    m = "",
                    f = this.message.model,
                    y = this.message.key || "",
                    S = this.message.type || "";
                if (this.isResponsesFormatPrompt(this.message.prompt)) this.isResponsesFormat.set(!0), d = this.message.prompt.config ? .instructions || "", m = typeof this.message.prompt.input == "string" ? this.message.prompt.input : "";
                else if (Array.isArray(this.message.prompt) && this.message.prompt.length > 0) {
                    this.isResponsesFormat.set(!1);
                    let N = this.message.prompt.find(Z => Z ? .role === "system"),
                        me = this.message.prompt.find(Z => Z ? .role === "user");
                    d = N ? .content || "", m = me ? .content || ""
                } else this.isResponsesFormat.set(!1), console.warn("Unknown prompt format:", this.message.prompt);
                this.promptForm.patchValue({
                    system: d,
                    user: m,
                    model: f,
                    key: y,
                    type: S,
                    messageType: S
                }), this.populateAdvancedConfigFromMessage()
            } else this.isResponsesFormat.set(!1), this.promptForm.patchValue({
                model: "gpt-4.1",
                type: ""
            });
            this.promptForm.get("type") ? .valueChanges.subscribe(d => {
                let m = d ? this.responsesFormatTypes.includes(d) : !1;
                this.isResponsesFormat.set(m)
            }), this.promptForm.get("model") ? .valueChanges.subscribe(d => {
                let m = this.checkModelReasoningCapability(d || "");
                this.modelReasoningCapable.set(m);
                let f = this.promptForm.get("reasoningEffort");
                f && (m ? f.enable() : (f.disable(), f.setValue(null)))
            }), this.promptForm.get("enableWebSearch") ? .valueChanges.subscribe(d => {
                let m = this.promptForm.get("webSearchContext");
                m && (d ? m.enable() : m.disable())
            })
        }
        save() {
            let e = this.messageUpdate();
            if (e !== null)
                if (this.message) this.saving.set(!0), this._aiService.updateAiMessage(e).pipe(V(() => this.saving.set(!1))).subscribe(() => {
                    this._aiService.refreshMessages(), this.modalRef.hide()
                });
                else {
                    this.saving.set(!0);
                    let t = this.promptForm.value,
                        i;
                    if (this.isResponsesFormat()) {
                        let m = this.getToolsForType(t.type || "");
                        i = {
                            input: t.user || "",
                            tools: m,
                            config: {
                                instructions: t.system || "",
                                store: !0
                            }
                        }
                    } else i = [{
                        role: "system",
                        content: t.system || ""
                    }, {
                        role: "user",
                        content: t.user || ""
                    }];
                    let d = pe(P({}, e), {
                        key: t.key || "",
                        type: t.type || "",
                        prompt: i
                    });
                    this._aiService.createAiMessage(d).pipe(V(() => this.saving.set(!1))).subscribe(() => {
                        this._aiService.refreshMessages(), this.modalRef.hide()
                    })
                }
        }
        regenerate() {
            let e = this.promptForm.value,
                t;
            if (this.isUsingMessageType()) {
                let i = this.generatedPrompts(),
                    d = this.getToolsForType(e.type || this.message ? .type || "");
                if (!i.userPrompt || !i.systemPrompt) {
                    console.error("Generated prompts are empty for message type");
                    return
                }
                t = {
                    input: i.userPrompt,
                    tools: d,
                    config: P({
                        instructions: i.systemPrompt,
                        store: !0
                    }, this.buildAdvancedConfig())
                }
            } else {
                let i = this.getToolsForType(e.type || this.message ? .type || "");
                t = {
                    input: e.user || "",
                    tools: i,
                    config: {
                        instructions: e.system || "",
                        store: !0
                    }
                }
            }
            this.saving.set(!0), this._aiService.regenerateAiMessage(t, this.migrateResponseType(this.message ? .responseType), e.model || this.message ? .model || "gpt-4.1").pipe(V(() => this.saving.set(!1))).subscribe(({
                message: i
            }) => {
                this.messageUpdate.set({
                    id: this.message ? .id || "",
                    key: e.key || this.message ? .key || "",
                    type: e.type || this.message ? .type || "",
                    createdAt: this.message ? .createdAt || new Date,
                    updatedAt: this.message ? .updatedAt || new Date,
                    prompt: t,
                    message: i,
                    model: e.model || this.message ? .model || "gpt-4.1"
                }), this.currentMessage.set(i)
            })
        }
        isResponsesFormatPrompt(e) {
            return e && typeof e == "object" && "input" in e && "config" in e
        }
        getToolsForType(e) {
            switch (e) {
                case "recent-news-ai":
                    return [{
                        type: "web_search"
                    }];
                default:
                    return []
            }
        }
        checkModelReasoningCapability(e) {
            return e.startsWith("o") && !e.includes("gpt") || e.startsWith("gpt-5") || e.includes("reasoning")
        }
        migrateResponseType(e) {
            return e === "json_object" || e === "json_schema" ? "json_schema" : "text"
        }
        formatValueForKey(e) {
            return e.replace(/\s+/g, "-").replace(/[^A-Za-z0-9\.\-]/g, "").replace(/\-+/g, "-").replace(/^-|-$/g, "")
        }
        populateAdvancedConfigFromMessage() {
            if (!this.message ? .prompt) return;
            let e = {},
                t = !1;
            if (this.isResponsesFormatPrompt(this.message.prompt)) {
                let i = this.message.prompt.config;
                if (i ? .temperature !== void 0 && (e.temperature = i.temperature, t = !0), i ? .top_p !== void 0 && (e.topP = i.top_p, t = !0), i ? .max_output_tokens !== void 0 && (e.maxOutputTokens = i.max_output_tokens, t = !0), i ? .reasoning ? .effort && (e.reasoningEffort = i.reasoning.effort, t = !0), i ? .store !== void 0 && (e.store = i.store, t = !0), i ? .parallel_tool_calls !== void 0 && (e.parallelToolCalls = i.parallel_tool_calls, t = !0), i ? .text ? .format) {
                    let d = i.text.format;
                    d.type === "json_schema" ? (e.responseFormatType = "json_schema", d.name && (e.jsonSchemaName = d.name), d.schema && (e.jsonSchema = d.schema), t = !0) : e.responseFormatType = "text"
                }
                if (this.message.prompt.tools) {
                    let d = this.message.prompt.tools;
                    d.some(y => y.type === "web_search") && (e.enableWebSearch = !0, t = !0), d.some(y => y.type === "file_search") && (e.enableFileSearch = !0, t = !0)
                }
            } else {
                let i = this.message.prompt;
                i.response_format && (i.response_format.type === "json_schema" ? (e.responseFormatType = "json_schema", i.response_format.name && (e.jsonSchemaName = i.response_format.name), i.response_format.schema && (e.jsonSchema = i.response_format.schema), t = !0) : i.response_format.type === "json_object" ? (e.responseFormatType = "json_schema", t = !0) : e.responseFormatType = "text"), i.temperature !== void 0 && (e.temperature = i.temperature, t = !0), i.top_p !== void 0 && (e.topP = i.top_p, t = !0), (i.max_tokens !== void 0 || i.max_output_tokens !== void 0) && (e.maxOutputTokens = i.max_tokens || i.max_output_tokens, t = !0)
            }
            Object.keys(e).length > 0 && this.promptForm.patchValue(e), t && this.showAdvancedConfig.set(!0)
        }
        get promptTools() {
            if (this.message ? .prompt && "tools" in this.message.prompt) {
                let e = this.message.prompt.tools;
                return Array.isArray(e) ? e : []
            }
            return []
        }
        onMessageTypeChange(e) {
            let i = e.target.value;
            if (!i) {
                this.selectedMessageTypeDetails.set(null), this.generatedKey.set(""), this.generatedPrompts.set({
                    systemPrompt: "",
                    userPrompt: ""
                }), this.removeCustomFieldControls(), this.message || this.showAdvancedConfig.set(!1);
                return
            }
            let d = this.availableMessageTypes().find(m => m.id === i);
            if (d) {
                if (this.selectedMessageTypeDetails.set(d), this.message || this.resetFormToDefaults(), this.promptForm.patchValue({
                        messageType: i,
                        type: i
                    }), d.defaultModel) {
                    this.promptForm.patchValue({
                        model: d.defaultModel
                    });
                    let S = this.checkModelReasoningCapability(d.defaultModel);
                    this.modelReasoningCapable.set(S);
                    let N = this.promptForm.get("reasoningEffort");
                    N && (S ? N.enable() : (N.disable(), N.setValue(null)))
                }
                if (d.toolsConfig) {
                    let S = {};
                    d.toolsConfig.webSearch && (S.enableWebSearch = d.toolsConfig.webSearch.enabled, S.webSearchContext = d.toolsConfig.webSearch.searchContextSize), d.toolsConfig.fileSearch && (S.enableFileSearch = d.toolsConfig.fileSearch.enabled), this.promptForm.patchValue(S)
                }
                if (d.config) {
                    let S = {};
                    d.config.temperature !== void 0 && (S.temperature = d.config.temperature), d.config.maxTokens !== void 0 && (S.maxOutputTokens = d.config.maxTokens), d.config.reasoning ? .effort && (S.reasoningEffort = d.config.reasoning.effort), this.promptForm.patchValue(S)
                }
                let m = {
                    responseFormatType: d.responseFormat ? .type || "text"
                };
                m.jsonSchemaName = "", m.jsonSchema = null, d.responseFormat && (d.responseFormat.name && (m.jsonSchemaName = d.responseFormat.name), d.responseFormat.schema && (m.jsonSchema = d.responseFormat.schema)), this.promptForm.patchValue(m);
                let f = !!(d.toolsConfig || d.config || d.responseFormat);
                this.showAdvancedConfig.set(f), this.removeCustomFieldControls();
                let y = {};
                if (d.customFields.forEach(S => {
                        let N = `custom_${S.name}`,
                            me = [];
                        S.required && me.push(Q.required), S.validation ? .pattern && me.push(Q.pattern(S.validation.pattern));
                        let Z = S.defaultValue !== void 0 ? S.defaultValue : "";
                        this.promptForm.addControl(N, this._fb.control(Z, me)), y[S.name] = Z, this.promptForm.get(N) ? .valueChanges.subscribe(Je => {
                            this.onCustomFieldChange(S.name, Je)
                        })
                    }), this.customFieldValues.set(y), this.updateGeneratedContent(), !this.message) {
                    let S = this.generatedPrompts(),
                        N = this.generatedKey();
                    this.promptForm.patchValue({
                        system: S.systemPrompt,
                        user: S.userPrompt,
                        key: N
                    })
                }
            }
        }
        removeCustomFieldControls() {
            Object.keys(this.promptForm.controls).filter(t => t.startsWith("custom_")).forEach(t => {
                this.promptForm.removeControl(t)
            })
        }
        updateGeneratedContent() {
            let e = this.selectedMessageTypeDetails();
            if (!e) return;
            let t = this.customFieldValues(),
                i = e.keyFormat;
            Object.entries(t).forEach(([f, y]) => {
                let S = this.formatValueForKey(String(y || ""));
                i = i.replace(`{${f}}`, S)
            }), this.generatedKey.set(i);
            let d = e.systemTemplate,
                m = e.userTemplate;
            Object.entries(t).forEach(([f, y]) => {
                let S = String(y || "");
                d = d.replace(new RegExp(`\\{${f}\\}`, "g"), S), m = m.replace(new RegExp(`\\{${f}\\}`, "g"), S)
            }), this.generatedPrompts.set({
                systemPrompt: d,
                userPrompt: m
            })
        }
        onCustomFieldChange(e, t) {
            let i = this.customFieldValues();
            if (this.customFieldValues.set(pe(P({}, i), {
                    [e]: t
                })), this.validateCustomField(e, t), this.updateGeneratedContent(), !this.message) {
                let d = this.generatedPrompts(),
                    m = this.generatedKey();
                this.promptForm.patchValue({
                    system: d.systemPrompt,
                    user: d.userPrompt,
                    key: m
                })
            }
        }
        validateCustomField(e, t) {
            let i = this.selectedMessageTypeDetails();
            if (!i) return;
            let d = i.customFields.find(y => y.name === e);
            if (!d) return;
            let m = this.validationErrors(),
                f = `custom_${e}`;
            d.required && (!t || t === "") ? m[f] = `${d.label} is required` : d.validation && d.validation.pattern && t ? new RegExp(d.validation.pattern).test(String(t)) ? m[f] = null : m[f] = d.validation.message || `${d.label} format is invalid` : m[f] = null, this.validationErrors.set(P({}, m))
        }
        buildAdvancedConfig() {
            let e = this.promptForm.value,
                t = {};
            if (e.temperature !== void 0 && e.temperature !== null && (t.temperature = parseFloat(e.temperature)), e.topP !== void 0 && e.topP !== null && (t.top_p = parseFloat(e.topP)), e.maxOutputTokens !== void 0 && e.maxOutputTokens !== null && (t.max_output_tokens = parseInt(e.maxOutputTokens, 10)), e.reasoningEffort && e.reasoningEffort !== "" && (t.reasoning = {
                    effort: e.reasoningEffort
                }), e.responseFormatType === "json_schema") {
                let i = {
                    type: "json_schema",
                    name: e.jsonSchemaName || "response_schema",
                    strict: !0
                };
                e.jsonSchema && typeof e.jsonSchema == "object" && e.jsonSchema !== null ? i.schema = pe(P({}, e.jsonSchema), {
                    additionalProperties: !1
                }) : i.schema = {
                    type: "object",
                    properties: {
                        response: {
                            type: "string",
                            description: "The response content"
                        }
                    },
                    required: ["response"],
                    additionalProperties: !1
                }, t.text = {
                    format: i
                }
            }
            return t
        }
        getJsonSchemaText() {
            let e = this.promptForm.get("jsonSchema") ? .value;
            if (!e) return "";
            try {
                return JSON.stringify(e, null, 2)
            } catch {
                return ""
            }
        }
        updateJsonSchemaFromText(e) {
            let t = e.target.value;
            if (!t.trim()) {
                this.promptForm.patchValue({
                    jsonSchema: null
                });
                return
            }
            try {
                let i = JSON.parse(t);
                this.promptForm.patchValue({
                    jsonSchema: i
                })
            } catch {}
        }
        resetFormToDefaults() {
            this.promptForm.patchValue({
                system: "",
                user: "",
                model: "gpt-4.1",
                key: "",
                reasoningEffort: null,
                temperature: null,
                topP: null,
                maxOutputTokens: null,
                responseFormatType: "text",
                jsonSchemaName: "",
                jsonSchema: null,
                enableWebSearch: !1,
                enableFileSearch: !1,
                webSearchContext: "medium",
                store: !0,
                parallelToolCalls: !0
            });
            let e = this.promptForm.get("reasoningEffort"),
                t = this.promptForm.get("webSearchContext");
            e && e.disable(), t && t.disable(), this.modelReasoningCapable.set(!1), this.generatedKey.set(""), this.generatedPrompts.set({
                systemPrompt: "",
                userPrompt: ""
            }), this.currentMessage.set(""), this.messageUpdate.set(null)
        }
        loadMessageTypes() {
            this._aiService.getMessageTypes().subscribe({
                next: e => {
                    this.availableMessageTypes.set(e)
                },
                error: e => {
                    console.error("Failed to load message types:", e), this.availableMessageTypes.set([])
                }
            })
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(w(we), w(Se), w(Fe))
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-ai-message-edit-modal"]
        ],
        inputs: {
            message: "message"
        },
        decls: 32,
        vars: 11,
        consts: [
            [1, "flex", "flex-col", "h-full"],
            [1, "modal-header", "border-bottom-0", "pb-0"],
            [1, "modal-title", "fw-bold"],
            ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close", 3, "click"],
            [1, "p-4"],
            [1, "flex", "flex-row", "max-h-[80vh]", "rounded-lg", "border", 3, "formGroup"],
            [1, "w-1/2", "overflow-y-auto", "p-4", "border-end"],
            [1, "mb-4", "bg-light", "p-3", "rounded", "border-start", "border-4", "border-primary"],
            [1, "mb-4", "bg-light", "p-3", "rounded", "border-start", "border-4", "border-info"],
            [1, "card", "mb-4", "border-0", "shadow-sm", "bg-white", "dark:bg-gray-800"],
            [1, "w-1/2", "overflow-y-auto", "p-4"],
            [1, "card", "border-0", "shadow-sm", "mb-4", "h-full"],
            [1, "card-header", "bg-primary", "bg-opacity-10", "dark:bg-blue-900/20", "py-3", "d-flex", "justify-content-between", "align-items-center"],
            [1, "fs-5", "fw-bold", "mb-0", "text-primary", "dark:text-blue-400"],
            [1, "d-flex", "gap-2"],
            ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click", "disabled"],
            ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-1"],
            [1, "card-body", "p-0", "h-full"],
            [1, "bg-light", "dark:bg-gray-800", "p-3", "min-h-[500px]", "h-full", "overflow-y-auto"],
            [1, "text-center", "text-muted", "dark:text-gray-400", "py-5"],
            [1, "modal-footer", "border-top-0", "pt-0"],
            ["type", "button", 1, "btn", "btn-light", 3, "click", "disabled"],
            ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"],
            [3, "loading"],
            [1, "text-primary"],
            [1, "fs-5", "fw-bold", "mb-3", "text-primary"],
            [1, "mb-3"],
            ["for", "messageType", 1, "form-label", "fw-semibold"],
            ["id", "messageType", "formControlName", "messageType", 1, "form-select", 3, "change", "ngClass"],
            ["value", "", "disabled", "", "selected", ""],
            [3, "value"],
            [1, "invalid-feedback"],
            [1, "form-text", "text-muted"],
            [1, "border-top", "pt-3"],
            [1, "mt-3", "p-2", "bg-success", "bg-opacity-10", "rounded", "border", "border-success"],
            [1, "fw-semibold", "mb-3", "text-secondary"],
            [1, "form-label", 3, "for"],
            [1, "text-danger"],
            [1, "form-select", "form-select-sm", 3, "id", "formControlName", "ngClass"],
            ["type", "number", 1, "form-control", "form-control-sm", 3, "id", "formControlName", "placeholder", "ngClass"],
            ["type", "date", 1, "form-control", "form-control-sm", 3, "id", "formControlName", "ngClass"],
            [1, "form-check"],
            ["value", "", "disabled", ""],
            ["type", "checkbox", 1, "form-check-input", 3, "id", "formControlName", "ngClass"],
            [1, "form-check-label", 3, "for"],
            ["rows", "4", 1, "form-control", "form-control-sm", 3, "id", "formControlName", "placeholder", "ngClass"],
            ["type", "text", 1, "form-control", "form-control-sm", 3, "id", "formControlName", "placeholder", "ngClass"],
            [1, "text-success", "fw-semibold"],
            [1, "font-monospace", "text-success"],
            [1, "fs-5", "fw-bold", "mb-2", "text-info"],
            [1, "mb-2", "flex", "flex-row", "gap-2"],
            [1, "font-monospace"],
            [1, "card-header", "bg-primary", "bg-opacity-10", "dark:bg-blue-900/20", "py-3"],
            [1, "d-flex", "justify-content-between", "align-items-center"],
            ["type", "button", 1, "btn", "btn-sm", "btn-outline-primary", 3, "click"],
            [1, "card-body"],
            [1, "space-y-4"],
            [1, "row", "g-3", "mb-4"],
            [1, "form-label", "fw-semibold", "text-dark", "dark:text-gray-200"],
            [1, "badge", "bg-primary", "bg-opacity-10", "text-primary", "dark:bg-blue-900/20", "dark:text-blue-400", "me-2"],
            ["formControlName", "model", 1, "form-select", "bg-white", "dark:bg-gray-700", "text-dark", "dark:text-gray-200", "border-light", "dark:border-gray-600"],
            ["value", "gpt-5"],
            ["value", "gpt-5-mini"],
            ["value", "gpt-5-nano"],
            ["value", "gpt-4.1"],
            ["value", "gpt-4o"],
            ["value", "gpt-4.1-mini"],
            ["value", "gpt-4o-mini"],
            ["value", "o4-mini"],
            [1, "col-md-6"],
            [1, "mb-4"],
            [1, "fas", "fa-chevron-up", "me-1"],
            [1, "fas", "fa-chevron-down", "me-1"],
            [1, "badge", "bg-warning", "bg-opacity-10", "text-warning", "dark:bg-yellow-900/20", "dark:text-yellow-400", "me-2"],
            ["formControlName", "reasoningEffort", 1, "form-select", "bg-white", "dark:bg-gray-700", "text-dark", "dark:text-gray-200", "border-light", "dark:border-gray-600"],
            ["value", ""],
            ["value", "low"],
            ["value", "medium"],
            ["value", "high"],
            [1, "fw-semibold", "mb-3", "text-dark", "dark:text-gray-200"],
            [1, "fas", "fa-eye", "me-2", "text-info"],
            [1, "border", "rounded", "bg-light", "dark:bg-gray-700", "p-3"],
            [1, "fw-semibold", "text-muted"],
            [1, "mt-1", "p-2", "bg-white", "dark:bg-gray-800", "rounded", "border", "font-monospace", "small", 2, "white-space", "pre-wrap"],
            [1, "form-text", "text-info"],
            [1, "fas", "fa-info-circle", "me-1"],
            [1, "badge", "bg-success", "bg-opacity-10", "text-success", "dark:bg-green-900/20", "dark:text-green-400", "me-2"],
            ["rows", "8", "formControlName", "system", "placeholder", "Enter system instructions...", 1, "form-control", "bg-white", "dark:bg-gray-700", "text-dark", "dark:text-gray-200", "border-light", "dark:border-gray-600"],
            ["rows", "8", "formControlName", "user", "placeholder", "Enter user input...", 1, "form-control", "bg-white", "dark:bg-gray-700", "text-dark", "dark:text-gray-200", "border-light", "dark:border-gray-600"],
            [1, "my-4"],
            [1, "mt-4"],
            [1, "fw-semibold", "mb-4", "text-secondary", "dark:text-gray-300"],
            [1, "fas", "fa-cog", "me-2"],
            [1, "fas", "fa-tools", "me-2", "text-primary"],
            [1, "row", "g-3"],
            ["type", "checkbox", "id", "enableWebSearch", "formControlName", "enableWebSearch", 1, "form-check-input"],
            ["for", "enableWebSearch", 1, "form-check-label"],
            ["formControlName", "webSearchContext", 1, "form-select", "form-select-sm"],
            [1, "fas", "fa-file-code", "me-2", "text-success"],
            [1, "flex", "flex-row", "gap-2"],
            [1, "w-1/2"],
            [1, "form-label", "form-label-sm"],
            ["formControlName", "responseFormatType", 1, "form-select", "form-select-sm"],
            ["value", "text"],
            ["value", "json_schema"],
            [1, "w-full"],
            [1, "fas", "fa-sliders-h", "me-2", "text-warning"],
            [1, "col-md-4"],
            ["type", "number", "formControlName", "temperature", "placeholder", "0.0 - 1.0", "step", "0.1", "min", "0", "max", "1", 1, "form-control", "form-control-sm"],
            ["type", "number", "formControlName", "topP", "placeholder", "0.0 - 1.0", "step", "0.1", "min", "0", "max", "1", 1, "form-control", "form-control-sm"],
            ["type", "number", "formControlName", "maxOutputTokens", "placeholder", "Max output tokens", 1, "form-control", "form-control-sm"],
            ["type", "text", "formControlName", "jsonSchemaName", "placeholder", "e.g., analysis_response", 1, "form-control", "form-control-sm"],
            ["rows", "12", "placeholder", '{"type": "object", "properties": {"result": {"type": "string"}}, "required": ["result"]}', 1, "form-control", "form-control-sm", "w-full", 2, "font-family", "'Monaco', 'Menlo', 'Ubuntu Mono', monospace", "font-size", "12px", 3, "input", "value"],
            [1, "form-text"],
            [1, "text-muted"],
            [1, "d-flex", "align-items-center", "mb-2"],
            [1, "badge", "bg-info", "bg-opacity-10", "text-info", "me-2"],
            [1, "fas", "fa-file-text", "me-1"],
            [1, "bg-white", "dark:bg-gray-900", "border", "rounded", "p-3"],
            [1, "[&>ul]:list-disc", "[&>ul>li]:mb-2", "[&>p>strong]:text-xl", "text-dark", "dark:text-gray-200", 3, "data"],
            [1, "fas", "fa-robot", "fa-2x", "mb-3", "opacity-50"],
            [1, "mb-0"]
        ],
        template: function(t, i) {
            t & 1 && (n(0, "div", 0)(1, "div", 1)(2, "h5", 2), _(3, Jn, 6, 2)(4, Zn, 1, 0), a(), n(5, "button", 3), h("click", function() {
                return i.modalRef.hide()
            }), a()(), n(6, "div", 4)(7, "div", 5)(8, "div", 6), _(9, fr, 15, 7, "div", 7)(10, _r, 13, 2, "div", 8), _(11, Tr, 37, 7, "div", 9), a(), n(12, "div", 10)(13, "div", 11)(14, "div", 12)(15, "h3", 13), l(16, " Response "), a(), n(17, "div", 14)(18, "button", 15), h("click", function() {
                return i.regenerate()
            }), _(19, kr, 1, 0, "span", 16), _(20, Fr, 1, 0)(21, Er, 1, 0), a()()(), n(22, "div", 17)(23, "div", 18), _(24, Pr, 6, 1)(25, Ar, 4, 0, "div", 19), a()()()()()(), n(26, "div", 20)(27, "button", 21), h("click", function() {
                return i.modalRef.hide()
            }), l(28, " Cancel "), a(), n(29, "button", 22), h("click", function() {
                return i.save()
            }), g(30, "qualtrim-loading-indicator", 23), l(31, " Save changes "), a()()()), t & 2 && (c(3), b(i.message ? 3 : 4), c(4), u("formGroup", i.promptForm), c(2), b(i.message ? 10 : 9), c(2), b(i.message || i.selectedMessageTypeDetails() ? 11 : -1), c(7), u("disabled", i.saving()), c(), b(i.saving() ? 19 : -1), c(), b(i.message ? 20 : 21), c(4), b(i.currentMessage() ? 24 : 25), c(3), u("disabled", i.saving()), c(2), u("disabled", !i.message && i.promptForm.invalid && !i.messageUpdate() || !i.messageUpdate() && i.message || i.saving()), c(), u("loading", i.saving()))
        },
        dependencies: [D, fe, di, li, Me, le, de, J, at, rt, Ce, z, ye, st, ot, xe, ve, qe, ke, Te],
        encapsulation: 2
    });
    let r = o;
    return r
})();
var Fi = (() => {
    let o = class o {
        constructor() {
            this.icons = {
                edit: pt,
                delete: mt,
                regenerate: ut
            }
        }
        agInit(e) {
            this.params = e, this.data = e.data
        }
        refresh(e) {
            return this.params = e, this.data = e.data, !0
        }
        onEdit() {
            this.params.context ? .componentParent ? .editMessage && this.params.context.componentParent.editMessage(this.data)
        }
        onDelete() {
            this.params.context ? .componentParent ? .deleteMessage && this.params.context.componentParent.deleteMessage(this.data)
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-actions-cell-renderer"]
        ],
        decls: 5,
        vars: 2,
        consts: [
            [1, "d-flex", "gap-1", "align-items-center", "justify-content-center"],
            ["type", "button", "title", "Edit message", 1, "btn", "btn-sm", "btn-outline-primary", "btn-icon", 3, "click"],
            [3, "icon"],
            ["type", "button", "title", "Delete message", 1, "btn", "btn-sm", "btn-outline-danger", "btn-icon", 3, "click"]
        ],
        template: function(t, i) {
            t & 1 && (n(0, "div", 0)(1, "button", 1), h("click", function() {
                return i.onEdit()
            }), g(2, "fa-icon", 2), a(), n(3, "button", 3), h("click", function() {
                return i.onDelete()
            }), g(4, "fa-icon", 2), a()()), t & 2 && (c(2), u("icon", i.icons.edit), c(2), u("icon", i.icons.delete))
        },
        dependencies: [D, We, Be],
        styles: [".btn-icon[_ngcontent-%COMP%]{width:32px;height:32px;display:flex;align-items:center;justify-content:center}"]
    });
    let r = o;
    return r
})();
var Ei = (() => {
    let o = class o {
        agInit(e) {
            this.params = e, this.value = e.value
        }
        refresh(e) {
            return this.params = e, this.value = e.value, !0
        }
        getDisplayName() {
            switch (this.value) {
                case "transcript_summary":
                    return "Transcript Summary";
                case "current_quarter_earnings":
                    return "Current Quarter Watch For";
                case "insights":
                    return "Insights";
                case "portfolio_ai_analysis":
                    return "Portfolio AI Analysis";
                case "recent-news-ai":
                    return "Recent News AI";
                default:
                    return this.value || "Unknown"
            }
        }
        getBadgeClass() {
            switch (this.value) {
                case "transcript_summary":
                    return "bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25";
                case "current_quarter_earnings":
                    return "bg-success bg-opacity-10 text-success border border-success border-opacity-25";
                case "insights":
                    return "bg-info bg-opacity-10 text-info border border-info border-opacity-25";
                case "portfolio_ai_analysis":
                    return "bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25";
                case "recent-news-ai":
                    return "bg-secondary bg-opacity-50 text-gray-500 border border-secondary border-opacity-25";
                default:
                    return "bg-light text-dark border border-light"
            }
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-type-cell-renderer"]
        ],
        decls: 2,
        vars: 2,
        consts: [
            [1, "badge", "rounded-pill", 3, "ngClass"]
        ],
        template: function(t, i) {
            t & 1 && (n(0, "span", 0), l(1), a()), t & 2 && (u("ngClass", i.getBadgeClass()), c(), x(" ", i.getDisplayName(), " "))
        },
        dependencies: [D, fe],
        styles: [".badge[_ngcontent-%COMP%]{font-size:.75rem;padding:.5rem .75rem;font-weight:500}"]
    });
    let r = o;
    return r
})();
var Pi = (() => {
    let o = class o {
        constructor() {
            this.formattedDate = "", this.formattedTime = "", this.fullDateTime = ""
        }
        agInit(e) {
            this.params = e, this.formatDate(e.value)
        }
        refresh(e) {
            return this.params = e, this.formatDate(e.value), !0
        }
        formatDate(e) {
            if (!e) {
                this.formattedDate = "-", this.formattedTime = "", this.fullDateTime = "";
                return
            }
            try {
                let t = new Date(e);
                if (isNaN(t.getTime())) {
                    this.formattedDate = "Invalid Date", this.formattedTime = "", this.fullDateTime = "";
                    return
                }
                this.formattedDate = t.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }), this.formattedTime = t.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: !0
                }), this.fullDateTime = t.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: !0,
                    timeZoneName: "short"
                })
            } catch {
                this.formattedDate = "Invalid Date", this.formattedTime = "", this.fullDateTime = ""
            }
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-date-cell-renderer"]
        ],
        decls: 5,
        vars: 3,
        consts: [
            [1, "date-container", 3, "title"],
            [1, "date-main"],
            [1, "time-secondary"]
        ],
        template: function(t, i) {
            t & 1 && (Ct(0, "div", 0)(1, "div", 1), l(2), St(), Ct(3, "div", 2), l(4), St()()), t & 2 && (Rt("title", i.fullDateTime), c(2), T(i.formattedDate), c(2), T(i.formattedTime))
        },
        dependencies: [D],
        styles: [".date-container[_ngcontent-%COMP%]{padding:2px 0;line-height:1.2}.date-main[_ngcontent-%COMP%]{font-weight:500;font-size:.875rem;color:inherit}.time-secondary[_ngcontent-%COMP%]{font-size:.75rem;color:#6c757d;margin-top:1px}"]
    });
    let r = o;
    return r
})();
var Dr = ["filterSelect"];

function Ir(r, o) {
    if (r & 1 && (n(0, "option", 4), l(1), a()), r & 2) {
        let s = o.$implicit,
            e = p();
        u("value", s), c(), x(" ", e.getDisplayName(s), " ")
    }
}
var Ai = (() => {
    let o = class o {
        constructor() {
            this.selectedValue = "", this.values = ["transcript_summary", "insights", "current_quarter_earnings", "portfolio_ai_analysis", "recent-news-ai"]
        }
        agInit(e) {
            this.params = e
        }
        ngAfterViewInit() {
            setTimeout(() => {
                this.filterSelect ? .nativeElement && this.filterSelect.nativeElement.focus()
            }, 0)
        }
        onParentModelChanged(e) {
            e && e.filter ? this.selectedValue = e.filter : this.selectedValue = ""
        }
        onSelectionChanged(e) {
            this.selectedValue = e, this.params.parentFilterInstance(t => {
                t && (e ? t.setModel({
                    filter: e,
                    filterType: "equals",
                    type: "equals"
                }) : t.setModel(null), this.params.api.onFilterChanged())
            })
        }
        getDisplayName(e) {
            switch (e) {
                case "transcript_summary":
                    return "Transcript Summary";
                case "current_quarter_earnings":
                    return "Current Quarter Earnings";
                case "insights":
                    return "Insights";
                case "portfolio_ai_analysis":
                    return "Portfolio AI Analysis";
                case "recent-news-ai":
                    return "Recent News AI";
                default:
                    return e || "Unknown"
            }
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-type-floating-filter"]
        ],
        viewQuery: function(t, i) {
            if (t & 1 && X(Dr, 5), t & 2) {
                let d;
                ee(d = te()) && (i.filterSelect = d.first)
            }
        },
        decls: 5,
        vars: 2,
        consts: [
            ["filterSelect", ""],
            [1, "ag-floating-filter-input", 3, "ngModelChange", "ngModel"],
            ["value", ""],
            [3, "value", 4, "ngFor", "ngForOf"],
            [3, "value"]
        ],
        template: function(t, i) {
            if (t & 1) {
                let d = A();
                n(0, "select", 1, 0), re("ngModelChange", function(f) {
                    return v(d), ne(i.selectedValue, f) || (i.selectedValue = f), C(f)
                }), h("ngModelChange", function(f) {
                    return v(d), C(i.onSelectionChanged(f))
                }), n(2, "option", 2), l(3, "All Types"), a(), Y(4, Ir, 2, 2, "option", 3), a()
            }
            t & 2 && (ie("ngModel", i.selectedValue), c(4), u("ngForOf", i.values))
        },
        dependencies: [D, $e, ce, le, de, Ce, z, se],
        styles: [".ag-floating-filter-input[_ngcontent-%COMP%]{width:100%;height:100%;padding:4px 8px;border:none;outline:none;background:transparent;font-size:12px;color:inherit}.ag-floating-filter-input[_ngcontent-%COMP%]:focus{background:#007bff1a}"]
    });
    let r = o;
    return r
})();
var Rr = ["filterSelect"];

function Nr(r, o) {
    if (r & 1 && (n(0, "option", 4), l(1), a()), r & 2) {
        let s = o.$implicit,
            e = p();
        u("value", s), c(), x(" ", e.getDisplayName(s), " ")
    }
}
var Di = (() => {
    let o = class o {
        constructor() {
            this.selectedValue = "", this.values = ["gpt-4.1", "gpt-4o", "gpt-4o-mini", "gpt-4.1-mini", "gpt-5", "gpt-5-mini", "gpt-5-nano", "o4-mini"]
        }
        agInit(e) {
            this.params = e
        }
        ngAfterViewInit() {
            setTimeout(() => {
                this.filterSelect ? .nativeElement && this.filterSelect.nativeElement.focus()
            }, 0)
        }
        onParentModelChanged(e) {
            e && e.values && e.values.length > 0 ? this.selectedValue = e.values[0] : this.selectedValue = ""
        }
        onSelectionChanged(e) {
            this.selectedValue = e, this.params.parentFilterInstance(t => {
                t && (e ? t.setModel({
                    filter: e,
                    filterType: "equals",
                    type: "equals"
                }) : t.setModel(null), this.params.api.onFilterChanged())
            })
        }
        getDisplayName(e) {
            switch (e) {
                case "gpt-4.1":
                    return "GPT-4.1";
                case "gpt-4o":
                    return "GPT-4o";
                case "gpt-4o-mini":
                    return "GPT-4o Mini";
                case "gpt-4.1-mini":
                    return "GPT-4.1 Mini";
                case "gpt-5":
                    return "GPT-5";
                case "gpt-5-mini":
                    return "GPT-5 Mini";
                case "gpt-5-nano":
                    return "GPT-5 Nano";
                case "o4-mini":
                    return "O4 Mini";
                default:
                    return e || "Unknown"
            }
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-model-floating-filter"]
        ],
        viewQuery: function(t, i) {
            if (t & 1 && X(Rr, 5), t & 2) {
                let d;
                ee(d = te()) && (i.filterSelect = d.first)
            }
        },
        decls: 5,
        vars: 2,
        consts: [
            ["filterSelect", ""],
            [1, "ag-floating-filter-input", 3, "ngModelChange", "ngModel"],
            ["value", ""],
            [3, "value", 4, "ngFor", "ngForOf"],
            [3, "value"]
        ],
        template: function(t, i) {
            if (t & 1) {
                let d = A();
                n(0, "select", 1, 0), re("ngModelChange", function(f) {
                    return v(d), ne(i.selectedValue, f) || (i.selectedValue = f), C(f)
                }), h("ngModelChange", function(f) {
                    return v(d), C(i.onSelectionChanged(f))
                }), n(2, "option", 2), l(3, "All Models"), a(), Y(4, Nr, 2, 2, "option", 3), a()
            }
            t & 2 && (ie("ngModel", i.selectedValue), c(4), u("ngForOf", i.values))
        },
        dependencies: [D, $e, ce, le, de, Ce, z, se],
        styles: [".ag-floating-filter-input[_ngcontent-%COMP%]{width:100%;height:100%;padding:4px 8px;border:none;outline:none;background:transparent;font-size:12px;color:inherit}.ag-floating-filter-input[_ngcontent-%COMP%]:focus{background:#007bff1a}"]
    });
    let r = o;
    return r
})();
var Vr = ["triggerButton"],
    $r = ["popover"],
    Ii = (() => {
        let o = class o {
            constructor(e) {
                this.elementRef = e, this.showPopover = !1, this.dateFromInput = null, this.dateToInput = null, this.destroy$ = new W, this.dateChange$ = new W, this.datePickerConfig = {
                    dateInputFormat: "MM/DD/YYYY",
                    containerClass: "theme-default",
                    showWeekNumbers: !1,
                    adaptivePosition: !0
                }
            }
            agInit(e) {
                this.params = e, this.dateChange$.pipe(Re(300), q(this.destroy$)).subscribe(() => {
                    this.applyDatesInternal()
                })
            }
            ngAfterViewInit() {
                document.addEventListener("click", this.handleDocumentClick.bind(this))
            }
            ngOnDestroy() {
                this.destroy$.next(), this.destroy$.complete(), document.removeEventListener("click", this.handleDocumentClick.bind(this))
            }
            onParentModelChanged(e) {
                e && e.dateFrom ? this.dateFromInput = new Date(e.dateFrom) : this.dateFromInput = null, e && e.dateTo ? this.dateToInput = new Date(e.dateTo) : this.dateToInput = null
            }
            togglePopover() {
                this.showPopover = !this.showPopover
            }
            closePopover() {
                this.showPopover = !1
            }
            onDateChange() {
                this.dateChange$.next()
            }
            clearDates() {
                this.dateFromInput = null, this.dateToInput = null, this.applyDatesInternal()
            }
            applyDates() {
                this.applyDatesInternal(), this.closePopover()
            }
            applyDatesInternal() {
                this.params.parentFilterInstance(e => {
                    if (e) {
                        if (this.dateFromInput || this.dateToInput) {
                            let t = {
                                filterType: "date",
                                type: "inRange"
                            };
                            this.dateFromInput && (t.dateFrom = this.formatDate(this.dateFromInput)), this.dateToInput && (t.dateTo = this.formatDate(this.dateToInput)), e.setModel(t)
                        } else e.setModel(null);
                        this.params.api.onFilterChanged()
                    }
                })
            }
            formatDate(e) {
                return e.toISOString().split("T")[0]
            }
            hasDateRange() {
                return !!(this.dateFromInput || this.dateToInput)
            }
            getFilterDisplayText() {
                return this.hasDateRange() ? this.dateFromInput && this.dateToInput ? `${this.formatDisplayDate(this.dateFromInput)} - ${this.formatDisplayDate(this.dateToInput)}` : this.dateFromInput ? `From ${this.formatDisplayDate(this.dateFromInput)}` : this.dateToInput ? `Until ${this.formatDisplayDate(this.dateToInput)}` : "All Dates" : "All Dates"
            }
            getPopoverTitle() {
                return `Filter by ${this.params.column?.getColDef()?.headerName||"Date"}`
            }
            formatDisplayDate(e) {
                return e.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric"
                })
            }
            handleDocumentClick(e) {
                let t = e.target,
                    i = this.popover ? .nativeElement,
                    d = this.triggerButton ? .nativeElement;
                this.showPopover && i && d && !i.contains(t) && !d.contains(t) && this.closePopover()
            }
        };
        o.\u0275fac = function(t) {
            return new(t || o)(w(Dt))
        }, o.\u0275cmp = E({
            type: o,
            selectors: [
                ["qualtrim-date-range-floating-filter"]
            ],
            viewQuery: function(t, i) {
                if (t & 1 && (X(Vr, 5), X($r, 5)), t & 2) {
                    let d;
                    ee(d = te()) && (i.triggerButton = d.first), ee(d = te()) && (i.popover = d.first)
                }
            },
            decls: 29,
            vars: 12,
            consts: [
                ["triggerButton", ""],
                ["popover", ""],
                ["dpFrom", "bsDatepicker"],
                ["dpTo", "bsDatepicker"],
                [1, "date-range-filter-container"],
                ["type", "button", 1, "ag-floating-filter-input", "date-range-button", 3, "click"],
                [1, "filter-text"],
                [1, "fas", "fa-calendar-alt", "ms-1"],
                [1, "date-range-popover"],
                [1, "popover-header"],
                [1, "popover-title"],
                ["type", "button", "aria-label", "Close", 1, "btn-close", 3, "click"],
                [1, "popover-body"],
                [1, "date-inputs"],
                [1, "date-group"],
                [1, "form-label"],
                ["type", "text", "bsDatepicker", "", "placeholder", "Select start date", "readonly", "", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel", "bsConfig"],
                ["type", "text", "bsDatepicker", "", "placeholder", "Select end date", "readonly", "", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel", "bsConfig"],
                [1, "popover-actions"],
                ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", 3, "click"],
                ["type", "button", 1, "btn", "btn-sm", "btn-primary", 3, "click"]
            ],
            template: function(t, i) {
                if (t & 1) {
                    let d = A();
                    n(0, "div", 4)(1, "button", 5, 0), h("click", function() {
                        return v(d), C(i.togglePopover())
                    }), n(3, "span", 6), l(4), a(), g(5, "i", 7), a(), n(6, "div", 8, 1)(8, "div", 9)(9, "span", 10), l(10), a(), n(11, "button", 11), h("click", function() {
                        return v(d), C(i.closePopover())
                    }), a()(), n(12, "div", 12)(13, "div", 13)(14, "div", 14)(15, "label", 15), l(16, "From Date"), a(), n(17, "input", 16, 2), re("ngModelChange", function(f) {
                        return v(d), ne(i.dateFromInput, f) || (i.dateFromInput = f), C(f)
                    }), h("ngModelChange", function() {
                        return v(d), C(i.onDateChange())
                    }), a()(), n(19, "div", 14)(20, "label", 15), l(21, "To Date"), a(), n(22, "input", 17, 3), re("ngModelChange", function(f) {
                        return v(d), ne(i.dateToInput, f) || (i.dateToInput = f), C(f)
                    }), h("ngModelChange", function() {
                        return v(d), C(i.onDateChange())
                    }), a()()(), n(24, "div", 18)(25, "button", 19), h("click", function() {
                        return v(d), C(i.clearDates())
                    }), l(26, " Clear "), a(), n(27, "button", 20), h("click", function() {
                        return v(d), C(i.applyDates())
                    }), l(28, " Apply "), a()()()()()
                }
                t & 2 && (c(), et("active", i.hasDateRange()), c(3), T(i.getFilterDisplayText()), c(), et("text-primary", i.hasDateRange()), c(), et("show", i.showPopover), c(4), T(i.getPopoverTitle()), c(7), ie("ngModel", i.dateFromInput), u("bsConfig", i.datePickerConfig), c(5), ie("ngModel", i.dateToInput), u("bsConfig", i.datePickerConfig))
            },
            dependencies: [D, ce, J, z, se, ui, mi, pi],
            styles: [".date-range-filter-container[_ngcontent-%COMP%]{position:relative;width:100%;height:100%}.date-range-button[_ngcontent-%COMP%]{width:100%;height:100%;padding:4px 8px;border:none;outline:none;background:transparent;font-size:12px;color:inherit;cursor:pointer;display:flex;align-items:center;justify-content:space-between;text-align:left}.date-range-button[_ngcontent-%COMP%]:hover, .date-range-button[_ngcontent-%COMP%]:focus{background:#007bff1a}.date-range-button.active[_ngcontent-%COMP%]{background:#007bff26}.filter-text[_ngcontent-%COMP%]{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.date-range-popover[_ngcontent-%COMP%]{position:absolute;top:100%;left:0;z-index:1050;width:320px;background:#fff;border:1px solid #dee2e6;border-radius:.375rem;box-shadow:0 .5rem 1rem #00000026;display:none}.date-range-popover.show[_ngcontent-%COMP%]{display:block}.popover-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:.75rem;border-bottom:1px solid #dee2e6;background-color:#f8f9fa;border-radius:.375rem .375rem 0 0}.popover-title[_ngcontent-%COMP%]{font-weight:600;font-size:14px;margin:0}.btn-close[_ngcontent-%COMP%]{background:none;border:none;font-size:12px;cursor:pointer;opacity:.6}.btn-close[_ngcontent-%COMP%]:hover{opacity:1}.popover-body[_ngcontent-%COMP%]{padding:1rem}.date-inputs[_ngcontent-%COMP%]{margin-bottom:1rem}.date-group[_ngcontent-%COMP%]{margin-bottom:.75rem}.date-group[_ngcontent-%COMP%]:last-child{margin-bottom:0}.form-label[_ngcontent-%COMP%]{font-size:12px;font-weight:500;margin-bottom:.25rem;display:block}.form-control-sm[_ngcontent-%COMP%]{padding:.25rem .5rem;font-size:12px;border-radius:.25rem}.popover-actions[_ngcontent-%COMP%]{display:flex;gap:.5rem;justify-content:flex-end}.btn-sm[_ngcontent-%COMP%]{padding:.25rem .75rem;font-size:12px;border-radius:.25rem}.btn-outline-secondary[_ngcontent-%COMP%]{color:#6c757d;border:1px solid #6c757d;background:#fff}.btn-outline-secondary[_ngcontent-%COMP%]:hover{background:#6c757d;color:#fff}.btn-primary[_ngcontent-%COMP%]{background:#0d6efd;border:1px solid #0d6efd;color:#fff}.btn-primary[_ngcontent-%COMP%]:hover{background:#0b5ed7;border-color:#0a58ca}.text-primary[_ngcontent-%COMP%]{color:#0d6efd!important}[_nghost-%COMP%]{z-index:1}"]
        });
        let r = o;
        return r
    })();
var jr = ["filterInput"];

function Lr(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 4), h("click", function() {
            v(s);
            let t = p();
            return C(t.clearFilter())
        }), g(1, "i", 5), a()
    }
}
var Ri = (() => {
    let o = class o {
        constructor() {
            this.inputValue = "", this.destroy$ = new W, this.inputChange$ = new W
        }
        agInit(e) {
            this.params = e, this.inputChange$.pipe(Re(500), Ne(), q(this.destroy$)).subscribe(t => {
                this.applyFilter(t)
            })
        }
        ngAfterViewInit() {
            setTimeout(() => {
                this.filterInput ? .nativeElement && this.filterInput.nativeElement.focus()
            }, 0)
        }
        ngOnDestroy() {
            this.destroy$.next(), this.destroy$.complete()
        }
        onParentModelChanged(e) {
            e && e.filter ? this.inputValue = e.filter : this.inputValue = ""
        }
        onInputChange(e) {
            this.inputValue = e, this.inputChange$.next(e)
        }
        onEnterPressed() {
            this.applyFilter(this.inputValue)
        }
        onInputBlur() {
            this.applyFilter(this.inputValue)
        }
        clearFilter() {
            this.inputValue = "", this.applyFilter(""), setTimeout(() => {
                this.filterInput ? .nativeElement && this.filterInput.nativeElement.focus()
            }, 0)
        }
        applyFilter(e) {
            this.params.parentFilterInstance(t => {
                t && (e && e.trim() ? t.setModel({
                    filter: e.trim(),
                    filterType: "text",
                    type: "contains"
                }) : t.setModel(null), this.params.api.onFilterChanged())
            })
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-key-text-floating-filter"]
        ],
        viewQuery: function(t, i) {
            if (t & 1 && X(jr, 5), t & 2) {
                let d;
                ee(d = te()) && (i.filterInput = d.first)
            }
        },
        decls: 4,
        vars: 2,
        consts: [
            ["filterInput", ""],
            [1, "key-filter-container"],
            ["type", "text", "placeholder", "Filter by key...", 1, "ag-floating-filter-input", 3, "ngModelChange", "keyup.enter", "blur", "ngModel"],
            ["class", "filter-clear", 3, "click", 4, "ngIf"],
            [1, "filter-clear", 3, "click"],
            [1, "fas", "fa-times"]
        ],
        template: function(t, i) {
            if (t & 1) {
                let d = A();
                n(0, "div", 1)(1, "input", 2, 0), re("ngModelChange", function(f) {
                    return v(d), ne(i.inputValue, f) || (i.inputValue = f), C(f)
                }), h("ngModelChange", function(f) {
                    return v(d), C(i.onInputChange(f))
                })("keyup.enter", function() {
                    return v(d), C(i.onEnterPressed())
                })("blur", function() {
                    return v(d), C(i.onInputBlur())
                }), a(), Y(3, Lr, 2, 0, "div", 3), a()
            }
            t & 2 && (c(), ie("ngModel", i.inputValue), c(2), u("ngIf", i.inputValue))
        },
        dependencies: [D, nt, ce, J, z, se],
        styles: [".key-filter-container[_ngcontent-%COMP%]{position:relative;width:100%;height:100%;display:flex;align-items:center}.ag-floating-filter-input[_ngcontent-%COMP%]{width:100%;height:100%;padding:4px 24px 4px 8px;border:none;outline:none;background:transparent;font-size:12px;color:inherit}.ag-floating-filter-input[_ngcontent-%COMP%]:focus{background:#007bff1a}.ag-floating-filter-input[_ngcontent-%COMP%]::placeholder{color:#6c757d;opacity:.7}.filter-clear[_ngcontent-%COMP%]{position:absolute;right:6px;top:50%;transform:translateY(-50%);cursor:pointer;width:16px;height:16px;display:flex;align-items:center;justify-content:center;color:#6c757d;opacity:.6;transition:opacity .2s}.filter-clear[_ngcontent-%COMP%]:hover{opacity:1;color:#dc3545}.filter-clear[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:10px}"]
    });
    let r = o;
    return r
})();

function Or(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 25)(1, "div", 26)(2, "div", 20)(3, "span", 27), l(4), a()(), n(5, "div", 20)(6, "button", 28), h("click", function() {
            v(s);
            let t = p();
            return C(t.clearSelection())
        }), g(7, "i", 29), l(8, " Clear "), a(), n(9, "button", 30), h("click", function() {
            v(s);
            let t = p();
            return C(t.bulkDeleteMessages())
        }), g(10, "i", 31), l(11), a()()()()
    }
    if (r & 2) {
        let s = p();
        c(4), ge(" ", s.selectedRows().length, " item", s.selectedRows().length !== 1 ? "s" : "", " selected "), c(5), u("disabled", s.selectedRows().length === 0), c(2), x(" Delete Selected (", s.selectedRows().length, ") ")
    }
}

function zr(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 32)(1, "div", 20)(2, "span", 33), g(3, "i", 34), l(4, " Filters Active "), a(), n(5, "button", 35), h("click", function() {
            v(s);
            let t = p();
            return C(t.resetAllFilters())
        }), g(6, "i", 36), l(7, " Reset Filters "), a()()()
    }
}

function Ur(r, o) {
    if (r & 1 && (n(0, "small", 39), l(1), a()), r & 2) {
        let s = p();
        c(), x("Code: ", s.code)
    }
}

function Br(r, o) {
    if (r & 1) {
        let s = A();
        n(0, "div", 13), g(1, "i", 37), n(2, "div", 38)(3, "strong"), l(4), a(), _(5, Ur, 2, 1, "small", 39), n(6, "small", 39), l(7), M(8, "date"), a()(), n(9, "button", 40), h("click", function() {
            v(s);
            let t = p();
            return C(t.clearTableErrors())
        }), g(10, "i", 41), a()()
    }
    if (r & 2) {
        let s = o;
        c(4), T(s.message), c(), b(s.code ? 5 : -1), c(2), T(Pe(8, 3, s.timestamp, "short"))
    }
}

function Wr(r, o) {
    if (r & 1 && (n(0, "option", 42), l(1), a()), r & 2) {
        let s = o.$implicit;
        u("value", s), c(), x(" ", s, " ")
    }
}
var Ni = (() => {
    let o = class o {
        constructor(e, t, i, d, m, f) {
            this._aiMessages = e, this._tableService = t, this._modal = i, this._activatedRoute = d, this._router = m, this._layout = f, this._currentPage = new I(1), this._pageSize = new I(10), this.destroy$ = new W, this.selectedRows = F([]), this.performanceMetrics$ = this._tableService.getPerformanceMetrics(), this.errorInfo$ = this._tableService.getErrorInfo(), this.tableLoading$ = this._tableService.getLoadingState(), this.currentFilters = {}, this.initialQueryParams = null, this.totalServerRows = 0, this.currentServerPage = 1, this.currentPageSize = 10, this.currentDisplayPage = 1, this.availablePageSizes = [10, 20, 50, 100], this.columnDefs = [{
                headerName: "Type",
                field: "type",
                sortable: !1,
                filter: "agTextColumnFilter",
                suppressHeaderFilterButton: !0,
                suppressFloatingFilterButton: !0,
                floatingFilter: !0,
                floatingFilterComponent: "typeFloatingFilter",
                filterParams: {
                    filterOptions: ["equals"],
                    defaultOption: "equals",
                    caseSensitive: !1
                },
                resizable: !1,
                width: 120,
                cellRenderer: "typeCellRenderer",
                headerTooltip: "Message type (e.g., transcript summary, insights)"
            }, {
                headerName: "Key",
                field: "key",
                sortable: !1,
                suppressHeaderFilterButton: !0,
                suppressFloatingFilterButton: !0,
                filter: "agTextColumnFilter",
                floatingFilter: !0,
                floatingFilterComponent: "keyTextFloatingFilter",
                filterParams: {
                    filterOptions: ["contains", "startsWith", "endsWith"],
                    defaultOption: "contains",
                    caseSensitive: !1
                },
                resizable: !1,
                width: 250,
                cellClass: "font-semibold text-primary",
                headerTooltip: "Unique message identifier"
            }, {
                headerName: "Model",
                field: "model",
                sortable: !1,
                suppressHeaderFilterButton: !0,
                suppressFloatingFilterButton: !0,
                filter: "agTextColumnFilter",
                floatingFilter: !0,
                floatingFilterComponent: "modelFloatingFilter",
                resizable: !1,
                width: 140,
                headerTooltip: "AI model used for generation"
            }, {
                headerName: "Created",
                field: "createdAt",
                sortable: !1,
                resizable: !1,
                filter: !1,
                width: 120,
                cellRenderer: "dateCellRenderer",
                cellClass: "flex align-items-center",
                headerTooltip: "Message creation date"
            }, {
                headerName: "Updated",
                field: "updatedAt",
                sortable: !1,
                resizable: !1,
                filter: !1,
                width: 120,
                cellRenderer: "dateCellRenderer",
                cellClass: "flex align-items-center",
                headerTooltip: "Last modification date"
            }, {
                headerName: "Actions",
                sortable: !1,
                filter: !1,
                resizable: !1,
                width: 80,
                pinned: "right",
                cellRenderer: "actionsCellRenderer",
                cellClass: "flex align-items-center",
                headerTooltip: "Available actions for this message"
            }], this.defaultColDef = {
                sortable: !1,
                filter: !0,
                resizable: !1,
                floatingFilter: !0
            }, this.autoSizeStrategy = {
                type: "fitGridWidth",
                defaultMinWidth: 50
            }, this.components = {
                actionsCellRenderer: Fi,
                typeCellRenderer: Ei,
                dateCellRenderer: Pi,
                typeFloatingFilter: Ai,
                modelFloatingFilter: Di,
                dateRangeFloatingFilter: Ii,
                keyTextFloatingFilter: Ri
            }, this.gridOptions = {
                pagination: !1,
                animateRows: !0,
                cellSelection: !1,
                rowSelection: {
                    mode: "multiRow",
                    checkboxes: !0,
                    headerCheckbox: !0,
                    enableClickSelection: !1,
                    enableSelectionWithoutKeys: !1
                },
                enableCellTextSelection: !0,
                ensureDomOrder: !0,
                getRowId: y => y.data.id,
                context: {
                    componentParent: this
                },
                suppressColumnMoveAnimation: !0,
                allowDragFromColumnsToolPanel: !1,
                rowDragManaged: !1,
                suppressMenuHide: !1,
                onFilterChanged: () => {
                    this.onFilterChanged()
                }
            }, this.aiMessagesResponse$ = this._aiMessages.aiMessages$.pipe(U(y => y), L({
                bufferSize: 1,
                refCount: !0
            })), this.loading$ = this._aiMessages.loading$, this.aiMessagesMeta$ = this._aiMessages.aiMessages$.pipe(U(y => y.meta), L({
                bufferSize: 1,
                refCount: !0
            })), this.aiMessages$ = this._aiMessages.aiMessages$.pipe(U(y => y.messages), L({
                bufferSize: 1,
                refCount: !0
            })), this.aiMessageLoading$ = this._aiMessages.loading$, this.totalItems$ = this.aiMessagesMeta$.pipe(U(y => y.total)), this.pageSize$ = this._pageSize.asObservable(), this.currentPage$ = this._currentPage.asObservable(), this.icons = {
                edit: pt,
                plus: Jt,
                delete: mt,
                refresh: ut
            }, this.tableClass$ = this._layout.tableClass$
        }
        ngOnInit() {
            this._activatedRoute.queryParams.subscribe(e => {
                e && Object.keys(e).length > 0 && (this._aiMessages.setCurrentFilter(e), this.initialQueryParams = e, e.page && (this.currentServerPage = parseInt(e.page, 10), this.currentDisplayPage = this.currentServerPage), e.pageSize && (this.currentPageSize = parseInt(e.pageSize, 10)), this.currentFilters = this.convertQueryParamsToFilters(e), this.gridApi && (this.applyFiltersFromQueryParams(e), this.loadMessagesWithFilters()))
            })
        }
        editMessage(e) {
            this._modal.show(Tt, {
                class: "w-2/3 max-w-[66.666667%] h-2/3 max-h-[75%]",
                initialState: {
                    message: e
                }
            }).onHidden ? .subscribe(() => {
                this.loadMessagesWithFilters()
            })
        }
        createMessage() {
            this._modal.show(Tt, {
                class: "w-2/3 max-w-[66.666667%] h-2/3 max-h-[75%]",
                initialState: {
                    message: null
                }
            }).onHidden ? .subscribe(() => {
                this.loadMessagesWithFilters()
            })
        }
        pageChanged(e) {
            this._currentPage.next(e), this._router.navigate(["."], {
                relativeTo: this._activatedRoute,
                queryParams: {
                    page: e === 1 ? null : e
                },
                queryParamsHandling: "merge"
            })
        }
        pageSizeChanged(e) {
            this._pageSize.next(parseInt(e.target.value)), this._router.navigate(["."], {
                relativeTo: this._activatedRoute,
                queryParams: {
                    pageSize: e.target.value === "10" ? null : e.target.value
                },
                queryParamsHandling: "merge"
            })
        }
        migrateResponseType(e) {
            return e === "json_object" || e === "json_schema" ? "json_schema" : "text"
        }
        regenerateMessage(e) {
            if (!e.prompt) {
                console.error("Cannot regenerate message: prompt is missing");
                return
            }
            this._aiMessages.regenerateAiMessage(e.prompt, this.migrateResponseType(e.responseType), e.model || "gpt-4.1").subscribe(() => {
                this.loadMessagesWithFilters()
            })
        }
        deleteMessage(e) {
            confirm("Are you sure you want to delete this message?") && this._aiMessages.deleteAiMessage(e.id).subscribe(() => {
                this.loadMessagesWithFilters()
            })
        }
        onGridReady(e) {
            this.gridApi = e.api, this._tableService.initialize(e.api), this.gridApi.sizeColumnsToFit(), this.gridApi.addEventListener("selectionChanged", t => this.onSelectionChanged(t)), this.initialQueryParams && (this.applyFiltersFromQueryParams(this.initialQueryParams), this.initialQueryParams = null), this.loadMessagesWithFilters()
        }
        loadMessagesWithFilters() {
            let e = pe(P({}, this.currentFilters), {
                page: this.currentServerPage,
                pageSize: this.currentPageSize
            });
            this._tableService.loadMessagesWithServerFilters(e).subscribe({
                next: t => {
                    this.gridApi && (this.gridApi.setGridOption("rowData", t.transformedMessages), this.totalServerRows = t.totalCount)
                },
                error: t => {
                    console.error("Failed to load messages:", t)
                }
            })
        }
        applyServerFilters(e) {
            this.currentFilters = P(P({}, this.currentFilters), e), this.currentServerPage = 1, this.currentDisplayPage = 1, this.updateQueryStringWithPagination(), this.loadMessagesWithFilters()
        }
        clearAllServerFilters() {
            this.currentFilters = {}, this.currentServerPage = 1, this.currentDisplayPage = 1, this.updateQueryStringWithPagination(), this.loadMessagesWithFilters()
        }
        onFirstDataRendered() {
            setTimeout(() => {
                this.gridApi && this.gridApi.sizeColumnsToFit()
            }, 0)
        }
        onGridSizeChanged() {
            this.gridApi && this.gridApi.sizeColumnsToFit()
        }
        onPageChange(e) {
            this.currentServerPage = e, this.currentDisplayPage = e, this.updateQueryStringWithPagination(), this.loadMessagesWithFilters()
        }
        onPageSizeChange(e) {
            let t = e.target;
            this.currentPageSize = parseInt(t.value, 10), this.currentServerPage = 1, this.currentDisplayPage = 1, this.updateQueryStringWithPagination(), this.loadMessagesWithFilters()
        }
        updateQueryStringWithPagination() {
            let e = {};
            this.currentServerPage > 1 && (e.page = this.currentServerPage), this.currentPageSize !== 10 && (e.pageSize = this.currentPageSize), Object.assign(e, this.getQueryParamsFromFilters()), this._router.navigate(["."], {
                relativeTo: this._activatedRoute,
                queryParams: e,
                queryParamsHandling: "replace"
            })
        }
        getQueryParamsFromFilters() {
            let e = {};
            return this.currentFilters.type && Array.isArray(this.currentFilters.type) && this.currentFilters.type.length > 0 && (e.type = this.currentFilters.type.join(",")), this.currentFilters.key && (e.key = this.currentFilters.key), this.currentFilters.model && Array.isArray(this.currentFilters.model) && this.currentFilters.model.length > 0 && (e.model = this.currentFilters.model.join(",")), this.currentFilters.dateFrom && (e.dateFrom = this.currentFilters.dateFrom), this.currentFilters.dateTo && (e.dateTo = this.currentFilters.dateTo), e
        }
        getPageRangeStart() {
            return this.totalServerRows === 0 ? 0 : (this.currentServerPage - 1) * this.currentPageSize + 1
        }
        getPageRangeEnd() {
            let e = this.currentServerPage * this.currentPageSize;
            return Math.min(e, this.totalServerRows)
        }
        getTotalPages() {
            return Math.ceil(this.totalServerRows / this.currentPageSize)
        }
        refreshData() {
            this.loadMessagesWithFilters()
        }
        ngOnDestroy() {
            this.destroy$.next(), this.destroy$.complete(), this._tableService.destroy()
        }
        clearTableErrors() {
            this._tableService.clearErrors()
        }
        onFilterChanged() {
            if (!this.gridApi) return;
            let e = this.gridApi.getFilterModel(),
                t = this.convertAgFiltersToServerFilters(e);
            this.currentFilters = t, this.currentServerPage = 1, this.currentDisplayPage = 1, this.updateQueryStringWithPagination(), this.loadMessagesWithFilters()
        }
        convertAgFiltersToServerFilters(e) {
            let t = {};
            if (e.type ? .filter && (t.type = [e.type.filter]), e.key ? .filter && (t.key = e.key.filter), e.model ? .filter && (t.model = [e.model.filter]), e.createdAt) {
                let i = e.createdAt;
                i.dateFrom && (t.dateFrom = new Date(i.dateFrom).toISOString().split("T")[0]), i.dateTo && (t.dateTo = new Date(i.dateTo).toISOString().split("T")[0])
            }
            if (e.updatedAt) {
                let i = e.updatedAt;
                i.dateFrom && !t.dateFrom && (t.dateFrom = new Date(i.dateFrom).toISOString().split("T")[0]), i.dateTo && !t.dateTo && (t.dateTo = new Date(i.dateTo).toISOString().split("T")[0])
            }
            return t
        }
        getTypeDisplayName(e) {
            switch (e) {
                case "transcript_summary":
                    return "Transcript Summary";
                case "current_quarter_earnings":
                    return "Current Quarter Earnings";
                case "insights":
                    return "Insights";
                case "portfolio_ai_analysis":
                    return "Portfolio AI Analysis";
                case "recent-news-ai":
                    return "Recent News AI";
                default:
                    return e || "Unknown"
            }
        }
        hasActiveFilters() {
            return Object.keys(this.currentFilters).some(e => {
                let t = this.currentFilters[e];
                return t != null && t !== ""
            })
        }
        resetAllFilters() {
            this.gridApi && (this.gridApi.setFilterModel(null), this.currentFilters = {}, this._router.navigate(["."], {
                relativeTo: this._activatedRoute,
                queryParams: {},
                replaceUrl: !0
            }), this.loadMessagesWithFilters())
        }
        updateQueryParametersFromFilters(e) {
            let t = {};
            e.type && (Array.isArray(e.type) ? e.type.length > 0 : e.type.trim() !== "") && (t.type = Array.isArray(e.type) ? e.type.join(",") : e.type), e.key && e.key.trim() !== "" && (t.key = e.key), e.model && e.model.length > 0 && (t.model = e.model.join(",")), e.dateFrom && e.dateFrom.trim() !== "" && (t.dateFrom = e.dateFrom), e.dateTo && e.dateTo.trim() !== "" && (t.dateTo = e.dateTo), this._router.navigate(["."], {
                relativeTo: this._activatedRoute,
                queryParams: t,
                replaceUrl: !0
            })
        }
        convertQueryParamsToFilters(e) {
            let t = {};
            return e.type && (t.type = e.type.split(",")), e.key && (t.key = e.key), e.model && (t.model = e.model.split(",")), e.dateFrom && (t.dateFrom = e.dateFrom), e.dateTo && (t.dateTo = e.dateTo), t
        }
        applyFiltersFromQueryParams(e) {
            if (!this.gridApi) return;
            let t = {};
            if (e.type) {
                let i = e.type.split(",");
                t.type = {
                    filterType: "text",
                    type: "equals",
                    filter: i[0]
                }
            }
            if (e.key && (t.key = {
                    filterType: "text",
                    type: "contains",
                    filter: e.key
                }), e.model) {
                let i = e.model.split(",");
                t.model = {
                    filterType: "text",
                    type: "equals",
                    filter: i[0]
                }
            }(e.dateFrom || e.dateTo) && (t.createdAt = {
                filterType: "date",
                type: "inRange",
                dateFrom: e.dateFrom || null,
                dateTo: e.dateTo || null
            }), this.gridApi.setFilterModel(t)
        }
        onSelectionChanged(e) {
            let t = this.gridApi.getSelectedRows();
            this.selectedRows.set(t)
        }
        clearSelection() {
            this.gridApi && this.gridApi.deselectAll(), this.selectedRows.set([])
        }
        bulkDeleteMessages() {
            let e = this.selectedRows();
            if (e.length === 0) return;
            let t = `Are you sure you want to delete ${e.length} selected message${e.length>1?"s":""}?`;
            if (confirm(t)) {
                let i = e.map(d => this._aiMessages.deleteAiMessage(d.id).toPromise());
                Promise.all(i).then(() => {
                    this.loadMessagesWithFilters(), this.clearSelection()
                }).catch(d => {
                    console.error("Error during bulk delete:", d)
                })
            }
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(w(Fe), w(ki), w(Ue), w(Le), w(Oe), w(Xt))
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-ai-messages-table"]
        ],
        decls: 39,
        vars: 36,
        consts: [
            [1, "card", "card-flush", "h-md-100"],
            [1, "card-header", "pt-7"],
            [1, "card-title", "align-items-start", "flex-column"],
            [1, "card-label", "fw-bold", "text-gray-800", "dark:text-white"],
            [1, "text-gray-800", "dark:text-white"],
            [1, "card-toolbar", "d-flex", "align-items-center", "gap-2", "flex-wrap"],
            [1, "d-flex", "gap-2"],
            [1, "btn", "btn-primary", 3, "click"],
            [1, "me-2", 3, "icon"],
            ["title", "Refresh data", 1, "btn", "btn-outline-secondary", 3, "click"],
            [1, "card-body", "pt-6"],
            ["class", "mb-4", 4, "ngIf"],
            ["class", "mb-3", 4, "ngIf"],
            ["role", "alert", 1, "alert", "alert-danger", "d-flex", "align-items-center", "mb-4"],
            [1, "ag-grid-container", 2, "width", "100%"],
            [3, "loading"],
            [3, "gridReady", "firstDataRendered", "gridSizeChanged", "theme", "columnDefs", "defaultColDef", "gridOptions", "autoSizeStrategy", "domLayout", "components"],
            [1, "d-flex", "justify-content-between", "align-items-center", "mt-4", "px-3"],
            [1, "d-flex", "align-items-center", "gap-3"],
            [1, "text-muted"],
            [1, "d-flex", "align-items-center", "gap-2"],
            [1, "form-label", "mb-0", "text-muted"],
            [1, "form-select", "form-select-sm", 2, "width", "auto", 3, "change", "value"],
            [3, "value", 4, "ngFor", "ngForOf"],
            [1, "pagination-sm", 3, "pageChange", "page", "pageSize", "collectionSize", "maxSize", "rotate", "boundaryLinks", "directionLinks"],
            [1, "mb-4"],
            [1, "d-flex", "align-items-center", "justify-content-between", "px-4", "py-3", "bg-light", "border", "rounded"],
            [1, "text-sm", "font-medium", "text-primary"],
            ["title", "Clear selection", 1, "btn", "btn-sm", "btn-outline-secondary", 3, "click"],
            [1, "fas", "fa-times", "me-1"],
            ["title", "Delete selected messages", 1, "btn", "btn-sm", "btn-danger", 3, "click", "disabled"],
            [1, "fas", "fa-trash", "me-1"],
            [1, "mb-3"],
            [1, "badge", "bg-info"],
            [1, "fas", "fa-filter", "me-1"],
            ["title", "Reset all filters", 1, "btn", "btn-sm", "btn-outline-secondary", 3, "click"],
            [1, "fas", "fa-filter-circle-xmark", "me-1"],
            [1, "fas", "fa-exclamation-triangle", "me-2"],
            [1, "flex-grow-1"],
            [1, "d-block", "text-muted"],
            ["type", "button", "title", "Dismiss error", 1, "btn", "btn-sm", "btn-outline-danger", 3, "click"],
            [1, "fas", "fa-times"],
            [3, "value"]
        ],
        template: function(t, i) {
            if (t & 1 && (n(0, "div", 0)(1, "div", 1)(2, "h3", 2)(3, "span", 3), l(4, "Total AI Messages: "), n(5, "span", 4), l(6), M(7, "async"), M(8, "number"), a()()(), n(9, "div", 5)(10, "div", 6)(11, "button", 7), h("click", function() {
                    return i.createMessage()
                }), g(12, "fa-icon", 8), l(13, " Create Message "), a(), n(14, "button", 9), h("click", function() {
                    return i.refreshData()
                }), g(15, "fa-icon", 8), l(16, " Refresh "), a()()()(), n(17, "div", 10), Y(18, Or, 12, 4, "div", 11)(19, zr, 8, 0, "div", 12), _(20, Br, 11, 6, "div", 13), M(21, "async"), n(22, "div", 14)(23, "qualtrim-loading-overlay", 15), M(24, "async"), n(25, "ag-grid-angular", 16), M(26, "async"), h("gridReady", function(m) {
                    return i.onGridReady(m)
                })("firstDataRendered", function() {
                    return i.onFirstDataRendered()
                })("gridSizeChanged", function() {
                    return i.onGridSizeChanged()
                }), a()()(), n(27, "div", 17)(28, "div", 18)(29, "div", 19), l(30), a(), n(31, "div", 20)(32, "label", 21), l(33, "Show:"), a(), n(34, "select", 22), h("change", function(m) {
                    return i.onPageSizeChange(m)
                }), Y(35, Wr, 2, 2, "option", 23), a(), n(36, "span", 19), l(37, "entries"), a()()(), n(38, "ngb-pagination", 24), re("pageChange", function(m) {
                    return ne(i.currentDisplayPage, m) || (i.currentDisplayPage = m), m
                }), h("pageChange", function(m) {
                    return i.onPageChange(m)
                }), a()()()()), t & 2) {
                let d;
                c(6), T(k(8, 28, k(7, 26, i.totalItems$))), c(6), u("icon", i.icons.plus), c(3), u("icon", i.icons.refresh), c(3), u("ngIf", i.selectedRows().length > 0), c(), u("ngIf", i.hasActiveFilters()), c(), b((d = k(21, 30, i.errorInfo$)) ? 20 : -1, d), c(3), u("loading", k(24, 32, i.tableLoading$)), c(2), u("theme", k(26, 34, i.tableClass$) || void 0)("columnDefs", i.columnDefs)("defaultColDef", i.defaultColDef)("gridOptions", i.gridOptions)("autoSizeStrategy", i.autoSizeStrategy)("domLayout", "autoHeight")("components", i.components), c(5), it(" Showing ", i.getPageRangeStart(), " - ", i.getPageRangeEnd(), " of ", i.totalServerRows, " entries "), c(4), u("value", i.currentPageSize), c(), u("ngForOf", i.availablePageSizes), c(3), ie("page", i.currentDisplayPage), u("pageSize", i.currentPageSize)("collectionSize", i.totalServerRows)("maxSize", 5)("rotate", !0)("boundaryLinks", !0)("directionLinks", !0)
            }
        },
        dependencies: [D, $e, nt, qe, gt, We, Be, dt, lt, si, oi, _e, be, je],
        encapsulation: 2
    });
    let r = o;
    return r
})();
var Vi = (() => {
    let o = class o {
        constructor(e, t) {
            this._activatedRoute = e, this._aiMessages = t, this._onDestroy$ = new W
        }
        ngOnInit() {
            this._activatedRoute.queryParams.pipe(q(this._onDestroy$)).subscribe(e => {
                let t = {
                    page: e.page || 1,
                    pageSize: e.pageSize || 10
                };
                e.key && (t.key = e.key), e.type && (t.type = e.type), this._aiMessages.setCurrentFilter(t)
            })
        }
        ngOnDestroy() {
            this._onDestroy$.next(), this._onDestroy$.complete()
        }
    };
    o.\u0275fac = function(t) {
        return new(t || o)(w(Le), w(Fe))
    }, o.\u0275cmp = E({
        type: o,
        selectors: [
            ["qualtrim-ai-messages"]
        ],
        decls: 1,
        vars: 0,
        template: function(t, i) {
            t & 1 && g(0, "qualtrim-ai-messages-table")
        },
        dependencies: [Ni],
        encapsulation: 2
    });
    let r = o;
    return r
})();
var qr = [{
        path: "",
        pathMatch: "full",
        redirectTo: "/app/admin/users"
    }, {
        path: "",
        title: "Admin",
        component: Ti,
        children: [{
            path: "users",
            title: "Admin - Users",
            component: _i
        }, {
            path: "ai-messages",
            title: "Admin - AI Messages",
            component: Vi
        }, {
            path: "presets",
            title: "Admin - Chart Presets",
            loadComponent: () =>
                import ("./chunk-BWVBFHAE.js").then(r => r.PresetsManagementPage)
        }]
    }],
    Os = (() => {
        let o = class o {};
        o.\u0275fac = function(t) {
            return new(t || o)
        }, o.\u0275mod = It({
            type: o
        }), o.\u0275inj = At({
            imports: [D, Ye.forChild(qr), We, ni, Me, ke, ci, dt, ce, qe, ai, Zt.forRoot(), _t, bt, Ye]
        });
        let r = o;
        return r
    })();
export {
    Os as a
};