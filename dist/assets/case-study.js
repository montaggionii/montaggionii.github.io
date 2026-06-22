const tocLinks = [...document.querySelectorAll('[data-case-toc]')];
const sections = tocLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

const updateToc = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    tocLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-22% 0px -68% 0px', threshold: 0 });

sections.forEach((section) => updateToc.observe(section));
