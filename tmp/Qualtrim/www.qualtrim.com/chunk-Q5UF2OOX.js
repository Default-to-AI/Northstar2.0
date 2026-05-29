import {
    ed as Y,
    u as J
} from "./chunk-NO4XYT7V.js";
import {
    oa as U
} from "./chunk-SUZ3XW2S.js";
import {
    $b as S,
    Aa as _,
    Ba as m,
    Ca as y,
    Cb as $,
    Dc as u,
    Ec as D,
    Fa as j,
    Fc as T,
    Hb as B,
    Ia as L,
    Id as N,
    Sb as H,
    Ub as h,
    Vc as R,
    Wb as f,
    ac as n,
    bc as o,
    cc as c,
    dd as F,
    fb as G,
    ie as Q,
    jc as C,
    kb as s,
    nc as x,
    pb as V,
    pc as p,
    tc as A,
    ua as W,
    uc as z,
    vc as I,
    yc as O,
    za as v,
    zc as q
} from "./chunk-7LZCJGQ2.js";
var K = ["menuPopover"],
    X = ["desktopMenuPopover"],
    Z = (e, a) => ({
        "bg-white/30 text-white opacity-100": e,
        "bg-black/70 text-white opacity-0 group-hover:opacity-100 hover:bg-white/30": a
    });

function ee(e, a) {
    if (e & 1 && c(0, "img", 5), e & 2) {
        let i = p();
        S("src", i.video.thumbnailImg, G)("alt", i.video.title)
    }
}

function te(e, a) {
    e & 1 && c(0, "div", 6)
}

function ie(e, a) {
    e & 1 && (n(0, "span", 7), u(1, " NEW "), o())
}

function ne(e, a) {
    e & 1 && (n(0, "span", 8), m(), n(1, "svg", 33), c(2, "path", 34), o(), u(3, " Watched "), o())
}

function oe(e, a) {
    if (e & 1 && (n(0, "span", 9), u(1), o()), e & 2) {
        let i = p();
        s(), T(" ", i.formatDuration(i.video.length), " ")
    }
}

function re(e, a) {
    if (e & 1 && (n(0, "div", 10), c(1, "div", 35), o()), e & 2) {
        let i = p();
        s(), q("width", i.percentWatched, "%")
    }
}

function ae(e, a) {
    if (e & 1) {
        let i = C();
        n(0, "button", 36), x("click", function(r) {
            v(i);
            let t = p();
            return _(t.onEdit(r))
        }), m(), n(1, "svg", 37), c(2, "path", 38), o()()
    }
}

function le(e, a) {
    e & 1 && (m(), n(0, "svg", 40), c(1, "circle", 41)(2, "path", 42), o())
}

function se(e, a) {
    e & 1 && (m(), n(0, "svg", 13), c(1, "path", 34), o())
}

function de(e, a) {
    e & 1 && (m(), n(0, "svg", 13), c(1, "path", 43), o())
}

function ce(e, a) {
    if (e & 1) {
        let i = C();
        n(0, "button", 39), x("click", function(r) {
            v(i);
            let t = p();
            return _(t.onToggleSave(r))
        }), h(1, le, 3, 0, ":svg:svg", 40)(2, se, 2, 0, ":svg:svg", 13)(3, de, 2, 0, ":svg:svg", 13), o()
    }
    if (e & 2) {
        let i = p();
        S("ngClass", R(4, Z, i.isSaved, !i.isSaved))("disabled", i.isSaving), H("aria-label", i.isSaved ? "Remove from My List" : "Add to My List"), s(), f(i.isSaving ? 1 : i.isSaved ? 2 : 3)
    }
}

function pe(e, a) {
    if (e & 1) {
        let i = C();
        n(0, "button", 46), x("click", function(r) {
            v(i);
            let t = p(2);
            return _(t.onMenuAction(r, "edit"))
        }), m(), n(1, "svg", 13), c(2, "path", 48), o(), u(3, " Edit "), o()
    }
}

function me(e, a) {
    e & 1 && (m(), n(0, "svg", 13), c(1, "path", 34), o(), u(2, " Remove from My List "))
}

