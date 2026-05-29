import {
    a as c,
    b as i
} from "./chunk-V5CM2EEB.js";
import {
    a as F,
    b as T
} from "./chunk-7DHBKSW6.js";
import {
    a as C
} from "./chunk-QV2H35FG.js";
import {
    a as D,
    b as A
} from "./chunk-7MYJGJHC.js";
import {
    a as l
} from "./chunk-TZCWVSCJ.js";
import {
    a as N
} from "./chunk-W5WJL374.js";
import {
    pd as B,
    qd as W
} from "./chunk-NO4XYT7V.js";
import {
    F as P,
    L as h,
    O as g,
    Q as G,
    R as _,
    U as z,
    V as p,
    b as y
} from "./chunk-SUZ3XW2S.js";
import {
    a as k,
    b as v
} from "./chunk-TXK3PDXI.js";

function R(e, t, r) {
    return N(e, t * 3, r)
}

function x(e, t) {
    let r = +h(e) - +h(t);
    return r < 0 ? -1 : r > 0 ? 1 : r
}

function S(e, t, r) {
    let [a, n] = g(r ? .in, e, t), o = a.getFullYear() - n.getFullYear(), s = a.getMonth() - n.getMonth();
    return o * 12 + s
}

function H(e, t, r) {
    let [a, n] = g(r ? .in, e, t);
    return a.getFullYear() - n.getFullYear()
}

function b(e) {
    return t => {
        let a = (e ? Math[e] : Math.trunc)(t);
        return a === 0 ? 0 : a
    }
}

function J(e, t) {
    let r = h(e, t ? .in);
    return r.setHours(23, 59, 59, 999), r
}

function L(e, t) {
    let r = h(e, t ? .in),
        a = r.getMonth();
    return r.setFullYear(r.getFullYear(), a + 1, 0), r.setHours(23, 59, 59, 999), r
}

function j(e, t) {
    let r = h(e, t ? .in);
    return +J(r, t) == +L(r, t)
}

function M(e, t, r) {
    let [a, n, o] = g(r ? .in, e, e, t), s = x(n, o), u = Math.abs(S(n, o));
    if (u < 1) return 0;
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * u);
    let f = x(n, o) === -s;
    j(a) && u === 1 && x(a, o) === 1 && (f = !1);
    let m = s * (u - +f);
    return m === 0 ? 0 : m
}

function I(e, t, r) {
    let a = M(e, t, r) / 3;
    return b(r ? .roundingMethod)(a)
}

function O(e, t, r) {
    let a = D(e, t, r) / 7;
    return b(r ? .roundingMethod)(a)
}

function w(e, t, r) {
    let [a, n] = g(r ? .in, e, t), o = x(a, n), s = Math.abs(H(a, n));
    a.setFullYear(1584), n.setFullYear(1584);
    let u = x(a, n) === -o,
        f = o * (s - +u);
    return f === 0 ? 0 : f
}

function q(e, t, r) {
    return R(e, -t, r)
}

function Je(e, t, r, a) {
    return e.map(n => n.items.length === 0 ? null : {
        name: n.name,
        data: r ? Z(n.items, t, r) : X(n.items, t)
    }).filter(n => n !== null)
}

function Le(e, t = !1, r = []) {
    if (t) {
        let a = e.reduce((n, o, s) => r.includes(s) ? n : n.length === 0 ? [...JSON.parse(JSON.stringify(o.data.items))] : (n = n.map((u, f) => (u.y += o.data.items[f].y, k({}, u))), n), []);
        return [E(a)]
    }
    return e.map(a => E(a.data.items))
}

function E(e, t) {
    let r = {
        oneYear: null,
        twoYear: null,
        fiveYear: null,
        tenYear: null
    };
    if (e.length < 2) return r;
    t || (t = F(p(e[e.length - 1].x)));
    let a = e[e.length - 1].y,
        n = F(p(e[0].x)),
        o = w(t, n),
        s = u => {
            let f = null,
                m = 1 / 0;
            for (let d of e) {
                let U = F(p(d.x)),
                    V = Math.abs(D(U, u));
                V < m && (m = V, f = d)
            }
            return m <= 45 && f ? .y || null
        };
    if (o >= 1) {
        let u = s(l(t, 1));
        u && u !== 0 && (r.oneYear = Q(u, a, 1))
    }
    if (o >= 2) {
        let u = s(l(t, 2));
        u && u !== 0 && (r.twoYear = Q(u, a, 2))
    }
    if (o >= 5) {
        let u = s(l(t, 5));
        u && u !== 0 && (r.fiveYear = Q(u, a, 5))
    }
    if (o >= 10) {
        let u = s(l(t, 10));
        u && u !== 0 && (r.tenYear = Q(u, a, 10))
    }
    return r
}

function Q(e, t, r) {
    return (t / e) ** (1 / r) - 1
}

function X(e, t, r) {
    let a = Y(t),
        n = [];
    if (t === c.All) return {
        items: e,
        start: e[0],
        end: e[e.length - 1],
        min: Math.min(...e.map(u => u.y)),
        max: Math.max(...e.map(u => u.y)),
        change: e[e.length - 1].y - e[0].y,
        percentChange: (e[e.length - 1].y - e[0].y) / e[0].y
    };
    for (let u = e.length - 1; u >= 0 && !z(p(e[u].x), a); u--) n.unshift(e[u]);
    let o = Math.min(...n.map(u => u.y)),
        s = Math.max(...n.map(u => u.y));
    return !e || e.length === 0 || n.length === 0 ? {
        items: [],
        start: {
            y: 0,
            x: ""
        },
        end: {
            y: 0,
            x: ""
        },
        min: 0,
        max: 0,
        change: 0,
        percentChange: 0
    } : {
        items: n,
        start: n[0],
        end: n[n.length - 1],
        min: o,
        max: s,
        change: n[n.length - 1].y - n[0].y,
        percentChange: (n[n.length - 1].y - n[0].y) / n[0].y
    }
}

