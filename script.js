// ---- Mobile Menu ----
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.querySelector('.mobile-menu-btn');
    menu.classList.toggle('active');
    btn.setAttribute('aria-expanded', menu.classList.contains('active'));
}

// ---- Image Slider ----
let currentSlide = 0;
let slides, dots;
let autoplayTimer;

function initSlider() {
    slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    if (!slides.length || !dotsContainer) return;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(i); });
        dotsContainer.appendChild(dot);
    });

    dots = document.querySelectorAll('.slider-dots .dot');
    if (!slides[0].classList.contains('active')) slides[0].classList.add('active');
    startAutoplay();
}

function goToSlide(n) {
    if (!slides || !slides.length) return;
    slides[currentSlide].classList.remove('active');
    if (dots && dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = ((n % slides.length) + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (dots && dots[currentSlide]) dots[currentSlide].classList.add('active');
    resetAutoplay();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoplay() { autoplayTimer = setInterval(nextSlide, 5000); }
function resetAutoplay() { clearInterval(autoplayTimer); startAutoplay(); }

// ---- Lightbox ----
function openLightbox(slideEl) {
    const img = slideEl.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!img || !lightbox || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    if (e) e.stopPropagation();
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    // Copyright year
    const yr = document.getElementById('copyright-year');
    if (yr) yr.textContent = new Date().getFullYear();

    // Slider
    initSlider();

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('mobile-menu');
        const btn = document.querySelector('.mobile-menu-btn');
        if (menu && btn && menu.classList.contains('active') &&
            !menu.contains(e.target) && !btn.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Escape key closes lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});
