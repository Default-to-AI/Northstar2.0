import {
    Aa as _,
    Ac as D,
    Ba as T,
    Cb as S,
    Cc as M,
    Dc as l,
    Ec as O,
    Fc as m,
    Ia as y,
    Sb as f,
    Ub as d,
    Wb as g,
    Xd as $,
    Yb as V,
    Zb as k,
    _b as E,
    dc as r,
    ec as a,
    fc as I,
    gd as u,
    jb as v,
    jc as b,
    kb as i,
    kc as h,
    nc as B,
    oc as x,
    pb as w,
    pc as s,
    za as p
} from "./chunk-7LZCJGQ2.js";
var A = (e, c) => c.key;

function L(e, c) {
    if (e & 1) {
        let t = b();
        r(0, "div", 14), x("click", function() {
            p(t);
            let o = s(2);
            return _(o.onOverlayClick())
        }), a()
    }
    if (e & 2) {
        let t = s(2);
        D("opacity-0", !t.isVisible())
    }
}

function N(e, c) {
    if (e & 1 && (r(0, "li", 20)(1, "span", 21), l(2, "\u2022"), a(), r(3, "span"), l(4), a()()), e & 2) {
        let t = c.$implicit;
        i(4), O(t)
    }
}

function Y(e, c) {
    if (e & 1 && (r(0, "div", 18)(1, "ul", 19), k(2, N, 5, 1, "li", 20, V), a()()), e & 2) {
        let t = s(3);
        h("id", "details-" + t.config.id), i(2), E(t.config.details)
    }
}

function F(e, c) {
    if (e & 1) {
        let t = b();
        r(0, "div", 6)(1, "button", 15), x("click", function() {
            p(t);
            let o = s(2);
            return _(o.toggleDetails())
        }), T(), r(2, "svg", 16), I(3, "path", 17), a(), l(4, " Show Details "), a(), d(5, Y, 4, 1, "div", 18), a()
    }
    if (e & 2) {
        let t = s(2);
        i(), f("aria-expanded", t.showDetailsExpanded())("aria-controls", "details-" + t.config.id), i(), D("rotate-180", t.showDetailsExpanded()), i(3), g(t.showDetailsExpanded() ? 5 : -1)
    }
}

function H(e, c) {
    if (e & 1 && (r(0, "div", 25)(1, "span", 26), l(2), a(), r(3, "span"), l(4), a()()), e & 2) {
        let t = c.$implicit;
        i(2), m("", t.label, ":"), i(2), O(t.value)
    }
}

function z(e, c) {
    if (e & 1 && (r(0, "div", 6)(1, "div", 22)(2, "h4", 23), l(3, " Additional Information "), a(), r(4, "div", 24), k(5, H, 5, 2, "div", 25, A), a()()()), e & 2) {
        let t = s(2);
        i(5), E(t.getContextItems())
    }
}

function K(e, c) {
    if (e & 1) {
        let t = b();
        r(0, "div", 6)(1, "div", 27)(2, "p", 28), l(3, " To confirm this action, please type "), r(4, "strong"), l(5), a(), l(6, " below: "), a(), r(7, "input", 29), x("input", function(o) {
            p(t);
            let C = s(2);
            return _(C.onTypedConfirmationChange(o))
        }), a()()()
    }
    if (e & 2) {
        let t = s(2);
        i(5), m('"', t.config.requireTypedConfirmation, '"'), i(2), h("value", t.typedConfirmation()), f("aria-label", "Type " + t.config.requireTypedConfirmation + " to confirm")
    }
}

function j(e, c) {
    if (e & 1) {
        let t = b();
        r(0, "button", 30), x("click", function() {
            p(t);
            let o = s(2);
            return _(o.onAlternative())
        }), l(1), a()
    }
    if (e & 2) {
        let t = s(2);
        f("aria-label", t.config.alternativeText), i(), m(" ", t.config.alternativeText, " ")
    }
}

function U(e, c) {
    e & 1 && (r(0, "div", 12), l(1, " Press Enter to confirm, Escape to cancel "), a())
}

function G(e, c) {
    e & 1 && (r(0, "div", 13)(1, "div", 31), l(2, " \u26A0\uFE0F This action requires explicit confirmation "), a()())
}

