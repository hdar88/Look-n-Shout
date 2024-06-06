let recognition;
let diagnostic = document.createElement('div');
document.body.appendChild(diagnostic);

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
}

recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

recognition.onresult = function(event) {
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
        }
    }

    if (finalTranscript) {
        console.log('Final Transcript: ', finalTranscript);
        diagnostic.textContent = 'Final Transcript: ' + finalTranscript;
    }
};

recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
    diagnostic.textContent = 'Speech recognition error: ' + event.error;
};

recognition.onnomatch = function(event) {
    diagnostic.textContent = "I didn't recognize the key word!";
};

/*recognition.onspeechend = function() {
    console.log('Speech recognition service disconnected');
    recognition.start();  // restart when service failed
};*/

window.addEventListener('load', () => {
    recognition.start();
});
