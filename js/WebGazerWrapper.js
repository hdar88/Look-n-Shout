webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    let xPrediction = data.x;
    let yPrediction = data.y;

    let topBoundary = document.getElementById("topBoundary");
    let bottomBoundary = document.getElementById("bottomBoundary");
    let leftBoundary = document.getElementById("leftBoundary");
    let rightBoundary = document.getElementById("rightBoundary");
    let topLeftBoundary = document.getElementById("topLeftBoundary");
    let topRightBoundary = document.getElementById("topRightBoundary");
    let bottomLeftBoundary = document.getElementById("bottomLeftBoundary");
    let bottomRightBoundary = document.getElementById("bottomRightBoundary");

    // define position and size of boundaries
    let topRect = topBoundary.getBoundingClientRect();
    let bottomRect = bottomBoundary.getBoundingClientRect();
    let leftRect = leftBoundary.getBoundingClientRect();
    let rightRect = rightBoundary.getBoundingClientRect();
    let topLeftRect = topLeftBoundary.getBoundingClientRect();
    let topRightRect = topRightBoundary.getBoundingClientRect();
    let bottomLeftRect = bottomLeftBoundary.getBoundingClientRect();
    let bottomRightRect = bottomRightBoundary.getBoundingClientRect();

    // check in which boundary gaze is positioned
    if (yPrediction >= topRect.top && yPrediction <= topRect.bottom &&
        xPrediction >= topRect.left && xPrediction <= topRect.right) {
        console.log("Du schaust nach oben");
        //TODO simulateKeyPress("ArrowUp");

    } else if (yPrediction >= bottomRect.top && yPrediction <= bottomRect.bottom &&
        xPrediction >= bottomRect.left && xPrediction <= bottomRect.right) {
        console.log("Du schaust nach unten");
        //TODO simulateKeyPress("ArrowDown");

    } else if (yPrediction >= leftRect.top && yPrediction <= leftRect.bottom &&
        xPrediction >= leftRect.left && xPrediction <= leftRect.right) {
        console.log("Du schaust nach links");
        //TODO simulateKeyPress("ArrowLeft");

    } else if (yPrediction >= rightRect.top && yPrediction <= rightRect.bottom &&
        xPrediction >= rightRect.left && xPrediction <= rightRect.right) {
        console.log("Du schaust nach rechts");
        //TODO simulateKeyPress("ArrowRight");

    } else if (yPrediction >= topLeftRect.top && yPrediction <= topLeftRect.bottom &&
        xPrediction >= topLeftRect.left && xPrediction <= topLeftRect.right) {
        console.log("Du schaust nach oben links");
        //TODO simulateKeyCombiPress(keys)

    } else if (yPrediction >= topRightRect.top && yPrediction <= topRightRect.bottom &&
        xPrediction >= topRightRect.left && xPrediction <= topRightRect.right) {
        console.log("Du schaust nach oben rechts");
        //TODO simulateKeyCombiPress(keys)

    } else if (yPrediction >= bottomLeftRect.top && yPrediction <= bottomLeftRect.bottom &&
        xPrediction >= bottomLeftRect.left && xPrediction <= bottomLeftRect.right) {
        console.log("Du schaust nach unten links");
        //TODO simulateKeyCombiPress(keys)

    } else if (yPrediction >= bottomRightRect.top && yPrediction <= bottomRightRect.bottom &&
        xPrediction >= bottomRightRect.left && xPrediction <= bottomRightRect.right) {
        console.log("Du schaust nach unten rechts");
        //TODO simulateKeyCombiPress(keys)

    } else {
        console.log("Du schaust in die Mitte");
    }
}).begin();

webgazer.showPredictionPoints(true);

webgazer.begin();

function simulateKeyPress(key) {
    let keyCode;

    if (key.length === 1) {
        keyCode = key.toUpperCase().charCodeAt(0);
    } else {
        const specialKeys = {
            'Enter': 13,
            'Escape': 27,
            'Backspace': 8,
            'Tab': 9,
            'Space': 32,
            'ArrowUp': 126,
            'ArrowDown': 40,
            'ArrowLeft': 37,
            'ArrowRight': 39
        };
        keyCode = specialKeys[key];
    }

    if (keyCode === undefined) {
        console.error(`Key "${key}" is not supported.`);
        return;
    }

    const keyDownEvent = new KeyboardEvent("keydown", {
        key: key,
        keyCode: keyCode,
        code: key,
        which: keyCode,
        bubbles: true,
        cancelable: true
    });

    const keyUpEvent = new KeyboardEvent("keyup", {
        key: key,
        keyCode: keyCode,
        code: key,
        which: keyCode,
        bubbles: true,
        cancelable: true
    });

    document.dispatchEvent(keyDownEvent);
    console.log("Key down: " + key);

    // Delay the keyup event slightly to simulate a proper key press
    setTimeout(() => {
        document.dispatchEvent(keyUpEvent);
        console.log("Key up: " + key);
    }, 100); // 100ms delay, adjust as necessary
}

function simulateKeyCombiPress(keys){
    //TODO
}