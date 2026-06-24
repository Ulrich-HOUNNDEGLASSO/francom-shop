import { pagnes, categories, whatsappCaptures, WHATSAPP_NUMBER } from './catalogue.js';
import { renderVagues } from './vagues.js';

let state = {
  categorieActive: 'tous',
  pagneActif: null,
  genreActif: 'femme',
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function formatPrix(n) {
  return n.toLocaleString('fr-FR') + ' F CFA';
}

function buildWhatsAppURL(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getPagneMessage(pagne) {
  return `Bonjour Francom Shop 👋\n\nJe suis intéressé(e) par le *${pagne.nom}* (${formatPrix(pagne.prix)}).\nPouvez-vous me donner plus d'informations sur la disponibilité et la livraison ?\n\nMerci !`;
}

function getGrosMessage() {
  return `Bonjour Francom Shop 👋\n\nJe représente une association/entreprise et je souhaite obtenir un devis pour une commande en gros.\n\nPouvez-vous me communiquer vos conditions (quantité minimum, délai, tarifs dégressifs) ?\n\nMerci !`;
}

const WHATSAPP_ICON = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

// ============================================
// NAVIGATION
// ============================================

function initNav() {
  const nav = $('.nav');
  if (!nav) return;

  const burger = $('.nav-burger');
  const links = $('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const isOpen = links.classList.toggle('mobile-open');
      burger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('mobile-open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

// ============================================
// FAB WHATSAPP
// ============================================

function initFab() {
  const fab = $('.fab-whatsapp');
  const hero = $('.hero');
  if (!fab || !hero) return;

  const observer = new IntersectionObserver(([entry]) => {
    fab.classList.toggle('visible', !entry.isIntersecting);
  }, { threshold: 0 });

  observer.observe(hero);
}

// ============================================
// CATALOGUE
// ============================================

function renderFilters() {
  const container = $('.catalogue-filters');
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat.id === state.categorieActive ? 'active' : ''}" data-categorie="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.categorieActive = btn.dataset.categorie;
      renderFilters();
      renderCards();
    });
  });
}

function renderCards() {
  const grid = $('.catalogue-grid');
  if (!grid) return;

  const filtered = state.categorieActive === 'tous'
    ? pagnes
    : pagnes.filter(p => p.categorie === state.categorieActive);

  grid.innerHTML = filtered.map((pagne, i) => `
    <div class="pagne-card reveal-scale reveal-delay-${(i % 4) + 1} ${state.pagneActif?.id === pagne.id ? 'active' : ''}"
      data-id="${pagne.id}" role="button" tabindex="0" aria-label="Voir le ${pagne.nom}">
      <img class="pagne-card-img" src="${pagne.image}" alt="${pagne.nom}" loading="lazy"
        onerror="this.style.background='${pagne.couleur}33'">
      <div class="pagne-card-overlay" aria-hidden="true"></div>
      <button class="pagne-card-zoom" data-zoom-id="${pagne.id}" aria-label="Zoomer sur ${pagne.nom}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
        </svg>
      </button>
      <div class="pagne-card-body">
        <div class="pagne-card-name">${pagne.nom}</div>
        <div class="pagne-card-price">${formatPrix(pagne.prix)}</div>
      </div>
      <div class="pagne-card-active-ring" aria-hidden="true"></div>
    </div>
  `).join('');

  grid.querySelectorAll('.pagne-card').forEach(card => {
    const handler = () => {
      const id = parseInt(card.dataset.id);
      selectPagne(pagnes.find(p => p.id === id));
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter') handler(); });
  });

  initReveal();
}

function selectPagne(pagne) {
  state.pagneActif = pagne;
  $$('.pagne-card').forEach(card => {
    card.classList.toggle('active', parseInt(card.dataset.id) === pagne.id);
  });
  updateLookbook(pagne);
  $('#lookbook')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// LOOKBOOK
// ============================================

function initLookbook() {
  $$('.genre-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.genreActif = btn.dataset.genre;
      $$('.genre-btn').forEach(b => b.classList.toggle('active', b === btn));
      if (state.pagneActif) updateLookbook(state.pagneActif);
    });
  });
}

function updateLookbook(pagne) {
  const placeholder = $('.lookbook-placeholder');
  const info = $('.lookbook-info');
  const imgKey = `lookbook_${state.genreActif}`;
  const imgSrc = pagne[imgKey];

  $$('.lookbook-img').forEach(img => img.classList.remove('active'));

  if (imgSrc) {
    let img = $(`.lookbook-img[data-key="${pagne.id}-${state.genreActif}"]`);
    if (!img) {
      img = document.createElement('img');
      img.className = 'lookbook-img';
      img.dataset.key = `${pagne.id}-${state.genreActif}`;
      img.src = imgSrc;
      img.alt = `${pagne.nom} — ${state.genreActif === 'femme' ? 'Femme' : 'Homme'}`;
      img.onerror = () => { img.style.display = 'none'; };
      $('.lookbook-visual').prepend(img);
    }
    requestAnimationFrame(() => img.classList.add('active'));
    if (placeholder) placeholder.style.display = 'none';
  } else if (placeholder) {
    placeholder.style.display = 'flex';
  }

  if (info) {
    info.innerHTML = `
      <div class="lookbook-event reveal visible">${pagne.event}</div>
      <div class="lookbook-name reveal visible">${pagne.nom}</div>
      <div class="lookbook-price reveal visible">${formatPrix(pagne.prix)}</div>
      <p class="lookbook-desc reveal visible">${pagne.description}</p>
      <a class="btn-whatsapp reveal visible" href="${buildWhatsAppURL(getPagneMessage(pagne))}" target="_blank" rel="noopener">
        ${WHATSAPP_ICON}
        Commander ce pagne
      </a>
    `;
  }
}

