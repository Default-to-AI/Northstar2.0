import {
    a as Ae
} from "./chunk-Y5DSTSC3.js";
import {
    a as J,
    b as Be,
    c as qe,
    d as Ke
} from "./chunk-WFDAAZIB.js";
import {
    a as D
} from "./chunk-V5CM2EEB.js";
import {
    $a as Ie,
    Jc as Pe,
    Kc as Me,
    Lc as Q,
    Pc as Oe,
    Za as De,
    Zb as Fe,
    aa as Te,
    ab as ke,
    fb as $e,
    gb as we,
    hc as Ye,
    jc as Ee,
    oa as be
} from "./chunk-NO4XYT7V.js";
import {
    g as _e,
    i as ge,
    n as ve,
    z as ye
} from "./chunk-6FMDYVJO.js";
import {
    a as xe,
    b as N,
    f as Se
} from "./chunk-SUZ3XW2S.js";
import {
    $b as c,
    $c as u,
    Aa as R,
    Cb as w,
    Dc as d,
    Ec as ce,
    Fc as M,
    Gc as de,
    Hb as oe,
    Id as he,
    Ka as ie,
    Pd as fe,
    Ub as g,
    Ud as Ce,
    V as ee,
    Vc as O,
    Wb as v,
    Xb as ae,
    Xd as V,
    Z as te,
    Zb as se,
    _b as le,
    ac as l,
    ad as S,
    bc as p,
    bd as A,
    cc as x,
    da as P,
    dd as me,
    g as E,
    ga as K,
    jc as U,
    kb as a,
    nc as F,
    p as G,
    pb as ne,
    pc as h,
    pd as ue,
    qb as re,
    w as b,
    wb as T,
    x as $,
    yc as pe,
    za as j
} from "./chunk-7LZCJGQ2.js";
import {
    a as L,
    b as X
} from "./chunk-TXK3PDXI.js";
var Re = (() => {
    let r = class r {
        constructor() {
            this.period = new ne, this.initialPeriod = D.All, this.formControl = new ge(D.All)
        }
        ngOnChanges(e) {
            e.initialPeriod && this.formControl.setValue(e.initialPeriod.currentValue)
        }
        onChange(e) {
            this.period.emit(e)
        }
    };
    r.\u0275fac = function(i) {
        return new(i || r)
    }, r.\u0275cmp = w({
        type: r,
        selectors: [
            ["qualtrim-chart-period-selector"]
        ],
        inputs: {
            initialPeriod: "initialPeriod"
        },
        outputs: {
            period: "period"
        },
        features: [ie],
        decls: 14,
        vars: 8,
        consts: [
            [1, "d-flex", "flex-row", "align-items-center"],
            [1, "chart-period-selector", 3, "change", "formControl", "clearable"],
            [3, "value"]
        ],
        template: function(i, s) {
            i & 1 && (l(0, "div", 0)(1, "ng-select", 1), F("change", function(m) {
                return s.onChange(m)
            }), l(2, "ng-option", 2), d(3, "All"), p(), l(4, "ng-option", 2), d(5, "Ten Years"), p(), l(6, "ng-option", 2), d(7, "Five Years"), p(), l(8, "ng-option", 2), d(9, "Three Years"), p(), l(10, "ng-option", 2), d(11, "Two Years"), p(), l(12, "ng-option", 2), d(13, "One Year"), p()()()), i & 2 && (a(), c("formControl", s.formControl)("clearable", !1), a(), c("value", "all"), a(2), c("value", "10y"), a(2), c("value", "5y"), a(2), c("value", "3y"), a(2), c("value", "2y"), a(2), c("value", "1y"))
        },
        dependencies: [Q, Me, Pe, ye, _e, ve],
        styles: [".chart-period-selector[_ngcontent-%COMP%]{width:125px}"]
    });
    let t = r;
    return t
})();
var z = (t, r) => ({
    "badge-light-success": t,
    "badge-light-danger": r
});

function He(t, r) {
    if (t & 1 && (l(0, "div", 1), d(1), u(2, "percent"), p()), t & 2) {
        let n = h();
        c("ngClass", O(5, z, n.oneYear > 0, n.oneYear < 0)), a(), M(" 1Y: ", A(2, 2, n.oneYear, "1.2-2"), " ")
    }
}

function Ze(t, r) {
    if (t & 1 && (l(0, "div", 1), d(1), u(2, "percent"), p()), t & 2) {
        let n = h();
        c("ngClass", O(5, z, n.twoYear > 0, n.twoYear < 0)), a(), M(" 2Y: ", A(2, 2, n.twoYear, "1.2-2"), " ")
    }
}

