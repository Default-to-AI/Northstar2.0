import {
    a as ht,
    b as et
} from "./chunk-E27E7IRY.js";
import {
    Kc as Ze,
    Lc as Ke,
    Va as re,
    Wa as D,
    Xa as $,
    c as Pe,
    d as H,
    f as L,
    g as se,
    gb as Ye,
    i as N,
    ud as Je,
    vd as Xe
} from "./chunk-NO4XYT7V.js";
import {
    a as ze,
    c as Re,
    f as He,
    g as Ne,
    h as Ue,
    k as $e,
    o as je,
    p as We,
    x as Ge,
    z as Qe
} from "./chunk-6FMDYVJO.js";
import {
    i as U,
    k as qe
} from "./chunk-SUZ3XW2S.js";
import {
    $b as u,
    $c as ie,
    Aa as g,
    Ac as k,
    Cb as z,
    Db as Ae,
    Dc as S,
    Eb as we,
    Ec as O,
    Hb as C,
    I as ue,
    Jd as Le,
    Kd as De,
    M as ye,
    N as fe,
    Na as Y,
    Od as Ve,
    Pd as Be,
    Q as G,
    Rc as M,
    Sb as K,
    Ub as xe,
    V as Q,
    Vb as Te,
    Wb as Ie,
    Xc as te,
    Xd as R,
    Y as ge,
    Zb as ke,
    _b as Me,
    a as he,
    ac as c,
    ad as ne,
    bc as y,
    cc as T,
    da as q,
    dd as F,
    eb as Oe,
    f as le,
    fb as Ee,
    g as x,
    ga as P,
    ha as _e,
    ja as ve,
    jc as I,
    kb as m,
    m as j,
    nc as v,
    o as ce,
    p as W,
    pa as Se,
    pb as _,
    pc as p,
    pd as ae,
    qa as Ce,
    r as B,
    tc as J,
    uc as X,
    vb as Z,
    vc as ee,
    w as pe,
    wb as d,
    x as de,
    y as me,
    yb as be,
    yc as A,
    za as f,
    zc as Fe
} from "./chunk-7LZCJGQ2.js";
import {
    f as ot
} from "./chunk-TXK3PDXI.js";
var pt = ["ulElement"],
    dt = ["liElements"],
    mt = (a, n, o, e) => ({
        matches: a,
        itemTemplate: n,
        query: o,
        $implicit: e
    }),
    ut = (a, n, o, e) => ({
        item: a,
        index: n,
        match: o,
        query: e
    });

function yt(a, n) {}

function ft(a, n) {
    if (a & 1 && T(0, "span", 4), a & 2) {
        let o = n.match,
            e = n.query,
            t = p();
        u("innerHtml", t.highlight(o, e), Oe)
    }
}

function gt(a, n) {
    if (a & 1 && (c(0, "h6", 8), S(1), y()), a & 2) {
        let o = p().$implicit;
        m(), O(o)
    }
}

function _t(a, n) {}

function vt(a, n) {
    if (a & 1) {
        let o = I();
        c(0, "button", 9, 2), v("click", function(t) {
            f(o);
            let i = p().$implicit,
                s = p(2);
            return g(s.selectMatch(i, t))
        })("mouseenter", function() {
            f(o);
            let t = p().$implicit,
                i = p(2);
            return g(i.selectActive(t))
        }), C(2, _t, 0, 0, "ng-template", 3), y()
    }
    if (a & 2) {
        let o = p(),
            e = o.$implicit,
            t = o.index,
            i = p(2),
            s = A(2);
        k("active", i.isActive(e)), u("id", i.popupId + "-" + t)("@typeaheadAnimation", i.animationState), m(2), u("ngTemplateOutlet", i.itemTemplate || s)("ngTemplateOutletContext", te(6, ut, e.item, t, e, i.query))
    }
}

function St(a, n) {
    if (a & 1 && C(0, gt, 2, 1, "h6", 6)(1, vt, 3, 11, "ng-template", 7), a & 2) {
        let o = n.$implicit;
        u("ngIf", o.isHeader()), m(), u("ngIf", !o.isHeader())
    }
}

