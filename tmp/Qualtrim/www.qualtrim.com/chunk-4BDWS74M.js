import {
    Ba as k,
    Cb as w,
    Cc as g,
    Dc as u,
    Fc as h,
    Ia as O,
    Sb as C,
    Ub as l,
    Wb as c,
    Xd as E,
    Yb as b,
    Zb as M,
    _b as P,
    dc as r,
    ec as d,
    fc as f,
    gd as m,
    kb as i,
    pa as x,
    pc as s,
    zc as _
} from "./chunk-7LZCJGQ2.js";
import {
    a as y
} from "./chunk-TXK3PDXI.js";

function D(n, t) {
    if (n & 1 && (r(0, "div", 1), k(), r(1, "svg", 10), f(2, "circle", 11)(3, "path", 12), d()()), n & 2) {
        let e = s(2);
        i(), g(e.spinnerClass()), C("aria-hidden", "true")
    }
}

function T(n, t) {
    if (n & 1 && f(0, "div", 14), n & 2) {
        let e = t.$implicit,
            o = s(3);
        g(o.getDotSizeClass()), _("animation-delay", (e - 1) * .2 + "s"), C("aria-hidden", "true")
    }
}

function z(n, t) {
    if (n & 1 && (r(0, "div", 2), M(1, T, 1, 5, "div", 13, b), d()), n & 2) {
        let e = s(2);
        i(), P(e.getLoadingDots())
    }
}

function $(n, t) {
    if (n & 1 && f(0, "div", 18), n & 2) {
        let e = t.$implicit;
        _("animation-delay", (e - 1) * .5 + "s"), C("aria-hidden", "true")
    }
}

function I(n, t) {
    if (n & 1 && (r(0, "div", 3)(1, "div", 15), M(2, $, 1, 3, "div", 16, b), f(4, "div", 17), d()()), n & 2) {
        let e = s(2);
        i(), g(e.getPulseContainerClass()), i(), P(e.getPulseRings())
    }
}

function N(n, t) {
    if (n & 1 && f(0, "div", 20), n & 2) {
        let e = t.$implicit,
            o = s(3);
        g(o.getSkeletonHeight()), _("width", e === 4 ? "60%" : "100%")("margin-left", e === 4 ? "auto" : "0")("margin-right", e === 4 ? "auto" : "0"), C("aria-hidden", "true")
    }
}

function j(n, t) {
    if (n & 1 && (r(0, "div", 4), M(1, N, 1, 9, "div", 19, b), d()), n & 2) {
        let e = s(2);
        i(), P(e.getSkeletonLines())
    }
}

function B(n, t) {
    if (n & 1 && (r(0, "h3", 21), u(1), d()), n & 2) {
        let e = s(2);
        g(e.messageClass()), i(), h(" ", e.effectiveConfig().message, " ")
    }
}

function F(n, t) {
    if (n & 1 && (r(0, "p"), u(1), d()), n & 2) {
        let e = s(2);
        g(e.submessageClass()), i(), h(" ", e.effectiveConfig().submessage, " ")
    }
}

function Y(n, t) {
    if (n & 1 && (r(0, "div", 7)(1, "div", 22)(2, "span", 23), u(3, "Progress"), d(), r(4, "span", 24), u(5), d()(), r(6, "div", 25), f(7, "div", 26), d()()), n & 2) {
        let e = s(2);
        i(5), h(" ", e.progressPercentage(), "% "), i(2), _("width", e.progressPercentage(), "%"), C("aria-valuenow", e.progressPercentage())("aria-valuemin", 0)("aria-valuemax", 100)
    }
}

function A(n, t) {
    if (n & 1 && (r(0, "div", 7)(1, "button", 27), u(2, " Cancel "), d()()), n & 2) {
        let e = s(2);
        i(), C("aria-label", "Cancel " + e.effectiveConfig().context)
    }
}

function H(n, t) {
    if (n & 1 && u(0), n & 2) {
        let e = s(2);
        h(" Loading progress: ", e.progressPercentage(), " percent complete ")
    }
}

