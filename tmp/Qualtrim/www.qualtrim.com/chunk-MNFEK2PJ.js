import {
    I as _,
    Na as M,
    ab as P,
    la as w
} from "./chunk-NO4XYT7V.js";
import {
    Aa as g,
    Ac as h,
    Cb as u,
    Dc as x,
    Gc as y,
    Ub as a,
    Wb as l,
    dc as c,
    ec as b,
    jc as v,
    kb as m,
    kc as f,
    oc as p,
    pb as C,
    pc as i,
    za as d
} from "./chunk-7LZCJGQ2.js";

function D(t, n) {
    if (t & 1) {
        let e = v();
        c(0, "button", 1), p("click", function() {
            d(e);
            let o = i(2);
            return g(o.onToggle())
        }), c(1, "span", 2), x(2), b()()
    }
    if (t & 2) {
        let e = i(2);
        h("btn-sm", e.size === "sm")("btn-lg", e.size === "lg"), f("title", e.showConverted ? "Show original values" : "Show converted values"), m(2), y(" ", e.flexibleData.meta.originalCurrency, " ", e.showConverted ? " \u2192 " + e.flexibleData.meta.convertedCurrency : "", " ")
    }
}

function O(t, n) {
    if (t & 1 && a(0, D, 3, 7, "button", 0), t & 2) {
        let e = i();
        l(e.flexibleData && e.showConverted !== null && e.showConverted !== void 0 ? 0 : -1)
    }
}
var F = (() => {
    let n = class n {
        constructor() {
            this.flexibleData = null, this.showConverted = null, this.size = "sm", this.toggleConversion = new C, this.icons = {
                exchange: w,
                eye: _,
                eyeSlash: M
            }
        }
        onToggle() {
            this.toggleConversion.emit()
        }
    };
    n.\u0275fac = function(o) {
        return new(o || n)
    }, n.\u0275cmp = u({
        type: n,
        selectors: [
            ["qualtrim-currency-conversion-toggle"]
        ],
        inputs: {
            flexibleData: "flexibleData",
            showConverted: "showConverted",
            size: "size"
        },
        outputs: {
            toggleConversion: "toggleConversion"
        },
        decls: 1,
        vars: 1,
        consts: [
            [1, "btn", "btn-light-secondary", "text-gray-700", 3, "btn-sm", "btn-lg", "title"],
            [1, "btn", "btn-light-secondary", "text-gray-700", 3, "click", "title"],
            [1, "fw-semibold", "text-gray-700", "dark:text-gray-300", 2, "font-size", "0.875rem"]
        ],
        template: function(o, r) {
            o & 1 && a(0, O, 1, 1), o & 2 && l(r.flexibleData && r.flexibleData.meta.originalCurrency !== r.flexibleData.meta.convertedCurrency ? 0 : -1)
        },
        dependencies: [P],
        styles: [".vr[_ngcontent-%COMP%]{width:1px;height:1rem;background-color:var(--bs-border-color)}.btn-xs[_ngcontent-%COMP%]{font-size:.75rem;padding:.25rem .5rem;line-height:1.2}.badge[_ngcontent-%COMP%]{padding:.25em .4em}@media (max-width: 768px){.currency-conversion-banner[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start!important;gap:.5rem}.currency-conversion-banner[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{width:100%}}[data-bs-theme=dark][_ngcontent-%COMP%]   .currency-conversion-banner[_ngcontent-%COMP%]{background-color:var(--bs-gray-800)!important;border-color:var(--bs-gray-700)!important}[data-bs-theme=dark][_ngcontent-%COMP%]   .vr[_ngcontent-%COMP%]{background-color:var(--bs-gray-700)}"]
    });
    let t = n;
    return t
})();
export {
    F as a
};