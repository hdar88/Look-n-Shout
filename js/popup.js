// switch between eyes and voice pop up content
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    const inputContainerEyes = document.getElementById("input-container-eyes");
    const inputContainerVoice = document.getElementById("input-container-voice");
    const restartButton = document.getElementById('restart-button');
    const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');

    // Initialize input-container-eyes as visible
    inputContainerEyes.classList.remove('hidden');

    toggle.addEventListener('change', function() {
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

// Reset button: clear the visible content inside the input fields and (maybe also saved key assignments)
//TODO weram
    resetButton.addEventListener('click', function() {
        //clear input fields
    })

//Pause - Start button to pause/ restart eye gaze or voice tracking
// switch between pause and start icon

    // init visibility of buttons
    restartButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');

    // switch between pause and start icons when clicking
    pauseButton.addEventListener('click', function () {
        pauseButton.classList.add('hidden');
        restartButton.classList.remove('hidden');
        if (toggle.checked) {

        }
    })
    restartButton.addEventListener('click', function () {
        restartButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
    })
});

//help page -> whole description of the functionality of our extension
//TODO leonard

// save button -> chrome.storage API -> get User Input
//TODO oqba
