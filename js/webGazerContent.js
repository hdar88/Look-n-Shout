document.addEventListener("DOMContentLoaded", function () {
  alert(
    "Please calibrate the gaze tracker for a few seconds by clicking into or hovering over the the grid fields." +
      "You can turn off the grid in the extensions popup! Happy Gaming! :)"
  );
});

// load grid overlay initially for calibration
fetchBoundaries(true);

let dataArrayWebgazer = [];

// Load WebGazer initially
const loadWebGazer = () => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("WebGazer-master/www/webgazer.js");
  script.onload = () => {
    const gazeScript = document.createElement("script");
    gazeScript.src = chrome.runtime.getURL("js/WebGazerWrapper.js");
    document.body.appendChild(gazeScript);
  };
  document.body.appendChild(script);
};
loadWebGazer();

// Listener for messages regarding webcam visibility from popup.js
chrome.runtime.onMessage.addListener(function (message) {
    if (message.isWebcamVisible !== undefined) {
        console.log('isWebcamVisible content: ', message.isWebcamVisible);

        // pushes the current state of webcam visibility flag to webgazer wrapper
        // for executing action on webcam video canvas element of webgazer
        window.postMessage({ type: 'TOGGLE_WEBCAM', isWebcamVisible: message.isWebcamVisible }, '*');
    }
});

// Event listener for messages regarding grid visibility button clicks
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.isGridVisible !== undefined) {
    const gridOverlay = document.getElementById("gridId");
    if (!gridOverlay) {
      fetchBoundaries(message.isGridVisible);
    } else {
      setBoundaryVisibility(message.isGridVisible);
    }
  }
});

// Function to fetch boundaries.html
function fetchBoundaries(isVisible) {
  fetch(chrome.runtime.getURL("boundaries.html"))
    .then((response) => response.text())
    .then((html) => {
      const div = document.createElement("div");
      div.innerHTML = html;
      div.id = "gridId"; // grid id to remove boundaries.html when grid-off button clicked
      document.body.appendChild(div);
      setBoundaryVisibility(isVisible);
    })
    .catch((err) => {
      console.warn("Error loading boundaries.html:", err);
    });
}

const restoreEyeOptions = () => {
  chrome.storage.sync.get(
    ["upKey", "downKey", "leftKey", "rightKey"],
    function (result) {
        dataArrayWebgazer = result;

      window.postMessage(
        {
          type: "keybinds_eyes",
          dataArrayWebgazer: dataArrayWebgazer, // Ensure this is the actual data array
        },
        "*"
      );
    }
  );
};
setTimeout(restoreEyeOptions, 100);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    restoreEyeOptions();
});


// Function to set boundary visibility
function setBoundaryVisibility(isVisible) {
  const gridOverlay = document.getElementById("gridId");
  if (gridOverlay) {
    const boundaries = gridOverlay.getElementsByClassName("boundary");
    Array.from(boundaries).forEach((boundary) => {
      if (isVisible) {
        boundary.style.backgroundColor = "rgba(222, 222, 222, 0.2)";
      } else {
        boundary.style.backgroundColor = "rgba(222, 222, 222, 0.0)"; // Fully transparent
      }
    });
  }
}
