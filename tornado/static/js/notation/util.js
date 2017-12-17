function isMobile() {
    var e = navigator.userAgent.toLowerCase(),
        t = "ipad" == e.match(/ipad/i),
        n = "iphone os" == e.match(/iphone os/i),
        i = "midp" == e.match(/midp/i),
        o = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i),
        a = "ucweb" == e.match(/ucweb/i),
        r = "android" == e.match(/android/i),
        s = "windows ce" == e.match(/windows ce/i),
        u = "windows mobile" == e.match(/windows mobile/i),
        c = "webview" == e.match(/webview/i);
    return t || n || i || o || a || r || s || u || c
}
function isEdge() {
    var e = navigator.userAgent.toLowerCase();
    return /edge\//.test(e)
}
function debounce(e, t, n) {
    return void 0 === t && (t = 400), void 0 === n && (n = m), _.throttle(e, t).bind(n)
}
function chineseToEnglish(e) {
    for (var t = ["丨", "｜", "【", "】", "`", "“", "”", "‘", "’", "。", "，", "；", "：", "？", "！", "……", "—", "～", "（", "）", "《", "》"], n = ["|", "|", "[", "]", "'", '"', '"', "'", "'", ".", ",", ";", ":", "?", "!", "…", "-", "~", "(", ")", "<", ">"], i = 0; i < t.length; i++) {
        var o = new RegExp(t[i], "g");
        e = e.replace(o, n[i])
    }
    return e
}
function storageRead(e) {
    var t = window.localStorage,
        n = window.Cookie;
    return null != t.getItem(e) ? t.getItem(e) : n && null != n.read(e) ? n.read(e) : void 0
}
function storageWrite(e, t) {
    var n = window.localStorage,
        i = window.Cookie;
    n ? n.setItem(e, t) : i && i.write(e, t)
}
function notice(e, t, n) {
    var i = "notice:" + e,
        o = storageRead(i);
    o || (o = 0), storageWrite(i, ++o), n || (n = 10), n > o && Materialize.toast(e, t)
}
function getSongDetailPageUrl(e) {
    return "/jianpu/" + e + ".html"
}
function getSongEditPageUrl(e) {
    return "/admin/song.php?song_uuid=" + e
}
function getUrlParam(e) {
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
        n = document.location.search.substr(1).match(t);
    return null != n ? unescape(n[2]) : null
}
function historySong(e, t) {
    for (var n = JSON.parse(storageRead("songs") || "[]"), i = !0, o = 0, a = n.length; a > o; o++)
        if (e == n[o].song_uuid) {
            n.splice(o, 1), i = !1;
            break
        }
    return n.unshift({
        song_uuid: e,
        song_name: t
    }), n.length > 10 && (n = n.splice(0, 10)), storageWrite("songs", JSON.stringify(n)), i
}
function request(e) {
    $.ajax({
        url: e.url,
        type: "POST",
        dataType: "JSON",
        data: e.data,
        success: e.successCallBack || function() {},
        error: e.failCallBack || function(e) {
            alert(e.errMsg)
        }
    })
}


