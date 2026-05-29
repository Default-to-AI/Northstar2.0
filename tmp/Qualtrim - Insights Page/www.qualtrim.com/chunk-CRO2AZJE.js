import {
    Ad as oi,
    ab as Xt,
    ec as dt,
    gb as Zt,
    hc as ei,
    jd as ti,
    md as ii,
    q as Ce,
    u as He,
    vd as ni,
    yd as ri,
    zd as mt
} from "./chunk-NO4XYT7V.js";
import {
    b as ct,
    c as Se,
    e as w,
    g as pe,
    h as he,
    k as fe,
    o as ge,
    p as ve,
    x as se,
    z as oe
} from "./chunk-6FMDYVJO.js";
import {
    h as Pe,
    l as $,
    m as ae,
    o as te
} from "./chunk-MOBVBKOE.js";
import {
    $ as Kt,
    n as be,
    o as Oe
} from "./chunk-SUZ3XW2S.js";
import {
    $b as S,
    $c as ce,
    Aa as _,
    Ba as b,
    Ca as y,
    Cb as k,
    Db as Ut,
    Dc as l,
    E as Nt,
    Ec as W,
    F as Ge,
    Fc as M,
    Gc as Je,
    Hc as qt,
    I as Me,
    Ia as P,
    Id as Fe,
    Ka as zt,
    L as kt,
    M as F,
    Pd as Wt,
    S as xe,
    Sb as Ne,
    Tc as at,
    Td as Qt,
    Ub as p,
    V as Le,
    Vc as K,
    Wb as h,
    Wc as Ht,
    X as Ot,
    Xc as Yt,
    Xd as T,
    Y as Ae,
    Yb as qe,
    Yc as st,
    Z as it,
    Zb as Ie,
    _b as Te,
    ac as a,
    ad as ye,
    bc as s,
    bd as Mt,
    cc as f,
    da as U,
    dc as u,
    de as lt,
    ec as g,
    ee as ue,
    f as me,
    fa as $t,
    fb as Bt,
    fc as B,
    fe as Jt,
    g as q,
    ga as J,
    gd as O,
    ha as ie,
    ja as z,
    jc as A,
    kb as c,
    kc as we,
    ke as Q,
    m as tt,
    nc as N,
    oc as ee,
    p as L,
    pa as R,
    pb as ne,
    pc as m,
    q as Qe,
    qa as jt,
    ta as E,
    tc as nt,
    u as Ee,
    ua as Re,
    uc as rt,
    v as Rt,
    vc as ot,
    w as I,
    wb as x,
    x as ke,
    za as C,
    zc as Gt
} from "./chunk-7LZCJGQ2.js";
import {
    a as D,
    b as G,
    c as Lt,
    d as At,
    k as Y
} from "./chunk-TXK3PDXI.js";
var It = "authTokens",
    X = (() => {
        let n = class n {
            constructor(e, t, r, d, v) {
                this._http = e, this._toastr = t, this._router = r, this._currentUserService = d, this._analyticsService = v, this._loading = new q(!1), this._currentTokens = new q(null), this._loadNewUser = new q(null), this.loading$ = this._loading.pipe(U(1)), this.currentUser$ = this._currentUserService.currentUser$, this.authorization$ = this._currentTokens.pipe(Le(), U(1)), this.isAuthenticated$ = this._currentUserService.currentUser$.pipe(I(Z => Z !== null), Le(), U({
                    bufferSize: 1,
                    refCount: !0
                }))
            }
            login(e, t) {
                return this._http.post("/api/auth/login", {
                    username: e,
                    password: t
                }).pipe(z(r => {
                    this._currentUserService.setCurrentUser(r)
                }))
            }
            logout() {
                return this.currentUser$.pipe(it(), J(e => e === null ? L(null) : this._http.get("/api/auth/logout").pipe(F(t => L(null)))), z(() => {
                    this._removeAuthTokens(), this._currentTokens.next(null)
                }))
            }
            getCurrentTokens() {
                return this._currentTokens.getValue()
            }
            register(e) {
                return this._loading.next(!0), this._http.post("/api/auth/register", e).pipe(Ae(() => this._loading.next(!1))).subscribe(t => {
                    this._toastr.success("Successfully created user"), this._router.navigate(["/auth/login"]), this._analyticsService.trackEvent("user_registered", {
                        username: e.email,
                        firstName: e.firstName,
                        lastName: e.lastName
                    })
                }, t => {
                    t ? .error ? .nonFieldErrors ? .[0] ? this._toastr.error(t.error.nonFieldErrors ? .[0]) : t ? .error ? .message ? this._toastr.error(t.error.message) : console.error(t.error)
                })
            }
            forgotPassword(e) {
                return this._http.post("/api/auth/forgot-password", {
                    email: e
                })
            }
            resetPassword(e, t) {
                return this._http.post("/api/auth/reset-password", {
                    token: e,
                    password: t
                })
            }
            verifyEmail(e) {
                return this._http.post("/api/auth/verify-email", {
                    token: e
                })
            }
            resendVerificationEmail(e) {
                return this._http.post("/api/auth/resend-verification", {
                    email: e
                })
            }
            _removeAuthTokens() {
                window.localStorage.removeItem(It)
            }
            _getAuthTokens() {
                let e = window.localStorage.getItem(It);
                return e === null ? null : JSON.parse(e)
            }
            _storeAuthTokens(e) {
                window.localStorage.setItem(It, JSON.stringify(e))
            }
            refreshTokens() {
                let e = this.getCurrentTokens();
                return e ? this._http.get("/api/auth/refresh", {
                    headers: {
                        Authorization: `Bearer ${e.refreshToken}`
                    }
                }).pipe(z(t => {
                    this._storeAuthTokens(t), this._currentTokens.next(t)
                }), F(t => (t && t.status === 401 && (this._currentTokens.next(null), this._removeAuthTokens()), Qe(t)))) : L(null)
            }
        };
        n.\u0275fac = function(t) {
            return new(t || n)(E(ue), E(Ce), E($), E(He), E(ei))
        }, n.\u0275prov = R({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
        });
        let i = n;
        return i
    })();
