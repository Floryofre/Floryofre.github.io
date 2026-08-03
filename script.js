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

// =============================================
// Formulario de contacto
// =============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const statusEl = document.getElementById('cf-status');
  const submitBtn = document.getElementById('cf-submit');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Guarda de seguridad: si en algún momento se borra o rompe el endpoint
    // de Formspree en index.html, avisamos en vez de intentar un envío que va a fallar.
    const endpoint = contactForm.getAttribute('action') || '';
    const isConfigured = endpoint.startsWith('https://formspree.io/f/');

    if (!isConfigured) {
      statusEl.textContent = 'Este formulario todavía no está conectado a un servicio de envío (falta configurar el endpoint de Formspree en index.html).';
      statusEl.className = 'form-status form-status-info';
      return;
    }

    // Deshabilita el botón e indica que el envío está en curso
    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');
    statusEl.textContent = 'Enviando…';
    statusEl.className = 'form-status form-status-info';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        // Éxito: mensaje de confirmación + limpieza de los campos
        statusEl.textContent = 'Mensaje enviado. ¡Gracias por escribir! Te voy a responder a la brevedad.';
        statusEl.className = 'form-status form-status-success';
        contactForm.reset();
      } else {
        throw new Error('Respuesta no exitosa del servidor');
      }
    } catch (error) {
      // Error de red o de Formspree: mensaje de error + alternativa de contacto
      statusEl.textContent = 'Hubo un error al enviar el mensaje. Mientras tanto, podés escribirme directamente por email.';
      statusEl.className = 'form-status form-status-error';
    } finally {
      // Vuelve a habilitar el botón siempre, haya éxito o error
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
    }
  });
}
