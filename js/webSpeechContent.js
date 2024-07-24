/** Inject WebSpeechWrapper.js into the webpage */
const script = document.createElement("script");
script.src = chrome.runtime.getURL("js/WebSpeechWrapper.js");
(document.head || document.documentElement).appendChild(script);

let dataArray = [];

/** Function to restore voice options from storage and post them to the WebSpeech wrapper */
const restoreVoiceOptions = () => {
    chrome.storage.sync.get(
        [
            "arrowUp",
            "arrowDown",
            "arrowLeft",
            "arrowRight",
            "selectArrowUp",
            "selectArrowDown",
            "selectArrowLeft",
            "selectArrowRight",
            "arrowUpTime",
            "arrowDownTime",
            "arrowLeftTime",
            "arrowRightTime"
        ],
        function (result) {
            dataArray = result;

            window.postMessage(
                {
                    type: "keybinds",
                    dataArray: dataArray, // Ensure this is the actual data array
                },
                "*"
            );
        }
    );
};
setTimeout(restoreVoiceOptions, 100);

/** Listener for messages from popup.js to restore voice options */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    restoreVoiceOptions();
});
