document.addEventListener("DOMContentLoaded", function () {
    var audios = document.querySelectorAll("audio");
    var buyLinks = document.querySelectorAll("a[target='_blank']"); // Targeting links that open in a new tab/window

    function pauseOtherAudios({ target }) {
        for (var audio of audios) {
            if (audio !== target) {
                audio.pause();
                audio.currentTime = 0; // Reset to start
            }
        }
    }

    function playNextAudio({ target }) {
        var index = Array.from(audios).indexOf(target); // Find the index of the current audio
        if (index >= 0 && index < audios.length - 1) {
            audios[index + 1].play(); // Play the next audio
        }
    }

    function stopAllAudios() {
        // Pause all audios and reset to start when the link is clicked
        for (var audio of audios) {
            audio.pause();
            audio.currentTime = 0; // Reset to start
        }
    }

    // Add event listeners to audio elements for play and ended events
    for (const audio of audios) {
        audio.addEventListener("play", pauseOtherAudios);
        audio.addEventListener("ended", playNextAudio);
    }

    // Add an event listener to buy links to stop all audios when clicked
    for (const link of buyLinks) {
        link.addEventListener("click", stopAllAudios);
    }
});
