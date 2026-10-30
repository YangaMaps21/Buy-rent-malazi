"""Round-3 page changes: hero roof placement, agents, terms, consent, map slot."""

CAMERA = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l1.6-2.2h6.8L17 8h3v11H4z"/><circle cx="12" cy="13.2" r="3.4"/></svg>'

TERMS = """
<div class="overlay" id="terms-overlay" aria-hidden="true"><div class="modal modal-lg terms-modal" role="dialog" aria-modal="true" aria-labelledby="terms-title"><button type="button" class="modal-close" data-close="terms-overlay" aria-label="Close">×</button><div class="modal-main">
<p class="eyebrow">Legal</p><h2 id="terms-title">Listing Terms &amp; Privacy Policy</h2>
<p class="terms-draft">Draft for review. These terms are a starting point and must be reviewed by a qualified Tanzanian legal practitioner before the platform goes live. Last updated: <span class="terms-date"></span>.</p>
<nav class="terms-toc" aria-label="Sections"><a href="#t1">About us</a><a href="#t2">Who can list</a><a href="#t3">Your listing</a><a href="#t4">Not allowed</a><a href="#t5">Review &amp; removal</a><a href="#t6">Fees</a><a href="#t7">Dealing safely</a><a href="#t8">Liability</a><a href="#t9">Your content</a><a href="#t10">Privacy</a><a href="#t11">Changes &amp; law</a></nav>
<div class="terms-body">
<h3 id="t1">1. About Buy Rent Malazi</h3>
<p>Buy Rent Malazi is an online listing platform. We help property owners, landlords, hosts and independent agents advertise properties to buy, rent or stay in (Malazi), and we help people find them.</p>
<p><strong>We are not an estate agent, broker, landlord, host or seller.</strong> We do not own, inspect, value, verify or manage any listed property. We are not a party to any sale, lease, rental or booking agreement made between users, and we do not collect or hold purchase money, rent or deposits.</p>
<h3 id="t2">2. Who can list</h3>
<ul><li>You must be at least 18 years old.</li><li>You must own the property or have the owner's written authority to advertise it. We may ask for proof at any time.</li><li>Agents must hold any registration or licence required by Tanzanian law, and must state that they are acting as an agent.</li></ul>
<h3 id="t3">3. Your listing</h3>
<ul><li>All details (price in TSh, location, size, features and availability) must be accurate, current and not misleading.</li><li>Photos must show the actual property, and you must have the right to use them.</li><li>You must update or remove the listing as soon as the property is sold, let or no longer available.</li></ul>
<h3 id="t4">4. What is not allowed</h3>
<ul><li>Fake, duplicate or bait listings, or properties you have no right to advertise.</li><li>Asking anyone to pay a deposit, viewing fee or "holding fee" before they have viewed the property and verified ownership.</li><li>Discriminatory, offensive or unlawful content, or listings for any illegal use.</li><li>Misusing other users' contact details or sending spam.</li></ul>
<h3 id="t5">5. Review and removal</h3>
<p>We may review listings before or after they are published. We may edit formatting, ask for more information, or suspend or remove any listing or account that breaks these terms or that we reasonably believe is fraudulent. We may report suspected fraud to the relevant authorities.</p>
<h3 id="t6">6. Fees</h3>
<p>Standard listings are free. If we introduce paid features (for example, featured placement), the price will be shown clearly before you choose them, and you will never be charged without agreeing first.</p>
<h3 id="t7">7. Dealing with other users safely</h3>
<p>Any agreement is between you and the other user. Before paying money or signing anything, you should view the property in person, check the seller's or landlord's identity, and confirm ownership (for example, through the title deed and an official land registry search). Use a lawyer for property purchases. Never send money to someone you have not met or verified.</p>
<h3 id="t8">8. Liability</h3>
<p>The platform is provided "as is". To the extent permitted by law, Buy Rent Malazi is not responsible for the accuracy of listings or for any loss arising from dealings between users. You agree to cover any claims, costs or losses that arise from content you post or from your breach of these terms.</p>
<h3 id="t9">9. Your content</h3>
<p>You keep ownership of your photos and descriptions. By listing, you give us a non-exclusive, royalty-free licence to display, format and promote your listing on our website, apps and marketing channels while it is live.</p>
<h3 id="t10">10. Privacy Policy</h3>
<p><strong>What we collect:</strong> your name, phone number, email address, listing details and photos, and basic usage data (such as pages viewed).</p>
<p><strong>Why we collect it:</strong> to publish your listing, pass genuine enquiries to you, prevent fraud and improve the service.</p>
<p><strong>Who sees it:</strong> your listing is public. Your contact details are shared only with people who enquire, and with service providers who help us run the platform under confidentiality obligations. We do not sell your personal data.</p>
<p><strong>Your rights:</strong> you can ask us to access, correct or delete your personal data at any time. We handle personal data in line with applicable Tanzanian law, including the Personal Data Protection Act, 2022.</p>
<h3 id="t11">11. Changes and governing law</h3>
<p>We may update these terms. If changes are significant, we will notify listers before they take effect. These terms are governed by the laws of the United Republic of Tanzania.</p>
<p class="terms-contact">Questions: <strong>legal@buyrentmalazi.co.tz</strong> <span>(placeholder address)</span></p>
</div>
<div class="actions-row"><button type="button" class="primary-btn" data-close="terms-overlay">I understand</button></div>
</div></div></div>
"""


