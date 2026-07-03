// ===== Mobile menu =====
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Dynamic footer year =====
document.querySelectorAll('.footer-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ===== Obra lightbox (obra.html only) =====
const obraGrid = document.querySelector('.obras-grid');
const lightbox = document.getElementById('lightbox');

if (obraGrid && lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDesc = lightbox.querySelector('.lightbox-description');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');
  const currentCounter = lightbox.querySelector('.current');
  const totalCounter = lightbox.querySelector('.total');

  const obraBtns = Array.from(obraGrid.querySelectorAll('.obra-img-btn'));
  const collection = obraBtns.map(btn => {
    const card = btn.closest('.obra-card');
    return {
      src: btn.querySelector('img').getAttribute('src'),
      alt: btn.querySelector('img').getAttribute('alt'),
      titulo: card.querySelector('.obra-titulo').textContent,
      tecnica: card.querySelector('.obra-tecnica').textContent,
    };
  });

  totalCounter.textContent = collection.length;
  let currentIdx = 0;

  obraBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      currentIdx = idx;
      openLightbox();
    });
  });

  function openLightbox() {
    const obra = collection[currentIdx];
    lightboxImg.src = obra.src;
    lightboxImg.alt = obra.alt;
    lightboxTitle.textContent = obra.titulo;
    lightboxDesc.textContent = obra.tecnica;
    currentCounter.textContent = currentIdx + 1;
    lightboxPrev.disabled = currentIdx === 0;
    lightboxNext.disabled = currentIdx === collection.length - 1;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  lightboxPrev.addEventListener('click', () => {
    if (currentIdx > 0) { currentIdx--; openLightbox(); }
  });

  lightboxNext.addEventListener('click', () => {
    if (currentIdx < collection.length - 1) { currentIdx++; openLightbox(); }
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });
}

// ===== Modal de consulta (obra.html only) =====
const modal = document.getElementById('modal-consulta');

if (modal) {
  const modalObraRef = document.getElementById('modal-obra-ref');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const form = document.getElementById('form-consulta');
  const modalSuccess = document.getElementById('modal-success');
  let obraActual = '';
  let precioActual = '';

  document.querySelectorAll('.btn-consultar').forEach(btn => {
    btn.addEventListener('click', () => {
      obraActual = btn.dataset.obra;
      precioActual = btn.dataset.precio;
      modalObraRef.textContent = `${obraActual} · ${precioActual}`;
      form.hidden = false;
      form.reset();
      modalSuccess.hidden = true;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.getElementById('campo-nombre').focus();
    });
  });

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (modal.classList.contains('is-open') && e.key === 'Escape') closeModal();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('campo-nombre').value.trim();
    const emailVal = document.getElementById('campo-email').value.trim();
    const mensaje = document.getElementById('campo-mensaje').value.trim();

    if (!nombre || !emailVal) return;

    const subject = encodeURIComponent(`Consulta obra — ${obraActual}`);
    const bodyLines = [
      `Obra: ${obraActual} (${precioActual})`,
      `Nombre: ${nombre}`,
      `Email: ${emailVal}`,
      '',
      mensaje || '(Sin mensaje adicional)',
      '',
      '---',
      'Enviado desde victorechevarria.art',
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));

    window.open(`mailto:alvaroglz1996@gmail.com?subject=${subject}&body=${body}`);
    form.hidden = true;
    modalSuccess.hidden = false;
  });
}
