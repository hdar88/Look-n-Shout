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
  }
});

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
        console.log("TEST A");
        triggerkeypress(moveUp, "jump");
      } else if (finalTranscript == keywordLeft) {
        console.log("TESTTTTTTTTT");
        triggerkeypress(moveLeft, "left");
      } else if (finalTranscript == keywordRight) {
        console.log("TESTTTTTTTTT");
        triggerkeypress(moveRight, "right");
      } else if (finalTranscript == keywordDown) {
        console.log("TESTTTTTTTTT");
        triggerkeypress(moveDown, "down");
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

async function triggerkeypress(key, command) {
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
  await new Promise((r) => setTimeout(r, 500));
  document.dispatchEvent(eventUp);

  //output.dispatchEvent(event);

  console.log("inside trigger method");
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/*recognition.onspeechend = function() {
    console.log('Speech recognition service disconnected');
    recognition.start();  // restart when service failed
};*/

window.addEventListener("load", () => {
  startRecognition();
});
