/* ========================
   Mobile Menu
   ======================== */
function toggleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var btn = document.querySelector('.mobile-menu-btn');
    var isOpen = menu.classList.toggle('active');
    if (btn) btn.setAttribute('aria-expanded', isOpen);
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

    for (var i = 0; i < slides.length; i++) slides[i].style.display = 'none';
    for (var j = 0; j < dots.length; j++) dots[j].classList.remove('active');

    slides[slideIndex].style.display = 'block';
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

function nextSlide() { goToSlide(slideIndex + 1); }
function prevSlide() { goToSlide(slideIndex - 1); }

function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, 4500);
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
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event) event.stopPropagation();
    var lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

/* ========================
   Nav Scroll Effect
   ======================== */
function initNavScroll() {
    var nav = document.querySelector('nav');
    if (!nav) return;

    function checkScroll() {
        if (window.scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
}

/* ========================
   Scroll Reveal Animations
   ======================== */
function initScrollAnimations() {
    var targets = document.querySelectorAll('[data-animate], [data-animate-stagger]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
        targets.forEach(function (el) {
            el.classList.add('is-visible');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(function (el) {
        observer.observe(el);
    });
}

/* ========================
   Init
   ======================== */
document.addEventListener('DOMContentLoaded', function () {
    initSlider();
    initNavScroll();
    initScrollAnimations();

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });

    var yearEl = document.getElementById('copyright-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