function Le(t, r) {
    if (t & 1 && (l(0, "div", 1), d(1), u(2, "percent"), p()), t & 2) {
        let n = h();
        c("ngClass", O(5, z, n.fiveYear > 0, n.fiveYear < 0)), a(), M(" 5Y: ", A(2, 2, n.fiveYear, "1.2-2"), " ")
    }
}

function Ge(t, r) {
    if (t & 1 && (l(0, "div", 2), d(1), u(2, "percent"), p()), t & 2) {
        let n = h();
        c("ngClass", O(5, z, n.tenYear > 0, n.tenYear < 0)), a(), M(" 10Y: ", A(2, 2, n.tenYear, "1.2-2"), " ")
    }
}

function Ue(t, r) {
    if (t & 1 && (l(0, "div", 0), g(1, He, 3, 8, "div", 1), g(2, Ze, 3, 8, "div", 1), g(3, Le, 3, 8, "div", 1), g(4, Ge, 3, 8, "div", 2), p()), t & 2) {
        let n = r;
        a(), v(n.oneYear ? 1 : -1), a(), v(n.twoYear ? 2 : -1), a(), v(n.fiveYear ? 3 : -1), a(), v(n.tenYear ? 4 : -1)
    }
}

function Je(t, r) {
    if (t & 1 && g(0, Ue, 5, 4, "div", 0), t & 2) {
        let n, e = r.$implicit;
        v((n = e) ? 0 : -1, n)
    }
}
var Ve = (() => {
    let r = class r {
        get data() {
            return this._data
        }
        set data(e) {
            this._data = e
        }
    };
    r.\u0275fac = function(i) {
        return new(i || r)
    }, r.\u0275cmp = w({
        type: r,
        selectors: [
            ["qualtrim-change-over-time"]
        ],
        inputs: {
            data: "data"
        },
        decls: 2,
        vars: 0,
        consts: [
            [1, "d-flex", "justify-content-center", "mt-2"],
            [1, "badge", "badge-lg", "me-2", 3, "ngClass"],
            [1, "badge", "badge-lg", 3, "ngClass"]
        ],
        template: function(i, s) {
            i & 1 && se(0, Je, 1, 1, null, null, ae), i & 2 && le(s.data)
        },
        dependencies: [V, he, Ce],
        encapsulation: 2,
        changeDetection: 0
    });
    let t = r;
    return t
})();

function We(t, r) {
    if (t & 1) {
        let n = U();
        l(0, "div", 2)(1, "div", 3), x(2, "img", 4), l(3, "h4", 5), d(4), u(5, "async"), p()(), l(6, "div", 6)(7, "button", 7), F("click", function() {
            j(n);
            let i = h(),
                s = pe(4);
            return R(i.openModal(s))
        }), x(8, "fa-icon", 8), p()()(), l(9, "div", 9), x(10, "qualtrim-chart-from-info", 10), u(11, "async"), p()
    }
    if (t & 2) {
        let n = h();
        a(4), ce(S(5, 3, n.title$)), a(4), c("icon", n.icons.expand), a(2), c("chartInfo", S(11, 5, n.chartInfo$))
    }
}

function Xe(t, r) {
    t & 1 && (l(0, "div", 21), x(1, "qualtrim-change-over-time", 25), p()), t & 2 && (a(), c("data", r))
}

function et(t, r) {
    if (t & 1) {
        let n = U();
        l(0, "div", 11)(1, "div", 12), x(2, "qualtrim-company-logo", 13), u(3, "async"), l(4, "h4", 14), d(5), u(6, "async"), u(7, "async"), p()(), l(8, "div", 15)(9, "qualtrim-chart-period-selector", 16), F("period", function(i) {
            j(n);
            let s = h(2);
            return R(s.changePeriod(i))
        }), p(), l(10, "button", 17), F("click", function() {
            j(n);
            let i = h(2);
            return R(i.modalRef.hide())
        }), x(11, "fa-icon", 8), p()()(), l(12, "div", 18)(13, "div", 19), x(14, "qualtrim-chart-from-info", 20), p(), g(15, Xe, 2, 1, "div", 21), u(16, "async"), p(), l(17, "div", 22)(18, "div", 23), x(19, "img", 24), p()()
    }
    if (t & 2) {
        let n, e = h(2);
        a(2), c("symbol", S(3, 7, e.symbol$)), a(3), de(" ", S(6, 9, e.title$), " - ", S(7, 11, e.symbol$), " "), a(6), c("icon", e.icons.close), a(3), c("chartInfo", r.config)("chartClass", "h-full w-full"), a(), v((n = S(16, 13, e.cagrData$)) ? 15 : -1, n)
    }
}