function V(n, t) {
    if (n & 1 && (k(), r(0, "svg", 29), f(1, "circle", 11)(2, "path", 12), d()), n & 2) {
        let e = s(3);
        g(e.spinnerClass()), C("aria-hidden", "true")
    }
}

function G(n, t) {
    if (n & 1 && f(0, "div", 14), n & 2) {
        let e = t.$implicit,
            o = s(4);
        g(o.getDotSizeClass()), _("animation-delay", (e - 1) * .2 + "s"), C("aria-hidden", "true")
    }
}

function R(n, t) {
    if (n & 1 && M(0, G, 1, 5, "div", 13, b), n & 2) {
        let e = s(3);
        P(e.getLoadingDots())
    }
}

function q(n, t) {
    if (n & 1 && (r(0, "span"), u(1), d()), n & 2) {
        let e = s(3);
        g(e.messageClass()), i(), h(" ", e.effectiveConfig().message, " ")
    }
}

function J(n, t) {
    if (n & 1 && (r(0, "div", 9), l(1, V, 3, 3, ":svg:svg", 28), l(2, R, 2, 0), l(3, q, 2, 3, "span", 6), d()), n & 2) {
        let e = s(2);
        C("aria-live", "polite")("aria-busy", "true")("aria-label", e.getAriaLabel()), i(), c(e.showSpinner() ? 1 : -1), i(), c(e.showDots() ? 2 : -1), i(), c(e.shouldShowMessage() ? 3 : -1)
    }
}

