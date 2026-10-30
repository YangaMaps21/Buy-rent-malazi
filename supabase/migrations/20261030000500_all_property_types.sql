alter table public.listings drop constraint if exists listings_property_type_check;
alter table public.listings add constraint listings_property_type_check check (property_type in
  ('House','Apartment','Villa','Townhouse','Bungalow','Studio','Room','Land','Farm','Beach plot','Office','Shop','Warehouse','Commercial building','Hotel / Lodge','Guest house','Other'));
alter table public.listings add column if not exists size_value numeric(14,2) check (size_value > 0);
alter table public.listings add column if not exists size_unit text check (size_unit in ('m2','acres','hectares'));
alter table public.listings disable trigger listings_protect;
insert into public.listings (category,title,description,location,property_type,beds,baths,size_value,size_unit,price,status,cover_url,sort_order) values
('buy','5-Acre Farm with Borehole','Fertile farmland with a borehole, perimeter fence and road access. Ideal for horticulture or poultry.','Kigamboni','Farm',0,0,5,'acres',180000000,'published',null,22),
('buy','Residential Plot with Title Deed','Surveyed residential plot on a quiet road, title deed available.','Mbezi Beach','Land',0,0,1200,'m2',95000000,'published',null,23),
('rent','Office Space on Bagamoyo Road','Open-plan office floor with parking, backup generator and fibre internet.','Mikocheni','Office',0,2,180,'m2',4500000,'published',null,24),
('rent','Warehouse / Godown','Secure warehouse with loading bay and truck access.','Kigamboni','Warehouse',0,1,800,'m2',6000000,'published',null,25);
alter table public.listings enable trigger listings_protect;
