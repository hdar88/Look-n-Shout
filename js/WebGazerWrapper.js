webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    let xPrediction = data.x;
    let yPrediction = data.y;
    //console.log(elapsedTime);

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
        //console.log("Du schaust nach oben");
        simulateKeyPress('ArrowUp');

    } else if (yPrediction >= bottomRect.top && yPrediction <= bottomRect.bottom &&
        xPrediction >= bottomRect.left && xPrediction <= bottomRect.right) {
        console.log("Du schaust nach unten");
        simulateKeyPress('ArrowDown');

    } else if (yPrediction >= leftRect.top && yPrediction <= leftRect.bottom &&
        xPrediction >= leftRect.left && xPrediction <= leftRect.right) {
        console.log("Du schaust nach links");
        simulateKeyPress('ArrowLeft');

    } else if (yPrediction >= rightRect.top && yPrediction <= rightRect.bottom &&
        xPrediction >= rightRect.left && xPrediction <= rightRect.right) {
        console.log("Du schaust nach rechts");
        simulateKeyPress('ArrowRight');

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

async function simulateKeyPress(key) {
    const keyCodeMap = {
        'w': 87,
        'a': 65,
        's': 83,
        'd': 68,
        ' ': 32,
        'ArrowUp': 38,
        'ArrowDown': 40,
        'ArrowLeft': 37,
        'ArrowRight': 39,
    };

    const keyCode = keyCodeMap[key];
    if (!keyCode) return;

    const eventInit = {
        key: key,
        code: key.toUpperCase(),
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true
    };

    const eventDown = new KeyboardEvent('keydown', eventInit);
    const eventUp = new KeyboardEvent('keyup', eventInit);

    document.dispatchEvent(eventUp);
    await new Promise(r => setTimeout(r, 500));
    document.dispatchEvent(eventDown);
}

function simulateKeyCombiPress(keys){
    //TODO
}