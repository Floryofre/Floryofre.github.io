// =============================================
// Menú móvil
// =============================================
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Cierra el menú al elegir una sección (útil en mobile)
  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// =============================================
// Resaltar el link activo según la sección visible
// =============================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.style.color = link.getAttribute('href') === `#${id}`
              ? 'var(--paper)'
              : 'var(--muted)';
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// =============================================
// Año dinámico en el footer
// =============================================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
