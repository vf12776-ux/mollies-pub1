document.addEventListener('DOMContentLoaded', function() {
    const leprechaun = document.getElementById('leprechaun');
    const playBtn = document.getElementById('playBtn');
    const audio = document.getElementById('pubAudio');
    let isPlaying = false;

    function toggleAudio() {
        if (isPlaying) {
            audio.pause();
            playBtn.textContent = '🎵 Play Music';
            leprechaun.classList.remove('playing');
        } else {
            audio.play().catch(error => {
                console.log('Audio play failed:', error);
                alert('Unable to play audio. Please check if the file exists and your browser supports OPUS format.');
            });
            playBtn.textContent = '⏸️ Pause Music';
            leprechaun.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    leprechaun.addEventListener('click', toggleAudio);
    playBtn.addEventListener('click', toggleAudio);

    audio.addEventListener('ended', function() {
        isPlaying = false;
        playBtn.textContent = '🎵 Play Music';
        leprechaun.classList.remove('playing');
    });

    audio.addEventListener('pause', function() {
        if (isPlaying) {
            isPlaying = false;
            playBtn.textContent = '🎵 Play Music';
            leprechaun.classList.remove('playing');
        }
    });
});