function Ct(a, n) {
    if (a & 1 && C(0, St, 2, 2, "ng-template", 5), a & 2) {
        let o = p();
        u("ngForOf", o.matches)
    }
}
var Ot = {\
    u00C1: "A",
    \u0102: "A",
    \u1EAE: "A",
    \u1EB6: "A",
    \u1EB0: "A",
    \u1EB2: "A",
    \u1EB4: "A",
    \u01CD: "A",
    \u00C2: "A",
    \u1EA4: "A",
    \u1EAC: "A",
    \u1EA6: "A",
    \u1EA8: "A",
    \u1EAA: "A",
    \u00C4: "A",
    \u01DE: "A",
    \u0226: "A",
    \u01E0: "A",
    \u1EA0: "A",
    \u0200: "A",
    \u00C0: "A",
    \u1EA2: "A",
    \u0202: "A",
    \u0100: "A",
    \u0104: "A",
    \u00C5: "A",
    \u01FA: "A",
    \u1E00: "A",
    "\u023A": "A",
    \u00C3: "A",
    "\uA732": "AA",
    \u00C6: "AE",
    \u01FC: "AE",
    \u01E2: "AE",
    "\uA734": "AO",
    "\uA736": "AU",
    "\uA738": "AV",
    "\uA73A": "AV",
    "\uA73C": "AY",
    \u1E02: "B",
    \u1E04: "B",
    \u0181: "B",
    \u1E06: "B",
    "\u0243": "B",
    \u0182: "B",
    \u0106: "C",
    \u010C: "C",
    \u00C7: "C",
    \u1E08: "C",
    \u0108: "C",
    \u010A: "C",
    \u0187: "C",
    "\u023B": "C",
    \u010E: "D",
    \u1E10: "D",
    \u1E12: "D",
    \u1E0A: "D",
    \u1E0C: "D",
    \u018A: "D",
    \u1E0E: "D",
    \u01F2: "D",
    \u01C5: "D",
    \u0110: "D",
    \u018B: "D",
    \u01F1: "DZ",
    \u01C4: "DZ",
    \u00C9: "E",
    \u0114: "E",
    \u011A: "E",
    \u0228: "E",
    \u1E1C: "E",
    \u00CA: "E",
    \u1EBE: "E",
    \u1EC6: "E",
    \u1EC0: "E",
    \u1EC2: "E",
    \u1EC4: "E",
    \u1E18: "E",
    \u00CB: "E",
    \u0116: "E",
    \u1EB8: "E",
    \u0204: "E",
    \u00C8: "E",
    \u1EBA: "E",
    \u0206: "E",
    \u0112: "E",
    \u1E16: "E",
    \u1E14: "E",
    \u0118: "E",
    "\u0246": "E",
    \u1EBC: "E",
    \u1E1A: "E",
    "\uA76A": "ET",
    \u1E1E: "F",
    \u0191: "F",
    \u01F4: "G",
    \u011E: "G",
    \u01E6: "G",
    \u0122: "G",
    \u011C: "G",
    \u0120: "G",
    \u0193: "G",
    \u1E20: "G",
    \u01E4: "G",
    \u1E2A: "H",
    \u021E: "H",
    \u1E28: "H",
    \u0124: "H",
    "\u2C67": "H",
    \u1E26: "H",
    \u1E22: "H",
    \u1E24: "H",
    \u0126: "H",
    \u00CD: "I",
    \u012C: "I",
    \u01CF: "I",
    \u00CE: "I",
    \u00CF: "I",
    \u1E2E: "I",
    \u0130: "I",
    \u1ECA: "I",
    \u0208: "I",
    \u00CC: "I",
    \u1EC8: "I",
    \u020A: "I",
    \u012A: "I",
    \u012E: "I",
    \u0197: "I",
    \u0128: "I",
    \u1E2C: "I",
    "\uA779": "D",
    "\uA77B": "F",
    "\uA77D": "G",
    "\uA782": "R",
    "\uA784": "S",
    "\uA786": "T",
    "\uA76C": "IS",
    \u0134: "J",
    "\u0248": "J",
    \u1E30: "K",
    \u01E8: "K",
    \u0136: "K",
    "\u2C69": "K",
    "\uA742": "K",
    \u1E32: "K",
    \u0198: "K",
    \u1E34: "K",
    "\uA740": "K",
    "\uA744": "K",
    \u0139: "L",
    "\u023D": "L",
    \u013D: "L",
    \u013B: "L",
    \u1E3C: "L",
    \u1E36: "L",
    \u1E38: "L",
    "\u2C60": "L",
    "\uA748": "L",
    \u1E3A: "L",
    \u013F: "L",
    "\u2C62": "L",
    \u01C8: "L",
    \u0141: "L",
    \u01C7: "LJ",
    \u1E3E: "M",
    \u1E40: "M",
    \u1E42: "M",
    "\u2C6E": "M",
    \u0143: "N",
    \u0147: "N",
    \u0145: "N",
    \u1E4A: "N",
    \u1E44: "N",
    \u1E46: "N",
    \u01F8: "N",
    \u019D: "N",
    \u1E48: "N",
    "\u0220": "N",
    \u01CB: "N",
    \u00D1: "N",
    \u01CA: "NJ",
    \u00D3: "O",
    \u014E: "O",
    \u01D1: "O",
    \u00D4: "O",
    \u1ED0: "O",
    \u1ED8: "O",
    \u1ED2: "O",
    \u1ED4: "O",
    \u1ED6: "O",
    \u00D6: "O",
    \u022A: "O",
    \u022E: "O",
    \u0230: "O",
    \u1ECC: "O",
    \u0150: "O",
    \u020C: "O",
    \u00D2: "O",
    \u1ECE: "O",
    \u01A0: "O",
    \u1EDA: "O",
    \u1EE2: "O",
    \u1EDC: "O",
    \u1EDE: "O",
    \u1EE0: "O",
    \u020E: "O",
    "\uA74A": "O",
    "\uA74C": "O",
    \u014C: "O",
    \u1E52: "O",
    \u1E50: "O",
    \u019F: "O",
    \u01EA: "O",
    \u01EC: "O",
    \u00D8: "O",
    \u01FE: "O",
    \u00D5: "O",
    \u1E4C: "O",
    \u1E4E: "O",
    \u022C: "O",
    \u01A2: "OI",
    "\uA74E": "OO",
    \u0190: "E",
    \u0186: "O",
    \u0222: "OU",
    \u1E54: "P",
    \u1E56: "P",
    "\uA752": "P",
    \u01A4: "P",
    "\uA754": "P",
    "\u2C63": "P",
    "\uA750": "P",
    "\uA758": "Q",
    "\uA756": "Q",
    \u0154: "R",
    \u0158: "R",
    \u0156: "R",
    \u1E58: "R",
    \u1E5A: "R",
    \u1E5C: "R",
    \u0210: "R",
    \u0212: "R",
    \u1E5E: "R",
    "\u024C": "R",
    "\u2C64": "R",
    "\uA73E": "C",
    \u018E: "E",
    \u015A: "S",
    \u1E64: "S",
    \u0160: "S",
    \u1E66: "S",
    \u015E: "S",
    \u015C: "S",
    \u0218: "S",
    \u1E60: "S",
    \u1E62: "S",
    \u1E68: "S",
    \u0164: "T",
    \u0162: "T",
    \u1E70: "T",
    \u021A: "T",
    "\u023E": "T",
    \u1E6A: "T",
    \u1E6C: "T",
    \u01AC: "T",
    \u1E6E: "T",
    \u01AE: "T",
    \u0166: "T",
    "\u2C6F": "A",
    "\uA780": "L",
    \u019C: "M",
    "\u0245": "V",
    "\uA728": "TZ",
    \u00DA: "U",
    \u016C: "U",
    \u01D3: "U",
    \u00DB: "U",
    \u1E76: "U",
    \u00DC: "U",
    \u01D7: "U",
    \u01D9: "U",
    \u01DB: "U",
    \u01D5: "U",
    \u1E72: "U",
    \u1EE4: "U",
    \u0170: "U",
    \u0214: "U",
    \u00D9: "U",
    \u1EE6: "U",
    \u01AF: "U",
    \u1EE8: "U",
    \u1EF0: "U",
    \u1EEA: "U",
    \u1EEC: "U",
    \u1EEE: "U",
    \u0216: "U",
    \u016A: "U",
    \u1E7A: "U",
    \u0172: "U",
    \u016E: "U",
    \u0168: "U",
    \u1E78: "U",
    \u1E74: "U",
    "\uA75E": "V",
    \u1E7E: "V",
    \u01B2: "V",
    \u1E7C: "V",
    "\uA760": "VY",
    \u1E82: "W",
    \u0174: "W",
    \u1E84: "W",
    \u1E86: "W",
    \u1E88: "W",
    \u1E80: "W",
    "\u2C72": "W",
    \u1E8C: "X",
    \u1E8A: "X",
    \u00DD: "Y",
    \u0176: "Y",
    \u0178: "Y",
    \u1E8E: "Y",
    \u1EF4: "Y",
    \u1EF2: "Y",
    \u01B3: "Y",
    \u1EF6: "Y",
    "\u1EFE": "Y",
    \u0232: "Y",
    "\u024E": "Y",
    \u1EF8: "Y",
    \u0179: "Z",
    \u017D: "Z",
    \u1E90: "Z",
    "\u2C6B": "Z",
    \u017B: "Z",
    \u1E92: "Z",
    \u0224: "Z",
    \u1E94: "Z",
    \u01B5: "Z",
    \u0132: "IJ",
    \u0152: "OE",
    "\u1D00": "A",
    "\u1D01": "AE",
    \u0299: "B",
    "\u1D03": "B",
    "\u1D04": "C",
    "\u1D05": "D",
    "\u1D07": "E",
    "\uA730": "F",
    \u0262: "G",
    \u029B: "G",
    \u029C: "H",
    \u026A: "I",
    \u0281: "R",
    "\u1D0A": "J",
    "\u1D0B": "K",
    \u029F: "L",
    "\u1D0C": "L",
    "\u1D0D": "M",
    \u0274: "N",
    "\u1D0F": "O",
    \u0276: "OE",
    "\u1D10": "O",
    "\u1D15": "OU",
    "\u1D18": "P",
    \u0280: "R",
    "\u1D0E": "N",
    "\u1D19": "R",
    "\uA731": "S",
    "\u1D1B": "T",
    "\u2C7B": "E",
    "\u1D1A": "R",
    "\u1D1C": "U",
    "\u1D20": "V",
    "\u1D21": "W",
    \u028F: "Y",
    "\u1D22": "Z",
    \u00E1: "a",
    \u0103: "a",
    \u1EAF: "a",
    \u1EB7: "a",
    \u1EB1: "a",
    \u1EB3: "a",
    \u1EB5: "a",
    \u01CE: "a",
    \u00E2: "a",
    \u1EA5: "a",
    \u1EAD: "a",
    \u1EA7: "a",
    \u1EA9: "a",
    \u1EAB: "a",
    \u00E4: "a",
    \u01DF: "a",
    \u0227: "a",
    \u01E1: "a",
    \u1EA1: "a",
    \u0201: "a",
    \u00E0: "a",
    \u1EA3: "a",
    \u0203: "a",
    \u0101: "a",
    \u0105: "a",
    "\u1D8F": "a",
    \u1E9A: "a",
    \u00E5: "a",
    \u01FB: "a",
    \u1E01: "a",
    "\u2C65": "a",
    \u00E3: "a",
    "\uA733": "aa",
    \u00E6: "ae",
    \u01FD: "ae",
    \u01E3: "ae",
    "\uA735": "ao",
    "\uA737": "au",
    "\uA739": "av",
    "\uA73B": "av",
    "\uA73D": "ay",
    \u1E03: "b",
    \u1E05: "b",
    \u0253: "b",
    \u1E07: "b",
    "\u1D6C": "b",
    "\u1D80": "b",
    \u0180: "b",
    \u0183: "b",
    \u0275: "o",
    \u0107: "c",
    \u010D: "c",
    \u00E7: "c",
    \u1E09: "c",
    \u0109: "c",
    \u0255: "c",
    \u010B: "c",
    \u0188: "c",
    "\u023C": "c",
    \u010F: "d",
    \u1E11: "d",
    \u1E13: "d",
    "\u0221": "d",
    \u1E0B: "d",
    \u1E0D: "d",
    \u0257: "d",
    "\u1D91": "d",
    \u1E0F: "d",
    "\u1D6D": "d",
    "\u1D81": "d",
    \u0111: "d",
    \u0256: "d",
    \u018C: "d",
    \u0131: "i",
    "\u0237": "j",
    \u025F: "j",
    \u0284: "j",
    \u01F3: "dz",
    \u01C6: "dz",
    \u00E9: "e",
    \u0115: "e",
    \u011B: "e",
    \u0229: "e",
    \u1E1D: "e",
    \u00EA: "e",
    \u1EBF: "e",
    \u1EC7: "e",
    \u1EC1: "e",
    \u1EC3: "e",
    \u1EC5: "e",
    \u1E19: "e",
    \u00EB: "e",
    \u0117: "e",
    \u1EB9: "e",
    \u0205: "e",
    \u00E8: "e",
    \u1EBB: "e",
    \u0207: "e",
    \u0113: "e",
    \u1E17: "e",
    \u1E15: "e",
    "\u2C78": "e",
    \u0119: "e",
    "\u1D92": "e",
    "\u0247": "e",
    \u1EBD: "e",
    \u1E1B: "e",
    "\uA76B": "et",
    \u1E1F: "f",
    \u0192: "f",
    "\u1D6E": "f",
    "\u1D82": "f",
    \u01F5: "g",
    \u011F: "g",
    \u01E7: "g",
    \u0123: "g",
    \u011D: "g",
    \u0121: "g",
    \u0260: "g",
    \u1E21: "g",
    "\u1D83": "g",
    \u01E5: "g",
    \u1E2B: "h",
    \u021F: "h",
    \u1E29: "h",
    \u0125: "h",
    "\u2C68": "h",
    \u1E27: "h",
    \u1E23: "h",
    \u1E25: "h",
    \u0266: "h",
    \u1E96: "h",
    \u0127: "h",
    \u0195: "hv",
    \u00ED: "i",
    \u012D: "i",
    \u01D0: "i",
    \u00EE: "i",
    \u00EF: "i",
    \u1E2F: "i",
    \u1ECB: "i",
    \u0209: "i",
    \u00EC: "i",
    \u1EC9: "i",
    \u020B: "i",
    \u012B: "i",
    \u012F: "i",
    "\u1D96": "i",
    \u0268: "i",
    \u0129: "i",
    \u1E2D: "i",
    "\uA77A": "d",
    "\uA77C": "f",
    "\u1D79": "g",
    "\uA783": "r",
    "\uA785": "s",
    "\uA787": "t",
    "\uA76D": "is",
    \u01F0: "j",
    \u0135: "j",
    \u029D: "j",
    "\u0249": "j",
    \u1E31: "k",
    \u01E9: "k",
    \u0137: "k",
    "\u2C6A": "k",
    "\uA743": "k",
    \u1E33: "k",
    \u0199: "k",
    \u1E35: "k",
    "\u1D84": "k",
    "\uA741": "k",
    "\uA745": "k",
    \u013A: "l",
    \u019A: "l",
    \u026C: "l",
    \u013E: "l",
    \u013C: "l",
    \u1E3D: "l",
    "\u0234": "l",
    \u1E37: "l",
    \u1E39: "l",
    "\u2C61": "l",
    "\uA749": "l",
    \u1E3B: "l",
    \u0140: "l",
    \u026B: "l",
    "\u1D85": "l",
    \u026D: "l",
    \u0142: "l",
    \u01C9: "lj",
    \u017F: "s",
    "\u1E9C": "s",
    \u1E9B: "s",
    "\u1E9D": "s",
    \u1E3F: "m",
    \u1E41: "m",
    \u1E43: "m",
    \u0271: "m",
    "\u1D6F": "m",
    "\u1D86": "m",
    \u0144: "n",
    \u0148: "n",
    \u0146: "n",
    \u1E4B: "n",
    "\u0235": "n",
    \u1E45: "n",
    \u1E47: "n",
    \u01F9: "n",
    \u0272: "n",
    \u1E49: "n",
    \u019E: "n",
    "\u1D70": "n",
    "\u1D87": "n",
    \u0273: "n",
    \u00F1: "n",
    \u01CC: "nj",
    \u00F3: "o",
    \u014F: "o",
    \u01D2: "o",
    \u00F4: "o",
    \u1ED1: "o",
    \u1ED9: "o",
    \u1ED3: "o",
    \u1ED5: "o",
    \u1ED7: "o",
    \u00F6: "o",
    \u022B: "o",
    \u022F: "o",
    \u0231: "o",
    \u1ECD: "o",
    \u0151: "o",
    \u020D: "o",
    \u00F2: "o",
    \u1ECF: "o",
    \u01A1: "o",
    \u1EDB: "o",
    \u1EE3: "o",
    \u1EDD: "o",
    \u1EDF: "o",
    \u1EE1: "o",
    \u020F: "o",
    "\uA74B": "o",
    "\uA74D": "o",
    "\u2C7A": "o",
    \u014D: "o",
    \u1E53: "o",
    \u1E51: "o",
    \u01EB: "o",
    \u01ED: "o",
    \u00F8: "o",
    \u01FF: "o",
    \u00F5: "o",
    \u1E4D: "o",
    \u1E4F: "o",
    \u022D: "o",
    \u01A3: "oi",
    "\uA74F": "oo",
    \u025B: "e",
    "\u1D93": "e",
    \u0254: "o",
    "\u1D97": "o",
    \u0223: "ou",
    \u1E55: "p",
    \u1E57: "p",
    "\uA753": "p",
    \u01A5: "p",
    "\u1D71": "p",
    "\u1D88": "p",
    "\uA755": "p",
    "\u1D7D": "p",
    "\uA751": "p",
    "\uA759": "q",
    \u02A0: "q",
    "\u024B": "q",
    "\uA757": "q",
    \u0155: "r",
    \u0159: "r",
    \u0157: "r",
    \u1E59: "r",
    \u1E5B: "r",
    \u1E5D: "r",
    \u0211: "r",
    \u027E: "r",
    "\u1D73": "r",
    \u0213: "r",
    \u1E5F: "r",
    \u027C: "r",
    "\u1D72": "r",
    "\u1D89": "r",
    "\u024D": "r",
    \u027D: "r",
    "\u2184": "c",
    "\uA73F": "c",
    \u0258: "e",
    \u027F: "r",
    \u015B: "s",
    \u1E65: "s",
    \u0161: "s",
    \u1E67: "s",
    \u015F: "s",
    \u015D: "s",
    \u0219: "s",
    \u1E61: "s",
    \u1E63: "s",
    \u1E69: "s",
    \u0282: "s",
    "\u1D74": "s",
    "\u1D8A": "s",
    "\u023F": "s",
    \u0261: "g",
    "\u1D11": "o",
    "\u1D13": "o",
    "\u1D1D": "u",
    \u0165: "t",
    \u0163: "t",
    \u1E71: "t",
    \u021B: "t",
    "\u0236": "t",
    \u1E97: "t",
    "\u2C66": "t",
    \u1E6B: "t",
    \u1E6D: "t",
    \u01AD: "t",
    \u1E6F: "t",
    "\u1D75": "t",
    \u01AB: "t",
    \u0288: "t",
    \u0167: "t",
    "\u1D7A": "th",
    \u0250: "a",
    "\u1D02": "ae",
    \u01DD: "e",
    "\u1D77": "g",
    \u0265: "h",
    "\u02AE": "h",
    "\u02AF": "h",
    "\u1D09": "i",
    \u029E: "k",
    "\uA781": "l",
    \u026F: "m",
    \u0270: "m",
    "\u1D14": "oe",
    \u0279: "r",
    \u027B: "r",
    \u027A: "r",
    "\u2C79": "r",
    \u0287: "t",
    \u028C: "v",
    \u028D: "w",
    \u028E: "y",
    "\uA729": "tz",
    \u00FA: "u",
    \u016D: "u",
    \u01D4: "u",
    \u00FB: "u",
    \u1E77: "u",
    \u00FC: "u",
    \u01D8: "u",
    \u01DA: "u",
    \u01DC: "u",
    \u01D6: "u",
    \u1E73: "u",
    \u1EE5: "u",
    \u0171: "u",
    \u0215: "u",
    \u00F9: "u",
    \u1EE7: "u",
    \u01B0: "u",
    \u1EE9: "u",
    \u1EF1: "u",
    \u1EEB: "u",
    \u1EED: "u",
    \u1EEF: "u",
    \u0217: "u",
    \u016B: "u",
    \u1E7B: "u",
    \u0173: "u",
    "\u1D99": "u",
    \u016F: "u",
    \u0169: "u",
    \u1E79: "u",
    \u1E75: "u",
    "\u1D6B": "ue",
    "\uA778": "um",
    "\u2C74": "v",
    "\uA75F": "v",
    \u1E7F: "v",
    \u028B: "v",
    "\u1D8C": "v",
    "\u2C71": "v",
    \u1E7D: "v",
    "\uA761": "vy",
    \u1E83: "w",
    \u0175: "w",
    \u1E85: "w",
    \u1E87: "w",
    \u1E89: "w",
    \u1E81: "w",
    "\u2C73": "w",
    \u1E98: "w",
    \u1E8D: "x",
    \u1E8B: "x",
    "\u1D8D": "x",
    \u00FD: "y",
    \u0177: "y",
    \u00FF: "y",
    \u1E8F: "y",
    \u1EF5: "y",
    \u1EF3: "y",
    \u01B4: "y",
    \u1EF7: "y",
    "\u1EFF": "y",
    \u0233: "y",
    \u1E99: "y",
    "\u024F": "y",
    \u1EF9: "y",
    \u017A: "z",
    \u017E: "z",
    \u1E91: "z",
    \u0291: "z",
    "\u2C6C": "z",
    \u017C: "z",
    \u1E93: "z",
    \u0225: "z",
    \u1E95: "z",
    "\u1D76": "z",
    "\u1D8E": "z",
    \u0290: "z",
    \u01B6: "z",
    "\u0240": "z",
    \uFB00: "ff",
    \uFB03: "ffi",
    \uFB04: "ffl",
    \uFB01: "fi",
    \uFB02: "fl",
    \u0133: "ij",
    \u0153: "oe",
    \uFB06: "st",
    "\u2090": "a",
    "\u2091": "e",
    "\u1D62": "i",
    "\u2C7C": "j",
    "\u2092": "o",
    "\u1D63": "r",
    "\u1D64": "u",
    "\u1D65": "v",
    "\u2093": "x"
};
var w = class {
    constructor(n, o = n, e = !1) {
        this.item = n, this.value = o, this.header = e
    }
    isHeader() {
        return this.header
    }
    toString() {
        return this.value
    }
};

