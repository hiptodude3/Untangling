/* ========================
   Mobile Menu
   ======================== */
function toggleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var btn = document.querySelector('.mobile-menu-btn');
    var isOpen = menu.classList.toggle('active');
    if (btn) {
        btn.setAttribute('aria-expanded', isOpen);
    }
}

/* ========================
   Image Slider
   ======================== */
var slideIndex = 0;
var slideInterval;

function initSlider() {
    var slides = document.querySelectorAll('.slide');
    var dotsContainer = document.querySelector('.slider-dots');
    var container = document.querySelector('.slider-container');

    if (!slides.length || !dotsContainer) return;

    // Build dot buttons
    for (var i = 0; i < slides.length; i++) {
        var dot = document.createElement('button');
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.dataset.index = i;
        dot.addEventListener('click', function () {
            goToSlide(parseInt(this.dataset.index));
        });
        dotsContainer.appendChild(dot);
    }

    goToSlide(0);
    startAutoPlay();

    // Pause on hover
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
}

function goToSlide(index) {
    var slides = document.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.slider-dot');

    if (!slides.length) return;

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    slideIndex = index;

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (var j = 0; j < dots.length; j++) {
        dots[j].classList.remove('active');
    }

    slides[slideIndex].style.display = 'block';
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

function nextSlide() {
    goToSlide(slideIndex + 1);
}

function prevSlide() {
    goToSlide(slideIndex - 1);
}

function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
    clearInterval(slideInterval);
}

/* ========================
   Lightbox
   ======================== */
function openLightbox(element) {
    var imgSrc = element.querySelector('img').src;
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
}

function closeLightbox(event) {
    if (event) event.stopPropagation();
    var lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
}

/* ========================
   Init on DOM Ready
   ======================== */
document.addEventListener('DOMContentLoaded', function () {
    // Slider
    initSlider();

    // Lightbox keyboard support
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Dynamic copyright year
    var yearEl = document.getElementById('copyright-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
