function reCalcParams() {
    charWidth = 40 * renderRadio, dividerWidth = 40 * renderRadio, nerrowDividerWidth = 6 * renderRadio, lyricHeight = 30 * renderRadio, instruHeight = 60 * renderRadio, lineHeight = instruHeight + 80 * renderRadio, commonFontSize = 18 * renderRadio + "px", smallFontSize = 16 * renderRadio + "px", smallerFontSize = 14 * renderRadio + "px", smallestFontSize = 12 * renderRadio + "px", largeFontSize = 20 * renderRadio + "px", largerFontSize = 22 * renderRadio + "px", hugeFontSize = 24 * renderRadio + "px", titleFontSize = 28 * renderRadio + "px", o6InstruSize = {
        width: 30 * renderRadio,
        height: 37.5 * renderRadio
    }, o12InstruSize = {
        width: 48 * renderRadio,
        height: 40 * renderRadio
    }, o3InstruSize = {
        width: 80 * renderRadio,
        height: 80 * renderRadio
    }, calcNoteSize()
}
function calcNoteSize() {
    var t = paper.text(1e4, 50, "7").attr({
            fontSize: hugeFontSize
        }),
        e = paper.text(9e3, 50, "7").attr({
            fontSize: smallFontSize
        }),
        r = t.node.getBBox(),
        a = e.node.getBBox();
    noteWidth = Math.ceil(r.width), noteHeight = Math.ceil(100 - 2 * r.y - r.height + 2), smallNoteWidth = Math.ceil(a.width), smallNoteHeight = Math.ceil(100 - 2 * a.y - a.height + 2)
}
function isBarType(t) {
    return t && t.type && t.type.match(/_bar$/g) ? !0 : !1
}
function Maker() {
    this.init()
}
var renderRadio = .9,
    colorArr = {
        bA: "#efc99d",
        A: "#e2b178",
        "#A": "#78e2af",
        bB: "#78e2af",
        B: "#e278b4",
        "#B": "f5d391",
        bC: "f5d391",
        C: "#dcb4ff",
        "#C": "#80baea",
        bD: "#e2aa58",
        D: "#e2cd78",
        "#D": "#ea8a80",
        bE: "#ea8a80",
        E: "#80ea80",
        "#E": "#fbbbbb",
        bF: "#fbbbbb",
        F: "#B3E085",
        "#F": "#ea80c1",
        bG: "#ea80c1",
        G: "#87cefa",
        "#G": "#b693f0"
    },
    instruMapping = {
        111111: 1,
        101111: 2,
        111011: 3,
        101011: 4,
        "001111": 5,
        "001011": 6,
        "010011": 7,
        "010000": 15,
        "010010": 13,
        "011011": 14,
        "011111": 8,
        "000111": 9,
        "000011": 10,
        "000010": 11,
        "000000": 12
    },
    instru12Mapping = {
        111111111111: 1,
        111111111110: 2,
        111110111111: 3,
        111110111110: 4,
        111110111101: 5,
        111110111100: 6,
        111110111000: 7,
        111110110000: 8,
        111110100100: 9,
        111110100000: 10,
        111010100100: 11,
        111010100000: 12,
        110010100100: 13,
        110010100000: 14,
        100010100000: 15,
        "000010000100": 16,
        "000010100100": 17,
        "000010100000": 18,
        "000010000000": 19,
        "000000000000": 20,
        111110111001: 21
    },
    charWidth = 40 * renderRadio,
    dividerWidth = 40 * renderRadio,
    nerrowDividerWidth = 6 * renderRadio,
    lyricHeight = 30 * renderRadio,
    instruHeight = 60 * renderRadio,
    lineHeight = instruHeight + 80 * renderRadio,
    containerWidth = $("#box-container").width(),
    padding = 20,
    paddingDelta = 60,
    commonFontSize = 18 * renderRadio + "px",
    smallFontSize = 16 * renderRadio + "px",
    smallerFontSize = 14 * renderRadio + "px",
    smallestFontSize = 12 * renderRadio + "px",
    largeFontSize = 20 * renderRadio + "px",
    largerFontSize = 22 * renderRadio + "px",
    hugeFontSize = 24 * renderRadio + "px";
titleFontSize = 28 * renderRadio + "px";
var o6InstruSize = {
        width: 30 * renderRadio,
        height: 37.5 * renderRadio
    },
    o12InstruSize = {
        width: 48 * renderRadio,
        height: 40 * renderRadio
    },
    o3InstruSize = {
        width: 80 * renderRadio,
        height: 80 * renderRadio
    },
    x8InstruSize = {
        width: 30 * renderRadio,
        height: 37.5 * renderRadio
    },
    x10InstruSize = {
        width: 30 * renderRadio,
        height: 37.5 * renderRadio
    },
    isMob = isMobile(),
    SVG = Snap("#music"),
    paper = SVG.paper,
    boxWidth = $("#box-container").width(),
    pageHeight = 296.5 * boxWidth / 200,
    noteWidth,
    noteHeight,
    smallNoteWidth,
    smallNoteHeight;
