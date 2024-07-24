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
const upKeyTime = document.getElementById("upKeyTime");
const downKeyTime = document.getElementById("downKeyTime");
const leftKeyTime = document.getElementById("leftKeyTime");
const rightKeyTime = document.getElementById("rightKeyTime");
const webcamOnButton = document.getElementById("webcam-on-button");
const webcamOffButton = document.getElementById("webcam-off-button");
const gridOnButton = document.getElementById("grid-on-button");
const gridOffButton = document.getElementById("grid-off-button");
const arrowUpTime = document.getElementById("arrowUpKeyTime");
const arrowDownTime = document.getElementById("arrowDownKeyTime");
const arrowLeftTime = document.getElementById("arrowLeftKeyTime");
const arrowRightTime = document.getElementById("arrowRightKeyTime");
let dropdownLabel = document.getElementById("dropdown-label");
let isGridVisible;
let voiceKeyBindsArr = [];
let togglePauseResumeButton = true;
let isWebcamVisible;
//TODO define webgazer object
//TODO define webspeech object

let clicked = false;

/**
 * Adds an event listener for the DOMContentLoaded event to initialize the UI state
 * and set up a change event listener on a toggle element. When the DOM content is fully loaded,
 * this function makes the input container for eyes visible by removing the 'hidden' class.
 * It then listens for changes on the toggle element. If the toggle is checked, it adds the 'checked'
 * class to the slider, hides the input container for eyes, and shows the input container for voice
 * by removing and adding the 'hidden' class respectively. If the toggle is not checked, it removes
 * the 'checked' class from the slider, shows the input container for eyes, and hides the input container
 * for voice by removing and adding the 'hidden' class respectively.
 */
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

/**
 * Attaches event listeners to the document and buttons to manage the visibility and state of pause and restart buttons.
 * It initializes the visibility of the pause and restart buttons, showing the pause button
 * and hiding the restart button by default. It then listens for click events on both buttons to toggle their visibility
 * and the application's pause/resume state. Clicking the pause button sets the application to a paused state, hides the pause button,
 * and shows the restart button. Conversely, clicking the restart button sets the application to a resumed state,
 * hides the restart button and shows the pause button.
 */
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
    });
    restartButton.addEventListener("click", function () {
        togglePauseResumeButton = true;
        restartButton.classList.add("hidden");
        pauseButton.classList.remove("hidden");
    });
});

/**
 * Attaches an event listener to the reset button to clear the content inside the input fields
 * of either the voice or eyes container based on the current toggle state. It checks if the
 * input fields are already empty and displays an alert if there's nothing to reset.
 */
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

/**
 * Resets the selected index of dropdowns and clears the values of input fields within the voice container.
 * Always returns false indicating that not all fields are empty after the reset operation.
 * @param {HTMLElement} container - The container element that holds voice-related input fields and dropdowns.
 * @returns {boolean} Always returns false.
 */
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

/**
 * Toggles the visibility of the help page and main UI elements. When the help button is clicked,
 * it either shows or hides the help page and various UI buttons based on the current state.
 * It also toggles the 'expanded' class on the main container to adjust the layout accordingly.
 */
helpButton.addEventListener("click", function () {
    mainContainerPopup.classList.toggle("expanded");
    console.log("TEST");
    if (!clicked) {
        clicked = true;
        helpPage.classList.remove("hidden");
        mainContainer.classList.add("hidden");
        resetButton.classList.add("hidden");
        pauseButton.classList.add("hidden");
        restartButton.classList.add("hidden");
        webcamOffButton.classList.add("hidden");
        gridOffButton.classList.add("hidden");
    } else {
        clicked = false;
        helpPage.classList.add("hidden");
        mainContainer.classList.remove("hidden");
        resetButton.classList.remove("hidden");
        webcamOffButton.classList.remove("hidden");
        gridOffButton.classList.remove("hidden");

        if (togglePauseResumeButton) {
            pauseButton.classList.remove("hidden");
        } else {
            restartButton.classList.remove("hidden");
        }
    }
});

/**
 * Stores the default placeholder values of all input fields within a specified container.
 * This function iterates over each input field in the container and saves its placeholder
 * value in a custom data attribute for later use.
 * @param {HTMLElement} container - The container element containing the input fields.
 */
const storeDefaultInputFields = (container) => {
    container.querySelectorAll("input").forEach((input) => {
        input.dataset.placeholder = input.placeholder;
    });
};
storeDefaultInputFields(inputContainerEyes);
storeDefaultInputFields(inputContainerVoice);

