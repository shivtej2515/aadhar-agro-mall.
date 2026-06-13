/* ============================================
   AADHAR AGRO MALL - script.js
   ============================================ */

/* --- Hamburger / Mobile Nav --- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

/* --- Scroll Reveal --- */
function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const windowHeight = window.innerHeight;

  elements.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      setTimeout(() => el.classList.add('visible'), i * 60);
    }
  });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);

/* --- Active nav link on scroll --- */
const sections = document.querySelectorAll('section[id], #hero');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });

/* --- Navbar shadow on scroll --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
  } else {
    navbar.style.boxShadow = '';
  }
}, { passive: true });

/* --- Contact Form --- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      contactForm.reset();
      if (formSuccess) {
        formSuccess.style.display = 'block';
        setTimeout(() => { formSuccess.style.display = 'none'; }, 4000);
      }
    }, 1200);
  });
}

/* --- Stagger delay for grid cards --- */
document.querySelectorAll('.products-grid .product-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 80) + 'ms';
});
document.querySelectorAll('.why-grid .why-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 70) + 'ms';
});
document.querySelectorAll('.services-grid .service-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 70) + 'ms';
});

/* --- Number counter animation --- */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 16);
}

const counters = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

counters.forEach(c => counterObserver.observe(c));