function ue(e, a) {
    e & 1 && (m(), n(0, "svg", 13), c(1, "path", 43), o(), u(2, " Add to My List "))
}

function he(e, a) {
    if (e & 1) {
        let i = C();
        n(0, "button", 49), x("click", function(r) {
            v(i);
            let t = p(2);
            return _(t.onMenuAction(r, "save"))
        }), h(1, me, 3, 0)(2, ue, 3, 0), o()
    }
    if (e & 2) {
        let i = p(2);
        S("disabled", i.isSaving), s(), f(i.isSaved ? 1 : 2)
    }
}

function fe(e, a) {
    if (e & 1) {
        let i = C();
        n(0, "div", 44), h(1, pe, 4, 0, "button", 45), n(2, "button", 46), x("click", function(r) {
            v(i);
            let t = p();
            return _(t.onMenuAction(r, "info"))
        }), m(), n(3, "svg", 13), c(4, "path", 14), o(), u(5, " Details "), o(), h(6, he, 3, 2, "button", 47), y(), n(7, "button", 46), x("click", function(r) {
            v(i);
            let t = p();
            return _(t.onMenuAction(r, "mark-watched"))
        }), m(), n(8, "svg", 13), c(9, "path", 34), o(), u(10), o()()
    }
    if (e & 2) {
        let i = p();
        s(), f(i.isAdmin() ? 1 : -1), s(5), f(i.showSaveButton ? 6 : -1), s(4), T(" ", i.isWatched ? "Mark as unwatched" : "Mark as watched", " ")
    }
}

function ge(e, a) {
    if (e & 1 && (n(0, "span", 29), u(1), o()), e & 2) {
        let i = p();
        s(), T(" ", i.categories[0].name, " ")
    }
}

function ve(e, a) {
    e & 1 && (n(0, "span", 30), u(1, "Watched"), o())
}

function _e(e, a) {
    if (e & 1 && (n(0, "span", 31), u(1), o()), e & 2) {
        let i = p();
        s(), T("", i.minutesLeft, "min left")
    }
}

