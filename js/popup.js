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
const selectArrowUp = document.getElementById("upKey-voice");
const selectArrowDown = document.getElementById("downKey-voice");
const selectArrowLeft = document.getElementById("leftKey-voice");
const selectArrowRight = document.getElementById("rightKey-voice");
const upKey = document.getElementById("upKey");
const downKey = document.getElementById("downKey");
const leftKey = document.getElementById("leftKey");
const rightKey = document.getElementById("rightKey");
const webcamOnButton = document.getElementById("webcam-on-button");
const webcamOffButton = document.getElementById("webcam-off-button");
const gridOnButton = document.getElementById("grid-on-button");
const gridOffButton = document.getElementById("grid-off-button");
let isGridVisible;
let voiceKeyBindsArr = [];
let togglePauseResumeButton = true;
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
    togglePauseResumeButton = false;
    pauseButton.classList.add("hidden");
    restartButton.classList.remove("hidden");
    /*if (toggle.checked) {
             webspeech recognition stop
        }
        else webgazer stop*/
  });
  restartButton.addEventListener("click", function () {
    togglePauseResumeButton = true;
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
    allEmpty = checkAndResetVoice(inputContainerVoice);
  } else if (inputContainerVoice.classList.contains("hidden")) {
    // Reset eyes container input fields
    allEmpty = checkAndResetEyes(inputContainerEyes);
  }

  if (allEmpty) {
    alert("Oops! Nothing to reset here!");
  }
});

// Function to reset input fields to default states
const checkAndResetVoice = (container) => {
  console.log("TEST query1");
  let allEmpty = true;

  allEmpty = false;

  let arrSelect = container.getElementsByClassName("dropdown-select-voice");
  let arrInput = container.getElementsByClassName("keyword-input");
  for (var i = 0; i < 4; i++) {
    arrSelect[i].selectedIndex = 0;
    arrInput[i].value = "";
  }
  return allEmpty;
};

const checkAndResetEyes = (container) => {
  console.log("TEST query1");
  let allEmpty = true;

  allEmpty = false;

  let arrSelect = container.getElementsByClassName("dropdown-select");
  for (var i = 0; i < 4; i++) {
    arrSelect[i].selectedIndex = 0;
  }
  return allEmpty;
};

