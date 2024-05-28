webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    var xPrediction = data.x;
    var yPrediction = data.y;

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
    if (yPrediction >= topRect.top && yPrediction <= topRect.bottom &&
        xPrediction >= topRect.left && xPrediction <= topRect.right) {
        console.log("Du schaust nach oben");
    } else if (yPrediction >= bottomRect.top && yPrediction <= bottomRect.bottom &&
        xPrediction >= bottomRect.left && xPrediction <= bottomRect.right) {
        console.log("Du schaust nach unten");
    } else if (yPrediction >= leftRect.top && yPrediction <= leftRect.bottom &&
        xPrediction >= leftRect.left && xPrediction <= leftRect.right) {
        console.log("Du schaust nach links");
    } else if (yPrediction >= rightRect.top && yPrediction <= rightRect.bottom &&
        xPrediction >= rightRect.left && xPrediction <= rightRect.right) {
        console.log("Du schaust nach rechts");
    } else {
        console.log("Du schaust in die Mitte");
    }
}).begin();

webgazer.showPredictionPoints(true);

webgazer.begin();

