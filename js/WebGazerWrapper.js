let moveUpEyes;
let moveDownEyes;
let moveLeftEyes;
let moveRightEyes;
let timeUpEyes;
let timeDownEyes;
let timeLeftEyes;
let timeRightEyes;

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
      xPrediction <= topRect.right) { simulateKeyPress(moveUpEyes, timeUpEyes);
    } else if (
      yPrediction >= bottomRect.top &&
      yPrediction <= bottomRect.bottom &&
      xPrediction >= bottomRect.left &&
      xPrediction <= bottomRect.right) { simulateKeyPress(moveDownEyes, timeDownEyes);
    } else if (
      yPrediction >= leftRect.top &&
      yPrediction <= leftRect.bottom &&
      xPrediction >= leftRect.left &&
      xPrediction <= leftRect.right ) { simulateKeyPress(moveLeftEyes, timeLeftEyes);
    } else if (
      yPrediction >= rightRect.top &&
      yPrediction <= rightRect.bottom &&
      xPrediction >= rightRect.left &&
      xPrediction <= rightRect.right) { simulateKeyPress(moveRightEyes, timeRightEyes);
    }
  })
  .setTracker("TFFacemesh")
  .begin();
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
async function simulateKeyPress(key, timeKeyPress) {
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

  console.log(key);
  console.log(timeKeyPress);

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
  if(timeKeyPress > 0) {
      await new Promise((r) => setTimeout(r, timeKeyPress*1000));
  }
  document.dispatchEvent(eventUp);
}

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
  }
});

function simulateKeyCombiPress(keys) {
  //TODO
}