var _e = (() => {
    let n = class n {
        constructor() {
            this._environment = null
        }
        initialize(e) {
            this._environment = e
        }
        get environment() {
            if (!this._environment) throw new Error("EnvironmentService not initialized. Call initialize() first.");
            return this._environment
        }
        get isInitialized() {
            return this._environment !== null
        }
        get apiUrl() {
            return this.environment.apiUrl
        }
        get stripePublishableKey() {
            return this.environment.stripePublishableKey
        }
        get stripePriceMonthly() {
            return this.environment.stripePriceMonthly
        }
        get stripePriceAnnual() {
            return this.environment.stripePriceAnnual
        }
        get isProduction() {
            return this.environment.production
        }
        get isStaging() {
            return this.environment.staging
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var le = (() => {
    let n = class n {
        constructor(e, t) {
            this.http = e, this.environmentService = t
        }
        get baseUrl() {
            return this.environmentService.apiUrl
        }
        createSubscriptionIntent(e) {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/create-subscription-intent`, e)
        }
        completeSubscription(e) {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/complete-subscription`, e)
        }
        getSubscriptionStatus() {
            return this.http.get(`${this.baseUrl}/subscriptions/v2/subscription-status`)
        }
        getActiveSubscription() {
            return this.http.get(`${this.baseUrl}/subscriptions/v2/subscriptions/active`)
        }
        getAllSubscriptions() {
            return this.http.get(`${this.baseUrl}/subscriptions/v2/subscriptions`)
        }
        getPricingPlans() {
            return this.http.get(`${this.baseUrl}/subscriptions/v2/prices`)
        }
        registerUser(e) {
            return this.http.post(`${this.baseUrl}/auth/register`, e)
        }
        checkEmailExists(e) {
            return this.http.post(`${this.baseUrl}/auth/check-email`, {
                email: e
            })
        }
        createSubscriptionWithPayment(e) {
            return this.http.post(`${this.baseUrl}/subscriptions/v3/create-subscription-with-payment`, e)
        }
        getSubscriptionStatusV3() {
            return this.http.get(`${this.baseUrl}/subscriptions/v3/subscription-status`)
        }
        getPricingPlansV3() {
            return this.http.get(`${this.baseUrl}/subscriptions/v3/prices`)
        }
        cancelSubscriptionV3() {
            return this.http.post(`${this.baseUrl}/subscriptions/v3/cancel-subscription`, {})
        }
        createSetupIntentForRenewal() {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/create-setup-intent-for-renewal`, {})
        }
        createSetupIntentForPaymentUpdate() {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/create-setup-intent-for-payment-update`, {})
        }
        confirmRenewal(e) {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/confirm-renewal`, e)
        }
        getInvoices() {
            return this.http.get(`${this.baseUrl}/subscriptions/v2/invoices`).pipe(I(e => e.invoices))
        }
        getUpcomingInvoice() {
            return this.http.get(`${this.baseUrl}/subscriptions/v2/upcoming-invoice`)
        }
        previewPlanChange(e) {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/preview-plan-change`, {
                newPriceId: e
            })
        }
        getPaymentMethods() {
            return this.http.get(`${this.baseUrl}/subscriptions/v2/payment-methods`).pipe(I(e => e.paymentMethods))
        }
        getSubscriptionHealth() {
            return this.http.get(`${this.baseUrl}/subscriptions/v2/subscription-health`)
        }
        updatePaymentMethod(e) {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/update-payment`, e)
        }
        schedulePlanChange(e) {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/schedule-plan-change`, e)
        }
        cancelSubscription(e) {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/cancel`, e)
        }
        reactivateSubscription() {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/reactivate`, {})
        }
        cancelPendingPlanChange() {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/cancel-pending-change`, {})
        }
        changePlan(e, t) {
            return this.http.post(`${this.baseUrl}/subscriptions/v2/change-plan`, {
                priceId: e,
                termsAgreement: t
            })
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(E(ue), E(_e))
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();

function ji(i, n) {
    i & 1 && (a(0, "p", 10), l(1, " Please enter a valid email address "), s())
}

function zi(i, n) {
    i & 1 && (a(0, "p", 10), l(1, "Password is required"), s())
}

function Bi(i, n) {
    i & 1 && (b(), a(0, "svg", 37), f(1, "circle", 38)(2, "path", 39), s(), l(3, " Signing in... "))
}

function Ui(i, n) {
    i & 1 && l(0, " Sign In ")
}

function Gi(i, n) {
    if (i & 1 && (a(0, "div", 18), l(1), s()), i & 2) {
        let o = m();
        c(), M(" ", o.loginError, " ")
    }
}
var ai = (() => {
    let n = class n {
        constructor(e, t, r, d) {
            this._fb = e, this._router = t, this._authService = r, this._subscriptionService = d, this.isLoading = !1, this.loginError = null
        }
        ngOnInit() {
            this.initializeForm(), document.documentElement.classList.add("dark")
        }
        initializeForm() {
            this.loginForm = this._fb.group({
                email: ["", [w.required, w.email]],
                password: ["", [w.required, w.minLength(8)]],
                rememberMe: [!1]
            })
        }
        onSubmit() {
            if (this.loginForm.invalid) return;
            this.isLoading = !0, this.loginError = null;
            let e = this.loginForm.value;
            this._authService.login(e.email, e.password).pipe(J(() => this._subscriptionService.getSubscriptionStatus()), F(t => (this.isLoading = !1, this.loginError = "Invalid email or password", L(null)))).subscribe({
                next: t => {
                    this.isLoading = !1, t && (t.hasSubscription && t.active ? this._router.navigate(["/app/insights"]) : this._router.navigate(["/app/subscription"]))
                },
                error: () => {
                    this.isLoading = !1, this.loginError = "An error occurred. Please try again."
                }
            })
        }
        goToRegistration() {
            this._router.navigate(["/auth/register"])
        }
        onForgotPassword() {
            this._router.navigate(["/auth/forgot-password"])
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(se), x($), x(X), x(le))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-login-v2"]
        ],
        decls: 71,
        vars: 6,
        consts: [
            [1, "min-h-screen", "bg-gradient-to-br", "from-black", "via-blue-950", "to-black", "flex"],
            [1, "w-full", "lg:w-1/2", "flex", "items-center", "justify-center", "px-4", "py-12"],
            [1, "w-full", "max-w-md"],
            [1, "text-center", "mb-8"],
            ["src", "assets/qualtrim-wide-logo.svg", "alt", "Qualtrim", 1, "h-8", "sm:h-12", "mx-auto", "mb-6"],
            [1, "text-gray-300"],
            [1, "bg-gray-800/95", "backdrop-blur-sm", "rounded-2xl", "shadow-2xl", "p-8"],
            [1, "space-y-6", 3, "ngSubmit", "formGroup"],
            [1, "block", "text-sm", "font-medium", "text-gray-300", "mb-2"],
            ["type", "email", "formControlName", "email", "placeholder", "john@example.com", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"],
            [1, "mt-2", "text-sm", "text-red-600"],
            ["type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"],
            [1, "flex", "items-center", "justify-between"],
            [1, "flex", "items-center"],
            ["type", "checkbox", "formControlName", "rememberMe", 1, "mr-2"],
            [1, "text-sm", "text-gray-300"],
            ["type", "button", "routerLink", "/auth/forgot-password", 1, "text-sm", "text-blue-600", "hover:underline", 3, "click"],
            ["type", "submit", 1, "w-full", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white", "rounded-xl", "font-semibold", "hover:from-blue-700", "hover:to-blue-900", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-300", "flex", "items-center", "justify-center", 3, "disabled"],
            [1, "mt-4", "p-3", "bg-red-900/20", "border", "border-red-500/50", "rounded-lg", "text-red-300", "text-sm"],
            [1, "my-6", "flex", "items-center"],
            [1, "flex-1", "border-t", "border-gray-700"],
            [1, "px-4", "text-sm", "text-gray-300"],
            [1, "text-center"],
            [1, "text-gray-300", "mb-4"],
            ["routerLink", "/auth/register", "type", "button", 1, "w-full", "block", "py-3", "bg-gradient-to-r", "from-blue-600", "to-purple-600", "text-white", "rounded-xl", "font-semibold", "hover:from-blue-700", "hover:to-purple-700", "transition-all", "duration-300"],
            [1, "hidden", "lg:flex", "lg:w-1/2", "items-center", "justify-center", "bg-gradient-to-br", "from-blue-900/10", "to-blue-800/50", "backdrop-blur-sm", "px-12"],
            [1, "max-w-lg", "text-center"],
            [1, "mb-8"],
            [1, "inline-flex", "items-center", "justify-center", "w-20", "h-20", "bg-white/10", "rounded-full", "mb-6"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-10", "h-10", "text-white"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"],
            [1, "text-4xl", "font-bold", "text-white", "mb-6"],
            [1, "text-xl", "text-gray-200", "mb-8"],
            [1, "space-y-4", "text-left"],
            [1, "flex", "items-center", "text-white"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-green-400", "mr-3"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"],
            ["viewBox", "0 0 24 24", 1, "animate-spin", "h-5", "w-5", "mr-3"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", "fill", "none", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"]
        ],
        template: function(t, r) {
            if (t & 1 && (a(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3), f(4, "img", 4), a(5, "p", 5), l(6, "Sign in to your account to continue"), s()(), a(7, "div", 6)(8, "form", 7), N("ngSubmit", function() {
                    return r.onSubmit()
                }), a(9, "div")(10, "label", 8), l(11, " Email Address "), s(), f(12, "input", 9), p(13, ji, 2, 0, "p", 10), s(), a(14, "div")(15, "label", 8), l(16, " Password "), s(), f(17, "input", 11), p(18, zi, 2, 0, "p", 10), s(), a(19, "div", 12)(20, "label", 13), f(21, "input", 14), a(22, "span", 15), l(23, "Remember me"), s()(), a(24, "a", 16), N("click", function() {
                    return r.onForgotPassword()
                }), l(25, " Forgot password? "), s()(), a(26, "button", 17), p(27, Bi, 4, 0)(28, Ui, 1, 0), s()(), p(29, Gi, 2, 1, "div", 18), a(30, "div", 19), f(31, "div", 20), a(32, "span", 21), l(33, "or"), s(), f(34, "div", 20), s(), a(35, "div", 22)(36, "p", 23), l(37, "Don't have an account yet?"), s(), a(38, "a", 24), l(39, " Join Qualtrim Today "), s()()()()(), a(40, "div", 25)(41, "div", 26)(42, "div", 27)(43, "div", 28), b(), a(44, "svg", 29), f(45, "path", 30), s()()(), y(), a(46, "h3", 31), l(47, " Transform Your Investment Analysis "), s(), a(48, "p", 32), l(49, " Get instant access to 15+ interactive financial charts, AI-powered analysis, and 20+ years of earnings transcripts. "), s(), a(50, "div", 33)(51, "div", 34), b(), a(52, "svg", 35), f(53, "path", 36), s(), y(), a(54, "span"), l(55, "Professional DCF Calculator"), s()(), a(56, "div", 34), b(), a(57, "svg", 35), f(58, "path", 36), s(), y(), a(59, "span"), l(60, "Real-time Market Data & Alerts"), s()(), a(61, "div", 34), b(), a(62, "svg", 35), f(63, "path", 36), s(), y(), a(64, "span"), l(65, "Portfolio Tracking & Management"), s()(), a(66, "div", 34), b(), a(67, "svg", 35), f(68, "path", 36), s(), y(), a(69, "span"), l(70, "AI-Powered Competitive Analysis"), s()()()()()()), t & 2) {
                let d, v;
                c(8), S("formGroup", r.loginForm), c(5), h((d = r.loginForm.get("email")) != null && d.invalid && ((d = r.loginForm.get("email")) != null && d.touched) ? 13 : -1), c(5), h((v = r.loginForm.get("password")) != null && v.invalid && ((v = r.loginForm.get("password")) != null && v.touched) ? 18 : -1), c(8), S("disabled", r.loginForm.invalid || r.isLoading), c(), h(r.isLoading ? 27 : 28), c(2), h(r.loginError ? 29 : -1)
            }
        },
        dependencies: [T, oe, fe, Se, ct, pe, he, ge, ve, te, ae],
        styles: ["[_nghost-%COMP%]{display:block;min-height:100vh}*[_ngcontent-%COMP%]{transition:all .3s cubic-bezier(.4,0,.2,1)}button[_ngcontent-%COMP%]:not(:disabled){cursor:pointer}button[_ngcontent-%COMP%]:not(:disabled):hover{transform:translateY(-2px);box-shadow:0 8px 25px #00000026}button[_ngcontent-%COMP%]:not(:disabled):active{transform:translateY(0);transition:transform .1s}input[type=text][_ngcontent-%COMP%]:focus, input[type=email][_ngcontent-%COMP%]:focus, input[type=password][_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 0 3px #3b82f61a}@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}.animate-spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin 1s linear infinite}@keyframes _ngcontent-%COMP%_slideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.modal-content[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideUp .3s ease-out}.gradient-text[_ngcontent-%COMP%]{background:linear-gradient(135deg,#667eea,#764ba2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}@media (max-width: 1024px){.marketing-content[_ngcontent-%COMP%]{display:none}}@media (max-width: 640px){.form-container[_ngcontent-%COMP%]{padding:1rem}}[data-theme=dark][_nghost-%COMP%]   input[type=text][_ngcontent-%COMP%]:focus, [data-theme=dark]   [_nghost-%COMP%]   input[type=text][_ngcontent-%COMP%]:focus, [data-theme=dark][_nghost-%COMP%]   input[type=email][_ngcontent-%COMP%]:focus, [data-theme=dark]   [_nghost-%COMP%]   input[type=email][_ngcontent-%COMP%]:focus, [data-theme=dark][_nghost-%COMP%]   input[type=password][_ngcontent-%COMP%]:focus, [data-theme=dark]   [_nghost-%COMP%]   input[type=password][_ngcontent-%COMP%]:focus{box-shadow:0 0 0 3px #3b82f633}[data-theme=dark][_nghost-%COMP%]   .modal-overlay[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .modal-overlay[_ngcontent-%COMP%]{background:#000000b3}"]
    });
    let i = n;
    return i
})();
var ci = "clover",
    qi = function(n) {
        return n === 3 ? "v3" : n
    },
    di = "https://js.stripe.com",
    Hi = "".concat(di, "/").concat(ci, "/stripe.js"),
    Yi = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,
    Wi = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/,
    si = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",
    Qi = function(n) {
        return Yi.test(n) || Wi.test(n)
    },
    Ji = function() {
        for (var n = document.querySelectorAll('script[src^="'.concat(di, '"]')), o = 0; o < n.length; o++) {
            var e = n[o];
            if (Qi(e.src)) return e
        }
        return null
    },
    li = function(n) {
        var o = n && !n.advancedFraudSignals ? "?advancedFraudSignals=false" : "",
            e = document.createElement("script");
        e.src = "".concat(Hi).concat(o);
        var t = document.head || document.body;
        if (!t) throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
        return t.appendChild(e), e
    },
    Ki = function(n, o) {
        !n || !n._registerWrapper || n._registerWrapper({
            name: "stripe-js",
            version: "8.5.2",
            startTime: o
        })
    },
    Ze = null,
    ft = null,
    gt = null,
    Xi = function(n) {
        return function(o) {
            n(new Error("Failed to load Stripe.js", {
                cause: o
            }))
        }
    },
    Zi = function(n, o) {
        return function() {
            window.Stripe ? n(window.Stripe) : o(new Error("Stripe.js not available"))
        }
    },
    en = function(n) {
        return Ze !== null ? Ze : (Ze = new Promise(function(o, e) {
            if (typeof window > "u" || typeof document > "u") {
                o(null);
                return
            }
            if (window.Stripe && n && console.warn(si), window.Stripe) {
                o(window.Stripe);
                return
            }
            try {
                var t = Ji();
                if (t && n) console.warn(si);
                else if (!t) t = li(n);
                else if (t && gt !== null && ft !== null) {
                    var r;
                    t.removeEventListener("load", gt), t.removeEventListener("error", ft), (r = t.parentNode) === null || r === void 0 || r.removeChild(t), t = li(n)
                }
                gt = Zi(o, e), ft = Xi(e), t.addEventListener("load", gt), t.addEventListener("error", ft)
            } catch (d) {
                e(d);
                return
            }
        }), Ze.catch(function(o) {
            return Ze = null, Promise.reject(o)
        }))
    },
    tn = function(n, o, e) {
        if (n === null) return null;
        var t = o[0],
            r = t.match(/^pk_test/),
            d = qi(n.version),
            v = ci;
        r && d !== v && console.warn("Stripe.js@".concat(d, " was loaded on the page, but @stripe/stripe-js@").concat("8.5.2", " expected Stripe.js@").concat(v, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
        var Z = n.apply(void 0, o);
        return Ki(Z, e), Z
    },
    et, mi = !1,
    ui = function() {
        return et || (et = en(null).catch(function(n) {
            return et = null, Promise.reject(n)
        }), et)
    };
Promise.resolve().then(function() {
    return ui()
}).catch(function(i) {
    mi || console.warn(i)
});
var vt = function() {
    for (var n = arguments.length, o = new Array(n), e = 0; e < n; e++) o[e] = arguments[e];
    mi = !0;
    var t = Date.now();
    return ui().then(function(r) {
        return tn(r, o, t)
    })
};
var bt = (() => {
    let n = class n {
        constructor() {
            this.stripe = null, this.elements = null, this.paymentElement = null
        }
        initialize(e) {
            return Y(this, null, function*() {
                if (this.stripe) return this.stripe;
                console.log("Initializing Stripe with publishable key:", e);
                try {
                    return this.stripe = yield vt(e), this.stripe
                } catch (t) {
                    return console.error("Failed to load Stripe:", t), null
                }
            })
        }
        createElements(e, t = !1) {
            return Y(this, null, function*() {
                if (!this.stripe) return null;
                try {
                    let r = document.documentElement.getAttribute("data-theme") === "dark",
                        d = {
                            appearance: {
                                theme: t || r ? "night" : "stripe",
                                variables: {
                                    colorPrimary: "#3b82f6",
                                    colorBackground: t || r ? "#1f2937" : "#ffffff",
                                    colorText: t || r ? "#f9fafb" : "#111827",
                                    colorDanger: "#ef4444",
                                    fontFamily: "system-ui, sans-serif",
                                    borderRadius: "8px"
                                },
                                rules: {
                                    ".Input": {
                                        border: t || r ? "1px solid #374151" : "1px solid #d1d5db",
                                        backgroundColor: t || r ? "#1f2937" : "#ffffff"
                                    },
                                    ".Input:focus": {
                                        borderColor: "#3b82f6",
                                        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
                                    },
                                    ".Label": {
                                        color: t ? "#f9fafb" : r ? "#d1d5db" : "#374151",
                                        fontSize: "14px",
                                        fontWeight: "500"
                                    }
                                }
                            }
                        };
                    return typeof e == "string" ? d.clientSecret = e : typeof e == "object" && e !== null ? (Object.assign(d, e), d.clientSecret || (d.mode = "setup", d.currency = d.currency || "usd")) : (d.mode = "setup", d.currency = "usd"), this.elements = this.stripe.elements(d), this.elements
                } catch (r) {
                    return console.error("Failed to create Stripe elements:", r), null
                }
            })
        }
        createPaymentElement(e, t) {
            return Y(this, null, function*() {
                if (!this.elements) return null;
                try {
                    let r = {
                            layout: "tabs"
                        },
                        d = t ? D(D({}, r), t) : r;
                    return this.paymentElement = this.elements.create("payment", d), this.paymentElement.mount(`#${e}`), this.paymentElement
                } catch (r) {
                    return console.error("Failed to create payment element:", r), null
                }
            })
        }
        submitElements() {
            return Y(this, null, function*() {
                if (!this.elements) return {
                    error: {
                        message: "Stripe elements not initialized"
                    }
                };
                try {
                    let {
                        error: e
                    } = yield this.elements.submit();
                    return {
                        error: e
                    }
                } catch (e) {
                    return {
                        error: e
                    }
                }
            })
        }
        confirmSetup(e, t) {
            return Y(this, null, function*() {
                if (!this.stripe || !this.elements) return {
                    error: {
                        message: "Stripe not initialized"
                    }
                };
                try {
                    let r = yield this.stripe.confirmSetup({
                        clientSecret: e,
                        elements: this.elements,
                        confirmParams: {
                            return_url: t
                        }
                    });
                    return {
                        error: r.error,
                        setupIntent: "setupIntent" in r ? r.setupIntent : void 0
                    }
                } catch (r) {
                    return {
                        error: r
                    }
                }
            })
        }
        confirmSetupWithoutRedirect(e) {
            return Y(this, null, function*() {
                if (!this.stripe || !this.elements) return {
                    error: {
                        message: "Stripe not initialized"
                    }
                };
                try {
                    let t = yield this.stripe.confirmSetup({
                        clientSecret: e,
                        elements: this.elements,
                        redirect: "if_required"
                    });
                    return {
                        error: t.error,
                        setupIntent: t.setupIntent
                    }
                } catch (t) {
                    return {
                        error: t
                    }
                }
            })
        }
        confirmPayment(e, t) {
            return Y(this, null, function*() {
                if (!this.stripe || !this.elements) return {
                    error: {
                        message: "Stripe not initialized"
                    }
                };
                try {
                    let r = yield this.stripe.confirmPayment({
                        clientSecret: e,
                        elements: this.elements,
                        confirmParams: {
                            return_url: t
                        }
                    });
                    return {
                        error: r.error,
                        paymentIntent: "paymentIntent" in r ? r.paymentIntent : void 0
                    }
                } catch (r) {
                    return {
                        error: r
                    }
                }
            })
        }
        confirmPaymentWithoutRedirect(e) {
            return Y(this, null, function*() {
                if (!this.stripe || !this.elements) return {
                    error: {
                        message: "Stripe not initialized"
                    }
                };
                try {
                    let t = yield this.stripe.confirmPayment({
                        clientSecret: e,
                        elements: this.elements,
                        redirect: "if_required"
                    });
                    return {
                        error: t.error,
                        paymentIntent: "paymentIntent" in t ? t.paymentIntent : void 0
                    }
                } catch (t) {
                    return {
                        error: t
                    }
                }
            })
        }
        destroy() {
            this.paymentElement && (this.paymentElement.destroy(), this.paymentElement = null), this.elements = null
        }
        getStripeInstance() {
            return this.stripe
        }
        getElementsInstance() {
            return this.elements
        }
        getPaymentElementInstance() {
            return this.paymentElement
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var pi = (() => {
    let n = class n {
        constructor() {
            this.http = Re(ue), this._connectionStatus = P({
                connected: !1
            }), this.connectionStatus = this._connectionStatus.asReadonly(), this.isConnected = O(() => this._connectionStatus().connected), this.discordUsername = O(() => this._connectionStatus().username), this.discordAvatar = O(() => this._connectionStatus().avatar), this.displayName = O(() => this._connectionStatus().displayName)
        }
        loadConnectionStatus() {
            this.http.get("/api/v2/discord/status").subscribe({
                next: e => {
                    this._connectionStatus.set(G(D({}, e), {
                        connectedAt: e.connectedAt ? new Date(e.connectedAt) : void 0
                    }))
                },
                error: e => {
                    console.error("Failed to load Discord connection status:", e), this._connectionStatus.set({
                        connected: !1
                    })
                }
            })
        }
        initiateOAuth() {
            this.http.get("/api/v2/discord/oauth-url").subscribe({
                next: e => {
                    sessionStorage.setItem("discord_oauth_return", window.location.pathname), window.location.href = e.url
                },
                error: e => {
                    console.error("Failed to get Discord OAuth URL:", e)
                }
            })
        }
        disconnect() {
            return this.http.post("/api/v2/discord/disconnect", {}).pipe(z(() => {
                this._connectionStatus.set({
                    connected: !1
                })
            }))
        }
        handleOAuthSuccess() {
            this.loadConnectionStatus()
        }
        clearStatus() {
            this._connectionStatus.set({
                connected: !1
            })
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var Ye = (() => {
    let n = class n {
        constructor(e, t) {
            this.http = e, this.environmentService = t, this.apiUrl = `${this.environmentService.apiUrl}/subscriptions/embedded`
        }
        createCheckoutSession(e) {
            let t = `${this.apiUrl}/create-session`;
            return console.log("[EmbeddedCheckoutService] Creating session at:", t), console.log("[EmbeddedCheckoutService] Request DTO:", e), this.http.post(t, e)
        }
        retrieveCheckoutSession(e) {
            return this.http.get(`${this.apiUrl}/session/${e}`)
        }
        getPricing(e) {
            return this.http.get(`${this.apiUrl}/pricing/${e}`)
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(E(ue), E(_e))
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var xt = class {
    static toLegacyState(n) {
        return {
            PATREON_ACTIVE: H.PATREON_ACTIVE,
            MIGRATION_IN_PROGRESS: H.MIGRATION_IN_PROGRESS,
            MIGRATION_COMPLETE: H.MIGRATION_READY_TO_ACTIVATE,
            STRIPE_ACTIVE: H.STRIPE_ACTIVE,
            NO_SUBSCRIPTION: H.NO_SUBSCRIPTION
        }[n] || H.NO_SUBSCRIPTION
    }
    static mapPatreonStatus(n) {
        if (n.patreonSubscription) return {
            isActive: n.patreonSubscription.active,
            nextBillingDate: n.migrationInfo ? .patreonEndDate ? new Date(n.migrationInfo.patreonEndDate) : void 0,
            lastChecked: new Date
        }
    }
    static mapStripeStatus(n) {
        if (n.stripeSubscription) return {
            subscriptionId: n.migrationInfo ? .stripeSubscriptionId || "",
            scheduledStart: n.migrationInfo ? .stripeStartDate ? new Date(n.migrationInfo.stripeStartDate) : new Date,
            status: n.stripeSubscription.status
        }
    }
    static toLegacyResponse(n) {
        return G(D({}, n), {
            state: this.toLegacyState(n.migrationState),
            patreonStatus: this.mapPatreonStatus(n),
            stripeStatus: this.mapStripeStatus(n),
            actions: n.availableActions,
            readyToActivate: n.migrationState === "MIGRATION_COMPLETE",
            message: n.migrationProgress ? .currentStepDescription || ""
        })
    }
};
var H = (function(i) {
        return i.PATREON_ACTIVE = "PATREON_ACTIVE", i.MIGRATION_IN_PROGRESS = "MIGRATION_IN_PROGRESS", i.MIGRATION_PENDING = "MIGRATION_IN_PROGRESS", i.MIGRATION_WAITING_PATREON_CANCEL = "MIGRATION_IN_PROGRESS", i.MIGRATION_READY_TO_ACTIVATE = "MIGRATION_COMPLETE", i.STRIPE_ACTIVE = "STRIPE_ACTIVE", i.NO_SUBSCRIPTION = "NO_SUBSCRIPTION", i
    })(H || {}),
    yt = (() => {
        let n = class n {
            constructor(e) {
                this.http = e
            }
            getMigrationStatus() {
                return this.http.get("/api/subscriptions/migration/status").pipe(I(e => xt.toLegacyResponse(e)))
            }
            verifyPatreonCancellation() {
                return this.http.post("/api/subscriptions/migration/verify-patreon-cancellation", {})
            }
            startMigration() {
                return this.http.post("/api/subscriptions/migration/start", {})
            }
            selectPlan(e) {
                return this.http.post("/api/subscriptions/migration/select-plan", {
                    plan: e
                })
            }
            completePaymentSetup(e) {
                return this.http.post("/api/subscriptions/migration/complete-payment-setup", {
                    sessionId: e
                })
            }
            confirmPatreonCancellation() {
                return this.http.post("/api/subscriptions/migration/confirm-patreon-cancel", {})
            }
            cancelMigration() {
                return this.http.post("/api/subscriptions/migration/cancel", {})
            }
        };
        n.\u0275fac = function(t) {
            return new(t || n)(E(ue))
        }, n.\u0275prov = R({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
        });
        let i = n;
        return i
    })();
var ze = (() => {
    let n = class n {
        constructor() {
            this.subscriptionService = Re(le), this.migrationService = Re(yt), this._subscriptionStatus$ = new q(null), this._allSubscriptions$ = new q([]), this._pricingPlans$ = new q(null), this._invoices$ = new q([]), this._paymentMethods$ = new q([]), this._loadingMapCache = new Map, this._errors$ = new q({}), this._subscriptionTrigger$ = new q(void 0), this._plansTrigger$ = new q(void 0), this._invoicesTrigger$ = new q(void 0), this._paymentMethodsTrigger$ = new q(void 0), this._upcomingInvoiceTrigger$ = new q(void 0), this._allSubscriptionsTrigger$ = new q(void 0), this._subscriptionStatus$$ = this._subscriptionTrigger$.pipe(J(() => this.loadSubscriptionStatus()), z(e => this._subscriptionStatus$.next(e)), U({
                bufferSize: 1,
                refCount: !1
            })), this._pricingPlans$$ = this._plansTrigger$.pipe(J(() => this.loadPricingPlans()), z(e => this._pricingPlans$.next(e)), U({
                bufferSize: 1,
                refCount: !1
            })), this._invoices$$ = this._invoicesTrigger$.pipe(J(() => this.loadInvoices()), z(e => this._invoices$.next(e)), U({
                bufferSize: 1,
                refCount: !1
            })), this._paymentMethods$$ = this._paymentMethodsTrigger$.pipe(J(() => this.loadPaymentMethods()), z(e => this._paymentMethods$.next(e)), U({
                bufferSize: 1,
                refCount: !1
            })), this._upcomingInvoice$$ = this._upcomingInvoiceTrigger$.pipe(J(() => this.loadUpcomingInvoice()), U({
                bufferSize: 1,
                refCount: !1
            })), this._errors$$ = this._errors$.asObservable().pipe(U({
                bufferSize: 1,
                refCount: !1
            })), this._allSubscriptions$$ = this._allSubscriptionsTrigger$.pipe(J(() => (console.log("Loading all subscriptions"), this.setLoading("subscription", !0), this.loadAllSubscriptions().pipe(Ae(() => {
                console.log("All subscriptions loaded"), this.setLoading("subscription", !1)
            })))), U({
                bufferSize: 1,
                refCount: !1
            })), this.patreonSubscription = O(() => this.allSubscriptions() ? .find(t => t.type === "patreon") || null), this.stripeSubscription = O(() => this.allSubscriptions() ? .find(t => t.type === "stripe") || null), this._currentPlan$$ = ke([this._subscriptionStatus$$, this._pricingPlans$$]).pipe(I(([e, t]) => {
                if (!e ? .info || e.type !== "stripe" || !t || !be(e.info)) return null;
                let r = e.info;
                if (!r.priceId) return null;
                let d = r.priceId === t.annual ? .id,
                    v = r.priceId === t.monthly ? .id;
                return !d && !v ? (console.warn(`Unknown price ID: ${r.priceId}`), {
                    type: "monthly",
                    plan: t.monthly,
                    priceId: r.priceId,
                    status: r.stripeStatus,
                    isActive: e.active
                }) : {
                    type: d ? "annual" : "monthly",
                    plan: d ? t.annual : t.monthly,
                    priceId: r.priceId,
                    status: r.stripeStatus,
                    isActive: e.active
                }
            }), U({
                bufferSize: 1,
                refCount: !1
            })), this._isAnnualPlan$$ = this._currentPlan$$.pipe(I(e => e ? .type === "annual"), U({
                bufferSize: 1,
                refCount: !1
            })), this._planDetails$$ = ke([this._currentPlan$$, this._pricingPlans$$]).pipe(I(([e, t]) => {
                if (!e || !t) return null;
                let r = t.monthly ? `$${(t.monthly.amount/100).toFixed(2)}` : "$9.99",
                    d = t.annual ? `$${(t.annual.amount/100).toFixed(0)}` : "$99",
                    v = t.annual ? `$${(t.annual.amount/100/12).toFixed(2)}` : "$8.25";
                return {
                    current: {
                        name: e.type === "annual" ? "Annual Plan" : "Monthly Plan",
                        price: e.type === "annual" ? `${d}/year` : `${r}/month`,
                        priceId: e.priceId
                    },
                    monthly: {
                        name: "Monthly Plan",
                        price: `${r}/month`,
                        priceId: t.monthly ? .id
                    },
                    annual: {
                        name: "Annual Plan",
                        price: `${d}/year`,
                        monthlyEquivalent: `${v}/month`,
                        priceId: t.annual ? .id
                    }
                }
            }), U({
                bufferSize: 1,
                refCount: !1
            })), this._nextBillingInfo$$ = this._subscriptionStatus$$.pipe(I(e => {
                if (!e ? .info) return null;
                if (e.type === "stripe" && be(e.info)) {
                    let t = e.info;
                    return {
                        nextBillingDate: t.currentPeriodEnd,
                        lastBillingDate: t.currentPeriodStart,
                        trialEnd: t.trialEnd,
                        cancelAtPeriodEnd: t.cancelAtPeriodEnd,
                        amount: t.amount
                    }
                } else if (e.type === "patreon" && Oe(e.info)) {
                    let t = e.info;
                    return {
                        nextBillingDate: t.nextBillingDate || t.nextChargeDate,
                        lastBillingDate: t.lastChargeDate,
                        trialEnd: null,
                        cancelAtPeriodEnd: !1,
                        amount: t.amount
                    }
                }
                return null
            }), U({
                bufferSize: 1,
                refCount: !1
            })), this._subscriptionHealth$$ = this._subscriptionStatus$$.pipe(I(e => {
                if (!e) return null;
                let t = {
                    isActive: e.active,
                    isTrialing: !1,
                    isPastDue: !1,
                    isCanceled: !1,
                    requiresAction: !1,
                    hasPaymentIssue: !1
                };
                if (e.type === "stripe" && e.info && be(e.info)) {
                    let r = e.info;
                    return G(D({}, t), {
                        isTrialing: r.stripeStatus === "trialing",
                        isPastDue: r.stripeStatus === "past_due",
                        isCanceled: r.stripeStatus === "canceled",
                        requiresAction: r.stripeStatus === "incomplete" || r.stripeStatus === "incomplete_expired",
                        hasPaymentIssue: r.stripeStatus === "past_due" || r.stripeStatus === "unpaid"
                    })
                } else if (e.type === "patreon" && e.info && Oe(e.info)) {
                    let r = e.info;
                    return G(D({}, t), {
                        isPastDue: r.lastChargeStatus === "failed",
                        hasPaymentIssue: r.lastChargeStatus === "failed"
                    })
                }
                return t
            }), U({
                bufferSize: 1,
                refCount: !1
            })), this._isPatreonSubscriber$$ = this._subscriptionStatus$$.pipe(I(e => e ? .type === "patreon" && e.active), U({
                bufferSize: 1,
                refCount: !1
            })), this._isStripeSubscriber$$ = this._subscriptionStatus$$.pipe(I(e => e ? .type === "stripe" && e.active), U({
                bufferSize: 1,
                refCount: !1
            })), this._mergedSubscriptions$$ = ke([this._allSubscriptions$, this._allSubscriptions$$]).pipe(I(([e, t]) => [...e, ...t]), U({
                bufferSize: 1,
                refCount: !1
            })), this.subscriptionStatus = Q(this._subscriptionStatus$$, {
                initialValue: null
            }), this.allSubscriptions = Q(this._allSubscriptions$$, {
                initialValue: []
            }), this.currentPlan = Q(this._currentPlan$$, {
                initialValue: null
            }), this.pricingPlans = Q(this._pricingPlans$$, {
                initialValue: null
            }), this.subscriptionHealth = Q(this._subscriptionHealth$$, {
                initialValue: null
            }), this.planDetails = Q(this._planDetails$$, {
                initialValue: null
            }), this.nextBillingInfo = Q(this._nextBillingInfo$$, {
                initialValue: null
            }), this.upcomingInvoice = Q(this._upcomingInvoice$$, {
                initialValue: null
            }), this.invoices = Q(this._invoices$$, {
                initialValue: []
            }), this.paymentMethods = Q(this._paymentMethods$$, {
                initialValue: []
            }), this.isPatreonSubscriber = Q(this._isPatreonSubscriber$$, {
                initialValue: !1
            }), this.isStripeSubscriber = Q(this._isStripeSubscriber$$, {
                initialValue: !1
            }), this.invoices$ = this._invoices$$, this.paymentMethods$ = this._paymentMethods$$, this.currentPlan$ = this._currentPlan$$, this.pricingPlans$ = this._pricingPlans$$, this.planDetails$ = this._planDetails$$, this.subscriptionStatus$ = this._subscriptionStatus$$, this.isLoadingSubscription = Q(this.getLoading("subscription"), {
                initialValue: !1
            }), this.isLoadingAllSubscriptions = Q(this.getLoading("allSubscriptions"), {
                initialValue: !1
            }), this.isLoadingPlans = Q(this.getLoading("plans"), {
                initialValue: !1
            }), this.isLoadingInvoices = Q(this.getLoading("invoices"), {
                initialValue: !1
            }), this.isLoadingPaymentMethods = Q(this.getLoading("paymentMethods"), {
                initialValue: !1
            }), this.isChangingPlan = Q(this.getLoading("planChange"), {
                initialValue: !1
            }), this.isUpdatingPayment = Q(this.getLoading("paymentUpdate"), {
                initialValue: !1
            }), this.isLoadingMigration = Q(this.getLoading("migration"), {
                initialValue: !1
            }), this.isLoadingMigrationStatus = Q(this.getLoading("migrationStatus"), {
                initialValue: !1
            }), this.isLoadingUpcomingInvoice = Q(this.getLoading("upcomingInvoice"), {
                initialValue: !1
            }), this.isLoadingPlanChangePreview = Q(this.getLoading("planChangePreview"), {
                initialValue: !1
            }), this.subscriptionError = Q(this._errors$$.pipe(I(e => e.subscription || null)), {
                initialValue: null
            }), this.subscriptionHealth$ = this.subscriptionStatus$.pipe(I(e => {
                if (!e) return null;
                let t = {
                    isActive: e.active,
                    isTrialing: !1,
                    isPastDue: !1,
                    isCanceled: !1,
                    requiresAction: !1,
                    hasPaymentIssue: !1
                };
                if (e.type === "stripe" && e.info && be(e.info)) {
                    let r = e.info;
                    return G(D({}, t), {
                        isTrialing: r.stripeStatus === "trialing",
                        isPastDue: r.stripeStatus === "past_due",
                        isCanceled: r.stripeStatus === "canceled",
                        requiresAction: r.stripeStatus === "incomplete" || r.stripeStatus === "incomplete_expired",
                        hasPaymentIssue: r.stripeStatus === "past_due" || r.stripeStatus === "unpaid"
                    })
                } else if (e.type === "patreon" && e.info && Oe(e.info)) {
                    let r = e.info;
                    return G(D({}, t), {
                        isPastDue: r.lastChargeStatus === "failed",
                        hasPaymentIssue: r.lastChargeStatus === "failed"
                    })
                }
                return t
            }), U(1)), this.nextBillingInfo$ = this.subscriptionStatus$.pipe(I(e => {
                if (!e ? .info) return null;
                if (e.type === "stripe" && be(e.info)) {
                    let t = e.info;
                    return {
                        nextBillingDate: t.currentPeriodEnd,
                        lastBillingDate: t.currentPeriodStart,
                        trialEnd: t.trialEnd,
                        cancelAtPeriodEnd: t.cancelAtPeriodEnd,
                        amount: t.amount
                    }
                } else if (e.type === "patreon" && Oe(e.info)) {
                    let t = e.info;
                    return {
                        nextBillingDate: t.nextBillingDate || t.nextChargeDate,
                        lastBillingDate: t.lastChargeDate,
                        trialEnd: null,
                        cancelAtPeriodEnd: !1,
                        amount: t.amount
                    }
                }
                return null
            }), U(1)), this.upcomingInvoice$ = this._upcomingInvoice$$.pipe(U({
                bufferSize: 1,
                refCount: !1
            })), this.canChangePlan$ = this.subscriptionHealth$.pipe(I(e => e ? .isActive && !e.isCanceled), U(1)), this.migrationInfo = O(() => this.patreonSubscription() ? .migrationInfo || null), this.migrationState = O(() => {
                let e = this.patreonSubscription(),
                    t = this.stripeSubscription(),
                    r = this.migrationInfo();
                return e ? .active && t ? .active ? H.MIGRATION_IN_PROGRESS : !e && !t ? H.NO_SUBSCRIPTION : t ? .active && !e ? .active ? H.STRIPE_ACTIVE : e ? .active ? r ? r.status === "completed" ? H.MIGRATION_READY_TO_ACTIVATE : H.MIGRATION_IN_PROGRESS : H.PATREON_ACTIVE : H.NO_SUBSCRIPTION
            }), this.migrationEligible = O(() => {
                let e = this.patreonSubscription(),
                    t = this.stripeSubscription(),
                    r = this.migrationState();
                return console.log("migrationEligible", e, t, r), e ? .active === !0 && !t ? .active && r === H.PATREON_ACTIVE
            }), this.currentMigrationStep = O(() => {
                let e = this.migrationInfo();
                if (!e) return 0;
                switch (e.status) {
                    case "not_started":
                        return 1;
                    case "plan_selected":
                        return 2;
                    case "payment_setup":
                        return 3;
                    case "awaiting_patreon_cancel":
                        return 4;
                    case "completed":
                        return 5;
                    default:
                        return 0
                }
            })
        }
        refreshSubscription() {
            this._subscriptionTrigger$.next(), this._allSubscriptionsTrigger$.next()
        }
        refreshPlans() {
            this._plansTrigger$.next()
        }
        refreshInvoices() {
            this._invoicesTrigger$.next()
        }
        refreshPaymentMethods() {
            this._paymentMethodsTrigger$.next()
        }
        refreshUpcomingInvoice() {
            this._upcomingInvoiceTrigger$.next()
        }
        refreshAll() {
            this._subscriptionTrigger$.next(), this._allSubscriptionsTrigger$.next(), this._plansTrigger$.next(), this._invoicesTrigger$.next(), this._paymentMethodsTrigger$.next(), this._upcomingInvoiceTrigger$.next()
        }
        updateSubscriptionStatus(e) {
            this._subscriptionStatus$.next(e)
        }
        getCurrentSubscriptionStatus() {
            return this._subscriptionStatus$.value
        }
        getCurrentPricingPlans() {
            return this._pricingPlans$.value
        }
        getInvoicesList() {
            return this._invoices$.value
        }
        getPaymentMethodsList() {
            return this._paymentMethods$.value
        }
        getLoading(e) {
            return this._loadingMapCache.has(e) || this._loadingMapCache.set(e, new q(!1)), this._loadingMapCache.get(e).pipe(U({
                bufferSize: 1,
                refCount: !1
            }))
        }
        setLoading(e, t) {
            this._loadingMapCache.has(e) || this._loadingMapCache.set(e, new q(!1)), this._loadingMapCache.get(e).next(t)
        }
        isLoading(e) {
            return e ? this._loadingMapCache.get(e) ? .value ? ? !1 : Array.from(this._loadingMapCache.values()).some(t => t.value)
        }
        clearError(e) {
            let v = this._errors$.value,
                {
                    [e]: r
                } = v,
                d = At(v, [Lt(e)]);
            this._errors$.next(d)
        }
        hasError(e) {
            let t = this._errors$.value;
            return e ? !!t[e] : Object.keys(t).length > 0
        }
        loadSubscriptionStatus() {
            return this.setLoading("subscription", !0), this.subscriptionService.getActiveSubscription().pipe(z(e => {
                this.clearError("subscription"), this.setLoading("subscription", !1), console.log("Active subscription loaded (unified endpoint):", e)
            }), F(e => {
                console.error("Failed to load active subscription:", e);
                let t = {
                    hasSubscription: !1,
                    active: !1,
                    type: void 0,
                    info: void 0,
                    startDate: void 0
                };
                return e ? .status === 404 || e ? .error ? .statusCode === 404 ? this.clearError("subscription") : this.setError("subscription", e), this.setLoading("subscription", !1), L(t)
            }))
        }
        loadPricingPlans() {
            return this.setLoading("plans", !0), this.subscriptionService.getPricingPlans().pipe(I(e => ({
                monthly: e ? .monthly || null,
                annual: e ? .annual || null
            })), z(e => {
                this.clearError("plans"), this.setLoading("plans", !1), console.log("Pricing plans loaded:", e)
            }), F(e => (this.setError("plans", e), this.setLoading("plans", !1), console.error("Failed to load pricing plans:", e), L({
                monthly: null,
                annual: null
            }))))
        }
        loadInvoices() {
            return this.setLoading("invoices", !0), this.subscriptionService.getInvoices().pipe(I(e => e || []), z(e => {
                this.clearError("invoices"), this.setLoading("invoices", !1), console.log("Invoices loaded:", e.length, "invoices")
            }), F(e => (this.setError("invoices", e), this.setLoading("invoices", !1), console.error("Failed to load invoices:", e), L([]))))
        }
        loadPaymentMethods() {
            return this.setLoading("paymentMethods", !0), this.subscriptionService.getPaymentMethods().pipe(I(e => e || []), z(e => {
                this.clearError("paymentMethods"), this.setLoading("paymentMethods", !1), console.log("Payment methods loaded:", e.length, "methods")
            }), F(e => (this.setError("paymentMethods", e), this.setLoading("paymentMethods", !1), console.error("Failed to load payment methods:", e), L([]))))
        }
        loadUpcomingInvoice() {
            return this.setLoading("upcomingInvoice", !0), this.clearError("upcomingInvoice"), this.subscriptionService.getUpcomingInvoice().pipe(z(() => {
                this.setLoading("upcomingInvoice", !1), console.log("Upcoming invoice loaded")
            }), F(e => (console.error("Failed to load upcoming invoice:", e), this.setError("upcomingInvoice", e), this.setLoading("upcomingInvoice", !1), L(null))))
        }
        loadAllSubscriptions() {
            return this.setLoading("allSubscriptions", !0), this.subscriptionService.getAllSubscriptions().pipe(F(e => (console.error("Failed to load all subscriptions:", e), L([]))), Ae(() => {
                this.setLoading("allSubscriptions", !1)
            }))
        }
        setError(e, t) {
            let r = this._errors$.value;
            this._errors$.next(G(D({}, r), {
                [e]: t
            }))
        }
        getMigrationInfo() {
            return this._subscriptionStatus$$.pipe(I(e => e ? .type === "patreon" && e.migrationInfo || null), U({
                bufferSize: 1,
                refCount: !1
            }))
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var Vt = (() => {
    let n = class n {
        constructor(e) {
            this.state = e, this.canChangePlan = O(() => {
                let t = this.state.subscriptionHealth();
                return t ? .isActive && !t.isCanceled
            }), this.canUpdatePayment = O(() => this.state.subscriptionStatus() ? .type === "stripe"), this.planComparison = O(() => {
                let t = this.state.currentPlan(),
                    r = this.state.pricingPlans();
                if (!t || !r) return null;
                let d = t.type === "monthly",
                    v = t.type === "annual";
                return {
                    current: t.type,
                    canUpgrade: d,
                    canDowngrade: v,
                    upgradeOption: d ? "annual" : null,
                    downgradeOption: v ? "monthly" : null,
                    monthlyPrice: r.monthly ? .amount ? r.monthly.amount / 100 : 0,
                    annualPrice: r.annual ? .amount ? r.annual.amount / 100 : 0,
                    annualSavings: this.calculateAnnualSavings(r)
                }
            }), this.planHierarchy = O(() => {
                let t = this.state.pricingPlans();
                return t ? {
                    monthly: {
                        name: "Monthly Plan",
                        level: 1,
                        priceId: t.monthly ? .id,
                        amount: t.monthly ? .amount || 0,
                        billingCycle: "month"
                    },
                    annual: {
                        name: "Annual Plan",
                        level: 2,
                        priceId: t.annual ? .id,
                        amount: t.annual ? .amount || 0,
                        billingCycle: "year"
                    }
                } : null
            }), this.planChangeEligibility = O(() => {
                let t = this.state.subscriptionHealth(),
                    r = this.planComparison();
                return {
                    canChangePlan: t ? .isActive && !t.isCanceled,
                    canUpgrade: r ? .canUpgrade && t ? .isActive,
                    canDowngrade: r ? .canDowngrade && t ? .isActive,
                    blockedReasons: {
                        inactive: !t ? .isActive,
                        canceled: t ? .isCanceled,
                        pastDue: t ? .isPastDue,
                        requiresAction: t ? .requiresAction
                    },
                    eligiblePlans: this.getEligiblePlans(r)
                }
            })
        }
        isUpgrade(e, t) {
            let r = this.planHierarchy();
            if (!r) return !1;
            let d = r[e] ? .level || 0;
            return (r[t] ? .level || 0) > d
        }
        isDowngrade(e, t) {
            let r = this.planHierarchy();
            if (!r) return !1;
            let d = r[e] ? .level || 0;
            return (r[t] ? .level || 0) < d
        }
        getPlanByPriceId(e) {
            let t = this.state.pricingPlans();
            return t ? t.monthly ? .id === e ? "monthly" : t.annual ? .id === e ? "annual" : null : null
        }
        calculatePlanChangeBenefit(e) {
            let t = this.state.currentPlan(),
                r = this.planComparison();
            return !t || !r ? null : e === "annual" && t.type === "monthly" ? {
                savings: r.annualSavings,
                costDifference: r.annualPrice - r.monthlyPrice * 12,
                description: `Save $${r.annualSavings.toFixed(2)} per year by switching to annual billing`
            } : e === "monthly" && t.type === "annual" ? {
                savings: 0,
                costDifference: r.monthlyPrice * 12 - r.annualPrice,
                description: `Monthly billing will cost $${(r.monthlyPrice*12-r.annualPrice).toFixed(2)} more per year`
            } : null
        }
        validatePlanChange(e) {
            let t = this.planChangeEligibility(),
                r = this.getPlanByPriceId(e),
                d = this.state.currentPlan(),
                v = [];
            return r || v.push("Invalid price ID provided"), t ? .canChangePlan || (t ? .blockedReasons.inactive && v.push("Subscription is not active"), t ? .blockedReasons.canceled && v.push("Subscription is canceled"), t ? .blockedReasons.pastDue && v.push("Subscription has past due payments"), t ? .blockedReasons.requiresAction && v.push("Subscription requires action")), d && r && d.type === r && v.push("Target plan is the same as current plan"), {
                valid: v.length === 0,
                reasons: v,
                targetPlan: r
            }
        }
        calculateAnnualSavings(e) {
            return !e.monthly || !e.annual ? 0 : (e.monthly.amount * 12 - e.annual.amount) / 100
        }
        getEligiblePlans(e) {
            return e ? [...e.canUpgrade && e.upgradeOption ? [e.upgradeOption] : [], ...e.canDowngrade && e.downgradeOption ? [e.downgradeOption] : []].filter(Boolean) : []
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(E(ze))
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var an = (() => {
    let n = class n {
        constructor(e, t) {
            this.state = e, this.migrationService = t, this.migrationInfo = O(() => this.patreonSubscription() ? .migrationInfo || null), this.migrationState = O(() => {
                let r = this.patreonSubscription(),
                    d = this.stripeSubscription(),
                    v = this.migrationInfo();
                return r ? .active && d ? .active ? H.MIGRATION_IN_PROGRESS : !r && !d ? H.NO_SUBSCRIPTION : d ? .active && !r ? .active ? H.STRIPE_ACTIVE : r ? .active ? v ? v.status === "completed" ? H.MIGRATION_READY_TO_ACTIVATE : H.MIGRATION_IN_PROGRESS : H.PATREON_ACTIVE : H.NO_SUBSCRIPTION
            }), this.migrationEligible = O(() => {
                let r = this.patreonSubscription(),
                    d = this.stripeSubscription(),
                    v = this.migrationState();
                return r ? .active === !0 && !d ? .active && v === H.PATREON_ACTIVE
            }), this.currentMigrationStep = O(() => {
                let r = this.migrationInfo();
                if (!r) return 0;
                switch (r.status) {
                    case "not_started":
                        return 1;
                    case "plan_selected":
                        return 2;
                    case "payment_setup":
                        return 3;
                    case "awaiting_patreon_cancel":
                        return 4;
                    case "completed":
                        return 5;
                    default:
                        return 0
                }
            }), this.patreonSubscription = O(() => this.state.allSubscriptions() ? .find(d => d.type === "patreon") || null), this.stripeSubscription = O(() => this.state.allSubscriptions() ? .find(d => d.type === "stripe") || null), this.activePatreonSubscription = O(() => this.state.allSubscriptions() ? .find(d => d.type === "patreon" && d.active) || null), this.activeStripeSubscription = O(() => this.state.allSubscriptions() ? .find(d => d.type === "stripe" && d.active) || null), this.isInMigration = O(() => {
                let r = this.state.allSubscriptions();
                if (!r || r.length < 2) return !1;
                let d = r.filter(j => j.active),
                    v = d.some(j => j.type === "patreon"),
                    Z = d.some(j => j.type === "stripe" || j.type === "stripe_pending");
                return v && Z
            }), this.currentSubscriptionType = O(() => {
                let r = this.state.allSubscriptions();
                if (!r || r.length === 0) return null;
                let d = r.filter(Z => Z.active);
                return d.length > 0 ? d.find(j => j.type === "stripe") ? "stripe" : d[0].type : [...r].sort((Z, j) => this.getLastActiveDate(j) - this.getLastActiveDate(Z))[0] ? .type || null
            }), this.isInactive = O(() => {
                let r = this.state.subscriptionStatus();
                return !r ? .hasSubscription || !r ? .active
            }), this.hasInactiveSubscriptions = O(() => {
                let r = this.state.allSubscriptions();
                return r && r.length > 0 && r.some(d => !d.active)
            }), this.hasAnySubscriptions = O(() => {
                let r = this.state.allSubscriptions();
                return r && r.length > 0
            }), this.stripeHasBeenCharged = O(() => {
                let r = this.stripeSubscription();
                if (!r || r.type !== "stripe" || !r.info) return !1;
                let d = r.info;
                return be(d) ? d.stripeStatus === "active" && (d.lastPaymentAttempt != null || d.currentPeriodStart && new Date(d.currentPeriodStart) < new Date) : !1
            }), this.migrationPrimaryView = O(() => this.isInMigration() ? this.stripeHasBeenCharged() ? "stripe" : "patreon" : null)
        }
        canStartMigration() {
            return this.migrationEligible() || !1
        }
        detectSubscriptionType() {
            let e = this.state.subscriptionStatus();
            if (!e ? .active) return "none";
            let t = e.type === "patreon" && e.active,
                r = e.type === "stripe" && e.active;
            return t ? "patreon" : r ? "stripe" : "none"
        }
        getPatreonSubscription() {
            return this.patreonSubscription()
        }
        getStripeSubscription() {
            return this.stripeSubscription()
        }
        getLastActiveDate(e) {
            if (e.type === "stripe" && e.info && be(e.info)) {
                let t = e.info;
                return t.currentPeriodEnd ? new Date(t.currentPeriodEnd).getTime() : 0
            }
            if (e.type === "patreon" && e.info && Oe(e.info)) {
                let t = e.info,
                    r = t.nextChargeDate ? new Date(t.nextChargeDate).getTime() : 0,
                    d = t.lastChargeDate ? new Date(t.lastChargeDate).getTime() : 0;
                return Math.max(r, d)
            }
            return e.startDate ? new Date(e.startDate).getTime() : 0
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(E(ze), E(yt))
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var sn = (() => {
    let n = class n {
        constructor(e, t, r) {
            this.state = e, this.planComparison = t, this.subscriptionService = r
        }
        schedulePlanChange(e) {
            let t = this.planComparison.validatePlanChange(e);
            if (!t.valid) {
                let d = `Plan change not allowed: ${t.reasons.join(", ")}`;
                return console.error("Plan change validation failed:", t.reasons), Qe(() => new Error(d))
            }
            let r = this.state.getCurrentSubscriptionStatus();
            if (r ? .info) {
                let d = G(D({}, r), {
                    info: G(D({}, r.info), {
                        scheduledPlanChange: {
                            newPriceId: e,
                            effectiveDate: new Date().toISOString()
                        }
                    })
                });
                this.state.updateSubscriptionStatus(d)
            }
            return this.subscriptionService.schedulePlanChange({
                newPriceId: e
            }).pipe(z(d => {
                console.log("Plan change scheduled successfully:", d), this.state.refreshSubscription(), this.state.refreshPlans(), this.state.refreshUpcomingInvoice()
            }), F(d => {
                throw console.error("Failed to schedule plan change:", d), r && this.state.updateSubscriptionStatus(r), d
            }))
        }
        updatePaymentMethod(e) {
            return this.subscriptionService.updatePaymentMethod({
                paymentMethodId: e
            }).pipe(z(() => {
                console.log("Payment method updated successfully"), this.state.refreshPaymentMethods(), this.state.refreshSubscription()
            }), F(t => {
                throw console.error("Failed to update payment method:", t), t
            }))
        }
        cancelSubscription(e = !0, t, r) {
            let d = this.state.getCurrentSubscriptionStatus();
            if (d ? .info && be(d.info)) {
                let v = G(D({}, d), {
                    info: G(D({}, d.info), {
                        cancelAtPeriodEnd: e,
                        stripeStatus: e ? d.info.stripeStatus : "canceled"
                    })
                });
                this.state.updateSubscriptionStatus(v)
            }
            return this.subscriptionService.cancelSubscription({
                atPeriodEnd: e,
                cancellationReason: t,
                cancellationFeedback: r
            }).pipe(z(() => {
                console.log("Subscription cancelled successfully"), this.state.refreshSubscription()
            }), F(v => {
                throw console.error("Failed to cancel subscription:", v), d && this.state.updateSubscriptionStatus(d), v
            }))
        }
        reactivateSubscription() {
            let e = this.state.getCurrentSubscriptionStatus(),
                t = !1;
            if (e ? .info && be(e.info)) {
                let r = G(D({}, e), {
                    info: G(D({}, e.info), {
                        cancelAtPeriodEnd: !1
                    })
                });
                this.state.updateSubscriptionStatus(r), t = !0
            }
            return this.subscriptionService.reactivateSubscription().pipe(z(r => {
                console.log("Subscription reactivated successfully:", r), this.state.refreshSubscription()
            }), F(r => {
                throw console.error("Failed to reactivate subscription:", r), t && e && this.state.updateSubscriptionStatus(e), r
            }))
        }
        cancelPendingPlanChange() {
            let e = this.state.getCurrentSubscriptionStatus(),
                t = !1;
            if (e ? .info && be(e.info)) {
                let r = G(D({}, e), {
                    info: G(D({}, e.info), {
                        scheduleId: void 0,
                        pendingPlanChange: void 0
                    })
                });
                this.state.updateSubscriptionStatus(r), t = !0
            }
            return this.subscriptionService.cancelPendingPlanChange().pipe(z(r => {
                console.log("Pending plan change canceled successfully:", r), this.state.refreshSubscription()
            }), F(r => {
                throw console.error("Failed to cancel pending plan change:", r), t && e && this.state.updateSubscriptionStatus(e), r
            }))
        }
        changePlan(e, t) {
            let r = this.planComparison.validatePlanChange(e);
            if (!r.valid) {
                let v = `Plan change not allowed: ${r.reasons.join(", ")}`;
                return console.error("Plan change validation failed:", r.reasons), Qe(() => new Error(v))
            }
            let d = this.state.getCurrentSubscriptionStatus();
            return this.subscriptionService.changePlan(e, t).pipe(z(v => {
                console.log("Plan change completed successfully:", v), this.state.refreshSubscription(), this.state.refreshPlans(), this.state.refreshUpcomingInvoice()
            }), F(v => {
                throw console.error("Failed to change plan:", v), d && this.state.updateSubscriptionStatus(d), v
            }))
        }
        previewPlanChange(e) {
            return this.subscriptionService.previewPlanChange(e)
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(E(ze), E(Vt), E(le))
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var St = (() => {
    let n = class n {
        constructor(e, t, r, d) {
            this.authService = e, this.subscriptionService = t, this.environmentService = r, this.toastr = d, this.initialState = {
                currentStep: 1,
                totalSteps: 3,
                selectedPlan: null,
                userRegistrationData: {},
                setupIntentClientSecret: null,
                registeredUserId: null,
                isAuthenticated: !1,
                accountFormValid: !1,
                errors: {
                    planSelection: null,
                    accountInfo: null,
                    payment: null,
                    emailExists: null,
                    registration: null,
                    stripe: null
                },
                loading: {
                    checkingEmail: !1,
                    registeringUser: !1,
                    creatingSetupIntent: !1,
                    initializingStripe: !1,
                    processingPayment: !1,
                    creatingSubscription: !1
                }
            }, this.stateSubject = new q(this.initialState), this.state$ = this.stateSubject.asObservable(), this.pricingPlans = {
                monthly: {
                    type: "monthly",
                    price: 9.99,
                    period: "month",
                    trial: "7 day free trial",
                    priceId: "",
                    features: ["30+ years of financial history", "Beautiful data visualizations", "Custom KPI charts by our team", "Earnings calendar with beat/miss tracking", "AI-powered competitive analysis", "Professional DCF calculator", "Real-time news & market data", "Dip Finder - spot buying opportunities", "Unlimited portfolio tracking", "Exclusive Discord community access", "Exclusive Joseph Carlson Show episodes", "Priority customer support", "Cancel anytime"]
                },
                annual: {
                    type: "annual",
                    price: 99,
                    period: "year",
                    trial: "Billed $99 annually",
                    priceId: "",
                    features: ["30+ years of financial history", "Beautiful data visualizations", "Custom KPI charts by our team", "Earnings calendar with beat/miss tracking", "AI-powered competitive analysis", "Professional DCF calculator", "Real-time news & market data", "Dip Finder - spot buying opportunities", "Unlimited portfolio tracking", "Exclusive Discord community access", "Exclusive Joseph Carlson Show episodes", "Priority customer support", "Billed once every year"]
                }
            }, this.pricingPlans.monthly.priceId = this.environmentService.stripePriceMonthly, this.pricingPlans.annual.priceId = this.environmentService.stripePriceAnnual
        }
        get currentState() {
            return this.stateSubject.value
        }
        get currentStep() {
            return this.currentState.currentStep
        }
        get selectedPlan() {
            return this.currentState.selectedPlan
        }
        get isAuthenticated() {
            return this.currentState.isAuthenticated
        }
        get setupIntentClientSecret() {
            return this.currentState.setupIntentClientSecret
        }
        updateState(e) {
            let t = this.currentState,
                r = G(D(D({}, t), e), {
                    errors: D(D({}, t.errors), e.errors || {}),
                    loading: D(D({}, t.loading), e.loading || {})
                });
            this.stateSubject.next(r)
        }
        goToStep(e) {
            e >= 1 && e <= this.currentState.totalSteps && this.updateState({
                currentStep: e
            })
        }
        nextStep() {
            let e = this.currentStep + 1;
            e <= this.currentState.totalSteps && this.updateState({
                currentStep: e
            })
        }
        previousStep() {
            let e = this.currentStep - 1;
            e >= 1 && this.updateState({
                currentStep: e
            })
        }
        selectPlan(e) {
            this.updateState({
                selectedPlan: e,
                errors: G(D({}, this.currentState.errors), {
                    planSelection: null
                })
            })
        }
        updateUserData(e) {
            e.email && e.email !== this.currentState.userRegistrationData.email && this.clearError("emailExists"), this.updateState({
                userRegistrationData: D(D({}, this.currentState.userRegistrationData), e)
            })
        }
        setAccountFormValid(e) {
            this.updateState({
                accountFormValid: e
            })
        }
        setError(e, t) {
            this.updateState({
                errors: G(D({}, this.currentState.errors), {
                    [e]: t
                })
            })
        }
        clearError(e) {
            this.setError(e, null)
        }
        clearAllErrors() {
            this.updateState({
                errors: {
                    planSelection: null,
                    accountInfo: null,
                    payment: null,
                    emailExists: null,
                    registration: null,
                    stripe: null
                }
            })
        }
        setLoading(e, t) {
            this.updateState({
                loading: G(D({}, this.currentState.loading), {
                    [e]: t
                })
            })
        }
        setSetupIntentId(e) {
            this.updateState({
                setupIntentId: e
            })
        }
        checkEmailExists(e) {
            return this.setLoading("checkingEmail", !0), this.setError("emailExists", null), this.subscriptionService.checkEmailExists(e).pipe(z(() => this.setLoading("checkingEmail", !1)), I(t => {
                if (t.exists) {
                    let r = "An account with this email already exists. Please login or use a different email.";
                    return this.setError("emailExists", r), this.toastr.error(r), !0
                }
                return !1
            }), F(t => (this.environmentService.isProduction || console.error("Email check failed:", t), this.setLoading("checkingEmail", !1), L(!1))))
        }
        registerUser() {
            let e = this.currentState.userRegistrationData;
            return this.setLoading("registeringUser", !0), this.clearError("registration"), this.subscriptionService.registerUser(e).pipe(J(t => {
                if (!t) throw new Error("Failed to create account. Please try again.");
                return this.authService.login(e.email, e.password).pipe(z(() => {
                    this.updateState({
                        isAuthenticated: !0,
                        registeredUserId: t.user ? .id || null
                    })
                }), I(() => !0), F(r => (this.environmentService.isProduction || console.error("Auto-login failed after registration:", r), this.updateState({
                    isAuthenticated: !1,
                    registeredUserId: t.user ? .id || null
                }), L(!0))))
            }), z(() => this.setLoading("registeringUser", !1)), F(t => {
                let r = "Failed to create account. Please try again.";
                return t instanceof lt && (t.status === 400 && t.error ? .message ? .includes("already exists") ? (r = "An account with this email already exists. Please login or use a different email.", this.setError("emailExists", r)) : r = t.error ? .message || r), this.setError("registration", r), this.toastr.error(r), this.setLoading("registeringUser", !1), L(!1)
            }))
        }
        createSubscriptionIntent() {
            let e = this.currentState.selectedPlan;
            if (!e) return this.setError("stripe", "No plan selected"), L(!1);
            this.setLoading("creatingSetupIntent", !0), this.clearError("stripe");
            let t = this.pricingPlans[e].priceId,
                r = {
                    priceId: t
                };
            return this.environmentService.isProduction || console.log(`Creating subscription intent for ${e} plan with priceId: ${t}`), this.subscriptionService.createSubscriptionIntent(r).pipe(z(() => this.setLoading("creatingSetupIntent", !1)), I(d => {
                if (!d) throw new Error("Unable to initialize subscription payment.");
                if (e === "annual" && !d.clientSecret) throw new Error("Annual subscription requires immediate payment setup.");
                return this.updateState({
                    setupIntentClientSecret: d.clientSecret,
                    setupIntentId: d.setupIntentId,
                    customerId: d.customerId,
                    priceId: d.priceId
                }), this.environmentService.isProduction || console.log(`Subscription intent created: setupIntent ${d.setupIntentId}, customer ${d.customerId}, has client_secret: ${!!d.clientSecret}`), !0
            }), F(d => {
                this.environmentService.isProduction || console.error("Subscription intent creation failed:", d);
                let v = "There was an issue setting up your subscription payment. Please contact support for assistance.";
                return this.setError("stripe", v), this.toastr.error(v), this.setLoading("creatingSetupIntent", !1), L(!1)
            }))
        }
        getStepTitle() {
            switch (this.currentStep) {
                case 1:
                    return "Choose Your Plan";
                case 2:
                    return "Create Your Account";
                case 3:
                    return "Complete Your Registration";
                default:
                    return ""
            }
        }
        getStepDescription() {
            switch (this.currentStep) {
                case 1:
                    return "Select the plan that best fits your investment needs";
                case 2:
                    return "Enter your information to create your account";
                case 3:
                    return "Complete your registration to get started";
                default:
                    return ""
            }
        }
        canProceedFromStep(e) {
            switch (e) {
                case 1:
                    return this.currentState.selectedPlan !== null;
                case 2:
                    return this.currentState.accountFormValid && this.currentState.errors.emailExists === null && !this.currentState.loading.registeringUser;
                case 3:
                    return !0;
                default:
                    return !1
            }
        }
        resetWizard() {
            this.stateSubject.next(this.initialState)
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(E(X), E(le), E(_e), E(Ce))
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var ln = (i, n) => ({
        "border-blue-500 border-4 shadow-blue-800/30 ring-4 ring-blue-800/30": i,
        "border-gray-700 border-2": n
    }),
    cn = (i, n) => ({
        "shadow-purple-800/30 ring-4 ring-yellow-400/50": i,
        "": n
    });

function dn(i, n) {
    if (i & 1 && (a(0, "div", 0)(1, "p", 20), l(2), s()()), i & 2) {
        let o = m();
        c(2), W(o.errors.planSelection)
    }
}

function mn(i, n) {
    if (i & 1 && (a(0, "div", 16), b(), a(1, "svg", 21), f(2, "path", 22), s(), y(), a(3, "span", 19), l(4), s()()), i & 2) {
        let o = n.$implicit;
        c(4), W(o)
    }
}
var fi = (() => {
    let n = class n {
        constructor() {
            this.selectedPlan = null, this.planSelected = new ne
        }
        onPlanSelect(e) {
            this.planSelected.emit(e)
        }
        get monthlyPlan() {
            return this.pricingPlans.monthly
        }
        get annualPlan() {
            return this.pricingPlans.annual
        }
        get filteredMonthlyFeatures() {
            return this.monthlyPlan.features.filter(e => e !== "Cancel anytime" && e !== "Billed once every year")
        }
        get hasError() {
            return !!this.errors.planSelection
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-plan-selection-step"]
        ],
        inputs: {
            selectedPlan: "selectedPlan",
            pricingPlans: "pricingPlans",
            errors: "errors"
        },
        outputs: {
            planSelected: "planSelected"
        },
        decls: 39,
        vars: 19,
        consts: [
            [1, "mb-4", "p-4", "bg-red-900/20", "rounded-lg", "border", "border-red-200"],
            [1, "grid-cols-1", "lg:grid-cols-2", "gap-6", "sm:gap-8", "max-w-4xl", "mx-auto", "flex", "flex-col-reverse", "lg:grid", "mb-8"],
            [1, "relative", "rounded-3xl", "shadow-2xl", "p-10", "bg-gray-800", "hover:border-blue-500", "transition-all", "duration-300", "hover:shadow-3xl", "hover:-translate-y-2", "cursor-pointer", 3, "click", "ngClass"],
            [1, "text-center", "mb-8"],
            [1, "text-3xl", "font-bold", "mb-4", "text-white"],
            [1, "mb-6"],
            [1, "text-6xl", "font-bold", "text-white"],
            [1, "text-xl", "ml-2", "text-gray-300"],
            [1, "text-white/90", "text-lg", "mb-8"],
            [1, "relative", "bg-gradient-to-br", "from-blue-600", "to-purple-500", "rounded-3xl", "shadow-2xl", "p-10", "transform", "hover:scale-105", "transition-all", "duration-300", "hover:shadow-3xl", "cursor-pointer", 3, "click", "ngClass"],
            [1, "absolute", "-top-6", "left-1/2", "transform", "-translate-x-1/2", "w-[220px]", "text-center"],
            [1, "bg-yellow-400", "text-yellow-900", "px-6", "py-2", "rounded-full", "text-sm", "font-bold", "uppercase", "tracking-wide"],
            [1, "text-3xl", "font-bold", "text-white", "mb-4"],
            [1, "max-w-4xl", "mx-auto"],
            [1, "text-2xl", "sm:text-3xl", "font-bold", "text-center", "mb-8", "sm:mb-12", "text-white"],
            [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-4", "sm:gap-6"],
            [1, "flex", "items-center"],
            [1, "mt-12", "text-center"],
            [1, "border-t", "border-gray-700", "pt-8"],
            [1, "text-lg", "text-gray-300"],
            [1, "text-sm", "text-red-400"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-green-500", "mr-4", "flex-shrink-0"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"]
        ],
        template: function(t, r) {
            t & 1 && (p(0, dn, 3, 1, "div", 0), a(1, "div", 1)(2, "div", 2), N("click", function() {
                return r.onPlanSelect("monthly")
            }), a(3, "div", 3)(4, "h3", 4), l(5, "Monthly"), s(), a(6, "div", 5)(7, "span", 6), l(8), ce(9, "number"), s(), a(10, "span", 7), l(11, "/month"), s()(), a(12, "div", 8), l(13), s()()(), a(14, "div", 9), N("click", function() {
                return r.onPlanSelect("annual")
            }), a(15, "div", 10)(16, "div", 11), l(17, " Best Value - 2 months free "), s()(), a(18, "div", 3)(19, "h3", 12), l(20, "Annual"), s(), a(21, "div", 5)(22, "span", 6), l(23), ce(24, "number"), s(), a(25, "span", 7), l(26, "/month"), s()(), a(27, "div", 8), l(28), s()()()(), a(29, "div", 13)(30, "h3", 14), l(31, " All Features Included "), s(), a(32, "div", 15), Ie(33, mn, 5, 1, "div", 16, qe), s(), a(35, "div", 17)(36, "div", 18)(37, "p", 19), l(38, " We're constantly adding new features and tools at no additional cost "), s()()()()), t & 2 && (h(r.hasError ? 0 : -1), c(2), S("ngClass", K(13, ln, r.selectedPlan === "monthly", r.selectedPlan !== "monthly")), c(6), M("$", Mt(9, 7, r.monthlyPlan.price, "1.0-2")), c(5), M(" ", r.monthlyPlan.trial, " "), c(), S("ngClass", K(16, cn, r.selectedPlan === "annual", r.selectedPlan !== "annual")), c(9), M("$", Mt(24, 10, r.annualPlan.price / 12, "1.2-2")), c(5), M(" ", r.annualPlan.trial, " "), c(5), Te(r.filteredMonthlyFeatures))
        },
        dependencies: [T, Fe, Qt],
        styles: ["[_nghost-%COMP%]{display:block}.cursor-pointer[_ngcontent-%COMP%]:hover{transform:translateY(-8px)}.ring-4[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse-ring 2s infinite}@keyframes _ngcontent-%COMP%_pulse-ring{0%{transform:scale(1);opacity:1}50%{transform:scale(1.02);opacity:.8}to{transform:scale(1);opacity:1}}.flex.items-center[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideInLeft .5s ease-out}@keyframes _ngcontent-%COMP%_slideInLeft{0%{opacity:0;transform:translate(-20px)}to{opacity:1;transform:translate(0)}}.grid[_ngcontent-%COMP%] > .flex[_ngcontent-%COMP%]:nth-child(1){animation-delay:.1s}.grid[_ngcontent-%COMP%] > .flex[_ngcontent-%COMP%]:nth-child(2){animation-delay:.2s}.grid[_ngcontent-%COMP%] > .flex[_ngcontent-%COMP%]:nth-child(3){animation-delay:.3s}.grid[_ngcontent-%COMP%] > .flex[_ngcontent-%COMP%]:nth-child(4){animation-delay:.4s}.grid[_ngcontent-%COMP%] > .flex[_ngcontent-%COMP%]:nth-child(5){animation-delay:.5s}.grid[_ngcontent-%COMP%] > .flex[_ngcontent-%COMP%]:nth-child(6){animation-delay:.6s}"]
    });
    let i = n;
    return i
})();
var Ue = (() => {
    let n = class n {
        constructor() {
            this._service = new q(null), this._password = new q(null), this.complexity$ = ke([this._service.pipe(Me(e => !!e)), this._password.pipe(I(e => typeof e == "string" ? e : ""))]).pipe(I(([e, t]) => e(t)), I(e => e.score), Le(), U({
                bufferSize: 1,
                refCount: !0
            })), Promise.all([
                import ("./chunk-A7IQJ5B5.js"),
                import ("./chunk-QC5I5A6Q.js"),
                import ("./chunk-CU4HM2C5.js")
            ]).then(([{
                zxcvbn: e,
                zxcvbnOptions: t
            }, r, d]) => {
                let v = {
                    translations: d.translations,
                    graphs: r.adjacencyGraphs,
                    dictionary: D(D({}, r.dictionary), d.dictionary)
                };
                t.setOptions(v), this._service.next(e)
            })
        }
        scorePassword(e) {
            return this._service.getValue() ? this._service.getValue()(e).score : 0
        }
        setPassword(e) {
            this._password.next(e)
        }
        reset() {
            this._password.next(null)
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var un = () => [0, 1, 2, 3],
    pn = (i, n, o, e, t) => ({
        "bg-gray-600": i,
        "bg-red-500": n,
        "bg-orange-500": o,
        "bg-yellow-500": e,
        "bg-green-500": t
    }),
    hn = (i, n, o, e) => ({
        "text-red-400": i,
        "text-orange-400": n,
        "text-yellow-400": o,
        "text-green-400": e
    });

function fn(i, n) {
    if (i & 1 && (f(0, "div", 2), ce(1, "async"), ce(2, "async"), ce(3, "async"), ce(4, "async"), ce(5, "async"), ce(6, "async"), ce(7, "async"), ce(8, "async"), ce(9, "async"), ce(10, "async")), i & 2) {
        let o = n.$implicit,
            e = m();
        S("ngClass", st(21, pn, ye(1, 1, e.complexity$) === null || ye(2, 3, e.complexity$) <= o, ye(3, 5, e.complexity$) > o && ye(4, 7, e.complexity$) <= 1, ye(5, 9, e.complexity$) > o && ye(6, 11, e.complexity$) === 2, ye(7, 13, e.complexity$) > o && ye(8, 15, e.complexity$) === 3, ye(9, 17, e.complexity$) > o && ye(10, 19, e.complexity$) >= 4))
    }
}

function gn(i, n) {
    i & 1 && l(0, " Very weak password ")
}

function vn(i, n) {
    i & 1 && l(0, " Weak password ")
}

function bn(i, n) {
    i & 1 && l(0, " Could be stronger ")
}

function xn(i, n) {
    i & 1 && l(0, " Good password ")
}

function yn(i, n) {
    i & 1 && l(0, " Strong password ")
}

function Sn(i, n) {
    if (i & 1 && (a(0, "div", 3)(1, "span", 4), l(2), s(), a(3, "span", 5), p(4, gn, 1, 0)(5, vn, 1, 0)(6, bn, 1, 0)(7, xn, 1, 0)(8, yn, 1, 0), s()()), i & 2) {
        let o, e = n;
        c(), S("ngClass", Yt(3, hn, e === "Worst" || e === "Bad", e === "Weak", e === "Good", e === "Strong")), c(), M(" ", e, " "), c(2), h((o = e) === "Worst" ? 4 : o === "Bad" ? 5 : o === "Weak" ? 6 : o === "Good" ? 7 : o === "Strong" ? 8 : -1)
    }
}
var Ve = (() => {
    let n = class n {
        constructor(e) {
            this._password = e, this._destroy = new me, this.complexity$ = this._password.complexity$, this.strength = {
                0: "Worst",
                1: "Bad",
                2: "Weak",
                3: "Good",
                4: "Strong"
            }
        }
        ngOnInit() {
            let e = this.passwordControl.value;
            e && this._password.setPassword(e), this.currentStrength$ = ke([this.passwordControl.valueChanges.pipe(kt(250), $t(e || "")), this.complexity$]).pipe(I(([t, r]) => !t || t === "" ? "" : this.strength[r]), Le()), this.passwordControl.valueChanges.pipe(kt(250), ie(this._destroy)).subscribe(t => this._password.setPassword(t))
        }
        ngOnDestroy() {
            this._destroy.next(void 0), this._password.reset()
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(Ue))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-password-complexity"]
        ],
        inputs: {
            passwordControl: "passwordControl"
        },
        decls: 6,
        vars: 4,
        consts: [
            [1, "space-y-2"],
            [1, "flex", "gap-1"],
            [1, "h-1.5", "flex-1", "rounded-full", "transition-all", "duration-300", 3, "ngClass"],
            [1, "flex", "items-center", "justify-between"],
            [1, "text-xs", "font-medium", 3, "ngClass"],
            [1, "text-xs", "text-gray-400"]
        ],
        template: function(t, r) {
            if (t & 1 && (a(0, "div", 0)(1, "div", 1), Ie(2, fn, 11, 27, "div", 2, qe), s(), p(4, Sn, 9, 8, "div", 3), ce(5, "async"), s()), t & 2) {
                let d;
                c(2), Te(at(3, un)), c(2), h((d = ye(5, 1, r.currentStrength$)) ? 4 : -1, d)
            }
        },
        dependencies: [T, Fe, Wt],
        encapsulation: 2
    });
    let i = n;
    return i
})();

function _t(i) {
    return n => {
        let o = n.value;
        return !o || o.length === 0 ? null : i.scorePassword(o) === 0 ? {
            passwordTooWeak: !0
        } : null
    }
}

function Cn(i, n) {
    if (i & 1 && (a(0, "div", 0)(1, "div", 14)(2, "div")(3, "p", 15), l(4, "Selected Plan"), s(), a(5, "p", 16), l(6), s()()()()), i & 2) {
        let o = m();
        c(6), qt(" ", o.selectedPlan === "monthly" ? "Monthly" : "Annual", " - $", (o.selectedPlan === "monthly", o.selectedPlanDetails.price), "/", o.selectedPlan === "monthly" ? "mo" : "yr", " ")
    }
}

function _n(i, n) {
    if (i & 1 && (a(0, "div", 1)(1, "div", 17)(2, "div", 18), b(), a(3, "svg", 19), f(4, "path", 20), s(), y(), a(5, "span", 21), l(6), s()()()()), i & 2) {
        let o = m();
        c(6), W(o.errors.registration)
    }
}

function wn(i, n) {
    if (i & 1 && (a(0, "p", 6), l(1), s()), i & 2) {
        let o = m();
        c(), W(o.getFieldError("firstName"))
    }
}

function En(i, n) {
    if (i & 1 && (a(0, "p", 6), l(1), s()), i & 2) {
        let o = m();
        c(), W(o.getFieldError("lastName"))
    }
}

function Pn(i, n) {
    if (i & 1 && (a(0, "p", 6), l(1), s()), i & 2) {
        let o = m();
        c(), W(o.getFieldError("email"))
    }
}

function kn(i, n) {
    i & 1 && (a(0, "p", 6), l(1, "An account with this email already exists"), s())
}

function Mn(i, n) {
    i & 1 && (a(0, "p", 9), l(1, "Checking email availability..."), s())
}

function In(i, n) {
    if (i & 1 && (a(0, "p", 11), l(1), s()), i & 2) {
        let o = m();
        c(), W(o.getFieldError("password"))
    }
}

function Tn(i, n) {
    if (i & 1 && (a(0, "div", 12), f(1, "qualtrim-password-complexity", 22), s()), i & 2) {
        let o = m();
        c(), S("passwordControl", o.accountForm.controls.password)
    }
}

function Fn(i, n) {
    if (i & 1 && (a(0, "p", 6), l(1), s()), i & 2) {
        let o = m();
        c(), W(o.getFieldError("confirmPassword"))
    }
}

function Vn(i, n) {
    i & 1 && (a(0, "p", 6), l(1, "Passwords do not match"), s())
}
var vi = (() => {
    let n = class n {
        constructor(e, t) {
            this.fb = e, this.passwordComplexityService = t, this.selectedPlan = null, this.userDataChanged = new ne, this.emailCheck = new ne, this.formValidityChanged = new ne
        }
        ngOnInit() {
            this.initializeForm(), this.setupFormListeners()
        }
        initializeForm() {
            this.accountForm = this.fb.group({
                firstName: [this.userRegistrationData.firstName || "", [w.required, w.minLength(2)]],
                lastName: [this.userRegistrationData.lastName || "", [w.required, w.minLength(2)]],
                email: [this.userRegistrationData.email || "", [w.required, w.email]],
                password: [this.userRegistrationData.password || "", [w.required, w.minLength(8), _t(this.passwordComplexityService)]],
                confirmPassword: ["", [w.required]]
            }, {
                validators: this.passwordMatchValidator
            })
        }
        setupFormListeners() {
            this.accountForm.valueChanges.subscribe(e => {
                this.userDataChanged.emit({
                    firstName: e.firstName,
                    lastName: e.lastName,
                    email: e.email,
                    password: e.password
                })
            }), this.accountForm.statusChanges.subscribe(() => {
                this.formValidityChanged.emit(this.accountForm.valid)
            }), this.accountForm.get("email") ? .valueChanges.subscribe(e => {
                if (this.errors.emailExists) {
                    let t = this.accountForm.get("email");
                    if (t) {
                        let r = t.errors;
                        r ? .emailExists && (delete r.emailExists, Object.keys(r).length === 0 ? t.setErrors(null) : t.setErrors(r))
                    }
                }
            })
        }
        onEmailBlur() {
            let e = this.accountForm.get("email");
            e ? .valid && e.value && this.emailCheck.emit(e.value)
        }
        passwordMatchValidator(e) {
            let t = e.get("password"),
                r = e.get("confirmPassword");
            return !t || !r || t.value === r.value ? null : {
                passwordMismatch: !0
            }
        }
        get selectedPlanDetails() {
            return this.selectedPlan ? this.pricingPlans[this.selectedPlan] : null
        }
        get isFormValid() {
            return this.accountForm.valid && !this.errors.emailExists
        }
        get hasRegistrationError() {
            return !!this.errors.registration
        }
        getFieldError(e) {
            let t = this.accountForm.get(e);
            if (t ? .invalid && t ? .touched) {
                if (t.errors ? .required) return `${e.charAt(0).toUpperCase()+e.slice(1)} is required`;
                if (t.errors ? .email) return "Please enter a valid email address";
                if (t.errors ? .minlength) {
                    let r = t.errors.minlength.requiredLength;
                    return `${e.charAt(0).toUpperCase()+e.slice(1)} must be at least ${r} characters`
                }
                if (t.errors ? .emailExists) return "An account with this email already exists";
                if (t.errors ? .passwordTooWeak) return "Password is too weak. Please choose a stronger password."
            }
            return null
        }
        hasPasswordMismatch() {
            return this.accountForm.errors ? .passwordMismatch && this.accountForm.get("confirmPassword") ? .touched
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(se), x(Ue))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-account-info-step"]
        ],
        inputs: {
            selectedPlan: "selectedPlan",
            pricingPlans: "pricingPlans",
            userRegistrationData: "userRegistrationData",
            errors: "errors",
            loading: "loading"
        },
        outputs: {
            userDataChanged: "userDataChanged",
            emailCheck: "emailCheck",
            formValidityChanged: "formValidityChanged"
        },
        decls: 33,
        vars: 12,
        consts: [
            [1, "mb-6", "p-4", "max-w-lg", "mx-auto", "bg-blue-900/20", "rounded-lg", "border", "border-gray-700"],
            [1, "mb-6", "max-w-lg", "mx-auto"],
            [1, "space-y-6", "max-w-lg", "mx-auto", 3, "formGroup"],
            [1, "grid", "grid-cols-2", "gap-4"],
            [1, "block", "text-sm", "font-medium", "text-gray-300", "mb-2"],
            ["type", "text", "formControlName", "firstName", "placeholder", "John", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"],
            [1, "mt-2", "text-sm", "text-red-600"],
            ["type", "text", "formControlName", "lastName", "placeholder", "Doe", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"],
            ["type", "email", "formControlName", "email", "placeholder", "john@example.com", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent", 3, "blur"],
            [1, "mt-2", "text-sm", "text-blue-400"],
            ["type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"],
            [1, "mt-2", "text-sm", "text-red-400"],
            [1, "mt-3"],
            ["type", "password", "formControlName", "confirmPassword", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"],
            [1, "flex", "items-center", "justify-between"],
            [1, "text-sm", "text-blue-400", "font-medium"],
            [1, "text-lg", "font-semibold", "text-white"],
            [1, "border-2", "border-red-600", "rounded-lg", "p-4", "bg-red-900/20"],
            [1, "flex", "items-center"],
            ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-5", "h-5", "text-red-400", "mr-2"],
            ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", "clip-rule", "evenodd"],
            [1, "text-red-400", "text-sm"],
            [3, "passwordControl"]
        ],
        template: function(t, r) {
            t & 1 && (p(0, Cn, 7, 3, "div", 0), p(1, _n, 7, 1, "div", 1), a(2, "form", 2)(3, "div", 3)(4, "div")(5, "label", 4), l(6, " First Name "), s(), f(7, "input", 5), p(8, wn, 2, 1, "p", 6), s(), a(9, "div")(10, "label", 4), l(11, " Last Name "), s(), f(12, "input", 7), p(13, En, 2, 1, "p", 6), s()(), a(14, "div")(15, "label", 4), l(16, " Email Address "), s(), a(17, "input", 8), N("blur", function() {
                return r.onEmailBlur()
            }), s(), p(18, Pn, 2, 1, "p", 6), p(19, kn, 2, 0, "p", 6), p(20, Mn, 2, 0, "p", 9), s(), a(21, "div")(22, "label", 4), l(23, " Password "), s(), f(24, "input", 10), p(25, In, 2, 1, "p", 11), p(26, Tn, 2, 1, "div", 12), s(), a(27, "div")(28, "label", 4), l(29, " Confirm Password "), s(), f(30, "input", 13), p(31, Fn, 2, 1, "p", 6), p(32, Vn, 2, 0, "p", 6), s()()), t & 2 && (h(r.selectedPlan && r.selectedPlanDetails ? 0 : -1), c(), h(r.hasRegistrationError ? 1 : -1), c(), S("formGroup", r.accountForm), c(6), h(r.getFieldError("firstName") ? 8 : -1), c(5), h(r.getFieldError("lastName") ? 13 : -1), c(5), h(r.getFieldError("email") ? 18 : -1), c(), h(r.errors.emailExists ? 19 : -1), c(), h(r.loading.checkingEmail ? 20 : -1), c(5), h(r.getFieldError("password") ? 25 : -1), c(), h((r.accountForm.controls.password.value == null ? null : r.accountForm.controls.password.value.length) > 0 ? 26 : -1), c(5), h(r.getFieldError("confirmPassword") ? 31 : -1), c(), h(r.hasPasswordMismatch() ? 32 : -1))
        },
        dependencies: [T, oe, fe, Se, pe, he, ge, ve, Ve],
        styles: ["[_nghost-%COMP%]{display:block}.focus\\\\[_ngcontent-%COMP%]:ring-2:focus{box-shadow:0 0 0 2px #3b82f680}input[_ngcontent-%COMP%]{transition:all .3s ease}input[_ngcontent-%COMP%]:focus{transform:translateY(-1px)}input.ng-invalid.ng-touched[_ngcontent-%COMP%]{border-color:#ef4444;background-color:#ef44441a}input.ng-valid.ng-dirty[_ngcontent-%COMP%]{border-color:#10b981}.text-blue-400[_ngcontent-%COMP%]{position:relative}form[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideInUp .5s ease-out}@keyframes _ngcontent-%COMP%_slideInUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}"]
    });
    let i = n;
    return i
})();

function Dn(i, n) {
    i & 1 && (u(0, "div", 1)(1, "div", 5), b(), u(2, "svg", 6), B(3, "circle", 7)(4, "path", 8), g()(), y(), u(5, "h3", 9), l(6, " Loading secure checkout... "), g(), u(7, "p", 10), l(8, " Please wait while we prepare your payment form "), g()())
}

function Ln(i, n) {
    i & 1 && (u(0, "div", 1)(1, "div", 5), b(), u(2, "svg", 11), B(3, "circle", 7)(4, "path", 8), g()(), y(), u(5, "h3", 9), l(6, " Processing your payment... "), g(), u(7, "p", 10), l(8, " Please wait while we activate your subscription "), g()())
}

function An(i, n) {
    if (i & 1 && (u(0, "div", 2)(1, "div", 12)(2, "div", 13), b(), u(3, "svg", 14), B(4, "path", 15), g()(), y(), u(5, "div", 16)(6, "h3", 17), l(7, " Checkout Error "), g(), u(8, "p", 18), l(9), g()()()()), i & 2) {
        let o = m();
        c(9), M(" ", o.errorMessage(), " ")
    }
}
var bi = (() => {
    let n = class n {
        constructor(e, t) {
            this.environmentService = e, this.embeddedCheckoutService = t, this.completed = new ne, this.error = new ne, this._destroy$ = new me, this.isLoading = P(!0), this.isProcessing = P(!1), this.errorMessage = P(void 0)
        }
        ngOnInit() {
            return Y(this, null, function*() {
                try {
                    console.log("[EmbeddedCheckout] Initializing with priceId:", this.priceId), yield this.initializeStripe(), console.log("[EmbeddedCheckout] Stripe loaded, initializing checkout"), yield this.initializeCheckout(), console.log("[EmbeddedCheckout] Checkout initialized successfully")
                } catch (e) {
                    console.error("[EmbeddedCheckout] Initialization error:", e);
                    let t = e instanceof Error ? e.message : "Failed to initialize checkout. Please try again.";
                    this.errorMessage.set(t), this.error.emit(t), this.isLoading.set(!1)
                }
            })
        }
        ngOnDestroy() {
            if (this._destroy$.next(), this._destroy$.complete(), this.pollInterval && clearInterval(this.pollInterval), this.checkout) try {
                this.checkout.destroy()
            } catch (e) {
                console.warn("Error destroying checkout:", e)
            }
        }
        initializeStripe() {
            return Y(this, null, function*() {
                let e = this.environmentService.stripePublishableKey;
                if (!e) throw new Error("Stripe publishable key not configured");
                let t = yield vt(e);
                if (!t) throw new Error("Failed to load Stripe.js");
                this.stripe = t
            })
        }
        initializeCheckout() {
            return Y(this, null, function*() {
                if (!this.stripe) throw new Error("Stripe not initialized");
                if (!this.priceId) throw new Error("Price ID is required");
                try {
                    if (this.checkout = yield this.stripe.initEmbeddedCheckout({
                            fetchClientSecret: () => Y(this, null, function*() {
                                try {
                                    let e = yield Ee(this.embeddedCheckoutService.createCheckoutSession({
                                        priceId: this.priceId,
                                        returnUrl: this.returnUrl
                                    }));
                                    if (!e ? .clientSecret) throw console.error("No client secret in response:", e), new Error("Failed to create checkout session");
                                    return this.sessionId = e.sessionId, console.log("[EmbeddedCheckout] Session created:", this.sessionId), e.clientSecret
                                } catch (e) {
                                    throw console.error("Error fetching client secret:", e), e
                                }
                            }),
                            onComplete: () => Y(this, null, function*() {
                                let e = yield Ee(this.embeddedCheckoutService.retrieveCheckoutSession(this.sessionId));
                                e.status === "complete" && e.paymentStatus === "paid" ? this.completed.emit({
                                    sessionId: this.sessionId,
                                    sessionDetails: e
                                }) : (this.errorMessage.set("Failed to complete checkout"), this.error.emit("Failed to complete checkout")), this.isProcessing.set(!1), this.isLoading.set(!1)
                            })
                        }), this.checkout) this.checkout.mount("#checkout-container"), this.isLoading.set(!1), this.isProcessing.set(!1);
                    else throw new Error("Checkout instance not created")
                } catch (e) {
                    throw new Error(`Failed to initialize embedded checkout: ${e instanceof Error?e.message:"Unknown error"}`)
                }
            })
        }
        startPollingForCompletion() {
            if (!this.sessionId) {
                console.warn("[EmbeddedCheckout] No session ID to poll");
                return
            }
            console.log("[EmbeddedCheckout] Starting completion polling"), Ge(2e3).pipe(ie(this._destroy$), J(() => this.sessionId ? this.embeddedCheckoutService.retrieveCheckoutSession(this.sessionId) : tt)).subscribe({
                next: e => {
                    console.log("[EmbeddedCheckout] Poll result:", e), e.status === "complete" && e.paymentStatus === "paid" && this.completed.emit({
                        sessionId: this.sessionId
                    })
                },
                error: e => {
                    console.error("[EmbeddedCheckout] Polling error:", e)
                }
            })
        }
        refresh() {
            return Y(this, null, function*() {
                this.checkout && this.checkout.destroy(), this.isLoading.set(!0), this.errorMessage.set(void 0), yield this.initializeCheckout()
            })
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(_e), x(Ye))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-embedded-checkout"]
        ],
        inputs: {
            priceId: "priceId",
            returnUrl: "returnUrl"
        },
        outputs: {
            completed: "completed",
            error: "error"
        },
        decls: 6,
        vars: 3,
        consts: [
            [1, "embedded-checkout-wrapper"],
            [1, "flex", "flex-col", "items-center", "justify-center", "p-12", "bg-white", "dark:bg-gray-900", "rounded-3xl"],
            [1, "bg-red-50", "dark:bg-red-900/20", "border-2", "border-red-200", "dark:border-red-800", "rounded-3xl", "p-8"],
            [1, "checkout-content"],
            ["id", "checkout-container"],
            [1, "relative", "w-16", "h-16", "mb-6"],
            ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "text-blue-600", "dark:text-blue-400"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
            [1, "text-xl", "font-semibold", "text-gray-900", "dark:text-white", "mb-2"],
            [1, "text-sm", "text-gray-600", "dark:text-gray-400"],
            ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "text-green-600", "dark:text-green-400"],
            [1, "flex", "items-start", "gap-4"],
            [1, "flex-shrink-0", "w-10", "h-10", "bg-red-100", "dark:bg-red-900/40", "rounded-full", "flex", "items-center", "justify-center"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-red-600", "dark:text-red-400"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"],
            [1, "flex-1"],
            [1, "text-lg", "font-semibold", "text-red-900", "dark:text-red-300", "mb-2"],
            [1, "text-sm", "text-red-800", "dark:text-red-400"]
        ],
        template: function(t, r) {
            t & 1 && (u(0, "div", 0), p(1, Dn, 9, 0, "div", 1), p(2, Ln, 9, 0, "div", 1), p(3, An, 10, 1, "div", 2), u(4, "div", 3), B(5, "div", 4), g()()), t & 2 && (c(), h(r.isLoading() && !r.isProcessing() ? 1 : -1), c(), h(r.isProcessing() ? 2 : -1), c(), h(r.errorMessage() ? 3 : -1))
        },
        dependencies: [T],
        styles: [".embedded-checkout-wrapper[_ngcontent-%COMP%]{max-width:1200px;margin:0 auto;width:100%}.embedded-checkout-wrapper[_ngcontent-%COMP%]   #checkout-container[_ngcontent-%COMP%]{min-height:500px;width:100%}.embedded-checkout-wrapper[_ngcontent-%COMP%]   #checkout-container[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(iframe){border:none;width:100%;min-height:500px}"]
    });
    let i = n;
    return i
})();

function Rn(i, n) {
    i & 1 && l(0, " Activating your subscription... ")
}

function Nn(i, n) {
    i & 1 && l(0, " Redirecting to dashboard... ")
}

function On(i, n) {
    if (i & 1 && (a(0, "div", 0)(1, "div", 2), b(), a(2, "svg", 3), f(3, "path", 4), s()(), y(), a(4, "h2", 5), l(5, " Payment Successful! "), s(), a(6, "p", 6), l(7, " Your subscription has been activated. Welcome to Qualtrim! "), s(), a(8, "p", 7), p(9, Rn, 1, 0)(10, Nn, 1, 0), s()()), i & 2) {
        let o = m();
        c(9), h(o.countdown() > 0 ? 9 : 10)
    }
}

function $n(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "qualtrim-embedded-checkout", 8), N("completed", function(t) {
            C(o);
            let r = m();
            return _(r.onCheckoutCompleted(t))
        })("error", function(t) {
            C(o);
            let r = m();
            return _(r.onCheckoutError(t))
        }), s()
    }
    if (i & 2) {
        let o = m();
        S("priceId", o.selectedPriceId)
    }
}
var xi = (() => {
    let n = class n {
        constructor(e, t, r) {
            this.router = e, this.embeddedCheckoutService = t, this.subscriptionService = r, this.selectedPlan = null, this.completed = new ne, this._destroy$ = new me, this.showCheckout = P(!1), this.loadingPricing = P(!0), this.pricingError = P(void 0), this.pricingInfo = P(void 0), this.paymentComplete = P(!1), this.countdown = P(3)
        }
        ngOnInit() {
            this.selectedPriceId ? this.loadPricing() : (this.loadingPricing.set(!1), this.pricingError.set("No plan selected. Please select a plan first."))
        }
        ngOnDestroy() {
            this._destroy$.next(), this._destroy$.complete()
        }
        loadPricing() {
            this.selectedPriceId && this.embeddedCheckoutService.getPricing(this.selectedPriceId).pipe(ie(this._destroy$), F(e => (this.pricingError.set("Failed to load pricing information"), L(void 0)))).subscribe(e => {
                e && this.pricingInfo.set(e), this.loadingPricing.set(!1)
            })
        }
        get selectedPriceId() {
            return this.selectedPlan && this.pricingPlans[this.selectedPlan] ? .priceId || null
        }
        get selectedPlanName() {
            if (!this.selectedPlan) return "Unknown Plan";
            let e = this.pricingPlans[this.selectedPlan];
            return this.selectedPlan === "monthly" ? "Qualtrim Pro - Monthly" : "Qualtrim Pro - Annual"
        }
        get selectedPlanPrice() {
            return this.selectedPlan && this.pricingPlans[this.selectedPlan] ? .price || 0
        }
        get selectedPlanPeriod() {
            return this.selectedPlan && this.pricingPlans[this.selectedPlan] ? .period || ""
        }
        get selectedPlanTrial() {
            return this.selectedPlan && this.pricingPlans[this.selectedPlan] ? .trial || ""
        }
        onProceedToCheckout() {
            this.showCheckout.set(!0)
        }
        onBackToSummary() {
            this.showCheckout.set(!1)
        }
        onCheckoutCompleted(e) {
            console.log("[PaymentStepV3] Payment completed, session ID:", e.sessionId), this.paymentComplete.set(!0);
            let t = 30,
                r = 0;
            Ge(1e3).pipe(ie(this._destroy$), J(() => (r++, console.log(`[PaymentStepV3] Polling for subscription activation (attempt ${r}/${t})`), this.countdown.set(Math.max(0, t - r)), this.subscriptionService.getActiveSubscription().pipe(F(d => (console.warn("[PaymentStepV3] Error polling subscription:", d), L(null)))))), Me(d => d ? .active === !0 || r >= t), xe(1)).subscribe({
                next: d => {
                    d ? .active ? (console.log("[PaymentStepV3] Subscription activated, redirecting to dashboard"), window.location.href = "/app/insights?welcome=true") : (console.warn("[PaymentStepV3] Subscription polling timeout - redirecting anyway"), window.location.href = "/app/insights?welcome=true")
                },
                error: d => {
                    console.error("[PaymentStepV3] Polling error:", d), this.router.navigate(["/app/insights"], {
                        queryParams: {
                            welcome: "true"
                        }
                    })
                }
            })
        }
        onCheckoutError(e) {
            console.error("Checkout error:", e)
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x($), x(Ye), x(le))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-payment-step-v3"]
        ],
        inputs: {
            selectedPlan: "selectedPlan",
            pricingPlans: "pricingPlans"
        },
        outputs: {
            completed: "completed"
        },
        decls: 2,
        vars: 1,
        consts: [
            [1, "flex", "flex-col", "items-center", "justify-center", "p-8", "text-center"],
            [3, "priceId"],
            [1, "w-20", "h-20", "mb-6", "flex", "items-center", "justify-center", "rounded-full", "bg-green-100", "dark:bg-green-900/20"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-10", "h-10", "text-green-600", "dark:text-green-400"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"],
            [1, "text-2xl", "font-bold", "text-gray-900", "dark:text-white", "mb-2"],
            [1, "text-gray-600", "dark:text-gray-400", "mb-6", "max-w-md"],
            [1, "text-sm", "text-gray-500", "dark:text-gray-500"],
            [3, "completed", "error", "priceId"]
        ],
        template: function(t, r) {
            t & 1 && p(0, On, 11, 1, "div", 0)(1, $n, 1, 1, "qualtrim-embedded-checkout", 1), t & 2 && h(r.paymentComplete() ? 0 : r.selectedPriceId ? 1 : -1)
        },
        dependencies: [T, bi],
        encapsulation: 2
    });
    let i = n;
    return i
})();
var jn = (i, n, o) => ({
        "bg-white text-purple-900": i,
        "bg-purple-700/30 text-white/50 border-2 border-purple-600/30": n,
        "ring-4 ring-white/30": o
    }),
    zn = (i, n) => ({
        "bg-white": i,
        "bg-purple-700/30": n
    });

function Bn(i, n) {
    i & 1 && (b(), a(0, "svg", 4), f(1, "path", 6), s())
}

function Un(i, n) {
    if (i & 1 && l(0), i & 2) {
        let o = m().$implicit;
        M(" ", o, " ")
    }
}

function Gn(i, n) {
    if (i & 1 && f(0, "div", 5), i & 2) {
        let o = m().$implicit,
            e = m();
        S("ngClass", K(1, zn, e.currentStep > o, e.currentStep <= o))
    }
}

function qn(i, n) {
    if (i & 1 && (a(0, "div", 2)(1, "div", 3), p(2, Bn, 2, 0, ":svg:svg", 4)(3, Un, 1, 1), s(), p(4, Gn, 1, 4, "div", 5), s()), i & 2) {
        let o = n.$implicit,
            e = m();
        c(), S("ngClass", Ht(3, jn, e.isStepCompleted(o), !e.isStepCompleted(o), e.isStepActive(o))), c(), h(e.isStepCompleted(o) && !e.isStepActive(o) ? 2 : 3), c(2), h(o < e.totalSteps ? 4 : -1)
    }
}
var yi = (() => {
    let n = class n {
        constructor() {
            this.currentStep = 1, this.totalSteps = 3
        }
        get steps() {
            return Array.from({
                length: this.totalSteps
            }, (e, t) => t + 1)
        }
        isStepCompleted(e) {
            return this.currentStep >= e
        }
        isStepActive(e) {
            return this.currentStep === e
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-wizard-progress-bar"]
        ],
        inputs: {
            currentStep: "currentStep",
            totalSteps: "totalSteps"
        },
        decls: 4,
        vars: 0,
        consts: [
            [1, "flex", "justify-center", "items-center"],
            [1, "flex", "items-center", "space-x-4"],
            [1, "flex", "items-center"],
            [1, "w-10", "h-10", "rounded-full", "flex", "items-center", "justify-center", "font-semibold", "transition-all", "duration-300", 3, "ngClass"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"],
            [1, "w-16", "sm:w-24", "h-1", "ml-4", "transition-all", "duration-300", 3, "ngClass"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"]
        ],
        template: function(t, r) {
            t & 1 && (a(0, "div", 0)(1, "div", 1), Ie(2, qn, 5, 7, "div", 2, qe), s()()), t & 2 && (c(2), Te(r.steps))
        },
        dependencies: [T, Fe],
        styles: ["[_nghost-%COMP%]{display:block}.transition-all[_ngcontent-%COMP%]{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.3s}.ring-4[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse 2s infinite}@keyframes _ngcontent-%COMP%_pulse{0%,to{opacity:1}50%{opacity:.7}}"]
    });
    let i = n;
    return i
})();

function Hn(i, n) {
    i & 1 && (b(), u(0, "svg", 5), B(1, "circle", 6)(2, "path", 7), g())
}

function Yn(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "button", 4), ee("click", function() {
            C(o);
            let t = m();
            return _(t.onNextClick())
        }), p(1, Hn, 3, 0, ":svg:svg", 5), l(2), g()
    }
    if (i & 2) {
        let o = m();
        we("disabled", o.isNextDisabled), c(), h(o.loading.checkingEmail || o.loading.registeringUser || o.loading.creatingSetupIntent ? 1 : -1), c(), M(" ", o.nextButtonText, " ")
    }
}

function Wn(i, n) {
    i & 1 && (b(), u(0, "svg", 5), B(1, "circle", 6)(2, "path", 7), g())
}

function Qn(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "button", 4), ee("click", function() {
            C(o);
            let t = m();
            return _(t.onCompleteClick())
        }), p(1, Wn, 3, 0, ":svg:svg", 5), l(2), g()
    }
    if (i & 2) {
        let o = m();
        we("disabled", o.isCompleteDisabled), c(), h(o.loading.processingPayment || o.loading.creatingSubscription ? 1 : -1), c(), M(" ", o.completeButtonText, " ")
    }
}
var Si = (() => {
    let n = class n {
        constructor() {
            this.currentStep = 1, this.totalSteps = 3, this.canGoBack = !0, this.canGoNext = !1, this.isProcessing = !1, this.navigationAction = new ne
        }
        onBackClick() {
            this.canGoBack && !this.isProcessing && this.navigationAction.emit("back")
        }
        onNextClick() {
            this.canGoNext && !this.isProcessing && this.navigationAction.emit("next")
        }
        onCompleteClick() {
            this.isProcessing || this.navigationAction.emit("complete")
        }
        get showNextButton() {
            return this.currentStep < this.totalSteps
        }
        get showCompleteButton() {
            return this.currentStep === this.totalSteps
        }
        get nextButtonText() {
            return this.loading ? .checkingEmail ? "Checking..." : this.loading ? .registeringUser ? "Creating Account..." : "Continue"
        }
        get completeButtonText() {
            return this.loading ? .processingPayment ? "Processing Payment..." : this.loading ? .creatingSubscription ? "Creating Subscription..." : "Complete Registration"
        }
        get isNextDisabled() {
            return !this.canGoNext || this.isProcessing
        }
        get isCompleteDisabled() {
            return this.isProcessing
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-wizard-navigation"]
        ],
        inputs: {
            currentStep: "currentStep",
            totalSteps: "totalSteps",
            canGoBack: "canGoBack",
            canGoNext: "canGoNext",
            isProcessing: "isProcessing",
            loading: "loading"
        },
        outputs: {
            navigationAction: "navigationAction"
        },
        decls: 6,
        vars: 2,
        consts: [
            [1, "flex", "justify-between"],
            [1, "px-6", "py-3", "text-gray-300", "hover:text-white", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", 3, "click", "disabled"],
            [1, "flex", "items-center"],
            [1, "px-8", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white", "rounded-xl", "font-semibold", "hover:from-blue-700", "hover:to-blue-900", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-300", "flex", "items-center", 3, "disabled"],
            [1, "px-8", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white", "rounded-xl", "font-semibold", "hover:from-blue-700", "hover:to-blue-900", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-300", "flex", "items-center", 3, "click", "disabled"],
            ["viewBox", "0 0 24 24", 1, "animate-spin", "h-5", "w-5", "mr-3"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", "fill", "none", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"]
        ],
        template: function(t, r) {
            t & 1 && (u(0, "div", 0)(1, "button", 1), ee("click", function() {
                return r.onBackClick()
            }), l(2, " Back "), g(), u(3, "div", 2), p(4, Yn, 3, 3, "button", 3)(5, Qn, 3, 3, "button", 3), g()()), t & 2 && (c(), we("disabled", !r.canGoBack || r.isProcessing), c(3), h(r.showNextButton ? 4 : r.showCompleteButton ? 5 : -1))
        },
        dependencies: [T],
        styles: ["[_nghost-%COMP%]{display:block}.animate-spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin 1s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}button[_ngcontent-%COMP%]:not(:disabled){transition:all .3s ease}button[_ngcontent-%COMP%]:not(:disabled):hover{transform:translateY(-1px);box-shadow:0 10px 25px #0003}"]
    });
    let i = n;
    return i
})();

function Jn(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "qualtrim-plan-selection-step", 12), N("planSelected", function(t) {
            C(o);
            let r = m();
            return _(r.wizardService.selectPlan(t))
        }), s()
    }
    if (i & 2) {
        let o = m();
        S("selectedPlan", o.selectedPlan)("pricingPlans", o.wizardService.pricingPlans)("errors", o.wizardState.errors)
    }
}

function Kn(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "qualtrim-account-info-step", 13), N("userDataChanged", function(t) {
            C(o);
            let r = m();
            return _(r.wizardService.updateUserData(t))
        })("emailCheck", function(t) {
            C(o);
            let r = m();
            return _(r.onEmailCheck(t))
        })("formValidityChanged", function(t) {
            C(o);
            let r = m();
            return _(r.wizardService.setAccountFormValid(t))
        }), s()
    }
    if (i & 2) {
        let o = m();
        S("selectedPlan", o.selectedPlan)("pricingPlans", o.wizardService.pricingPlans)("userRegistrationData", o.wizardState.userRegistrationData)("errors", o.wizardState.errors)("loading", o.wizardState.loading)
    }
}

function Xn(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "qualtrim-payment-step-v3", 14), N("completed", function() {
            C(o);
            let t = m();
            return _(t.onPaymentCompleted())
        }), s()
    }
    if (i & 2) {
        let o = m();
        S("selectedPlan", o.selectedPlan)("pricingPlans", o.wizardService.pricingPlans)
    }
}

function Zn(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "qualtrim-wizard-navigation", 15), N("navigationAction", function(t) {
            C(o);
            let r = m();
            return _(r.onNavigationAction(t))
        }), s(), a(1, "div", 16)(2, "div")(3, "span", 17), l(4, "Already have an account?"), s(), a(5, "a", 18), l(6, "Sign In"), s()(), a(7, "div", 19), f(8, "img", 20), a(9, "span", 21), l(10, "Already a Patreon subscriber?"), s(), a(11, "a", 22), l(12, " Click here "), s()()()
    }
    if (i & 2) {
        let o = m();
        S("currentStep", o.currentStep)("totalSteps", o.totalSteps)("canGoBack", o.canGoBack)("canGoNext", o.canGoNext)("isProcessing", o.isProcessing)("loading", o.wizardState.loading)
    }
}
var wt = (() => {
    let n = class n {
        constructor(e, t, r, d, v) {
            this.router = e, this.route = t, this.wizardService = r, this.authService = d, this.featureFlagsService = v, this.destroy$ = new me, this.useEmbeddedCheckout$ = this.featureFlagsService.isEnabled("useEmbeddedCheckout"), this.wizardState = this.wizardService.currentState
        }
        ngOnInit() {
            this.authService.isAuthenticated$.pipe(xe(1)).subscribe(e => {
                if (e) {
                    this.router.navigate(["/app/subscription"], {
                        queryParams: {
                            source: "registration-incomplete"
                        }
                    });
                    return
                }
            }), this.wizardService.state$.pipe(ie(this.destroy$)).subscribe(e => {
                this.wizardState = e
            }), this.checkUrlParams(), document.documentElement.classList.add("dark")
        }
        ngOnDestroy() {
            this.destroy$.next(), this.destroy$.complete(), document.documentElement.classList.remove("dark")
        }
        checkUrlParams() {
            this.route.queryParams.subscribe(e => {
                (e.plan === "monthly" || e.plan === "annual") && (this.wizardService.selectPlan(e.plan), this.wizardService.goToStep(2))
            })
        }
        onStepChange(e) {
            this.wizardService.goToStep(e)
        }
        onNavigationAction(e) {
            switch (e) {
                case "back":
                    this.wizardService.previousStep();
                    break;
                case "next":
                    this.handleNextStep();
                    break;
                case "complete":
                    this.handleComplete();
                    break
            }
        }
        handleNextStep() {
            switch (this.wizardState.currentStep) {
                case 1:
                    this.wizardState.selectedPlan && this.wizardService.nextStep();
                    break;
                case 2:
                    this.handleUserRegistration();
                    break;
                case 3:
                    break
            }
        }
        handleUserRegistration() {
            this.wizardService.registerUser().pipe(ie(this.destroy$)).subscribe(e => {
                e && this.wizardService.nextStep()
            })
        }
        handleComplete() {}
        onPaymentCompleted() {
            this.router.navigate(["/app/insights"], {
                queryParams: {
                    welcome: "true"
                }
            })
        }
        onEmailCheck(e) {
            this.wizardService.checkEmailExists(e).pipe(ie(this.destroy$)).subscribe()
        }
        get currentStep() {
            return this.wizardState.currentStep
        }
        get totalSteps() {
            return this.wizardState.totalSteps
        }
        get selectedPlan() {
            return this.wizardState.selectedPlan
        }
        get canGoBack() {
            return this.wizardState.isAuthenticated ? !1 : this.currentStep > 1
        }
        get canGoNext() {
            return this.wizardService.canProceedFromStep(this.currentStep)
        }
        get isProcessing() {
            let e = this.wizardState.loading;
            return e.registeringUser || e.creatingSetupIntent || e.processingPayment || e.creatingSubscription
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x($), x(Pe), x(St), x(X), x(Kt))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-registration-wizard"]
        ],
        decls: 16,
        vars: 6,
        consts: [
            [1, "min-h-screen", "bg-gradient-to-br", "from-black", "via-blue-950", "to-black", "flex", "items-center", "justify-center", "px-4", "py-12"],
            [1, "w-full", "max-w-[83rem]"],
            [1, "text-center", "mb-8"],
            ["src", "assets/qualtrim-wide-logo.svg", "alt", "Qualtrim", 1, "h-8", "sm:h-12", "mx-auto", "mb-6"],
            [1, "mb-8", 3, "currentStep", "totalSteps"],
            [1, "bg-gray-800", "backdrop-blur-sm", "rounded-3xl", "shadow-2xl", "sm:p-12"],
            [1, "text-3xl", "sm:text-4xl", "font-bold", "text-white", "mb-3"],
            [1, "text-lg", "text-gray-300"],
            [1, "step-content"],
            [3, "selectedPlan", "pricingPlans", "errors"],
            [3, "selectedPlan", "pricingPlans", "userRegistrationData", "errors", "loading"],
            [3, "selectedPlan", "pricingPlans"],
            [3, "planSelected", "selectedPlan", "pricingPlans", "errors"],
            [3, "userDataChanged", "emailCheck", "formValidityChanged", "selectedPlan", "pricingPlans", "userRegistrationData", "errors", "loading"],
            [3, "completed", "selectedPlan", "pricingPlans"],
            [1, "mt-8", 3, "navigationAction", "currentStep", "totalSteps", "canGoBack", "canGoNext", "isProcessing", "loading"],
            [1, "text-center", "mt-6", "space-y-3"],
            [1, "text-gray-300", "dark:text-gray-400"],
            ["routerLink", "/auth/login", 1, "text-blue-600", "dark:text-blue-400", "hover:underline", "ml-2"],
            [1, "dark:hover:text-[#F96854]", "pointer-cursor", "inline-flex", "items-center", "gap-2", "transition-colors", "text-gray-300"],
            ["src", "assets/patreon-icon.svg", "alt", "Patreon", 1, "w-4", "h-4"],
            [1, "text-gray-300"],
            ["routerLink", "/auth/patreon-connect", "aria-label", "Connect Patreon account", 1, "hover:text-[#FF424D]"]
        ],
        template: function(t, r) {
            if (t & 1 && (a(0, "div", 0)(1, "div", 1)(2, "div", 2), f(3, "img", 3), s(), f(4, "qualtrim-wizard-progress-bar", 4), a(5, "div", 5)(6, "div", 2)(7, "h2", 6), l(8), s(), a(9, "p", 7), l(10), s()(), a(11, "div", 8), p(12, Jn, 1, 3, "qualtrim-plan-selection-step", 9)(13, Kn, 1, 5, "qualtrim-account-info-step", 10)(14, Xn, 1, 2, "qualtrim-payment-step-v3", 11), s(), p(15, Zn, 13, 6), s()()()), t & 2) {
                let d;
                c(4), S("currentStep", r.currentStep)("totalSteps", r.totalSteps), c(4), M(" ", r.wizardService.getStepTitle(), " "), c(2), M(" ", r.wizardService.getStepDescription(), " "), c(2), h((d = r.currentStep) === 1 ? 12 : d === 2 ? 13 : d === 3 ? 14 : -1), c(3), h(r.currentStep < r.totalSteps ? 15 : -1)
            }
        },
        dependencies: [T, te, ae, fi, vi, xi, yi, Si],
        styles: [".step-content[_ngcontent-%COMP%]{min-height:400px;display:flex;flex-direction:column;justify-content:center}.step-content[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeInUp .3s ease-out}@keyframes _ngcontent-%COMP%_fadeInUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}"]
    });
    let i = n;
    return i
})();

function er(i, n) {
    if (i & 1 && (a(0, "div", 13)(1, "div", 37)(2, "div", 38), b(), a(3, "svg", 39), f(4, "path", 40), s(), y(), a(5, "span", 41), l(6), s()()()()), i & 2) {
        let o = m();
        c(6), W(o.errorMessage)
    }
}

function tr(i, n) {
    if (i & 1 && (a(0, "p", 18), l(1), s()), i & 2) {
        let o = m();
        c(), M(" ", o.getFieldError("firstName"), " ")
    }
}

function ir(i, n) {
    if (i & 1 && (a(0, "p", 21), l(1), s()), i & 2) {
        let o = m();
        c(), M(" ", o.getFieldError("lastName"), " ")
    }
}

function nr(i, n) {
    if (i & 1 && (a(0, "p", 24), l(1), s()), i & 2) {
        let o = m();
        c(), M(" ", o.getFieldError("email"), " ")
    }
}

function rr(i, n) {
    i & 1 && (a(0, "p", 24), l(1, " An account with this email already exists "), s())
}

function or(i, n) {
    i & 1 && (a(0, "p", 25), l(1, " Checking email availability... "), s())
}

function ar(i, n) {
    if (i & 1 && (a(0, "p", 28), l(1), s()), i & 2) {
        let o = m();
        c(), M(" ", o.getFieldError("password"), " ")
    }
}

function sr(i, n) {
    if (i & 1 && (a(0, "p", 31), l(1), s()), i & 2) {
        let o = m();
        c(), M(" ", o.getFieldError("confirmPassword"), " ")
    }
}

function lr(i, n) {
    i & 1 && (a(0, "p", 31), l(1, " Passwords do not match "), s())
}

function cr(i, n) {
    i & 1 && (a(0, "span", 33), b(), a(1, "svg", 42), f(2, "circle", 43)(3, "path", 44), s(), l(4, " Creating Account... "), s())
}

function dr(i, n) {
    i & 1 && l(0, " Create Account & Continue ")
}
var Ci = (() => {
    let n = class n {
        constructor(e, t, r, d, v) {
            this.fb = e, this.authService = t, this.subscriptionService = r, this.router = d, this.toastr = v, this.isLoading = !1, this.errorMessage = null, this.emailExists = !1, this.checkingEmail = !1, this.destroy$ = new me
        }
        ngOnInit() {
            this.authService.isAuthenticated$.pipe(ie(this.destroy$)).subscribe(e => {
                e && this.router.navigate(["/app/subscription"], {
                    queryParams: {
                        source: "patreon-connect"
                    }
                })
            }), this.initializeForm(), this.setupFormListeners()
        }
        ngOnDestroy() {
            this.destroy$.next(), this.destroy$.complete()
        }
        initializeForm() {
            this.accountForm = this.fb.group({
                firstName: ["", [w.required, w.minLength(2)]],
                lastName: ["", [w.required, w.minLength(2)]],
                email: ["", [w.required, w.email]],
                password: ["", [w.required, w.minLength(8)]],
                confirmPassword: ["", [w.required]]
            }, {
                validators: this.passwordMatchValidator
            })
        }
        setupFormListeners() {
            this.accountForm.get("email") ? .valueChanges.pipe(ie(this.destroy$)).subscribe(() => {
                if (this.emailExists) {
                    this.emailExists = !1;
                    let e = this.accountForm.get("email");
                    if (e) {
                        let t = e.errors;
                        t ? .emailExists && (delete t.emailExists, Object.keys(t).length === 0 ? e.setErrors(null) : e.setErrors(t))
                    }
                }
            })
        }
        passwordMatchValidator(e) {
            let t = e.get("password"),
                r = e.get("confirmPassword");
            return !t || !r || t.value === r.value ? null : {
                passwordMismatch: !0
            }
        }
        onEmailBlur() {
            let e = this.accountForm.get("email");
            e ? .valid && e.value && this.checkEmailAvailability(e.value)
        }
        checkEmailAvailability(e) {
            this.checkingEmail = !0, this.subscriptionService.checkEmailExists(e).pipe(ie(this.destroy$), F(() => (this.checkingEmail = !1, L({
                exists: !1
            })))).subscribe(t => {
                if (this.checkingEmail = !1, this.emailExists = t.exists, t.exists) {
                    let r = this.accountForm.get("email");
                    r && r.setErrors(G(D({}, r.errors), {
                        emailExists: !0
                    }))
                }
            })
        }
        onSubmit() {
            if (this.accountForm.invalid || this.emailExists || this.isLoading) {
                Object.keys(this.accountForm.controls).forEach(t => {
                    this.accountForm.get(t) ? .markAsTouched()
                });
                return
            }
            this.isLoading = !0, this.errorMessage = null;
            let e = {
                email: this.accountForm.value.email,
                firstName: this.accountForm.value.firstName,
                lastName: this.accountForm.value.lastName,
                password: this.accountForm.value.password
            };
            this.subscriptionService.registerUser(e).pipe(J(t => {
                if (!t) throw new Error("Failed to create account. Please try again.");
                return this.authService.login(e.email, e.password).pipe(z(() => {
                    this.toastr.success("Account created successfully!")
                }), F(r => (console.error("Auto-login failed after registration:", r), this.toastr.warning("Account created but auto-login failed. Please sign in manually."), L(null))))
            }), ie(this.destroy$), F(t => {
                let r = "Failed to create account. Please try again.";
                return t.status === 400 && t.error ? .message ? .includes("already exists") ? (r = "An account with this email already exists. Please login or use a different email.", this.emailExists = !0) : t.error ? .message && (r = t.error.message), this.errorMessage = r, this.toastr.error(r), this.isLoading = !1, L(null)
            })).subscribe(t => {
                t !== null && this.router.navigate(["/app/subscription"], {
                    queryParams: {
                        source: "patreon-connect"
                    }
                }), this.isLoading = !1
            })
        }
        getFieldError(e) {
            let t = this.accountForm.get(e);
            if (t ? .invalid && t ? .touched) {
                if (t.errors ? .required) return `${e.charAt(0).toUpperCase()+e.slice(1)} is required`;
                if (t.errors ? .email) return "Please enter a valid email address";
                if (t.errors ? .minlength) {
                    let r = t.errors.minlength.requiredLength;
                    return `${e.charAt(0).toUpperCase()+e.slice(1)} must be at least ${r} characters`
                }
                if (t.errors ? .emailExists) return "An account with this email already exists"
            }
            return null
        }
        hasPasswordMismatch() {
            return !!(this.accountForm.errors ? .passwordMismatch && this.accountForm.get("confirmPassword") ? .touched)
        }
        get isFormValid() {
            return this.accountForm.valid && !this.emailExists
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(se), x(X), x(le), x($), x(Ce))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-patreon-connect"]
        ],
        decls: 57,
        vars: 23,
        consts: [
            [1, "min-h-screen", "bg-gradient-to-br", "from-gray-900", "via-gray-800", "to-gray-900", "dark:from-black", "dark:via-gray-950", "dark:to-black", "flex", "items-center", "justify-center", "px-4", "py-12"],
            [1, "w-full", "max-w-lg"],
            [1, "text-center", "mb-8"],
            [1, "text-4xl", "font-bold", "text-white", "mb-3"],
            [1, "text-gray-400", "text-lg"],
            [1, "bg-gradient-to-r", "from-[#FF424D]", "to-[#F96854]", "rounded-3xl", "p-6", "mb-8", "shadow-2xl"],
            [1, "flex", "items-center", "gap-4"],
            [1, "bg-white", "dark:bg-gray-900", "rounded-xl", "p-3"],
            ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "w-10", "h-10", "text-[#FF424D]"],
            ["d", "M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"],
            [1, "text-white", "font-bold", "text-xl"],
            [1, "text-white/90", "text-sm"],
            [1, "bg-gray-800", "dark:bg-gray-900", "rounded-3xl", "shadow-2xl", "p-8", "border", "border-gray-700", "dark:border-gray-800"],
            [1, "mb-6"],
            [1, "space-y-6", 3, "ngSubmit", "formGroup"],
            [1, "grid", "grid-cols-2", "gap-4"],
            ["for", "firstName", 1, "block", "text-sm", "font-medium", "text-gray-300", "dark:text-gray-400", "mb-2"],
            ["id", "firstName", "type", "text", "formControlName", "firstName", "placeholder", "John", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "dark:border-gray-600", "bg-gray-900", "dark:bg-black", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent", "transition-all"],
            ["id", "firstName-error", 1, "mt-2", "text-sm", "text-red-600", "dark:text-red-400"],
            ["for", "lastName", 1, "block", "text-sm", "font-medium", "text-gray-300", "dark:text-gray-400", "mb-2"],
            ["id", "lastName", "type", "text", "formControlName", "lastName", "placeholder", "Doe", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "dark:border-gray-600", "bg-gray-900", "dark:bg-black", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent", "transition-all"],
            ["id", "lastName-error", 1, "mt-2", "text-sm", "text-red-600", "dark:text-red-400"],
            ["for", "email", 1, "block", "text-sm", "font-medium", "text-gray-300", "dark:text-gray-400", "mb-2"],
            ["id", "email", "type", "email", "formControlName", "email", "placeholder", "john@example.com", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "dark:border-gray-600", "bg-gray-900", "dark:bg-black", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent", "transition-all", 3, "blur"],
            ["id", "email-error", 1, "mt-2", "text-sm", "text-red-600", "dark:text-red-400"],
            ["id", "email-checking", 1, "mt-2", "text-sm", "text-blue-400", "dark:text-blue-300"],
            ["for", "password", 1, "block", "text-sm", "font-medium", "text-gray-300", "dark:text-gray-400", "mb-2"],
            ["id", "password", "type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "dark:border-gray-600", "bg-gray-900", "dark:bg-black", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent", "transition-all"],
            ["id", "password-error", 1, "mt-2", "text-sm", "text-red-600", "dark:text-red-400"],
            ["for", "confirmPassword", 1, "block", "text-sm", "font-medium", "text-gray-300", "dark:text-gray-400", "mb-2"],
            ["id", "confirmPassword", "type", "password", "formControlName", "confirmPassword", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "dark:border-gray-600", "bg-gray-900", "dark:bg-black", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent", "transition-all"],
            ["id", "confirmPassword-error", 1, "mt-2", "text-sm", "text-red-600", "dark:text-red-400"],
            ["type", "submit", 1, "w-full", "py-4", "px-6", "rounded-xl", "font-semibold", "text-white", "transition-all", "shadow-lg", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "hover:from-blue-700", "hover:to-blue-900", "hover:shadow-xl", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:hover:shadow-lg", "focus:ring-2", "focus:ring-blue-500", "focus:ring-offset-2", "focus:ring-offset-gray-800", "dark:focus:ring-offset-gray-900", 3, "disabled"],
            [1, "flex", "items-center", "justify-center", "gap-3"],
            [1, "text-center", "mt-6", "space-y-2"],
            [1, "text-gray-400", "dark:text-gray-500", "text-sm"],
            ["routerLink", "/auth/login", 1, "text-blue-500", "hover:text-blue-400", "dark:text-blue-400", "dark:hover:text-blue-300", "hover:underline", "ml-1", "font-medium"],
            [1, "border-2", "border-red-600", "dark:border-red-500", "rounded-lg", "p-4", "bg-red-900/20", "dark:bg-red-950/30"],
            [1, "flex", "items-center"],
            ["fill", "currentColor", "viewBox", "0 0 20 20", "aria-hidden", "true", 1, "w-5", "h-5", "text-red-400", "dark:text-red-300", "mr-2", "flex-shrink-0"],
            ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", "clip-rule", "evenodd"],
            [1, "text-red-400", "dark:text-red-300", "text-sm"],
            ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "aria-hidden", "true", 1, "animate-spin", "h-5", "w-5", "text-white"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"]
        ],
        template: function(t, r) {
            t & 1 && (a(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3), l(4, "Connect Your Patreon"), s(), a(5, "p", 4), l(6, " Create a Qualtrim account to link your Patreon subscription "), s()(), a(7, "div", 5)(8, "div", 6)(9, "div", 7), b(), a(10, "svg", 8), f(11, "path", 9), s()(), y(), a(12, "div")(13, "h2", 10), l(14, "Patreon Subscriber"), s(), a(15, "p", 11), l(16, " Link your existing subscription in the next step "), s()()()(), a(17, "div", 12), p(18, er, 7, 1, "div", 13), a(19, "form", 14), N("ngSubmit", function() {
                return r.onSubmit()
            }), a(20, "div", 15)(21, "div")(22, "label", 16), l(23, " First Name "), s(), f(24, "input", 17), p(25, tr, 2, 1, "p", 18), s(), a(26, "div")(27, "label", 19), l(28, " Last Name "), s(), f(29, "input", 20), p(30, ir, 2, 1, "p", 21), s()(), a(31, "div")(32, "label", 22), l(33, " Email Address "), s(), a(34, "input", 23), N("blur", function() {
                return r.onEmailBlur()
            }), s(), p(35, nr, 2, 1, "p", 24), p(36, rr, 2, 0, "p", 24), p(37, or, 2, 0, "p", 25), s(), a(38, "div")(39, "label", 26), l(40, " Password "), s(), f(41, "input", 27), p(42, ar, 2, 1, "p", 28), s(), a(43, "div")(44, "label", 29), l(45, " Confirm Password "), s(), f(46, "input", 30), p(47, sr, 2, 1, "p", 31), p(48, lr, 2, 0, "p", 31), s(), a(49, "button", 32), p(50, cr, 5, 0, "span", 33)(51, dr, 1, 0), s()(), a(52, "div", 34)(53, "p", 35), l(54, " Already have a Qualtrim account? "), a(55, "a", 36), l(56, "Sign In"), s()()()()()()), t & 2 && (c(18), h(r.errorMessage ? 18 : -1), c(), S("formGroup", r.accountForm), c(5), Ne("aria-invalid", r.getFieldError("firstName") ? "true" : null)("aria-describedby", r.getFieldError("firstName") ? "firstName-error" : null), c(), h(r.getFieldError("firstName") ? 25 : -1), c(4), Ne("aria-invalid", r.getFieldError("lastName") ? "true" : null)("aria-describedby", r.getFieldError("lastName") ? "lastName-error" : null), c(), h(r.getFieldError("lastName") ? 30 : -1), c(4), Ne("aria-invalid", r.getFieldError("email") || r.emailExists ? "true" : null)("aria-describedby", r.getFieldError("email") || r.emailExists ? "email-error" : r.checkingEmail ? "email-checking" : null), c(), h(r.getFieldError("email") ? 35 : -1), c(), h(r.emailExists && !r.getFieldError("email") ? 36 : -1), c(), h(r.checkingEmail ? 37 : -1), c(4), Ne("aria-invalid", r.getFieldError("password") ? "true" : null)("aria-describedby", r.getFieldError("password") ? "password-error" : null), c(), h(r.getFieldError("password") ? 42 : -1), c(4), Ne("aria-invalid", r.getFieldError("confirmPassword") || r.hasPasswordMismatch() ? "true" : null)("aria-describedby", r.getFieldError("confirmPassword") || r.hasPasswordMismatch() ? "confirmPassword-error" : null), c(), h(r.getFieldError("confirmPassword") ? 47 : -1), c(), h(r.hasPasswordMismatch() && !r.getFieldError("confirmPassword") ? 48 : -1), c(), S("disabled", !r.isFormValid || r.isLoading), Ne("aria-busy", r.isLoading ? "true" : null), c(), h(r.isLoading ? 50 : 51))
        },
        dependencies: [T, oe, fe, Se, pe, he, ge, ve, te, ae],
        encapsulation: 2
    });
    let i = n;
    return i
})();

function mr(i, n) {
    i & 1 && (a(0, "p", 24), l(1, " Please enter a valid email address "), s())
}

function ur(i, n) {
    i & 1 && (b(), a(0, "svg", 28), f(1, "circle", 29)(2, "path", 30), s(), l(3, " Sending reset link... "))
}

function pr(i, n) {
    i & 1 && l(0, " Send Reset Link ")
}

function hr(i, n) {
    if (i & 1 && (a(0, "div", 27), l(1), s()), i & 2) {
        let o = m(2);
        c(), M(" ", o.errorMessage(), " ")
    }
}

function fr(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "form", 21), N("ngSubmit", function() {
            C(o);
            let t = m();
            return _(t.onSubmit())
        }), a(1, "div")(2, "label", 22), l(3, " Email Address "), s(), f(4, "input", 23), p(5, mr, 2, 0, "p", 24), s(), a(6, "button", 25), p(7, ur, 4, 0)(8, pr, 1, 0), s(), a(9, "button", 26), N("click", function() {
            C(o);
            let t = m();
            return _(t.onCancel())
        }), l(10, " Back to Login "), s()(), p(11, hr, 2, 1, "div", 27)
    }
    if (i & 2) {
        let o, e = m();
        S("formGroup", e.forgotPasswordForm), c(5), h((o = e.forgotPasswordForm.get("email")) != null && o.invalid && ((o = e.forgotPasswordForm.get("email")) != null && o.touched) ? 5 : -1), c(), S("disabled", e.forgotPasswordForm.invalid || e.isLoading()), c(), h(e.isLoading() ? 7 : 8), c(4), h(e.errorMessage() ? 11 : -1)
    }
}

function gr(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "div", 8)(1, "div", 31)(2, "div", 32), b(), a(3, "svg", 33), f(4, "path", 34), s()()(), y(), a(5, "h3", 35), l(6, "Check Your Email"), s(), a(7, "p", 36), l(8, " If an account exists with this email address, we've sent password reset instructions. Please check your inbox and spam folder. "), s(), a(9, "p", 37), l(10), s(), a(11, "button", 38), N("click", function() {
            C(o);
            let t = m();
            return _(t.onCancel())
        }), l(12, " Back to Login "), s()()
    }
    if (i & 2) {
        let o = m();
        c(10), M(" Redirecting to login in ", o.redirectCountdown(), " seconds... ")
    }
}
var _i = (() => {
    let n = class n {
        constructor(e, t, r) {
            this._fb = e, this._authService = t, this._router = r, this.isLoading = P(!1), this.errorMessage = P(null), this.emailSent = P(!1), this.redirectCountdown = P(5)
        }
        ngOnInit() {
            this.initializeForm(), document.documentElement.classList.add("dark")
        }
        ngOnDestroy() {
            document.documentElement.classList.remove("dark")
        }
        initializeForm() {
            this.forgotPasswordForm = this._fb.group({
                email: ["", [w.required, w.email]]
            })
        }
        onSubmit() {
            this.forgotPasswordForm.invalid || (this.isLoading.set(!0), this.errorMessage.set(null), this._authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
                next: e => {
                    this.isLoading.set(!1), this.emailSent.set(!0), this.startRedirectCountdown()
                },
                error: e => {
                    this.isLoading.set(!1), this.errorMessage.set(e.error ? .message || "Unable to process your request. Please try again later.")
                }
            }))
        }
        startRedirectCountdown() {
            this.redirectCountdown.set(5);
            let e = setInterval(() => {
                this.redirectCountdown.update(t => t - 1), this.redirectCountdown() <= 0 && (clearInterval(e), this._router.navigate(["/auth/login"]))
            }, 1e3)
        }
        onCancel() {
            this._router.navigate(["/auth/login"])
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(se), x(X), x($))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-forgot-password-v2"]
        ],
        decls: 43,
        vars: 2,
        consts: [
            [1, "min-h-screen", "bg-gradient-to-br", "from-black", "via-blue-950", "to-black", "flex"],
            [1, "w-full", "lg:w-1/2", "flex", "items-center", "justify-center", "px-4", "py-12"],
            [1, "w-full", "max-w-md"],
            [1, "text-center", "mb-8"],
            ["src", "assets/qualtrim-wide-logo.svg", "alt", "Qualtrim", 1, "h-5", "sm:h-8", "mx-auto", "mb-6"],
            [1, "text-3xl", "font-bold", "text-white", "mb-2"],
            [1, "text-gray-300"],
            [1, "bg-gray-800/95", "backdrop-blur-sm", "rounded-2xl", "shadow-2xl", "p-8"],
            [1, "text-center"],
            [1, "hidden", "lg:flex", "lg:w-1/2", "items-center", "justify-center", "bg-gradient-to-br", "from-blue-900/10", "to-blue-800/50", "backdrop-blur-sm", "px-12"],
            [1, "max-w-lg", "text-center"],
            [1, "mb-8"],
            [1, "inline-flex", "items-center", "justify-center", "w-20", "h-20", "bg-white/10", "rounded-full", "mb-6"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-10", "h-10", "text-white"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"],
            [1, "text-4xl", "font-bold", "text-white", "mb-6"],
            [1, "text-xl", "text-gray-200", "mb-8"],
            [1, "space-y-4", "text-left"],
            [1, "flex", "items-center", "text-white"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-green-400", "mr-3"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"],
            [1, "space-y-6", 3, "ngSubmit", "formGroup"],
            [1, "block", "text-sm", "font-medium", "text-gray-300", "mb-2"],
            ["type", "email", "formControlName", "email", "placeholder", "john@example.com", "autofocus", "", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"],
            [1, "mt-2", "text-sm", "text-red-600"],
            ["type", "submit", 1, "w-full", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white", "rounded-xl", "font-semibold", "hover:from-blue-700", "hover:to-blue-900", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-300", "flex", "items-center", "justify-center", 3, "disabled"],
            ["type", "button", 1, "w-full", "py-3", "border", "border-gray-700", "text-gray-300", "rounded-xl", "font-semibold", "hover:bg-gray-700", "transition-all", "duration-300", 3, "click"],
            [1, "mt-4", "p-3", "bg-red-900/20", "border", "border-red-500/50", "rounded-lg", "text-red-300", "text-sm"],
            ["viewBox", "0 0 24 24", 1, "animate-spin", "h-5", "w-5", "mr-3"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", "fill", "none", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
            [1, "mb-6"],
            [1, "inline-flex", "items-center", "justify-center", "w-16", "h-16", "bg-green-500/20", "rounded-full"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-10", "h-10", "text-green-400"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"],
            [1, "text-xl", "font-bold", "text-white", "mb-3"],
            [1, "text-gray-300", "mb-6"],
            [1, "text-gray-400", "text-sm", "mb-6"],
            ["type", "button", 1, "w-full", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white", "rounded-xl", "font-semibold", "hover:from-blue-700", "hover:to-blue-900", "transition-all", "duration-300", 3, "click"]
        ],
        template: function(t, r) {
            t & 1 && (a(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3), f(4, "img", 4), a(5, "h2", 5), l(6, "Forgot Password?"), s(), a(7, "p", 6), l(8, " Enter your email and we'll send you instructions to reset your password "), s()(), a(9, "div", 7), p(10, fr, 12, 5), p(11, gr, 13, 1, "div", 8), s()()(), a(12, "div", 9)(13, "div", 10)(14, "div", 11)(15, "div", 12), b(), a(16, "svg", 13), f(17, "path", 14), s()()(), y(), a(18, "h3", 15), l(19, " Secure Password Recovery "), s(), a(20, "p", 16), l(21, " Your account security is our top priority. We'll send you a secure link to reset your password. "), s(), a(22, "div", 17)(23, "div", 18), b(), a(24, "svg", 19), f(25, "path", 20), s(), y(), a(26, "span"), l(27, "Encrypted password reset links"), s()(), a(28, "div", 18), b(), a(29, "svg", 19), f(30, "path", 20), s(), y(), a(31, "span"), l(32, "One-time use security tokens"), s()(), a(33, "div", 18), b(), a(34, "svg", 19), f(35, "path", 20), s(), y(), a(36, "span"), l(37, "Email verification required"), s()(), a(38, "div", 18), b(), a(39, "svg", 19), f(40, "path", 20), s(), y(), a(41, "span"), l(42, "24/7 account support"), s()()()()()()), t & 2 && (c(10), h(r.emailSent() ? -1 : 10), c(), h(r.emailSent() ? 11 : -1))
        },
        dependencies: [T, oe, fe, Se, pe, he, ge, ve, te],
        styles: ["[_nghost-%COMP%]{display:block;min-height:100vh}*[_ngcontent-%COMP%]{transition:all .3s cubic-bezier(.4,0,.2,1)}button[_ngcontent-%COMP%]:not(:disabled){cursor:pointer}button[_ngcontent-%COMP%]:not(:disabled):hover{transform:translateY(-2px);box-shadow:0 8px 25px #00000026}button[_ngcontent-%COMP%]:not(:disabled):active{transform:translateY(0);transition:transform .1s}input[type=email][_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 0 3px #3b82f61a}@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}.animate-spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin 1s linear infinite}@media (max-width: 1024px){.marketing-content[_ngcontent-%COMP%]{display:none}}@media (max-width: 640px){.form-container[_ngcontent-%COMP%]{padding:1rem}}[data-theme=dark][_nghost-%COMP%]   input[type=email][_ngcontent-%COMP%]:focus, [data-theme=dark]   [_nghost-%COMP%]   input[type=email][_ngcontent-%COMP%]:focus{box-shadow:0 0 0 3px #3b82f633}"]
    });
    let i = n;
    return i
})();
var wi = (() => {
    let n = class n {
        constructor(e, t, r, d, v) {
            this._route = e, this._http = t, this._currentUserService = r, this._toastr = d, this._router = v
        }
        ngAfterViewInit() {
            this._http.get("/api/subscriptions/oauth", {
                params: this._route.snapshot.queryParams
            }).subscribe({
                next: e => {
                    this._currentUserService.setCurrentUser(e), this._toastr.success("Successfully created subscription."), this._router.navigate(["/auth/login"])
                },
                error: e => {
                    console.error(e), this._toastr.error("Failed to create subscription"), this._router.navigate(["/auth/login"])
                }
            })
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(Pe), x(ue), x(He), x(Ce), x($))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-oauth"]
        ],
        standalone: !1,
        decls: 4,
        vars: 0,
        consts: [
            [1, "page-loader", "flex-column", "d-flex", "align-items-center", "justify-content-center"],
            ["role", "status", 1, "spinner-border", "text-primary"],
            [1, "text-muted", "fs-6", "fw-semibold", "mt-5"]
        ],
        template: function(t, r) {
            t & 1 && (a(0, "div", 0), f(1, "span", 1), a(2, "span", 2), l(3, "Loading..."), s()())
        },
        styles: ["[_nghost-%COMP%]{width:100%}"]
    });
    let i = n;
    return i
})();
var Ei = (() => {
    let n = class n {
        constructor(e, t, r) {
            this._auth = e, this._router = t, this._routeParser = r
        }
        canActivate(e, t) {
            return this._isUnauthenticated().pipe(I(r => r ? !0 : this._router.createUrlTree(e.data.redirectIfAuth)))
        }
        canActivateChild(e, t) {
            let r = this._routeParser.getAllRouteData(e);
            return this._isUnauthenticated().pipe(I(d => d ? !0 : this._router.createUrlTree(r.redirectIfAuth)))
        }
        canLoad(e, t) {
            return this._isUnauthenticated()
        }
        _isUnauthenticated() {
            return this._auth.isAuthenticated$.pipe(xe(1), I(e => !e))
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(E(X), E($), E(dt))
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var We = class {
    static MatchPassword(n) {
        let o = n.get("password") ? .value,
            e = n.get("passwordConfirm") ? .value,
            t = n.get("passwordConfirm");
        if (!t) return null;
        if (o !== e) return t.setErrors({
            ConfirmPassword: !0
        }), {
            ConfirmPassword: !0
        };
        let r = t.errors;
        return r && (delete r.ConfirmPassword, Object.keys(r).length === 0 ? t.setErrors(null) : t.setErrors(r)), null
    }
};

function vr(i, n) {
    i & 1 && l(0, " Password is too weak. Please choose a stronger password. ")
}

function br(i, n) {
    i & 1 && l(0, " Password is required (minimum 8 characters) ")
}

function xr(i, n) {
    if (i & 1 && (a(0, "p", 25), p(1, vr, 1, 0)(2, br, 1, 0), s()), i & 2) {
        let o, e = m(2);
        c(), h(!((o = e.resetPasswordForm.get("password")) == null || o.errors == null) && o.errors.passwordTooWeak ? 1 : 2)
    }
}

function yr(i, n) {
    if (i & 1 && (a(0, "div", 26), f(1, "qualtrim-password-complexity", 31), s()), i & 2) {
        let o = m(2);
        c(), S("passwordControl", o.resetPasswordForm.controls.password)
    }
}

function Sr(i, n) {
    i & 1 && l(0, " Passwords do not match ")
}

function Cr(i, n) {
    i & 1 && l(0, " Password confirmation is required ")
}

function _r(i, n) {
    if (i & 1 && (a(0, "p", 25), p(1, Sr, 1, 0)(2, Cr, 1, 0), s()), i & 2) {
        let o, e = m(2);
        c(), h(!((o = e.resetPasswordForm.get("passwordConfirm")) == null || o.errors == null) && o.errors.ConfirmPassword ? 1 : 2)
    }
}

function wr(i, n) {
    i & 1 && (b(), a(0, "svg", 32), f(1, "circle", 33)(2, "path", 34), s(), l(3, " Resetting password... "))
}

function Er(i, n) {
    i & 1 && l(0, " Reset Password ")
}

function Pr(i, n) {
    if (i & 1 && (a(0, "div", 30), l(1), s()), i & 2) {
        let o = m(2);
        c(), M(" ", o.errorMessage(), " ")
    }
}

function kr(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "form", 21), N("ngSubmit", function() {
            C(o);
            let t = m();
            return _(t.onSubmit())
        }), a(1, "div")(2, "label", 22), l(3, " New Password "), a(4, "span", 23), l(5, "*"), s()(), f(6, "input", 24), p(7, xr, 3, 1, "p", 25), p(8, yr, 2, 1, "div", 26), s(), a(9, "div")(10, "label", 22), l(11, " Confirm Password "), a(12, "span", 23), l(13, "*"), s()(), f(14, "input", 27), p(15, _r, 3, 1, "p", 25), s(), a(16, "button", 28), p(17, wr, 4, 0)(18, Er, 1, 0), s(), a(19, "button", 29), N("click", function() {
            C(o);
            let t = m();
            return _(t.onCancel())
        }), l(20, " Back to Login "), s()(), p(21, Pr, 2, 1, "div", 30)
    }
    if (i & 2) {
        let o, e, t = m();
        S("formGroup", t.resetPasswordForm), c(7), h((o = t.resetPasswordForm.get("password")) != null && o.invalid && ((o = t.resetPasswordForm.get("password")) != null && o.touched) ? 7 : -1), c(), h((t.resetPasswordForm.controls.password.value == null ? null : t.resetPasswordForm.controls.password.value.length) > 0 ? 8 : -1), c(7), h((e = t.resetPasswordForm.get("passwordConfirm")) != null && e.invalid && ((e = t.resetPasswordForm.get("passwordConfirm")) != null && e.touched) ? 15 : -1), c(), S("disabled", t.resetPasswordForm.invalid || t.isLoading()), c(), h(t.isLoading() ? 17 : 18), c(4), h(t.errorMessage() ? 21 : -1)
    }
}

function Mr(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "div", 8)(1, "div", 35)(2, "div", 36), b(), a(3, "svg", 37), f(4, "path", 20), s()()(), y(), a(5, "h3", 38), l(6, " Password Reset Successful "), s(), a(7, "p", 39), l(8, " Your password has been changed successfully. You can now log in with your new password. "), s(), a(9, "p", 40), l(10, "Redirecting to login..."), s(), a(11, "button", 41), N("click", function() {
            C(o);
            let t = m();
            return _(t.onCancel())
        }), l(12, " Go to Login "), s()()
    }
}
var Pi = (() => {
    let n = class n {
        constructor(e, t, r, d, v) {
            this._fb = e, this._authService = t, this._router = r, this._activatedRoute = d, this._passwordComplexity = v, this.isLoading = P(!1), this.errorMessage = P(null), this.successMessage = P(null), this.token = P(null), this.passwordReset = P(!1)
        }
        ngOnInit() {
            let e = this._activatedRoute.snapshot.queryParamMap.get("token");
            if (this.token.set(e), !e) {
                this._router.navigate(["/auth/login"]);
                return
            }
            this.initializeForm()
        }
        initializeForm() {
            this.resetPasswordForm = this._fb.group({
                password: ["", [w.required, w.minLength(8), w.maxLength(100), _t(this._passwordComplexity)]],
                passwordConfirm: ["", [w.required, w.minLength(8), w.maxLength(100)]]
            }, {
                validators: [We.MatchPassword]
            })
        }
        onSubmit() {
            let e = this.token();
            this.resetPasswordForm.invalid || !e || (this.isLoading.set(!0), this.errorMessage.set(null), this.successMessage.set(null), this._authService.resetPassword(e, this.resetPasswordForm.value.password).subscribe({
                next: () => {
                    this.isLoading.set(!1), this.passwordReset.set(!0), this.successMessage.set("Password successfully changed. Redirecting to login..."), setTimeout(() => {
                        this._router.navigate(["/auth/login"])
                    }, 5e3)
                },
                error: t => {
                    this.isLoading.set(!1), this.errorMessage.set(t.error ? .message || "Failed to change the password. The link may have expired.")
                }
            }))
        }
        onCancel() {
            this._router.navigate(["/auth/login"])
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(se), x(X), x($), x(Pe), x(Ue))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-reset-password-v2"]
        ],
        decls: 43,
        vars: 2,
        consts: [
            [1, "min-h-screen", "bg-gradient-to-br", "from-black", "via-blue-950", "to-black", "flex"],
            [1, "w-full", "lg:w-1/2", "flex", "items-center", "justify-center", "px-4", "py-12"],
            [1, "w-full", "max-w-md"],
            [1, "text-center", "mb-8"],
            ["src", "assets/qualtrim-wide-logo.svg", "alt", "Qualtrim", 1, "h-8", "sm:h-12", "mx-auto", "mb-6"],
            [1, "text-3xl", "font-bold", "text-white", "mb-2"],
            [1, "text-gray-300"],
            [1, "bg-gray-800/95", "backdrop-blur-sm", "rounded-2xl", "shadow-2xl", "p-8"],
            [1, "text-center"],
            [1, "hidden", "lg:flex", "lg:w-1/2", "items-center", "justify-center", "bg-gradient-to-br", "from-blue-900/10", "to-blue-800/50", "backdrop-blur-sm", "px-12"],
            [1, "max-w-lg", "text-center"],
            [1, "mb-8"],
            [1, "inline-flex", "items-center", "justify-center", "w-20", "h-20", "bg-white/10", "rounded-full", "mb-6"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-10", "h-10", "text-white"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"],
            [1, "text-4xl", "font-bold", "text-white", "mb-6"],
            [1, "text-xl", "text-gray-200", "mb-8"],
            [1, "space-y-4", "text-left"],
            [1, "flex", "items-center", "text-white"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-green-400", "mr-3", "flex-shrink-0"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"],
            ["autocomplete", "off", 1, "space-y-6", 3, "ngSubmit", "formGroup"],
            [1, "block", "text-sm", "font-medium", "text-gray-300", "mb-2"],
            [1, "text-red-500"],
            ["type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "new-password", "autofocus", "", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"],
            [1, "mt-2", "text-sm", "text-red-400"],
            [1, "mt-3"],
            ["type", "password", "formControlName", "passwordConfirm", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "new-password", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"],
            ["type", "submit", 1, "w-full", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white", "rounded-xl", "font-semibold", "hover:from-blue-700", "hover:to-blue-900", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-300", "flex", "items-center", "justify-center", 3, "disabled"],
            ["type", "button", 1, "w-full", "py-3", "border", "border-gray-700", "text-gray-300", "rounded-xl", "font-semibold", "hover:bg-gray-700", "transition-all", "duration-300", 3, "click"],
            [1, "mt-4", "p-3", "bg-red-900/20", "border", "border-red-500/50", "rounded-lg", "text-red-300", "text-sm"],
            [3, "passwordControl"],
            ["viewBox", "0 0 24 24", 1, "animate-spin", "h-5", "w-5", "mr-3"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", "fill", "none", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
            [1, "mb-6"],
            [1, "inline-flex", "items-center", "justify-center", "w-16", "h-16", "bg-green-500/20", "rounded-full"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-10", "h-10", "text-green-400"],
            [1, "text-xl", "font-bold", "text-white", "mb-3"],
            [1, "text-gray-300", "mb-6"],
            [1, "text-gray-400", "text-sm", "mb-6"],
            ["type", "button", 1, "w-full", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white", "rounded-xl", "font-semibold", "hover:from-blue-700", "hover:to-blue-900", "transition-all", "duration-300", 3, "click"]
        ],
        template: function(t, r) {
            t & 1 && (a(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3), f(4, "img", 4), a(5, "h2", 5), l(6, "Reset Your Password"), s(), a(7, "p", 6), l(8, " Choose a strong password to secure your account "), s()(), a(9, "div", 7), p(10, kr, 22, 7), p(11, Mr, 13, 0, "div", 8), s()()(), a(12, "div", 9)(13, "div", 10)(14, "div", 11)(15, "div", 12), b(), a(16, "svg", 13), f(17, "path", 14), s()()(), y(), a(18, "h3", 15), l(19, "Secure Your Account"), s(), a(20, "p", 16), l(21, " Your new password should be strong and unique. We recommend using a password manager for best security. "), s(), a(22, "div", 17)(23, "div", 18), b(), a(24, "svg", 19), f(25, "path", 20), s(), y(), a(26, "span"), l(27, "Minimum 8 characters recommended"), s()(), a(28, "div", 18), b(), a(29, "svg", 19), f(30, "path", 20), s(), y(), a(31, "span"), l(32, "Mix of letters, numbers, and symbols"), s()(), a(33, "div", 18), b(), a(34, "svg", 19), f(35, "path", 20), s(), y(), a(36, "span"), l(37, "Avoid common words and patterns"), s()(), a(38, "div", 18), b(), a(39, "svg", 19), f(40, "path", 20), s(), y(), a(41, "span"), l(42, "Unique password for each account"), s()()()()()()), t & 2 && (c(10), h(r.passwordReset() ? -1 : 10), c(), h(r.passwordReset() ? 11 : -1))
        },
        dependencies: [T, oe, fe, Se, pe, he, ge, ve, te, Ve],
        styles: ["[_nghost-%COMP%]{display:block;min-height:100vh}*[_ngcontent-%COMP%]{transition:all .3s cubic-bezier(.4,0,.2,1)}button[_ngcontent-%COMP%]:not(:disabled){cursor:pointer}button[_ngcontent-%COMP%]:not(:disabled):hover{transform:translateY(-2px);box-shadow:0 8px 25px #00000026}button[_ngcontent-%COMP%]:not(:disabled):active{transform:translateY(0);transition:transform .1s}input[type=password][_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 0 3px #3b82f61a}@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}.animate-spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin 1s linear infinite}@media (max-width: 1024px){.marketing-content[_ngcontent-%COMP%]{display:none}}@media (max-width: 640px){.form-container[_ngcontent-%COMP%]{padding:1rem}}[data-theme=dark][_nghost-%COMP%]   input[type=password][_ngcontent-%COMP%]:focus, [data-theme=dark]   [_nghost-%COMP%]   input[type=password][_ngcontent-%COMP%]:focus{box-shadow:0 0 0 3px #3b82f633}"]
    });
    let i = n;
    return i
})();

function Ir(i, n) {
    i & 1 && (a(0, "div", 5)(1, "div", 6), b(), a(2, "svg", 7), f(3, "circle", 8)(4, "path", 9), s()(), y(), a(5, "h2", 10), l(6, "Verifying Email"), s(), a(7, "p", 11), l(8, " Please wait while we verify your email address... "), s()())
}

function Tr(i, n) {
    i & 1 && (a(0, "div", 5)(1, "div", 6)(2, "div", 12), b(), a(3, "svg", 13), f(4, "path", 14), s()()(), y(), a(5, "h2", 10), l(6, "Email Verified!"), s(), a(7, "p", 15), l(8, " Your email has been successfully verified. "), s(), a(9, "p", 16), l(10, "Redirecting you to login..."), s()())
}

function Fr(i, n) {
    i & 1 && (a(0, "p", 27), l(1, " Please enter a valid email address "), s())
}

function Vr(i, n) {
    i & 1 && (a(0, "span", 29), b(), a(1, "svg", 31), f(2, "circle", 8)(3, "path", 9), s(), l(4, " Sending... "), s())
}

function Dr(i, n) {
    i & 1 && l(0, " Resend Verification Email ")
}

function Lr(i, n) {
    if (i & 1 && (a(0, "p", 30), l(1), s()), i & 2) {
        let o = m(3);
        c(), W(o.resendError())
    }
}

function Ar(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "div", 20)(1, "p", 24), l(2, " Enter your email to receive a new verification link: "), s(), a(3, "form", 25), N("ngSubmit", function() {
            C(o);
            let t = m(2);
            return _(t.onResendVerification())
        }), f(4, "input", 26), p(5, Fr, 2, 0, "p", 27), a(6, "button", 28), p(7, Vr, 5, 0, "span", 29)(8, Dr, 1, 0), s()(), p(9, Lr, 2, 1, "p", 30), s()
    }
    if (i & 2) {
        let o, e = m(2);
        c(3), S("formGroup", e.resendForm), c(2), h((o = e.resendForm.get("email")) != null && o.invalid && ((o = e.resendForm.get("email")) != null && o.touched) ? 5 : -1), c(), S("disabled", e.resendForm.invalid || e.resendLoading()), c(), h(e.resendLoading() ? 7 : 8), c(2), h(e.resendError() ? 9 : -1)
    }
}

function Rr(i, n) {
    i & 1 && (a(0, "div", 21)(1, "div", 32), b(), a(2, "svg", 33), f(3, "path", 34), s(), y(), a(4, "span", 35), l(5, "Already Verified"), s()(), a(6, "p", 36), l(7, " Your email is already verified. You can proceed to login. "), s()())
}

function Nr(i, n) {
    i & 1 && (a(0, "div", 22)(1, "div", 32), b(), a(2, "svg", 37), f(3, "path", 14), s(), y(), a(4, "span", 38), l(5, "Email Sent"), s()(), a(6, "p", 39), l(7, " Verification email sent! Please check your inbox. "), s()())
}

function Or(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "div", 5)(1, "div", 6)(2, "div", 17), b(), a(3, "svg", 18), f(4, "path", 19), s()()(), y(), a(5, "h2", 10), l(6, " Verification Failed "), s(), a(7, "p", 15), l(8), s(), p(9, Ar, 10, 5, "div", 20), p(10, Rr, 8, 0, "div", 21), p(11, Nr, 8, 0, "div", 22), a(12, "button", 23), N("click", function() {
            C(o);
            let t = m();
            return _(t.goToLogin())
        }), l(13, " Back to Login "), s()()
    }
    if (i & 2) {
        let o = m();
        c(8), W(o.errorMessage()), c(), h(o.showResendForm() && !o.resendSuccess() && !o.alreadyVerified() ? 9 : -1), c(), h(o.alreadyVerified() ? 10 : -1), c(), h(o.resendSuccess() ? 11 : -1)
    }
}
var ki = (() => {
    let n = class n {
        constructor(e, t, r, d) {
            this._router = e, this._activatedRoute = t, this._authService = r, this._fb = d, this.isLoading = P(!0), this.isSuccess = P(!1), this.errorMessage = P(null), this.showResendForm = P(!1), this.resendLoading = P(!1), this.resendSuccess = P(!1), this.resendError = P(null), this.alreadyVerified = P(!1)
        }
        ngOnInit() {
            document.documentElement.classList.add("dark"), this.initResendForm();
            let e = this._activatedRoute.snapshot.queryParamMap.get("token");
            if (!e) {
                this._router.navigate(["/auth/login"]);
                return
            }
            this._authService.verifyEmail(e).pipe(F(() => (this.isLoading.set(!1), this.errorMessage.set("Failed to verify email. The link may have expired."), this.showResendForm.set(!0), L(null)))).subscribe({
                next: t => {
                    t !== null && (this.isLoading.set(!1), this.isSuccess.set(!0), setTimeout(() => {
                        this._router.navigate(["/auth/login"])
                    }, 2e3))
                }
            })
        }
        initResendForm() {
            this.resendForm = this._fb.group({
                email: ["", [w.required, w.email]]
            })
        }
        onResendVerification() {
            this.resendForm.invalid || (this.resendLoading.set(!0), this.resendError.set(null), this.alreadyVerified.set(!1), this._authService.resendVerificationEmail(this.resendForm.value.email).pipe(F(e => (this.resendLoading.set(!1), e ? .error ? .message === "Email is already verified" ? this.alreadyVerified.set(!0) : this.resendError.set("Failed to resend verification email."), L(null)))).subscribe({
                next: e => {
                    this.resendLoading.set(!1), e !== null && this.resendSuccess.set(!0)
                }
            }))
        }
        goToLogin() {
            this._router.navigate(["/auth/login"])
        }
        ngOnDestroy() {
            document.documentElement.classList.remove("dark")
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x($), x(Pe), x(X), x(se))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-verify-email-v2"]
        ],
        decls: 8,
        vars: 3,
        consts: [
            [1, "min-h-screen", "bg-gradient-to-br", "from-black", "via-blue-950", "to-black", "flex", "items-center", "justify-center", "px-4", "py-12"],
            [1, "w-full", "max-w-md"],
            [1, "text-center", "mb-8"],
            ["src", "assets/qualtrim-wide-logo.svg", "alt", "Qualtrim", 1, "h-8", "sm:h-12", "mx-auto", "mb-6"],
            [1, "bg-gray-800/95", "backdrop-blur-sm", "rounded-2xl", "shadow-2xl", "p-8"],
            [1, "text-center"],
            [1, "mb-6"],
            ["viewBox", "0 0 24 24", 1, "animate-spin", "h-16", "w-16", "mx-auto", "text-blue-500"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", "fill", "none", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
            [1, "text-2xl", "font-bold", "text-white", "mb-2"],
            [1, "text-gray-300"],
            [1, "inline-flex", "items-center", "justify-center", "w-16", "h-16", "bg-green-500/20", "rounded-full"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-10", "h-10", "text-green-400"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"],
            [1, "text-gray-300", "mb-6"],
            [1, "text-sm", "text-gray-400"],
            [1, "inline-flex", "items-center", "justify-center", "w-16", "h-16", "bg-red-500/20", "rounded-full"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-10", "h-10", "text-red-400"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"],
            [1, "mt-6", "pt-6", "border-t", "border-gray-700"],
            [1, "mt-6", "p-4", "bg-blue-900/20", "border", "border-blue-500/50", "rounded-lg"],
            [1, "mt-6", "p-4", "bg-green-900/20", "border", "border-green-500/50", "rounded-lg"],
            ["type", "button", 1, "mt-6", "w-full", "py-3", "border", "border-gray-700", "text-gray-300", "rounded-xl", "font-semibold", "hover:bg-gray-700", "transition-all", "duration-300", 3, "click"],
            [1, "text-gray-300", "mb-4"],
            [1, "space-y-4", 3, "ngSubmit", "formGroup"],
            ["type", "email", "formControlName", "email", "placeholder", "your@email.com", 1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-gray-700", "bg-gray-800", "text-white", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"],
            [1, "text-sm", "text-red-400"],
            ["type", "submit", 1, "w-full", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white", "rounded-xl", "font-semibold", "hover:from-blue-700", "hover:to-blue-900", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-300", 3, "disabled"],
            [1, "flex", "items-center", "justify-center"],
            [1, "mt-2", "text-sm", "text-red-400"],
            ["viewBox", "0 0 24 24", 1, "animate-spin", "h-5", "w-5", "mr-2"],
            [1, "flex", "items-center", "mb-2"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-blue-400", "mr-2"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"],
            [1, "text-blue-300", "font-medium"],
            [1, "text-blue-300", "text-sm"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-green-400", "mr-2"],
            [1, "text-green-300", "font-medium"],
            [1, "text-green-300", "text-sm"]
        ],
        template: function(t, r) {
            t & 1 && (a(0, "div", 0)(1, "div", 1)(2, "div", 2), f(3, "img", 3), s(), a(4, "div", 4), p(5, Ir, 9, 0, "div", 5), p(6, Tr, 11, 0, "div", 5), p(7, Or, 14, 4, "div", 5), s()()()), t & 2 && (c(5), h(r.isLoading() ? 5 : -1), c(), h(r.isSuccess() ? 6 : -1), c(), h(r.errorMessage() ? 7 : -1))
        },
        dependencies: [T, oe, fe, Se, pe, he, ge, ve],
        styles: ["[_nghost-%COMP%]{display:block;min-height:100vh}*[_ngcontent-%COMP%]{transition:all .3s cubic-bezier(.4,0,.2,1)}@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}.animate-spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin 1s linear infinite}.success-icon[_ngcontent-%COMP%], .error-icon[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_scaleIn .3s ease-out}@keyframes _ngcontent-%COMP%_scaleIn{0%{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}@media (max-width: 640px){.verification-container[_ngcontent-%COMP%]{padding:1rem}}"]
    });
    let i = n;
    return i
})();
var Et = (() => {
    let n = class n {
        ngOnInit() {
            document.documentElement.classList.add("dark")
        }
        ngOnDestroy() {
            document.documentElement.classList.remove("dark")
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-privacy-policy-v2"]
        ],
        decls: 12,
        vars: 0,
        consts: [
            [1, "min-h-screen", "bg-gradient-to-br", "from-black", "via-blue-950", "to-black", "flex", "flex-col"],
            [1, "w-full", "px-4", "py-6"],
            [1, "max-w-4xl", "mx-auto", "flex", "items-center", "justify-between"],
            ["src", "/assets/qualtrim-wide-logo.svg", "alt", "Qualtrim", 1, "h-10", "sm:h-12"],
            [1, "flex", "items-center", "gap-4"],
            ["routerLink", "/auth/login", 1, "px-4", "py-2", "text-sm", "text-gray-300", "hover:text-white", "transition-colors"],
            ["routerLink", "/", 1, "px-4", "py-2", "text-sm", "text-gray-300", "hover:text-white", "transition-colors"],
            [1, "flex-1", "overflow-y-auto", "px-4", "py-8"],
            [1, "max-w-4xl", "mx-auto"]
        ],
        template: function(t, r) {
            t & 1 && (a(0, "div", 0)(1, "div", 1)(2, "div", 2), f(3, "img", 3), a(4, "div", 4)(5, "a", 5), l(6, " Back to Login "), s(), a(7, "a", 6), l(8, " Back to Home "), s()()()(), a(9, "div", 7)(10, "div", 8), f(11, "qualtrim-privacy-policy"), s()()())
        },
        dependencies: [T, te, ae, ri],
        styles: ["[_nghost-%COMP%]{display:block;min-height:100vh}*[_ngcontent-%COMP%]{transition:all .3s cubic-bezier(.4,0,.2,1)}a[_ngcontent-%COMP%]:hover{transform:translate(-2px)}"]
    });
    let i = n;
    return i
})();
var Mi = (() => {
    let n = class n {
        ngOnInit() {
            document.documentElement.classList.add("dark")
        }
        ngOnDestroy() {
            document.documentElement.classList.remove("dark")
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-terms-of-use-v2"]
        ],
        decls: 17,
        vars: 0,
        consts: [
            [1, "min-h-screen", "bg-gradient-to-br", "from-black", "via-blue-950", "to-black", "flex", "flex-col"],
            [1, "w-full", "px-4", "py-6"],
            [1, "max-w-4xl", "mx-auto", "flex", "items-center", "justify-between"],
            ["src", "assets/qualtrim-wide-logo.svg", "alt", "Qualtrim", 1, "h-10", "sm:h-12"],
            [1, "flex", "items-center", "gap-4"],
            ["routerLink", "/auth/login", 1, "px-4", "py-2", "text-sm", "text-gray-300", "hover:text-white", "transition-colors"],
            ["routerLink", "/", 1, "px-4", "py-2", "text-sm", "text-gray-300", "hover:text-white", "transition-colors"],
            [1, "flex-1", "overflow-y-auto", "px-4", "py-8"],
            [1, "max-w-4xl", "mx-auto"],
            [1, "card"],
            [1, "card-header"],
            [1, "card-title"],
            [1, "card-body"]
        ],
        template: function(t, r) {
            t & 1 && (a(0, "div", 0)(1, "div", 1)(2, "div", 2), f(3, "img", 3), a(4, "div", 4)(5, "a", 5), l(6, " Back to Login "), s(), a(7, "a", 6), l(8, " Back to Home "), s()()()(), a(9, "div", 7)(10, "div", 8)(11, "div", 9)(12, "div", 10)(13, "h2", 11), l(14, "Terms of Service"), s()(), a(15, "div", 12), f(16, "qualtrim-terms-of-use"), s()()()()())
        },
        dependencies: [T, te, ae, mt],
        styles: ["[_nghost-%COMP%]{display:block;min-height:100vh}*[_ngcontent-%COMP%]{transition:all .3s cubic-bezier(.4,0,.2,1)}a[_ngcontent-%COMP%]:hover{transform:translate(-2px)}"]
    });
    let i = n;
    return i
})();
var Ii = (() => {
    let n = class n {
        ngOnInit() {
            document.documentElement.classList.add("dark")
        }
        ngOnDestroy() {
            document.documentElement.classList.remove("dark")
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-return-policy-v2"]
        ],
        decls: 12,
        vars: 0,
        consts: [
            [1, "min-h-screen", "bg-gradient-to-br", "from-black", "via-blue-950", "to-black", "flex", "flex-col"],
            [1, "w-full", "px-4", "py-6"],
            [1, "max-w-4xl", "mx-auto", "flex", "items-center", "justify-between"],
            ["src", "assets/qualtrim-wide-logo.svg", "alt", "Qualtrim", 1, "h-10", "sm:h-12"],
            [1, "flex", "items-center", "gap-4"],
            ["routerLink", "/auth/login", 1, "px-4", "py-2", "text-sm", "text-gray-300", "hover:text-white", "transition-colors"],
            ["routerLink", "/", 1, "px-4", "py-2", "text-sm", "text-gray-300", "hover:text-white", "transition-colors"],
            [1, "flex-1", "overflow-y-auto", "px-4", "py-8"],
            [1, "max-w-4xl", "mx-auto"]
        ],
        template: function(t, r) {
            t & 1 && (a(0, "div", 0)(1, "div", 1)(2, "div", 2), f(3, "img", 3), a(4, "div", 4)(5, "a", 5), l(6, " Back to Login "), s(), a(7, "a", 6), l(8, " Back to Home "), s()()()(), a(9, "div", 7)(10, "div", 8), f(11, "qualtrim-return-policy"), s()()())
        },
        dependencies: [T, te, ae, oi],
        styles: ["[_nghost-%COMP%]{display:block;min-height:100vh}*[_ngcontent-%COMP%]{transition:all .3s cubic-bezier(.4,0,.2,1)}a[_ngcontent-%COMP%]:hover{transform:translate(-2px)}"]
    });
    let i = n;
    return i
})();

function $r(i, n) {
    i & 1 && (u(0, "div", 2)(1, "div", 3), b(), u(2, "svg", 4), B(3, "circle", 5)(4, "path", 6), g()(), y(), u(5, "h2", 7), l(6, " Verifying your subscription... "), g(), u(7, "p", 8), l(8, " Please wait while we confirm your payment "), g()())
}

function jr(i, n) {
    if (i & 1 && (u(0, "div", 23)(1, "span", 16), l(2, "Currency:"), g(), u(3, "span", 25), l(4), g()()), i & 2) {
        let o, e = m(3);
        c(4), W((o = e.presentmentCurrency()) == null ? null : o.toUpperCase())
    }
}

function zr(i, n) {
    if (i & 1 && (u(0, "div", 14)(1, "h3", 21), l(2, " Payment Details "), g(), u(3, "div", 22)(4, "div", 23)(5, "span", 16), l(6, "Amount Paid:"), g(), u(7, "span", 24), l(8), g()(), p(9, jr, 5, 1, "div", 23), g()()), i & 2) {
        let o = m(2);
        c(8), W(o.formattedAmount), c(), h(o.presentmentCurrency() ? 9 : -1)
    }
}

function Br(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "div", 2)(1, "div", 9), b(), u(2, "svg", 10), B(3, "path", 11), g()(), y(), u(4, "h2", 12), l(5, " Subscription Activated! "), g(), u(6, "p", 13), l(7, " Welcome to Qualtrim Pro! "), g(), p(8, zr, 10, 2, "div", 14), u(9, "div", 15)(10, "p", 16), l(11, " Redirecting to your dashboard in "), u(12, "span", 17), l(13), g(), l(14, " seconds... "), g(), u(15, "div", 18), B(16, "div", 19), g()(), u(17, "button", 20), ee("click", function() {
            C(o);
            let t = m();
            return _(t.redirectToDashboard())
        }), l(18, " Go to Dashboard Now "), g()()
    }
    if (i & 2) {
        let o = m();
        c(8), h(o.formattedAmount ? 8 : -1), c(5), W(o.countdown()), c(3), Gt("width", (3 - o.countdown()) * 33.33, "%")
    }
}

function Ur(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "div", 2)(1, "div", 26), b(), u(2, "svg", 27), B(3, "path", 28), g()(), y(), u(4, "h2", 29), l(5, " Payment Error "), g(), u(6, "p", 30), l(7), g(), u(8, "div", 31)(9, "button", 20), ee("click", function() {
            C(o);
            let t = m();
            return _(t.retryCheckout())
        }), l(10, " Try Again "), g(), u(11, "button", 32), ee("click", function() {
            C(o);
            let t = m();
            return _(t.contactSupport())
        }), l(12, " Contact Support "), g()(), u(13, "div", 33)(14, "p", 34)(15, "span", 35), l(16, "Need help?"), g(), l(17, " Our support team is available 24/7 to assist you with any payment issues. "), g()()()
    }
    if (i & 2) {
        let o = m();
        c(7), M(" ", o.errorMessage(), " ")
    }
}
var Ti = (() => {
    let n = class n {
        constructor(e, t, r) {
            this.route = e, this.router = t, this.embeddedCheckoutService = r, this._destroy$ = new me, this.status = P("loading"), this.sessionId = P(null), this.errorMessage = P("An unexpected error occurred. Please try again."), this.countdown = P(3), this.subscriptionId = P(void 0), this.customerId = P(void 0), this.presentmentAmount = P(void 0), this.presentmentCurrency = P(void 0)
        }
        ngOnInit() {
            let e = this.route.snapshot.queryParams.session_id;
            if (!e) {
                this.status.set("error"), this.errorMessage.set("No session ID provided. Please complete checkout first.");
                return
            }
            this.sessionId.set(e);
            let r = this.router.getCurrentNavigation() ? .extras ? .state ? .sessionDetails || history.state ? .sessionDetails;
            r ? (console.log("[SubscriptionReturn] Using session details from navigation state (no API call)"), this.displaySessionDetails(r)) : (console.log("[SubscriptionReturn] No session details in state, calling API (fallback)"), this.verifySession())
        }
        ngOnDestroy() {
            this._destroy$.next(), this._destroy$.complete()
        }
        displaySessionDetails(e) {
            e.status === "complete" && e.paymentStatus === "paid" ? (this.status.set("success"), this.subscriptionId.set(e.subscriptionId), this.customerId.set(e.customerId), e.presentmentDetails && (this.presentmentAmount.set(e.presentmentDetails.presentmentAmount), this.presentmentCurrency.set(e.presentmentDetails.presentmentCurrency)), this.startRedirectCountdown()) : (this.status.set("error"), this.errorMessage.set(`Payment status: ${e.paymentStatus}. Please complete your payment or contact support.`))
        }
        verifySession() {
            let e = this.sessionId();
            e && this.embeddedCheckoutService.retrieveCheckoutSession(e).pipe(ie(this._destroy$)).subscribe({
                next: t => {
                    this.displaySessionDetails(t)
                },
                error: t => {
                    this.status.set("error"), this.errorMessage.set(t ? .error ? .message || "Failed to verify payment. Please contact support if your card was charged.")
                }
            })
        }
        startRedirectCountdown() {
            Ge(1e3).pipe(xe(3), ie(this._destroy$)).subscribe({
                next: e => {
                    this.countdown.set(3 - e)
                },
                complete: () => {
                    this.redirectToDashboard()
                }
            })
        }
        redirectToDashboard() {
            this.router.navigate(["/app/insights"], {
                queryParams: {
                    welcome: "true"
                }
            })
        }
        retryCheckout() {
            this.router.navigate(["/subscription/plans"])
        }
        contactSupport() {
            this.router.navigate(["/support"])
        }
        get formattedAmount() {
            let e = this.presentmentAmount(),
                t = this.presentmentCurrency();
            if (!e || !t) return "";
            let r = e / 100;
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: t
            }).format(r)
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(Pe), x($), x(Ye))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-subscription-embedded-return"]
        ],
        decls: 5,
        vars: 3,
        consts: [
            [1, "min-h-screen", "bg-gray-50", "dark:bg-gray-950", "flex", "items-center", "justify-center", "px-4", "py-12"],
            [1, "bg-white", "dark:bg-gray-900", "rounded-3xl", "p-12", "shadow-2xl", "max-w-2xl", "w-full"],
            [1, "flex", "flex-col", "items-center", "text-center"],
            [1, "relative", "w-20", "h-20", "mb-8"],
            ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "text-blue-600", "dark:text-blue-400"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
            [1, "text-3xl", "font-bold", "text-gray-900", "dark:text-white", "mb-4"],
            [1, "text-lg", "text-gray-600", "dark:text-gray-400"],
            [1, "w-24", "h-24", "bg-green-100", "dark:bg-green-900/30", "rounded-full", "flex", "items-center", "justify-center", "mb-8"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-12", "h-12", "text-green-600", "dark:text-green-400"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "3", "d", "M5 13l4 4L19 7"],
            [1, "text-4xl", "font-bold", "text-gray-900", "dark:text-white", "mb-3"],
            [1, "text-xl", "text-gray-700", "dark:text-gray-300", "mb-8"],
            [1, "w-full", "bg-gradient-to-br", "from-blue-50", "to-blue-100", "dark:from-blue-900/20", "dark:to-blue-800/20", "rounded-xl", "p-6", "mb-8", "border", "border-blue-200", "dark:border-blue-800"],
            [1, "flex", "flex-col", "gap-4", "items-center", "p-6", "bg-gray-50", "dark:bg-gray-800/50", "rounded-xl", "mb-6", "w-full"],
            [1, "text-gray-700", "dark:text-gray-300"],
            [1, "font-bold", "text-blue-600", "dark:text-blue-400"],
            [1, "w-full", "bg-gray-200", "dark:bg-gray-700", "rounded-full", "h-2"],
            [1, "bg-gradient-to-r", "from-blue-600", "to-blue-800", "h-2", "rounded-full", "transition-all", "duration-1000"],
            [1, "w-full", "py-4", "px-6", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "hover:from-blue-700", "hover:to-blue-900", "text-white", "rounded-xl", "font-semibold", "text-lg", "shadow-lg", "hover:shadow-2xl", "hover:scale-[1.02]", "transition-all", "duration-300", 3, "click"],
            [1, "text-sm", "font-semibold", "text-gray-600", "dark:text-gray-400", "mb-4", "uppercase", "tracking-wide"],
            [1, "flex", "flex-col", "gap-3"],
            [1, "flex", "items-center", "justify-between"],
            [1, "font-bold", "text-gray-900", "dark:text-white", "text-lg"],
            [1, "font-semibold", "text-gray-900", "dark:text-white"],
            [1, "w-24", "h-24", "bg-red-100", "dark:bg-red-900/30", "rounded-full", "flex", "items-center", "justify-center", "mb-8"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-12", "h-12", "text-red-600", "dark:text-red-400"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "3", "d", "M6 18L18 6M6 6l12 12"],
            [1, "text-3xl", "font-bold", "text-gray-900", "dark:text-white", "mb-3"],
            [1, "text-lg", "text-gray-600", "dark:text-gray-400", "mb-8"],
            [1, "flex", "flex-col", "gap-4", "w-full"],
            [1, "w-full", "py-4", "px-6", "bg-gray-100", "dark:bg-gray-800", "hover:bg-gray-200", "dark:hover:bg-gray-700", "text-gray-900", "dark:text-white", "rounded-xl", "font-semibold", "text-lg", "border-2", "border-gray-300", "dark:border-gray-600", "hover:border-gray-400", "dark:hover:border-gray-500", "transition-all", "duration-300", 3, "click"],
            [1, "mt-8", "p-4", "bg-blue-50", "dark:bg-blue-900/20", "rounded-xl", "border", "border-blue-200", "dark:border-blue-800"],
            [1, "text-sm", "text-gray-700", "dark:text-gray-300"],
            [1, "font-semibold"]
        ],
        template: function(t, r) {
            t & 1 && (u(0, "div", 0)(1, "div", 1), p(2, $r, 9, 0, "div", 2), p(3, Br, 19, 4, "div", 2), p(4, Ur, 18, 1, "div", 2), g()()), t & 2 && (c(2), h(r.status() === "loading" ? 2 : -1), c(), h(r.status() === "success" ? 3 : -1), c(), h(r.status() === "error" ? 4 : -1))
        },
        dependencies: [T],
        encapsulation: 2
    });
    let i = n;
    return i
})();
var Fi = [{
    path: "privacy-policy",
    title: "Privacy Policy - How We Protect Your Data",
    component: Et
}, {
    path: "terms-of-use",
    title: "Terms of Service - User Agreement",
    component: Mi
}, {
    path: "refund-policy",
    title: "Return & Refund Policy",
    component: Ii
}, {
    path: "",
    canActivateChild: [Ei],
    children: [{
        path: "login",
        title: "Login to Your Account - Secure Portfolio Access",
        component: ai
    }, {
        path: "forgot-password",
        title: "Forgot Password - Account Recovery",
        component: _i
    }, {
        path: "reset-password",
        title: "Reset Your Password - Secure Account Access",
        component: Pi
    }]
}, {
    path: "register",
    title: "Create Free Account - Start Tracking Your Portfolio",
    component: wt
}, {
    path: "patreon-connect",
    title: "Connect Patreon Account - Link Your Subscription",
    component: Ci
}, {
    path: "subscription/embedded-return",
    title: "Subscription Confirmation - Payment Complete",
    component: Ti
}, {
    path: "verify-email",
    title: "Verify Your Email - Complete Registration",
    component: ki
}, {
    path: "oauth",
    component: wi
}];
var Ni = (() => {
    let n = class n {
        constructor() {}
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-terms-of-use-page"]
        ],
        decls: 10,
        vars: 0,
        consts: [
            [1, "terms-of-use-page", "h-full"],
            [1, "card", "h-full"],
            [1, "card-header"],
            [1, "card-title"],
            [1, "card-toolbar"],
            ["routerLink", "/auth/register", 1, "btn", "btn-link"],
            [1, "card-body", "overflow-y-scroll", "h-full"]
        ],
        template: function(t, r) {
            t & 1 && (a(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3), l(4, "Qualtrim Terms of Service"), s(), a(5, "div", 4)(6, "a", 5), l(7, "Back"), s()()(), a(8, "div", 6), f(9, "qualtrim-terms-of-use"), s()()())
        },
        dependencies: [mt, te, ae],
        styles: ["[_nghost-%COMP%]{height:100%}"]
    });
    let i = n;
    return i
})();
var Cm = (() => {
    let n = class n {};
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275mod = Ut({
        type: n
    }), n.\u0275inj = jt({
        imports: [T, te.forChild(Fi), oe, ii, ni, Xt, Zt, ti, Ni, wt, Ve, Et]
    });
    let i = n;
    return i
})();
var qr = "Authorization",
    Oi = (() => {
        let n = class n {
            constructor(e, t) {
                this._auth = e, this._router = t, this._refreshTokenInProgress = !1, this._refreshTokens = new q(null)
            }
            intercept(e, t) {
                if (e.url.includes("api/auth") && !e.url.includes("current-user")) return t.handle(e);
                let r = this._auth.getCurrentTokens();
                return r ? (e = this._addAuthenticationToken(e, r), t.handle(e).pipe(F(d => {
                    if (d && d.status === 401) return this._refreshTokenInProgress ? this._refreshTokens.pipe(Me(v => v !== null), it(), J(v => t.handle(this._addAuthenticationToken(e, v)))) : (this._refreshTokenInProgress = !0, this._refreshTokens.next(null), this._auth.refreshTokens().pipe(J(v => {
                        if (v === null) throw new lt({
                            error: "Invalid authentication tokens",
                            status: 401
                        });
                        return this._refreshTokens.next(v), t.handle(this._addAuthenticationToken(e, v))
                    }), Ae(() => {
                        this._refreshTokenInProgress = !1
                    })));
                    throw d
                }))) : t.handle(e)
            }
            _addAuthenticationToken(e, t) {
                return e.clone({
                    headers: e.headers.set(qr, `Bearer ${t.accessToken}`)
                })
            }
        };
        n.\u0275fac = function(t) {
            return new(t || n)(E(X), E($))
        }, n.\u0275prov = R({
            token: n,
            factory: n.\u0275fac
        });
        let i = n;
        return i
    })();