def transform(s, I):
    # roof sits above "Buy Rent Malazi"; greeting text moves to the left edge
    old = '<p class="eyebrow"><span class="brm-mark" aria-hidden="true"></span>Welcome to Buy Rent Malazi'
    assert old in s
    s = s.replace(old, '<p class="eyebrow eyebrow-hero">Welcome to <span class="eyebrow-brand"><span class="brm-mark" aria-hidden="true"></span>Buy Rent Malazi</span>', 1)

    # agents: listing platform, not an agency
    s = s.replace('<h2>Meet Our Property Agents</h2><p>A preview of how agent profiles will appear on the platform.</p>',
                  '<h2>Meet Property Agents Near You</h2><p>Independent agents who list on Buy Rent Malazi. Contact them directly.</p>', 1)
    for ini in ('AS', 'JM', 'NH', 'SR'):
        s = s.replace(f'<div class="avatar">{ini}</div>',
                      f'<div class="agent-photo" role="img" aria-label="Agent photo placeholder">{CAMERA}<span>Agent photo</span></div>', 1)
    s = s.replace('<small>Example profile</small>', '<small>Example profile</small><button type="button" class="agent-btn" data-agent>View listings</button>')
    s = s.replace('Names and agencies are placeholders, not real or verified agent profiles.',
                  'Buy Rent Malazi is a listing platform, not an estate agency. Agents are independent and are not employed or endorsed by us. Names shown are placeholders.', 1)
    s = s.replace('<a href="#agents">Meet Agents</a>', '<a href="#agents">Agents Near You</a>', 1)

    # consent on the listing form
    anchor = '<div class="form-row wide"><button type="submit" class="primary-btn">Add Demo Property</button>'
    assert anchor in s
    s = s.replace(anchor, '<div class="form-row wide consent"><label class="check"><input type="checkbox" id="new-consent" required><span>I confirm I own this property or am authorised to list it, that the details are accurate, and I agree to the <button type="button" class="link-btn" data-open-terms>Listing Terms</button> and <button type="button" class="link-btn" data-open-terms>Privacy Policy</button>.</span></label></div>' + anchor, 1)
    s = s.replace("<p class=\"form-msg\">We won't collect or send your details. This is a local preview.</p>",
                  "<p class=\"form-msg\">Preview only: nothing is sent to a server. Listing is free.</p>", 1)
    s = s.replace('<h2>List Your Property for Free</h2><p>Create a demo listing.', '<h2 id="list-title">List Your Property for Free</h2><p>Create a demo listing.', 1)

    # CTA: terms note
    s = s.replace('List Property for Free ' + I['arrow'] + '</button></div></section>',
                  'List Property for Free ' + I['arrow'] + '</button><p class="cta-terms">Free to list. Subject to our <button type="button" class="link-btn" data-open-terms>Listing Terms</button>.</p></div></section>', 1)
    s = s.replace('<button id="footer-terms" type="button">Terms & Privacy</button>', '<button id="footer-terms" type="button" data-open-terms>Terms &amp; Privacy</button>', 1)

    # map slot above the cards
    s = s.replace('<div class="property-grid" id="properties-grid">', '<div class="map-band" id="map" aria-label="Map of listings"></div><div class="property-grid" id="properties-grid">', 1)

    # terms modal
    s = s.replace('<div class="toast" id="toast"', TERMS + '<div class="toast" id="toast"', 1)
    # round 4: remove preview band; multi-photo + video uploader; gallery in details
    s = s.replace('<div class="demo-strip">WEBSITE PREVIEW &nbsp; • &nbsp; SAMPLE PROPERTIES AND ILLUSTRATIVE PRICES</div>', '', 1)
    old_photo = '<div class="form-row wide"><label for="new-photo">Optional photo (demo only, under 500 KB)</label><input id="new-photo" type="file" accept="image/*"><small style="font-size:10px;color:#84909e">If no photo is selected, a built-in sample image is used.</small></div>'
    assert old_photo in s
    s = s.replace(old_photo, '<div class="form-row wide"><label>Photos <span class="label-note" id="photo-count">0/8</span></label><div class="media-grid" id="media-grid"></div><input id="new-photos" class="sr-only" type="file" accept="image/*" multiple><small class="media-hint">Add up to 8 photos. The first one is the cover photo; tap any photo to make it the cover.</small></div>'
                  '<div class="form-row wide"><label>Video <span class="label-note">optional</span></label><div id="video-slot"></div><input id="new-video" class="sr-only" type="file" accept="video/*"><small class="media-hint">One walkthrough video, up to 200 MB.</small></div>', 1)
    s = s.replace('<button type="submit" class="primary-btn">Add Demo Property</button>', '<button type="submit" class="primary-btn">Add Property</button>', 1)
    s = s.replace('<img id="detail-image" class="modal-photo" alt="Property photograph">', '<img id="detail-image" class="modal-photo" alt="Property photograph"><div class="detail-thumbs" id="detail-thumbs"></div>', 1)
    s = s.replace('<p id="detail-description"></p>', '<p id="detail-description"></p><video id="detail-video" class="detail-video" controls playsinline preload="metadata" hidden></video>', 1)
    # round 6: multi-page structure
    def r(a, b):
        nonlocal s
        assert a in s, a[:80]
        s = s.replace(a, b, 1)
    r('<nav class="navlinks" id="navlinks"><a class="active" href="#top" data-nav="home">Home</a><a href="#properties" data-nav="buy">Buy</a><a href="#properties" data-nav="rent">Rent</a><a href="#malazi" data-nav="malazi">Malazi</a><a href="#agents">Find Agents</a><a href="#about">About</a></nav>',
      '<nav class="navlinks" id="navlinks" aria-label="Main"><a class="active" href="#/" data-route="home">Home</a><a href="#/buy" data-route="buy">Buy</a><a href="#/rent" data-route="rent">Rent</a><a href="#/malazi" data-route="malazi">Malazi</a><a href="#/agents" data-route="agents">Find Agents</a><a href="#/about" data-route="about">About</a></nav>')
    r('<a href="#top" class="brand"', '<a href="#/" class="brand"')
    r('<a href="#properties" data-nav="buy">Buy a Property</a><a href="#properties" data-nav="rent">Rent a Property</a><a href="#malazi">Malazi Stays</a><a href="#locations">Locations</a>',
      '<a href="#/buy">Buy a Property</a><a href="#/rent">Rent a Property</a><a href="#/malazi">Malazi Stays</a><a href="#/locations">Popular Locations</a>')
    r('<a href="#agents">Agents Near You</a>', '<a href="#/agents">Agents Near You</a>')
    r('<a href="#about">About the Platform</a>', '<a href="#/about">About the Platform</a><a href="#/about/faq">FAQ</a>')
    r('<main id="top">', '<a class="skip-link" href="#main">Skip to content</a><main id="main"><div class="page is-active" data-page="home">')
    r('</div></div></section></main>', '</div></div><div class="container about-more"><a href="#/about" class="section-link">More about Buy Rent Malazi ' + I['arrow'] + '</a></div></section></div>'
      + ''.join(f'<div class="page" data-page="{p}" hidden></div>' for p in ('buy', 'rent', 'malazi', 'agents', 'about')) + '</main>')
    # WhatsApp enquiry in the property pop-up
    WA = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.6a8.2 8.2 0 0 1-12.1 7.2L4 20l1.3-3.7A8.2 8.2 0 1 1 20 11.6Z"/><path d="M9 8.6c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.2.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.4.8-.5.3-1.1.5-1.8.3-2.6-.7-4.6-2.7-5.3-5.3-.2-.6 0-1.3.4-1.8Z"/></svg>'
    r('<button type="button" class="primary-btn" id="enquiry-btn">Enquire about this property</button>',
      '<button type="button" class="primary-btn" id="enquiry-btn">Enquire about this property</button><button type="button" class="wa-btn" id="wa-btn">' + WA + 'WhatsApp</button>')
    # back to top
    r('<div class="toast" id="toast"', '<button type="button" class="to-top" id="to-top" aria-label="Back to top"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button><div class="toast" id="toast"')
    # SEO / sharing basics
    r('<title>', '<meta property="og:title" content="Buy | Rent | Malazi: Find Your Place in Tanzania"><meta property="og:description" content="Homes to buy, properties to rent and places to stay across Tanzania, starting in Dar es Salaam."><meta property="og:type" content="website"><title>')
    # round 7: language switch + Swahili note in terms
    r('<div class="nav-actions"><button class="sign"', '<div class="nav-actions"><div class="lang-switch" role="group" aria-label="Language"><button type="button" data-lang="en" class="on" aria-pressed="true" lang="en">EN</button><button type="button" data-lang="sw" aria-pressed="false" lang="sw">SW</button></div><button class="sign"')
    r('<nav class="terms-toc"', '<p class="terms-sw-note" lang="sw">Kwa sasa maelezo kamili ya masharti haya yako kwa Kiingereza. Toleo rasmi la Kiswahili litaongezwa baada ya ukaguzi wa kisheria.</p><nav class="terms-toc"')
    # round 8: all property types: size field, home-only rows
    r('<div class="form-row"><label for="new-bedrooms">Bedrooms</label>', '<div class="form-row res-only"><label for="new-bedrooms">Bedrooms</label>')
    r('<div class="form-row"><label for="new-bathrooms">Bathrooms</label><input id="new-bathrooms" type="number" min="0" max="20" value="1"></div>',
      '<div class="form-row res-only"><label for="new-bathrooms">Bathrooms</label><input id="new-bathrooms" type="number" min="0" max="20" value="1"></div>'
      '<div class="form-row"><label for="new-size">Size</label><div class="size-input"><input id="new-size" type="number" min="0" step="any" placeholder="e.g. 5"><select id="new-size-unit" aria-label="Size unit"><option value="m2">m²</option><option value="acres">acres</option><option value="hectares">hectares</option></select></div></div>')
    return s
