var AudioContext = window.AudioContext || window.webkitAudioContext,
    MidiAudio = {
        context: AudioContext ? new AudioContext : null,
        keyToNote: {},
        noteToKey: {},
        noteBuffer: {},
        loaded: !1,
        soundfont: {}
    };
MidiAudio.hasSoundfont = function() {
    return "C4" in MidiAudio.soundfont ? !0 : "object" == typeof MIDI && "object" == typeof MIDI.Soundfont && "object" == typeof MIDI.Soundfont.acoustic_grand_piano ? (MidiAudio.soundfont = MIDI.Soundfont.acoustic_grand_piano, !0) : !1
}, MidiAudio.init = function(conf) {
    if (!MidiAudio.context)
        return void (conf.onerror && conf.onerror("WebAudio not support"));
    if (!MidiAudio.hasSoundfont()) {
        var xhr = new XMLHttpRequest;
        return xhr.onreadystatechange = function(event) {
            if (4 == xhr.readyState) {
                if (xhr.status >= 200 && xhr.status < 300)
                    return MidiAudio.soundfont = eval(xhr.responseText), MidiAudio.hasSoundfont() ? (MidiAudio.init(conf), void MidiAudio.debug("GET " + conf.soundfontUrl + " success")) : void (conf.onerror && conf.onerror("load sound font failed"));
                conf.onerror && conf.onerror(xhr.status + " error")
            }
        }, conf.onprogress && (xhr.onprogress = conf.onprogress), MidiAudio.debug("GET " + conf.soundfontUrl), xhr.open("GET", conf.soundfontUrl, !0), void xhr.send(null)
    }
    for (var A0 = 21, C8 = 108, number2key = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], n = A0; C8 >= n; n++) {
        var octave = (n - 12) / 12 >> 0,
            name = number2key[n % 12] + octave;
        MidiAudio.keyToNote[name] = n, MidiAudio.noteToKey[n] = name;
        var base64 = MidiAudio.soundfont[name].split(",")[1],
            buffer = Base64Binary.decodeArrayBuffer(base64);
        MidiAudio.context.decodeAudioData(buffer, function(o) {
            MidiAudio.noteBuffer[this] = o
        }.bind(n), function(o) {
            MidiAudio.debug("MidiAudio.init " + name + " load failed: " + o)
        })
    }
    MidiAudio.loaded = !0, MidiAudio.debug("MidiAudio.init success"), conf.onsuccess && conf.onsuccess()
}, MidiAudio.playNote = function(o, i, n) {
    var e = MidiAudio.context.createBufferSource();
    e.buffer = MidiAudio.noteBuffer[o];
    var t = MidiAudio.context.createGain(),
        d = 1,
        u = (n || 100) / 100 * d * 2 - 1;
    if (t.gain.value = Math.max(-1, u), t.connect(MidiAudio.context.destination), e.connect(t), MidiAudio.playSound(e, 0), i) {
        var r = .1 * i;
        t.gain.setTargetAtTime(0, MidiAudio.context.currentTime + i - r, Math.max(r, .01)), MidiAudio.stopSound(e, i + .1)
    }
}, MidiAudio.playSound = function(o, i) {
    o && (o.start ? o.start(i) : o.play ? o.play(i) : o.noteOn && o.noteOn(i))
}, MidiAudio.stopSound = function(o, i) {
    i ? setTimeout(function() {
        MidiAudio.stopSoundNow(o)
    }, 1e3 * i) : MidiAudio.stopSoundNow(o)
}, MidiAudio.stopSoundNow = function(o) {
    o.stop ? o.stop(0) : o.noteOff && o.noteOff(0)
}, MidiAudio.makeTickBuffer = function(o, i) {
    for (var n = this.context.sampleRate, e = .1 * n, t = this.context.createBuffer(1, e, n), d = t.getChannelData(0), u = 2 * Math.PI / n * o, r = 100 / n, a = 200 / n, f = 500 / n, c = 0; e > c; c++)
        d[c] = i * (.09 * Math.exp(-c * r) * Math.sin(u * c) + .34 * Math.exp(-c * a) * Math.sin(2 * u * c) + .57 * Math.exp(-c * f) * Math.sin(6 * u * c));
    return t
}, MidiAudio.tick = function(o, i, n) {
    if (MidiAudio.context) {
        var e = MidiAudio.context.createGain();
        e.connect(MidiAudio.context.destination), e.gain.value = "undefined" == typeof o ? 1 : o, source = MidiAudio.context.createBufferSource(), source.buffer = MidiAudio.makeTickBuffer(i || 440, n || .7), source.connect(e), MidiAudio.playSound(source, 0)
    }
}, MidiAudio.debug = function(o) {
    console.log(o)
};


