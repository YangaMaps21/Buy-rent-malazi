
/* =========================================================
   Pages: Buy, Rent, Malazi, Agents, About + hash router
   ========================================================= */
allDemo.push(
  { id: 'a11', category: 'buy', photo: 'apartment-building', price: 'TSh 1,200,000,000', title: 'Ocean View Penthouse', location: 'Masaki', type: 'Apartment', beds: 4, baths: 3, more: '280 m²', amount: 1200000000, description: 'Top-floor penthouse with wraparound terraces and views across Msasani Bay.' },
  { id: 'a12', category: 'buy', photo: 'garden-home', price: 'TSh 520,000,000', title: 'Family Home with Garden', location: 'Mbezi Beach', type: 'House', beds: 4, baths: 3, more: '350 m²', amount: 520000000, description: 'Spacious family home on a quiet road, with a large garden and staff quarters.' },
  { id: 'a13', category: 'buy', photo: 'family-house', price: 'TSh 380,000,000', title: 'Modern Townhouse', location: 'Mikocheni', type: 'House', beds: 3, baths: 3, more: '210 m²', amount: 380000000, description: 'Low-maintenance townhouse in a secure compound close to schools and shops.' },
  { id: 'a14', category: 'buy', photo: 'garden-home', price: 'TSh 210,000,000', title: 'Coastal Bungalow', location: 'Kigamboni', type: 'House', beds: 3, baths: 2, more: '240 m²', amount: 210000000, description: 'A calm single-storey home minutes from Kigamboni\'s beaches.' },
  { id: 'a15', category: 'buy', photo: 'courtyard-pool', price: 'TSh 1,800,000,000', title: 'Luxury Pool Villa', location: 'Oyster Bay', type: 'Villa', beds: 5, baths: 5, more: '600 m²', amount: 1800000000, description: 'Architect-designed villa with a palm-lined pool, entertainment deck and guest wing.' },
  { id: 'a16', category: 'rent', photo: 'city-living-room', price: 'TSh 3,200,000 / month', title: 'Sea Breeze Apartment', location: 'Masaki', type: 'Apartment', beds: 3, baths: 2, more: '140 m²', amount: 3200000, description: 'Furnished apartment with a sea-facing balcony, backup power and 24-hour security.' },
  { id: 'a17', category: 'rent', photo: 'garden-home', price: 'TSh 1,200,000 / month', title: 'Garden Cottage', location: 'Mikocheni', type: 'House', beds: 2, baths: 1, more: '90 m²', amount: 1200000, description: 'A cosy cottage set in a leafy shared garden.' },
  { id: 'a18', category: 'rent', photo: 'pool-villa', price: 'TSh 6,500,000 / month', title: 'Executive Pool Villa', location: 'Oyster Bay', type: 'Villa', beds: 4, baths: 4, more: '380 m²', amount: 6500000, description: 'Executive villa with private pool, ideal for diplomatic or corporate tenants.' },
  { id: 'a19', category: 'rent', photo: 'family-house', price: 'TSh 2,200,000 / month', title: 'Beachside Family Home', location: 'Kigamboni', type: 'House', beds: 4, baths: 3, more: '300 m²', amount: 2200000, description: 'Family home a short walk from the beach, with a secure parking yard.' },
  { id: 'a20', category: 'malazi', photo: 'bright-bedroom', price: 'TSh 220,000 / night', title: 'Ocean Terrace Suite', location: 'Masaki', type: 'Apartment', beds: 1, baths: 1, more: '2 guests', amount: 220000, description: 'A light-filled suite with a private terrace, perfect for couples.' },
  { id: 'a21', category: 'malazi', photo: 'beachfront-patio', price: 'TSh 450,000 / night', title: 'Kigamboni Beach House', location: 'Kigamboni', type: 'House', beds: 4, baths: 3, more: '8 guests', amount: 450000, description: 'Beachfront house for groups and families, with an open-air dining patio.' },
  { id: 'a23', category: 'buy', photo: null, price: 'TSh 180,000,000', title: '5-Acre Farm with Borehole', location: 'Kigamboni', type: 'Farm', beds: 0, baths: 0, more: '5 acres', amount: 180000000, description: 'Fertile farmland with a borehole, perimeter fence and road access. Ideal for horticulture or poultry.' },
  { id: 'a24', category: 'buy', photo: null, price: 'TSh 95,000,000', title: 'Residential Plot with Title Deed', location: 'Mbezi Beach', type: 'Land', beds: 0, baths: 0, more: '1,200 m²', amount: 95000000, description: 'Surveyed residential plot on a quiet road, title deed available.' },
  { id: 'a25', category: 'rent', photo: null, price: 'TSh 4,500,000 / month', title: 'Office Space on Bagamoyo Road', location: 'Mikocheni', type: 'Office', beds: 0, baths: 2, more: '180 m²', amount: 4500000, description: 'Open-plan office floor with parking, backup generator and fibre internet.' },
  { id: 'a26', category: 'rent', photo: null, price: 'TSh 6,000,000 / month', title: 'Warehouse / Godown', location: 'Kigamboni', type: 'Warehouse', beds: 0, baths: 1, more: '800 m²', amount: 6000000, description: 'Secure warehouse with loading bay and truck access.' },
  { id: 'a22', category: 'malazi', photo: 'city-living-room', price: 'TSh 120,000 / night', title: 'Upanga City Loft', location: 'Upanga', type: 'Apartment', beds: 1, baths: 1, more: '2 guests', amount: 120000, description: 'Smart city loft for business trips, close to the CBD.' }
);

