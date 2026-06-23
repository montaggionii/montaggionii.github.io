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
    index: '02 / FULL STACK · EN DOCUMENTACIÓN', title: 'ValenRuta',
    description: 'Proyecto de movilidad compartida orientado a publicar viajes, localizar plazas y gestionar reservas entre conductores y pasajeros.',
    features: ['Registro y autenticación de usuarios', 'Gestión de vehículos y publicación de viajes', 'Reserva de plazas y control de permisos', 'Validaciones de negocio en backend'],
    tags: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'JWT'], status: 'Resumen técnico documentado', evidence: 'Repositorio, demo y caso de estudio ampliado pendientes de publicación.', scopeLabel: 'Funcionalidades documentadas'
  },
  santopecado: {
    index: '08 / WEB APP · EN DOCUMENTACIÓN', title: 'Santo Pecado Web',
    description: 'Proyecto web para centralizar reservas y gestión de asistentes de eventos sociales mediante una interfaz administrativa.',
    features: ['Reservas online', 'Panel administrativo', 'Gestión y confirmación de asistentes', 'Estadísticas básicas de eventos'],
    tags: ['Angular', 'Firebase', 'Bootstrap'], status: 'Resumen técnico documentado', evidence: 'Repositorio, demo, capturas y caso de estudio ampliado pendientes de publicación.', scopeLabel: 'Funcionalidades documentadas'
  },
  photostudio: {
    index: '03 / AUTOMATION · EXPERIENCIA PROFESIONAL', title: 'Automatización IA para Photo Studio',
    description: 'Trabajo aplicado a la automatización de procesos internos, conexiones entre herramientas de negocio y asistencia mediante IA.',
    features: ['Flujos internos automatizados con n8n', 'Integración de APIs y herramientas externas', 'Agentes de voz basados en IA', 'Generación de contenido y conexión con CRM'],
    tags: ['n8n', 'OpenAI', 'APIs', 'WhatsApp Business API', 'CRM'], status: 'Experiencia profesional · evidencia pública limitada', evidence: 'No se muestra código, demo ni datos de cliente para preservar la confidencialidad.', scopeLabel: 'Áreas de trabajo descritas'
  },
  authlab: {
    index: '04 / SECURITY · LABORATORIO EN DESARROLLO', title: 'Secure Authentication Lab',
    description: 'Laboratorio técnico propuesto para demostrar autenticación, autorización por roles y protección de endpoints en una API.',
    features: ['Implementar login con JWT y refresh tokens', 'Definir roles y permisos de acceso', 'Proteger endpoints con Spring Security', 'Documentar pruebas y ejecución con Docker'],
    tags: ['Spring Boot', 'Spring Security', 'JWT', 'Angular', 'Docker'], status: 'Alcance propuesto · sin MVP publicado', evidence: 'No representa una funcionalidad terminada. El repositorio se añadirá cuando exista un MVP verificable.', scopeLabel: 'Alcance previsto'
  },
  apimonitor: {
    index: '05 / BACKEND · PROYECTO PERSONAL MVP', title: 'API Monitoring Center',
    description: 'Proyecto personal propuesto para supervisar disponibilidad, latencia y errores de APIs mediante checks programados.',
    features: ['Programar comprobaciones de disponibilidad', 'Registrar latencia y códigos de respuesta', 'Persistir resultados para consulta histórica', 'Presentar un panel de observabilidad'],
    tags: ['Spring Boot', 'Angular', 'Docker', 'MySQL', 'API REST'], status: 'MVP propuesto · sin implementación pública', evidence: 'Se publicará al disponer de checks, persistencia, panel y documentación técnica reales.', scopeLabel: 'Alcance previsto'
  },
  aicampaign: {
    index: '06 / AUTOMATION · EXPERIMENTAL', title: 'AI Campaign Automation',
    description: 'Proyecto experimental propuesto para clasificar leads, preparar mensajes y registrar actividad mediante automatización e IA.',
    features: ['Orquestar flujos con n8n', 'Clasificar información con IA en datos de prueba', 'Registrar actividad en un CRM de desarrollo', 'Conectar con APIs y un entorno WhatsApp Sandbox'],
    tags: ['n8n', 'OpenAI', 'APIs REST', 'CRM', 'WhatsApp Sandbox'], status: 'Experimental · sin campañas ni clientes reales', evidence: 'Solo utilizará datos de prueba y entornos sandbox hasta que exista una implementación demostrable.', scopeLabel: 'Alcance previsto'
  },
  securityaudit: {
    index: '07 / SECURITY · LABORATORIO MVP', title: 'Security Audit Dashboard',
    description: 'Laboratorio propuesto para revisar cabeceras y configuraciones básicas de aplicaciones de prueba en un entorno controlado.',
    features: ['Revisar cabeceras HTTP de aplicaciones de prueba', 'Registrar configuraciones básicas de seguridad', 'Mostrar hallazgos en un panel local', 'Documentar límites y entorno autorizado de uso'],
    tags: ['Spring Boot', 'Angular', 'JWT', 'Docker', 'OWASP'], status: 'MVP propuesto · entorno controlado', evidence: 'No realizará auditorías sobre sistemas de terceros. Se publicará al contar con un MVP reproducible.', scopeLabel: 'Alcance previsto'
  }
};

const modal = document.querySelector('#project-modal');
let modalTrigger = null;
const fillModal = (project) => {
  modal.querySelector('.modal-index').textContent = project.index;
  modal.querySelector('.modal-status').textContent = project.status;
  modal.querySelector('#modal-title').textContent = project.title;
  modal.querySelector('.modal-description').textContent = project.description;
  modal.querySelector('.modal-features-heading').textContent = project.scopeLabel;
  modal.querySelector('.modal-features').innerHTML = project.features.map((feature) => `<li>${feature}</li>`).join('');
  modal.querySelector('.modal-evidence').textContent = project.evidence;
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
