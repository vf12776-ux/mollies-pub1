document.addEventListener('DOMContentLoaded', function() {
    const leprechaun = document.getElementById('leprechaun');
    const playBtn = document.getElementById('playBtn');
    const audio = document.getElementById('pubAudio');
    let isPlaying = false;

    // Управление аудио
    function toggleAudio() {
        if (isPlaying) {
            audio.pause();
            playBtn.textContent = '🎵 Play Music';
            leprechaun.classList.remove('playing');
        } else {
            audio.play().catch(error => {
                console.log('Audio play failed:', error);
                alert('Unable to play audio. Please check if the file exists.');
            });
            playBtn.textContent = '⏸️ Pause Music';
            leprechaun.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    // События аудио
    leprechaun.addEventListener('click', toggleAudio);
    playBtn.addEventListener('click', toggleAudio);

    audio.addEventListener('ended', function() {
        // Автоповтор
    });

    audio.addEventListener('pause', function() {
        if (isPlaying) {
            isPlaying = false;
            playBtn.textContent = '🎵 Play Music';
            leprechaun.classList.remove('playing');
        }
    });
});

// Функции навигации - ПЕРЕНАПРАВЛЕНИЕ НА РЕАЛЬНЫЙ САЙТ
function showMenu() {
    window.open('https://molliespub.ru/menu', '_blank');
}

function showBooking() {
    window.open('https://molliespub.ru/booking', '_blank');
}

// Функция возврата на главную (остаётся для навигации внутри приложения)
function showHome() {
    // Эта функция уже есть в index.html, оставляем пустой или можем убрать
}

function submitBooking() {
    // Теперь не нужна, так как перенаправляем на реальную систему
}

// Делаем функции глобальными
window.showMenu = showMenu;
window.showBooking = showBooking;
window.showHome = showHome;
window.submitBooking = submitBooking;