/**
 * Attaches an event listener to the save button.
 * On click, it refreshes the keys and then checks the toggle state to determine whether to save the voice or eyes
 * settings based on the visibility of the input containers.
 * It calls `saveKeysVoice` if the voice settings are active or `saveKeysEyes` if the eyes settings are active.
 */
saveButton.addEventListener("click", function () {
    refreshKeys();
    if (toggle.checked && inputContainerEyes.classList.contains("hidden")) {
        saveKeysVoice(inputContainerVoice);
    } else if (inputContainerVoice.classList.contains("hidden")) {
        saveKeysEyes(inputContainerEyes);
    }
});

/**
 * Saves the voice key settings to storage. It validates the combination of keyword inputs and dropdown selections
 * for voice commands, ensuring each has a corresponding pair. If any mismatch is found, it alerts the user to choose
 * both a keyword and a keybind. It then saves the selected keys and their durations for voice commands to storage.
 * @param {HTMLElement} container - The container element that holds the voice command input fields and dropdowns.
 */
const saveKeysVoice = (container) => {
    let empty = false;

    let inputArray = container.getElementsByClassName("keyword-input");
    let selectArray = container.getElementsByClassName("dropdown-select-voice");

    //TODO 3 if statements weg, i anstatt zahl benutzen
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
    const arrowUpTimeInput = arrowUpTime.value;
    const arrowDownTimeInput = arrowDownTime.value;
    const arrowLeftTimeInput = arrowLeftTime.value;
    const arrowRightTimeInput = arrowRightTime.value;

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
            arrowUpTime: arrowUpTimeInput,
            arrowDownTime: arrowDownTimeInput,
            arrowLeftTime: arrowLeftTimeInput,
            arrowRightTime: arrowRightTimeInput,
        },
        function () {
            console.log("Settings saved");
        }
    );
};

/**
 * Saves the eye control key settings to storage. It checks the selected index for each key dropdown
 * and saves the corresponding value or an empty string if no key is selected. It also saves the duration
 * for each key press. The settings are stored using the Chrome storage API.
 * @param {HTMLElement} container - The container element that holds the eye control key input fields and dropdowns.
 */
const saveKeysEyes = (container) => {
    const upKeyInput = upKey.selectedIndex == 0 ? "" : upKey.value;
    const downKeyInput = downKey.selectedIndex == 0 ? "" : downKey.value;
    const leftKeyInput = leftKey.selectedIndex == 0 ? "" : leftKey.value;
    const rightKeyInput = rightKey.selectedIndex == 0 ? "" : rightKey.value;
    const upKeyTimeInput = upKeyTime.value;
    const downKeyTimeInput = downKeyTime.value;
    const leftKeyTimeInput = leftKeyTime.value;
    const rightKeyTimeInput = rightKeyTime.value;

    chrome.storage.sync.set(
        {
            upKey: upKeyInput,
            downKey: downKeyInput,
            leftKey: leftKeyInput,
            rightKey: rightKeyInput,
            upKeyTime: upKeyTimeInput,
            downKeyTime: downKeyTimeInput,
            leftKeyTime: leftKeyTimeInput,
            rightKeyTime: rightKeyTimeInput,
        },
        function () {
            console.log("Settings saved");
        }
    );
};

/**
 * Restores the voice command options from Chrome's storage. It retrieves the saved values for each voice command's
 * keybind and duration, updating the UI elements accordingly. If no value is found for a specific command, it sets
 * the input or select element to its default state.
 */
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
            "arrowUpTime",
            "arrowDownTime",
            "arrowLeftTime",
            "arrowRightTime",
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
            result.arrowUpTime == undefined || result.arrowUpTime == ""
                ? (arrowUpTime.value = 0)
                : (arrowUpTime.value = result.arrowUpTime);
            result.arrowDownTime == undefined || result.arrowDownTime == ""
                ? (arrowDownTime.value = 0)
                : (arrowDownTime.value = result.arrowDownTime);
            result.arrowLeftTime == undefined || result.arrowLeftTime == ""
                ? (arrowLeftTime.value = 0)
                : (arrowLeftTime.value = result.arrowLeftTime);
            result.arrowRightTime == undefined || result.arrowRightTime == ""
                ? (arrowRightTime.value = 0)
                : (arrowRightTime.value = result.arrowRightTime);
        }
    );
};

/**
 * Restores the eye control options from Chrome's storage. It retrieves the saved values for each eye control's
 * keybind and duration, updating the UI elements accordingly. If no value is found for a specific control, it sets
 * the select element to its default state and input values to 0. This ensures that the UI reflects the current
 * configuration stored in Chrome's storage.
 */