function Z(e, c) {
    if (e & 1) {
        let t = b();
        d(0, L, 1, 2, "div", 0), r(1, "div", 1)(2, "div")(3, "div", 2)(4, "div")(5, "span", 3), l(6), a()(), r(7, "h3", 4), l(8), a(), r(9, "p", 5), l(10), a()(), d(11, F, 6, 5, "div", 6), d(12, z, 7, 0, "div", 6), d(13, K, 8, 3, "div", 6), r(14, "div", 7)(15, "div", 8)(16, "button", 9), x("click", function() {
            p(t);
            let o = s();
            return _(o.onCancel())
        }), l(17), a(), d(18, j, 2, 2, "button", 10), r(19, "button", 11), x("click", function() {
            p(t);
            let o = s();
            return _(o.onConfirm())
        }), l(20), a()(), d(21, U, 2, 0, "div", 12), a(), d(22, G, 3, 0, "div", 13), a()()
    }
    if (e & 2) {
        let t = s();
        g(t.showOverlay ? 0 : -1), i(), f("aria-modal", !0)("aria-labelledby", "dialog-title-" + t.config.id)("aria-describedby", "dialog-description-" + t.config.id), i(), M(t.getSeverityBorderClass(t.config.severity)), i(2), M(t.iconClass()), f("aria-hidden", !0), i(2), O(t.icon()), i(), h("id", "dialog-title-" + t.config.id), i(), m(" ", t.config.title, " "), i(), h("id", "dialog-description-" + t.config.id), i(), m(" ", t.config.message, " "), i(), g(t.config.showDetails && t.config.details && t.config.details.length > 0 ? 11 : -1), i(), g(t.shouldShowContext() ? 12 : -1), i(), g(t.config.requireTypedConfirmation ? 13 : -1), i(3), f("aria-label", t.cancelText()), i(), m(" ", t.cancelText(), " "), i(), g(t.config.alternativeText ? 18 : -1), i(), M(t.confirmButtonClass()), h("disabled", !t.canConfirm()), f("aria-label", t.confirmText()), i(), m(" ", t.confirmText(), " "), i(), g(t.config.requireTypedConfirmation ? -1 : 21), i(), g(t.config.preventEscapeClose ? 22 : -1)
    }
}
var et = (() => {
    let c = class c {
        constructor() {
            this.config = null, this.isOpen = !1, this.showOverlay = !0, this.result = new w, this.closed = new w, this.isVisible = y(!1), this.isAnimating = y(!1), this.typedConfirmation = y(""), this.showDetailsExpanded = y(!1), this.modalClass = u(() => {
                if (!this.config) return "";
                let n = "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-out",
                    o = this.isVisible() ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4";
                return `${n} ${o}`
            }), this.iconClass = u(() => {
                if (!this.config) return "";
                let n = "w-12 h-12",
                    o = this.getSeverityIconClasses(this.config.severity);
                return `${n} ${o} mx-auto mb-4`
            }), this.icon = u(() => this.config ? this.config.icon ? this.config.icon : this.getDefaultIcon(this.config.severity) : ""), this.confirmButtonClass = u(() => this.config ? this.config.confirmButtonClass ? this.config.confirmButtonClass : this.getDefaultConfirmButtonClass(this.config.severity) : ""), this.canConfirm = u(() => this.config ? this.config.requireTypedConfirmation ? this.typedConfirmation().trim().toLowerCase() === this.config.requireTypedConfirmation.toLowerCase() : !0 : !1), this.confirmText = u(() => this.config ? .confirmText || this.getDefaultConfirmText(this.config ? .severity || "info")), this.cancelText = u(() => this.config ? .cancelText || "Cancel")
        }
        ngOnInit() {
            this.isOpen && this.config && this.openDialog()
        }
        openDialog() {
            this.isAnimating.set(!0), setTimeout(() => {
                this.isVisible.set(!0), this.isAnimating.set(!1), this.focusFirstButton()
            }, 50)
        }
        closeDialog() {
            this.isAnimating.set(!0), this.isVisible.set(!1), setTimeout(() => {
                this.isAnimating.set(!1), this.closed.emit()
            }, 300)
        }
        focusFirstButton() {
            setTimeout(() => {
                let n = document.querySelector(".confirmation-dialog .action-button:first-of-type");
                n && n.focus()
            }, 100)
        }
        onConfirm() {
            if (!this.config || !this.canConfirm()) return;
            let n = {
                action: "confirm",
                config: this.config,
                typedConfirmation: this.config.requireTypedConfirmation ? this.typedConfirmation() : void 0
            };
            this.result.emit(n), this.closeDialog()
        }
        onCancel() {
            if (!this.config) return;
            let n = {
                action: "cancel",
                config: this.config
            };
            this.result.emit(n), this.closeDialog()
        }
        onAlternative() {
            if (!this.config) return;
            let n = {
                action: "alternative",
                config: this.config
            };
            this.result.emit(n), this.closeDialog()
        }
        onOverlayClick() {
            this.config ? .preventEscapeClose || this.onCancel()
        }
        onEscapeKey(n) {
            this.config ? .preventEscapeClose || (n.preventDefault(), this.onCancel())
        }
        onEnterKey(n) {
            this.canConfirm() && !this.config ? .requireTypedConfirmation && (n.preventDefault(), this.onConfirm())
        }
        toggleDetails() {
            this.showDetailsExpanded.set(!this.showDetailsExpanded())
        }
        onTypedConfirmationChange(n) {
            this.typedConfirmation.set(n.target.value)
        }
        getSeverityIconClasses(n) {
            switch (n) {
                case "danger":
                    return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 rounded-full p-3";
                case "warning":
                    return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 rounded-full p-3";
                case "info":
                    return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 rounded-full p-3";
                default:
                    return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20 rounded-full p-3"
            }
        }
        getDefaultIcon(n) {
            switch (n) {
                case "danger":
                    return "\u26A0\uFE0F";
                case "warning":
                    return "\u26A0\uFE0F";
                case "info":
                    return "\u2139\uFE0F";
                default:
                    return "\u2753"
            }
        }
        getDefaultConfirmButtonClass(n) {
            let o = "px-6 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-gray-800";
            switch (n) {
                case "danger":
                    return `${o} bg-red-600 hover:bg-red-700 text-white focus:ring-red-300 dark:focus:ring-red-800`;
                case "warning":
                    return `${o} bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-300 dark:focus:ring-yellow-800`;
                case "info":
                    return `${o} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300 dark:focus:ring-blue-800`;
                default:
                    return `${o} bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-300 dark:focus:ring-gray-800`
            }
        }
        getDefaultConfirmText(n) {
            switch (n) {
                case "danger":
                    return "Delete";
                case "warning":
                    return "Proceed";
                case "info":
                    return "Confirm";
                default:
                    return "OK"
            }
        }
        getSeverityBorderClass(n) {
            switch (n) {
                case "danger":
                    return "border-t-4 border-red-500";
                case "warning":
                    return "border-t-4 border-yellow-500";
                case "info":
                    return "border-t-4 border-blue-500";
                default:
                    return "border-t-4 border-gray-500"
            }
        }
        getContextItems() {
            return this.config ? .context ? Object.entries(this.config.context).map(([n, o]) => ({
                key: n,
                label: this.formatContextLabel(n),
                value: String(o)
            })) : []
        }
        formatContextLabel(n) {
            return n.replace(/([A-Z])/g, " $1").replace(/^./, o => o.toUpperCase()).trim()
        }
        shouldShowContext() {
            return !!this.config ? .context
        }
    };
    c.\u0275fac = function(o) {
        return new(o || c)
    }, c.\u0275cmp = S({
        type: c,
        selectors: [
            ["qualtrim-confirmation-dialog"]
        ],
        hostBindings: function(o, C) {
            o & 1 && B("keydown.escape", function(P) {
                return C.onEscapeKey(P)
            }, v)("keydown.enter", function(P) {
                return C.onEnterKey(P)
            }, v)
        },
        inputs: {
            config: "config",
            isOpen: "isOpen",
            showOverlay: "showOverlay"
        },
        outputs: {
            result: "result",
            closed: "closed"
        },
        decls: 1,
        vars: 1,
        consts: [
            ["aria-hidden", "true", 1, "fixed", "inset-0", "bg-black", "bg-opacity-50", "dark:bg-opacity-70", "z-50", "transition-opacity", "duration-300", "backdrop-blur-sm", 3, "opacity-0"],
            ["role", "dialog", 1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4"],
            [1, "text-center", "p-6", "pb-4"],
            [1, "text-2xl"],
            [1, "text-xl", "font-bold", "text-gray-900", "dark:text-white", "mb-2", 3, "id"],
            [1, "text-gray-600", "dark:text-gray-300", "leading-relaxed", 3, "id"],
            [1, "px-6", "pb-4"],
            [1, "px-6", "pb-6"],
            [1, "flex", "flex-col", "sm:flex-row", "gap-3", "sm:gap-3"],
            [1, "action-button", "order-2", "sm:order-1", "px-6", "py-3", "rounded-xl", "font-semibold", "transition-all", "duration-200", "bg-gray-100", "hover:bg-gray-200", "dark:bg-gray-700", "dark:hover:bg-gray-600", "text-gray-700", "dark:text-gray-300", "focus:outline-none", "focus:ring-4", "focus:ring-gray-300", "focus:ring-offset-2", "dark:focus:ring-gray-600", "dark:focus:ring-offset-gray-800", 3, "click"],
            [1, "action-button", "order-3", "sm:order-2", "px-6", "py-3", "rounded-xl", "font-semibold", "transition-all", "duration-200", "bg-blue-100", "hover:bg-blue-200", "dark:bg-blue-900/20", "dark:hover:bg-blue-900/40", "text-blue-700", "dark:text-blue-300", "focus:outline-none", "focus:ring-4", "focus:ring-blue-300", "focus:ring-offset-2", "dark:focus:ring-blue-800", "dark:focus:ring-offset-gray-800"],
            [1, "action-button", "order-1", "sm:order-last", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:hover:bg-current", 3, "click", "disabled"],
            [1, "mt-3", "text-xs", "text-gray-500", "dark:text-gray-400", "text-center"],
            [1, "px-6", "pb-2"],
            ["aria-hidden", "true", 1, "fixed", "inset-0", "bg-black", "bg-opacity-50", "dark:bg-opacity-70", "z-50", "transition-opacity", "duration-300", "backdrop-blur-sm", 3, "click"],
            [1, "flex", "items-center", "gap-2", "text-sm", "text-gray-500", "dark:text-gray-400", "hover:text-gray-700", "dark:hover:text-gray-200", "transition-colors", "duration-200", 3, "click"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "transition-transform", "duration-200"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"],
            [1, "mt-3", "p-3", "bg-gray-50", "dark:bg-gray-900/50", "rounded-lg", "text-sm", "text-gray-600", "dark:text-gray-300", 3, "id"],
            [1, "space-y-1"],
            [1, "flex", "items-start", "gap-2"],
            [1, "text-gray-400", "mt-1"],
            [1, "bg-gray-50", "dark:bg-gray-900/50", "rounded-lg", "p-3"],
            [1, "text-sm", "font-semibold", "text-gray-700", "dark:text-gray-300", "mb-2"],
            [1, "space-y-1", "text-sm", "text-gray-600", "dark:text-gray-400"],
            [1, "flex", "justify-between"],
            [1, "font-medium"],
            [1, "bg-yellow-50", "dark:bg-yellow-900/20", "border", "border-yellow-200", "dark:border-yellow-800", "rounded-lg", "p-3"],
            [1, "text-sm", "text-yellow-800", "dark:text-yellow-200", "mb-2"],
            ["type", "text", "autocomplete", "off", "spellcheck", "false", 1, "w-full", "px-3", "py-2", "border", "border-yellow-300", "dark:border-yellow-700", "rounded-lg", "bg-white", "dark:bg-gray-800", "text-gray-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-yellow-500", "focus:border-transparent", "placeholder-gray-500", "dark:placeholder-gray-400", 3, "input", "value"],
            [1, "action-button", "order-3", "sm:order-2", "px-6", "py-3", "rounded-xl", "font-semibold", "transition-all", "duration-200", "bg-blue-100", "hover:bg-blue-200", "dark:bg-blue-900/20", "dark:hover:bg-blue-900/40", "text-blue-700", "dark:text-blue-300", "focus:outline-none", "focus:ring-4", "focus:ring-blue-300", "focus:ring-offset-2", "dark:focus:ring-blue-800", "dark:focus:ring-offset-gray-800", 3, "click"],
            [1, "text-xs", "text-center", "text-yellow-600", "dark:text-yellow-400", "bg-yellow-50", "dark:bg-yellow-900/20", "rounded-lg", "py-2", "px-3"]
        ],
        template: function(o, C) {
            o & 1 && d(0, Z, 23, 27), o & 2 && g(C.isOpen && C.config ? 0 : -1)
        },
        dependencies: [$],
        styles: ['[_nghost-%COMP%]{display:contents}.dialog-backdrop[_ngcontent-%COMP%]{backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}@keyframes _ngcontent-%COMP%_modal-enter{0%{opacity:0;transform:scale(.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes _ngcontent-%COMP%_modal-exit{0%{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(.9) translateY(20px)}}@keyframes _ngcontent-%COMP%_shake{0%,to{transform:translate(0)}25%{transform:translate(-4px)}75%{transform:translate(4px)}}@keyframes _ngcontent-%COMP%_pulse-warning{0%,to{box-shadow:0 0 #f59e0b66}70%{box-shadow:0 0 0 8px #f59e0b00}}@keyframes _ngcontent-%COMP%_pulse-danger{0%,to{box-shadow:0 0 #ef444466}70%{box-shadow:0 0 0 8px #ef444400}}.dialog-container[_ngcontent-%COMP%]{will-change:transform,opacity;box-shadow:0 25px 50px -12px #00000040}.dialog-container.entering[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_modal-enter .3s ease-out forwards}.dialog-container.exiting[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_modal-exit .3s ease-in forwards}.severity-danger[_ngcontent-%COMP%]   .dialog-icon[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse-danger 2s infinite}.severity-danger[_ngcontent-%COMP%]   .confirm-button[_ngcontent-%COMP%]:hover:not(:disabled){transform:scale(1.02)}.severity-danger[_ngcontent-%COMP%]   .confirm-button[_ngcontent-%COMP%]:active{animation:_ngcontent-%COMP%_shake .3s ease-in-out}.severity-warning[_ngcontent-%COMP%]   .dialog-icon[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse-warning 2s infinite}.severity-info[_ngcontent-%COMP%]   .dialog-icon[_ngcontent-%COMP%]{animation:none}.typed-confirmation-container[_ngcontent-%COMP%]   .confirmation-input[_ngcontent-%COMP%]{font-family:Monaco,Menlo,Ubuntu Mono,monospace}.typed-confirmation-container[_ngcontent-%COMP%]   .confirmation-input[_ngcontent-%COMP%]:focus{transform:scale(1.01)}.typed-confirmation-container[_ngcontent-%COMP%]   .confirmation-input.invalid[_ngcontent-%COMP%]{border-color:#ef4444;background-color:#fef2f2}.typed-confirmation-container[_ngcontent-%COMP%]   .confirmation-input.invalid[_ngcontent-%COMP%]:dark{border-color:#b91c1c;background-color:#7f1d1d33}.typed-confirmation-container[_ngcontent-%COMP%]   .confirmation-hint[_ngcontent-%COMP%]{font-size:.8125rem;line-height:1.2}.dialog-actions[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%]{min-width:100px;position:relative;overflow:hidden}.dialog-actions[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,.1) 50%,transparent 70%);transform:translate(-100%);transition:transform .5s ease-out}.dialog-actions[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%]:hover:not(:disabled):before{transform:translate(100%)}.dialog-actions[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%]:disabled{position:relative}.dialog-actions[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%]:disabled:after{content:"";position:absolute;inset:0;background:#0000001a;-webkit-backdrop-filter:grayscale(100%);backdrop-filter:grayscale(100%)}.dialog-actions[_ngcontent-%COMP%]   .confirm-button[_ngcontent-%COMP%]{position:relative}.dialog-actions[_ngcontent-%COMP%]   .confirm-button[_ngcontent-%COMP%]:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 16px -6px #0000004d}.dialog-actions[_ngcontent-%COMP%]   .confirm-button[_ngcontent-%COMP%]:active:not(:disabled){transform:translateY(0);box-shadow:0 4px 8px -3px #0000004d}.details-container[_ngcontent-%COMP%]   .details-toggle[_ngcontent-%COMP%]{transition:all .2s ease}.details-container[_ngcontent-%COMP%]   .details-toggle[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.details-container[_ngcontent-%COMP%]   .details-toggle[_ngcontent-%COMP%]   .toggle-icon[_ngcontent-%COMP%]{transition:transform .3s ease}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slide-down .3s ease-out}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{opacity:0;animation:_ngcontent-%COMP%_fade-in .2s ease-out forwards}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(1){animation-delay:.05s}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(2){animation-delay:.1s}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(3){animation-delay:.15s}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(4){animation-delay:.2s}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(5){animation-delay:.25s}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(6){animation-delay:.3s}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(7){animation-delay:.35s}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(8){animation-delay:.4s}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(9){animation-delay:.45s}.details-container[_ngcontent-%COMP%]   .details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(10){animation-delay:.5s}@keyframes _ngcontent-%COMP%_slide-down{0%{opacity:0;transform:translateY(-10px);max-height:0}to{opacity:1;transform:translateY(0);max-height:200px}}@keyframes _ngcontent-%COMP%_fade-in{0%{opacity:0;transform:translate(-10px)}to{opacity:1;transform:translate(0)}}.context-container[_ngcontent-%COMP%]   .context-item[_ngcontent-%COMP%]{transition:background-color .2s ease}.context-container[_ngcontent-%COMP%]   .context-item[_ngcontent-%COMP%]:hover{background-color:#0000000d}.dark[_ngcontent-%COMP%]   .context-container[_ngcontent-%COMP%]   .context-item[_ngcontent-%COMP%]:hover{background-color:#ffffff0d}.prevention-notice[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_subtle-pulse 3s ease-in-out infinite}@keyframes _ngcontent-%COMP%_subtle-pulse{0%,to{opacity:.8}50%{opacity:1}}@media (max-width: 640px){.dialog-container[_ngcontent-%COMP%]{margin:1rem;max-width:none;width:calc(100vw - 2rem)}.dialog-actions[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%]{min-width:auto;flex:1}.details-content[_ngcontent-%COMP%]{max-height:150px;overflow-y:auto}}.dark[_nghost-%COMP%]   .dialog-container[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .dialog-container[_ngcontent-%COMP%]{box-shadow:0 25px 50px -12px #00000080}.dark[_nghost-%COMP%]   .dialog-backdrop[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .dialog-backdrop[_ngcontent-%COMP%]{-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.dark[_nghost-%COMP%]   .typed-confirmation-container[_ngcontent-%COMP%]   .confirmation-input.invalid[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .typed-confirmation-container[_ngcontent-%COMP%]   .confirmation-input.invalid[_ngcontent-%COMP%]{border-color:#dc2626;background-color:#dc26261a}@media (prefers-contrast: high){.dialog-container[_ngcontent-%COMP%]{border:2px solid}.dialog-container.severity-danger[_ngcontent-%COMP%]{border-color:red}.dialog-container.severity-warning[_ngcontent-%COMP%]{border-color:orange}.dialog-container.severity-info[_ngcontent-%COMP%]{border-color:#00f}.action-button[_ngcontent-%COMP%]{border:2px solid currentColor;font-weight:600}.typed-confirmation-container[_ngcontent-%COMP%]   .confirmation-input[_ngcontent-%COMP%]{border-width:2px}}@media (prefers-reduced-motion: reduce){.dialog-container[_ngcontent-%COMP%], .action-button[_ngcontent-%COMP%], .details-toggle[_ngcontent-%COMP%], .details-content[_ngcontent-%COMP%], .context-item[_ngcontent-%COMP%], .dialog-icon[_ngcontent-%COMP%]{animation:none;transition:none}.action-button[_ngcontent-%COMP%]:hover:not(:disabled){transform:none}.confirm-button[_ngcontent-%COMP%]:hover:not(:disabled){transform:none;box-shadow:none}.details-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{opacity:1;transform:none}}.action-button[_ngcontent-%COMP%]:focus-visible{outline:2px solid currentColor;outline-offset:4px}.confirmation-input[_ngcontent-%COMP%]:focus-visible{outline:2px solid currentColor;outline-offset:2px}.details-toggle[_ngcontent-%COMP%]:focus-visible{outline:2px solid currentColor;outline-offset:2px;border-radius:.5rem}@media print{.dialog-backdrop[_ngcontent-%COMP%], .action-button[_ngcontent-%COMP%]:before, .prevention-notice[_ngcontent-%COMP%]{display:none!important}.dialog-container[_ngcontent-%COMP%]{position:relative!important;transform:none!important;box-shadow:none!important;border:2px solid #000;background:#fff!important;color:#000!important}.dialog-actions[_ngcontent-%COMP%]{display:none!important}}.dialog-container[_ngcontent-%COMP%], .action-button[_ngcontent-%COMP%], .dialog-icon[_ngcontent-%COMP%]{will-change:transform,opacity}.sr-only[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}']
    });
    let e = c;
    return e
})();
export {
    et as a
};