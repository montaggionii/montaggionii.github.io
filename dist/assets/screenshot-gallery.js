document.querySelectorAll('[data-screenshot-gallery]').forEach((gallery) => {
  const images = [...gallery.querySelectorAll('img')];
  if (!images.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'screenshot-dialog';
  dialog.innerHTML = '<button type="button" aria-label="Cerrar captura">×</button><img alt="" />';
  document.body.append(dialog);
  const preview = dialog.querySelector('img');
  const close = dialog.querySelector('button');

  images.forEach((image) => {
    image.tabIndex = 0;
    image.addEventListener('click', () => { preview.src = image.currentSrc || image.src; preview.alt = image.alt; dialog.showModal(); });
    image.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); image.click(); } });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
});
