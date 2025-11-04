document.addEventListener('DOMContentLoaded', function() {
    const leprechaun = document.getElementById('leprechaun');
    const playBtn = document.getElementById('playBtn');
    const audio = document.getElementById('pubAudio');
    let isPlaying = false;

    // Данные меню и столиков
    let menuData = {};
    let tablesData = {};

    // Загрузка данных из JSON файлов
    async function loadAppData() {
        try {
            const [menuResponse, tablesResponse] = await Promise.all([
                fetch('data/menu.json'),
                fetch('data/tables.json')
            ]);
            
            menuData = await menuResponse.json();
            tablesData = await tablesResponse.json();
            
            console.log('Data loaded successfully');
        } catch (error) {
            console.log('Error loading data, using defaults:', error);
            useDefaultData();
        }
    }

    // Резервные данные если файлы не загрузились
    function useDefaultData() {
        menuData = {
            lastUpdated: "2024-11-04",
            drinks: [
                {name: "Guinness", price: "€5.50", available: true},
                {name: "Smithwick's", price: "€5.00", available: true}
            ],
            food: [
                {name: "Irish Stew", price: "€12.50", available: true},
                {name: "Fish & Chips", price: "€11.00", available: true}
            ]
        };
        
        tablesData = {
            lastUpdated: "2024-11-04",
            available: 5,
            total: 12,
            nextAvailable: "20:00"
        };
    }

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
        // Автоповтор благодаря loop
    });

    audio.addEventListener('pause', function() {
        if (isPlaying) {
            isPlaying = false;
            playBtn.textContent = '🎵 Play Music';
            leprechaun.classList.remove('playing');
        }
    });

    // Загружаем данные при старте
    loadAppData();
});

// Функции навигации
function showMenu() {
    const mainContent = document.getElementById('main-content');
    
    // Используем menuData из DOMContentLoaded
    const menuData = window.menuData || {
        lastUpdated: "2024-11-04",
        drinks: [
            {name: "Guinness", price: "€5.50", available: true},
            {name: "Smithwick's", price: "€5.00", available: true}
        ],
        food: [
            {name: "Irish Stew", price: "€12.50", available: true},
            {name: "Fish & Chips", price: "€11.00", available: true}
        ]
    };
    
    let menuHTML = `
        <div class="page-content">
            <h1>Our Menu</h1>
            <div class="menu-section">
                <h2>🍺 Drinks</h2>
    `;
    
    menuData.drinks.forEach(item => {
        const status = item.available ? '' : ' (Sold Out)';
        const soldOutClass = item.available ? '' : 'sold-out';
        menuHTML += `<p class="${soldOutClass}"><strong>${item.name}</strong> - ${item.price}${status}</p>`;
    });
    
    menuHTML += `<h2>🍴 Food</h2>`;
    
    menuData.food.forEach(item => {
        const status = item.available ? '' : ' (Sold Out)';
        const soldOutClass = item.available ? '' : 'sold-out';
        menuHTML += `<p class="${soldOutClass}"><strong>${item.name}</strong> - ${item.price}${status}</p>`;
    });
    
    menuHTML += `
            </div>
            <p class="update-info">Last updated: ${menuData.lastUpdated}</p>
            <button class="action-btn" onclick="showHome()">← Back to Home</button>
        </div>
    `;
    
    mainContent.innerHTML = menuHTML;
}

function showBooking() {
    const mainContent = document.getElementById('main-content');
    
    // Используем tablesData из DOMContentLoaded
    const tablesData = window.tablesData || {
        lastUpdated: "2024-11-04",
        available: 5,
        total: 12,
        nextAvailable: "20:00"
    };
    
    let bookingHTML = `
        <div class="page-content">
            <h1>Book a Table</h1>
            <div class="booking-form">
                <div class="availability-info">
                    <h3>📊 Table Availability</h3>
                    <p><strong>${tablesData.available}/${tablesData.total}</strong> tables available</p>
    `;
    
    if (tablesData.available === 0) {
        bookingHTML += `<p class="next-available">Next available: ${tablesData.nextAvailable}</p>`;
    } else {
        bookingHTML += '<p class="available-now">✅ Tables available now!</p>';
    }
    
    bookingHTML += `
                </div>
                
                <input type="text" placeholder="Your Name" class="form-input" required>
                <input type="tel" placeholder="Phone Number" class="form-input" required>
                <input type="date" class="form-input" required>
                
                <select class="form-input" required>
                    <option value="">Select Time</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                </select>
                
                <select class="form-input" required>
                    <option value="">Number of Guests</option>
                    <option value="1-2">1-2 people</option>
                    <option value="3-4">3-4 people</option>
                    <option value="5-6">5-6 people</option>
                    <option value="7+">7+ people</option>
                </select>
                
                <button class="action-btn" onclick="submitBooking()">Book Table</button>
            </div>
            <p class="update-info">Last updated: ${tablesData.lastUpdated}</p>
            <button class="action-btn" onclick="showHome()">← Back to Home</button>
        </div>
    `;
    
    mainContent.innerHTML = bookingHTML;
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
            leprechaun.addEventListener('click', () => toggleAudio());
            playBtn.addEventListener('click', () => toggleAudio());
        }
    }, 100);
}

function submitBooking() {
    alert('Thank you for your booking request! We will contact you shortly to confirm.');
    showHome();
}

// Делаем функции глобальными
window.showMenu = showMenu;
window.showBooking = showBooking;
window.showHome = showHome;
window.submitBooking = submitBooking;