var Fm = [{
    provide: Jt,
    useClass: Oi,
    multi: !0
}];
var zm = (() => {
    let n = class n {
        constructor(e, t, r, d) {
            this._auth = e, this._router = t, this._routeParser = r, this._toastr = d
        }
        canActivate(e, t) {
            return this._isAuthenticated().pipe(this._checkAuthentication(e))
        }
        canActivateChild(e, t) {
            return this._isAuthenticated().pipe(this._checkAuthentication(e))
        }
        canLoad(e, t) {
            return this._isAuthenticated()
        }
        _isAuthenticated() {
            return this._auth.isAuthenticated$.pipe(xe(1))
        }
        _checkAuthentication(e) {
            let t = this._routeParser.getAllRouteData(e);
            return r => r.pipe(I(d => d ? !0 : (this._toastr.error("You are unauthenticated. Redirecting to the login page."), this._router.createUrlTree(t.redirectIfNoAuth))))
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(E(X), E($), E(dt), E(Ce))
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var Gm = (() => {
    let n = class n {
        constructor(e) {
            this._router = e
        }
        canActivate(e, t) {
            return L(!0)
        }
        canActivateChild(e, t) {
            return L(!0)
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(E($))
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var Ym = (() => {
    let n = class n {
        constructor(e) {
            this._router = e
        }
        canActivate(e, t) {
            return L(!0)
        }
        canActivateChild(e, t) {
            return L(!0)
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(E($))
    }, n.\u0275prov = R({
        token: n,
        factory: n.\u0275fac,
        providedIn: "root"
    });
    let i = n;
    return i
})();
var Hr = ["paymentElement"];

function Yr(i, n) {
    i & 1 && (u(0, "div", 4), b(), u(1, "svg", 5), B(2, "circle", 6)(3, "path", 7), g(), y(), u(4, "p", 8), l(5, "Loading subscription information..."), g()())
}

function Wr(i, n) {
    i & 1 && (u(0, "p", 20), l(1, "7 day free trial"), g())
}

function Qr(i, n) {
    i & 1 && (u(0, "p", 20), l(1, "Renew immediately"), g())
}

function Jr(i, n) {
    i & 1 && l(0, " Start Free Trial ")
}

function Kr(i, n) {
    i & 1 && l(0, " Renew Monthly ")
}

function Xr(i, n) {
    i & 1 && l(0, " Get Started ")
}

function Zr(i, n) {
    i & 1 && l(0, " Renew Annual ")
}

function eo(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "div", 9)(1, "div", 10), b(), u(2, "svg", 11), B(3, "path", 12), g()(), y(), u(4, "h3", 13), l(5, " Welcome Back to Qualtrim "), g(), u(6, "p", 14), l(7, " Your subscription has expired. Choose a plan to continue accessing all your investment tools. "), g()(), u(8, "div", 15)(9, "div", 16)(10, "h4", 17), l(11, "Monthly"), g(), u(12, "div", 18), l(13, " $9.99"), u(14, "span", 19), l(15, "/mo"), g()(), p(16, Wr, 2, 0, "p", 20)(17, Qr, 2, 0, "p", 20), u(18, "button", 21), ee("click", function() {
            C(o);
            let t = m(3);
            return _(t.onPlanSelected("monthly"))
        }), p(19, Jr, 1, 0)(20, Kr, 1, 0), g()(), u(21, "div", 22)(22, "div", 23)(23, "span", 24), l(24, " BEST VALUE "), g()(), u(25, "h4", 17), l(26, "Annual"), g(), u(27, "div", 18), l(28, " $8.25"), u(29, "span", 25), l(30, "/mo"), g()(), u(31, "p", 26), l(32, "Get 2 months free"), g(), u(33, "button", 27), ee("click", function() {
            C(o);
            let t = m(3);
            return _(t.onPlanSelected("annual"))
        }), p(34, Xr, 1, 0)(35, Zr, 1, 0), g()()(), u(36, "div", 28)(37, "p", 19), l(38, " Questions? Contact our support team for assistance. "), g()()
    }
    if (i & 2) {
        let o = m(3);
        c(16), h(o.userSubscriptionData.userHasSubscriptionHistory ? 17 : 16), c(3), h(o.userSubscriptionData.userHasSubscriptionHistory ? 20 : 19), c(15), h(o.userSubscriptionData.userHasSubscriptionHistory ? 35 : 34)
    }
}

function to(i, n) {
    i & 1 && (u(0, "div", 37), b(), u(1, "svg", 44), B(2, "circle", 6)(3, "path", 7), g(), y(), u(4, "p", 19), l(5, "Loading payment form..."), g()())
}

function io(i, n) {
    if (i & 1 && (u(0, "div", 38), l(1), g()), i & 2) {
        let o = m(4);
        c(), M(" ", o.errorMessage, " ")
    }
}

function no(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "div", 9)(1, "button", 29), ee("click", function() {
            C(o);
            let t = m(3);
            return _(t.onBackToPlanSelection())
        }), b(), u(2, "svg", 30), B(3, "path", 31), g()(), y(), u(4, "div", 32), b(), u(5, "svg", 11), B(6, "path", 33), g()(), y(), u(7, "h3", 13), l(8, "Payment Details"), g(), u(9, "p", 14), l(10), g()(), u(11, "div", 34)(12, "div")(13, "label", 35), l(14, " Payment Method "), g(), u(15, "div", 36, 0), p(17, to, 6, 0, "div", 37), g()(), p(18, io, 2, 1, "div", 38), u(19, "div", 39)(20, "span", 19), l(21, "Powered by"), g(), b(), u(22, "svg", 40), B(23, "path", 41)(24, "path", 42), g()(), y(), u(25, "button", 43), ee("click", function() {
            C(o);
            let t = m(3);
            return _(t.onCardDetailsSubmitted())
        }), l(26, " Continue to Confirmation "), g()()
    }
    if (i & 2) {
        let o = m(3);
        c(10), M(" Enter your payment information to renew your ", o.selectedPlan, " subscription. "), c(7), h(o.setupIntentClientSecret ? -1 : 17), c(), h(o.errorMessage ? 18 : -1), c(7), we("disabled", !o.setupIntentClientSecret)
    }
}

function ro(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "div", 52)(1, "div", 55), b(), u(2, "svg", 56), B(3, "path", 57), g(), y(), u(4, "span"), l(5, "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4242"), g()(), u(6, "button", 58), ee("click", function() {
            C(o);
            let t = m(4);
            return _(t.onChangePaymentMethod())
        }), l(7, " Change Payment Method "), g()()
    }
}

function oo(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "div", 52)(1, "div", 55), b(), u(2, "svg", 56), B(3, "path", 57), g(), y(), u(4, "span"), l(5), g()(), u(6, "button", 58), ee("click", function() {
            C(o);
            let t = m(4);
            return _(t.onChangePaymentMethod())
        }), l(7, " Change Payment Method "), g()()
    }
    if (i & 2) {
        let o = m(4);
        c(5), M("\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ", o.cardForm.value.cardNumber.slice(-4))
    }
}

function ao(i, n) {
    i & 1 && (b(), u(0, "svg", 59), B(1, "circle", 6)(2, "path", 7), g(), l(3, " Processing... "))
}

function so(i, n) {
    i & 1 && l(0, " Confirm Subscription ")
}

function lo(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "div", 9)(1, "button", 29), ee("click", function() {
            C(o);
            let t = m(3);
            return _(t.onBackToPlanSelection())
        }), b(), u(2, "svg", 30), B(3, "path", 31), g()(), y(), u(4, "div", 45), b(), u(5, "svg", 11), B(6, "path", 46), g()(), y(), u(7, "h3", 13), l(8, " Confirm Subscription "), g(), u(9, "p", 14), l(10, " Review your subscription details before confirming. "), g()(), u(11, "div", 47)(12, "div", 48)(13, "div")(14, "span", 49), l(15), g(), u(16, "button", 50), ee("click", function() {
            C(o);
            let t = m(3);
            return _(t.onChangePlan())
        }), l(17, " Change Plan "), g()(), u(18, "span", 51), l(19), g()(), p(20, ro, 8, 0, "div", 52)(21, oo, 8, 1, "div", 52), u(22, "div", 53), l(23, " Your subscription will be renewed immediately and you'll have access to all features. "), g()(), u(24, "button", 54), ee("click", function() {
            C(o);
            let t = m(3);
            return _(t.onConfirmSubscription())
        }), p(25, ao, 4, 0)(26, so, 1, 0), g()
    }
    if (i & 2) {
        let o = m(3);
        c(15), M(" ", o.selectedPlan === "monthly" ? "Monthly" : "Annual", " Plan "), c(4), M(" ", o.selectedPlan === "monthly" ? "$9.99/mo" : "$99/year", " "), c(), h(o.userSubscriptionData.userHasValidPaymentMethod ? 20 : o.cardForm.value.cardNumber ? 21 : -1), c(4), we("disabled", o.processingPayment), c(), h(o.processingPayment ? 25 : 26)
    }
}