function tt(t, r) {
    if (t & 1 && (g(0, et, 20, 15), u(1, "async")), t & 2) {
        let n, e = h();
        v((n = S(1, 1, e.expandedChartInfo$)) ? 0 : -1, n)
    }
}
var jt = (() => {
    let r = class r {
        set chartData(e) {
            this._chartData.next(e)
        }
        constructor(e, i, s, f, m, C, y) {
            this._modalService = e, this._colors = i, this._insights = s, this._cd = f, this.ngZone = m, this._currencyConversion = C, this._analytics = y, this._expandedChartPeriod = new E(D.All), this._chartData = new E(null), this._currentHiddenSeries = new E([]), this._selectedSeries = new E(0), this.kpi$ = this._chartData.pipe(P({
                bufferSize: 1,
                refCount: !0
            })), this.chartPeriod$ = this._insights.quarterOrAnnual$, this.symbol$ = this._insights.symbol$, this.title$ = $([this.kpi$, this.chartPeriod$]).pipe(b(([o, _]) => _ === N.QuarterTTM && !o ? .data.useQ4ForAnnual && o ? .yAxisTitle !== Se.Percent ? `${o?.title} (TTM)` : o ? .title || "")), this._insightsData$ = this.kpi$.pipe(b(o => o ? {
                data: it(o),
                yAxisType: o.yAxisType
            } : null), P({
                bufferSize: 1,
                refCount: !0
            })), this.chartDataPeriod$ = this.chartPeriod$.pipe(ee(), K(o => this._getChartData(o === N.Quarter || o === N.QuarterTTM ? D.FourYears : D.TenYears)), P({
                bufferSize: 1,
                refCount: !0
            })), this.chartInfo$ = $([this.chartDataPeriod$, this._colors.colors$]).pipe(b(([
                [o, _], I
            ]) => {
                if (!o) return null;
                let k = this._chartData.value;
                return this._getApxConfiguration(o, this._getChartColors(I), k, _)
            }), P({
                bufferSize: 1,
                refCount: !0
            })), this.expandedChartInfo$ = $([this._expandedChartPeriod.pipe(K(o => this._getChartData(o))), this._colors.colors$]).pipe(b(([
                [o, _], I
            ]) => {
                if (!o) return null;
                let k = this._chartData.value,
                    Y = this._getApxConfiguration(o, this._getChartColors(I), k, _);
                return Y.options ? .plugins ? .legend && (Y.options.plugins.legend.onClick = (rt, Ne, Qe) => {
                    let B = Ne.datasetIndex,
                        H = Qe.chart,
                        Z = H.getDatasetMeta(B);
                    Z.hidden = Z.hidden === null ? !H.data.datasets[B].hidden : null;
                    let q = this._currentHiddenSeries.value;
                    if (Z.hidden) q.push(B);
                    else {
                        let W = q.indexOf(B);
                        W > -1 && q.splice(W, 1)
                    }
                    this.ngZone.run(() => {
                        this._currentHiddenSeries.next([...q]), this._selectedSeries.next(0), this._cd.detectChanges()
                    }), H.update()
                }, o.length === 1 ? Y.options.plugins.legend.display = !1 : Y.options.plugins.legend.display = !0), {
                    config: Y,
                    data: o
                }
            })), this.cagrData$ = $([this.expandedChartInfo$, this._currentHiddenSeries, this._selectedSeries]).pipe(b(([o, _, I]) => {
                let k = this._chartData.value;
                return !o || !o.data || o.data.length === 0 || !k ? [] : Be(o.data, k.kpiChartType === "stackedBar", _)
            })), this.icons = {
                close: be,
                expand: Te
            }
        }
        openModal(e) {
            let i = {
                class: "modal-xl"
            };
            this.modalRef = this._modalService.show(e, i), $([this.title$, this.symbol$]).pipe(te()).subscribe({
                next: ([s, f]) => {
                    this._analytics.trackEvent("open_expanded_chart", {
                        title: s,
                        symbol: f,
                        kpi: !0
                    })
                }
            })
        }
        _getChartData(e) {
            return this._insightsData$.pipe(K(i => i && i.data.series.length > 0 ? i.yAxisType === "currency" ? this._currencyConversion.convertInsightChart(i.data).pipe(b(s => [J(s.series, e), s.meta ? .currency])) : G([J(i.data.series, e), void 0]) : G([null, "USD"])))
        }
        _getApxConfiguration(e, i, s = null, f) {
            if (s ? .kpiChartType === "line") return qe(e, i, s ? .yAxisType);
            let m = Ke(e, i, this._insights.getCurrentQuarterOrAnnual(), s ? .yAxisType, f);
            return s ? .kpiChartType === "stackedBar" && m.options ? .scales && m.options ? .scales.y && m.options ? .scales.x && (m.options.scales.y.stacked = !0, m.options.scales.x.stacked = !0), m
        }
        _getChartColors(e) {
            let i = ["#df7342", "#e8a370", "#ecd8b0", "#90afa7", "#4a8e98", "#2e5894", "#2e446b"].reverse();
            return this._chartData.value ? .data.series && this._chartData.value ? .data.series.length > 0 && (i = this._chartData.value.data.series.map(s => s.color || i.pop())), {
                chartColors: i,
                foreColor: e.gray.gray800
            }
        }
        changePeriod(e) {
            this._expandedChartPeriod.next(e)
        }
        _getCAGRDataForKpiChart(e, i, s, f) {
            if (e.length === 1) return [...e];
            if (i.kpiChartType === "stackedBar") return e.reduce((C, y, o) => s.includes(o) ? C : C.length === 0 ? (C.push(X(L({}, y), {
                items: [...y.items]
            })), C) : (C[0].items = C[0].items.map((_, I) => (_.y += y.items[I].y, L({}, _))), C), []);
            if (i.kpiChartType === "line" || i.kpiChartType === "bar") {
                let m = e.filter((C, y) => !s.includes(y));
                return e.length <= 3 ? m : m.filter((C, y) => y === f)
            }
            return [...e]
        }
        chartClick(e) {}
        changeCagr(e) {
            let i = e.target.value;
            this._selectedSeries.next(parseInt(i, 10))
        }
    };
    r.\u0275fac = function(i) {
        return new(i || r)(T(De), T(Oe), T(Ae), T(ue), T(re), T(Ee), T(Ye))
    }, r.\u0275cmp = w({
        type: r,
        selectors: [
            ["qualtrim-kpi-chart"]
        ],
        inputs: {
            chartData: "chartData"
        },
        decls: 5,
        vars: 3,
        consts: [
            ["expandedChartTemplate", ""],
            [1, "card"],
            [1, "card-header", "ps-4"],
            [1, "image-title", "d-flex", "align-items-center"],
            ["src", "/assets/kpi.png", "alt", "KPI", 1, "h-45px", "me-3"],
            [1, "card-title"],
            [1, "card-toolbar"],
            [1, "btn", "btn-icon", "btn-sm", "btn-light-secondary", "text-gray-700", 3, "click"],
            [3, "icon"],
            [1, "card-body", "px-2", "pt-5", "pb-0", "min-h-275px"],
            [3, "chartInfo"],
            [1, "modal-header"],
            [1, "flex", "flex-row", "items-center", "gap-4"],
            ["size", "xl", 3, "symbol"],
            [1, "modal-title"],
            [1, "actions", "d-flex", "flex-row"],
            [3, "period"],
            ["type", "button", "aria-label", "Close", 1, "btn", "btn-icon", "btn-light-secondary", "text-gray-700", "ms-4", 3, "click"],
            [1, "modal-body", "pb-0"],
            [1, "modal-chart"],
            [3, "chartInfo", "chartClass"],
            [1, "d-flex", "justify-content-center"],
            [1, "modal-footer", "border-top-0", "pt-0"],
            [1, "actions"],
            ["alt", "Qualtrim", "src", "/assets/qualtrim-wide-logo.svg", 1, "h-10", "invert", "opacity-85", "dark:invert-0", "dark:opacity-100"],
            [3, "data"]
        ],
        template: function(i, s) {
            if (i & 1 && (l(0, "div", 1), g(1, We, 12, 7), u(2, "async"), p(), oe(3, tt, 2, 3, "ng-template", null, 0, me)), i & 2) {
                let f;
                a(), v((f = S(2, 1, s.kpi$)) ? 1 : -1, f)
            }
        },
        dependencies: [V, we, $e, Fe, ke, Ie, Re, Ve, Q, fe],
        encapsulation: 2
    });
    let t = r;
    return t
})();

function it(t) {
    return {
        type: xe.Revenue,
        series: t.data.series.reduce((r, n) => {
            let e = {
                name: n.name,
                key: n.key,
                items: t.data.rows.map(i => ({
                    x: nt(i.year, i.quarter).toISOString().slice(0, 10),
                    y: i[n.key] || 0
                }))
            };
            return r.push(e), r
        }, [])
    }
}

function nt(t, r) {
    let n = r * 3 - 1;
    return new Date(t, n)
}
export {
    Re as a, Ve as b, jt as c
};