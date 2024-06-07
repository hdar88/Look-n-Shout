document.getElementById('toggle').addEventListener('change', function() {
    let inputContainerEyes = document.getElementById("input-container-eyes");
    let inputContainerVoice = document.getElementById("input-container-voice");
    if (this.checked) {
        document.querySelector('.slider').classList.add('checked');
        inputContainerEyes.classList.add('hidden');
        inputContainerVoice.classList.remove('hidden');
    } else {
        document.querySelector('.slider').classList.remove('checked');
        inputContainerEyes.classList.remove("hidden");
        inputContainerVoice.classList.add('hidden');
    }
});