// ============================================
// CTA GROS
// ============================================

function initGros() {
  $$('[data-action="commande-gros"]').forEach(btn => {
    btn.addEventListener('click', () => {
      window.open(buildWhatsAppURL(getGrosMessage()), '_blank');
    });
  });
}

// ============================================
// LIGHTBOX — Prévisualisation plein écran du lookbook
// ============================================

function initLightbox() {
  const overlay = $('#lightbox');
  const img = $('#lightboxImg');
  const closeBtn = $('#lightboxClose');
  const visual = $('.lookbook-visual');
  if (!overlay || !img) return;

  function open(src, alt) {
    if (!src) return;
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  visual?.addEventListener('click', (e) => {
    if (e.target.closest('.lookbook-genre-toggle')) return;
    const activeImg = visual.querySelector('.lookbook-img.active');
    if (activeImg) open(activeImg.src, activeImg.alt);
  });

  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // Zoom depuis les cards du catalogue (délégation d'événement,
  // fonctionne même quand renderCards() régénère le HTML)
  document.addEventListener('click', (e) => {
    const zoomBtn = e.target.closest('.pagne-card-zoom');
    if (!zoomBtn) return;
    e.stopPropagation();
    const id = parseInt(zoomBtn.dataset.zoomId);
    const pagne = pagnes.find(p => p.id === id);
    if (pagne) open(pagne.image, pagne.nom);
  });
}

// ============================================
// TÉMOIGNAGES — Carrousel captures WhatsApp
// ============================================

function renderWhatsappCarrousel() {
  const track = $('#waCarrousel');
  const dotsWrap = $('#waDots');
  const prevBtn = $('.wa-nav-prev');
  const nextBtn = $('.wa-nav-next');
  if (!track) return;

  track.innerHTML = whatsappCaptures.map((c, i) => `
    <figure class="wa-capture" data-index="${i}">
      <img class="wa-capture-img" src="${c.image}" alt="Capture WhatsApp client — ${c.caption}" loading="lazy"
        onerror="this.style.background='#ECE5DD'; this.alt='Capture indisponible'">
      <figcaption class="wa-capture-caption">${c.caption}</figcaption>
    </figure>
  `).join('');

  if (dotsWrap) {
    dotsWrap.innerHTML = whatsappCaptures.map((_, i) =>
      `<button class="wa-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Aller à la capture ${i + 1}"></button>`
    ).join('');
  }

  const slides = track.querySelectorAll('.wa-capture');
  const dots = dotsWrap ? dotsWrap.querySelectorAll('.wa-dot') : [];

  function updateActiveDot() {
    const scrollLeft = track.scrollLeft;
    const slideWidth = (slides[0]?.offsetWidth || 1) + 24;
    const activeIndex = Math.round(scrollLeft / slideWidth);
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
    if (prevBtn) prevBtn.disabled = scrollLeft <= 4;
    if (nextBtn) nextBtn.disabled = scrollLeft >= track.scrollWidth - track.clientWidth - 4;
  }

  function scrollToIndex(index) {
    const slide = slides[index];
    if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }

  track.addEventListener('scroll', () => {
    clearTimeout(track._scrollTimer);
    track._scrollTimer = setTimeout(updateActiveDot, 80);
  }, { passive: true });

  dots.forEach(dot => {
    dot.addEventListener('click', () => scrollToIndex(parseInt(dot.dataset.index)));
  });

  prevBtn?.addEventListener('click', () => {
    const current = Math.round(track.scrollLeft / ((slides[0]?.offsetWidth || 1) + 24));
    scrollToIndex(Math.max(0, current - 1));
  });

  nextBtn?.addEventListener('click', () => {
    const current = Math.round(track.scrollLeft / ((slides[0]?.offsetWidth || 1) + 24));
    scrollToIndex(Math.min(slides.length - 1, current + 1));
  });

  updateActiveDot();
}

// ============================================
// REVEAL AU SCROLL
// ============================================

function initReveal() {
  const selectors = '.reveal:not(.visible), .reveal-left:not(.visible), .reveal-scale:not(.visible)';
  const elements = $$(selectors);
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  renderVagues();
  initNav();
  initFab();
  renderFilters();
  renderCards();
  initLookbook();
  initLightbox();
  initGros();
  renderWhatsappCarrousel();
  initReveal();
});
