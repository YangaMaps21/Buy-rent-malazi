
/* =========================================================
   Live backend (Supabase). Loaded only on the live site.
   ========================================================= */
(() => {
  if (!window.BRM_LIVE || !window.supabase) return;
  const sb = window.supabase.createClient(BRM_LIVE.url, BRM_LIVE.key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  const BUCKET = 'listing-media';
  const FEATURE = { '7d': { days: 7, price: 10000 }, '30d': { days: 30, price: 30000 } }; // example prices, set before launch
  const PROVIDERS = [['mpesa', 'M-Pesa'], ['tigopesa', 'Mixx by Yas (Tigo Pesa)'], ['airtelmoney', 'Airtel Money'], ['halopesa', 'HaloPesa']];
  let me = null, afterAuth = null;

  Object.assign(SW, {
    'Account': 'Akaunti', 'My account': 'Akaunti yangu', 'My Account': 'Akaunti Yangu', 'Sign out': 'Toka', 'Create account': 'Fungua akaunti', 'Full name': 'Jina kamili',
    'Password': 'Nenosiri', 'Forgot password?': 'Umesahau nenosiri?', 'Sign in to list properties, save favourites and see enquiries.': 'Ingia ili kutangaza mali, kuhifadhi vipendwa na kuona maulizo.',
    'Create your free account to list properties and save favourites.': 'Fungua akaunti yako ya bure ili kutangaza mali na kuhifadhi vipendwa.',
    'My listings': 'Matangazo yangu', 'Enquiries received': 'Maulizo yaliyopokelewa', 'Saved properties': 'Mali ulizohifadhi', 'Pending review': 'Inasubiri ukaguzi', 'Not approved': 'Haikuidhinishwa', 'Live': 'Hewani', 'Featured': 'Imeangaziwa',
    'Feature this listing': 'Angazia tangazo hili', 'Delete': 'Futa', 'You have not listed a property yet.': 'Bado hujatangaza mali.', 'No enquiries yet.': 'Bado hakuna maulizo.', 'No saved properties yet.': 'Bado hujahifadhi mali.',
    'Feature your listing': 'Angazia tangazo lako', 'Featured listings appear first in search results and on the homepage.': 'Matangazo yaliyoangaziwa huonekana kwanza kwenye matokeo na ukurasa wa mwanzo.',
    '7 days': 'Siku 7', '30 days': 'Siku 30', 'Pay with': 'Lipa kwa', 'Mobile money number': 'Namba ya pesa kwa simu', 'Request featuring': 'Omba kuangaziwa',
    'Mobile money payments are being connected. Your request is saved and you will not be charged until payments go live.': 'Malipo ya pesa kwa simu yanaunganishwa. Ombi lako limehifadhiwa na hutatozwa hadi malipo yaanze.',
    'Send an enquiry': 'Tuma ulizo', 'Your name': 'Jina lako', 'Phone': 'Simu', 'Message': 'Ujumbe', 'Send enquiry': 'Tuma ulizo', 'Your enquiry has been sent to the lister.': 'Ulizo lako limetumwa kwa mtangazaji.',
    'Please sign in to publish your listing.': 'Tafadhali ingia ili kuchapisha tangazo lako.', 'Uploading your listing…': 'Inapakia tangazo lako…',
    'Submitted! Your listing will go live after a quick review.': 'Imetumwa! Tangazo lako litaonekana baada ya ukaguzi mfupi.', 'Signed in': 'Umeingia', 'Signed out': 'Umetoka',
    'Check your email to confirm your account, then sign in.': 'Angalia barua pepe yako kuthibitisha akaunti, kisha ingia.', 'Password reset link sent. Check your email.': 'Kiungo cha kubadilisha nenosiri kimetumwa. Angalia barua pepe yako.',
    'Set a new password': 'Weka nenosiri jipya', 'Save password': 'Hifadhi nenosiri', 'Password updated': 'Nenosiri limesasishwa', 'Listing deleted': 'Tangazo limefutwa',
    'Signed in as': 'Umeingia kama', 'Video must be under 50 MB.': 'Video lazima iwe chini ya MB 50.', 'Request saved': 'Ombi limehifadhiwa'
  });

  /* ---------- helpers ---------- */
  const priceText = (c, n) => `TSh ${fmt(n)}${c === 'rent' ? ' / month' : c === 'malazi' ? ' / night' : ''}`;
  const friendly = err => (err && (err.message || err.error_description)) || 'Something went wrong. Please try again.';
  function mapRow(r) {
    const m = (r.listing_media || []).slice().sort((a, b) => a.position - b.position);
    const photos = m.filter(x => x.kind === 'photo').map(x => x.url), vid = m.find(x => x.kind === 'video');
    return { id: r.id, category: r.category, title: r.title, description: r.description || '', location: r.location, type: r.property_type,
      beds: r.beds, baths: r.baths, more: r.max_guests ? `${r.max_guests} guests` : (r.size_m2 ? `${r.size_m2} m²` : ''),
      amount: Number(r.price), price: priceText(r.category, Number(r.price)), image: photos[0] || r.cover_url || '', images: photos, video: vid ? vid.url : '',
      user: !!(me && r.owner_id === me.id), status: r.status, featured: !!(r.featured_until && new Date(r.featured_until) > new Date()), owner: r.owner_id };
  }
  function modal(id, html) {
    let o = document.getElementById(id);
    if (!o) {
      o = document.createElement('div'); o.className = 'overlay'; o.id = id; o.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(o, $('#to-top'));
      o.addEventListener('click', e => { if (e.target === o || e.target.closest('[data-close]')) closeModal(o); });
    }
    o.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><button type="button" class="modal-close" data-close aria-label="Close">×</button><div class="modal-main">${html}</div></div>`;
    return o;
  }

  /* ---------- data ---------- */
  async function load() {
    const [{ data: rows, error }, { data: agents }] = await Promise.all([
      sb.from('listings').select('*, listing_media(kind,url,position)').order('sort_order').order('created_at', { ascending: false }),
      sb.from('agents').select('*').order('created_at')
    ]);
    if (error) { console.warn('listings', error); return; }
    allDemo.length = 0; rows.map(mapRow).forEach(x => allDemo.push(x));
    userListings = [];
    if (agents && agents.length) { AGENTS.length = 0; agents.forEach(a => AGENTS.push([a.name, a.agency || '', a.area || '', a.specialties || [], a.listings_count || 0])); }
    if (me) {
      const { data: f } = await sb.from('favourites').select('listing_id');
      favs = new Set((f || []).map(x => x.listing_id)); updateFavCount();
    }
    router();
  }

  /* ---------- auth ---------- */
  function setHeader() {
    const b = $('#sign-in'); if (!b) return;
    b.lastChild.nodeValue = me ? 'My account' : 'Sign In';
    $$('.nav-account').forEach(a => { a.textContent = me ? 'My account' : 'Sign In'; });
  }
  function openAuth(next, mode = 'in') {
    afterAuth = next || null;
    const o = modal('auth-overlay', `<p class="eyebrow">Account</p><h2 id="auth-title">${mode === 'up' ? 'Create account' : mode === 'reset' ? 'Set a new password' : 'Sign In'}</h2>
      <p class="auth-sub">${mode === 'up' ? 'Create your free account to list properties and save favourites.' : mode === 'reset' ? '' : 'Sign in to list properties, save favourites and see enquiries.'}</p>
      ${mode === 'reset' ? '' : `<div class="auth-tabs" role="tablist"><button type="button" class="${mode === 'in' ? 'on' : ''}" data-auth="in">Sign In</button><button type="button" class="${mode === 'up' ? 'on' : ''}" data-auth="up">Create account</button></div>`}
      <form id="auth-form" class="form-grid auth-form">
        ${mode === 'up' ? '<div class="form-row wide"><label for="auth-name">Full name</label><input id="auth-name" autocomplete="name" required maxlength="80"></div>' : ''}
        ${mode === 'reset' ? '' : '<div class="form-row wide"><label for="auth-email">Email</label><input id="auth-email" type="email" required autocomplete="email"></div>'}
        <div class="form-row wide"><label for="auth-pass">Password</label><input id="auth-pass" type="password" required minlength="8" autocomplete="${mode === 'in' ? 'current-password' : 'new-password'}"></div>
        <div class="form-row wide"><button type="submit" class="primary-btn">${mode === 'up' ? 'Create account' : mode === 'reset' ? 'Save password' : 'Sign In'}</button>
        ${mode === 'in' ? '<button type="button" class="link-btn auth-forgot" id="auth-forgot">Forgot password?</button>' : ''}<p class="form-msg auth-msg" id="auth-msg" role="status"></p></div>
      </form>`);
    o.querySelectorAll('[data-auth]').forEach(t => t.addEventListener('click', () => openAuth(afterAuth, t.dataset.auth)));
    const msg = t => { $('#auth-msg').textContent = t; };
    $('#auth-forgot') && $('#auth-forgot').addEventListener('click', async () => {
      const email = $('#auth-email').value.trim(); if (!email) return msg('Enter your email first.');
      const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + '/account' });
      msg(error ? friendly(error) : 'Password reset link sent. Check your email.');
    });
    $('#auth-form').addEventListener('submit', async e => {
      e.preventDefault(); const btn = e.target.querySelector('button[type=submit]'); btn.disabled = true; msg('');
      try {
        if (mode === 'reset') {
          const { error } = await sb.auth.updateUser({ password: $('#auth-pass').value }); if (error) throw error;
          toast('Password updated'); closeModal(o); return;
        }
        const email = $('#auth-email').value.trim(), password = $('#auth-pass').value;
        if (mode === 'up') {
          const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: $('#auth-name').value.trim() }, emailRedirectTo: location.origin + '/account' } });
          if (error) throw error;
          if (!data.session) { msg('Check your email to confirm your account, then sign in.'); return; }
        } else {
          const { error } = await sb.auth.signInWithPassword({ email, password }); if (error) throw error;
        }
        closeModal(o); toast('Signed in');
        const next = afterAuth; afterAuth = null; if (next) setTimeout(next, 300);
      } catch (err) { msg(friendly(err)); } finally { btn.disabled = false; }
    });
    openModal('auth-overlay');
  }
  sb.auth.onAuthStateChange((event, session) => {
    const was = me && me.id; me = session ? session.user : null; setHeader();
    if (event === 'PASSWORD_RECOVERY') openAuth(null, 'reset');
    if ((me && me.id) !== was) load();
  });

  /* ---------- listing submission ---------- */
  async function submitListing(p, media, form) {
    if (!me) { toast('Please sign in to publish your listing.'); openAuth(() => { openModal('list-overlay'); }); return; }
    const vf = media.videoFile;
    if (vf && vf.size > 50 * 1024 * 1024) { toast('Video must be under 50 MB.'); return; }
    const btn = form.querySelector('button[type=submit]'); btn.disabled = true; toast('Uploading your listing…');
    try {
      const guests = p.category === 'malazi' ? parseInt(p.more) || null : null;
      const { data: l, error } = await sb.from('listings').insert({ category: p.category, title: p.title, description: p.description || null, location: p.location,
        property_type: p.type, beds: p.beds, baths: p.baths, price: p.amount, max_guests: guests }).select().single();
      if (error) throw error;
      const rows = []; const photos = media.photos;
      for (let i = 0; i < photos.length; i++) {
        const blob = await (await fetch(photos[i])).blob(); const path = `${me.id}/${l.id}/photo-${i + 1}.jpg`;
        const up = await sb.storage.from(BUCKET).upload(path, blob, { contentType: 'image/jpeg' }); if (up.error) throw up.error;
        rows.push({ listing_id: l.id, kind: 'photo', url: sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl, storage_path: path, position: i });
      }
      if (vf) {
        const ext = (vf.name.split('.').pop() || 'mp4').toLowerCase().replace(/[^a-z0-9]/g, ''); const path = `${me.id}/${l.id}/video.${ext}`;
        const up = await sb.storage.from(BUCKET).upload(path, vf, { contentType: vf.type || 'video/mp4' }); if (up.error) throw up.error;
        rows.push({ listing_id: l.id, kind: 'video', url: sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl, storage_path: path, position: 99 });
      }
      if (rows.length) { const { error: me2 } = await sb.from('listing_media').insert(rows); if (me2) throw me2; }
      if (rows[0] && rows[0].kind === 'photo') await sb.from('listings').update({ cover_url: rows[0].url }).eq('id', l.id);
      form.reset(); media.reset(); closeModal($('#list-overlay'));
      await load(); go('/account');
      toast('Submitted! Your listing will go live after a quick review.');
    } catch (err) { toast(friendly(err)); } finally { btn.disabled = false; }
  }

  /* ---------- favourites + enquiries ---------- */
  async function fav(id, on) {
    if (!me || !/^[0-9a-f-]{36}$/.test(id)) return;
    if (on) await sb.from('favourites').upsert({ user_id: me.id, listing_id: id });
    else await sb.from('favourites').delete().eq('user_id', me.id).eq('listing_id', id);
  }
  function enquire(id) {
    const p = byId(id); if (!p) return;
    closeModal($('#detail-overlay'));
    const o = modal('enquiry-overlay', `<p class="eyebrow">${esc(p.location)}</p><h2>Send an enquiry</h2><p>${esc(p.title)} · ${esc(p.price)}</p>
      <form id="enq-form" class="form-grid">
        <div class="form-row"><label for="enq-name">Your name</label><input id="enq-name" required minlength="2" maxlength="80" autocomplete="name" value="${esc((me && me.user_metadata && me.user_metadata.full_name) || '')}"></div>
        <div class="form-row"><label for="enq-phone">Phone</label><input id="enq-phone" type="tel" maxlength="30" autocomplete="tel" placeholder="+255"></div>
        <div class="form-row wide"><label for="enq-msg">Message</label><textarea id="enq-msg" maxlength="1000">Hello, I'm interested in "${esc(p.title)}". Is it still available?</textarea></div>
        <div class="form-row wide"><button type="submit" class="primary-btn">Send enquiry</button><p class="form-msg">Your details go only to the lister of this property.</p></div>
      </form>`);
    $('#enq-form').addEventListener('submit', async e => {
      e.preventDefault(); const b = e.target.querySelector('button'); b.disabled = true;
      const { error } = await sb.from('enquiries').insert({ listing_id: id, user_id: me ? me.id : null, name: $('#enq-name').value.trim(), phone: $('#enq-phone').value.trim() || null,
        email: me ? me.email : null, message: $('#enq-msg').value.trim(), channel: 'form' });
      b.disabled = false;
      if (error) return toast(friendly(error));
      closeModal(o); toast('Your enquiry has been sent to the lister.');
    });
    openModal('enquiry-overlay');
  }

  /* ---------- featuring ---------- */
  function feature(id) {
    const p = byId(id); if (!p) return;
    const o = modal('feature-overlay', `<p class="eyebrow">Featured</p><h2>Feature your listing</h2><p>Featured listings appear first in search results and on the homepage.</p>
      <p class="feat-for">${esc(p.title)}</p>
      <form id="feat-form" class="form-grid">
        <div class="form-row wide plans">${Object.entries(FEATURE).map(([k, v], i) => `<label class="plan"><input type="radio" name="plan" value="${k}"${i ? ' checked' : ''}><span class="plan-days">${v.days} days</span><span class="plan-price">TSh ${fmt(v.price)}</span></label>`).join('')}</div>
        <div class="form-row wide"><label>Pay with</label><div class="providers">${PROVIDERS.map(([k, n], i) => `<label class="provider"><input type="radio" name="provider" value="${k}"${i ? '' : ' checked'}><span>${n}</span></label>`).join('')}</div></div>
        <div class="form-row wide"><label for="feat-phone">Mobile money number</label><input id="feat-phone" type="tel" required pattern="^\\+?[0-9 ]{9,15}$" placeholder="+255 7XX XXX XXX" autocomplete="tel"></div>
        <div class="form-row wide"><button type="submit" class="primary-btn">Request featuring</button><p class="form-msg">Mobile money payments are being connected. Your request is saved and you will not be charged until payments go live.</p></div>
      </form>`);
    $('#feat-form').addEventListener('submit', async e => {
      e.preventDefault(); const f = new FormData(e.target), plan = f.get('plan');
      const { error } = await sb.from('featured_requests').insert({ listing_id: id, user_id: me.id, plan, amount: FEATURE[plan].price, provider: f.get('provider'), phone: $('#feat-phone').value.replace(/\s/g, '') });
      if (error) return toast(friendly(error));
      closeModal(o); toast('Request saved');
    });
    openModal('feature-overlay');
  }

  /* ---------- account page ---------- */
  async function accountPage() {
    let page = $('[data-page="account"]');
    if (!page) { page = document.createElement('div'); page.className = 'page'; page.dataset.page = 'account'; page.hidden = true; $('#main').appendChild(page); }
    if (!me) { page.innerHTML = ''; setTimeout(() => openAuth(() => go('/account')), 50); return; }
    const mine = allItems().filter(p => p.owner === me.id);
    const saved = allItems().filter(p => favs.has(p.id));
    const statusTag = p => `<span class="status status-${p.status}">${p.featured ? 'Featured' : p.status === 'pending' ? 'Pending review' : p.status === 'rejected' ? 'Not approved' : 'Live'}</span>`;
    page.innerHTML = `<section class="page-hero page-hero-sm"><div class="container page-hero-inner"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">Account</span></nav>
      <span class="brm-mark light page-roof" aria-hidden="true"></span><h1>My Account</h1><p class="page-intro"><span>Signed in as</span> ${esc(me.email)}</p>
      <div class="page-stats"><button type="button" class="primary-btn" data-list-cat="">List a property ${ICON.arrow}</button><button type="button" class="outline-btn on-dark" id="sign-out">Sign out</button></div></div></section>
      <div class="container account">
        <section><div class="tips-head"><h2>My listings</h2></div>${mine.length ? `<div class="property-grid">${mine.map(p => `<div class="mine">${cardHTML(p)}<div class="mine-bar">${statusTag(p)}<span class="mine-actions">${p.status === 'published' && !p.featured ? `<button type="button" class="agent-btn" data-feature="${p.id}">Feature this listing</button>` : ''}<button type="button" class="agent-btn ghost" data-del="${p.id}">Delete</button></span></div></div>`).join('')}</div>` : '<p class="muted-empty">You have not listed a property yet.</p>'}</section>
        <section><div class="tips-head"><h2>Enquiries received</h2></div><div id="enq-list"><p class="muted-empty">…</p></div></section>
        <section><div class="tips-head"><h2>Saved properties</h2></div>${saved.length ? `<div class="property-grid">${saved.map(cardHTML).join('')}</div>` : '<p class="muted-empty">No saved properties yet.</p>'}</section>
      </div>`;
    $('#sign-out').addEventListener('click', async () => { await sb.auth.signOut(); toast('Signed out'); go('/'); });
    page.querySelectorAll('[data-feature]').forEach(b => b.addEventListener('click', () => feature(b.dataset.feature)));
    page.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', async () => {
      if (b.dataset.confirm !== '1') { b.dataset.confirm = '1'; b.textContent = i18n.lang === 'sw' ? 'Gusa tena kufuta' : 'Tap again to delete'; return; }
      const { error } = await sb.from('listings').delete().eq('id', b.dataset.del); if (error) return toast(friendly(error));
      toast('Listing deleted'); await load();
    }));
    reveal(page);
    if (mine.length) {
      const { data: enq } = await sb.from('enquiries').select('created_at,name,phone,email,message,listing_id').in('listing_id', mine.map(p => p.id)).order('created_at', { ascending: false }).limit(50);
      $('#enq-list').innerHTML = enq && enq.length ? `<div class="enq-table">${enq.map(q => `<div class="enq-row"><div><strong>${esc(q.name)}</strong><span>${esc((byId(q.listing_id) || {}).title || '')}</span></div><p>${esc(q.message || '')}</p><div class="enq-contact">${q.phone ? `<a href="tel:${esc(q.phone)}">${esc(q.phone)}</a>` : ''}${q.email ? `<a href="mailto:${esc(q.email)}">${esc(q.email)}</a>` : ''}<time>${new Date(q.created_at).toLocaleDateString('en-GB')}</time></div></div>`).join('')}</div>` : '<p class="muted-empty">No enquiries yet.</p>';
    } else $('#enq-list').innerHTML = '<p class="muted-empty">No enquiries yet.</p>';
  }

  // mobile menu: account link
  const nav = $('#navlinks');
  if (nav && !$('.nav-account')) { const a = document.createElement('a'); a.href = '/account'; a.className = 'nav-account'; a.dataset.route = 'account'; a.textContent = 'Sign In'; nav.appendChild(a); }
  $('#sign-in').addEventListener('click', e => { if (me) { e.stopImmediatePropagation(); go('/account'); } }, true);

  window.LIVE = { openAuth, submitListing, fav, enquire, accountPage, feature, load };
  sb.auth.getSession().then(({ data }) => { me = data.session ? data.session.user : null; setHeader(); load(); });
})();
