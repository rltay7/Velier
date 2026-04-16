const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========================
// IN-MEMORY DATA STORE
// ========================

const owners = [
  { id: 1, name: 'Isabelle Fontaine', avatar: 'IF', rating: 4.9, reviews: 47, verified: true, member_since: '2021', location: 'Paris, France' },
  { id: 2, name: 'Sofia Marchetti', avatar: 'SM', rating: 5.0, reviews: 63, verified: true, member_since: '2020', location: 'Milan, Italy' },
  { id: 3, name: 'Arabella Whitmore', avatar: 'AW', rating: 4.8, reviews: 29, verified: true, member_since: '2022', location: 'London, UK' },
  { id: 4, name: 'Cleo Vandenberg', avatar: 'CV', rating: 4.9, reviews: 38, verified: true, member_since: '2021', location: 'Amsterdam, Netherlands' },
  { id: 5, name: 'Margot Delacroix', avatar: 'MD', rating: 5.0, reviews: 52, verified: true, member_since: '2019', location: 'Paris, France' },
  { id: 6, name: 'Natasha Ivanova', avatar: 'NI', rating: 4.7, reviews: 21, verified: true, member_since: '2022', location: 'Monaco' },
  { id: 7, name: 'Yuki Tanaka', avatar: 'YT', rating: 5.0, reviews: 41, verified: true, member_since: '2020', location: 'Tokyo, Japan' },
  { id: 8, name: 'Serena Villanueva', avatar: 'SV', rating: 4.9, reviews: 33, verified: true, member_since: '2021', location: 'Madrid, Spain' },
  { id: 9, name: 'Elara Okafor', avatar: 'EO', rating: 4.8, reviews: 18, verified: true, member_since: '2023', location: 'Lagos, Nigeria' },
  { id: 10, name: 'Petra Königsberg', avatar: 'PK', rating: 5.0, reviews: 56, verified: true, member_since: '2019', location: 'Vienna, Austria' },
  { id: 11, name: 'Camille Rousseau', avatar: 'CR', rating: 4.9, reviews: 44, verified: true, member_since: '2020', location: 'Geneva, Switzerland' },
  { id: 12, name: 'Audrey Chen', avatar: 'AC', rating: 4.8, reviews: 27, verified: true, member_since: '2022', location: 'Hong Kong' },
  { id: 13, name: 'James Worthington', avatar: 'JW', rating: 4.9, reviews: 61, verified: true, member_since: '2019', location: 'London, UK' },
  { id: 14, name: 'Luca Ferretti', avatar: 'LF', rating: 4.8, reviews: 35, verified: true, member_since: '2021', location: 'Milan, Italy' },
  { id: 15, name: 'Antoine Beaumont', avatar: 'AB', rating: 5.0, reviews: 72, verified: true, member_since: '2018', location: 'Geneva, Switzerland' },
  { id: 16, name: 'Sebastian Müller', avatar: 'SM2', rating: 4.7, reviews: 29, verified: true, member_since: '2022', location: 'Zurich, Switzerland' },
  { id: 17, name: 'Marcus Chen', avatar: 'MC', rating: 4.9, reviews: 48, verified: true, member_since: '2020', location: 'Singapore' },
  { id: 18, name: 'Oliver Blackwood', avatar: 'OB', rating: 4.8, reviews: 33, verified: true, member_since: '2021', location: 'Sydney, Australia' },
  { id: 19, name: 'Rafael Santos', avatar: 'RS', rating: 4.6, reviews: 22, verified: true, member_since: '2022', location: 'São Paulo, Brazil' },
  { id: 20, name: 'Henri Dubois', avatar: 'HD', rating: 5.0, reviews: 58, verified: true, member_since: '2019', location: 'Paris, France' },
];

