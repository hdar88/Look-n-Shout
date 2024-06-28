const toggle = document.getElementById("toggle");
const mainContainer = document.getElementById("container");
const inputContainerEyes = document.getElementById("input-container-eyes");
const inputContainerVoice = document.getElementById("input-container-voice");
const restartButton = document.getElementById("restart-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const saveButton = document.getElementById("save-button");
const helpButton = document.getElementById("settings-button");
const helpPage = document.getElementById("help-page-container");
const mainContainerPopup = document.getElementById("main-container");
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
const gridOnButton = document.getElementById("grid-on-button");
const gridOffButton = document.getElementById("grid-off-button");
let dropdownLabel = document.getElementById('dropdown-label');
let isGridVisible;
//TODO define webgazer object
//TODO define webspeech object

let clicked = false;

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

    // stop extension

    // webgazer.stop()
    // recognition.stop()
  });
  restartButton.addEventListener("click", function () {
    restartButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");

    // restart extension

    //webgazer.begin()
    //recognition.start()
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

// help page UI
helpButton.addEventListener("click", function () {
  //mainContainerPopup.classList.toggle("expanded");
  if (!clicked) {
    clicked = true;
    helpPage.classList.remove("hidden");
    mainContainer.classList.add("hidden");
    pauseButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    webcamOnButton.classList.add("hidden");
    webcamOffButton.classList.add("hidden");
    gridOnButton.classList.add("hidden");
    gridOffButton.classList.add("hidden");
  } else {
    clicked = false;
    helpPage.classList.add("hidden");
    mainContainer.classList.remove("hidden");
    pauseButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
    webcamOffButton.classList.remove("hidden");
    gridOffButton.classList.remove("hidden");
  }
});

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

document.addEventListener("DOMContentLoaded", function () {

  // init visibility of grid buttons
  gridOnButton.classList.add("hidden");
  gridOffButton.classList.remove("hidden");

  // init visibility of grid true for calibration
  //isGridVisible = true;

  // do not show grid
  gridOffButton.addEventListener("click", function () {
    gridOffButton.classList.add("hidden");
    gridOnButton.classList.remove("hidden");

    //logic
    isGridVisible = false;
    sendMessageToContentScript();
  });

  // show grid
  gridOnButton.addEventListener("click", function () {
    gridOnButton.classList.add("hidden");
    gridOffButton.classList.remove("hidden");

    //logic
    isGridVisible = true;
    sendMessageToContentScript();
  });
});

// Function to send message to content script
function sendMessageToContentScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { isGridVisible: isGridVisible });
  });
}