alter table public.listings disable trigger listings_protect;
insert into public.listings (category,title,description,location,property_type,beds,baths,size_m2,max_guests,price,status,cover_url,sort_order) values
('buy','4 Bedroom Pool Villa','A beautiful contemporary villa with a private pool, open-plan living areas, and tropical garden.','Masaki','Villa',4,4,420,null,750000000,'published','/img/pool-villa.webp',0),
('rent','Modern 2 Bedroom Apartment','Bright, furnished apartment with spacious living areas and convenient access to everyday amenities.','Oyster Bay','Apartment',2,2,120,null,2500000,'published','/img/city-living-room.webp',1),
('malazi','Beachside Holiday Villa','Relaxed coastal escape with an outdoor dining area and room for friends and family.','Mbezi Beach','Villa',3,3,null,6,300000,'published','/img/beachfront-patio.webp',2),
('buy','3 Bedroom City Apartment','Contemporary apartment building with secure access and bright interiors.','Mikocheni','Apartment',3,2,150,null,450000000,'published','/img/apartment-building.webp',3),
('rent','Spacious Family Home','A practical family home with a private driveway and a peaceful courtyard.','Kigamboni','House',3,2,260,null,1800000,'published','/img/family-house.webp',4),
('buy','Garden Bungalow','A well-kept single-storey home with mature landscaping and bright rooms.','Upanga','House',3,2,200,null,320000000,'published','/img/garden-home.webp',5),
('malazi','Relaxing City Suite','An airy and comfortable suite suited for a short business trip or weekend break.','Oyster Bay','Apartment',2,2,null,4,180000,'published','/img/bright-bedroom.webp',6),
('malazi','Palm Courtyard Retreat','Furnished holiday accommodation around a peaceful palm-lined swimming pool.','Mbezi Beach','Villa',3,3,null,6,350000,'published','/img/courtyard-pool.webp',7),
('malazi','Private Pool Escape','A serene stay featuring an inviting pool, modern architecture and indoor-outdoor living.','Masaki','Villa',3,3,null,6,400000,'published','/img/pool-villa.webp',8),
('rent','Furnished City Studio','A bright, fully furnished studio close to the city centre, ideal for a young professional.','Upanga','Apartment',1,1,55,null,950000,'published','/img/bright-bedroom.webp',9),
('buy','Ocean View Penthouse','Top-floor penthouse with wraparound terraces and views across Msasani Bay.','Masaki','Apartment',4,3,280,null,1200000000,'published','/img/apartment-building.webp',10),
('buy','Family Home with Garden','Spacious family home on a quiet road, with a large garden and staff quarters.','Mbezi Beach','House',4,3,350,null,520000000,'published','/img/garden-home.webp',11),
('buy','Modern Townhouse','Low-maintenance townhouse in a secure compound close to schools and shops.','Mikocheni','House',3,3,210,null,380000000,'published','/img/family-house.webp',12),
('buy','Coastal Bungalow','A calm single-storey home minutes from Kigamboni''s beaches.','Kigamboni','House',3,2,240,null,210000000,'published','/img/garden-home.webp',13),
('buy','Luxury Pool Villa','Architect-designed villa with a palm-lined pool, entertainment deck and guest wing.','Oyster Bay','Villa',5,5,600,null,1800000000,'published','/img/courtyard-pool.webp',14),
('rent','Sea Breeze Apartment','Furnished apartment with a sea-facing balcony, backup power and 24-hour security.','Masaki','Apartment',3,2,140,null,3200000,'published','/img/city-living-room.webp',15),
('rent','Garden Cottage','A cosy cottage set in a leafy shared garden.','Mikocheni','House',2,1,90,null,1200000,'published','/img/garden-home.webp',16),
('rent','Executive Pool Villa','Executive villa with private pool, ideal for diplomatic or corporate tenants.','Oyster Bay','Villa',4,4,380,null,6500000,'published','/img/pool-villa.webp',17),
('rent','Beachside Family Home','Family home a short walk from the beach, with a secure parking yard.','Kigamboni','House',4,3,300,null,2200000,'published','/img/family-house.webp',18),
('malazi','Ocean Terrace Suite','A light-filled suite with a private terrace, perfect for couples.','Masaki','Apartment',1,1,null,2,220000,'published','/img/bright-bedroom.webp',19),
('malazi','Kigamboni Beach House','Beachfront house for groups and families, with an open-air dining patio.','Kigamboni','House',4,3,null,8,450000,'published','/img/beachfront-patio.webp',20),
('malazi','Upanga City Loft','Smart city loft for business trips, close to the CBD.','Upanga','Apartment',1,1,null,2,120000,'published','/img/city-living-room.webp',21);
alter table public.listings enable trigger listings_protect;
insert into public.agents (name,agency,area,specialties,listings_count) values
('Amina Said','Coastal Home Realty','Masaki',array['Sales','Rentals']::text[],12),
('Juma Mwinyi','Urban Properties','Mikocheni',array['Rentals']::text[],9),
('Neema Hassan','Tanzania Estates','Oyster Bay',array['Sales']::text[],15),
('Salim Rashid','City Living','Upanga',array['Rentals','Malazi']::text[],7),
('Grace Mushi','Bayview Homes','Mbezi Beach',array['Sales','Malazi']::text[],11),
('Baraka Mollel','South Coast Realty','Kigamboni',array['Sales','Rentals']::text[],6),
('Rehema Ally','Msasani Stays','Masaki',array['Malazi']::text[],8),
('David Kimaro','Dar Property Hub','Mikocheni',array['Sales','Rentals']::text[],10);
revoke execute on function public.handle_new_user() from anon, authenticated, public;
revoke execute on function public.protect_listing_fields() from anon, authenticated, public;
