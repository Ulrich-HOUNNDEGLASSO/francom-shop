// ============================================
// VAGUES SVG — Transitions de section
// Texturées avec un vrai fragment de pagne via <image> + clipPath
// ============================================

function vagueSVG({ fragmentSrc, fillVar, flip = false }) {
  const pathD = flip
    ? "M0,0 C300,90 900,0 1200,60 L1200,0 L0,0 Z"
    : "M0,60 C300,0 900,90 1200,20 L1200,120 L0,120 Z";

  const uid = `vague-${Math.random().toString(36).slice(2, 8)}`;

  return `
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <clipPath id="${uid}">
          <path d="${pathD}" />
        </clipPath>
      </defs>
      <path d="${pathD}" class="${fillVar}" />
      ${fragmentSrc ? `
        <g clip-path="url(#${uid})" opacity="1">
          <image href="${fragmentSrc}" x="0" y="0" width="1200" height="120" preserveAspectRatio="xMidYMid slice" />
        </g>
      ` : ''}
    </svg>
  `;
}

function renderVagues() {
  document.querySelectorAll('[data-vague]').forEach(el => {
    const fillVar = el.dataset.vagueFill || 'vague-fill-creme';
    const fragment = el.dataset.vagueFragment || null;
    const flip = el.dataset.vagueFlip === 'true';
    el.innerHTML = vagueSVG({ fragmentSrc: fragment, fillVar, flip });
  });
}

export { renderVagues };
