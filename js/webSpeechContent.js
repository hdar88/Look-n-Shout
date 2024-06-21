// Inject WebSpeechWrapper.js into the webpage
const script = document.createElement("script");
script.src = chrome.runtime.getURL("js/WebSpeechWrapper.js");
(document.head || document.documentElement).appendChild(script);
