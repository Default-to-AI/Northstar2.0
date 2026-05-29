import {
    $a as Ze,
    Kc as rt,
    Lc as at,
    Ya as Ke,
    Za as Je,
    ab as et,
    bb as tt,
    cb as nt,
    ed as lt,
    fb as ae,
    gb as it,
    kc as ot,
    vd as st
} from "./chunk-NO4XYT7V.js";
import {
    a as Ye,
    b as We,
    c as J,
    g as Z,
    h as ee,
    k as te,
    l as Xe,
    o as ne,
    p as ie,
    x as oe,
    z as re
} from "./chunk-6FMDYVJO.js";
import {
    a as ct
} from "./chunk-YSSGUHYD.js";
import {
    D as he,
    c as pe,
    i as f
} from "./chunk-SUZ3XW2S.js";
import {
    $b as g,
    $c as D,
    Aa as v,
    Ac as Oe,
    Ba as E,
    C as ke,
    Ca as U,
    Cb as $,
    Cc as de,
    Dc as c,
    Ec as H,
    Fc as S,
    Hb as Y,
    Ia as x,
    Id as Ge,
    Ka as De,
    M as O,
    Na as Ve,
    Od as He,
    Pd as Qe,
    Q as ve,
    Rc as Be,
    S as Ce,
    Sb as W,
    Ub as p,
    Uc as X,
    V as we,
    Vb as Le,
    Vc as me,
    Wb as h,
    Wc as Pe,
    Xd as R,
    Y as B,
    Zb as z,
    _b as j,
    ac as l,
    ad as V,
    bc as a,
    be as Ue,
    c as ye,
    cc as u,
    da as P,
    dd as ue,
    ee as qe,
    f as Q,
    g as F,
    ga as Te,
    gd as K,
    ha as M,
    ic as ce,
    ja as Me,
    jb as se,
    jc as I,
    kb as s,
    ld as ze,
    nc as y,
    p as A,
    pa as Ee,
    pb as q,
    pc as m,
    pd as je,
    ta as Ie,
    tc as Ne,
    ua as C,
    uc as Fe,
    vc as Ae,
    w as be,
    wc as $e,
    xc as Re,
    yc as G,
    za as k
} from "./chunk-7LZCJGQ2.js";
import {
    e as _e,
    f as Se
} from "./chunk-TXK3PDXI.js";
var ft = _e(w => {
    "use strict";
    Object.defineProperty(w, "__esModule", {
        value: !0
    });
    var dt = "fas",
        mt = "magnifying-glass",
        ut = 512,
        pt = 512,
        fe = [128269, "search"],
        ht = "f002",
        gt = "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z";
    w.definition = {
        prefix: dt,
        iconName: mt,
        icon: [ut, pt, fe, ht, gt]
    };
    w.faMagnifyingGlass = w.definition;
    w.prefix = dt;
    w.iconName = mt;
    w.width = ut;
    w.height = pt;
    w.ligatures = fe;
    w.unicode = ht;
    w.svgPathData = gt;
    w.aliases = fe
});
var vt = _e(T => {
    "use strict";
    Object.defineProperty(T, "__esModule", {
        value: !0
    });
    var xt = "fas",
        _t = "sliders",
        St = 512,
        yt = 512,
        xe = ["sliders-h"],
        bt = "f1de",
        kt = "M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z";
    T.definition = {
        prefix: xt,
        iconName: _t,
        icon: [St, yt, xe, bt, kt]
    };
    T.faSliders = T.definition;
    T.prefix = xt;
    T.iconName = _t;
    T.width = St;
    T.height = yt;
    T.ligatures = xe;
    T.unicode = bt;
    T.svgPathData = kt;
    T.aliases = xe
});
var le = (() => {
    let r = class r {
        constructor(e) {
            this._http = e
        }
        search(e, t) {
            return this._http.get("/api/stocks/search", {
                params: {
                    exchange: t,
                    query: e
                }
            })
        }
        searchV2(e) {
            return this._http.get("/api/stocks/search-v2", {
                params: {
                    query: e
                }
            })
        }
        getStock(e) {
            return this._http.get(`/api/stocks/${e}`)
        }
        getStocks(e) {
            return !e || e.length === 0 ? new ye(t => {
                t.next([]), t.complete()
            }) : this._http.get("/api/stocks/batch", {
                params: {
                    symbols: e.join(",")
                }
            })
        }
        screen(e) {
            let t = new Ue;
            return Object.entries(e).forEach(([i, d]) => {
                d != null && d !== "" && (t = t.set(i, String(d)))
            }), this._http.get("/api/stocks/screener", {
                params: t
            })
        }
        getRelatedStocks(e) {
            return this._http.get("/api/stocks/related", {
                params: {
                    symbols: e.join(",")
                }
            })
        }
        getAvailableIndustries() {
            return this._http.get("/api/stocks/industries")
        }
        getAvailableSectors() {
            return this._http.get("/api/stocks/sectors")
        }
        getAvailableExchanges() {
            return this._http.get("/api/stocks/exchanges")
        }
        getAvailableCountries() {
            return this._http.get("/api/stocks/countries")
        }
    };
    r.\u0275fac = function(t) {
        return new(t || r)(Ie(qe))
    }, r.\u0275prov = Ee({
        token: r,
        factory: r.\u0275fac,
        providedIn: "root"
    });
    let n = r;
    return n
})();
var Mt = Se(ft()),
    Et = Se(vt());
var Lt = (n, r) => r.symbol;

function Nt(n, r) {
    n & 1 && (l(0, "span", 32), E(), l(1, "svg", 35), u(2, "circle", 36)(3, "path", 37), a(), c(4, " Searching... "), a())
}

function Ft(n, r) {
    n & 1 && c(0, " Search ")
}

function At(n, r) {
    if (n & 1 && (l(0, "div", 34)(1, "p", 38), c(2), a()()), n & 2) {
        let o = m();
        s(2), H(o.error())
    }
}

function $t(n, r) {
    if (n & 1) {
        let o = I();
        l(0, "tr", 48), y("click", function() {
            let t = k(o).$implicit,
                i = m(3);
            return v(i.selectStock(t))
        }), l(1, "td", 49)(2, "div", 50), u(3, "qualtrim-company-logo", 51), l(4, "div", 52)(5, "span", 53), c(6), a(), l(7, "span", 54), c(8), a()()()(), l(9, "td", 55), c(10), a(), l(11, "td", 56), c(12), a(), l(13, "td", 57), c(14), a()()
    }
    if (n & 2) {
        let o = r.$implicit,
            e = m(3);
        s(3), g("symbol", o.symbol)("size", "sm"), s(3), S(" ", o.symbol, " "), s(2), S(" ", o.companyName, " "), s(2), S(" ", o.sector, " "), s(2), S(" ", e.formatPrice(o.price), " "), s(2), S(" ", e.formatMarketCap(o.marketCap), " ")
    }
}

