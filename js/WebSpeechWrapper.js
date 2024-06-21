let recognition;
let diagnostic = document.createElement("div");
document.body.appendChild(diagnostic);

function startRecognition() {
  console.log("START RECOGNITION");
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

      if (finalTranscript.includes("jump")) {
        console.log("TEST A");
        triggerkeypress("ArrowUp", "jump");
      } else if (finalTranscript.includes("left")) {
        console.log("TESTTTTTTTTT");
        triggerkeypress("ArrowLeft", "left");
      } else if (finalTranscript.includes("right")) {
        console.log("TESTTTTTTTTT");
        triggerkeypress("ArrowRight", "right");
      } else if (finalTranscript.includes("down")) {
        console.log("TESTTTTTTTTT");
        triggerkeypress("ArrowDown", "down");
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
    a: 65,
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

  console.log(eventUp);

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
  console.log("TESTTTT");
  startRecognition();
});