function co(i, n) {
    if (i & 1 && (p(0, eo, 39, 3), p(1, no, 27, 4), p(2, lo, 27, 5)), i & 2) {
        let o = m(2);
        h(o.subscriptionModalStep === "plan-selection" ? 0 : -1), c(), h(o.subscriptionModalStep === "card-entry" ? 1 : -1), c(), h(o.subscriptionModalStep === "confirmation" ? 2 : -1)
    }
}

function mo(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "div", 2), ee("click", function() {
            C(o);
            let t = m();
            return _(t.onCloseModal())
        }), u(1, "div", 3), ee("click", function(t) {
            return C(o), _(t.stopPropagation())
        }), p(2, Yr, 6, 0, "div", 4)(3, co, 3, 3), g()()
    }
    if (i & 2) {
        let o = m();
        c(2), h(o.loadingUserData ? 2 : 3)
    }
}
var b0 = (() => {
    let n = class n {
        constructor(e, t, r, d, v, Z) {
            this._fb = e, this._http = t, this._authService = r, this._subscriptionService = d, this._stripeService = v, this._environmentService = Z, this.isOpen = !1, this.userData = {
                userHasSubscriptionHistory: !1,
                userHasValidPaymentMethod: !1
            }, this.planSelected = new ne, this.modalClosed = new ne, this.subscriptionConfirmed = new ne, this.subscriptionModalStep = "plan-selection", this.selectedPlan = null, this.processingPayment = !1, this.loadingUserData = !1, this.userSubscriptionData = {
                userHasSubscriptionHistory: !1,
                userHasValidPaymentMethod: !1
            }, this.stripe = null, this.elements = null, this.paymentElement = null, this.setupIntentClientSecret = null, this.errorMessage = null
        }
        ngOnInit() {
            this.initializeCardForm(), document.documentElement.classList.add("dark"), this.isOpen && this.fetchUserSubscriptionData()
        }
        ngOnChanges(e) {
            e.isOpen && e.isOpen.currentValue === !0 && this.fetchUserSubscriptionData()
        }
        initializeCardForm() {
            this.cardForm = this._fb.group({
                cardNumber: ["", [w.required, w.pattern(/^[0-9\s]+$/)]],
                expiryDate: ["", [w.required, w.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]],
                cvc: ["", [w.required, w.pattern(/^[0-9]{3,4}$/)]],
                cardholderName: ["", [w.required]]
            })
        }
        fetchUserSubscriptionData() {
            this.loadingUserData = !0, this._subscriptionService.getSubscriptionStatus().pipe(F(e => (console.error("Error fetching subscription data:", e), L({
                hasSubscription: !1,
                active: !1
            })))).subscribe({
                next: e => {
                    this.userSubscriptionData = {
                        userHasSubscriptionHistory: e.hasSubscription || !1,
                        userHasValidPaymentMethod: e.active || !1
                    }, this.loadingUserData = !1
                },
                error: () => {
                    this.userSubscriptionData = {
                        userHasSubscriptionHistory: !1,
                        userHasValidPaymentMethod: !1
                    }, this.loadingUserData = !1
                }
            })
        }
        onPlanSelected(e) {
            this.selectedPlan = e, this.errorMessage = null, this.userSubscriptionData.userHasSubscriptionHistory ? this.userSubscriptionData.userHasValidPaymentMethod ? this.subscriptionModalStep = "confirmation" : (this.initializeStripeForRenewal(), this.subscriptionModalStep = "card-entry") : this.planSelected.emit({
                plan: e,
                redirectToRegistration: !0
            })
        }
        onBackToPlanSelection() {
            this.subscriptionModalStep = "plan-selection"
        }
        onChangePlan() {
            this.subscriptionModalStep = "plan-selection"
        }
        onChangePaymentMethod() {
            this.subscriptionModalStep = "card-entry"
        }
        onCardDetailsSubmitted() {
            return Y(this, null, function*() {
                this.errorMessage = null;
                try {
                    let {
                        error: e
                    } = yield this._stripeService.submitElements();
                    if (e) {
                        this.errorMessage = e.message;
                        return
                    }
                    if (!this.setupIntentClientSecret) {
                        this.errorMessage = "Payment setup not initialized. Please try again.";
                        return
                    }
                    let {
                        error: t
                    } = yield this._stripeService.confirmSetupWithoutRedirect(this.setupIntentClientSecret);
                    if (t) {
                        this.errorMessage = t.message;
                        return
                    }
                    this.subscriptionModalStep = "confirmation"
                } catch (e) {
                    console.error("Error submitting card details:", e), this.errorMessage = "Failed to process payment method. Please try again."
                }
            })
        }
        onConfirmSubscription() {
            return Y(this, null, function*() {
                if (this.selectedPlan) {
                    this.processingPayment = !0, this.errorMessage = null;
                    try {
                        let e = yield Ee(this._subscriptionService.getPricingPlans()), t;
                        if (this.selectedPlan === "monthly" ? t = e.monthly ? .priceId || e.monthly ? .id : t = e.annual ? .priceId || e.annual ? .id, !t) throw new Error("Price ID not found for selected plan");
                        let r = yield Ee(this._subscriptionService.confirmRenewal({
                            priceId: t
                        }));
                        this.processingPayment = !1, this.subscriptionConfirmed.emit({
                            plan: this.selectedPlan
                        }), this.resetModalState()
                    } catch (e) {
                        console.error("Error confirming subscription:", e), this.processingPayment = !1, this.errorMessage = "Failed to activate subscription. Please try again."
                    }
                }
            })
        }
        onCloseModal() {
            this.modalClosed.emit(), this.resetModalState()
        }
        resetModalState() {
            this.subscriptionModalStep = "plan-selection", this.selectedPlan = null, this.cardForm.reset(), this.processingPayment = !1, this.setupIntentClientSecret = null, this.errorMessage = null, this._stripeService.destroy()
        }
        initializeStripeForRenewal() {
            return Y(this, null, function*() {
                try {
                    yield this._stripeService.initialize(this._environmentService.stripePublishableKey);
                    let e = yield Ee(this._subscriptionService.createSetupIntentForRenewal());
                    this.setupIntentClientSecret = e.clientSecret, yield this._stripeService.createElements(this.setupIntentClientSecret), setTimeout(() => {
                        this.mountPaymentElement()
                    }, 100)
                } catch (e) {
                    console.error("Error initializing Stripe for renewal:", e), this.errorMessage = "Failed to initialize payment form. Please try again."
                }
            })
        }
        mountPaymentElement() {
            return Y(this, null, function*() {
                if (!this.paymentElementRef ? .nativeElement) {
                    console.warn("Payment element container not found");
                    return
                }
                try {
                    yield this._stripeService.createPaymentElement("payment-element")
                } catch (e) {
                    console.error("Error mounting payment element:", e), this.errorMessage = "Failed to load payment form. Please refresh and try again."
                }
            })
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(se), x(ue), x(X), x(le), x(bt), x(_e))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-subscription-renewal-modal"]
        ],
        viewQuery: function(t, r) {
            if (t & 1 && nt(Hr, 5), t & 2) {
                let d;
                rt(d = ot()) && (r.paymentElementRef = d.first)
            }
        },
        inputs: {
            isOpen: "isOpen",
            userData: "userData"
        },
        outputs: {
            planSelected: "planSelected",
            modalClosed: "modalClosed",
            subscriptionConfirmed: "subscriptionConfirmed"
        },
        features: [zt],
        decls: 1,
        vars: 1,
        consts: [
            ["paymentElement", ""],
            [1, "fixed", "inset-0", "bg-black/50", "backdrop-blur-sm", "flex", "items-center", "justify-center", "p-4", "z-50"],
            [1, "fixed", "inset-0", "bg-black/50", "backdrop-blur-sm", "flex", "items-center", "justify-center", "p-4", "z-50", 3, "click"],
            [1, "bg-gray-800", "rounded-3xl", "shadow-2xl", "p-8", "max-w-lg", "w-full", "max-h-[90vh]", "overflow-y-auto", 3, "click"],
            [1, "text-center", "py-12"],
            ["viewBox", "0 0 24 24", 1, "animate-spin", "h-12", "w-12", "mx-auto", "mb-4", "text-blue-600"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", "fill", "none", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
            [1, "text-gray-300"],
            [1, "text-center", "mb-6"],
            [1, "inline-flex", "items-center", "justify-center", "w-20", "h-20", "bg-gradient-to-br", "from-blue-500", "to-purple-600", "rounded-full", "mb-4"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-10", "h-10", "text-white"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"],
            [1, "text-3xl", "font-bold", "text-white", "mb-3"],
            [1, "text-lg", "text-gray-300"],
            [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "mb-8"],
            [1, "text-center", "p-4", "border-2", "border-gray-700", "rounded-2xl"],
            [1, "text-lg", "font-bold", "text-white", "mb-2", "mt-2"],
            [1, "text-2xl", "font-bold", "text-white", "mb-1"],
            [1, "text-sm", "text-gray-400"],
            [1, "text-sm", "text-gray-400", "mb-4"],
            [1, "w-full", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white", "rounded-xl", "text-sm", "font-semibold", "hover:from-blue-700", "hover:to-blue-900", "transform", "hover:scale-105", "transition-all", "duration-300", "shadow-xl", 3, "click"],
            [1, "text-center", "p-4", "border-2", "border-purple-500", "bg-gradient-to-br", "from-blue-600", "to-purple-600", "rounded-2xl", "relative"],
            [1, "absolute", "-top-3", "left-1/2", "transform", "-translate-x-1/2"],
            [1, "bg-yellow-400", "text-yellow-900", "px-3", "py-1", "rounded-full", "text-xs", "font-bold"],
            [1, "text-sm", "text-white"],
            [1, "text-sm", "text-white", "mb-4"],
            [1, "w-full", "py-3", "bg-gradient-to-r", "from-purple-600", "to-blue-600", "text-white", "rounded-xl", "text-sm", "font-semibold", "hover:from-purple-700", "hover:to-blue-700", "transform", "hover:scale-105", "transition-all", "duration-300", "shadow-xl", 3, "click"],
            [1, "text-center", "pt-4", "border-t", "border-gray-700"],
            [1, "absolute", "top-4", "left-4", "p-2", "text-gray-400", "hover:text-gray-200", 3, "click"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"],
            [1, "inline-flex", "items-center", "justify-center", "w-20", "h-20", "bg-gradient-to-br", "from-green-500", "to-blue-600", "rounded-full", "mb-4"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 003 3v8a3 3 0 003 3z"],
            [1, "space-y-6"],
            [1, "block", "text-sm", "font-medium", "text-gray-300", "mb-2"],
            ["id", "payment-element", 1, "p-4", "border", "border-gray-600", "rounded-lg", "bg-gray-800"],
            [1, "text-center", "py-4"],
            [1, "p-3", "bg-red-900/20", "border", "border-red-500/50", "rounded-lg", "text-red-300", "text-sm"],
            [1, "flex", "items-center", "justify-center", "pt-4"],
            ["fill", "currentColor", "viewBox", "0 0 512 512", 1, "w-12", "h-6", "ml-2"],
            ["d", "M512 256c0 141.384-114.616 256-256 256S0 397.384 0 256 114.616 0 256 0s256 114.616 256 256z", "fill", "#635BFF"],
            ["d", "M256 216.75c22.26 0 40.25-18 40.25-40.25S278.26 136.25 256 136.25s-40.25 18-40.25 40.25 18 40.25 40.25 40.25z", "fill", "white"],
            ["type", "button", 1, "w-full", "py-3", "bg-gradient-to-r", "from-green-600", "to-blue-600", "text-white", "rounded-xl", "font-semibold", "hover:from-green-700", "hover:to-blue-700", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-300", 3, "click", "disabled"],
            ["viewBox", "0 0 24 24", 1, "animate-spin", "h-6", "w-6", "mx-auto", "mb-2", "text-blue-600"],
            [1, "inline-flex", "items-center", "justify-center", "w-20", "h-20", "bg-gradient-to-br", "from-purple-500", "to-pink-600", "rounded-full", "mb-4"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"],
            [1, "bg-gray-800", "rounded-2xl", "p-6", "mb-6"],
            [1, "flex", "justify-between", "items-center", "mb-4"],
            [1, "text-lg", "font-semibold", "text-white"],
            [1, "ml-3", "text-sm", "text-blue-400", "hover:text-blue-300", "underline", 3, "click"],
            [1, "text-lg", "font-bold", "text-white"],
            [1, "flex", "items-center", "justify-between", "text-gray-300", "mb-4"],
            [1, "text-sm", "text-gray-300"],
            [1, "w-full", "py-3", "bg-gradient-to-r", "from-purple-600", "to-pink-600", "text-white", "rounded-xl", "font-semibold", "hover:from-purple-700", "hover:to-pink-700", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-300", "flex", "items-center", "justify-center", 3, "click", "disabled"],
            [1, "flex", "items-center"],
            ["fill", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "mr-2"],
            ["d", "M3 7v2h18V7H3zm0 6v2h18v-2H3zm0 6v2h18v-2H3z"],
            [1, "text-sm", "text-blue-400", "hover:text-blue-300", "underline", 3, "click"],
            ["viewBox", "0 0 24 24", 1, "animate-spin", "h-5", "w-5", "mr-3"]
        ],
        template: function(t, r) {
            t & 1 && p(0, mo, 4, 1, "div", 1), t & 2 && h(r.isOpen ? 0 : -1)
        },
        dependencies: [T, oe],
        encapsulation: 2
    });
    let i = n;
    return i
})();
var uo = ["paymentElement"],
    $i = (i, n) => ({
        "bg-gray-800": i,
        "dark:bg-gray-800": n
    }),
    De = (i, n) => ({
        "text-gray-300": i,
        "dark:text-gray-300": n
    }),
    po = () => ["/app/terms-of-use"],
    Pt = (i, n) => ({
        "text-white": i,
        "dark:text-white": n
    }),
    ho = (i, n) => ({
        "border-blue-600 bg-blue-50 dark:bg-blue-900/20": i,
        "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800": n
    }),
    fo = (i, n, o, e, t) => ({
        "opacity-50": i,
        "cursor-not-allowed": n,
        "cursor-pointer": o,
        "border-blue-600 bg-blue-50 dark:bg-blue-900/20": e,
        "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800": t
    }),
    go = (i, n) => ({
        "text-gray-300": i,
        "dark:text-gray-400": n
    }),
    vo = (i, n) => ({
        "text-blue-400 hover:text-blue-300": i,
        "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300": n
    }),
    bo = (i, n) => ({
        "text-gray-400": i,
        "dark:text-gray-400": n
    }),
    xo = (i, n) => n.id;

function yo(i, n) {
    if (i & 1 && (a(0, "div", 18)(1, "span", 19), l(2), s(), a(3, "span", 20), l(4), s()(), a(5, "p", 10), l(6), s()), i & 2) {
        let o = m();
        c(), S("ngClass", K(7, De, o.alwaysDarkMode, !o.alwaysDarkMode)), c(), M(" Qualtrim ", o.selectedPlan === "monthly" ? "Monthly" : "Annual", " Plan "), c(), S("ngClass", K(10, Pt, o.alwaysDarkMode, !o.alwaysDarkMode)), c(), Je(" $", o.selectedPlanDetails.price, "/", o.selectedPlan === "monthly" ? "mo" : "yr", " "), c(), S("ngClass", K(13, De, o.alwaysDarkMode, !o.alwaysDarkMode)), c(), M(" ", o.selectedPlanDetails.trial, " ")
    }
}

function So(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "div", 4)(1, "div", 21)(2, "div", 8), b(), a(3, "svg", 22), f(4, "path", 23), s(), y(), a(5, "div", 24)(6, "h4", 25), l(7, " Account Created Successfully "), s(), a(8, "p", 26), l(9, " Your account has been created, but we encountered an issue setting up your payment. Please contact support or complete your subscription setup from your account dashboard. "), s(), a(10, "button", 27), N("click", function() {
            C(o);
            let t = m();
            return _(t.navigateToSubscriptionManagement())
        }), l(11, " Go to Subscription Management "), s()()()()()
    }
}

function Co(i, n) {
    if (i & 1 && (a(0, "div", 4)(1, "div", 28)(2, "div", 29), b(), a(3, "svg", 30), f(4, "path", 31), s(), y(), a(5, "span", 32), l(6), s()()()()), i & 2) {
        let o = m();
        c(6), W(o.errors.payment)
    }
}

function _o(i, n) {
    if (i & 1 && (a(0, "div", 5), f(1, "div", 33), a(2, "span", 34), l(3, " Loading saved payment methods... "), s()()), i & 2) {
        let o = m();
        c(2), S("ngClass", K(1, De, o.alwaysDarkMode, !o.alwaysDarkMode))
    }
}

function wo(i, n) {
    i & 1 && (b(), a(0, "svg", 46), f(1, "rect", 52)(2, "path", 53), s())
}

function Eo(i, n) {
    i & 1 && (b(), a(0, "svg", 46), f(1, "rect", 54)(2, "circle", 55)(3, "circle", 56), s())
}

function Po(i, n) {
    i & 1 && (b(), a(0, "svg", 46), f(1, "rect", 57), s())
}

function ko(i, n) {
    i & 1 && (b(), a(0, "svg", 46), f(1, "rect", 58), s())
}

function Mo(i, n) {
    i & 1 && (a(0, "span", 50), l(1, " Expired "), s())
}

function Io(i, n) {
    i & 1 && (a(0, "span", 51), l(1, " Expires Soon "), s())
}

function To(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "label", 37)(1, "input", 42), N("change", function() {
            let t = C(o).$implicit,
                r = m(2);
            return _(r.selectPaymentMethod(t.id))
        }), s(), a(2, "div", 43)(3, "div", 44)(4, "div", 45), p(5, wo, 3, 0, ":svg:svg", 46)(6, Eo, 4, 0, ":svg:svg", 46)(7, Po, 2, 0, ":svg:svg", 46)(8, ko, 2, 0, ":svg:svg", 46), s(), a(9, "div", 24)(10, "div", 47), l(11), s(), a(12, "div", 48), l(13), s()(), a(14, "div", 49), p(15, Mo, 2, 0, "span", 50)(16, Io, 2, 0, "span", 51), s()()()()
    }
    if (i & 2) {
        let o = n.$implicit,
            e = m(2);
        S("ngClass", st(12, fo, e.isPaymentMethodExpired(o), e.isPaymentMethodExpired(o), !e.isPaymentMethodExpired(o), e.selectedPaymentMethodId === o.id && !e.isPaymentMethodExpired(o), e.selectedPaymentMethodId !== o.id || e.isPaymentMethodExpired(o))), c(), S("value", o.id)("checked", e.selectedPaymentMethodId === o.id)("disabled", e.isPaymentMethodExpired(o)), c(4), h((o.card == null ? null : o.card.brand) === "visa" ? 5 : (o.card == null ? null : o.card.brand) === "mastercard" ? 6 : (o.card == null ? null : o.card.brand) === "amex" ? 7 : 8), c(5), S("ngClass", K(18, Pt, e.alwaysDarkMode, !e.alwaysDarkMode)), c(), Je(" ", e.getCardBrandDisplay((o.card == null ? null : o.card.brand) || "Card"), " \u2022\u2022\u2022\u2022 ", o.card == null ? null : o.card.last4, " "), c(), S("ngClass", K(21, go, e.alwaysDarkMode, !e.alwaysDarkMode)), c(), Je(" Exp ", o.card == null ? null : o.card.expMonth, "/", o.card == null ? null : o.card.expYear, " "), c(2), h(e.isPaymentMethodExpired(o) ? 15 : e.isPaymentMethodExpiringSoon(o) ? 16 : -1)
    }
}

function Fo(i, n) {
    i & 1 && (a(0, "span"), l(1, "Show less"), s(), b(), a(2, "svg", 60), f(3, "path", 61), s())
}

function Vo(i, n) {
    if (i & 1 && (a(0, "span"), l(1), s(), b(), a(2, "svg", 60), f(3, "path", 62), s()), i & 2) {
        let o = m(3);
        c(), Je("Show ", o.existingPaymentMethods.length - o.MAX_VISIBLE_PAYMENT_METHODS, " more payment method", o.existingPaymentMethods.length - o.MAX_VISIBLE_PAYMENT_METHODS > 1 ? "s" : "")
    }
}

function Do(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "button", 59), N("click", function() {
            C(o);
            let t = m(2);
            return _(t.toggleShowAllPaymentMethods())
        }), p(1, Fo, 4, 0)(2, Vo, 4, 2), s()
    }
    if (i & 2) {
        let o = m(2);
        S("ngClass", K(2, vo, o.alwaysDarkMode, !o.alwaysDarkMode)), c(), h(o.showAllPaymentMethods ? 1 : 2)
    }
}

