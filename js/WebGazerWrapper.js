webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    var xPrediction = data.x; //these x coordinates are relative to the viewport
    var yPrediction = data.y;
    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;//these y coordinates are relative to the viewport

    var topBoundary = screenHeight -(screenWidth);
    //Events for up and down
    if(yPrediction < screenHeight * 0.5) {
        console.log("Du schaust nach oben")
    }
    if(yPrediction > screenHeight * 0.5) {
        console.log("Du schaust nach unten")
    }
    //Events for left and right
    if(xPrediction < screenWidth * 0.25) {
        console.log("Du schaust nach links")
    }
    if(yPrediction > screenWidth * 0.25) {
        console.log("Du schaust nach rechts")
    }
}).begin();

webgazer.showPredictionPoints(true);

webgazer.begin();