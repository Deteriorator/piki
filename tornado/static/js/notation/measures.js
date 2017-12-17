var parser = function() {
    function t(e) {
        var r;
        if (e instanceof Array) {
            r = [];
            for (var s = e.length; s--;)
                r[s] = t(e[s]);
            return r
        }
        if (e instanceof Object) {
            r = {};
            for (var i in e)
                r[i] = t(e[i]);
            return r
        }
        return e
    }
    function e(t) {
        return t ? (t = t.replace(/\d/, "").toUpperCase(), t.length > 1 && (t = t.charAt(0).toLowerCase() + t.substr(1)), t) : ""
    }
    function r(t) {
        var e = {
            "#G": 56,
            BA: 56,
            "#G3": 56,
            BA3: 56,
            A: 57,
            A3: 57,
            "#A": 58,
            BB: 58,
            "#A3": 58,
            BB3: 58,
            B: 59,
            B3: 59,
            C: 60,
            C4: 60,
            "#C": 61,
            BD: 61,
            "#C4": 61,
            BD4: 61,
            D: 62,
            D4: 62,
            "#D": 63,
            BE: 63,
            "#D4": 63,
            BE4: 63,
            E: 64,
            E4: 64,
            F: 65,
            F4: 65,
            "#F": 66,
            BG: 66,
            "#F4": 66,
            BG4: 66,
            G: 67,
            G4: 67,
            "#G0": 20,
            "#G1": 32,
            "#G2": 44,
            "#G4": 68,
            "#G5": 80,
            "#G6": 92,
            "#G7": 104,
            "#G8": 116,
            BA0: 20,
            BA1: 32,
            BA2: 44,
            BA4: 68,
            BA5: 80,
            BA6: 92,
            BA7: 104,
            BA8: 116,
            A0: 21,
            A1: 33,
            A2: 45,
            A4: 69,
            A5: 81,
            A6: 93,
            A7: 105,
            A8: 117,
            "#A0": 22,
            "#A1": 34,
            "#A2": 46,
            "#A4": 70,
            "#A5": 82,
            "#A6": 94,
            "#A7": 106,
            "#A8": 118,
            BB0: 22,
            BB1: 34,
            BB2: 46,
            BB4: 70,
            BB5: 82,
            BB6: 94,
            BB7: 106,
            BB8: 118,
            B0: 23,
            B1: 35,
            B2: 47,
            B4: 71,
            B5: 83,
            B6: 95,
            B7: 107,
            B8: 119,
            C0: 12,
            C1: 24,
            C2: 36,
            C3: 48,
            C5: 72,
            C6: 84,
            C7: 96,
            C8: 108,
            "#C0": 13,
            "#C1": 25,
            "#C2": 37,
            "#C3": 49,
            "#C5": 73,
            "#C6": 85,
            "#C7": 97,
            "#C8": 109,
            BD0: 13,
            BD1: 25,
            BD2: 37,
            BD3: 49,
            BD5: 73,
            BD6: 85,
            BD7: 97,
            BD8: 109,
            D0: 14,
            D1: 26,
            D2: 38,
            D3: 50,
            D5: 74,
            D6: 86,
            D7: 98,
            D8: 110,
            "#D0": 15,
            "#D1": 27,
            "#D2": 39,
            "#D3": 51,
            "#D5": 75,
            "#D6": 87,
            "#D7": 99,
            "#D8": 111,
            BE0: 15,
            BE1: 27,
            BE2: 39,
            BE3: 51,
            BE5: 75,
            BE6: 87,
            BE7: 99,
            BE8: 111,
            E0: 16,
            E1: 28,
            E2: 40,
            E3: 52,
            E5: 76,
            E6: 88,
            E7: 100,
            E8: 112,
            F0: 17,
            F1: 29,
            F2: 41,
            F3: 53,
            F5: 77,
            F6: 89,
            F7: 101,
            F8: 113,
            "#F0": 18,
            "#F1": 30,
            "#F2": 42,
            "#F3": 54,
            "#F5": 78,
            "#F6": 90,
            "#F7": 102,
            "#F8": 114,
            BG0: 18,
            BG1: 30,
            BG2: 42,
            BG3: 54,
            BG5: 78,
            BG6: 90,
            BG7: 102,
            BG8: 114,
            G0: 19,
            G1: 31,
            G2: 43,
            G3: 55,
            G5: 79,
            G6: 91,
            G7: 103,
            G8: 115
        };
        return t = t.toUpperCase(), e[t] ? e[t] : 60
    }
    function s(t) {
        var e = {
                60: "C",
                61: "bD",
                62: "D",
                63: "bE",
                64: "E",
                65: "F",
                66: "bG",
                67: "G",
                68: "bA",
                69: "A",
                70: "bB",
                71: "B"
            },
            r = (t - 60) % 12;
        return 0 > r && (r += 12), e[r + 60]
    }
    function i(t) {
        var e = Math.floor((t - 60) / 12) + 4;
        return s(t) + e
    }
    function n(t) {
        var e = [1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6, 7],
            r = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
            s = {
                scale: e[t % 12],
                accidental: r[t % 12],
                octave: parseInt(t / 12) - 5,
                noteNumber: t,
                duration: 1,
                type: "note"
            };
        return s
    }
    function a(t) {
        if (0 == t.scale)
            return 0;
        var e = [0, 0, 2, 4, 5, 7, 9, 11];
        return 12 * t.octave + 60 + e[t.scale] + t.accidental
    }
    function o(t) {
        t || (t = "AC");
        var e = {
            BF: 41,
            BG: 43,
            BC: 48,
            AF: 53,
            AG: 55,
            AC: 60,
            SF: 65,
            SG: 67,
            SC: 72
        };
        return e[t.toUpperCase()] ? e[t.toUpperCase()] : 60
    }
    function u(t, e) {
        var r = t[e];
        if (r)
            return r + "";
        var s = null,
            i = null;
        for (var n in t)
            (!s || s > n) && (s = n), (!i || n > i) && (i = n);
        return s > e ? h(t[s], "a") : h(t[i], "b")
    }
    function h(t, e) {
        return t += "", t.replace(/[abx]/g, "") + e
    }
    function c(t, e) {
        for (var r = 0; r < t.avaiableFingerings.length; r++)
            if (t.avaiableFingerings[r] == e)
                return;
        return _("pushAvaiableFingeringToInstrument " + e), t.avaiableFingerings.push(e), t
    }
    function l(t, e) {
        var r = t.match(/\d+/g);
        return r ? r[0] : e ? e : 0
    }
    function p(t, e) {
        switch (t.durations || (t.durations = [1]), t.duration_marks || (t.duration_marks = []), t.cord || (t.cord = 0), t.dot || (t.dot = 0), e.charAt(0)) {
        case "_":
            t.duration_marks.length > 0 && "_" == t.duration_marks[t.duration_marks.length - 1].charAt(0) ? t.duration_marks[t.duration_marks.length - 1] += e : t.duration_marks.push(e), t.durations[0] *= Math.pow(.5, e.length);
            break;
        case "-":
            t.duration_marks.push(e);
            for (var r = 0; r < e.length; r++)
                t.durations.push(1);
            t.cord += e.length;
            break;
        case ".":
            t.duration_marks.length > 0 && "." == t.duration_marks[t.duration_marks.length - 1].charAt(0) ? t.duration_marks[t.duration_marks.length - 1] += e : t.duration_marks.push(e), t.durations.push("."), t.dot += e.length
        }
        for (var s = 0, r = 0; r < t.durations.length; r++)
            "." == t.durations[r] ? last_duration *= .5 : last_duration = t.durations[r], s += last_duration;
        return t.duration = s, t
    }
    function m(t, e) {
        for (var r = t;;) {
            if ("slur" != r.type) {
                "note" == r.type && p(r, e);
                break
            }
            r = r.measures[r.measures.length - 1]
        }
        return t
    }
    function f(t) {
        var e = 0;
        t.n && (e = t.n - 1);
        for (var r = [], s = t.measures, i = e; i < s.length; i++)
            if ("note" != s[i].type) {
                if ("slur" == s[i].type)
                    return t
            } else
                r.push(s[i]);
        if (r.length < 1)
            return t;
        if (r[0].slur_break && (r[0].slur_break = 2), 1 == r.length)
            return e ? t : (r[0].slur_break = 2, r[0]);
        if (r.length > 1) {
            var n = !0;
            for (i = 1; i < r.length; i++)
                if (n)
                    if (r[i].no_tie)
                        n = !1;
                    else {
                        var o = a(r[i - 1]),
                            u = a(r[i]);
                        u == o && (i == r.length - 1 || r[i].slur_break) ? (n = !0, g(r[i])) : n = !1
                    }
                else
                    r[i].slur_break && (r[i].slur_break = 2, n = !0)
        }
        return t
    }
    function y(t) {
        return t.slur_break && 1 == t.slur_break
    }
    function g(t) {
        return t.slur_break = 1, t.mark && delete t.mark, t
    }
    function _(t) {
        $e.debug && ("object" == typeof t ? t = JSON.stringify(t) : "number" == typeof t ? t += "" : t = Array.from(arguments).join(", "), t = t.replace(/\n/, "\n>>> "), console.log(">>> " + t))
    }
    function b(t) {
        this.curKeyNoteNumber = 60, this.hasKeyNoteNumber = !1, this.fingeringNoteQueue = [], this.sectionNo = 1, this.sectionDuration = 0, this.curInstrument = {
            instrument: "o6",
            fingering: "",
            tonality: null,
            minNote: null,
            maxNote: null,
            allNote: null,
            avaiableFingerings: [],
            notes: []
        }, this.result = {
            measures: t,
            notes: [],
            instruments: [],
            fingerings: [],
            options: {
                media: "screen",
                display: "text",
                align: "auto",
                bpm: 0
            },
            lrcs: []
        }, this.bpm = 100, this.leaves = [], this.play = [], this.section_map = {}, this.section_name = !1, this.section_measure = !1, this.repeat = 0, this.no_repeat = 0, this.is_prelude = 0, this.set_fingerings = [], this.avaiable_fingerings = [], this.set_tonalities = [], this.lrc_offset = 0, this.lrc_time = !1
    }
    function d(t, e) {
        this.repeatNumber = 1, this.repeatAgain = 0, this.duplicateNumber = 0, this.curKeyNoteNumber = 60, this.tonality = e.tonality, this.fingeringKeyNumber = e.keyNumber, this.notes = [], this.measures = t, this.part = !1, this.partNotes = {}, this.groupNotes = {}
    }
    function N() {
        this.groupNotes = {}, this.partNotes = {}
    }
    function v() {
        this.yy = {}
    }
    var k = function(t, e, r, s) {
            for (r = r || {}, s = t.length; s--; r[t[s]] = e)
                ;
            return r
        },
        I = [1, 7],
        E = [1, 8],
        x = [1, 9],
        D = [1, 10],
        F = [1, 11],
        A = [1, 12],
        B = [1, 13],
        $ = [1, 14],
        w = [1, 15],
        T = [1, 16],
        C = [1, 17],
        S = [1, 18],
        O = [1, 19],
        K = [1, 20],
        G = [1, 21],
        M = [1, 22],
        L = [1, 23],
        R = [1, 24],
        U = [1, 25],
        P = [1, 26],
        X = [1, 27],
        j = [1, 28],
        H = [1, 29],
        Y = [1, 30],
        q = [1, 31],
        J = [1, 32],
        Q = [1, 33],
        z = [1, 34],
        W = [1, 35],
        V = [1, 36],
        Z = [1, 37],
        te = [1, 38],
        ee = [1, 39],
        re = [1, 40],
        se = [1, 41],
        ie = [1, 42],
        ne = [1, 43],
        ae = [1, 44],
        oe = [1, 45],
        ue = [1, 46],
        he = [1, 47],
        ce = [1, 48],
        le = [1, 51],
        pe = [1, 50],
        me = [1, 49],
        fe = [5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 57, 58, 63],
        ye = [1, 70],
        ge = [1, 71],
        _e = [1, 72],
        be = [1, 73],
        de = [1, 74],
        Ne = [5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 57, 58, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
        ve = [5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 57, 58, 63, 65, 66, 67, 68, 69],
        ke = [1, 86],
        Ie = {
            trace: function() {},
            yy: {},
            symbols_: {
                error: 2,
                BODY: 3,
                MEASURES: 4,
                EOF: 5,
                MEASURE: 6,
                NOTE: 7,
                SLUR: 8,
                RIGHT_SLUR: 9,
                LEFT_SLUR_BEGIN: 10,
                LEFT_SLUR_END: 11,
                NSLUR: 12,
                ")": 13,
                CHORD: 14,
                TEXT: 15,
                TEXT_COMMENT: 16,
                TEXT_PRELUDE: 17,
                TEXT_MIDLUDE: 18,
                TEXT_ENDLUDE: 19,
                TEXT_NEWLINE: 20,
                UNICODE: 21,
                SECTION: 22,
                FINGERING_AUTO: 23,
                INFO_END: 24,
                INFO1: 25,
                INFO2: 26,
                KEYNOTE: 27,
                RHYTHM: 28,
                START: 29,
                PART_BEGIN: 30,
                LRC_OFFSET: 31,
                LRC_TIME: 32,
                "]": 33,
                "|": 34,
                v: 35,
                "||": 36,
                "//": 37,
                "|:": 38,
                REPEAT_END: 39,
                FINE: 40,
                DC: 41,
                DS: 42,
                REST: 43,
                "{{": 44,
                "}}": 45,
                "%n(": 46,
                "%n)": 47,
                "%f(": 48,
                "%f)": 49,
                "%<(": 50,
                "%<)": 51,
                "%>(": 52,
                "%>)": 53,
                RIGHT_SLUR_BEGIN: 54,
                RIGHT_SLUR_END: 55,
                DURATION: 56,
                "(": 57,
                SCALE: 58,
                MODIFIER: 59,
                OCTAVE: 60,
                g: 61,
                d: 62,
                ")@": 63,
                "@(": 64,
                _: 65,
                x: 66,
                "=": 67,
                DOT: 68,
                CORD: 69,
                "*": 70,
                ">": 71,
                "^": 72,
                "/": 73,
                "~": 74,
                "!~": 75,
                $: 76,
                "!$": 77,
                DYNAMICS: 78,
                ACCIDENTAL: 79,
                $accept: 0,
                $end: 1
            },
            terminals_: {
                2: "error",
                5: "EOF",
                10: "LEFT_SLUR_BEGIN",
                11: "LEFT_SLUR_END",
                12: "NSLUR",
                13: ")",
                14: "CHORD",
                15: "TEXT",
                16: "TEXT_COMMENT",
                17: "TEXT_PRELUDE",
                18: "TEXT_MIDLUDE",
                19: "TEXT_ENDLUDE",
                20: "TEXT_NEWLINE",
                21: "UNICODE",
                22: "SECTION",
                23: "FINGERING_AUTO",
                24: "INFO_END",
                25: "INFO1",
                26: "INFO2",
                27: "KEYNOTE",
                28: "RHYTHM",
                29: "START",
                30: "PART_BEGIN",
                31: "LRC_OFFSET",
                32: "LRC_TIME",
                33: "]",
                34: "|",
                35: "v",
                36: "||",
                37: "//",
                38: "|:",
                39: "REPEAT_END",
                40: "FINE",
                41: "DC",
                42: "DS",
                43: "REST",
                44: "{{",
                45: "}}",
                46: "%n(",
                47: "%n)",
                48: "%f(",
                49: "%f)",
                50: "%<(",
                51: "%<)",
                52: "%>(",
                53: "%>)",
                54: "RIGHT_SLUR_BEGIN",
                55: "RIGHT_SLUR_END",
                57: "(",
                58: "SCALE",
                60: "OCTAVE",
                61: "g",
                62: "d",
                63: ")@",
                64: "@(",
                65: "_",
                66: "x",
                67: "=",
                68: "DOT",
                69: "CORD",
                70: "*",
                71: ">",
                72: "^",
                73: "/",
                74: "~",
                75: "!~",
                76: "$",
                77: "!$",
                78: "DYNAMICS",
                79: "ACCIDENTAL"
            },
            productions_: [0, [3, 2], [4, 1], [4, 2], [6, 1], [6, 1], [6, 1], [6, 3], [6, 3], [6, 3], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [9, 3], [9, 2], [8, 3], [8, 2], [7, 1], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 4], [7, 4], [56, 1], [56, 1], [56, 1], [56, 1], [56, 1], [59, 1], [59, 1], [59, 1], [59, 1], [59, 1], [59, 1], [59, 1], [59, 1], [59, 1], [59, 1]],
            performAction: function(t, e, r, s, i, n, a) {
                var o = n.length - 1;
                switch (i) {
                case 1:
                    var u = new b(n[o - 1]);
                    return u.calcResult();
                case 2:
                    var h = [],
                        c = n[o];
                    c.first_line = a[o].first_line, c.first_column = a[o].first_column, c.last_line = a[o].last_line, c.last_column = a[o].last_column, this.$ = $e.pushNewMeasure(h, c);
                    break;
                case 3:
                    var h = n[o - 1],
                        c = n[o];
                    c.first_line = a[o].first_line, c.first_column = a[o].first_column, c.last_line = a[o].last_line, c.last_column = a[o].last_column, this.$ = $e.pushNewMeasure(h, c);
                    break;
                case 7:
                    this.$ = {
                        type: "left_slur",
                        measures: n[o - 1]
                    };
                    break;
                case 8:
                    this.$ = {
                        type: "nslur",
                        measures: n[o - 1],
                        n: l(n[o - 2])
                    };
                    break;
                case 9:
                    var h = n[o - 1],
                        y = h.shift();
                    y.chord = h;
                    for (var g = 0; g < h.length; g++)
                        h[g].duration = y.duration;
                    this.$ = y;
                    break;
                case 10:
                    var d = n[o];
                    d = d.replace("{text}", "").replace("{/text}", ""), this.$ = {
                        type: "text",
                        content: d,
                        new_line: 0,
                        bold: 0
                    };
                    break;
                case 11:
                    var d = n[o],
                        N = d.indexOf("("),
                        v = d.substr(0, N);
                    for (++N; N < d.length && (" " == d.charAt(N) || " " == d.charAt(N)); N++)
                        ;
                    d = d.substr(N), d = d.replace(/\s*%t\)/, ""), this.$ = {
                        type: "text",
                        content: d,
                        new_line: 0,
                        bold: 0,
                        line: l(v)
                    };
                    break;
                case 12:
                    var k = l(n[o]);
                    this.$ = {
                        type: "text",
                        content: k ? "前奏" + k + "小节" : "前奏略",
                        new_line: 0,
                        bold: 0,
                        line: 0
                    };
                    break;
                case 13:
                    var k = l(n[o]);
                    this.$ = {
                        type: "text",
                        content: k ? "间奏" + k + "小节" : "间奏略",
                        new_line: 0,
                        bold: 0,
                        line: 0
                    };
                    break;
                case 14:
                    var k = l(n[o]);
                    this.$ = {
                        type: "text",
                        content: k ? "间奏" + k + "小节" : "尾奏略",
                        new_line: 0,
                        bold: 0,
                        line: 0
                    };
                    break;
                case 15:
                    this.$ = {
                        type: "text",
                        content: "",
                        new_line: 1,
                        bold: 0,
                        line: 0
                    };
                    break;
                case 16:
                    this.$ = {
                        type: "text",
                        content: n[o],
                        new_line: 0,
                        bold: 0
                    };
                    break;
                case 17:
                    var I = n[o],
                        E = {
                            type: "text",
                            content: I,
                            new_line: 1,
                            bold: 1,
                            section_name: I.replace(":", "")
                        };
                    I.charAt(0) >= "a" && I.charAt(0) <= "z" && (E.bold = 1, E.new_line = 0), this.$ = E;
                    break;
                case 18:
                    this.$ = {
                        type: "info",
                        o12f: "auto",
                        o6f: "auto",
                        x8f: "auto",
                        x10f: "auto"
                    };
                    break;
                case 19:
                    var I = n[o],
                        x = I.match(/(\w+)/),
                        E = {
                            type: "info"
                        };
                    switch (E[x[1] + "_end"] = 1, x[1].toLowerCase()) {
                    case "cresc":
                        E = {
                            type: "cresc_end"
                        };
                        break;
                    case "dim":
                        E = {
                            type: "dim_end"
                        };
                        break;
                    case "skip":
                        E = {
                            type: "no_repeat_end"
                        };
                        break;
                    case "free":
                        E = {
                            type: "free_repeat_end"
                        };
                        break;
                    case "group":
                        delete E[x[1] + "_end"], E.harmony_end = 1
                    }
                    this.$ = E, _(JSON.stringify(E));
                    break;
                case 20:
                    var I = n[o],
                        x = I.match(/{\s*(\w+)\s*}/),
                        E = {
                            type: "info"
                        };
                    switch (E[x[1]] = 1, x[1].toLowerCase()) {
                    case "cresc":
                        E = {
                            type: "cresc_begin"
                        };
                        break;
                    case "dim":
                        E = {
                            type: "dim_begin"
                        };
                        break;
                    case "nl":
                        E = {
                            type: "text",
                            content: "",
                            new_line: 1,
                            bold: 0,
                            line: 0
                        };
                        break;
                    case "ws":
                        E = {
                            type: "text",
                            content: " ",
                            new_line: 0,
                            bold: 0,
                            line: 0
                        };
                        break;
                    case "skip":
                        E = {
                            type: "no_repeat_begin"
                        };
                        break;
                    case "free":
                        E = {
                            type: "free_repeat_begin"
                        };
                        break;
                    case "fine":
                        E = {
                            type: "fine_bar",
                            n: 0
                        };
                        break;
                    case "ds":
                        E = {
                            type: "ds_bar",
                            n: 0
                        };
                        break;
                    case "dc":
                        E = {
                            type: "dc_bar",
                            n: 0
                        }
                    }
                    this.$ = E, _(JSON.stringify(E));
                    break;
                case 21:
                    var I = n[o],
                        x = I.match(/{\s*(\w+)\s*:\s*(.+)\s*}/),
                        E = {
                            type: "info"
                        };
                    switch (E[x[1]] = x[2], x[1].toLowerCase()) {
                    case "debug":
                        $e.debug = x[2], "0" === $e.debug && ($e.debug = !1);
                        break;
                    case "group":
                        delete E[x[1]], E.harmony = x[2];
                        break;
                    case "play":
                        E.play_hint = "演奏顺序：" + x[2], E.play = E.play.split(/[\s\,]+/);
                        break;
                    case "octave":
                        $e.octave = parseInt(x[2]);
                        break;
                    case "f":
                        E = {
                            type: "info",
                            o12f: x[2],
                            o6f: x[2],
                            x8f: x[2],
                            x10f: x[2]
                        };
                        break;
                    case "ff":
                        E = {
                            type: "info",
                            o12f: x[2],
                            o6f: x[2],
                            x8f: x[2],
                            x10f: x[2],
                            o3f: x[2]
                        };
                        break;
                    case "rest":
                        E = {
                            type: "stop",
                            n: parseInt(x[2])
                        };
                        break;
                    case "omit":
                        E = {
                            type: "text",
                            content: "省略" + parseInt(x[2]) + "小节",
                            new_line: 0,
                            bold: 0,
                            line: 0
                        };
                        break;
                    case "fine":
                        E = {
                            type: "fine_bar",
                            n: parseInt(x[2])
                        };
                        break;
                    case "ds":
                        E = {
                            type: "ds_bar",
                            n: parseInt(x[2])
                        };
                        break;
                    case "dc":
                        E = {
                            type: "dc_bar",
                            n: parseInt(x[2])
                        }
                    }
                    this.$ = E, _(JSON.stringify(E));
                    break;
                case 22:
                    var I = n[o],
                        x = I.match(/{\s*1\s*=\s*(.+)\s*}/),
                        E = {
                            type: "info",
                            1: x[1]
                        };
                    this.$ = E, _(JSON.stringify(E));
                    break;
                case 23:
                    var d = n[o],
                        D = d.split("/");
                    this.$ = {
                        type: "rhythm",
                        n: l(D[0]),
                        m: l(D[1])
                    };
                    break;
                case 24:
                    var F = n[o],
                        D = F.split("@");
                    this.$ = D.length > 1 ? {
                        type: "start_bar",
                        n: l(D[0]),
                        line: l(D[1]),
                        has_bar: "|" == F.charAt(0) ? 1 : 0
                    } : {
                        type: "start_bar",
                        n: l(n[o]),
                        line: 0,
                        has_bar: "|" == F.charAt(0) ? 1 : 0
                    };
                    break;
                case 25:
                    var I = n[o],
                        x = I.match(/[\d,e]+/g);
                    x && (I = x[0]), this.$ = {
                        type: "repeat_part_begin",
                        repeat: I
                    };
                    break;
                case 26:
                    this.$ = {
                        type: "lrc_offset",
                        offset: l(n[o])
                    };
                    break;
                case 27:
                    var I = n[o],
                        x = I.match(/\[(\d{2,2}):(\d{2,2}\.?\d{0,2})\]/),
                        A = 60 * parseInt(x[1], 10) + parseFloat(x[2]);
                    this.$ = {
                        type: "lrc_time",
                        time: A
                    };
                    break;
                case 28:
                    this.$ = {
                        type: "repeat_part_end"
                    };
                    break;
                case 29:
                    this.$ = {
                        type: "single_bar"
                    };
                    break;
                case 30:
                    this.$ = {
                        type: "aeration"
                    };
                    break;
                case 31:
                    this.$ = {
                        type: "end_bar"
                    };
                    break;
                case 32:
                    this.$ = {
                        type: "section_end_bar"
                    };
                    break;
                case 33:
                    this.$ = {
                        type: "repeat_begin_bar"
                    };
                    break;
                case 34:
                    this.$ = {
                        type: "repeat_end_bar",
                        repeat: l(n[o], 1)
                    };
                    break;
                case 35:
                    this.$ = {
                        type: "fine_bar",
                        n: l(n[o])
                    };
                    break;
                case 36:
                    this.$ = {
                        type: "dc_bar",
                        n: l(n[o])
                    };
                    break;
                case 37:
                    this.$ = {
                        type: "ds_bar",
                        n: l(n[o])
                    };
                    break;
                case 38:
                    this.$ = {
                        type: "stop",
                        n: l(n[o])
                    };
                    break;
                case 39:
                    this.$ = {
                        type: "prelude_begin"
                    };
                    break;
                case 40:
                    this.$ = {
                        type: "prelude_end"
                    };
                    break;
                case 41:
                    this.$ = {
                        type: "no_repeat_begin"
                    };
                    break;
                case 42:
                    this.$ = {
                        type: "no_repeat_end"
                    };
                    break;
                case 43:
                    this.$ = {
                        type: "free_repeat_begin"
                    };
                    break;
                case 44:
                    this.$ = {
                        type: "free_repeat_end"
                    };
                    break;
                case 45:
                    this.$ = {
                        type: "cresc_begin"
                    };
                    break;
                case 46:
                    this.$ = {
                        type: "cresc_end"
                    };
                    break;
                case 47:
                    this.$ = {
                        type: "dim_begin"
                    };
                    break;
                case 48:
                    this.$ = {
                        type: "dim_end"
                    };
                    break;
                case 49:
                    this.$ = {
                        type: "right_slur",
                        measures: n[o - 1]
                    };
                    break;
                case 50:
                case 52:
                    this.$ = m(n[o - 1], n[o]);
                    break;
                case 51:
                    var B = {
                        type: "slur",
                        measures: n[o - 1]
                    };
                    this.$ = f(B);
                    break;
                case 53:
                    $ = {
                        id: $e.nextNoteId(),
                        scale: t,
                        accidental: 0,
                        octave: $e.octave,
                        duration: 1,
                        type: "note"
                    }, "8" == $.scale ? ($.scale = "0", $.content = "X", $.has_lyric = 1) : "9" == $.scale && ($.scale = "0", $.content = " ", $.has_lyric = 1), "0" == $.scale && ($.octave = 0), this.$ = $, _($);
                    break;
                case 54:
                    var $ = n[o - 1],
                        w = n[o];
                    for (var T in w)
                        $[T] = w[T];
                    this.$ = $, _($);
                    break;
                case 55:
                    $ = n[o - 1], "," == n[o] ? $.octave -= 1 : "'" == n[o] ? $.octave += 1 : '"' == n[o] && ($.octave += 2), this.$ = $, _($);
                    break;
                case 56:
                    $ = n[o - 1], $.octave += 1, this.$ = $, _($);
                    break;
                case 57:
                    $ = n[o - 1], $.octave -= 1, this.$ = $, _($);
                    break;
                case 58:
                    this.$ = p(n[o - 1], n[o]);
                    break;
                case 59:
                    $ = n[o], $.left_appoggiatura = n[o - 2], this.$ = $, _($);
                    break;
                case 60:
                    $ = n[o - 3], $.right_appoggiatura = n[o - 1], this.$ = $, _($);
                    break;
                case 61:
                case 62:
                    this.$ = "_";
                    break;
                case 63:
                    this.$ = "__";
                    break;
                case 64:
                    this.$ = ".";
                    break;
                case 65:
                    var I = n[o];
                    this.$ = I.replace(/\s+/g, "");
                    break;
                case 66:
                    this.$ = {
                        pause: 1
                    };
                    break;
                case 67:
                    this.$ = {
                        accent: 1
                    };
                    break;
                case 68:
                    this.$ = {
                        accent: 2
                    };
                    break;
                case 69:
                    this.$ = {
                        tenuto: 1
                    };
                    break;
                case 70:
                    this.$ = {
                        mordent: 1
                    };
                    break;
                case 71:
                    this.$ = {
                        mordent: 2
                    };
                    break;
                case 72:
                    this.$ = {
                        slur_break: 2
                    };
                    break;
                case 73:
                    this.$ = {
                        no_tie: 1
                    };
                    break;
                case 74:
                    var C = n[o];
                    this.$ = "tr" == C ? {
                        trill: 1
                    } : "su" == C ? {
                        slide: 1
                    } : "sd" == C ? {
                        slide: 2
                    } : "st" == C ? {
                        staccato: 1
                    } : {
                        dynamics: C
                    };
                    break;
                case 75:
                    this.$ = {
                        accidental: Be[n[o]]
                    }
                }
            },
            table: [{
                3: 1,
                4: 2,
                6: 3,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, {
                1: [3]
            }, {
                5: [1, 52],
                6: 53,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, k(fe, [2, 2]), k(fe, [2, 4], {
                59: 54,
                56: 58,
                60: [1, 55],
                61: [1, 56],
                62: [1, 57],
                64: [1, 59],
                65: ye,
                66: ge,
                67: _e,
                68: be,
                69: de,
                70: [1, 60],
                71: [1, 61],
                72: [1, 62],
                73: [1, 63],
                74: [1, 64],
                75: [1, 65],
                76: [1, 66],
                77: [1, 67],
                78: [1, 68],
                79: [1, 69]
            }), k(fe, [2, 5], {
                56: 75,
                65: ye,
                66: ge,
                67: _e,
                68: be,
                69: de
            }), k(fe, [2, 6], {
                56: 76,
                65: ye,
                66: ge,
                67: _e,
                68: be,
                69: de
            }), {
                4: 77,
                6: 3,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, {
                4: 78,
                6: 3,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, {
                4: 79,
                6: 3,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, k(fe, [2, 10]), k(fe, [2, 11]), k(fe, [2, 12]), k(fe, [2, 13]), k(fe, [2, 14]), k(fe, [2, 15]), k(fe, [2, 16]), k(fe, [2, 17]), k(fe, [2, 18]), k(fe, [2, 19]), k(fe, [2, 20]), k(fe, [2, 21]), k(fe, [2, 22]), k(fe, [2, 23]), k(fe, [2, 24]), k(fe, [2, 25]), k(fe, [2, 26]), k(fe, [2, 27]), k(fe, [2, 28]), k(fe, [2, 29]), k(fe, [2, 30]), k(fe, [2, 31]), k(fe, [2, 32]), k(fe, [2, 33]), k(fe, [2, 34]), k(fe, [2, 35]), k(fe, [2, 36]), k(fe, [2, 37]), k(fe, [2, 38]), k(fe, [2, 39]), k(fe, [2, 40]), k(fe, [2, 41]), k(fe, [2, 42]), k(fe, [2, 43]), k(fe, [2, 44]), k(fe, [2, 45]), k(fe, [2, 46]), k(fe, [2, 47]), k(fe, [2, 48]), k(Ne, [2, 53]), {
                4: 80,
                6: 3,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, {
                4: 81,
                6: 3,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, {
                1: [2, 1]
            }, k(fe, [2, 3]), k(Ne, [2, 54]), k(Ne, [2, 55]), k(Ne, [2, 56]), k(Ne, [2, 57]), k(Ne, [2, 58]), {
                4: 82,
                6: 3,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, k(Ne, [2, 66]), k(Ne, [2, 67]), k(Ne, [2, 68]), k(Ne, [2, 69]), k(Ne, [2, 70]), k(Ne, [2, 71]), k(Ne, [2, 72]), k(Ne, [2, 73]), k(Ne, [2, 74]), k(Ne, [2, 75]), k(Ne, [2, 61]), k(Ne, [2, 62]), k(Ne, [2, 63]), k(Ne, [2, 64]), k(Ne, [2, 65]), k(ve, [2, 52]), k(ve, [2, 50]), {
                6: 53,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                11: [1, 83],
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, {
                6: 53,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                13: [1, 84],
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, {
                6: 53,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                13: [1, 85],
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, {
                6: 53,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                13: [1, 87],
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me,
                63: ke
            }, {
                6: 53,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                55: [1, 88],
                57: pe,
                58: me
            }, {
                6: 53,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                13: [1, 89],
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, k(fe, [2, 7]), k(fe, [2, 8]), k(fe, [2, 9]), {
                7: 90,
                57: [1, 91],
                58: me
            }, k(ve, [2, 51]), k(ve, [2, 49]), k(Ne, [2, 60]), k(Ne, [2, 59], {
                59: 54,
                56: 58
            }), {
                4: 92,
                6: 3,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me
            }, {
                6: 53,
                7: 4,
                8: 5,
                9: 6,
                10: I,
                12: E,
                14: x,
                15: D,
                16: F,
                17: A,
                18: B,
                19: $,
                20: w,
                21: T,
                22: C,
                23: S,
                24: O,
                25: K,
                26: G,
                27: M,
                28: L,
                29: R,
                30: U,
                31: P,
                32: X,
                33: j,
                34: H,
                35: Y,
                36: q,
                37: J,
                38: Q,
                39: z,
                40: W,
                41: V,
                42: Z,
                43: te,
                44: ee,
                45: re,
                46: se,
                47: ie,
                48: ne,
                49: ae,
                50: oe,
                51: ue,
                52: he,
                53: ce,
                54: le,
                57: pe,
                58: me,
                63: ke
            }],
            defaultActions: {
                52: [2, 1]
            },
            parseError: function(t, e) {
                if (!e.recoverable)
                    throw new Error(t);
                this.trace(t)
            },
            parse: function(t) {
                function e() {
                    var t;
                    return t = f.lex() || p, "number" != typeof t && (t = r.symbols_[t] || t), t
                }
                var r = this,
                    s = [0],
                    i = [null],
                    n = [],
                    a = this.table,
                    o = "",
                    u = 0,
                    h = 0,
                    c = 0,
                    l = 2,
                    p = 1,
                    m = n.slice.call(arguments, 1),
                    f = Object.create(this.lexer),
                    y = {
                        yy: {}
                    };
                for (var g in this.yy)
                    Object.prototype.hasOwnProperty.call(this.yy, g) && (y.yy[g] = this.yy[g]);
                f.setInput(t, y.yy), y.yy.lexer = f, y.yy.parser = this, "undefined" == typeof f.yylloc && (f.yylloc = {});
                var _ = f.yylloc;
                n.push(_);
                var b = f.options && f.options.ranges;
                this.parseError = "function" == typeof y.yy.parseError ? y.yy.parseError : Object.getPrototypeOf(this).parseError;
                for (var d, N, v, k, I, E, x, D, F, A = {};;) {
                    if (v = s[s.length - 1], this.defaultActions[v] ? k = this.defaultActions[v] : ((null === d || "undefined" == typeof d) && (d = e()), k = a[v] && a[v][d]), "undefined" == typeof k || !k.length || !k[0]) {
                        var B = "";
                        F = [];
                        for (E in a[v])
                            this.terminals_[E] && E > l && F.push("'" + this.terminals_[E] + "'");
                        B = f.showPosition ? "Parse error on line " + (u + 1) + ":\n" + f.showPosition() + "\nExpecting " + F.join(", ") + ", got '" + (this.terminals_[d] || d) + "'" : "Parse error on line " + (u + 1) + ": Unexpected " + (d == p ? "end of input" : "'" + (this.terminals_[d] || d) + "'"), this.parseError(B, {
                            text: f.match,
                            token: this.terminals_[d] || d,
                            line: f.yylineno,
                            loc: _,
                            expected: F
                        })
                    }
                    if (k[0] instanceof Array && k.length > 1)
                        throw new Error("Parse Error: multiple actions possible at state: " + v + ", token: " + d);
                    switch (k[0]) {
                    case 1:
                        s.push(d), i.push(f.yytext), n.push(f.yylloc), s.push(k[1]), d = null, N ? (d = N, N = null) : (h = f.yyleng, o = f.yytext, u = f.yylineno, _ = f.yylloc, c > 0 && c--);
                        break;
                    case 2:
                        if (x = this.productions_[k[1]][1], A.$ = i[i.length - x], A._$ = {
                            first_line: n[n.length - (x || 1)].first_line,
                            last_line: n[n.length - 1].last_line,
                            first_column: n[n.length - (x || 1)].first_column,
                            last_column: n[n.length - 1].last_column
                        }, b && (A._$.range = [n[n.length - (x || 1)].range[0], n[n.length - 1].range[1]]), I = this.performAction.apply(A, [o, h, u, y.yy, k[1], i, n].concat(m)), "undefined" != typeof I)
                            return I;
                        x && (s = s.slice(0, -1 * x * 2), i = i.slice(0, -1 * x), n = n.slice(0, -1 * x)), s.push(this.productions_[k[1]][0]), i.push(A.$), n.push(A._$), D = a[s[s.length - 2]][s[s.length - 1]], s.push(D);
                        break;
                    case 3:
                        return !0
                    }
                }
                return !0
            }
        },
        Ee = {
            59: "111111a",
            60: "111111x",
            61: "101111a",
            62: "101111x",
            63: "111011a",
            64: "111011x",
            65: "101011x",
            66: "011111x",
            67: "001111x",
            68: "011011x",
            69: "001011x",
            70: "000111x",
            71: "010011x",
            72: "000011x",
            73: "010010x",
            74: "000010x",
            75: "010000x",
            76: "000000x",
            77: "000000b"
        },
        xe = {
            57: "111111111111x",
            58: "111111111110x",
            59: "111110111111x",
            60: "111110111110x",
            61: "111110111101x",
            62: "111110111100x",
            63: "111110111001x",
            64: "111110111000x",
            65: "111110110000x",
            66: "111110100100x",
            67: "111110100000x",
            68: "111010100100x",
            69: "111010100000x",
            70: "110010100100x",
            71: "110010100000x",
            72: "100010100000x",
            73: "000010100100x",
            74: "000010100000x",
            75: "000010000100x",
            76: "000010000000x",
            77: "000000000000x"
        },
        De = {
            57: 57,
            58: 58,
            59: 59,
            60: 60,
            61: 61,
            62: 62,
            63: 63,
            64: 64,
            65: 65,
            66: 66,
            67: 67,
            68: 68,
            69: 69,
            70: 70,
            71: 71,
            72: 72,
            73: 73,
            74: 74,
            75: 75,
            76: 76,
            77: 77,
            78: 78,
            79: 79,
            80: 80,
            81: 81,
            82: 82,
            83: 83,
            84: 84,
            85: 85,
            86: 86,
            87: 87,
            88: 88,
            89: 89,
            90: 90,
            91: 91
        },
        Fe = {
            60: 60,
            61: "62a",
            62: 62,
            63: 63,
            64: 64,
            65: 65,
            66: 66,
            67: 67,
            68: 68,
            69: 69,
            70: 70,
            71: 71,
            72: 72,
            73: 73,
            74: 74,
            75: 75,
            76: 76,
            77: 77
        },
        Ae = {
            60: 60,
            61: "62a",
            62: 62,
            63: 63,
            64: 64,
            65: 65,
            66: 66,
            67: 67,
            68: 68,
            69: 69,
            70: 70,
            71: 71,
            72: 72,
            73: 73,
            74: 74,
            75: 75,
            76: 76,
            77: 77,
            78: 78,
            79: 79
        },
        Be = {
            "#": 1,
            "##": 2,
            n: 0,
            b: -1,
            bb: -2
        },
        $e = {
            note_id: 0,
            octave: 0,
            debug: !1
        };
    $e.pushNewMeasure = function(t, e) {
        return t.push(e), "note" == e.type && e.slide && t.push({
            type: 1 == e.slide ? "slide_up" : "slide_down",
            first_line: e.first_line,
            first_column: e.first_column,
            last_line: e.last_line,
            last_column: e.last_column
        }), t
    }, $e.nextNoteId = function() {
        return this.note_id++, this.note_id = this.note_id % 1e4, "note" + this.note_id
    }, b.prototype.calcResult = function() {
        return this.handleMeasures(this.result.measures), this.finishInstrument(), this.calcMidiNotes(), this.pushLrcNotes(), this.result.lrcs.sort(function(t, e) {
            return t.time - e.time
        }), this.result.fingerings = this.calcFingerings(this.result.instruments), $e.debug && console.log(JSON.stringify(this.result, null, 3)), this.result
    }, b.prototype.calcMidiNotes = function() {
        var e = {
            tonality: null,
            keyNumber: 60
        };
        this.result.instruments.length > 0 && (e = this.result.instruments[0]);
        var r = new N,
            s = new d(this.leaves, e);
        s.calcMeasures(), r.push(s), this.result.notes = s.notes;
        for (var i = {}, n = 0; n < this.play.length; n++) {
            var a = this.play[n],
                o = this.section_map[a];
            if (o) {
                a in i || (s = new d(o, s.getNewInstrument()), s.calcMeasures(), r.push(s), i[a] = s.notes);
                for (var u in i[a])
                    this.result.notes.push(t(i[a][u]))
            }
        }
        r.calc()
    }, b.prototype.prepareFingerings = function(t) {
        for (var e = 0; e < this.avaiable_fingerings.length; e++)
            for (var r = this.avaiable_fingerings[e].split("+"), s = 0; s < r.length; s++)
                s < t.length && c(t[s], r[s])
    }, b.prototype.calcFingerings = function(t) {
        var r = 1,
            s = [],
            i = [];
        this.prepareFingerings(t);
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            r *= a.avaiableFingerings.length, s.push(0)
        }
        if (!(2 > r)) {
            for (var o = function(t, r) {
                    for (var s = r[0], i = t[0].avaiableFingerings[s], n = e(i), a = {
                            name: n + "调指法",
                            value: i
                        }, o = 1; o < r.length; o++)
                        s = r[o], i = t[o].avaiableFingerings[s], n = e(i), a.name += "+" + n + "调指法", a.value += "," + i;
                    return _(a), a
                }, u = 0; r > u; u++) {
                for (var h = 1, c = u, n = 0; n < t.length; n++)
                    h = t[n].avaiableFingerings.length, s[n] = c % h, c = Math.floor(c / h);
                i.push(o(t, s))
            }
            return i
        }
    }, b.prototype.handleMeasures = function(s, i) {
        var n = null;
        i || (i = {});
        for (var a = 0; a < s.length; a++) {
            var o = s[a];
            if ("slur" != o.type && "left_slur" != o.type && "right_slur" != o.type)
                if ("nslur" != o.type)
                    if ("note" != o.type) {
                        if ("info" == o.type) {
                            if (o.set_fingering) {
                                this.set_fingerings = o.set_fingering.split(/[\s\,]+/);
                                var u = this.set_fingerings.shift(),
                                    h = r(u);
                                this.setKeyNumber(h)
                            }
                            o.set_tonality && (this.set_tonalities = o.set_tonality.split(/[\s\,]+/), _(this.set_tonalities), this.curInstrument.tonality = this.set_tonalities.shift()), o.i && o.i != this.curInstrument.instrument && (o.instrument = this.finishInstrument(), this.submitInstrument(o), this.curInstrument.instrument = o.i);
                            var c = this.curInstrument.instrument + "f";
                            if (o[c]) {
                                var u = o[c];
                                o.instrument = this.changeFingering(u), this.submitInstrument(o)
                            }
                            if (o[1]) {
                                o.instrument = this.changeFingering("auto");
                                var l = o[1];
                                this.curKeyNoteNumber = r(l), this.hasKeyNoteNumber = !0, o[1] = e(l), this.submitInstrument(o)
                            }
                            if (o.o && ("o6" == this.curInstrument.instrument || "o12" == this.curInstrument.instrument || "o3" == this.curInstrument.instrument)) {
                                var p = {
                                    da: "扌",
                                    die: "又",
                                    hua: "*",
                                    t: "T",
                                    T: "T",
                                    k: "K",
                                    K: "K"
                                };
                                p[o.o] && (n.comment = p[o.o])
                            }
                            if (o.pf && "piano" == this.curInstrument.instrument) {
                                var p = {
                                    1: "①",
                                    2: "②",
                                    3: "③",
                                    4: "④",
                                    5: "⑤"
                                };
                                p[o.pf] && (n.comment = p[o.pf])
                            }
                            o.bpm && (this.bpm = o.bpm), o.ms && (this.bpm = 100 * o.ms), o.play && (this.play = o.play, this.result.play = o), this.handleMeasureMedia(o), this.handleMeasureFingerings(o)
                        } else {
                            if ("single_bar" == o.type) {
                                o.sectionDuration = this.sectionDuration;
                                var m = parseInt(1e3 * this.sectionDuration) % 1e3;
                                if (999 == m || 0 == m)
                                    o.sectionDuration = Math.round(this.sectionDuration);
                                else {
                                    o.warning = this.sectionDuration + "拍,不是整数拍";
                                    var y = "第" + o.first_line + "行,第" + o.first_column + "列,第" + this.sectionNo + "小节：" + this.sectionDuration + "拍,不是整数拍";
                                    _(y)
                                }
                                this.sectionNo++, this.sectionDuration = 0;
                                continue
                            }
                            "prelude_begin" == o.type ? this.is_prelude = 1 : "prelude_end" == o.type ? this.is_prelude = 0 : "repeat_part_begin" == o.type ? this.repeat = o.repeat : "repeat_part_end" == o.type || "repeat_end_bar" == o.type ? this.repeat = 0 : "no_repeat_begin" == o.type ? this.no_repeat = 1 : "no_repeat_end" == o.type ? this.no_repeat = 0 : "lrc_time" == o.type ? this.lrc_time && this.lrc_time.notes.length < 1 ? (this.lrc_time.times.push(o.time + this.offset), o.new_line = !1) : (this.pushLrcNotes(), this.lrc_time = {
                                times: [o.time + this.offset],
                                notes: []
                            }, o.new_line = !1) : "lrc_offset" == o.type ? this.offset = .001 * o.offset : "text" == o.type && "section_name" in o && (this.section_name = o.section_name, this.section_measure = o, this.play.length > 0 && 1 == o.new_line && (this.repeat = 0))
                        }
                        this.pushLeaf(o)
                    } else {
                        var g = this.midiNote(o, i);
                        this.curInstrument.notes.push(g), this.lrc_time && this.lrc_time.notes.push(g), i.is_nslur && a < i.n ? (g.durationRatio = i.ratio, g.midiDuration *= i.ratio, g.noteDuration *= i.ratio, this.sectionDuration += o.duration * i.ratio) : this.sectionDuration += o.duration, g.repeat = this.repeat, g.no_repeat = this.no_repeat, s[a] = g, n = g, this.pushLeaf(g)
                    }
                else {
                    o = f(o);
                    var b = o.n,
                        d = {
                            2: 1.5,
                            3: 2 / 3,
                            4: .75,
                            5: .8,
                            6: 4 / 6,
                            7: 4 / 7,
                            9: 8 / 9,
                            10: .8,
                            11: 8 / 11
                        }[b];
                    d || (d = 1), options2 = t(i), options2["is_" + o.type] = !0, options2.n = b, options2.ratio = d, s[a].measures = this.handleMeasures(o.measures, options2)
                }
            else
                options2 = t(i), options2["is_" + o.type] = !0, s[a].measures = this.handleMeasures(o.measures, options2)
        }
        return s
    }, b.prototype.handleMeasureFingerings = function(t) {
        var e = !1;
        if ("fs" in t)
            e = t.fs;
        else {
            var r = this.curInstrument.instrument + "fs";
            r in t && (e = t[r])
        }
        if (e) {
            avaiableFingerings = e.split(/[\s\,]+/);
            for (var s = 0; s < avaiableFingerings.length; s++)
                this.avaiable_fingerings.push(avaiableFingerings[s])
        }
    }, b.prototype.getOption = function(t) {
        return this.result.options[t]
    }, b.prototype.setOption = function(t, e) {
        this.result.options[t] = e
    }, b.prototype.handleMeasureMedia = function(t) {
        var e = this.curInstrument.instrument;
        t.media && (this.setOption("media", t.media), "print" == t.media && this.setOption("display", "neat")), "print" == this.getOption("media") && (t.pe && (1 == t.pe && "o3" != e || t.pe == e) && (t.page_end = 1), t.bl && (1 == t.bl && "o3" != e || t.bl == e) && (t.type = "text", t.new_line = 1, t.content = "", t.bold = 0, t.line = 0)), t.display && this.setOption("display", t.display), "neat" == this.getOption("display") && t.le && (1 == t.le && "o3" != e || t.le == e) && (t.line_end = 1), t.align && this.setOption("align", t.align)
    }, b.prototype.pushLrcNotes = function() {
        if (this.lrc_time && !(this.lrc_time.notes.length < 1))
            for (var t = 0; t < this.lrc_time.times.length; t++) {
                var e = this.lrc_time.times[t];
                this.result.lrcs.push({
                    time: e,
                    notes: this.lrc_time.notes
                })
            }
    }, b.prototype.insertInstrumentToMeasure = function(t, e) {
        this.section_measure ? this.section_measure.instrument = t : e.instrument = t
    }, b.prototype.pushLeaf = function(t) {
        this.section_name && (this.section_map[this.section_name] || (this.section_map[this.section_name] = []), this.section_map[this.section_name].push(t), this.play.length > 0) || this.leaves.push(t)
    }, b.prototype.submitInstrument = function(t) {
        if (t.instrument && this.section_measure) {
            if (this.section_map.hasOwnProperty(this.section_name))
                for (var e in this.section_map[this.section_name])
                    if ("note" == this.section_map[this.section_name][e].type)
                        return;
            this.section_measure.instrument = t.instrument, delete t.instrument, t.hasOwnProperty("1") && (this.section_measure[1] = t[1])
        }
    }, b.prototype.changeFingering = function(t) {
        var e = this.finishInstrument();
        if (e && (this.set_tonalities.length > 0 && (this.curInstrument.tonality = this.set_tonalities.shift()), this.set_fingerings.length > 0 && (t = this.set_fingerings.shift())), e || !this.curInstrument.keyNumber)
            if (t && "auto" != t) {
                var s = r(t);
                this.setKeyNumber(s)
            } else
                this.setKeyNumber(!1);
        return e
    }, b.prototype.calcMidiNumber = function(t) {
        if (t.noteNumber = a(t), t.noteDuration = t.duration, t.midiNumber = t.noteNumber + this.curKeyNoteNumber - 60, t.midiDuration = t.duration / (.01 * this.bpm), this.getOption("bpm") || this.setOption("bpm", this.bpm), t.left_appoggiatura)
            for (var e = 0; e < t.left_appoggiatura.length; e++) {
                var r = this.calcMidiNumber(t.left_appoggiatura[e]);
                r.noteDuration = 0, r.midiDuration /= 64, t.left_appoggiatura[e] = r
            }
        if (t.right_appoggiatura)
            for (var e = 0; e < t.right_appoggiatura.length; e++) {
                var r = this.calcMidiNumber(t.right_appoggiatura[e]);
                r.noteDuration = 0, r.midiDuration /= 64, t.right_appoggiatura[e] = r
            }
        if (t.chord)
            for (var e = 0; e < t.chord.length; e++)
                t.chord[e] = this.calcMidiNumber(t.chord[e]);
        return t
    }, b.prototype.midiNote = function(t) {
        if (t = this.calcMidiNumber(t), "0" == t.scale)
            return t;
        var e = this.curInstrument.minNote;
        (!e || t.noteNumber < e.noteNumber) && (this.curInstrument.minNote = t);
        var r = this.curInstrument.maxNote;
        return (!r || t.noteNumber > r.noteNumber) && (this.curInstrument.maxNote = t), y(t) ? t : (this.calcInstrumentMark(t), t)
    }, b.prototype.finishInstrument = function() {
        if (!this.curInstrument.minNote)
            return !1;
        this.calcFingering();
        for (var e in this.fingeringNoteQueue)
            this.calcInstrumentMark(this.fingeringNoteQueue[e]);
        this.fingeringNoteQueue = [];
        for (var e in this.curInstrument.notes)
            this.calcCNote(this.curInstrument.notes[e]);
        return delete this.curInstrument.notes, this.result.instruments.push(this.curInstrument), instrument2 = t(this.curInstrument), instrument2.minNote = null, instrument2.maxNote = null, instrument2.notes = [], instrument2.avaiableFingerings = [], this.curInstrument = instrument2, instrument2
    }, b.prototype.calcCNote = function(t) {
        var e = 60;
        this.curInstrument.keyNumber ? e = this.curInstrument.keyNumber : this.curKeyNoteNumber && (e = this.curKeyNoteNumber);
        var r = e - 60;
        if (t.c_note = n(t.noteNumber + r), 0 == t.noteNumber && (t.c_note.scale = 0, t.c_note.octave = 0), t.left_appoggiatura)
            for (var s = 0; s < t.left_appoggiatura.length; s++) {
                var i = a(t.left_appoggiatura[s]);
                t.left_appoggiatura[s].c_note = n(i + r)
            }
        if (t.right_appoggiatura)
            for (var s = 0; s < t.right_appoggiatura.length; s++) {
                var i = a(t.right_appoggiatura[s]);
                t.right_appoggiatura[s].c_note = n(i + r)
            }
        return t.c_note
    }, b.prototype.calcInstrumentMark = function(t) {
        var s = this.curInstrument.fingering;
        if ("none" != s) {
            var i = {
                    o6: Ee,
                    o12: xe,
                    o3: De,
                    x8: Fe,
                    x10: Ae
                },
                n = this.curInstrument.instrument.toLowerCase();
            if (i[n] && s) {
                if (!this.curInstrument.keyNumber) {
                    var a = r(s);
                    this.setKeyNumber(a)
                }
                var o = this.curInstrument.keyNumber - 60;
                t.mark = t.midiDuration > 0 ? u(i[n], t.noteNumber + o) : null, t.fingering = e(s), t.instrument = n
            } else
                this.fingeringNoteQueue.push(t)
        }
    }, b.prototype.pushAvaiableFingering = function(t) {
        c(this.curInstrument, t)
    }, b.prototype.setKeyNumber = function(t) {
        if (!t)
            return this.curInstrument.keyNumber = !1, void (this.curInstrument.fingering = !1);
        if (this.curInstrument.keyNumber = t, this.curInstrument.fingering = s(t), this.curInstrument.allNote = n(120 - t), this.hasKeyNoteNumber) {
            var e = this.curInstrument.instrument;
            if (e && 0 == e.indexOf("o"))
                for (var r = this.curKeyNoteNumber - t + 60, i = 108, a = ["BC", "AF", "AG", "AC", "SF", "SG", "SC"], u = 0; u < a.length; u++) {
                    var h = o(a[u]);
                    if (Math.abs(r - h) < i && (this.curInstrument.tonality = a[u], this.curInstrument.keyNoteName = s(h + t - 60), i = Math.abs(r - h), this.curInstrument.keyNoteDelta = i, 0 == i))
                        break
                }
        }
    }, b.prototype.calcFingering = function() {
        if (!this.curInstrument.fingering) {
            var t = this.curInstrument.minNote.noteNumber,
                e = this.curInstrument.maxNote.noteNumber;
            if (t && e) {
                {
                    this.curInstrument.instrument.toLowerCase()
                }
                if ("o6" == this.curInstrument.instrument) {
                    for (var s = Ee, i = 134, n = 0, a = ["C3", "F3", "G3", "G", "F", "C"], o = 0; o < a.length; o++) {
                        var u = a[o],
                            h = r(u) - 60;
                        sum = t + e + 2 * h, Math.abs(sum - i) <= Math.abs(n - i) && (this.setKeyNumber(60 + h), n = sum)
                    }
                    if (e - t > 17 && (this.curInstrument.overflow = e - t - 17, this.curInstrument.overflow_tips = e - t > 20 ? "六孔音域不够，请使用三管吹奏" : "六孔音域不够，请使用十二孔或三管吹奏"), this.hasKeyNoteNumber && (67 == this.curKeyNoteNumber || 65 == this.curKeyNoteNumber || 60 == this.curKeyNoteNumber) && s[t + this.curKeyNoteNumber - 60] && s[e + this.curKeyNoteNumber - 60])
                        return void this.setKeyNumber(this.curKeyNoteNumber)
                } else if ("o12" == this.curInstrument.instrument) {
                    if (this.tryBestFingeringO12(xe, t, e), !this.curInstrument.fingering) {
                        var c = 57 - t + 60;
                        this.setKeyNumber(c), e - t > 20 && (this.curInstrument.overflow = e - t - 20, this.curInstrument.overflow_tips = "十二孔音域不够，请使用三管吹奏")
                    }
                } else
                    "o3" == this.curInstrument.instrument ? this.tryBestFingeringO3(De, t, e) : "x8" == this.curInstrument.instrument ? this.tryBestFingeringX8(Fe, t, e) : "x10" == this.curInstrument.instrument && this.tryBestFingeringX10(Ae, t, e)
            }
        }
    }, b.prototype.tryBestFingeringXun = function(t, e, s) {
        for (var i = ["C", "F", "G", "F3", "G3", "bB", "bB3", "D", "D3", "bE4", "A", "bA4", "E"], n = 0; n < i.length; n++) {
            var a = i[n],
                o = r(a) - 60;
            if (t[e + o] && t[s + o]) {
                this.setKeyNumber(60 + o), this.pushAvaiableFingering(a);
                break
            }
        }
        t[e + 3] && t[s] && (this.setKeyNumber(60), this.pushAvaiableFingering("C")), t[e + 8] && t[s + 5] && (this.setKeyNumber(65), this.pushAvaiableFingering("F"))
    }, b.prototype.tryBestFingeringX8 = function(t, e, r) {
        if (this.tryBestFingeringXun(t, e, r), !this.curInstrument.fingering)
            if (r - e > 17) {
                this.curInstrument.overflow = r - e - 17, this.curInstrument.overflow_tips = r - e > 19 ? "8孔埙音域不够，请使用三管陶笛吹奏" : "8孔埙音域不够，请使用10孔埙吹奏";
                var s = 77 - r + 60;
                this.setKeyNumber(s)
            } else {
                var s = 60 - e + 60;
                this.setKeyNumber(s)
            }
    }, b.prototype.tryBestFingeringX10 = function(t, e, r) {
        if (this.tryBestFingeringXun(t, e, r), !this.curInstrument.fingering)
            if (r - e > 19) {
                this.curInstrument.overflow = r - e - 19, this.curInstrument.overflow_tips = "10孔埙音域不够，请使用三管陶笛吹奏";
                var s = 79 - r + 60;
                this.setKeyNumber(s)
            } else {
                var s = 60 - e + 60;
                this.setKeyNumber(s)
            }
    }, b.prototype.tryBestFingeringO3 = function(t, e, r) {
        if (this.hasKeyNoteNumber)
            for (var s = o(this.curInstrument.tonality), i = 108, n = [53, 55, 65, 67, 60, this.curKeyNoteNumber - s + 60], a = 0; a < n.length; a++) {
                var u = n[a];
                if (t[e + u - 60] && t[r + u - 60]) {
                    var h = Math.abs(this.curKeyNoteNumber - (u + s - 60));
                    i >= h && (this.setKeyNumber(u), i = h)
                }
            }
        else
            for (var c = 0, i = 108, n = [53, 55, 65, 67, 60], a = 0; a < n.length; a++) {
                var u = n[a];
                t[e + u - 60] && t[r + u - 60] && (c = e + u - 120, 0 > c && (c *= -12), i >= c && (this.setKeyNumber(u), i = c))
            }
        if (!this.curInstrument.fingering) {
            var l = 57 - e + 60;
            this.setKeyNumber(l)
        }
        _(this.curInstrument.fingering)
    }, b.prototype.tryBestFingeringO12 = function(t, e, s) {
        for (var n = 134, a = 0, o = ["C3", "F3", "G3", "G", "F", "C"], u = 0; u < o.length; u++) {
            var h = o[u],
                c = r(h) - 60;
            t[e + c] && t[s + c] && (this.pushAvaiableFingering(h), sum = e + s + 2 * c, Math.abs(sum - n) <= Math.abs(a - n) && (this.setKeyNumber(60 + c), a = this.hasKeyNoteNumber && (this.curKeyNoteNumber - c) % 12 == 0 ? n : sum))
        }
        return this.hasKeyNoteNumber && t[e + this.curKeyNoteNumber - 60] && t[s + this.curKeyNoteNumber - 60] ? void (67 == this.curKeyNoteNumber || 65 == this.curKeyNoteNumber || 60 == this.curKeyNoteNumber || 55 == this.curKeyNoteNumber || 53 == this.curKeyNoteNumber || 48 == this.curKeyNoteNumber ? this.setKeyNumber(this.curKeyNoteNumber) : this.pushAvaiableFingering(i(this.curKeyNoteNumber))) : void (!this.curInstrument.fingering && 18 > s - e && (keyNumber = 60 - e + 60, this.setKeyNumber(keyNumber), this.pushAvaiableFingering(i(keyNumber))))
    }, d.prototype.getNewInstrument = function() {
        return {
            tonality: this.tonality,
            keyNumber: this.fingeringKeyNumber
        }
    }, d.prototype.calcMeasures = function(t, e, s) {
        var i = 0,
            n = 1,
            a = 2,
            o = 3;
        t || (t = 0), e || (e = this.measures.length), s || (s = i);
        var u = !0;
        s == o && (u = !1);
        for (var h = 0, c = t; e > c && c < this.measures.length; c++) {
            var l = this.measures[c];
            switch (l.type) {
            case "repeat_begin_bar":
                if (!this.repeatAgain && s)
                    break;
                t = c + 1, this.repeatNumber = 1;
                break;
            case "repeat_end_bar":
                if (!this.repeatAgain && s)
                    break;
                for (var p = 0; p < l.repeat; p++)
                    this.repeatNumber++, this.calcMeasures(t, c, n);
                break;
            case "dc_bar":
                if (s)
                    break;
                this.repeatNumber++, this.duplicateNumber = l.n, this.calcMeasures(h, c, a);
                break;
            case "ds_bar":
                if (s)
                    break;
                this.repeatNumber++, this.duplicateNumber = l.n, _("DS" + l.n), this.calcMeasures(h, c, o);
                break;
            case "start_bar":
                s == o && this.duplicateNumber == l.n && (u = !0);
                break;
            case "fine_bar":
                if ((s == a || s == o) && (this.duplicateNumber == l.n || l.n < 1))
                    return;
                break;
            case "note":
                u && !this.is_part && this.handleNote(l, s);
                break;
            case "text":
            case "info":
                if ("repeat_again" in l && (this.repeatAgain = l.repeat_again), l[1] && (this.curKeyNoteNumber = r(l[1])), l.instrument && (this.tonality = l.instrument.tonality, this.fingeringKeyNumber = l.instrument.keyNumber), l.part && (t = c + 1, h = c + 1, this.repeatNumber = 1, this.part = l.part), l.part_end && (this.part = !1), l.bpm || l.ms) {
                    var m = l.bpm || 100 * l.ms,
                        f = this.createNode("bpm" + m, {
                            bpm: m
                        });
                    this.pushNote(f)
                }
                if (s)
                    break;
                l.harmony && this.pushGroup(l.harmony, s), l.bgm && this.pushGroup(l.bgm, s)
            }
        }
    }, d.prototype.createNode = function(t, e) {
        var r = {
            scale: "0",
            midiNumber: 0,
            midiDuration: 0,
            noteDuration: 0,
            id: t
        };
        for (var s in e)
            r[s] = e[s];
        return r
    }, d.prototype.createNote = function(t) {
        return this.createNode(t.id, {
            midiNumber: this.calcMidiNumber(t),
            midiDuration: t.midiDuration,
            noteDuration: t.noteDuration,
            scale: t.scale,
            first_line: t.first_line,
            first_column: t.first_column
        })
    }, d.prototype.pushGroup = function(t, e) {
        for (var r = t.split(/[\s\,]+/), s = 0; s < r.length; s++) {
            var i = r[s];
            if (i) {
                var n = this.createNode("harmony_" + i, {
                    notes: [],
                    mode: e
                });
                this.pushNote(n), this.groupNotes[i] || (this.groupNotes[i] = []), this.groupNotes[i].push(n)
            }
        }
    }, d.prototype.pushNote = function(t) {
        this.part ? (this.partNotes[this.part] || (this.partNotes[this.part] = []), this.partNotes[this.part].push(t)) : this.notes.push(t)
    }, d.prototype.calcMidiNumber = function(t) {
        var e = t.noteNumber + this.curKeyNoteNumber - 60;
        return this.tonality && (e = t.noteNumber + o(this.tonality) + this.fingeringKeyNumber - 120), e
    }, d.prototype.handleNote = function(t, e) {
        var r = 2,
            s = 3;
        if (!((e == r || e == s) && t.no_repeat || t.repeat && t.repeat.indexOf(this.repeatNumber) < 0)) {
            if (y(t) && this.notes.length > 0) {
                var i = this.notes[this.notes.length - 1];
                return i.midiDuration += t.midiDuration, void (i.noteDuration += t.noteDuration)
            }
            var n = this.createNote(t);
            if (t.chord) {
                for (var a = [], o = 0; o < t.chord.length; o++) {
                    var u = t.chord[o];
                    a.push(this.createNote(u))
                }
                n.chord = a
            }
            return this.pushNote(n), n
        }
    }, N.prototype.push = function(t) {
        var e;
        for (e in t.groupNotes) {
            this.groupNotes[e] || (this.groupNotes[e] = []);
            for (var r = 0; r < t.groupNotes[e].length; r++)
                this.groupNotes[e].push(t.groupNotes[e][r])
        }
        for (e in t.partNotes)
            this.partNotes[e] = t.partNotes[e]
    }, N.prototype.calc = function() {
        for (var e in this.groupNotes)
            if (this.partNotes[e])
                for (var r = 0; r < this.groupNotes[e].length; r++)
                    if (this.groupNotes[e][r].mode) {
                        this.groupNotes[e][r].notes = [];
                        for (var s in this.partNotes[e])
                            this.groupNotes[e][r].notes.push(t(this.partNotes[e][s]))
                    } else
                        this.groupNotes[e][r].notes = this.partNotes[e]
    };
    var we = function() {
        var t = {
            EOF: 1,
            parseError: function(t, e) {
                if (!this.yy.parser)
                    throw new Error(t);
                this.yy.parser.parseError(t, e)
            },
            setInput: function(t, e) {
                return this.yy = e || this.yy || {}, this._input = t, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
            },
            input: function() {
                var t = this._input[0];
                this.yytext += t, this.yyleng++, this.offset++, this.match += t, this.matched += t;
                var e = t.match(/(?:\r\n?|\n).*/g);
                return e ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), t
            },
            unput: function(t) {
                var e = t.length,
                    r = t.split(/(?:\r\n?|\n)/g);
                this._input = t + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - e), this.offset -= e;
                var s = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), r.length - 1 && (this.yylineno -= r.length - 1);
                var i = this.yylloc.range;
                return this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: r ? (r.length === s.length ? this.yylloc.first_column : 0) + s[s.length - r.length].length - r[0].length : this.yylloc.first_column - e
                }, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - e]), this.yyleng = this.yytext.length, this
            },
            more: function() {
                return this._more = !0, this
            },
            reject: function() {
                return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                })
            },
            less: function(t) {
                this.unput(this.match.slice(t))
            },
            pastInput: function() {
                var t = this.matched.substr(0, this.matched.length - this.match.length);
                return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "")
            },
            upcomingInput: function() {
                var t = this.match;
                return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "")
            },
            showPosition: function() {
                var t = this.pastInput(),
                    e = new Array(t.length + 1).join("-");
                return t + this.upcomingInput() + "\n" + e + "^"
            },
            test_match: function(t, e) {
                var r,
                    s,
                    i;
                if (this.options.backtrack_lexer && (i = {
                    yylineno: this.yylineno,
                    yylloc: {
                        first_line: this.yylloc.first_line,
                        last_line: this.last_line,
                        first_column: this.yylloc.first_column,
                        last_column: this.yylloc.last_column
                    },
                    yytext: this.yytext,
                    match: this.match,
                    matches: this.matches,
                    matched: this.matched,
                    yyleng: this.yyleng,
                    offset: this.offset,
                    _more: this._more,
                    _input: this._input,
                    yy: this.yy,
                    conditionStack: this.conditionStack.slice(0),
                    done: this.done
                }, this.options.ranges && (i.yylloc.range = this.yylloc.range.slice(0))), s = t[0].match(/(?:\r\n?|\n).*/g), s && (this.yylineno += s.length), this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length
                }, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], r = this.performAction.call(this, this.yy, this, e, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), r)
                    return r;
                if (this._backtrack) {
                    for (var n in i)
                        this[n] = i[n];
                    return !1
                }
                return !1
            },
            next: function() {
                if (this.done)
                    return this.EOF;
                this._input || (this.done = !0);
                var t,
                    e,
                    r,
                    s;
                this._more || (this.yytext = "", this.match = "");
                for (var i = this._currentRules(), n = 0; n < i.length; n++)
                    if (r = this._input.match(this.rules[i[n]]), r && (!e || r[0].length > e[0].length)) {
                        if (e = r, s = n, this.options.backtrack_lexer) {
                            if (t = this.test_match(r, i[n]), t !== !1)
                                return t;
                            if (this._backtrack) {
                                e = !1;
                                continue
                            }
                            return !1
                        }
                        if (!this.options.flex)
                            break
                    }
                return e ? (t = this.test_match(e, i[s]), t !== !1 ? t : !1) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                })
            },
            lex: function() {
                var t = this.next();
                return t ? t : this.lex()
            },
            begin: function(t) {
                this.conditionStack.push(t)
            },
            popState: function() {
                var t = this.conditionStack.length - 1;
                return t > 0 ? this.conditionStack.pop() : this.conditionStack[0]
            },
            _currentRules: function() {
                return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules
            },
            topState: function(t) {
                return t = this.conditionStack.length - 1 - Math.abs(t || 0), t >= 0 ? this.conditionStack[t] : "INITIAL"
            },
            pushState: function(t) {
                this.begin(t)
            },
            stateStackSize: function() {
                return this.conditionStack.length
            },
            options: {},
            performAction: function(t, e, r, s) {
                switch (r) {
                case 0:
                    return 29;
                case 1:
                    return 29;
                case 2:
                    return 40;
                case 3:
                    return 41;
                case 4:
                    return 42;
                case 5:
                    return 22;
                case 6:
                    return 78;
                case 7:
                    return 79;
                case 8:
                    return 43;
                case 9:
                    return 14;
                case 10:
                    return 12;
                case 11:
                    return 58;
                case 12:
                    return 21;
                case 13:
                    return 69;
                case 14:
                    return "W";
                case 15:
                    return 39;
                case 16:
                    return 60;
                case 17:
                    return 68;
                case 18:
                    return 32;
                case 19:
                    return 31;
                case 20:
                    return 30;
                case 21:
                    return 15;
                case 22:
                    return 10;
                case 23:
                    return 11;
                case 24:
                    return 54;
                case 25:
                    return 55;
                case 26:
                    return 17;
                case 27:
                    return 18;
                case 28:
                    return 19;
                case 29:
                    return 25;
                case 30:
                    return 26;
                case 31:
                    return 28;
                case 32:
                    return 27;
                case 33:
                    return 24;
                case 34:
                    return 17;
                case 35:
                    return 18;
                case 36:
                    return 19;
                case 37:
                    return 16;
                case 38:
                    return 20;
                case 39:
                    return 23;
                case 40:
                    return 52;
                case 41:
                    return 53;
                case 42:
                    return 50;
                case 43:
                    return 51;
                case 44:
                    return 10;
                case 45:
                    return 11;
                case 46:
                    return 54;
                case 47:
                    return 55;
                case 48:
                    return 48;
                case 49:
                    return 49;
                case 50:
                    return 46;
                case 51:
                    return 47;
                case 52:
                    return 44;
                case 53:
                    return 45;
                case 54:
                    return 44;
                case 55:
                    return 45;
                case 56:
                    return 64;
                case 57:
                    return 63;
                case 58:
                    return 38;
                case 59:
                    return 36;
                case 60:
                    return 37;
                case 61:
                    return 34;
                case 62:
                    return "{";
                case 63:
                    return "}";
                case 64:
                    return "[";
                case 65:
                    return 33;
                case 66:
                    return ":";
                case 67:
                    return 67;
                case 68:
                    return ".";
                case 69:
                    return 71;
                case 70:
                    return "<";
                case 71:
                    return 57;
                case 72:
                    return 13;
                case 73:
                    return 71;
                case 74:
                    return 72;
                case 75:
                    return 73;
                case 76:
                    return 74;
                case 77:
                    return 75;
                case 78:
                    return "%";
                case 79:
                    return 76;
                case 80:
                    return 77;
                case 81:
                    return 65;
                case 82:
                    return 66;
                case 83:
                    return 61;
                case 84:
                    return 62;
                case 85:
                    return 35;
                case 86:
                    return 70;
                case 87:
                    break;
                case 88:
                    return 5
                }
            },
            rules: [/^(?:\|?\s*\{start[0-9:]*\})/, /^(?:(\|?[Ss][0-9@]*:))/, /^(?:(\|Fine[0-9]*\|))/, /^(?:(\|DC[0-9]*\|))/, /^(?:(\|DS[0-9]*\|))/, /^(?:([A-Qa-q][0-9]*:))/, /^(?:(f{1,3}|p{1,3}|sf|mf|sp|mp|tr|su|sd|st\b))/, /^(?:(#{1,2}|n|b{1,2}))/, /^(?:(\|-[0-9]+-\|))/, /^(?:\(c:)/, /^(?:(\([0-9]+:))/, /^(?:([0-9]))/, /^(?:([\u4e00-\u9fa5]+))/, /^(?:( *- *){1,10})/, /^(?:([acehijklmoqrstuwy]|[A-W]|[YZ])+)/, /^(?::[0-9]*\|)/, /^(?:,|'|")/, /^(?:\.)/, /^(?:\[\d{2,2}:\d{2,2}\.?\d{2,2}?\])/, /^(?:\[offset:\d+\])/, /^(?:(\[[0-9,e]+:))/, /^(?:\{text\}[^{]+\{\/text\})/, /^(?:\{left\})/, /^(?:\{\/left\})/, /^(?:\{right\})/, /^(?:\{\/right\})/, /^(?:\{omit:[0-9]*p\})/, /^(?:\{omit:[0-9]*m\})/, /^(?:\{omit:[0-9]*e\})/, /^(?:\{\s*\w+\s*\})/, /^(?:\{\s*\w+\s*:[^}]+\})/, /^(?:\{\s*[1-9]+\s*\/\s*[2-8]\s*\})/, /^(?:\{\s*1\s*=[^}]+\})/, /^(?:\{\s*\/\s*\w+\s*\})/, /^(?:%[0-9]*p\b)/, /^(?:%[0-9]*m\b)/, /^(?:%[0-9]*e\b)/, /^(?:%t[0-9@]*\([^%]*%t\))/, /^(?:%n\b)/, /^(?:%a\b)/, /^(?:%>\()/, /^(?:%>\))/, /^(?:%<\()/, /^(?:%<\))/, /^(?:%l\()/, /^(?:%l\))/, /^(?:%r\()/, /^(?:%r\))/, /^(?:%f\()/, /^(?:%f\))/, /^(?:%n\()/, /^(?:%n\))/, /^(?:%\()/, /^(?:%\))/, /^(?:\{\{)/, /^(?:\}\})/, /^(?:@\()/, /^(?:\)@)/, /^(?:\|:)/, /^(?:\|\|)/, /^(?:\/\/)/, /^(?:\|)/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?::)/, /^(?:=)/, /^(?:\.)/, /^(?:>)/, /^(?:<)/, /^(?:\()/, /^(?:\))/, /^(?:>)/, /^(?:\^)/, /^(?:\/)/, /^(?:~)/, /^(?:!~)/, /^(?:%)/, /^(?:\$)/, /^(?:!\$)/, /^(?:[_])/, /^(?:[x])/, /^(?:[g])/, /^(?:[d])/, /^(?:[vV])/, /^(?:\*)/, /^(?:\s+)/, /^(?:$)/],
            conditions: {
                INITIAL: {
                    rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88],
                    inclusive: !0
                }
            }
        };
        return t
    }();
    return Ie.lexer = we, v.prototype = Ie, Ie.Parser = v, new v
}();
"undefined" != typeof require && "undefined" != typeof exports && (exports.parser = parser, exports.Parser = parser.Parser, exports.parse = function() {
    return parser.parse.apply(parser, arguments)
}, exports.main = function(t) {
    t[1] || (console.log("Usage: " + t[0] + " FILE"), process.exit(1));
    var e = require("fs").readFileSync(require("path").normalize(t[1]), "utf8");
    return exports.parser.parse(e)
}, "undefined" != typeof module && require.main === module && exports.main(process.argv.slice(1)));


