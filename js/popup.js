const toggle = document.getElementById("toggle");
const inputContainerEyes = document.getElementById("input-container-eyes");
const inputContainerVoice = document.getElementById("input-container-voice");
const restartButton = document.getElementById("restart-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const saveButton = document.getElementById("save-button");
const arrowUp = document.getElementById("up-voice");
const arrowDown = document.getElementById("down-voice");
const arrowLeft = document.getElementById("left-voice");
const arrowRight = document.getElementById("right-voice");
const upKey = document.getElementById("upKey");
const downKey = document.getElementById("downKey");
const leftKey = document.getElementById("leftKey");
const rightKey = document.getElementById("rightKey");

const webcamOnButton = document.getElementById("webcam-on-button");
const webcamOffButton = document.getElementById("webcam-off-button");

//TODO define webgazer object
//TODO define webspeech object

// switch between eyes and voice pop up content
document.addEventListener("DOMContentLoaded", function () {
  // Initialize input-container-eyes as visible
  inputContainerEyes.classList.remove("hidden");

  toggle.addEventListener("change", function () {
    if (this.checked) {
      document.querySelector(".slider").classList.add("checked");
      inputContainerEyes.classList.add("hidden");
      inputContainerVoice.classList.remove("hidden");
    } else {
      document.querySelector(".slider").classList.remove("checked");
      inputContainerEyes.classList.remove("hidden");
      inputContainerVoice.classList.add("hidden");
    }
  });
});
//Pause - Start button to pause/ restart eye gaze or voice tracking
// switch between pause and start icon
document.addEventListener("DOMContentLoaded", function () {
  // init visibility of buttons
  restartButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");

  // switch between pause and start icons when clicking
  pauseButton.addEventListener("click", function () {
    pauseButton.classList.add("hidden");
    restartButton.classList.remove("hidden");
    /*if (toggle.checked) {
             webspeech recognition stop
        }
        else webgazer stop*/
  });
  restartButton.addEventListener("click", function () {
    restartButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");
    /* if checked
        webspeech recognition restart
        else
        webgazer restart
         */
  });
});

// Reset button: clear the visible content inside the input fields and (maybe also saved key assignments)
resetButton.addEventListener("click", function () {
  let allEmpty = true;

  if (toggle.checked && inputContainerEyes.classList.contains("hidden")) {
    // Reset voice container input fields
    allEmpty = checkAndReset(inputContainerVoice);
  } else if (inputContainerVoice.classList.contains("hidden")) {
    // Reset eyes container input fields
    allEmpty = checkAndReset(inputContainerEyes);
  }

  if (allEmpty) {
    alert("Oops! Nothing to reset here!");
  }
});

// Function to reset input fields to default states
const checkAndReset = (container) => {
  let allEmpty = true;
  container.querySelectorAll("input").forEach((input) => {
    if (input.value !== "") {
      allEmpty = false;
    }
    input.value = "";
    input.placeholder = input.dataset.placeholder;
  });
  return allEmpty;
};

// Store default state of input fields
const storeDefaultInputFields = (container) => {
  container.querySelectorAll("input").forEach((input) => {
    input.dataset.placeholder = input.placeholder;
  });
};
storeDefaultInputFields(inputContainerEyes);
storeDefaultInputFields(inputContainerVoice);

//help page -> whole description of the functionality of our extension
//TODO leonard

// save button -> chrome.storage API -> get User Input
//TODO oqba
saveButton.addEventListener("click", function () {
  if (toggle.checked && inputContainerEyes.classList.contains("hidden")) {
    saveKeysVoice(inputContainerVoice);
  } else if (inputContainerVoice.classList.contains("hidden")) {
    saveKeysEyes(inputContainerEyes);
  }
});

const saveKeysVoice = (container) => {
  let empty = false;
  container.querySelectorAll("input").forEach((input) => {
    if (input.value === "") {
      empty = true;
    }
  });
  if (empty) {
    alert("Some Keywords missing!!");
  } else {
    const arrowUpInput = arrowUp.value;
    const arrowDownInput = arrowDown.value;
    const arrowLeftInput = arrowLeft.value;
    const arrowRightInput = arrowRight.value;

    chrome.storage.sync.set(
      {
        arrowUp: arrowUpInput,
        arrowDown: arrowDownInput,
        arrowLeft: arrowLeftInput,
        arrowRight: arrowRightInput,
      },
      function () {
        console.log("Settings saved");
      }
    );
  }
};

const saveKeysEyes = (container) => {
  let empty = false;
  container.querySelectorAll("input").forEach((input) => {
    if (input.value === "") {
      empty = true;
    }
  });

  const upKeyInput = upKey.value;
  const downKeyInput = downKey.value;
  const leftKeyInput = leftKey.value;
  const rightKeyInput = rightKey.value;

  chrome.storage.sync.set(
    {
      upKey: upKeyInput,
      downKey: downKeyInput,
      leftKey: leftKeyInput,
      rightKey: rightKeyInput,
    },
    function () {
      console.log("Settings saved");
    }
  );
};

const restoreVoiceOptions = () => {
  chrome.storage.sync.get(
    ["arrowUp", "arrowDown", "arrowLeft", "arrowRight"],
    function (result) {
      arrowUp.value = result.arrowUp;
      arrowDown.value = result.arrowDown;
      arrowLeft.value = result.arrowLeft;
      arrowRight.value = result.arrowRight;
    }
  );
};

const restoreEyeOptions = () => {
  chrome.storage.sync.get(
    ["upKey", "downKey", "leftKey", "rightKey"],
    function (result) {
      if (result.upKey === undefined) {
        upKey.value = "";
      } else {
        upKey.value = result.upKey;
      }
      downKey.value = result.downKey;
      leftKey.value = result.leftKey;
      rightKey.value = result.rightKey;
    }
  );
};

document.addEventListener("DOMContentLoaded", restoreVoiceOptions);
document.addEventListener("DOMContentLoaded", restoreEyeOptions);

// input validation
//TODO

// button to turn visibility of webcam on/ off
//TODO
document.addEventListener("DOMContentLoaded", function () {
  // init visibility of buttons
  webcamOnButton.classList.add("hidden");
  webcamOffButton.classList.remove("hidden");

  // do not show webcam
  webcamOffButton.addEventListener("click", function () {
    webcamOffButton.classList.add("hidden");
    webcamOnButton.classList.remove("hidden");
    //logic
  });
  // show webcam
  webcamOnButton.addEventListener("click", function () {
    webcamOnButton.classList.add("hidden");
    webcamOffButton.classList.remove("hidden");
    //logic
  });
});
