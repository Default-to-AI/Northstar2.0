import {
    M as i,
    O as r,
    P as g
} from "./chunk-SUZ3XW2S.js";

function l(t, n, o) {
    let [e, s] = r(o ? .in, t, n), u = d(e, s), c = Math.abs(g(e, s));
    e.setDate(e.getDate() - u * c);
    let m = +(d(e, s) === -u),
        f = u * (c - m);
    return f === 0 ? 0 : f
}

function d(t, n) {
    let o = t.getFullYear() - n.getFullYear() || t.getMonth() - n.getMonth() || t.getDate() - n.getDate() || t.getHours() - n.getHours() || t.getMinutes() - n.getMinutes() || t.getSeconds() - n.getSeconds() || t.getMilliseconds() - n.getMilliseconds();
    return o < 0 ? -1 : o > 0 ? 1 : o
}

function a(t, n, o) {
    return i(t, -n, o)
}
export {
    l as a, a as b
};