function Lo(i, n) {
    if (i & 1) {
        let o = A();
        a(0, "div", 6)(1, "h3", 35), l(2, " Select Payment Method "), s(), a(3, "div", 36), Ie(4, To, 17, 24, "label", 37, xo), p(6, Do, 3, 5, "button", 38), s(), a(7, "label", 39)(8, "input", 40), N("change", function() {
            C(o);
            let t = m();
            return _(t.selectNewPaymentMethod())
        }), s(), a(9, "span", 41), l(10, " Use a different payment method "), s()()()
    }
    if (i & 2) {
        let o = m();
        c(), S("ngClass", K(5, Pt, o.alwaysDarkMode, !o.alwaysDarkMode)), c(3), Te(o.visiblePaymentMethods), c(2), h(o.hasMorePaymentMethods ? 6 : -1), c(), S("ngClass", K(8, ho, !o.useExistingPaymentMethod, o.useExistingPaymentMethod)), c(), S("checked", !o.useExistingPaymentMethod), c(), S("ngClass", K(11, Pt, o.alwaysDarkMode, !o.alwaysDarkMode))
    }
}

function Ao(i, n) {
    if (i & 1 && (a(0, "div", 64), f(1, "div", 67), a(2, "span", 68), l(3, "Initializing payment setup..."), s(), a(4, "span", 69), l(5, "This may take a moment"), s()()), i & 2) {
        let o = m(2);
        c(2), S("ngClass", K(2, De, o.alwaysDarkMode, !o.alwaysDarkMode)), c(2), S("ngClass", K(5, bo, o.alwaysDarkMode, !o.alwaysDarkMode))
    }
}

