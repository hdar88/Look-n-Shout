let recognition;
let diagnostic = document.createElement("div");
document.body.appendChild(diagnostic);

let moveUp;
let moveDown;
let moveRight;
let moveLeft;
let keywordUp;
let keywordDown;
let keywordRight;
let keywordLeft;
let timeUpVoice;
let timeDownVoice;
let timeLeftVoice;
let timeRightVoice;

/** Listener for messages from content.js for keybinds
 * updates the keybinds based on the received data array
 * */
window.addEventListener("message", function (event) {
    if (event.data.type && event.data.type === "keybinds") {
        // Process the dataArray
        moveUp = event.data.dataArray.selectArrowUp;
        moveDown = event.data.dataArray.selectArrowDown;
        moveLeft = event.data.dataArray.selectArrowLeft;
        moveRight = event.data.dataArray.selectArrowRight;
        keywordUp = event.data.dataArray.arrowUp;
        keywordDown = event.data.dataArray.arrowDown;
        keywordLeft = event.data.dataArray.arrowLeft;
        keywordRight = event.data.dataArray.arrowRight;
        timeUpVoice = event.data.dataArray.arrowUpTime;
        timeDownVoice = event.data.dataArray.arrowDownTime;
        timeLeftVoice = event.data.dataArray.arrowLeftTime;
        timeRightVoice = event.data.dataArray.arrowRightTime;
    }
});

/**
 * Initializes and starts the speech recognition process using the Web Speech API.
 * It supports both webkitSpeechRecognition and SpeechRecognition depending on the browser.
 * The recognition process is set to be continuous and to provide interim results.
 * It listens for speech in English (US) and restarts recognition upon processing a command.
 * Commands are processed to trigger keypress simulations based on recognized keywords.
 * If "stop" is detected in the speech, the recognition process is halted.
 */
function startRecognition() {
    console.log("STARTED RECOGNITION");
    if ("webkitSpeechRecognition" in window) {
        recognition = new webkitSpeechRecognition();
    } else if ("SpeechRecognition" in window) {
        recognition = new SpeechRecognition();
    }
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function (event) {
        finalTranscript = event.results[0][0].transcript;
        if (finalTranscript.includes("stop")) {
            recognition.stop();
            event.results[0][0].transcript = "";
            console.log("STOPPED");
        } else {
            console.log("TEST METHOD");
            console.log(event);

            if (finalTranscript == keywordUp) {
                triggerkeypress(moveUp, timeUpVoice);
            } else if (finalTranscript.includes(keywordLeft)) {
                triggerkeypress(moveLeft, timeLeftVoice);
            } else if (finalTranscript.includes(keywordRight)) {
                triggerkeypress(moveRight, timeRightVoice);
            } else if (finalTranscript.includes(keywordDown)) {
                triggerkeypress(moveDown, timeDownVoice);
            }

            if (finalTranscript) {
                console.log("Final Transcript TESTT: ", finalTranscript);
                diagnostic.textContent = "Final Transcript TEST: " + finalTranscript;
            }
            startRecognition();
            console.log("TEST");
        }
    };
}

/**
 * Triggers a keypress event based on the provided key and time interval.
 * @param key - key to be pressed
 * @param timeKeyPress - time for which key should be pressed
 * @returns {Promise<void>} - promise to be resolved after key press event is simulated
 */
async function triggerkeypress(key, timeKeyPress) {
    const keyCodeMap = {
        " ": 32,
        A: 65,
        s: 83,
        d: 68,
        w: 87,
        ArrowUp: 38,
        ArrowLeft: 37,
        ArrowRight: 39,
        ArrowDown: 40,
    };

    const keyCode = keyCodeMap[key];
    if (!keyCode) return;

    const eventInit = {
        key: key,
        code: key.toUpperCase(),
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true,
    };

    const eventDown = new KeyboardEvent("keydown", eventInit);
    const eventUp = new KeyboardEvent("keyup", eventInit);

    document.dispatchEvent(eventDown);
    console.log(eventDown);
    await new Promise((r) => setTimeout(r, timeKeyPress * 1000));
    document.dispatchEvent(eventUp);

    console.log("inside trigger method");
}

/**
 * Sleep function to pause the execution for a specified number of milliseconds.
 * @param milliseconds - time to sleep in milliseconds
 * @returns {Promise<unknown>} - promise to be resolved after the specified time
 */
function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/** Listener for messages from content.js for webcam on/off logic */
window.addEventListener("load", () => {
    startRecognition();
});
