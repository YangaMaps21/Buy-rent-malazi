
/* =========================================================
   English / Kiswahili
   Translates text nodes + placeholders/aria-labels, and keeps
   translating new content (cards, toasts, pages) via a MutationObserver.
   ========================================================= */
const SW = {
 // header / nav
 'Home': 'Nyumbani', 'Buy': 'Nunua', 'Rent': 'Panga', 'Find Agents': 'Tafuta Mawakala', 'About': 'Kuhusu Sisi', 'Sign In': 'Ingia',
 'List Property for Free': 'Tangaza Mali Bure', 'Skip to content': 'Ruka hadi maudhui',
 // hero + search
 'Welcome to': 'Karibu', 'Find Your Place': 'Pata Mahali Pako', 'in Tanzania.': 'Tanzania.',
 'Discover beautiful homes to buy,': 'Gundua nyumba nzuri za kununua,', 'properties to rent, and wonderful places to stay.': 'nyumba za kupanga, na sehemu nzuri za kukaa.',
 'Dar es Salaam first. Tanzania next.': 'Dar es Salaam kwanza. Kisha Tanzania nzima.',
 'LOCATION': 'MAHALI', 'All Dar es Salaam': 'Dar es Salaam yote', 'PROPERTY TYPE': 'AINA YA MALI', 'Any property type': 'Aina yoyote',
 'House': 'Nyumba', 'Apartment': 'Fleti', 'Villa': 'Villa', 'MINIMUM PRICE (TSH)': 'BEI YA CHINI (TSH)', 'No minimum': 'Bila kiwango cha chini',
 'MAXIMUM PRICE (TSH)': 'BEI YA JUU (TSH)', 'No maximum': 'Bila kiwango cha juu', 'CHECK-IN': 'KUINGIA', 'CHECK-OUT': 'KUTOKA', 'GUESTS': 'WAGENI',
 '1 guest': 'Mgeni 1', 'Search': 'Tafuta', 'Try a popular area:': 'Jaribu eneo maarufu:', 'or': 'au', 'saved': 'vimehifadhiwa',
 // home sections
 'Featured Properties': 'Mali Zilizochaguliwa', 'Homes and spaces worth discovering.': 'Nyumba na sehemu zinazostahili kugunduliwa.',
 'View all properties': 'Tazama mali zote', 'Map view': 'Ramani', 'Illustrative map · live map at launch': 'Ramani ya mfano · ramani halisi wakati wa uzinduzi',
 'For Sale': 'Inauzwa', 'For Rent': 'Inapangishwa', 'View all': 'Tazama zote', 'View details': 'Tazama maelezo',
 'Sell your property': 'Uza mali yako', 'List it free and reach serious buyers.': 'Itangaze bure na uwafikie wanunuzi makini.', 'Start listing': 'Anza kutangaza',
 'Rent out your property': 'Pangisha mali yako', 'List it free and find tenants faster.': 'Itangaze bure na upate wapangaji haraka.',
 'List your property': 'Tangaza mali yako', 'Free to list for sale, rent or short stays.': 'Ni bure kutangaza kwa mauzo, kupangisha au malazi.',
 "We couldn't find a match in these sample listings. Try a different location, category or price.": 'Hatukupata inayolingana katika matangazo haya ya mfano. Jaribu eneo, aina au bei tofauti.',
 'Illustrative listings for design preview only.': 'Matangazo ya mfano kwa ajili ya onyesho la muundo tu.',
 'Popular Locations in Dar es Salaam': 'Maeneo Maarufu Dar es Salaam', 'Explore neighbourhoods and find where you belong.': 'Chunguza mitaa na upate mahali panapokufaa.',
 'Explore locations': 'Chunguza maeneo', 'Discover Malazi': 'Gundua Malazi',
 'is Swahili for accommodation: short stays, easy escapes and beautiful places to unwind.': 'ni sehemu za kukaa kwa muda mfupi: mapumziko rahisi na sehemu nzuri za kupumzika.',
 'View all Malazi': 'Tazama Malazi yote', 'List your Malazi stay': 'Tangaza Malazi yako', 'Host guests and share your place for short stays.': 'Karibisha wageni kwa kukaa kwa muda mfupi.',
 'Meet Property Agents Near You': 'Kutana na Mawakala wa Mali Karibu Nawe', 'Independent agents who list on Buy Rent Malazi. Contact them directly.': 'Mawakala huru wanaotangaza kwenye Buy Rent Malazi. Wasiliana nao moja kwa moja.',
 'View all agents': 'Tazama mawakala wote', 'Agent photo': 'Picha ya wakala', 'Example profile': 'Wasifu wa mfano', 'View listings': 'Tazama matangazo',
 'Buy Rent Malazi is a listing platform, not an estate agency. Agents are independent and are not employed or endorsed by us. Names shown are placeholders.': 'Buy Rent Malazi ni jukwaa la matangazo, si wakala wa mali. Mawakala ni huru na hawajaajiriwa wala kuidhinishwa na sisi. Majina yaliyoonyeshwa ni ya mfano.',
 'List Your Property for Free': 'Tangaza Mali Yako Bure', 'Give your property a place to be discovered. Reach people looking to buy, rent or stay in Tanzania.': 'Ipe mali yako nafasi ya kuonekana. Wafikie watu wanaotafuta kununua, kupanga au kukaa Tanzania.',
 'Free to list. Subject to our': 'Kutangaza ni bure. Kwa mujibu wa', 'Listing Terms': 'Masharti ya Matangazo',
 'Property Discovery, Simplified': 'Kutafuta Mali Kumerahisishwa', 'Browse homes, apartments, land and places to stay in one place.': 'Tazama nyumba, fleti, viwanja na sehemu za kukaa mahali pamoja.',
 'Direct Communication': 'Mawasiliano ya Moja kwa Moja', 'Contact property owners and agents directly when live listings launch.': 'Wasiliana na wamiliki na mawakala moja kwa moja matangazo halisi yatakapoanza.',
 'Buy, Rent or Stay': 'Nunua, Panga au Kaa', "A homegrown marketplace built around Tanzania's property needs.": 'Soko la nyumbani lililojengwa kwa ajili ya mahitaji ya mali ya Tanzania.',
 'More about Buy Rent Malazi': 'Zaidi kuhusu Buy Rent Malazi',
 // footer
 'Find your place in Tanzania. Explore homes to buy, properties to rent, and accommodation for your next stay.': 'Pata mahali pako Tanzania. Chunguza nyumba za kununua, za kupanga na malazi kwa safari yako ijayo.',
 'Explore': 'Chunguza', 'Buy a Property': 'Nunua Mali', 'Rent a Property': 'Panga Mali', 'Malazi Stays': 'Malazi', 'Popular Locations': 'Maeneo Maarufu',
 'For Advertisers': 'Kwa Watangazaji', 'List a Property': 'Tangaza Mali', 'Agents Near You': 'Mawakala Karibu Nawe', 'About the Platform': 'Kuhusu Jukwaa',
 'FAQ': 'Maswali', 'Help': 'Msaada', 'Help Centre': 'Kituo cha Msaada', 'Terms & Privacy': 'Masharti na Faragha',
 'Buy Rent Malazi. All rights reserved.': 'Buy Rent Malazi. Haki zote zimehifadhiwa.', 'Website prototype •': 'Mfano wa tovuti •', 'Illustrative photos and sample listings only': 'Picha na matangazo ya mfano tu',
 // details + listing form
 'This is a sample listing shown for demonstration. It is not an actual property available for sale, rent or booking.': 'Hili ni tangazo la mfano kwa ajili ya maonyesho. Si mali halisi inayouzwa, kupangishwa au kuhifadhiwa.',
 'Enquire about this property': 'Uliza kuhusu mali hii', 'Close': 'Funga', 'No description provided yet.': 'Bado hakuna maelezo.',
 'Test this feature': 'Jaribu kipengele hiki',
 'Create a demo listing. For now, it is stored only in this browser, not sent to a server. No account is required for the preview.': 'Unda tangazo la majaribio. Kwa sasa linahifadhiwa kwenye kivinjari hiki tu, halitumwi kwa seva. Huhitaji akaunti kwa onyesho hili.',
 'Property title *': 'Jina la mali *', 'Category *': 'Aina *', 'Malazi Stay': 'Malazi', 'Location *': 'Mahali *', 'Price in TSh *': 'Bei kwa TSh *',
 'Property type': 'Aina ya mali', 'Bedrooms': 'Vyumba vya kulala', 'Bathrooms': 'Bafu', 'Description': 'Maelezo', 'Photos': 'Picha',
 'Add photos': 'Ongeza picha', 'Add more': 'Ongeza zaidi', 'Cover': 'Jalada',
 'Add up to 8 photos. The first one is the cover photo; tap any photo to make it the cover.': 'Ongeza hadi picha 8. Ya kwanza ni picha ya jalada; gusa picha yoyote kuifanya jalada.',
 'Video': 'Video', 'optional': 'si lazima', 'Add a video': 'Ongeza video', '1 video': 'Video 1', 'One walkthrough video, up to 200 MB.': 'Video moja ya kutembelea mali, hadi MB 200.',
 'I confirm I own this property or am authorised to list it, that the details are accurate, and I agree to the': 'Ninathibitisha kuwa ninamiliki mali hii au nimeidhinishwa kuitangaza, kwamba taarifa ni sahihi, na ninakubali',
 'and': 'na', 'Privacy Policy': 'Sera ya Faragha', 'Add Property': 'Ongeza Mali', 'Preview only: nothing is sent to a server. Listing is free.': 'Onyesho tu: hakuna kinachotumwa kwa seva. Kutangaza ni bure.',
 'Sell Your Property': 'Uza Mali Yako', 'Rent Out Your Property': 'Pangisha Mali Yako', 'List Your Malazi Stay': 'Tangaza Malazi Yako', 'Your listing': 'Tangazo lako',
 // terms (headings; full Swahili legal text after legal review)
 'Legal': 'Kisheria', 'Listing Terms & Privacy Policy': 'Masharti ya Matangazo na Sera ya Faragha',
 'Draft for review. These terms are a starting point and must be reviewed by a qualified Tanzanian legal practitioner before the platform goes live. Last updated:': 'Rasimu kwa ajili ya ukaguzi. Masharti haya ni mwanzo na lazima yakaguliwe na mwanasheria aliyehitimu wa Tanzania kabla jukwaa halijaanza kazi. Imesasishwa mwisho:',
 'About us': 'Kuhusu sisi', 'Who can list': 'Nani anaweza kutangaza', 'Your listing': 'Tangazo lako', 'Not allowed': 'Hairuhusiwi', 'Review & removal': 'Ukaguzi na kuondoa',
 'Fees': 'Ada', 'Dealing safely': 'Kushughulika kwa usalama', 'Liability': 'Dhima', 'Your content': 'Maudhui yako', 'Privacy': 'Faragha', 'Changes & law': 'Mabadiliko na sheria',
 '1. About Buy Rent Malazi': '1. Kuhusu Buy Rent Malazi', '2. Who can list': '2. Nani anaweza kutangaza', '3. Your listing': '3. Tangazo lako', '4. What is not allowed': '4. Kisichoruhusiwa',
 '5. Review and removal': '5. Ukaguzi na kuondoa', '6. Fees': '6. Ada', '7. Dealing with other users safely': '7. Kushughulika na watumiaji wengine kwa usalama',
 '8. Liability': '8. Dhima', '9. Your content': '9. Maudhui yako', '10. Privacy Policy': '10. Sera ya Faragha', '11. Changes and governing law': '11. Mabadiliko na sheria inayotumika',
 'Questions:': 'Maswali:', '(placeholder address)': '(anwani ya mfano)', 'I understand': 'Nimeelewa',
 // catalogue pages
 'For buyers': 'Kwa wanunuzi', 'Homes for Sale': 'Nyumba Zinazouzwa',
 'Houses, apartments and villas for sale across Dar es Salaam, listed directly by owners and independent agents.': 'Nyumba, fleti na villa zinazouzwa kote Dar es Salaam, zilizotangazwa moja kwa moja na wamiliki na mawakala huru.',
 'listings': 'matangazo', 'areas': 'maeneo', 'Free': 'Bure', 'to list': 'kutangaza', 'Location': 'Mahali', 'All areas': 'Maeneo yote', 'Any type': 'Aina yoyote', 'Any': 'Yoyote',
 'Min price (TSh)': 'Bei ya chini (TSh)', 'Max price (TSh)': 'Bei ya juu (TSh)', 'Min price (TSh / month)': 'Bei ya chini (TSh / mwezi)', 'Max price (TSh / month)': 'Bei ya juu (TSh / mwezi)',
 'Min price (TSh / night)': 'Bei ya chini (TSh / usiku)', 'Max price (TSh / night)': 'Bei ya juu (TSh / usiku)', 'Reset': 'Futa', 'Sort by': 'Panga kwa', 'Featured': 'Zilizochaguliwa',
 'Price: low to high': 'Bei: chini hadi juu', 'Price: high to low': 'Bei: juu hadi chini', 'Most bedrooms': 'Vyumba vingi zaidi',
 'No listings match these filters yet. Try another area or widen the price range.': 'Hakuna matangazo yanayolingana na vichujio hivi bado. Jaribu eneo jingine au panua kiwango cha bei.',
 'Good to know': 'Vizuri kujua', 'Buying safely in Tanzania': 'Kununua kwa usalama Tanzania',
 'View in person': 'Tembelea mwenyewe', 'Always visit the property before agreeing to anything or paying any money.': 'Tembelea mali kila mara kabla ya kukubali chochote au kulipa pesa yoyote.',
 'Verify the title': 'Thibitisha hati', 'Ask for the title deed and confirm ownership with an official land registry search.': 'Omba hati miliki na uthibitishe umiliki kwa upekuzi rasmi kwenye ofisi ya ardhi.',
 'Use a lawyer': 'Tumia mwanasheria', 'A property lawyer can check documents and draft the sale agreement for you.': 'Mwanasheria wa mali anaweza kukagua nyaraka na kukuandalia mkataba wa mauzo.',
 'Pay securely': 'Lipa kwa usalama', 'Never pay deposits in cash or to personal accounts before documents are verified.': 'Usilipe amana kwa pesa taslimu au kwenye akaunti binafsi kabla nyaraka hazijathibitishwa.',
 'Selling a property?': 'Unauza mali?', 'Reach serious buyers across Tanzania. Listing is free.': 'Wafikie wanunuzi makini kote Tanzania. Kutangaza ni bure.',
 'For renters': 'Kwa wapangaji', 'Properties to Rent': 'Nyumba za Kupanga',
 'Apartments, family homes and villas to rent long-term, with monthly prices shown upfront.': 'Fleti, nyumba za familia na villa za kupanga kwa muda mrefu, zenye bei za kila mwezi zilizo wazi.',
 'Renting with confidence': 'Kupanga kwa uhakika', 'View before you pay': 'Tazama kabla ya kulipa',
 'Never pay a deposit or "viewing fee" for a home you have not seen.': 'Usilipe amana wala "ada ya kutazama" kwa nyumba ambayo hujaiona.',
 'Read the lease': 'Soma mkataba', 'Check the rent, the deposit, how many months are due upfront, and notice periods.': 'Hakiki kodi, amana, miezi ya kulipa mapema na muda wa notisi.',
 'Confirm the landlord': 'Mthibitishe mwenye nyumba', 'Make sure the person you deal with owns the property or has written authority.': 'Hakikisha unayeshughulika naye anamiliki mali au ana idhini ya maandishi.',
 'Record the condition': 'Rekodi hali ya nyumba', 'Take dated photos when you move in to protect your deposit.': 'Piga picha zenye tarehe unapohamia ili kulinda amana yako.',
 'Have a place to rent out?': 'Una nyumba ya kupangisha?', 'Find reliable tenants faster. Listing is free.': 'Pata wapangaji wa kuaminika haraka. Kutangaza ni bure.',
 'Short stays': 'Kukaa muda mfupi', 'is Swahili for accommodation: short stays, holiday homes and city suites, priced per night.': 'ni sehemu za kukaa kwa muda mfupi: nyumba za likizo na vyumba vya mjini, kwa bei ya kila usiku.',
 'Check-in': 'Kuingia', 'Check-out': 'Kutoka', 'Guests': 'Wageni', 'Booking a stay': 'Kuhifadhi malazi',
 'Check the details': 'Hakiki maelezo', 'Confirm the guest numbers, check-in times and what is included before you travel.': 'Thibitisha idadi ya wageni, muda wa kuingia na kilichojumuishwa kabla ya kusafiri.',
 'Talk to the host': 'Ongea na mwenyeji', 'Ask about parking, backup power, water and security.': 'Uliza kuhusu maegesho, umeme wa akiba, maji na ulinzi.',
 'Agree in writing': 'Kubaliana kwa maandishi', 'Get the price, dates and cancellation terms confirmed by message or email.': 'Pata uthibitisho wa bei, tarehe na masharti ya kughairi kwa ujumbe au barua pepe.',
 'Pay safely': 'Lipa kwa usalama', 'Avoid paying the full amount upfront to someone you have not verified.': 'Epuka kulipa kiasi chote mapema kwa mtu ambaye hujamthibitisha.',
 'Host guests with Malazi': 'Karibisha wageni na Malazi', 'Share your home, suite or holiday house for short stays.': 'Shiriki nyumba yako, chumba au nyumba ya likizo kwa wageni wa muda mfupi.',
 'List your stay': 'Tangaza malazi yako',
 // agents page
 'Property Agents Near You': 'Mawakala wa Mali Karibu Nawe', 'Independent agents who list on Buy Rent Malazi. Browse by area and contact them directly.': 'Mawakala huru wanaotangaza kwenye Buy Rent Malazi. Tafuta kwa eneo na uwasiliane nao moja kwa moja.',
 'Area': 'Eneo', 'All': 'Wote', 'Sales': 'Mauzo', 'Rentals': 'Upangishaji', 'Contact': 'Wasiliana', 'No agents match yet. Try another area.': 'Hakuna mawakala wanaolingana bado. Jaribu eneo jingine.',
 'Working with an agent': 'Kufanya kazi na wakala', 'Questions worth asking': 'Maswali ya kuuliza', 'Are you registered?': 'Umesajiliwa?',
 'Ask whether the agent holds any registration or licence required to practise.': 'Uliza kama wakala ana usajili au leseni inayohitajika kufanya kazi hii.',
 'Who do you represent?': 'Unamwakilisha nani?', 'Check whether they act for the owner, the buyer or tenant, or both.': 'Hakiki kama wanamwakilisha mmiliki, mnunuzi au mpangaji, au wote wawili.',
 'What are your fees?': 'Ada zako ni kiasi gani?', 'Agree on commission or fees in writing before any viewing.': 'Kubaliana kuhusu kamisheni au ada kwa maandishi kabla ya kutazama mali.',
 'Can I see the documents?': 'Naweza kuona nyaraka?', 'A good agent will help you verify ownership early.': 'Wakala mzuri atakusaidia kuthibitisha umiliki mapema.',
 'Are you a property agent?': 'Wewe ni wakala wa mali?', 'Showcase your listings to people searching in your area.': 'Onyesha matangazo yako kwa watu wanaotafuta katika eneo lako.', 'List a property': 'Tangaza mali',
 // about page
 'Find Your Place in Tanzania': 'Pata Mahali Pako Tanzania',
 'A homegrown listing platform bringing homes to buy, properties to rent and places to stay together in one simple, trustworthy place.': 'Jukwaa la matangazo la nyumbani linaloleta pamoja nyumba za kununua, za kupanga na sehemu za kukaa mahali pamoja, rahisi na pa kuaminika.',
 'Our story': 'Hadithi yetu', 'Built for how Tanzania looks for property': 'Imejengwa kwa jinsi Watanzania wanavyotafuta mali',
 'Finding a home in Dar es Salaam often means scrolling through scattered social posts, chasing phone numbers and hoping a listing is real. Buy Rent Malazi brings it all into one place, with clear prices in TSh, real photos and direct contact with the people listing.': 'Kutafuta nyumba Dar es Salaam mara nyingi kunamaanisha kupitia matangazo yaliyotawanyika mitandaoni, kufuatilia namba za simu na kutumaini tangazo ni la kweli. Buy Rent Malazi inaleta yote mahali pamoja, kwa bei wazi kwa TSh, picha halisi na mawasiliano ya moja kwa moja na watangazaji.',
 'We started in Dar es Salaam, and our goal is simple:': 'Tumeanzia Dar es Salaam, na lengo letu ni rahisi:',
 'What we are': 'Sisi ni nini', 'A free listing platform for owners, landlords, hosts and agents': 'Jukwaa la bure la matangazo kwa wamiliki, wenye nyumba, wenyeji na mawakala',
 'One place to buy, rent or book a short stay': 'Mahali pamoja pa kununua, kupanga au kuhifadhi malazi ya muda mfupi', 'Clear prices, real photos and direct contact': 'Bei wazi, picha halisi na mawasiliano ya moja kwa moja',
 'What we are not': 'Sisi si nini', 'An estate agency or broker': 'Wakala wa mali au dalali', 'A party to any sale, lease or booking': 'Mhusika katika mauzo, upangishaji au uhifadhi wowote', 'A place to send deposits': 'Mahali pa kutuma amana',
 'How it works': 'Jinsi inavyofanya kazi', 'Simple for everyone': 'Rahisi kwa kila mtu', 'Looking for a place': 'Unatafuta mahali',
 'Choose Buy, Rent or Malazi, then filter by area, price and size.': 'Chagua Nunua, Panga au Malazi, kisha chuja kwa eneo, bei na ukubwa.', 'Shortlist': 'Orodha fupi',
 'Save favourites and compare photos, prices and locations on the map.': 'Hifadhi vipendwa na linganisha picha, bei na maeneo kwenye ramani.', 'Contact directly': 'Wasiliana moja kwa moja',
 'Enquire with the owner or agent, view in person, and verify before you pay.': 'Uliza kwa mmiliki au wakala, tembelea mwenyewe, na thibitisha kabla ya kulipa.',
 'Listing a property': 'Kutangaza mali', 'Add details': 'Ongeza maelezo', 'Title, price, location and key features, in a few minutes.': 'Jina, bei, mahali na sifa kuu, kwa dakika chache.',
 'Upload media': 'Pakia picha na video', 'Up to 8 photos and a walkthrough video.': 'Hadi picha 8 na video ya kutembelea mali.', 'Get enquiries': 'Pokea maulizo',
 'People searching in your area contact you directly.': 'Watu wanaotafuta katika eneo lako wanawasiliana nawe moja kwa moja.',
 'Trust & safety': 'Uaminifu na usalama', 'Our commitments': 'Ahadi zetu', 'Clear terms': 'Masharti wazi', 'Every lister agrees to our Listing Terms before publishing.': 'Kila mtangazaji anakubali Masharti ya Matangazo kabla ya kuchapisha.',
 'Fraud reporting': 'Kuripoti udanganyifu', 'Suspicious listings can be reported and are removed quickly.': 'Matangazo yanayotiliwa shaka yanaweza kuripotiwa na huondolewa haraka.',
 'Privacy first': 'Faragha kwanza', 'Contact details are shared only with genuine enquirers. We never sell data.': 'Taarifa za mawasiliano hutolewa kwa wanaouliza kwa dhati tu. Hatuuzi taarifa kamwe.',
 'Safety guidance': 'Mwongozo wa usalama', 'Practical tips on every page to help you buy, rent and book safely.': 'Vidokezo vya vitendo kwenye kila ukurasa kukusaidia kununua, kupanga na kuhifadhi kwa usalama.',
 'Questions, answered': 'Maswali na majibu',
 'Is Buy Rent Malazi an estate agency?': 'Je, Buy Rent Malazi ni wakala wa mali?',
 'No. We are a listing platform. Owners, landlords, hosts and independent agents list their properties, and you contact them directly. We are not a party to any sale, lease or booking.': 'Hapana. Sisi ni jukwaa la matangazo. Wamiliki, wenye nyumba, wenyeji na mawakala huru hutangaza mali zao, nawe unawasiliana nao moja kwa moja. Sisi si wahusika katika mauzo, upangishaji au uhifadhi wowote.',
 'How much does it cost to list?': 'Kutangaza kunagharimu kiasi gani?',
 'Standard listings are free. If we introduce optional paid features later, prices will always be shown before you choose them.': 'Matangazo ya kawaida ni bure. Tukianzisha huduma za hiari za kulipia baadaye, bei zitaonyeshwa wazi kabla hujazichagua.',
 'What does "Malazi" mean?': '"Malazi" maana yake nini?',
 'Malazi is Swahili for accommodation. On our site it means short stays: holiday homes, city suites and guest houses priced per night.': 'Malazi ni sehemu ya kulala au kukaa. Kwenye tovuti yetu inamaanisha makazi ya muda mfupi: nyumba za likizo, vyumba vya mjini na nyumba za wageni kwa bei ya kila usiku.',
 'Do you check listings?': 'Je, mnakagua matangazo?',
 'We review listings and remove anything that breaks our Listing Terms or looks fraudulent. Always view a property and verify ownership yourself before paying.': 'Tunakagua matangazo na kuondoa yoyote yanayokiuka Masharti ya Matangazo au yanayoonekana kuwa ya udanganyifu. Daima tembelea mali na uthibitishe umiliki mwenyewe kabla ya kulipa.',
 'Which areas do you cover?': 'Mnahudumia maeneo gani?',
 'We are starting in Dar es Salaam (Masaki, Oyster Bay, Mikocheni, Mbezi Beach, Kigamboni, Upanga and more) and will expand across Tanzania.': 'Tunaanzia Dar es Salaam (Masaki, Oyster Bay, Mikocheni, Mbezi Beach, Kigamboni, Upanga na zaidi) na tutapanuka kote Tanzania.',
 'How many photos can I add?': 'Naweza kuongeza picha ngapi?', 'Up to 8 photos and one walkthrough video per listing.': 'Hadi picha 8 na video moja kwa kila tangazo.',
 'Talk to us': 'Zungumza nasi', 'Questions about listing, partnerships or a report about a listing? We would love to hear from you.': 'Una maswali kuhusu kutangaza, ushirikiano au unataka kuripoti tangazo? Tungependa kusikia kutoka kwako.',
 'Email': 'Barua pepe', 'placeholder': 'mfano', 'Office': 'Ofisi', 'by appointment': 'kwa miadi',
 'Ready to find your place?': 'Uko tayari kupata mahali pako?', 'Browse homes to buy, rent or stay, or list your own for free.': 'Tazama nyumba za kununua, kupanga au kukaa, au tangaza yako bure.',
 // dynamic titles / toasts
 'Properties for Sale': 'Mali Zinazouzwa', 'All Properties': 'Mali Zote', 'Every sample listing in one place.': 'Matangazo yote ya mfano mahali pamoja.',
 'All Locations': 'Maeneo Yote', 'Sample homes across Dar es Salaam.': 'Nyumba za mfano kote Dar es Salaam.', 'Your Saved Properties': 'Mali Ulizohifadhi', 'Saved in this browser only.': 'Zimehifadhiwa kwenye kivinjari hiki tu.',
 'Your Listing Is Live (Preview)': 'Tangazo Lako Liko Hewani (Onyesho)', 'Saved in this browser only, not sent to a server.': 'Limehifadhiwa kwenye kivinjari hiki tu, halijatumwa kwa seva.',
 'Everything listed in this area: to buy, rent or stay.': 'Kila kilichotangazwa katika eneo hili: kununua, kupanga au kukaa.', 'Homes that match your search.': 'Nyumba zinazolingana na utafutaji wako.',
 'Places to stay that match your trip.': 'Sehemu za kukaa zinazolingana na safari yako.', 'No matches yet.': 'Hakuna zinazolingana bado.',
 'Saved to your favourites': 'Imehifadhiwa kwenye vipendwa', 'Removed from favourites': 'Imeondolewa kwenye vipendwa', 'Tap the heart on any property to save it here.': 'Gusa moyo kwenye mali yoyote kuihifadhi hapa.',
 'Your property has been added. Preview only: it is saved in this browser.': 'Mali yako imeongezwa. Onyesho tu: imehifadhiwa kwenye kivinjari hiki.', 'Accounts arrive with the live platform.': 'Akaunti zitakuja na jukwaa halisi.',
 'The Help Centre is coming soon.': 'Kituo cha Msaada kinakuja hivi karibuni.', 'Agent profiles with their listings arrive with the live platform.': 'Wasifu wa mawakala pamoja na matangazo yao utakuja na jukwaa halisi.',
 'WhatsApp enquiries connect to the lister once live listings launch.': 'Maulizo ya WhatsApp yataunganishwa na mtangazaji matangazo halisi yatakapoanza.',
 'Please choose a video file.': 'Tafadhali chagua faili ya video.', 'Please choose a video under 200 MB.': 'Tafadhali chagua video chini ya MB 200.',
 // aria / placeholders
 'Toggle menu': 'Fungua menyu', 'Back to top': 'Rudi juu', 'Agent photo placeholder': 'Nafasi ya picha ya wakala', 'Property details': 'Maelezo ya mali', 'Add a property': 'Ongeza mali',
 'Breadcrumb': 'Njia', 'Main': 'Kuu', 'Language': 'Lugha', 'e.g. Three-bedroom family home': 'mf. Nyumba ya familia ya vyumba vitatu', 'Briefly describe the property': 'Eleza mali kwa ufupi',
 'Agent or agency name': 'Jina la wakala au kampuni', 'Remove video': 'Ondoa video',
 'Indian Ocean': 'Bahari ya Hindi',
 'Homes': 'Makazi', 'Land & farms': 'Ardhi na mashamba', 'Commercial': 'Biashara', 'Other': 'Nyingine', 'Townhouse': 'Nyumba ya safu', 'Bungalow': 'Bangalo', 'Studio': 'Studio', 'Room': 'Chumba',
 'Land / Plot': 'Kiwanja', 'Farm': 'Shamba', 'Beach plot': 'Kiwanja cha ufukweni', 'Office': 'Ofisi', 'Shop': 'Duka', 'Warehouse / Godown': 'Ghala', 'Commercial building': 'Jengo la biashara', 'Hotel / Lodge': 'Hoteli / Loji', 'Guest house': 'Nyumba ya wageni', 'Other property': 'Mali nyingine',
 'Size': 'Ukubwa', 'Size unit': 'Kipimo', 'acres': 'ekari', 'hectares': 'hekta', 'e.g. 5': 'mf. 5', 'Any property type': 'Aina yoyote ya mali', 'Msasani Bay': 'Ghuba ya Msasani', 'City Centre': 'Katikati ya Jiji'
};
const BADGE_SW = { 'For Sale': 'Inauzwa', 'For Rent': 'Inapangishwa', 'Malazi': 'Malazi' };
const TYPE_SW = { House: 'Nyumba', Apartment: 'Fleti', Villa: 'Villa' };
const PATTERNS = [
  [/^(\d+) beds$/, 'Vyumba $1'], [/^(\d+) baths$/, 'Bafu $1'], [/^(\d+) guests$/, 'Wageni $1'], [/^(\d+)\+ guests$/, 'Wageni $1+'],
  [/^(\d+) bedrooms$/, 'Vyumba $1 vya kulala'], [/^(\d+) bathrooms$/, 'Bafu $1'],
  [/^(TSh [\d,]+) \/ month$/, '$1 / mwezi'], [/^(TSh [\d,]+) \/ night$/, '$1 / usiku'], [/^([\d,]+) \/ month$/, '$1 / mwezi'],
  [/^([\d.]+) million( \/ month)?$/, (m, n, mo) => `Milioni ${n}${mo ? ' / mwezi' : ''}`], [/^([\d.]+) billion$/, 'Bilioni $1'],
  [/^(\d+) propert(?:y|ies) · tap a pin to filter$/, 'Mali $1 · gusa alama kuchuja'],
  [/^propert(?:y|ies)(?: in (.+))?$/, (m, a) => 'mali' + (a ? ` katika ${a}` : '')],
  [/^agents?(?: in (.+))?$/, (m, a) => 'mawakala' + (a ? ` katika ${a}` : '')],
  [/^Properties in (.+)$/, 'Mali katika $1'], [/^Properties for Sale in (.+)$/, 'Mali Zinazouzwa katika $1'], [/^Properties to Rent in (.+)$/, 'Nyumba za Kupanga katika $1'], [/^Malazi Stays in (.+)$/, 'Malazi katika $1'],
  [/^(\d+) sample listings$/, 'Matangazo $1 ya mfano'],
  [/^Showing (\d+) sample propert(?:y|ies)\. Illustrative listings for design preview only\.$/, 'Inaonyesha mali $1 za mfano. Matangazo ya mfano kwa onyesho la muundo tu.'],
  [/^(.+) · (For Sale|For Rent|Malazi)$/, (m, t, b) => `${SW[t] || TYPE_SW[t] || t} · ${BADGE_SW[b]}`],
  [/^([\d.,]+) acres$/, 'Ekari $1'], [/^([\d.,]+) hectares$/, 'Hekta $1'],
  [/^(\d+) photos( · Video)?$/, (m, n, v) => `Picha ${n}${v ? ' · Video' : ''}`],
  [/^Save (.+)$/, 'Hifadhi $1'], [/^(.+): (\d+) properties$/, '$1: mali $2'], [/^Show photo (\d+)$/, 'Onyesha picha $1'], [/^Remove photo (\d+)$/, 'Ondoa picha $1'],
  [/^Enquiries open when live listings launch\. "(.+)" is a sample\.$/, 'Maulizo yatafunguliwa matangazo halisi yatakapoanza. "$1" ni tangazo la mfano.'],
  [/^Contact details for (.+) will appear when profiles go live\.$/, 'Mawasiliano ya $1 yataonekana wasifu utakapoanza.'],
  [/^Up to 8 photos per listing\. (\d+) not added\.$/, 'Hadi picha 8 kwa kila tangazo. $1 hazikuongezwa.'],
  [/^Map of (.+)$/, 'Ramani ya $1']
];
const TITLES_SW = { home: 'Buy | Rent | Malazi: Pata Mahali Pako Tanzania', buy: 'Nyumba Zinazouzwa Tanzania | Buy Rent Malazi', rent: 'Nyumba za Kupanga | Buy Rent Malazi', malazi: 'Malazi: Makazi ya Muda Mfupi | Buy Rent Malazi', agents: 'Mawakala wa Mali Karibu Nawe | Buy Rent Malazi', about: 'Kuhusu Buy Rent Malazi' };

