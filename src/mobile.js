
/* =========================================================
   Phone ergonomics: bottom tab bar, tappable cards,
   fold-away filters and map on small screens.
   ========================================================= */
const MOBILE = matchMedia('(max-width: 760px)');
const TAB_ICON = {
  home: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
  buy: '<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/><path d="M15.5 6.2V3.5H18v4.3"/>',
  rent: '<circle cx="8" cy="15" r="4"/><path d="m11 12 8.5-8.5M16 6l2.5 2.5M14 8l2 2"/>',
  malazi: '<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 15h18M3 18v2M21 18v2"/><circle cx="8" cy="7" r="2"/>'
};
const tabIco = k => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${TAB_ICON[k]}</svg>`;

/* ---------- bottom tab bar ---------- */
(() => {
  const bar = document.createElement('nav');
  bar.className = 'tabbar'; bar.setAttribute('aria-label', 'Quick navigation');
  bar.innerHTML = `
    <a href="#/" data-tab="home">${tabIco('home')}<span>Home</span></a>
    <a href="#/buy" data-tab="buy">${tabIco('buy')}<span>Buy</span></a>
    <button type="button" class="tab-list" data-list-cat="" aria-label="List a property"><span class="tab-plus" aria-hidden="true">+</span><span>List</span></button>
    <a href="#/rent" data-tab="rent">${tabIco('rent')}<span>Rent</span></a>
    <a href="#/malazi" data-tab="malazi">${tabIco('malazi')}<span>Malazi</span></a>`;
  if (window.BRM_LIVE) bar.querySelectorAll('a[href^="#/"]').forEach(a => a.setAttribute('href', a.getAttribute('href').slice(1)));
  document.body.insertBefore(bar, $('#to-top'));
})();
function syncTabbar(page) {
  $$('.tabbar [data-tab]').forEach(a => { const on = a.dataset.tab === page; a.classList.toggle('on', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
}

/* ---------- tap anywhere on a card to open it ---------- */
document.addEventListener('click', e => {
  const card = e.target.closest('.property-card');
  if (!card || e.target.closest('button, a, input, select, label')) return;
  const d = card.querySelector('[data-details]'); if (d) d.click();
});

/* ---------- fold-away filters and map on phones ---------- */
const FILTER_ICO = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>';
const MAP_ICO = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/></svg>';
function activeFilters(form) {
  return [...form.querySelectorAll('select, input')].filter(x => x.value && !/-sort$/.test(x.id)).length;
}
function enhancePage(page) {
  const root = $(`[data-page="${page}"]`); if (!root) return;
  const form = $('.filter-bar', root), map = $('.map-band', root);
  if (!form || $('.m-tools', root) || page === 'agents') return;
  const tools = document.createElement('div');
  tools.className = 'm-tools';
  tools.innerHTML = `<button type="button" class="m-tool" data-mt="filters" aria-expanded="false">${FILTER_ICO}<span>Filters</span><b class="m-count" hidden></b></button>
    <button type="button" class="m-tool" data-mt="map" aria-expanded="false">${MAP_ICO}<span>Map</span></button>`;
  form.parentNode.insertBefore(tools, form);
  form.classList.add('m-fold'); if (map) map.classList.add('m-fold');
  const count = () => { const n = activeFilters(form), b = $('.m-count', tools); b.textContent = n; b.hidden = !n; };
  form.addEventListener('change', count); form.addEventListener('reset', () => setTimeout(count, 0)); count();
  tools.addEventListener('click', e => {
    const b = e.target.closest('[data-mt]'); if (!b) return;
    const el = b.dataset.mt === 'filters' ? form : map; if (!el) return;
    const open = !el.classList.contains('m-open');
    el.classList.toggle('m-open', open); b.setAttribute('aria-expanded', open); b.classList.toggle('on', open);
  });
}
function enhanceHome() {
  const map = $('#map'); if (!map || $('#m-home-map')) return;
  const t = document.createElement('div'); t.className = 'm-tools m-tools-home';
  t.innerHTML = `<button type="button" class="m-tool" id="m-home-map" aria-expanded="false">${MAP_ICO}<span>Show map</span></button>`;
  map.parentNode.insertBefore(t, map); map.classList.add('m-fold');
  t.addEventListener('click', () => {
    const open = !map.classList.contains('m-open'); map.classList.toggle('m-open', open);
    const b = $('#m-home-map'); b.setAttribute('aria-expanded', open); b.classList.toggle('on', open);
    b.querySelector('span').textContent = open ? (i18n && i18n.lang === 'sw' ? 'Ficha ramani' : 'Hide map') : (i18n && i18n.lang === 'sw' ? 'Onyesha ramani' : 'Show map');
  });
}

/* hook page changes */
const _show = show;
show = function (page) {
  _show(page);
  syncTabbar(page);
  if (page === 'home') enhanceHome(); else enhancePage(page);
};
syncTabbar(currentPage);
if (currentPage === 'home') enhanceHome(); else enhancePage(currentPage);
