!function(e) {
    "use strict";
    var t,
        n,
        a,
        o = [],
        r = ".sm2-bar-ui";
    o.on = {}, n = {
        stopOtherSounds: !0,
        excludeClass: "sm2-exclude"
    }, soundManager.setup({
        html5PollingInterval: 50,
        flashVersion: 9
    }), soundManager.onready(function() {
        var e,
            n,
            l;
        if (e = a.dom.getAll(r), e && e.length)
            for (n = 0, l = e.length; l > n; n++)
                o.push(new t(e[n]))
    }), t = function(t) {
        function r() {
            n.stopOtherSounds && soundManager.stopAll()
        }
        function l(e) {
            e && (B.on && B.on[e] ? B.on[e](B) : o.on[e] && o.on[e](B))
        }
        function s(e, t) {
            var n = Math.floor(e / 1e3),
                a = Math.floor(n / 3600),
                o = Math.floor(n / 60) - Math.floor(60 * a),
                r = Math.floor(n - 3600 * a - 60 * o);
            return t ? (a ? a + ":" : "") + (a && 10 > o ? "0" + o : o) + ":" + (10 > r ? "0" + r : r) : {
                min: o,
                sec: r
            }
        }
        function i(e) {
            var t = e.getElementsByTagName("a");
            t.length && (e = t[0]), w.playlistTarget.innerHTML = '<ul class="sm2-playlist-bd"><li>' + e.innerHTML.replace(N.loadFailedCharacter, "") + "</li></ul>", w.playlistTarget.getElementsByTagName("li")[0].scrollWidth > w.playlistTarget.offsetWidth && (w.playlistTarget.innerHTML = '<ul class="sm2-playlist-bd"><li><marquee>' + e.innerHTML + "</marquee></li></ul>")
        }
        function u(e) {
            return k = d(e)
        }
        function d(t) {
            var n = soundManager.createSound({
                url: t,
                volume: E,
                whileplaying: function() {
                    var e,
                        t,
                        n = 100;
                    e = Math.min(n, Math.max(0, n * (this.position / this.durationEstimate))) + "%", t = Math.min(100, Math.max(0, 100 * this.position / this.durationEstimate)) + "%", this.duration && (w.progress.style.left = e, w.progressBar.style.width = t, w.time.innerHTML = s(this.position, !0))
                },
                onbufferchange: function(e) {
                    e ? a.css.add(w.o, "buffering") : a.css.remove(w.o, "buffering")
                },
                onplay: function() {
                    a.css.swap(w.o, "paused", "playing"), l("play")
                },
                onpause: function() {
                    a.css.swap(w.o, "playing", "paused"), l("pause")
                },
                onresume: function() {
                    a.css.swap(w.o, "paused", "playing")
                },
                whileloading: function() {
                    this.isHTML5 || (w.duration.innerHTML = s(this.durationEstimate, !0))
                },
                onload: function(e) {
                    e ? w.duration.innerHTML = s(this.duration, !0) : this._iO && this._iO.onerror && this._iO.onerror()
                },
                onerror: function() {
                    var t,
                        n,
                        a;
                    t = M.getItem(), t && N.loadFailedCharacter && (w.playlistTarget.innerHTML = w.playlistTarget.innerHTML.replace("<li>", "<li>" + N.loadFailedCharacter + " "), M.data.playlist && M.data.playlist[M.data.selectedIndex] && (n = M.data.playlist[M.data.selectedIndex].getElementsByTagName("a")[0], a = n.innerHTML, -1 === a.indexOf(N.loadFailedCharacter) && (n.innerHTML = N.loadFailedCharacter + " " + a))), l("error"), navigator.userAgent.match(/mobile/i) ? b.next() : (M.data.timer && e.clearTimeout(M.data.timer), M.data.timer = e.setTimeout(b.next, 2e3))
                },
                onstop: function() {
                    a.css.remove(w.o, "playing")
                },
                onfinish: function() {
                    var e,
                        t;
                    a.css.remove(w.o, "playing"), w.progress.style.left = "0%", e = M.data.selectedIndex, l("finish"), t = M.getNext(), t ? (M.select(t), i(t), r(), this.play({
                        url: M.getURL()
                    })) : l("end")
                }
            });
            return n
        }
        function c(t) {
            soundManager.canPlayURL(t.href) && (M.data.timer && (e.clearTimeout(M.data.timer), M.data.timer = null), Object.keys(k).length || (k = d(t.href)), k.stop(), M.select(t.parentNode), i(t.parentNode), w.progress.style.left = "0px", w.progressBar.style.width = "0px", r(), k.play({
                url: t.href,
                loops: 1e4,
                position: 0
            }))
        }
        function m() {
            function t() {
                return g.playlist
            }
            function n(e) {
                var n,
                    a;
                return null === g.selectedIndex ? e : (n = t(), e = void 0 !== e ? e : g.selectedIndex, e = Math.max(0, Math.min(e, n.length)), a = n[e])
            }
            function o(e) {
                var n,
                    a,
                    o,
                    r;
                if (r = -1, n = t())
                    for (a = 0, o = n.length; o > a; a++)
                        if (n[a] === e) {
                            r = a;
                            break
                        }
                return r
            }
            function r() {
                return null !== g.selectedIndex && g.selectedIndex++, g.playlist.length ? g.selectedIndex >= g.playlist.length && (g.loopMode ? g.selectedIndex = 0 : g.selectedIndex--) : g.selectedIndex = null, n()
            }
            function l() {
                return g.selectedIndex--, g.selectedIndex < 0 && (g.loopMode ? g.selectedIndex = g.playlist.length - 1 : g.selectedIndex++), n()
            }
            function s() {
                var e,
                    t,
                    n;
                for (e = a.dom.getAll(w.playlist, "." + T.selected), t = 0, n = e.length; n > t; t++)
                    a.css.remove(e[t], T.selected)
            }
            function i(e) {
                var t,
                    n,
                    r,
                    l,
                    i,
                    u,
                    d;
                s(), e && (d = a.dom.ancestor("li", e), a.css.add(d, T.selected), n = e.offsetTop, r = n + e.offsetHeight, l = w.playlistContainer.offsetHeight, i = w.playlist.scrollTop, u = 8, r > l + i ? w.playlist.scrollTop = r - l + u : i > n && (w.playlist.scrollTop = e.offsetTop - u)), t = o(d), g.selectedIndex = t
            }
            function u(e) {
                var t;
                e = e || 0, t = n(e), t && c(t.getElementsByTagName("a")[0])
            }
            function d() {
                var e,
                    t;
                return e = n(), e && (t = e.getElementsByTagName("a")[0].href), t
            }
            function m() {
                return w.playlist ? void (g.playlist = w.playlist.getElementsByTagName("li")) : (e.console && console.warn && console.warn("refreshDOM(): playlist node not found?"), !1)
            }
            function f() {
                w.playlistTarget = a.dom.get(w.o, ".sm2-playlist-target"), w.playlistContainer = a.dom.get(w.o, ".sm2-playlist-drawer"), w.playlist = a.dom.get(w.o, ".sm2-playlist-bd")
            }
            function p() {
                E = soundManager.defaultOptions.volume, f(), m(), a.css.has(w.o, T.playlistOpen) && e.setTimeout(function() {
                    b.menu(!0)
                }, 1)
            }
            var g;
            return g = {
                playlist: [],
                selectedIndex: 0,
                loopMode: !0,
                timer: null
            }, p(), {
                data: g,
                refresh: m,
                getNext: r,
                getPrevious: l,
                getItem: n,
                getURL: d,
                playItemByOffset: u,
                select: i
            }
        }
        function f(e) {
            return e && (e.which && 2 === e.which || void 0 === e.which && 1 !== e.button) ? !0 : void 0
        }
        function p(t) {
            return t ? (I.volume.x = a.position.getOffX(t), I.volume.y = a.position.getOffY(t), I.volume.width = t.offsetWidth, I.volume.height = t.offsetHeight, I.volume.backgroundSize = parseInt(a.style.get(t, "background-size"), 10), void (e.navigator.userAgent.match(/msie|trident/i) && (I.volume.backgroundSize = I.volume.backgroundSize / I.volume.width * 100))) : !1
        }
        function g(e) {
            var t,
                n;
            return n = e.target || e.srcElement, f(e) ? !0 : ("a" !== n.nodeName.toLowerCase() && (t = n.getElementsByTagName("a"), t && t.length && (n = n.getElementsByTagName("a")[0])), a.css.has(n, "sm2-volume-control") ? (p(n), a.events.add(document, "mousemove", b.adjustVolume), a.events.add(document, "mouseup", b.releaseVolume), b.adjustVolume(e)) : void 0)
        }
        function v(t) {
            var o,
                r,
                l,
                s,
                i,
                u,
                d;
            if (o = t || e.event, r = o.target || o.srcElement, r && r.nodeName) {
                if (s = r.nodeName.toLowerCase(), "a" !== s && r.parentNode) {
                    do r = r.parentNode, s = r.nodeName.toLowerCase();
                    while ("a" !== s && r.parentNode);
                    if (!r)
                        return !1
                }
                if ("a" === s && (u = r.href, soundManager.canPlayURL(u) ? a.css.has(r, n.excludeClass) || (c(r), d = !0) : (l = r.href.lastIndexOf("#"), -1 !== l && (i = r.href.substr(l + 1), i && b[i] && (d = !0, b[i](t)))), d))
                    return a.events.preventDefault(o)
            }
        }
        function h(e) {
            var t,
                n,
                o,
                r,
                l,
                s;
            return t = w.progressTrack, n = a.position.getOffX(t), o = t.offsetWidth, r = e.clientX - n, l = r / o, s = k, s && s.duration && (s.setPosition(s.duration * l), s._iO && s._iO.whileplaying && s._iO.whileplaying.apply(s)), e.preventDefault && e.preventDefault(), !1
        }
        function y(e) {
            return a.events.remove(document, "mousemove", h), a.css.remove(w.o, "grabbing"), a.events.remove(document, "mouseup", y), a.events.preventDefault(e), !1
        }
        function x() {
            t || console.warn("init(): No playerNode element?"), w.o = t, e.navigator.userAgent.match(/msie [678]/i) && a.css.add(w.o, T.legacy), e.navigator.userAgent.match(/mobile/i) && a.css.add(w.o, T.noVolume), w.progress = a.dom.get(w.o, ".sm2-progress-ball"), w.progressTrack = a.dom.get(w.o, ".sm2-progress-track"), w.progressBar = a.dom.get(w.o, ".sm2-progress-bar"), w.volume = a.dom.get(w.o, "a.sm2-volume-control"), w.volume && p(w.volume), w.duration = a.dom.get(w.o, ".sm2-inline-duration"), w.time = a.dom.get(w.o, ".sm2-inline-time"), M = new m, O = M.getItem(0), M.select(O), O && i(O), a.events.add(w.o, "mousedown", g), a.events.add(w.o, "click", v), a.events.add(w.progressTrack, "mousedown", function(e) {
                return f(e) ? !0 : (a.css.add(w.o, "grabbing"), a.events.add(document, "mousemove", h), a.events.add(document, "mouseup", y), h(e))
            })
        }
        var T,
            w,
            N,
            M,
            b,
            I,
            O,
            E,
            L,
            B,
            k = {};
        return T = {
            disabled: "disabled",
            selected: "selected",
            active: "active",
            legacy: "legacy",
            noVolume: "no-volume",
            playlistOpen: "playlist-open"
        }, w = {
            o: null,
            playlist: null,
            playlistTarget: null,
            playlistContainer: null,
            time: null,
            player: null,
            progress: null,
            progressTrack: null,
            progressBar: null,
            duration: null,
            volume: null
        }, N = {
            loadFailedCharacter: '<span title="Failed to load/play." class="load-error">✖</span>'
        }, I = {
            volume: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                backgroundSize: 0
            }
        }, b = {
            play: function(t) {
                var n,
                    a,
                    o;
                return void 0 === t || isNaN(t) ? (o = t, o && o.target && (n = o.target || o.srcElement, a = n.href), a && -1 === a.indexOf("#") || (a = w.playlist.getElementsByTagName("a")[0].href), Object.keys(k).length || (k = d(a)), k.playState || r(), k.togglePause(), void (k.paused && M.data.timer && (e.clearTimeout(M.data.timer), M.data.timer = null))) : M.playItemByOffset(t)
            },
            pause: function() {
                k && k.readyState && k.pause()
            },
            resume: function() {
                k && k.readyState && k.resume()
            },
            stop: function() {
                return b.pause()
            },
            next: function() {
                var t,
                    n;
                M.data.timer && (e.clearTimeout(M.data.timer), M.data.timer = null), n = M.data.selectedIndex, t = M.getNext(!0), t && M.data.selectedIndex !== n && c(t.getElementsByTagName("a")[0])
            },
            prev: function() {
                var e,
                    t;
                t = M.data.selectedIndex, e = M.getPrevious(), e && M.data.selectedIndex !== t && c(e.getElementsByTagName("a")[0])
            },
            shuffle: function(e) {
                var t = e ? e.target || e.srcElement : a.dom.get(w.o, ".shuffle");
                t && !a.css.has(t, T.disabled) && (a.css.toggle(t.parentNode, T.active), M.data.shuffleMode = !M.data.shuffleMode)
            },
            repeat: function(e) {
                var t = e ? e.target || e.srcElement : a.dom.get(w.o, ".repeat");
                t && !a.css.has(t, T.disabled) && (a.css.toggle(t.parentNode, T.active), M.data.loopMode = !M.data.loopMode)
            },
            menu: function(e) {
                var t;
                t = a.css.has(w.o, T.playlistOpen), !M || M.data.selectedIndex || L || (w.playlist.scrollTop = 0, L = !0), "boolean" == typeof e && e || (t || (w.playlistContainer.style.height = "0px"), t = a.css.toggle(w.o, T.playlistOpen)), w.playlistContainer.style.height = (t ? w.playlistContainer.scrollHeight : 0) + "px"
            },
            adjustVolume: function(t) {
                var n,
                    o,
                    r,
                    l,
                    s;
                return l = 0, r = w.volume, void 0 === t ? !1 : t && void 0 !== t.clientX ? (n = (100 - I.volume.backgroundSize) / 2, l = Math.max(0, Math.min(1, (t.clientX - I.volume.x) / I.volume.width)), r.style.clip = "rect(0px, " + I.volume.width * l + "px, " + I.volume.height + "px, " + I.volume.width * (n / 100) + "px)", o = n / 100 * I.volume.width, s = 100 * Math.max(0, Math.min(1, (t.clientX - I.volume.x - o) / (I.volume.width - 2 * o))), Object.keys(k).length && k.setVolume(s), E = s, a.events.preventDefault(t)) : (arguments.length && e.console && e.console.warn && console.warn("Bar UI: call setVolume(" + t + ") instead of adjustVolume(" + t + ")."), b.setVolume.apply(this, arguments))
            },
            releaseVolume: function() {
                a.events.remove(document, "mousemove", b.adjustVolume), a.events.remove(document, "mouseup", b.releaseVolume)
            },
            setVolume: function(e) {
                var t,
                    n,
                    a,
                    o,
                    r,
                    l;
                void 0 === e || isNaN(e) || (w.volume && (o = w.volume, t = I.volume.backgroundSize, n = (100 - t) / 2, a = I.volume.width * (n / 100), r = a, l = r + (I.volume.width - 2 * a) * (e / 100), o.style.clip = "rect(0px, " + l + "px, " + I.volume.height + "px, " + r + "px)"), k && k.setVolume(e), E = e)
            }
        }, x(), B = {
            on: null,
            actions: b,
            initSoundObject: u,
            dom: w,
            playlistController: M
        }
    }, a = {
        array: function() {
            function e(e) {
                var t;
                return function(n, a) {
                    return t = n[e] < a[e] ? -1 : n[e] > a[e] ? 1 : 0
                }
            }
            function t(e) {
                var t,
                    n,
                    a;
                for (t = e.length - 1; t > 0; t--)
                    n = Math.floor(Math.random() * (t + 1)), a = e[t], e[t] = e[n], e[n] = a;
                return e
            }
            return {
                compare: e,
                shuffle: t
            }
        }(),
        css: function() {
            function e(e, t) {
                return void 0 !== e.className ? new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className) : !1
            }
            function t(t, n) {
                return t && n && !e(t, n) ? void (t.className = (t.className ? t.className + " " : "") + n) : !1
            }
            function n(t, n) {
                return t && n && e(t, n) ? void (t.className = t.className.replace(new RegExp("( " + n + ")|(" + n + ")", "g"), "")) : !1
            }
            function a(e, a, o) {
                var r = {
                    className: e.className
                };
                n(r, a), t(r, o), e.className = r.className
            }
            function o(a, o) {
                var r,
                    l;
                return r = e(a, o), l = r ? n : t, l(a, o), !r
            }
            return {
                has: e,
                add: t,
                remove: n,
                swap: a,
                toggle: o
            }
        }(),
        dom: function() {
            function e(e, t) {
                var n,
                    a,
                    o;
                return 1 === arguments.length ? (n = document.documentElement, a = e) : (n = e, a = t), n && n.querySelectorAll && (o = n.querySelectorAll(a)), o
            }
            function t() {
                var t = e.apply(this, arguments);
                return t && t.length ? t[t.length - 1] : t && 0 === t.length ? null : t
            }
            function n(e, t, n) {
                if (!t || !e)
                    return t;
                if (e = e.toUpperCase(), n && t && t.nodeName === e)
                    return t;
                for (; t && t.nodeName !== e && t.parentNode;)
                    t = t.parentNode;
                return t && t.nodeName === e ? t : null
            }
            return {
                ancestor: n,
                get: t,
                getAll: e
            }
        }(),
        position: function() {
            function e(e) {
                var t = 0;
                if (e.offsetParent)
                    for (; e.offsetParent;)
                        t += e.offsetLeft, e = e.offsetParent;
                else
                    e.x && (t += e.x);
                return t
            }
            function t(e) {
                var t = 0;
                if (e.offsetParent)
                    for (; e.offsetParent;)
                        t += e.offsetTop, e = e.offsetParent;
                else
                    e.y && (t += e.y);
                return t
            }
            return {
                getOffX: e,
                getOffY: t
            }
        }(),
        style: function() {
            function t(t, n) {
                var a;
                return t.currentStyle ? a = t.currentStyle[n] : e.getComputedStyle && (a = document.defaultView.getComputedStyle(t, null).getPropertyValue(n)), a
            }
            return {
                get: t
            }
        }(),
        events: function() {
            var t,
                n,
                a;
            return t = function(t, a, o) {
                var r = {
                    detach: function() {
                        return n(t, a, o)
                    }
                };
                return e.addEventListener ? t.addEventListener(a, o, !1) : t.attachEvent("on" + a, o), r
            }, n = void 0 !== e.removeEventListener ? function(e, t, n) {
                return e.removeEventListener(t, n, !1)
            } : function(e, t, n) {
                return e.detachEvent("on" + t, n)
            }, a = function(e) {
                return e.preventDefault ? e.preventDefault() : (e.returnValue = !1, e.cancelBubble = !0), !1
            }, {
                add: t,
                preventDefault: a,
                remove: n
            }
        }(),
        features: function() {
            function t(e) {
                var t = i.style[e];
                return void 0 !== t ? e : null
            }
            function n(e) {
                try {
                    i.style[u] = e
                } catch (t) {
                    return !1
                }
                return !!i.style[u]
            }
            var a,
                o,
                r,
                l,
                s,
                i,
                u;
            return i = document.createElement("div"), o = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || null, a = o ? function() {
                return o.apply(e, arguments)
            } : null, r = {
                transform: {
                    ie: t("-ms-transform"),
                    moz: t("MozTransform"),
                    opera: t("OTransform"),
                    webkit: t("webkitTransform"),
                    w3: t("transform"),
                    prop: null
                },
                rotate: {
                    has3D: !1,
                    prop: null
                },
                getAnimationFrame: a
            }, r.transform.prop = r.transform.w3 || r.transform.moz || r.transform.webkit || r.transform.ie || r.transform.opera, r.transform.prop && (u = r.transform.prop, s = {
                css_2d: "rotate(0deg)",
                css_3d: "rotate3d(0,0,0,0deg)"
            }, n(s.css_3d) ? (r.rotate.has3D = !0, l = "rotate3d") : n(s.css_2d) && (l = "rotate"), r.rotate.prop = l), i = null, r
        }()
    }, e.sm2BarPlayers = o, e.sm2BarPlayerOptions = n, e.SM2BarPlayer = t
}(window);