function be(e, a) {
    if (e & 1 && (n(0, "span", 32), u(1), o()), e & 2) {
        let i = p();
        s(), D(i.relativeDate(i.video.createdAt))
    }
}
var Pe = (() => {
    let a = class a {
        constructor() {
            this._currentUserService = W(J), this._destroyRef = W(j), this.categories = [], this.showCategories = !0, this.showSaveButton = !1, this.isAdmin = L(!1), this.isSaved = !1, this.isSaving = !1, this.percentWatched = 0, this.playVideo = new V, this.editVideo = new V, this.toggleSave = new V, this.moreInfo = new V, this.watchedChanged = new V
        }
        get isNew() {
            return this.video ? .publishedAt ? U(new Date(this.video.publishedAt)) : !1
        }
        get isWatched() {
            return this.userProgress !== void 0 ? !!this.userProgress ? .watchedAt : this.percentWatched >= 90
        }
        get minutesLeft() {
            return !this.video.length || this.percentWatched <= 0 ? 0 : Math.max(1, Math.ceil(this.video.length * (100 - this.percentWatched) / 100 / 60))
        }
        ngOnInit() {
            this._currentUserService.currentUser$.pipe(Q(this._destroyRef)).subscribe(l => this.isAdmin.set(l ? .isAdmin ? ? !1))
        }
        onEdit(l) {
            l.stopPropagation(), this.editVideo.emit(this.video.id)
        }
        onToggleSave(l) {
            l.stopPropagation(), this.toggleSave.emit(this.video.id)
        }
        onMoreInfo(l) {
            l.stopPropagation(), this.moreInfo.emit(this.video.id)
        }
        onMenuToggle(l) {
            l.stopPropagation(), l.preventDefault(), this.menuPopover ? .toggle(), this.desktopMenuPopover ? .toggle()
        }
        onMenuAction(l, r) {
            if (l.stopPropagation(), this.menuPopover ? .close(), this.desktopMenuPopover ? .close(), r === "edit") this.editVideo.emit(this.video.id);
            else if (r === "info") this.moreInfo.emit(this.video.id);
            else if (r === "save") this.toggleSave.emit(this.video.id);
            else if (r === "mark-watched") {
                let t = this.isWatched ? null : new Date;
                this.watchedChanged.emit({
                    videoId: this.video.id,
                    watchedAt: t
                })
            }
        }
        formatDuration(l) {
            let r = Math.floor(l / 3600),
                t = Math.floor(l % 3600 / 60),
                d = Math.floor(l % 60),
                b = g => g.toString().padStart(2, "0");
            return r > 0 ? `${r}:${b(t)}:${b(d)}` : `${b(t)}:${b(d)}`
        }
        relativeDate(l) {
            let r = Date.now(),
                t = new Date(l).getTime(),
                d = r - t,
                b = Math.floor(d / 1e3),
                g = Math.floor(b / 60),
                k = Math.floor(g / 60),
                w = Math.floor(k / 24),
                M = Math.floor(w / 7),
                E = Math.floor(w / 30),
                P = Math.floor(w / 365);
            return P > 0 ? P === 1 ? "1 year ago" : `${P} years ago` : E > 0 ? E === 1 ? "1 month ago" : `${E} months ago` : M > 0 ? M === 1 ? "1 week ago" : `${M} weeks ago` : w > 0 ? w === 1 ? "1 day ago" : `${w} days ago` : k > 0 ? k === 1 ? "1 hour ago" : `${k} hours ago` : g > 0 ? g === 1 ? "1 minute ago" : `${g} minutes ago` : "Just now"
        }
    };
    a.\u0275fac = function(r) {
        return new(r || a)
    }, a.\u0275cmp = $({
        type: a,
        selectors: [
            ["qualtrim-video-thumbnail-card"]
        ],
        viewQuery: function(r, t) {
            if (r & 1 && (A(K, 5), A(X, 5)), r & 2) {
                let d;
                z(d = I()) && (t.menuPopover = d.first), z(d = I()) && (t.desktopMenuPopover = d.first)
            }
        },
        inputs: {
            video: "video",
            categories: "categories",
            showCategories: "showCategories",
            showSaveButton: "showSaveButton",
            isSaved: "isSaved",
            isSaving: "isSaving",
            percentWatched: "percentWatched",
            userProgress: "userProgress"
        },
        outputs: {
            playVideo: "playVideo",
            editVideo: "editVideo",
            toggleSave: "toggleSave",
            moreInfo: "moreInfo",
            watchedChanged: "watchedChanged"
        },
        decls: 39,
        vars: 17,
        consts: [
            ["menuPopover", "qualtrimPopover"],
            ["desktopMenuPopover", "qualtrimPopover"],
            ["cardMenuContent", ""],
            ["tabindex", "0", 1, "cursor-pointer", "group", "transition-transform", "duration-300", "hover:scale-105", "hover:z-10", "focus-visible:ring-2", "focus-visible:ring-blue-500", "focus-visible:outline-none", "rounded-lg", 3, "click", "keydown.enter"],
            [1, "relative", "rounded-lg", "overflow-hidden", "aspect-video", "bg-gray-800"],
            ["loading", "lazy", 1, "object-cover", "w-full", "h-full", 3, "src", "alt"],
            [1, "w-full", "h-full", "bg-gradient-to-br", "from-gray-700", "to-gray-900"],
            [1, "absolute", "top-2", "left-2", "z-[2]", "px-2", "py-0.5", "rounded", "text-xs", "font-bold", "bg-red-600", "text-white", "tracking-wide"],
            [1, "absolute", "top-2", "right-2", "bg-black/70", "text-green-400", "text-xs", "font-medium", "px-2", "py-0.5", "rounded", "flex", "items-center", "gap-1"],
            [1, "absolute", "top-2", "right-2", "bg-black/70", "text-white", "text-xs", "font-medium", "px-2", "py-0.5", "rounded"],
            [1, "absolute", "bottom-0", "left-0", "right-0", "h-1", "bg-gray-700", "z-[3]"],
            ["type", "button", "aria-label", "Edit video", 1, "absolute", "top-2", "left-2", "bg-black/70", "text-white", "w-8", "h-8", "rounded-full", "items-center", "justify-center", "hover:bg-blue-600", "transition", "z-10", "hidden", "lg:flex", "opacity-0", "group-hover:opacity-100"],
            ["type", "button", "aria-label", "Video details", 1, "absolute", "bottom-2", "left-2", "z-[2]", "w-8", "h-8", "rounded-full", "items-center", "justify-center", "bg-black/70", "text-white", "opacity-0", "group-hover:opacity-100", "hover:bg-white/30", "transition-all", "duration-200", "hidden", "lg:flex", 3, "click"],
            ["fill", "none", "stroke", "currentColor", "stroke-width", "2", "viewBox", "0 0 24 24", 1, "w-4", "h-4"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"],
            [1, "absolute", "inset-0", "items-center", "justify-center", "opacity-0", "group-hover:opacity-100", "transition-opacity", "bg-black/30", "z-[1]", "hidden", "lg:flex"],
            [1, "w-14", "h-14", "bg-white/20", "backdrop-blur", "rounded-full", "flex", "items-center", "justify-center"],
            ["fill", "currentColor", "viewBox", "0 0 24 24", 1, "w-7", "h-7", "text-white"],
            ["d", "M8 5v14l11-7z"],
            ["type", "button", 1, "absolute", "bottom-2", "right-2", "z-[2]", "w-8", "h-8", "rounded-full", "items-center", "justify-center", "transition-all", "duration-200", "hidden", "lg:flex", 3, "ngClass", "disabled"],
            ["type", "button", "aria-label", "Video options", "popoverPlacement", "top-end", 1, "absolute", "bottom-2", "right-2", "z-[3]", "lg:hidden", "w-8", "h-8", "rounded-full", "flex", "items-center", "justify-center", "bg-black/70", "text-white", "hover:bg-white/30", "transition-all", "duration-200", 3, "click", "qualtrimPopover", "popoverOffset", "popoverCloseOnScroll", "popoverTrapFocus"],
            ["fill", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"],
            ["cx", "12", "cy", "5", "r", "2"],
            ["cx", "12", "cy", "12", "r", "2"],
            ["cx", "12", "cy", "19", "r", "2"],
            ["type", "button", "aria-label", "Video options", "popoverPlacement", "top-start", 1, "absolute", "bottom-2", "left-12", "z-[3]", "hidden", "lg:flex", "w-8", "h-8", "rounded-full", "items-center", "justify-center", "bg-black/70", "text-white", "opacity-0", "group-hover:opacity-100", "hover:bg-white/30", "transition-all", "duration-200", 3, "click", "qualtrimPopover", "popoverOffset", "popoverCloseOnScroll", "popoverTrapFocus"],
            [1, "pt-2.5"],
            [1, "font-display", "text-white", "text-sm", "font-semibold", "truncate", "m-0", "group-hover:text-gray-200", "transition-colors"],
            [1, "flex", "items-center", "gap-2", "mt-1.5", "min-w-0"],
            [1, "bg-blue-500/10", "text-blue-400", "text-xs", "px-2", "py-0.5", "rounded", "truncate", "max-w-[140px]"],
            [1, "text-green-400", "text-xs", "flex-shrink-0"],
            [1, "text-gray-400", "text-xs", "flex-shrink-0"],
            [1, "text-gray-500", "text-xs", "flex-shrink-0"],
            ["fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "viewBox", "0 0 24 24", 1, "w-3", "h-3"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M5 13l4 4L19 7"],
            [1, "h-full", "bg-red-500", "transition-all"],
            ["type", "button", "aria-label", "Edit video", 1, "absolute", "top-2", "left-2", "bg-black/70", "text-white", "w-8", "h-8", "rounded-full", "items-center", "justify-center", "hover:bg-blue-600", "transition", "z-10", "hidden", "lg:flex", "opacity-0", "group-hover:opacity-100", 3, "click"],
            ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"],
            ["type", "button", 1, "absolute", "bottom-2", "right-2", "z-[2]", "w-8", "h-8", "rounded-full", "items-center", "justify-center", "transition-all", "duration-200", "hidden", "lg:flex", 3, "click", "ngClass", "disabled"],
            ["fill", "none", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "animate-spin"],
            ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"],
            ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 4v16m8-8H4"],
            [1, "w-44", "bg-gray-900/95", "backdrop-blur-xl", "border", "border-gray-700/50", "rounded-xl", "shadow-2xl", "shadow-black/50", "overflow-hidden", "py-1"],
            ["type", "button", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "text-gray-300", "hover:text-white", "hover:bg-white/5", "text-sm", "transition-colors", "border-0", "bg-transparent", "cursor-pointer", "text-left"],
            ["type", "button", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "text-gray-300", "hover:text-white", "hover:bg-white/5", "text-sm", "transition-colors", "border-0", "bg-transparent", "cursor-pointer", "text-left", 3, "click"],
            ["type", "button", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "text-gray-300", "hover:text-white", "hover:bg-white/5", "text-sm", "transition-colors", "border-0", "bg-transparent", "cursor-pointer", "text-left", 3, "disabled"],
            ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"],
            ["type", "button", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "text-gray-300", "hover:text-white", "hover:bg-white/5", "text-sm", "transition-colors", "border-0", "bg-transparent", "cursor-pointer", "text-left", 3, "click", "disabled"]
        ],
        template: function(r, t) {
            if (r & 1) {
                let d = C();
                n(0, "div", 3), x("click", function() {
                    return v(d), _(t.playVideo.emit(t.video.id))
                })("keydown.enter", function() {
                    return v(d), _(t.playVideo.emit(t.video.id))
                }), n(1, "div", 4), h(2, ee, 1, 2, "img", 5)(3, te, 1, 0, "div", 6), h(4, ie, 2, 0, "span", 7), h(5, ne, 4, 0, "span", 8)(6, oe, 2, 1, "span", 9), h(7, re, 2, 2, "div", 10), h(8, ae, 3, 0, "button", 11), n(9, "button", 12), x("click", function(g) {
                    return v(d), _(t.onMoreInfo(g))
                }), m(), n(10, "svg", 13), c(11, "path", 14), o()(), y(), n(12, "div", 15)(13, "div", 16), m(), n(14, "svg", 17), c(15, "path", 18), o()()(), h(16, ce, 4, 7, "button", 19), y(), n(17, "button", 20, 0), x("click", function(g) {
                    return v(d), _(t.onMenuToggle(g))
                }), m(), n(19, "svg", 21), c(20, "circle", 22)(21, "circle", 23)(22, "circle", 24), o()(), y(), n(23, "button", 25, 1), x("click", function(g) {
                    return v(d), _(t.onMenuToggle(g))
                }), m(), n(25, "svg", 21), c(26, "circle", 22)(27, "circle", 23)(28, "circle", 24), o()()(), B(29, fe, 11, 3, "ng-template", null, 2, F), y(), n(31, "div", 26)(32, "p", 27), u(33), o(), n(34, "div", 28), h(35, ge, 2, 1, "span", 29), h(36, ve, 2, 0, "span", 30)(37, _e, 2, 1, "span", 31)(38, be, 2, 1, "span", 32), o()()()
            }
            if (r & 2) {
                let d = O(30);
                s(2), f(t.video.thumbnailImg ? 2 : 3), s(2), f(t.isNew ? 4 : -1), s(), f(t.isWatched ? 5 : t.video.length > 0 ? 6 : -1), s(2), f(t.percentWatched > 0 && !t.isWatched ? 7 : -1), s(), f(t.isAdmin() ? 8 : -1), s(8), f(t.showSaveButton ? 16 : -1), s(), S("qualtrimPopover", d)("popoverOffset", 4)("popoverCloseOnScroll", !0)("popoverTrapFocus", !1), s(6), S("qualtrimPopover", d)("popoverOffset", 4)("popoverCloseOnScroll", !0)("popoverTrapFocus", !1), s(10), D(t.video.title), s(2), f(t.showCategories && t.categories.length > 0 ? 35 : -1), s(), f(t.isWatched ? 36 : t.percentWatched > 0 && t.minutesLeft > 0 ? 37 : 38)
            }
        },
        dependencies: [N, Y],
        encapsulation: 2
    });
    let e = a;
    return e
})();
export {
    Pe as a
};