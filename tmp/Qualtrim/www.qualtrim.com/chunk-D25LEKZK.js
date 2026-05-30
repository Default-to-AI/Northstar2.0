import {
    $c as I,
    Cb as h,
    Db as g,
    Dc as d,
    Ec as x,
    Gc as A,
    Sd as v,
    Xb as m,
    Xd as S,
    Zb as f,
    _b as y,
    ad as O,
    dc as a,
    ec as r,
    fb as o,
    fc as l,
    kb as s,
    kc as c,
    qa as p
} from "./chunk-7LZCJGQ2.js";

function Z(e, t) {
    if (e & 1 && (a(0, "tr", 1)(1, "td"), l(2, "img", 2), r(), a(3, "td")(4, "h4", 3)(5, "a", 4), d(6), r()(), a(7, "p", 5), d(8), I(9, "date"), r()()()), e & 2) {
        let n = t.$implicit;
        s(2), c("src", n.image, o)("alt", n.title), s(3), c("href", n.url, o), s(), x(n.title), s(2), A(" ", n.site, " | ", O(9, 6, n.publishedDate), " ")
    }
}
var C = (() => {
    let t = class t {};
    t.\u0275fac = function(i) {
        return new(i || t)
    }, t.\u0275cmp = h({
        type: t,
        selectors: [
            ["qualtrim-news-list"]
        ],
        inputs: {
            news: "news"
        },
        decls: 4,
        vars: 0,
        consts: [
            [1, "table", "table-row-dashed", "table-row-gray-200", "align-middle", "gs-0", "gy-4"],
            [1, "text-hover-"],
            [1, "w-85px", 3, "src", "alt"],
            [1, "fs-2", "m-0"],
            ["target", "qualtrim-external", 1, "text-gray-800", "dark:text-white", "text-hover-primary", 3, "href"],
            [1, "fs-6", "text-muted", "dark:text-gray-300", "m-0"]
        ],
        template: function(i, w) {
            i & 1 && (a(0, "table", 0)(1, "tbody"), f(2, Z, 10, 8, "tr", 1, m), r()()), i & 2 && (s(2), y(w.news))
        },
        dependencies: [S, v],
        encapsulation: 2
    });
    let e = t;
    return e
})();
var R = (() => {
    let t = class t {};
    t.\u0275fac = function(i) {
        return new(i || t)
    }, t.\u0275mod = g({
        type: t
    }), t.\u0275inj = p({});
    let e = t;
    return e
})();
export {
    C as a, R as b
};