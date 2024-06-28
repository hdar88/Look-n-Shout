webgazer
    .setGazeListener(function (data) {
        if (data == null) {
            return;
        }
        let xPrediction = data.x;
        let yPrediction = data.y;

        let topBoundary = document.getElementById("topBoundary");
        let bottomBoundary = document.getElementById("bottomBoundary");
        let leftBoundary = document.getElementById("leftBoundary");
        let rightBoundary = document.getElementById("rightBoundary");

        // define position and size of boundaries
        let topRect = topBoundary.getBoundingClientRect();
        let bottomRect = bottomBoundary.getBoundingClientRect();
        let leftRect = leftBoundary.getBoundingClientRect();
        let rightRect = rightBoundary.getBoundingClientRect();

        // check in which boundary gaze is positioned
        if (
            yPrediction >= topRect.top &&
            yPrediction <= topRect.bottom &&
            xPrediction >= topRect.left &&
            xPrediction <= topRect.right
        ) {
            //console.log("Du schaust nach oben");
            simulateKeyPress("ArrowUp");
        } else if (
            yPrediction >= bottomRect.top &&
            yPrediction <= bottomRect.bottom &&
            xPrediction >= bottomRect.left &&
            xPrediction <= bottomRect.right
        ) {
            simulateKeyPress("ArrowDown");
        } else if (
            yPrediction >= leftRect.top &&
            yPrediction <= leftRect.bottom &&
            xPrediction >= leftRect.left &&
            xPrediction <= leftRect.right
        ) {
            simulateKeyPress("ArrowLeft");
        } else if (
            yPrediction >= rightRect.top &&
            yPrediction <= rightRect.bottom &&
            xPrediction >= rightRect.left &&
            xPrediction <= rightRect.right
        ) {
            simulateKeyPress("ArrowRight");
        }
    })
    .setTracker("TFFacemesh")
    .begin()
webgazer.clearData();

// Listener for messages from content.js for webcam on/off logic
window.addEventListener('message', function(event) {
    if (event.source !== window) return; // checks if message from same window
    if (event.data.type && (event.data.type === 'TOGGLE_WEBCAM')) {
        if(!event.data.isWebcamVisible){
            webgazer.showVideo(false); // hides the video canvas element of webgazer.js
        } else {
            webgazer.showVideo(true); // shows the video canvas element of webgazer.js
        }
    }
});
async function simulateKeyPress(key) {
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
    await new Promise((r) => setTimeout(r, 500));
    document.dispatchEvent(eventUp);
}