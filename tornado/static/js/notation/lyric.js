function formatLyric(e) {
    for (var h = ",.!?，。！？", n = "(（", s = ")）", t = ";；、_", f = [], l = "", i = 0; i < e.length;) {
        if (-1 != h.indexOf(e[i]))
            l.length && (f.push(l), l = ""), f[f.length - 1] += e[i];
        else if (-1 != n.indexOf(e[i])) {
            for (l.length && (f.push(l), l = "");;) {
                if (i++, i >= e.length)
                    return f;
                if (-1 != s.indexOf(e[i]))
                    break;
                l += e[i]
            }
            f.push(l), l = ""
        } else if (-1 != t.indexOf(e[i]))
            l.length && (f.push(l), l = ""), f.push("");
        else if (e.charCodeAt(i) > 255)
            l.length && (f.push(l), l = ""), f.push(e[i]);
        else
            switch (e[i]) {
            case "\n":
            case "\r":
            case " ":
                l.length && (f.push(l), l = "");
                break;
            default:
                l += e[i]
            }
        i++
    }
    return l.length && f.push(l), f
}


