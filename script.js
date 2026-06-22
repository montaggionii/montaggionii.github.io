const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-profile-photo]').forEach((image) => {
  const showFallback = () => {
    image.hidden = true;
    image.parentElement.classList.add('profile-photo-fallback');
  };
  const profileSource = image.dataset.profileSrc;
  const probe = new Image();

  probe.addEventListener('load', () => {
    image.src = profileSource;
    image.hidden = false;
    image.parentElement.classList.remove('profile-photo-fallback');
  }, { once: true });
  probe.addEventListener('error', showFallback, { once: true });
  probe.src = profileSource;
});

document.querySelectorAll('[data-cv-download]').forEach((link) => link.addEventListener('click', async (event) => {
  event.preventDefault();
  const href = link.href;
  const startDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = href;
    downloadLink.download = 'Anthony_Montaggioni_CV.png';
    document.body.append(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  };

  if (window.location.protocol === 'file:') {
    startDownload();
    return;
  }

  try {
    const response = await fetch(href, { method: 'HEAD' });
    if (!response.ok) throw new Error('CV unavailable');
    startDownload();
  } catch {
    window.alert('El CV no está disponible temporalmente. Puedes contactar por email o visitar el perfil de GitHub.');
  }
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const projects = {
  valenruta: {
    index: '01 / FULL STACK', title: 'ValenRuta',
    description: 'Plataforma de movilidad compartida que conecta conductores y pasajeros para publicar, encontrar y reservar viajes.',
    features: ['Registro y autenticación de usuarios', 'Gestión de vehículos y publicación de viajes', 'Reserva de plazas y control de permisos', 'Validaciones de negocio en backend'],
    tags: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'JWT']
  },
  fidelyapp: {
    index: '02 / MOBILE & WEB', title: 'FidelyApp',
    description: 'Sistema de fidelización para restauración basado en experiencias sencillas de usar y valiosas para los negocios locales.',
    features: ['Sistema de puntos y recompensas', 'QR de identificación de usuario', 'Promociones y canje de beneficios', 'Geolocalización de restaurantes'],
    tags: ['Spring Boot', 'Angular/Ionic', 'MySQL']
  },
  santopecado: {
    index: '03 / WEB APP', title: 'Santo Pecado Web',
    description: 'Aplicación de reservas y operación de eventos sociales que digitaliza el control de asistentes de principio a fin.',
    features: ['Reservas online', 'Panel administrativo', 'Gestión y confirmación de asistentes', 'Estadísticas básicas de eventos'],
    tags: ['Angular', 'Firebase', 'Bootstrap']
  },
  photostudio: {
    index: '04 / AUTOMATION', title: 'Automatización IA para Photo Studio',
    description: 'Ecosistema de automatización para reducir tareas manuales y conectar canales de negocio, contenido e inteligencia artificial.',
    features: ['Flujos internos automatizados con n8n', 'Integración de APIs y herramientas externas', 'Agentes de voz basados en IA', 'Generación de contenido y conexión con CRM'],
    tags: ['n8n', 'OpenAI', 'APIs', 'WhatsApp Business API', 'CRM']
  }
};

const modal = document.querySelector('#project-modal');
let modalTrigger = null;
const fillModal = (project) => {
  modal.querySelector('.modal-index').textContent = project.index;
  modal.querySelector('#modal-title').textContent = project.title;
  modal.querySelector('.modal-description').textContent = project.description;
  modal.querySelector('.modal-features').innerHTML = project.features.map((feature) => `<li>${feature}</li>`).join('');
  modal.querySelector('.modal-tags').innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
};
document.querySelectorAll('.project-detail').forEach((button) => button.addEventListener('click', () => {
  if (!button.dataset.project) return;
  modalTrigger = button;
  fillModal(projects[button.dataset.project]);
  modal.showModal();
}));
modal.addEventListener('close', () => modalTrigger?.focus());
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const { name, email, message } = Object.fromEntries(new FormData(form));
  const status = form.querySelector('.form-status');
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.querySelectorAll('input, textarea').forEach((field) => field.removeAttribute('aria-invalid'));
  if (!name.trim() || !email.trim() || !message.trim()) {
    status.textContent = 'Completa nombre, email y mensaje para continuar.';
    status.classList.add('form-error');
    const firstInvalid = [...form.querySelectorAll('input, textarea')].find((field) => !field.value.trim());
    firstInvalid?.setAttribute('aria-invalid', 'true');
    firstInvalid?.focus();
    return;
  }
  if (!emailFormat.test(email.trim())) {
    status.textContent = 'Introduce un email válido, por ejemplo nombre@empresa.com.';
    status.classList.add('form-error');
    form.elements.email.setAttribute('aria-invalid', 'true');
    form.elements.email.focus();
    return;
  }

  const subject = encodeURIComponent(`Contacto desde el portfolio — ${name}`);
  const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`);
  status.classList.remove('form-error');
  status.textContent = 'Abriendo tu cliente de correo con el mensaje preparado…';
  window.location.href = `mailto:montaggioni29@gmail.com?subject=${subject}&body=${body}`;
});
