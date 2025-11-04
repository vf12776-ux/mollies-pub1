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
            });
            playBtn.textContent = '⏸️ Pause Music';
            leprechaun.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    leprechaun.addEventListener('click', toggleAudio);
    playBtn.addEventListener('click', toggleAudio);
});

// Функции навигации с полезной информацией
function showMenu() {
    alert(`🍺 Mollie's Pub Menu\n\n📞 Заказы и бронирование: +7 (XXX) XXX-XX-XX\n📍 Адрес: [ваш адрес]\n🕒 Часы работы: Пн-Вс 12:00-23:00\n\nПосетите нас, чтобы увидеть полное меню ирландской кухни и напитков! 🍀`);
}

function showBooking() {
    alert(`📅 Бронирование столика\n\n📞 Телефон: +7 (XXX) XXX-XX-XX\n💬 WhatsApp: +7 (XXX) XXX-XX-XX\n✉️ Email: info@molliespub.ru\n🕒 Часы работы: Пн-Вс 12:00-23:00\n\nЗвоните для бронирования столиков и мероприятий! 🎉`);
}

function showHome() {
    // Для кнопки Back
}

window.showMenu = showMenu;
window.showBooking = showBooking;
window.showHome = showHome;