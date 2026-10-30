
/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
};
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => Number(n).toLocaleString('en-US');
const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;

/* ---------- images from the registry ---------- */
$$('img[data-img]').forEach(img => { const src = IMG[img.dataset.img]; if (src) img.src = src; });
/* ---------- property types ---------- */
const TYPE_GROUPS = [
  ['Homes', [['House', 'House'], ['Apartment', 'Apartment'], ['Villa', 'Villa'], ['Townhouse', 'Townhouse'], ['Bungalow', 'Bungalow'], ['Studio', 'Studio'], ['Room', 'Room']]],
  ['Land & farms', [['Land', 'Land / Plot'], ['Farm', 'Farm'], ['Beach plot', 'Beach plot']]],
  ['Commercial', [['Office', 'Office'], ['Shop', 'Shop'], ['Warehouse', 'Warehouse / Godown'], ['Commercial building', 'Commercial building'], ['Hotel / Lodge', 'Hotel / Lodge'], ['Guest house', 'Guest house']]],
  ['Other', [['Other', 'Other property']]]
];
const TYPE_LABEL = {}, TYPE_GROUP = {};
TYPE_GROUPS.forEach(([g, list]) => list.forEach(([v, l]) => { TYPE_LABEL[v] = l; TYPE_GROUP[v] = g; }));
const isHome = t => (TYPE_GROUP[t] || 'Homes') === 'Homes' || t === 'Hotel / Lodge' || t === 'Guest house';
const typeOptions = (anyLabel, selected) => (anyLabel ? `<option value="">${anyLabel}</option>` : '') +
  TYPE_GROUPS.map(([g, list]) => `<optgroup label="${g}">${list.map(([v, l]) => `<option value="${v}"${v === selected ? ' selected' : ''}>${l}</option>`).join('')}</optgroup>`).join('');
