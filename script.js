const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Carrusel de obras por serie
const seriesData = {
  umbral: {
    images: [
      { 
        src: 'img/fichero_399429_20170717.jpg', 
        alt: 'Umbral - Obra 1: Paisaje translúcido',
        title: 'Umbral I',
        description: 'Óleo sobre lienzo. Capas translúcidas que juegan con la luz y crean espacios de transición entre el paisaje exterior y la emoción interior.'
      },
      { 
        src: 'img/889f4e9a-cc27-4a10-a990-c8fe19525ef0_16-9-discover-aspect-ratio_default_0_x1021y591.jpg', 
        alt: 'Umbral - Obra 2: Estudio de capas y texturas',
        title: 'Umbral II - Estudio de capas',
        description: 'Investigación sobre veladuras y contrastes matéricos. Donde cada capa añade profundidad y tensión visual, buscando ese límite indefinido entre lo visible y lo sentido.'
      }
    ]
  },
  materia: {
    images: [
      { 
        src: 'img/889f4e9a-cc27-4a10-a990-c8fe19525ef0_16-9-discover-aspect-ratio_default_0_x1021y591.jpg', 
        alt: 'Materia Viva - Obra 1: Texturas densas',
        title: 'Materia Viva I',
        description: 'Óleo y técnica mixta. Texturas orgánicas donde los pigmentos densos crean ritmo gestual. El gesto de la mano sobre el lienzo como lenguaje primario.'
      }
    ]
  },
  archivo: {
    images: [
      { 
        src: 'img/M1-1501780127-U2201797708302yiC--1200x840@Diario Vasco.webp', 
        alt: 'Archivo Interior - Obra 1: Fragmentos de memoria',
        title: 'Archivo Interior I',
        description: 'Fragmentos visuales que evocan documento y archivo. Un viaje por la memoria a través de elementos que sugieren temporalidad, ausencia y la huella del tiempo.'
      }
    ]
  }
};

// Lightbox carrusel
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('.lightbox-img');
const lightboxTitle = lightbox?.querySelector('.lightbox-title');
const lightboxDesc = lightbox?.querySelector('.lightbox-description');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
const lightboxNext = lightbox?.querySelector('.lightbox-next');
const currentCounter = lightbox?.querySelector('.current');
const totalCounter = lightbox?.querySelector('.total');

let currentSeries = null;
let currentIndex = 0;

const triggers = document.querySelectorAll('.lightbox-trigger');

triggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    const series = trigger.dataset.series;
    currentSeries = series;
    currentIndex = 0;
    openLightbox();
  });
});

function openLightbox() {
  if (!currentSeries || !seriesData[currentSeries]) return;
  
  const series = seriesData[currentSeries];
  updateLightboxContent(series);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateLightboxContent(series) {
  const images = series.images;
  const img = images[currentIndex];
  
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxTitle.textContent = img.title;
  lightboxDesc.textContent = img.description;
  currentCounter.textContent = currentIndex + 1;
  totalCounter.textContent = images.length;
  
  // Desactivar botones si es necesario
  lightboxPrev.disabled = currentIndex === 0;
  lightboxNext.disabled = currentIndex === images.length - 1;
}

lightboxClose?.addEventListener('click', closeLightbox);

lightboxPrev?.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateLightboxContent(seriesData[currentSeries]);
  }
});

lightboxNext?.addEventListener('click', () => {
  const images = seriesData[currentSeries].images;
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateLightboxContent(seriesData[currentSeries]);
  }
});

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('is-open')) return;
  
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev?.click();
  if (e.key === 'ArrowRight') lightboxNext?.click();
});

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}