helpButton.addEventListener("click", function () {
  mainContainerPopup.classList.toggle("expanded");
  console.log("TEST");
  if (!clicked) {
    clicked = true;
    helpPage.classList.remove("hidden");
    mainContainer.classList.add("hidden");
    resetButton.classList.add("hidden")
    pauseButton.classList.add("hidden");
    restartButton.classList.add("hidden");
  } else {
    clicked = false;
    helpPage.classList.add("hidden");
    mainContainer.classList.remove("hidden");
    resetButton.classList.remove("hidden")
    if(togglePauseResumeButton){
      pauseButton.classList.remove("hidden");
    }else{
      restartButton.classList.remove("hidden");
    }
    
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
  refreshKeys();
  if (toggle.checked && inputContainerEyes.classList.contains("hidden")) {
    saveKeysVoice(inputContainerVoice);
  } else if (inputContainerVoice.classList.contains("hidden")) {
    saveKeysEyes(inputContainerEyes);
  }
});

const saveKeysVoice = (container) => {
  let empty = false;

  let inputArray = container.getElementsByClassName("keyword-input");
  let selectArray = container.getElementsByClassName("dropdown-select-voice");

  for (var i = 0; i < 4; i++) {
    if (
      (!inputArray[0].value == "" && selectArray[0].selectedIndex == 0) ||
      (inputArray[0].value == "" && !selectArray[0].selectedIndex == 0)
    ) {
      empty = true;
    } else if (
      (!inputArray[1].value == "" && selectArray[1].selectedIndex == 0) ||
      (inputArray[1].value == "" && !selectArray[1].selectedIndex == 0)
    ) {
      empty = true;
    } else if (
      (!inputArray[2].value == "" && selectArray[2].selectedIndex == 0) ||
      (inputArray[2].value == "" && !selectArray[2].selectedIndex == 0)
    ) {
      empty = true;
    } else if (
      (!inputArray[3].value == "" && selectArray[3].selectedIndex == 0) ||
      (inputArray[3].value == "" && !selectArray[3].selectedIndex == 0)
    ) {
      empty = true;
    }
  }

  if (empty) {
    alert("You must choose a keyword and a keybind");
  }
  const selectArrowUpValue =
    selectArrowUp.selectedIndex == 0 ? "" : selectArrowUp.value;
  const selectArrowDownValue =
    selectArrowDown.selectedIndex == 0 ? "" : selectArrowDown.value;
  const selectArrowLeftValue =
    selectArrowLeft.selectedIndex == 0 ? "" : selectArrowLeft.value;
  const selectArrowRightValue =
    selectArrowRight.selectedIndex == 0 ? "" : selectArrowRight.value;
  const arrowUpInput = arrowUp.value;
  const arrowDownInput = arrowDown.value;
  const arrowLeftInput = arrowLeft.value;
  const arrowRightInput = arrowRight.value;

  chrome.storage.sync.set(
    {
      selectArrowUp: selectArrowUpValue,
      selectArrowDown: selectArrowDownValue,
      selectArrowLeft: selectArrowLeftValue,
      selectArrowRight: selectArrowRightValue,
      arrowUp: arrowUpInput,
      arrowDown: arrowDownInput,
      arrowLeft: arrowLeftInput,
      arrowRight: arrowRightInput,
    },
    function () {
      console.log("Settings saved");
    }
  );
};

const saveKeysEyes = (container) => {
  const upKeyInput = upKey.selectedIndex == 0 ? "" : upKey.value;
  const downKeyInput = downKey.selectedIndex == 0 ? "" : downKey.value;
  const leftKeyInput = leftKey.selectedIndex == 0 ? "" : leftKey.value;
  const rightKeyInput = rightKey.selectedIndex == 0 ? "" : rightKey.value;

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
    [
      "arrowUp",
      "arrowDown",
      "arrowLeft",
      "arrowRight",
      "selectArrowUp",
      "selectArrowDown",
      "selectArrowLeft",
      "selectArrowRight",
    ],
    function (result) {
      result.arrowUp == undefined
        ? (arrowUp.value = "")
        : (arrowUp.value = result.arrowUp);
      result.arrowDown == undefined
        ? (arrowDown.value = "")
        : (arrowDown.value = result.arrowDown);
      result.arrowLeft == undefined
        ? (arrowLeft.value = "")
        : (arrowLeft.value = result.arrowLeft);
      result.arrowRight == undefined
        ? (arrowRight.value = "")
        : (arrowRight.value = result.arrowRight);
      result.selectArrowUp == undefined || result.selectArrowUp == ""
        ? (selectArrowUp.selectedIndex = 0)
        : (selectArrowUp.value = result.selectArrowUp);
      result.selectArrowDown == undefined || result.selectArrowDown == ""
        ? (selectArrowDown.selectedIndex = 0)
        : (selectArrowDown.value = result.selectArrowDown);
      result.selectArrowLeft == undefined || result.selectArrowLeft == ""
        ? (selectArrowLeft.selectedIndex = 0)
        : (selectArrowLeft.value = result.selectArrowLeft);
      result.selectArrowRight == undefined || result.selectArrowRight == ""
        ? (selectArrowRight.selectedIndex = 0)
        : (selectArrowRight.value = result.selectArrowRight);
    }
  );
  setTimeout(refreshKeys, 100);
};

const restoreEyeOptions = () => {
  chrome.storage.sync.get(
    ["upKey", "downKey", "leftKey", "rightKey"],
    function (result) {
      result.upKey == undefined || result.upKey == ""
        ? (upKey.selectedIndex = 0)
        : (upKey.value = result.upKey);
      result.downKey == undefined || result.downKey == ""
        ? (downKey.selectedIndex = 0)
        : (downKey.value = result.downKey);
      result.leftKey == undefined || result.leftKey == ""
        ? (leftKey.selectedIndex = 0)
        : (leftKey.value = result.leftKey);
      result.rightKey == undefined || result.rightKey == ""
        ? (rightKey.selectedIndex = 0)
        : (rightKey.value = result.rightKey);
      dataArray = result;
    }
  );
  setTimeout(refreshKeys, 100);
};

function refreshKeys() {
  sendSettingsContentScripts();
}

document.addEventListener("DOMContentLoaded", restoreVoiceOptions);
document.addEventListener("DOMContentLoaded", restoreEyeOptions);

/* 
document.addEventListener("DOMContentLoaded", getVoiceSelectValues);
console.log(voiceKeyBindsArr);
*/

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

function sendSettingsContentScripts() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { voiceKeyBindsArr: voiceKeyBindsArr });
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "keybinds") {
    console.log("Received data:", message.dataArray);
  }
});