function K(n, t) {
    if (n & 1 && (r(0, "div", 0)(1, "div"), l(2, D, 4, 3, "div", 1), l(3, z, 3, 0, "div", 2), l(4, I, 5, 2, "div", 3), l(5, j, 3, 0, "div", 4), l(6, B, 2, 3, "h3", 5), l(7, F, 2, 3, "p", 6), l(8, Y, 8, 6, "div", 7), l(9, A, 3, 1, "div", 7), r(10, "div", 8), l(11, H, 1, 1), d()()(), l(12, J, 4, 6, "div", 9)), n & 2) {
        let e = s();
        g(e.containerClass()), C("aria-live", "polite")("aria-busy", "true")("aria-label", e.getAriaLabel()), i(), g(e.contentClass()), i(), c(e.showSpinner() ? 2 : -1), i(), c(e.showDots() ? 3 : -1), i(), c(e.showPulse() ? 4 : -1), i(), c(e.showSkeleton() ? 5 : -1), i(), c(e.shouldShowMessage() ? 6 : -1), i(), c(e.shouldShowSubmessage() ? 7 : -1), i(), c(e.shouldShowProgress() ? 8 : -1), i(), c(e.effectiveConfig().cancellable ? 9 : -1), i(2), c(e.shouldShowProgress() ? 11 : -1), i(), c(e.effectiveConfig().overlay ? -1 : 12)
    }
}
var Z = (() => {
    let t = class t {
        constructor() {
            this.isLoading = !1, this.config = {}, this.defaultConfig = {
                message: "Loading...",
                submessage: "",
                size: "medium",
                type: "spinner",
                progress: 0,
                showProgress: !1,
                cancellable: !1,
                overlay: !0,
                transparent: !1,
                context: "Loading content"
            }, this.effectiveConfig = m(() => y(y({}, this.defaultConfig), this.config)), this.containerClass = m(() => {
                let o = this.effectiveConfig();
                if (!o.overlay) return "flex items-center justify-center p-8";
                let a = "fixed inset-0 z-50 flex items-center justify-center",
                    p = o.transparent ? "bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70" : "bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90";
                return `${a} ${p} backdrop-blur-sm`
            }), this.contentClass = m(() => {
                let o = this.effectiveConfig();
                return "bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 max-w-sm mx-4 text-center"
            }), this.spinnerClass = m(() => {
                let o = this.effectiveConfig();
                return `${this.getSizeClasses(o.size)} text-blue-600 dark:text-blue-400`
            }), this.messageClass = m(() => `${this.effectiveConfig().size==="small"?"text-sm":"text-base"} text-gray-900 dark:text-white font-medium`), this.submessageClass = m(() => `${this.effectiveConfig().size==="small"?"text-xs":"text-sm"} text-gray-600 dark:text-gray-400`), this.showSpinner = m(() => this.effectiveConfig().type === "spinner"), this.showDots = m(() => this.effectiveConfig().type === "dots"), this.showPulse = m(() => this.effectiveConfig().type === "pulse"), this.showSkeleton = m(() => this.effectiveConfig().type === "skeleton"), this.progressPercentage = m(() => {
                let o = this.effectiveConfig();
                return Math.max(0, Math.min(100, o.progress))
            })
        }
        getSizeClasses(o) {
            switch (o) {
                case "small":
                    return "w-5 h-5";
                case "medium":
                    return "w-8 h-8";
                case "large":
                    return "w-12 h-12";
                default:
                    return "w-8 h-8"
            }
        }
        getDotSizeClass() {
            switch (this.effectiveConfig().size) {
                case "small":
                    return "w-2 h-2";
                case "medium":
                    return "w-3 h-3";
                case "large":
                    return "w-4 h-4";
                default:
                    return "w-3 h-3"
            }
        }
        getPulseContainerClass() {
            switch (this.effectiveConfig().size) {
                case "small":
                    return "w-16 h-16";
                case "medium":
                    return "w-20 h-20";
                case "large":
                    return "w-24 h-24";
                default:
                    return "w-20 h-20"
            }
        }
        getSkeletonHeight() {
            switch (this.effectiveConfig().size) {
                case "small":
                    return "h-4";
                case "medium":
                    return "h-5";
                case "large":
                    return "h-6";
                default:
                    return "h-5"
            }
        }
        getAriaLabel() {
            let o = this.effectiveConfig();
            return o.showProgress && o.progress > 0 ? `${o.context}, ${o.progress}% complete` : o.context
        }
        shouldShowMessage() {
            return !!this.effectiveConfig().message
        }
        shouldShowSubmessage() {
            return !!this.effectiveConfig().submessage
        }
        shouldShowProgress() {
            let o = this.effectiveConfig();
            return o.showProgress && o.progress > 0
        }
        getLoadingDots() {
            return [1, 2, 3]
        }
        getSkeletonLines() {
            return [1, 2, 3, 4]
        }
        getPulseRings() {
            return [1, 2, 3]
        }
    };
    t.\u0275fac = function(a) {
        return new(a || t)
    }, t.\u0275cmp = w({
        type: t,
        selectors: [
            ["qualtrim-loading-overlay"]
        ],
        inputs: {
            isLoading: "isLoading",
            config: "config"
        },
        decls: 1,
        vars: 1,
        consts: [
            ["role", "status"],
            [1, "mb-4"],
            [1, "mb-4", "flex", "justify-center", "space-x-2"],
            [1, "mb-4", "flex", "justify-center"],
            [1, "mb-4", "space-y-3"],
            [1, "mb-2", 3, "class"],
            [3, "class"],
            [1, "mt-4"],
            ["aria-live", "polite", "aria-atomic", "false", 1, "sr-only"],
            ["role", "status", 1, "flex", "items-center", "justify-center", "space-x-3", "p-6"],
            ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "mx-auto"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"],
            [1, "bg-blue-600", "dark:bg-blue-400", "rounded-full", "animate-pulse", 3, "class", "animation-delay"],
            [1, "bg-blue-600", "dark:bg-blue-400", "rounded-full", "animate-pulse"],
            [1, "relative"],
            [1, "absolute", "inset-0", "rounded-full", "border-2", "border-blue-600", "dark:border-blue-400", "opacity-20", "animate-ping", 3, "animation-delay"],
            [1, "absolute", "inset-2", "bg-blue-600", "dark:bg-blue-400", "rounded-full"],
            [1, "absolute", "inset-0", "rounded-full", "border-2", "border-blue-600", "dark:border-blue-400", "opacity-20", "animate-ping"],
            [1, "bg-gray-200", "dark:bg-gray-700", "rounded-lg", "animate-pulse", 3, "class", "width", "margin-left", "margin-right"],
            [1, "bg-gray-200", "dark:bg-gray-700", "rounded-lg", "animate-pulse"],
            [1, "mb-2"],
            [1, "flex", "justify-between", "items-center", "mb-2"],
            [1, "text-sm", "text-gray-600", "dark:text-gray-400"],
            [1, "text-sm", "font-medium", "text-gray-900", "dark:text-white"],
            [1, "w-full", "bg-gray-200", "dark:bg-gray-700", "rounded-full", "h-2"],
            ["role", "progressbar", 1, "bg-blue-600", "dark:bg-blue-400", "h-2", "rounded-full", "transition-all", "duration-300", "ease-out"],
            [1, "px-4", "py-2", "text-sm", "font-medium", "text-gray-600", "dark:text-gray-400", "hover:text-gray-800", "dark:hover:text-gray-200", "bg-gray-100", "dark:bg-gray-700", "hover:bg-gray-200", "dark:hover:bg-gray-600", "rounded-lg", "transition-colors", "duration-200", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:ring-offset-2", "dark:focus:ring-offset-gray-800"],
            ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", 3, "class"],
            ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin"]
        ],
        template: function(a, p) {
            a & 1 && l(0, K, 13, 17), a & 2 && c(p.isLoading ? 0 : -1)
        },
        dependencies: [E],
        styles: ['[_nghost-%COMP%]{display:contents}@keyframes _ngcontent-%COMP%_enhanced-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes _ngcontent-%COMP%_pulse-dot{0%,80%,to{transform:scale(.8);opacity:.5}40%{transform:scale(1);opacity:1}}@keyframes _ngcontent-%COMP%_pulse-ring{0%{transform:scale(.8);opacity:1}to{transform:scale(2.4);opacity:0}}@keyframes _ngcontent-%COMP%_skeleton-shimmer{0%{background-position:-200px 0}to{background-position:calc(200px + 100%) 0}}@keyframes _ngcontent-%COMP%_float{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes _ngcontent-%COMP%_glow{0%,to{opacity:1}50%{opacity:.5}}.loading-overlay[_ngcontent-%COMP%]{backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);transition:all .3s ease-in-out}.loading-overlay.entering[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fade-in .3s ease-out}.loading-overlay.exiting[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fade-out .3s ease-in}@keyframes _ngcontent-%COMP%_fade-in{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_fade-out{0%{opacity:1}to{opacity:0}}.loading-content[_ngcontent-%COMP%]{transform:translateY(0);animation:_ngcontent-%COMP%_float 3s ease-in-out infinite}.loading-content.entering[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_scale-in .4s ease-out,_ngcontent-%COMP%_float 3s ease-in-out infinite .4s}@keyframes _ngcontent-%COMP%_scale-in{0%{transform:scale(.8) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}.loading-spinner[_ngcontent-%COMP%]{filter:drop-shadow(0 0 8px currentColor)}.loading-spinner.animate-spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_enhanced-spin 1s linear infinite}.loading-spinner[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:-4px;border-radius:50%;background:currentColor;opacity:.1;animation:_ngcontent-%COMP%_glow 2s ease-in-out infinite;z-index:-1}.loading-dots[_ngcontent-%COMP%]   .loading-dot[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse-dot 1.4s ease-in-out infinite both}.loading-dots[_ngcontent-%COMP%]   .loading-dot[_ngcontent-%COMP%]:nth-child(1){animation-delay:-.32s}.loading-dots[_ngcontent-%COMP%]   .loading-dot[_ngcontent-%COMP%]:nth-child(2){animation-delay:-.16s}.loading-dots[_ngcontent-%COMP%]   .loading-dot[_ngcontent-%COMP%]:nth-child(3){animation-delay:0s}.loading-pulse[_ngcontent-%COMP%]   .pulse-ring[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse-ring 1.5s cubic-bezier(.215,.61,.355,1) infinite}.loading-pulse[_ngcontent-%COMP%]   .pulse-ring[_ngcontent-%COMP%]:nth-child(1){animation-delay:0s}.loading-pulse[_ngcontent-%COMP%]   .pulse-ring[_ngcontent-%COMP%]:nth-child(2){animation-delay:.5s}.loading-pulse[_ngcontent-%COMP%]   .pulse-ring[_ngcontent-%COMP%]:nth-child(3){animation-delay:1s}.loading-skeleton[_ngcontent-%COMP%]   .skeleton-line[_ngcontent-%COMP%]{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 37%,#f0f0f0 63%);background-size:400% 100%;animation:_ngcontent-%COMP%_skeleton-shimmer 1.5s ease-in-out infinite}.dark[_ngcontent-%COMP%]   .loading-skeleton[_ngcontent-%COMP%]   .skeleton-line[_ngcontent-%COMP%]{background:linear-gradient(90deg,#374151 25%,#4b5563 37%,#374151 63%)}.loading-skeleton[_ngcontent-%COMP%]   .skeleton-line[_ngcontent-%COMP%]:nth-child(1){animation-delay:0s}.loading-skeleton[_ngcontent-%COMP%]   .skeleton-line[_ngcontent-%COMP%]:nth-child(2){animation-delay:.1s}.loading-skeleton[_ngcontent-%COMP%]   .skeleton-line[_ngcontent-%COMP%]:nth-child(3){animation-delay:.2s}.loading-skeleton[_ngcontent-%COMP%]   .skeleton-line[_ngcontent-%COMP%]:nth-child(4){animation-delay:.3s}.progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]{position:relative;overflow:hidden}.progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,.3) 50%,transparent 70%);animation:_ngcontent-%COMP%_progress-shine 2s ease-in-out infinite}@keyframes _ngcontent-%COMP%_progress-shine{0%{transform:translate(-100%)}to{transform:translate(100%)}}.cancel-button[_ngcontent-%COMP%]{position:relative;overflow:hidden}.cancel-button[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,.1) 50%,transparent 70%);transform:translate(-100%);transition:transform .5s ease-out}.cancel-button[_ngcontent-%COMP%]:hover:before{transform:translate(100%)}.cancel-button[_ngcontent-%COMP%]:hover{transform:translateY(-1px);box-shadow:0 4px 8px -2px #0000001a}.cancel-button[_ngcontent-%COMP%]:active{transform:translateY(0)}.loading-inline[_ngcontent-%COMP%]   .inline-spinner[_ngcontent-%COMP%]{margin-right:.75rem}.loading-inline[_ngcontent-%COMP%]   .inline-dots[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.loading-inline[_ngcontent-%COMP%]   .inline-message[_ngcontent-%COMP%]{white-space:nowrap}.loading-small[_ngcontent-%COMP%]   .loading-content[_ngcontent-%COMP%]{padding:1rem}.loading-small[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]{width:1.25rem;height:1.25rem}.loading-small[_ngcontent-%COMP%]   .loading-dots[_ngcontent-%COMP%]   .loading-dot[_ngcontent-%COMP%]{width:.5rem;height:.5rem}.loading-large[_ngcontent-%COMP%]   .loading-content[_ngcontent-%COMP%]{padding:2rem;max-width:24rem}.loading-large[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]{width:3rem;height:3rem}.loading-large[_ngcontent-%COMP%]   .loading-dots[_ngcontent-%COMP%]   .loading-dot[_ngcontent-%COMP%]{width:1rem;height:1rem}.dark[_nghost-%COMP%]   .loading-overlay[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .loading-overlay[_ngcontent-%COMP%]{-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.dark[_nghost-%COMP%]   .loading-content[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .loading-content[_ngcontent-%COMP%]{box-shadow:0 25px 50px -12px #00000080}.dark[_nghost-%COMP%]   .loading-spinner[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .loading-spinner[_ngcontent-%COMP%]{filter:drop-shadow(0 0 12px currentColor)}.dark[_nghost-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]:after, .dark   [_nghost-%COMP%]   .progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]:after{background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,.2) 50%,transparent 70%)}@media (prefers-contrast: high){.loading-content[_ngcontent-%COMP%]{border:2px solid currentColor}.loading-spinner[_ngcontent-%COMP%], .loading-dots[_ngcontent-%COMP%]   .loading-dot[_ngcontent-%COMP%]{opacity:1;filter:contrast(1.5)}.cancel-button[_ngcontent-%COMP%]{border:2px solid currentColor;font-weight:600}.progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]{border:1px solid currentColor}}@media (prefers-reduced-motion: reduce){.loading-spinner[_ngcontent-%COMP%], .loading-dots[_ngcontent-%COMP%]   .loading-dot[_ngcontent-%COMP%], .loading-pulse[_ngcontent-%COMP%]   .pulse-ring[_ngcontent-%COMP%], .loading-skeleton[_ngcontent-%COMP%]   .skeleton-line[_ngcontent-%COMP%], .loading-content[_ngcontent-%COMP%], .progress-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]:after, .cancel-button[_ngcontent-%COMP%]:before{animation:none;transition:none}.loading-spinner[_ngcontent-%COMP%]{animation:enhanced-spin 4s linear infinite}.cancel-button[_ngcontent-%COMP%]:hover{transform:none;box-shadow:none}}.cancel-button[_ngcontent-%COMP%]:focus-visible{outline:2px solid currentColor;outline-offset:2px}@media (max-width: 640px){.loading-content[_ngcontent-%COMP%]{margin:1rem;padding:1.5rem;max-width:calc(100vw - 2rem)}.loading-inline[_ngcontent-%COMP%]{flex-direction:column;align-items:center;text-align:center}.loading-inline[_ngcontent-%COMP%]   .inline-spinner[_ngcontent-%COMP%], .loading-inline[_ngcontent-%COMP%]   .inline-dots[_ngcontent-%COMP%]{margin-right:0;margin-bottom:.5rem}.loading-inline[_ngcontent-%COMP%]   .inline-message[_ngcontent-%COMP%]{white-space:normal}}@media print{.loading-overlay[_ngcontent-%COMP%]{position:relative!important;background:#fff!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}.loading-content[_ngcontent-%COMP%]{box-shadow:none!important;border:1px solid #000;animation:none!important;transform:none!important}.loading-spinner[_ngcontent-%COMP%], .loading-dots[_ngcontent-%COMP%], .loading-pulse[_ngcontent-%COMP%], .cancel-button[_ngcontent-%COMP%]{display:none!important}.loading-message[_ngcontent-%COMP%]{color:#000!important}}.loading-spinner[_ngcontent-%COMP%], .loading-dots[_ngcontent-%COMP%]   .loading-dot[_ngcontent-%COMP%], .loading-pulse[_ngcontent-%COMP%]   .pulse-ring[_ngcontent-%COMP%], .loading-content[_ngcontent-%COMP%]{will-change:transform,opacity}.sr-only[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}']
    });
    let n = t;
    return n
})();
var an = (() => {
    let t = class t {
        constructor() {
            this.toasts = O([])
        }
        show(o, a = "success", p = 4e3) {
            let v = `toast-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
            this.toasts.update(L => [...L, {
                id: v,
                message: o,
                type: a
            }]), setTimeout(() => this.dismiss(v), p)
        }
        dismiss(o) {
            this.toasts.update(a => a.filter(p => p.id !== o))
        }
    };
    t.\u0275fac = function(a) {
        return new(a || t)
    }, t.\u0275prov = x({
        token: t,
        factory: t.\u0275fac,
        providedIn: "root"
    });
    let n = t;
    return n
})();
var cn = (() => {
    let t = class t {
        constructor() {
            this.refreshTrigger = O(0)
        }
        triggerRefresh() {
            this.refreshTrigger.update(o => o + 1)
        }
    };
    t.\u0275fac = function(a) {
        return new(a || t)
    }, t.\u0275prov = x({
        token: t,
        factory: t.\u0275fac,
        providedIn: "root"
    });
    let n = t;
    return n
})();
export {
    Z as a, an as b, cn as c
};