import {
    b as h
} from "./chunk-SUZ3XW2S.js";
import {
    be as n,
    ee as l,
    pa as p,
    ta as c
} from "./chunk-7LZCJGQ2.js";
var y = (() => {
    let r = class r {
        constructor(t) {
            this._http = t
        }
        getActives() {
            return this._http.get("/api/insights/actives")
        }
        getInvestingThemes() {
            return this._http.get("/api/insights/investing-themes")
        }
        getInvestingTheme(t) {
            return this._http.get(`/api/insights/investing-themes/${t}`)
        }
        getRecentSearches() {
            return this._http.get("/api/quotes/recent-searches")
        }
        getOverview(t) {
            return this._http.get(`/api/insights/${t}/overview`)
        }
        getOverviewFlexible(t, e = {}) {
            let {
                format: i = "converted-only",
                currency: s
            } = e, a = {
                format: i
            };
            return s && (a.currency = s), this._http.get(`/api/insights/${t}/overview-flexible`, {
                params: a
            })
        }
        getProfile(t) {
            return this._http.get(`/api/insights/${t}/profile`)
        }
        getNews(t) {
            return this._http.get(`/api/insights/${t}/news`)
        }
        getRecentNewsByAi(t) {
            return this._http.get(`/api/insights/${t}/recent-news-ai`)
        }
        getInsiderTrades(t) {
            return this._http.get(`/api/insights/${t}/insider-trades`)
        }
        getAiAnalysis(t) {
            return this._http.get(`/api/insights/${t}/insights-analysis`)
        }
        getAnalystEstimates(t, e) {
            let i = new n;
            return e && (i = i.set("period", e)), this._http.get(`/api/insights/${t}/analyst-estimates`, {
                params: i
            })
        }
        getAnalystEstimatesFlexible(t, e = {}) {
            let i = new n;
            return e.format && (i = i.set("format", e.format)), e.currency && (i = i.set("currency", e.currency)), this._http.get(`/api/insights/${t}/analyst-estimates-flexible`, {
                params: i
            })
        }
        getChart(t, e, i = h.Quarter, s) {
            return this._http.post(`/api/insights/${t}/chart`, {
                range: i,
                type: e,
                payload: s
            })
        }
        search(t, e) {
            return this._http.get("/api/insights/search", {
                params: {
                    exchange: e,
                    query: t
                }
            })
        }
        getKPICharts(t, e = h.Quarter) {
            let i = new n().set("range", e);
            return this._http.get(`/api/insights/${t}/kpi-charts`, {
                params: i
            })
        }
        getDcfCalculator(t) {
            return this._http.get(`/api/insights/${t}/dcf-calculator`)
        }
        setDcfCalculator(t, e) {
            return this._http.post(`/api/insights/${t}/dcf-calculator`, e)
        }
        getDcfCalculatorFlexible(t, e = {}) {
            let {
                format: i = "converted-only",
                currency: s
            } = e, a = {
                format: i
            };
            return s && (a.currency = s), this._http.get(`/api/insights/${t}/dcf-calculator-flexible`, {
                params: a
            })
        }
        getChartFlexible(t, e, i = h.Quarter) {
            return this._http.get(`/api/insights/${t}/chart-flex/${e}/${i}`)
        }
        getKpiChartsFlexible(t, e = h.Quarter) {
            let i = new n().set("range", e);
            return this._http.get(`/api/insights/${t}/kpi-charts-flexible`, {
                params: i
            })
        }
    };
    r.\u0275fac = function(e) {
        return new(e || r)(c(l))
    }, r.\u0275prov = p({
        token: r,
        factory: r.\u0275fac,
        providedIn: "root"
    });
    let g = r;
    return g
})();
export {
    y as a
};