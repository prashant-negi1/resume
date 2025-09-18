// Basic interactive behavior: mobile nav toggle, scroll-active nav, fade-in on scroll, simple form handling

document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  toggle?.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  // scroll spy -> add .active to nav links when section in view
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));

  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.45 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const idx = sections.indexOf(entry.target);
      if (idx === -1) return;
      navLinks.forEach(l => l.classList.remove('active'));
      if (entry.isIntersecting) navLinks[idx].classList.add('active');
    });
  }, observerOptions);

  sections.forEach(sec => sec && sectionObserver.observe(sec));

  // Fade-in on scroll for elements with .fade
  const fades = document.querySelectorAll('.fade');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        fadeObserver.unobserve(e.target); // one-time reveal
      }
    });
  }, { threshold: 0.15 });
  fades.forEach(el => fadeObserver.observe(el));

  // Simple contact form handler (client-side only)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMsg.hidden = false;
      formMsg.textContent = 'Please fill all fields.';
      formMsg.style.color = 'crimson';
      return;
    }

    // Fake submission — replace with real API endpoint or email service later
    formMsg.hidden = false;
    formMsg.style.color = 'green';
    formMsg.textContent = 'Thanks — message received (demo).';
    form.reset();
  });
});