const i18n = (() => {
  let lang = store.get('brm-lang', 'en');
  const orig = new Map();            // text node -> original English
  const origAttr = new Map();        // element -> {attr: original}
  const tr = t => {
    if (SW[t] !== undefined) return SW[t];
    for (const [re, rep] of PATTERNS) if (re.test(t)) return t.replace(re, rep);
    return null;
  };
  const skip = n => { const p = n.parentElement; return !p || p.closest('script,style,.brm-logo,[data-no-i18n]') || (p.closest('svg') && !p.closest('.map-band')); };
  function doNode(n) {
    if (skip(n)) return;
    const raw = n.nodeValue, t = raw.trim(); if (!t) return;
    const out = tr(t); if (out === null || out === t) return;
    orig.set(n, raw); n.nodeValue = raw.replace(t, out);
  }
  function doAttrs(el) {
    ['placeholder', 'aria-label', 'title', 'label'].forEach(a => {
      const v = el.getAttribute && el.getAttribute(a); if (!v) return;
      const out = tr(v); if (out === null || out === v) return;
      const o = origAttr.get(el) || {}; if (!(a in o)) o[a] = v; origAttr.set(el, o); el.setAttribute(a, out);
    });
  }
  function walk(root) {
    if (root.nodeType === 3) { doNode(root); return; }
    if (root.nodeType !== 1) return;
    doAttrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n; while ((n = w.nextNode())) n.nodeType === 3 ? doNode(n) : doAttrs(n);
  }
  let busy = false;
  const mo = new MutationObserver(ms => {
    if (lang !== 'sw' || busy) return; busy = true;
    ms.forEach(m => { if (m.type === 'characterData') doNode(m.target); else m.addedNodes.forEach(walk); });
    busy = false;
  });
  function restore() {
    orig.forEach((v, n) => { n.nodeValue = v; }); orig.clear();
    origAttr.forEach((o, el) => Object.entries(o).forEach(([a, v]) => el.setAttribute(a, v))); origAttr.clear();
  }
  function setTitle() { document.title = lang === 'sw' ? (TITLES_SW[currentPage] || document.title) : (TITLES[currentPage] || document.title); }
  function set(l) {
    lang = l; store.set('brm-lang', l);
    document.documentElement.lang = l === 'sw' ? 'sw' : 'en';
    $$('.lang-switch button').forEach(b => { const on = b.dataset.lang === l; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    if (l === 'sw') { walk(document.body); mo.observe(document.body, { childList: true, subtree: true, characterData: true }); }
    else { mo.disconnect(); restore(); }
    setTitle();
  }
  return { set, get lang() { return lang; }, setTitle };
})();
document.addEventListener('click', e => { const b = e.target.closest('.lang-switch button'); if (b && b.dataset.lang !== i18n.lang) i18n.set(b.dataset.lang); });
addEventListener('hashchange', () => setTimeout(i18n.setTitle, 0));
i18n.set(i18n.lang);
