// Get references to the toggle switch and header text
const toggleSwitch = document.getElementById('toggleSwitch');
const headerText = document.getElementById('headerText');

// Add event listener to toggle switch
toggleSwitch.addEventListener('change', function() {
    // Toggle the header text based on the toggle switch state
    if (toggleSwitch.checked) {
        headerText.textContent = 'Play w/ voice';
    } else {
        headerText.textContent = 'Play w/ eyes';
    }
});