calcNoteSize(), Maker.prototype.init = function() {
    this.startCursor = 0, this.bDrawInstru = !0, this.bDrawLyric = !0, this.bUseCNote = !1, this.displayMode = "neat", this.alignMode = "auto", this.mediaMode = "screen", this.midi = new MIDIPlay
}, Maker.prototype.showError = function(t) {
    return t ? (t = t.split("\n").slice(0, 3).join("<br />"), void $(".noteerr").show().html(t)) : void $(".noteerr").hide().html("")
}, Maker.prototype.resetVal = function(t, e) {
    if (e) {
        this[e] = t;
        var r = "";
        if (this.instrument ? r += "{i:" + this.instrument + "}" : (r += "{i:o6}", this.instrument = "o6"), this.keynote) {
            var a = this.keynote.match(/1=([\w+#]+)/);
            a && (r += "{1:" + a[0].substr(2) + "}")
        }
        switch (this.curfingering && (r += "{set_fingering:" + this.curfingering + "}"), e) {
        case "notation":
            try {
                allInfo = parser.parse(r + t)
            } catch (i) {
                return void this.showError(i.message)
            }
            break;
        case "keynote":
        case "rhythm":
        case "curfingering":
        case "instrument":
            try {
                allInfo = parser.parse(r + (this.notation || ""))
            } catch (i) {
                return void this.showError(i.message)
            }
            break;
        default:
            return
        }
        $(".noteerr").length > 0 && this.showError(!1), this.measures = allInfo.measures, this.originMeasures = $.extend(!0, [], this.measures), this.parts = {}, this.midi.resetNotes(allInfo.notes), this.midi.BPM = allInfo.options.bpm, this.midi.BPM || (this.midi.BPM = 100);
        var n = allInfo.instruments;
        n.length > 0 && (this.fingering = n.filter(function(t) {
            return "none" != t.fingering
        })), allInfo.fingerings && allInfo.fingerings.length && (this.fingerings = allInfo.fingerings)
    }
}, Maker.prototype.toggleInstru = function() {
    this.bDrawInstru = !this.bDrawInstru
}, Maker.prototype.toggleLyric = function() {
    this.bDrawLyric = !this.bDrawLyric
}, Maker.prototype.setCNote = function(t) {
    this.bUseCNote = t || !1
}, Maker.prototype.redraw = function() {
    padding = 20, paddingDelta = 60, containerWidth = $("#box-container").width(), this.draw()
}, Maker.prototype.draw = function() {
    function t() {
        ue = [];
        for (var t = 0; q > t; t++)
            ue.push(!0)
    }
    function e(a) {
        if (!(fe && ee == padding || (t(), F.bDrawLyric && (ze = ge ? lineHeight - q * lyricHeight + noteHeight : q > ce ? lineHeight - (q - ce) * lyricHeight + noteHeight : lineHeight), (T > 1 || ee != padding) && !a && (ee = padding, te += ze, i()), fe))) {
            if (!F.isBgm && Object.keys(F.parts).length && ve && Y) {
                fe = !0, Se = te - lineHeight;
                for (var n in F.parts)
                    if (ke = n, !(ye.indexOf(n) < 0)) {
                        for (var o = 0, d = X[n], h = D, s = [], p = 0; p < F.parts[n].length; p++) {
                            var l = F.parts[n][p];
                            o >= d && h >= o && s.push(F.hasBar(l) ? l : l), (isBarType(l) || F.hasBar(l)) && o++
                        }
                        s.length && (r(s), e())
                    }
                F.drawHarmonyBar(Se, te - lineHeight + 30), te += 40, ke = "", fe = !1
            }
            me && (ge = !0), ce = 0, J++
        }
    }
    function r(t) {
        z(t, !1, !1)
    }
    function a() {
        ee >= containerWidth - charWidth && e()
    }
    function i() {
        var t = te + pageHeight * (5 / 296.5),
            e = 0;
        "none" != F.instrument && F.bDrawInstru && (e = 40 - instruHeight - 20 * renderRadio), Math.floor((t + e) / pageHeight) != Math.floor((t + lineHeight + e) / pageHeight) && n()
    }
    function n() {
        if (N) {
            e(!0);
            var t = 0;
            "none" != F.instrument && F.bDrawInstru && (t += 40 - instruHeight + 20 * renderRadio);
            var r = te + pageHeight * (5 / 296.5) + 40 - instruHeight - 20 * renderRadio;
            te = Math.ceil(r / pageHeight) * pageHeight + t + pageHeight * (5 / 296.5)
        }
    }
    function o(t, e, r) {
        for (var a, i = 0, n = 0; n < U.length; n++) {
            var o = U[n][Z] || "";
            ke && (o = U[n][j[ke] + I] || ""), o && (/[^\u0000-\u00FF]/.test(o) ? (a = paper.text(t, e + lyricHeight * i, o).attr({
                fontSize: commonFontSize
            }), a.attr(",.!?，。！？[]".indexOf(o[o.length - 1]) >= 0 ? {
                transform: "t-" + (a.getBBox().width / o.length - noteWidth) / 2
            } : {
                transform: "t-" + (a.getBBox().width - noteWidth - (a.getBBox().width / o.length - noteWidth) / 2)
            })) : a = paper.text(t, e + lyricHeight * i, o).attr({
                fontSize: smallestFontSize
            }), !/[^\u0000-\u00FF]/.test(o) && o.length >= 5 && a.attr({
                transform: "t-3"
            }), r.add(a), ue[n] = !1), ue[n] && Z > U[n].length && i--, i++
        }
        i > ce && (ce = i), ke ? j[ke]++ : Z++
    }
    function d(t) {
        a();
        var e = 12,
            r = ee;
        t && t.left_appoggiatura && t.left_appoggiatura.length && (e += 8 * t.left_appoggiatura.length, t.left_appoggiatura.length > 2 && (r += charWidth)), paper.path("M" + (r - e) + "," + (te + 20) + "l4,8l4,-8").attr({
            fill: "none",
            stroke: "#000"
        })
    }
    function h(t, r, a, n) {
        r || (r = 0), pe && (pe = !1), le && (le = !1, Q = t.duration * (t.durationRatio || 1));
        var d = !1;
        t.line_end && J++, "text" === t.type && t.new_line ? ee != padding && (ee = padding, T > 1 && (te += ze, i())) : ee >= containerWidth - charWidth ? e() : ee + r >= containerWidth - charWidth && (d = !0, re.push(T)), me || (ge = !1);
        var h = te + 40;
        if ("dash" === t.type)
            return paper.rect(ee - 2, h - 10, 12, 2).attr({
                fill: "#000",
                stroke: "none"
            }), t.dot && paper.circle(ee + 14, h - 4, 1.5, 1.5).attr({
                fill: "#000",
                stroke: "none"
            }), void (ee += r);
        var p = R[T + 1] || {
            duration: 0
        };
        isBarType(p) && (p.duration = 100), ke && F.parts[ke] && (p = F.parts[ke][O[ke] + 1] || {
            duration: 0
        });
        var l = !0,
            g = p.duration * (p.durationRatio || 1);
        if ("6/8" != F.rhythm)
            .99 > Q ? (l = !1, d && (l = !0), Q += g) : 1.5 > Q && a ? 1 == Q ? (l = !0, Q = g) : (l = !1, Q += g) : Q >= 1.5 && a ? (l = !0, Q = g) : 1.5 == Q && .5 >= g ? (l = !1, t.durations && t.durations.length > 1 && (l = !0), Q += g) : 1.75 == Q && .25 >= g ? (l = !1, Q += g) : (Q = g, l = !0);
        else {
            var c = 2 * Q + 2 * g;
            3 >= c ? (Q += g, l = !1) : (Q = 0, l = !0), d && (l = !0)
        }
        (xe || We || be) && (n = !0);
        var u;
        t.id && (u = paper.g().attr({
            id: t.id,
            "data-line": V
        })), s(t, ee, h, l, p.duration, T, u), "note" === t.type && ("0" != t.scale ? (F.bDrawLyric && !me && o(ee, h + 30 * renderRadio, u), t.mark && F.bDrawInstru && (!n && (t.dynamics || t.comment || t.trill || t.mordent) && (n = !0), S(t, ee, h - instruHeight - 20 * renderRadio - (n ? 7 : 3)))) : "0" == t.scale && t.has_lyric && (!F.bDrawLyric || me || ke || o(ee, h + 30 * renderRadio, u))), "text" !== t.type && (ee += r), ke ? O[ke]++ : T++
    }
    function s(t, r, a, n, o, d, h) {
        var s = M ? C : A,
            p = s.deltas && s.deltas[K] ? s.deltas[K] : 0;
        ke && (p = s.partDeltas ? s.partDeltas[ke][X[ke]] : 0);
        var l = middleLineWidth = downLineWidth = 16;
        "6/8" == F.rhythm ? (l = n || 1 == o ? 2 * t.duration == .75 || 2 * t.duration == 1.5 ? 24 : 16 : charWidth + p, middleLineWidth = n ? 2 * t.duration == .75 ? 24 : 16 : charWidth + p, downLineWidth = !n && o > 0 && .25 > o ? charWidth + p : 16) : (l = !n && o > 0 && .75 >= o ? charWidth + p : .75 == t.duration ? 24 : 16, middleLineWidth = !n && o > 0 && .5 > o ? charWidth + p : 16, downLineWidth = !n && o > 0 && .25 > o ? charWidth + p : 16);
        var g = {
                fontSize: hugeFontSize
            },
            c = {
                fontSize: smallFontSize,
                fontWeight: "lighter"
            },
            u = {
                fill: "#000",
                stroke: "none"
            },
            f = {
                fill: "none",
                stroke: "#000"
            };
        t.left_appoggiatura && t.left_appoggiatura.length > 2 && (r += charWidth, ee += charWidth), a = Math.round(a);
        var m,
            x;
        switch (t.type) {
        case "note":
            var W,
                b,
                v,
                y = 0,
                k = F.bUseCNote;
            k && (v = t.c_note || t), W = "0" == t.scale && "content" in t ? paper.text(r, a, t.content).attr(g) : paper.text(r, a, (k ? v.scale : t.scale) + "").attr(g), x = a - noteHeight, m = 3, $(W.node).attr("data-pos", t.first_line + "_" + t.first_column + "_" + t.last_line + "_" + t.last_column), $(W.node).attr("class", "note");
            var S = k ? v.accidental : t.accidental;
            if (-1 === S ? b = paper.text(r - 6, a - 8, "b").attr(c) : 1 === S && (b = paper.text(r - 6, a - 8, "#").attr(c)), t.duration_marks) {
                for (var z = !1, w = !1, B = 0; B < t.duration_marks.length && "-" != t.duration_marks[B][0]; B++)
                    if ("." == t.duration_marks[B][0]) {
                        z = !0;
                        break
                    }
                for (var B = 0; B < t.duration_marks.length; B++)
                    switch (t.duration_marks[B][0]) {
                    case ".":
                        if (!w)
                            for (var _ = 0; _ < t.duration_marks[B].length; _++)
                                h.add(paper.circle(r + noteWidth + 2 + 5 * _, a - 6, 1.5).attr(u));
                        break;
                    case "_":
                        for (var _ = 0; _ < t.duration_marks[B].length; _++)
                            y++, 0 == _ ? h.add(paper.rect(r - 2, a + 2 + 2 * _, 16 == l ? z ? 24 : 16 : l, 1).attr(u)) : 1 == _ ? h.add(paper.rect(r - 2, a + 2 + 2 * _, middleLineWidth, 1).attr(u)) : 2 == _ && h.add(paper.rect(r - 2, a + 2 + 2 * _, downLineWidth, 1).attr(u));
                        break;
                    case "-":
                        w = !0
                    }
            }
            var H = k ? v.octave : t.octave;
            if (H)
                switch (H) {
                case 1:
                    h.add(paper.circle(r + noteWidth / 2, x - m, 1.5).attr(u));
                    break;
                case -1:
                    h.add(paper.circle(r + noteWidth / 2, a + 4 + 2 * y, 1.5).attr(u));
                    break;
                case 2:
                    h.add(paper.circle(r + noteWidth / 2, x - m, 1.5).attr(u)), h.add(paper.circle(r + noteWidth / 2, x - m - 4 * renderRadio, 1.5).attr(u));
                    break;
                case -2:
                    h.add(paper.circle(r + noteWidth / 2, a + 4 + 2 * y, 1.5).attr(u)), h.add(paper.circle(r + noteWidth / 2, a + 4 + 2 * y + 4 * renderRadio, 1.5).attr(u))
                }
            if (t.aeration && paper.path("M" + (r - 12) + "," + (a - 20) + "l4,8l4,-8").attr(f), t.pause && (paper.path("M" + r + "," + (a - 28) + "c0,-6,14,-6,14,0c0,-8,-14,-8,-14,0Z").attr(u), paper.circle(r + 6.5, a - 28, 1.5).attr(u)), t.accent && (1 == t.accent ? paper.path("M" + (r + 4) + "," + (a - 28) + "l6,3l-6,3").attr(f) : 2 == t.accent && paper.path("M" + (r + 4) + "," + (a - 22) + "l3,-6l3,6").attr(f)), t.tenuto && paper.rect(r, a - 24, 14, 1).attr(u), 1 == t.mordent || 2 == t.mordent) {
                var N = noteHeight + 3;
                1 == H ? N += 5 : 2 == H && (N += 8);
                var R = 8 - noteWidth / 2;
                paper.path("M" + (r - R) + "," + (a - N) + "l4,-3l2,3m-2,-4l2,3m-2,-1,l2,3m0,-1l4,-3l2,3m-2,-4l2,3m-2,-1,l2,3m0,-1l4,-3").attr({
                    fill: "none",
                    stroke: "#000"
                }), 2 == t.mordent && paper.rect(r + noteWidth / 2, a - N - 6, 1, 9).attr({
                    fill: "#000",
                    stroke: "none"
                })
            }
            if (t.trill) {
                var I = paper.text(r + 6 * renderRadio, a - 22, "tr").attr({
                    fontSize: smallestFontSize,
                    fontStyle: "italic"
                });
                F.adjustX(I)
            }
            if (t.left_appoggiatura && F.drawAppoggiatura(t.left_appoggiatura, r, a, "left"), t.right_appoggiatura && F.drawAppoggiatura(t.right_appoggiatura, r, a, "right"), t.staccato && F.drawStaccato(r, a), t.dynamics) {
                var L = a - 22;
                H > 0 && (L += 19 + noteHeight);
                var D = paper.text(r + 6 * renderRadio, L, t.dynamics).attr({
                    fontSize: smallestFontSize
                });
                F.adjustX(D)
            }
            if (t.comment) {
                var O = paper.text(r + 6 * renderRadio, a - 26 * renderRadio, t.comment).attr({
                    fontSize: smallestFontSize
                });
                F.adjustX(O)
            }
            h.add(W);
            break;
        case "single_bar":
            var j = paper.g().attr({
                    id: "singlebar" + d
                }),
                Y = u,
                E = 1;
            $("html").attr("data-pagetype") && 100 * t.sectionDuration % 100 && (Y.fill = "#f00", E = 2), j.add(paper.rect(r + noteWidth / 2, a - (noteHeight + 24) / 2, E, 24).attr(Y));
            break;
        case "double_bar":
            paper.rect(r + noteWidth / 2, a - (noteHeight + 24) / 2, 1, 24).attr(u), paper.rect(r + noteWidth / 2 + 3, a - (noteHeight + 24) / 2, 1, 24).attr(u);
            break;
        case "repeat_begin_bar":
            paper.circle(r + noteWidth / 2 + 7, a - noteHeight / 2 - 4, 1.5).attr(u), paper.circle(r + noteWidth / 2 + 7, a - noteHeight / 2 + 4, 1.5).attr(u), paper.rect(r + noteWidth / 2 + 2, a - (noteHeight + 24) / 2, 1, 24).attr(u), paper.rect(r + noteWidth / 2 - 3, a - (noteHeight + 24) / 2, 3, 24).attr(u);
            break;
        case "repeat_end_bar":
            paper.circle(r + noteWidth / 2 - 2, a - noteHeight / 2 + 4, 1.5).attr(u), paper.circle(r + noteWidth / 2 - 2, a - noteHeight / 2 - 4, 1.5).attr(u), paper.rect(r + noteWidth / 2 + 2, a - (noteHeight + 24) / 2, 1, 24).attr(u), paper.rect(r + noteWidth / 2 + 5, a - (noteHeight + 24) / 2, 3, 24).attr(u);
            break;
        case "end_bar":
            paper.rect(r + noteWidth / 2, a - (noteHeight + 24) / 2, 1, 24).attr(u), paper.rect(r + noteWidth / 2 + 3, a - (noteHeight + 24) / 2, 3, 24).attr(u);
            break;
        case "section_end_bar":
            paper.rect(r + noteWidth / 2, a - (noteHeight + 24) / 2, 1, 24).attr(u), paper.rect(r + noteWidth / 2 + 3, a - (noteHeight + 24) / 2, 1, 24).attr(u);
            break;
        case "fine_bar":
            var G = paper.g();
            paper.rect(r + noteWidth / 2, a - (noteHeight + 24) / 2, 1, 24).attr(u), paper.rect(r + noteWidth / 2 + 3, a - (noteHeight + 24) / 2, 1, 24).attr(u);
            var P = paper.text(r + noteWidth / 2, a + 20, "Fine").attr({
                fontSize: smallFontSize
            });
            G.add(P);
            var U = P.getBBox();
            t.n && G.add(paper.text(U.x2 + 2, U.y2 - 2, t.n).attr({
                fontSize: smallestFontSize
            })), F.adjustX(G);
            break;
        case "dc_bar":
            paper.rect(r + noteWidth / 2, a - (noteHeight + 24) / 2, 1, 24).attr(u), paper.rect(r + noteWidth / 2 + 3, a - (noteHeight + 24) / 2, 3, 24).attr(u);
            var T = paper.text(r + noteWidth / 2 + 2, a + 20, "DC").attr({
                fontSize: smallFontSize
            });
            F.adjustX(T);
            break;
        case "ds_bar":
            var q = paper.g();
            paper.rect(r + noteWidth / 2, a - (noteHeight + 24) / 2, 1, 24).attr(u), paper.rect(r + noteWidth / 2 + 3, a - (noteHeight + 24) / 2, 3, 24).attr(u);
            var Z = paper.text(r + noteWidth / 2 + 2, a + 20, "DS").attr({
                fontSize: smallFontSize
            });
            q.add(Z);
            var J = Z.getBBox();
            t.n && q.add(paper.text(J.x2 + 2, J.y2 - 2, t.n).attr({
                fontSize: smallestFontSize
            })), F.adjustX(q);
            break;
        case "start_bar":
            var Q = paper.g();
            t.has_bar && paper.rect(r + noteWidth / 2, a - (noteHeight + 24) / 2, 1, 24).attr(u);
            var te = r + noteWidth / 2,
                re = a - (noteHeight + 24) / 2;
            t.line && (re += lyricHeight * t.line + (noteHeight + 24) / 2 + 10);
            var ae = paper.path("M" + (te + 13) + "," + (re - 24) + "c-10,-2,-10,4,-4,8s6,10,-4,8").attr({
                fill: "none",
                stroke: "#000",
                strokeWidth: 2
            });
            Q.add(ae), Q.add(paper.line(te + 15, re - 22, te + 3, re - 10).attr({
                fill: "none",
                stroke: "#000",
                strokeWidth: "2"
            })), Q.add(paper.circle(te + 18, re - 16, 1.5).attr(u)), Q.add(paper.circle(te, re - 16, 1.5).attr(u)), t.n && Q.add(paper.text(te + 19, re - 6, t.n).attr({
                fontSize: smallestFontSize
            })), (t.has_bar || t.line) && F.adjustX(Q);
            break;
        case "text":
            var ie = t.content.length,
                ne = r,
                oe = a,
                de = 0,
                he = !1,
                se = {
                    fontSize: commonFontSize
                };
            if (t.bold && (se.fontWeight = "bold"), t.line) {
                if (!F.bDrawLyric)
                    return !1;
                oe += lyricHeight * t.line
            }
            for (var pe = 0; ie > pe; pe++) {
                var le = paper.text(ne, oe, t.content[pe]).attr(se),
                    ge = le.getBBox();
                de += ge.width, ne += ge.width, ne > containerWidth - charWidth && (ne = padding, e(), oe += ze, he = !0, de = 0)
            }
            he ? (ee = de ? Math.ceil(de / charWidth) * charWidth : padding, i()) : ee += Math.ceil(de / charWidth) * charWidth;
            break;
        case "lrc_time":
            V++, e()
        }
    }
    function p(t) {
        var e = {
            fill: "#000",
            stroke: "none"
        };
        containerWidth - charWidth >= ee + 2 * charWidth && (paper.rect(ee + 12, te + 26, 1, 12).attr(e), paper.rect(ee + 12, te + 32, 2 * charWidth, 1).attr(e), paper.rect(ee + 12 + 2 * charWidth, te + 26, 1, 12).attr(e), paper.text(ee + 6 + charWidth, te + 26, t.n).attr({
            fontSize: smallFontSize
        })), ee += 3 * charWidth + 18
    }
    function l(t, e, r) {
        if (t && e) {
            var a = parseInt($("#" + t).find("text").get(0).getAttribute("x"), 10),
                i = parseInt($("#" + e).find("text").get(0).getAttribute("x"), 10),
                n = parseInt($("#" + t).find("text").get(0).getAttribute("y"), 10),
                o = parseInt($("#" + e).find("text").get(0).getAttribute("y"), 10);
            if (n == o)
                F.drawBracket(a, i, n, r);
            else {
                var d = containerWidth - charWidth - 20 - dividerWidth;
                -10 > d - a && (d = a), F.drawBracketLeft(a, d, n, r), F.drawBracketRight(padding + 8, i, o, r)
            }
        }
    }
    function g(t) {
        var e = parseInt($("#" + t).find("text").get(0).getAttribute("x"), 10),
            r = parseInt($("#" + t).find("text").get(0).getAttribute("y"), 10);
        F.drawBracketLeft(e, e + 10, r)
    }
    function c(t) {
        var e = parseInt($("#" + t).find("text").get(0).getAttribute("x"), 10),
            r = parseInt($("#" + t).find("text").get(0).getAttribute("y"), 10);
        F.drawBracketRight(e, e, r)
    }
    function u(t, e) {
        var r = parseInt($("#" + t).find("text").get(0).getAttribute("x"), 10),
            a = parseInt($("#" + e).find("text").get(0).getAttribute("x"), 10),
            i = parseInt($("#" + t).find("text").get(0).getAttribute("y"), 10),
            n = parseInt($("#" + e).find("text").get(0).getAttribute("y"), 10);
        i == n ? F.drawNBracket(r + noteWidth / 2, a + noteWidth / 2, i) : (F.drawNBracketLeft(r + noteWidth / 2, containerWidth - 40, i), F.drawNBracketRight(padding, a + noteWidth / 2, n), paper.text(containerWidth - 36, i - noteHeight - 10 * renderRadio - 4, "3").attr({
            fontSize: smallestFontSize
        }))
    }
    function f(t) {
        var e = {
                fill: "none",
                stroke: "#000",
                strokeLinecap: "square"
            },
            r = t.beginX + noteWidth / 2,
            a = t.endX - charWidth + noteWidth / 2,
            i = t.beginY + 16,
            n = t.endY + 16,
            o = t.type;
        i == n && ("cresc" == o ? paper.path("M" + a + "," + (i - 8) + "L" + r + "," + (i - 6) + "L" + a + "," + (i - 4)).attr(e) : "dim" == o && paper.path("M" + r + "," + (i - 8) + "L" + a + "," + (i - 6) + "L" + r + "," + (i - 4)).attr(e))
    }
    function m(t) {
        var e = {
                fontSize: smallestFontSize,
                fontWeight: "bold",
                fontFamily: "Helvetica"
            },
            r = {
                fill: "none",
                stroke: "#000",
                strokeLinecap: "square"
            },
            a = t.beginX + noteWidth / 2,
            i = t.endX - charWidth + noteWidth / 2,
            n = t.beginY + 13,
            o = t.endY + 13,
            d = t.repeatIndex,
            h = 36 * renderRadio;
        "neat" == F.displayMode && (h = 20 * renderRadio), n == o ? (paper.path("M" + (a - h) + "," + n + "v-" + 12.5 * renderRadio + "h" + (i - a + 2 * h) + "v" + 12.5 * renderRadio).attr(r), paper.text(a - (h - 4 * renderRadio), n, d).attr(e)) : (paper.path("M" + (a - h) + "," + n + "v-" + 12.5 * renderRadio + "h" + charWidth).attr(r), paper.text(a - (h - 4 * renderRadio), n, d).attr(e), paper.path("M" + (i + h) + "," + o + "v-" + 12.5 * renderRadio + "h-" + charWidth).attr(r))
    }
    function x(t) {
        var e = {
                fill: "none",
                stroke: "#000",
                strokeLinecap: "square"
            },
            r = t.beginX + noteWidth / 2,
            a = t.endX - charWidth + noteWidth / 2,
            i = t.beginY + 16,
            n = t.endY + 16;
        i == n ? (paper.path("M" + (r - 20 * renderRadio) + "," + i + "v-" + 12.5 * renderRadio + "H" + ((a + r) / 2 - 10)).attr(e), paper.path("M" + (a + 20 * renderRadio) + "," + n + "v-" + 12.5 * renderRadio + "H" + ((a + r) / 2 + 10)).attr(e), paper.circle((r + a) / 2 - 7, i - 12, 3).attr(e), paper.circle((r + a) / 2 + 7, i - 12, 3).attr(e)) : (paper.path("M" + (r - 20 * renderRadio) + "," + i + "v-" + 12.5 * renderRadio + "H" + (containerWidth - charWidth)).attr(e), paper.circle(containerWidth - charWidth + 3, i - 12, 3).attr(e), paper.path("M" + (a + 20 * renderRadio) + "," + n + "v-" + 12.5 * renderRadio + "H" + padding).attr(e), paper.circle(padding - 3, n - 12, 3).attr(e))
    }
    function W() {
        a();
        var t = {
                fill: "none",
                stroke: "#000",
                strokeLinecap: "square"
            },
            e = {
                fill: "#000",
                stroke: "none"
            },
            r = ee + noteWidth / 2 - 1,
            i = te + 40 - (24 + noteHeight) / 2;
        paper.rect(r, i, 1, 24).attr(e), paper.rect(r + 3, i, 1, 24).attr(e), paper.circle(r + 2, i - 16, 5).attr(t), paper.rect(r + 2, i - 24, 1, 16).attr(e), paper.rect(r - 6, i - 16, 16, 1).attr(e), ee += charWidth
    }
    function b(t) {
        a();
        var e = "left" == t ? 10 : charWidth - 15,
            r = "left" == t ? "(" : ")";
        paper.text(ee - e, te + 40, r).attr({
            fontSize: hugeFontSize,
            fontFamily: "Calibri"
        })
    }
    function v(t) {
        var e = ee - charWidth,
            r = te + 40;
        "up" == t ? (paper.path("M" + (e + 12) + "," + (r - 10) + "c6,-5,6,-5,6,-12").attr({
            fill: "none",
            stroke: "#000"
        }), paper.polygon([e + 18, r - 22, e + 15, r - 18, e + 21, r - 18])) : "down" == t && (paper.path("M" + (e + 12) + "," + (r - 22) + "c6,5,6,5,6,12").attr({
            fill: "none",
            stroke: "#000"
        }), paper.polygon([e + 18, r - 10, e + 15, r - 14, e + 21, r - 14]))
    }
    function y(t) {
        a();
        var e = {
                fill: "#000",
                stroke: "none"
            },
            r = ee + noteWidth / 2,
            i = te + 40 - 24;
        paper.text(r, i, t.n).attr({
            fontSize: smallFontSize
        }), paper.rect(r - 4, i + 2, 16, 1).attr(e), paper.text(r, i + 16, t.m).attr({
            fontSize: smallFontSize
        }), ee += charWidth
    }
    function k(t) {
        if (t) {
            if (pe)
                return void (pe = !1);
            var e = {
                    fontSize: commonFontSize
                },
                r = {
                    fontSize: smallFontSize
                },
                a = te + 20,
                i = paper.text(ee, a, "1=").attr(e);
            if (ee += i.getBBox().width, t.length > 1) {
                var n = paper.text(ee, a - noteHeight / 2, t[0]).attr(r);
                ee += n.getBBox().width
            }
            var o = paper.text(ee, a, t[t.length - 1]).attr(e);
            ee += o.getBBox().width + charWidth / 2
        }
    }
    function S(t, e, r) {
        var a,
            i,
            n,
            o = paper.g(),
            d = t.mark,
            h = t.fingering,
            s = t.instrument,
            p = 6 * renderRadio;
        if (F.bUseCNote && (h = "C"), "o6" == s)
            n = "#tdOutline" + instruMapping[d.substr(0, 6)], "a" == d.substr(6) ? i = paper.text(e, r - p + 4, "轻吹").attr({
                fontSize: smallestFontSize,
                fill: "#009ff8"
            }) : "b" == d.substr(6) && (i = paper.text(e, r - p + 4, "重吹").attr({
                fontSize: smallestFontSize,
                fill: "#009ff8"
            })), i && o.add(i.attr({
                transform: "t-" + (i.getBBox().width - noteWidth) / 2
            })), a = paper.use(n).attr({
                x: e,
                y: r,
                width: o6InstruSize.width,
                height: o6InstruSize.height,
                transform: "t-" + (o6InstruSize.width - noteWidth) / 2,
                fill: colorArr[h || "F"]
            }), o.add(a);
        else if ("o12" == s) {
            var l = d.replace(/[0-9]/gi, "");
            n = "#tdo12Outline" + instru12Mapping[d.substr(0, 12)];
            var g = "";
            "a" == l ? g = "轻吹" : "b" == l && (g = "重吹"), l && (i = paper.text(e, r - p + 4, g).attr({
                fontSize: smallestFontSize,
                fill: "#009ff8"
            }), o.add(i.attr({
                transform: "t-" + (i.getBBox().width - noteWidth) / 2
            }))), a = paper.use(n).attr({
                x: e,
                y: r,
                width: o12InstruSize.width,
                height: o12InstruSize.height,
                transform: "t-" + ((o12InstruSize.width - noteWidth) / 2 - 4 * renderRadio),
                fill: colorArr[h || "F"]
            }), o.add(a)
        } else if ("o3" == s) {
            var l = d.replace(/[0-9]/gi, "");
            n = "#tdo3Outline" + d.substr(0, 2);
            var g = "";
            "a" == l ? g = "轻吹" : "b" == l && (g = "重吹"), l && (i = paper.text(e, r - p + 4, g).attr({
                fontSize: smallestFontSize,
                fill: "#009ff8"
            }), o.add(i.attr({
                transform: "t-" + (i.getBBox().width - noteWidth) / 2
            }))), a = paper.use(n).attr({
                x: e,
                y: r,
                width: o3InstruSize.width,
                height: o3InstruSize.height,
                transform: "t-" + ((o3InstruSize.width - noteWidth) / 2 - 4 * renderRadio),
                fill: colorArr[h || "F"]
            }), o.add(a)
        } else if ("x8" == s) {
            var l = d.replace(/[0-9]/gi, ""),
                c = d.replace(/[abx]/gi, "");
            n = "#x8Outline" + c;
            var g = "";
            "a" == l ? g = "轻吹" : "b" == l && (g = "重吹"), l && (i = paper.text(e, r - p + 4, g).attr({
                fontSize: smallestFontSize,
                fill: "#009ff8"
            }), o.add(i.attr({
                transform: "t-" + (i.getBBox().width - noteWidth) / 2
            }))), a = paper.use(n).attr({
                x: e,
                y: r,
                width: x8InstruSize.width,
                height: x8InstruSize.height,
                transform: "t-" + (x8InstruSize.width - noteWidth) / 2,
                fill: colorArr[h || "F"]
            }), o.add(a)
        } else if ("x10" == s) {
            var l = d.replace(/[0-9]/gi, ""),
                c = d.replace(/[abx]/gi, "");
            n = "#x10Outline" + c;
            var g = "";
            "a" == l ? g = "轻吹" : "b" == l && (g = "重吹"), l && (i = paper.text(e, r - p + 4, g).attr({
                fontSize: smallestFontSize,
                fill: "#009ff8"
            }), o.add(i.attr({
                transform: "t-" + (i.getBBox().width - noteWidth) / 2
            }))), a = paper.use(n).attr({
                x: e,
                y: r,
                width: x10InstruSize.width,
                height: x10InstruSize.height,
                transform: "t-" + (x10InstruSize.width - noteWidth) / 2,
                fill: colorArr[h || "F"]
            }), o.add(a)
        }
    }
    function z(t, r, a) {
        var i,
            o,
            s,
            l;
        for (r = r || !1, a = a || !1, i = 0, s = t.length; s > i; i++)
            if (ke || "info" !== t[i].type && "text" !== t[i].type || !t[i].instrument || (e(), t[i][1] && k(t[i][1]), F.drawFingering(ee, te + 20, t[i].instrument), e()), "info" === t[i].type)
                (0 == i || 1 == i || 2 == i) && (F.startCursor = H[i].last_column), t[i].i && (F.instrument = t[i].i), t[i].line_end && e(), (t[i].harmony || t[i].harmony_end || t[i].bgm || t[i].bgm_end) && (t[i].harmony || t[i].bgm ? (t[i].harmony && e(), te += 30, ye = t[i].harmony || t[i].bgm, D = 0, ve = !0) : (ye = "", ve = !1, e())), ve && t[i].name && Y && paper.text(2, te + 36, t[i].name).attr({
                    fontSize: commonFontSize
                }), t[i].page_end && n();
            else if (t[i].measures) {
                if ("slur" === t[i].type) {
                    var g = 0,
                        c = !1;
                    for (o = 0, l = t[i].measures.length; l > o; o++)
                        t[i].measures[o].measures && (c = !0);
                    for (o = 0, l = t[i].measures.length; l > o; o++)
                        (t[i].measures[o].slur_break || o == t[i].measures.length - 1) && (ae.push({
                            startId: w(t[i].measures, g),
                            endId: B(t[i].measures, o),
                            higher: c
                        }), g = o);
                    z(t[i].measures, r, !0)
                } else if ("left_slur" === t[i].type)
                    de.push({
                        startId: w(t[i].measures)
                    }), z(t[i].measures, r, !0);
                else if ("right_slur" === t[i].type)
                    he.push({
                        endId: B(t[i].measures)
                    }), z(t[i].measures, r, !0);
                else if ("nslur" === t[i].type) {
                    var g = 0,
                        u = !0;
                    for (o = 0, l = t[i].measures.length; l > o; o++)
                        t[i].measures[o].slur_break && u ? (ie.push({
                            startId: w(t[i].measures),
                            endId: B(t[i].measures, o)
                        }), g = o, u = !1) : t[i].measures[o].slur_break && !u ? (ae.push({
                            startId: w(t[i].measures, g),
                            endId: B(t[i].measures, o)
                        }), g = o) : o != l - 1 || g ? o == l - 1 && g && !u && ae.push({
                            startId: w(t[i].measures, g),
                            endId: B(t[i].measures, o)
                        }) : ie.push({
                            startId: w(t[i].measures),
                            endId: B(t[i].measures, o)
                        });
                    var f = [],
                        m = [];
                    for (kk = 0; kk < t[i].measures.length; kk++)
                        3 > kk ? f.push(t[i].measures[kk]) : m.push(t[i].measures[kk]);
                    z(f, !0, !0), z(m, !1, !0)
                }
            } else
                switch (t[i].type) {
                case "note":
                    var x = M ? C : A,
                        S = x.deltas && x.deltas[K] ? x.deltas[K] : 0;
                    if (ke && (S = x.partDeltas ? x.partDeltas[ke][X[ke]] : 0), h(t[i], charWidth + S, r, a), t[i].duration_marks) {
                        var _ = t[i].duration_marks;
                        for (o = 0; o < _.length; o++)
                            if ("-" == _[o][0])
                                for (var N = 0; N < _[o].length; N++)
                                    N == _[o].length - 1 && _[o + 1] && "." == _[o + 1][0] ? h({
                                        type: "dash",
                                        dot: !0
                                    }, charWidth + S) : h({
                                        type: "dash"
                                    }, charWidth + S)
                    }
                    break;
                case "aeration":
                    d(t[i + 1]);
                    break;
                case "prelude_begin":
                    b("left"), me = !0;
                    break;
                case "prelude_end":
                    b("right"), me = !1;
                    break;
                case "repeat_part_begin":
                    xe = !0, "neat" != F.displayMode && (ee += charWidth / 2), oe.push({
                        beginX: ee,
                        beginY: te,
                        repeatIndex: t[i].repeat
                    });
                    break;
                case "repeat_part_end":
                    if (xe = !1, oe.length > 0) {
                        var R = oe[oe.length - 1];
                        R.endX = ee, R.endY = te
                    }
                    "neat" != F.displayMode && (ee += charWidth / 2);
                    break;
                case "cresc_begin":
                    be = !0, ne.push({
                        beginX: ee,
                        beginY: te,
                        type: "cresc"
                    });
                    break;
                case "dim_begin":
                    be = !0, ne.push({
                        beginX: ee,
                        beginY: te,
                        type: "dim"
                    });
                    break;
                case "cresc_end":
                case "dim_end":
                    be = !1;
                    var I = ne[ne.length - 1];
                    I.endX = ee, I.endY = te;
                    break;
                case "no_repeat_begin":
                case "no_repeat_end":
                    W();
                    break;
                case "free_repeat_begin":
                    We = !0, se.push({
                        beginX: ee,
                        beginY: te
                    });
                    break;
                case "free_repeat_end":
                    We = !1;
                    var R = se[se.length - 1];
                    R.endX = ee, R.endY = te;
                    break;
                case "slide_up":
                    v("up");
                    break;
                case "slide_down":
                    v("down");
                    break;
                case "stop":
                    p(t[i]);
                    break;
                case "rhythm":
                    y(t[i]);
                    break;
                default:
                    var L = dividerWidth,
                        x = M ? C : A;
                    h(t[i], L), isBarType(t[i]) ? ke ? X[ke]++ : (x.breakBarIndex && $.inArray(K, x.breakBarIndex) >= 0 && e(), K++, ve && D++) : "text" == t[i].type && t[i].new_line && K && K++
                }
    }
    function w(t, e) {
        for (e = e ? e : 0; t[e].measures;)
            return w(t[e].measures);
        for (; t[e] && "note" != t[e].type;)
            e++;
        return t[e] ? t[e].id : ""
    }
    function B(t, e) {
        for (e = e ? e : t.length - 1; t[e].measures;)
            return B(t[e].measures);
        for (; t[e] && "note" != t[e].type;)
            e--;
        return t[e] ? t[e].id : ""
    }
    this.adjustXArr = [];
    var _ = this.originMeasures || this.measures.concat(),
        M = !1;
    this.hasHarmonyName = !1, this.isBgm = !1, this.extractHarmony(_), Object.keys(this.parts).length && (M = !0), paper.clear();
    var F = this,
        H = this.measures || [];
    this.preParse();
    for (var N = "print" == this.mediaMode, R = this.getNotes(this.measures), I = 0, L = 0; L < R.length; L++)
        "note" == R[L].type && 0 != R[L].scale && I++;
    for (L = 0; L < H.length; L++)
        "info" == H[L].type && H[L].i && (this.instrument = H[L].i);
    "o3" == this.instrument ? (padding = 30 * renderRadio, ee = padding, te += 30, charWidth = 70 * renderRadio, instruHeight = 90 * renderRadio, o3InstruSize = {
        width: 80 * renderRadio,
        height: 80 * renderRadio
    }) : (padding = 20, ee = padding, charWidth = 40 * renderRadio, instruHeight = 60 * renderRadio);
    var A = {},
        C = {},
        D = 0,
        X = {},
        O = {},
        j = {},
        Y = !0;
    if (isMob && window.innerWidth < window.innerHeight && (Y = !1, this.displayMode = "text"), $("html").attr("data-pagetype") && $("html").hasClass("lr") && R.length < containerWidth / charWidth && (Y = !1), "neat" == this.displayMode && Y) {
        if ("auto" == this.alignMode)
            if (M) {
                C = this.autoAlignHarmony(_);
                for (var E in this.parts)
                    X[E] = 0, O[E] = 0, j[E] = 0
            } else
                A = this.autoAlign();
        else if ("fixed" == this.alignMode)
            for (var E in this.parts)
                ;
    } else
        $("#box").width(containerWidth);
    var L,
        G,
        P,
        U = JSON.parse(F.lyric || "[]"),
        T = 0,
        q = 0,
        Z = 0,
        V = 0,
        J = 0,
        K = 0,
        Q = 0,
        te = isMob ? 140 : 170,
        ee = padding,
        re = [],
        ae = [],
        ie = [],
        ne = [],
        oe = [],
        de = [],
        he = [],
        se = [],
        pe = !0,
        le = !0,
        ge = !0,
        ce = 0,
        ue = [],
        fe = !1,
        me = !1,
        xe = !1,
        We = !1,
        be = !1,
        ve = !1,
        ye = "",
        ke = "",
        Se = 0;
    if (containerWidth = $("#box").width(), this.hasHarmonyName || (paddingDelta -= 50), Object.keys(this.parts).length && Y && (padding += paddingDelta, ee = padding, containerWidth += paddingDelta, $("#box").width(containerWidth)), this.drawHeader(), te = this.header.getBBox().y2 + instruHeight + 20, lineHeight = Math.floor(instruHeight + 80 * renderRadio - lyricHeight), "none" !== this.instrument && this.bDrawInstru || (lineHeight -= instruHeight / 2, te -= instruHeight), !this.measures)
        return !1;
    for (F.fingering && F.fingering.length > 2 && (te += 30 * (F.fingering.length - 2)), Se = te, G = 0; G < U.length; G++)
        $.trim(U[G]) ? (U[G] = U[G].replace("　", " "), U[G] = formatLyric(U[G]), q++) : (U.splice(G, 1), G--);
    this.bDrawLyric && q > 0 && (lineHeight += q * lyricHeight);
    var ze = lineHeight;
    for (t(), z(H, !1, !1), L = 0, P = ae.length; P > L; L++)
        l(ae[L].startId, ae[L].endId, ae[L].higher);
    for (L = 0, P = de.length; P > L; L++)
        g(de[L].startId);
    for (L = 0, P = he.length; P > L; L++)
        c(he[L].endId);
    for (L = 0, P = ie.length; P > L; L++)
        u(ie[L].startId, ie[L].endId);
    for (L = 0, P = ne.length; P > L; L++)
        f(ne[L]);
    for (L = 0, P = oe.length; P > L; L++)
        m(oe[L]);
    for (L = 0, P = se.length; P > L; L++)
        x(se[L]);
    $("#music").height(200 + te), this.drawFooter();
    var we = $("#box"),
        Be = we.width() - (2 * dividerWidth - nerrowDividerWidth - 10);
    if (Y)
        for (we.width(Be), L = 0; L < this.adjustXArr.length; L++)
            this.adjustXArr[L].attr({
                transform: "t" + (Be - this.adjustXArr[L].getBBox().width - 10)
            });
    isEdge() && $("#box use").each(function(t, e) {
        var r = $(e).attr("href");
        $(e).attr("href", r)
    })
}, Maker.prototype.drawAppoggiatura = function(t, e, r, a) {
    var i,
        n = {
            fontSize: smallestFontSize,
            fontFamily: "Calibri"
        },
        o = {
            fill: "#000",
            stroke: "none"
        },
        d = {
            fill: "none",
            stroke: "#000"
        },
        h = 8,
        s = e,
        p = !1;
    if ("left" == a) {
        for (e -= t.length * h + 10, i = 0; i < t.length; i++) {
            var l = this.bUseCNote ? t[i].c_note.octave : t[i].octave;
            e += h, paper.text(e, r - 18, t[i].scale).attr(n), paper.rect(e - 1, r - 17, 7, 1).attr(o), paper.rect(e - 1, r - 15, 7, 1).attr(o), -1 === l ? (paper.circle(e + 2, r - 12, 1).attr(o), i == t.length - 1 && (p = !0)) : 1 === l && paper.circle(e + 4, r - 30, 1).attr(o)
        }
        p ? paper.path("M" + (s - 8) + "," + (r - 10) + "c0,3,0,3,6,3").attr(d) : paper.path("M" + (s - 8) + "," + (r - 14) + "c0,6,0,6,6,6").attr(d)
    } else if ("right" == a) {
        for (e += 10, i = 0; i < t.length; i++) {
            var l = this.bUseCNote ? t[i].c_note.octave : t[i].octave;
            e += h, paper.text(e, r - 18, t[i].scale).attr(n), paper.rect(e - 1, r - 17, 7, 1).attr(o), paper.rect(e - 1, r - 15, 7, 1).attr(o), -1 === l ? (paper.circle(e + 2, r - 12, 1).attr(o), i == t.length - 1 && (p = !0)) : 1 === l && paper.circle(e + 4, r - 30, 1).attr(o)
        }
        p ? paper.path("M" + (s + 21) + "," + (r - 10) + "c0,3,0,3,-6,3").attr(d) : paper.path("M" + (s + 21) + "," + (r - 14) + "c0,6,0,6,-6,6").attr(d)
    }
}, Maker.prototype.drawStaccato = function(t, e) {
    paper.path("M" + (t + noteWidth / 2) + "," + (e - noteHeight - 6 * renderRadio) + "l2,-5l-4,0l2,5Z").attr({
        fill: "#000",
        stroke: "none"
    })
}, Maker.prototype.drawBracket = function(t, e, r, a) {
    var i = {
        fill: "none",
        stroke: "black"
    };
    r -= 10 * renderRadio + noteHeight;
    var n = t + 6,
        o = e + 6,
        d = r - (a ? 10 : 5);
    3 * charWidth > e - t ? (d -= a ? 5 : 3, paper.path("M" + n + "," + r + "C" + (n + 8) + "," + d + "," + (o - 8) + "," + d + "," + o + "," + r).attr(i)) : paper.path("M" + n + "," + r + "C" + (n + 2) + "," + d + "," + (n + 2) + "," + d + "," + (n + 16) + "," + d + "L" + (o - 16) + "," + d + "C" + (o - 2) + "," + d + "," + (o - 2) + "," + d + "," + o + "," + r).attr(i)
}, Maker.prototype.drawBracketLeft = function(t, e, r, a) {
    var i = {
        fill: "none",
        stroke: "black"
    };
    r -= 10 * renderRadio + noteHeight;
    var n = t + noteWidth / 2,
        o = e + 26,
        d = r - (a ? 10 : 6);
    paper.path("M" + n + "," + r + "C" + (n + 2) + "," + d + "," + (n + 2) + "," + d + "," + (n + 16) + "," + d + "L" + o + "," + d).attr(i)
}, Maker.prototype.drawBracketRight = function(t, e, r, a) {
    var i = {
        fill: "none",
        stroke: "black"
    };
    r -= 10 * renderRadio + noteHeight;
    var n = t - 14,
        o = e + noteWidth / 2,
        d = r - (a ? 10 : 6);
    paper.path("M" + o + "," + r + "C" + (o - 2) + "," + d + "," + (o - 2) + "," + d + "," + (o - 16) + "," + d + "L" + n + "," + d).attr(i)
}, Maker.prototype.drawNBracket = function(t, e, r) {
    this.drawNBracketLeft(t, (t + e) / 2 - 6, r), this.drawNBracketRight((t + e) / 2 + 6, e, r), paper.text((t + e) / 2 - 3, r - 10 * renderRadio - noteHeight, "3").attr({
        fontSize: smallestFontSize
    })
}, Maker.prototype.drawNBracketLeft = function(t, e, r) {
    var a = {
        fill: "none",
        stroke: "black"
    };
    r -= 10 * renderRadio + noteHeight;
    var i = r - 6;
    paper.path("M" + t + "," + r + "C" + (t + 2) + "," + i + "," + (t + 2) + "," + i + "," + (t + 16) + "," + i + "L" + e + "," + i).attr(a)
}, Maker.prototype.drawNBracketRight = function(t, e, r) {
    var a = {
        fill: "none",
        stroke: "black"
    };
    r -= 10 * renderRadio + noteHeight;
    var i = r - 6;
    paper.path("M" + e + "," + r + "C" + (e - 2) + "," + i + "," + (e - 2) + "," + i + "," + (e - 16) + "," + i + "L" + t + "," + i).attr(a)
}, Maker.prototype.drawHarmonyBar = function(t, e) {
    var r = e - t;
    paper.path("M" + paddingDelta + "," + t + "c0,2,-6,6,-8,6l0," + r + "c2,0,8,4,8,6c0,-2,0,-2,-5,-8l0,-" + (r - 4) + "c5,-6,5,-6,5,-8Z"), paper.path("M" + (paddingDelta - 1) + "," + (t + 10) + "l0," + (r - 8) + "l2,0l0,-" + (r - 8) + "l-2,0Z")
}, Maker.prototype.drawFingering = function(t, e, r, a) {
    if (r.minNote && r.maxNote) {
        var i,
            n = paper.g(),
            o = this.bUseCNote,
            d = "全按为";
        "o6" == this.instrument ? i = "#tdOutline1" : "o12" == this.instrument ? i = "#tdo12Outline4" : "o3" == this.instrument ? i = "#tdo3Outline60" : "x8" == this.instrument ? i = "#x8Outline60" : "x10" == this.instrument && (i = "#x10Outline60");
        var h,
            s,
            p,
            l,
            g,
            c,
            u,
            f = paper.g(),
            m = paper.g();
        if ("none" != this.instrument) {
            if (r.allNote) {
                f.add(paper.use(i).attr({
                    x: 0,
                    y: e - 20,
                    width: "o6" == this.instrument || "x8" == this.instrument || "x10" == this.instrument ? 20 : 30,
                    height: "o3" == this.instrument ? 30 : 25,
                    fill: colorArr[(o ? "C" : r.fingering) || "F"]
                })), f.add(paper.text(f.getBBox().width + 5, e, d).attr({
                    fontSize: smallFontSize
                }));
                var x = (r.allNote.accidental ? "#" : "") + r.allNote.scale;
                if (o && (x = "1"), h = paper.text(f.getBBox().width + 2, e - 1, x).attr({
                    fontSize: smallFontSize
                }), f.add(h), r.allNote.octave < 0 && !o) {
                    var W = -Math.floor(smallNoteWidth / 2);
                    "o12" == this.instrument && (W -= 1), s = paper.circle(Math.round(f.getBBox().width) + W, e + 3, 1.5).attr({
                        fill: "#000",
                        stroke: "none"
                    }), f.add(s), r.allNote.octave < -1 && (p = paper.circle(Math.round(f.getBBox().width) + W, e + 3 + 4 * renderRadio, 1.5).attr({
                        fill: "#000",
                        stroke: "none"
                    }), f.add(p))
                }
            }
            f.add(paper.text(f.getBBox().width + 15, e, (o ? "C" : r.fingering) + "调指法").attr({
                fontSize: smallFontSize
            })), r.tonality && f.add(paper.text(f.getBBox().width + 15, e, r.tonality).attr({
                fontSize: smallFontSize
            })), o || r.keyNoteName && !isMob && f.add(paper.text(f.getBBox().width + 10, e, "(1=" + r.keyNoteName + ")").attr({
                fontSize: smallFontSize
            })), f.attr({
                transform: "t" + t
            })
        }
        m.add(paper.text(0, e, "音域").attr({
            fontSize: smallFontSize
        }));
        var b = "",
            v = "",
            y = o ? r.minNote.c_note : r.minNote,
            k = o ? r.maxNote.c_note : r.maxNote;
        y.accidental > 0 ? b = "#" : y.accidental < 0 && (b = "b"), k.accidental > 0 ? v = "#" : k.accidental < 0 && (v = "b"), y.octave < 0 ? (b && (l = paper.text(m.getBBox().width + 4, e - 3, b).attr({
            fontSize: smallestFontSize
        })), g = paper.text(m.getBBox().width + 10, e - 1, y.scale).attr({
            fontSize: smallFontSize
        }), c = paper.circle(m.getBBox().width + 10 + smallNoteWidth / 2, e + 3, 1.5).attr({
            fill: "#000",
            stroke: "none"
        }), y.octave < -1 && (u = paper.circle(m.getBBox().width + 10 + smallNoteWidth / 2, e + 3 + 4 * renderRadio, 1.5).attr({
            fill: "#000",
            stroke: "none"
        })), l && m.add(l), m.add(g), m.add(c), u && m.add(u)) : y.octave > 0 ? (b && (l = paper.text(m.getBBox().width + 4, e - 3, b).attr({
            fontSize: smallestFontSize
        })), g = paper.text(m.getBBox().width + 10, e + 1, y.scale).attr({
            fontSize: smallFontSize
        }), c = paper.circle(m.getBBox().width + 10 + smallNoteWidth / 2, e - g.getBBox().height + 2, 1.5).attr({
            fill: "#000",
            stroke: "none"
        }), y.octave > 1 && (u = paper.circle(m.getBBox().width + 10 + smallNoteWidth / 2, e - g.getBBox().height + 2 - 4 * renderRadio, 1.5).attr({
            fill: "#000",
            stroke: "none"
        })), l && m.add(l), m.add(g), m.add(c), u && m.add(u)) : (b && (l = paper.text(m.getBBox().width + 4, e - 3, b).attr({
            fontSize: smallestFontSize
        }), m.add(l)), g = paper.text(m.getBBox().width + 10, e, y.scale).attr({
            fontSize: smallFontSize
        }), l && m.add(l), m.add(g)), m.add(paper.text(m.getBBox().width + 4, e, "到").attr({
            fontSize: smallFontSize
        })), k.octave < 0 ? (v && (l = paper.text(m.getBBox().width + 4, e - 3, v).attr({
            fontSize: smallestFontSize
        })), g = paper.text(m.getBBox().width + 10, e - 1, k.scale).attr({
            fontSize: smallFontSize
        }), c = paper.circle(m.getBBox().width + 10 + smallNoteWidth / 2, e + 3, 1.5).attr({
            fill: "#000",
            stroke: "none"
        }), k.octave < -1 && (u = paper.circle(m.getBBox().width + 10 + smallNoteWidth / 2, e + 3 + 4 * renderRadio, 1.5).attr({
            fill: "#000",
            stroke: "none"
        })), l && m.add(l), m.add(g), m.add(c), u && m.add(u)) : k.octave > 0 ? (v && (l = paper.text(m.getBBox().width + 4, e - 3, v).attr({
            fontSize: smallestFontSize
        })), g = paper.text(m.getBBox().width + 10, e + 1, k.scale).attr({
            fontSize: smallFontSize
        }), c = paper.circle(m.getBBox().width + 10 + smallNoteWidth / 2, e - smallNoteHeight - 2, 1.5).attr({
            fill: "#000",
            stroke: "none"
        }), k.octave > 1 && (u = paper.circle(m.getBBox().width + 10 + smallNoteWidth / 2, e - smallNoteHeight - 2 - 4 * renderRadio, 1.5).attr({
            fill: "#000",
            stroke: "none"
        })), l && m.add(l), m.add(g), m.add(c), u && m.add(u)) : (v && (l = paper.text(m.getBBox().width + 4, e - 3, v).attr({
            fontSize: smallestFontSize
        })), g = paper.text(m.getBBox().width + 10, e, k.scale).attr({
            fontSize: smallFontSize
        }), l && m.add(l), m.add(g)), m.attr({
            transform: "t" + (containerWidth - m.getBBox().width - 30)
        }), e += 30, n.add(f), n.add(m), this.adjustXArr.push(m), a && this.header.add(n)
    }
}, Maker.prototype.drawHeader = function() {
    var t,
        e,
        r = 30,
        a = [],
        i = 20,
        n = this.bUseCNote;
    if (this.header && this.header.remove(), this.header = paper.g(), t = this.song_name) {
        var o = paper.text(containerWidth / 2, r, t).attr({
            fontSize: "print" == this.mediaMode ? titleFontSize : largerFontSize,
            fontWeight: "bold",
            id: "header-name"
        });
        this.adjustX(o), this.header.add(o)
    }
    if (t = this.alias_name) {
        var d = paper.text(containerWidth / 2, r + 24, t).attr({
            fontSize: smallFontSize,
            id: "header-alias"
        });
        this.adjustX(d), this.header.add(d)
    }
    for (e = 0; e < this.measures.length && "info" == this.measures[e].type; e++)
        this.measures[e].play && this.measures[e].play.length && this.header.add(paper.text(i, r + 92, this.measures[e].play_hint).attr({
            fontSize: commonFontSize
        }));
    if ((t = this.keynote) && !isMob && !n) {
        var h,
            s,
            p,
            l = paper.g();
        t.indexOf("#") > 0 ? (h = paper.text(i, r + 60, "1=").attr({
            fontSize: commonFontSize
        }), s = paper.text(i + h.getBBox().width, r + 56, "#").attr({
            fontSize: smallestFontSize
        }), p = paper.text(i + h.getBBox().width + s.getBBox().width, r + 60, t[3] || "").attr({
            fontSize: commonFontSize
        })) : t.indexOf("b") > 0 ? (h = paper.text(i, r + 60, "1=").attr({
            fontSize: commonFontSize
        }), s = paper.text(i + h.getBBox().width, r + 56, "b").attr({
            fontSize: smallestFontSize
        }), p = paper.text(i + h.getBBox().width + s.getBBox().width, r + 60, t[3] || "").attr({
            fontSize: commonFontSize
        })) : h = paper.text(i, r + 60, t.replace(/(1=\D+)\d+/g, "$1")).attr({
            fontSize: commonFontSize
        }), h && l.add(h), s && l.add(s), p && l.add(p), this.header.add(l), i += l.getBBox().width + 20
    }
    if ((t = this.rhythm) && !isMob) {
        var g = paper.g();
        for (a = this.rhythm.split(/[\s]+/g).filter(function(t) {
            return t
        }), e = 0; e < a.length; e++)
            g.add(paper.text(i + 24 * e, r + 50, a[e][0]).attr({
                fontSize: commonFontSize
            })), g.add(paper.rect(i + 24 * e - 4, r + 54, 20 * renderRadio, 1).attr({
                fill: "#000",
                stroke: "none"
            })), g.add(paper.text(i + 24 * e, r + 70, a[e][2]).attr({
                fontSize: commonFontSize
            }));
        i += g.getBBox().width + 10, this.header.add(g)
    }
    this.fingering && this.fingering.length > 0 && this.drawFingering(i, r + 60, this.fingering[0], !0)
}, Maker.prototype.drawFooter = function() {
    var t,
        e = $("#music").height(),
        r = padding;
    if (this.footer && this.footer.remove(), this.footer = paper.g(), (t = this.lyric_composer) && !isMob) {
        t = "作词：" + t;
        var a = paper.text(r, e - 30, t).attr({
            fontSize: smallFontSize
        });
        r += a.getBBox().width + 20, this.footer.add(a)
    }
    if ((t = this.music_composer) && !isMob) {
        t = "作曲：" + t;
        var i = paper.text(r, e - 30, t).attr({
            fontSize: smallFontSize
        });
        r += i.getBBox().width + 20, this.footer.add(i)
    }
    if ($(".info").length > 0 && $(".info").attr("data-unick")) {
        var n = paper.text(0, e - 30, "制谱：" + $(".info").attr("data-unick")).attr({
            fontSize: smallFontSize
        });
        n.attr({
            transform: "t" + (containerWidth - n.getBBox().width - 30)
        }), this.footer.add(n), this.adjustXArr.push(n)
    }
    this.fingering && this.fingering[0] && this.fingering[0].instrument && this.fingering[0].overflow_tips && this.footer.add(paper.text(padding, e - 5, "*温馨提示：" + this.fingering[0].overflow_tips).attr({
        fontSize: smallFontSize,
        fill: "red"
    }))
}, Maker.prototype.getNotes = function(t, e) {
    function r(t) {
        for (var e = 0, a = t.length; a > e; e++)
            $.inArray(t[e].type, n) >= 0 || (t[e].measures ? r(t[e].measures) : i.push(t[e]))
    }
    var a,
        i = [],
        n = ["info", "aeration", "prelude_begin", "prelude_end", "repeat_part_begin", "repeat_part_end", "cresc_begin", "dim_begin", "cresc_end", "dim_end", "no_repeat_begin", "no_repeat_end", "free_repeat_begin", "free_repeat_end", "stop", "rhythm"];
    if (e && e.length)
        for (var a = 0; a < n.length; a++)
            e.indexOf(n[a]) >= 0 && (n.splice(a, 1), a--);
    return r(t), i
}, Maker.prototype.resizePage = function(t) {
    renderRadio = t, reCalcParams(), this.redraw()
}, Maker.prototype.adjustX = function(t) {
    var e = t.getBBox().width;
    t.attr({
        transform: "t-" + e / 2
    })
}, Maker.prototype.preParse = function() {
    for (var t = 0, e = this.measures.length; e > t; t++) {
        var r = this.measures[t];
        "info" == r.type && r.display && (this.displayMode = r.display), "info" == r.type && r.align && (this.alignMode = r.align), "info" == r.type && r.media && (this.mediaMode = r.media)
    }
}, Maker.prototype.autoAlign = function() {
    var t,
        e,
        r = this.getGroups(),
        a = [],
        i = 0,
        n = [];
    for (t = 0, e = r.length; e > t; t++)
        if (a[i] || (a[i] = {
            barCount: 0,
            textWidth: 0,
            appoggiaturaWidth: 0,
            groupNotes: [],
            skipAlign: !1
        }), r[t].newLine && i)
            a[i].skipAlign = !0, i++, a[i] = {
                barCount: 1,
                textWidth: r[t].textWidth,
                appoggiaturaWidth: r[t].appoggiaturaWidth,
                groupNotes: [r[t].groupNotes],
                skipAlign: !1
            };
        else {
            var o = 0;
            a[i].groupNotes.length && (o = a[i].groupNotes.reduce(function(t, e) {
                return t + e
            }));
            var d = o * charWidth + a[i].barCount * dividerWidth + a[i].textWidth + a[i].appoggiaturaWidth,
                h = r[t].textWidth + r[t].appoggiaturaWidth + r[t].groupNotes * charWidth + dividerWidth;
            d + h + padding + dividerWidth > containerWidth && (n.push(t - 1), i++), a[i] || (a[i] = {
                barCount: 0,
                textWidth: 0,
                appoggiaturaWidth: 0,
                groupNotes: [],
                skipAlign: !1
            }), a[i].barCount++, a[i].groupNotes.push(r[t].groupNotes), a[i].textWidth += r[t].textWidth, a[i].appoggiaturaWidth += r[t].appoggiaturaWidth
        }
    var s = 0,
        p = [];
    for (t = 0; t < a.length; t++) {
        var o = 0;
        a[t].groupNotes.length && (o = a[t].groupNotes.reduce(function(t, e) {
            return t + e
        })), s = Math.max(o * charWidth + a[t].barCount * dividerWidth + a[t].textWidth + a[t].appoggiaturaWidth, s)
    }
    for ($("#box").width(s + padding + dividerWidth), t = 0; t < a.length; t++) {
        p[t] = 0;
        var o = 0;
        a[t].groupNotes.length && (o = a[t].groupNotes.reduce(function(t, e) {
            return t + e
        })), p[t] = (s - a[t].barCount * dividerWidth - a[t].textWidth - a[t].appoggiaturaWidth) / o - charWidth
    }
    p[p.length - 1] = 0;
    var l = [];
    for (t = 0; t < p.length; t++)
        for (var g = 0; g < a[t].groupNotes.length; g++)
            l.push(a[t].skipAlign ? 0 : a[t].groupNotes[g] ? p[t] : 0);
    return {
        breakBarIndex: n,
        deltas: l
    }
}, Maker.prototype.getGroups = function() {
    var t,
        e,
        r,
        a = this.getNotes(this.measures, ["info", "stop"]),
        i = [],
        n = 0;
    for (t = 0, r = a.length; r > t; t++)
        if (i[n] || (i[n] = {
            textWidth: 0,
            appoggiaturaWidth: 0,
            groupNotes: 0,
            newLine: !1
        }), "note" == a[t].type) {
            if (i[n].groupNotes++, a[t].duration_marks)
                for (e = 0; e < a[t].duration_marks.length; e++)
                    i[n].groupNotes += a[t].duration_marks[e].replace(/[^-]/g, "").length;
            a[t].left_appoggiatura && a[t].left_appoggiatura.length > 2 && (i[n].appoggiaturaWidth += charWidth)
        } else if ("text" == a[t].type) {
            a[t].new_line && n && (n++, i[n] = {
                textWidth: 0,
                appoggiaturaWidth: 0,
                groupNotes: 0,
                newLine: !0
            });
            var o = paper.text(1e4, 50, a[t].content).attr({
                    fontSize: commonFontSize
                }),
                d = o.getBBox(),
                h = d.width;
            i[n].textWidth += Math.ceil(h / charWidth) * charWidth
        } else
            "stop" == a[t].type ? i[n].textWidth += 3 * charWidth + 18 : isBarType(a[t]) ? n++ : "info" == a[t].type && a[t].instrument && (i[n].newLine = !0);
    return i
}, Maker.prototype.autoAlignHarmony = function(t) {
    var e = this.getHarmonyGroups(t);
    for (var r in e)
        e[r].gs = e[r].gs.filter(function(t) {
            return t.groupNotes
        });
    for (var a, i, n, o = [], d = 0, h = 0, s = [], p = {
            harmony: []
        }, l = Object.keys(this.parts), g = 0; g < l.length; g++)
        p[l[g]] = [];
    for (i = 0, n = e.length; n > i; i++) {
        var c = e[i].gs;
        if ("part" != e[i].type) {
            for (a = 0; a < c.length; a++) {
                var u = c[a],
                    f = u.groupNotes * charWidth + u.textWidth + u.appoggiaturaWidth;
                if ("harmony" == e[i].type) {
                    for (var m = 0; m < e.length; m++)
                        if ("part" == e[m].type && e[i].name.indexOf(e[m].name) >= 0) {
                            var x = e[m].gs[a];
                            x && x.groupNotes * charWidth + x.textWidth + x.appoggiaturaWidth > f && (u = x, f = x.groupNotes * charWidth + x.textWidth + x.appoggiaturaWidth)
                        }
                    for (var m = 0; m < e.length; m++)
                        "harmony" == e[m].type ? p.harmony.push({
                            td: e[m].gs[a].textWidth - u.textWidth,
                            ad: e[m].gs[a].appoggiaturaWidth - u.appoggiaturaWidth,
                            cn: e[m].gs[a].groupNotes,
                            tn: u.groupNotes
                        }) : "part" == e[m].type && e[i].name.indexOf(e[m].name) >= 0 && e[m].gs[a] && p[e[m].name].push({
                            td: e[m].gs[a].textWidth - u.textWidth,
                            ad: e[m].gs[a].appoggiaturaWidth - u.appoggiaturaWidth,
                            cn: e[m].gs[a].groupNotes,
                            tn: u.groupNotes
                        })
                }
                if (o[d] || (o[d] = {
                    harmonyLine: "harmony" == e[i].type,
                    barCount: 0,
                    textWidth: 0,
                    appoggiaturaWidth: 0,
                    groupNotes: [],
                    skipAlign: !1
                }), u.newLine && d)
                    o[d].skipAlign = !0, d++, o[d] = {
                        harmonyLine: "harmony" == e[i].type,
                        barCount: 1,
                        textWidth: u.textWidth,
                        appoggiaturaWidth: u.appoggiaturaWidth,
                        groupNotes: [u.groupNotes],
                        skipAlign: !1
                    };
                else {
                    var W = 0;
                    o[d].groupNotes.length && (W = o[d].groupNotes.reduce(function(t, e) {
                        return t + e
                    }));
                    var b = W * charWidth + o[d].barCount * dividerWidth + o[d].textWidth + o[d].appoggiaturaWidth,
                        v = u.textWidth + u.appoggiaturaWidth + u.groupNotes * charWidth + dividerWidth;
                    b + v + padding + dividerWidth > containerWidth - paddingDelta && (s.push(h - 1), d++), o[d] || (o[d] = {
                        harmonyLine: "harmony" == e[i].type,
                        barCount: 0,
                        textWidth: 0,
                        appoggiaturaWidth: 0,
                        groupNotes: [],
                        skipAlign: !1
                    }), o[d].barCount++, o[d].groupNotes.push(u.groupNotes), o[d].textWidth += u.textWidth, o[d].appoggiaturaWidth += u.appoggiaturaWidth, h++, "normal" == e[i].type && a == c.length - 1 && (o[d].skipAlign = !0)
                }
            }
            s.push(h - 1), d++
        }
    }
    var y = 0,
        k = [];
    for (a = 0; a < o.length; a++)
        if (o[a] && o[a].groupNotes) {
            var W = 0;
            o[a].groupNotes.length && (W = o[a].groupNotes.reduce(function(t, e) {
                return t + e
            })), y = Math.max(W * charWidth + o[a].barCount * dividerWidth + o[a].textWidth + o[a].appoggiaturaWidth, y)
        }
    for ($("#box").width(y + padding + dividerWidth), a = 0; a < o.length; a++) {
        k[a] = 0;
        var W = 0;
        o[a] && o[a].groupNotes && (o[a].groupNotes.length && (W = o[a].groupNotes.reduce(function(t, e) {
            return t + e
        })), k[a] = (y - o[a].barCount * dividerWidth - o[a].textWidth - o[a].appoggiaturaWidth) / W - charWidth)
    }
    k[k.length - 1] = 0;
    for (var S = [], z = {}, w = 0, g = 0; g < l.length; g++)
        z[l[g]] = [];
    for (a = 0; a < k.length; a++)
        if (o[a])
            for (var i = 0; i < o[a].groupNotes.length; i++)
                if (o[a].skipAlign)
                    S.push(0);
                else if (o[a].groupNotes[i])
                    if (o[a].harmonyLine) {
                        S.push(((k[a] + charWidth) * p.harmony[w].tn - p.harmony[w].td - p.harmony[w].ad) / p.harmony[w].cn - charWidth);
                        for (var m = 0; m < l.length; m++)
                            p[l[m]][w] && z[l[m]].push(((k[a] + charWidth) * p[l[m]][w].tn - p[l[m]][w].td - p[l[m]][w].ad) / p[l[m]][w].cn - charWidth);
                        w++
                    } else
                        S.push(k[a]);
                else
                    S.push(0);
    return {
        breakBarIndex: s,
        deltas: S,
        partDeltas: z
    }
}, Maker.prototype.getHarmonyGroups = function(t) {
    var e,
        r,
        a,
        i = this.getNotes(t, ["info"]),
        n = [],
        o = !1,
        d = !1,
        h = 0,
        s = 0;
    for (e = 0, a = i.length; a > e; e++)
        if ("info" != i[e].type || i[e].harmony || i[e].harmony_end || i[e].bgm || i[e].bgm_end || i[e].part || i[e].part_end || i[e].instrument || i[e].name)
            if (n[s] || (n[s] = {
                type: "normal",
                name: "",
                gs: []
            }), i[e].harmony || i[e].bgm)
                o = !0, h = 0, n[s].gs.length ? (s++, n[s] = {
                    type: "harmony",
                    name: i[e].harmony || i[e].bgm,
                    gs: []
                }) : (n[s].type = "harmony", n[s].name = i[e].harmony || i[e].bgm);
            else if (i[e].harmony_end || i[e].bgm_end)
                o = !1, h = 0, s++;
            else if (i[e].part)
                d = !0, n[s] = {
                    type: "part",
                    name: i[e].part,
                    gs: []
                };
            else if (i[e].part_end)
                d = !1, h = 0, s++;
            else if (n[s].gs[h] || (n[s].gs[h] = {
                textWidth: 0,
                appoggiaturaWidth: 0,
                groupNotes: 0,
                newLine: !1
            }), "note" == i[e].type) {
                if (n[s].gs[h].groupNotes++, i[e].duration_marks)
                    for (r = 0; r < i[e].duration_marks.length; r++)
                        n[s].gs[h].groupNotes += i[e].duration_marks[r].replace(/[^-]/g, "").length;
                i[e].left_appoggiatura && i[e].left_appoggiatura.length > 2 && (n[s].gs[h].appoggiaturaWidth += charWidth)
            } else if ("text" == i[e].type) {
                var p = paper.text(1e4, 50, i[e].content).attr({
                        fontSize: commonFontSize
                    }),
                    l = p.getBBox(),
                    g = l.width;
                n[s].gs[h].textWidth += Math.ceil(g / charWidth) * charWidth, i[e].new_line && (n[s].gs[h].newLine = !0)
            } else
                isBarType(i[e]) ? h++ : "info" == i[e].type && (i[e].instrument && (n[s].gs[h].newLine = !0), (o || d) && i[e].name && (this.hasHarmonyName = !0));
    return n
}, Maker.prototype.extractHarmony = function(t) {
    for (var e = !1, r = [], a = "", i = {}, n = 0, o = t.length; o > n; n++)
        t[n].bgm && (this.isBgm = !0), e || r.push(t[n]), t[n].part && (e = !0, a = t[n].part, i[a] = []), t[n].part_end && (e = !1, a = ""), a && i[a].push(t[n]);
    for (var d in i)
        this.parts[d] = i[d];
    this.measures = r
}, Maker.prototype.hasBar = function(t) {
    for (var e = this.getNotes([t]), r = 0; r < e.length; r++)
        if (isBarType(e[r]))
            return !0;
    return !1
};
var m = "function" == typeof Maker ? new Maker : function() {};


