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

// ===== Obra page: colecciones selector + lightbox =====
const coleccionesSelector = document.getElementById('colecciones-selector');
const lightbox = document.getElementById('lightbox');

if (coleccionesSelector && lightbox) {
  const trigger = coleccionesSelector.querySelector('.colecciones-trigger');
  const panel = document.getElementById('colecciones-panel');
  const triggerTitle = trigger.querySelector('.trigger-title');
  const triggerYear = trigger.querySelector('.trigger-year');

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDesc = lightbox.querySelector('.lightbox-description');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');
  const currentCounter = lightbox.querySelector('.current');
  const totalCounter = lightbox.querySelector('.total');

  let collection = [];
  let currentIdx = 0;

  function buildCollection() {
    const activeCol = document.querySelector('.coleccion:not([hidden])');
    if (!activeCol) return;
    const btns = Array.from(activeCol.querySelectorAll('.obra-img-btn'));
    collection = btns.map(btn => {
      const card = btn.closest('.obra-card');
      return {
        src: btn.querySelector('img').getAttribute('src'),
        alt: btn.querySelector('img').getAttribute('alt'),
        titulo: card.querySelector('.obra-titulo').textContent,
        tecnica: card.querySelector('.obra-tecnica').textContent,
      };
    });
    totalCounter.textContent = collection.length;
  }

  // ----- Selector panel open / close -----
  function openPanel() {
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', () => {
    panel.hidden ? openPanel() : closePanel();
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!coleccionesSelector.contains(e.target)) closePanel();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) {
      closePanel();
      trigger.focus();
    }
  });

  // ----- Collection switching -----
  panel.addEventListener('click', e => {
    const item = e.target.closest('.coleccion-item');
    if (!item) return;

    // Update panel active state + aria-selected
    panel.querySelectorAll('.coleccion-item').forEach(i => {
      i.classList.remove('is-active');
      i.closest('[role="option"]').setAttribute('aria-selected', 'false');
    });
    item.classList.add('is-active');
    item.closest('[role="option"]').setAttribute('aria-selected', 'true');

    // Update trigger display
    triggerTitle.textContent = item.dataset.title;
    triggerYear.textContent = item.dataset.year;

    // Show/hide collections
    const targetId = item.dataset.target;
    document.querySelectorAll('.coleccion').forEach(col => {
      col.hidden = col.id !== targetId;
    });

    closePanel();
    buildCollection();
  });

  // ----- Lightbox (event delegation from obra-page) -----
  document.querySelector('.obra-page').addEventListener('click', e => {
    const btn = e.target.closest('.obra-img-btn');
    if (!btn) return;
    const activeCol = document.querySelector('.coleccion:not([hidden])');
    if (!activeCol || !activeCol.contains(btn)) return;
    const allBtns = Array.from(activeCol.querySelectorAll('.obra-img-btn'));
    currentIdx = allBtns.indexOf(btn);
    buildCollection();
    openLightbox();
  });

  function openLightbox() {
    const obra = collection[currentIdx];
    if (!obra) return;
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

  buildCollection();
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

  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-consultar');
    if (!btn) return;
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
      'Enviado desde victorechevarria.com',
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));

    window.open(`mailto:alvaroglz1996@gmail.com?subject=${subject}&body=${body}`);
    form.hidden = true;
    modalSuccess.hidden = false;
  });
}