function Ro(i, n) {
    if (i & 1 && (a(0, "div", 65), f(1, "div", 70), a(2, "span", 71), l(3, "Loading payment form..."), s()()), i & 2) {
        let o = m(2);
        c(2), S("ngClass", K(1, De, o.alwaysDarkMode, !o.alwaysDarkMode))
    }
}

function No(i, n) {
    if (i & 1 && (a(0, "div", 66)(1, "div", 29), b(), a(2, "svg", 30), f(3, "path", 31), s(), y(), a(4, "span", 32), l(5), s()()()), i & 2) {
        let o = m(2);
        c(5), W(o.errors.stripe)
    }
}

function Oo(i, n) {
    i & 1 && (a(0, "div", 73), l(1, " Initializing secure payment form... "), s())
}

function $o(i, n) {
    if (i & 1 && (f(0, "div", 72, 0), p(2, Oo, 2, 0, "div", 73)), i & 2) {
        let o = m(2);
        S("ngClass", K(2, $i, o.alwaysDarkMode, !o.alwaysDarkMode)), c(2), h(o.paymentElementMounted ? -1 : 2)
    }
}

function jo(i, n) {
    if (i & 1 && (a(0, "div")(1, "label", 63), l(2, " Payment Information "), s(), p(3, Ao, 6, 8, "div", 64)(4, Ro, 4, 4, "div", 65)(5, No, 6, 1, "div", 66)(6, $o, 3, 5), s()), i & 2) {
        let o = m();
        c(), S("ngClass", K(2, De, o.alwaysDarkMode, !o.alwaysDarkMode)), c(2), h(o.loading.creatingSetupIntent && !o.paymentElementMounted ? 3 : o.isPaymentElementLoading ? 4 : o.hasStripeError ? 5 : 6)
    }
}