const AREAS_LIST = ['Masaki', 'Oyster Bay', 'Mikocheni', 'Mbezi Beach', 'Kigamboni', 'Upanga'];
const ROOF = '<span class="brm-mark" aria-hidden="true"></span>';
const CAT = {
  buy: {
    label: 'Buy', title: 'Homes for Sale', crumb: 'Buy', photo: 'pool-villa',
    intro: 'Houses, apartments and villas for sale across Dar es Salaam, listed directly by owners and independent agents.',
    unit: '', addCat: 'buy',
    tipsTitle: 'Buying safely in Tanzania',
    tips: [['View in person', 'Always visit the property before agreeing to anything or paying any money.'],
           ['Verify the title', 'Ask for the title deed and confirm ownership with an official land registry search.'],
           ['Use a lawyer', 'A property lawyer can check documents and draft the sale agreement for you.'],
           ['Pay securely', 'Never pay deposits in cash or to personal accounts before documents are verified.']]
  },
  rent: {
    label: 'Rent', title: 'Properties to Rent', crumb: 'Rent', photo: 'city-living-room',
    intro: 'Apartments, family homes and villas to rent long-term, with monthly prices shown upfront.',
    unit: ' / month', addCat: 'rent',
    tipsTitle: 'Renting with confidence',
    tips: [['View before you pay', 'Never pay a deposit or "viewing fee" for a home you have not seen.'],
           ['Read the lease', 'Check the rent, the deposit, how many months are due upfront, and notice periods.'],
           ['Confirm the landlord', 'Make sure the person you deal with owns the property or has written authority.'],
           ['Record the condition', 'Take dated photos when you move in to protect your deposit.']]
  },
  malazi: {
    label: 'Malazi', title: 'Malazi Stays', crumb: 'Malazi', photo: 'beachfront-patio',
    intro: '<em class="sw">Malazi</em> is Swahili for accommodation: short stays, holiday homes and city suites, priced per night.',
    unit: ' / night', addCat: 'malazi',
    tipsTitle: 'Booking a stay',
    tips: [['Check the details', 'Confirm the guest numbers, check-in times and what is included before you travel.'],
           ['Talk to the host', 'Ask about parking, backup power, water and security.'],
           ['Agree in writing', 'Get the price, dates and cancellation terms confirmed by message or email.'],
           ['Pay safely', 'Avoid paying the full amount upfront to someone you have not verified.']]
  }
};
const PRICE_OPTS = {
  buy: { min: [['', 'No minimum'], [100e6, '100 million'], [300e6, '300 million'], [500e6, '500 million'], [1e9, '1 billion']],
         max: [['', 'No maximum'], [300e6, '300 million'], [500e6, '500 million'], [1e9, '1 billion'], [2e9, '2 billion']] },
  rent: { min: [['', 'No minimum'], [1e6, '1 million'], [2e6, '2 million'], [3e6, '3 million']],
          max: [['', 'No maximum'], [1.5e6, '1.5 million'], [2.5e6, '2.5 million'], [4e6, '4 million'], [7e6, '7 million']] },
  malazi: { min: [['', 'No minimum'], [100000, '100,000'], [200000, '200,000'], [300000, '300,000']],
            max: [['', 'No maximum'], [150000, '150,000'], [250000, '250,000'], [350000, '350,000'], [500000, '500,000']] }
};
const opts = (list, val) => list.map(([v, l]) => `<option value="${v}"${String(v) === String(val ?? '') ? ' selected' : ''}>${l}</option>`).join('');
const sel = (id, label, html) => `<div class="field"><label for="${id}">${label}</label><select id="${id}">${html}</select></div>`;

