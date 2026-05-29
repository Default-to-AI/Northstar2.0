import {
    K as i,
    L as f
} from "./chunk-SUZ3XW2S.js";

function u(n, r, o) {
    let t = f(n, o ? .in);
    if (isNaN(r)) return i(o ? .in || n, NaN);
    if (!r) return t;
    let s = t.getDate(),
        e = i(o ? .in || n, t.getTime());
    e.setMonth(t.getMonth() + r + 1, 0);
    let a = e.getDate();
    return s >= a ? e : (t.setFullYear(e.getFullYear(), e.getMonth(), s), t)
}
export {
    u as a
};