function zo(i, n) {
    i & 1 && (a(0, "p", 12), l(1, " You must agree to the terms to continue "), s())
}
var U0 = (() => {
    let n = class n {
        constructor(e, t, r, d, v, Z, j, de) {
            this.fb = e, this.stripeService = t, this.environmentService = r, this.wizardService = d, this.toastr = v, this.subscriptionService = Z, this.currentUserService = j, this.router = de, this.destroy$ = new me, this.alwaysDarkMode = !1, this.selectedPlan = null, this.setupIntentClientSecret = null, this.existingPaymentMethods = [], this.isLoadingPaymentMethods = !1, this.paymentCompleted = new ne, this.paymentElement = null, this.paymentElementMounted = !1, this.isPaymentElementLoading = !1, this.showSubscriptionIntentError = !1, this.selectedPaymentMethodId = null, this.useExistingPaymentMethod = !1, this.showAllPaymentMethods = !1, this.MAX_VISIBLE_PAYMENT_METHODS = 3
        }
        ngOnInit() {
            if (this.initializeForm(), this.hasSavedPaymentMethods) {
                let e = this.existingPaymentMethods.filter(t => !this.isPaymentMethodExpired(t));
                e.length > 0 ? this.selectPaymentMethod(e[0].id) : this.selectNewPaymentMethod()
            }!this.setupIntentClientSecret && !this.wizardService.currentState.setupIntentId && this.initializeSubscriptionIntent()
        }
        ngAfterViewInit() {
            this.setupIntentClientSecret && !this.useExistingPaymentMethod ? setTimeout(() => this.initializeStripeElements(), 100) : this.selectedPlan
        }
        ngOnDestroy() {
            this.destroy$.next(), this.destroy$.complete(), this.stripeService.destroy()
        }
        initializeForm() {
            this.paymentForm = this.fb.group({
                agreeToTerms: [!1, w.requiredTrue]
            })
        }
        initializeSubscriptionIntent() {
            this.wizardService.setLoading("creatingSetupIntent", !0), this.wizardService.createSubscriptionIntent().pipe(ie(this.destroy$)).subscribe({
                next: e => {
                    e && (this.setupIntentClientSecret = this.wizardService.setupIntentClientSecret, this.setupIntentClientSecret && setTimeout(() => this.initializeStripeElements(), 100))
                },
                error: e => {
                    this.showSubscriptionIntentError = !0, this.wizardService.setError("stripe", "Unable to initialize payment. Please contact support or try again later.")
                }
            })
        }
        initializeStripeElements() {
            return Y(this, null, function*() {
                if (!(!this.paymentElementRef ? .nativeElement || !this.setupIntentClientSecret)) {
                    this.isPaymentElementLoading = !0, this.wizardService.setError("stripe", null);
                    try {
                        if (!(yield this.stripeService.initialize(this.environmentService.stripePublishableKey))) throw new Error("Failed to initialize Stripe");
                        if (console.log("alwaysDarkMode", this.alwaysDarkMode), !(yield this.stripeService.createElements(this.setupIntentClientSecret, this.alwaysDarkMode))) throw new Error("Failed to create Stripe elements");
                        if (this.paymentElement = yield this.stripeService.createPaymentElement("payment-element", {
                                layout: {
                                    type: "tabs",
                                    defaultCollapsed: !1,
                                    radios: !1,
                                    spacedAccordionItems: !1
                                }
                            }), !this.paymentElement) throw new Error("Failed to create payment element");
                        this.paymentElementMounted = !0
                    } catch (e) {
                        this.environmentService.isProduction || console.error("Failed to initialize Stripe elements:", e), this.wizardService.setError("stripe", "Failed to load payment form. Please refresh the page.")
                    } finally {
                        this.isPaymentElementLoading = !1
                    }
                }
            })
        }
        verifySubscriptionWithRetry() {
            let t = [500, 1e3, 2e3, 3e3, 4e3],
                r = 0;
            return this.currentUserService.refreshCurrentUser().pipe(Ot(d => {
                if (r++, d ? .hasActiveSubscription || !1 || r >= 5) return tt;
                let Z = t[r - 1] || 4e3;
                return Nt(Z).pipe(J(() => this.currentUserService.refreshCurrentUser()))
            }), I(d => d ? .hasActiveSubscription || !1), Me(d => d === !0), xe(1), Rt(12e3), F(d => (console.warn("Subscription verification timed out:", d), L(!1))))
        }
        onSubmitPayment() {
            return Y(this, null, function*() {
                if (!this.paymentForm.valid) {
                    this.paymentForm.markAllAsTouched();
                    return
                }
                this.wizardService.setLoading("processingPayment", !0), this.wizardService.setError("payment", null);
                try {
                    if (this.useExistingPaymentMethod && this.selectedPaymentMethodId) {
                        yield this.completeSubscriptionWithExistingPayment();
                        return
                    }
                    if (!this.paymentElement || !this.setupIntentClientSecret) {
                        this.toastr.error("Payment form not initialized. Please refresh and try again.");
                        return
                    }
                    let e = yield this.stripeService.submitElements();
                    if (e.error) {
                        this.wizardService.setError("stripe", e.error.message || "Please check your payment details and try again."), this.toastr.error(e.error.message || "Payment validation failed");
                        return
                    }
                    let t;
                    try {
                        if (!this.setupIntentClientSecret) throw new Error("Missing payment setup information. Please refresh the page and try again.");
                        if (t = yield this.stripeService.confirmSetupWithoutRedirect(this.setupIntentClientSecret), !t) throw new Error("No response received from payment processor")
                    } catch (r) {
                        let d = "Payment verification failed. Please try again.";
                        r.type === "card_error" ? d = r.message || "Your card was declined. Please try a different payment method." : r.type === "validation_error" ? d = "Please check your payment details and try again." : r.type === "api_connection_error" ? d = "Network connection failed. Please check your internet connection and try again." : r.type === "rate_limit_error" ? d = "Too many requests. Please wait a moment and try again." : r.message && (d = r.message), this.wizardService.setError("stripe", d), this.toastr.error(d);
                        return
                    }
                    if (t.error) {
                        let r = this.getStripeErrorMessage(t.error);
                        this.toastr.error(r);
                        return
                    }
                    if (t.setupIntent ? .status === "succeeded") {
                        this.wizardService.setLoading("creatingSubscription", !0);
                        let r = t.setupIntent;
                        if (!r || !r.payment_method) throw new Error("Invalid setup intent response: missing payment method");
                        let d = r.payment_method;
                        if (typeof d != "string") throw new Error("Invalid payment method format received from Stripe");
                        let v = this.wizardService.currentState.setupIntentId;
                        if (!v || typeof v != "string") throw new Error("Setup intent ID not found in wizard state");
                        let Z = {
                            setupIntentId: v,
                            paymentMethodId: d
                        };
                        try {
                            let j = yield Ee(this.subscriptionService.completeSubscription(Z));
                            if (!j) throw new Error("No response received from subscription service");
                            if (!j.subscriptionId || !j.status) throw new Error("Invalid subscription response: missing required fields");
                            if (this.environmentService.isProduction || console.log("Subscription completion result:", {
                                    status: j.status,
                                    requiresAction: j.requiresAction,
                                    hasClientSecret: !!j.clientSecret,
                                    active: j.active
                                }), j.requiresAction && j.clientSecret) {
                                this.environmentService.isProduction || console.log("Additional authentication required, processing...");
                                try {
                                    let de = yield this.stripeService.confirmPaymentWithoutRedirect(j.clientSecret);
                                    if (!de) throw new Error("No response received from 3D Secure authentication");
                                    if (de.error) throw de.error.type === "card_error" ? new Error(de.error.message || "Your card does not support 3D Secure authentication") : de.error.code === "authentication_required" ? new Error("Additional authentication is required but could not be completed") : new Error(de.error.message || "Payment authentication failed")
                                } catch (de) {
                                    throw new Error(de.message || "Payment authentication failed. Please try a different payment method.")
                                }
                            }
                            this.wizardService.setLoading("processingPayment", !0), this.verifySubscriptionWithRetry().subscribe({
                                next: de => {
                                    this.wizardService.setLoading("processingPayment", !1), de ? this.toastr.success("Welcome to Qualtrim! Your account has been created successfully.", "Success!", {
                                        timeOut: 5e3
                                    }) : this.toastr.warning("Your subscription is processing. Please refresh the page if you experience any issues.", "Almost there!", {
                                        timeOut: 8e3,
                                        closeButton: !0
                                    }), this.paymentCompleted.emit()
                                },
                                error: de => {
                                    this.wizardService.setLoading("processingPayment", !1), console.error("Verification error:", de), this.toastr.warning("Your subscription is processing. Please refresh if needed.", "Processing", {
                                        timeOut: 8e3
                                    }), this.paymentCompleted.emit()
                                }
                            })
                        } catch (j) {
                            throw this.environmentService.isProduction || console.error("Subscription completion failed:", j), j ? .error ? .message ? new Error(j.error.message) : j ? .status === 0 ? new Error("Network connection failed. Please check your internet connection and try again.") : j ? .status >= 500 ? new Error("Our servers are temporarily unavailable. Please try again in a few moments.") : j ? .status === 401 ? new Error("Your session has expired. Please refresh the page and try again.") : new Error(j.message || "Failed to complete subscription setup. Please try again.")
                        }
                    } else throw new Error("Payment confirmation failed")
                } catch (e) {
                    this.environmentService.isProduction || console.error("Payment failed:", e);
                    let t = "Payment setup failed. Please try again.";
                    e.message ? t = e.message : e.code === "NETWORK_ERROR" ? t = "Network connection failed. Please check your internet connection and try again." : e.code === "TIMEOUT_ERROR" && (t = "The request timed out. Please try again."), this.wizardService.setError("payment", t), this.toastr.error(t)
                } finally {
                    this.wizardService.setLoading("processingPayment", !1), this.wizardService.setLoading("creatingSubscription", !1)
                }
            })
        }
        getStripeErrorMessage(e) {
            let t = {
                card_declined: "Your card was declined. Please try a different card.",
                incorrect_cvc: "The CVC code is incorrect. Please check and try again.",
                expired_card: "Your card has expired. Please use a different card.",
                insufficient_funds: "Your card has insufficient funds.",
                processing_error: "An error occurred while processing your card. Please try again.",
                incorrect_number: "The card number is incorrect. Please check and try again."
            };
            return e.code && t[e.code] ? t[e.code] : e.message || "Payment setup failed. Please try again or use a different payment method."
        }
        completeSubscriptionWithExistingPayment() {
            return Y(this, null, function*() {
                try {
                    this.wizardService.setLoading("creatingSubscription", !0);
                    let e = {
                            paymentMethodId: this.selectedPaymentMethodId,
                            useExistingPaymentMethod: !0,
                            setupIntentId: this.wizardService.currentState.setupIntentId ? ? void 0
                        },
                        t = yield Ee(this.subscriptionService.completeSubscription(e));
                    if (!t) throw new Error("No response received from subscription service");
                    if (!t.subscriptionId || !t.status) throw new Error("Invalid subscription response: missing required fields");
                    this.wizardService.setLoading("processingPayment", !0), this.verifySubscriptionWithRetry().subscribe({
                        next: r => {
                            this.wizardService.setLoading("processingPayment", !1), this.wizardService.setLoading("creatingSubscription", !1), r ? (this.toastr.success("Subscription activated successfully!"), this.paymentCompleted.emit()) : (this.toastr.warning("Subscription created but verification pending. Please check your subscription status."), this.paymentCompleted.emit())
                        },
                        error: r => {
                            this.wizardService.setLoading("processingPayment", !1), this.wizardService.setLoading("creatingSubscription", !1), this.toastr.warning("Subscription verification failed. Please check your subscription status."), this.paymentCompleted.emit()
                        }
                    })
                } catch (e) {
                    console.error("Failed to complete subscription with existing payment:", e);
                    let t = e.message || "Failed to activate subscription with saved payment method. Please try again.";
                    this.wizardService.setError("payment", t), this.toastr.error(t), this.wizardService.setLoading("creatingSubscription", !1), this.wizardService.setLoading("processingPayment", !1)
                }
            })
        }
        get selectedPlanDetails() {
            return this.selectedPlan ? this.pricingPlans[this.selectedPlan] : null
        }
        get hasPaymentError() {
            return !!this.errors.payment
        }
        get hasStripeError() {
            return !!this.errors.stripe
        }
        get isProcessing() {
            return this.loading.processingPayment || this.loading.creatingSubscription
        }
        get canSubmit() {
            return this.paymentForm.valid && this.paymentElementMounted && !this.isProcessing && !this.isPaymentElementLoading && !this.hasStripeError
        }
        navigateToSubscriptionManagement() {
            this.router.navigate(["/app/subscription"], {
                queryParams: {
                    source: "registration-error"
                }
            })
        }
        get hasSavedPaymentMethods() {
            return this.existingPaymentMethods.length > 0
        }
        get hasValidPaymentMethods() {
            return this.existingPaymentMethods.some(e => !this.isPaymentMethodExpired(e))
        }
        get visiblePaymentMethods() {
            return this.showAllPaymentMethods || this.existingPaymentMethods.length <= this.MAX_VISIBLE_PAYMENT_METHODS ? this.existingPaymentMethods : this.existingPaymentMethods.slice(0, this.MAX_VISIBLE_PAYMENT_METHODS)
        }
        get hasMorePaymentMethods() {
            return !this.showAllPaymentMethods && this.existingPaymentMethods.length > this.MAX_VISIBLE_PAYMENT_METHODS
        }
        toggleShowAllPaymentMethods() {
            this.showAllPaymentMethods = !this.showAllPaymentMethods
        }
        isPaymentMethodExpired(e) {
            if (!e.card) return !1;
            let t = new Date,
                r = t.getFullYear(),
                d = t.getMonth() + 1,
                v = e.card.expYear,
                Z = e.card.expMonth;
            return v < r || v === r && Z < d
        }
        isPaymentMethodExpiringSoon(e) {
            if (!e.card || this.isPaymentMethodExpired(e)) return !1;
            let t = new Date,
                r = e.card.expYear,
                d = e.card.expMonth,
                v = new Date(r, d, 0);
            return Math.ceil((v.getTime() - t.getTime()) / (1e3 * 60 * 60 * 24)) <= 60
        }
        selectPaymentMethod(e) {
            this.selectedPaymentMethodId = e, this.useExistingPaymentMethod = !0, this.wizardService.setError("stripe", null)
        }
        selectNewPaymentMethod() {
            this.selectedPaymentMethodId = null, this.useExistingPaymentMethod = !1, this.setupIntentClientSecret && !this.paymentElementMounted && setTimeout(() => this.initializeStripeElements(), 100)
        }
        getCardBrandDisplay(e) {
            return {
                visa: "Visa",
                mastercard: "Mastercard",
                amex: "American Express",
                discover: "Discover",
                diners: "Diners Club",
                jcb: "JCB",
                unionpay: "UnionPay"
            }[e.toLowerCase()] || e
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(x(se), x(bt), x(_e), x(St), x(Ce), x(le), x(He), x($))
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-payment-step"]
        ],
        viewQuery: function(t, r) {
            if (t & 1 && nt(uo, 5), t & 2) {
                let d;
                rt(d = ot()) && (r.paymentElementRef = d.first)
            }
        },
        inputs: {
            alwaysDarkMode: "alwaysDarkMode",
            selectedPlan: "selectedPlan",
            pricingPlans: "pricingPlans",
            setupIntentClientSecret: "setupIntentClientSecret",
            errors: "errors",
            loading: "loading",
            existingPaymentMethods: "existingPaymentMethods",
            isLoadingPaymentMethods: "isLoadingPaymentMethods"
        },
        outputs: {
            paymentCompleted: "paymentCompleted"
        },
        decls: 24,
        vars: 22,
        consts: [
            ["paymentElement", ""],
            [1, "max-w-lg", "mx-auto"],
            [1, "rounded-lg", "p-6", "mb-6", 3, "ngClass"],
            [1, "text-lg", "font-semibold", "text-white", "mb-4"],
            [1, "mb-6"],
            [1, "flex", "items-center", "justify-center", "p-8", "mb-6"],
            [1, "mb-8"],
            [1, "space-y-6", 3, "ngSubmit", "formGroup"],
            [1, "flex", "items-start"],
            ["type", "checkbox", "formControlName", "agreeToTerms", 1, "mt-1", "mr-3", "h-4", "w-4", "text-blue-600", "focus:ring-blue-500", "border-gray-300", "rounded"],
            [1, "text-sm", 3, "ngClass"],
            ["target", "_blank", 1, "text-blue-600", "hover:underline", 3, "routerLink"],
            [1, "text-sm", "text-red-600"],
            [1, "flex", "items-center", "justify-center", "space-x-2", 3, "ngClass"],
            ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-5", "h-5"],
            ["fill-rule", "evenodd", "d", "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", "clip-rule", "evenodd"],
            [1, "text-sm"],
            ["type", "submit", 2, "display", "none"],
            [1, "flex", "justify-between", "items-center", "mb-2"],
            [3, "ngClass"],
            [1, "font-semibold", 3, "ngClass"],
            [1, "border-2", "border-yellow-600", "rounded-lg", "p-6", "bg-yellow-900/20"],
            ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-6", "h-6", "text-yellow-400", "mr-3", "flex-shrink-0"],
            ["fill-rule", "evenodd", "d", "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", "clip-rule", "evenodd"],
            [1, "flex-1"],
            [1, "text-lg", "font-semibold", "text-yellow-400", "mb-2"],
            [1, "text-yellow-100", "mb-4"],
            [1, "px-6", "py-3", "bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white", "rounded-xl", "font-semibold", "hover:from-blue-700", "hover:to-blue-900", "transition-all", "duration-300", 3, "click"],
            [1, "border-2", "border-red-600", "rounded-lg", "p-4", "bg-red-900/20"],
            [1, "flex", "items-center"],
            ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-5", "h-5", "text-red-400", "mr-2"],
            ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", "clip-rule", "evenodd"],
            [1, "text-red-400", "text-sm"],
            [1, "animate-spin", "rounded-full", "h-8", "w-8", "border-b-2", "border-blue-600", "dark:border-blue-400"],
            [1, "ml-4", "text-gray-600", 3, "ngClass"],
            [1, "text-lg", "font-semibold", "text-gray-900", "mb-4", 3, "ngClass"],
            [1, "flex", "flex-col", "gap-4", "mb-6"],
            [1, "flex", "items-center", "p-4", "rounded-3xl", "border-2", "transition-all", "duration-200", 3, "ngClass"],
            ["type", "button", 1, "text-sm", "font-medium", "py-2", "transition-colors", "duration-200", "flex", "items-center", "justify-center", "gap-2", 3, "ngClass"],
            [1, "flex", "items-center", "p-4", "rounded-3xl", "border-2", "cursor-pointer", "transition-all", "duration-200", 3, "ngClass"],
            ["type", "radio", 1, "w-4", "h-4", "text-blue-600", "focus:ring-2", "focus:ring-blue-500", "dark:focus:ring-blue-400", "dark:bg-gray-700", "dark:border-gray-600", 3, "change", "checked"],
            [1, "ml-4", "font-medium", "text-gray-900", 3, "ngClass"],
            ["type", "radio", 1, "w-4", "h-4", "text-blue-600", "focus:ring-2", "focus:ring-blue-500", "dark:focus:ring-blue-400", "dark:bg-gray-700", "dark:border-gray-600", 3, "change", "value", "checked", "disabled"],
            [1, "ml-4", "flex-1"],
            [1, "flex", "items-center", "gap-4"],
            [1, "text-2xl"],
            ["viewBox", "0 0 48 32", "fill", "none", 1, "w-10", "h-6"],
            [1, "font-medium", "text-gray-900", 3, "ngClass"],
            [1, "text-sm", "text-gray-600", 3, "ngClass"],
            [1, "flex", "gap-2"],
            [1, "px-3", "py-1", "text-xs", "font-semibold", "rounded-full", "bg-red-100", "text-red-800", "dark:bg-red-900", "dark:text-red-200"],
            [1, "px-3", "py-1", "text-xs", "font-semibold", "rounded-full", "bg-yellow-100", "text-yellow-800", "dark:bg-yellow-900", "dark:text-yellow-200"],
            ["width", "48", "height", "32", "rx", "4", "fill", "#1434CB"],
            ["d", "M19.5 10L17.2 22h-2.4l2.3-12h2.4zm8.3 7.8l1.3-3.5.7 3.5h-2zm2.7 4.2h2.2l-1.9-12h-2c-.4 0-.8.3-.9.6l-3.3 11.4h2.5l.5-1.4h3l.3 1.4zm-5.8-3.9c0-3.2-4.4-3.3-4.4-4.7 0-.4.4-.9 1.3-.9 1.1-.1 1.9.2 2.4.5l.4-2c-.6-.2-1.5-.4-2.5-.4-2.6 0-4.5 1.4-4.5 3.4 0 1.5 1.3 2.3 2.3 2.8 1 .5 1.4.8 1.4 1.2 0 .7-.8 1-1.6 1-.9 0-1.8-.2-2.6-.7l-.5 2.1c.6.3 1.7.5 2.8.5 2.8.1 4.6-1.3 4.6-3.3z", "fill", "white"],
            ["width", "48", "height", "32", "rx", "4", "fill", "#EB001B"],
            ["cx", "18", "cy", "16", "r", "9", "fill", "#FF5F00"],
            ["cx", "30", "cy", "16", "r", "9", "fill", "#F79E1B"],
            ["width", "48", "height", "32", "rx", "4", "fill", "#006FCF"],
            ["width", "48", "height", "32", "rx", "4", "fill", "#8B8B8B"],
            ["type", "button", 1, "text-sm", "font-medium", "py-2", "transition-colors", "duration-200", "flex", "items-center", "justify-center", "gap-2", 3, "click", "ngClass"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 15l7-7 7 7"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"],
            [1, "block", "text-sm", "font-medium", "mb-2", 3, "ngClass"],
            [1, "rounded-lg", "p-8", "bg-gray-800", "flex", "flex-col", "items-center", "justify-center"],
            [1, "rounded-lg", "p-6", "bg-gray-800", "flex", "items-center", "justify-center"],
            [1, "border-red-600", "rounded-lg", "p-4", "bg-red-900/20"],
            [1, "animate-spin", "rounded-full", "h-8", "w-8", "border-b-2", "border-blue-600", "mb-4"],
            [1, "font-medium", 3, "ngClass"],
            [1, "text-sm", "mt-2", 3, "ngClass"],
            [1, "animate-spin", "rounded-full", "h-6", "w-6", "border-b-2", "border-blue-600"],
            [1, "ml-2", 3, "ngClass"],
            ["id", "payment-element", 1, "rounded-lg", "p-4", "min-h-[120px]", 3, "ngClass"],
            [1, "mt-2", "text-sm", "dark:text-gray-400"]
        ],
        template: function(t, r) {
            if (t & 1 && (a(0, "div", 1)(1, "div", 2)(2, "h3", 3), l(3, "Order Summary"), s(), p(4, yo, 7, 16), s(), p(5, So, 12, 0, "div", 4), p(6, Co, 7, 1, "div", 4), p(7, _o, 4, 4, "div", 5), p(8, Lo, 11, 14, "div", 6), a(9, "form", 7), N("ngSubmit", function() {
                    return r.onSubmitPayment()
                }), p(10, jo, 7, 5, "div"), a(11, "div", 8), f(12, "input", 9), a(13, "label", 10), l(14, " I agree to the "), a(15, "a", 11), l(16, "Terms of Service"), s()()(), p(17, zo, 2, 0, "p", 12), a(18, "div", 13), b(), a(19, "svg", 14), f(20, "path", 15), s(), y(), a(21, "span", 16), l(22, "Secured by Stripe"), s()(), f(23, "button", 17), s()()), t & 2) {
                let d;
                c(), S("ngClass", K(12, $i, r.alwaysDarkMode, !r.alwaysDarkMode)), c(3), h(r.selectedPlan && r.selectedPlanDetails ? 4 : -1), c(), h(r.showSubscriptionIntentError ? 5 : -1), c(), h(r.hasPaymentError && !r.showSubscriptionIntentError ? 6 : -1), c(), h(r.isLoadingPaymentMethods ? 7 : -1), c(), h(r.hasSavedPaymentMethods && !r.isLoadingPaymentMethods ? 8 : -1), c(), S("formGroup", r.paymentForm), c(), h(!r.hasSavedPaymentMethods || !r.useExistingPaymentMethod ? 10 : -1), c(3), S("ngClass", K(15, De, r.alwaysDarkMode, !r.alwaysDarkMode)), c(2), S("routerLink", at(18, po)), c(2), h((d = r.paymentForm.get("agreeToTerms")) != null && d.invalid && ((d = r.paymentForm.get("agreeToTerms")) != null && d.touched) ? 17 : -1), c(), S("ngClass", K(19, De, r.alwaysDarkMode, !r.alwaysDarkMode))
            }
        },
        dependencies: [T, Fe, oe, fe, ct, pe, he, ge, ve, te, ae],
        styles: ["[_nghost-%COMP%]{display:block}#payment-element[_ngcontent-%COMP%]{transition:all .3s ease}.animate-spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin 1s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}form[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeInUp .5s ease-out}@keyframes _ngcontent-%COMP%_fadeInUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.bg-gray-800[_ngcontent-%COMP%]{transition:all .3s ease}.bg-gray-800[_ngcontent-%COMP%]:hover{background-color:#1f2937e6;transform:translateY(-1px)}input[type=checkbox][_ngcontent-%COMP%]{transition:all .2s ease}input[type=checkbox][_ngcontent-%COMP%]:checked{background-color:#2563eb;border-color:#2563eb}a.text-blue-600[_ngcontent-%COMP%]:hover{color:#3b82f6;text-decoration:underline}.border-red-600[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_shake .5s ease-in-out}@keyframes _ngcontent-%COMP%_shake{0%,to{transform:translate(0)}10%,30%,50%,70%,90%{transform:translate(-2px)}20%,40%,60%,80%{transform:translate(2px)}}"]
    });
    let i = n;
    return i
})();