function pageHero(key, eyebrow, title, intro, crumb, stats = '') {
  return `<section class="page-hero"><img class="page-hero-img" src="${IMG[PHOTO[key]]}" alt=""><div class="container page-hero-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a><span>/</span><span aria-current="page">${crumb}</span></nav>
    <span class="brm-mark light page-roof" aria-hidden="true"></span><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="page-intro">${intro}</p>${stats}</div></section>`;
}

/* ---------- catalogue pages ---------- */
function catalogPage(cat, params) {
  const c = CAT[cat], page = $(`[data-page="${cat}"]`);
  const items = allItems().filter(p => p.category === cat);
  const areas = new Set(items.map(p => p.location)).size;
  const stats = `<div class="page-stats"><span><b>${items.length}</b> listings</span><span><b>${areas}</b> areas</span><span><b>Free</b> to list</span></div>`;
  const P = PRICE_OPTS[cat];
  const datesHTML = cat === 'malazi'
    ? `<div class="field"><label for="${cat}-in">Check-in</label><input type="date" id="${cat}-in" value="${params.get('in') || ''}"></div>
       <div class="field"><label for="${cat}-out">Check-out</label><input type="date" id="${cat}-out" value="${params.get('out') || ''}"></div>
       ${sel(cat + '-guests', 'Guests', opts([['', 'Any'], [2, '2+'], [4, '4+'], [6, '6+'], [8, '8+']], params.get('guests')))}`
    : sel(cat + '-beds', 'Bedrooms', opts([['', 'Any'], [1, '1+'], [2, '2+'], [3, '3+'], [4, '4+'], [5, '5+']], params.get('beds')));
  page.innerHTML = pageHero(c.photo, ({ buy: 'For buyers', rent: 'For renters', malazi: 'Short stays' })[cat], c.title, c.intro, c.crumb, stats) + `
  <div class="container"><form class="filter-bar" id="${cat}-filters">
    ${sel(cat + '-loc', 'Location', opts([['', 'All areas'], ...AREAS_LIST.map(a => [a, a])], params.get('loc')))}
    ${sel(cat + '-type', 'Property type', typeOptions('Any type', params.get('type')))}
    ${datesHTML}
    ${sel(cat + '-min', `Min price (TSh${c.unit})`, opts(P.min, params.get('min')))}
    ${sel(cat + '-max', `Max price (TSh${c.unit})`, opts(P.max, params.get('max')))}
    <button type="reset" class="outline-btn filter-reset">Reset</button>
  </form>
  <div class="map-band" id="${cat}-map" aria-label="Map of ${c.title.toLowerCase()}"></div>
  <div class="catalog-head"><p class="catalog-count" id="${cat}-count" aria-live="polite"></p>
    <div class="sort"><label for="${cat}-sort">Sort by</label><select id="${cat}-sort">${opts([['featured', 'Featured'], ['low', 'Price: low to high'], ['high', 'Price: high to low'], ['beds', 'Most bedrooms']], params.get('sort') || 'featured')}</select></div></div>
  <div class="property-grid catalog-grid" id="${cat}-list"></div>
  <div class="empty-state" id="${cat}-empty">${ROOF}No listings match these filters yet. Try another area or widen the price range.</div>
  <section class="tips"><div class="tips-head"><p class="eyebrow">Good to know</p><h2>${c.tipsTitle}</h2></div>
    <div class="tips-grid">${c.tips.map(([t, d], i) => `<div class="tip"><span class="tip-n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></section>
  </div>
  ${ctaBand(cat)}`;
  const f = $(`#${cat}-filters`), g = $(`#${cat}-list`);
  const map = createMap($(`#${cat}-map`), area => { $(`#${cat}-loc`).value = area; apply(); }, `#${cat}-list`);
  function apply() {
    const v = id => $(`#${cat}-${id}`) ? $(`#${cat}-${id}`).value : '';
    const loc = v('loc'), type = v('type'), min = +v('min') || 0, max = +v('max') || Infinity, beds = +v('beds') || 0, guests = +v('guests') || 0;
    let list = allItems().filter(p => p.category === cat && (!loc || p.location === loc) && (!type || p.type === type)
      && p.amount >= min && p.amount <= max && p.beds >= beds && (!guests || (parseInt(p.more) || 0) >= guests));
    const sort = v('sort');
    if (!sort || sort === 'featured') list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (sort === 'low') list.sort((a, b) => a.amount - b.amount);
    if (sort === 'high') list.sort((a, b) => b.amount - a.amount);
    if (sort === 'beds') list.sort((a, b) => b.beds - a.beds);
    g.innerHTML = list.map(cardHTML).join('') + addCardHTML(c.addCat);
    $(`#${cat}-empty`).classList.toggle('show', !list.length);
    $(`#${cat}-count`).innerHTML = `<b>${list.length}</b> ${list.length === 1 ? 'property' : 'properties'}${loc ? ` in ${loc}` : ''}`;
    map.update(list, loc);
    reveal(g);
  }
  f.addEventListener('change', apply);
  $(`#${cat}-sort`).addEventListener('change', apply);
  f.addEventListener('reset', () => setTimeout(apply, 0));
  f.addEventListener('submit', e => e.preventDefault());
  apply();
}

