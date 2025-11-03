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
                alert('Unable to play audio. Please check if the file exists.');
            });
            playBtn.textContent = '⏸️ Pause Music';
            leprechaun.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    leprechaun.addEventListener('click', toggleAudio);
    playBtn.addEventListener('click', toggleAudio);

    audio.addEventListener('ended', function() {
        // Автоповтор благодаря loop
    });

    audio.addEventListener('pause', function() {
        if (isPlaying) {
            isPlaying = false;
            playBtn.textContent = '🎵 Play Music';
            leprechaun.classList.remove('playing');
        }
    });
});

// Функции для смены контента
function showMenu() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="page-content">
            <h1>Our Menu</h1>
            <div class="menu-section">
                <h2>🍺 Drinks</h2>
                <p>Guinness - €5.50</p>
                <p>Smithwick's - €5.00</p>
                <p>Jameson Whiskey - €6.00</p>
                
                <h2>🍴 Food</h2>
                <p>Irish Stew - €12.50</p>
                <p>Fish & Chips - €11.00</p>
                <p>Shepherd's Pie - €10.50</p>
            </div>
            <button class="action-btn" onclick="showHome()" style="margin-top: 30px;">
                ← Back to Home
            </button>
        </div>
    `;
}

function showBooking() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="page-content">
            <h1>Book a Table</h1>
            <div class="booking-form">
                <input type="text" placeholder="Your Name" class="form-input">
                <input type="email" placeholder="Email" class="form-input">
                <input type="date" class="form-input">
                <input type="time" class="form-input">
                <input type="number" placeholder="Number of Guests" class="form-input" min="1" max="10">
                <button class="action-btn" style="margin-top: 20px;">Book Now</button>
            </div>
            <button class="action-btn" onclick="showHome()" style="margin-top: 30px;">
                ← Back to Home
            </button>
        </div>
    `;
}

function showHome() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="leprechaun-section">
            <h2>Click the Leprechaun for some Irish magic!</h2>
            <div class="leprechaun-container">
                <img src="assets/images/leprikon1.jpg" alt="Lucky Leprechaun" 
                     class="leprechaun-img" id="leprechaun">
                <div class="audio-controls">
                    <button id="playBtn" class="music-btn">🎵 Play Music</button>
                    <span id="trackInfo">I'm shipping Up to Boston - Dropkick Murphys</span>
                </div>
            </div>
        </div>
        
        <nav class="action-buttons">
            <button class="action-btn" onclick="showMenu()">
                <span>🍺 Order Food & Drinks</span>
            </button>
            <button class="action-btn" onclick="showBooking()">
                <span>📅 Book a Table</span>
            </button>
        </nav>
    `;
    
    // Перепривязываем события после изменения DOM
    setTimeout(() => {
        const leprechaun = document.getElementById('leprechaun');
        const playBtn = document.getElementById('playBtn');
        const audio = document.getElementById('pubAudio');
        
        if (leprechaun && playBtn) {
            leprechaun.addEventListener('click', () => toggleAudio(audio, playBtn, leprechaun));
            playBtn.addEventListener('click', () => toggleAudio(audio, playBtn, leprechaun));
        }
    }, 100);
}

// Глобальная функция для управления аудио
function toggleAudio(audio, playBtn, leprechaun) {
    if (audio.paused) {
        audio.play().catch(error => {
            console.log('Audio play failed:', error);
        });
        playBtn.textContent = '⏸️ Pause Music';
        leprechaun.classList.add('playing');
    } else {
        audio.pause();
        playBtn.textContent = '🎵 Play Music';
        leprechaun.classList.remove('playing');
    }
}
