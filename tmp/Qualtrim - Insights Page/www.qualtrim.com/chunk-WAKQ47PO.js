import {
    Wa as De,
    Xa as dt,
    bb as ts,
    c as es,
    cb as Kn,
    d as hn,
    f as Bt,
    g as Jn,
    i as pn
} from "./chunk-NO4XYT7V.js";
import {
    a as Nt,
    d as Qn
} from "./chunk-6FMDYVJO.js";
import {
    $b as c,
    $c as x,
    Aa as h,
    Ac as w,
    Cb as z,
    Db as ln,
    Dc as M,
    Eb as It,
    Ec as B,
    Fc as Ce,
    Gb as Pt,
    Hb as y,
    I as U,
    Id as jt,
    Jd as Le,
    Ka as Ot,
    Kd as ve,
    La as Ki,
    Ld as At,
    Md as Ft,
    Na as be,
    Pc as qi,
    Pd as Wt,
    Rc as _e,
    S as Wn,
    Sb as ce,
    V as Et,
    Xd as Xi,
    a as Ht,
    ac as u,
    ad as H,
    bc as _,
    c as Fn,
    ca as Qi,
    cc as R,
    dc as $e,
    ec as Ue,
    f as rt,
    fc as cn,
    g as Te,
    gc as at,
    ha as Bn,
    hc as ot,
    jc as D,
    k as zi,
    kb as l,
    kc as Un,
    n as Gi,
    nc as f,
    oa as Ne,
    pa as le,
    pb as I,
    pc as d,
    pd as Rt,
    qa as dn,
    qc as Zi,
    rc as zn,
    ta as Nn,
    tc as _n,
    uc as un,
    vb as Me,
    vc as mn,
    w as Vt,
    wb as g,
    x as Ji,
    yb as $n,
    za as m,
    zc as Gn
} from "./chunk-7LZCJGQ2.js";

function Fr(e, t) {
    return (e % t + t) % t
}

function Ze(e) {
    return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
}

function q(e) {
    return typeof e == "string"
}

function tn(e) {
    return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]"
}

function Ve(e) {
    return e && e.getTime && !isNaN(e.getTime())
}

function Xe(e) {
    return e instanceof Function || Object.prototype.toString.call(e) === "[object Function]"
}

function kt(e) {
    return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]"
}

function V(e) {
    return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]"
}

function G(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
}

function tt(e) {
    return e != null && Object.prototype.toString.call(e) === "[object Object]"
}

function Wr(e) {
    if (Object.getOwnPropertyNames) return Object.getOwnPropertyNames(e).length === 0;
    let t;
    for (t in e)
        if (e.hasOwnProperty(t)) return !1;
    return !0
}

function Os(e) {
    return e === void 0
}

function T(e) {
    let t = +e,
        i = 0;
    return t !== 0 && isFinite(t) && (i = Ze(t)), i
}
var Jt = {},
    ns = {
        date: "day",
        hour: "hours",
        minute: "minutes",
        second: "seconds",
        millisecond: "milliseconds"
    };

function J(e, t) {
    let i = e.toLowerCase(),
        n = e;
    i in ns && (n = ns[i]), Jt[i] = Jt[`${i}s`] = Jt[t] = n
}

function Is(e) {
    return q(e) ? Jt[e] || Jt[e.toLowerCase()] : void 0
}

function Br(e) {
    let t = {},
        i, n;
    for (n in e) G(e, n) && (i = Is(n), i && (t[i] = e[n]));
    return t
}
var me = 0,
    xe = 1,
    ke = 2,
    A = 3,
    he = 4,
    He = 5,
    et = 6,
    Nr = 7,
    $r = 8;

function Se(e, t, i) {
    let n = `${Math.abs(e)}`,
        s = t - n.length,
        a = e >= 0 ? i ? "+" : "" : "-",
        o = Math.pow(10, Math.max(0, s)).toString().substr(1);
    return a + o + n
}
var Zn = {},
    Mt = {},
    Ps = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

function k(e, t, i, n) {
    e && (Mt[e] = n), t && (Mt[t[0]] = function() {
        return Se(n.apply(null, arguments), t[1], t[2])
    }), i && (Mt[i] = function(s, r) {
        return r.locale.ordinal(n.apply(null, arguments), e)
    })
}

function Ur(e) {
    let t = e.match(Ps),
        i = t.length,
        n = new Array(i);
    for (let s = 0; s < i; s++) n[s] = Mt[t[s]] ? Mt[t[s]] : zr(t[s]);
    return function(s, r, a, o = 0) {
        let p = "";
        for (let v = 0; v < i; v++) p += Xe(n[v]) ? n[v].call(null, s, {
            format: e,
            locale: r,
            isUTC: a,
            offset: o
        }) : n[v];
        return p
    }
}

function zr(e) {
    return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
}

function Di(e, t, i) {
    let n = new Date(Date.UTC.apply(null, arguments));
    return e < 100 && e >= 0 && isFinite(n.getUTCFullYear()) && n.setUTCFullYear(e), n
}

function Yn(e, t = 0, i = 1, n = 0, s = 0, r = 0, a = 0) {
    let o = new Date(e, t, i, n, s, r, a);
    return e < 100 && e >= 0 && isFinite(o.getFullYear()) && o.setFullYear(e), o
}

function C(e, t = !1) {
    return t ? e.getUTCHours() : e.getHours()
}

function gt(e, t = !1) {
    return t ? e.getUTCMinutes() : e.getMinutes()
}

function mi(e, t = !1) {
    return t ? e.getUTCSeconds() : e.getSeconds()
}

function Ye(e, t = !1) {
    return t ? e.getUTCMilliseconds() : e.getMilliseconds()
}

function Gr(e) {
    return e.getTime()
}

function pe(e, t = !1) {
    return t ? e.getUTCDay() : e.getDay()
}

function qt(e, t = !1) {
    return t ? e.getUTCDate() : e.getDate()
}

function L(e, t = !1) {
    return t ? e.getUTCMonth() : e.getMonth()
}

function j(e, t = !1) {
    return t ? e.getUTCFullYear() : e.getFullYear()
}

function Jr(e) {
    return Math.floor(e.valueOf() / 1e3)
}

function Rs(e) {
    return Yn(e.getFullYear(), e.getMonth(), 1, e.getHours(), e.getMinutes(), e.getSeconds())
}

function js(e, t) {
    return e.getDay() === Number(t)
}

function it(e, t) {
    return !e || !t ? !1 : st(e, t) && L(e) === L(t)
}

function st(e, t) {
    return !e || !t ? !1 : j(e) === j(t)
}

function Ee(e, t) {
    return !e || !t ? !1 : st(e, t) && it(e, t) && qt(e) === qt(t)
}
var As = /\d/,
    Z = /\d\d/,
    Fs = /\d{3}/,
    hi = /\d{4}/,
    Dn = /[+-]?\d{6}/,
    O = /\d\d?/,
    is = /\d\d\d\d?/,
    ss = /\d\d\d\d\d\d?/,
    yn = /\d{1,3}/,
    pi = /\d{1,4}/,
    kn = /[+-]?\d{1,6}/,
    Qr = /\d+/,
    wn = /[+-]?\d+/;
var qn = /Z|[+-]\d\d(?::?\d\d)?/gi,
    Kr = /[+-]?\d+(\.\d{1,3})?/,
    Qt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
    Tn = {};

function b(e, t, i) {
    if (Xe(t)) {
        Tn[e] = t;
        return
    }
    Tn[e] = function(n, s) {
        return n && i ? i : t
    }
}

function Zr(e, t) {
    return G(Tn, e) ? Tn[e](!1, t) : new RegExp(qr(e))
}

function qr(e) {
    return qe(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, (t, i, n, s, r) => i || n || s || r))
}

function qe(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
}
var fi = {};

function E(e, t) {
    let i = q(e) ? [e] : e,
        n = t;
    if (kt(t) && (n = function(s, r, a) {
            return r[t] = T(s), a
        }), V(i) && Xe(n)) {
        let s;
        for (s = 0; s < i.length; s++) fi[i[s]] = n
    }
}

function Xt(e, t) {
    E(e, function(i, n, s, r) {
        return s._w = s._w || {}, t(i, s._w, s, r)
    })
}

function Xr(e, t, i) {
    return t != null && G(fi, e) && fi[e](t, i._a, i, e), i
}
var ea = {};

function Q(e, t) {
    ea[e] = t
}

function ta() {
    k("D", ["DD", 2, !1], "Do", function(e, t) {
        return qt(e, t.isUTC).toString(10)
    }), J("date", "D"), Q("date", 9), b("D", O), b("DD", O, Z), b("Do", function(e, t) {
        return t._dayOfMonthOrdinalParse || t._ordinalParse
    }), E(["D", "DD"], ke), E("Do", function(e, t, i) {
        return t[ke] = T(e.match(O)[0]), i
    })
}

function na() {
    return {
        empty: !1,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: !1,
        invalidMonth: null,
        invalidFormat: !1,
        userInvalidated: !1,
        iso: !1,
        parsedDateParts: [],
        meridiem: null,
        rfc2822: !1,
        weekdayMismatch: !1
    }
}

function Y(e) {
    return e._pf == null && (e._pf = na()), e._pf
}

function Xn(e, t) {
    return t.locale.getFullYear ? t.locale.getFullYear(e, t.isUTC).toString() : j(e, t.isUTC).toString()
}

function ia() {
    k("Y", null, null, function(e, t) {
        let i = j(e, t.isUTC);
        return i <= 9999 ? i.toString(10) : `+${i}`
    }), k(null, ["YY", 2, !1], null, function(e, t) {
        return (j(e, t.isUTC) % 100).toString(10)
    }), k(null, ["YYYY", 4, !1], null, Xn), k(null, ["YYYYY", 5, !1], null, Xn), k(null, ["YYYYYY", 6, !0], null, Xn), J("year", "y"), Q("year", 1), b("Y", wn), b("YY", O, Z), b("YYYY", pi, hi), b("YYYYY", kn, Dn), b("YYYYYY", kn, Dn), E(["YYYYY", "YYYYYY"], me), E("YYYY", function(e, t, i) {
        return t[me] = e.length === 2 ? gi(e) : T(e), i
    }), E("YY", function(e, t, i) {
        return t[me] = gi(e), i
    }), E("Y", function(e, t, i) {
        return t[me] = parseInt(e, 10), i
    })
}

function gi(e) {
    return T(e) + (T(e) > 68 ? 1900 : 2e3)
}

function Kt(e) {
    return Ws(e) ? 366 : 365
}

function Ws(e) {
    return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
}

function ki(e, t) {
    if (isNaN(e) || isNaN(t)) return NaN;
    let i = Fr(t, 12),
        n = e + (t - i) / 12;
    return i === 1 ? Ws(n) ? 29 : 28 : 31 - i % 7 % 2
}

function sa() {
    k("M", ["MM", 2, !1], "Mo", function(e, t) {
        return (L(e, t.isUTC) + 1).toString(10)
    }), k("MMM", null, null, function(e, t) {
        return t.locale.monthsShort(e, t.format, t.isUTC)
    }), k("MMMM", null, null, function(e, t) {
        return t.locale.months(e, t.format, t.isUTC)
    }), J("month", "M"), Q("month", 8), b("M", O), b("MM", O, Z), b("MMM", function(e, t) {
        return t.monthsShortRegex(e)
    }), b("MMMM", function(e, t) {
        return t.monthsRegex(e)
    }), E(["M", "MM"], function(e, t, i) {
        return t[xe] = T(e) - 1, i
    }), E(["MMM", "MMMM"], function(e, t, i, n) {
        let s = i._locale.monthsParse(e, n, i._strict);
        return s != null ? t[xe] = s : Y(i).invalidMonth = !!e, i
    })
}
var ra = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    seconds: 0
};

function W(e, t) {
    let i = Object.assign({}, ra, t),
        n = e.getFullYear() + (i.year || 0),
        s = e.getMonth() + (i.month || 0),
        r = e.getDate() + (i.day || 0);
    return i.month && !i.day && (r = Math.min(r, ki(n, s))), Yn(n, s, r, e.getHours() + (i.hour || 0), e.getMinutes() + (i.minute || 0), e.getSeconds() + (i.seconds || 0))
}

function Bs(e, t) {
    return Yn(lt(e.getFullYear(), t.year), lt(e.getMonth(), t.month), 1, lt(e.getHours(), t.hour), lt(e.getMinutes(), t.minute), lt(e.getSeconds(), t.seconds), lt(e.getMilliseconds(), t.milliseconds))
}

function lt(e, t) {
    return kt(t) ? t : e
}

function yi(e, t, i) {
    let n = Math.min(qt(e), ki(j(e), t));
    return i ? e.setUTCMonth(t, n) : e.setMonth(t, n), e
}

function aa(e, t, i) {
    return i ? e.setUTCHours(t) : e.setHours(t), e
}

function oa(e, t, i) {
    return i ? e.setUTCMinutes(t) : e.setMinutes(t), e
}

function da(e, t, i) {
    return i ? e.setUTCSeconds(t) : e.setSeconds(t), e
}

function la(e, t, i) {
    return i ? e.setUTCMilliseconds(t) : e.setMilliseconds(t), e
}

function Ns(e, t, i) {
    return i ? e.setUTCDate(t) : e.setDate(t), e
}

function ca(e, t) {
    return e.setTime(t), e
}

function nt(e) {
    return new Date(e.getTime())
}

function we(e, t, i) {
    let n = nt(e);
    switch (t) {
        case "year":
            yi(n, 0, i);
        case "quarter":
        case "month":
            Ns(n, 1, i);
        case "week":
        case "isoWeek":
        case "day":
        case "date":
            aa(n, 0, i);
        case "hours":
            oa(n, 0, i);
        case "minutes":
            da(n, 0, i);
        case "seconds":
            la(n, 0, i)
    }
    return t === "week" && Oo(n, 0, {
        isUTC: i
    }), t === "isoWeek" && Po(n, 1), t === "quarter" && yi(n, Math.floor(L(n, i) / 3) * 3, i), n
}

function nn(e, t, i) {
    let n = t;
    n === "date" && (n = "day");
    let s = we(e, n, i),
        r = en(s, 1, n === "isoWeek" ? "week" : n, i);
    return xo(r, 1, "milliseconds", i)
}

function _a() {
    k("DDD", ["DDDD", 3, !1], "DDDo", function(e) {
        return $s(e).toString(10)
    }), J("dayOfYear", "DDD"), Q("dayOfYear", 4), b("DDD", yn), b("DDDD", Fs), E(["DDD", "DDDD"], function(e, t, i) {
        return i._dayOfYear = T(e), i
    })
}

function $s(e, t) {
    let i = +we(e, "day", t),
        n = +we(e, "year", t),
        s = i - n,
        r = 1e3 * 60 * 60 * 24;
    return Math.round(s / r) + 1
}

function Cn(e, t, i) {
    let n = t - i + 7;
    return -((Di(e, 0, n).getUTCDay() - t + 7) % 7) + n - 1
}

function ua(e, t, i, n, s) {
    let r = (7 + i - n) % 7,
        a = Cn(e, n, s),
        o = 1 + 7 * (t - 1) + r + a,
        p, v;
    return o <= 0 ? (p = e - 1, v = Kt(p) + o) : o > Kt(e) ? (p = e + 1, v = o - Kt(e)) : (p = e, v = o), {
        year: p,
        dayOfYear: v
    }
}

function vt(e, t, i, n) {
    let s = Cn(j(e, n), t, i),
        r = Math.floor(($s(e, n) - s - 1) / 7) + 1,
        a, o;
    return r < 1 ? (o = j(e, n) - 1, a = r + bn(o, t, i)) : r > bn(j(e, n), t, i) ? (a = r - bn(j(e, n), t, i), o = j(e, n) + 1) : (o = j(e, n), a = r), {
        week: a,
        year: o
    }
}

function bn(e, t, i) {
    let n = Cn(e, t, i),
        s = Cn(e + 1, t, i);
    return (Kt(e) - n + s) / 7
}
var rs = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
    ma = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    Us = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    ha = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    zs = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    pa = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    Gs = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    },
    fa = "%d",
    ga = /\d{1,2}/,
    ya = Qt,
    ba = Qt,
    bi = class {
        constructor(t) {
            t && this.set(t)
        }
        set(t) {
            let i;
            for (i in t) {
                if (!t.hasOwnProperty(i)) continue;
                let n = t[i],
                    s = Xe(n) ? i : `_${i}`;
                this[s] = n
            }
            this._config = t
        }
        calendar(t, i, n) {
            let s = this._calendar[t] || this._calendar.sameElse;
            return Xe(s) ? s.call(null, i, n) : s
        }
        longDateFormat(t) {
            let i = this._longDateFormat[t],
                n = this._longDateFormat[t.toUpperCase()];
            return i || !n ? i : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function(s) {
                return s.slice(1)
            }), this._longDateFormat[t])
        }
        get invalidDate() {
            return this._invalidDate
        }
        set invalidDate(t) {
            this._invalidDate = t
        }
        ordinal(t, i) {
            return this._ordinal.replace("%d", t.toString(10))
        }
        preparse(t, i) {
            return t
        }
        getFullYear(t, i = !1) {
            return j(t, i)
        }
        postformat(t) {
            return t
        }
        relativeTime(t, i, n, s) {
            let r = this._relativeTime[n];
            return Xe(r) ? r(t, i, n, s) : r.replace(/%d/i, t.toString(10))
        }
        pastFuture(t, i) {
            let n = this._relativeTime[t > 0 ? "future" : "past"];
            return Xe(n) ? n(i) : n.replace(/%s/i, i)
        }
        months(t, i, n = !1) {
            if (!t) return V(this._months) ? this._months : this._months.standalone;
            if (V(this._months)) return this._months[L(t, n)];
            let s = (this._months.isFormat || rs).test(i) ? "format" : "standalone";
            return this._months[s][L(t, n)]
        }
        monthsShort(t, i, n = !1) {
            if (!t) return V(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
            if (V(this._monthsShort)) return this._monthsShort[L(t, n)];
            let s = rs.test(i) ? "format" : "standalone";
            return this._monthsShort[s][L(t, n)]
        }
        monthsParse(t, i, n) {
            let s, r;
            if (this._monthsParseExact) return this.handleMonthStrictParse(t, i, n);
            this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []);
            let a;
            for (a = 0; a < 12; a++) {
                if (s = new Date(Date.UTC(2e3, a)), n && !this._longMonthsParse[a]) {
                    let o = this.months(s, "", !0).replace(".", ""),
                        p = this.monthsShort(s, "", !0).replace(".", "");
                    this._longMonthsParse[a] = new RegExp(`^${o}$`, "i"), this._shortMonthsParse[a] = new RegExp(`^${p}$`, "i")
                }
                if (!n && !this._monthsParse[a] && (r = `^${this.months(s,"",!0)}|^${this.monthsShort(s,"",!0)}`, this._monthsParse[a] = new RegExp(r.replace(".", ""), "i")), n && i === "MMMM" && this._longMonthsParse[a].test(t) || n && i === "MMM" && this._shortMonthsParse[a].test(t) || !n && this._monthsParse[a].test(t)) return a
            }
        }
        monthsRegex(t) {
            return this._monthsParseExact ? (G(this, "_monthsRegex") || this.computeMonthsParse(), t ? this._monthsStrictRegex : this._monthsRegex) : (G(this, "_monthsRegex") || (this._monthsRegex = ba), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex)
        }
        monthsShortRegex(t) {
            return this._monthsParseExact ? (G(this, "_monthsRegex") || this.computeMonthsParse(), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (G(this, "_monthsShortRegex") || (this._monthsShortRegex = ya), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex)
        }
        week(t, i) {
            return vt(t, this._week.dow, this._week.doy, i).week
        }
        firstDayOfWeek() {
            return this._week.dow
        }
        firstDayOfYear() {
            return this._week.doy
        }
        weekdays(t, i, n) {
            if (!t) return V(this._weekdays) ? this._weekdays : this._weekdays.standalone;
            if (V(this._weekdays)) return this._weekdays[pe(t, n)];
            let s = this._weekdays.isFormat.test(i) ? "format" : "standalone";
            return this._weekdays[s][pe(t, n)]
        }
        weekdaysMin(t, i, n) {
            return t ? this._weekdaysMin[pe(t, n)] : this._weekdaysMin
        }
        weekdaysShort(t, i, n) {
            return t ? this._weekdaysShort[pe(t, n)] : this._weekdaysShort
        }
        weekdaysParse(t, i, n) {
            let s, r;
            if (this._weekdaysParseExact) return this.handleWeekStrictParse(t, i, n);
            for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
                let a = Mn(new Date(Date.UTC(2e3, 1)), s, null, !0);
                if (n && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp(`^${this.weekdays(a,"",!0).replace(".",".?")}$`, "i"), this._shortWeekdaysParse[s] = new RegExp(`^${this.weekdaysShort(a,"",!0).replace(".",".?")}$`, "i"), this._minWeekdaysParse[s] = new RegExp(`^${this.weekdaysMin(a,"",!0).replace(".",".?")}$`, "i")), this._weekdaysParse[s] || (r = `^${this.weekdays(a,"",!0)}|^${this.weekdaysShort(a,"",!0)}|^${this.weekdaysMin(a,"",!0)}`, this._weekdaysParse[s] = new RegExp(r.replace(".", ""), "i")), !V(this._fullWeekdaysParse) || !V(this._shortWeekdaysParse) || !V(this._minWeekdaysParse) || !V(this._weekdaysParse)) return;
                if (n && i === "dddd" && this._fullWeekdaysParse[s].test(t)) return s;
                if (n && i === "ddd" && this._shortWeekdaysParse[s].test(t)) return s;
                if (n && i === "dd" && this._minWeekdaysParse[s].test(t)) return s;
                if (!n && this._weekdaysParse[s].test(t)) return s
            }
        }
        weekdaysRegex(t) {
            return this._weekdaysParseExact ? (G(this, "_weekdaysRegex") || this.computeWeekdaysParse(), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (G(this, "_weekdaysRegex") || (this._weekdaysRegex = Qt), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex)
        }
        weekdaysShortRegex(t) {
            return this._weekdaysParseExact ? (G(this, "_weekdaysRegex") || this.computeWeekdaysParse(), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (G(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Qt), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        }
        weekdaysMinRegex(t) {
            return this._weekdaysParseExact ? (G(this, "_weekdaysRegex") || this.computeWeekdaysParse(), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (G(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Qt), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        }
        isPM(t) {
            return t.toLowerCase().charAt(0) === "p"
        }
        meridiem(t, i, n) {
            return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
        }
        formatLongDate(t) {
            this._longDateFormat = this._longDateFormat ? this._longDateFormat : Gs;
            let i = this._longDateFormat[t],
                n = this._longDateFormat[t.toUpperCase()];
            return i || !n ? i : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, s => s.slice(1)), this._longDateFormat[t])
        }
        handleMonthStrictParse(t, i, n) {
            let s = t.toLocaleLowerCase(),
                r, a, o;
            if (!this._monthsParse)
                for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], r = 0; r < 12; ++r) o = new Date(2e3, r), this._shortMonthsParse[r] = this.monthsShort(o, "").toLocaleLowerCase(), this._longMonthsParse[r] = this.months(o, "").toLocaleLowerCase();
            return n ? i === "MMM" ? (a = this._shortMonthsParse.indexOf(s), a !== -1 ? a : null) : (a = this._longMonthsParse.indexOf(s), a !== -1 ? a : null) : i === "MMM" ? (a = this._shortMonthsParse.indexOf(s), a !== -1 ? a : (a = this._longMonthsParse.indexOf(s), a !== -1 ? a : null)) : (a = this._longMonthsParse.indexOf(s), a !== -1 ? a : (a = this._shortMonthsParse.indexOf(s), a !== -1 ? a : null))
        }
        handleWeekStrictParse(t, i, n) {
            let s, r = t.toLocaleLowerCase();
            if (!this._weekdaysParse) {
                this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [];
                let a;
                for (a = 0; a < 7; ++a) {
                    let o = Mn(new Date(Date.UTC(2e3, 1)), a, null, !0);
                    this._minWeekdaysParse[a] = this.weekdaysMin(o).toLocaleLowerCase(), this._shortWeekdaysParse[a] = this.weekdaysShort(o).toLocaleLowerCase(), this._weekdaysParse[a] = this.weekdays(o, "").toLocaleLowerCase()
                }
            }
            if (!(!V(this._weekdaysParse) || !V(this._shortWeekdaysParse) || !V(this._minWeekdaysParse))) return n ? i === "dddd" ? (s = this._weekdaysParse.indexOf(r), s !== -1 ? s : null) : i === "ddd" ? (s = this._shortWeekdaysParse.indexOf(r), s !== -1 ? s : null) : (s = this._minWeekdaysParse.indexOf(r), s !== -1 ? s : null) : i === "dddd" ? (s = this._weekdaysParse.indexOf(r), s !== -1 || (s = this._shortWeekdaysParse.indexOf(r), s !== -1) ? s : (s = this._minWeekdaysParse.indexOf(r), s !== -1 ? s : null)) : i === "ddd" ? (s = this._shortWeekdaysParse.indexOf(r), s !== -1 || (s = this._weekdaysParse.indexOf(r), s !== -1) ? s : (s = this._minWeekdaysParse.indexOf(r), s !== -1 ? s : null)) : (s = this._minWeekdaysParse.indexOf(r), s !== -1 || (s = this._weekdaysParse.indexOf(r), s !== -1) ? s : (s = this._shortWeekdaysParse.indexOf(r), s !== -1 ? s : null))
        }
        computeMonthsParse() {
            let t = [],
                i = [],
                n = [],
                s, r;
            for (r = 0; r < 12; r++) s = new Date(2e3, r), t.push(this.monthsShort(s, "")), i.push(this.months(s, "")), n.push(this.months(s, "")), n.push(this.monthsShort(s, ""));
            for (t.sort(ze), i.sort(ze), n.sort(ze), r = 0; r < 12; r++) t[r] = qe(t[r]), i[r] = qe(i[r]);
            for (r = 0; r < 24; r++) n[r] = qe(n[r]);
            this._monthsRegex = new RegExp(`^(${n.join("|")})`, "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(`^(${i.join("|")})`, "i"), this._monthsShortStrictRegex = new RegExp(`^(${t.join("|")})`, "i")
        }
        computeWeekdaysParse() {
            let t = [],
                i = [],
                n = [],
                s = [],
                r;
            for (r = 0; r < 7; r++) {
                let a = Mn(new Date(Date.UTC(2e3, 1)), r, null, !0),
                    o = this.weekdaysMin(a),
                    p = this.weekdaysShort(a),
                    v = this.weekdays(a);
                t.push(o), i.push(p), n.push(v), s.push(o), s.push(p), s.push(v)
            }
            for (t.sort(ze), i.sort(ze), n.sort(ze), s.sort(ze), r = 0; r < 7; r++) i[r] = qe(i[r]), n[r] = qe(n[r]), s[r] = qe(s[r]);
            this._weekdaysRegex = new RegExp(`^(${s.join("|")})`, "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(`^(${n.join("|")})`, "i"), this._weekdaysShortStrictRegex = new RegExp(`^(${i.join("|")})`, "i"), this._weekdaysMinStrictRegex = new RegExp(`^(${t.join("|")})`, "i")
        }
    };

function ze(e, t) {
    return t.length - e.length
}
var Ma = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    },
    va = "Invalid date",
    Da = {
        dow: 0,
        doy: 6
    },
    ka = /[ap]\.?m?\.?/i,
    wa = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    },
    Ta = {
        calendar: Ma,
        longDateFormat: Gs,
        invalidDate: va,
        ordinal: fa,
        dayOfMonthOrdinalParse: ga,
        relativeTime: wa,
        months: ma,
        monthsShort: Us,
        week: Da,
        weekdays: ha,
        weekdaysMin: pa,
        weekdaysShort: zs,
        meridiemParse: ka
    };

function Ca(e, t, i) {
    let n = Math.min(e.length, t.length),
        s = Math.abs(e.length - t.length),
        r = 0,
        a;
    for (a = 0; a < n; a++)(i && e[a] !== t[a] || !i && T(e[a]) !== T(t[a])) && r++;
    return r + s
}

function La() {
    k("w", ["ww", 2, !1], "wo", function(e, t) {
        return zt(e, t.locale).toString(10)
    }), k("W", ["WW", 2, !1], "Wo", function(e) {
        return Ya(e).toString(10)
    }), J("week", "w"), J("isoWeek", "W"), Q("week", 5), Q("isoWeek", 5), b("w", O), b("ww", O, Z), b("W", O), b("WW", O, Z), Xt(["w", "ww", "W", "WW"], function(e, t, i, n) {
        return t[n.substr(0, 1)] = T(e), i
    })
}

function zt(e, t = N(), i) {
    return t.week(e, i)
}

function Ya(e, t) {
    return vt(e, 1, 4, t).week
}

function Sa() {
    k(null, ["gg", 2, !1], null, function(e, t) {
        return (Js(e, t.locale) % 100).toString()
    }), k(null, ["GG", 2, !1], null, function(e) {
        return (Qs(e) % 100).toString()
    }), fn("gggg", as), fn("ggggg", as), fn("GGGG", os), fn("GGGGG", os), J("weekYear", "gg"), J("isoWeekYear", "GG"), Q("weekYear", 1), Q("isoWeekYear", 1), b("G", wn), b("g", wn), b("GG", O, Z), b("gg", O, Z), b("GGGG", pi, hi), b("gggg", pi, hi), b("GGGGG", kn, Dn), b("ggggg", kn, Dn), Xt(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, i, n) {
        return t[n.substr(0, 2)] = T(e), i
    }), Xt(["gg", "GG"], function(e, t, i, n) {
        return t[n] = gi(e), i
    })
}

function fn(e, t) {
    k(null, [e, e.length, !1], null, t)
}

function as(e, t) {
    return Js(e, t.locale).toString()
}

function os(e) {
    return Qs(e).toString()
}

function Js(e, t = N(), i) {
    return vt(e, t.firstDayOfWeek(), t.firstDayOfYear(), i).year
}

function Qs(e, t) {
    return vt(e, 1, 4, t).year
}

function xa() {
    k("z", null, null, function(e, t) {
        return t.isUTC ? "UTC" : ""
    }), k("zz", null, null, function(e, t) {
        return t.isUTC ? "Coordinated Universal Time" : ""
    })
}

function Ha() {
    k("X", null, null, function(e) {
        return Jr(e).toString(10)
    }), k("x", null, null, function(e) {
        return e.valueOf().toString(10)
    }), b("x", wn), b("X", Kr), E("X", function(e, t, i) {
        return i._d = new Date(parseFloat(e) * 1e3), i
    }), E("x", function(e, t, i) {
        return i._d = new Date(T(e)), i
    })
}

function Va() {
    k("s", ["ss", 2, !1], null, function(e, t) {
        return mi(e, t.isUTC).toString(10)
    }), J("second", "s"), Q("second", 15), b("s", O), b("ss", O, Z), E(["s", "ss"], He)
}

function Ea() {
    k("Q", null, "Qo", function(e, t) {
        return Oa(e, t.isUTC).toString(10)
    }), J("quarter", "Q"), Q("quarter", 7), b("Q", As), E("Q", function(e, t, i) {
        return t[xe] = (T(e) - 1) * 3, i
    })
}

function Oa(e, t = !1) {
    return Math.ceil((L(e, t) + 1) / 3)
}

function ds(e, t) {
    k(e, null, null, function(i, n) {
        let s = Fa(i, {
                _isUTC: n.isUTC,
                _offset: n.offset
            }),
            r = "+";
        return s < 0 && (s = -s, r = "-"), r + Se(~~(s / 60), 2) + t + Se(~~s % 60, 2)
    })
}

function Ia() {
    ds("Z", ":"), ds("ZZ", ""), b("Z", qn), b("ZZ", qn), E(["Z", "ZZ"], function(e, t, i) {
        return i._useUTC = !0, i._tzm = Ra(qn, e), i
    })
}
var Pa = /([\+\-]|\d\d)/gi;

function Ra(e, t) {
    let i = (t || "").match(e);
    if (i === null) return null;
    let s = i[i.length - 1].match(Pa) || ["-", "0", "0"],
        r = parseInt(s[1], 10) * 60 + T(s[2]),
        a = s[0] === "+" ? r : -r;
    return r === 0 ? 0 : a
}

function ja(e, t, i = {}) {
    if (!i._isUTC) return e;
    let n = nt(t),
        s = (i._offset || 0) * 6e4,
        r = e.valueOf() - n.valueOf() + s;
    return n.setTime(n.valueOf() + r), n
}

function Aa(e) {
    return -Math.round(e.getTimezoneOffset() / 15) * 15
}

function Fa(e, t = {}) {
    let i = t._offset || 0;
    return t._isUTC ? i : Aa(e)
}

function Wa() {
    k("m", ["mm", 2, !1], null, function(e, t) {
        return gt(e, t.isUTC).toString(10)
    }), J("minute", "m"), Q("minute", 14), b("m", O), b("mm", O, Z), E(["m", "mm"], he)
}

function Ba() {
    k("S", null, null, function(i, n) {
        return (~~(Ye(i, n.isUTC) / 100)).toString(10)
    }), k(null, ["SS", 2, !1], null, function(i, n) {
        return (~~(Ye(i, n.isUTC) / 10)).toString(10)
    }), k(null, ["SSS", 3, !1], null, function(i, n) {
        return Ye(i, n.isUTC).toString(10)
    }), k(null, ["SSSS", 4, !1], null, function(i, n) {
        return (Ye(i, n.isUTC) * 10).toString(10)
    }), k(null, ["SSSSS", 5, !1], null, function(i, n) {
        return (Ye(i, n.isUTC) * 100).toString(10)
    }), k(null, ["SSSSSS", 6, !1], null, function(i, n) {
        return (Ye(i, n.isUTC) * 1e3).toString(10)
    }), k(null, ["SSSSSSS", 7, !1], null, function(i, n) {
        return (Ye(i, n.isUTC) * 1e4).toString(10)
    }), k(null, ["SSSSSSSS", 8, !1], null, function(i, n) {
        return (Ye(i, n.isUTC) * 1e5).toString(10)
    }), k(null, ["SSSSSSSSS", 9, !1], null, function(i, n) {
        return (Ye(i, n.isUTC) * 1e6).toString(10)
    }), J("millisecond", "ms"), Q("millisecond", 16), b("S", yn, As), b("SS", yn, Z), b("SSS", yn, Fs);
    let e;
    for (e = "SSSS"; e.length <= 9; e += "S") b(e, Qr);

    function t(i, n, s) {
        return n[et] = T(parseFloat(`0.${i}`) * 1e3), s
    }
    for (e = "S"; e.length <= 9; e += "S") E(e, t)
}

function Na() {
    function e(s, r) {
        return C(s, r) % 12 || 12
    }

    function t(s, r) {
        return C(s, r) || 24
    }
    k("H", ["HH", 2, !1], null, function(s, r) {
        return C(s, r.isUTC).toString(10)
    }), k("h", ["hh", 2, !1], null, function(s, r) {
        return e(s, r.isUTC).toString(10)
    }), k("k", ["kk", 2, !1], null, function(s, r) {
        return t(s, r.isUTC).toString(10)
    }), k("hmm", null, null, function(s, r) {
        let a = e(s, r.isUTC),
            o = Se(gt(s, r.isUTC), 2);
        return `${a}${o}`
    }), k("hmmss", null, null, function(s, r) {
        let a = e(s, r.isUTC),
            o = Se(gt(s, r.isUTC), 2),
            p = Se(mi(s, r.isUTC), 2);
        return `${a}${o}${p}`
    }), k("Hmm", null, null, function(s, r) {
        let a = C(s, r.isUTC),
            o = Se(gt(s, r.isUTC), 2);
        return `${a}${o}`
    }), k("Hmmss", null, null, function(s, r) {
        let a = C(s, r.isUTC),
            o = Se(gt(s, r.isUTC), 2),
            p = Se(mi(s, r.isUTC), 2);
        return `${a}${o}${p}`
    });

    function i(s, r) {
        k(s, null, null, function(a, o) {
            return o.locale.meridiem(C(a, o.isUTC), gt(a, o.isUTC), r)
        })
    }
    i("a", !0), i("A", !1), J("hour", "h"), Q("hour", 13);

    function n(s, r) {
        return r._meridiemParse
    }
    b("a", n), b("A", n), b("H", O), b("h", O), b("k", O), b("HH", O, Z), b("hh", O, Z), b("kk", O, Z), b("hmm", is), b("hmmss", ss), b("Hmm", is), b("Hmmss", ss), E(["H", "HH"], A), E(["k", "kk"], function(s, r, a) {
        let o = T(s);
        return r[A] = o === 24 ? 0 : o, a
    }), E(["a", "A"], function(s, r, a) {
        return a._isPm = a._locale.isPM(s), a._meridiem = s, a
    }), E(["h", "hh"], function(s, r, a) {
        return r[A] = T(s), Y(a).bigHour = !0, a
    }), E("hmm", function(s, r, a) {
        let o = s.length - 2;
        return r[A] = T(s.substr(0, o)), r[he] = T(s.substr(o)), Y(a).bigHour = !0, a
    }), E("hmmss", function(s, r, a) {
        let o = s.length - 4,
            p = s.length - 2;
        return r[A] = T(s.substr(0, o)), r[he] = T(s.substr(o, 2)), r[He] = T(s.substr(p)), Y(a).bigHour = !0, a
    }), E("Hmm", function(s, r, a) {
        let o = s.length - 2;
        return r[A] = T(s.substr(0, o)), r[he] = T(s.substr(o)), a
    }), E("Hmmss", function(s, r, a) {
        let o = s.length - 4,
            p = s.length - 2;
        return r[A] = T(s.substr(0, o)), r[he] = T(s.substr(o, 2)), r[He] = T(s.substr(p)), a
    })
}
var Pe = {},
    $t = {},
    Zt;

function ls(e) {
    return e && e.toLowerCase().replace("_", "-")
}

function $a(e) {
    let t, i, n = 0;
    for (; n < e.length;) {
        let s = ls(e[n]).split("-"),
            r = s.length;
        for (t = ls(e[n + 1]), t = t ? t.split("-") : null; r > 0;) {
            if (i = za(s.slice(0, r).join("-")), i) return i;
            if (t && t.length >= r && Ca(s, t, !0) >= r - 1) break;
            r--
        }
        n++
    }
    return null
}

function Ua(e, t) {
    let i = Object.assign({}, e);
    for (let n in t) G(t, n) && (tt(e[n]) && tt(t[n]) ? (i[n] = {}, Object.assign(i[n], e[n]), Object.assign(i[n], t[n])) : t[n] != null ? i[n] = t[n] : delete i[n]);
    for (let n in e) G(e, n) && !G(t, n) && tt(e[n]) && (i[n] = Object.assign({}, i[n]));
    return i
}

function za(e) {
    return Pe[e] || console.error(`Khronos locale error: please load locale "${e}" before using it`), Pe[e]
}

function Ks(e, t) {
    let i;
    return e && (Os(t) ? i = N(e) : q(e) && (i = Zs(e, t)), i && (Zt = i)), Zt && Zt._abbr
}

function Zs(e, t) {
    if (t === null) return delete Pe[e], Zt = N("en"), null;
    if (!t) return;
    let i = Ta;
    if (t.abbr = e, t.parentLocale != null)
        if (Pe[t.parentLocale] != null) i = Pe[t.parentLocale]._config;
        else return $t[t.parentLocale] || ($t[t.parentLocale] = []), $t[t.parentLocale].push({
            name: e,
            config: t
        }), null;
    return Pe[e] = new bi(Ua(i, t)), $t[e] && $t[e].forEach(function(n) {
        Zs(n.name, n.config)
    }), Ks(e), Pe[e]
}

function N(e) {
    if (Ga(), !e) return Zt;
    let t = V(e) ? e : [e];
    return $a(t)
}

function Ga() {
    Pe.en || (Ks("en", {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal(e) {
            let t = e % 10,
                i = T(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return e + i
        }
    }), La(), Sa(), ia(), xa(), Ha(), Va(), Ea(), Ia(), sa(), Wa(), Ba(), Na(), _a(), Ho(), ta())
}
var Gt = ["year", "quarter", "month", "week", "day", "hours", "minutes", "seconds", "milliseconds"],
    Ja = Gt.reduce((e, t) => (e[t] = !0, e), {});

function Qa(e) {
    if (Object.keys(e).some(n => n in Ja && e[n] === null || isNaN(e[n]))) return !1;
    let i = !1;
    for (let n = 0; n < Gt.length; ++n)
        if (e[Gt[n]]) {
            if (i) return !1;
            e[Gt[n]] !== T(e[Gt[n]]) && (i = !0)
        }
    return !0
}

function cs(e) {
    return e < 0 ? Math.floor(e) : Math.ceil(e)
}

function Ka(e) {
    let t = e._milliseconds,
        i = e._days,
        n = e._months,
        s = e._data;
    t >= 0 && i >= 0 && n >= 0 || t <= 0 && i <= 0 && n <= 0 || (t += cs(Mi(n) + i) * 864e5, i = 0, n = 0), s.milliseconds = t % 1e3;
    let r = Ze(t / 1e3);
    s.seconds = r % 60;
    let a = Ze(r / 60);
    s.minutes = a % 60;
    let o = Ze(a / 60);
    s.hours = o % 24, i += Ze(o / 24);
    let p = Ze(qs(i));
    n += p, i -= cs(Mi(p));
    let v = Ze(n / 12);
    return n %= 12, s.day = i, s.month = n, s.year = v, e
}

function qs(e) {
    return e * 4800 / 146097
}

function Mi(e) {
    return e * 146097 / 4800
}
var ct = Math.round,
    _t = {
        ss: 44,
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    };

function Za(e, t, i, n, s) {
    return s.relativeTime(t || 1, !!i, e, n)
}

function qa(e, t, i) {
    let n = Yi(e).abs(),
        s = ct(n.as("s")),
        r = ct(n.as("m")),
        a = ct(n.as("h")),
        o = ct(n.as("d")),
        p = ct(n.as("M")),
        v = ct(n.as("y")),
        S = s <= _t.ss && ["s", s] || s < _t.s && ["ss", s] || r <= 1 && ["m"] || r < _t.m && ["mm", r] || a <= 1 && ["h"] || a < _t.h && ["hh", a] || o <= 1 && ["d"] || o < _t.d && ["dd", o] || p <= 1 && ["M"] || p < _t.M && ["MM", p] || v <= 1 && ["y"] || ["yy", v],
        $ = [S[0], S[1], t, +e > 0, i];
    return Za.apply(null, $)
}
var Ln = class {
    constructor(t, i = {}) {
        this._data = {}, this._locale = N(), this._locale = i && i._locale || N();
        let n = t,
            s = n.year || 0,
            r = n.quarter || 0,
            a = n.month || 0,
            o = n.week || 0,
            p = n.day || 0,
            v = n.hours || 0,
            S = n.minutes || 0,
            $ = n.seconds || 0,
            K = n.milliseconds || 0;
        return this._isValid = Qa(n), this._milliseconds = +K + $ * 1e3 + S * 60 * 1e3 + v * 1e3 * 60 * 60, this._days = +p + o * 7, this._months = +a + r * 3 + s * 12, Ka(this)
    }
    isValid() {
        return this._isValid
    }
    humanize(t) {
        if (!this.isValid()) return this.localeData().invalidDate;
        let i = this.localeData(),
            n = qa(this, !t, i);
        return t && (n = i.pastFuture(+this, n)), i.postformat(n)
    }
    localeData() {
        return this._locale
    }
    locale(t) {
        return t ? (this._locale = N(t) || this._locale, this) : this._locale._abbr
    }
    abs() {
        let t = Math.abs,
            i = this._data;
        return this._milliseconds = t(this._milliseconds), this._days = t(this._days), this._months = t(this._months), i.milliseconds = t(i.milliseconds), i.seconds = t(i.seconds), i.minutes = t(i.minutes), i.hours = t(i.hours), i.month = t(i.month), i.year = t(i.year), this
    }
    as(t) {
        if (!this.isValid()) return NaN;
        let i, n, s = this._milliseconds,
            r = Is(t);
        if (r === "month" || r === "year") return i = this._days + s / 864e5, n = this._months + qs(i), r === "month" ? n : n / 12;
        switch (i = this._days + Math.round(Mi(this._months)), r) {
            case "week":
                return i / 7 + s / 6048e5;
            case "day":
                return i + s / 864e5;
            case "hours":
                return i * 24 + s / 36e5;
            case "minutes":
                return i * 1440 + s / 6e4;
            case "seconds":
                return i * 86400 + s / 1e3;
            case "milliseconds":
                return Math.floor(i * 864e5) + s;
            default:
                throw new Error(`Unknown unit ${r}`)
        }
    }
    valueOf() {
        return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + T(this._months / 12) * 31536e6 : NaN
    }
};

function Xa(e) {
    return e instanceof Ln
}

function wi(e) {
    if (e._isValid == null) {
        let t = Y(e),
            i = Array.prototype.some.call(t.parsedDateParts, function(s) {
                return s != null
            }),
            n = !isNaN(e._d && e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && i);
        if (e._strict && (n = n && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e)) e._isValid = n;
        else return n
    }
    return e._isValid
}

function Sn(e, t) {
    return e._d = new Date(NaN), Object.assign(Y(e), t || {
        userInvalidated: !0
    }), e
}

function eo(e) {
    return e._isValid = !1, e
}
var to = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    no = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    io = /Z|[+-]\d\d(?::?\d\d)?/,
    gn = [
        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/, !0],
        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/, !0],
        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/, !0],
        ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
        ["YYYY-DDD", /\d{4}-\d{3}/, !0],
        ["YYYY-MM", /\d{4}-\d\d/, !1],
        ["YYYYYYMMDD", /[+-]\d{10}/, !0],
        ["YYYYMMDD", /\d{8}/, !0],
        ["GGGG[W]WWE", /\d{4}W\d{3}/, !0],
        ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
        ["YYYYDDD", /\d{7}/, !0]
    ],
    ei = [
        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
        ["HH:mm", /\d\d:\d\d/],
        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
        ["HHmmss", /\d\d\d\d\d\d/],
        ["HHmm", /\d\d\d\d/],
        ["HH", /\d\d/]
    ],
    so = /^\/?Date\((\-?\d+)/i,
    ro = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480
    },
    ao = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function Xs(e) {
    if (!q(e._i)) return e;
    let t = e._i,
        i = to.exec(t) || no.exec(t),
        n, s, r, a;
    if (!i) return e._isValid = !1, e;
    let o, p;
    for (o = 0, p = gn.length; o < p; o++)
        if (gn[o][1].exec(i[1])) {
            s = gn[o][0], n = gn[o][2] !== !1;
            break
        }
    if (s == null) return e._isValid = !1, e;
    if (i[3]) {
        for (o = 0, p = ei.length; o < p; o++)
            if (ei[o][1].exec(i[3])) {
                r = (i[2] || " ") + ei[o][0];
                break
            }
        if (r == null) return e._isValid = !1, e
    }
    if (!n && r != null) return e._isValid = !1, e;
    if (i[4])
        if (io.exec(i[4])) a = "Z";
        else return e._isValid = !1, e;
    return e._f = s + (r || "") + (a || ""), Ci(e)
}

function oo(e, t, i, n, s, r) {
    let a = [lo(e), Us.indexOf(t), parseInt(i, 10), parseInt(n, 10), parseInt(s, 10)];
    return r && a.push(parseInt(r, 10)), a
}

function lo(e) {
    let t = parseInt(e, 10);
    return t <= 49 ? t + 2e3 : t
}

function co(e) {
    return e.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim()
}

function _o(e, t, i) {
    if (e) {
        let n = zs.indexOf(e),
            s = new Date(t[0], t[1], t[2]).getDay();
        if (n !== s) return Y(i).weekdayMismatch = !0, i._isValid = !1, !1
    }
    return !0
}

function uo(e, t, i) {
    if (e) return ro[e];
    if (t) return 0; {
        let n = parseInt(i, 10),
            s = n % 100;
        return (n - s) / 100 * 60 + s
    }
}

function er(e) {
    if (!q(e._i)) return e;
    let t = ao.exec(co(e._i));
    if (!t) return eo(e);
    let i = oo(t[4], t[3], t[2], t[5], t[6], t[7]);
    return _o(t[1], i, e) && (e._a = i, e._tzm = uo(t[8], t[9], t[10]), e._d = Di.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), Y(e).rfc2822 = !0), e
}

function mo(e) {
    if (!q(e._i)) return e;
    let t = so.exec(e._i);
    if (t !== null) return e._d = new Date(+t[1]), e;
    if (Xs(e), e._isValid === !1) delete e._isValid;
    else return e;
    if (er(e), e._isValid === !1) delete e._isValid;
    else return e;
    return Sn(e)
}

function X(e, t, i, n, s = 0) {
    let r = N(i || "en");
    if (!r) throw new Error(`Locale "${i}" is not defined, please add it with "defineLocale(...)"`);
    let o = ho(e, t || (n ? "YYYY-MM-DDTHH:mm:ss[Z]" : "YYYY-MM-DDTHH:mm:ssZ"), r, n, s);
    return o && r.postformat(o)
}

function ho(e, t, i, n, s = 0) {
    if (!Ve(e)) return i.invalidDate;
    let r = tr(t, i);
    return Zn[r] = Zn[r] || Ur(r), Zn[r](e, i, n, s)
}

function tr(e, t) {
    let i = e,
        n = 5,
        s = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        r = a => t.formatLongDate(a) || a;
    for (s.lastIndex = 0; n >= 0 && s.test(i);) i = i.replace(s, r), s.lastIndex = 0, n -= 1;
    return i
}

function yt(e, t, i) {
    return e ? ? t ? ? i
}

function po(e) {
    let t = new Date;
    return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
}

function Ti(e) {
    let t = [],
        i, n, s;
    if (e._d) return e;
    let r = po(e);
    for (e._w && e._a[ke] == null && e._a[xe] == null && fo(e), e._dayOfYear != null && (s = yt(e._a[me], r[me]), (e._dayOfYear > Kt(s) || e._dayOfYear === 0) && (Y(e)._overflowDayOfYear = !0), n = new Date(Date.UTC(s, 0, e._dayOfYear)), e._a[xe] = n.getUTCMonth(), e._a[ke] = n.getUTCDate()), i = 0; i < 3 && e._a[i] == null; ++i) e._a[i] = t[i] = r[i];
    for (; i < 7; i++) e._a[i] = t[i] = e._a[i] == null ? i === 2 ? 1 : 0 : e._a[i];
    e._a[A] === 24 && e._a[he] === 0 && e._a[He] === 0 && e._a[et] === 0 && (e._nextDay = !0, e._a[A] = 0), e._d = (e._useUTC ? Di : Yn).apply(null, t);
    let a = e._useUTC ? e._d.getUTCDay() : e._d.getDay();
    return e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[A] = 24), e._w && typeof e._w.d < "u" && e._w.d !== a && (Y(e).weekdayMismatch = !0), e
}

function fo(e) {
    let t, i, n, s, r, a, o, p = e._w;
    if (p.GG != null || p.W != null || p.E != null) s = 1, r = 4, t = yt(p.GG, e._a[me], vt(new Date, 1, 4).year), i = yt(p.W, 1), n = yt(p.E, 1), (n < 1 || n > 7) && (o = !0);
    else {
        s = e._locale._week.dow, r = e._locale._week.doy;
        let v = vt(new Date, s, r);
        t = yt(p.gg, e._a[me], v.year), i = yt(p.w, v.week), p.d != null ? (n = p.d, (n < 0 || n > 6) && (o = !0)) : p.e != null ? (n = p.e + s, (p.e < 0 || p.e > 6) && (o = !0)) : n = s
    }
    return i < 1 || i > bn(t, s, r) ? Y(e)._overflowWeeks = !0 : o != null ? Y(e)._overflowWeekday = !0 : (a = ua(t, i, n, s, r), e._a[me] = a.year, e._dayOfYear = a.dayOfYear), e
}

function nr(e) {
    let t, i = e._a;
    return i && Y(e).overflow === -2 && (t = i[xe] < 0 || i[xe] > 11 ? xe : i[ke] < 1 || i[ke] > ki(i[me], i[xe]) ? ke : i[A] < 0 || i[A] > 24 || i[A] === 24 && (i[he] !== 0 || i[He] !== 0 || i[et] !== 0) ? A : i[he] < 0 || i[he] > 59 ? he : i[He] < 0 || i[He] > 59 ? He : i[et] < 0 || i[et] > 999 ? et : -1, Y(e)._overflowDayOfYear && (t < me || t > ke) && (t = ke), Y(e)._overflowWeeks && t === -1 && (t = Nr), Y(e)._overflowWeekday && t === -1 && (t = $r), Y(e).overflow = t), e
}
var go = "ISO_8601",
    yo = "RFC_2822";

function Ci(e) {
    if (e._f === go) return Xs(e);
    if (e._f === yo) return er(e);
    if (e._a = [], Y(e).empty = !0, V(e._f) || !e._i && e._i !== 0) return e;
    let t = e._i.toString(),
        i = 0,
        n = t.length,
        s = tr(e._f, e._locale).match(Ps) || [],
        r, a, o, p;
    for (r = 0; r < s.length; r++) a = s[r], o = (t.match(Zr(a, e._locale)) || [])[0], o && (p = t.substr(0, t.indexOf(o)), p.length > 0 && Y(e).unusedInput.push(p), t = t.slice(t.indexOf(o) + o.length), i += o.length), Mt[a] ? (o ? Y(e).empty = !1 : Y(e).unusedTokens.push(a), Xr(a, o, e)) : e._strict && !o && Y(e).unusedTokens.push(a);
    return Y(e).charsLeftOver = n - i, t.length > 0 && Y(e).unusedInput.push(t), e._a[A] <= 12 && Y(e).bigHour === !0 && e._a[A] > 0 && (Y(e).bigHour = void 0), Y(e).parsedDateParts = e._a.slice(0), Y(e).meridiem = e._meridiem, e._a[A] = bo(e._locale, e._a[A], e._meridiem), Ti(e), nr(e)
}

function bo(e, t, i) {
    let n = t;
    if (i == null) return n;
    if (e.meridiemHour != null) return e.meridiemHour(n, i);
    if (e.isPM == null) return n;
    let s = e.isPM(i);
    return s && n < 12 && (n += 12), !s && n === 12 && (n = 0), n
}

function Mo(e) {
    let t, i, n, s;
    if (!e._f || e._f.length === 0) return Y(e).invalidFormat = !0, Sn(e);
    let r;
    for (r = 0; r < e._f.length; r++) s = 0, t = Object.assign({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[r], Ci(t), wi(t) && (s += Y(t).charsLeftOver, s += Y(t).unusedTokens.length * 10, Y(t).score = s, (n == null || s < n) && (n = s, i = t));
    return Object.assign(e, i || t)
}

function vo(e) {
    if (e._d) return e;
    let t = e._i;
    if (tt(t)) {
        let i = Br(t);
        e._a = [i.year, i.month, i.day, i.hours, i.minutes, i.seconds, i.milliseconds].map(n => q(n) ? parseInt(n, 10) : n)
    }
    return Ti(e)
}

function Do(e) {
    let t = nr(ko(e));
    return t._d = new Date(t._d != null ? t._d.getTime() : NaN), wi(Object.assign({}, t, {
        _isValid: null
    })) || (t._d = new Date(NaN)), t
}

function ko(e) {
    let t = e._i,
        i = e._f;
    return e._locale = e._locale || N(e._l), t === null || i === void 0 && t === "" ? Sn(e, {
        nullInput: !0
    }) : (q(t) && (e._i = t = e._locale.preparse(t, i)), tn(t) ? (e._d = nt(t), e) : (V(i) ? Mo(e) : i ? Ci(e) : wo(e), wi(e) || (e._d = null), e))
}

function wo(e) {
    let t = e._i;
    if (Os(t)) e._d = new Date;
    else if (tn(t)) e._d = nt(t);
    else if (q(t)) mo(e);
    else if (V(t) && t.length) {
        let i = t.slice(0);
        e._a = i.map(n => q(n) ? parseInt(n, 10) : n), Ti(e)
    } else if (tt(t)) vo(e);
    else if (kt(t)) e._d = new Date(t);
    else return Sn(e);
    return e
}

function To(e, t, i, n, s) {
    let r = {},
        a = e;
    return (tt(a) && Wr(a) || V(a) && a.length === 0) && (a = void 0), r._useUTC = r._isUTC = s, r._l = i, r._i = a, r._f = t, r._strict = n, Do(r)
}

function Dt(e, t, i, n, s) {
    return tn(e) ? e : To(e, t, i, n, s)._d
}

function Li(e) {
    return e instanceof Date ? new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds()) : null
}

function vi(e) {
    return e < 0 ? Math.round(e * -1) * -1 : Math.round(e)
}

function Oe(e, t, i = "milliseconds") {
    return !e || !t ? !1 : i === "milliseconds" ? e.valueOf() > t.valueOf() : t.valueOf() < we(e, i).valueOf()
}

function je(e, t, i = "milliseconds") {
    return !e || !t ? !1 : i === "milliseconds" ? e.valueOf() < t.valueOf() : nn(e, i).valueOf() < t.valueOf()
}

function ir(e, t) {
    return typeof t > "u" || !t || !t.length ? !1 : t.some(i => i === e.getDay())
}

function sn(e, t, i = "milliseconds") {
    if (!e || !t) return !1;
    if (i === "milliseconds") return e.valueOf() === t.valueOf();
    let n = t.valueOf();
    return we(e, i).valueOf() <= n && n <= nn(e, i).valueOf()
}
var Co = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
    Lo = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function Yi(e, t, i = {}) {
    let n = Yo(e, t);
    return new Ln(n, i)
}

function Yo(e, t) {
    if (e == null) return {};
    if (Xa(e)) return {
        milliseconds: e._milliseconds,
        day: e._days,
        month: e._months
    };
    if (kt(e)) return t ? {
        [t]: e
    } : {
        milliseconds: e
    };
    if (q(e)) {
        let i = Co.exec(e);
        if (i) {
            let n = i[1] === "-" ? -1 : 1;
            return {
                year: 0,
                day: T(i[ke]) * n,
                hours: T(i[A]) * n,
                minutes: T(i[he]) * n,
                seconds: T(i[He]) * n,
                milliseconds: T(vi(T(i[et]) * 1e3)) * n
            }
        }
        if (i = Lo.exec(e), i) {
            let n = i[1] === "-" ? -1 : (i[1] === "+", 1);
            return {
                year: Ge(i[2], n),
                month: Ge(i[3], n),
                week: Ge(i[4], n),
                day: Ge(i[5], n),
                hours: Ge(i[6], n),
                minutes: Ge(i[7], n),
                seconds: Ge(i[8], n)
            }
        }
    }
    if (tt(e) && ("from" in e || "to" in e)) {
        let i = So(Dt(e.from), Dt(e.to));
        return {
            milliseconds: i.milliseconds,
            month: i.months
        }
    }
    return e
}

function Ge(e, t) {
    let i = e && parseFloat(e.replace(",", "."));
    return (isNaN(i) ? 0 : i) * t
}

function _s(e, t) {
    let i = {
        milliseconds: 0,
        months: 0
    };
    i.months = L(t) - L(e) + (j(t) - j(e)) * 12;
    let n = en(nt(e), i.months, "month");
    return Oe(n, t) && --i.months, i.milliseconds = +t - +en(nt(e), i.months, "month"), i
}

function So(e, t) {
    if (!(Ve(e) && Ve(t))) return {
        milliseconds: 0,
        months: 0
    };
    let i, n = ja(t, e, {
        _offset: e.getTimezoneOffset()
    });
    return je(e, n) ? i = _s(e, n) : (i = _s(n, e), i.milliseconds = -i.milliseconds, i.months = -i.months), i
}

function en(e, t, i, n) {
    let s = Yi(t, i);
    return sr(e, s, 1, n)
}

function xo(e, t, i, n) {
    let s = Yi(t, i);
    return sr(e, s, -1, n)
}

function sr(e, t, i, n) {
    let s = t._milliseconds,
        r = vi(t._days),
        a = vi(t._months);
    return a && yi(e, L(e, n) + a * i, n), r && Ns(e, qt(e, n) + r * i, n), s && ca(e, Gr(e) + s * i), nt(e)
}

function Ho() {
    k("d", null, "do", function(e, t) {
        return pe(e, t.isUTC).toString(10)
    }), k("dd", null, null, function(e, t) {
        return t.locale.weekdaysMin(e, t.format, t.isUTC)
    }), k("ddd", null, null, function(e, t) {
        return t.locale.weekdaysShort(e, t.format, t.isUTC)
    }), k("dddd", null, null, function(e, t) {
        return t.locale.weekdays(e, t.format, t.isUTC)
    }), k("e", null, null, function(e, t) {
        return rr(e, t.locale, t.isUTC).toString(10)
    }), k("E", null, null, function(e, t) {
        return Io(e, t.isUTC).toString(10)
    }), J("day", "d"), J("weekday", "e"), J("isoWeekday", "E"), Q("day", 11), Q("weekday", 11), Q("isoWeekday", 11), b("d", O), b("e", O), b("E", O), b("dd", function(e, t) {
        return t.weekdaysMinRegex(e)
    }), b("ddd", function(e, t) {
        return t.weekdaysShortRegex(e)
    }), b("dddd", function(e, t) {
        return t.weekdaysRegex(e)
    }), Xt(["dd", "ddd", "dddd"], function(e, t, i, n) {
        let s = i._locale.weekdaysParse(e, n, i._strict);
        return s != null ? t.d = s : Y(i).invalidWeekday = !!e, i
    }), Xt(["d", "e", "E"], function(e, t, i, n) {
        return t[n] = T(e), i
    })
}

function Vo(e, t) {
    if (!q(e)) return e;
    let i = parseInt(e, 10);
    if (!isNaN(i)) return i;
    let n = t.weekdaysParse(e);
    return kt(n) ? n : null
}

function Eo(e, t = N()) {
    return q(e) ? t.weekdaysParse(e) % 7 || 7 : kt(e) && isNaN(e) ? null : e
}

function Mn(e, t, i = N(), n) {
    let s = pe(e, n),
        r = Vo(t, i);
    return en(e, r - s, "day")
}

function F(e, t) {
    return pe(e, t)
}

function rr(e, t = N(), i) {
    return (pe(e, i) + 7 - t.firstDayOfWeek()) % 7
}

function Oo(e, t, i = {}) {
    let n = rr(e, i.locale, i.isUTC);
    return en(e, t - n, "day")
}

function Io(e, t) {
    return pe(e, t) || 7
}

function Po(e, t, i = {}) {
    let n = Eo(t, i.locale);
    return Mn(e, F(e) % 7 ? n : n - 7)
}
var Ro = {
        1: "\u0661",
        2: "\u0662",
        3: "\u0663",
        4: "\u0664",
        5: "\u0665",
        6: "\u0666",
        7: "\u0667",
        8: "\u0668",
        9: "\u0669",
        0: "\u0660"
    },
    jo = {
        "\u0661": "1",
        "\u0662": "2",
        "\u0663": "3",
        "\u0664": "4",
        "\u0665": "5",
        "\u0666": "6",
        "\u0667": "7",
        "\u0668": "8",
        "\u0669": "9",
        "\u0660": "0"
    },
    us = function(e) {
        return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5
    },
    Ao = {
        s: ["\u0623\u0642\u0644 \u0645\u0646 \u062B\u0627\u0646\u064A\u0629", "\u062B\u0627\u0646\u064A\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062B\u0627\u0646\u064A\u062A\u0627\u0646", "\u062B\u0627\u0646\u064A\u062A\u064A\u0646"], "%d \u062B\u0648\u0627\u0646", "%d \u062B\u0627\u0646\u064A\u0629", "%d \u062B\u0627\u0646\u064A\u0629"],
        m: ["\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629", "\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062F\u0642\u064A\u0642\u062A\u0627\u0646", "\u062F\u0642\u064A\u0642\u062A\u064A\u0646"], "%d \u062F\u0642\u0627\u0626\u0642", "%d \u062F\u0642\u064A\u0642\u0629", "%d \u062F\u0642\u064A\u0642\u0629"],
        h: ["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629", "\u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u0633\u0627\u0639\u062A\u0627\u0646", "\u0633\u0627\u0639\u062A\u064A\u0646"], "%d \u0633\u0627\u0639\u0627\u062A", "%d \u0633\u0627\u0639\u0629", "%d \u0633\u0627\u0639\u0629"],
        d: ["\u0623\u0642\u0644 \u0645\u0646 \u064A\u0648\u0645", "\u064A\u0648\u0645 \u0648\u0627\u062D\u062F", ["\u064A\u0648\u0645\u0627\u0646", "\u064A\u0648\u0645\u064A\u0646"], "%d \u0623\u064A\u0627\u0645", "%d \u064A\u0648\u0645\u064B\u0627", "%d \u064A\u0648\u0645"],
        M: ["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631", "\u0634\u0647\u0631 \u0648\u0627\u062D\u062F", ["\u0634\u0647\u0631\u0627\u0646", "\u0634\u0647\u0631\u064A\u0646"], "%d \u0623\u0634\u0647\u0631", "%d \u0634\u0647\u0631\u0627", "%d \u0634\u0647\u0631"],
        y: ["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645", "\u0639\u0627\u0645 \u0648\u0627\u062D\u062F", ["\u0639\u0627\u0645\u0627\u0646", "\u0639\u0627\u0645\u064A\u0646"], "%d \u0623\u0639\u0648\u0627\u0645", "%d \u0639\u0627\u0645\u064B\u0627", "%d \u0639\u0627\u0645"]
    },
    ee = function(e) {
        return function(t, i) {
            let n = us(t),
                s = Ao[e][us(t)];
            return n === 2 && (s = s[i ? 0 : 1]), s.replace(/%d/i, t.toString())
        }
    },
    ms = ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"],
    zc = {
        abbr: "ar",
        months: ms,
        monthsShort: ms,
        weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
        weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
        weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "D/\u200FM/\u200FYYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /ص|م/,
        isPM(e) {
            return e === "\u0645"
        },
        meridiem(e, t, i) {
            return e < 12 ? "\u0635" : "\u0645"
        },
        calendar: {
            sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
            nextDay: "[\u063A\u062F\u064B\u0627 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
            nextWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
            lastDay: "[\u0623\u0645\u0633 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
            lastWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "\u0628\u0639\u062F %s",
            past: "\u0645\u0646\u0630 %s",
            s: ee("s"),
            ss: ee("s"),
            m: ee("m"),
            mm: ee("m"),
            h: ee("h"),
            hh: ee("h"),
            d: ee("d"),
            dd: ee("d"),
            M: ee("M"),
            MM: ee("M"),
            y: ee("y"),
            yy: ee("y")
        },
        preparse(e) {
            return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(t) {
                return jo[t]
            }).replace(/،/g, ",")
        },
        postformat(e) {
            return e.replace(/\d/g, function(t) {
                return Ro[t]
            }).replace(/,/g, "\u060C")
        },
        week: {
            dow: 6,
            doy: 12
        }
    };
var Gc = {
    abbr: "bg",
    months: "\u044F\u043D\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0438\u043B_\u043C\u0430\u0439_\u044E\u043D\u0438_\u044E\u043B\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438_\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438_\u043D\u043E\u0435\u043C\u0432\u0440\u0438_\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438".split("_"),
    monthsShort: "\u044F\u043D\u0440_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0439_\u044E\u043D\u0438_\u044E\u043B\u0438_\u0430\u0432\u0433_\u0441\u0435\u043F_\u043E\u043A\u0442_\u043D\u043E\u0435_\u0434\u0435\u043A".split("_"),
    weekdays: "\u043D\u0435\u0434\u0435\u043B\u044F_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u044F\u0434\u0430_\u0447\u0435\u0442\u0432\u044A\u0440\u0442\u044A\u043A_\u043F\u0435\u0442\u044A\u043A_\u0441\u044A\u0431\u043E\u0442\u0430".split("_"),
    weekdaysShort: "\u043D\u0435\u0434_\u043F\u043E\u043D_\u0432\u0442\u043E_\u0441\u0440\u044F_\u0447\u0435\u0442_\u043F\u0435\u0442_\u0441\u044A\u0431".split("_"),
    weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
    longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "D.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY H:mm",
        LLLL: "dddd, D MMMM YYYY H:mm"
    },
    calendar: {
        sameDay: "[\u0414\u043D\u0435\u0441 \u0432] LT",
        nextDay: "[\u0423\u0442\u0440\u0435 \u0432] LT",
        nextWeek: "dddd [\u0432] LT",
        lastDay: "[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",
        lastWeek: function(e) {
            switch (e) {
                case 0:
                case 3:
                case 6:
                    return "[\u0412 \u0438\u0437\u043C\u0438\u043D\u0430\u043B\u0430\u0442\u0430] dddd [\u0432] LT";
                case 1:
                case 2:
                case 4:
                case 5:
                    return "[\u0412 \u0438\u0437\u043C\u0438\u043D\u0430\u043B\u0438\u044F] dddd [\u0432] LT"
            }
        },
        sameElse: "L"
    },
    relativeTime: {
        future: "\u0441\u043B\u0435\u0434 %s",
        past: "\u043F\u0440\u0435\u0434\u0438 %s",
        s: "\u043D\u044F\u043A\u043E\u043B\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438",
        ss: "%d \u0441\u0435\u043A\u0443\u043D\u0434\u0438",
        m: "\u043C\u0438\u043D\u0443\u0442\u0430",
        mm: "%d \u043C\u0438\u043D\u0443\u0442\u0438",
        h: "\u0447\u0430\u0441",
        hh: "%d \u0447\u0430\u0441\u0430",
        d: "\u0434\u0435\u043D",
        dd: "%d \u0434\u043D\u0438",
        M: "\u043C\u0435\u0441\u0435\u0446",
        MM: "%d \u043C\u0435\u0441\u0435\u0446\u0430",
        y: "\u0433\u043E\u0434\u0438\u043D\u0430",
        yy: "%d \u0433\u043E\u0434\u0438\u043D\u0438"
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
    ordinal: function(e) {
        let t = Number(e),
            i = t % 10,
            n = t % 100;
        return t === 0 ? t + "-\u0435\u0432" : n === 0 ? t + "-\u0435\u043D" : n > 10 && n < 20 ? t + "-\u0442\u0438" : i === 1 ? t + "-\u0432\u0438" : i === 2 ? t + "-\u0440\u0438" : i === 7 || i === 8 ? t + "-\u043C\u0438" : t + "-\u0442\u0438"
    },
    week: {
        dow: 1,
        doy: 7
    }
};
var hs = "gen._feb._mar._abr._mai._jun._jul._ago._set._oct._nov._des.".split("_"),
    Fo = "ene_feb_mar_abr_mai_jun_jul_ago_set_oct_nov_des".split("_"),
    ti = [/^gen/i, /^feb/i, /^mar/i, /^abr/i, /^mai/i, /^jun/i, /^jul/i, /^ago/i, /^set/i, /^oct/i, /^nov/i, /^des/i],
    ps = /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre|gen\.?|feb\.?|mar\.?|abr\.?|mai\.?|jun\.?|jul\.?|ago\.?|set\.?|oct\.?|nov\.?|des\.?)/i,
    Jc = {
        abbr: "ca",
        months: "gener_febrer_mar\xE7_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
        monthsShort(e, t, i) {
            return e ? /-MMM-/.test(t) ? Fo[L(e, i)] : hs[L(e, i)] : hs
        },
        monthsRegex: ps,
        monthsShortRegex: ps,
        monthsStrictRegex: /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre)/i,
        monthsShortStrictRegex: /^(gen\.?|feb\.?|mar\.?|abr\.?|mai\.?|jun\.?|jul\.?|ago\.?|set\.?|oct\.?|nov\.?|des\.?)/i,
        monthsParse: ti,
        longMonthsParse: ti,
        shortMonthsParse: ti,
        weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
        weekdaysShort: "diu._dil._dim._dix._dij._div._dis.".split("_"),
        weekdaysMin: "dg_dl_dt_dc_dj_dv_ds".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        calendar: {
            sameDay(e) {
                return "[avui a " + ("la" + (C(e) !== 1) ? "les" : "") + "] LT"
            },
            nextDay(e) {
                return "[dema a " + ("la" + (C(e) !== 1) ? "les" : "") + "] LT"
            },
            nextWeek(e) {
                return "dddd [a " + ("la" + (C(e) !== 1) ? "les" : "") + "] LT"
            },
            lastDay(e) {
                return "[ahir a " + ("la" + (C(e) !== 1) ? "les" : "") + "] LT"
            },
            lastWeek(e) {
                return "[el] dddd [" + ("passada la " + (C(e) !== 1) ? "passades les" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "fa %s",
            s: "uns segons",
            ss: "%d segons",
            m: "un minut",
            mm: "%d minuts",
            h: "una hora",
            hh: "%d hores",
            d: "un dia",
            dd: "%d dies",
            M: "un mes",
            MM: "%d mesos",
            y: "un any",
            yy: "%d anys"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|on|er|rt|é)/,
        ordinal(e) {
            let t = Number(e),
                i = t > 4 ? "\xE9" : t === 1 || t === 3 ? "r" : t === 2 ? "n" : t === 4 ? "t" : "\xE9";
            return t + i
        },
        week: {
            dow: 1,
            doy: 4
        }
    };
var ni = "leden_\xFAnor_b\u0159ezen_duben_kv\u011Bten_\u010Derven_\u010Dervenec_srpen_z\xE1\u0159\xED_\u0159\xEDjen_listopad_prosinec".split("_"),
    ii = "led_\xFAno_b\u0159e_dub_kv\u011B_\u010Dvn_\u010Dvc_srp_z\xE1\u0159_\u0159\xEDj_lis_pro".split("_");

function ut(e) {
    return e > 1 && e < 5 && ~~(e / 10) !== 1
}

function te(e, t, i, n) {
    let s = e + " ";
    switch (i) {
        case "s":
            return t || n ? "p\xE1r sekund" : "p\xE1r sekundami";
        case "ss":
            return t || n ? s + (ut(e) ? "sekundy" : "sekund") : s + "sekundami";
        case "m":
            return t ? "minuta" : n ? "minutu" : "minutou";
        case "mm":
            return t || n ? s + (ut(e) ? "minuty" : "minut") : s + "minutami";
        case "h":
            return t ? "hodina" : n ? "hodinu" : "hodinou";
        case "hh":
            return t || n ? s + (ut(e) ? "hodiny" : "hodin") : s + "hodinami";
        case "d":
            return t || n ? "den" : "dnem";
        case "dd":
            return t || n ? s + (ut(e) ? "dny" : "dn\xED") : s + "dny";
        case "M":
            return t || n ? "m\u011Bs\xEDc" : "m\u011Bs\xEDcem";
        case "MM":
            return t || n ? s + (ut(e) ? "m\u011Bs\xEDce" : "m\u011Bs\xEDc\u016F") : s + "m\u011Bs\xEDci";
        case "y":
            return t || n ? "rok" : "rokem";
        case "yy":
            return t || n ? s + (ut(e) ? "roky" : "let") : s + "lety"
    }
}
var Qc = {
    abbr: "cs",
    months: ni,
    monthsShort: ii,
    monthsParse: (function(e, t) {
        let i, n = [];
        for (i = 0; i < 12; i++) n[i] = new RegExp("^" + e[i] + "$|^" + t[i] + "$", "i");
        return n
    })(ni, ii),
    shortMonthsParse: (function(e) {
        let t, i = [];
        for (t = 0; t < 12; t++) i[t] = new RegExp("^" + e[t] + "$", "i");
        return i
    })(ii),
    longMonthsParse: (function(e) {
        let t, i = [];
        for (t = 0; t < 12; t++) i[t] = new RegExp("^" + e[t] + "$", "i");
        return i
    })(ni),
    weekdays: "ned\u011Ble_pond\u011Bl\xED_\xFAter\xFD_st\u0159eda_\u010Dtvrtek_p\xE1tek_sobota".split("_"),
    weekdaysShort: "ne_po_\xFAt_st_\u010Dt_p\xE1_so".split("_"),
    weekdaysMin: "ne_po_\xFAt_st_\u010Dt_p\xE1_so".split("_"),
    longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd D. MMMM YYYY H:mm",
        l: "D. M. YYYY"
    },
    calendar: {
        sameDay: "[dnes v] LT",
        nextDay: "[z\xEDtra v] LT",
        nextWeek(e) {
            switch (F(e)) {
                case 0:
                    return "[v ned\u011Bli v] LT";
                case 1:
                case 2:
                    return "[v] dddd [v] LT";
                case 3:
                    return "[ve st\u0159edu v] LT";
                case 4:
                    return "[ve \u010Dtvrtek v] LT";
                case 5:
                    return "[v p\xE1tek v] LT";
                case 6:
                    return "[v sobotu v] LT"
            }
        },
        lastDay: "[v\u010Dera v] LT",
        lastWeek(e) {
            switch (F(e)) {
                case 0:
                    return "[minulou ned\u011Bli v] LT";
                case 1:
                case 2:
                    return "[minul\xE9] dddd [v] LT";
                case 3:
                    return "[minulou st\u0159edu v] LT";
                case 4:
                case 5:
                    return "[minul\xFD] dddd [v] LT";
                case 6:
                    return "[minulou sobotu v] LT"
            }
        },
        sameElse: "L"
    },
    relativeTime: {
        future: "za %s",
        past: "p\u0159ed %s",
        s: te,
        ss: te,
        m: te,
        mm: te,
        h: te,
        hh: te,
        d: te,
        dd: te,
        M: te,
        MM: te,
        y: te,
        yy: te
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
        dow: 1,
        doy: 4
    }
};
var Kc = {
    abbr: "da",
    months: "Januar_Februar_Marts_April_Maj_Juni_Juli_August_September_Oktober_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_Maj_Jun_Jul_Aug_Sep_Okt_Nov_Dec".split("_"),
    weekdays: "S\xF8ndag_Mandag_Tirsdag_Onsdag_Torsdag_Fredag_L\xF8rdag".split("_"),
    weekdaysShort: "S\xF8n_Man_Tir_Ons_Tor_Fre_L\xF8r".split("_"),
    weekdaysMin: "S\xF8_Ma_Ti_On_To_Fr_L\xF8".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm"
    },
    calendar: {
        sameDay: "[i dag kl.] LT",
        nextDay: "[i morgen kl.] LT",
        nextWeek: "p\xE5 dddd [kl.] LT",
        lastDay: "[i g\xE5r kl.] LT",
        lastWeek: "[i] dddd[s kl.] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "om %s",
        past: "%s siden",
        s: "f\xE5 sekunder",
        m: "et minut",
        mm: "%d minutter",
        h: "en time",
        hh: "%d timer",
        d: "en dag",
        dd: "%d dage",
        M: "en m\xE5ned",
        MM: "%d m\xE5neder",
        y: "et \xE5r",
        yy: "%d \xE5r"
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
        dow: 1,
        doy: 4
    }
};

function Ie(e, t, i, n) {
    let s = {
        m: ["eine Minute", "einer Minute"],
        h: ["eine Stunde", "einer Stunde"],
        d: ["ein Tag", "einem Tag"],
        dd: [e + " Tage", e + " Tagen"],
        M: ["ein Monat", "einem Monat"],
        MM: [e + " Monate", e + " Monaten"],
        y: ["ein Jahr", "einem Jahr"],
        yy: [e + " Jahre", e + " Jahren"]
    };
    return t ? s[i][0] : s[i][1]
}
var Zc = {
    abbr: "de",
    months: "Januar_Februar_M\xE4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
    monthsShort: "Jan._Feb._M\xE4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
    monthsParseExact: !0,
    weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
    weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
    weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd, D. MMMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[heute um] LT [Uhr]",
        sameElse: "L",
        nextDay: "[morgen um] LT [Uhr]",
        nextWeek: "dddd [um] LT [Uhr]",
        lastDay: "[gestern um] LT [Uhr]",
        lastWeek: "[letzten] dddd [um] LT [Uhr]"
    },
    relativeTime: {
        future: "in %s",
        past: "vor %s",
        s: "ein paar Sekunden",
        ss: "%d Sekunden",
        m: Ie,
        mm: "%d Minuten",
        h: Ie,
        hh: "%d Stunden",
        d: Ie,
        dd: Ie,
        M: Ie,
        MM: Ie,
        y: Ie,
        yy: Ie
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
        dow: 1,
        doy: 4
    }
};
var qc = {
    abbr: "en-gb",
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal(e) {
        let t = Number(e),
            i = t % 10,
            n = ~~(t % 100 / 10) === 1 ? "th" : i === 1 ? "st" : i === 2 ? "nd" : i === 3 ? "rd" : "th";
        return t + n
    },
    week: {
        dow: 1,
        doy: 4
    }
};
var fs = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
    Wo = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
    si = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
    gs = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    Xc = {
        abbr: "es-do",
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort(e, t, i) {
            return e ? /-MMM-/.test(t) ? Wo[L(e, i)] : fs[L(e, i)] : fs
        },
        monthsRegex: gs,
        monthsShortRegex: gs,
        monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse: si,
        longMonthsParse: si,
        shortMonthsParse: si,
        weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
        weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY h:mm A",
            LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
        },
        calendar: {
            sameDay(e) {
                return "[hoy a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            nextDay(e) {
                return "[ma\xF1ana a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            nextWeek(e) {
                return "dddd [a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            lastDay(e) {
                return "[ayer a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            lastWeek(e) {
                return "[el] dddd [pasado a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            ss: "%d segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un d\xEDa",
            dd: "%d d\xEDas",
            M: "un mes",
            MM: "%d meses",
            y: "un a\xF1o",
            yy: "%d a\xF1os"
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: "%d\xBA",
        week: {
            dow: 1,
            doy: 4
        }
    };
var ys = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
    Bo = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
    ri = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
    bs = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    e_ = {
        abbr: "es",
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort(e, t, i) {
            return e ? /-MMM-/.test(t) ? Bo[L(e, i)] : ys[L(e, i)] : ys
        },
        monthsRegex: bs,
        monthsShortRegex: bs,
        monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse: ri,
        longMonthsParse: ri,
        shortMonthsParse: ri,
        weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
        weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        calendar: {
            sameDay(e) {
                return "[hoy a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            nextDay(e) {
                return "[ma\xF1ana a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            nextWeek(e) {
                return "dddd [a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            lastDay(e) {
                return "[ayer a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            lastWeek(e) {
                return "[el] dddd [pasado a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            ss: "%d segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un d\xEDa",
            dd: "%d d\xEDas",
            M: "un mes",
            MM: "%d meses",
            y: "un a\xF1o",
            yy: "%d a\xF1os"
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: "%d\xBA",
        week: {
            dow: 1,
            doy: 4
        }
    };
var Ms = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
    No = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
    t_ = {
        abbr: "es-pr",
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort(e, t, i) {
            return e ? /-MMM-/.test(t) ? No[L(e, i)] : Ms[L(e, i)] : Ms
        },
        monthsParseExact: !0,
        weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
        weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "MM/DD/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY h:mm A",
            LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
        },
        calendar: {
            sameDay(e) {
                return "[hoy a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            nextDay(e) {
                return "[ma\xF1ana a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            nextWeek(e) {
                return "dddd [a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            lastDay(e) {
                return "[ayer a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            lastWeek(e) {
                return "[el] dddd [pasado a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            ss: "%d segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un d\xEDa",
            dd: "%d d\xEDas",
            M: "un mes",
            MM: "%d meses",
            y: "un a\xF1o",
            yy: "%d a\xF1os"
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: "%d\xBA",
        week: {
            dow: 0,
            doy: 6
        }
    };
var vs = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
    $o = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
    n_ = {
        abbr: "es-us",
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort(e, t, i) {
            return e ? /-MMM-/.test(t) ? $o[L(e, i)] : vs[L(e, i)] : vs
        },
        monthsParseExact: !0,
        weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
        weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "MM/DD/YYYY",
            LL: "MMMM [de] D [de] YYYY",
            LLL: "MMMM [de] D [de] YYYY h:mm A",
            LLLL: "dddd, MMMM [de] D [de] YYYY h:mm A"
        },
        calendar: {
            sameDay(e) {
                return "[hoy a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            nextDay(e) {
                return "[ma\xF1ana a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            nextWeek(e) {
                return "dddd [a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            lastDay(e) {
                return "[ayer a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            lastWeek(e) {
                return "[el] dddd [pasado a la" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            ss: "%d segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un d\xEDa",
            dd: "%d d\xEDas",
            M: "un mes",
            MM: "%d meses",
            y: "un a\xF1o",
            yy: "%d a\xF1os"
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: "%d\xBA",
        week: {
            dow: 0,
            doy: 6
        }
    };
var ue = function(e, t, i, n) {
        let s = {
            s: ["m\xF5ne sekundi", "m\xF5ni sekund", "paar sekundit"],
            ss: [e + "sekundi", e + "sekundit"],
            m: ["\xFChe minuti", "\xFCks minut"],
            mm: [e + " minuti", e + " minutit"],
            h: ["\xFChe tunni", "tund aega", "\xFCks tund"],
            hh: [e + " tunni", e + " tundi"],
            d: ["\xFChe p\xE4eva", "\xFCks p\xE4ev"],
            M: ["kuu aja", "kuu aega", "\xFCks kuu"],
            MM: [e + " kuu", e + " kuud"],
            y: ["\xFChe aasta", "aasta", "\xFCks aasta"],
            yy: [e + " aasta", e + " aastat"]
        };
        return t ? s[i][2] ? s[i][2] : s[i][1] : n ? s[i][0] : s[i][1]
    },
    i_ = {
        abbr: "et",
        months: "jaanuar_veebruar_m\xE4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
        monthsShort: "jaan_veebr_m\xE4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
        weekdays: "p\xFChap\xE4ev_esmasp\xE4ev_teisip\xE4ev_kolmap\xE4ev_neljap\xE4ev_reede_laup\xE4ev".split("_"),
        weekdaysShort: "P_E_T_K_N_R_L".split("_"),
        weekdaysMin: "P_E_T_K_N_R_L".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[T\xE4na,] LT",
            nextDay: "[Homme,] LT",
            nextWeek: "[J\xE4rgmine] dddd LT",
            lastDay: "[Eile,] LT",
            lastWeek: "[Eelmine] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s p\xE4rast",
            past: "%s tagasi",
            s: ue,
            ss: ue,
            m: ue,
            mm: ue,
            h: ue,
            hh: ue,
            d: ue,
            dd: "%d p\xE4eva",
            M: ue,
            MM: ue,
            y: ue,
            yy: ue
        },
        dayOfMonthOrdinalParse: /\d{1,2}./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    };
var vn = "nolla yksi kaksi kolme nelj\xE4 viisi kuusi seitsem\xE4n kahdeksan yhdeks\xE4n".split(" "),
    Uo = ["nolla", "yhden", "kahden", "kolmen", "nelj\xE4n", "viiden", "kuuden", vn[7], vn[8], vn[9]];

function ne(e, t, i, n) {
    var s = "";
    switch (i) {
        case "s":
            return n ? "muutaman sekunnin" : "muutama sekunti";
        case "ss":
            return n ? "sekunnin" : "sekuntia";
        case "m":
            return n ? "minuutin" : "minuutti";
        case "mm":
            s = n ? "minuutin" : "minuuttia";
            break;
        case "h":
            return n ? "tunnin" : "tunti";
        case "hh":
            s = n ? "tunnin" : "tuntia";
            break;
        case "d":
            return n ? "p\xE4iv\xE4n" : "p\xE4iv\xE4";
        case "dd":
            s = n ? "p\xE4iv\xE4n" : "p\xE4iv\xE4\xE4";
            break;
        case "M":
            return n ? "kuukauden" : "kuukausi";
        case "MM":
            s = n ? "kuukauden" : "kuukautta";
            break;
        case "y":
            return n ? "vuoden" : "vuosi";
        case "yy":
            s = n ? "vuoden" : "vuotta";
            break
    }
    return s = zo(e, n) + " " + s, s
}

function zo(e, t) {
    return e < 10 ? t ? Uo[e] : vn[e] : e
}
var s_ = {
    abbr: "fi",
    months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\xE4kuu_hein\xE4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
    monthsShort: "tammi_helmi_maalis_huhti_touko_kes\xE4_hein\xE4_elo_syys_loka_marras_joulu".split("_"),
    weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
    weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
    weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
    longDateFormat: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD.MM.YYYY",
        LL: "Do MMMM[ta] YYYY",
        LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
        LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
        l: "D.M.YYYY",
        ll: "Do MMM YYYY",
        lll: "Do MMM YYYY, [klo] HH.mm",
        llll: "ddd, Do MMM YYYY, [klo] HH.mm"
    },
    calendar: {
        sameDay: "[t\xE4n\xE4\xE4n] [klo] LT",
        nextDay: "[huomenna] [klo] LT",
        nextWeek: "dddd [klo] LT",
        lastDay: "[eilen] [klo] LT",
        lastWeek: "[viime] dddd[na] [klo] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "%s p\xE4\xE4st\xE4",
        past: "%s sitten",
        s: ne,
        ss: ne,
        m: ne,
        mm: ne,
        h: ne,
        hh: ne,
        d: ne,
        dd: ne,
        M: ne,
        MM: ne,
        y: ne,
        yy: ne
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
        dow: 1,
        doy: 4
    }
};
var r_ = {
    abbr: "fr",
    months: "janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre".split("_"),
    monthsShort: "janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.".split("_"),
    monthsParseExact: !0,
    weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[Aujourd\u2019hui \xE0] LT",
        nextDay: "[Demain \xE0] LT",
        nextWeek: "dddd [\xE0] LT",
        lastDay: "[Hier \xE0] LT",
        lastWeek: "dddd [dernier \xE0] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "dans %s",
        past: "il y a %s",
        s: "quelques secondes",
        ss: "%d secondes",
        m: "une minute",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "un an",
        yy: "%d ans"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal(e, t) {
        let i = Number(e);
        switch (t) {
            case "D":
                return i + (i === 1 ? "er" : "");
            default:
            case "M":
            case "Q":
            case "DDD":
            case "d":
                return i + (i === 1 ? "er" : "e");
            case "w":
            case "W":
                return i + (i === 1 ? "re" : "e")
        }
    },
    week: {
        dow: 1,
        doy: 4
    }
};
var a_ = {
    abbr: "fr-ca",
    months: "janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre".split("_"),
    monthsShort: "janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.".split("_"),
    monthsParseExact: !0,
    weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[Aujourd\u2019hui \xE0] LT",
        nextDay: "[Demain \xE0] LT",
        nextWeek: "dddd [\xE0] LT",
        lastDay: "[Hier \xE0] LT",
        lastWeek: "dddd [dernier \xE0] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "dans %s",
        past: "il y a %s",
        s: "quelques secondes",
        ss: "%d secondes",
        m: "une minute",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "un an",
        yy: "%d ans"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e|)/,
    ordinal(e, t) {
        let i = Number(e);
        switch (t) {
            case "D":
                return i + (i === 1 ? "er" : "");
            default:
            case "M":
            case "Q":
            case "DDD":
            case "d":
                return i + (i === 1 ? "er" : "e");
            case "w":
            case "W":
                return i + (i === 1 ? "re" : "e")
        }
    },
    week: {
        dow: 1,
        doy: 4
    }
};
var Ds = "xan._feb._mar._abr._mai._xu\xF1._xul._ago._set._out._nov._dec.".split("_"),
    Go = "xan_feb_mar_abr_mai_xu\xF1_xul_ago_set_out_nov_dec".split("_"),
    ai = [/^xan/i, /^feb/i, /^mar/i, /^abr/i, /^mai/i, /^xuñ/i, /^xul/i, /^ago/i, /^set/i, /^out/i, /^nov/i, /^dec/i],
    ks = /^(xaneiro|febreiro|marzo|abril|maio|xuño|xullo|agosto|setembro|outubro|novembro|decembro|xan\.?|feb\.?|mar\.?|abr\.?|mai\.?|xuñ\.?|xul\.?|ago\.?|set\.?|out\.?|nov\.?|dec\.?)/i,
    o_ = {
        abbr: "gl",
        months: "xaneiro_febreiro_marzo_abril_maio_xu\xF1o_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),
        monthsShort(e, t, i) {
            return e ? /-MMM-/.test(t) ? Go[L(e, i)] : Ds[L(e, i)] : Ds
        },
        monthsRegex: ks,
        monthsShortRegex: ks,
        monthsStrictRegex: /^(xaneiro|febreiro|marzo|abril|maio|xuño|xullo|agosto|setembro|outubro|novembro|decembro)/i,
        monthsShortStrictRegex: /^(xan\.?|feb\.?|mar\.?|abr\.?|mai\.?|xuñ\.?|xul\.?|ago\.?|set\.?|out\.?|nov\.?|dec\.?)/i,
        monthsParse: ai,
        longMonthsParse: ai,
        shortMonthsParse: ai,
        weekdays: "domingo_luns_martes_m\xE9rcores_xoves_venres_s\xE1bado".split("_"),
        weekdaysShort: "dom._lun._mar._m\xE9r._xov._ven._s\xE1b.".split("_"),
        weekdaysMin: "do_lu_ma_m\xE9_xo_ve_s\xE1".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        calendar: {
            sameDay(e) {
                return "[hoxe \xE1" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            nextDay(e) {
                return "[ma\xF1an \xE1" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            nextWeek(e) {
                return "dddd [\xE1" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            lastDay(e) {
                return "[onte \xE1" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            lastWeek(e) {
                return "[o] dddd [pasado \xE1" + (C(e) !== 1 ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "fai %s",
            s: "uns segundos",
            ss: "%d segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "unha hora",
            hh: "%d horas",
            d: "un d\xEDa",
            dd: "%d d\xEDas",
            M: "un mes",
            MM: "%d meses",
            y: "un ano",
            yy: "%d anos"
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: "%d\xBA",
        week: {
            dow: 1,
            doy: 4
        }
    };
var d_ = {
    abbr: "he",
    months: "\u05D9\u05E0\u05D5\u05D0\u05E8_\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8_\u05DE\u05E8\u05E5_\u05D0\u05E4\u05E8\u05D9\u05DC_\u05DE\u05D0\u05D9_\u05D9\u05D5\u05E0\u05D9_\u05D9\u05D5\u05DC\u05D9_\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8_\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8_\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8_\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8_\u05D3\u05E6\u05DE\u05D1\u05E8".split("_"),
    monthsShort: "\u05D9\u05E0\u05D5\u05F3_\u05E4\u05D1\u05E8\u05F3_\u05DE\u05E8\u05E5_\u05D0\u05E4\u05E8\u05F3_\u05DE\u05D0\u05D9_\u05D9\u05D5\u05E0\u05D9_\u05D9\u05D5\u05DC\u05D9_\u05D0\u05D5\u05D2\u05F3_\u05E1\u05E4\u05D8\u05F3_\u05D0\u05D5\u05E7\u05F3_\u05E0\u05D5\u05D1\u05F3_\u05D3\u05E6\u05DE\u05F3".split("_"),
    weekdays: "\u05E8\u05D0\u05E9\u05D5\u05DF_\u05E9\u05E0\u05D9_\u05E9\u05DC\u05D9\u05E9\u05D9_\u05E8\u05D1\u05D9\u05E2\u05D9_\u05D7\u05DE\u05D9\u05E9\u05D9_\u05E9\u05D9\u05E9\u05D9_\u05E9\u05D1\u05EA".split("_"),
    weekdaysShort: "\u05D0\u05F3_\u05D1\u05F3_\u05D2\u05F3_\u05D3\u05F3_\u05D4\u05F3_\u05D5\u05F3_\u05E9\u05F3".split("_"),
    weekdaysMin: "\u05D0_\u05D1_\u05D2_\u05D3_\u05D4_\u05D5_\u05E9".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [\u05D1]MMMM YYYY",
        LLL: "D [\u05D1]MMMM YYYY HH:mm",
        LLLL: "dddd, D [\u05D1]MMMM YYYY HH:mm",
        l: "D/M/YYYY",
        ll: "D MMM YYYY",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd, D MMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[\u05D4\u05D9\u05D5\u05DD \u05D1\u05BE]LT",
        nextDay: "[\u05DE\u05D7\u05E8 \u05D1\u05BE]LT",
        nextWeek: "dddd [\u05D1\u05E9\u05E2\u05D4] LT",
        lastDay: "[\u05D0\u05EA\u05DE\u05D5\u05DC \u05D1\u05BE]LT",
        lastWeek: "[\u05D1\u05D9\u05D5\u05DD] dddd [\u05D4\u05D0\u05D7\u05E8\u05D5\u05DF \u05D1\u05E9\u05E2\u05D4] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "\u05D1\u05E2\u05D5\u05D3 %s",
        past: "\u05DC\u05E4\u05E0\u05D9 %s",
        s: "\u05DE\u05E1\u05E4\u05E8 \u05E9\u05E0\u05D9\u05D5\u05EA",
        ss: "%d \u05E9\u05E0\u05D9\u05D5\u05EA",
        m: "\u05D3\u05E7\u05D4",
        mm: "%d \u05D3\u05E7\u05D5\u05EA",
        h: "\u05E9\u05E2\u05D4",
        hh(e) {
            return e === 2 ? "\u05E9\u05E2\u05EA\u05D9\u05D9\u05DD" : e + " \u05E9\u05E2\u05D5\u05EA"
        },
        d: "\u05D9\u05D5\u05DD",
        dd(e) {
            return e === 2 ? "\u05D9\u05D5\u05DE\u05D9\u05D9\u05DD" : e + " \u05D9\u05DE\u05D9\u05DD"
        },
        M: "\u05D7\u05D5\u05D3\u05E9",
        MM(e) {
            return e === 2 ? "\u05D7\u05D5\u05D3\u05E9\u05D9\u05D9\u05DD" : e + " \u05D7\u05D5\u05D3\u05E9\u05D9\u05DD"
        },
        y: "\u05E9\u05E0\u05D4",
        yy(e) {
            return e === 2 ? "\u05E9\u05E0\u05EA\u05D9\u05D9\u05DD" : e % 10 === 0 && e !== 10 ? e + " \u05E9\u05E0\u05D4" : e + " \u05E9\u05E0\u05D9\u05DD"
        }
    },
    meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
    isPM(e) {
        return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(e)
    },
    meridiem(e, t, i) {
        return e < 5 ? "\u05DC\u05E4\u05E0\u05D5\u05EA \u05D1\u05D5\u05E7\u05E8" : e < 10 ? "\u05D1\u05D1\u05D5\u05E7\u05E8" : e < 12 ? i ? '\u05DC\u05E4\u05E0\u05D4"\u05E6' : "\u05DC\u05E4\u05E0\u05D9 \u05D4\u05E6\u05D4\u05E8\u05D9\u05D9\u05DD" : e < 18 ? i ? '\u05D0\u05D7\u05D4"\u05E6' : "\u05D0\u05D7\u05E8\u05D9 \u05D4\u05E6\u05D4\u05E8\u05D9\u05D9\u05DD" : "\u05D1\u05E2\u05E8\u05D1"
    }
};
var Jo = {
        1: "\u0967",
        2: "\u0968",
        3: "\u0969",
        4: "\u096A",
        5: "\u096B",
        6: "\u096C",
        7: "\u096D",
        8: "\u096E",
        9: "\u096F",
        0: "\u0966"
    },
    Qo = {
        "\u0967": "1",
        "\u0968": "2",
        "\u0969": "3",
        "\u096A": "4",
        "\u096B": "5",
        "\u096C": "6",
        "\u096D": "7",
        "\u096E": "8",
        "\u096F": "9",
        "\u0966": "0"
    },
    l_ = {
        abbr: "hi",
        months: "\u091C\u0928\u0935\u0930\u0940_\u092B\u093C\u0930\u0935\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948\u0932_\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932\u093E\u0908_\u0905\u0917\u0938\u094D\u0924_\u0938\u093F\u0924\u092E\u094D\u092C\u0930_\u0905\u0915\u094D\u091F\u0942\u092C\u0930_\u0928\u0935\u092E\u094D\u092C\u0930_\u0926\u093F\u0938\u092E\u094D\u092C\u0930".split("_"),
        monthsShort: "\u091C\u0928._\u092B\u093C\u0930._\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948._\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932._\u0905\u0917._\u0938\u093F\u0924._\u0905\u0915\u094D\u091F\u0942._\u0928\u0935._\u0926\u093F\u0938.".split("_"),
        monthsParseExact: !0,
        weekdays: "\u0930\u0935\u093F\u0935\u093E\u0930_\u0938\u094B\u092E\u0935\u093E\u0930_\u092E\u0902\u0917\u0932\u0935\u093E\u0930_\u092C\u0941\u0927\u0935\u093E\u0930_\u0917\u0941\u0930\u0942\u0935\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930_\u0936\u0928\u093F\u0935\u093E\u0930".split("_"),
        weekdaysShort: "\u0930\u0935\u093F_\u0938\u094B\u092E_\u092E\u0902\u0917\u0932_\u092C\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094D\u0930_\u0936\u0928\u093F".split("_"),
        weekdaysMin: "\u0930_\u0938\u094B_\u092E\u0902_\u092C\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),
        longDateFormat: {
            LT: "A h:mm \u092C\u091C\u0947",
            LTS: "A h:mm:ss \u092C\u091C\u0947",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm \u092C\u091C\u0947",
            LLLL: "dddd, D MMMM YYYY, A h:mm \u092C\u091C\u0947"
        },
        calendar: {
            sameDay: "[\u0906\u091C] LT",
            nextDay: "[\u0915\u0932] LT",
            nextWeek: "dddd, LT",
            lastDay: "[\u0915\u0932] LT",
            lastWeek: "[\u092A\u093F\u091B\u0932\u0947] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s \u092E\u0947\u0902",
            past: "%s \u092A\u0939\u0932\u0947",
            s: "\u0915\u0941\u091B \u0939\u0940 \u0915\u094D\u0937\u0923",
            ss: "%d \u0938\u0947\u0915\u0902\u0921",
            m: "\u090F\u0915 \u092E\u093F\u0928\u091F",
            mm: "%d \u092E\u093F\u0928\u091F",
            h: "\u090F\u0915 \u0918\u0902\u091F\u093E",
            hh: "%d \u0918\u0902\u091F\u0947",
            d: "\u090F\u0915 \u0926\u093F\u0928",
            dd: "%d \u0926\u093F\u0928",
            M: "\u090F\u0915 \u092E\u0939\u0940\u0928\u0947",
            MM: "%d \u092E\u0939\u0940\u0928\u0947",
            y: "\u090F\u0915 \u0935\u0930\u094D\u0937",
            yy: "%d \u0935\u0930\u094D\u0937"
        },
        preparse(e) {
            return e.replace(/[१२३४५६७८९०]/g, function(t) {
                return Qo[t]
            })
        },
        postformat(e) {
            return e.replace(/\d/g, function(t) {
                return Jo[t]
            })
        },
        meridiemParse: /रात|सुबह|दोपहर|शाम/,
        meridiemHour(e, t) {
            if (e === 12 && (e = 0), t === "\u0930\u093E\u0924") return e < 4 ? e : e + 12;
            if (t === "\u0938\u0941\u092C\u0939") return e;
            if (t === "\u0926\u094B\u092A\u0939\u0930") return e >= 10 ? e : e + 12;
            if (t === "\u0936\u093E\u092E") return e + 12
        },
        meridiem(e, t, i) {
            return e < 4 ? "\u0930\u093E\u0924" : e < 10 ? "\u0938\u0941\u092C\u0939" : e < 17 ? "\u0926\u094B\u092A\u0939\u0930" : e < 20 ? "\u0936\u093E\u092E" : "\u0930\u093E\u0924"
        },
        week: {
            dow: 0,
            doy: 6
        }
    };
var Ko = "vas\xE1rnap h\xE9tf\u0151n kedden szerd\xE1n cs\xFCt\xF6rt\xF6k\xF6n p\xE9nteken szombaton".split(" ");

function ie(e, t, i, n) {
    switch (i) {
        case "s":
            return n || t ? "n\xE9h\xE1ny m\xE1sodperc" : "n\xE9h\xE1ny m\xE1sodperce";
        case "ss":
            return e + (n || t ? " m\xE1sodperc" : " m\xE1sodperce");
        case "m":
            return "egy" + (n || t ? " perc" : " perce");
        case "mm":
            return e + (n || t ? " perc" : " perce");
        case "h":
            return "egy" + (n || t ? " \xF3ra" : " \xF3r\xE1ja");
        case "hh":
            return e + (n || t ? " \xF3ra" : " \xF3r\xE1ja");
        case "d":
            return "egy" + (n || t ? " nap" : " napja");
        case "dd":
            return e + (n || t ? " nap" : " napja");
        case "M":
            return "egy" + (n || t ? " h\xF3nap" : " h\xF3napja");
        case "MM":
            return e + (n || t ? " h\xF3nap" : " h\xF3napja");
        case "y":
            return "egy" + (n || t ? " \xE9v" : " \xE9ve");
        case "yy":
            return e + (n || t ? " \xE9v" : " \xE9ve")
    }
    return ""
}

function ws(e, t) {
    return (t ? "" : "[m\xFAlt] ") + "[" + Ko[F(e)] + "] LT[-kor]"
}
var c_ = {
    abbr: "hu",
    months: "janu\xE1r_febru\xE1r_m\xE1rcius_\xE1prilis_m\xE1jus_j\xFAnius_j\xFAlius_augusztus_szeptember_okt\xF3ber_november_december".split("_"),
    monthsShort: "jan_feb_m\xE1rc_\xE1pr_m\xE1j_j\xFAn_j\xFAl_aug_szept_okt_nov_dec".split("_"),
    weekdays: "vas\xE1rnap_h\xE9tf\u0151_kedd_szerda_cs\xFCt\xF6rt\xF6k_p\xE9ntek_szombat".split("_"),
    weekdaysShort: "vas_h\xE9t_kedd_sze_cs\xFCt_p\xE9n_szo".split("_"),
    weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
    longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "YYYY.MM.DD.",
        LL: "YYYY. MMMM D.",
        LLL: "YYYY. MMMM D. H:mm",
        LLLL: "YYYY. MMMM D., dddd H:mm"
    },
    meridiemParse: /de|du/i,
    isPM(e) {
        return e.charAt(1).toLowerCase() === "u"
    },
    meridiem(e, t, i) {
        return e < 12 ? i === !0 ? "de" : "DE" : i === !0 ? "du" : "DU"
    },
    calendar: {
        sameDay: "[ma] LT[-kor]",
        nextDay: "[holnap] LT[-kor]",
        nextWeek(e) {
            return ws(e, !0)
        },
        lastDay: "[tegnap] LT[-kor]",
        lastWeek(e) {
            return ws(e, !1)
        },
        sameElse: "L"
    },
    relativeTime: {
        future: "%s m\xFAlva",
        past: "%s",
        s: ie,
        ss: ie,
        m: ie,
        mm: ie,
        h: ie,
        hh: ie,
        d: ie,
        dd: ie,
        M: ie,
        MM: ie,
        y: ie,
        yy: ie
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
        dow: 1,
        doy: 4
    }
};
var __ = {
    abbr: "hr",
    months: "Sije\u010Danj_Velja\u010Da_O\u017Eujak_Travanj_Svibanj_Lipanj_Srpanj_Kolovoz_Rujan_Listopad_Studeni_Prosinac".split("_"),
    monthsShort: "Sij_Velj_O\u017Eu_Tra_Svi_Lip_Srp_Kol_Ruj_Lis_Stu_Pro".split("_"),
    weekdays: "Nedjelja_Ponedjeljak_Utorak_Srijeda_\u010Cetvrtak_Petak_Subota".split("_"),
    weekdaysShort: "Ned_Pon_Uto_Sri_\u010Cet_Pet_Sub".split("_"),
    weekdaysMin: "Ne_Po_Ut_Sr_\u010Ce_Pe_Su".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY.",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[Danas u] LT",
        nextDay: "[Sutra u] LT",
        nextWeek: "dddd [u] LT",
        lastDay: "[Ju\u010Der u] LT",
        lastWeek: "[Zadnji] dddd [u] LT",
        sameElse: "L"
    },
    invalidDate: "Neispravan datum",
    relativeTime: {
        future: "za %s",
        past: "%s prije",
        s: "nekoliko sekundi",
        ss: "%d sekundi",
        m: "minuta",
        mm: "%d minuta",
        h: "sat",
        hh: "%d sati",
        d: "dan",
        dd: "%d dana",
        M: "mjesec",
        MM: "%d mjeseci",
        y: "godina",
        yy: "%d godina"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal(e) {
        let t = Number(e),
            i = t % 10,
            n = (~~(t % 100 / 10) === 1, ".");
        return t + n
    },
    week: {
        dow: 1,
        doy: 4
    }
};
var u_ = {
    abbr: "id",
    months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
    weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
    weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
    weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
    longDateFormat: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY [pukul] HH.mm",
        LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
    },
    meridiemParse: /pagi|siang|sore|malam/,
    meridiemHour(e, t) {
        if (e === 12 && (e = 0), t === "pagi") return e;
        if (t === "siang") return e >= 11 ? e : e + 12;
        if (t === "sore" || t === "malam") return e + 12
    },
    meridiem(e, t, i) {
        return e < 11 ? "pagi" : e < 15 ? "siang" : e < 19 ? "sore" : "malam"
    },
    calendar: {
        sameDay: "[Hari ini pukul] LT",
        nextDay: "[Besok pukul] LT",
        nextWeek: "dddd [pukul] LT",
        lastDay: "[Kemarin pukul] LT",
        lastWeek: "dddd [lalu pukul] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "dalam %s",
        past: "%s yang lalu",
        s: "beberapa detik",
        ss: "%d detik",
        m: "semenit",
        mm: "%d menit",
        h: "sejam",
        hh: "%d jam",
        d: "sehari",
        dd: "%d hari",
        M: "sebulan",
        MM: "%d bulan",
        y: "setahun",
        yy: "%d tahun"
    },
    week: {
        dow: 1,
        doy: 7
    }
};
var m_ = {
    abbr: "it",
    months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
    monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
    weekdays: "domenica_luned\xEC_marted\xEC_mercoled\xEC_gioved\xEC_venerd\xEC_sabato".split("_"),
    weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
    weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[Oggi alle] LT",
        nextDay: "[Domani alle] LT",
        nextWeek: "dddd [alle] LT",
        lastDay: "[Ieri alle] LT",
        lastWeek(e) {
            switch (F(e)) {
                case 0:
                    return "[la scorsa] dddd [alle] LT";
                default:
                    return "[lo scorso] dddd [alle] LT"
            }
        },
        sameElse: "L"
    },
    relativeTime: {
        future(e) {
            return (/^[0-9].+$/.test(e.toString(10)) ? "tra" : "in") + " " + e
        },
        past: "%s fa",
        s: "alcuni secondi",
        ss: "%d secondi",
        m: "un minuto",
        mm: "%d minuti",
        h: "un'ora",
        hh: "%d ore",
        d: "un giorno",
        dd: "%d giorni",
        M: "un mese",
        MM: "%d mesi",
        y: "un anno",
        yy: "%d anni"
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: "%d\xBA",
    week: {
        dow: 1,
        doy: 4
    }
};
var h_ = {
    abbr: "ja",
    months: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
    monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
    weekdays: "\u65E5\u66DC\u65E5_\u6708\u66DC\u65E5_\u706B\u66DC\u65E5_\u6C34\u66DC\u65E5_\u6728\u66DC\u65E5_\u91D1\u66DC\u65E5_\u571F\u66DC\u65E5".split("_"),
    weekdaysShort: "\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F".split("_"),
    weekdaysMin: "\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY\u5E74M\u6708D\u65E5",
        LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        LLLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm dddd",
        l: "YYYY/MM/DD",
        ll: "YYYY\u5E74M\u6708D\u65E5",
        lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        llll: "YYYY\u5E74M\u6708D\u65E5 HH:mm dddd"
    },
    meridiemParse: /午前|午後/i,
    isPM(e) {
        return e === "\u5348\u5F8C"
    },
    meridiem(e, t, i) {
        return e < 12 ? "\u5348\u524D" : "\u5348\u5F8C"
    },
    calendar: {
        sameDay: "[\u4ECA\u65E5] LT",
        nextDay: "[\u660E\u65E5] LT",
        nextWeek: "[\u6765\u9031]dddd LT",
        lastDay: "[\u6628\u65E5] LT",
        lastWeek: "[\u524D\u9031]dddd LT",
        sameElse: "L"
    },
    dayOfMonthOrdinalParse: /\d{1,2}日/,
    ordinal(e, t) {
        switch (t) {
            case "d":
            case "D":
            case "DDD":
                return e + "\u65E5";
            default:
                return e.toString(10)
        }
    },
    relativeTime: {
        future: "%s\u5F8C",
        past: "%s\u524D",
        s: "\u6570\u79D2",
        ss: "%d\u79D2",
        m: "1\u5206",
        mm: "%d\u5206",
        h: "1\u6642\u9593",
        hh: "%d\u6642\u9593",
        d: "1\u65E5",
        dd: "%d\u65E5",
        M: "1\u30F6\u6708",
        MM: "%d\u30F6\u6708",
        y: "1\u5E74",
        yy: "%d\u5E74"
    }
};
var p_ = {
        abbr: "ka",
        months: {
            format: "\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10E1_\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10E1_\u10DB\u10D0\u10E0\u10E2\u10E1_\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8\u10E1_\u10DB\u10D0\u10D8\u10E1\u10E1_\u10D8\u10D5\u10DC\u10D8\u10E1\u10E1_\u10D8\u10D5\u10DA\u10D8\u10E1\u10E1_\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10E1_\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10E1_\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10E1_\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10E1_\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10E1".split("_"),
            standalone: "\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10D8_\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10D8_\u10DB\u10D0\u10E0\u10E2\u10D8_\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8_\u10DB\u10D0\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DC\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DA\u10D8\u10E1\u10D8_\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10DD_\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8".split("_")
        },
        monthsShort: "\u10D8\u10D0\u10DC_\u10D7\u10D4\u10D1_\u10DB\u10D0\u10E0_\u10D0\u10DE\u10E0_\u10DB\u10D0\u10D8_\u10D8\u10D5\u10DC_\u10D8\u10D5\u10DA_\u10D0\u10D2\u10D5_\u10E1\u10D4\u10E5_\u10DD\u10E5\u10E2_\u10DC\u10DD\u10D4_\u10D3\u10D4\u10D9".split("_"),
        weekdays: {
            standalone: "\u10D9\u10D5\u10D8\u10E0\u10D0_\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10D8_\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8".split("_"),
            format: "\u10D9\u10D5\u10D8\u10E0\u10D0\u10E1_\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10E1_\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1".split("_"),
            isFormat: /(წინა|შემდეგ)/
        },
        weekdaysShort: "\u10D9\u10D5\u10D8_\u10DD\u10E0\u10E8_\u10E1\u10D0\u10DB_\u10DD\u10D7\u10EE_\u10EE\u10E3\u10D7_\u10DE\u10D0\u10E0_\u10E8\u10D0\u10D1".split("_"),
        weekdaysMin: "\u10D9\u10D5_\u10DD\u10E0_\u10E1\u10D0_\u10DD\u10D7_\u10EE\u10E3_\u10DE\u10D0_\u10E8\u10D0".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[\u10D3\u10E6\u10D4\u10E1] LT[-\u10D6\u10D4]",
            nextDay: "[\u10EE\u10D5\u10D0\u10DA] LT[-\u10D6\u10D4]",
            lastDay: "[\u10D2\u10E3\u10E8\u10D8\u10DC] LT[-\u10D6\u10D4]",
            nextWeek: "[\u10E8\u10D4\u10DB\u10D3\u10D4\u10D2] dddd LT[-\u10D6\u10D4]",
            lastWeek: "[\u10EC\u10D8\u10DC\u10D0] dddd LT-\u10D6\u10D4",
            sameElse: "L"
        },
        relativeTime: {
            future(e) {
                var t = e.toString();
                return /(წამი|წუთი|საათი|წელი)/.test(t) ? t.replace(/ი$/, "\u10E8\u10D8") : t + "\u10E8\u10D8"
            },
            past(e) {
                var t = e.toString();
                if (/(წამი|წუთი|საათი|დღე|თვე)/.test(t)) return t.replace(/(ი|ე)$/, "\u10D8\u10E1 \u10EC\u10D8\u10DC");
                if (/წელი/.test(t)) return t.replace(/წელი$/, "\u10EC\u10DA\u10D8\u10E1 \u10EC\u10D8\u10DC")
            },
            s: "\u10E0\u10D0\u10DB\u10D3\u10D4\u10DC\u10D8\u10DB\u10D4 \u10EC\u10D0\u10DB\u10D8",
            ss: "%d \u10EC\u10D0\u10DB\u10D8",
            m: "\u10EC\u10E3\u10D7\u10D8",
            mm: "%d \u10EC\u10E3\u10D7\u10D8",
            h: "\u10E1\u10D0\u10D0\u10D7\u10D8",
            hh: "%d \u10E1\u10D0\u10D0\u10D7\u10D8",
            d: "\u10D3\u10E6\u10D4",
            dd: "%d \u10D3\u10E6\u10D4",
            M: "\u10D7\u10D5\u10D4",
            MM: "%d \u10D7\u10D5\u10D4",
            y: "\u10EC\u10D4\u10DA\u10D8",
            yy: "%d \u10EC\u10D4\u10DA\u10D8"
        },
        dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
        ordinal(e, t) {
            let i = Number(e);
            return i === 0 ? i.toString() : i === 1 ? i + "-\u10DA\u10D8" : i < 20 || i <= 100 && i % 20 === 0 || i % 100 === 0 ? "\u10DB\u10D4-" + i : i + "-\u10D4"
        },
        week: {
            dow: 1,
            doy: 4
        }
    },
    oi = {
        0: "-\u0448\u0456",
        1: "-\u0448\u0456",
        2: "-\u0448\u0456",
        3: "-\u0448\u0456",
        4: "-\u0448\u0456",
        5: "-\u0448\u0456",
        6: "-\u0448\u044B",
        7: "-\u0448\u0456",
        8: "-\u0448\u0456",
        9: "-\u0448\u044B",
        10: "-\u0448\u044B",
        20: "-\u0448\u044B",
        30: "-\u0448\u044B",
        40: "-\u0448\u044B",
        50: "-\u0448\u0456",
        60: "-\u0448\u044B",
        70: "-\u0448\u0456",
        80: "-\u0448\u0456",
        90: "-\u0448\u044B",
        100: "-\u0448\u0456"
    },
    f_ = {
        abbr: "kk",
        months: "\u049B\u0430\u04A3\u0442\u0430\u0440_\u0430\u049B\u043F\u0430\u043D_\u043D\u0430\u0443\u0440\u044B\u0437_\u0441\u04D9\u0443\u0456\u0440_\u043C\u0430\u043C\u044B\u0440_\u043C\u0430\u0443\u0441\u044B\u043C_\u0448\u0456\u043B\u0434\u0435_\u0442\u0430\u043C\u044B\u0437_\u049B\u044B\u0440\u043A\u04AF\u0439\u0435\u043A_\u049B\u0430\u0437\u0430\u043D_\u049B\u0430\u0440\u0430\u0448\u0430_\u0436\u0435\u043B\u0442\u043E\u049B\u0441\u0430\u043D".split("_"),
        monthsShort: "\u049B\u0430\u04A3_\u0430\u049B\u043F_\u043D\u0430\u0443_\u0441\u04D9\u0443_\u043C\u0430\u043C_\u043C\u0430\u0443_\u0448\u0456\u043B_\u0442\u0430\u043C_\u049B\u044B\u0440_\u049B\u0430\u0437_\u049B\u0430\u0440_\u0436\u0435\u043B".split("_"),
        weekdays: "\u0436\u0435\u043A\u0441\u0435\u043D\u0431\u0456_\u0434\u04AF\u0439\u0441\u0435\u043D\u0431\u0456_\u0441\u0435\u0439\u0441\u0435\u043D\u0431\u0456_\u0441\u04D9\u0440\u0441\u0435\u043D\u0431\u0456_\u0431\u0435\u0439\u0441\u0435\u043D\u0431\u0456_\u0436\u04B1\u043C\u0430_\u0441\u0435\u043D\u0431\u0456".split("_"),
        weekdaysShort: "\u0436\u0435\u043A_\u0434\u04AF\u0439_\u0441\u0435\u0439_\u0441\u04D9\u0440_\u0431\u0435\u0439_\u0436\u04B1\u043C_\u0441\u0435\u043D".split("_"),
        weekdaysMin: "\u0436\u043A_\u0434\u0439_\u0441\u0439_\u0441\u0440_\u0431\u0439_\u0436\u043C_\u0441\u043D".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[\u0411\u04AF\u0433\u0456\u043D \u0441\u0430\u0493\u0430\u0442] LT",
            nextDay: "[\u0415\u0440\u0442\u0435\u04A3 \u0441\u0430\u0493\u0430\u0442] LT",
            nextWeek: "dddd [\u0441\u0430\u0493\u0430\u0442] LT",
            lastDay: "[\u041A\u0435\u0448\u0435 \u0441\u0430\u0493\u0430\u0442] LT",
            lastWeek: "[\u04E8\u0442\u043A\u0435\u043D \u0430\u043F\u0442\u0430\u043D\u044B\u04A3] dddd [\u0441\u0430\u0493\u0430\u0442] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s \u0456\u0448\u0456\u043D\u0434\u0435",
            past: "%s \u0431\u04B1\u0440\u044B\u043D",
            s: "\u0431\u0456\u0440\u043D\u0435\u0448\u0435 \u0441\u0435\u043A\u0443\u043D\u0434",
            ss: "%d \u0441\u0435\u043A\u0443\u043D\u0434",
            m: "\u0431\u0456\u0440 \u043C\u0438\u043D\u0443\u0442",
            mm: "%d \u043C\u0438\u043D\u0443\u0442",
            h: "\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442",
            hh: "%d \u0441\u0430\u0493\u0430\u0442",
            d: "\u0431\u0456\u0440 \u043A\u04AF\u043D",
            dd: "%d \u043A\u04AF\u043D",
            M: "\u0431\u0456\u0440 \u0430\u0439",
            MM: "%d \u0430\u0439",
            y: "\u0431\u0456\u0440 \u0436\u044B\u043B",
            yy: "%d \u0436\u044B\u043B"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
        ordinal(e) {
            let t = e % 10,
                i = e >= 100 ? 100 : null;
            return e + (oi[e] || oi[t] || oi[i])
        },
        week: {
            dow: 1,
            doy: 7
        }
    };
var g_ = {
    abbr: "ko",
    months: "1\uC6D4_2\uC6D4_3\uC6D4_4\uC6D4_5\uC6D4_6\uC6D4_7\uC6D4_8\uC6D4_9\uC6D4_10\uC6D4_11\uC6D4_12\uC6D4".split("_"),
    monthsShort: "1\uC6D4_2\uC6D4_3\uC6D4_4\uC6D4_5\uC6D4_6\uC6D4_7\uC6D4_8\uC6D4_9\uC6D4_10\uC6D4_11\uC6D4_12\uC6D4".split("_"),
    weekdays: "\uC77C\uC694\uC77C_\uC6D4\uC694\uC77C_\uD654\uC694\uC77C_\uC218\uC694\uC77C_\uBAA9\uC694\uC77C_\uAE08\uC694\uC77C_\uD1A0\uC694\uC77C".split("_"),
    weekdaysShort: "\uC77C_\uC6D4_\uD654_\uC218_\uBAA9_\uAE08_\uD1A0".split("_"),
    weekdaysMin: "\uC77C_\uC6D4_\uD654_\uC218_\uBAA9_\uAE08_\uD1A0".split("_"),
    longDateFormat: {
        LT: "A h:mm",
        LTS: "A h:mm:ss",
        L: "YYYY.MM.DD",
        LL: "YYYY\uB144 MMMM D\uC77C",
        LLL: "YYYY\uB144 MMMM D\uC77C A h:mm",
        LLLL: "YYYY\uB144 MMMM D\uC77C dddd A h:mm",
        l: "YYYY.MM.DD",
        ll: "YYYY\uB144 MMMM D\uC77C",
        lll: "YYYY\uB144 MMMM D\uC77C A h:mm",
        llll: "YYYY\uB144 MMMM D\uC77C dddd A h:mm"
    },
    calendar: {
        sameDay: "\uC624\uB298 LT",
        nextDay: "\uB0B4\uC77C LT",
        nextWeek: "dddd LT",
        lastDay: "\uC5B4\uC81C LT",
        lastWeek: "\uC9C0\uB09C\uC8FC dddd LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "%s \uD6C4",
        past: "%s \uC804",
        s: "\uBA87 \uCD08",
        ss: "%d\uCD08",
        m: "1\uBD84",
        mm: "%d\uBD84",
        h: "\uD55C \uC2DC\uAC04",
        hh: "%d\uC2DC\uAC04",
        d: "\uD558\uB8E8",
        dd: "%d\uC77C",
        M: "\uD55C \uB2EC",
        MM: "%d\uB2EC",
        y: "\uC77C \uB144",
        yy: "%d\uB144"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(일|월|주)/,
    ordinal: function(e, t) {
        switch (t) {
            case "d":
            case "D":
            case "DDD":
                return e + "\uC77C";
            case "M":
                return e + "\uC6D4";
            case "w":
            case "W":
                return e + "\uC8FC";
            default:
                return e.toString(10)
        }
    },
    meridiemParse: /오전|오후/,
    isPM: function(e) {
        return e === "\uC624\uD6C4"
    },
    meridiem: function(e, t, i) {
        return e < 12 ? "\uC624\uC804" : "\uC624\uD6C4"
    }
};
var Zo = {
    ss: "sekund\u0117_sekund\u017Ei\u0173_sekundes",
    m: "minut\u0117_minut\u0117s_minut\u0119",
    mm: "minut\u0117s_minu\u010Di\u0173_minutes",
    h: "valanda_valandos_valand\u0105",
    hh: "valandos_valand\u0173_valandas",
    d: "diena_dienos_dien\u0105",
    dd: "dienos_dien\u0173_dienas",
    M: "m\u0117nuo_m\u0117nesio_m\u0117nes\u012F",
    MM: "m\u0117nesiai_m\u0117nesi\u0173_m\u0117nesius",
    y: "metai_met\u0173_metus",
    yy: "metai_met\u0173_metus"
};

function qo(e, t, i, n) {
    return t ? "kelios sekund\u0117s" : n ? "keli\u0173 sekund\u017Ei\u0173" : "kelias sekundes"
}

function bt(e, t, i, n) {
    return t ? Re(i)[0] : n ? Re(i)[1] : Re(i)[2]
}

function Ts(e) {
    return e % 10 === 0 || e > 10 && e < 20
}

function Re(e) {
    return Zo[e].split("_")
}

function mt(e, t, i, n) {
    let s = e + " ";
    return e === 1 ? s + bt(e, t, i[0], n) : t ? s + (Ts(e) ? Re(i)[1] : Re(i)[0]) : n ? s + Re(i)[1] : s + (Ts(e) ? Re(i)[1] : Re(i)[2])
}
var y_ = {
    abbr: "lt",
    months: {
        format: "sausio_vasario_kovo_baland\u017Eio_gegu\u017E\u0117s_bir\u017Eelio_liepos_rugpj\u016B\u010Dio_rugs\u0117jo_spalio_lapkri\u010Dio_gruod\u017Eio".split("_"),
        standalone: "sausis_vasaris_kovas_balandis_gegu\u017E\u0117_bir\u017Eelis_liepa_rugpj\u016Btis_rugs\u0117jis_spalis_lapkritis_gruodis".split("_"),
        isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
    },
    monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
    weekdays: {
        format: "sekmadien\u012F_pirmadien\u012F_antradien\u012F_tre\u010Diadien\u012F_ketvirtadien\u012F_penktadien\u012F_\u0161e\u0161tadien\u012F".split("_"),
        standalone: "sekmadienis_pirmadienis_antradienis_tre\u010Diadienis_ketvirtadienis_penktadienis_\u0161e\u0161tadienis".split("_"),
        isFormat: /dddd HH:mm/
    },
    weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_\u0160e\u0161".split("_"),
    weekdaysMin: "S_P_A_T_K_Pn_\u0160".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY [m.] MMMM D [d.]",
        LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
        l: "YYYY-MM-DD",
        ll: "YYYY [m.] MMMM D [d.]",
        lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
    },
    calendar: {
        sameDay: "[\u0160iandien] LT",
        nextDay: "[Rytoj] LT",
        nextWeek: "dddd LT",
        lastDay: "[Vakar] LT",
        lastWeek: "[Pra\u0117jus\u012F] dddd LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "po %s",
        past: "prie\u0161 %s",
        s: qo,
        ss: mt,
        m: bt,
        mm: mt,
        h: bt,
        hh: mt,
        d: bt,
        dd: mt,
        M: bt,
        MM: mt,
        y: bt,
        yy: mt
    },
    dayOfMonthOrdinalParse: /\d{1,2}-oji/,
    ordinal(e) {
        return e + "-oji"
    },
    week: {
        dow: 1,
        doy: 4
    }
};
var b_ = {
    abbr: "lv",
    months: "Janv\u0101ris_Febru\u0101ris_Marts_Apr\u012Blis_Maijs_J\u016Bnijs_J\u016Blijs_Augusts_Septembris_Oktobris_Novembris_Decembris".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_Mai_J\u016Bn_J\u016Bl_Aug_Sep_Okt_Nov_Dec".split("_"),
    weekdays: "Sv\u0113tdiena_Pirmdiena_Otrdiena_Tre\u0161diena_Ceturtdiena_Piektdiena_Sestdiena".split("_"),
    weekdaysShort: "Sv\u0113td_Pirmd_Otrd_Tre\u0161d_Ceturtd_Piektd_Sestd".split("_"),
    weekdaysMin: "Sv_Pi_Ot_Tr_Ce_Pk_Se".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "p\u0113c %s",
        past: "pirms %s",
        s: "da\u017E\u0101m sekund\u0113m",
        ss: "%d sekund\u0113m",
        m: "min\u016Btes",
        mm: "%d min\u016Bt\u0113m",
        h: "stundas",
        hh: "%d stund\u0101m",
        d: "dienas",
        dd: "%d dien\u0101m",
        M: "m\u0113ne\u0161a",
        MM: "%d m\u0113ne\u0161iem",
        y: "gada",
        yy: "%d gadiem"
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal(e) {
        return e + "."
    },
    week: {
        dow: 1,
        doy: 4
    }
};

function se(e, t, i, n) {
    switch (i) {
        case "s":
            return t ? "\u0445\u044D\u0434\u0445\u044D\u043D \u0441\u0435\u043A\u0443\u043D\u0434" : "\u0445\u044D\u0434\u0445\u044D\u043D \u0441\u0435\u043A\u0443\u043D\u0434\u044B\u043D";
        case "ss":
            return e + (t ? " \u0441\u0435\u043A\u0443\u043D\u0434" : " \u0441\u0435\u043A\u0443\u043D\u0434\u044B\u043D");
        case "m":
        case "mm":
            return e + (t ? " \u043C\u0438\u043D\u0443\u0442" : " \u043C\u0438\u043D\u0443\u0442\u044B\u043D");
        case "h":
        case "hh":
            return e + (t ? " \u0446\u0430\u0433" : " \u0446\u0430\u0433\u0438\u0439\u043D");
        case "d":
        case "dd":
            return e + (t ? " \u04E9\u0434\u04E9\u0440" : " \u04E9\u0434\u0440\u0438\u0439\u043D");
        case "M":
        case "MM":
            return e + (t ? " \u0441\u0430\u0440" : " \u0441\u0430\u0440\u044B\u043D");
        case "y":
        case "yy":
            return e + (t ? " \u0436\u0438\u043B" : " \u0436\u0438\u043B\u0438\u0439\u043D");
        default:
            return e.toString(10)
    }
}
var M_ = {
    abbr: "mn",
    months: "\u041D\u044D\u0433\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0425\u043E\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0413\u0443\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u04E9\u0440\u04E9\u0432\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0422\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0417\u0443\u0440\u0433\u0430\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u043E\u043B\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u041D\u0430\u0439\u043C\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0415\u0441\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0410\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043D \u043D\u044D\u0433\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043D \u0445\u043E\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440".split("_"),
    monthsShort: "1 \u0441\u0430\u0440_2 \u0441\u0430\u0440_3 \u0441\u0430\u0440_4 \u0441\u0430\u0440_5 \u0441\u0430\u0440_6 \u0441\u0430\u0440_7 \u0441\u0430\u0440_8 \u0441\u0430\u0440_9 \u0441\u0430\u0440_10 \u0441\u0430\u0440_11 \u0441\u0430\u0440_12 \u0441\u0430\u0440".split("_"),
    monthsParseExact: !0,
    weekdays: "\u041D\u044F\u043C_\u0414\u0430\u0432\u0430\u0430_\u041C\u044F\u0433\u043C\u0430\u0440_\u041B\u0445\u0430\u0433\u0432\u0430_\u041F\u04AF\u0440\u044D\u0432_\u0411\u0430\u0430\u0441\u0430\u043D_\u0411\u044F\u043C\u0431\u0430".split("_"),
    weekdaysShort: "\u041D\u044F\u043C_\u0414\u0430\u0432_\u041C\u044F\u0433_\u041B\u0445\u0430_\u041F\u04AF\u0440_\u0411\u0430\u0430_\u0411\u044F\u043C".split("_"),
    weekdaysMin: "\u041D\u044F_\u0414\u0430_\u041C\u044F_\u041B\u0445_\u041F\u04AF_\u0411\u0430_\u0411\u044F".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY \u043E\u043D\u044B MMMM\u044B\u043D D",
        LLL: "YYYY \u043E\u043D\u044B MMMM\u044B\u043D D HH:mm",
        LLLL: "dddd, YYYY \u043E\u043D\u044B MMMM\u044B\u043D D HH:mm"
    },
    meridiemParse: /ҮӨ|ҮХ/i,
    isPM: function(e) {
        return e === "\u04AE\u0425"
    },
    meridiem: function(e, t, i) {
        return e < 12 ? "\u04AE\u04E8" : "\u04AE\u0425"
    },
    calendar: {
        sameDay: "[\u04E8\u043D\u04E9\u04E9\u0434\u04E9\u0440] LT",
        nextDay: "[\u041C\u0430\u0440\u0433\u0430\u0430\u0448] LT",
        nextWeek: "[\u0418\u0440\u044D\u0445] dddd LT",
        lastDay: "[\u04E8\u0447\u0438\u0433\u0434\u04E9\u0440] LT",
        lastWeek: "[\u04E8\u043D\u0433\u04E9\u0440\u0441\u04E9\u043D] dddd LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "%s \u0434\u0430\u0440\u0430\u0430",
        past: "%s \u04E9\u043C\u043D\u04E9",
        s: se,
        ss: se,
        m: se,
        mm: se,
        h: se,
        hh: se,
        d: se,
        dd: se,
        M: se,
        MM: se,
        y: se,
        yy: se
    },
    dayOfMonthOrdinalParse: /\d{1,2} өдөр/,
    ordinal: function(e, t) {
        switch (t) {
            case "d":
            case "D":
            case "DDD":
                return e + " \u04E9\u0434\u04E9\u0440";
            default:
                return e.toString(10)
        }
    }
};
var v_ = {
    abbr: "nb",
    months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
    monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
    monthsParseExact: !0,
    weekdays: "s\xF8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xF8rdag".split("_"),
    weekdaysShort: "s\xF8._ma._ti._on._to._fr._l\xF8.".split("_"),
    weekdaysMin: "s\xF8_ma_ti_on_to_fr_l\xF8".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY [kl.] HH:mm",
        LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
    },
    calendar: {
        sameDay: "[i dag kl.] LT",
        nextDay: "[i morgen kl.] LT",
        nextWeek: "dddd [kl.] LT",
        lastDay: "[i g\xE5r kl.] LT",
        lastWeek: "[forrige] dddd [kl.] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "om %s",
        past: "%s siden",
        s: "noen sekunder",
        ss: "%d sekunder",
        m: "ett minutt",
        mm: "%d minutter",
        h: "en time",
        hh: "%d timer",
        d: "en dag",
        dd: "%d dager",
        M: "en m\xE5ned",
        MM: "%d m\xE5neder",
        y: "ett \xE5r",
        yy: "%d \xE5r"
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
        dow: 1,
        doy: 4
    }
};
var Cs = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
    Xo = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
    di = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],
    Ls = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    D_ = {
        abbr: "nl-be",
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort(e, t, i) {
            return e ? /-MMM-/.test(t) ? Xo[L(e, i)] : Cs[L(e, i)] : Cs
        },
        monthsRegex: Ls,
        monthsShortRegex: Ls,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
        monthsParse: di,
        longMonthsParse: di,
        shortMonthsParse: di,
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[vandaag om] LT",
            nextDay: "[morgen om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[gisteren om] LT",
            lastWeek: "[afgelopen] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "over %s",
            past: "%s geleden",
            s: "een paar seconden",
            ss: "%d seconden",
            m: "\xE9\xE9n minuut",
            mm: "%d minuten",
            h: "\xE9\xE9n uur",
            hh: "%d uur",
            d: "\xE9\xE9n dag",
            dd: "%d dagen",
            M: "\xE9\xE9n maand",
            MM: "%d maanden",
            y: "\xE9\xE9n jaar",
            yy: "%d jaar"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal(e) {
            let t = Number(e);
            return t + (t === 1 || t === 8 || t >= 20 ? "ste" : "de")
        },
        week: {
            dow: 1,
            doy: 4
        }
    };
var Ys = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
    ed = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
    li = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],
    Ss = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    k_ = {
        abbr: "nl",
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort(e, t, i) {
            return e ? /-MMM-/.test(t) ? ed[L(e, i)] : Ys[L(e, i)] : Ys
        },
        monthsRegex: Ss,
        monthsShortRegex: Ss,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
        monthsParse: li,
        longMonthsParse: li,
        shortMonthsParse: li,
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[vandaag om] LT",
            nextDay: "[morgen om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[gisteren om] LT",
            lastWeek: "[afgelopen] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "over %s",
            past: "%s geleden",
            s: "een paar seconden",
            ss: "%d seconden",
            m: "\xE9\xE9n minuut",
            mm: "%d minuten",
            h: "\xE9\xE9n uur",
            hh: "%d uur",
            d: "\xE9\xE9n dag",
            dd: "%d dagen",
            M: "\xE9\xE9n maand",
            MM: "%d maanden",
            y: "\xE9\xE9n jaar",
            yy: "%d jaar"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal(e) {
            let t = Number(e);
            return t + (t === 1 || t === 8 || t >= 20 ? "ste" : "de")
        },
        week: {
            dow: 1,
            doy: 4
        }
    };
var ci = "stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017Adziernik_listopad_grudzie\u0144".split("_"),
    xs = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze\u015Bnia_pa\u017Adziernika_listopada_grudnia".split("_");

function Ut(e) {
    return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) % 10 !== 1
}

function Je(e, t, i) {
    let n = e + " ";
    switch (i) {
        case "ss":
            return n + (Ut(e) ? "sekundy" : "sekund");
        case "m":
            return t ? "minuta" : "minut\u0119";
        case "mm":
            return n + (Ut(e) ? "minuty" : "minut");
        case "h":
            return t ? "godzina" : "godzin\u0119";
        case "hh":
            return n + (Ut(e) ? "godziny" : "godzin");
        case "MM":
            return n + (Ut(e) ? "miesi\u0105ce" : "miesi\u0119cy");
        case "yy":
            return n + (Ut(e) ? "lata" : "lat")
    }
}
var w_ = {
    abbr: "pl",
    months(e, t, i) {
        return e ? t === "" ? "(" + xs[L(e, i)] + "|" + ci[L(e, i)] + ")" : /D MMMM/.test(t) ? xs[L(e, i)] : ci[L(e, i)] : ci
    },
    monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017A_lis_gru".split("_"),
    weekdays: "niedziela_poniedzia\u0142ek_wtorek_\u015Broda_czwartek_pi\u0105tek_sobota".split("_"),
    weekdaysShort: "ndz_pon_wt_\u015Br_czw_pt_sob".split("_"),
    weekdaysMin: "Nd_Pn_Wt_\u015Ar_Cz_Pt_So".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[Dzi\u015B o] LT",
        nextDay: "[Jutro o] LT",
        nextWeek(e) {
            switch (F(e)) {
                case 0:
                    return "[W niedziel\u0119 o] LT";
                case 2:
                    return "[We wtorek o] LT";
                case 3:
                    return "[W \u015Brod\u0119 o] LT";
                case 5:
                    return "[W pi\u0105tek o] LT";
                case 6:
                    return "[W sobot\u0119 o] LT";
                default:
                    return "[W] dddd [o] LT"
            }
        },
        lastDay: "[Wczoraj o] LT",
        lastWeek(e) {
            switch (F(e)) {
                case 0:
                    return "[W zesz\u0142\u0105 niedziel\u0119 o] LT";
                case 3:
                    return "[W zesz\u0142\u0105 \u015Brod\u0119 o] LT";
                case 4:
                    return "[W zesz\u0142\u0105 czwartek o] LT";
                case 5:
                    return "[W zesz\u0142\u0105 pi\u0105tek o] LT";
                case 6:
                    return "[W zesz\u0142\u0105 sobot\u0119 o] LT";
                default:
                    return "[W zesz\u0142y] dddd [o] LT"
            }
        },
        sameElse: "L"
    },
    relativeTime: {
        future: "za %s",
        past: "%s temu",
        s: "kilka sekund",
        ss: Je,
        m: Je,
        mm: Je,
        h: Je,
        hh: Je,
        d: "1 dzie\u0144",
        dd: "%d dni",
        M: "miesi\u0105c",
        MM: Je,
        y: "rok",
        yy: Je
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
        dow: 1,
        doy: 4
    }
};
var T_ = {
    abbr: "pt-br",
    months: "Janeiro_Fevereiro_Mar\xE7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
    monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
    weekdays: "Domingo_Segunda-feira_Ter\xE7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\xE1bado".split("_"),
    weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_S\xE1b".split("_"),
    weekdaysMin: "Do_2\xAA_3\xAA_4\xAA_5\xAA_6\xAA_S\xE1".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY [\xE0s] HH:mm",
        LLLL: "dddd, D [de] MMMM [de] YYYY [\xE0s] HH:mm"
    },
    calendar: {
        sameDay: "[Hoje \xE0s] LT",
        nextDay: "[Amanh\xE3 \xE0s] LT",
        nextWeek: "dddd [\xE0s] LT",
        lastDay: "[Ontem \xE0s] LT",
        lastWeek(e) {
            return F(e) === 0 || F(e) === 6 ? "[\xDAltimo] dddd [\xE0s] LT" : "[\xDAltima] dddd [\xE0s] LT"
        },
        sameElse: "L"
    },
    relativeTime: {
        future: "em %s",
        past: "%s atr\xE1s",
        s: "poucos segundos",
        ss: "%d segundos",
        m: "um minuto",
        mm: "%d minutos",
        h: "uma hora",
        hh: "%d horas",
        d: "um dia",
        dd: "%d dias",
        M: "um m\xEAs",
        MM: "%d meses",
        y: "um ano",
        yy: "%d anos"
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: "%d\xBA"
};

function ht(e, t, i) {
    let n = {
            ss: "secunde",
            mm: "minute",
            hh: "ore",
            dd: "zile",
            MM: "luni",
            yy: "ani"
        },
        s = " ";
    return (e % 100 >= 20 || e >= 100 && e % 100 === 0) && (s = " de "), e + s + n[i]
}
var C_ = {
    abbr: "ro",
    months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
    monthsShort: "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "duminic\u0103_luni_mar\u021Bi_miercuri_joi_vineri_s\xE2mb\u0103t\u0103".split("_"),
    weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_S\xE2m".split("_"),
    weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_S\xE2".split("_"),
    longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY H:mm",
        LLLL: "dddd, D MMMM YYYY H:mm"
    },
    calendar: {
        sameDay: "[azi la] LT",
        nextDay: "[m\xE2ine la] LT",
        nextWeek: "dddd [la] LT",
        lastDay: "[ieri la] LT",
        lastWeek: "[fosta] dddd [la] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "peste %s",
        past: "%s \xEEn urm\u0103",
        s: "c\xE2teva secunde",
        ss: ht,
        m: "un minut",
        mm: ht,
        h: "o or\u0103",
        hh: ht,
        d: "o zi",
        dd: ht,
        M: "o lun\u0103",
        MM: ht,
        y: "un an",
        yy: ht
    },
    week: {
        dow: 1,
        doy: 7
    }
};

function td(e, t) {
    let i = e.split("_");
    return t % 10 === 1 && t % 100 !== 11 ? i[0] : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? i[1] : i[2]
}

function Qe(e, t, i) {
    let n = {
        ss: t ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434" : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434",
        mm: t ? "\u043C\u0438\u043D\u0443\u0442\u0430_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442" : "\u043C\u0438\u043D\u0443\u0442\u0443_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442",
        hh: "\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043E\u0432",
        dd: "\u0434\u0435\u043D\u044C_\u0434\u043D\u044F_\u0434\u043D\u0435\u0439",
        MM: "\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u0430_\u043C\u0435\u0441\u044F\u0446\u0435\u0432",
        yy: "\u0433\u043E\u0434_\u0433\u043E\u0434\u0430_\u043B\u0435\u0442"
    };
    return i === "m" ? t ? "\u043C\u0438\u043D\u0443\u0442\u0430" : "\u043C\u0438\u043D\u0443\u0442\u0443" : e + " " + td(n[i], +e)
}
var _i = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i],
    L_ = {
        abbr: "ru",
        months: {
            format: "\u044F\u043D\u0432\u0430\u0440\u044F_\u0444\u0435\u0432\u0440\u0430\u043B\u044F_\u043C\u0430\u0440\u0442\u0430_\u0430\u043F\u0440\u0435\u043B\u044F_\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F_\u043E\u043A\u0442\u044F\u0431\u0440\u044F_\u043D\u043E\u044F\u0431\u0440\u044F_\u0434\u0435\u043A\u0430\u0431\u0440\u044F".split("_"),
            standalone: "\u044F\u043D\u0432\u0430\u0440\u044C_\u0444\u0435\u0432\u0440\u0430\u043B\u044C_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B\u044C_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C_\u043E\u043A\u0442\u044F\u0431\u0440\u044C_\u043D\u043E\u044F\u0431\u0440\u044C_\u0434\u0435\u043A\u0430\u0431\u0440\u044C".split("_")
        },
        monthsShort: {
            format: "\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440._\u0430\u043F\u0440._\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.".split("_"),
            standalone: "\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440\u0442_\u0430\u043F\u0440._\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.".split("_")
        },
        weekdays: {
            standalone: "\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043F\u044F\u0442\u043D\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043E\u0442\u0430".split("_"),
            format: "\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043F\u044F\u0442\u043D\u0438\u0446\u0443_\u0441\u0443\u0431\u0431\u043E\u0442\u0443".split("_"),
            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
        },
        weekdaysShort: "\u0432\u0441_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
        weekdaysMin: "\u0432\u0441_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
        monthsParse: _i,
        longMonthsParse: _i,
        shortMonthsParse: _i,
        monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
        monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
        monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
        monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY \u0433.",
            LLL: "D MMMM YYYY \u0433., H:mm",
            LLLL: "dddd, D MMMM YYYY \u0433., H:mm"
        },
        calendar: {
            sameDay: "[\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0432] LT",
            nextDay: "[\u0417\u0430\u0432\u0442\u0440\u0430 \u0432] LT",
            lastDay: "[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",
            nextWeek(e, t) {
                if (zt(t) !== zt(e)) switch (F(e)) {
                    case 0:
                        return "[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435] dddd [\u0432] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439] dddd [\u0432] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E] dddd [\u0432] LT"
                } else return F(e) === 2 ? "[\u0412\u043E] dddd [\u0432] LT" : "[\u0412] dddd [\u0432] LT"
            },
            lastWeek(e, t) {
                if (zt(t) !== zt(e)) switch (F(e)) {
                    case 0:
                        return "[\u0412 \u043F\u0440\u043E\u0448\u043B\u043E\u0435] dddd [\u0432] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[\u0412 \u043F\u0440\u043E\u0448\u043B\u044B\u0439] dddd [\u0432] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[\u0412 \u043F\u0440\u043E\u0448\u043B\u0443\u044E] dddd [\u0432] LT"
                } else return F(e) === 2 ? "[\u0412\u043E] dddd [\u0432] LT" : "[\u0412] dddd [\u0432] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "\u0447\u0435\u0440\u0435\u0437 %s",
            past: "%s \u043D\u0430\u0437\u0430\u0434",
            s: "\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434",
            ss: Qe,
            m: Qe,
            mm: Qe,
            h: "\u0447\u0430\u0441",
            hh: Qe,
            d: "\u0434\u0435\u043D\u044C",
            dd: Qe,
            M: "\u043C\u0435\u0441\u044F\u0446",
            MM: Qe,
            y: "\u0433\u043E\u0434",
            yy: Qe
        },
        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM(e) {
            return /^(дня|вечера)$/.test(e)
        },
        meridiem(e, t, i) {
            return e < 4 ? "\u043D\u043E\u0447\u0438" : e < 12 ? "\u0443\u0442\u0440\u0430" : e < 17 ? "\u0434\u043D\u044F" : "\u0432\u0435\u0447\u0435\u0440\u0430"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
        ordinal(e, t) {
            let i = Number(e);
            switch (t) {
                case "M":
                case "d":
                case "DDD":
                    return i + "-\u0439";
                case "D":
                    return i + "-\u0433\u043E";
                case "w":
                case "W":
                    return i + "-\u044F";
                default:
                    return i.toString(10)
            }
        },
        week: {
            dow: 1,
            doy: 4
        }
    };
var nd = "janu\xE1r_febru\xE1r_marec_apr\xEDl_m\xE1j_j\xFAn_j\xFAl_august_september_okt\xF3ber_november_december".split("_"),
    id = "jan_feb_mar_apr_m\xE1j_j\xFAn_j\xFAl_aug_sep_okt_nov_dec".split("_");

function pt(e) {
    return e > 1 && e < 5 && ~~(e / 10) !== 1
}

function re(e, t, i, n) {
    let s = e + " ";
    switch (i) {
        case "s":
            return t || n ? "p\xE1r sek\xFAnd" : "p\xE1r sekundami";
        case "ss":
            return t || n ? s + (pt(e) ? "sekundy" : "sek\xFAnd") : s + "sekundami";
        case "m":
            return t ? "min\xFAta" : n ? "min\xFAtu" : "min\xFAtou";
        case "mm":
            return t || n ? s + (pt(e) ? "min\xFAty" : "min\xFAt") : s + "min\xFAtami";
        case "h":
            return t ? "hodina" : n ? "hodinu" : "hodinou";
        case "hh":
            return t || n ? s + (pt(e) ? "hodiny" : "hod\xEDn") : s + "hodinami";
        case "d":
            return t || n ? "de\u0148" : "d\u0148om";
        case "dd":
            return t || n ? s + (pt(e) ? "dni" : "dn\xED") : s + "d\u0148ami";
        case "M":
            return t || n ? "mesiac" : "mesiacom";
        case "MM":
            return t || n ? s + (pt(e) ? "mesiace" : "mesiacov") : s + "mesiacmi";
        case "y":
            return t || n ? "rok" : "rokom";
        case "yy":
            return t || n ? s + (pt(e) ? "roky" : "rokov") : s + "rokmi"
    }
}
var Y_ = {
    abbr: "sk",
    months: nd,
    monthsShort: id,
    weekdays: "nede\u013Ea_pondelok_utorok_streda_\u0161tvrtok_piatok_sobota".split("_"),
    weekdaysShort: "ne_po_ut_st_\u0161t_pi_so".split("_"),
    weekdaysMin: "ne_po_ut_st_\u0161t_pi_so".split("_"),
    longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd D. MMMM YYYY H:mm",
        l: "D. M. YYYY"
    },
    calendar: {
        sameDay: "[dnes o] LT",
        nextDay: "[zajtra o] LT",
        nextWeek(e) {
            switch (F(e)) {
                case 0:
                    return "[v nede\u013Eu o] LT";
                case 1:
                case 2:
                    return "[v] dddd [o] LT";
                case 3:
                    return "[v stredu o] LT";
                case 4:
                    return "[vo \u0161tvrtok o] LT";
                case 5:
                    return "[v piatok o] LT";
                case 6:
                    return "[v sobotu o] LT"
            }
        },
        lastDay: "[v\u010Dera o] LT",
        lastWeek(e) {
            switch (F(e)) {
                case 0:
                    return "[minul\xFA nede\u013Eu o] LT";
                case 1:
                case 2:
                    return "[minul\xFD] dddd [o] LT";
                case 3:
                    return "[minul\xFA stredu o] LT";
                case 4:
                case 5:
                    return "[minul\xFD] dddd [o] LT";
                case 6:
                    return "[minul\xFA sobotu o] LT"
            }
        },
        sameElse: "L"
    },
    relativeTime: {
        future: "o %s",
        past: "pred %s",
        s: re,
        ss: re,
        m: re,
        mm: re,
        h: re,
        hh: re,
        d: re,
        dd: re,
        M: re,
        MM: re,
        y: re,
        yy: re
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
        dow: 1,
        doy: 4
    }
};

function ae(e, t, i, n) {
    var s = e + " ";
    switch (i) {
        case "s":
            return t || n ? "nekaj sekund" : "nekaj sekundami";
        case "ss":
            return e === 1 ? s += t ? "sekundo" : "sekundi" : e === 2 ? s += t || n ? "sekundi" : "sekundah" : e < 5 ? s += t || n ? "sekunde" : "sekundah" : s += "sekund", s;
        case "m":
            return t ? "ena minuta" : "eno minuto";
        case "mm":
            return e === 1 ? s += t ? "minuta" : "minuto" : e === 2 ? s += t || n ? "minuti" : "minutama" : e < 5 ? s += t || n ? "minute" : "minutami" : s += t || n ? "minut" : "minutami", s;
        case "h":
            return t ? "ena ura" : "eno uro";
        case "hh":
            return e === 1 ? s += t ? "ura" : "uro" : e === 2 ? s += t || n ? "uri" : "urama" : e < 5 ? s += t || n ? "ure" : "urami" : s += t || n ? "ur" : "urami", s;
        case "d":
            return t || n ? "en dan" : "enim dnem";
        case "dd":
            return e === 1 ? s += t || n ? "dan" : "dnem" : e === 2 ? s += t || n ? "dni" : "dnevoma" : s += t || n ? "dni" : "dnevi", s;
        case "M":
            return t || n ? "en mesec" : "enim mesecem";
        case "MM":
            return e === 1 ? s += t || n ? "mesec" : "mesecem" : e === 2 ? s += t || n ? "meseca" : "mesecema" : e < 5 ? s += t || n ? "mesece" : "meseci" : s += t || n ? "mesecev" : "meseci", s;
        case "y":
            return t || n ? "eno leto" : "enim letom";
        case "yy":
            return e === 1 ? s += t || n ? "leto" : "letom" : e === 2 ? s += t || n ? "leti" : "letoma" : e < 5 ? s += t || n ? "leta" : "leti" : s += t || n ? "let" : "leti", s
    }
}
var S_ = {
    abbr: "sl",
    months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
    monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "nedelja_ponedeljek_torek_sreda_\u010Detrtek_petek_sobota".split("_"),
    weekdaysShort: "ned._pon._tor._sre._\u010Det._pet._sob.".split("_"),
    weekdaysMin: "ne_po_to_sr_\u010De_pe_so".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
        sameDay: "[danes ob] LT",
        nextDay: "[jutri ob] LT",
        nextWeek(e) {
            switch (F(e)) {
                case 0:
                    return "[v] [nedeljo] [ob] LT";
                case 3:
                    return "[v] [sredo] [ob] LT";
                case 6:
                    return "[v] [soboto] [ob] LT";
                case 1:
                case 2:
                case 4:
                case 5:
                    return "[v] dddd [ob] LT"
            }
        },
        lastDay: "[v\u010Deraj ob] LT",
        lastWeek(e) {
            switch (F(e)) {
                case 0:
                    return "[prej\u0161njo] [nedeljo] [ob] LT";
                case 3:
                    return "[prej\u0161njo] [sredo] [ob] LT";
                case 6:
                    return "[prej\u0161njo] [soboto] [ob] LT";
                case 1:
                case 2:
                case 4:
                case 5:
                    return "[prej\u0161nji] dddd [ob] LT"
            }
        },
        sameElse: "L"
    },
    relativeTime: {
        future: "\u010Dez %s",
        past: "pred %s",
        s: ae,
        ss: ae,
        m: ae,
        mm: ae,
        h: ae,
        hh: ae,
        d: ae,
        dd: ae,
        M: ae,
        MM: ae,
        y: ae,
        yy: ae
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
        dow: 1,
        doy: 7
    }
};
var x_ = {
    abbr: "sq",
    months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N\xEBntor_Dhjetor".split("_"),
    monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N\xEBn_Dhj".split("_"),
    weekdays: "E Diel\xEB_E H\xEBn\xEB_E Mart\xEB_E M\xEBrkur\xEB_E Enjte_E Premte_E Shtun\xEB".split("_"),
    weekdaysShort: "Die_H\xEBn_Mar_M\xEBr_Enj_Pre_Sht".split("_"),
    weekdaysMin: "Di_He_Ma_Me_En_Pr_Sh".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[Sot n\xEB] LT",
        nextDay: "[Nes\xEBr n\xEB] LT",
        nextWeek: "dddd [n\xEB] LT",
        lastDay: "[Dje n\xEB] LT",
        lastWeek: "dddd [e kaluar n\xEB] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "n\xEB %s",
        past: "para %sve",
        s: "disa sekonda",
        ss: "%d sekonda",
        m: "nj\xEB minut",
        mm: "%d minuta",
        h: "nj\xEB or\xEB",
        hh: "%d or\xEB",
        d: "nj\xEB dit\xEB",
        dd: "%d dit\xEB",
        M: "nj\xEB muaj",
        MM: "%d muaj",
        y: "nj\xEB vit",
        yy: "%d vite"
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
        dow: 1,
        doy: 4
    }
};
var H_ = {
        abbr: "sv",
        months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "s\xF6ndag_m\xE5ndag_tisdag_onsdag_torsdag_fredag_l\xF6rdag".split("_"),
        weekdaysShort: "s\xF6n_m\xE5n_tis_ons_tor_fre_l\xF6r".split("_"),
        weekdaysMin: "s\xF6_m\xE5_ti_on_to_fr_l\xF6".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [kl.] HH:mm",
            LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
            lll: "D MMM YYYY HH:mm",
            llll: "ddd D MMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Idag] LT",
            nextDay: "[Imorgon] LT",
            lastDay: "[Ig\xE5r] LT",
            nextWeek: "[P\xE5] dddd LT",
            lastWeek: "[I] dddd[s] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "f\xF6r %s sedan",
            s: "n\xE5gra sekunder",
            ss: "%d sekunder",
            m: "en minut",
            mm: "%d minuter",
            h: "en timme",
            hh: "%d timmar",
            d: "en dag",
            dd: "%d dagar",
            M: "en m\xE5nad",
            MM: "%d m\xE5nader",
            y: "ett \xE5r",
            yy: "%d \xE5r"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
        ordinal(e) {
            let t = Number(e),
                i = t % 10,
                n = ~~(t % 100 / 10) === 1 ? "e" : i === 1 || i === 2 ? "a" : "e";
            return t + n
        },
        week: {
            dow: 1,
            doy: 4
        }
    },
    V_ = {
        abbr: "th",
        months: "\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21_\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C_\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21_\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19_\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21_\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19_\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21_\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21_\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19_\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21_\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19_\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21".split("_"),
        monthsShort: "\u0E21.\u0E04._\u0E01.\u0E1E._\u0E21\u0E35.\u0E04._\u0E40\u0E21.\u0E22._\u0E1E.\u0E04._\u0E21\u0E34.\u0E22._\u0E01.\u0E04._\u0E2A.\u0E04._\u0E01.\u0E22._\u0E15.\u0E04._\u0E1E.\u0E22._\u0E18.\u0E04.".split("_"),
        monthsParseExact: !0,
        weekdays: "\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C_\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C_\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23_\u0E1E\u0E38\u0E18_\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35_\u0E28\u0E38\u0E01\u0E23\u0E4C_\u0E40\u0E2A\u0E32\u0E23\u0E4C".split("_"),
        weekdaysShort: "\u0E2D\u0E32._\u0E08._\u0E2D._\u0E1E._\u0E1E\u0E24._\u0E28._\u0E2A.".split("_"),
        weekdaysMin: "\u0E2D\u0E32._\u0E08._\u0E2D._\u0E1E._\u0E1E\u0E24._\u0E28._\u0E2A.".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm",
            LLLL: "\u0E27\u0E31\u0E19dddd\u0E17\u0E35\u0E48 D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm"
        },
        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
        isPM(e) {
            return e === "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07"
        },
        meridiem(e, t, i) {
            return e < 12 ? "\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07" : "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07"
        },
        calendar: {
            sameDay: "[\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",
            nextDay: "[\u0E1E\u0E23\u0E38\u0E48\u0E07\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",
            nextWeek: "dddd[\u0E2B\u0E19\u0E49\u0E32 \u0E40\u0E27\u0E25\u0E32] LT",
            lastDay: "[\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E19\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",
            lastWeek: "[\u0E27\u0E31\u0E19]dddd[\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27 \u0E40\u0E27\u0E25\u0E32] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "\u0E2D\u0E35\u0E01 %s",
            past: "%s\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27",
            s: "\u0E44\u0E21\u0E48\u0E01\u0E35\u0E48\u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",
            ss: "%d \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",
            m: "1 \u0E19\u0E32\u0E17\u0E35",
            mm: "%d \u0E19\u0E32\u0E17\u0E35",
            h: "1 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
            hh: "%d \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
            d: "1 \u0E27\u0E31\u0E19",
            dd: "%d \u0E27\u0E31\u0E19",
            M: "1 \u0E40\u0E14\u0E37\u0E2D\u0E19",
            MM: "%d \u0E40\u0E14\u0E37\u0E2D\u0E19",
            y: "1 \u0E1B\u0E35",
            yy: "%d \u0E1B\u0E35"
        }
    },
    Hs = {
        abbr: "th-be",
        months: "\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21_\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C_\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21_\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19_\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21_\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19_\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21_\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21_\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19_\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21_\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19_\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21".split("_"),
        monthsShort: "\u0E21.\u0E04._\u0E01.\u0E1E._\u0E21\u0E35.\u0E04._\u0E40\u0E21.\u0E22._\u0E1E.\u0E04._\u0E21\u0E34.\u0E22._\u0E01.\u0E04._\u0E2A.\u0E04._\u0E01.\u0E22._\u0E15.\u0E04._\u0E1E.\u0E22._\u0E18.\u0E04.".split("_"),
        monthsParseExact: !0,
        weekdays: "\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C_\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C_\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23_\u0E1E\u0E38\u0E18_\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35_\u0E28\u0E38\u0E01\u0E23\u0E4C_\u0E40\u0E2A\u0E32\u0E23\u0E4C".split("_"),
        weekdaysShort: "\u0E2D\u0E32._\u0E08._\u0E2D._\u0E1E._\u0E1E\u0E24._\u0E28._\u0E2A.".split("_"),
        weekdaysMin: "\u0E2D\u0E32._\u0E08._\u0E2D._\u0E1E._\u0E1E\u0E24._\u0E28._\u0E2A.".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm",
            LLLL: "\u0E27\u0E31\u0E19dddd\u0E17\u0E35\u0E48 D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm"
        },
        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
        isPM(e) {
            return e === "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07"
        },
        meridiem(e, t, i) {
            return e < 12 ? "\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07" : "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07"
        },
        calendar: {
            sameDay: "[\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",
            nextDay: "[\u0E1E\u0E23\u0E38\u0E48\u0E07\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",
            nextWeek: "dddd[\u0E2B\u0E19\u0E49\u0E32 \u0E40\u0E27\u0E25\u0E32] LT",
            lastDay: "[\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E19\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",
            lastWeek: "[\u0E27\u0E31\u0E19]dddd[\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27 \u0E40\u0E27\u0E25\u0E32] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "\u0E2D\u0E35\u0E01 %s",
            past: "%s\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27",
            s: "\u0E44\u0E21\u0E48\u0E01\u0E35\u0E48\u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",
            ss: "%d \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",
            m: "1 \u0E19\u0E32\u0E17\u0E35",
            mm: "%d \u0E19\u0E32\u0E17\u0E35",
            h: "1 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
            hh: "%d \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
            d: "1 \u0E27\u0E31\u0E19",
            dd: "%d \u0E27\u0E31\u0E19",
            M: "1 \u0E40\u0E14\u0E37\u0E2D\u0E19",
            MM: "%d \u0E40\u0E14\u0E37\u0E2D\u0E19",
            y: "1 \u0E1B\u0E35",
            yy: "%d \u0E1B\u0E35"
        },
        preparse(e, t) {
            let i = Hs.longDateFormat[t] ? Hs.longDateFormat[t] : t;
            if (i.indexOf("YYYY", i.length - 4) !== -1) {
                let n = e.substr(0, e.length - 4),
                    s = parseInt(e.substr(e.length - 4), 10) - 543;
                return n + s
            }
            return e
        },
        getFullYear(e, t = !1) {
            return 543 + (t ? e.getUTCFullYear() : e.getFullYear())
        }
    };
var ui = {
        1: "'inci",
        5: "'inci",
        8: "'inci",
        70: "'inci",
        80: "'inci",
        2: "'nci",
        7: "'nci",
        20: "'nci",
        50: "'nci",
        3: "'\xFCnc\xFC",
        4: "'\xFCnc\xFC",
        100: "'\xFCnc\xFC",
        6: "'nc\u0131",
        9: "'uncu",
        10: "'uncu",
        30: "'uncu",
        60: "'\u0131nc\u0131",
        90: "'\u0131nc\u0131"
    },
    E_ = {
        abbr: "tr",
        months: "Ocak_\u015Eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011Fustos_Eyl\xFCl_Ekim_Kas\u0131m_Aral\u0131k".split("_"),
        monthsShort: "Oca_\u015Eub_Mar_Nis_May_Haz_Tem_A\u011Fu_Eyl_Eki_Kas_Ara".split("_"),
        weekdays: "Pazar_Pazartesi_Sal\u0131_\xC7ar\u015Famba_Per\u015Fembe_Cuma_Cumartesi".split("_"),
        weekdaysShort: "Paz_Pts_Sal_\xC7ar_Per_Cum_Cts".split("_"),
        weekdaysMin: "Pz_Pt_Sa_\xC7a_Pe_Cu_Ct".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[bug\xFCn saat] LT",
            nextDay: "[yar\u0131n saat] LT",
            nextWeek: "[gelecek] dddd [saat] LT",
            lastDay: "[d\xFCn] LT",
            lastWeek: "[ge\xE7en] dddd [saat] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s sonra",
            past: "%s \xF6nce",
            s: "birka\xE7 saniye",
            ss: "%d saniye",
            m: "bir dakika",
            mm: "%d dakika",
            h: "bir saat",
            hh: "%d saat",
            d: "bir g\xFCn",
            dd: "%d g\xFCn",
            M: "bir ay",
            MM: "%d ay",
            y: "bir y\u0131l",
            yy: "%d y\u0131l"
        },
        dayOfMonthOrdinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
        ordinal(e) {
            let t = Number(e);
            if (t === 0) return t + "'\u0131nc\u0131";
            let i = t % 10,
                n = t % 100 - i,
                s = t >= 100 ? 100 : null;
            return t + (ui[i] || ui[n] || ui[s])
        },
        week: {
            dow: 1,
            doy: 7
        }
    };

function sd(e, t) {
    let i = e.split("_");
    return t % 10 === 1 && t % 100 !== 11 ? i[0] : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? i[1] : i[2]
}

function Ke(e, t, i) {
    let n = {
        ss: t ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434" : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434",
        mm: t ? "\u0445\u0432\u0438\u043B\u0438\u043D\u0430_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D" : "\u0445\u0432\u0438\u043B\u0438\u043D\u0443_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D",
        hh: t ? "\u0433\u043E\u0434\u0438\u043D\u0430_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D" : "\u0433\u043E\u0434\u0438\u043D\u0443_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D",
        dd: "\u0434\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u043D\u0456\u0432",
        MM: "\u043C\u0456\u0441\u044F\u0446\u044C_\u043C\u0456\u0441\u044F\u0446\u0456_\u043C\u0456\u0441\u044F\u0446\u0456\u0432",
        yy: "\u0440\u0456\u043A_\u0440\u043E\u043A\u0438_\u0440\u043E\u043A\u0456\u0432"
    };
    return i === "m" ? t ? "\u0445\u0432\u0438\u043B\u0438\u043D\u0430" : "\u0445\u0432\u0438\u043B\u0438\u043D\u0443" : i === "h" ? t ? "\u0433\u043E\u0434\u0438\u043D\u0430" : "\u0433\u043E\u0434\u0438\u043D\u0443" : e + " " + sd(n[i], +e)
}

function rd(e, t, i) {
    let n = {
        nominative: "\u043D\u0435\u0434\u0456\u043B\u044F_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A_\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044F_\u0441\u0443\u0431\u043E\u0442\u0430".split("_"),
        accusative: "\u043D\u0435\u0434\u0456\u043B\u044E_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A_\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A_\u0441\u0435\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044E_\u0441\u0443\u0431\u043E\u0442\u0443".split("_"),
        genitive: "\u043D\u0435\u0434\u0456\u043B\u0456_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043A\u0430_\u0432\u0456\u0432\u0442\u043E\u0440\u043A\u0430_\u0441\u0435\u0440\u0435\u0434\u0438_\u0447\u0435\u0442\u0432\u0435\u0440\u0433\u0430_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u0456_\u0441\u0443\u0431\u043E\u0442\u0438".split("_")
    };
    if (!e) return n.nominative;
    let s = /(\[[ВвУу]\]) ?dddd/.test(t) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(t) ? "genitive" : "nominative";
    return n[s][F(e, i)]
}

function ft(e) {
    return function(t) {
        return e + "\u043E" + (C(t) === 11 ? "\u0431" : "") + "] LT"
    }
}
var O_ = {
    abbr: "uk",
    months: {
        format: "\u0441\u0456\u0447\u043D\u044F_\u043B\u044E\u0442\u043E\u0433\u043E_\u0431\u0435\u0440\u0435\u0437\u043D\u044F_\u043A\u0432\u0456\u0442\u043D\u044F_\u0442\u0440\u0430\u0432\u043D\u044F_\u0447\u0435\u0440\u0432\u043D\u044F_\u043B\u0438\u043F\u043D\u044F_\u0441\u0435\u0440\u043F\u043D\u044F_\u0432\u0435\u0440\u0435\u0441\u043D\u044F_\u0436\u043E\u0432\u0442\u043D\u044F_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043D\u044F".split("_"),
        standalone: "\u0441\u0456\u0447\u0435\u043D\u044C_\u043B\u044E\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043D\u044C_\u043A\u0432\u0456\u0442\u0435\u043D\u044C_\u0442\u0440\u0430\u0432\u0435\u043D\u044C_\u0447\u0435\u0440\u0432\u0435\u043D\u044C_\u043B\u0438\u043F\u0435\u043D\u044C_\u0441\u0435\u0440\u043F\u0435\u043D\u044C_\u0432\u0435\u0440\u0435\u0441\u0435\u043D\u044C_\u0436\u043E\u0432\u0442\u0435\u043D\u044C_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043D\u044C".split("_")
    },
    monthsShort: "\u0441\u0456\u0447_\u043B\u044E\u0442_\u0431\u0435\u0440_\u043A\u0432\u0456\u0442_\u0442\u0440\u0430\u0432_\u0447\u0435\u0440\u0432_\u043B\u0438\u043F_\u0441\u0435\u0440\u043F_\u0432\u0435\u0440_\u0436\u043E\u0432\u0442_\u043B\u0438\u0441\u0442_\u0433\u0440\u0443\u0434".split("_"),
    weekdays: rd,
    weekdaysShort: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
    weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY \u0440.",
        LLL: "D MMMM YYYY \u0440., HH:mm",
        LLLL: "dddd, D MMMM YYYY \u0440., HH:mm"
    },
    calendar: {
        sameDay: ft("[\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456 "),
        nextDay: ft("[\u0417\u0430\u0432\u0442\u0440\u0430 "),
        lastDay: ft("[\u0412\u0447\u043E\u0440\u0430 "),
        nextWeek: ft("[\u0423] dddd ["),
        lastWeek(e) {
            switch (F(e)) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return ft("[\u041C\u0438\u043D\u0443\u043B\u043E\u0457] dddd [")(e);
                case 1:
                case 2:
                case 4:
                    return ft("[\u041C\u0438\u043D\u0443\u043B\u043E\u0433\u043E] dddd [")(e)
            }
        },
        sameElse: "L"
    },
    relativeTime: {
        future: "\u0437\u0430 %s",
        past: "%s \u0442\u043E\u043C\u0443",
        s: "\u0434\u0435\u043A\u0456\u043B\u044C\u043A\u0430 \u0441\u0435\u043A\u0443\u043D\u0434",
        ss: Ke,
        m: Ke,
        mm: Ke,
        h: "\u0433\u043E\u0434\u0438\u043D\u0443",
        hh: Ke,
        d: "\u0434\u0435\u043D\u044C",
        dd: Ke,
        M: "\u043C\u0456\u0441\u044F\u0446\u044C",
        MM: Ke,
        y: "\u0440\u0456\u043A",
        yy: Ke
    },
    meridiemParse: /ночі|ранку|дня|вечора/,
    isPM(e) {
        return /^(дня|вечора)$/.test(e)
    },
    meridiem(e, t, i) {
        return e < 4 ? "\u043D\u043E\u0447\u0456" : e < 12 ? "\u0440\u0430\u043D\u043A\u0443" : e < 17 ? "\u0434\u043D\u044F" : "\u0432\u0435\u0447\u043E\u0440\u0430"
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
    ordinal(e, t) {
        let i = Number(e);
        switch (t) {
            case "M":
            case "d":
            case "DDD":
            case "w":
            case "W":
                return i + "-\u0439";
            case "D":
                return i + "-\u0433\u043E";
            default:
                return i.toString()
        }
    },
    week: {
        dow: 1,
        doy: 7
    }
};
var I_ = {
    abbr: "vi",
    months: "th\xE1ng 1_th\xE1ng 2_th\xE1ng 3_th\xE1ng 4_th\xE1ng 5_th\xE1ng 6_th\xE1ng 7_th\xE1ng 8_th\xE1ng 9_th\xE1ng 10_th\xE1ng 11_th\xE1ng 12".split("_"),
    monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
    monthsParseExact: !0,
    weekdays: "ch\u1EE7 nh\u1EADt_th\u1EE9 hai_th\u1EE9 ba_th\u1EE9 t\u01B0_th\u1EE9 n\u0103m_th\u1EE9 s\xE1u_th\u1EE9 b\u1EA3y".split("_"),
    weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
    weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
    weekdaysParseExact: !0,
    meridiemParse: /sa|ch/i,
    isPM(e) {
        return /^ch$/i.test(e)
    },
    meridiem(e, t, i) {
        return e < 12 ? i ? "sa" : "SA" : i ? "ch" : "CH"
    },
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM [n\u0103m] YYYY",
        LLL: "D MMMM [n\u0103m] YYYY HH:mm",
        LLLL: "dddd, D MMMM [n\u0103m] YYYY HH:mm",
        l: "DD/M/YYYY",
        ll: "D MMM YYYY",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd, D MMM YYYY HH:mm"
    },
    calendar: {
        sameDay: "[H\xF4m nay l\xFAc] LT",
        nextDay: "[Ng\xE0y mai l\xFAc] LT",
        nextWeek: "dddd [tu\u1EA7n t\u1EDBi l\xFAc] LT",
        lastDay: "[H\xF4m qua l\xFAc] LT",
        lastWeek: "dddd [tu\u1EA7n tr\u01B0\u1EDBc l\xFAc] LT",
        sameElse: "L"
    },
    relativeTime: {
        future: "%s t\u1EDBi",
        past: "%s tr\u01B0\u1EDBc",
        s: "v\xE0i gi\xE2y",
        ss: "%d gi\xE2y",
        m: "m\u1ED9t ph\xFAt",
        mm: "%d ph\xFAt",
        h: "m\u1ED9t gi\u1EDD",
        hh: "%d gi\u1EDD",
        d: "m\u1ED9t ng\xE0y",
        dd: "%d ng\xE0y",
        M: "m\u1ED9t th\xE1ng",
        MM: "%d th\xE1ng",
        y: "m\u1ED9t n\u0103m",
        yy: "%d n\u0103m"
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal(e) {
        return "" + e
    },
    week: {
        dow: 1,
        doy: 4
    }
};
var P_ = {
    abbr: "zh-cn",
    months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
    monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
    weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
    weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"),
    weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY\u5E74M\u6708D\u65E5",
        LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206",
        LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206",
        l: "YYYY/M/D",
        ll: "YYYY\u5E74M\u6708D\u65E5",
        lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour(e, t) {
        return e === 12 && (e = 0), t === "\u51CC\u6668" || t === "\u65E9\u4E0A" || t === "\u4E0A\u5348" ? e : t === "\u4E0B\u5348" || t === "\u665A\u4E0A" ? e + 12 : e >= 11 ? e : e + 12
    },
    meridiem(e, t, i) {
        let n = e * 100 + t;
        return n < 600 ? "\u51CC\u6668" : n < 900 ? "\u65E9\u4E0A" : n < 1130 ? "\u4E0A\u5348" : n < 1230 ? "\u4E2D\u5348" : n < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A"
    },
    calendar: {
        sameDay: "[\u4ECA\u5929]LT",
        nextDay: "[\u660E\u5929]LT",
        nextWeek: "[\u4E0B]ddddLT",
        lastDay: "[\u6628\u5929]LT",
        lastWeek: "[\u4E0A]ddddLT",
        sameElse: "L"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal(e, t) {
        let i = Number(e);
        switch (t) {
            case "d":
            case "D":
            case "DDD":
                return i + "\u65E5";
            case "M":
                return i + "\u6708";
            case "w":
            case "W":
                return i + "\u5468";
            default:
                return i.toString()
        }
    },
    relativeTime: {
        future: "%s\u5185",
        past: "%s\u524D",
        s: "\u51E0\u79D2",
        ss: "%d \u79D2",
        m: "1 \u5206\u949F",
        mm: "%d \u5206\u949F",
        h: "1 \u5C0F\u65F6",
        hh: "%d \u5C0F\u65F6",
        d: "1 \u5929",
        dd: "%d \u5929",
        M: "1 \u4E2A\u6708",
        MM: "%d \u4E2A\u6708",
        y: "1 \u5E74",
        yy: "%d \u5E74"
    },
    week: {
        dow: 1,
        doy: 4
    }
};
var ad = {
        1: "\u0661",
        2: "\u0662",
        3: "\u0663",
        4: "\u0664",
        5: "\u0665",
        6: "\u0666",
        7: "\u0667",
        8: "\u0668",
        9: "\u0669",
        0: "\u0660"
    },
    od = {
        "\u0661": "1",
        "\u0662": "2",
        "\u0663": "3",
        "\u0664": "4",
        "\u0665": "5",
        "\u0666": "6",
        "\u0667": "7",
        "\u0668": "8",
        "\u0669": "9",
        "\u0660": "0"
    },
    Vs = function(e) {
        return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5
    },
    dd = {
        s: ["\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06CC\u06A9 \u062B\u0627\u0646\u06CC\u0647", "\u06CC\u06A9 \u062B\u0627\u0646\u06CC\u0647", ["\u062F\u0648 \u062B\u0627\u0646\u06CC\u0647", "\u062F\u0648 \u062B\u0627\u0646\u06CC\u0647"], "%d \u062B\u0627\u0646\u06CC\u0647", "%d \u062B\u0627\u0646\u06CC\u0647", "%d \u062B\u0627\u0646\u06CC\u0647"],
        m: ["\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06CC\u06A9 \u062F\u0642\u06CC\u0642\u0647", "\u06CC\u06A9 \u062F\u0642\u06CC\u0642\u0647", ["\u062F\u0648 \u062F\u0642\u06CC\u0642\u0647", "\u062F\u0648 \u062F\u0642\u06CC\u0642\u0647"], "%d \u062F\u0642\u06CC\u0642\u0647", "%d \u062F\u0642\u06CC\u0642\u0647", "%d \u062F\u0642\u06CC\u0642\u0647"],
        h: ["\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06CC\u06A9 \u0633\u0627\u0639\u062A", "\u06CC\u06A9 \u0633\u0627\u0639\u062A", ["\u062F\u0648 \u0633\u0627\u0639\u062A", "\u062F\u0648 \u0633\u0627\u0639\u062A"], "%d \u0633\u0627\u0639\u062A", "%d \u0633\u0627\u0639\u062A", "%d \u0633\u0627\u0639\u062A"],
        d: ["\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06CC\u06A9 \u0631\u0648\u0632", "\u06CC\u06A9 \u0631\u0648\u0632", ["\u062F\u0648 \u0631\u0648\u0632", "\u062F\u0648 \u0631\u0648\u0632"], "%d \u0631\u0648\u0632", "%d \u0631\u0648\u0632", "%d \u0631\u0648\u0632"],
        M: ["\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06CC\u06A9 \u0645\u0627\u0647", "\u06CC\u06A9 \u0645\u0627\u0647", ["\u062F\u0648 \u0645\u0627\u0647", "\u062F\u0648 \u0645\u0627\u0647"], "%d \u0645\u0627\u0647", "%d \u0645\u0627\u0647", "%d \u0645\u0627\u0647"],
        y: ["\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06CC\u06A9 \u0633\u0627\u0644", "\u06CC\u06A9 \u0633\u0627\u0644", ["\u062F\u0648 \u0633\u0627\u0644", "\u062F\u0648 \u0633\u0627\u0644"], "%d \u0633\u0627\u0644", "%d \u0633\u0627\u0644", "%d \u0633\u0627\u0644"]
    },
    oe = function(e) {
        return function(t, i) {
            let n = Vs(t),
                s = dd[e][Vs(t)];
            return n === 2 && (s = s[i ? 0 : 1]), s.replace(/%d/i, t.toString())
        }
    },
    Es = ["\u0698\u0627\u0646\u0648\u06CC\u0647", "\u0641\u0648\u0631\u06CC\u0647", "\u0645\u0627\u0631\u0633", "\u0622\u0648\u0631\u06CC\u0644", "\u0645\u06CC", "\u0698\u0648\u0626\u0646", "\u062C\u0648\u0644\u0627\u06CC", "\u0622\u06AF\u0648\u0633\u062A", "\u0633\u067E\u062A\u0627\u0645\u0628\u0631", "\u0627\u06A9\u062A\u0628\u0631", "\u0646\u0648\u0627\u0645\u0628\u0631", "\u062F\u0633\u0627\u0645\u0628\u0631"],
    R_ = {
        abbr: "fa",
        months: Es,
        monthsShort: Es,
        weekdays: "\u06CC\u06A9\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647 \u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C \u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),
        weekdaysShort: "\u06CC\u06A9\u0634\u0646\u0628\u0647_\u062F\u0648\u200C\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u200C\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),
        weekdaysMin: "\u06CC_\u062F_\u0633_\u0686_\u067E_\u062C_\u0634".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "D/\u200FM/\u200FYYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /ص|م/,
        isPM(e) {
            return e === "\u0645"
        },
        meridiem(e, t, i) {
            return e < 12 ? "\u0635" : "\u0645"
        },
        calendar: {
            sameDay: "[\u0627\u0645\u0631\u0648\u0632 \u062F\u0631 \u0633\u0627\u0639\u062A] LT",
            nextDay: "[\u0641\u0631\u062F\u0627 \u062F\u0631 \u0633\u0627\u0639\u062A] LT",
            nextWeek: "dddd [\u062F\u0631 \u0633\u0627\u0639\u062A] LT",
            lastDay: "[\u062F\u06CC\u0631\u0648\u0632 \u062F\u0631 \u0633\u0627\u0639\u062A] LT",
            lastWeek: "dddd [\u062F\u0631 \u0633\u0627\u0639\u062A] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "\u0628\u0639\u062F %s",
            past: "\u067E\u06CC\u0634 %s",
            s: oe("s"),
            ss: oe("s"),
            m: oe("m"),
            mm: oe("m"),
            h: oe("h"),
            hh: oe("h"),
            d: oe("d"),
            dd: oe("d"),
            M: oe("M"),
            MM: oe("M"),
            y: oe("y"),
            yy: oe("y")
        },
        preparse(e) {
            return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(t) {
                return od[t]
            }).replace(/،/g, ",")
        },
        postformat(e) {
            return e.replace(/\d/g, function(t) {
                return ad[t]
            }).replace(/,/g, "\u060C")
        },
        week: {
            dow: 6,
            doy: 80
        }
    };
var wt = class extends Te {
        constructor(t, i, n) {
            super(t), i.pipe(Gi(zi)).pipe(Qi((a, o) => o ? n(a, o) : a, t)).subscribe(a => this.next(a))
        }
    },
    Tt = class e extends Fn {
        constructor(t, i, n) {
            super(), this._dispatcher = t, this._reducer = i, this.source = n
        }
        select(t) {
            return (this.source ? .pipe(Vt(t)) || new Fn().pipe(Vt(t))).pipe(Et())
        }
        lift(t) {
            let i = new e(this._dispatcher, this._reducer, this);
            return i.operator = t, i
        }
        dispatch(t) {
            this._dispatcher.next(t)
        }
        next(t) {
            this._dispatcher.next(t)
        }
        error(t) {
            this._dispatcher.error(t)
        }
        complete() {}
    };

function cd(e, t) {
    e & 1 && (u(0, "td"), M(1, "\xA0\xA0\xA0"), _())
}

function _d(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "td")(1, "a", 1), f("click", function() {
            m(i);
            let s = d();
            return h(s.changeMinutes(s.minuteStep))
        }), R(2, "span", 2), _()()
    }
    if (e & 2) {
        let i = d();
        l(), w("disabled", !i.canIncrementMinutes || !i.isEditable)
    }
}

function ud(e, t) {
    e & 1 && (u(0, "td"), M(1, "\xA0"), _())
}

function md(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "td")(1, "a", 1), f("click", function() {
            m(i);
            let s = d();
            return h(s.changeSeconds(s.secondsStep))
        }), R(2, "span", 2), _()()
    }
    if (e & 2) {
        let i = d();
        l(), w("disabled", !i.canIncrementSeconds || !i.isEditable)
    }
}

function hd(e, t) {
    e & 1 && (u(0, "td"), M(1, "\xA0\xA0\xA0"), _())
}

function pd(e, t) {
    e & 1 && R(0, "td")
}

function fd(e, t) {
    e & 1 && (u(0, "td"), M(1, "\xA0:\xA0"), _())
}

function gd(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "td", 4)(1, "input", 5), f("wheel", function(s) {
            m(i);
            let r = d();
            return r.prevDef(s), h(r.changeMinutes(r.minuteStep * r.wheelSign(s), "wheel"))
        })("keydown.ArrowUp", function() {
            m(i);
            let s = d();
            return h(s.changeMinutes(s.minuteStep, "key"))
        })("keydown.ArrowDown", function() {
            m(i);
            let s = d();
            return h(s.changeMinutes(-s.minuteStep, "key"))
        })("change", function(s) {
            m(i);
            let r = d();
            return h(r.updateMinutes(s.target))
        }), _()()
    }
    if (e & 2) {
        let i = d();
        w("has-error", i.invalidMinutes), l(), w("is-invalid", i.invalidMinutes), c("placeholder", i.minutesPlaceholder)("readonly", i.readonlyInput)("disabled", i.disabled)("value", i.minutes), ce("aria-label", i.labelMinutes)
    }
}

function yd(e, t) {
    e & 1 && (u(0, "td"), M(1, "\xA0:\xA0"), _())
}

function bd(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "td", 4)(1, "input", 5), f("wheel", function(s) {
            m(i);
            let r = d();
            return r.prevDef(s), h(r.changeSeconds(r.secondsStep * r.wheelSign(s), "wheel"))
        })("keydown.ArrowUp", function() {
            m(i);
            let s = d();
            return h(s.changeSeconds(s.secondsStep, "key"))
        })("keydown.ArrowDown", function() {
            m(i);
            let s = d();
            return h(s.changeSeconds(-s.secondsStep, "key"))
        })("change", function(s) {
            m(i);
            let r = d();
            return h(r.updateSeconds(s.target))
        }), _()()
    }
    if (e & 2) {
        let i = d();
        w("has-error", i.invalidSeconds), l(), w("is-invalid", i.invalidSeconds), c("placeholder", i.secondsPlaceholder)("readonly", i.readonlyInput)("disabled", i.disabled)("value", i.seconds), ce("aria-label", i.labelSeconds)
    }
}

function Md(e, t) {
    e & 1 && (u(0, "td"), M(1, "\xA0\xA0\xA0"), _())
}

function vd(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "td")(1, "button", 8), f("click", function() {
            m(i);
            let s = d();
            return h(s.toggleMeridian())
        }), M(2), _()()
    }
    if (e & 2) {
        let i = d();
        l(), w("disabled", !i.isEditable || !i.canToggleMeridian), c("disabled", !i.isEditable || !i.canToggleMeridian), l(), Ce("", i.meridian, " ")
    }
}

function Dd(e, t) {
    e & 1 && (u(0, "td"), M(1, "\xA0\xA0\xA0"), _())
}

function kd(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "td")(1, "a", 1), f("click", function() {
            m(i);
            let s = d();
            return h(s.changeMinutes(-s.minuteStep))
        }), R(2, "span", 7), _()()
    }
    if (e & 2) {
        let i = d();
        l(), w("disabled", !i.canDecrementMinutes || !i.isEditable)
    }
}

function wd(e, t) {
    e & 1 && (u(0, "td"), M(1, "\xA0"), _())
}

function Td(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "td")(1, "a", 1), f("click", function() {
            m(i);
            let s = d();
            return h(s.changeSeconds(-s.secondsStep))
        }), R(2, "span", 7), _()()
    }
    if (e & 2) {
        let i = d();
        l(), w("disabled", !i.canDecrementSeconds || !i.isEditable)
    }
}

function Cd(e, t) {
    e & 1 && (u(0, "td"), M(1, "\xA0\xA0\xA0"), _())
}

function Ld(e, t) {
    e & 1 && R(0, "td")
}
var Ae = (() => {
        let t = class t {
            writeValue(n) {
                return {
                    type: t.WRITE_VALUE,
                    payload: n
                }
            }
            changeHours(n) {
                return {
                    type: t.CHANGE_HOURS,
                    payload: n
                }
            }
            changeMinutes(n) {
                return {
                    type: t.CHANGE_MINUTES,
                    payload: n
                }
            }
            changeSeconds(n) {
                return {
                    type: t.CHANGE_SECONDS,
                    payload: n
                }
            }
            setTime(n) {
                return {
                    type: t.SET_TIME_UNIT,
                    payload: n
                }
            }
            updateControls(n) {
                return {
                    type: t.UPDATE_CONTROLS,
                    payload: n
                }
            }
        };
        t.WRITE_VALUE = "[timepicker] write value from ng model", t.CHANGE_HOURS = "[timepicker] change hours", t.CHANGE_MINUTES = "[timepicker] change minutes", t.CHANGE_SECONDS = "[timepicker] change seconds", t.SET_TIME_UNIT = "[timepicker] set time unit", t.UPDATE_CONTROLS = "[timepicker] update controls", t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275prov = le({
            token: t,
            factory: t.\u0275fac,
            providedIn: "platform"
        });
        let e = t;
        return e
    })(),
    Yd = 10,
    Sd = 24,
    _r = 12,
    xd = 60,
    Hd = 60;

function Hi(e) {
    return !e || e instanceof Date && isNaN(e.getHours()) ? !1 : typeof e == "string" ? Hi(new Date(e)) : !0
}

function Si(e, t) {
    return !(e.min && t < e.min || e.max && t > e.max)
}

function Ct(e) {
    return typeof e > "u" ? NaN : typeof e == "number" ? e : parseInt(e, Yd)
}

function ur(e, t = !1) {
    let i = Ct(e);
    return isNaN(i) || i < 0 || i > (t ? _r : Sd) ? NaN : i
}

function mr(e) {
    let t = Ct(e);
    return isNaN(t) || t < 0 || t > xd ? NaN : t
}

function hr(e) {
    let t = Ct(e);
    return isNaN(t) || t < 0 || t > Hd ? NaN : t
}

function ar(e) {
    return typeof e == "string" ? new Date(e) : e
}

function de(e, t) {
    if (!e) return de(Hn(new Date, 0, 0, 0), t);
    if (!t) return e;
    let i = e.getHours(),
        n = e.getMinutes(),
        s = e.getSeconds();
    return t.hour && (i = i + Ct(t.hour)), t.minute && (n = n + Ct(t.minute)), t.seconds && (s = s + Ct(t.seconds)), Hn(e, i, n, s)
}

function pr(e, t) {
    let i = ur(t.hour),
        n = mr(t.minute),
        s = hr(t.seconds) || 0;
    return t.isPM && i !== 12 && (i += _r), e ? isNaN(i) || isNaN(n) ? e : Hn(e, i, n, s) : !isNaN(i) && !isNaN(n) ? Hn(new Date, i, n, s) : e
}

function Hn(e, t, i, n) {
    let s = new Date(e.getFullYear(), e.getMonth(), e.getDate(), t, i, n, e.getMilliseconds());
    return s.setFullYear(e.getFullYear()), s.setMonth(e.getMonth()), s.setDate(e.getDate()), s
}

function xi(e) {
    let t = e.toString();
    return t.length > 1 ? t : `0${t}`
}

function fr(e, t) {
    return !isNaN(ur(e, t))
}

function gr(e) {
    return !isNaN(mr(e))
}

function yr(e) {
    return !isNaN(hr(e))
}

function Vd(e, t, i) {
    let n = pr(new Date, e);
    return !(!n || t && n > t || i && n < i)
}

function Ed(e, t, i) {
    return e.length === 0 || t.length === 0 || i.length === 0
}

function or(e, t = "0", i = "0", n) {
    return fr(e, n) && gr(t) && yr(i)
}

function xn(e, t) {
    return !(e.readonlyInput || e.disabled || t && (t.source === "wheel" && !e.mousewheel || t.source === "key" && !e.arrowkeys))
}

function Od(e, t) {
    return !(!e.step || e.step > 0 && !t.canIncrementHours || e.step < 0 && !t.canDecrementHours)
}

function Id(e, t) {
    return !(!e.step || e.step > 0 && !t.canIncrementMinutes || e.step < 0 && !t.canDecrementMinutes)
}

function Pd(e, t) {
    return !(!e.step || e.step > 0 && !t.canIncrementSeconds || e.step < 0 && !t.canDecrementSeconds)
}

function dr(e) {
    let {
        hourStep: t,
        minuteStep: i,
        secondsStep: n,
        readonlyInput: s,
        disabled: r,
        mousewheel: a,
        arrowkeys: o,
        showSpinners: p,
        showMeridian: v,
        showSeconds: S,
        meridians: $,
        min: K,
        max: jn
    } = e;
    return {
        hourStep: t,
        minuteStep: i,
        secondsStep: n,
        readonlyInput: s,
        disabled: r,
        mousewheel: a,
        arrowkeys: o,
        showSpinners: p,
        showMeridian: v,
        showSeconds: S,
        meridians: $,
        min: K,
        max: jn
    }
}

function Rd(e, t) {
    let {
        min: s,
        max: r,
        hourStep: a,
        minuteStep: o,
        secondsStep: p,
        showSeconds: v
    } = t, S = {
        canIncrementHours: !0,
        canIncrementMinutes: !0,
        canIncrementSeconds: !0,
        canDecrementHours: !0,
        canDecrementMinutes: !0,
        canDecrementSeconds: !0,
        canToggleMeridian: !0
    };
    if (!e) return S;
    if (r) {
        let $ = de(e, {
            hour: a
        });
        if (S.canIncrementHours = r > $ && e.getHours() + a < 24, !S.canIncrementHours) {
            let K = de(e, {
                minute: o
            });
            S.canIncrementMinutes = v ? r > K : r >= K
        }
        if (!S.canIncrementMinutes) {
            let K = de(e, {
                seconds: p
            });
            S.canIncrementSeconds = r >= K
        }
        e.getHours() < 12 && (S.canToggleMeridian = de(e, {
            hour: 12
        }) < r)
    }
    if (s) {
        let $ = de(e, {
            hour: -a
        });
        if (S.canDecrementHours = s < $, !S.canDecrementHours) {
            let K = de(e, {
                minute: -o
            });
            S.canDecrementMinutes = v ? s < K : s <= K
        }
        if (!S.canDecrementMinutes) {
            let K = de(e, {
                seconds: -p
            });
            S.canDecrementSeconds = s <= K
        }
        e.getHours() >= 12 && (S.canToggleMeridian = de(e, {
            hour: -12
        }) > s)
    }
    return S
}
var br = (() => {
        let t = class t {
            constructor() {
                this.hourStep = 1, this.minuteStep = 5, this.secondsStep = 10, this.showMeridian = !0, this.meridians = ["AM", "PM"], this.readonlyInput = !1, this.disabled = !1, this.allowEmptyTime = !1, this.mousewheel = !0, this.arrowkeys = !0, this.showSpinners = !0, this.showSeconds = !1, this.showMinutes = !0, this.hoursPlaceholder = "HH", this.minutesPlaceholder = "MM", this.secondsPlaceholder = "SS", this.ariaLabelHours = "hours", this.ariaLabelMinutes = "minutes", this.ariaLabelSeconds = "seconds"
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275prov = le({
            token: t,
            factory: t.\u0275fac,
            providedIn: "root"
        });
        let e = t;
        return e
    })(),
    Mr = {
        value: void 0,
        config: new br,
        controls: {
            canIncrementHours: !0,
            canIncrementMinutes: !0,
            canIncrementSeconds: !0,
            canDecrementHours: !0,
            canDecrementMinutes: !0,
            canDecrementSeconds: !0,
            canToggleMeridian: !0
        }
    };

function lr(e = Mr, t) {
    switch (t.type) {
        case Ae.WRITE_VALUE:
            return Object.assign({}, e, {
                value: t.payload
            });
        case Ae.CHANGE_HOURS:
            {
                if (!xn(e.config, t.payload) || !Od(t.payload, e.controls)) return e;
                let i = de(e.value, {
                    hour: t.payload.step
                });
                return (e.config.max || e.config.min) && !Si(e.config, i) ? e : Object.assign({}, e, {
                    value: i
                })
            }
        case Ae.CHANGE_MINUTES:
            {
                if (!xn(e.config, t.payload) || !Id(t.payload, e.controls)) return e;
                let i = de(e.value, {
                    minute: t.payload.step
                });
                return (e.config.max || e.config.min) && !Si(e.config, i) ? e : Object.assign({}, e, {
                    value: i
                })
            }
        case Ae.CHANGE_SECONDS:
            {
                if (!xn(e.config, t.payload) || !Pd(t.payload, e.controls)) return e;
                let i = de(e.value, {
                    seconds: t.payload.step
                });
                return (e.config.max || e.config.min) && !Si(e.config, i) ? e : Object.assign({}, e, {
                    value: i
                })
            }
        case Ae.SET_TIME_UNIT:
            {
                if (!xn(e.config)) return e;
                let i = pr(e.value, t.payload);
                return Object.assign({}, e, {
                    value: i
                })
            }
        case Ae.UPDATE_CONTROLS:
            {
                let i = Rd(e.value, t.payload),
                    n = {
                        value: e.value,
                        config: t.payload,
                        controls: i
                    };
                return e.config.showMeridian !== n.config.showMeridian && e.value && (n.value = new Date(e.value)),
                Object.assign({}, e, n)
            }
        default:
            return e
    }
}
var cr = (() => {
        let t = class t extends Tt {
            constructor() {
                let n = new Te({
                        type: "[mini-ngrx] dispatcher init"
                    }),
                    s = new wt(Mr, n, lr);
                super(n, lr, s)
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275prov = le({
            token: t,
            factory: t.\u0275fac,
            providedIn: "platform"
        });
        let e = t;
        return e
    })(),
    jd = {
        provide: Nt,
        useExisting: Ne(() => Lt),
        multi: !0
    },
    Lt = (() => {
        let t = class t {
            constructor(n, s, r, a) {
                this._cd = s, this._store = r, this._timepickerActions = a, this.hourStep = 1, this.minuteStep = 5, this.secondsStep = 10, this.readonlyInput = !1, this.disabled = !1, this.mousewheel = !0, this.arrowkeys = !0, this.showSpinners = !0, this.showMeridian = !0, this.showMinutes = !0, this.showSeconds = !1, this.meridians = ["AM", "PM"], this.hoursPlaceholder = "HH", this.minutesPlaceholder = "MM", this.secondsPlaceholder = "SS", this.isValid = new I, this.meridianChange = new I, this.hours = "", this.minutes = "", this.seconds = "", this.meridian = "", this.invalidHours = !1, this.invalidMinutes = !1, this.invalidSeconds = !1, this.labelHours = "hours", this.labelMinutes = "minutes", this.labelSeconds = "seconds", this.canIncrementHours = !0, this.canIncrementMinutes = !0, this.canIncrementSeconds = !0, this.canDecrementHours = !0, this.canDecrementMinutes = !0, this.canDecrementSeconds = !0, this.canToggleMeridian = !0, this.onChange = Function.prototype, this.onTouched = Function.prototype, this.config = n, Object.assign(this, this.config), this.timepickerSub = r.select(o => o.value).subscribe(o => {
                    this._renderTime(o), this.onChange(o), this._store.dispatch(this._timepickerActions.updateControls(dr(this)))
                }), r.select(o => o.controls).subscribe(o => {
                    let p = or(this.hours, this.minutes, this.seconds, this.isPM()),
                        v = this.config.allowEmptyTime && this.isOneOfDatesIsEmpty() || p;
                    this.isValid.emit(v), Object.assign(this, o), s.markForCheck()
                })
            }
            get isSpinnersVisible() {
                return this.showSpinners && !this.readonlyInput
            }
            get isEditable() {
                return !(this.readonlyInput || this.disabled)
            }
            resetValidation() {
                this.invalidHours = !1, this.invalidMinutes = !1, this.invalidSeconds = !1
            }
            isPM() {
                return this.showMeridian && this.meridian === this.meridians[1]
            }
            prevDef(n) {
                n.preventDefault()
            }
            wheelSign(n) {
                return Math.sign(n.deltaY || 0) * -1
            }
            ngOnChanges() {
                this._store.dispatch(this._timepickerActions.updateControls(dr(this)))
            }
            changeHours(n, s = "") {
                this.resetValidation(), this._store.dispatch(this._timepickerActions.changeHours({
                    step: n,
                    source: s
                }))
            }
            changeMinutes(n, s = "") {
                this.resetValidation(), this._store.dispatch(this._timepickerActions.changeMinutes({
                    step: n,
                    source: s
                }))
            }
            changeSeconds(n, s = "") {
                this.resetValidation(), this._store.dispatch(this._timepickerActions.changeSeconds({
                    step: n,
                    source: s
                }))
            }
            updateHours(n) {
                this.resetValidation(), this.hours = n.value;
                let s = fr(this.hours, this.isPM()) && this.isValidLimit();
                if (!(this.config.allowEmptyTime && this.isOneOfDatesIsEmpty() || s)) {
                    this.invalidHours = !0, this.isValid.emit(!1), this.onChange(null);
                    return
                }
                this._updateTime()
            }
            updateMinutes(n) {
                this.resetValidation(), this.minutes = n.value;
                let s = gr(this.minutes) && this.isValidLimit();
                if (!(this.config.allowEmptyTime && this.isOneOfDatesIsEmpty() || s)) {
                    this.invalidMinutes = !0, this.isValid.emit(!1), this.onChange(null);
                    return
                }
                this._updateTime()
            }
            updateSeconds(n) {
                this.resetValidation(), this.seconds = n.value;
                let s = yr(this.seconds) && this.isValidLimit();
                if (!(this.config.allowEmptyTime && this.isOneOfDatesIsEmpty() || s)) {
                    this.invalidSeconds = !0, this.isValid.emit(!1), this.onChange(null);
                    return
                }
                this._updateTime()
            }
            isValidLimit() {
                return Vd({
                    hour: this.hours,
                    minute: this.minutes,
                    seconds: this.seconds,
                    isPM: this.isPM()
                }, this.max, this.min)
            }
            isOneOfDatesIsEmpty() {
                return Ed(this.hours, this.minutes, this.seconds)
            }
            _updateTime() {
                let n = this.showSeconds ? this.seconds : void 0,
                    s = this.showMinutes ? this.minutes : void 0,
                    r = or(this.hours, s, n, this.isPM());
                if (!(this.config.allowEmptyTime && this.isOneOfDatesIsEmpty() || r)) {
                    this.isValid.emit(!1), this.onChange(null);
                    return
                }
                this._store.dispatch(this._timepickerActions.setTime({
                    hour: this.hours,
                    minute: this.minutes,
                    seconds: this.seconds,
                    isPM: this.isPM()
                }))
            }
            toggleMeridian() {
                if (!this.showMeridian || !this.isEditable) return;
                this._store.dispatch(this._timepickerActions.changeHours({
                    step: 12,
                    source: ""
                }))
            }
            writeValue(n) {
                Hi(n) ? (this.resetValidation(), this._store.dispatch(this._timepickerActions.writeValue(ar(n)))) : n == null && this._store.dispatch(this._timepickerActions.writeValue())
            }
            registerOnChange(n) {
                this.onChange = n
            }
            registerOnTouched(n) {
                this.onTouched = n
            }
            setDisabledState(n) {
                this.disabled = n, this._cd.markForCheck()
            }
            ngOnDestroy() {
                this.timepickerSub ? .unsubscribe()
            }
            _renderTime(n) {
                if (!n || !Hi(n)) {
                    this.hours = "", this.minutes = "", this.seconds = "", this.meridian = this.meridians[0], this.meridianChange.emit(this.meridian);
                    return
                }
                let s = ar(n);
                if (!s) return;
                let r = 12,
                    a = s.getHours();
                this.showMeridian && (this.meridian = this.meridians[a >= r ? 1 : 0], this.meridianChange.emit(this.meridian), a = a % r, a === 0 && (a = r)), this.hours = xi(a), this.minutes = xi(s.getMinutes()), this.seconds = xi(s.getUTCSeconds())
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(g(br), g(Rt), g(cr), g(Ae))
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["timepicker"]
            ],
            inputs: {
                hourStep: "hourStep",
                minuteStep: "minuteStep",
                secondsStep: "secondsStep",
                readonlyInput: "readonlyInput",
                disabled: "disabled",
                mousewheel: "mousewheel",
                arrowkeys: "arrowkeys",
                showSpinners: "showSpinners",
                showMeridian: "showMeridian",
                showMinutes: "showMinutes",
                showSeconds: "showSeconds",
                meridians: "meridians",
                min: "min",
                max: "max",
                hoursPlaceholder: "hoursPlaceholder",
                minutesPlaceholder: "minutesPlaceholder",
                secondsPlaceholder: "secondsPlaceholder"
            },
            outputs: {
                isValid: "isValid",
                meridianChange: "meridianChange"
            },
            features: [_e([jd, cr, Ae]), Ot],
            decls: 31,
            vars: 33,
            consts: [
                [1, "text-center", 3, "hidden"],
                ["href", "javascript:void(0);", 1, "btn", "btn-link", 3, "click"],
                [1, "bs-chevron", "bs-chevron-up"],
                [4, "ngIf"],
                [1, "form-group", "mb-3"],
                ["type", "text", "maxlength", "2", 1, "form-control", "text-center", "bs-timepicker-field", 3, "wheel", "keydown.ArrowUp", "keydown.ArrowDown", "change", "placeholder", "readonly", "disabled", "value"],
                ["class", "form-group mb-3", 3, "has-error", 4, "ngIf"],
                [1, "bs-chevron", "bs-chevron-down"],
                ["type", "button", 1, "btn", "btn-default", "text-center", 3, "click", "disabled"]
            ],
            template: function(s, r) {
                s & 1 && (u(0, "table")(1, "tbody")(2, "tr", 0)(3, "td")(4, "a", 1), f("click", function() {
                    return r.changeHours(r.hourStep)
                }), R(5, "span", 2), _()(), y(6, cd, 2, 0, "td", 3)(7, _d, 3, 2, "td", 3)(8, ud, 2, 0, "td", 3)(9, md, 3, 2, "td", 3)(10, hd, 2, 0, "td", 3)(11, pd, 1, 0, "td", 3), _(), u(12, "tr")(13, "td", 4)(14, "input", 5), f("wheel", function(o) {
                    return r.prevDef(o), r.changeHours(r.hourStep * r.wheelSign(o), "wheel")
                })("keydown.ArrowUp", function() {
                    return r.changeHours(r.hourStep, "key")
                })("keydown.ArrowDown", function() {
                    return r.changeHours(-r.hourStep, "key")
                })("change", function(o) {
                    return r.updateHours(o.target)
                }), _()(), y(15, fd, 2, 0, "td", 3)(16, gd, 2, 9, "td", 6)(17, yd, 2, 0, "td", 3)(18, bd, 2, 9, "td", 6)(19, Md, 2, 0, "td", 3)(20, vd, 3, 4, "td", 3), _(), u(21, "tr", 0)(22, "td")(23, "a", 1), f("click", function() {
                    return r.changeHours(-r.hourStep)
                }), R(24, "span", 7), _()(), y(25, Dd, 2, 0, "td", 3)(26, kd, 3, 2, "td", 3)(27, wd, 2, 0, "td", 3)(28, Td, 3, 2, "td", 3)(29, Cd, 2, 0, "td", 3)(30, Ld, 1, 0, "td", 3), _()()()), s & 2 && (l(2), c("hidden", !r.showSpinners), l(2), w("disabled", !r.canIncrementHours || !r.isEditable), l(2), c("ngIf", r.showMinutes), l(), c("ngIf", r.showMinutes), l(), c("ngIf", r.showSeconds), l(), c("ngIf", r.showSeconds), l(), c("ngIf", r.showMeridian), l(), c("ngIf", r.showMeridian), l(2), w("has-error", r.invalidHours), l(), w("is-invalid", r.invalidHours), c("placeholder", r.hoursPlaceholder)("readonly", r.readonlyInput)("disabled", r.disabled)("value", r.hours), ce("aria-label", r.labelHours), l(), c("ngIf", r.showMinutes), l(), c("ngIf", r.showMinutes), l(), c("ngIf", r.showSeconds), l(), c("ngIf", r.showSeconds), l(), c("ngIf", r.showMeridian), l(), c("ngIf", r.showMeridian), l(), c("hidden", !r.showSpinners), l(2), w("disabled", !r.canDecrementHours || !r.isEditable), l(2), c("ngIf", r.showMinutes), l(), c("ngIf", r.showMinutes), l(), c("ngIf", r.showSeconds), l(), c("ngIf", r.showSeconds), l(), c("ngIf", r.showMeridian), l(), c("ngIf", r.showMeridian))
            },
            dependencies: [ve],
            styles: [`.bs-chevron{border-style:solid;display:block;width:9px;height:9px;position:relative;border-width:3px 0px 0 3px}.bs-chevron-up{-webkit-transform:rotate(45deg);transform:rotate(45deg);top:2px}.bs-chevron-down{-webkit-transform:rotate(-135deg);transform:rotate(-135deg);top:-2px}.bs-timepicker-field{width:65px;padding:.375rem .55rem}
`],
            encapsulation: 2,
            changeDetection: 0
        });
        let e = t;
        return e
    })(),
    Yt = (() => {
        let t = class t {
            static forRoot() {
                return {
                    ngModule: t,
                    providers: []
                }
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275mod = ln({
            type: t
        }), t.\u0275inj = dn({});
        let e = t;
        return e
    })();

function Fd(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "button", 2), f("click", function() {
            let s = m(i).$implicit,
                r = d();
            return h(r.selectFromRanges(s))
        }), M(1), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d();
        w("selected", n.compareRanges(i)), l(), Ce(" ", i.label, " ")
    }
}

function Wd(e, t) {
    if (e & 1) {
        let i = D();
        at(0), M(1, " \u200B "), u(2, "button", 2), f("click", function() {
            m(i);
            let s = d();
            return h(s.view("month"))
        }), u(3, "span"), M(4), _()(), ot()
    }
    if (e & 2) {
        let i = d();
        l(2), c("disabled", i.isDisabled), l(2), B(i.calendar.monthTitle)
    }
}
var Bd = [
        [
            ["bs-datepicker-navigation-view"]
        ], "*"
    ],
    Nd = ["bs-datepicker-navigation-view", "*"];

function $d(e, t) {
    e & 1 && R(0, "bs-current-date", 4)
}

function Ud(e, t) {
    e & 1 && R(0, "bs-timepicker")
}

function zd(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "td", 4), f("click", function() {
            let s = m(i).$implicit,
                r = d(2);
            return h(r.viewYear(s))
        })("mouseenter", function() {
            let s = m(i).$implicit,
                r = d(2);
            return h(r.hoverYear(s, !0))
        })("mouseleave", function() {
            let s = m(i).$implicit,
                r = d(2);
            return h(r.hoverYear(s, !1))
        }), u(1, "span"), M(2), _()()
    }
    if (e & 2) {
        let i = t.$implicit;
        w("disabled", i.isDisabled)("is-highlighted", i.isHovered), l(), w("selected", i.isSelected), l(), B(i.label)
    }
}

function Gd(e, t) {
    if (e & 1 && (u(0, "tr"), y(1, zd, 3, 7, "td", 3), _()), e & 2) {
        let i = t.$implicit;
        l(), c("ngForOf", i)
    }
}

function Jd(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "td", 4), f("click", function() {
            let s = m(i).$implicit,
                r = d(2);
            return h(r.viewMonth(s))
        })("mouseenter", function() {
            let s = m(i).$implicit,
                r = d(2);
            return h(r.hoverMonth(s, !0))
        })("mouseleave", function() {
            let s = m(i).$implicit,
                r = d(2);
            return h(r.hoverMonth(s, !1))
        }), u(1, "span"), M(2), _()()
    }
    if (e & 2) {
        let i = t.$implicit;
        w("disabled", i.isDisabled)("is-highlighted", i.isHovered), l(), w("selected", i.isSelected), l(), B(i.label)
    }
}

function Qd(e, t) {
    if (e & 1 && (u(0, "tr"), y(1, Jd, 3, 7, "td", 3), _()), e & 2) {
        let i = t.$implicit;
        l(), c("ngForOf", i)
    }
}
var Kd = ["bsDatepickerDayDecorator", ""];

function Zd(e, t) {
    e & 1 && R(0, "th")
}

function qd(e, t) {
    if (e & 1 && (u(0, "th", 5), M(1), _()), e & 2) {
        let i = t.index,
            n = d();
        l(), Ce("", n.calendar.weekdays[i], " ")
    }
}

function Xd(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "span", 11), f("click", function() {
            m(i);
            let s = d(2).$implicit,
                r = d();
            return h(r.selectWeek(s))
        }), M(1), _()
    }
    if (e & 2) {
        let i = d(2).index,
            n = d();
        l(), B(n.calendar.weekNumbers[i])
    }
}

function el(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "span", 12), f("click", function() {
            m(i);
            let s = d(2).$implicit,
                r = d();
            return h(r.selectWeek(s))
        })("mouseenter", function() {
            m(i);
            let s = d(2).$implicit,
                r = d();
            return h(r.weekHoverHandler(s, !0))
        })("mouseleave", function() {
            m(i);
            let s = d(2).$implicit,
                r = d();
            return h(r.weekHoverHandler(s, !1))
        }), M(1), _()
    }
    if (e & 2) {
        let i = d(2).index,
            n = d();
        l(), B(n.calendar.weekNumbers[i])
    }
}

function tl(e, t) {
    if (e & 1 && (u(0, "td", 8), y(1, Xd, 2, 1, "span", 9)(2, el, 2, 1, "span", 10), _()), e & 2) {
        let i = d(2);
        w("active-week", i.isWeekHovered), l(), c("ngIf", i.isiOS), l(), c("ngIf", !i.isiOS)
    }
}

function nl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "span", 17), f("click", function() {
            m(i);
            let s = d().$implicit,
                r = d(2);
            return h(r.selectDay(s))
        })("mouseenter", function() {
            m(i);
            let s = d().$implicit,
                r = d(2);
            return h(r.hoverDay(s, !0))
        })("mouseleave", function() {
            m(i);
            let s = d().$implicit,
                r = d(2);
            return h(r.hoverDay(s, !1))
        }), M(1), _()
    }
    if (e & 2) {
        let i = d().$implicit;
        c("tooltip", qi(i.tooltipText))("day", i), l(), Ce("", i.label, " 3")
    }
}

function il(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "span", 18), f("click", function() {
            m(i);
            let s = d().$implicit,
                r = d(2);
            return h(r.selectDay(s))
        })("mouseenter", function() {
            m(i);
            let s = d().$implicit,
                r = d(2);
            return h(r.hoverDay(s, !0))
        })("mouseleave", function() {
            m(i);
            let s = d().$implicit,
                r = d(2);
            return h(r.hoverDay(s, !1))
        }), M(1), _()
    }
    if (e & 2) {
        let i = d().$implicit;
        c("day", i), l(), Ce("", i.label, " 2")
    }
}

function sl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "span", 19), f("click", function() {
            m(i);
            let s = d().$implicit,
                r = d(2);
            return h(r.selectDay(s))
        }), M(1), _()
    }
    if (e & 2) {
        let i = d().$implicit;
        c("day", i), l(), Ce("", i.label, " 1")
    }
}

function rl(e, t) {
    if (e & 1 && (u(0, "td", 13), y(1, nl, 2, 4, "span", 14)(2, il, 2, 2, "span", 15)(3, sl, 2, 2, "span", 16), _()), e & 2) {
        let i = d(2);
        l(), c("ngIf", !i.isiOS && i.isShowTooltip), l(), c("ngIf", !i.isiOS && !i.isShowTooltip), l(), c("ngIf", i.isiOS)
    }
}

function al(e, t) {
    if (e & 1 && (u(0, "tr"), y(1, tl, 3, 4, "td", 6)(2, rl, 4, 3, "td", 7), _()), e & 2) {
        let i = t.$implicit,
            n = d();
        l(), c("ngIf", n.options && n.options.showWeekNumbers), l(), c("ngForOf", i.days)
    }
}
var Cr = ["startTP"];

function ol(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-days-calendar-view", 13), x(1, "async"), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.dayHoverHandler(s))
        })("onHoverWeek", function(s) {
            m(i);
            let r = d(3);
            return h(r.weekHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.daySelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)("isDisabled", n.isDatePickerDisabled)("options", H(1, 5, n.options$))
    }
}

function dl(e, t) {
    if (e & 1 && R(0, "timepicker", 15, 1), e & 2) {
        let i = d(4);
        c("disabled", i.isDatePickerDisabled)
    }
}

function ll(e, t) {
    if (e & 1 && (u(0, "div", 14), R(1, "timepicker", 15, 0), y(3, dl, 2, 1, "timepicker", 16), _()), e & 2) {
        let i = d(3);
        l(), c("disabled", i.isDatePickerDisabled), l(2), c("ngIf", i.isRangePicker)
    }
}

function cl(e, t) {
    if (e & 1 && (at(0), u(1, "div", 10), y(2, ol, 2, 7, "bs-days-calendar-view", 11), x(3, "async"), _(), y(4, ll, 4, 2, "div", 12), ot()), e & 2) {
        let i = d(2);
        l(2), c("ngForOf", H(3, 2, i.daysCalendar$)), l(2), c("ngIf", i.withTimepicker)
    }
}

function _l(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-month-calendar-view", 18), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.monthHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.monthSelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)
    }
}

function ul(e, t) {
    if (e & 1 && (u(0, "div", 10), y(1, _l, 1, 3, "bs-month-calendar-view", 17), x(2, "async"), _()), e & 2) {
        let i = d(2);
        l(), c("ngForOf", H(2, 1, i.monthsCalendar))
    }
}

function ml(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-years-calendar-view", 18), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.yearHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.yearSelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)
    }
}

function hl(e, t) {
    if (e & 1 && (u(0, "div", 10), y(1, ml, 1, 3, "bs-years-calendar-view", 17), x(2, "async"), _()), e & 2) {
        let i = d(2);
        l(), c("ngForOf", H(2, 1, i.yearsCalendar))
    }
}

function pl(e, t) {
    e & 1 && (u(0, "div", 19)(1, "button", 20), M(2, "Apply"), _(), u(3, "button", 21), M(4, "Cancel"), _()())
}

function fl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 24)(1, "button", 25), f("click", function() {
            m(i);
            let s = d(3);
            return h(s.setToday())
        }), M(2), _()()
    }
    if (e & 2) {
        let i = d(3);
        w("today-left", i.todayPos === "left")("today-right", i.todayPos === "right")("today-center", i.todayPos === "center"), l(2), B(i.todayBtnLbl)
    }
}

function gl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 26)(1, "button", 25), f("click", function() {
            m(i);
            let s = d(3);
            return h(s.clearDate())
        }), M(2), _()()
    }
    if (e & 2) {
        let i = d(3);
        w("clear-left", i.clearPos === "left")("clear-right", i.clearPos === "right")("clear-center", i.clearPos === "center"), l(2), B(i.clearBtnLbl)
    }
}

function yl(e, t) {
    if (e & 1 && (u(0, "div", 19), y(1, fl, 3, 7, "div", 22)(2, gl, 3, 7, "div", 23), _()), e & 2) {
        let i = d(2);
        l(), c("ngIf", i.showTodayBtn), l(), c("ngIf", i.showClearBtn)
    }
}

function bl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 27)(1, "bs-custom-date-view", 28), f("onSelect", function(s) {
            m(i);
            let r = d(2);
            return h(r.setRangeOnCalendar(s))
        }), _()()
    }
    if (e & 2) {
        let i = d(2);
        l(), c("selectedRange", i.chosenRange)("ranges", i.customRanges)("customRangeLabel", i.customRangeBtnLbl)
    }
}

function Ml(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 3)(1, "div", 4), f("@datepickerAnimation.done", function() {
            m(i);
            let s = d();
            return h(s.positionServiceEnable())
        }), u(2, "div", 5), x(3, "async"), y(4, cl, 5, 4, "ng-container", 6)(5, ul, 3, 3, "div", 7)(6, hl, 3, 3, "div", 7), _(), y(7, pl, 5, 0, "div", 8)(8, yl, 3, 2, "div", 8), _(), y(9, bl, 2, 3, "div", 9), _()
    }
    if (e & 2) {
        let i = d();
        c("ngClass", i.containerClass), l(), c("@datepickerAnimation", i.animationState), l(), c("ngSwitch", H(3, 9, i.viewMode)), l(2), c("ngSwitchCase", "day"), l(), c("ngSwitchCase", "month"), l(), c("ngSwitchCase", "year"), l(), c("ngIf", !1), l(), c("ngIf", i.showTodayBtn || i.showClearBtn), l(), c("ngIf", i.customRanges && i.customRanges.length > 0)
    }
}

function vl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-days-calendar-view", 13), x(1, "async"), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.dayHoverHandler(s))
        })("onHoverWeek", function(s) {
            m(i);
            let r = d(3);
            return h(r.weekHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.daySelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)("isDisabled", n.isDatePickerDisabled)("options", H(1, 5, n.options$))
    }
}

function Dl(e, t) {
    if (e & 1 && R(0, "timepicker", 15, 1), e & 2) {
        let i = d(4);
        c("disabled", i.isDatePickerDisabled)
    }
}

function kl(e, t) {
    if (e & 1 && (u(0, "div", 14), R(1, "timepicker", 15, 0), y(3, Dl, 2, 1, "timepicker", 16), _()), e & 2) {
        let i = d(3);
        l(), c("disabled", i.isDatePickerDisabled), l(2), c("ngIf", i.isRangePicker)
    }
}

function wl(e, t) {
    if (e & 1 && (at(0), u(1, "div", 10), y(2, vl, 2, 7, "bs-days-calendar-view", 11), x(3, "async"), _(), y(4, kl, 4, 2, "div", 12), ot()), e & 2) {
        let i = d(2);
        l(2), c("ngForOf", H(3, 2, i.daysCalendar$)), l(2), c("ngIf", i.withTimepicker)
    }
}

function Tl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-month-calendar-view", 18), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.monthHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.monthSelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)
    }
}

function Cl(e, t) {
    if (e & 1 && (u(0, "div", 10), y(1, Tl, 1, 3, "bs-month-calendar-view", 17), x(2, "async"), _()), e & 2) {
        let i = d(2);
        l(), c("ngForOf", H(2, 1, i.monthsCalendar))
    }
}

function Ll(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-years-calendar-view", 18), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.yearHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.yearSelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)
    }
}

function Yl(e, t) {
    if (e & 1 && (u(0, "div", 10), y(1, Ll, 1, 3, "bs-years-calendar-view", 17), x(2, "async"), _()), e & 2) {
        let i = d(2);
        l(), c("ngForOf", H(2, 1, i.yearsCalendar))
    }
}

function Sl(e, t) {
    e & 1 && (u(0, "div", 19)(1, "button", 20), M(2, "Apply"), _(), u(3, "button", 21), M(4, "Cancel"), _()())
}

function xl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 24)(1, "button", 25), f("click", function() {
            m(i);
            let s = d(3);
            return h(s.setToday())
        }), M(2), _()()
    }
    if (e & 2) {
        let i = d(3);
        w("today-left", i.todayPos === "left")("today-right", i.todayPos === "right")("today-center", i.todayPos === "center"), l(2), B(i.todayBtnLbl)
    }
}

function Hl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 26)(1, "button", 25), f("click", function() {
            m(i);
            let s = d(3);
            return h(s.clearDate())
        }), M(2), _()()
    }
    if (e & 2) {
        let i = d(3);
        w("clear-left", i.clearPos === "left")("clear-right", i.clearPos === "right")("clear-center", i.clearPos === "center"), l(2), B(i.clearBtnLbl)
    }
}

function Vl(e, t) {
    if (e & 1 && (u(0, "div", 19), y(1, xl, 3, 7, "div", 22)(2, Hl, 3, 7, "div", 23), _()), e & 2) {
        let i = d(2);
        l(), c("ngIf", i.showTodayBtn), l(), c("ngIf", i.showClearBtn)
    }
}

function El(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 27)(1, "bs-custom-date-view", 28), f("onSelect", function(s) {
            m(i);
            let r = d(2);
            return h(r.setRangeOnCalendar(s))
        }), _()()
    }
    if (e & 2) {
        let i = d(2);
        l(), c("selectedRange", i.chosenRange)("ranges", i.customRanges)("customRangeLabel", i.customRangeBtnLbl)
    }
}

function Ol(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 3)(1, "div", 4), f("@datepickerAnimation.done", function() {
            m(i);
            let s = d();
            return h(s.positionServiceEnable())
        }), u(2, "div", 5), x(3, "async"), y(4, wl, 5, 4, "ng-container", 6)(5, Cl, 3, 3, "div", 7)(6, Yl, 3, 3, "div", 7), _(), y(7, Sl, 5, 0, "div", 8)(8, Vl, 3, 2, "div", 8), _(), y(9, El, 2, 3, "div", 9), _()
    }
    if (e & 2) {
        let i = d();
        c("ngClass", i.containerClass), l(), c("@datepickerAnimation", i.animationState), l(), c("ngSwitch", H(3, 9, i.viewMode)), l(2), c("ngSwitchCase", "day"), l(), c("ngSwitchCase", "month"), l(), c("ngSwitchCase", "year"), l(), c("ngIf", !1), l(), c("ngIf", i.showTodayBtn || i.showClearBtn), l(), c("ngIf", i.customRanges && i.customRanges.length > 0)
    }
}
var Il = ["endTP"];

function Pl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-days-calendar-view", 13), x(1, "async"), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.dayHoverHandler(s))
        })("onHoverWeek", function(s) {
            m(i);
            let r = d(3);
            return h(r.weekHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.daySelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)("isDisabled", n.isDatePickerDisabled)("options", H(1, 5, n.options$))
    }
}

function Rl(e, t) {
    if (e & 1 && R(0, "timepicker", 15, 1), e & 2) {
        let i = d(4);
        c("disabled", i.isDatePickerDisabled)
    }
}

function jl(e, t) {
    if (e & 1 && (u(0, "div", 14), R(1, "timepicker", 15, 0), y(3, Rl, 2, 1, "timepicker", 16), _()), e & 2) {
        let i = d(3);
        l(), c("disabled", i.isDatePickerDisabled), l(2), c("ngIf", i.isRangePicker)
    }
}

function Al(e, t) {
    if (e & 1 && (at(0), u(1, "div", 10), y(2, Pl, 2, 7, "bs-days-calendar-view", 11), x(3, "async"), _(), y(4, jl, 4, 2, "div", 12), ot()), e & 2) {
        let i = d(2);
        l(2), c("ngForOf", H(3, 2, i.daysCalendar$)), l(2), c("ngIf", i.withTimepicker)
    }
}

function Fl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-month-calendar-view", 18), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.monthHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.monthSelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)
    }
}

function Wl(e, t) {
    if (e & 1 && (u(0, "div", 10), y(1, Fl, 1, 3, "bs-month-calendar-view", 17), x(2, "async"), _()), e & 2) {
        let i = d(2);
        l(), c("ngForOf", H(2, 1, i.monthsCalendar))
    }
}

function Bl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-years-calendar-view", 18), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.yearHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.yearSelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)
    }
}

function Nl(e, t) {
    if (e & 1 && (u(0, "div", 10), y(1, Bl, 1, 3, "bs-years-calendar-view", 17), x(2, "async"), _()), e & 2) {
        let i = d(2);
        l(), c("ngForOf", H(2, 1, i.yearsCalendar))
    }
}

function $l(e, t) {
    e & 1 && (u(0, "div", 19)(1, "button", 20), M(2, "Apply"), _(), u(3, "button", 21), M(4, "Cancel"), _()())
}

function Ul(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 24)(1, "button", 25), f("click", function() {
            m(i);
            let s = d(3);
            return h(s.setToday())
        }), M(2), _()()
    }
    if (e & 2) {
        let i = d(3);
        w("today-left", i.todayPos === "left")("today-right", i.todayPos === "right")("today-center", i.todayPos === "center"), l(2), B(i.todayBtnLbl)
    }
}

function zl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 26)(1, "button", 25), f("click", function() {
            m(i);
            let s = d(3);
            return h(s.clearDate())
        }), M(2), _()()
    }
    if (e & 2) {
        let i = d(3);
        w("clear-left", i.clearPos === "left")("clear-right", i.clearPos === "right")("clear-center", i.clearPos === "center"), l(2), B(i.clearBtnLbl)
    }
}

function Gl(e, t) {
    if (e & 1 && (u(0, "div", 19), y(1, Ul, 3, 7, "div", 22)(2, zl, 3, 7, "div", 23), _()), e & 2) {
        let i = d(2);
        l(), c("ngIf", i.showTodayBtn), l(), c("ngIf", i.showClearBtn)
    }
}

function Jl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 27)(1, "bs-custom-date-view", 28), f("onSelect", function(s) {
            m(i);
            let r = d(2);
            return h(r.setRangeOnCalendar(s))
        }), _()()
    }
    if (e & 2) {
        let i = d(2);
        l(), c("selectedRange", i.chosenRange)("ranges", i.customRanges)("customRangeLabel", i.customRangeBtnLbl)
    }
}

function Ql(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 3)(1, "div", 4), f("@datepickerAnimation.done", function() {
            m(i);
            let s = d();
            return h(s.positionServiceEnable())
        }), u(2, "div", 5), x(3, "async"), y(4, Al, 5, 4, "ng-container", 6)(5, Wl, 3, 3, "div", 7)(6, Nl, 3, 3, "div", 7), _(), y(7, $l, 5, 0, "div", 8)(8, Gl, 3, 2, "div", 8), _(), y(9, Jl, 2, 3, "div", 9), _()
    }
    if (e & 2) {
        let i = d();
        c("ngClass", i.containerClass), l(), c("@datepickerAnimation", i.animationState), l(), c("ngSwitch", H(3, 9, i.viewMode)), l(2), c("ngSwitchCase", "day"), l(), c("ngSwitchCase", "month"), l(), c("ngSwitchCase", "year"), l(), c("ngIf", !1), l(), c("ngIf", i.showTodayBtn || i.showClearBtn), l(), c("ngIf", i.customRanges && i.customRanges.length > 0)
    }
}

function Kl(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-days-calendar-view", 13), x(1, "async"), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.dayHoverHandler(s))
        })("onHoverWeek", function(s) {
            m(i);
            let r = d(3);
            return h(r.weekHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.daySelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)("isDisabled", n.isDatePickerDisabled)("options", H(1, 5, n.options$))
    }
}

function Zl(e, t) {
    if (e & 1 && R(0, "timepicker", 15, 1), e & 2) {
        let i = d(4);
        c("disabled", i.isDatePickerDisabled)
    }
}

function ql(e, t) {
    if (e & 1 && (u(0, "div", 14), R(1, "timepicker", 15, 0), y(3, Zl, 2, 1, "timepicker", 16), _()), e & 2) {
        let i = d(3);
        l(), c("disabled", i.isDatePickerDisabled), l(2), c("ngIf", i.isRangePicker)
    }
}

function Xl(e, t) {
    if (e & 1 && (at(0), u(1, "div", 10), y(2, Kl, 2, 7, "bs-days-calendar-view", 11), x(3, "async"), _(), y(4, ql, 4, 2, "div", 12), ot()), e & 2) {
        let i = d(2);
        l(2), c("ngForOf", H(3, 2, i.daysCalendar$)), l(2), c("ngIf", i.withTimepicker)
    }
}

function ec(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-month-calendar-view", 18), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.monthHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.monthSelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)
    }
}

function tc(e, t) {
    if (e & 1 && (u(0, "div", 10), y(1, ec, 1, 3, "bs-month-calendar-view", 17), x(2, "async"), _()), e & 2) {
        let i = d(2);
        l(), c("ngForOf", H(2, 1, i.monthsCalendar))
    }
}

function nc(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "bs-years-calendar-view", 18), f("onNavigate", function(s) {
            m(i);
            let r = d(3);
            return h(r.navigateTo(s))
        })("onViewMode", function(s) {
            m(i);
            let r = d(3);
            return h(r.setViewMode(s))
        })("onHover", function(s) {
            m(i);
            let r = d(3);
            return h(r.yearHoverHandler(s))
        })("onSelect", function(s) {
            m(i);
            let r = d(3);
            return h(r.yearSelectHandler(s))
        }), _()
    }
    if (e & 2) {
        let i = t.$implicit,
            n = d(3);
        w("bs-datepicker-multiple", n.multipleCalendars), c("calendar", i)
    }
}

function ic(e, t) {
    if (e & 1 && (u(0, "div", 10), y(1, nc, 1, 3, "bs-years-calendar-view", 17), x(2, "async"), _()), e & 2) {
        let i = d(2);
        l(), c("ngForOf", H(2, 1, i.yearsCalendar))
    }
}

function sc(e, t) {
    e & 1 && (u(0, "div", 19)(1, "button", 20), M(2, "Apply"), _(), u(3, "button", 21), M(4, "Cancel"), _()())
}

function rc(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 24)(1, "button", 25), f("click", function() {
            m(i);
            let s = d(3);
            return h(s.setToday())
        }), M(2), _()()
    }
    if (e & 2) {
        let i = d(3);
        w("today-left", i.todayPos === "left")("today-right", i.todayPos === "right")("today-center", i.todayPos === "center"), l(2), B(i.todayBtnLbl)
    }
}

function ac(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 26)(1, "button", 25), f("click", function() {
            m(i);
            let s = d(3);
            return h(s.clearDate())
        }), M(2), _()()
    }
    if (e & 2) {
        let i = d(3);
        w("clear-left", i.clearPos === "left")("clear-right", i.clearPos === "right")("clear-center", i.clearPos === "center"), l(2), B(i.clearBtnLbl)
    }
}

function oc(e, t) {
    if (e & 1 && (u(0, "div", 19), y(1, rc, 3, 7, "div", 22)(2, ac, 3, 7, "div", 23), _()), e & 2) {
        let i = d(2);
        l(), c("ngIf", i.showTodayBtn), l(), c("ngIf", i.showClearBtn)
    }
}

function dc(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 27)(1, "bs-custom-date-view", 28), f("onSelect", function(s) {
            m(i);
            let r = d(2);
            return h(r.setRangeOnCalendar(s))
        }), _()()
    }
    if (e & 2) {
        let i = d(2);
        l(), c("selectedRange", i.chosenRange)("ranges", i.customRanges)("customRangeLabel", i.customRangeBtnLbl)
    }
}

function lc(e, t) {
    if (e & 1) {
        let i = D();
        u(0, "div", 3)(1, "div", 4), f("@datepickerAnimation.done", function() {
            m(i);
            let s = d();
            return h(s.positionServiceEnable())
        }), u(2, "div", 5), x(3, "async"), y(4, Xl, 5, 4, "ng-container", 6)(5, tc, 3, 3, "div", 7)(6, ic, 3, 3, "div", 7), _(), y(7, sc, 5, 0, "div", 8)(8, oc, 3, 2, "div", 8), _(), y(9, dc, 2, 3, "div", 9), _()
    }
    if (e & 2) {
        let i = d();
        c("ngClass", i.containerClass), l(), c("@datepickerAnimation", i.animationState), l(), c("ngSwitch", H(3, 9, i.viewMode)), l(2), c("ngSwitchCase", "day"), l(), c("ngSwitchCase", "month"), l(), c("ngSwitchCase", "year"), l(), c("ngIf", !1), l(), c("ngIf", i.showTodayBtn || i.showClearBtn), l(), c("ngIf", i.customRanges && i.customRanges.length > 0)
    }
}
var fe = (() => {
        let t = class t {
            constructor() {
                this.adaptivePosition = !1, this.useUtc = !1, this.isAnimated = !1, this.startView = "day", this.returnFocusToInput = !1, this.containerClass = "theme-green", this.displayMonths = 1, this.showWeekNumbers = !0, this.dateInputFormat = "L", this.rangeSeparator = " - ", this.rangeInputFormat = "L", this.monthTitle = "MMMM", this.yearTitle = "YYYY", this.dayLabel = "D", this.monthLabel = "MMMM", this.yearLabel = "YYYY", this.weekNumbers = "w", this.showTodayButton = !1, this.showClearButton = !1, this.todayPosition = "center", this.clearPosition = "right", this.todayButtonLabel = "Today", this.clearButtonLabel = "Clear", this.customRangeButtonLabel = "Custom Range", this.withTimepicker = !1, this.allowedPositions = ["top", "bottom"], this.keepDatepickerOpened = !1, this.keepDatesOutOfRules = !1
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275prov = le({
            token: t,
            factory: t.\u0275fac,
            providedIn: "root"
        });
        let e = t;
        return e
    })(),
    vr = "220ms cubic-bezier(0, 0, 0.2, 1)",
    En = es("datepickerAnimation", [Jn("animated-down", Bt({
        height: "*",
        overflow: "hidden"
    })), pn("* => animated-down", [Bt({
        height: 0,
        overflow: "hidden"
    }), hn(vr)]), Jn("animated-up", Bt({
        height: "*",
        overflow: "hidden"
    })), pn("* => animated-up", [Bt({
        height: "*",
        overflow: "hidden"
    }), hn(vr)]), pn("* => unanimated", hn("0s"))]),
    Vn = class {
        constructor() {
            this.containerClass = "", this.customRanges = [], this.chosenRange = [], this._daysCalendarSub = new Ht, this.selectedTimeSub = new Ht
        }
        set minDate(t) {
            this._effects ? .setMinDate(t)
        }
        set maxDate(t) {
            this._effects ? .setMaxDate(t)
        }
        set daysDisabled(t) {
            this._effects ? .setDaysDisabled(t)
        }
        set datesDisabled(t) {
            this._effects ? .setDatesDisabled(t)
        }
        set datesEnabled(t) {
            this._effects ? .setDatesEnabled(t)
        }
        set isDisabled(t) {
            this._effects ? .setDisabled(t)
        }
        set dateCustomClasses(t) {
            this._effects ? .setDateCustomClasses(t)
        }
        set dateTooltipTexts(t) {
            this._effects ? .setDateTooltipTexts(t)
        }
        set daysCalendar$(t) {
            this._daysCalendar$ = t, this._daysCalendarSub.unsubscribe(), this._daysCalendarSub.add(this._daysCalendar$.subscribe(i => {
                this.multipleCalendars = !!i && i.length > 1
            }))
        }
        get daysCalendar$() {
            return this._daysCalendar$
        }
        setViewMode(t) {}
        navigateTo(t) {}
        dayHoverHandler(t) {}
        weekHoverHandler(t) {}
        monthHoverHandler(t) {}
        yearHoverHandler(t) {}
        timeSelectHandler(t, i) {}
        daySelectHandler(t) {}
        monthSelectHandler(t) {}
        yearSelectHandler(t) {}
        setRangeOnCalendar(t) {}
        setToday() {}
        clearDate() {}
        _stopPropagation(t) {
            t.stopPropagation()
        }
    },
    P = (() => {
        let t = class t {
            calculate() {
                return {
                    type: t.CALCULATE
                }
            }
            format() {
                return {
                    type: t.FORMAT
                }
            }
            flag() {
                return {
                    type: t.FLAG
                }
            }
            select(n) {
                return {
                    type: t.SELECT,
                    payload: n
                }
            }
            selectTime(n, s) {
                return {
                    type: t.SELECT_TIME,
                    payload: {
                        date: n,
                        index: s
                    }
                }
            }
            changeViewMode(n) {
                return {
                    type: t.CHANGE_VIEWMODE,
                    payload: n
                }
            }
            navigateTo(n) {
                return {
                    type: t.NAVIGATE_TO,
                    payload: n
                }
            }
            navigateStep(n) {
                return {
                    type: t.NAVIGATE_OFFSET,
                    payload: n
                }
            }
            setOptions(n) {
                return {
                    type: t.SET_OPTIONS,
                    payload: n
                }
            }
            selectRange(n) {
                return {
                    type: t.SELECT_RANGE,
                    payload: n
                }
            }
            hoverDay(n) {
                return {
                    type: t.HOVER,
                    payload: n.isHovered ? n.cell.date : null
                }
            }
            minDate(n) {
                return {
                    type: t.SET_MIN_DATE,
                    payload: n
                }
            }
            maxDate(n) {
                return {
                    type: t.SET_MAX_DATE,
                    payload: n
                }
            }
            daysDisabled(n) {
                return {
                    type: t.SET_DAYSDISABLED,
                    payload: n
                }
            }
            datesDisabled(n) {
                return {
                    type: t.SET_DATESDISABLED,
                    payload: n
                }
            }
            datesEnabled(n) {
                return {
                    type: t.SET_DATESENABLED,
                    payload: n
                }
            }
            isDisabled(n) {
                return {
                    type: t.SET_IS_DISABLED,
                    payload: n
                }
            }
            setDateCustomClasses(n) {
                return {
                    type: t.SET_DATE_CUSTOM_CLASSES,
                    payload: n
                }
            }
            setDateTooltipTexts(n) {
                return {
                    type: t.SET_DATE_TOOLTIP_TEXTS,
                    payload: n
                }
            }
            setLocale(n) {
                return {
                    type: t.SET_LOCALE,
                    payload: n
                }
            }
        };
        t.CALCULATE = "[datepicker] calculate dates matrix", t.FORMAT = "[datepicker] format datepicker values", t.FLAG = "[datepicker] set flags", t.SELECT = "[datepicker] select date", t.NAVIGATE_OFFSET = "[datepicker] shift view date", t.NAVIGATE_TO = "[datepicker] change view date", t.SET_OPTIONS = "[datepicker] update render options", t.HOVER = "[datepicker] hover date", t.CHANGE_VIEWMODE = "[datepicker] switch view mode", t.SET_MIN_DATE = "[datepicker] set min date", t.SET_MAX_DATE = "[datepicker] set max date", t.SET_DAYSDISABLED = "[datepicker] set days disabled", t.SET_DATESDISABLED = "[datepicker] set dates disabled", t.SET_DATESENABLED = "[datepicker] set dates enabled", t.SET_IS_DISABLED = "[datepicker] set is disabled", t.SET_DATE_CUSTOM_CLASSES = "[datepicker] set date custom classes", t.SET_DATE_TOOLTIP_TEXTS = "[datepicker] set date tooltip texts", t.SET_LOCALE = "[datepicker] set datepicker locale", t.SELECT_TIME = "[datepicker] select time", t.SELECT_RANGE = "[daterangepicker] select dates range", t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275prov = le({
            token: t,
            factory: t.\u0275fac,
            providedIn: "platform"
        });
        let e = t;
        return e
    })(),
    Pi = (() => {
        let t = class t {
            constructor() {
                this._defaultLocale = "en", this._locale = new Te(this._defaultLocale), this._localeChange = this._locale.asObservable()
            }
            get locale() {
                return this._locale
            }
            get localeChange() {
                return this._localeChange
            }
            get currentLocale() {
                return this._locale.getValue()
            }
            use(n) {
                n !== this.currentLocale && this._locale.next(n)
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275prov = le({
            token: t,
            factory: t.\u0275fac,
            providedIn: "platform"
        });
        let e = t;
        return e
    })(),
    We = (() => {
        let t = class t {
            constructor(n, s) {
                this._actions = n, this._localeService = s, this._subs = []
            }
            init(n) {
                return this._store = n, this
            }
            setValue(n) {
                this._store ? .dispatch(this._actions.select(n))
            }
            setRangeValue(n) {
                this._store ? .dispatch(this._actions.selectRange(n))
            }
            setMinDate(n) {
                return this._store ? .dispatch(this._actions.minDate(n)), this
            }
            setMaxDate(n) {
                return this._store ? .dispatch(this._actions.maxDate(n)), this
            }
            setDaysDisabled(n) {
                return this._store ? .dispatch(this._actions.daysDisabled(n)), this
            }
            setDatesDisabled(n) {
                return this._store ? .dispatch(this._actions.datesDisabled(n)), this
            }
            setDatesEnabled(n) {
                return this._store ? .dispatch(this._actions.datesEnabled(n)), this
            }
            setDisabled(n) {
                return this._store ? .dispatch(this._actions.isDisabled(n)), this
            }
            setDateCustomClasses(n) {
                return this._store ? .dispatch(this._actions.setDateCustomClasses(n)), this
            }
            setDateTooltipTexts(n) {
                return this._store ? .dispatch(this._actions.setDateTooltipTexts(n)), this
            }
            setOptions(n) {
                let s = Object.assign({
                    locale: this._localeService.currentLocale
                }, n);
                return this._store ? .dispatch(this._actions.setOptions(s)), this
            }
            setBindings(n) {
                return this._store ? (n.selectedTime = this._store.select(s => s.selectedTime).pipe(U(s => !!s)), n.daysCalendar$ = this._store.select(s => s.flaggedMonths).pipe(U(s => !!s)), n.monthsCalendar = this._store.select(s => s.flaggedMonthsCalendar).pipe(U(s => !!s)), n.yearsCalendar = this._store.select(s => s.yearsCalendarFlagged).pipe(U(s => !!s)), n.viewMode = this._store.select(s => s.view ? .mode), n.options$ = Ji([this._store.select(s => s.showWeekNumbers), this._store.select(s => s.displayMonths)]).pipe(Vt(s => ({
                    showWeekNumbers: s[0],
                    displayMonths: s[1]
                }))), this) : this
            }
            setEventHandlers(n) {
                return n.setViewMode = s => {
                    this._store ? .dispatch(this._actions.changeViewMode(s))
                }, n.navigateTo = s => {
                    this._store ? .dispatch(this._actions.navigateStep(s.step))
                }, n.dayHoverHandler = s => {
                    let r = s.cell;
                    r.isOtherMonth || r.isDisabled || (this._store ? .dispatch(this._actions.hoverDay(s)), r.isHovered = s.isHovered)
                }, n.monthHoverHandler = s => {
                    s.cell.isHovered = s.isHovered
                }, n.yearHoverHandler = s => {
                    s.cell.isHovered = s.isHovered
                }, this
            }
            registerDatepickerSideEffects() {
                return this._store ? (this._subs.push(this._store.select(n => n.view).subscribe(() => {
                    this._store ? .dispatch(this._actions.calculate())
                })), this._subs.push(this._store.select(n => n.monthsModel).pipe(U(n => !!n)).subscribe(() => this._store ? .dispatch(this._actions.format()))), this._subs.push(this._store.select(n => n.formattedMonths).pipe(U(n => !!n)).subscribe(() => this._store ? .dispatch(this._actions.flag()))), this._subs.push(this._store.select(n => n.selectedDate).pipe(U(n => !!n)).subscribe(() => this._store ? .dispatch(this._actions.flag()))), this._subs.push(this._store.select(n => n.selectedRange).pipe(U(n => !!n)).subscribe(() => this._store ? .dispatch(this._actions.flag()))), this._subs.push(this._store.select(n => n.monthsCalendar).subscribe(() => this._store ? .dispatch(this._actions.flag()))), this._subs.push(this._store.select(n => n.yearsCalendarModel).pipe(U(n => !!n)).subscribe(() => this._store ? .dispatch(this._actions.flag()))), this._subs.push(this._store.select(n => n.hoveredDate).pipe(U(n => !!n)).subscribe(() => this._store ? .dispatch(this._actions.flag()))), this._subs.push(this._store.select(n => n.dateCustomClasses).pipe(U(n => !!n)).subscribe(() => this._store ? .dispatch(this._actions.flag()))), this._subs.push(this._store.select(n => n.dateTooltipTexts).pipe(U(n => !!n)).subscribe(() => this._store ? .dispatch(this._actions.flag()))), this._subs.push(this._localeService.localeChange.subscribe(n => this._store ? .dispatch(this._actions.setLocale(n)))), this) : this
            }
            destroy() {
                for (let n of this._subs) n.unsubscribe()
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(Nn(P), Nn(Pi))
        }, t.\u0275prov = le({
            token: t,
            factory: t.\u0275fac,
            providedIn: "platform"
        });
        let e = t;
        return e
    })(),
    cc = {
        width: 7,
        height: 6
    },
    _c = 1440 * 60 * 1e3;
var uc = {
        date: new Date,
        mode: "day"
    },
    Lr = Object.assign(new fe, {
        locale: "en",
        view: uc,
        selectedRange: [],
        selectedTime: [],
        monthViewOptions: cc
    });

function mc(e, t) {
    if (js(e, t.firstDayOfWeek)) return e;
    let i = pe(e),
        n = hc(i, t.firstDayOfWeek);
    return W(e, {
        day: -n
    })
}

function hc(e, t) {
    let i = Number(t);
    if (isNaN(i)) return 0;
    if (i === 0) return e;
    let n = e - i % 7;
    return n < 0 ? n + 7 : n
}

function Oi(e, t, i) {
    let n = t && je(nn(e, "month"), t, "day"),
        s = i && Oe(we(e, "month"), i, "day");
    return n || s || !1
}

function rn(e, t, i) {
    let n = t && je(nn(e, "year"), t, "day"),
        s = i && Oe(we(e, "year"), i, "day");
    return n || s || !1
}

function Ri(e, t, i) {
    return !t || !V(t) || !t.length ? !1 : i && i === "year" && !t[0].getDate() ? t.some(n => sn(e, n, "year")) : t.some(n => sn(e, n, "date"))
}

function ji(e, t, i) {
    return !t || !V(t) || !t.length ? !1 : !t.some(n => sn(e, n, i || "date"))
}

function Yr(e, t = 0) {
    let i = e && e.yearsCalendarModel && e.yearsCalendarModel[t];
    return i ? .years[0] && i.years[0][0] && i.years[0][0].date
}

function pc(e, t) {
    return !e || !t || !e.length && !e[0].value || e.forEach(i => (!i || !i.value || i.value instanceof Date || !(i.value instanceof Array && i.value.length) || (i.value = xr(i.value, t)), e)), e
}

function Sr(e, t) {
    return !e || !t || e instanceof Array && !e.length || e instanceof Date ? e : xr(e, t)
}

function xr(e, t) {
    return e instanceof Array ? e.map(n => n && (Oe(n, t, "date") && (n = t), n)) : e
}

function Dr(e) {
    return e && Hr(e)
}

function kr(e) {
    return e ? .length && e.map(t => t && Hr(t)), e
}

function Hr(e) {
    let t = new Date;
    return e.setMilliseconds(t.getMilliseconds()), e.setSeconds(t.getSeconds()), e.setMinutes(t.getMinutes()), e.setHours(t.getHours()), e
}

function Ai(e, t) {
    let i = e.initialDate,
        n = new Array(e.height);
    for (let s = 0; s < e.height; s++) {
        n[s] = new Array(e.width);
        for (let r = 0; r < e.width; r++) n[s][r] = t(i), i = W(i, e.shift)
    }
    return n
}

function Vi(e, t) {
    let i = Rs(e),
        n = mc(i, t),
        s = {
            width: t.width || 0,
            height: t.height || 0,
            initialDate: n,
            shift: {
                day: 1
            }
        };
    return {
        daysMatrix: Ai(s, a => a),
        month: i
    }
}

function fc(e, t, i) {
    return {
        month: e.month,
        monthTitle: X(e.month, t.monthTitle, t.locale),
        yearTitle: X(e.month, t.yearTitle, t.locale),
        weekNumbers: gc(e.daysMatrix, t.weekNumbers, t.locale),
        weekdays: yc(t.locale),
        weeks: e.daysMatrix.map((n, s) => ({
            days: n.map((r, a) => ({
                date: r,
                label: X(r, t.dayLabel, t.locale),
                monthIndex: i,
                weekIndex: s,
                dayIndex: a
            }))
        })),
        hideLeftArrow: !1,
        hideRightArrow: !1,
        disableLeftArrow: !1,
        disableRightArrow: !1
    }
}

function gc(e, t, i) {
    return e.map(n => n[0] ? X(n[0], t, i) : "")
}

function yc(e) {
    let t = N(e),
        i = t.weekdaysShort(),
        n = t.firstDayOfWeek();
    return [...i.slice(n), ...i.slice(0, n)]
}

function bc(e, t) {
    return e.weeks.forEach(i => {
        i.days.forEach((n, s) => {
            let r = !it(n.date, e.month),
                a = !r && Ee(n.date, t.hoveredDate),
                o = !r && t.selectedRange && Ee(n.date, t.selectedRange[0]),
                p = !r && t.selectedRange && Ee(n.date, t.selectedRange[1]),
                v = !r && Ee(n.date, t.selectedDate) || o || p,
                S = !r && t.selectedRange && Mc(n.date, t.selectedRange, t.hoveredDate),
                $ = t.isDisabled || je(n.date, t.minDate, "day") || Oe(n.date, t.maxDate, "day") || ir(n.date, t.daysDisabled) || Ri(n.date, t.datesDisabled) || ji(n.date, t.datesEnabled),
                K = new Date,
                jn = !r && Ee(n.date, K),
                jr = t.dateCustomClasses && t.dateCustomClasses.map(ye => Ee(n.date, ye.date) ? ye.classes : []).reduce((ye, An) => ye.concat(An), []).join(" ") || "",
                Ar = t.dateTooltipTexts && t.dateTooltipTexts.map(ye => Ee(n.date, ye.date) ? ye.tooltipText : "").reduce((ye, An) => (ye.push(An), ye), []).join(" ") || "",
                ge = Object.assign({}, n, {
                    isOtherMonth: r,
                    isHovered: a,
                    isSelected: v,
                    isSelectionStart: o,
                    isSelectionEnd: p,
                    isInRange: S,
                    isDisabled: $,
                    isToday: jn,
                    customClasses: jr,
                    tooltipText: Ar
                });
            (n.isOtherMonth !== ge.isOtherMonth || n.isHovered !== ge.isHovered || n.isSelected !== ge.isSelected || n.isSelectionStart !== ge.isSelectionStart || n.isSelectionEnd !== ge.isSelectionEnd || n.isDisabled !== ge.isDisabled || n.isInRange !== ge.isInRange || n.customClasses !== ge.customClasses || n.tooltipText !== ge.tooltipText) && (i.days[s] = ge)
        })
    }), e.hideLeftArrow = t.isDisabled || !!t.monthIndex && t.monthIndex > 0 && t.monthIndex !== t.displayMonths, e.hideRightArrow = t.isDisabled || (!!t.monthIndex || t.monthIndex === 0) && !!t.displayMonths && t.monthIndex < t.displayMonths && t.monthIndex + 1 !== t.displayMonths, e.disableLeftArrow = Oi(W(e.month, {
        month: -1
    }), t.minDate, t.maxDate), e.disableRightArrow = Oi(W(e.month, {
        month: 1
    }), t.minDate, t.maxDate), e
}

function Mc(e, t, i) {
    return !e || !t || !t[0] ? !1 : t[1] ? e > t[0] && e <= t[1] : i ? e > t[0] && e <= i : !1
}

function wr(e, t) {
    return t ? e >= t : !0
}
var vc = 4,
    Dc = 3,
    kc = {
        month: 1
    };

function Vr(e, t) {
    let i = we(e, "year");
    return {
        months: Ai({
            width: Dc,
            height: vc,
            initialDate: i,
            shift: kc
        }, r => ({
            date: r,
            label: X(r, t.monthLabel, t.locale)
        })),
        monthTitle: "",
        yearTitle: X(e, t.yearTitle, t.locale),
        hideRightArrow: !1,
        hideLeftArrow: !1,
        disableRightArrow: !1,
        disableLeftArrow: !1
    }
}

function wc(e, t) {
    return e.months.forEach((i, n) => {
        i.forEach((s, r) => {
            let a, o = it(s.date, t.hoveredMonth),
                p = t.isDisabled || Ri(s.date, t.datesDisabled) || ji(s.date, t.datesEnabled, "month") || Oi(s.date, t.minDate, t.maxDate);
            !t.selectedDate && t.selectedRange ? (a = it(s.date, t.selectedRange[0]), a || (a = it(s.date, t.selectedRange[1]))) : a = it(s.date, t.selectedDate);
            let v = Object.assign(s, {
                isHovered: o,
                isDisabled: p,
                isSelected: a
            });
            (s.isHovered !== v.isHovered || s.isDisabled !== v.isDisabled || s.isSelected !== v.isSelected) && (e.months[n][r] = v)
        })
    }), e.hideLeftArrow = !!t.monthIndex && t.monthIndex > 0 && t.monthIndex !== t.displayMonths, e.hideRightArrow = (!!t.monthIndex || t.monthIndex === 0) && (!!t.displayMonths || t.displayMonths === 0) && t.monthIndex < t.displayMonths && t.monthIndex + 1 !== t.displayMonths, e.disableLeftArrow = rn(W(e.months[0][0].date, {
        year: -1
    }), t.minDate, t.maxDate), e.disableRightArrow = rn(W(e.months[0][0].date, {
        year: 1
    }), t.minDate, t.maxDate), e
}
var Fi = 4,
    Wi = 4,
    On = Fi * Wi,
    Er = (Math.floor(On / 2) - 1) * -1,
    Tc = {
        year: 1
    };

function Or(e, t, i) {
    let n = Cc(e, i),
        r = Ai({
            width: Wi,
            height: Fi,
            initialDate: n,
            shift: Tc
        }, o => ({
            date: o,
            label: X(o, t.yearLabel, t.locale)
        })),
        a = Lc(r, t);
    return {
        years: r,
        monthTitle: "",
        yearTitle: a,
        hideLeftArrow: !1,
        hideRightArrow: !1,
        disableLeftArrow: !1,
        disableRightArrow: !1
    }
}

function Cc(e, t) {
    return t && e.getFullYear() >= t.getFullYear() && e.getFullYear() < t.getFullYear() + On ? t : W(e, {
        year: Er
    })
}

function Lc(e, t) {
    let i = X(e[0][0].date, t.yearTitle, t.locale),
        n = X(e[Fi - 1][Wi - 1].date, t.yearTitle, t.locale);
    return `${i} - ${n}`
}

function Yc(e, t) {
    e.years.forEach((s, r) => {
        s.forEach((a, o) => {
            let p, v = st(a.date, t.hoveredYear),
                S = t.isDisabled || Ri(a.date, t.datesDisabled, "year") || ji(a.date, t.datesEnabled, "year") || rn(a.date, t.minDate, t.maxDate);
            !t.selectedDate && t.selectedRange ? (p = st(a.date, t.selectedRange[0]), p || (p = st(a.date, t.selectedRange[1]))) : p = st(a.date, t.selectedDate);
            let $ = Object.assign(a, {
                isHovered: v,
                isDisabled: S,
                isSelected: p
            });
            (a.isHovered !== $.isHovered || a.isDisabled !== $.isDisabled || a.isSelected !== $.isSelected) && (e.years[r][o] = $)
        })
    }), e.hideLeftArrow = !!t.yearIndex && t.yearIndex > 0 && t.yearIndex !== t.displayMonths, e.hideRightArrow = !!t.yearIndex && !!t.displayMonths && t.yearIndex < t.displayMonths && t.yearIndex + 1 !== t.displayMonths, e.disableLeftArrow = rn(W(e.years[0][0].date, {
        year: -1
    }), t.minDate, t.maxDate);
    let i = e.years.length - 1,
        n = e.years[i].length - 1;
    return e.disableRightArrow = rn(W(e.years[i][n].date, {
        year: 1
    }), t.minDate, t.maxDate), e
}

function Ii(e, t) {
    !e || !isNaN(e.getTime()) || (e.setHours(t.getHours()), e.setMinutes(t.getMinutes()), e.setSeconds(t.getSeconds()), e.setMilliseconds(t.getMilliseconds()))
}

function Tr(e = Lr, t) {
    switch (t.type) {
        case P.CALCULATE:
            return Sc(e);
        case P.FORMAT:
            return xc(e);
        case P.FLAG:
            return Hc(e);
        case P.NAVIGATE_OFFSET:
            return Vc(e, t);
        case P.NAVIGATE_TO:
            {
                let i = t.payload;
                if (!e.view || !i.unit) return e;
                let n = Bs(e.view.date, i.unit),
                    s, r;
                return wr(i.viewMode, e.minMode) ? (r = i.viewMode, s = {
                    view: {
                        date: n,
                        mode: r
                    }
                }) : (r = e.view.mode, s = {
                    selectedDate: n,
                    view: {
                        date: n,
                        mode: r
                    }
                }),
                Object.assign({}, e, s)
            }
        case P.CHANGE_VIEWMODE:
            {
                if (!wr(t.payload, e.minMode) || !e.view) return e;
                let i = e.view.date,
                    n = t.payload;
                return Object.assign({}, e, {
                    view: {
                        date: i,
                        mode: n
                    }
                })
            }
        case P.HOVER:
            return Object.assign({}, e, {
                hoveredDate: t.payload
            });
        case P.SELECT:
            {
                if (!e.view) return e;
                let i = {
                    selectedDate: t.payload,
                    view: e.view
                };
                if (Array.isArray(e.selectedTime)) {
                    let a = e.selectedTime[0];
                    i.selectedDate && a && Ii(i.selectedDate, a)
                }
                let n = e.view.mode,
                    s = t.payload || e.view.date,
                    r = Ei(s, e.minDate, e.maxDate);
                return i.view = {
                    mode: n,
                    date: r
                },
                Object.assign({}, e, i)
            }
        case P.SELECT_TIME:
            {
                let {
                    date: i,
                    index: n
                } = t.payload,
                s = e.selectedTime ? [...e.selectedTime] : [];
                return s[n] = i,
                Object.assign({}, e, {
                    selectedTime: s
                })
            }
        case P.SET_OPTIONS:
            {
                if (!e.view) return e;
                let i = t.payload,
                    n = i.minMode ? i.minMode : e.view.mode,
                    s = Ve(i.value) && i.value || V(i.value) && Ve(i.value[0]) && i.value[0] || e.view.date,
                    r = Ei(s, i.minDate, i.maxDate);
                return i.view = {
                    mode: n,
                    date: r
                },
                i.value && (V(i.value) && (i.selectedRange = i.value, i.selectedTime = i.value.map(a => a)), i.value instanceof Date && (i.selectedDate = i.value, i.selectedTime = [i.value])),
                Object.assign({}, e, i)
            }
        case P.SELECT_RANGE:
            {
                if (!e.view) return e;
                let i = {
                    selectedRange: t.payload,
                    view: e.view
                };i.selectedRange ? .forEach((a, o) => {
                    if (Array.isArray(e.selectedTime)) {
                        let p = e.selectedTime[o];
                        p && Ii(a, p)
                    }
                });
                let n = e.view.mode,
                    s = t.payload && t.payload[0] || e.view.date,
                    r = Ei(s, e.minDate, e.maxDate);
                return i.view = {
                    mode: n,
                    date: r
                },
                Object.assign({}, e, i)
            }
        case P.SET_MIN_DATE:
            return Object.assign({}, e, {
                minDate: t.payload
            });
        case P.SET_MAX_DATE:
            return Object.assign({}, e, {
                maxDate: t.payload
            });
        case P.SET_IS_DISABLED:
            return Object.assign({}, e, {
                isDisabled: t.payload
            });
        case P.SET_DATE_CUSTOM_CLASSES:
            return Object.assign({}, e, {
                dateCustomClasses: t.payload
            });
        case P.SET_DATE_TOOLTIP_TEXTS:
            return Object.assign({}, e, {
                dateTooltipTexts: t.payload
            });
        default:
            return e
    }
}

function Sc(e) {
    if (!e.view) return e;
    let t;
    e.displayOneMonthRange && Ir(e.view.date, e.minDate, e.maxDate) ? t = 1 : t = e.displayMonths || 1;
    let i = e.view.date;
    if (e.view.mode === "day" && e.monthViewOptions) {
        e.showPreviousMonth && e.selectedRange && e.selectedRange.length === 0 && (i = W(i, {
            month: -1
        })), e.monthViewOptions.firstDayOfWeek = N(e.locale).firstDayOfWeek();
        let n = new Array(t);
        for (let s = 0; s < t; s++) n[s] = Vi(i, e.monthViewOptions), i = W(i, {
            month: 1
        });
        if (e.preventChangeToNextMonth && e.flaggedMonths && e.hoveredDate) {
            let s = Vi(e.view.date, e.monthViewOptions);
            e.flaggedMonths.length && e.flaggedMonths[1].month.getMonth() === s.month.getMonth() && (n = e.flaggedMonths.map(r => e.monthViewOptions ? Vi(r.month, e.monthViewOptions) : null).filter(r => r !== null))
        }
        return Object.assign({}, e, {
            monthsModel: n
        })
    }
    if (e.view.mode === "month") {
        let n = new Array(t);
        for (let s = 0; s < t; s++) n[s] = Vr(i, an(e)), i = W(i, {
            year: 1
        });
        return Object.assign({}, e, {
            monthsCalendar: n
        })
    }
    if (e.view.mode === "year") {
        let n = new Array(t);
        for (let s = 0; s < t; s++) n[s] = Or(i, an(e), e.minMode === "year" ? Yr(e, s) : void 0), i = W(i, {
            year: On
        });
        return Object.assign({}, e, {
            yearsCalendarModel: n
        })
    }
    return e
}

function xc(e) {
    if (!e.view) return e;
    if (e.view.mode === "day" && e.monthsModel) {
        let n = e.monthsModel.map((s, r) => fc(s, an(e), r));
        return Object.assign({}, e, {
            formattedMonths: n
        })
    }
    let t = e.displayMonths || 1,
        i = e.view.date;
    if (e.view.mode === "month") {
        let n = new Array(t);
        for (let s = 0; s < t; s++) n[s] = Vr(i, an(e)), i = W(i, {
            year: 1
        });
        return Object.assign({}, e, {
            monthsCalendar: n
        })
    }
    if (e.view.mode === "year") {
        let n = new Array(t);
        for (let s = 0; s < t; s++) n[s] = Or(i, an(e)), i = W(i, {
            year: 16
        });
        return Object.assign({}, e, {
            yearsCalendarModel: n
        })
    }
    return e
}

function Hc(e) {
    if (!e.view) return e;
    let t = Ir(e.view.date, e.minDate, e.maxDate) ? 1 : e.displayMonths;
    if (e.formattedMonths && e.view.mode === "day") {
        let i = e.formattedMonths.map((n, s) => bc(n, {
            isDisabled: e.isDisabled,
            minDate: e.minDate,
            maxDate: e.maxDate,
            daysDisabled: e.daysDisabled,
            datesDisabled: e.datesDisabled,
            datesEnabled: e.datesEnabled,
            hoveredDate: e.hoveredDate,
            selectedDate: e.selectedDate,
            selectedRange: e.selectedRange,
            displayMonths: t,
            dateCustomClasses: e.dateCustomClasses,
            dateTooltipTexts: e.dateTooltipTexts,
            monthIndex: s
        }));
        return Object.assign({}, e, {
            flaggedMonths: i
        })
    }
    if (e.view.mode === "month" && e.monthsCalendar) {
        let i = e.monthsCalendar.map((n, s) => wc(n, {
            isDisabled: e.isDisabled,
            minDate: e.minDate,
            maxDate: e.maxDate,
            hoveredMonth: e.hoveredMonth,
            selectedDate: e.selectedDate,
            datesDisabled: e.datesDisabled,
            datesEnabled: e.datesEnabled,
            selectedRange: e.selectedRange,
            displayMonths: t,
            monthIndex: s
        }));
        return Object.assign({}, e, {
            flaggedMonthsCalendar: i
        })
    }
    if (e.view.mode === "year" && e.yearsCalendarModel) {
        let i = e.yearsCalendarModel.map((n, s) => Yc(n, {
            isDisabled: e.isDisabled,
            minDate: e.minDate,
            maxDate: e.maxDate,
            hoveredYear: e.hoveredYear,
            selectedDate: e.selectedDate,
            datesDisabled: e.datesDisabled,
            datesEnabled: e.datesEnabled,
            selectedRange: e.selectedRange,
            displayMonths: t,
            yearIndex: s
        }));
        return Object.assign({}, e, {
            yearsCalendarFlagged: i
        })
    }
    return e
}

function Vc(e, t) {
    if (!e.view) return e;
    let i = Ec(e, t);
    if (!i) return e;
    let n = {
        view: {
            mode: e.view.mode,
            date: i
        }
    };
    return Object.assign({}, e, n)
}

function Ec(e, t) {
    if (e.view) {
        if (e.view.mode === "year" && e.minMode === "year") {
            let i = Yr(e, 0);
            if (i) {
                let n = W(i, {
                    year: -Er
                });
                return W(n, t.payload)
            }
        }
        return W(we(e.view.date, "month"), t.payload)
    }
}

function an(e) {
    return {
        locale: e.locale,
        monthTitle: e.monthTitle,
        yearTitle: e.yearTitle,
        dayLabel: e.dayLabel,
        monthLabel: e.monthLabel,
        yearLabel: e.yearLabel,
        weekNumbers: e.weekNumbers
    }
}

function Ei(e, t, i) {
    let n = Array.isArray(e) ? e[0] : e;
    return t && Oe(t, n, "day") ? t : i && je(i, n, "day") ? i : n
}

function Ir(e, t, i) {
    return i && sn(i, e, "day") ? !0 : t && i && t.getMonth() === i.getMonth()
}
var Be = (() => {
        let t = class t extends Tt {
            constructor() {
                let n = new Te({
                        type: "[datepicker] dispatcher init"
                    }),
                    s = new wt(Lr, n, Tr);
                super(n, Tr, s)
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275prov = le({
            token: t,
            factory: t.\u0275fac,
            providedIn: "platform"
        });
        let e = t;
        return e
    })(),
    In = (() => {
        let t = class t {
            constructor() {
                this.onSelect = new I
            }
            selectFromRanges(n) {
                this.onSelect.emit(n)
            }
            compareRanges(n) {
                return JSON.stringify(n ? .value) === JSON.stringify(this.selectedRange)
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-custom-date-view"]
            ],
            inputs: {
                ranges: "ranges",
                selectedRange: "selectedRange",
                customRangeLabel: "customRangeLabel"
            },
            outputs: {
                onSelect: "onSelect"
            },
            decls: 2,
            vars: 1,
            consts: [
                [1, "bs-datepicker-predefined-btns"],
                ["type", "button", "class", "btn", 3, "selected", "click", 4, "ngFor", "ngForOf"],
                ["type", "button", 1, "btn", 3, "click"]
            ],
            template: function(s, r) {
                s & 1 && (u(0, "div", 0), y(1, Fd, 2, 3, "button", 1), _()), s & 2 && (l(), c("ngForOf", r.ranges))
            },
            dependencies: [Le],
            encapsulation: 2,
            changeDetection: 0
        });
        let e = t;
        return e
    })(),
    xt = (function(e) {
        return e[e.UP = 0] = "UP", e[e.DOWN = 1] = "DOWN", e
    })(xt || {}),
    Bi = (() => {
        let t = class t {
            constructor() {
                this.isDisabled = !1, this.onNavigate = new I, this.onViewMode = new I
            }
            navTo(n) {
                this.onNavigate.emit(n ? xt.DOWN : xt.UP)
            }
            view(n) {
                this.isDisabled || this.onViewMode.emit(n)
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-datepicker-navigation-view"]
            ],
            inputs: {
                calendar: "calendar",
                isDisabled: "isDisabled"
            },
            outputs: {
                onNavigate: "onNavigate",
                onViewMode: "onViewMode"
            },
            decls: 12,
            vars: 9,
            consts: [
                ["type", "button", 1, "previous", 3, "click", "disabled"],
                [4, "ngIf"],
                ["type", "button", 1, "current", 3, "click", "disabled"],
                ["type", "button", 1, "next", 3, "click", "disabled"]
            ],
            template: function(s, r) {
                s & 1 && (u(0, "button", 0), f("click", function() {
                    return r.navTo(!0)
                }), u(1, "span"), M(2, "\u2039"), _()(), y(3, Wd, 5, 2, "ng-container", 1), M(4, " \u200B "), u(5, "button", 2), f("click", function() {
                    return r.view("year")
                }), u(6, "span"), M(7), _()(), M(8, " \u200B "), u(9, "button", 3), f("click", function() {
                    return r.navTo(!1)
                }), u(10, "span"), M(11, "\u203A"), _()()), s & 2 && (Gn("visibility", r.calendar.hideLeftArrow ? "hidden" : "visible"), c("disabled", r.calendar.disableLeftArrow), l(3), c("ngIf", r.calendar && r.calendar.monthTitle), l(2), c("disabled", r.isDisabled), l(2), B(r.calendar.yearTitle), l(2), Gn("visibility", r.calendar.hideRightArrow ? "hidden" : "visible"), c("disabled", r.calendar.disableRightArrow))
            },
            dependencies: [ve],
            encapsulation: 2,
            changeDetection: 0
        });
        let e = t;
        return e
    })(),
    Oc = (() => {
        let t = class t {
            constructor() {
                this.ampm = "ok", this.hours = 0, this.minutes = 0
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-timepicker"]
            ],
            decls: 16,
            vars: 3,
            consts: [
                [1, "bs-timepicker-container"],
                [1, "bs-timepicker-controls"],
                ["type", "button", 1, "bs-decrease"],
                ["type", "text", "placeholder", "00", 3, "value"],
                ["type", "button", 1, "bs-increase"],
                ["type", "button", 1, "switch-time-format"],
                ["src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAABSElEQVQYV3XQPUvDUBQG4HNuagtVqc6KgouCv6GIuIntYBLB9hcIQpLStCAIV7DYmpTcRWcXqZio3Vwc/UCc/QEqfgyKGbr0I7nS1EiHeqYzPO/h5SD0jaxUZjmSLCB+OFb+UFINFwASAEAdpu9gaGXVyAHHFQBkHpKHc6a9dzECvADyY9sqlAMsK9W0jzxDXqeytr3mhQckxSji27TJJ5/rPmIpwJJq3HrtduriYOurv1a4i1p5HnhkG9OFymi0ReoO05cGwb+ayv4dysVygjeFmsP05f8wpZQ8fsdvfmuY9zjWSNqUtgYFVnOVReILYoBFzdQI5/GGFzNHhGbeZnopDGU29sZbscgldmC99w35VOATTycIMMcBXIfpSVGzZhA6C8hh00conln6VQ9TGgV32OEAKQC4DrBq7CJwd0ggR7Vq/rPrfgB+C3sGypY5DAAAAABJRU5ErkJggg==", "alt", ""]
            ],
            template: function(s, r) {
                s & 1 && ($e(0, "div", 0)(1, "div", 1)(2, "button", 2), M(3, "-"), Ue(), cn(4, "input", 3), $e(5, "button", 4), M(6, "+"), Ue()(), $e(7, "div", 1)(8, "button", 2), M(9, "-"), Ue(), cn(10, "input", 3), $e(11, "button", 4), M(12, "+"), Ue()(), $e(13, "button", 5), M(14), cn(15, "img", 6), Ue()()), s & 2 && (l(4), Un("value", r.hours), l(6), Un("value", r.minutes), l(4), Ce("", r.ampm, " "))
            },
            encapsulation: 2
        });
        let e = t;
        return e
    })(),
    Ic = (() => {
        let t = class t {};
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-current-date"]
            ],
            inputs: {
                title: "title"
            },
            decls: 3,
            vars: 1,
            consts: [
                [1, "current-timedate"]
            ],
            template: function(s, r) {
                s & 1 && ($e(0, "div", 0)(1, "span"), M(2), Ue()()), s & 2 && (l(2), B(r.title))
            },
            encapsulation: 2
        });
        let e = t;
        return e
    })(),
    Ni = (() => {
        let t = class t {};
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-calendar-layout"]
            ],
            ngContentSelectors: Nd,
            decls: 6,
            vars: 2,
            consts: [
                ["title", "hey there", 4, "ngIf"],
                [1, "bs-datepicker-head"],
                [1, "bs-datepicker-body"],
                [4, "ngIf"],
                ["title", "hey there"]
            ],
            template: function(s, r) {
                s & 1 && (Zi(Bd), y(0, $d, 1, 0, "bs-current-date", 0), u(1, "div", 1), zn(2), _(), u(3, "div", 2), zn(4, 1), _(), y(5, Ud, 1, 0, "bs-timepicker", 3)), s & 2 && (c("ngIf", !1), l(5), c("ngIf", !1))
            },
            dependencies: [ve, Ic, Oc],
            encapsulation: 2
        });
        let e = t;
        return e
    })(),
    Pn = (() => {
        let t = class t {
            constructor() {
                this.onNavigate = new I, this.onViewMode = new I, this.onSelect = new I, this.onHover = new I
            }
            navigateTo(n) {
                let s = xt.DOWN === n ? -1 : 1;
                this.onNavigate.emit({
                    step: {
                        year: s * On
                    }
                })
            }
            viewYear(n) {
                this.onSelect.emit(n)
            }
            hoverYear(n, s) {
                this.onHover.emit({
                    cell: n,
                    isHovered: s
                })
            }
            changeViewMode(n) {
                this.onViewMode.emit(n)
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-years-calendar-view"]
            ],
            inputs: {
                calendar: "calendar"
            },
            outputs: {
                onNavigate: "onNavigate",
                onViewMode: "onViewMode",
                onSelect: "onSelect",
                onHover: "onHover"
            },
            decls: 5,
            vars: 2,
            consts: [
                [3, "onNavigate", "onViewMode", "calendar"],
                ["role", "grid", 1, "years"],
                [4, "ngFor", "ngForOf"],
                ["role", "gridcell", 3, "disabled", "is-highlighted", "click", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"],
                ["role", "gridcell", 3, "click", "mouseenter", "mouseleave"]
            ],
            template: function(s, r) {
                s & 1 && (u(0, "bs-calendar-layout")(1, "bs-datepicker-navigation-view", 0), f("onNavigate", function(o) {
                    return r.navigateTo(o)
                })("onViewMode", function(o) {
                    return r.changeViewMode(o)
                }), _(), u(2, "table", 1)(3, "tbody"), y(4, Gd, 2, 1, "tr", 2), _()()()), s & 2 && (l(), c("calendar", r.calendar), l(3), c("ngForOf", r.calendar == null ? null : r.calendar.years))
            },
            dependencies: [Ni, Bi, Le],
            encapsulation: 2
        });
        let e = t;
        return e
    })(),
    Rn = (() => {
        let t = class t {
            constructor() {
                this.onNavigate = new I, this.onViewMode = new I, this.onSelect = new I, this.onHover = new I
            }
            navigateTo(n) {
                let s = xt.DOWN === n ? -1 : 1;
                this.onNavigate.emit({
                    step: {
                        year: s
                    }
                })
            }
            viewMonth(n) {
                this.onSelect.emit(n)
            }
            hoverMonth(n, s) {
                this.onHover.emit({
                    cell: n,
                    isHovered: s
                })
            }
            changeViewMode(n) {
                this.onViewMode.emit(n)
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-month-calendar-view"]
            ],
            inputs: {
                calendar: "calendar"
            },
            outputs: {
                onNavigate: "onNavigate",
                onViewMode: "onViewMode",
                onSelect: "onSelect",
                onHover: "onHover"
            },
            decls: 5,
            vars: 2,
            consts: [
                [3, "onNavigate", "onViewMode", "calendar"],
                ["role", "grid", 1, "months"],
                [4, "ngFor", "ngForOf"],
                ["role", "gridcell", 3, "disabled", "is-highlighted", "click", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"],
                ["role", "gridcell", 3, "click", "mouseenter", "mouseleave"]
            ],
            template: function(s, r) {
                s & 1 && (u(0, "bs-calendar-layout")(1, "bs-datepicker-navigation-view", 0), f("onNavigate", function(o) {
                    return r.navigateTo(o)
                })("onViewMode", function(o) {
                    return r.changeViewMode(o)
                }), _(), u(2, "table", 1)(3, "tbody"), y(4, Qd, 2, 1, "tr", 2), _()()()), s & 2 && (l(), c("calendar", r.calendar), l(3), c("ngForOf", r.calendar == null ? null : r.calendar.months))
            },
            dependencies: [Ni, Bi, Le],
            encapsulation: 2
        });
        let e = t;
        return e
    })(),
    Pc = (() => {
        let t = class t {
            constructor(n, s, r) {
                this._config = n, this._elRef = s, this._renderer = r, this.day = {
                    date: new Date,
                    label: ""
                }
            }
            ngOnInit() {
                this.day ? .isToday && this._config && this._config.customTodayClass && this._renderer.addClass(this._elRef.nativeElement, this._config.customTodayClass), typeof this.day ? .customClasses == "string" && this.day ? .customClasses.split(" ").filter(n => n).forEach(n => {
                    this._renderer.addClass(this._elRef.nativeElement, n)
                })
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(g(fe), g(be), g(Me))
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["", "bsDatepickerDayDecorator", ""]
            ],
            hostVars: 16,
            hostBindings: function(s, r) {
                s & 2 && w("disabled", r.day.isDisabled)("is-highlighted", r.day.isHovered)("is-other-month", r.day.isOtherMonth)("is-active-other-month", r.day.isOtherMonthHovered)("in-range", r.day.isInRange)("select-start", r.day.isSelectionStart)("select-end", r.day.isSelectionEnd)("selected", r.day.isSelected)
            },
            inputs: {
                day: "day"
            },
            attrs: Kd,
            decls: 1,
            vars: 1,
            template: function(s, r) {
                s & 1 && M(0), s & 2 && B(r.day && r.day.label || "")
            },
            encapsulation: 2,
            changeDetection: 0
        });
        let e = t;
        return e
    })(),
    on = (() => {
        let t = class t {
            constructor(n) {
                this._config = n, this.onNavigate = new I, this.onViewMode = new I, this.onSelect = new I, this.onHover = new I, this.onHoverWeek = new I, this.isiOS = /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, this._config.dateTooltipTexts && this._config.dateTooltipTexts.length > 0 && (this.isShowTooltip = !0)
            }
            navigateTo(n) {
                let s = xt.DOWN === n ? -1 : 1;
                this.onNavigate.emit({
                    step: {
                        month: s
                    }
                })
            }
            changeViewMode(n) {
                this.onViewMode.emit(n)
            }
            selectDay(n) {
                this.onSelect.emit(n)
            }
            selectWeek(n) {
                if (!this._config.selectWeek && !this._config.selectWeekDateRange || n.days.length === 0) return;
                if (this._config.selectWeek && n.days[0] && !n.days[0].isDisabled && this._config.selectFromOtherMonth) {
                    this.onSelect.emit(n.days[0]);
                    return
                }
                let s = n.days.find(r => (this._config.selectFromOtherMonth || !r.isOtherMonth) && !r.isDisabled);
                if (this.onSelect.emit(s), this._config.selectWeekDateRange) {
                    let a = n.days.slice(0).reverse().find(o => (this._config.selectFromOtherMonth || !o.isOtherMonth) && !o.isDisabled);
                    this.onSelect.emit(a)
                }
            }
            weekHoverHandler(n, s) {
                if (!this._config.selectWeek && !this._config.selectWeekDateRange) return;
                n.days.find(a => (this._config.selectFromOtherMonth || !a.isOtherMonth) && !a.isDisabled) && (n.isHovered = s, this.isWeekHovered = s, this.onHoverWeek.emit(n))
            }
            hoverDay(n, s) {
                this._config.selectFromOtherMonth && n.isOtherMonth && (n.isOtherMonthHovered = s), this._config.dateTooltipTexts && (n.tooltipText = "", this._config.dateTooltipTexts.forEach(r => {
                    if (Ee(r.date, n.date)) {
                        n.tooltipText = r.tooltipText;
                        return
                    }
                })), this.onHover.emit({
                    cell: n,
                    isHovered: s
                })
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(g(fe))
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-days-calendar-view"]
            ],
            inputs: {
                calendar: "calendar",
                options: "options",
                isDisabled: "isDisabled"
            },
            outputs: {
                onNavigate: "onNavigate",
                onViewMode: "onViewMode",
                onSelect: "onSelect",
                onHover: "onHover",
                onHoverWeek: "onHoverWeek"
            },
            decls: 9,
            vars: 5,
            consts: [
                [3, "onNavigate", "onViewMode", "calendar", "isDisabled"],
                ["role", "grid", 1, "days", "weeks"],
                [4, "ngIf"],
                ["aria-label", "weekday", 4, "ngFor", "ngForOf"],
                [4, "ngFor", "ngForOf"],
                ["aria-label", "weekday"],
                ["class", "week", 3, "active-week", 4, "ngIf"],
                ["role", "gridcell", 4, "ngFor", "ngForOf"],
                [1, "week"],
                [3, "click", 4, "ngIf"],
                [3, "click", "mouseenter", "mouseleave", 4, "ngIf"],
                [3, "click"],
                [3, "click", "mouseenter", "mouseleave"],
                ["role", "gridcell"],
                ["bsDatepickerDayDecorator", "", 3, "day", "tooltip", "click", "mouseenter", "mouseleave", 4, "ngIf"],
                ["bsDatepickerDayDecorator", "", 3, "day", "click", "mouseenter", "mouseleave", 4, "ngIf"],
                ["bsDatepickerDayDecorator", "", 3, "day", "click", 4, "ngIf"],
                ["bsDatepickerDayDecorator", "", 3, "click", "mouseenter", "mouseleave", "day", "tooltip"],
                ["bsDatepickerDayDecorator", "", 3, "click", "mouseenter", "mouseleave", "day"],
                ["bsDatepickerDayDecorator", "", 3, "click", "day"]
            ],
            template: function(s, r) {
                s & 1 && (u(0, "bs-calendar-layout")(1, "bs-datepicker-navigation-view", 0), f("onNavigate", function(o) {
                    return r.navigateTo(o)
                })("onViewMode", function(o) {
                    return r.changeViewMode(o)
                }), _(), u(2, "table", 1)(3, "thead")(4, "tr"), y(5, Zd, 1, 0, "th", 2)(6, qd, 2, 1, "th", 3), _()(), u(7, "tbody"), y(8, al, 3, 2, "tr", 4), _()()()), s & 2 && (l(), c("calendar", r.calendar)("isDisabled", !!r.isDisabled), l(4), c("ngIf", r.options && r.options.showWeekNumbers), l(), c("ngForOf", r.calendar.weekdays), l(2), c("ngForOf", r.calendar.weeks))
            },
            dependencies: [Ni, Bi, ve, Le, Pc, Kn, ts],
            encapsulation: 2
        });
        let e = t;
        return e
    })(),
    $i = (() => {
        let t = class t extends Vn {
            set value(n) {
                this._effects ? .setValue(n)
            }
            get isDatePickerDisabled() {
                return !!this._config.isDisabled
            }
            get isDatepickerDisabled() {
                return this.isDatePickerDisabled ? "" : null
            }
            get isDatepickerReadonly() {
                return this.isDatePickerDisabled ? "" : null
            }
            constructor(n, s, r, a, o, p, v) {
                super(), this._config = s, this._store = r, this._element = a, this._actions = o, this._positionService = v, this.valueChange = new I, this.animationState = "void", this.isRangePicker = !1, this._subs = [], this._effects = p, n.setStyle(a.nativeElement, "display", "block"), n.setStyle(a.nativeElement, "position", "absolute")
            }
            ngOnInit() {
                this._positionService.setOptions({
                    modifiers: {
                        flip: {
                            enabled: this._config.adaptivePosition
                        },
                        preventOverflow: {
                            enabled: this._config.adaptivePosition
                        }
                    },
                    allowedPositions: this._config.allowedPositions
                }), this._positionService.event$ ? .pipe(Wn(1)).subscribe(() => {
                    if (this._positionService.disable(), this._config.isAnimated) {
                        this.animationState = this.isTopPosition ? "animated-up" : "animated-down";
                        return
                    }
                    this.animationState = "unanimated"
                }), this.isOtherMonthsActive = this._config.selectFromOtherMonth, this.containerClass = this._config.containerClass, this.showTodayBtn = this._config.showTodayButton, this.todayBtnLbl = this._config.todayButtonLabel, this.todayPos = this._config.todayPosition, this.showClearBtn = this._config.showClearButton, this.clearBtnLbl = this._config.clearButtonLabel, this.clearPos = this._config.clearPosition, this.customRangeBtnLbl = this._config.customRangeButtonLabel, this.withTimepicker = this._config.withTimepicker, this._effects ? .init(this._store).setOptions(this._config).setBindings(this).setEventHandlers(this).registerDatepickerSideEffects();
                let n;
                this._subs.push(this._store.select(s => s.selectedDate).subscribe(s => {
                    n = s, this.valueChange.emit(s)
                })), this._subs.push(this._store.select(s => s.selectedTime).subscribe(s => {
                    !s || !s[0] || !(s[0] instanceof Date) || s[0] === n || this.valueChange.emit(s[0])
                })), this._store.dispatch(this._actions.changeViewMode(this._config.startView))
            }
            ngAfterViewInit() {
                this.selectedTimeSub.add(this.selectedTime ? .subscribe(n => {
                    Array.isArray(n) && n.length >= 1 && this.startTimepicker ? .writeValue(n[0])
                })), this.startTimepicker ? .registerOnChange(n => {
                    this.timeSelectHandler(n, 0)
                })
            }
            get isTopPosition() {
                return this._element.nativeElement.classList.contains("top")
            }
            positionServiceEnable() {
                this._positionService.enable()
            }
            timeSelectHandler(n, s) {
                this._store.dispatch(this._actions.selectTime(n, s))
            }
            daySelectHandler(n) {
                !n || (this.isOtherMonthsActive ? n.isDisabled : n.isOtherMonth || n.isDisabled) || this._store.dispatch(this._actions.select(n.date))
            }
            monthSelectHandler(n) {
                !n || n.isDisabled || this._store.dispatch(this._actions.navigateTo({
                    unit: {
                        month: L(n.date),
                        year: j(n.date)
                    },
                    viewMode: "day"
                }))
            }
            yearSelectHandler(n) {
                !n || n.isDisabled || this._store.dispatch(this._actions.navigateTo({
                    unit: {
                        year: j(n.date)
                    },
                    viewMode: "month"
                }))
            }
            setToday() {
                this._store.dispatch(this._actions.select(new Date))
            }
            clearDate() {
                this._store.dispatch(this._actions.select(void 0))
            }
            ngOnDestroy() {
                for (let n of this._subs) n.unsubscribe();
                this.selectedTimeSub.unsubscribe(), this._effects ? .destroy()
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(g(Me), g(fe), g(Be), g(be), g(P), g(We), g(De))
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-datepicker-container"]
            ],
            viewQuery: function(s, r) {
                if (s & 1 && _n(Cr, 5), s & 2) {
                    let a;
                    un(a = mn()) && (r.startTimepicker = a.first)
                }
            },
            hostAttrs: ["role", "dialog", "aria-label", "calendar", 1, "bottom"],
            hostVars: 2,
            hostBindings: function(s, r) {
                s & 1 && f("click", function(o) {
                    return r._stopPropagation(o)
                }), s & 2 && ce("disabled", r.isDatepickerDisabled)("readonly", r.isDatepickerReadonly)
            },
            features: [_e([Be, We, P, De]), Pt],
            decls: 2,
            vars: 3,
            consts: [
                ["startTP", ""],
                ["endTP", ""],
                ["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"],
                [1, "bs-datepicker", 3, "ngClass"],
                [1, "bs-datepicker-container"],
                ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"],
                [4, "ngSwitchCase"],
                ["class", "bs-media-container", 4, "ngSwitchCase"],
                ["class", "bs-datepicker-buttons", 4, "ngIf"],
                ["class", "bs-datepicker-custom-range", 4, "ngIf"],
                [1, "bs-media-container"],
                [3, "bs-datepicker-multiple", "calendar", "isDisabled", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"],
                ["class", "bs-timepicker-in-datepicker-container", 4, "ngIf"],
                [3, "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", "calendar", "isDisabled", "options"],
                [1, "bs-timepicker-in-datepicker-container"],
                [3, "disabled"],
                [3, "disabled", 4, "ngIf"],
                [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"],
                [3, "onNavigate", "onViewMode", "onHover", "onSelect", "calendar"],
                [1, "bs-datepicker-buttons"],
                ["type", "button", 1, "btn", "btn-success"],
                ["type", "button", 1, "btn", "btn-default"],
                ["class", "btn-today-wrapper", 3, "today-left", "today-right", "today-center", 4, "ngIf"],
                ["class", "btn-clear-wrapper", 3, "clear-left", "clear-right", "clear-center", 4, "ngIf"],
                [1, "btn-today-wrapper"],
                [1, "btn", "btn-success", 3, "click"],
                [1, "btn-clear-wrapper"],
                [1, "bs-datepicker-custom-range"],
                [3, "onSelect", "selectedRange", "ranges", "customRangeLabel"]
            ],
            template: function(s, r) {
                s & 1 && (y(0, Ml, 10, 11, "div", 2), x(1, "async")), s & 2 && c("ngIf", H(1, 1, r.viewMode))
            },
            dependencies: [ve, jt, At, Ft, Le, on, Yt, Lt, Rn, Pn, In, Wt],
            encapsulation: 2,
            data: {
                animation: [En]
            }
        });
        let e = t;
        return e
    })(),
    St, Rc = (() => {
        let t = class t {
            get readonlyValue() {
                return this.isDisabled ? "" : null
            }
            constructor(n, s, r, a, o) {
                this._config = n, this._elementRef = s, this._renderer = r, this.placement = "bottom", this.triggers = "click", this.outsideClick = !0, this.container = "body", this.outsideEsc = !0, this.isDestroy$ = new rt, this.isDisabled = !1, this.bsValueChange = new I, this._subs = [], this._dateInputFormat$ = new rt, Object.assign(this, this._config), this._datepicker = o.createLoader(s, a, r), this.onShown = this._datepicker.onShown, this.onHidden = this._datepicker.onHidden, this.isOpen$ = new Te(this.isOpen)
            }
            get isOpen() {
                return this._datepicker.isShown
            }
            set isOpen(n) {
                this.isOpen$.next(n)
            }
            set bsValue(n) {
                this._bsValue && n && this._bsValue.getTime() === n.getTime() || (!this._bsValue && n && !this._config.withTimepicker && Ii(n, new Date), n && this.bsConfig ? .initCurrentTime && (n = Dr(n)), this.initPreviousValue(), this._bsValue = n, this.bsValueChange.emit(n))
            }
            get dateInputFormat$() {
                return this._dateInputFormat$
            }
            ngOnInit() {
                this._datepicker.listen({
                    outsideClick: this.outsideClick,
                    outsideEsc: this.outsideEsc,
                    triggers: this.triggers,
                    show: () => this.show()
                }), this.setConfig(), this.initPreviousValue()
            }
            initPreviousValue() {
                St = this._bsValue
            }
            ngOnChanges(n) {
                n.bsConfig && (n.bsConfig.currentValue ? .initCurrentTime && n.bsConfig.currentValue ? .initCurrentTime !== n.bsConfig.previousValue ? .initCurrentTime && this._bsValue && (this.initPreviousValue(), this._bsValue = Dr(this._bsValue), this.bsValueChange.emit(this._bsValue)), this.setConfig(), this._dateInputFormat$.next(this.bsConfig && this.bsConfig.dateInputFormat)), !(!this._datepickerRef || !this._datepickerRef.instance) && (n.minDate && (this._datepickerRef.instance.minDate = this.minDate), n.maxDate && (this._datepickerRef.instance.maxDate = this.maxDate), n.daysDisabled && (this._datepickerRef.instance.daysDisabled = this.daysDisabled), n.datesDisabled && (this._datepickerRef.instance.datesDisabled = this.datesDisabled), n.datesEnabled && (this._datepickerRef.instance.datesEnabled = this.datesEnabled), n.isDisabled && (this._datepickerRef.instance.isDisabled = this.isDisabled), n.dateCustomClasses && (this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses), n.dateTooltipTexts && (this._datepickerRef.instance.dateTooltipTexts = this.dateTooltipTexts))
            }
            initSubscribes() {
                this._subs.push(this.bsValueChange.subscribe(n => {
                    this._datepickerRef && (this._datepickerRef.instance.value = n)
                })), this._datepickerRef && this._subs.push(this._datepickerRef.instance.valueChange.subscribe(n => {
                    this.initPreviousValue(), this.bsValue = n, !this.keepDatepickerModalOpened() && this.hide()
                }))
            }
            keepDatepickerModalOpened() {
                return !St || !this.bsConfig ? .keepDatepickerOpened || !this._config.withTimepicker ? !1 : this.isDateSame()
            }
            isDateSame() {
                return St instanceof Date && this._bsValue ? .getDate() === St ? .getDate() && this._bsValue ? .getMonth() === St ? .getMonth() && this._bsValue ? .getFullYear() === St ? .getFullYear()
            }
            ngAfterViewInit() {
                this.isOpen$.pipe(U(n => n !== this.isOpen), Bn(this.isDestroy$)).subscribe(() => this.toggle())
            }
            show() {
                this._datepicker.isShown || (this.setConfig(), this._datepickerRef = this._datepicker.provide({
                    provide: fe,
                    useValue: this._config
                }).attach($i).to(this.container).position({
                    attachment: this.placement
                }).show({
                    placement: this.placement
                }), this.initSubscribes())
            }
            hide() {
                this.isOpen && this._datepicker.hide();
                for (let n of this._subs) n.unsubscribe();
                this._config.returnFocusToInput && this._renderer.selectRootElement(this._elementRef.nativeElement).focus()
            }
            toggle() {
                if (this.isOpen) return this.hide();
                this.show()
            }
            setConfig() {
                this._config = Object.assign({}, this._config, this.bsConfig, {
                    value: this._config.keepDatesOutOfRules ? this._bsValue : Sr(this._bsValue, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
                    isDisabled: this.isDisabled,
                    minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
                    maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
                    daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
                    dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
                    dateTooltipTexts: this.dateTooltipTexts || this.bsConfig && this.bsConfig.dateTooltipTexts,
                    datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
                    datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
                    minMode: this.minMode || this.bsConfig && this.bsConfig.minMode,
                    initCurrentTime: this.bsConfig ? .initCurrentTime,
                    keepDatepickerOpened: this.bsConfig ? .keepDatepickerOpened,
                    keepDatesOutOfRules: this.bsConfig ? .keepDatesOutOfRules
                })
            }
            unsubscribeSubscriptions() {
                this._subs ? .length && (this._subs.map(n => n.unsubscribe()), this._subs.length = 0)
            }
            ngOnDestroy() {
                this._datepicker.dispose(), this.isOpen$.next(!1), this.isDestroy$ && (this.isDestroy$.next(null), this.isDestroy$.complete()), this.unsubscribeSubscriptions()
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(g(fe), g(be), g(Me), g($n), g(dt))
        }, t.\u0275dir = It({
            type: t,
            selectors: [
                ["", "bsDatepicker", ""]
            ],
            hostVars: 1,
            hostBindings: function(s, r) {
                s & 2 && ce("readonly", r.readonlyValue)
            },
            inputs: {
                placement: "placement",
                triggers: "triggers",
                outsideClick: "outsideClick",
                container: "container",
                outsideEsc: "outsideEsc",
                isDisabled: "isDisabled",
                minDate: "minDate",
                maxDate: "maxDate",
                ignoreMinMaxErrors: "ignoreMinMaxErrors",
                minMode: "minMode",
                daysDisabled: "daysDisabled",
                datesDisabled: "datesDisabled",
                datesEnabled: "datesEnabled",
                dateCustomClasses: "dateCustomClasses",
                dateTooltipTexts: "dateTooltipTexts",
                isOpen: "isOpen",
                bsValue: "bsValue",
                bsConfig: "bsConfig"
            },
            outputs: {
                onShown: "onShown",
                onHidden: "onHidden",
                bsValueChange: "bsValueChange"
            },
            exportAs: ["bsDatepicker"],
            features: [_e([dt]), Ot]
        });
        let e = t;
        return e
    })();
var jc = (() => {
    let t = class t extends $i {
        get disabledValue() {
            return this.isDatePickerDisabled ? "" : null
        }
        get readonlyValue() {
            return this.isDatePickerDisabled ? "" : null
        }
        constructor(n, s, r, a, o, p, v) {
            super(n, s, r, a, o, p, v), n.setStyle(a.nativeElement, "display", "inline-block"), n.setStyle(a.nativeElement, "position", "static")
        }
    };
    t.\u0275fac = function(s) {
        return new(s || t)(g(Me), g(fe), g(Be), g(be), g(P), g(We), g(De))
    }, t.\u0275cmp = z({
        type: t,
        selectors: [
            ["bs-datepicker-inline-container"]
        ],
        hostVars: 2,
        hostBindings: function(s, r) {
            s & 1 && f("click", function(o) {
                return r._stopPropagation(o)
            }), s & 2 && ce("disabled", r.disabledValue)("readonly", r.readonlyValue)
        },
        features: [_e([Be, We, De]), Pt],
        decls: 2,
        vars: 3,
        consts: [
            ["startTP", ""],
            ["endTP", ""],
            ["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"],
            [1, "bs-datepicker", 3, "ngClass"],
            [1, "bs-datepicker-container"],
            ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"],
            [4, "ngSwitchCase"],
            ["class", "bs-media-container", 4, "ngSwitchCase"],
            ["class", "bs-datepicker-buttons", 4, "ngIf"],
            ["class", "bs-datepicker-custom-range", 4, "ngIf"],
            [1, "bs-media-container"],
            [3, "bs-datepicker-multiple", "calendar", "isDisabled", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"],
            ["class", "bs-timepicker-in-datepicker-container", 4, "ngIf"],
            [3, "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", "calendar", "isDisabled", "options"],
            [1, "bs-timepicker-in-datepicker-container"],
            [3, "disabled"],
            [3, "disabled", 4, "ngIf"],
            [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"],
            [3, "onNavigate", "onViewMode", "onHover", "onSelect", "calendar"],
            [1, "bs-datepicker-buttons"],
            ["type", "button", 1, "btn", "btn-success"],
            ["type", "button", 1, "btn", "btn-default"],
            ["class", "btn-today-wrapper", 3, "today-left", "today-right", "today-center", 4, "ngIf"],
            ["class", "btn-clear-wrapper", 3, "clear-left", "clear-right", "clear-center", 4, "ngIf"],
            [1, "btn-today-wrapper"],
            [1, "btn", "btn-success", 3, "click"],
            [1, "btn-clear-wrapper"],
            [1, "bs-datepicker-custom-range"],
            [3, "onSelect", "selectedRange", "ranges", "customRangeLabel"]
        ],
        template: function(s, r) {
            s & 1 && (y(0, Ol, 10, 11, "div", 2), x(1, "async")), s & 2 && c("ngIf", H(1, 1, r.viewMode))
        },
        dependencies: [ve, jt, At, Ft, Le, on, Yt, Lt, Rn, Pn, In, Wt],
        encapsulation: 2,
        data: {
            animation: [En]
        }
    });
    let e = t;
    return e
})();
var Ui = (() => {
        let t = class t extends Vn {
            set value(n) {
                this._effects ? .setRangeValue(n)
            }
            get isDatePickerDisabled() {
                return !!this._config.isDisabled
            }
            get isDatepickerDisabled() {
                return this.isDatePickerDisabled ? "" : null
            }
            get isDatepickerReadonly() {
                return this.isDatePickerDisabled ? "" : null
            }
            constructor(n, s, r, a, o, p, v) {
                super(), this._config = s, this._store = r, this._element = a, this._actions = o, this._positionService = v, this.valueChange = new I, this.animationState = "void", this._rangeStack = [], this.chosenRange = [], this._subs = [], this.isRangePicker = !0, this._effects = p, this.customRanges = this._config.ranges || [], this.customRangeBtnLbl = this._config.customRangeButtonLabel, n.setStyle(a.nativeElement, "display", "block"), n.setStyle(a.nativeElement, "position", "absolute")
            }
            ngOnInit() {
                this._positionService.setOptions({
                    modifiers: {
                        flip: {
                            enabled: this._config.adaptivePosition
                        },
                        preventOverflow: {
                            enabled: this._config.adaptivePosition
                        }
                    },
                    allowedPositions: this._config.allowedPositions
                }), this._positionService.event$ ? .pipe(Wn(1)).subscribe(() => {
                    if (this._positionService.disable(), this._config.isAnimated) {
                        this.animationState = this.isTopPosition ? "animated-up" : "animated-down";
                        return
                    }
                    this.animationState = "unanimated"
                }), this.containerClass = this._config.containerClass, this.isOtherMonthsActive = this._config.selectFromOtherMonth, this.withTimepicker = this._config.withTimepicker, this._effects ? .init(this._store).setOptions(this._config).setBindings(this).setEventHandlers(this).registerDatepickerSideEffects();
                let n;
                this._subs.push(this._store.select(s => s.selectedRange).subscribe(s => {
                    n = s, this.valueChange.emit(s), this.chosenRange = s || []
                })), this._subs.push(this._store.select(s => s.selectedTime).subscribe(s => {
                    !s || !s[0] || !s[1] || !(s[0] instanceof Date) || !(s[1] instanceof Date) || n && s[0] === n[0] && s[1] === n[1] || (this.valueChange.emit(s), this.chosenRange = s || [])
                }))
            }
            ngAfterViewInit() {
                this.selectedTimeSub.add(this.selectedTime ? .subscribe(n => {
                    Array.isArray(n) && n.length >= 2 && (this.startTimepicker ? .writeValue(n[0]), this.endTimepicker ? .writeValue(n[1]))
                })), this.startTimepicker ? .registerOnChange(n => {
                    this.timeSelectHandler(n, 0)
                }), this.endTimepicker ? .registerOnChange(n => {
                    this.timeSelectHandler(n, 1)
                })
            }
            get isTopPosition() {
                return this._element.nativeElement.classList.contains("top")
            }
            positionServiceEnable() {
                this._positionService.enable()
            }
            timeSelectHandler(n, s) {
                this._store.dispatch(this._actions.selectTime(n, s))
            }
            daySelectHandler(n) {
                !n || (this.isOtherMonthsActive ? n.isDisabled : n.isOtherMonth || n.isDisabled) || this.rangesProcessing(n)
            }
            monthSelectHandler(n) {
                if (!(!n || n.isDisabled)) {
                    if (n.isSelected = !0, this._config.minMode !== "month") {
                        if (n.isDisabled) return;
                        this._store.dispatch(this._actions.navigateTo({
                            unit: {
                                month: L(n.date),
                                year: j(n.date)
                            },
                            viewMode: "day"
                        }));
                        return
                    }
                    this.rangesProcessing(n)
                }
            }
            yearSelectHandler(n) {
                if (!(!n || n.isDisabled)) {
                    if (n.isSelected = !0, this._config.minMode !== "year") {
                        if (n.isDisabled) return;
                        this._store.dispatch(this._actions.navigateTo({
                            unit: {
                                year: j(n.date)
                            },
                            viewMode: "month"
                        }));
                        return
                    }
                    this.rangesProcessing(n)
                }
            }
            rangesProcessing(n) {
                this._rangeStack.length === 1 && (this._rangeStack = n.date >= this._rangeStack[0] ? [this._rangeStack[0], n.date] : [n.date]), this._config.maxDateRange && this.setMaxDateRangeOnCalendar(n.date), this._rangeStack.length === 0 && (this._rangeStack = [n.date], this._config.maxDateRange && this.setMaxDateRangeOnCalendar(n.date)), this._store.dispatch(this._actions.selectRange(this._rangeStack)), this._rangeStack.length === 2 && (this._rangeStack = [])
            }
            ngOnDestroy() {
                for (let n of this._subs) n.unsubscribe();
                this.selectedTimeSub.unsubscribe(), this._effects ? .destroy()
            }
            setRangeOnCalendar(n) {
                n && (this._rangeStack = n.value instanceof Date ? [n.value] : n.value), this._store.dispatch(this._actions.selectRange(this._rangeStack))
            }
            setMaxDateRangeOnCalendar(n) {
                let s = new Date(n);
                if (this._config.maxDate) {
                    let r = this._config.maxDate.getTime(),
                        a = n.getTime() + (this._config.maxDateRange || 0) * _c;
                    s = a > r ? new Date(this._config.maxDate) : new Date(a)
                } else s.setDate(n.getDate() + (this._config.maxDateRange || 0));
                this._effects ? .setMaxDate(s)
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(g(Me), g(fe), g(Be), g(be), g(P), g(We), g(De))
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-daterangepicker-container"]
            ],
            viewQuery: function(s, r) {
                if (s & 1 && (_n(Cr, 5), _n(Il, 5)), s & 2) {
                    let a;
                    un(a = mn()) && (r.startTimepicker = a.first), un(a = mn()) && (r.endTimepicker = a.first)
                }
            },
            hostAttrs: ["role", "dialog", "aria-label", "calendar", 1, "bottom"],
            hostVars: 2,
            hostBindings: function(s, r) {
                s & 1 && f("click", function(o) {
                    return r._stopPropagation(o)
                }), s & 2 && ce("disabled", r.isDatepickerDisabled)("readonly", r.isDatepickerReadonly)
            },
            features: [_e([Be, We, P, De]), Pt],
            decls: 2,
            vars: 3,
            consts: [
                ["startTP", ""],
                ["endTP", ""],
                ["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"],
                [1, "bs-datepicker", 3, "ngClass"],
                [1, "bs-datepicker-container"],
                ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"],
                [4, "ngSwitchCase"],
                ["class", "bs-media-container", 4, "ngSwitchCase"],
                ["class", "bs-datepicker-buttons", 4, "ngIf"],
                ["class", "bs-datepicker-custom-range", 4, "ngIf"],
                [1, "bs-media-container"],
                [3, "bs-datepicker-multiple", "calendar", "isDisabled", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"],
                ["class", "bs-timepicker-in-datepicker-container", 4, "ngIf"],
                [3, "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", "calendar", "isDisabled", "options"],
                [1, "bs-timepicker-in-datepicker-container"],
                [3, "disabled"],
                [3, "disabled", 4, "ngIf"],
                [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"],
                [3, "onNavigate", "onViewMode", "onHover", "onSelect", "calendar"],
                [1, "bs-datepicker-buttons"],
                ["type", "button", 1, "btn", "btn-success"],
                ["type", "button", 1, "btn", "btn-default"],
                ["class", "btn-today-wrapper", 3, "today-left", "today-right", "today-center", 4, "ngIf"],
                ["class", "btn-clear-wrapper", 3, "clear-left", "clear-right", "clear-center", 4, "ngIf"],
                [1, "btn-today-wrapper"],
                [1, "btn", "btn-success", 3, "click"],
                [1, "btn-clear-wrapper"],
                [1, "bs-datepicker-custom-range"],
                [3, "onSelect", "selectedRange", "ranges", "customRangeLabel"]
            ],
            template: function(s, r) {
                s & 1 && (y(0, Ql, 10, 11, "div", 2), x(1, "async")), s & 2 && c("ngIf", H(1, 1, r.viewMode))
            },
            dependencies: [ve, jt, At, Ft, Le, on, Yt, Lt, Rn, Pn, In, Wt],
            encapsulation: 2,
            data: {
                animation: [En]
            }
        });
        let e = t;
        return e
    })(),
    Ac = (() => {
        let t = class t extends Ui {
            get disabledValue() {
                return this.isDatePickerDisabled ? "" : null
            }
            get readonlyValue() {
                return this.isDatePickerDisabled ? "" : null
            }
            constructor(n, s, r, a, o, p, v) {
                super(n, s, r, a, o, p, v), n.setStyle(a.nativeElement, "display", "inline-block"), n.setStyle(a.nativeElement, "position", "static")
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(g(Me), g(fe), g(Be), g(be), g(P), g(We), g(De))
        }, t.\u0275cmp = z({
            type: t,
            selectors: [
                ["bs-daterangepicker-inline-container"]
            ],
            hostVars: 2,
            hostBindings: function(s, r) {
                s & 1 && f("click", function(o) {
                    return r._stopPropagation(o)
                }), s & 2 && ce("disabled", r.disabledValue)("readonly", r.readonlyValue)
            },
            features: [_e([Be, We, P, De]), Pt],
            decls: 2,
            vars: 3,
            consts: [
                ["startTP", ""],
                ["endTP", ""],
                ["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"],
                [1, "bs-datepicker", 3, "ngClass"],
                [1, "bs-datepicker-container"],
                ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"],
                [4, "ngSwitchCase"],
                ["class", "bs-media-container", 4, "ngSwitchCase"],
                ["class", "bs-datepicker-buttons", 4, "ngIf"],
                ["class", "bs-datepicker-custom-range", 4, "ngIf"],
                [1, "bs-media-container"],
                [3, "bs-datepicker-multiple", "calendar", "isDisabled", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"],
                ["class", "bs-timepicker-in-datepicker-container", 4, "ngIf"],
                [3, "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", "calendar", "isDisabled", "options"],
                [1, "bs-timepicker-in-datepicker-container"],
                [3, "disabled"],
                [3, "disabled", 4, "ngIf"],
                [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"],
                [3, "onNavigate", "onViewMode", "onHover", "onSelect", "calendar"],
                [1, "bs-datepicker-buttons"],
                ["type", "button", 1, "btn", "btn-success"],
                ["type", "button", 1, "btn", "btn-default"],
                ["class", "btn-today-wrapper", 3, "today-left", "today-right", "today-center", 4, "ngIf"],
                ["class", "btn-clear-wrapper", 3, "clear-left", "clear-right", "clear-center", 4, "ngIf"],
                [1, "btn-today-wrapper"],
                [1, "btn", "btn-success", 3, "click"],
                [1, "btn-clear-wrapper"],
                [1, "bs-datepicker-custom-range"],
                [3, "onSelect", "selectedRange", "ranges", "customRangeLabel"]
            ],
            template: function(s, r) {
                s & 1 && (y(0, lc, 10, 11, "div", 2), x(1, "async")), s & 2 && c("ngIf", H(1, 1, r.viewMode))
            },
            dependencies: [ve, jt, At, Ft, Le, on, Yt, Lt, Rn, Pn, In, Wt],
            encapsulation: 2,
            data: {
                animation: [En]
            }
        });
        let e = t;
        return e
    })();
var Fc = {
        provide: Nt,
        useExisting: Ne(() => Pr),
        multi: !0
    },
    Wc = {
        provide: Qn,
        useExisting: Ne(() => Pr),
        multi: !0
    },
    Pr = (() => {
        let t = class t {
            constructor(n, s, r, a, o) {
                this._picker = n, this._localeService = s, this._renderer = r, this._elRef = a, this.changeDetection = o, this._onChange = Function.prototype, this._onTouched = Function.prototype, this._validatorChange = Function.prototype, this._subs = new Ht
            }
            onChange(n) {
                this.writeValue(n.target.value), this._onChange(this._value), this._picker._config.returnFocusToInput && this._renderer.selectRootElement(this._elRef.nativeElement).focus(), this._onTouched()
            }
            onBlur() {
                this._onTouched()
            }
            hide() {
                this._picker.hide(), this._renderer.selectRootElement(this._elRef.nativeElement).blur(), this._picker._config.returnFocusToInput && this._renderer.selectRootElement(this._elRef.nativeElement).focus()
            }
            ngOnInit() {
                let n = s => {
                    this._setInputValue(s), this._value !== s && (this._value = s, this._onChange(s), this._onTouched()), this.changeDetection.markForCheck()
                };
                this._picker._bsValue && n(this._picker._bsValue), this._subs.add(this._picker.bsValueChange.subscribe(n)), this._subs.add(this._localeService.localeChange.subscribe(() => {
                    this._setInputValue(this._value)
                })), this._subs.add(this._picker.dateInputFormat$.pipe(Et()).subscribe(() => {
                    this._setInputValue(this._value)
                }))
            }
            ngOnDestroy() {
                this._subs.unsubscribe()
            }
            _setInputValue(n) {
                let s = n ? X(n, this._picker._config.dateInputFormat, this._localeService.currentLocale) : "";
                this._renderer.setProperty(this._elRef.nativeElement, "value", s)
            }
            validate(n) {
                let s = n.value;
                if (s == null || s === "") return null;
                if (tn(s)) {
                    if (!Ve(s)) return {
                        bsDate: {
                            invalid: s
                        }
                    };
                    if (this._picker && this._picker.minDate && je(s, this._picker.minDate, "date")) return this.writeValue(this._picker.minDate), this._picker.ignoreMinMaxErrors ? null : {
                        bsDate: {
                            minDate: this._picker.minDate
                        }
                    };
                    if (this._picker && this._picker.maxDate && Oe(s, this._picker.maxDate, "date")) return this.writeValue(this._picker.maxDate), this._picker.ignoreMinMaxErrors ? null : {
                        bsDate: {
                            maxDate: this._picker.maxDate
                        }
                    }
                }
                return null
            }
            registerOnValidatorChange(n) {
                this._validatorChange = n
            }
            writeValue(n) {
                if (!n) this._value = void 0;
                else {
                    let s = this._localeService.currentLocale;
                    if (!N(s)) throw new Error(`Locale "${s}" is not defined, please add it with "defineLocale(...)"`);
                    if (this._value = Dt(n, this._picker._config.dateInputFormat, this._localeService.currentLocale), this._picker._config.useUtc) {
                        let a = Li(this._value);
                        this._value = a === null ? void 0 : a
                    }
                }
                this._picker.bsValue = this._value
            }
            setDisabledState(n) {
                if (this._picker.isDisabled = n, n) {
                    this._renderer.setAttribute(this._elRef.nativeElement, "disabled", "disabled");
                    return
                }
                this._renderer.removeAttribute(this._elRef.nativeElement, "disabled")
            }
            registerOnChange(n) {
                this._onChange = n
            }
            registerOnTouched(n) {
                this._onTouched = n
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(g(Rc, 1), g(Pi), g(Me), g(be), g(Rt))
        }, t.\u0275dir = It({
            type: t,
            selectors: [
                ["input", "bsDatepicker", ""]
            ],
            hostBindings: function(s, r) {
                s & 1 && f("change", function(o) {
                    return r.onChange(o)
                })("blur", function() {
                    return r.onBlur()
                })("keyup.esc", function() {
                    return r.hide()
                })("keydown.enter", function() {
                    return r.hide()
                })
            },
            features: [_e([Fc, Wc])]
        });
        let e = t;
        return e
    })(),
    Bc = (() => {
        let t = class t extends fe {
            constructor() {
                super(...arguments), this.displayMonths = 2
            }
        };
        t.\u0275fac = (() => {
            let n;
            return function(r) {
                return (n || (n = Ki(t)))(r || t)
            }
        })(), t.\u0275prov = le({
            token: t,
            factory: t.\u0275fac,
            providedIn: "root"
        });
        let e = t;
        return e
    })(),
    Fe, Nc = (() => {
        let t = class t {
            get isOpen() {
                return this._datepicker.isShown
            }
            set isOpen(n) {
                this.isOpen$.next(n)
            }
            set bsValue(n) {
                this._bsValue !== n && (n && this.bsConfig ? .initCurrentTime && (n = kr(n)), this.initPreviousValue(), this._bsValue = n, this.bsValueChange.emit(n))
            }
            get isDatepickerReadonly() {
                return this.isDisabled ? "" : null
            }
            get rangeInputFormat$() {
                return this._rangeInputFormat$
            }
            constructor(n, s, r, a, o) {
                this._config = n, this._elementRef = s, this._renderer = r, this.placement = "bottom", this.triggers = "click", this.outsideClick = !0, this.container = "body", this.outsideEsc = !0, this.isDestroy$ = new rt, this.isDisabled = !1, this.bsValueChange = new I, this._subs = [], this._rangeInputFormat$ = new rt, this._datepicker = o.createLoader(s, a, r), Object.assign(this, n), this.onShown = this._datepicker.onShown, this.onHidden = this._datepicker.onHidden, this.isOpen$ = new Te(this.isOpen)
            }
            ngOnInit() {
                this.isDestroy$ = new rt, this._datepicker.listen({
                    outsideClick: this.outsideClick,
                    outsideEsc: this.outsideEsc,
                    triggers: this.triggers,
                    show: () => this.show()
                }), this.initPreviousValue(), this.setConfig()
            }
            ngOnChanges(n) {
                n.bsConfig && (n.bsConfig.currentValue ? .initCurrentTime && n.bsConfig.currentValue ? .initCurrentTime !== n.bsConfig.previousValue ? .initCurrentTime && this._bsValue && (this.initPreviousValue(), this._bsValue = kr(this._bsValue), this.bsValueChange.emit(this._bsValue)), this.setConfig(), this._rangeInputFormat$.next(n.bsConfig.currentValue && n.bsConfig.currentValue.rangeInputFormat)), !(!this._datepickerRef || !this._datepickerRef.instance) && (n.minDate && (this._datepickerRef.instance.minDate = this.minDate), n.maxDate && (this._datepickerRef.instance.maxDate = this.maxDate), n.datesDisabled && (this._datepickerRef.instance.datesDisabled = this.datesDisabled), n.datesEnabled && (this._datepickerRef.instance.datesEnabled = this.datesEnabled), n.daysDisabled && (this._datepickerRef.instance.daysDisabled = this.daysDisabled), n.isDisabled && (this._datepickerRef.instance.isDisabled = this.isDisabled), n.dateCustomClasses && (this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses))
            }
            ngAfterViewInit() {
                this.isOpen$.pipe(U(n => n !== this.isOpen), Bn(this.isDestroy$)).subscribe(() => this.toggle())
            }
            show() {
                this._datepicker.isShown || (this.setConfig(), this._datepickerRef = this._datepicker.provide({
                    provide: fe,
                    useValue: this._config
                }).attach(Ui).to(this.container).position({
                    attachment: this.placement
                }).show({
                    placement: this.placement
                }), this.initSubscribes())
            }
            initSubscribes() {
                this._subs.push(this.bsValueChange.subscribe(n => {
                    this._datepickerRef && (this._datepickerRef.instance.value = n)
                })), this._datepickerRef && this._subs.push(this._datepickerRef.instance.valueChange.pipe(U(n => n && n[0] && !!n[1])).subscribe(n => {
                    this.initPreviousValue(), this.bsValue = n, !this.keepDatepickerModalOpened() && this.hide()
                }))
            }
            initPreviousValue() {
                Fe = this._bsValue
            }
            keepDatepickerModalOpened() {
                return !Fe || !this.bsConfig ? .keepDatepickerOpened || !this._config.withTimepicker ? !1 : this.isDateSame()
            }
            isDateSame() {
                return this._bsValue ? .[0] ? .getDate() === Fe ? .[0] ? .getDate() && this._bsValue ? .[0] ? .getMonth() === Fe ? .[0] ? .getMonth() && this._bsValue ? .[0] ? .getFullYear() === Fe ? .[0] ? .getFullYear() && this._bsValue ? .[1] ? .getDate() === Fe ? .[1] ? .getDate() && this._bsValue ? .[1] ? .getMonth() === Fe ? .[1] ? .getMonth() && this._bsValue ? .[1] ? .getFullYear() === Fe ? .[1] ? .getFullYear()
            }
            setConfig() {
                this._config = Object.assign({}, this._config, this.bsConfig, {
                    value: this.bsConfig ? .keepDatesOutOfRules ? this._bsValue : Sr(this._bsValue, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
                    isDisabled: this.isDisabled,
                    minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
                    maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
                    daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
                    dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
                    datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
                    datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
                    ranges: pc(this.bsConfig && this.bsConfig.ranges, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
                    maxDateRange: this.bsConfig && this.bsConfig.maxDateRange,
                    initCurrentTime: this.bsConfig ? .initCurrentTime,
                    keepDatepickerOpened: this.bsConfig ? .keepDatepickerOpened,
                    keepDatesOutOfRules: this.bsConfig ? .keepDatesOutOfRules
                })
            }
            hide() {
                this.isOpen && this._datepicker.hide();
                for (let n of this._subs) n.unsubscribe();
                this._config.returnFocusToInput && this._renderer.selectRootElement(this._elementRef.nativeElement).focus()
            }
            toggle() {
                if (this.isOpen) return this.hide();
                this.show()
            }
            unsubscribeSubscriptions() {
                this._subs ? .length && (this._subs.map(n => n.unsubscribe()), this._subs.length = 0)
            }
            ngOnDestroy() {
                this._datepicker.dispose(), this.isOpen$.next(!1), this.isDestroy$ && (this.isDestroy$.next(null), this.isDestroy$.complete()), this.unsubscribeSubscriptions()
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(g(Bc), g(be), g(Me), g($n), g(dt))
        }, t.\u0275dir = It({
            type: t,
            selectors: [
                ["", "bsDaterangepicker", ""]
            ],
            hostVars: 1,
            hostBindings: function(s, r) {
                s & 2 && ce("readonly", r.isDatepickerReadonly)
            },
            inputs: {
                placement: "placement",
                triggers: "triggers",
                outsideClick: "outsideClick",
                container: "container",
                outsideEsc: "outsideEsc",
                isOpen: "isOpen",
                bsValue: "bsValue",
                bsConfig: "bsConfig",
                isDisabled: "isDisabled",
                minDate: "minDate",
                maxDate: "maxDate",
                dateCustomClasses: "dateCustomClasses",
                daysDisabled: "daysDisabled",
                datesDisabled: "datesDisabled",
                datesEnabled: "datesEnabled"
            },
            outputs: {
                onShown: "onShown",
                onHidden: "onHidden",
                bsValueChange: "bsValueChange"
            },
            exportAs: ["bsDaterangepicker"],
            features: [_e([dt]), Ot]
        });
        let e = t;
        return e
    })(),
    $c = {
        provide: Nt,
        useExisting: Ne(() => Rr),
        multi: !0
    },
    Uc = {
        provide: Qn,
        useExisting: Ne(() => Rr),
        multi: !0
    },
    Rr = (() => {
        let t = class t {
            constructor(n, s, r, a, o) {
                this._picker = n, this._localeService = s, this._renderer = r, this._elRef = a, this.changeDetection = o, this._onChange = Function.prototype, this._onTouched = Function.prototype, this._validatorChange = Function.prototype, this._subs = new Ht
            }
            ngOnInit() {
                let n = s => {
                    this._setInputValue(s), this._value !== s && (this._value = s, this._onChange(s), this._onTouched()), this.changeDetection.markForCheck()
                };
                this._picker._bsValue && n(this._picker._bsValue), this._subs.add(this._picker.bsValueChange.subscribe(s => {
                    this._setInputValue(s), this._value !== s && (this._value = s, this._onChange(s), this._onTouched()), this.changeDetection.markForCheck()
                })), this._subs.add(this._localeService.localeChange.subscribe(() => {
                    this._setInputValue(this._value)
                })), this._subs.add(this._picker.rangeInputFormat$.pipe(Et()).subscribe(() => {
                    this._setInputValue(this._value)
                }))
            }
            ngOnDestroy() {
                this._subs.unsubscribe()
            }
            onKeydownEvent(n) {
                (n.keyCode === 13 || n.code === "Enter") && this.hide()
            }
            _setInputValue(n) {
                let s = "";
                if (n) {
                    let r = n[0] ? X(n[0], this._picker._config.rangeInputFormat, this._localeService.currentLocale) : "",
                        a = n[1] ? X(n[1], this._picker._config.rangeInputFormat, this._localeService.currentLocale) : "";
                    s = r && a ? r + this._picker._config.rangeSeparator + a : ""
                }
                this._renderer.setProperty(this._elRef.nativeElement, "value", s)
            }
            onChange(n) {
                this.writeValue(n.target.value), this._onChange(this._value), this._picker._config.returnFocusToInput && this._renderer.selectRootElement(this._elRef.nativeElement).focus(), this._onTouched()
            }
            validate(n) {
                let s = n.value,
                    r = [];
                if (s == null || !V(s)) return null;
                s = s.slice().sort((p, v) => p.getTime() - v.getTime());
                let a = Ve(s[0]),
                    o = Ve(s[1]);
                return a ? o ? (this._picker && this._picker.minDate && je(s[0], this._picker.minDate, "date") && (s[0] = this._picker.minDate, r.push({
                    bsDate: {
                        minDate: this._picker.minDate
                    }
                })), this._picker && this._picker.maxDate && Oe(s[1], this._picker.maxDate, "date") && (s[1] = this._picker.maxDate, r.push({
                    bsDate: {
                        maxDate: this._picker.maxDate
                    }
                })), r.length > 0 ? (this.writeValue(s), r) : null) : {
                    bsDate: {
                        invalid: s[1]
                    }
                } : {
                    bsDate: {
                        invalid: s[0]
                    }
                }
            }
            registerOnValidatorChange(n) {
                this._validatorChange = n
            }
            writeValue(n) {
                if (!n) this._value = void 0;
                else {
                    let s = this._localeService.currentLocale;
                    if (!N(s)) throw new Error(`Locale "${s}" is not defined, please add it with "defineLocale(...)"`);
                    let a = [];
                    if (typeof n == "string") {
                        let o = this._picker._config.rangeSeparator.trim();
                        n.replace(/[^-]/g, "").length > 1 ? a = n.split(this._picker._config.rangeSeparator) : a = n.split(o.length > 0 ? o : this._picker._config.rangeSeparator).map(p => p.trim())
                    }
                    Array.isArray(n) && (a = n), this._value = a.map(o => this._picker._config.useUtc ? Li(Dt(o, this._picker._config.rangeInputFormat, this._localeService.currentLocale)) : Dt(o, this._picker._config.rangeInputFormat, this._localeService.currentLocale)).map(o => isNaN(o.valueOf()) ? void 0 : o)
                }
                this._picker.bsValue = this._value
            }
            setDisabledState(n) {
                if (this._picker.isDisabled = n, n) {
                    this._renderer.setAttribute(this._elRef.nativeElement, "disabled", "disabled");
                    return
                }
                this._renderer.removeAttribute(this._elRef.nativeElement, "disabled")
            }
            registerOnChange(n) {
                this._onChange = n
            }
            registerOnTouched(n) {
                this._onTouched = n
            }
            onBlur() {
                this._onTouched()
            }
            hide() {
                this._picker.hide(), this._renderer.selectRootElement(this._elRef.nativeElement).blur(), this._picker._config.returnFocusToInput && this._renderer.selectRootElement(this._elRef.nativeElement).focus()
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)(g(Nc, 1), g(Pi), g(Me), g(be), g(Rt))
        }, t.\u0275dir = It({
            type: t,
            selectors: [
                ["input", "bsDaterangepicker", ""]
            ],
            hostBindings: function(s, r) {
                s & 1 && f("change", function(o) {
                    return r.onChange(o)
                })("keyup.esc", function() {
                    return r.hide()
                })("keydown", function(o) {
                    return r.onKeydownEvent(o)
                })("blur", function() {
                    return r.onBlur()
                })
            },
            features: [_e([$c, Uc])]
        });
        let e = t;
        return e
    })(),
    Cu = (() => {
        let t = class t {
            static forRoot() {
                return {
                    ngModule: t,
                    providers: []
                }
            }
        };
        t.\u0275fac = function(s) {
            return new(s || t)
        }, t.\u0275mod = ln({
            type: t
        }), t.\u0275inj = dn({
            imports: [Xi, Kn, Yt, on, $i, jc, Ui, Ac]
        });
        let e = t;
        return e
    })();
export {
    Rc as a, Pr as b, Cu as c
};