function ctaBand(cat) {
  const t = { buy: ['Selling a property?', 'Reach serious buyers across Tanzania. Listing is free.', 'buy', 'Sell your property'],
              rent: ['Have a place to rent out?', 'Find reliable tenants faster. Listing is free.', 'rent', 'Rent out your property'],
              malazi: ['Host guests with Malazi', 'Share your home, suite or holiday house for short stays.', 'malazi', 'List your stay'],
              agents: ['Are you a property agent?', 'Showcase your listings to people searching in your area.', '', 'List a property'],
              about: ['Ready to find your place?', 'Browse homes to buy, rent or stay, or list your own for free.', '', 'List a property'] }[cat];
  return `<section class="page-cta"><div class="container page-cta-inner"><div>${'<span class="brm-mark light" aria-hidden="true"></span>'}<h2>${t[0]}</h2><p>${t[1]}</p></div>
    <div class="page-cta-actions"><button type="button" class="primary-btn" data-list-cat="${t[2]}">${t[3]} ${ICON.arrow}</button>
    <p class="cta-terms">Free to list. Subject to our <button type="button" class="link-btn" data-open-terms>Listing Terms</button>.</p></div></div></section>`;
}

/* ---------- agents ---------- */
const AGENTS = [
  ['Amina Said', 'Coastal Home Realty', 'Masaki', ['Sales', 'Rentals'], 12], ['Juma Mwinyi', 'Urban Properties', 'Mikocheni', ['Rentals'], 9],
  ['Neema Hassan', 'Tanzania Estates', 'Oyster Bay', ['Sales'], 15], ['Salim Rashid', 'City Living', 'Upanga', ['Rentals', 'Malazi'], 7],
  ['Grace Mushi', 'Bayview Homes', 'Mbezi Beach', ['Sales', 'Malazi'], 11], ['Baraka Mollel', 'South Coast Realty', 'Kigamboni', ['Sales', 'Rentals'], 6],
  ['Rehema Ally', 'Msasani Stays', 'Masaki', ['Malazi'], 8], ['David Kimaro', 'Dar Property Hub', 'Mikocheni', ['Sales', 'Rentals'], 10]
];
const CAMERA_ICO = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l1.6-2.2h6.8L17 8h3v11H4z"/><circle cx="12" cy="13.2" r="3.4"/></svg>';
function agentsPage() {
  const page = $('[data-page="agents"]');
  page.innerHTML = pageHero('apartment-building', 'Find Agents', 'Property Agents Near You',
    'Independent agents who list on Buy Rent Malazi. Browse by area and contact them directly.', 'Find Agents',
    `<div class="page-stats"><span><b>${AGENTS.length}</b> agents</span><span><b>${new Set(AGENTS.map(a => a[2])).size}</b> areas</span></div>`) + `
  <div class="container"><form class="filter-bar agents-filter" id="agent-filters" onsubmit="return false">
    <div class="field field-grow"><label for="agent-q">Search</label><input id="agent-q" type="search" placeholder="Agent or agency name"></div>
    ${sel('agent-area', 'Area', opts([['', 'All areas'], ...AREAS_LIST.map(a => [a, a])]))}
    <div class="chips" role="group" aria-label="Speciality">${['All', 'Sales', 'Rentals', 'Malazi'].map((c, i) => `<button type="button" class="chip${i ? '' : ' on'}" data-spec="${i ? c : ''}">${c}</button>`).join('')}</div>
  </form>
  <p class="catalog-count" id="agent-count"></p>
  <div class="agents-grid agents-page-grid" id="agent-grid"></div>
  <div class="empty-state" id="agent-empty">${ROOF}No agents match yet. Try another area.</div>
  <p class="agents-footnote">Buy Rent Malazi is a listing platform, not an estate agency. Agents are independent and are not employed or endorsed by us. Names shown are placeholders.</p>
  <section class="tips"><div class="tips-head"><p class="eyebrow">Working with an agent</p><h2>Questions worth asking</h2></div>
  <div class="tips-grid">${[['Are you registered?', 'Ask whether the agent holds any registration or licence required to practise.'], ['Who do you represent?', 'Check whether they act for the owner, the buyer or tenant, or both.'], ['What are your fees?', 'Agree on commission or fees in writing before any viewing.'], ['Can I see the documents?', 'A good agent will help you verify ownership early.']].map(([t, d], i) => `<div class="tip"><span class="tip-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></section></div>
  ${ctaBand('agents')}`;
  let spec = '';
  const apply = () => {
    const q = $('#agent-q').value.trim().toLowerCase(), area = $('#agent-area').value;
    const list = AGENTS.filter(([n, ag, ar, sp]) => (!q || (n + ' ' + ag).toLowerCase().includes(q)) && (!area || ar === area) && (!spec || sp.includes(spec)));
    $('#agent-grid').innerHTML = list.map(([n, ag, ar, sp, k], i) => `<div class="agent-card" data-reveal style="--d:${(i % 4) * 0.07}s">
      <div class="agent-photo" role="img" aria-label="Agent photo placeholder">${CAMERA_ICO}<span>Agent photo</span></div>
      <div class="agent-body"><div class="agent-name">${n}</div><p>${ag}</p><p class="agent-loc">${ICON.pin}${ar}, Dar es Salaam</p>
      <div class="agent-tags">${sp.map(x => `<span>${x}</span>`).join('')}</div><small>${k} sample listings</small>
      <div class="agent-actions"><button type="button" class="agent-btn" data-agent>View listings</button><button type="button" class="agent-btn ghost" data-agent-contact="${n}">Contact</button></div></div></div>`).join('');
    $('#agent-empty').classList.toggle('show', !list.length);
    $('#agent-count').innerHTML = `<b>${list.length}</b> ${list.length === 1 ? 'agent' : 'agents'}${area ? ` in ${area}` : ''}`;
    reveal($('#agent-grid'));
  };
  $('#agent-q').addEventListener('input', apply); $('#agent-area').addEventListener('change', apply);
  $$('.chip', page).forEach(ch => ch.addEventListener('click', () => { spec = ch.dataset.spec; $$('.chip', page).forEach(x => x.classList.toggle('on', x === ch)); apply(); }));
  apply();
}
document.addEventListener('click', e => {
  if (e.target.closest('[data-agent]')) toast('Agent profiles with their listings arrive with the live platform.');
  const c = e.target.closest('[data-agent-contact]'); if (c) toast(`Contact details for ${c.dataset.agentContact} will appear when profiles go live.`);
});

/* ---------- about ---------- */
function aboutPage() {
  const page = $('[data-page="about"]');
  const step = (n, t, d) => `<li><span class="step-n">${n}</span><div><h4>${t}</h4><p>${d}</p></div></li>`;
  const faq = [
    ['Is Buy Rent Malazi an estate agency?', 'No. We are a listing platform. Owners, landlords, hosts and independent agents list their properties, and you contact them directly. We are not a party to any sale, lease or booking.'],
    ['How much does it cost to list?', 'Standard listings are free. If we introduce optional paid features later, prices will always be shown before you choose them.'],
    ['What does "Malazi" mean?', 'Malazi is Swahili for accommodation. On our site it means short stays: holiday homes, city suites and guest houses priced per night.'],
    ['Do you check listings?', 'We review listings and remove anything that breaks our Listing Terms or looks fraudulent. Always view a property and verify ownership yourself before paying.'],
    ['Which areas do you cover?', 'We are starting in Dar es Salaam (Masaki, Oyster Bay, Mikocheni, Mbezi Beach, Kigamboni, Upanga and more) and will expand across Tanzania.'],
    ['How many photos can I add?', 'Up to 8 photos and one walkthrough video per listing.']
  ];
  page.innerHTML = pageHero('garden-home', 'About us', 'Find Your Place in Tanzania',
    'A homegrown listing platform bringing homes to buy, properties to rent and places to stay together in one simple, trustworthy place.', 'About') + `
  <div class="container">
    <section class="about-split"><div><p class="eyebrow">Our story</p><h2>Built for how Tanzania looks for property</h2>
      <p>Finding a home in Dar es Salaam often means scrolling through scattered social posts, chasing phone numbers and hoping a listing is real. Buy Rent Malazi brings it all into one place, with clear prices in TSh, real photos and direct contact with the people listing.</p>
      <p>We started in Dar es Salaam, and our goal is simple: <strong>Dar es Salaam first. Tanzania next.</strong></p></div>
      <div class="about-card"><h3>What we are</h3><ul class="ticks"><li>A free listing platform for owners, landlords, hosts and agents</li><li>One place to buy, rent or book a short stay</li><li>Clear prices, real photos and direct contact</li></ul>
      <h3>What we are not</h3><ul class="crosses"><li>An estate agency or broker</li><li>A party to any sale, lease or booking</li><li>A place to send deposits</li></ul></div></section>
    <section class="how"><div class="tips-head"><p class="eyebrow">How it works</p><h2>Simple for everyone</h2></div>
      <div class="how-grid"><div class="how-col"><h3>Looking for a place</h3><ol class="steps">${step(1, 'Search', 'Choose Buy, Rent or Malazi, then filter by area, price and size.')}${step(2, 'Shortlist', 'Save favourites and compare photos, prices and locations on the map.')}${step(3, 'Contact directly', 'Enquire with the owner or agent, view in person, and verify before you pay.')}</ol></div>
      <div class="how-col"><h3>Listing a property</h3><ol class="steps">${step(1, 'Add details', 'Title, price, location and key features, in a few minutes.')}${step(2, 'Upload media', 'Up to 8 photos and a walkthrough video.')}${step(3, 'Get enquiries', 'People searching in your area contact you directly.')}</ol>
      <button type="button" class="primary-btn" data-list-cat="">List a property ${ICON.arrow}</button></div></div></section>
    <section class="trust"><div class="tips-head"><p class="eyebrow">Trust &amp; safety</p><h2>Our commitments</h2></div>
      <div class="tips-grid">${[['Clear terms', 'Every lister agrees to our Listing Terms before publishing.'], ['Fraud reporting', 'Suspicious listings can be reported and are removed quickly.'], ['Privacy first', 'Contact details are shared only with genuine enquirers. We never sell data.'], ['Safety guidance', 'Practical tips on every page to help you buy, rent and book safely.']].map(([t, d], i) => `<div class="tip"><span class="tip-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></section>
    <section class="faq" id="faq"><div class="tips-head"><p class="eyebrow">FAQ</p><h2>Questions, answered</h2></div>
      <div class="faq-list">${faq.map(([q, a]) => `<details class="faq-item"><summary>${q}<span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-a"><p>${a}</p></div></details>`).join('')}</div></section>
    <section class="contact"><div><p class="eyebrow">Contact</p><h2>Talk to us</h2><p>Questions about listing, partnerships or a report about a listing? We would love to hear from you.</p></div>
      <div class="contact-cards"><div class="contact-card"><span>Email</span><strong>hello@buyrentmalazi.co.tz</strong><small>placeholder</small></div><div class="contact-card"><span>WhatsApp</span><strong>+255 ··· ··· ···</strong><small>placeholder</small></div><div class="contact-card"><span>Office</span><strong>Dar es Salaam, Tanzania</strong><small>by appointment</small></div></div></section>
  </div>
  ${ctaBand('about')}`;
}

/* ---------- router ---------- */
const TITLES = { account: 'My Account | Buy Rent Malazi', home: 'Buy | Rent | Malazi: Find Your Place in Tanzania', buy: 'Homes for Sale in Tanzania | Buy Rent Malazi', rent: 'Properties to Rent | Buy Rent Malazi', malazi: 'Malazi Stays: Short-Stay Accommodation | Buy Rent Malazi', agents: 'Property Agents Near You | Buy Rent Malazi', about: 'About Buy Rent Malazi' };
let currentPage = 'home';
const PATH_MODE = !!window.BRM_LIVE;
function router() {
  const h = PATH_MODE ? ('#' + location.pathname + location.search) : (location.hash || '#/');
  if (PATH_MODE && location.hash && location.hash.length > 1) { const t = document.getElementById(location.hash.slice(1)); if (t) { show('home'); requestAnimationFrame(() => t.scrollIntoView()); return; } }
  if (!h.startsWith('#/')) { // in-page anchor on home
    const t = document.getElementById(h.slice(1));
    if (t && currentPage !== 'home') show('home');
    return;
  }
  const [path, query] = h.slice(2).split('?');
  const [name, sub] = path.split('/');
  const params = new URLSearchParams(query || '');
  const page = ({ '': 'home', buy: 'buy', rent: 'rent', malazi: 'malazi', agents: 'agents', about: 'about', locations: 'home', account: 'account' })[name] || 'home';
  if (page === 'account') { if (window.LIVE) LIVE.accountPage(); else { show('home'); return; } }
  if (page === 'buy' || page === 'rent' || page === 'malazi') catalogPage(page, params);
  if (page === 'agents') agentsPage();
  if (page === 'about') aboutPage();
  show(page);
  const target = name === 'locations' ? $('#locations') : (sub === 'faq' ? $('#faq') : null);
  requestAnimationFrame(() => target ? target.scrollIntoView({ behavior: 'auto' }) : scrollTo({ top: 0, behavior: 'auto' }));
}
function show(page) {
  currentPage = page;
  $$('.page').forEach(p => { const on = p.dataset.page === page; p.hidden = !on; p.classList.toggle('is-active', on); });
  $$('#navlinks a').forEach(a => { const on = a.dataset.route === page; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
  document.title = TITLES[page];
  closeMenu();
  if (page !== 'home') reveal($(`[data-page="${page}"]`));
  if (page === 'home') { renderHome(); renderMalazi(); }
}
function go(path) {
  if (PATH_MODE) { if (location.pathname + location.search !== path) history.pushState({}, '', path); router(); }
  else if (location.hash === '#' + path) router(); else location.hash = '#' + path;
}
if (PATH_MODE) {
  addEventListener('popstate', router);
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="/"]'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    e.preventDefault(); go(a.getAttribute('href'));
  });
} else addEventListener('hashchange', router);
router();

/* ---------- small extras ---------- */
$('#wa-btn').addEventListener('click', () => toast('WhatsApp enquiries connect to the lister once live listings launch.'));
const toTop = $('#to-top');
addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 900), { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