function Z(e, t, r = i.Quarter, a) {
    let n = {
        items: [],
        start: {
            y: 0,
            x: ""
        },
        end: {
            y: 0,
            x: ""
        },
        min: 0,
        max: 0,
        change: 0,
        percentChange: 0
    };
    if (e.length === 0) return n;
    let o = ne(e, t, r);
    if (o.length === 0) return n;
    let s = Math.min(...o.map(f => f.y)),
        u = Math.max(...o.map(f => f.y));
    return {
        items: o,
        start: o[0],
        end: o[o.length - 1],
        min: s,
        max: u,
        change: o[o.length - 1].y - o[0].y,
        percentChange: 1 - (o[o.length - 1].y - o[0].y) / o[o.length - 1].y
    }
}

function $(e, t) {
    switch (t) {
        case i.Quarter:
            return I(new Date, Y(e));
        case i.Month:
            return M(new Date, Y(e));
        case i.Week:
            return O(new Date, Y(e));
        case i.Day:
            return D(new Date, Y(e));
        case i.Year:
            return w(new Date, Y(e))
    }
}

function ee(e, t, r, a) {
    switch (r) {
        case i.Quarter:
            return I(e, t, a);
        case i.Month:
            return M(e, t);
        case i.Week:
            return O(e, t, a);
        case i.Day:
            return D(e, t);
        case i.Year:
            return w(e, t)
    }
}

function te(e, t, r) {
    switch (t) {
        case i.Quarter:
            return q(e, r);
        case i.Month:
            return C(e, r);
        case i.Week:
            return T(e, r);
        case i.Day:
            return A(e, r);
        case i.Year:
            return l(e, r)
    }
}

function re(e, t, r) {
    switch (r) {
        case i.Quarter:
            return I(e, t);
        case i.Month:
            return M(e, t);
        case i.Week:
            return O(e, t);
        case i.Day:
            return D(e, t);
        case i.Year:
            return w(e, t)
    }
}

function ne(e, t, r) {
    let a = 0;
    t === c.All ? a = re(new Date, p(e[0].x), r) : a = $(t, r);
    let n = [],
        o = e.length - 1;
    for (let s = 0; s < a - 1; s++) {
        let u = p(e[o - s].x),
            f = o - s - 1,
            m = 0;
        if (f < 0) m = a - n.length, s = a - 1;
        else {
            let d = p(e[o - s - 1].x);
            m = ee(u, d, r, {
                roundingMethod: "ceil"
            })
        }
        if (m > 1)
            for (let d = 1; d < m; d++) n.unshift({
                x: _(te(u, r, d), "yyyy-MM-dd"),
                y: 0
            });
        e[o - s] && n.unshift(e[o - s])
    }
    return n
}

function je(e, t, r = "currency", a = y.Quarter, n) {
    return {
        type: "line",
        data: K(e, t.chartColors, a),
        options: {
            animation: {
                easing: "linear",
                duration: 500
            },
            responsive: !0,
            maintainAspectRatio: !1,
            interaction: {
                intersect: !1,
                mode: "index"
            },
            elements: {
                point: {
                    radius: 0
                },
                line: {
                    borderWidth: 2
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: t.foreColor,
                        callback: (o, s, u) => W(P(o), r, n)
                    }
                },
                x: {
                    grid: {
                        display: !1
                    },
                    ticks: {
                        color: t.foreColor
                    }
                }
            },
            plugins: {
                legend: {
                    display: !1
                },
                tooltip: {
                    callbacks: {
                        label(o) {
                            return o.dataset.label + ": " + W(P(o.parsed.y), r, n)
                        }
                    }
                }
            }
        }
    }
}

function qe(e, t, r, a = "currency", n) {
    return v(k({}, B(t, a, n)), {
        data: K(e, t.chartColors, r)
    })
}

function K(e, t, r = y.Quarter) {
    return {
        datasets: ae(e, t),
        labels: oe(e, r)
    }
}

function ae(e, t) {
    return e.map((r, a) => {
        let n = r ? r.data.items.map(o => o.y === 0 ? null : o.y) : [];
        return {
            label: r.name,
            data: n,
            spanGaps: !0,
            backgroundColor: t[a] || t[0],
            borderColor: t[a] || t[0]
        }
    })
}

function oe(e, t = y.Quarter) {
    return e.length > 0 ? e[0].data.items.map(r => {
        let a = "MM/dd/yyyy";
        return t === y.Quarter || t === y.QuarterTTM ? a = "QQQ yyyy" : t === y.Annual && (a = "yyyy"), _(p(r.x), a)
    }) : []
}

function Y(e) {
    switch (e) {
        case c.OneDay:
            return A(new Date, 1);
        case c.OneWeek:
            return T(new Date, 1);
        case c.OneMonth:
            return C(new Date, 1);
        case c.ThreeMonths:
            return C(new Date, 3);
        case c.OneYear:
            return l(new Date, 1);
        case c.SixMonths:
            return C(new Date, 6);
        case c.TwoYears:
            return l(new Date, 2);
        case c.ThreeYears:
            return l(new Date, 3);
        case c.FourYears:
            return l(new Date, 4);
        case c.FiveYears:
            return l(new Date, 5);
        case c.TenYears:
            return l(new Date, 10);
        case c.YTD:
        default:
            return G(new Date)
    }
}
export {
    Je as a, Le as b, je as c, qe as d
};