const restoreEyeOptions = () => {
    chrome.storage.sync.get(
        [
            "upKey",
            "downKey",
            "leftKey",
            "rightKey",
            "upKeyTime",
            "downKeyTime",
            "leftKeyTime",
            "rightKeyTime",
        ],
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
            result.rightKeyTime == undefined
                ? (rightKeyTime.value = 0)
                : (rightKeyTime.value = result.rightKeyTime);
            result.leftKeyTime == undefined
                ? (leftKeyTime.value = 0)
                : (leftKeyTime.value = result.leftKeyTime);
            result.downKeyTime == undefined
                ? (downKeyTime.value = 0)
                : (downKeyTime.value = result.downKeyTime);
            result.upKeyTime == undefined
                ? (upKeyTime.value = 0)
                : (upKeyTime.value = result.upKeyTime);
            dataArray = result;
        }
    );
};

/**
 * Refreshes the key settings by sending them to the content script.
 * This function is a wrapper around `sendSettingsContentScripts`,
 * abstracting the process of updating the settings in the content scripts.
 */
function refreshKeys() {
    sendSettingsContentScripts();
}

/**
 * On DOMContentLoaded, restores voice and eye control options from storage.
 */
document.addEventListener("DOMContentLoaded", restoreVoiceOptions);
document.addEventListener("DOMContentLoaded", restoreEyeOptions);

/* 
document.addEventListener("DOMContentLoaded", getVoiceSelectValues);
console.log(voiceKeyBindsArr);
*/

// input validation
//TODO

/**
 * Manages the visibility state of the webcam through UI buttons. On DOMContentLoaded, it initializes the visibility
 * of the webcam toggle buttons, showing the "webcam off" button and hiding the "webcam on" button by default.
 * Click events on these buttons toggle the visibility state of the webcam and update the UI to reflect this change.
 * The actual visibility of the webcam video canvas element is controlled by updating a visibility flag and calling
 * the `updateWebcamVisibility` function to apply the change.
 */
document.addEventListener("DOMContentLoaded", function () {
    // init visibility of buttons
    webcamOnButton.classList.add("hidden");
    webcamOffButton.classList.remove("hidden");

    // shows webcam on option button
    webcamOffButton.addEventListener("click", function () {
        webcamOffButton.classList.add("hidden");
        webcamOnButton.classList.remove("hidden");

        // updates webgazer's webcam video canvas element visibility flag
        isWebcamVisible = false;
        updateWebcamVisibility();
    });

    // show webcam off option button
    webcamOnButton.addEventListener("click", function () {
        webcamOnButton.classList.add("hidden");
        webcamOffButton.classList.remove("hidden");

        // updates webgazer's webcam video canvas element visibility flag
        isWebcamVisible = true;
        updateWebcamVisibility();
    });
});

/**
 * Manages the visibility state of the grid overlay through UI buttons. On DOMContentLoaded, it initializes the visibility
 * of the grid toggle buttons, showing the "grid off" button and hiding the "grid on" button by default.
 * Click events on these buttons toggle the visibility state of the grid overlay and update the UI to reflect this change.
 * The actual visibility of the grid overlay is controlled by updating a visibility flag and calling
 * the `updateGridVisibility` function to apply the change.
 */
document.addEventListener("DOMContentLoaded", function () {

    // init visibility of grid buttons
    gridOnButton.classList.add("hidden");
    gridOffButton.classList.remove("hidden");

    // do not show grid overlay
    gridOffButton.addEventListener("click", function () {
        gridOffButton.classList.add("hidden");
        gridOnButton.classList.remove("hidden");

        //update grid visibility
        isGridVisible = false;
        updateGridVisibility();
    });

    // show grid overlay
    gridOnButton.addEventListener("click", function () {
        gridOnButton.classList.add("hidden");
        gridOffButton.classList.remove("hidden");

        //update grid visibility
        isGridVisible = true;
        updateGridVisibility();
    });
});

/**
 * Sends the current voice key bindings array to the active tab's content script.
 */
function sendSettingsContentScripts() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {voiceKeyBindsArr: voiceKeyBindsArr});
    });
}

/**
 * Listens for messages of type "keybinds" and logs the received data.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "keybinds") {
        console.log("Received data:", message.dataArray);
    }
});

/** Function to send message to content script about current state of grid visibility */
function updateGridVisibility() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {isGridVisible: isGridVisible});
    });
}

/** Function to send message to content script about current state of webcam visibility */
function updateWebcamVisibility() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {isWebcamVisible: isWebcamVisible});
    });
}