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

  recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
    diagnostic.textContent = "Speech recognition error: " + event.error;
    startRecognition();
  };

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
        triggerkeypress("w", "jump");
      } else if (finalTranscript.includes("left")) {
        console.log("TESTTTTTTTTT");
        triggerkeypress("a", "left");
      } else if (finalTranscript.includes("right")) {
        console.log("TESTTTTTTTTT");
        triggerkeypress("d", "right");
      } else if (finalTranscript.includes("down")) {
        console.log("TESTTTTTTTTT");
        triggerkeypress("d", "down");
      }

      if (finalTranscript) {
        console.log("Final Transcript TESTT: ", finalTranscript);
        diagnostic.textContent = "Final Transcript TEST: " + finalTranscript;
      }
      startRecognition();
    }
  };
}

function triggerkeypress(key, command) {
  const event = new KeyboardEvent(key);
  console.log(event);
  document.dispatchEvent(event);
  if (command == "jump") {
    console.log("Character jumps" + key);
  } else if (command == "down") {
    console.log("Character down");
  } else if (command == "left") {
    console.log("Character left");
  } else if (command == "right") {
    console.log("Character right");
  }
  //output.dispatchEvent(event);

  console.log("inside trigger method");
}

/*recognition.onspeechend = function() {
    console.log('Speech recognition service disconnected');
    recognition.start();  // restart when service failed
};*/

window.addEventListener("load", () => {
  console.log("TESTTTT");
  startRecognition();
});
