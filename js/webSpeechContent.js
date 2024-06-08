// Inject WebSpeechWrapper.js into the webpage
const script = document.createElement('script');
script.src = chrome.runtime.getURL('js/WebSpeechWrapper.js');
script.onload = function() {
    this.remove();
    // Initialize the WebSpeechWrapper and start it
    const speechWrapper = new WebSpeechWrapper();
    speechWrapper.start();
};


(document.head || document.documentElement).appendChild(script);