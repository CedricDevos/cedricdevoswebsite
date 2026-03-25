/* ============================================================
   Cedric Devos — script.js
   ============================================================ */

/* ── Navbar scroll effect ──────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile menu ────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

/* ── Intersection Observer — fade-up & timeline ──────────────── */
const fadeEls = document.querySelectorAll('.fade-up, .tl-entry');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.classList.contains('tl-entry')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 120
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ── Bar chart animation ─────────────────────────────────────── */
const bars = document.querySelectorAll('.bar-fill');
const barChart = document.getElementById('barChart');
let barsAnimated = false;

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !barsAnimated) {
      barsAnimated = true;
      bars.forEach((bar, i) => {
        const w = bar.getAttribute('data-w');
        setTimeout(() => {
          bar.style.width = w + '%';
        }, i * 100);
      });
      barObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

if (barChart) barObserver.observe(barChart);

/* ── Publications filter ─────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.pub-filter-btn');
const pubItems = document.querySelectorAll('.pub-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    pubItems.forEach(item => {
      if (filter === 'all') {
        item.style.display = 'grid';
      } else {
        const tags = item.getAttribute('data-tags') || '';
        item.style.display = tags.includes(filter) ? 'grid' : 'none';
      }
    });
  });
});

/* ── Contact form ────────────────────────────────────────────── */
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const femail = document.getElementById('femail').value.trim();
  const fmessage = document.getElementById('fmessage').value.trim();

  if (!fname || !femail || !fmessage) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  // In production: replace this block with your form backend or mailto link
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

/* ── Smooth scroll for anchor links ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Active nav link on scroll ───────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--navy)' : '';
  });
});
