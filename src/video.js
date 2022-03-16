import adapter from 'webrtc-adapter';

var options = {
    controls: true,
    width: 800,
    height: 450,
    fluid: false,
    controlBar: {
        volumePanel: false,
        fullscreenToggle: false
    },
    plugins: {
        record: {
            audio: true,
            screen: true,
            debug: true,
            maxLength: 20000,
        }
    }
};

/* eslint-disable */
/* workaround browser issues */

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isEdge = /Edge/.test(navigator.userAgent);
var isOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;

if (typeof MediaRecorder === 'undefined') {
}

function applyAudioWorkaround() {
    if (isSafari || isEdge) {
        if (isSafari && window.MediaRecorder !== undefined) {
            // this version of Safari has MediaRecorder
            return;
        }

        // support recording in safari 11/12
        // see https://github.com/collab-project/videojs-record/issues/295
        options.plugins.record.audioRecorderType = StereoAudioRecorder;
        options.plugins.record.audioSampleRate = 44100;
        options.plugins.record.audioBufferSize = 4096;
        options.plugins.record.audioChannels = 2;

        console.log('applied audio workarounds for this browser');
    }
}

function applyVideoWorkaround() {
    // use correct video mimetype for opera
    if (isOpera) {
        options.plugins.record.videoMimeType = 'video/webm\;codecs=vp8'; // or vp9
    }
}

function applyScreenWorkaround() {
    // Polyfill in Firefox.
    // See https://blog.mozilla.org/webrtc/getdisplaymedia-now-available-in-adapter-js/
    if (adapter.browserDetails.browser == 'firefox') {
        adapter.browserShim.shimGetDisplayMedia(window, 'screen');
    }
}


// apply some workarounds for opera browser
applyVideoWorkaround();
applyScreenWorkaround();

var player = videojs('myScreenAudio', options, function() {
    // print version information at startup
    var msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
    log(msg);
});

// error handling
player.on('deviceError', function() {
    console.log('device error:', player.deviceErrorCode);
});

player.on('error', function(element, error) {
    console.error(error);
});

// user clicked the record button and started recording
player.on('startRecord', function() {
    console.log('started recording!');
});

// user completed recording and stream is available
player.on('finishRecord', function() {
    // the blob object contains the recorded data that
    // can be downloaded by the user, stored on server etc.
    player.record().saveAs({'video': '.mp4'});
    console.log('screen+audio capture ready: ', player.recordedData);
});