const PH_ART = {
  'Land & farms': ['#f4ecd9', '#e3d3ac', '<path d="M200 330 C300 300 460 300 560 330" /><path d="M170 360 C290 325 470 325 590 360" /><path d="M140 392 C280 352 480 352 620 392" /><path d="M110 426 C270 380 490 380 650 426" /><circle cx="560" cy="170" r="42" /><path d="M150 300 L230 200 L300 270 L360 210 L470 300" />'],
  'Commercial': ['#e8eef4', '#cfdbe6', '<rect x="250" y="150" width="150" height="250" rx="6"/><rect x="400" y="210" width="110" height="190" rx="6"/><path d="M280 190h30M340 190h30M280 240h30M340 240h30M280 290h30M340 290h30M430 250h50M430 300h50M300 400v-50h50v50"/>'],
  'Other': ['#f3efe6', '#e2d8c4', '<path d="M230 300 L380 190 L530 300"/><path d="M270 285v115h220V285"/><path d="M350 400v-60h60v60"/>']
};
const PH_CACHE = {};
function placeholderImg(type) {
  const g = isHome(type) ? 'Other' : (TYPE_GROUP[type] || 'Other');
  if (PH_CACHE[g]) return PH_CACHE[g];
  const [a, b, art] = PH_ART[g];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 504"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="760" height="504" fill="url(#g)"/><g fill="none" stroke="#b8892a" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".85">${art}</g></svg>`;
  return (PH_CACHE[g] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
}
const photoSrc = p => p.image || (p.photo && IMG[PHOTO[p.photo]]) || placeholderImg(p.type);
const sizeText = (v, u) => `${Number(v).toLocaleString('en-US')} ${u === 'acres' ? 'acres' : u === 'hectares' ? 'hectares' : 'm²'}`;

/* ---------- data ---------- */
const BADGE = { buy: 'For Sale', rent: 'For Rent', malazi: 'Malazi' };
allDemo.push({ id: 'a10', category: 'rent', photo: 'bright-bedroom', price: 'TSh 950,000 / month', title: 'Furnished City Studio', location: 'Upanga', type: 'Apartment', beds: 1, baths: 1, more: '55 m²', amount: 950000, description: 'A bright, fully furnished studio close to the city centre, ideal for a young professional.' });
const ADD = { buy: ['Sell your property', 'List it free and reach serious buyers.'], rent: ['Rent out your property', 'List it free and find tenants faster.'], malazi: ['List your Malazi stay', 'Host guests and share your place for short stays.'], '': ['List your property', 'Free to list for sale, rent or short stays.'] };
const LIST_TITLE = { buy: 'Sell Your Property', rent: 'Rent Out Your Property', malazi: 'List Your Malazi Stay', '': 'List Your Property for Free' };
const addCardHTML = cat => { const [t, d] = ADD[cat] || ADD['']; return `<button type="button" class="add-card" data-list-cat="${cat}" data-reveal><span class="add-photo"><span class="plus" aria-hidden="true">+</span></span><span class="add-body"><strong>${t}</strong><span>${d}</span><span class="add-cta">Start listing ${ICON.arrow}</span></span></button>`; };
let userListings = store.get('brm-listings', []);
let favs = new Set(store.get('brm-favs', []));
const allItems = () => [...userListings, ...allDemo];
const byId = id => allItems().find(p => p.id === id);

/* ---------- toast ---------- */
const toastEl = $('#toast'); let toastT;
function toast(msg) {
  toastEl.textContent = msg; toastEl.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

/* ---------- card template (matches the static markup) ---------- */
function cardHTML(p, i = 0) {
  const third = p.category === 'malazi' || /guest/i.test(p.more || '') ? ICON.guests : ICON.area;
  return `<article class="property-card" data-id="${esc(p.id)}" data-reveal style="--d:${(i % 4) * 0.07}s">
  <div class="card-photo-wrap"><img class="card-photo" src="${photoSrc(p)}" alt="${esc(p.title)}" loading="lazy">
  <span class="property-badge">${BADGE[p.category] || ''}</span>${(p.images && p.images.length > 1) || p.video ? `<span class="media-badge">${p.images && p.images.length > 1 ? `${p.images.length} photos` : ''}${p.video ? `${p.images && p.images.length > 1 ? ' · ' : ''}Video` : ''}</span>` : ''}${p.user ? `<span class="card-new">${p.status === 'pending' ? 'Pending review' : p.status === 'rejected' ? 'Not approved' : 'Your listing'}</span>` : ''}${p.featured ? '<span class="feat-badge">Featured</span>' : ''}
  <button type="button" class="heart${favs.has(p.id) ? ' saved' : ''}" aria-label="Save ${esc(p.title)}" aria-pressed="${favs.has(p.id)}" data-save="${esc(p.id)}"><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.6 5.6 0 0 0-7.9 0L12 5.5l-.9-.9a5.6 5.6 0 0 0-7.9 7.9L12 21l8.8-8.5a5.6 5.6 0 0 0 0-7.9Z"/></svg></button></div>
  <div class="card-body"><div class="card-price">${esc(p.price)}</div><button type="button" class="card-title" data-details="${esc(p.id)}">${esc(p.title)}</button>
  <div class="card-place"><span class="pin-icon">${ICON.pin}</span> ${esc(p.location)}, Dar es Salaam</div>
  <div class="card-features">${isHome(p.type) ? `<span>${ICON.bed}${p.beds} beds</span><span>${ICON.bath}${p.baths} baths</span>` : `<span class="type-chip">${esc(TYPE_LABEL[p.type] || p.type)}</span>`}${p.more ? `<span>${third}${esc(p.more)}</span>` : ''}</div>
  <button class="card-link" type="button" data-details="${esc(p.id)}">View details ${ICON.arrow}</button></div></article>`;
}

/* ---------- search ---------- */
const PRICES = {
  buy: { min: [['', 'No minimum'], [50e6, '50 million'], [100e6, '100 million'], [300e6, '300 million'], [500e6, '500 million']],
         max: [['', 'No maximum'], [300e6, '300 million'], [500e6, '500 million'], [1e9, '1 billion'], [2e9, '2 billion']] },
  rent: { min: [['', 'No minimum'], [5e5, '500,000 / month'], [1e6, '1 million / month'], [2e6, '2 million / month']],
          max: [['', 'No maximum'], [1.5e6, '1.5 million / month'], [2.5e6, '2.5 million / month'], [5e6, '5 million / month']] }
};
let tab = 'buy';
const grid = $('#properties-grid');
const fillPrices = cat => {
  if (!PRICES[cat]) return;
  [['#min-price', 'min'], ['#max-price', 'max']].forEach(([sel, k]) => {
    $(sel).innerHTML = PRICES[cat][k].map(([v, l]) => `<option value="${v}">${l}</option>`).join('');
  });
};
function setTab(cat) {
  tab = cat;
  $$('.search-tab').forEach(b => { const on = b.dataset.searchTab === cat; b.classList.toggle('active', on); b.setAttribute('aria-selected', on); });
  const malazi = cat === 'malazi';
  $$('.search-alt').forEach(el => el.classList.toggle('is-visible', malazi));
  $$('.search-default').forEach(el => el.classList.toggle('is-hidden', malazi));
  $('.search-fields').classList.toggle('malazi-mode', malazi);
  fillPrices(cat);
}
function render(list, title, subtitle, addCat, activeArea = '') {
  $('#results-title').textContent = title;
  $('#results-subtitle').textContent = subtitle;
  grid.className = 'property-grid';
  grid.innerHTML = list.map(cardHTML).join('') + addCardHTML(addCat === undefined ? (list[0] ? list[0].category : '') : addCat);
  mapView.update(list, activeArea);
  $('#empty-message').classList.toggle('show', !list.length);
  $('#count-note').textContent = list.length ? `Showing ${list.length} sample ${list.length === 1 ? 'property' : 'properties'}. Illustrative listings for design preview only.` : '';
  reveal(grid);
}
function runSearch(scroll = true) {
  const loc = $('#location').value, kind = $('#property-type').value;
  const min = +$('#min-price').value || 0, max = +$('#max-price').value || Infinity;
  const guests = +$('#guests').value || 1;
  const list = allItems().filter(p => p.category === tab
    && (!loc || p.location === loc)
    && (!kind || p.type === kind)
    && (tab === 'malazi' ? (parseInt(p.more) || 99) >= guests : (p.amount >= min && p.amount <= max)));
  const label = { buy: 'Properties for Sale', rent: 'Properties to Rent', malazi: 'Malazi Stays' }[tab];
  render(list, label + (loc ? ` in ${loc}` : ''), list.length ? (tab === 'malazi' ? 'Places to stay that match your trip.' : 'Homes that match your search.') : 'No matches yet.', tab, loc);
  if (scroll) $('#properties').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}
function showAll(title = 'All Properties', sub = 'Every sample listing in one place.') {
  render(allItems(), title, sub, '');
  $('#properties').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}
$$('.search-tab').forEach(b => b.addEventListener('click', () => setTab(b.dataset.searchTab)));
$('#search-form').addEventListener('submit', e => {
  e.preventDefault();
  const q = new URLSearchParams();
  const v = (k, sel) => { const x = $(sel).value; if (x) q.set(k, x); };
  v('loc', '#location'); v('type', '#property-type');
  if (tab === 'malazi') { v('in', '#checkin'); v('out', '#checkout'); v('guests', '#guests'); } else { v('min', '#min-price'); v('max', '#max-price'); }
  go('/' + tab + (q.toString() ? '?' + q : ''));
});
const pickArea = area => { $('#location').value = area; render(allItems().filter(p => p.location === area), `Properties in ${area}`, 'Everything listed in this area: to buy, rent or stay.', '', area); $('#properties').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); };
$$('.area-tile').forEach(b => b.addEventListener('click', () => pickArea(b.dataset.area)));
$$('.hint-area').forEach(b => b.addEventListener('click', () => { go(`/${tab}?loc=${encodeURIComponent(b.dataset.area)}`); }));
$('#all-properties').addEventListener('click', () => showAll());
$('#all-locations').addEventListener('click', () => { $('#location').value = ''; showAll('All Locations', 'Sample homes across Dar es Salaam.'); });
$('#all-malazi').addEventListener('click', () => { go('/malazi'); });
$('#agents-more').addEventListener('click', () => { go('/agents'); });

const today = new Date().toISOString().slice(0, 10);
$('#checkin').min = today; $('#checkout').min = today;
$('#checkin').addEventListener('change', e => { $('#checkout').min = e.target.value; if ($('#checkout').value < e.target.value) $('#checkout').value = ''; });

/* ---------- favourites ---------- */
const updateFavCount = () => { $('#fav-count').textContent = favs.size; };
document.addEventListener('click', e => {
  const h = e.target.closest('[data-save]'); if (!h) return;
  const id = h.dataset.save, on = !favs.has(id);
  on ? favs.add(id) : favs.delete(id);
  store.set('brm-favs', [...favs]);
  $$(`[data-save="${CSS.escape(id)}"]`).forEach(x => { x.classList.toggle('saved', on); x.setAttribute('aria-pressed', on); });
  h.classList.remove('pulse'); void h.offsetWidth; h.classList.add('pulse');
  updateFavCount();
  if (window.LIVE) LIVE.fav(id, on);
  toast(on ? 'Saved to your favourites' : 'Removed from favourites');
});
$('#fav-link').addEventListener('click', () => {
  const list = allItems().filter(p => favs.has(p.id));
  if (!list.length) return toast('Tap the heart on any property to save it here.');
  render(list, 'Your Saved Properties', 'Saved in this browser only.');
  $('#properties').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});

/* ---------- modals ---------- */
let lastFocus = null;
function openModal(id) {
  lastFocus = document.activeElement;
  const o = document.getElementById(id); o.classList.add('open'); o.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lock');
  setTimeout(() => { const c = o.querySelector('.modal-close'); c && c.focus({ preventScroll: true }); }, 60);
}
function closeModal(o) {
  if (!o) return; o.classList.remove('open'); o.setAttribute('aria-hidden', 'true');
  if (!$('.overlay.open')) document.body.classList.remove('lock');
  lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
}
$$('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(document.getElementById(b.dataset.close))));
$$('.overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) closeModal(o); }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal($('.overlay.open')); closeMenu(); } });

document.addEventListener('click', e => {
  const d = e.target.closest('[data-details]'); if (!d) return;
  const p = byId(d.dataset.details); if (!p) return;
  $('#detail-image').src = photoSrc(p); $('#detail-image').alt = p.title;
  const imgs = (p.images && p.images.length) ? p.images : [];
  $('#detail-thumbs').innerHTML = imgs.length > 1 ? imgs.map((src, k) => `<button type="button" class="dthumb${k ? '' : ' on'}" data-src="${k}"><img src="${src}" alt="Photo ${k + 1}"></button>`).join('') : '';
  $('#detail-thumbs').onclick = ev => { const b = ev.target.closest('.dthumb'); if (!b) return; $('#detail-image').src = imgs[+b.dataset.src]; $$('.dthumb').forEach(t => t.classList.toggle('on', t === b)); };
  const dv = $('#detail-video'); if (p.video) { dv.src = p.video; dv.hidden = false; } else { dv.pause(); dv.removeAttribute('src'); dv.hidden = true; }
  $('#detail-price').textContent = p.price;
  $('#detail-title').textContent = p.title;
  $('#detail-location').innerHTML = `<span class="modal-place">${ICON.pin}${esc(p.location)}, Dar es Salaam</span>`;
  const third = p.category === 'malazi' ? ICON.guests : ICON.area;
  $('#detail-facts').innerHTML = `${isHome(p.type) ? `<span>${ICON.bed}${p.beds} bedrooms</span><span>${ICON.bath}${p.baths} bathrooms</span>` : ''}${p.more ? `<span>${third}${esc(p.more)}</span>` : ''}<span>${esc(TYPE_LABEL[p.type] || p.type || '')} · ${BADGE[p.category]}</span>`;
  $('#detail-description').textContent = p.description || 'No description provided yet.';
  $('#enquiry-btn').dataset.title = p.title; $('#enquiry-btn').dataset.id = p.id;
  openModal('detail-overlay');
});
$('#enquiry-btn').addEventListener('click', e => window.LIVE ? LIVE.enquire(e.currentTarget.dataset.id) : toast(`Enquiries open when live listings launch. "${e.currentTarget.dataset.title}" is a sample.`));

/* ---------- list a property ---------- */
function openList(cat = '') {
  closeMenu();
  $('#list-title').textContent = LIST_TITLE[cat] || LIST_TITLE[''];
  if (cat) $('#new-category').value = cat;
  openModal('list-overlay');
}
$$('[data-open-list]').forEach(b => b.addEventListener('click', () => openList('')));
document.addEventListener('click', e => { const a = e.target.closest('[data-list-cat]'); if (a) openList(a.dataset.listCat); });
document.addEventListener('click', e => { if (e.target.closest('[data-open-terms]')) { e.preventDefault(); openModal('terms-overlay'); } });
$$('.terms-date').forEach(d => d.textContent = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
$$('[data-agent]').forEach(b => b.addEventListener('click', () => toast('Agent profiles with their listings arrive with the live platform.')));
const PLAY = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/></svg>';
const media = (() => {
  const MAXP = 8; let photos = [], video = '', vname = '', vfile = null;
  const box = $('#media-grid'), pin = $('#new-photos'), vin = $('#new-video'), vbox = $('#video-slot');
  function draw() {
    box.innerHTML = photos.map((src, i) => `<div class="media-thumb${i === 0 ? ' is-cover' : ''}"><img src="${src}" alt="Photo ${i + 1}" title="${i ? 'Make cover photo' : 'Cover photo'}">${i === 0 ? '<span class="cover-tag">Cover</span>' : ''}<button type="button" class="media-x" data-rm="${i}" aria-label="Remove photo ${i + 1}">×</button></div>`).join('')
      + (photos.length < MAXP ? `<label for="new-photos" class="media-add" tabindex="0"><span class="plus" aria-hidden="true">+</span><span>${photos.length ? 'Add more' : 'Add photos'}</span><small>${photos.length}/${MAXP}</small></label>` : '');
    $('#photo-count').textContent = `${photos.length}/${MAXP}`;
  }
  function drawVideo() {
    vbox.innerHTML = video
      ? `<div class="video-thumb"><video src="${video}" muted playsinline preload="metadata"></video><span class="video-name">${PLAY}${esc(vname || 'Video')}</span><button type="button" class="media-x" data-rmv aria-label="Remove video">×</button></div>`
      : `<label for="new-video" class="media-add video-add" tabindex="0">${PLAY}<span>Add a video</span><small>1 video</small></label>`;
  }
  const shrink = f => new Promise((res, rej) => {
    const url = URL.createObjectURL(f), im = new Image();
    im.onload = () => { const k = Math.min(1, 1400 / Math.max(im.width, im.height)); const c = document.createElement('canvas');
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', 0.8)); };
    im.onerror = () => { URL.revokeObjectURL(url); rej(); }; im.src = url;
  });
  pin.addEventListener('change', async e => {
    const files = [...e.target.files].filter(f => f.type.startsWith('image/')); e.target.value = '';
    const room = MAXP - photos.length;
    if (files.length > room) toast(`Up to ${MAXP} photos per listing. ${files.length - room} not added.`);
    for (const f of files.slice(0, room)) {
      if (f.size > 20 * 1024 * 1024) { toast(`${f.name} is over 20 MB.`); continue; }
      try { photos.push(await shrink(f)); draw(); } catch (_) { toast(`Couldn't read ${f.name}.`); }
    }
  });
  box.addEventListener('click', e => {
    const x = e.target.closest('[data-rm]'); if (x) { photos.splice(+x.dataset.rm, 1); draw(); return; }
    const im = e.target.closest('.media-thumb img'); if (!im) return;
    const i = $$('.media-thumb img', box).indexOf(im); if (i > 0) { photos.unshift(photos.splice(i, 1)[0]); draw(); }
  });
  vin.addEventListener('change', e => {
    const f = e.target.files[0]; e.target.value = ''; if (!f) return;
    if (!f.type.startsWith('video/')) return toast('Please choose a video file.');
    if (f.size > 200 * 1024 * 1024) return toast('Please choose a video under 200 MB.');
    video = URL.createObjectURL(f); vname = f.name; vfile = f; drawVideo();
  });
  vbox.addEventListener('click', e => { if (e.target.closest('[data-rmv]')) { video = ''; vname = ''; vfile = null; drawVideo(); } });
  [box, vbox].forEach(b => b.addEventListener('keydown', e => { const l = e.target.closest('.media-add'); if (l && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); l.click(); } }));
  draw(); drawVideo();
  return { get photos() { return photos.slice(); }, get video() { return video; }, get videoFile() { return vfile; }, reset() { photos = []; video = ''; vname = ''; vfile = null; draw(); drawVideo(); } };
})();
function saveListings() {
  const clean = userListings.map(x => ({ ...x, video: '' }));
  if (store.set('brm-listings', clean)) return true;
  return store.set('brm-listings', clean.map(x => ({ ...x, images: (x.images || []).slice(0, 1), image: x.image })))
    || store.set('brm-listings', clean.map(x => ({ ...x, images: [], image: '' })));
}
$('#listing-form').addEventListener('submit', e => {
  e.preventDefault();
  const cat = $('#new-category').value, amount = +$('#new-price').value;
  const suffix = cat === 'rent' ? ' / month' : cat === 'malazi' ? ' / night' : '';
  const type = $('#new-type').value, home = isHome(type);
  const beds = home ? (+$('#new-bedrooms').value || 0) : 0;
  const sizeV = +$('#new-size').value || 0, sizeU = $('#new-size-unit').value;
  const p = {
    id: 'u' + Date.now(), user: true, category: cat, title: $('#new-title').value.trim(),
    location: $('#new-location').value, type, beds, baths: home ? (+$('#new-bathrooms').value || 0) : 0, size_value: sizeV || null, size_unit: sizeV ? sizeU : null,
    more: cat === 'malazi' && home ? `${Math.max(2, beds * 2)} guests` : (sizeV ? sizeText(sizeV, sizeU) : ''), amount, price: `TSh ${fmt(amount)}${suffix}`,
    description: $('#new-description').value.trim(), photo: cat === 'malazi' ? 'courtyard-pool' : 'family-house', images: media.photos, image: media.photos[0] || '', video: media.video
  };
  if (window.LIVE) { LIVE.submitListing(p, media, e.target); return; }
  userListings.unshift(p);
  saveListings();
  e.target.reset(); media.reset();
  closeModal($('#list-overlay'));
  renderHome(); renderMalazi();
  go('/' + cat);
  toast('Your property has been added. Preview only: it is saved in this browser.');
});

/* ---------- header, menu, misc ---------- */
const topbar = $('.topbar');
const onScroll = () => topbar.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const menuBtn = $('#menu-toggle'), nav = $('#navlinks');
function closeMenu() { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
$$('#navlinks a').forEach(a => a.addEventListener('click', () => closeMenu()));
$('#sign-in').addEventListener('click', () => window.LIVE ? LIVE.openAuth() : toast('Accounts arrive with the live platform.'));
$('#footer-help').addEventListener('click', () => toast('The Help Centre is coming soon.'));

$('#year').textContent = new Date().getFullYear();
updateFavCount();
$$('#properties-grid .heart, #malazi-grid .heart').forEach(h => { const on = favs.has(h.dataset.save); h.classList.toggle('saved', on); h.setAttribute('aria-pressed', on); });
function renderHome() {
  $('#results-title').textContent = 'Featured Properties';
  $('#results-subtitle').textContent = 'Homes and spaces worth discovering.';
  const rows = [['buy', 'For Sale'], ['rent', 'For Rent']];
  let shown = [];
  grid.className = 'rows-wrap';
  grid.innerHTML = rows.map(([cat, label]) => {
    const items = allItems().filter(p => p.category === cat).slice(0, 3); shown = shown.concat(items);
    return `<div class="row-block"><div class="row-head"><h3>${label}</h3><button type="button" class="row-link" data-row="${cat}">View all ${ICON.arrow}</button></div><div class="property-grid">${items.map(cardHTML).join('')}${addCardHTML(cat)}</div></div>`;
  }).join('');
  $('#empty-message').classList.remove('show');
  $('#count-note').textContent = 'Illustrative listings for design preview only.';
  mapView.update(shown, '');
  reveal(grid);
}
function renderMalazi() {
  const m = $('#malazi-grid');
  m.innerHTML = allItems().filter(p => p.category === 'malazi').slice(0, 3).map(cardHTML).join('') + addCardHTML('malazi');
  reveal(m);
}
grid.addEventListener('click', e => { const r = e.target.closest('[data-row]'); if (r) go('/' + r.dataset.row); });

/* ---------- hero slideshow ---------- */
(() => {
  const slides = $$('.hero-slide'), dots = $$('.hero-dot');
  if (slides.length < 2) return;
  let i = 0, timer;
  const go = n => {
    slides[i].classList.remove('is-active'); dots[i].classList.remove('is-active'); slides[i].setAttribute('aria-hidden', 'true');
    i = (n + slides.length) % slides.length;
    const s = slides[i]; s.style.animation = 'none'; void s.offsetWidth; s.style.animation = '';
    s.classList.add('is-active'); s.removeAttribute('aria-hidden'); dots[i].classList.add('is-active');
  };
  const start = () => { if (reduceMotion) return; clearInterval(timer); timer = setInterval(() => go(i + 1), 6500); };
  dots.forEach((d, n) => d.addEventListener('click', () => { go(n); start(); }));
  document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(timer) : start());
  start();
})();

/* ---------- scroll reveal ---------- */
function reveal(root = document) {
  const els = $$('[data-reveal]:not(.in)', root);
  if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach(e => e.classList.add('in')); return; }
  els.forEach(el => io.observe(el));
}
(() => {
  const groups = ['.section-header', '.property-grid', '.location-grid', '.agents-grid', '.values', '.cta-inner'];
  groups.forEach(g => $$(g).forEach(el => {
    if (el.matches('.section-header,.cta-inner')) { el.dataset.reveal = ''; return; }
    [...el.children].forEach((c, k) => { c.dataset.reveal = ''; c.style.setProperty('--d', `${(k % 6) * 0.07}s`); });
  }));
  document.documentElement.classList.add('js-reveal');
  reveal();
})();

$$('.terms-toc a').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = document.getElementById(a.getAttribute('href').slice(1)); t && t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }));

/* ---------- map (illustrative; swap for Google Maps / Mapbox at launch) ---------- */
function createMap(el, onPick, gridSel) {
  if (!el) return { update() {} };
  const uid = 'm' + Math.random().toString(36).slice(2, 8);
  const AREAS = { 'Mbezi Beach': [395, 92], 'Mikocheni': [452, 196], 'Masaki': [648, 132], 'Oyster Bay': [655, 222], 'Upanga': [572, 276], 'Kigamboni': [800, 300] };
  el.innerHTML = `<svg viewBox="0 0 1000 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><linearGradient id="${uid}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d6e6ef"/><stop offset="1" stop-color="#c3d9e6"/></linearGradient>
  <pattern id="${uid}g" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#e3e7df" stroke-width="1"/></pattern></defs>
  <rect width="1000" height="340" fill="url(#${uid}s)"/>
  <path class="land" d="M0 0H420C430 60 470 120 520 170C545 195 570 190 585 150C600 110 620 92 648 96C675 100 690 125 694 160C698 200 690 228 668 248C650 262 640 272 630 290C622 306 600 322 590 340H0Z"/>
  <path class="land" d="M690 340C700 312 720 296 752 290C800 282 860 296 1000 300V340Z"/>
  <path d="M0 0H420C430 60 470 120 520 170C545 195 570 190 585 150C600 110 620 92 648 96C675 100 690 125 694 160C698 200 690 228 668 248C650 262 640 272 630 290C622 306 600 322 590 340H0Z" fill="url(#${uid}g)" opacity=".7"/>
  <ellipse class="land" cx="790" cy="70" rx="16" ry="8"/><ellipse class="land" cx="762" cy="150" rx="11" ry="6"/>
  <g class="roads"><path d="M150 0C250 110 380 220 560 302"/><path d="M520 170C560 222 598 262 618 300"/><path d="M300 340C380 280 470 250 560 302"/><path class="bridge" d="M628 300L702 314"/></g>
  <text class="sea-label" x="840" y="150">Indian Ocean</text><text class="sea-label" x="520" y="112">Msasani Bay</text><text class="city-label" x="560" y="326">City Centre</text>
  <g class="pins"></g></svg>
  <div class="map-legend"><strong>Map view</strong><span class="map-count"></span></div>
  <div class="map-note">Illustrative map · live map at launch</div>`;
  const svg = el.querySelector('svg'), pins = el.querySelector('.pins');
  const mq = matchMedia('(max-width:560px)');
  const fit = () => svg.setAttribute('viewBox', mq.matches ? '330 30 570 330' : '0 0 1000 340');
  mq.addEventListener ? mq.addEventListener('change', fit) : mq.addListener(fit); fit();
  let current = [];
  function update(list, active) {
    current = list;
    const counts = {}; list.forEach(p => { counts[p.location] = (counts[p.location] || 0) + 1; });
    pins.innerHTML = Object.entries(AREAS).map(([name, [x, y]]) => {
      const n = counts[name] || 0, on = active === name;
      return `<g class="pin${n ? '' : ' empty'}${on ? ' on' : ''}" data-area="${name}" transform="translate(${x} ${y})" tabindex="${n ? 0 : -1}" role="button" aria-label="${name}: ${n} properties">
        ${n ? `<path class="pin-shape" d="M0 0C-7-9-15-15-15-26A15 15 0 1 1 15-26C15-15 7-9 0 0Z"/><text class="pin-n" y="-21">${n}</text>` : '<circle class="pin-dot" r="5"/>'}
        <text class="pin-label" x="${n ? 20 : 11}" y="${n ? -20 : 4}">${name}</text></g>`;
    }).join('');
    $('.map-count', el).textContent = `${list.length} ${list.length === 1 ? 'property' : 'properties'} · tap a pin to filter`;
  }
  const cardsDim = area => $$(gridSel + ' .property-card').forEach(c => { const p = byId(c.dataset.id); c.classList.toggle('dim', !!area && (!p || p.location !== area)); });
  pins.addEventListener('mouseover', e => { const g = e.target.closest('.pin:not(.empty)'); cardsDim(g ? g.dataset.area : ''); });
  pins.addEventListener('mouseleave', () => cardsDim(''));
  const choose = g => {
    if (!g || g.classList.contains('empty')) return;
    const area = g.dataset.area;
    onPick(area);
  };
  pins.addEventListener('click', e => choose(e.target.closest('.pin')));
  pins.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(e.target.closest('.pin')); } });
  return { update };
}
const mapView = createMap($('#map'), area => pickArea(area), '#properties-grid');
renderHome();
renderMalazi();


/* ---------- property type selects + adaptive listing form ---------- */
$('#property-type').innerHTML = typeOptions('Any property type');
$('#new-type').innerHTML = typeOptions('', 'House');
function syncTypeFields() {
  const t = $('#new-type').value, home = isHome(t);
  $$('.res-only').forEach(r => { r.hidden = !home; });
  $('#new-size-unit').value = TYPE_GROUP[t] === 'Land & farms' ? 'acres' : 'm2';
}
$('#new-type').addEventListener('change', syncTypeFields);
$('#listing-form').addEventListener('reset', () => setTimeout(syncTypeFields, 0));
syncTypeFields();
