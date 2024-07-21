let moveUpEyes;
let moveDownEyes;
let moveLeftEyes;
let moveRightEyes;
let timeUpEyes;
let timeDownEyes;
let timeLeftEyes;
let timeRightEyes;

const topBoundary = document.getElementById("topBoundary");
const bottomBoundary = document.getElementById("bottomBoundary");
const leftBoundary = document.getElementById("leftBoundary");
const rightBoundary = document.getElementById("rightBoundary");

const boundaries = [
    {element: topBoundary, action: () => simulateKeyPress(moveUpEyes, timeUpEyes)},
    {element: bottomBoundary, action: () => simulateKeyPress(moveDownEyes, timeDownEyes)},
    {element: leftBoundary, action: () => simulateKeyPress(moveLeftEyes, timeLeftEyes)},
    {element: rightBoundary, action: () => simulateKeyPress(moveRightEyes, timeRightEyes)}
];

/**
 * Initializes the WebGazer gaze tracking with a custom listener and sets the tracker to "TFFacemesh".
 * The gaze listener evaluates the user's gaze against predefined boundaries and triggers corresponding actions.
 * After initialization, it clears any existing WebGazer data.
 */
webgazer
    .setGazeListener(function (data) {
        if (!data) return;

        const {x: xPrediction, y: yPrediction} = data;

        boundaries.forEach(({element, action}) => {
            const {top, bottom, left, right} = element.getBoundingClientRect();
            if (xPrediction > left && xPrediction < right && yPrediction > top && yPrediction < bottom) {
                action();
            }
        });
    })
    .setTracker("TFFacemesh")
    .begin();
webgazer.clearData();

/** Listener for messages from content.js for webcam on/off logic
 * to show/hide the video canvas element of webgazer.js
 */
window.addEventListener("message", function (event) {
    if (event.source !== window) return; // checks if message from same window
    if (event.data.type && event.data.type === "TOGGLE_WEBCAM") {
        if (!event.data.isWebcamVisible) {
            webgazer.showVideo(false); // hides the video canvas element of webgazer.js
        } else {
            webgazer.showVideo(true); // shows the video canvas element of webgazer.js
        }
    }
});

/** Function to simulate key press events
 * @param key - key to be pressed
 * @param timeKeyPress - time for which key should be pressed
 * @returns {Promise<void>} - promise to be resolved after key press event is simulated
 */
async function simulateKeyPress(key, timeKeyPress) {
    console.log("TIME" + timeKeyPress);
    const keyCodeMap = {
        w: 87,
        a: 65,
        s: 83,
        d: 68,
        " ": 32,
        ArrowUp: 38,
        ArrowDown: 40,
        ArrowLeft: 37,
        ArrowRight: 39,
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

    await new Promise((r) => setTimeout(r, timeKeyPress * 1000));

    document.dispatchEvent(eventUp);
}

/** Listener for messages from popup.js to restore eye tracking options */
window.addEventListener("message", function (event) {
    if (event.data.type && event.data.type === "keybinds_eyes") {
        // Process the dataArray
        moveUpEyes = event.data.dataArrayWebgazer.upKey;
        moveDownEyes = event.data.dataArrayWebgazer.downKey;
        moveLeftEyes = event.data.dataArrayWebgazer.leftKey;
        moveRightEyes = event.data.dataArrayWebgazer.rightKey;
        timeUpEyes = event.data.dataArrayWebgazer.upKeyTime;
        timeLeftEyes = event.data.dataArrayWebgazer.leftKeyTime;
        timeRightEyes = event.data.dataArrayWebgazer.rightKeyTime;
        timeDownEyes = event.data.dataArrayWebgazer.downKeyTime;

        console.log(timeDownEyes);
    }
});