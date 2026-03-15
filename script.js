let currentLang = 'es';

// Language toggling
function toggleLang() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    
    // Update button text
    document.getElementById('lang-btn').innerText = currentLang === 'es' ? 'EN' : 'ES';

    // Update all elements with data-es / data-en attributes
    const elements = document.querySelectorAll('[data-es][data-en]');
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${currentLang}`);
        if(el.hasAttribute('data-text')) {
            el.setAttribute('data-text', el.getAttribute(`data-${currentLang}`));
        }
    });

    // Update placeholders
    const inputs = document.querySelectorAll('[data-es-ph][data-en-ph]');
    inputs.forEach(input => {
        input.setAttribute('placeholder', input.getAttribute(`data-${currentLang}-ph`));
    });
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const target = document.getElementById(pageId);
    if(target) {
        target.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Countdown Timer
const countdownDate = new Date("May 2, 2026 17:00:00").getTime(); 

const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance <= 0) {
        clearInterval(timerInterval);
        const wrapper = document.getElementById("countdown-wrapper");
        if (wrapper) {
            wrapper.innerHTML = `
                <div style="font-size: 1.5rem; text-align: center; margin-top: 20px;">
                    <p class="neon-text" style="--neon-color: var(--neon-blue); font-weight: 800; font-size: 1.8rem;" data-es="¡Te estamos esperando en Curuchupa (Av. América, Quito 170129)!" data-en="We are waiting for you at Curuchupa (Av. América, Quito 170129)!">¡Te estamos esperando en Curuchupa (Av. América, Quito 170129)!</p>
                    <p style="margin-top: 15px; font-size: 1.2rem; color: #ccc;" data-es="Mantente atento a la próxima ubicación y nuevos DJs." data-en="Stay tuned for the next location and new DJs.">Mantente atento a la próxima ubicación y nuevos DJs.</p>
                </div>
            `;
            // Trigger translation update if not in default language
            if (currentLang !== 'es') {
                const elements = wrapper.querySelectorAll('[data-es][data-en]');
                elements.forEach(el => {
                    el.innerText = el.getAttribute(`data-${currentLang}`);
                });
            }
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
}, 1000);

// Initialize Particles.js
document.addEventListener("DOMContentLoaded", function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 40 },
                "color": { "value": ["#A855F7", "#00FF00", "#00E5FF"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "move": { "enable": true, "speed": 1.5, "direction": "top" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "repulse" } }
            }
        });
    }
});
