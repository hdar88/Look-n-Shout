const toggle = document.getElementById('toggle');
const inputContainerEyes = document.getElementById("input-container-eyes");
const inputContainerVoice = document.getElementById("input-container-voice");
const restartButton = document.getElementById('restart-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const saveButton = document.getElementById('save-button');

//TODO define webgazer object
//TODO define webspeech object

// switch between eyes and voice pop up content
document.addEventListener('DOMContentLoaded', function() {
    // Initialize input-container-eyes as visible
    inputContainerEyes.classList.remove('hidden');

    toggle.addEventListener('change', function () {
        if (this.checked) {
            document.querySelector('.slider').classList.add('checked');
            inputContainerEyes.classList.add('hidden');
            inputContainerVoice.classList.remove('hidden');
        } else {
            document.querySelector('.slider').classList.remove('checked');
            inputContainerEyes.classList.remove('hidden');
            inputContainerVoice.classList.add('hidden');
        }
    });
});
//Pause - Start button to pause/ restart eye gaze or voice tracking
// switch between pause and start icon
document.addEventListener('DOMContentLoaded', function() {

    // init visibility of buttons
    restartButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');

    // switch between pause and start icons when clicking
    pauseButton.addEventListener('click', function () {
        pauseButton.classList.add('hidden');
        restartButton.classList.remove('hidden');
        /*if (toggle.checked) {
             webspeech recognition stop
        }
        else webgazer stop*/
    })
    restartButton.addEventListener('click', function () {
        restartButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
        /* if checked
        webspeech recognition restart
        else
        webgazer restart
         */
    })
});

// Reset button: clear the visible content inside the input fields and (maybe also saved key assignments)
resetButton.addEventListener('click', function() {
    let allEmpty = true;

    if (toggle.checked && inputContainerEyes.classList.contains('hidden')) {
        // Reset voice container input fields
        allEmpty = checkAndReset(inputContainerVoice);
    } else if(inputContainerVoice.classList.contains('hidden')) {
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
    container.querySelectorAll('input').forEach(input => {
        if (input.value !== '') {
            allEmpty = false;
        }
        input.value = '';
        input.placeholder = input.dataset.placeholder;
    });
    return allEmpty;
};

// Store default state of input fields
const storeDefaultInputFields = (container) => {
    container.querySelectorAll('input').forEach(input => {
        input.dataset.placeholder = input.placeholder;
    });
};
storeDefaultInputFields(inputContainerEyes);
storeDefaultInputFields(inputContainerVoice);

//help page -> whole description of the functionality of our extension
//TODO leonard

// save button -> chrome.storage API -> get User Input
//TODO oqba