let listings = [
  // ── BAGS ──
  { id: 1, title: 'Prada Re-Edition 2000 Mini Bag', brand: 'Prada', category: 'Bags', location: 'Paris, France', description: 'The iconic Prada Re-Edition 2000 Mini Bag in pristine nylon and saffiano leather. A defining piece of early-millennium luxury, reissued with the same impeccable craftsmanship. Features the signature Prada triangle logo and adjustable strap.', daily_rate: 85, condition: 'Excellent', colour: 'Black', size: 'Mini', image: 'https://www.prada.com/content/dam/pradabkg_products/1/1NE/1NE515/RDH0F0002/1NE515_RDH0_F0002_MDLA.jpg', owner_id: 1, featured: true, rating: 4.9, reviews: 34, wishlist_count: 127 },
  { id: 2, title: 'Gucci Dionysus GG Supreme Shoulder Bag', brand: 'Gucci', category: 'Bags', location: 'Milan, Italy', description: 'The Gucci Dionysus shoulder bag in GG Supreme canvas, featuring the distinctive tiger head closure inspired by Greek mythology. A modern icon bridging Gucci\'s storied heritage with contemporary vision.', daily_rate: 95, condition: 'Very Good', colour: 'Beige/Ebony', size: 'Medium', image: 'https://images.unsplash.com/photo-1590739293931-a4e3e220d1e9?w=800&q=85', owner_id: 2, featured: true, rating: 4.7, reviews: 28, wishlist_count: 98 },
  { id: 3, title: 'Chanel Classic Double Flap Bag', brand: 'Chanel', category: 'Bags', location: 'London, UK', description: 'The most coveted bag in the world. This Chanel Classic Double Flap in lambskin with gold hardware is the ultimate statement of refined elegance. The interlocking CC lock, quilted stitching, and chain strap are timeless.', daily_rate: 195, condition: 'Excellent', colour: 'Ivory', size: 'Medium', image: 'https://madisonavenuecouture.com/cdn/shop/files/C-V-230601-3-01_1024x1024.jpg?v=1690559192', owner_id: 3, featured: true, rating: 4.9, reviews: 41, wishlist_count: 312 },
  { id: 4, title: 'Bottega Veneta Jodie Intrecciato Bag', brand: 'Bottega Veneta', category: 'Bags', location: 'Amsterdam, Netherlands', description: 'The Bottega Veneta Jodie in butter-soft intrecciato woven leather. An understated hobo-inspired silhouette that drapes beautifully. No visible logo — only the unmistakable weave that defines quiet luxury.', daily_rate: 115, condition: 'Like New', colour: 'Caramel', size: 'Small', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=85', owner_id: 4, featured: true, rating: 4.8, reviews: 22, wishlist_count: 89 },
  { id: 5, title: 'Hermès Birkin 30 Togo Leather', brand: 'Hermès', category: 'Bags', location: 'Paris, France', description: 'The bag that needs no introduction. This Hermès Birkin 30 in Togo calfskin with palladium hardware. Structured, spacious, and timeless. Colour: Biscuit. Originally purchased at the Hermès flagship, Paris.', daily_rate: 450, condition: 'Excellent', colour: 'Biscuit', size: '30cm', image: 'https://mightychic.com/wp-content/uploads/2023/12/hermes-birkin-30-biscuit-bag-for-sale-on-mightychic.jpg', owner_id: 9, featured: true, rating: 5.0, reviews: 38, wishlist_count: 612 },
  { id: 6, title: 'Saint Laurent Le 5 à 7 Hobo Bag', brand: 'Saint Laurent', category: 'Bags', location: 'Vienna, Austria', description: 'The Saint Laurent Le 5 à 7 in supple smooth leather with an adjustable strap. Named for the quintessential French cinq à sept. Subtle YSL cassandre logo hardware. Effortless Parisian cool.', daily_rate: 90, condition: 'Very Good', colour: 'Noir', size: 'Large', image: 'https://saint-laurent.dam.kering.com/asset/81f6bb95-c99c-46ea-8110-309728c0c2d9/eCom/6572282R20W1000_A.jpg?v=3', owner_id: 10, featured: false, rating: 4.6, reviews: 26, wishlist_count: 143 },

  // ── DRESSES ──
  { id: 7, title: 'Valentino Garavani VLogo Silk Gown', brand: 'Valentino', category: 'Dresses', location: 'Paris, France', description: 'A floor-length silk crépe gown from Valentino\'s archival collection, featuring the bold VLogo at the waist. Deep fuchsia, draped with architectural precision. Perfect for a gala, dinner, or wherever you need to be unforgettable.', daily_rate: 145, condition: 'Excellent', colour: 'Fuchsia Pink', size: 'UK 10 / IT 42', image: 'https://a.1stdibscdn.com/archivesE/upload/366869/v_11197031460738547313/_MG_0562_copy_org_master.jpg?width=1200', owner_id: 5, featured: true, rating: 4.9, reviews: 17, wishlist_count: 203 },
  { id: 8, title: 'Alexander McQueen Skull Scarf Dress', brand: 'Alexander McQueen', category: 'Dresses', location: 'Geneva, Switzerland', description: 'An archival Alexander McQueen skull-print chiffon dress in the signature skull scarf motif. Floaty, subversive, and unmistakably McQueen. Fully lined, with delicate flutter sleeves.', daily_rate: 125, condition: 'Excellent', colour: 'Ivory/Black', size: 'UK 12 / IT 44', image: 'https://amq-mcq.dam.kering.com/m/7043be5d75388055/eCom-5577173052Q9260_F.jpg?v=7', owner_id: 12, featured: false, rating: 4.7, reviews: 15, wishlist_count: 98 },

  // ── JEWELLERY ──
  { id: 9, title: 'Cartier Love Bracelet 18k Yellow Gold', brand: 'Cartier', category: 'Jewellery', location: 'Madrid, Spain', description: 'The quintessential Cartier Love Bracelet in 18-karat yellow gold. Designed by Aldo Cipullo in 1969, this iconic cuff fastens with a small screwdriver — a symbol of eternal love. Arrives with the original gold screwdriver.', daily_rate: 175, condition: 'Excellent', colour: 'Yellow Gold', size: 'Size 17', image: 'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwe3b6e900/images/large/e6cfdce0240f5c719d9f01f3ae8e31ef.png?sw=750&sh=750&sm=fit&sfrm=png', owner_id: 8, featured: true, rating: 4.9, reviews: 44, wishlist_count: 521 },

  // ── SHOES ──
  { id: 10, title: 'Christian Louboutin So Kate 120mm Pumps', brand: 'Louboutin', category: 'Shoes', location: 'Geneva, Switzerland', description: 'The definitive Louboutin heel. The So Kate in patent leather, 120mm, with the iconic red lacquered sole. A sculpted stiletto that elevates any look — from boardroom to black tie.', daily_rate: 75, condition: 'Very Good', colour: 'Black Patent', size: 'EU 38', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=85', owner_id: 11, featured: false, rating: 4.5, reviews: 19, wishlist_count: 167 },

  // ── WATCHES ──
  { id: 11, title: 'Rolex Datejust 36 Oystersteel & Everose Gold', brand: 'Rolex', category: 'Watches', location: 'Monaco', description: 'The Rolex Datejust in Oystersteel and Everose gold, 36mm case, with a silver sunray dial and fluted bezel. A watch worn by titans of industry for decades. Includes original box and papers.', daily_rate: 250, condition: 'Excellent', colour: 'Silver/Everose Gold', size: '36mm', image: 'https://jdwatchesny.com/cdn/shop/files/Pre-Owned-Rolex-36mm-Datejust-Stainless-Steel-Everose-Gold-126231-with-Silver-fluted-dial-and-Jubilee-Bracelet-Year-2023-to-2025-JD-Watches-NY-6.png?v=1756329071', owner_id: 6, featured: true, rating: 4.9, reviews: 53, wishlist_count: 445 },
  { id: 12, title: 'Rolex Submariner Date Black Ceramic', brand: 'Rolex', category: 'Watches', location: 'London, UK', description: 'The Rolex Submariner Date in Oystersteel, 41mm, with black Cerachrom bezel insert and black dial. The quintessential diver\'s watch — equally at home 300 metres below or at a Mayfair dinner. Box and papers included.', daily_rate: 295, condition: 'Excellent', colour: 'Black/Steel', size: '41mm', image: 'https://img.chrono24.com/images/uhren/32585129-b02ufm80eqd2mvz1mqzbqvcl-ExtraLarge.jpg', owner_id: 13, featured: true, rating: 4.8, reviews: 67, wishlist_count: 589 },
  { id: 13, title: 'Rolex Day-Date 40 President Yellow Gold', brand: 'Rolex', category: 'Watches', location: 'Geneva, Switzerland', description: 'The "President\'s watch." Rolex Day-Date 40 in 18-karat yellow gold with a champagne dial and President bracelet. Worn by every US President since Eisenhower. The definitive power watch.', daily_rate: 480, condition: 'Excellent', colour: 'Yellow Gold/Champagne', size: '40mm', image: 'https://b0650f7f058d5f70d743-97d5bb3f4194bc3eff7a94253e4a4e28.ssl.cf1.rackcdn.com/69599_MAIN_5364.jpg', owner_id: 15, featured: true, rating: 5.0, reviews: 29, wishlist_count: 412 },
  { id: 14, title: 'Rolex GMT-Master II "Pepsi" Steel', brand: 'Rolex', category: 'Watches', location: 'Singapore', description: 'The iconic Rolex GMT-Master II "Pepsi" in Oystersteel with the red/blue Cerachrom bezel. A pilot\'s complication born in 1954 for Pan Am crews. Tracks two time zones simultaneously. Julbilee bracelet, blue dial.', daily_rate: 320, condition: 'Very Good', colour: 'Blue/Red', size: '40mm', image: 'https://cdn2.jomashop.com/media/catalog/product/cache/0ee3019724ce73007b606b54ba535a23/r/o/rolex-gmtmaster-ii-pepsi-blue-and-red-bezel-stainless-steel-jubilee-watch-126710bksj-126710blro.jpg?width=546&height=546', owner_id: 17, featured: false, rating: 4.9, reviews: 44, wishlist_count: 503 },
  { id: 15, title: 'Rolex Daytona Cosmograph White Gold', brand: 'Rolex', category: 'Watches', location: 'Paris, France', description: 'The Rolex Cosmograph Daytona in 18-karat white gold with a meteorite dial. A racing chronograph born at Daytona International Speedway. Three sub-dials, tachymetric scale bezel. The most coveted Rolex on the market.', daily_rate: 520, condition: 'Excellent', colour: 'White Gold/Meteorite', size: '40mm', image: 'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_3000,h_3000,g_auto/f_auto/q_auto/v1741156626/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/bcba581c6c5cf48714d461acdba1de0c?_a=BAVAfVDW0', owner_id: 20, featured: true, rating: 4.9, reviews: 38, wishlist_count: 671 },
  { id: 16, title: 'Audemars Piguet Royal Oak 41mm Blue', brand: 'Audemars Piguet', category: 'Watches', location: 'Tokyo, Japan', description: 'The legendary Royal Oak in stainless steel, 41mm, with the iconic Grande Tapisserie blue dial and integrated bracelet. Designed by Gérald Genta in 1972, it redefined luxury watchmaking forever. Calibre 4302 selfwinding.', daily_rate: 395, condition: 'Very Good', colour: 'Steel Blue', size: '41mm', image: 'https://img.chrono24.com/images/uhren/38363070-j9iuygz0p39berthgowhnlm7-ExtraLarge.jpg', owner_id: 7, featured: true, rating: 4.8, reviews: 31, wishlist_count: 378 },
  { id: 17, title: 'Audemars Piguet Royal Oak Offshore Chronograph', brand: 'Audemars Piguet', category: 'Watches', location: 'Milan, Italy', description: 'The Royal Oak Offshore Chronograph in forged carbon and titanium, 44mm. A bold reinterpretation of the Royal Oak with a "Beast" personality — massive, dramatic, and technically outstanding. Flyback chronograph function.', daily_rate: 450, condition: 'Excellent', colour: 'Carbon/Titanium', size: '44mm', image: 'https://i0.wp.com/diamondsourcenyc.com/wp-content/uploads/2025/09/Audemars-Piguet-Royal-Oak-Offshore-44_mm-Mens-Watch-26400AU.OO_.A002CA.01-1-2-scaled.jpg?fit=2560%2C2560&ssl=1', owner_id: 14, featured: false, rating: 4.7, reviews: 19, wishlist_count: 267 },
  { id: 18, title: 'Audemars Piguet Royal Oak Perpetual Calendar', brand: 'Audemars Piguet', category: 'Watches', location: 'Geneva, Switzerland', description: 'The Royal Oak Perpetual Calendar in platinum, 41mm — one of the most complicated watches AP produces. Displays day, date, month, moon phase, and leap year cycle, all self-correcting until 2100. A masterpiece of haute horlogerie.', daily_rate: 680, condition: 'Excellent', colour: 'Platinum/Blue', size: '41mm', image: 'https://revolutionwatch.com/wp-content/uploads/2024/09/Revolution-Magazine_Audemars-Piguet_Royal-Oak-Offshore-Chronograph-forged-carbon-concept-case-watch.jpg', owner_id: 15, featured: false, rating: 4.9, reviews: 14, wishlist_count: 298 },
  { id: 19, title: 'Patek Philippe Nautilus 5711 Steel', brand: 'Patek Philippe', category: 'Watches', location: 'Geneva, Switzerland', description: 'The most sought-after sports watch in existence. Patek Philippe Nautilus ref. 5711 in stainless steel, 40mm, with the signature porthole case and olive-green dial. Calibre 26-330 S C automatic. Waiting lists worldwide — available here.', daily_rate: 750, condition: 'Excellent', colour: 'Steel/Olive Green', size: '40mm', image: 'https://oracleoftime.com/wp-content/uploads/2021/04/Patek-Philippe-Nautilus-5711-Olive-Green-Watch-Review-Featured.jpg', owner_id: 15, featured: true, rating: 5.0, reviews: 22, wishlist_count: 843 },
  { id: 20, title: 'Patek Philippe Calatrava 6119 Rose Gold', brand: 'Patek Philippe', category: 'Watches', location: 'Paris, France', description: 'The Patek Philippe Calatrava ref. 6119 in 18-karat rose gold — the purest expression of the dress watch. Minimalist dial, leaf-shaped hands, and the Calatrava cross caseback. Calibre 30-255 PS selfwinding. Understated perfection.', daily_rate: 580, condition: 'Excellent', colour: 'Rose Gold/White', size: '39mm', image: 'https://cdn.swisswatchexpo.com/productphotos/10/11/patek-philippe-calatrava-rose-gold-automatic-mens-watch-5127r-65252_8fb2d.jpg', owner_id: 20, featured: false, rating: 4.9, reviews: 18, wishlist_count: 356 },
  { id: 21, title: 'Patek Philippe Aquanaut 5167 Steel', brand: 'Patek Philippe', category: 'Watches', location: 'London, UK', description: 'The Patek Philippe Aquanaut ref. 5167 — the more accessible sibling of the Nautilus, yet equally coveted. Rounded octagonal case in stainless steel, 40mm, with tropical chocolate dial and composite strap. Water-resistant to 120m.', daily_rate: 620, condition: 'Very Good', colour: 'Steel/Chocolate', size: '40mm', image: 'https://luxurywatchesusa.com/wp-content/uploads/2021/11/Patek-Philippe-Aquanaut-5167-300R-010.jpg.webp', owner_id: 13, featured: false, rating: 4.8, reviews: 16, wishlist_count: 421 },
  { id: 22, title: 'Patek Philippe Grand Complications Perpetual', brand: 'Patek Philippe', category: 'Watches', location: 'Geneva, Switzerland', description: 'A Patek Philippe Grand Complications perpetual calendar chronograph in yellow gold. Featuring moon phase, split-seconds chronograph, and perpetual calendar — all in a 38mm case. Among the most technically sophisticated wristwatches ever produced.', daily_rate: 950, condition: 'Excellent', colour: 'Yellow Gold/Blue', size: '38mm', image: 'https://monochrome-watches.com/app/uploads/2020/07/2020-Patek-Philippe-5270J-001-Perpetual-Calendar-Chronograph-Yellow-Gold-5.jpg', owner_id: 15, featured: false, rating: 5.0, reviews: 9, wishlist_count: 512 },
  { id: 23, title: 'Rolex Explorer II White Dial Steel', brand: 'Rolex', category: 'Watches', location: 'Sydney, Australia', description: 'The Rolex Explorer II in Oystersteel, 42mm, with a white dial and orange 24-hour hand — a tool watch born for cavers and explorers. Distinguishes AM from PM with an independent GMT hand. Robust, legible, legendary.', daily_rate: 265, condition: 'Very Good', colour: 'Steel/White', size: '42mm', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=85', owner_id: 18, featured: false, rating: 4.6, reviews: 31, wishlist_count: 187 },
  { id: 24, title: 'Audemars Piguet Code 11.59 Selfwinding', brand: 'Audemars Piguet', category: 'Watches', location: 'São Paulo, Brazil', description: 'The AP Code 11.59 in pink gold, 41mm — AP\'s contemporary statement piece. A complex case construction featuring a circular middle case within an octagonal exterior. Pastel blue smoked dial with micro tapisserie. Calibre 4302.', daily_rate: 420, condition: 'Excellent', colour: 'Pink Gold/Blue', size: '41mm', image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=85', owner_id: 19, featured: false, rating: 4.5, reviews: 12, wishlist_count: 143 },
  { id: 25, title: 'Patek Philippe Twenty-4 Diamond Ladies', brand: 'Patek Philippe', category: 'Watches', location: 'Hong Kong', description: 'The Patek Philippe Twenty-4 Automatic in rose gold, set with 48 brilliant-cut diamonds on the bezel. A ladies\' watch of extraordinary elegance — rectangular case, champagne dial with diamond hour markers. The definition of feminine luxury.', daily_rate: 490, condition: 'Excellent', colour: 'Rose Gold/Diamond', size: '36mm', image: 'https://cdn.swisswatchexpo.com/productphotos/12/5/patek-philippe-calatrava-rose-gold-white-dial-diamond-mens-watch-5108r-66594_8cd16.jpg', owner_id: 12, featured: false, rating: 4.8, reviews: 21, wishlist_count: 334 },
];

const bookings = [];
const submissions = [];

function getOwner(id) {
  return owners.find(o => o.id === id) || owners[0];
}

function listingWithOwner(l) {
  const owner = getOwner(l.owner_id);
  return {
    ...l,
    owner_name: owner.name,
    owner_avatar: owner.avatar,
    owner_rating: owner.rating,
    owner_reviews: owner.reviews,
    owner_verified: owner.verified,
    owner_member_since: owner.member_since,
    owner_location: owner.location,
  };
}

// ========================
// API ROUTES
// ========================

app.get('/api/listings', (req, res) => {
  const { brand, category, sort, search, featured, limit } = req.query;
  let result = listings.map(listingWithOwner);

  if (brand) result = result.filter(l => l.brand === brand);
  if (category) result = result.filter(l => l.category === category);
  if (featured === 'true') result = result.filter(l => l.featured);
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(l =>
      l.title.toLowerCase().includes(s) ||
      l.brand.toLowerCase().includes(s) ||
      l.description.toLowerCase().includes(s)
    );
  }

  if (sort === 'price_asc') result.sort((a, b) => a.daily_rate - b.daily_rate);
  else if (sort === 'price_desc') result.sort((a, b) => b.daily_rate - a.daily_rate);
  else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.wishlist_count - a.wishlist_count);

  if (limit) result = result.slice(0, parseInt(limit));
  res.json(result);
});

app.get('/api/listings/:id', (req, res) => {
  const listing = listings.find(l => l.id === parseInt(req.params.id));
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listingWithOwner(listing));
});

app.get('/api/brands', (req, res) => {
  const brands = [...new Set(listings.map(l => l.brand))].sort();
  res.json(brands);
});

app.get('/api/categories', (req, res) => {
  const counts = {};
  listings.forEach(l => { counts[l.category] = (counts[l.category] || 0) + 1; });
  const categories = Object.entries(counts).map(([category, count]) => ({ category, count }));
  categories.sort((a, b) => b.count - a.count);
  res.json(categories);
});

app.post('/api/bookings', (req, res) => {
  const { listing_id, renter_name, renter_email, message, start_date, end_date, total_amount } = req.body;
  if (!listing_id || !renter_name || !renter_email || !start_date || !end_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const booking = { id: bookings.length + 1, listing_id, renter_name, renter_email, message: message || '', start_date, end_date, total_amount, status: 'confirmed', created_at: new Date().toISOString() };
  bookings.push(booking);
  res.json({ id: booking.id, status: 'confirmed' });
});

app.post('/api/submit-listing', (req, res) => {
  const { title, brand, category, description, daily_rate, condition, colour, size, owner_name, owner_email } = req.body;
  if (!title || !brand || !owner_email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const sub = { id: submissions.length + 1, title, brand, category, description, daily_rate, condition, colour, size, owner_name, owner_email, status: 'pending', created_at: new Date().toISOString() };
  submissions.push(sub);
  res.json({ id: sub.id, status: 'submitted' });
});

app.post('/api/listings/:id/wishlist', (req, res) => {
  const listing = listings.find(l => l.id === parseInt(req.params.id));
  if (!listing) return res.status(404).json({ error: 'Not found' });
  const { action } = req.body;
  listing.wishlist_count += action === 'remove' ? -1 : 1;
  res.json({ wishlist_count: listing.wishlist_count });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Velier server running on port ${PORT}`);
});