function Rt(n, r) {
    if (n & 1 && (l(0, "div", 40)(1, "table", 41)(2, "thead", 42)(3, "tr")(4, "th", 43), c(5, " Company "), a(), l(6, "th", 43), c(7, " Sector "), a(), l(8, "th", 44), c(9, " Price "), a(), l(10, "th", 44), c(11, " Market Cap "), a()()(), l(12, "tbody", 45), z(13, $t, 15, 7, "tr", 46, Lt), a()()(), l(15, "p", 47), c(16), a()), n & 2) {
        let o = m(2);
        s(13), j(o.results()), s(3), S(" Showing ", o.results().length, " results ")
    }
}

function Ot(n, r) {
    n & 1 && (l(0, "div", 39)(1, "p", 58), c(2, " No stocks found matching your criteria. "), a()())
}

function Bt(n, r) {
    if (n & 1 && p(0, Rt, 17, 1)(1, Ot, 3, 0, "div", 39), n & 2) {
        let o = m();
        h(o.results().length > 0 ? 0 : 1)
    }
}
var Ct = (() => {
    let r = class r {
        constructor() {
            this._stocks = C(le), this._fb = C(oe), this._destroy$ = new Q, this.stockSelected = new q, this.sectors = x([]), this.industries = x([]), this.exchanges = x([]), this.countries = x([]), this.results = x([]), this.isLoading = x(!1), this.isLoadingDropdowns = x(!1), this.error = x(null), this.hasSearched = x(!1)
        }
        ngOnInit() {
            this.initForm(), this.loadDropdownData()
        }
        loadDropdownData() {
            this.isLoadingDropdowns.set(!0), ke({
                industries: this._stocks.getAvailableIndustries(),
                sectors: this._stocks.getAvailableSectors(),
                exchanges: this._stocks.getAvailableExchanges(),
                countries: this._stocks.getAvailableCountries()
            }).pipe(M(this._destroy$), B(() => this.isLoadingDropdowns.set(!1))).subscribe({
                next: ({
                    industries: e,
                    sectors: t,
                    exchanges: i,
                    countries: d
                }) => {
                    this.industries.set(this.normalizeToStrings(e).sort()), this.sectors.set(this.normalizeToStrings(t).sort()), this.exchanges.set(this.normalizeToStrings(i).sort()), this.countries.set(d)
                },
                error: () => {}
            })
        }
        ngOnDestroy() {
            this._destroy$.next(), this._destroy$.complete()
        }
        normalizeToStrings(e) {
            if (!e || e.length === 0) return [];
            if (typeof e[0] == "string") return e;
            let t = e[0],
                i = ["name", "value", "label", "industry", "sector", "exchange"];
            for (let d of i)
                if (d in t && typeof t[d] == "string") return e.map(_ => _[d]);
            return e.map(d => String(d))
        }
        initForm() {
            this.filterForm = this._fb.group({
                sector: [null],
                industry: [null],
                exchange: [null],
                country: [null],
                marketCapMoreThan: [null],
                marketCapLowerThan: [null],
                priceMoreThan: [null],
                priceLowerThan: [null],
                betaMoreThan: [null],
                betaLowerThan: [null],
                volumeMoreThan: [null],
                volumeLowerThan: [null],
                dividendMoreThan: [null],
                dividendLowerThan: [null],
                isActivelyTrading: [!0],
                isEtf: [!1],
                isFund: [!1]
            })
        }
        search() {
            this.isLoading.set(!0), this.error.set(null), this.hasSearched.set(!0);
            let e = this.buildParams();
            this._stocks.screen(e).pipe(M(this._destroy$), B(() => this.isLoading.set(!1))).subscribe({
                next: t => {
                    this.results.set(t)
                },
                error: () => {
                    this.error.set("Failed to search stocks. Please try again."), this.results.set([])
                }
            })
        }
        reset() {
            this.filterForm.reset({
                sector: null,
                industry: null,
                exchange: null,
                country: null,
                marketCapMoreThan: null,
                marketCapLowerThan: null,
                priceMoreThan: null,
                priceLowerThan: null,
                betaMoreThan: null,
                betaLowerThan: null,
                volumeMoreThan: null,
                volumeLowerThan: null,
                dividendMoreThan: null,
                dividendLowerThan: null,
                isActivelyTrading: !0,
                isEtf: !1,
                isFund: !1
            }), this.results.set([]), this.error.set(null), this.hasSearched.set(!1)
        }
        selectStock(e) {
            let t = {
                symbol: e.symbol,
                exchange: e.exchangeShortName || f.NYSEAndNASDAQ
            };
            this.stockSelected.emit(t)
        }
        formatMarketCap(e) {
            return e >= 1e12 ? `$${(e/1e12).toFixed(2)}T` : e >= 1e9 ? `$${(e/1e9).toFixed(2)}B` : e >= 1e6 ? `$${(e/1e6).toFixed(2)}M` : `$${e.toLocaleString()}`
        }
        formatPrice(e) {
            return `$${e.toFixed(2)}`
        }
        buildParams() {
            let e = this.filterForm.value,
                t = {
                    limit: 50
                };
            return e.sector && (t.sector = e.sector), e.industry && (t.industry = e.industry), e.exchange && (t.exchange = e.exchange), e.country && (t.country = e.country), e.marketCapMoreThan !== null && e.marketCapMoreThan !== "" && (t.marketCapMoreThan = Number(e.marketCapMoreThan)), e.marketCapLowerThan !== null && e.marketCapLowerThan !== "" && (t.marketCapLowerThan = Number(e.marketCapLowerThan)), e.priceMoreThan !== null && e.priceMoreThan !== "" && (t.priceMoreThan = Number(e.priceMoreThan)), e.priceLowerThan !== null && e.priceLowerThan !== "" && (t.priceLowerThan = Number(e.priceLowerThan)), e.betaMoreThan !== null && e.betaMoreThan !== "" && (t.betaMoreThan = Number(e.betaMoreThan)), e.betaLowerThan !== null && e.betaLowerThan !== "" && (t.betaLowerThan = Number(e.betaLowerThan)), e.volumeMoreThan !== null && e.volumeMoreThan !== "" && (t.volumeMoreThan = Number(e.volumeMoreThan)), e.volumeLowerThan !== null && e.volumeLowerThan !== "" && (t.volumeLowerThan = Number(e.volumeLowerThan)), e.dividendMoreThan !== null && e.dividendMoreThan !== "" && (t.dividendMoreThan = Number(e.dividendMoreThan)), e.dividendLowerThan !== null && e.dividendLowerThan !== "" && (t.dividendLowerThan = Number(e.dividendLowerThan)), e.isActivelyTrading === !0 && (t.isActivelyTrading = !0), e.isEtf === !1 && (t.isEtf = !1), e.isFund === !1 && (t.isFund = !1), t
        }
    };
    r.\u0275fac = function(t) {
        return new(t || r)
    }, r.\u0275cmp = $({
        type: r,
        selectors: [
            ["qualtrim-stock-screener"]
        ],
        outputs: {
            stockSelected: "stockSelected"
        },
        decls: 68,
        vars: 17,
        consts: [
            [1, "flex", "flex-col", "gap-6"],
            [1, "flex", "flex-col", "gap-4", 3, "ngSubmit", "formGroup"],
            [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"],
            [1, "flex", "flex-col", "gap-1"],
            ["for", "sector", 1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            ["id", "sector", "formControlName", "sector", "placeholder", "All Sectors", 1, "screener-select", 3, "items", "clearable", "searchable"],
            ["for", "industry", 1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            ["id", "industry", "formControlName", "industry", "placeholder", "All Industries", 1, "screener-select", 3, "items", "clearable", "searchable"],
            ["for", "exchange", 1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            ["id", "exchange", "formControlName", "exchange", "placeholder", "All Exchanges", 1, "screener-select", 3, "items", "clearable", "searchable"],
            ["for", "country", 1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            ["id", "country", "formControlName", "country", "bindLabel", "name", "bindValue", "code", "placeholder", "All Countries", 1, "screener-select", 3, "items", "clearable", "searchable"],
            ["for", "marketCapMoreThan", 1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            ["id", "marketCapMoreThan", "type", "number", "formControlName", "marketCapMoreThan", "placeholder", "e.g., 1000000000", 1, "w-full", "px-3", "py-2", "rounded-xl", "border", "border-gray-300", "dark:border-gray-600", "bg-white", "dark:bg-gray-800", "text-gray-900", "dark:text-white", "placeholder-gray-400", "dark:placeholder-gray-500", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500"],
            ["for", "marketCapLowerThan", 1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            ["id", "marketCapLowerThan", "type", "number", "formControlName", "marketCapLowerThan", "placeholder", "e.g., 100000000000", 1, "w-full", "px-3", "py-2", "rounded-xl", "border", "border-gray-300", "dark:border-gray-600", "bg-white", "dark:bg-gray-800", "text-gray-900", "dark:text-white", "placeholder-gray-400", "dark:placeholder-gray-500", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500"],
            ["for", "priceMoreThan", 1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            ["id", "priceMoreThan", "type", "number", "formControlName", "priceMoreThan", "placeholder", "e.g., 10", 1, "w-full", "px-3", "py-2", "rounded-xl", "border", "border-gray-300", "dark:border-gray-600", "bg-white", "dark:bg-gray-800", "text-gray-900", "dark:text-white", "placeholder-gray-400", "dark:placeholder-gray-500", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500"],
            ["for", "priceLowerThan", 1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            ["id", "priceLowerThan", "type", "number", "formControlName", "priceLowerThan", "placeholder", "e.g., 500", 1, "w-full", "px-3", "py-2", "rounded-xl", "border", "border-gray-300", "dark:border-gray-600", "bg-white", "dark:bg-gray-800", "text-gray-900", "dark:text-white", "placeholder-gray-400", "dark:placeholder-gray-500", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500"],
            ["for", "betaMoreThan", 1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            ["id", "betaMoreThan", "type", "number", "step", "0.1", "formControlName", "betaMoreThan", "placeholder", "e.g., 0.5", 1, "w-full", "px-3", "py-2", "rounded-xl", "border", "border-gray-300", "dark:border-gray-600", "bg-white", "dark:bg-gray-800", "text-gray-900", "dark:text-white", "placeholder-gray-400", "dark:placeholder-gray-500", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500"],
            ["for", "betaLowerThan", 1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            ["id", "betaLowerThan", "type", "number", "step", "0.1", "formControlName", "betaLowerThan", "placeholder", "e.g., 1.5", 1, "w-full", "px-3", "py-2", "rounded-xl", "border", "border-gray-300", "dark:border-gray-600", "bg-white", "dark:bg-gray-800", "text-gray-900", "dark:text-white", "placeholder-gray-400", "dark:placeholder-gray-500", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500"],
            [1, "flex", "flex-wrap", "gap-6"],
            [1, "flex", "items-center", "gap-2", "cursor-pointer"],
            ["type", "checkbox", "formControlName", "isActivelyTrading", 1, "w-4", "h-4", "rounded", "border-gray-300", "dark:border-gray-600", "text-blue-600", "focus:ring-blue-500"],
            [1, "text-sm", "text-gray-700", "dark:text-gray-300"],
            ["type", "checkbox", "formControlName", "isEtf", 1, "w-4", "h-4", "rounded", "border-gray-300", "dark:border-gray-600", "text-blue-600", "focus:ring-blue-500"],
            ["type", "checkbox", "formControlName", "isFund", 1, "w-4", "h-4", "rounded", "border-gray-300", "dark:border-gray-600", "text-blue-600", "focus:ring-blue-500"],
            [1, "flex", "gap-4"],
            ["type", "submit", 1, "px-6", "py-2", "rounded-xl", "bg-blue-600", "hover:bg-blue-700", "text-white", "font-medium", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "disabled"],
            [1, "flex", "items-center", "gap-2"],
            ["type", "button", 1, "px-6", "py-2", "rounded-xl", "border", "border-gray-300", "dark:border-gray-600", "text-gray-700", "dark:text-gray-300", "hover:bg-gray-50", "dark:hover:bg-gray-800", "font-medium", "transition-colors", 3, "click"],
            [1, "p-4", "rounded-xl", "bg-red-50", "dark:bg-red-900/20", "border", "border-red-200", "dark:border-red-800"],
            ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-4", "w-4"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
            [1, "text-red-700", "dark:text-red-300"],
            [1, "p-8", "text-center", "rounded-xl", "bg-gray-50", "dark:bg-gray-800/50"],
            [1, "overflow-x-auto", "rounded-xl", "border", "border-gray-200", "dark:border-gray-700"],
            [1, "w-full"],
            [1, "bg-gray-50", "dark:bg-gray-800"],
            [1, "px-4", "py-3", "text-left", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            [1, "px-4", "py-3", "text-right", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"],
            [1, "divide-y", "divide-gray-200", "dark:divide-gray-700"],
            [1, "bg-white", "dark:bg-gray-900", "hover:bg-gray-50", "dark:hover:bg-gray-800", "cursor-pointer", "transition-colors"],
            [1, "text-sm", "text-gray-500", "dark:text-gray-400"],
            [1, "bg-white", "dark:bg-gray-900", "hover:bg-gray-50", "dark:hover:bg-gray-800", "cursor-pointer", "transition-colors", 3, "click"],
            [1, "px-4", "py-3"],
            [1, "flex", "items-center", "gap-3"],
            [3, "symbol", "size"],
            [1, "flex", "flex-col"],
            [1, "font-medium", "text-gray-900", "dark:text-white"],
            [1, "text-sm", "text-gray-500", "dark:text-gray-400", "truncate", "max-w-48"],
            [1, "px-4", "py-3", "text-sm", "text-gray-600", "dark:text-gray-400"],
            [1, "px-4", "py-3", "text-right", "text-sm", "font-medium", "text-gray-900", "dark:text-white"],
            [1, "px-4", "py-3", "text-right", "text-sm", "text-gray-600", "dark:text-gray-400"],
            [1, "text-gray-600", "dark:text-gray-400"]
        ],
        template: function(t, i) {
            t & 1 && (l(0, "div", 0)(1, "form", 1), y("ngSubmit", function() {
                return i.search()
            }), l(2, "div", 2)(3, "div", 3)(4, "label", 4), c(5, " Sector "), a(), u(6, "ng-select", 5), a(), l(7, "div", 3)(8, "label", 6), c(9, " Industry "), a(), u(10, "ng-select", 7), a()(), l(11, "div", 2)(12, "div", 3)(13, "label", 8), c(14, " Exchange "), a(), u(15, "ng-select", 9), a(), l(16, "div", 3)(17, "label", 10), c(18, " Country "), a(), u(19, "ng-select", 11), a()(), l(20, "div", 2)(21, "div", 3)(22, "label", 12), c(23, " Market Cap Min ($) "), a(), u(24, "input", 13), a(), l(25, "div", 3)(26, "label", 14), c(27, " Market Cap Max ($) "), a(), u(28, "input", 15), a()(), l(29, "div", 2)(30, "div", 3)(31, "label", 16), c(32, " Price Min ($) "), a(), u(33, "input", 17), a(), l(34, "div", 3)(35, "label", 18), c(36, " Price Max ($) "), a(), u(37, "input", 19), a()(), l(38, "div", 2)(39, "div", 3)(40, "label", 20), c(41, " Beta Min "), a(), u(42, "input", 21), a(), l(43, "div", 3)(44, "label", 22), c(45, " Beta Max "), a(), u(46, "input", 23), a()(), l(47, "div", 24)(48, "label", 25), u(49, "input", 26), l(50, "span", 27), c(51, "Actively Trading Only"), a()(), l(52, "label", 25), u(53, "input", 28), l(54, "span", 27), c(55, "Include ETFs"), a()(), l(56, "label", 25), u(57, "input", 29), l(58, "span", 27), c(59, "Include Funds"), a()()(), l(60, "div", 30)(61, "button", 31), p(62, Nt, 5, 0, "span", 32)(63, Ft, 1, 0), a(), l(64, "button", 33), y("click", function() {
                return i.reset()
            }), c(65, " Reset "), a()()(), p(66, At, 3, 1, "div", 34), p(67, Bt, 2, 1), a()), t & 2 && (s(), g("formGroup", i.filterForm), s(5), g("items", i.sectors())("clearable", !0)("searchable", !0), s(4), g("items", i.industries())("clearable", !0)("searchable", !0), s(5), g("items", i.exchanges())("clearable", !0)("searchable", !0), s(4), g("items", i.countries())("clearable", !0)("searchable", !0), s(42), g("disabled", i.isLoading()), s(), h(i.isLoading() ? 62 : 63), s(4), h(i.error() ? 66 : -1), s(), h(i.hasSearched() && !i.isLoading() ? 67 : -1))
        },
        dependencies: [R, re, te, J, Xe, We, Z, ee, ne, ie, at, rt, ae],
        encapsulation: 2
    });
    let n = r;
    return n
})();
var wt = (() => {
    let r = class r {
        constructor() {
            this._modalRef = C(Ke)
        }
        onStockSelected(e) {
            this.onSelect && this.onSelect(e), this.close()
        }
        close() {
            this._modalRef.hide()
        }
    };
    r.\u0275fac = function(t) {
        return new(t || r)
    }, r.\u0275cmp = $({
        type: r,
        selectors: [
            ["qualtrim-stock-screener-modal"]
        ],
        decls: 9,
        vars: 0,
        consts: [
            [1, "flex", "flex-col"],
            [1, "flex", "items-center", "justify-between", "px-6", "py-4", "border-b", "border-gray-200", "dark:border-gray-700"],
            [1, "text-lg", "font-semibold", "text-gray-900", "dark:text-white"],
            ["type", "button", "aria-label", "Close modal", 1, "p-2", "rounded-lg", "text-gray-500", "dark:text-gray-400", "hover:bg-gray-100", "dark:hover:bg-gray-800", "transition-colors", 3, "click"],
            ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"],
            [1, "p-6", "max-h-[70vh]", "overflow-y-auto", "bg-white", "dark:bg-gray-900"],
            [3, "stockSelected"]
        ],
        template: function(t, i) {
            t & 1 && (l(0, "div", 0)(1, "div", 1)(2, "h3", 2), c(3, " Advanced Stock Search "), a(), l(4, "button", 3), y("click", function() {
                return i.close()
            }), E(), l(5, "svg", 4), u(6, "path", 5), a()()(), U(), l(7, "div", 6)(8, "qualtrim-stock-screener", 7), y("stockSelected", function(_) {
                return i.onStockSelected(_)
            }), a()()())
        },
        dependencies: [R, Ct],
        encapsulation: 2
    });
    let n = r;
    return n
})();
var Pt = ["popover"],
    zt = ["searchInput"],
    jt = (n, r, o) => ({
        "form-control": n,
        "bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800": r,
        "ring-2 ring-blue-500 dark:ring-blue-400": o
    }),
    Gt = (n, r) => ({
        "mr-2": n,
        "pl-3": r
    }),
    Ht = (n, r) => ({
        "px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500": n,
        "p-0 text-base": r
    }),
    Qt = n => ({
        $implicit: n
    }),
    It = n => ({
        "bg-blue-50 dark:bg-blue-900/30": n
    }),
    Dt = (n, r) => r.symbol;

function Ut(n, r) {
    if (n & 1 && (l(0, "span"), c(1), a()), n & 2) {
        let o, e = m(2);
        s(), H((o = e.currentSelectedStock()) == null ? null : o.exchange)
    }
}

function qt(n, r) {
    if (n & 1 && (l(0, "span"), c(1), a()), n & 2) {
        let o, e = m(2);
        s(), H((o = e.currentSelectedStock()) == null ? null : o.currency)
    }
}

function Yt(n, r) {
    if (n & 1 && (l(0, "div", 11), p(1, Ut, 2, 1, "span"), p(2, qt, 2, 1, "span"), a()), n & 2) {
        let o, e, t = m();
        s(), h((o = t.currentSelectedStock()) != null && o.exchange ? 1 : -1), s(), h((e = t.currentSelectedStock()) != null && e.currency ? 2 : -1)
    }
}

function Wt(n, r) {
    n & 1 && (l(0, "div", 12), E(), l(1, "svg", 16), u(2, "circle", 17)(3, "path", 18), a()())
}

function Xt(n, r) {
    if (n & 1) {
        let o = I();
        l(0, "button", 19), y("click", function() {
            k(o);
            let t = m();
            return v(t.openScreenerModal())
        }), u(1, "fa-icon", 20), a()
    }
    if (n & 2) {
        let o = m();
        s(), g("icon", o.icons.sliders)
    }
}

function Kt(n, r) {
    if (n & 1) {
        let o = I();
        l(0, "button", 21), y("click", function() {
            k(o);
            let t = m();
            return v(t.openScreenerModal())
        }), u(1, "fa-icon", 20), a()
    }
    if (n & 2) {
        let o = m();
        s(), g("icon", o.icons.sliders)
    }
}

function Jt(n, r) {
    n & 1 && ce(0)
}

function Zt(n, r) {
    if (n & 1 && (l(0, "div", 15), Y(1, Jt, 1, 0, "ng-container", 22), a()), n & 2) {
        m();
        let o = G(18);
        s(), g("ngTemplateOutlet", o)
    }
}

function en(n, r) {
    n & 1 && ce(0)
}

function tn(n, r) {
    if (n & 1 && (l(0, "div", 23), Y(1, en, 1, 0, "ng-container", 24), a()), n & 2) {
        let o = r.close;
        m();
        let e = G(18);
        s(), g("ngTemplateOutlet", e)("ngTemplateOutletContext", X(2, Qt, o))
    }
}

function nn(n, r) {
    if (n & 1 && (l(0, "span", 34), c(1), a()), n & 2) {
        let o = m().$implicit;
        s(), S(" ", o.currency, " ")
    }
}

function on(n, r) {
    if (n & 1) {
        let o = I();
        l(0, "button", 27), y("click", function() {
            let t = k(o).$implicit,
                i = m(2).$implicit;
            return m().selectResult(t), v(i && i())
        })("mouseenter", function() {
            let t = k(o).$index,
                i = m(3);
            return v(i.setActiveItem(t))
        }), u(1, "qualtrim-company-logo", 28), l(2, "div", 29)(3, "div", 30)(4, "span", 31), c(5), a(), l(6, "span", 32), c(7), a()(), l(8, "div", 33), c(9), a()(), p(10, nn, 2, 1, "span", 34), a()
    }
    if (n & 2) {
        let o = r.$implicit,
            e = r.$index,
            t = m(3);
        g("ngClass", X(13, It, t.activeItemIndex() === e))("id", "stock-item-" + e), W("aria-selected", t.activeItemIndex() === e), s(), de("w-8 h-8 flex-shrink-0"), g("symbol", o.symbol)("size", "sm")("imgClass", "company-logo")("singleLetter", !0), s(4), S(" ", o.symbol, " "), s(2), S(" ", o.exchangeShortName || o.stockExchange, " "), s(2), S(" ", o.name, " "), s(), h(o.currency ? 10 : -1)
    }
}

function rn(n, r) {
    n & 1 && (l(0, "div", 35), c(1, " No results found "), a())
}

function an(n, r) {
    if (n & 1 && (p(0, rn, 2, 0, "div", 35), D(1, "async")), n & 2) {
        let o = m(3);
        h(V(1, 1, o.searchLoading$) ? -1 : 0)
    }
}

function ln(n, r) {
    if (n & 1 && (l(0, "div", 25), z(1, on, 11, 15, "button", 26, Dt, !1, an, 2, 3), D(4, "async"), a()), n & 2) {
        let o = m(2);
        s(), j(V(4, 1, o.searchResults$))
    }
}

function sn(n, r) {
    if (n & 1 && (l(0, "div", 36), c(1), a()), n & 2) {
        let o = m(4);
        s(), S(" ", o.defaultSectionTitle, " ")
    }
}

function cn(n, r) {
    n & 1 && (l(0, "div", 35), E(), l(1, "svg", 38), u(2, "circle", 17)(3, "path", 18), a()())
}

function dn(n, r) {
    if (n & 1 && (l(0, "span", 32), c(1), a()), n & 2) {
        let o = m().$implicit;
        s(), S(" ", o.exchange, " ")
    }
}

function mn(n, r) {
    if (n & 1 && (l(0, "span", 34), c(1), a()), n & 2) {
        let o = m().$implicit;
        s(), S(" ", o.currency, " ")
    }
}

function un(n, r) {
    if (n & 1) {
        let o = I();
        l(0, "button", 27), y("click", function() {
            let t = k(o).$implicit,
                i = m(4).$implicit;
            return m().selectDefaultStock(t), v(i && i())
        })("mouseenter", function() {
            let t = k(o).$index,
                i = m(5);
            return v(i.setActiveItem(t))
        }), l(1, "div", 39), u(2, "qualtrim-company-logo", 40), a(), l(3, "div", 29)(4, "div", 30)(5, "span", 41), c(6), a(), p(7, dn, 2, 1, "span", 32), a(), l(8, "div", 42), c(9), a()(), p(10, mn, 2, 1, "span", 34), a()
    }
    if (n & 2) {
        let o = r.$implicit,
            e = r.$index,
            t = m(5);
        g("ngClass", X(13, It, t.activeItemIndex() === e && !t.showSearchResults()))("id", "stock-item-" + e), W("aria-selected", t.activeItemIndex() === e && !t.showSearchResults()), s(2), de("flex-shrink-0"), g("symbol", o.symbol)("size", "md")("showShadow", !0)("singleLetter", !0), s(4), S(" ", o.symbol, " "), s(), h(o.exchange ? 7 : -1), s(2), S(" ", o.name, " "), s(), h(o.currency ? 10 : -1)
    }
}

function pn(n, r) {
    n & 1 && (l(0, "div", 35), c(1, " No companies available "), a())
}

function hn(n, r) {
    if (n & 1 && (l(0, "div", 37), z(1, un, 11, 15, "button", 26, Dt, !1, pn, 2, 0, "div", 35), a()), n & 2) {
        let o = m(4);
        s(), j(o.filteredDefaultStocks())
    }
}

function gn(n, r) {
    if (n & 1 && (p(0, sn, 2, 1, "div", 36), p(1, cn, 4, 0, "div", 35), D(2, "async"), Le(3, hn, 4, 1, "div", 37)), n & 2) {
        let o = m(3);
        h(o.defaultSectionTitle ? 0 : -1), s(), h(V(2, 2, o.defaultStocksLoading$) ? 1 : 3)
    }
}

function fn(n, r) {
    if (n & 1 && (p(0, gn, 4, 4), D(1, "async"), D(2, "async")), n & 2) {
        let o, e = m(2);
        h((o = V(1, 1, e.defaultStocks$)) != null && o.length || V(2, 3, e.defaultStocksLoading$) ? 0 : -1)
    }
}

function xn(n, r) {
    if (n & 1 && p(0, ln, 5, 3, "div", 25)(1, fn, 3, 5), n & 2) {
        let o = m();
        h(o.showSearchResults() ? 0 : 1)
    }
}
var Tt = [f.NASDAQ, f.NYSE, f.AMEX, f.EURONEXT, f.XETRA, f.LSE, f.TSX, f.WSE, f.HXSE],
    hi = (() => {
        let r = class r {
            constructor() {
                this._stocks = C(le), this._insights = C(ct), this._recentSearches = C(ot), this._fb = C(oe), this._cdr = C(je), this._modalService = C(Je), this._elementRef = C(Ve), this._onDestroy$ = new Q, this._currentSearch = new F(""), this._searchLoading = new F(!1), this._searchResults = new F([]), this._defaultStocks = new F([]), this._defaultStocksLoading = new F(!1), this.selectedStock = new q, this.popover = ze("popover"), this.size = "lg", this.placeholder = "Search stocks...", this.showSearchIcon = !1, this.showSearchButton = !0, this.defaultSource = "none", this._excludeSymbolsInternal = [], this.inlineMode = !1, this.maxDefaultItems = 10, this.defaultSectionTitle = "Popular", this.showAdvancedSearch = !1, this.showDropdownOnFocus = !0, this.icons = {
                    search: Mt.faMagnifyingGlass,
                    sliders: Et.faSliders
                }, this.dropdownVisible = x(!1), this.isInputFocused = x(!1), this.activeItemIndex = x(-1), this.showSearchResults = x(!1), this.currentSelectedStock = x(null), this.activeItemId = K(() => this.activeItemIndex() >= 0 ? `stock-item-${this.activeItemIndex()}` : ""), this.hasSelectedStockDetails = K(() => {
                    let e = this.currentSelectedStock();
                    return e ? !!e.currency || !!e.exchange && e.exchange !== f.NYSEAndNASDAQ : !1
                }), this._defaultStocksSignal = x([]), this._excludeSymbolsSignal = x([]), this.filteredDefaultStocks = K(() => {
                    let e = this._defaultStocksSignal(),
                        t = new Set(this._excludeSymbolsSignal().map(i => i.toUpperCase()));
                    return e.filter(i => !t.has(i.symbol.toUpperCase())).slice(0, this.maxDefaultItems)
                }), this.searchForm = this._fb.group({
                    symbol: "",
                    exchange: f.NYSEAndNASDAQ
                }), this.searchResults$ = this._searchResults.pipe(P(1)), this.searchLoading$ = this._searchLoading.pipe(P(1)), this.defaultStocks$ = this._defaultStocks.pipe(P(1)), this.defaultStocksLoading$ = this._defaultStocksLoading.pipe(P(1)), this.onChange = () => {}, this.onTouched = () => {}
            }
            set defaultStocks(e) {
                this._defaultStocks.next(e), this._defaultStocksSignal.set(e)
            }
            set excludeSymbols(e) {
                this._excludeSymbolsInternal = e, this._excludeSymbolsSignal.set(e)
            }
            get excludeSymbols() {
                return this._excludeSymbolsInternal
            }
            ngOnInit() {
                this.setupSearchListener(), this.loadDefaultStocks(), this.inlineMode && this.dropdownVisible.set(!0)
            }
            onDocumentClick(e) {
                if (!this.inlineMode) return;
                !this._elementRef.nativeElement.contains(e.target) && this.dropdownVisible() && this.closeDropdown()
            }
            onEscapeKey() {
                this.inlineMode && this.dropdownVisible() && this.closeDropdown()
            }
            openDropdown() {
                this.inlineMode ? this.dropdownVisible.set(!0) : this.popover() ? .open()
            }
            closeDropdown() {
                this.inlineMode ? this.dropdownVisible.set(!1) : this.popover() ? .close(), this.activeItemIndex.set(-1), this.showSearchResults.set(!1), this._cdr.detectChanges()
            }
            ngOnChanges(e) {
                e.relatedSymbols && !e.relatedSymbols.firstChange && this.loadDefaultStocks()
            }
            ngOnDestroy() {
                this._onDestroy$.next(), this._onDestroy$.complete()
            }
            setupSearchListener() {
                this._currentSearch.pipe(M(this._onDestroy$), Me(e => {
                    e && e.length > 0 ? this._searchLoading.next(!0) : this._searchLoading.next(!1)
                }), ve(300), we(), Te(e => e && e.length > 0 ? this._stocks.searchV2(e).pipe(O(() => A([])), be(t => this.sortResultsByExchangePriority(t)), B(() => this._searchLoading.next(!1))) : (this._searchLoading.next(!1), A([])))).subscribe(e => {
                    this._searchResults.next(e), e.length > 0 ? (this.showSearchResults.set(!0), this.activeItemIndex.set(0), this.openDropdown()) : (this.showSearchResults.set(!1), this.activeItemIndex.set(-1)), this._cdr.detectChanges()
                })
            }
            loadDefaultStocks() {
                if (this.relatedSymbols && this.relatedSymbols.length > 0) {
                    this.loadRelatedSymbols();
                    return
                }
                switch (this.defaultSource) {
                    case "recentSearches":
                        this.loadRecentSearchesWithFallback();
                        break;
                    case "relatedSymbols":
                        this.loadRecentSearchesWithFallback();
                        break;
                    case "investingTheme":
                        this.loadInvestingTheme(this.investingTheme || pe.SNP500);
                        break;
                    case "none":
                    default:
                        this.investingTheme && this.loadInvestingTheme(this.investingTheme);
                        break
                }
            }
            loadRelatedSymbols() {
                !this.relatedSymbols || this.relatedSymbols.length === 0 || (this._defaultStocksLoading.next(!0), this._stocks.getRelatedStocks(this.relatedSymbols).pipe(M(this._onDestroy$), O(() => A([]))).subscribe(e => {
                    let t = e.map(i => ({
                        symbol: i.symbol,
                        name: i.name,
                        logoUrl: i.logoUrl
                    }));
                    this._defaultStocks.next(t), this._defaultStocksSignal.set(t), this._defaultStocksLoading.next(!1), this._cdr.detectChanges()
                }))
            }
            loadRecentSearchesWithFallback() {
                this._defaultStocksLoading.next(!0), this._recentSearches.recentSearches$.pipe(Ce(1), M(this._onDestroy$), O(() => A([]))).subscribe(e => {
                    if (e && e.length > 0) {
                        let t = e.map(i => ({
                            symbol: i.symbol,
                            name: i.name,
                            exchange: i.exchange,
                            currency: i._currency,
                            logoUrl: `https://financialmodelingprep.com/image-stock/${i.symbol}.png`
                        }));
                        this._defaultStocks.next(t), this._defaultStocksSignal.set(t), this._defaultStocksLoading.next(!1), this.defaultSectionTitle = "Recent Searches", this._cdr.detectChanges()
                    } else this.loadInvestingTheme(this.investingTheme || pe.SNP500)
                })
            }
            loadInvestingTheme(e) {
                this._defaultStocksLoading.next(!0), this._insights.getInvestingTheme(e).pipe(M(this._onDestroy$), O(() => A([]))).subscribe(t => {
                    let i = t.map(d => ({
                        symbol: d.symbol,
                        name: d.name,
                        logoUrl: `https://financialmodelingprep.com/image-stock/${d.symbol}.png`
                    }));
                    this._defaultStocks.next(i), this._defaultStocksSignal.set(i), this._defaultStocksLoading.next(!1), this._cdr.detectChanges()
                })
            }
            refreshDefaultStocks() {
                this._cdr.detectChanges()
            }
            onKeyDown(e) {
                let t = this.showSearchResults(),
                    i = this._searchResults.value,
                    d = this.filteredDefaultStocks(),
                    b = (t ? i : d).length;
                if (!this.dropdownVisible() && !this.inlineMode) {
                    if (e.key === "Enter") {
                        let L = this.searchForm.get("symbol") ? .value;
                        if (!L || L.trim() === "") {
                            e.preventDefault();
                            let N = {
                                symbol: "",
                                exchange: f.NYSEAndNASDAQ
                            };
                            this.onChange(N), this.selectedStock.emit(N)
                        }
                    }
                    return
                }
                switch (e.key) {
                    case "ArrowDown":
                        e.preventDefault(), b > 0 && (this.activeItemIndex.set(Math.min(this.activeItemIndex() + 1, b - 1)), this.scrollActiveItemIntoView());
                        break;
                    case "ArrowUp":
                        e.preventDefault(), b > 0 && (this.activeItemIndex.set(Math.max(this.activeItemIndex() - 1, 0)), this.scrollActiveItemIntoView());
                        break;
                    case "Enter":
                        this.activeItemIndex() >= 0 && this.activeItemIndex() < b && (e.preventDefault(), t ? this.selectResult(i[this.activeItemIndex()]) : this.selectDefaultStock(d[this.activeItemIndex()]));
                        break;
                    case "Escape":
                        break
                }
                this._cdr.detectChanges()
            }
            scrollActiveItemIntoView() {
                setTimeout(() => {
                    let e = document.getElementById(this.activeItemId());
                    e && e.scrollIntoView({
                        block: "nearest"
                    })
                }, 0)
            }
            setActiveItem(e) {
                this.activeItemIndex.set(e), this._cdr.detectChanges()
            }
            sortResultsByExchangePriority(e) {
                return [...e].sort((t, i) => {
                    let d = t.exchangeShortName || t.stockExchange,
                        _ = i.exchangeShortName || i.stockExchange,
                        b = Tt.findIndex(N => d && typeof d == "string" && N.includes(d)),
                        L = Tt.findIndex(N => _ && typeof _ == "string" && N.includes(_));
                    return b >= 0 && L >= 0 ? b - L : b >= 0 ? -1 : L >= 0 ? 1 : t.symbol.localeCompare(i.symbol)
                })
            }
            writeValue(e) {
                e !== null && e.symbol ? (this.searchForm.setValue({
                    symbol: e.symbol,
                    exchange: e.exchange
                }, {
                    emitEvent: !1
                }), this.currentSelectedStock.set(e)) : (this.currentSelectedStock.set(null), this.searchForm.setValue({
                    symbol: "",
                    exchange: f.NYSEAndNASDAQ
                }, {
                    emitEvent: !1
                }))
            }
            registerOnChange(e) {
                this.onChange = e
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                e ? this.searchForm.disable() : this.searchForm.enable()
            }
            onInputChanged() {
                let e = this.searchForm.get("symbol") ? .value;
                this.inlineMode || this.currentSelectedStock.set(null), e && e.trim() !== "" ? (this.openDropdown(), this.activeItemIndex.set(-1), this._currentSearch.next(e.trim())) : (this._searchResults.next([]), this._currentSearch.next(""), this.showSearchResults.set(!1), this.activeItemIndex.set(-1), this.inlineMode || this.closeDropdown())
            }
            selectResult(e) {
                let t = {
                    symbol: e.symbol,
                    exchange: e.stockExchange || f.NYSEAndNASDAQ,
                    currency: e.currency,
                    currencySymbol: he[e.currency] ? .symbol,
                    name: e.name
                };
                this._searchResults.next([]), this.showSearchResults.set(!1), this.inlineMode ? this.searchForm.patchValue({
                    symbol: ""
                }) : (this.currentSelectedStock.set(t), this.searchForm.patchValue({
                    symbol: t.symbol
                }), this.closeDropdown()), this.onChange(t), this.selectedStock.emit(t)
            }
            selectDefaultStock(e) {
                let t = {
                    symbol: e.symbol,
                    exchange: e.exchange || f.NYSEAndNASDAQ,
                    currency: e.currency,
                    currencySymbol: e.currency ? he[e.currency] ? .symbol : void 0,
                    name: e.name
                };
                this.inlineMode ? this.searchForm.patchValue({
                    symbol: ""
                }) : (this.currentSelectedStock.set(t), this.searchForm.patchValue({
                    symbol: t.symbol
                }), this.closeDropdown()), this.onChange(t), this.selectedStock.emit(t)
            }
            onFocus() {
                !this.inlineMode && this.showDropdownOnFocus && this.openDropdown(), this.filteredDefaultStocks().length > 0 && this.activeItemIndex() === -1 && !this.showSearchResults() && (this.activeItemIndex.set(0), this._cdr.detectChanges())
            }
            setInputFocus(e) {
                this.isInputFocused.set(e)
            }
            submitSearch(e) {
                e.preventDefault();
                let t = this.searchForm.get("symbol") ? .value;
                if (t && t.trim() !== "") {
                    let i = {
                        symbol: t.toUpperCase(),
                        exchange: f.NYSEAndNASDAQ
                    };
                    this.inlineMode ? this.searchForm.patchValue({
                        symbol: ""
                    }) : (this.currentSelectedStock.set(i), this.searchForm.patchValue({
                        symbol: i.symbol
                    }), this.closeDropdown()), this.onChange(i), this.selectedStock.emit(i)
                }
            }
            onBlur() {
                this.onTouched()
            }
            setFocus() {
                setTimeout(() => {
                    this.searchInput ? .nativeElement && this.searchInput.nativeElement.focus()
                }, 0)
            }
            openScreenerModal() {
                this._modalService.show(wt, {
                    class: "modal-lg modal-dialog-centered",
                    initialState: {
                        onSelect: e => {
                            this.inlineMode ? this.searchForm.patchValue({
                                symbol: ""
                            }) : (this.currentSelectedStock.set(e), this.searchForm.patchValue({
                                symbol: e.symbol
                            }), this.closeDropdown()), this.onChange(e), this.selectedStock.emit(e)
                        }
                    }
                })
            }
        };
        r.\u0275fac = function(t) {
            return new(t || r)
        }, r.\u0275cmp = $({
            type: r,
            selectors: [
                ["qualtrim-stock-selector-v3"]
            ],
            viewQuery: function(t, i) {
                if (t & 1 && ($e(i.popover, Pt, 5), Ne(zt, 5)), t & 2) {
                    Re();
                    let d;
                    Fe(d = Ae()) && (i.searchInput = d.first)
                }
            },
            hostBindings: function(t, i) {
                t & 1 && y("click", function(_) {
                    return i.onDocumentClick(_)
                }, se)("keydown.escape", function() {
                    return i.onEscapeKey()
                }, se)
            },
            inputs: {
                size: "size",
                placeholder: "placeholder",
                showSearchIcon: "showSearchIcon",
                showSearchButton: "showSearchButton",
                defaultSource: "defaultSource",
                investingTheme: "investingTheme",
                relatedSymbols: "relatedSymbols",
                defaultStocks: "defaultStocks",
                excludeSymbols: "excludeSymbols",
                inlineMode: "inlineMode",
                maxDefaultItems: "maxDefaultItems",
                defaultSectionTitle: "defaultSectionTitle",
                showAdvancedSearch: "showAdvancedSearch",
                showDropdownOnFocus: "showDropdownOnFocus"
            },
            outputs: {
                selectedStock: "selectedStock"
            },
            features: [Be([{
                provide: Ye,
                useExisting: r,
                multi: !0
            }]), De],
            decls: 19,
            vars: 32,
            consts: [
                ["popover", "qualtrimPopover"],
                ["searchInput", ""],
                ["stockDropdown", ""],
                ["dropdownContent", ""],
                [1, "relative", "w-full"],
                [3, "submit", "formGroup"],
                ["popoverPlacement", "bottom-start", 1, "flex", "items-center", "transition-all", "duration-200", 3, "qualtrimPopover", "popoverCloseOnScroll", "popoverTrapFocus", "popoverCloseOnClickOutside", "popoverDisabled", "popoverMatchAnchorWidth", "ngClass"],
                [1, "text-gray-400", 3, "ngClass"],
                ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"],
                ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"],
                ["type", "text", "formControlName", "symbol", "spellcheck", "false", "autocapitalize", "characters", "autocomplete", "off", "role", "combobox", "aria-autocomplete", "list", 1, "flex-1", "bg-transparent", "outline-none", "border-0", "w-full", 3, "input", "focus", "blur", "keydown", "placeholder", "ngClass"],
                [1, "flex", "items-center", "gap-2", "text-xs", "text-gray-500", "dark:text-gray-400", "pr-2"],
                [1, "pr-3"],
                ["type", "button", "tooltip", "Advanced Search", "aria-label", "Open advanced stock search", 1, "flex", "items-center", "justify-center", "px-2", "text-gray-500", "dark:text-gray-400", "hover:text-blue-600", "dark:hover:text-blue-400", "transition-colors", "border-l", "border-gray-200", "dark:border-gray-700", "-my-[7px]", "-mr-[11px]", "py-[7px]", "rounded-r-md", "hover:bg-gray-100", "dark:hover:bg-gray-800"],
                ["type", "button", "tooltip", "Advanced Search", "aria-label", "Open advanced stock search", 1, "px-3", "py-2", "text-gray-500", "dark:text-gray-400", "hover:text-blue-600", "dark:hover:text-blue-400", "hover:bg-gray-100", "dark:hover:bg-gray-800", "transition-colors", "border-l", "border-gray-200", "dark:border-gray-700"],
                [1, "bg-white", "dark:bg-gray-900", "overflow-hidden", "z-50"],
                ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-4", "w-4", "text-gray-400"],
                ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"],
                ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
                ["type", "button", "tooltip", "Advanced Search", "aria-label", "Open advanced stock search", 1, "flex", "items-center", "justify-center", "px-2", "text-gray-500", "dark:text-gray-400", "hover:text-blue-600", "dark:hover:text-blue-400", "transition-colors", "border-l", "border-gray-200", "dark:border-gray-700", "-my-[7px]", "-mr-[11px]", "py-[7px]", "rounded-r-md", "hover:bg-gray-100", "dark:hover:bg-gray-800", 3, "click"],
                [1, "text-sm", 3, "icon"],
                ["type", "button", "tooltip", "Advanced Search", "aria-label", "Open advanced stock search", 1, "px-3", "py-2", "text-gray-500", "dark:text-gray-400", "hover:text-blue-600", "dark:hover:text-blue-400", "hover:bg-gray-100", "dark:hover:bg-gray-800", "transition-colors", "border-l", "border-gray-200", "dark:border-gray-700", 3, "click"],
                [4, "ngTemplateOutlet"],
                [1, "bg-white", "dark:bg-gray-900", "rounded-lg", "shadow-lg", "max-h-64", "overflow-y-hidden", "border", "border-gray-200", "dark:border-gray-700", "w-full"],
                [4, "ngTemplateOutlet", "ngTemplateOutletContext"],
                [1, "max-h-64", "overflow-y-auto"],
                ["type", "button", "role", "option", 1, "w-full", "flex", "items-center", "gap-3", "px-3", "py-2.5", "text-left", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors", 3, "ngClass", "id"],
                ["type", "button", "role", "option", 1, "w-full", "flex", "items-center", "gap-3", "px-3", "py-2.5", "text-left", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors", 3, "click", "mouseenter", "ngClass", "id"],
                [3, "symbol", "size", "imgClass", "singleLetter"],
                [1, "flex-1", "min-w-0"],
                [1, "flex", "items-center", "gap-2"],
                [1, "font-semibold", "text-gray-900", "dark:text-white"],
                [1, "text-xs", "text-gray-400", "dark:text-gray-500"],
                [1, "text-sm", "text-gray-500", "dark:text-gray-400", "truncate"],
                [1, "text-xs", "text-gray-400", "dark:text-gray-500", "flex-shrink-0"],
                [1, "px-3", "py-4", "text-sm", "text-gray-500", "dark:text-gray-400", "text-center"],
                [1, "px-3", "py-2", "text-xs", "font-medium", "text-gray-500", "dark:text-gray-400", "border-b", "border-gray-100", "dark:border-gray-800"],
                [1, "max-h-48", "overflow-y-auto"],
                ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-5", "w-5", "mx-auto", "text-gray-400"],
                [1, "flex", "items-center", "justify-center"],
                [3, "symbol", "size", "showShadow", "singleLetter"],
                [1, "font-semibold", "text-gray-900", "dark:text-white", "text-sm"],
                [1, "text-xs", "text-gray-500", "dark:text-gray-400", "truncate"]
            ],
            template: function(t, i) {
                if (t & 1) {
                    let d = I();
                    l(0, "div", 4)(1, "form", 5), y("submit", function(b) {
                        return k(d), v(i.submitSearch(b))
                    }), l(2, "div", 6, 0)(4, "div", 7), E(), l(5, "svg", 8), u(6, "path", 9), a()(), U(), l(7, "input", 10, 1), y("input", function() {
                        return k(d), v(i.onInputChanged())
                    })("focus", function() {
                        return k(d), i.onFocus(), v(i.setInputFocus(!0))
                    })("blur", function() {
                        return k(d), i.onBlur(), v(i.setInputFocus(!1))
                    })("keydown", function(b) {
                        return k(d), v(i.onKeyDown(b))
                    }), a(), p(9, Yt, 3, 2, "div", 11), p(10, Wt, 4, 0, "div", 12), D(11, "async"), p(12, Xt, 2, 1, "button", 13), p(13, Kt, 2, 1, "button", 14), a()(), p(14, Zt, 2, 1, "div", 15), a(), Y(15, tn, 2, 4, "ng-template", null, 2, ue)(17, xn, 2, 1, "ng-template", null, 3, ue)
                }
                if (t & 2) {
                    let d, _ = G(3),
                        b = G(16);
                    Oe("inline-mode", i.inlineMode), s(), g("formGroup", i.searchForm), s(), g("qualtrimPopover", b)("popoverCloseOnScroll", !1)("popoverTrapFocus", !1)("popoverCloseOnClickOutside", !0)("popoverDisabled", i.inlineMode)("popoverMatchAnchorWidth", !0)("ngClass", Pe(22, jt, !i.inlineMode, i.inlineMode, i.isInputFocused() && !i.inlineMode)), s(2), g("ngClass", me(26, Gt, !i.inlineMode, i.inlineMode)), s(3), g("placeholder", i.placeholder)("ngClass", me(29, Ht, i.inlineMode, !i.inlineMode)), W("aria-expanded", i.inlineMode ? i.dropdownVisible() : _.isOpen())("aria-activedescendant", i.activeItemId()), s(2), h(!i.inlineMode && ((d = i.currentSelectedStock()) != null && d.symbol) && i.hasSelectedStockDetails() ? 9 : -1), s(), h(V(11, 20, i.searchLoading$) ? 10 : -1), s(2), h(i.showAdvancedSearch && !i.inlineMode ? 12 : -1), s(), h(i.showAdvancedSearch && i.inlineMode ? 13 : -1), s(), h(i.inlineMode ? 14 : -1)
                }
            },
            dependencies: [R, Ge, He, it, ae, re, te, J, Z, ee, ne, ie, st, et, Ze, nt, tt, lt, Qe],
            encapsulation: 2
        });
        let n = r;
        return n
    })();
export {
    ft as a, le as b, hi as c
};