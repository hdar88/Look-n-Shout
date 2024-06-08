document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    const inputContainerEyes = document.getElementById("input-container-eyes");
    const inputContainerVoice = document.getElementById("input-container-voice");

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
});