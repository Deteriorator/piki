function hasViewPermission(e, t) {
    var e = globalData.song_uuid,
        t = globalData.song_name,
        a = JSON.parse(storageRead("songs") || "[]");
    if (a.length >= 5 && !globalData.is_vip) {
        for (var n = !1, o = 0, s = a.length; s > o; o++)
            if (e == a[o].song_uuid) {
                n = !0;
                break
            }
        if (!n)
            return !1
    }
    return historySong(e, t), !0
}
function toggleMenu() {
    var e = $(".aside").hasClass("show");
    e ? $(".aside-bg, .aside").removeClass("show") : $(".aside-bg, .aside").addClass("show")
}
$(function() {
    function e() {
        $(".aside-bg, .aside").addClass("show")
    }
    function t() {
        $(".aside-bg, .aside").removeClass("show")
    }
    function a(e) {
        for (var t = "", a = 0; a < e.length; a++)
            t += "<a href='/jianpu/" + e[a].song_uuid + ".html' data-id='" + e[a].song_uuid + "'>" + e[a].song_name + "</a>";
        $(".search-results").html(t)
    }
    function n() {
        var e = $("#search").val();
        $.ajax({
            url: "/song.php?action=search",
            type: "POST",
            dataType: "JSON",
            data: {
                keyword: e
            },
            success: function(t) {
                if (0 == t.errCode && t.result.length > 0) {
                    var a = t.result[0].song_uuid;
                    location.href = "/jianpu/" + a + ".html"
                } else
                    $("#d-name").val(e), $("#searchfeed").openModal()
            },
            error: function() {
                alert("访问错误！")
            }
        })
    }
    function o() {
        if (C) {
            var e = JSON.parse(C);
            if (e.length)
                return !0
        }
        var t = $(".song-comment").html();
        return t && t.indexOf("<!--music_player-->") >= 0 ? !0 : !1
    }
    function s() {
        $that = $(".play-btn"), l(function() {
            S ? T ? ($that.find("i").removeClass("icon-pause").addClass("icon-play2"), $that.find("span").text("继续")) : ($that.find("i").removeClass("icon-play2").addClass("icon-pause"), $that.find("span").text("暂停")) : ($that.find("i").removeClass("icon-pause").addClass("icon-play2"), $that.find("span").text("播放"))
        })
    }
    function i(e) {
        "function" == typeof e && e()
    }
    function r(e, t) {
        $("body").animate({
            scrollTop: e || 0
        }, 500, function() {
            i(t)
        })
    }
    function l(e) {
        if (S)
            if (T) {
                var t = 0;
                noteScrollTop && (t = noteScrollTop - P / 2 + 100), r(t, function() {
                    T = !1, m.midi.resume(), i(e)
                })
            } else
                m.midi.pause(), T = !0, i(e);
        else
            r(0, function() {
                c(e)
            })
    }
    function c(e) {
        m.midi.isLoaded ? d(function() {
            T = !1, S = !0, m.midi.play(), i(e)
        }) : ($(".loading").show(), m.midi.load(function() {
            $(".loading").hide(), d(function() {
                T = !1, S = !0, m.midi.play(), i(e)
            })
        }))
    }
    function d(e) {
        var t = $(".count-down-area"),
            a = t.find("p");
        a.text("4"), t.show(), MidiAudio.tick(), M = setInterval(function() {
            var n = a.text() - 1;
            0 == n ? (t.hide(), clearInterval(M), e()) : (a.text(n), MidiAudio.tick())
        }, 1e3 * m.midi.getSpeed())
    }
    if (!hasViewPermission())
        return void (window.location = "/web/user.php?action=vip");
    var u = template("song/svg", {});
    $(".refs").html(u), u = template("song", globalData), $(".refs").after(u), $(".collapsible").collapsible(), initMetronome(globalData.time_signature, m.midi.BPM), $(".shang-btn").click(function() {
        $("#shang").openModal(), $("ul.tabs").tabs()
    });
    var p = storageRead("view_song_count");
    p = p ? parseInt(p) + 1 : 1, storageWrite("view_song_count", p), storageRead("instrument") || ($("#select_instrument").openModal(), $("#select_instrument-btn").on("click", function() {
        var e = $('input[name="which_instrument"]:checked').val();
        storageWrite("instrument", e), m.resetVal(e, "instrument"), debounce(m.redraw)()
    })), renderRadio = isMobile() ? .75 : 1.1, reCalcParams();
    var h,
        f,
        g = {
            song_name: "sn",
            alias_name: "an",
            music_composer: "mc",
            lyric_composer: "lc",
            keynote: "kn",
            rhythm: "rt",
            notation: "nt",
            lyric: "ly"
        };
    for (h in g)
        f = "data-" + g[h], m.resetVal($(".info").attr(f), h);
    $(".search-icon").on("click", function() {
        var e = $(".search").css("display");
        $(".search").css("display", "none" == e ? "block" : "none")
    }), $(window).on("resize", function() {
        debounce(function() {
            m.redraw()
        }, 1e3)()
    }), $("#menu-icon").on("click", function(t) {
        t.stopPropagation(), e()
    }), "1" == storageRead("use_c_note") && (m.setCNote("1"), $(".togglecnote-btn").find("span").html("取消C调指法")), "0" === storageRead("showInstruLogo") && (m.toggleInstru(), $(".toggleinstru-btn").find("i").removeClass("icon-eye").addClass("icon-eye-blocked").next("span").html("显示图谱")), "0" === storageRead("showLyric") && (m.toggleLyric(), $(".togglelyric-btn").find("i").removeClass("icon-eye").addClass("icon-eye-blocked").next("span").html("显示歌词")), $(".togglecnote-btn").on("click", function() {
        var e = storageRead("use_c_note");
        e ? ($(this).find("span").html("转成C调指法"), storageWrite("use_c_note", ""), m.setCNote("")) : ($(this).find("span").html("取消C调指法"), storageWrite("use_c_note", "1"), m.setCNote("1")), debounce(m.redraw)()
    }), $(".toggleinstru-btn").on("click", function() {
        var e = storageRead("showInstruLogo");
        "0" !== e ? ($(this).find("i").removeClass("icon-eye").addClass("icon-eye-blocked").next("span").html("显示图谱"), storageWrite("showInstruLogo", "0")) : ($(this).find("i").removeClass("icon-eye-blocked").addClass("icon-eye").next("span").html("隐藏图谱"), storageWrite("showInstruLogo", "1")), m.toggleInstru(), debounce(m.redraw)()
    }), $(".togglelyric-btn").on("click", function() {
        var e = storageRead("showLyric");
        "0" !== e ? ($(this).find("i").removeClass("icon-eye").addClass("icon-eye-blocked").next("span").html("显示歌词"), storageWrite("showLyric", "0")) : ($(this).find("i").removeClass("icon-eye-blocked").addClass("icon-eye").next("span").html("隐藏歌词"), storageWrite("showLyric", "1")), m.toggleLyric(), debounce(m.redraw)()
    }), $(document).on("click", function(t) {
        t.stopPropagation();
        var a = t.pageY,
            n = $("#box").offset().top + $("#box").outerHeight();
        !$(".aside").hasClass("show") && t.pageX < 100 && n >= a && e()
    }), $(document).on("mousemove", function(a) {
        if (!$(a.target).is(".material-icons")) {
            var n = a.pageX,
                o = a.pageY,
                s = $("#box").offset().top + $("#box").outerHeight();
            n > 0 && 40 > n && s >= o && !$(".aside").hasClass("show") ? e() : n > 240 * ((parseInt(storageRead("screenRatio"), 10) || 100) / 100) && $(".aside").hasClass("show") && 0 == $("#search:focus").length && t()
        }
    }), $(".aside-bg").on("click", function(e) {
        e.target == e.currentTarget && t()
    });
    var v = storageRead("screenRatio");
    v && ($("#viewRatio").val(v), document.documentElement.style.zoom = v + "%");
    var b = {
            o6: "六孔陶笛",
            o12: "十二孔陶笛",
            o3: "三管陶笛",
            x8: "八孔埙",
            x10: "十孔埙",
            none: "纯简谱"
        },
        w = storageRead("instrument") || "o12";
    $(".instru-name").attr("data-type", w).text(b[w]), m.resetVal && m.resetVal(w, "instrument"), m.redraw(), $(".instru-list li").on("click", function(e) {
        e.stopPropagation();
        var t = $(this).attr("data-type"),
            a = $(this).text();
        $(".instru-name").attr("data-type", t).text(a), storageWrite("instrument", t), m.resetVal(t, "instrument"), $(".instrument .collapsible-header").click(), debounce(m.redraw)()
    });
    var y = JSON.parse(storageRead("songs") || "[]");
    a(y), $("#search").on("focus blur input", function(e) {
        if ("focus" == e.type)
            $(".search-results").addClass("show");
        else if ("blur" == e.type)
            setTimeout(function() {
                $(".search-results").removeClass("show")
            }, 300);
        else if ("input" == e.type) {
            var t = $.trim($("#search").val());
            t ? _.debounce(function() {
                var e = "/song.php?action=search";
                $.ajax({
                    url: e,
                    type: "POST",
                    dataType: "JSON",
                    data: {
                        keyword: t
                    },
                    success: function(e) {
                        0 == e.errCode && e.result.length > 0 ? a(e.result) : $(".search-results").html("<a class='no-result' href='javascript:void(0)'>没有匹配的结果</a>")
                    },
                    error: function() {
                        $(".search-results").html("<a class='no-result' href='javascript:void(0)'>访问出错</a>")
                    }
                })
            }, 500)() : a(y)
        }
    }), $(document).on("keydown", function(e) {
        var t = e.keyCode || e.which;
        if ($(".search-results").hasClass("show")) {
            if (13 === t) {
                if ($(".search-results .cur").length > 0) {
                    var a = $(".search-results .cur").attr("data-id");
                    location.href = "/jianpu/" + a + ".html"
                } else
                    n();
                return !1
            }
            var o,
                s = $(".search-results a").length,
                i = $(".search-results .cur").length > 0 ? $(".search-results .cur").index() : -1;
            $(".search-results .cur").removeClass("cur"), 40 === t || 9 === t ? (e.preventDefault(), o = -1 == i ? 0 : i + 1 >= s ? 0 : i + 1, $(".search-results a").eq(o).addClass("cur")) : 38 === t && (e.preventDefault(), o = -1 == i ? s - 1 : 0 === i ? s - 1 : i - 1, $(".search-results a").eq(o).addClass("cur"))
        }
    }), $(".search-wrapper .material-icons").on("click", n), $(".star-btn").on("click", function() {
        var e = $(this);
        $.ajax(e.find(".unstar").length ? {
            url: "/web/user.php?action=add_favorite_song",
            type: "POST",
            dataType: "json",
            data: {
                song_uuid: e.data("sid")
            },
            success: function() {
                e.find(".unstar").removeClass("unstar").addClass("starred").next("span").html("已收藏")
            },
            error: function() {
                alert("收藏失败")
            }
        } : {
            url: "/web/user.php?action=delete_favorite_song",
            type: "POST",
            dataType: "json",
            data: {
                song_uuid: e.data("sid")
            },
            success: function() {
                e.find(".starred").removeClass("starred").addClass("unstar").next("span").html("添加收藏")
            },
            error: function() {
                alert("收藏失败")
            }
        })
    }), $("#viewRatio").on("change", function() {
        var e = $(this);
        debounce(function() {
            document.documentElement.style.zoom = e.val() + "%", storageWrite("screenRatio", e.val()), m.redraw()
        })()
    }), $(".modal-trigger").leanModal();
    var C = $(".accompanies").attr("data-songs");
    if (C) {
        var k = JSON.parse(C);
        if (k.length) {
            var u = template("player", {
                sound_list: k
            });
            $(".accompanies").html(u), soundManager.setup({
                url: "/static/swf",
                onready: function() {
                    /*
                    for (var e = window.sm2BarPlayers[0].initSoundObject(k[0].url), t = 0, a = 0; a < m.measures.length; a++)
                        "lrc_time" == m.measures[a].type && e.onPosition(1e3 * m.measures[a].time, function() {
                            t++, $("g.active").attr("class", "");
                            var e = $('g[data-line="' + t + '"]');
                            e.attr("class", "active"), $("body").stop().animate({
                                scrollTop: $(e[0]).offset().top - $(window).height() / 2 + 100
                            }, 1e3)
                        })
                        */
                }
            })
        }
    }
    if (o() && $(".tomusic-btn").addClass("show"), m.fingerings) {
        for (var u = "可用指法：<ul>", x = m.fingerings, R = 0; R < x.length; R++)
            u += '<li data-val="' + x[R].value + '">' + x[R].name + "</li>";
        u += "</ul>", $(".availableFins").html(u)
    }
    $(".availableFins").on("click", function(e) {
        var t = $(e.target);
        if (t.is("li")) {
            var a = t.attr("data-val");
            $(".togglecnote-btn").find("span").html("转成C调指法"), storageWrite("use_c_note", ""), m.setCNote(""), m.resetVal(a, "curfingering"), debounce(m.redraw)()
        }
    }), $(".tomusic-btn").on("click", function(e) {
        e.stopPropagation(), $("body").animate({
            scrollTop: $(".accompanies").offset().top - 200
        })
    });
    var P = $(window).height();
    $(window).on("scroll", function() {
        var e = $("body").scrollTop();
        e > 0 ? $(".backtotop-btn").show() : $(".backtotop-btn").hide();
        var t = $(".accompanies").offset().top || $(".song-comment").offset().top;
        o() && (t >= e && e + P >= t ? $(".tomusic-btn").removeClass("show") : $(".tomusic-btn").addClass("show"))
    }), $(".backtotop-btn").on("click", function() {
        r()
    });
    var S = !1,
        T = !1;
    $("#play_speed").val(m.midi.BPM), $(".play-btn").on("click", function(e) {
        e.stopPropagation(), S ? s() : $("#start_play").openModal()
    }), $(".op-replay").on("click", function() {
        m.midi.setSpeed($("#play_speed").val()), s()
    }), $(".stop-btn").on("click", function(e) {
        e.stopPropagation(), S = !1, m.midi.stop(), $(".play-btn").find("i").removeClass("icon-pause").addClass("icon-play2"), $(".play-btn").find("span").text("播放")
    }), $(document).on("playFinished", function() {
        noteScrollTop = 0, S = !1, T = !1, $(".play-btn").find("i").removeClass("icon-pause").addClass("icon-play2"), $(".play-btn").find("span").text("播放")
    });
    var M;
    $(".count-down-area").on("click", function() {
        M && ($(this).hide(), clearInterval(M))
    }), $(".availableFins, .accompanies, .song-comment, .ds-thread").css({
        width: $("#box").width(),
        "margin-left": "auto",
        "margin-right": "auto"
    }), document.oncontextmenu = function() {
        return !1
    }, $("body").append('<div class="print-hint"><h3>温馨提醒：</h3><ul><li>为了防止谱子被盗用，快乐123不提供谱子打印和下载。</li><li>我们会经常添加一些新谱子。</li><li>谱子有错误，我们会及时修正。</li><li>我们网站会持续优化，会不断有新的功能。</li><li>所以，我们提倡大家来快乐123看谱、交流。</li></ul></div>'), $(".player-163").each(function(e, t) {
        var a = $(t),
            n = {
                id: a.attr("data-id"),
                width: a.attr("data-width")
            },
            o = template("player_163", n);
        a.html(o)
    })
});


