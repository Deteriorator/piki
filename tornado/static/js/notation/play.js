function MIDIPlay() {
    this.init()
}
function shouldUseMidiJs() {
    return window.navigator.userAgent.match(/android|iphone|ipod|ipad/i) ? !1 : window.navigator.userAgent.match(/chrome/i) ? !0 : window.navigator.userAgent.match(/safari/i) ? !1 : !0
}
function isMidiAudioLoaded() {
    return "undefined" == typeof MidiAudio ? !1 : MidiAudio.loaded
}
function midiNoteOn(t, o, i) {
    isMidiAudioLoaded() ? MidiAudio.playNote(t, o, i) : shouldUseMidiJs() ? MIDI.noteOn(0, t, i, 0) : "undefined" != typeof NativeAPI && NativeAPI.noteOn(0, t, i, 0)
}
function midiNoteOff(t, o) {
    isMidiAudioLoaded() || (shouldUseMidiJs() ? MIDI.noteOff(0, t, o) : "undefined" != typeof NativeAPI && setTimeout(function() {
        NativeAPI.noteOff(0, t, 0)
    }, 1e3 * o))
}
var SPEED = .6,
    isScrolling = !1,
    noteScrollTop = 0;
MIDIPlay.prototype.debugLog = function() {}, MIDIPlay.prototype.init = function(t) {
    this.playTime = 0, this.isLoaded = !1, this.timeouts = [], this.BPM = 100, this.resetNotes(t)
}, MIDIPlay.prototype.setSpeed = function(t) {
    SPEED = .6 * this.BPM / t
}, MIDIPlay.prototype.getSpeed = function() {
    return 100 * SPEED / this.BPM
}, MIDIPlay.prototype.resetNotes = function(t) {
    this.notes = [], this.preHandleNotes(t), this.notes = this.notes.sort(function(t, o) {
        return t.time - o.time
    })
}, MIDIPlay.prototype.preHandleNotes = function(t, o, i) {
    t = t || [], o = o || 0, i = i || 0;
    for (var e, n = 0; n < t.length; n++)
        e = t[n], e.midiDuration ? (e.time = o, e.part = i, this.notes.push(e), e.chord && this.preHandleNotes(e.chord, o, "chord"), "chord" != i && (o += e.midiDuration)) : e.notes && this.preHandleNotes(e.notes, o, e.id)
}, MIDIPlay.prototype.playFromLineColumn = function(t, o) {
    this.debugLog("playFromLineColumn", t, o);
    for (var i, e = 0; e < this.notes.length; e++)
        if (i = this.notes[e], this.debugLog("noteLineColumn", i.first_line, i.first_column), i.first_line >= t && i.first_column >= o) {
            this.playTime = i.time;
            break
        }
    this.pause(), this.resume()
}, MIDIPlay.prototype.playFromId = function() {
    for (var t = 0; t < this.notes.length; t++)
        if (this.notes[t].id == noteId) {
            this.playTime = this.notes[t].time;
            break
        }
    this.pause(), this.resume()
}, MIDIPlay.prototype.play = function() {
    this.stop(), this.resume()
}, MIDIPlay.prototype.stop = function() {
    this.playTime = 0, this.pause()
}, MIDIPlay.prototype.isFinished = function() {
    return this.playTime > this.notes[this.notes.length - 1].time
}, MIDIPlay.prototype.pause = function() {
    for (var t = 0; t < this.timeouts.length; t++)
        clearTimeout(this.timeouts[t])
}, MIDIPlay.prototype.resume = function() {
    this.timeouts = [];
    for (var t, o = 0; o < this.notes.length; o++)
        t = this.notes[o], t.time < this.playTime || this.timeouts.push(this.playNote(t, (t.time - this.playTime + 1) * SPEED))
}, MIDIPlay.prototype.playNote = function(t, o) {
    function i(o, i) {
        var d = new Date,
            r = t.id;
        if (d.getTime() - o > i + 100)
            return a.debugLog("timeout, maybe tab inactive!!!!"), void stop();
        if (t.scale > 0 && (midiNoteOn(e, n * SPEED, 100), midiNoteOff(e, n * SPEED)), $("#" + r).length > 0 && !t.part) {
            $("#" + r).attr("class", "active"), setTimeout(function() {
                $("#" + r).attr("class", "")
            }, n * SPEED * 1e3);
            var u = $("body").scrollTop(),
                l = $("#" + r).offset().top;
            !isScrolling && Math.abs(l - noteScrollTop) > 20 && (isScrolling = !0, $("body").animate({
                scrollTop: u + $("#" + r).offset().top - $("body").scrollTop() - s / 2 + 100
            }, 1e3, function() {
                isScrolling = !1, noteScrollTop = l
            }))
        }
        this.playTime = t.time + t.midiDuration, a.isFinished() && ($(document).trigger("playFinished"), a.debugLog("playFinished")), a.debugLog("Play: ", t.scale, t.time, this.playTime)
    }
    var e = t.midiNumber,
        n = t.midiDuration,
        s = $(window).height(),
        d = new Date,
        a = this;
    return setTimeout(i.bind(a, d.getTime(), 1e3 * o), 1e3 * o)
}, MIDIPlay.prototype.load = function(t) {
    var o = this;
    if (shouldUseMidiJs()) {
        var i = window.localStorage;
        i && null != i.getItem("soundfont_url") ? soundfontUrl = i.getItem("soundfont_url") : window.location.protocol.match("https") ? soundfontUrl = "/static/soundfont/" : (soundfontUrl = "/static/js/notation/", Math.random() < 0 && (soundfontUrl = "http://cdn.happi123.com/"));
        var e = "acoustic_grand_piano";
        MIDI.loadPlugin({
            soundfontUrl: soundfontUrl,
            instrument: e,
            onprogress: function(t, i) {
                o.debugLog(t, i)
            },
            onsuccess: function() {
                o.debugLog("MIDI loaded"), i && i.setItem("soundfont_url", soundfontUrl), MIDI.setInstrument(0, MIDI.GM.byName[e].number, 0), o.isLoaded = !0, t()
            }
        })
    } else if ("undefined" != typeof MidiAudio && MidiAudio.context) {
        var n = window.navigator.userAgent.match(/android/i) ? "ogg" : "mp3";
        soundfontUrl = window.location.protocol.match("https") ? "/static/soundfont/acoustic_grand_piano-" + n + ".js" : "http://h.happi123.com:5005/soundfont/acoustic_grand_piano-" + n + ".js", MidiAudio.init({
            soundfontUrl: soundfontUrl,
            onsuccess: function() {
                o.isLoaded = !0, t()
            },
            onerror: function() {
                o.isLoaded = !0, t(), o.debugLog("MidiAudio init failed")
            }
        })
    } else
        "undefined" != typeof NativeAPI && "undefined" != typeof NativeAPI.loadSoundfont && NativeAPI.loadSoundfont(), o.isLoaded = !0, t()
};