function Bo(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "button", 2), ee("click", function() {
            C(o);
            let t = m();
            return _(t.connect())
        }), b(), u(1, "svg", 3), B(2, "path", 4), g(), y(), u(3, "span"), l(4), g()()
    }
    if (i & 2) {
        let o = m();
        we("disabled", o.isLoading()), c(4), W(o.isLoading() ? "Connecting..." : "Connect Discord")
    }
}

function Uo(i, n) {
    if (i & 1 && B(0, "img", 7), i & 2) {
        let o = m(2);
        we("src", o.discordAvatar(), Bt)("alt", o.displayName() + " avatar")
    }
}

function Go(i, n) {
    i & 1 && (b(), u(0, "svg", 8), B(1, "path", 15), g())
}

function qo(i, n) {
    if (i & 1) {
        let o = A();
        u(0, "div", 1)(1, "div", 5)(2, "div", 6), p(3, Uo, 1, 2, "img", 7)(4, Go, 2, 0, ":svg:svg", 8), g(), u(5, "div")(6, "div", 9)(7, "span", 10), l(8, "Discord Connected"), g(), b(), u(9, "svg", 11), B(10, "path", 12), g()(), y(), u(11, "span", 13), l(12), g()()(), u(13, "button", 14), ee("click", function() {
            C(o);
            let t = m();
            return _(t.disconnect())
        }), l(14), g()()
    }
    if (i & 2) {
        let o = m();
        c(3), h(o.discordAvatar() ? 3 : 4), c(9), W(o.displayName()), c(), we("disabled", o.isLoading()), c(), M(" ", o.isLoading() ? "Disconnecting..." : "Disconnect", " ")
    }
}
var J0 = (() => {
    let n = class n {
        constructor() {
            this.discordService = Re(pi), this.isConnected = this.discordService.isConnected, this.discordUsername = this.discordService.discordUsername, this.discordAvatar = this.discordService.discordAvatar, this.displayName = this.discordService.displayName, this.isLoading = P(!1)
        }
        connect() {
            this.isLoading.set(!0), this.discordService.initiateOAuth()
        }
        disconnect() {
            this.isLoading.set(!0), this.discordService.disconnect().subscribe({
                next: () => {
                    this.isLoading.set(!1)
                },
                error: e => {
                    console.error("Failed to disconnect Discord:", e), this.isLoading.set(!1)
                }
            })
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)
    }, n.\u0275cmp = k({
        type: n,
        selectors: [
            ["qualtrim-discord-connection-button"]
        ],
        decls: 2,
        vars: 1,
        consts: [
            ["aria-label", "Connect Discord account", 1, "w-full", "flex", "items-center", "justify-center", "gap-3", "px-6", "py-3", "bg-[#5865F2]", "hover:bg-[#4752C4]", "text-white", "rounded-xl", "font-semibold", "transition-all", "duration-300", "shadow-lg", "hover:shadow-xl", "focus:outline-none", "focus:ring-2", "focus:ring-[#5865F2]", "focus:ring-offset-2", "dark:ring-offset-gray-900", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "disabled"],
            [1, "flex", "items-center", "justify-between", "p-6", "bg-white", "dark:bg-gray-800", "border", "border-gray-200", "dark:border-gray-700", "rounded-xl", "shadow-lg"],
            ["aria-label", "Connect Discord account", 1, "w-full", "flex", "items-center", "justify-center", "gap-3", "px-6", "py-3", "bg-[#5865F2]", "hover:bg-[#4752C4]", "text-white", "rounded-xl", "font-semibold", "transition-all", "duration-300", "shadow-lg", "hover:shadow-xl", "focus:outline-none", "focus:ring-2", "focus:ring-[#5865F2]", "focus:ring-offset-2", "dark:ring-offset-gray-900", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"],
            ["viewBox", "0 0 71 55", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 1, "w-6", "h-6"],
            ["d", "M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z", "fill", "currentColor"],
            [1, "flex", "items-center", "gap-4"],
            [1, "flex", "items-center", "justify-center", "w-12", "h-12", "bg-[#5865F2]", "rounded-lg"],
            [1, "w-12", "h-12", "rounded-lg", 3, "src", "alt"],
            ["viewBox", "0 0 71 55", "fill", "currentColor", 1, "w-7", "h-7", "text-white"],
            [1, "flex", "items-center", "gap-2"],
            [1, "text-base", "font-semibold", "text-gray-900", "dark:text-white"],
            ["fill", "currentColor", "viewBox", "0 0 20 20", "aria-hidden", "true", 1, "w-5", "h-5", "text-green-500"],
            ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", "clip-rule", "evenodd"],
            [1, "text-sm", "text-gray-600", "dark:text-gray-400"],
            ["aria-label", "Disconnect Discord account", 1, "px-4", "py-2", "text-sm", "font-medium", "text-red-600", "dark:text-red-400", "hover:bg-red-50", "dark:hover:bg-red-900/20", "rounded-lg", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", "focus:outline-none", "focus:ring-2", "focus:ring-red-500", "focus:ring-offset-2", "dark:ring-offset-gray-800", 3, "click", "disabled"],
            ["d", "M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"]
        ],
        template: function(t, r) {
            t & 1 && p(0, Bo, 5, 2, "button", 0)(1, qo, 15, 4, "div", 1), t & 2 && h(r.isConnected() ? 1 : 0)
        },
        dependencies: [T],
        encapsulation: 2
    });
    let i = n;
    return i
})();
export {
    X as a, _e as b, le as c, bt as d, pi as e, Ye as f, H as g, yt as h, ze as i, Vt as j, an as k, sn as l, St as m, fi as n, bi as o, xi as p, Ei as q, We as r, Ti as s, Cm as t, Fm as u, zm as v, Gm as w, Ym as x, b0 as y, U0 as z, J0 as A
};