function V(a) {
    return a ? a.replace(/[^A-Za-z0-9[\] ]/g, function(n) {
        return Ot[n] || n
    }) : ""
}

function oe(a, n = " ", o = "", e) {
    let t = [];
    if (!e) t = tt(a, n, o);
    else {
        let i = `([${e}]+)`,
            s = a.split(new RegExp(i, "g")),
            r = s[s.length - 1];
        r > "" && (n && o ? t = tt(r, n, o) : t.push(r))
    }
    return t
}

function tt(a, n, o) {
    let e = [],
        t = `(?:[${o}])([^${o}]+)(?:[${o}])|([^${n}]+)`,
        i = a.split(new RegExp(t, "g")),
        s = i.length,
        r, h = new RegExp(`[${o}]+`, "g");
    for (let l = 0; l < s; l += 1) r = i[l], r && r.length && r !== n && e.push(r.replace(h, ""));
    return e
}

function E(a, n) {
    if (!n || typeof a != "object") return a.toString();
    if (n.endsWith("()")) {
        let t = n.slice(0, n.length - 2);
        return a[t]().toString()
    }
    let e = n.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "").split(".");
    for (let t of e) t in a && (a = a[t]);
    return a ? a.toString() : ""
}
var it = "220ms cubic-bezier(0, 0, 0.2, 1)",
    Et = Pe("typeaheadAnimation", [se("animated-down", L({
        height: "*",
        overflow: "hidden"
    })), N("* => animated-down", [L({
        height: 0,
        overflow: "hidden"
    }), H(it)]), se("animated-up", L({
        height: "*",
        overflow: "hidden"
    })), N("* => animated-up", [L({
        height: "*",
        overflow: "hidden"
    }), H(it)]), N("* => unanimated", H("0s"))]),
    bt = 0,
    At = (() => {
        let n = class n {
            get typeaheadTemplateMethods() {
                return {
                    selectMatch: this.selectMatch.bind(this),
                    selectActive: this.selectActive.bind(this),
                    isActive: this.isActive.bind(this)
                }
            }
            constructor(e, t, i, s) {
                this.positionService = e, this.renderer = t, this.element = i, this.changeDetectorRef = s, this.activeChangeEvent = new _, this.isFocused = !1, this.positionServiceSubscription = new he, this.height = 0, this.popupId = `ngb-typeahead-${bt++}`, this._matches = [], this.renderer.setAttribute(this.element.nativeElement, "id", this.popupId), this.positionServiceSubscription.add(this.positionService.event$ ? .subscribe(() => {
                    if (this.isAnimated) {
                        this.animationState = this.isTopPosition ? "animated-up" : "animated-down", this.changeDetectorRef.detectChanges();
                        return
                    }
                    this.animationState = "unanimated", this.changeDetectorRef.detectChanges()
                }))
            }
            get active() {
                return this._active
            }
            set active(e) {
                this._active = e, this.activeChanged()
            }
            get matches() {
                return this._matches
            }
            set matches(e) {
                if (this.positionService.setOptions({
                        modifiers: {
                            flip: {
                                enabled: this.adaptivePosition
                            }
                        },
                        allowedPositions: ["top", "bottom"]
                    }), this._matches = e, this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length, this.typeaheadScrollable && setTimeout(() => {
                        this.setScrollableMode()
                    }), this.typeaheadIsFirstItemActive && this._matches.length > 0 && (this.setActive(this._matches[0]), this._active ? .isHeader() && this.nextActiveMatch()), this._active && !this.typeaheadIsFirstItemActive) {
                    let t = this._matches.find(i => i.value === this._active ? .value);
                    if (t) {
                        this.selectActive(t);
                        return
                    }
                    this.active = void 0
                }
            }
            get isTopPosition() {
                return this.element.nativeElement.classList.contains("top")
            }
            get optionsListTemplate() {
                return this.parent ? this.parent.optionsListTemplate : void 0
            }
            get isAnimated() {
                return this.parent ? this.parent.isAnimated : !1
            }
            get adaptivePosition() {
                return this.parent ? this.parent.adaptivePosition : !1
            }
            get typeaheadScrollable() {
                return this.parent ? this.parent.typeaheadScrollable : !1
            }
            get typeaheadOptionsInScrollableView() {
                return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5
            }
            get typeaheadIsFirstItemActive() {
                return this.parent ? this.parent.typeaheadIsFirstItemActive : !0
            }
            get itemTemplate() {
                return this.parent ? this.parent.typeaheadItemTemplate : void 0
            }
            get canSelectItemsOnBlur() {
                return !!this.parent ? .selectItemOnBlur
            }
            selectActiveMatch(e) {
                this._active && this.parent ? .typeaheadSelectFirstItem && this.selectMatch(this._active), !this.parent ? .typeaheadSelectFirstItem && e && this.selectMatch(this._active)
            }
            activeChanged() {
                if (!this._active) return;
                let e = this.matches.indexOf(this._active);
                this.activeChangeEvent.emit(`${this.popupId}-${e}`)
            }
            prevActiveMatch() {
                if (!this._active) return;
                let e = this.matches.indexOf(this._active);
                this.setActive(this.matches[e - 1 < 0 ? this.matches.length - 1 : e - 1]), this._active.isHeader() && this.prevActiveMatch(), this.typeaheadScrollable && this.scrollPrevious(e)
            }
            nextActiveMatch() {
                let e = this._active ? this.matches.indexOf(this._active) : -1;
                this.setActive(this.matches[e + 1 > this.matches.length - 1 ? 0 : e + 1]), this._active ? .isHeader() && this.nextActiveMatch(), this.typeaheadScrollable && this.scrollNext(e)
            }
            selectActive(e) {
                this.isFocused = !0, this.setActive(e)
            }
            highlight(e, t) {
                let i = e.value,
                    s = (this.parent && this.parent.typeaheadLatinize ? V(i) : i).toLowerCase(),
                    r, h;
                if (typeof t == "object") {
                    let l = t.length;
                    for (let b = 0; b < l; b += 1) r = s.indexOf(t[b]), h = t[b].length, r >= 0 && h > 0 && (i = `${i.substring(0,r)}<strong>${i.substring(r,r+h)}</strong>${i.substring(r+h)}`, s = `${s.substring(0,r)}????????${"??".repeat(h)}??????????${s.substring(r+h)}`)
                } else t && (r = s.indexOf(t), h = t.length, r >= 0 && h > 0 && (i = `${i.substring(0,r)}<strong>${i.substring(r,r+h)}</strong>${i.substring(r+h)}`));
                return i
            }
            focusLost() {
                this.isFocused = !1, this.canSelectItemsOnBlur || this.setActive(void 0)
            }
            isActive(e) {
                return this.active === e
            }
            selectMatch(e, t) {
                return t && (t.stopPropagation(), t.preventDefault()), this.parent ? .changeModel(e), setTimeout(() => this.parent ? .typeaheadOnSelect.emit(e), 0), !1
            }
            setScrollableMode() {
                if (this.ulElement || (this.ulElement = this.element), this.liElements ? .first) {
                    let e = re.getStyles(this.ulElement.nativeElement),
                        t = re.getStyles(this.liElements.first.nativeElement),
                        i = parseFloat((e["padding-bottom"] ? e["padding-bottom"] : "").replace("px", "")),
                        s = parseFloat((e["padding-top"] ? e["padding-top"] : "0").replace("px", "")),
                        r = parseFloat((t.height ? t.height : "0").replace("px", "")),
                        h = this.typeaheadOptionsInScrollableView * r;
                    this.guiHeight = `${h+s+i}px`
                }
                this.renderer.setStyle(this.element.nativeElement, "visibility", "visible")
            }
            scrollPrevious(e) {
                if (e === 0) {
                    this.scrollToBottom();
                    return
                }
                if (this.liElements && this.ulElement) {
                    let t = this.liElements.toArray()[e - 1];
                    t && !this.isScrolledIntoView(t.nativeElement) && (this.ulElement.nativeElement.scrollTop = t.nativeElement.offsetTop)
                }
            }
            scrollNext(e) {
                if (e + 1 > this.matches.length - 1) {
                    this.scrollToTop();
                    return
                }
                if (this.liElements && this.ulElement) {
                    let t = this.liElements.toArray()[e + 1];
                    t && !this.isScrolledIntoView(t.nativeElement) && (this.ulElement.nativeElement.scrollTop = t.nativeElement.offsetTop - Number(this.ulElement.nativeElement.offsetHeight) + Number(t.nativeElement.offsetHeight))
                }
            }
            ngOnDestroy() {
                this.positionServiceSubscription.unsubscribe()
            }
            setActive(e) {
                this._active = e;
                let t;
                this._active == null || this._active.isHeader() || (t = e), this.parent ? .typeaheadOnPreview.emit(t)
            }
            isScrolledIntoView(e) {
                if (!this.ulElement) return !1;
                let t = this.ulElement.nativeElement.scrollTop,
                    i = t + Number(this.ulElement.nativeElement.offsetHeight),
                    s = e.offsetTop;
                return s + e.offsetHeight <= i && s >= t
            }
            scrollToBottom() {
                this.ulElement ? .nativeElement && (this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight)
            }
            scrollToTop() {
                this.ulElement ? .nativeElement && (this.ulElement.nativeElement.scrollTop = 0)
            }
        };
        n.\u0275fac = function(t) {
            return new(t || n)(d(D), d(Z), d(Y), d(ae))
        }, n.\u0275cmp = z({
            type: n,
            selectors: [
                ["typeahead-container"]
            ],
            viewQuery: function(t, i) {
                if (t & 1 && (J(pt, 5), J(dt, 5)), t & 2) {
                    let s;
                    X(s = ee()) && (i.ulElement = s.first), X(s = ee()) && (i.liElements = s)
                }
            },
            hostAttrs: [1, "dropdown", "open", "bottom", "dropdown-menu", 2, "position", "absolute", "display", "block"],
            hostVars: 7,
            hostBindings: function(t, i) {
                t & 1 && v("mouseleave", function() {
                    return i.focusLost()
                })("blur", function() {
                    return i.focusLost()
                }), t & 2 && (K("role", "listbox"), Fe("height", i.needScrollbar ? i.guiHeight : "auto")("visibility", "inherit"), k("dropup", i.dropup))
            },
            outputs: {
                activeChangeEvent: "activeChange"
            },
            features: [M([D])],
            decls: 5,
            vars: 7,
            consts: [
                ["bsItemTemplate", ""],
                ["bs4Template", ""],
                ["liElements", ""],
                [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
                [3, "innerHtml"],
                ["ngFor", "", 3, "ngForOf"],
                ["class", "dropdown-header", 4, "ngIf"],
                [3, "ngIf"],
                [1, "dropdown-header"],
                ["role", "option", 1, "dropdown-item", 3, "click", "mouseenter", "id"]
            ],
            template: function(t, i) {
                if (t & 1 && C(0, yt, 0, 0, "ng-template", 3)(1, ft, 1, 1, "ng-template", null, 0, F)(3, Ct, 1, 1, "ng-template", null, 1, F), t & 2) {
                    let s = A(2),
                        r = A(4);
                    u("ngTemplateOutlet", i.optionsListTemplate || r)("ngTemplateOutletContext", te(2, mt, i.matches, i.itemTemplate || s, i.query, i.typeaheadTemplateMethods))
                }
            },
            dependencies: [Ve, Le, De],
            styles: [".dropdown[_nghost-%COMP%]{z-index:1000}.dropdown-menu[_nghost-%COMP%], .dropdown-menu[_ngcontent-%COMP%]{overflow-y:auto;height:100px}"],
            data: {
                animation: [Et]
            }
        });
        let a = n;
        return a
    })(),
    nt = (() => {
        let n = class n {
            constructor() {
                this.adaptivePosition = !1, this.isAnimated = !1, this.hideResultsOnBlur = !0, this.cancelRequestOnFocusLost = !1, this.selectFirstItem = !0, this.isFirstItemActive = !0, this.minLength = 1, this.selectItemOnBlur = !1
            }
        };
        n.\u0275fac = function(t) {
            return new(t || n)
        }, n.\u0275prov = Se({
            token: n,
            factory: n.\u0275fac,
            providedIn: "root"
        });
        let a = n;
        return a
    })(),
    at = (() => {
        let n = class n {
            constructor(e, t, i, s, r, h, l) {
                this.changeDetection = i, this.element = s, this.ngControl = r, this.renderer = h, this.typeaheadMinLength = 1, this.adaptivePosition = !1, this.isAnimated = !1, this.typeaheadWaitMs = 0, this.typeaheadLatinize = !0, this.typeaheadSingleWords = !0, this.typeaheadWordDelimiters = " ", this.typeaheadMultipleSearchDelimiters = ",", this.typeaheadPhraseDelimiters = `'"`, this.typeaheadScrollable = !1, this.typeaheadOptionsInScrollableView = 5, this.typeaheadSelectFirstItem = !0, this.typeaheadIsFirstItemActive = !0, this.typeaheadLoading = new _, this.typeaheadNoResults = new _, this.typeaheadOnSelect = new _, this.typeaheadOnPreview = new _, this.typeaheadOnBlur = new _, this.dropup = !1, this.isOpen = !1, this.list = "list", this.isActiveItemChanged = !1, this.isFocused = !1, this.cancelRequestOnFocusLost = !1, this.selectItemOnBlur = !1, this.keyUpEventEmitter = new _, this.placement = "bottom left", this._matches = [], this._subscriptions = [], this._outsideClickListener = () => {}, this._typeahead = e.createLoader(s, l, h).provide({
                    provide: nt,
                    useValue: t
                }), Object.assign(this, {
                    typeaheadHideResultsOnBlur: t.hideResultsOnBlur,
                    cancelRequestOnFocusLost: t.cancelRequestOnFocusLost,
                    typeaheadSelectFirstItem: t.selectFirstItem,
                    typeaheadIsFirstItemActive: t.isFirstItemActive,
                    typeaheadMinLength: t.minLength,
                    adaptivePosition: t.adaptivePosition,
                    isAnimated: t.isAnimated,
                    selectItemOnBlur: t.selectItemOnBlur
                })
            }
            get matches() {
                return this._matches
            }
            ngOnInit() {
                this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20, this.typeaheadMinLength = this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength, this.typeaheadAsync === void 0 && !B(this.typeahead) && (this.typeaheadAsync = !1), B(this.typeahead) && (this.typeaheadAsync = !0), this.typeaheadAsync ? this.asyncActions() : this.syncActions(), this.checkDelimitersConflict()
            }
            onInput(e) {
                let t = e.target.value !== void 0 ? e.target.value : e.target.textContent !== void 0 ? e.target.textContent : e.target.innerText;
                t != null && t.trim().length >= this.typeaheadMinLength ? (this.typeaheadLoading.emit(!0), this.keyUpEventEmitter.emit(e.target.value)) : (this.typeaheadLoading.emit(!1), this.typeaheadNoResults.emit(!1), this.hide())
            }
            onChange(e) {
                if (this._container) {
                    if (e.keyCode === 27 || e.key === "Escape") {
                        this.hide();
                        return
                    }
                    if (e.keyCode === 38 || e.key === "ArrowUp") {
                        this.isActiveItemChanged = !0, this._container.prevActiveMatch();
                        return
                    }
                    if (e.keyCode === 40 || e.key === "ArrowDown") {
                        this.isActiveItemChanged = !0, this._container.nextActiveMatch();
                        return
                    }
                    if (e.keyCode === 13 || e.key === "Enter") {
                        this._container.selectActiveMatch();
                        return
                    }
                }
            }
            onFocus() {
                this.isFocused = !0, setTimeout(() => {
                    this.typeaheadMinLength === 0 && (this.typeaheadLoading.emit(!0), this.keyUpEventEmitter.emit(this.element.nativeElement.value || ""))
                }, 0)
            }
            onBlur() {
                this.isFocused = !1, this._container && !this._container.isFocused && this.typeaheadOnBlur.emit(this._container.active), !this.container && this._matches ? .length === 0 && this.typeaheadOnBlur.emit(new w(this.element.nativeElement.value, this.element.nativeElement.value, !1))
            }
            onKeydown(e) {
                if (this._container && ((e.keyCode === 9 || e.key === "Tab") && this.onBlur(), e.keyCode === 9 || e.key === "Tab" || e.keyCode === 13 || e.key === "Enter")) {
                    if (e.preventDefault(), this.typeaheadSelectFirstItem) {
                        this._container.selectActiveMatch();
                        return
                    }
                    this.typeaheadSelectFirstItem || (this._container.selectActiveMatch(this.isActiveItemChanged), this.isActiveItemChanged = !1, this.hide())
                }
            }
            changeModel(e) {
                if (!e) return;
                let t;
                if (this.typeaheadMultipleSearch && this._allEnteredValue) {
                    let i = this._allEnteredValue.split(new RegExp(`([${this.typeaheadMultipleSearchDelimiters}]+)`));
                    this._allEnteredValue = i.slice(0, i.length - 1).concat(e.value).join(""), t = this._allEnteredValue
                } else t = e.value;
                this.ngControl.viewToModelUpdate(t), this.ngControl.control ? .setValue(t), this.changeDetection.markForCheck(), this.hide()
            }
            show() {
                if (this._typeahead.attach(At).to(this.container).position({
                        attachment: `${this.dropup?"top":"bottom"} left`
                    }).show({
                        typeaheadRef: this,
                        placement: this.placement,
                        animation: !1,
                        dropup: this.dropup
                    }), this._outsideClickListener = this.renderer.listen("document", "click", t => {
                        this.typeaheadMinLength === 0 && this.element.nativeElement.contains(t.target) || !this.typeaheadHideResultsOnBlur || this.element.nativeElement.contains(t.target) || this.onOutsideClick()
                    }), !this._typeahead.instance || !this.ngControl.control) return;
                this._container = this._typeahead.instance, this._container.parent = this;
                let e = (this.typeaheadLatinize ? V(this.ngControl.control.value) : this.ngControl.control.value).toString().toLowerCase();
                this._container.query = this.tokenizeQuery(e), this._container.matches = this._matches, this.element.nativeElement.focus(), this._container.activeChangeEvent.subscribe(t => {
                    this.activeDescendant = t, this.changeDetection.markForCheck()
                }), this.isOpen = !0
            }
            hide() {
                this._typeahead.isShown && (this._typeahead.hide(), this._outsideClickListener(), this._container = void 0, this.isOpen = !1, this.changeDetection.markForCheck()), this.typeaheadOnPreview.emit()
            }
            onOutsideClick() {
                this._container && !this._container.isFocused && this.hide()
            }
            ngOnDestroy() {
                for (let e of this._subscriptions) e.unsubscribe();
                this._typeahead.dispose()
            }
            asyncActions() {
                this._subscriptions.push(this.keyUpEventEmitter.pipe(G(this.typeaheadWaitMs), ve(e => this._allEnteredValue = e), P(() => this.typeahead ? this.typeahead : j)).subscribe(e => {
                    this.finalizeAsyncCall(e)
                }))
            }
            syncActions() {
                this._subscriptions.push(this.keyUpEventEmitter.pipe(G(this.typeaheadWaitMs), me(e => {
                    this._allEnteredValue = e;
                    let t = this.normalizeQuery(e);
                    return this.typeahead ? (B(this.typeahead) ? this.typeahead : ce(this.typeahead)).pipe(ue(s => !!s && this.testMatch(this.normalizeOption(s), t)), fe()) : j
                })).subscribe(e => {
                    this.finalizeAsyncCall(e)
                }))
            }
            normalizeOption(e) {
                let t = E(e, this.typeaheadOptionField);
                return (this.typeaheadLatinize ? V(t) : t).toLowerCase()
            }
            tokenizeQuery(e) {
                let t = e;
                return this.typeaheadMultipleSearch && this.typeaheadSingleWords ? this.haveCommonCharacters(`${this.typeaheadPhraseDelimiters}${this.typeaheadWordDelimiters}`, this.typeaheadMultipleSearchDelimiters) || (t = oe(t, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters, this.typeaheadMultipleSearchDelimiters)) : this.typeaheadSingleWords ? t = oe(t, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : t = oe(t, void 0, void 0, this.typeaheadMultipleSearchDelimiters), t
            }
            normalizeQuery(e) {
                let t = (this.typeaheadLatinize ? V(e) : e).toString().toLowerCase();
                return t = this.tokenizeQuery(t), t
            }
            testMatch(e, t) {
                let i;
                if (typeof t == "object") {
                    i = t.length;
                    for (let s = 0; s < i; s += 1)
                        if (t[s].length > 0 && e.indexOf(t[s]) < 0) return !1;
                    return !0
                }
                return e.indexOf(t) >= 0
            }
            finalizeAsyncCall(e) {
                if (this.prepareMatches(e || []), this.typeaheadLoading.emit(!1), this.typeaheadNoResults.emit(!this.hasMatches()), !this.hasMatches()) {
                    this.hide();
                    return
                }
                if (!(!this.isFocused && this.cancelRequestOnFocusLost))
                    if (this._container && this.ngControl.control) {
                        let i = ((this.typeaheadLatinize ? V(this.ngControl.control.value) : this.ngControl.control.value) || "").toString().toLowerCase();
                        this._container.query = this.tokenizeQuery(i), this._container.matches = this._matches
                    } else this.show()
            }
            prepareMatches(e) {
                let t = e.slice(0, this.typeaheadOptionsLimit),
                    i = this.typeaheadOrderBy ? this.orderMatches(t) : t;
                if (this.typeaheadGroupField) {
                    let s = [];
                    i.map(h => E(h, this.typeaheadGroupField)).filter((h, l, b) => b.indexOf(h) === l).forEach(h => {
                        s.push(new w(h, h, !0)), s = s.concat(i.filter(l => E(l, this.typeaheadGroupField) === h).map(l => new w(l, E(l, this.typeaheadOptionField))))
                    }), this._matches = s
                } else this._matches = i.map(s => new w(s, E(s, this.typeaheadOptionField)))
            }
            orderMatches(e) {
                if (!e.length) return e;
                if (this.typeaheadOrderBy !== null && this.typeaheadOrderBy !== void 0 && typeof this.typeaheadOrderBy == "object" && Object.keys(this.typeaheadOrderBy).length === 0) return console.error("Field and direction properties for typeaheadOrderBy have to be set according to documentation!"), e;
                let {
                    field: t,
                    direction: i
                } = this.typeaheadOrderBy || {};
                return !i || !(i === "asc" || i === "desc") ? (console.error('typeaheadOrderBy direction has to equal "asc" or "desc". Please follow the documentation.'), e) : typeof e[0] == "string" ? i === "asc" ? e.sort() : e.sort().reverse() : !t || typeof t != "string" ? (console.error("typeaheadOrderBy field has to set according to the documentation."), e) : e.sort((s, r) => {
                    let h = E(s, t),
                        l = E(r, t);
                    return h < l ? i === "asc" ? -1 : 1 : h > l ? i === "asc" ? 1 : -1 : 0
                })
            }
            hasMatches() {
                return this._matches.length > 0
            }
            checkDelimitersConflict() {
                if (this.typeaheadMultipleSearch && this.typeaheadSingleWords && this.haveCommonCharacters(`${this.typeaheadPhraseDelimiters}${this.typeaheadWordDelimiters}`, this.typeaheadMultipleSearchDelimiters)) throw new Error(`Delimiters used in typeaheadMultipleSearchDelimiters must be different
          from delimiters used in typeaheadWordDelimiters (current value: ${this.typeaheadWordDelimiters}) and
          typeaheadPhraseDelimiters (current value: ${this.typeaheadPhraseDelimiters}).
          Please refer to the documentation`)
            }
            haveCommonCharacters(e, t) {
                for (let i = 0; i < e.length; i++)
                    if (e.charAt(i).indexOf(t) > -1) return !0;
                return !1
            }
        };
        n.\u0275fac = function(t) {
            return new(t || n)(d($), d(nt), d(ae), d(Y), d(He), d(Z), d(be))
        }, n.\u0275dir = we({
            type: n,
            selectors: [
                ["", "typeahead", ""]
            ],
            hostVars: 4,
            hostBindings: function(t, i) {
                t & 1 && v("input", function(r) {
                    return i.onInput(r)
                })("keyup", function(r) {
                    return i.onChange(r)
                })("click", function() {
                    return i.onFocus()
                })("focus", function() {
                    return i.onFocus()
                })("blur", function() {
                    return i.onBlur()
                })("keydown", function(r) {
                    return i.onKeydown(r)
                }), t & 2 && K("aria-activedescendant", i.activeDescendant)("aria-owns", i.isOpen ? i._container.popupId : null)("aria-expanded", i.isOpen)("aria-autocomplete", i.list)
            },
            inputs: {
                typeahead: "typeahead",
                typeaheadMinLength: "typeaheadMinLength",
                adaptivePosition: "adaptivePosition",
                isAnimated: "isAnimated",
                typeaheadWaitMs: "typeaheadWaitMs",
                typeaheadOptionsLimit: "typeaheadOptionsLimit",
                typeaheadOptionField: "typeaheadOptionField",
                typeaheadGroupField: "typeaheadGroupField",
                typeaheadOrderBy: "typeaheadOrderBy",
                typeaheadAsync: "typeaheadAsync",
                typeaheadLatinize: "typeaheadLatinize",
                typeaheadSingleWords: "typeaheadSingleWords",
                typeaheadWordDelimiters: "typeaheadWordDelimiters",
                typeaheadMultipleSearch: "typeaheadMultipleSearch",
                typeaheadMultipleSearchDelimiters: "typeaheadMultipleSearchDelimiters",
                typeaheadPhraseDelimiters: "typeaheadPhraseDelimiters",
                typeaheadItemTemplate: "typeaheadItemTemplate",
                optionsListTemplate: "optionsListTemplate",
                typeaheadScrollable: "typeaheadScrollable",
                typeaheadOptionsInScrollableView: "typeaheadOptionsInScrollableView",
                typeaheadHideResultsOnBlur: "typeaheadHideResultsOnBlur",
                typeaheadSelectFirstItem: "typeaheadSelectFirstItem",
                typeaheadIsFirstItemActive: "typeaheadIsFirstItemActive",
                container: "container",
                dropup: "dropup"
            },
            outputs: {
                typeaheadLoading: "typeaheadLoading",
                typeaheadNoResults: "typeaheadNoResults",
                typeaheadOnSelect: "typeaheadOnSelect",
                typeaheadOnPreview: "typeaheadOnPreview",
                typeaheadOnBlur: "typeaheadOnBlur"
            },
            exportAs: ["bs-typeahead"],
            features: [M([$, D])]
        });
        let a = n;
        return a
    })(),
    st = (() => {
        let n = class n {
            static forRoot() {
                return {
                    ngModule: n,
                    providers: []
                }
            }
        };
        n.\u0275fac = function(t) {
            return new(t || n)
        }, n.\u0275mod = Ae({
            type: n
        }), n.\u0275inj = Ce({
            imports: [R]
        });
        let a = n;
        return a
    })();
var rt = ot(ht());
var xt = (a, n) => n.item.symbol;

function Tt(a, n) {
    if (a & 1 && (c(0, "div", 9), T(1, "img", 10), c(2, "div", 11), S(3), y()(), c(4, "div", 12)(5, "div", 13), S(6), y(), c(7, "div", 11), S(8), y(), c(9, "div", 11), S(10), y()()), a & 2) {
        let o = p().$implicit;
        m(), u("src", o.item.logo, Ee)("alt", o.item.name), m(2), O(o.item.symbol), m(3), O(o.item.name), m(2), O(o.item.region), m(2), O(o.item.currency)
    }
}

function It(a, n) {
    a & 1 && (c(0, "div", 9), T(1, "img", 14), c(2, "div", 11), S(3, "Loading..."), y()())
}

function kt(a, n) {
    if (a & 1) {
        let o = I();
        c(0, "div", 8), v("click", function(t) {
            let i = f(o).$implicit,
                s = p().$implicit;
            return g(s.selectMatch(i, t))
        })("mouseenter", function() {
            let t = f(o).$implicit,
                i = p().$implicit;
            return g(i.selectActive(t))
        }), xe(1, Tt, 11, 6), ie(2, "async"), Te(3, It, 4, 0, "div", 9), y()
    }
    if (a & 2) {
        let o = n.$implicit,
            e = p().$implicit,
            t = p();
        k("active", e.isActive(o)), m(), Ie(ne(2, 3, t.searchLoading$) === !1 ? 1 : 3)
    }
}

function Mt(a, n) {
    if (a & 1 && ke(0, kt, 4, 5, "div", 7, xt), a & 2) {
        let o = n.matches;
        Me(o)
    }
}
var yi = (() => {
    let n = class n {
        constructor(e, t) {
            this._stocks = e, this._fb = t, this._onDestroy$ = new le, this._currentSearch = new x(""), this._typeaheadLoading = new x(!1), this._currentTypeahead = new x([]), this._currentExchange = new x(U.NYSEAndNASDAQ), this.exchanges = qe, this.selectedStock = new _, this.icons = {
                search: rt.faMagnifyingGlass
            }, this.searchForm = this._fb.group({
                symbol: "",
                exchange: U.NYSEAndNASDAQ
            }), this.suggestions$ = this._currentTypeahead.pipe(Q(), q(1)), this.searchLoading$ = this._typeaheadLoading.pipe(q(1))
        }
        ngOnInit() {
            de([this._currentSearch.pipe(_e(this._onDestroy$), Q()), this._currentExchange]).pipe(P(([e, t]) => e ? (this._typeaheadLoading.next(!0), this._stocks.search(e, t).pipe(ye(i => W([])), pe(i => i.slice(0, 5)), ge(() => this._typeaheadLoading.next(!1)))) : (this._typeaheadLoading.next(!1), W([])))).subscribe(e => {
                this._currentTypeahead.next(e)
            })
        }
        ngOnDestroy() {
            this._onDestroy$.next(null), this._onDestroy$.complete()
        }
        writeValue(e) {
            e !== null ? this.searchForm.setValue(e, {
                emitEvent: !1
            }) : this.searchForm.setValue({
                symbol: "",
                exchange: U.NYSEAndNASDAQ
            }, {
                emitEvent: !1
            })
        }
        registerOnChange(e) {
            this.onChange = e
        }
        registerOnTouched(e) {
            this.onTouched = e
        }
        setDisabledState(e) {
            e ? this.searchForm.disable() : this.searchForm.enable()
        }
        onTypeaheadOnSelect(e) {
            this.onSearch(e.item), this.onChange(e.item), this.selectedStock.emit(e.item)
        }
        onSearch(e) {
            let t = {
                symbol: this.searchForm.value.symbol.toUpperCase(),
                exchange: this.searchForm.value.exchange
            };
            this._currentTypeahead.next([])
        }
        changeExchange(e) {
            this._currentExchange.next(e.value)
        }
        changeTypeaheadLoading(e) {
            this._typeaheadLoading.next(!0)
        }
        updateSearch(e) {
            let t = this.searchForm.get("symbol") ? .value,
                i = /^[a-z0-9]+$/i;
            e.key !== "Enter" && e.key !== "Tab" && e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && i.test(t) ? t && t !== "" ? (this.onSearch(e), this._currentSearch.next(t)) : t === "" && (this._currentTypeahead.next([]), this._currentSearch.next(t)) : e.key !== "Enter" && e.key !== "Tab" && e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && (this._currentSearch.next(""), this.onSearch(e))
        }
        submitValue(e) {
            let t = this.searchForm.value.symbol;
            if (!t || t.trim() === "") {
                this.onChange({
                    symbol: "",
                    exchange: this.searchForm.value.exchange
                }), this.selectedStock.emit({
                    symbol: "",
                    exchange: this.searchForm.value.exchange
                });
                return
            }
            let i = {
                symbol: t.toUpperCase(),
                exchange: this.searchForm.value.exchange
            };
            this.onChange(i), this.selectedStock.emit(i)
        }
        onBlur(e) {
            let t = this.searchForm.value.symbol;
            if (!t || t.trim() === "") {
                this.onChange({
                    symbol: "",
                    exchange: this.searchForm.value.exchange
                }), this.selectedStock.emit({
                    symbol: "",
                    exchange: this.searchForm.value.exchange
                });
                return
            }
            let i = {
                symbol: t.toUpperCase(),
                exchange: this.searchForm.value.exchange
            };
            this.onChange(i), this.selectedStock.emit(i)
        }
    };
    n.\u0275fac = function(t) {
        return new(t || n)(d(et), d(Ge))
    }, n.\u0275cmp = z({
        type: n,
        selectors: [
            ["qualtrim-stock-selector"]
        ],
        outputs: {
            selectedStock: "selectedStock"
        },
        features: [M([{
            provide: ze,
            useExisting: n,
            multi: !0
        }])],
        decls: 10,
        vars: 10,
        consts: [
            ["customListTemplate", ""],
            [1, "search-form", 3, "submit", "formGroup"],
            [1, "input-group"],
            ["type", "text", "formControlName", "symbol", "name", "search", "spellcheck", "false", "autocapitalize", "characters", "placeholder", "Enter stock ticker", "typeaheadOptionField", "symbol", "container", "body", 1, "form-control", 3, "keyup", "typeaheadOnSelect", "blur", "typeahead", "typeaheadAsync", "optionsListTemplate"],
            ["bindLabel", "label", "bindValue", "value", "placeholder", "Select Exchange", "formControlName", "exchange", 1, "exchange", 3, "change", "items", "clearable", "searchable"],
            ["type", "submit", 1, "btn", "btn-secondary"],
            [3, "loading"],
            [1, "dropdown-item", "mw-600px", "d-flex", "justify-content-between", "align-items-center", "cursor-pointer", 3, "active"],
            [1, "dropdown-item", "mw-600px", "d-flex", "justify-content-between", "align-items-center", "cursor-pointer", 3, "click", "mouseenter"],
            [1, "symbol-image", "d-flex", "flex-row", "align-items-center"],
            ["onerror", "this.onerror=null;this.src='/assets/qualtrim-square-logo.png';this.classList='w-50px me-4'", 1, "w-50px", "company-logo", "me-4", 3, "src", "alt"],
            [1, "symbol"],
            [1, "text-end", "ms-8", "d-flex", "flex-column"],
            [1, "company-name"],
            ["src", "/assets/qualtrim-square-logo.png", "alt", "Qualtrim", 1, "w-50px", "me-4"]
        ],
        template: function(t, i) {
            if (t & 1) {
                let s = I();
                c(0, "form", 1), v("submit", function(h) {
                    return f(s), g(i.submitValue(h))
                }), c(1, "div", 2)(2, "input", 3), v("keyup", function(h) {
                    return f(s), g(i.updateSearch(h))
                })("typeaheadOnSelect", function(h) {
                    return f(s), g(i.onTypeaheadOnSelect(h))
                })("blur", function(h) {
                    return f(s), g(i.onBlur(h))
                }), y(), c(3, "ng-select", 4), v("change", function(h) {
                    return f(s), g(i.changeExchange(h))
                }), y(), c(4, "button", 5)(5, "qualtrim-loading-indicator", 6), ie(6, "async"), S(7, "Search"), y()()()(), C(8, Mt, 2, 0, "ng-template", null, 0, F)
            }
            if (t & 2) {
                let s = A(9);
                u("formGroup", i.searchForm), m(2), u("typeahead", i.suggestions$)("typeaheadAsync", !0)("optionsListTemplate", s), m(), u("items", i.exchanges)("clearable", !1)("searchable", !1), m(2), u("loading", ne(6, 8, i.searchLoading$))
            }
        },
        dependencies: [R, Ye, Ke, Ze, Qe, $e, Re, Ne, Ue, je, We, st, at, Xe, Je, Be],
        styles: [".search-icon[_ngcontent-%COMP%]{z-index:1000}.exchange[_ngcontent-%COMP%]{max-width:130px}.profile-image[_ngcontent-%COMP%]{max-height:4rem;max-width:150px}.company-title[_ngcontent-%COMP%]{line-height:1.5rem}.search-form[_ngcontent-%COMP%]{width:100%}.dropdown-item[_ngcontent-%COMP%]{min-width:516px}@media only screen and (max-width: 600px){.dropdown-item[_ngcontent-%COMP%]{max-width:600px;width:100%;min-width:auto}}"]
    });
    let a = n;
    return a
})();
export {
    st as a, yi as b
};