const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dotsWrap = document.getElementById('heroDots');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
const yearTarget = document.getElementById('year');

let currentSlide = 0;
let sliderTimer = null;
const slideDelay = 6500;

function setYear() {
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
}

function closeNav() {
  if (!siteNav || !navToggle) return;
  siteNav.classList.remove('is-open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function toggleNav() {
  if (!siteNav || !navToggle) return;
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

function buildDots() {
  if (!dotsWrap || !slides.length) return;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(index);
      restartAutoplay();
    });
    dotsWrap.appendChild(dot);
  });
}

function updateSlider() {
  const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

  slides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('is-active', index === currentSlide);
  });
}

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  updateSlider();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function startAutoplay() {
  if (!slides.length) return;
  sliderTimer = window.setInterval(nextSlide, slideDelay);
}

function restartAutoplay() {
  window.clearInterval(sliderTimer);
  startAutoplay();
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeNav();
  }
}

function initEvents() {
  if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
  }

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', handleEscape);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) {
      closeNav();
    }
  });

  const slider = document.getElementById('heroSlider');
  if (slider) {
    slider.addEventListener('mouseenter', () => window.clearInterval(sliderTimer));
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('touchstart', () => window.clearInterval(sliderTimer), { passive: true });
    slider.addEventListener('touchend', startAutoplay, { passive: true });
  }
}

function init() {
  setYear();
  buildDots();
  updateSlider();
  initEvents();
  startAutoplay();
}

init();
