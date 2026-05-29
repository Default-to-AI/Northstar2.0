import {
    a as F
} from "./chunk-V5CM2EEB.js";
import {
    a as O
} from "./chunk-QV2H35FG.js";
import {
    a as x
} from "./chunk-TZCWVSCJ.js";
import {
    gc as Q
} from "./chunk-NO4XYT7V.js";
import {
    a as K
} from "./chunk-YSSGUHYD.js";
import {
    T as L,
    X as S,
    b as m,
    c as Y,
    h as I
} from "./chunk-SUZ3XW2S.js";
import {
    C as z,
    M as g,
    V as w,
    Y as l,
    da as s,
    g as C,
    ga as u,
    j as P,
    ja as d,
    n as T,
    p as n,
    pa as q,
    ta as A,
    w as $,
    x as c
} from "./chunk-7LZCJGQ2.js";
import {
    a as p,
    b as E
} from "./chunk-TXK3PDXI.js";
var k = "qualtrim-show-performance",
    X = (() => {
        let _ = class _ {
            processEstimatesData(t, i) {
                let e = new Date;
                if (t) {
                    let r = t.estimates.filter(o => !(!(S(o.fiscalPeriod).getFullYear() >= x(e, 1).getFullYear()) || o.hasIncomeStatement)),
                        h = t.quarterlyEstimates.filter(o => {
                            let b = S(o.fiscalPeriod);
                            return !(!L(b, O(e, 3)) || o.hasIncomeStatement)
                        })[0],
                        v = r[0],
                        f = r[1];
                    return !h || !v || !f ? null : {
                        currentQuarter: p({
                            fiscalPeriod: h.fiscalPeriod
                        }, h[i]),
                        currentYear: p({
                            fiscalPeriod: v.fiscalPeriod
                        }, v[i]),
                        nextYear: p({
                            fiscalPeriod: f.fiscalPeriod
                        }, f[i]),
                        type: i,
                        currency: t.currency || "USD"
                    }
                }
                return null
            }
            constructor(t, i) {
                this._insights = t, this._quotes = i, this._loadingCache = new Map, this._loadingWatchCache = new Map, this._chartsCache = new Map, this._overviewCache = new Map, this._kpiCache = new Map, this._flexibleKpiCache = new Map, this._investingThemesCache = new Map, this._symbol = new C(null), this._quarterlyOrAnnual = new C(m.Quarter), this._analystType = new C(I.EPS), this._showPerformance = new C(localStorage.getItem(k) === "true"), this.showPerformance$ = this._showPerformance.pipe(w(), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.quarterOrAnnual$ = this._quarterlyOrAnnual.pipe(w(), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.symbol$ = this._symbol.pipe(w(), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.analystEstimates$ = c([this.symbol$, this.quarterOrAnnual$]).pipe(u(([e, r]) => e === null ? n(null) : (this._setLoading("estimates", !0), this._insights.getAnalystEstimates(e, r).pipe(l(() => this._setLoading("estimates", !1))))), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.analystEstimatesFlexible$ = c([this.symbol$, this.quarterOrAnnual$]).pipe(u(([e, r]) => e === null ? n(null) : (this._setLoading("estimates-flexible", !0), this._insights.getAnalystEstimatesFlexible(e, {
                    format: "dual"
                }).pipe(l(() => this._setLoading("estimates-flexible", !1))))), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.currentAndFutureEstimates$ = c([this.analystEstimates$, this.quarterOrAnnual$]).pipe($(([e, r]) => {
                    let a = new Date;
                    if (e) {
                        let h = e.estimates.filter(f => {
                            let o = S(f.fiscalPeriod);
                            return !(!(r === m.Quarter ? L(o, O(a, 3)) : o.getFullYear() >= x(a, 1).getFullYear()) || f.hasIncomeStatement)
                        });
                        return {
                            currentQuarter: e.quarterlyEstimates.filter(f => {
                                let o = S(f.fiscalPeriod);
                                return !(!(r === m.Quarter ? L(o, O(a, 3)) : o.getFullYear() >= x(a, 1).getFullYear()) || f.hasIncomeStatement)
                            })[0],
                            currentYear: h[0],
                            nextYear: h[1],
                            currency: e.currency || "USD"
                        }
                    }
                    return null
                }), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.currentEstimatesForType$ = c([this._analystType, this.currentAndFutureEstimates$]).pipe($(([e, r]) => r === null || r.currentQuarter === void 0 || r.currentYear === void 0 || r.nextYear === void 0 ? null : {
                    currentQuarter: p({
                        fiscalPeriod: r.currentQuarter.fiscalPeriod
                    }, r.currentQuarter[e]),
                    currentYear: p({
                        fiscalPeriod: r.currentYear.fiscalPeriod
                    }, r.currentYear[e]),
                    nextYear: p({
                        fiscalPeriod: r.nextYear.fiscalPeriod
                    }, r.nextYear[e]),
                    type: e,
                    currency: r.currency
                }), g(e => (console.error(e), n(null))), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.currentEstimatesForTypeFlexible$ = c([this._analystType, this.analystEstimatesFlexible$]).pipe($(([e, r]) => {
                    if (!r ? .data) return null;
                    let a = this.processEstimatesData(r.data, e),
                        h = r.meta.original ? this.processEstimatesData(r.meta.original, e) : a;
                    return a ? {
                        data: a,
                        meta: E(p({}, r.meta), {
                            original: h
                        })
                    } : null
                }), g(e => (console.error(e), n(null))), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.estimateType$ = this._analystType.asObservable(), this.overview$ = this.symbol$.pipe(u(e => e === null ? n(null) : (this._setLoading("overview", !0), this._insights.getOverview(e).pipe(l(() => this._setLoading("overview", !1)), g(r => (console.error("Error fetching overview:", r), n(null)))))), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.profile$ = this.symbol$.pipe(u(e => e === null ? n(null) : (this._setLoading("profile", !0), this._insights.getProfile(e).pipe(l(() => this._setLoading("profile", !1)), g(r => (console.error(r), n(null)))))), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.quote$ = this.symbol$.pipe(u(e => e === null ? n(null) : (this._setLoading(`quote:${e}`, !0), this._quotes.getQuoteForSymbolFlexible(e).pipe(g(r => (console.error("Error getting quote", r), n(null))), $(r => r ? .data || null), l(() => this._setLoading(`quote:${e}`, !1))))), s(1)), this.news$ = this.symbol$.pipe(u(e => e === null ? n(null) : (this._setLoading("news", !0), this._insights.getNews(e).pipe(d(() => this._setLoading("news", !1)))))), this.recentNewsAi$ = this.symbol$.pipe(u(e => e === null ? n(null) : (this._setLoading("recentNewsAi", !0), this._insights.getRecentNewsByAi(e).pipe(l(() => this._setLoading("recentNewsAi", !1)), g(r => (console.error("Error fetching recent news AI:", r), n(null)))))), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.insiderTrades$ = this.symbol$.pipe(u(e => e === null ? n(null) : (this._setLoading("insiderTrades", !0), this._insights.getInsiderTrades(e).pipe(d(() => this._setLoading("insiderTrades", !1)))))), this.actives$ = this.symbol$.pipe(u(e => e !== null ? n(null) : (this._setLoading("actives", !0), this._insights.getActives().pipe(l(() => this._setLoading("actives", !1))))), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.investingThemes$ = z(Object.values(Y).reduce((e, r) => (e[r] = this._insights.getInvestingTheme(r), e), {})).pipe(s({
                    bufferSize: 1,
                    refCount: !0
                })), this.recentSearches$ = this.symbol$.pipe(u(e => e !== null ? n(null) : (this._setLoading("recentSearches", !0), this._insights.getRecentSearches().pipe(l(() => this._setLoading("recentSearches", !1))))), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.kpis$ = c([this.symbol$, this.quarterOrAnnual$]).pipe(u(([e, r]) => {
                    if (e === null) return n([]);
                    let a = `${e}:${r}`;
                    return this._kpiCache.has(a) || this._kpiCache.set(a, this._insights.getKPICharts(e, r).pipe(s({
                        bufferSize: 1,
                        refCount: !0
                    }))), this._kpiCache.get(a)
                }), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.flexibleKpis$ = c([this.symbol$, this.quarterOrAnnual$]).pipe(u(([e, r]) => {
                    if (e === null) return n(null);
                    this._setLoading("flexibleKpis", !0);
                    let a = `flexibleKpis:${e}:${r}`;
                    return this._flexibleKpiCache.has(a) || this._flexibleKpiCache.set(a, this._insights.getKpiChartsFlexible(e, r).pipe(s({
                        bufferSize: 1,
                        refCount: !0
                    }))), this._flexibleKpiCache.get(a)
                }), s({
                    bufferSize: 1,
                    refCount: !0
                })), this.aiAnalysis$ = this.symbol$.pipe(u(e => e === null ? n(null) : (this._setLoading("aiAnalysis", !0), this._insights.getAiAnalysis(e).pipe(l(() => this._setLoading("aiAnalysis", !1))))), $(e => e && e.message ? JSON.parse(e.message.message) : null), s({
                    bufferSize: 1,
                    refCount: !0
                }))
            }
            setShowPerformance(t) {
                this._showPerformance.getValue() !== t && (this._showPerformance.next(t), localStorage.setItem(k, t.toString()))
            }
            getShowPerformance() {
                return this._showPerformance.getValue()
            }
            getInvestingThemeForSymbol(t) {
                let i = `investing-theme-${t}`;
                return this._investingThemesCache.has(i) || this._investingThemesCache.set(i, this._insights.getInvestingTheme(t).pipe(s({
                    bufferSize: 1,
                    refCount: !0
                }))), this._investingThemesCache.get(i)
            }
            getChart(t, i) {
                let e = `chart:${t}`;
                return i && (e = `chart:${t}:${JSON.stringify(i)}`), this._chartsCache.has(e) || this._chartsCache.set(e, c([this.symbol$, this.quarterOrAnnual$]).pipe(d(() => this._setLoading(e, !0)), u(([r, a]) => {
                    if (r === null) return n(null);
                    let h = `${e}:${r}:${a}`;
                    return this._chartsCache.has(h) || this._chartsCache.set(h, this._insights.getChart(r, t, a, i).pipe(g(v => n({
                        type: t,
                        series: []
                    })), s({
                        bufferSize: 1,
                        refCount: !0
                    }))), this._chartsCache.get(h)
                }), d(() => this._setLoading(e, !1)), s({
                    bufferSize: 1,
                    refCount: !0
                }), l(() => this._chartsCache.delete(e)))), this._chartsCache.get(e)
            }
            getChartLoading(t, i) {
                return i ? this.getLoading(`chart:${t}:${JSON.stringify(i)}`) : this.getLoading(`chart:${t}`)
            }
            getQuoteLoading(t) {
                return this.getLoading(`quote:${t}`)
            }
            getOverviewLoading(t) {
                return this.getLoading(`overview:${t}`)
            }
            setSymbol(t) {
                this._symbol.next(t)
            }
            setEstimateType(t) {
                this._analystType.next(t)
            }
            getCurrentSymbol() {
                return this._symbol.getValue()
            }
            getCurrentQuarterOrAnnual() {
                return this._quarterlyOrAnnual.getValue()
            }
            getCurrentPeriodFromRange() {
                let t = this.getCurrentQuarterOrAnnual();
                return t === m.Quarter || t === m.QuarterTTM ? F.FourYears : F.TenYears
            }
            getLoading(t) {
                if (this._createLoadingIfNoExists(t), !this._loadingWatchCache.has(t)) {
                    let i = this._loadingCache.get(t);
                    i && this._loadingWatchCache.set(t, i.pipe(T(P), s({
                        bufferSize: 1,
                        refCount: !0
                    })))
                }
                return this._loadingWatchCache.get(t)
            }
            _setLoading(t, i) {
                this._createLoadingIfNoExists(t), this._loadingCache.get(t) ? .next(i)
            }
            _createLoadingIfNoExists(t) {
                this._loadingCache.has(t) || this._loadingCache.set(t, new C(!0))
            }
            changeQuarterOrAnnual(t) {
                t !== this._quarterlyOrAnnual.getValue() && this._quarterlyOrAnnual.next(t)
            }
            getChartFlexible(t) {
                let i = `chart-flex:${t}`;
                return this._chartsCache.has(i) || this._chartsCache.set(i, c([this.symbol$, this.quarterOrAnnual$]).pipe(d(() => this._setLoading(i, !0)), u(([e, r]) => {
                    if (e === null) return n(null);
                    let a = `${i}:${e}:${r}`;
                    return this._chartsCache.has(a) || this._chartsCache.set(a, this._insights.getChartFlexible(e, t, r).pipe(g(h => (console.error("Error fetching flexible chart:", h), n(null))), s({
                        bufferSize: 1,
                        refCount: !0
                    }))), this._chartsCache.get(a)
                }), d(() => this._setLoading(i, !1)), s({
                    bufferSize: 1,
                    refCount: !0
                }), l(() => this._chartsCache.delete(i)))), this._chartsCache.get(i)
            }
            getChartFlexibleLoading(t) {
                return this.getLoading(`chart-flex:${t}`)
            }
            getKpiChartsFlexible(t, i) {
                return this._insights.getKpiChartsFlexible(t, i)
            }
            getOverviewFlexible(t, i = {}) {
                if (!t) return n(null);
                let e = `overview-flexible:${t}:${i.format}:${i.currency}`;
                return this._overviewCache.has(e) || (this._setLoading(`overview:${t}`, !0), this._overviewCache.set(e, this._insights.getOverviewFlexible(t, i).pipe(l(() => this._setLoading(`overview:${t}`, !1))))), this._overviewCache.get(e)
            }
        };
        _.\u0275fac = function(i) {
            return new(i || _)(A(K), A(Q))
        }, _.\u0275prov = q({
            token: _,
            factory: _.\u0275fac,
            providedIn: "root"
        });
        let y = _;
        return y
    })();
export {
    X as a
};