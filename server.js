const express = require('express');
const path = require('path');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://gwcesifbgjlwsnchzjwi.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y2VzaWZiZ2psd3NuY2h6andpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjMyOTM2MiwiZXhwIjoyMDkxOTA1MzYyfQ.xi7v8sj8Xa7EyDwPtbtKEzYnM8GXm_PSnfSajP_RJWc';

// Service-role client (admin, bypasses RLS) — server use only
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========================
// IN-MEMORY SEED DATA (served via /api/listings for browse page)
// New user listings go to Supabase
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

const seedListings = [
  { id: 1, title: 'Prada Re-Edition 2000 Mini Bag', brand: 'Prada', category: 'Bags', location: 'Paris, France', description: 'The iconic Prada Re-Edition 2000 Mini Bag in pristine nylon and saffiano leather.', daily_rate: 55, weekly_rate: 302, monthly_rate: 990, condition: 'Excellent', colour: 'Black', size: 'Mini', image: 'https://www.prada.com/content/dam/pradabkg_products/1/1NE/1NE515/RDH0F0002/1NE515_RDH0_F0002_MDLA.jpg', owner_id: 1, featured: true, rating: 4.9, reviews: 34, wishlist_count: 127, retail_price: 1650 },
  { id: 2, title: 'Gucci Dionysus GG Supreme Shoulder Bag', brand: 'Gucci', category: 'Bags', location: 'Milan, Italy', description: 'The Gucci Dionysus shoulder bag in GG Supreme canvas, featuring the distinctive tiger head closure.', daily_rate: 65, weekly_rate: 358, monthly_rate: 1170, condition: 'Very Good', colour: 'Beige/Ebony', size: 'Medium', image: 'https://images.unsplash.com/photo-1590739293931-a4e3e220d1e9?w=800&q=85', owner_id: 2, featured: true, rating: 4.7, reviews: 28, wishlist_count: 98, retail_price: 3200 },
  { id: 3, title: 'Chanel Classic Double Flap Bag', brand: 'Chanel', category: 'Bags', location: 'London, UK', description: 'The most coveted bag in the world. Chanel Classic Double Flap in lambskin with gold hardware.', daily_rate: 135, weekly_rate: 742, monthly_rate: 2430, condition: 'Excellent', colour: 'Ivory', size: 'Medium', image: 'https://madisonavenuecouture.com/cdn/shop/files/C-V-230601-3-01_1024x1024.jpg?v=1690559192', owner_id: 3, featured: true, rating: 4.9, reviews: 41, wishlist_count: 312, retail_price: 10800 },
  { id: 4, title: 'Bottega Veneta Jodie Intrecciato Bag', brand: 'Bottega Veneta', category: 'Bags', location: 'Amsterdam, Netherlands', description: 'The Bottega Veneta Jodie in butter-soft intrecciato woven leather.', daily_rate: 79, weekly_rate: 434, monthly_rate: 1422, condition: 'Like New', colour: 'Caramel', size: 'Small', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=85', owner_id: 4, featured: true, rating: 4.8, reviews: 22, wishlist_count: 89, retail_price: 4200 },
  { id: 5, title: 'Hermès Birkin 30 Togo Leather', brand: 'Hermès', category: 'Bags', location: 'Paris, France', description: 'The bag that needs no introduction. Hermès Birkin 30 in Togo calfskin with palladium hardware.', daily_rate: 295, weekly_rate: 1622, monthly_rate: 5310, condition: 'Excellent', colour: 'Biscuit', size: '30cm', image: 'https://mightychic.com/wp-content/uploads/2023/12/hermes-birkin-30-biscuit-bag-for-sale-on-mightychic.jpg', owner_id: 9, featured: true, rating: 5.0, reviews: 38, wishlist_count: 612, retail_price: 38000 },
  { id: 6, title: 'Saint Laurent Le 5 à 7 Hobo Bag', brand: 'Saint Laurent', category: 'Bags', location: 'Vienna, Austria', description: 'The Saint Laurent Le 5 à 7 in supple smooth leather with an adjustable strap.', daily_rate: 59, weekly_rate: 324, monthly_rate: 1062, condition: 'Very Good', colour: 'Noir', size: 'Large', image: 'https://saint-laurent.dam.kering.com/asset/81f6bb95-c99c-46ea-8110-309728c0c2d9/eCom/6572282R20W1000_A.jpg?v=3', owner_id: 10, featured: false, rating: 4.6, reviews: 26, wishlist_count: 143, retail_price: 2950 },
  { id: 7, title: 'Valentino Garavani VLogo Silk Gown', brand: 'Valentino', category: 'Dresses', location: 'Paris, France', description: 'A floor-length silk crépe gown from Valentino\'s archival collection, featuring the bold VLogo at the waist.', daily_rate: 95, weekly_rate: 522, monthly_rate: 1710, condition: 'Excellent', colour: 'Fuchsia Pink', size: 'UK 10 / IT 42', image: 'https://a.1stdibscdn.com/archivesE/upload/366869/v_11197031460738547313/_MG_0562_copy_org_master.jpg?width=1200', owner_id: 5, featured: true, rating: 4.9, reviews: 17, wishlist_count: 203, retail_price: 5800 },
  { id: 8, title: 'Alexander McQueen Skull Scarf Dress', brand: 'Alexander McQueen', category: 'Dresses', location: 'Geneva, Switzerland', description: 'An archival Alexander McQueen skull-print chiffon dress. Floaty, subversive, and unmistakably McQueen.', daily_rate: 82, weekly_rate: 451, monthly_rate: 1476, condition: 'Excellent', colour: 'Ivory/Black', size: 'UK 12 / IT 44', image: 'https://a.1stdibscdn.com/alexander-mcqueen-2010-catacombs-black-skull-print-wool-blend-long-sleeve-dress-for-sale/v_35562/v_241487021748127725188/v_24148702_1748127726979_bg_processed.jpg?width=768', owner_id: 12, featured: false, rating: 4.7, reviews: 15, wishlist_count: 98, retail_price: 4500 },
  { id: 9, title: 'Cartier Love Bracelet 18k Yellow Gold', brand: 'Cartier', category: 'Jewellery', location: 'Madrid, Spain', description: 'The quintessential Cartier Love Bracelet in 18-karat yellow gold.', daily_rate: 115, weekly_rate: 632, monthly_rate: 2070, condition: 'Excellent', colour: 'Yellow Gold', size: 'Size 17', image: 'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwe3b6e900/images/large/e6cfdce0240f5c719d9f01f3ae8e31ef.png?sw=750&sh=750&sm=fit&sfrm=png', owner_id: 8, featured: true, rating: 4.9, reviews: 44, wishlist_count: 521, retail_price: 7150 },
  { id: 10, title: 'Christian Louboutin So Kate 120mm Pumps', brand: 'Louboutin', category: 'Shoes', location: 'Geneva, Switzerland', description: 'The definitive Louboutin heel. So Kate in patent leather, 120mm, with the iconic red lacquered sole.', daily_rate: 45, weekly_rate: 248, monthly_rate: 810, condition: 'Very Good', colour: 'Black Patent', size: 'EU 38', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=85', owner_id: 11, featured: false, rating: 4.5, reviews: 19, wishlist_count: 167, retail_price: 825 },
  { id: 11, title: 'Rolex Datejust 36 Oystersteel & Everose Gold', brand: 'Rolex', category: 'Watches', location: 'Monaco', description: 'The Rolex Datejust in Oystersteel and Everose gold, 36mm case, with a silver sunray dial and fluted bezel.', daily_rate: 169, weekly_rate: 930, monthly_rate: 3042, condition: 'Excellent', colour: 'Silver/Everose Gold', size: '36mm', image: 'https://jdwatchesny.com/cdn/shop/files/Pre-Owned-Rolex-36mm-Datejust-Stainless-Steel-Everose-Gold-126231-with-Silver-fluted-dial-and-Jubilee-Bracelet-Year-2023-to-2025-JD-Watches-NY-6.png?v=1756329071', owner_id: 6, featured: true, rating: 4.9, reviews: 53, wishlist_count: 445, retail_price: 9650 },
  { id: 12, title: 'Rolex Submariner Date Black Ceramic', brand: 'Rolex', category: 'Watches', location: 'London, UK', description: 'The Rolex Submariner Date in Oystersteel, 41mm, with black Cerachrom bezel insert.', daily_rate: 195, weekly_rate: 1072, monthly_rate: 3510, condition: 'Excellent', colour: 'Black/Steel', size: '41mm', image: 'https://img.chrono24.com/images/uhren/32585129-b02ufm80eqd2mvz1mqzbqvcl-ExtraLarge.jpg', owner_id: 13, featured: true, rating: 4.8, reviews: 67, wishlist_count: 589, retail_price: 14950 },
  { id: 13, title: 'Rolex Day-Date 40 President Yellow Gold', brand: 'Rolex', category: 'Watches', location: 'Geneva, Switzerland', description: 'The "President\'s watch." Rolex Day-Date 40 in 18-karat yellow gold with a champagne dial.', daily_rate: 325, weekly_rate: 1788, monthly_rate: 5850, condition: 'Excellent', colour: 'Yellow Gold/Champagne', size: '40mm', image: 'https://b0650f7f058d5f70d743-97d5bb3f4194bc3eff7a94253e4a4e28.ssl.cf1.rackcdn.com/69599_MAIN_5364.jpg', owner_id: 15, featured: true, rating: 5.0, reviews: 29, wishlist_count: 412, retail_price: 42950 },
  { id: 14, title: 'Rolex GMT-Master II "Pepsi" Steel', brand: 'Rolex', category: 'Watches', location: 'Singapore', description: 'The iconic Rolex GMT-Master II "Pepsi" in Oystersteel with the red/blue Cerachrom bezel.', daily_rate: 215, weekly_rate: 1182, monthly_rate: 3870, condition: 'Very Good', colour: 'Blue/Red', size: '40mm', image: 'https://cdn2.jomashop.com/media/catalog/product/cache/0ee3019724ce73007b606b54ba535a23/r/o/rolex-gmtmaster-ii-pepsi-blue-and-red-bezel-stainless-steel-jubilee-watch-126710bksj-126710blro.jpg?width=546&height=546', owner_id: 17, featured: false, rating: 4.9, reviews: 44, wishlist_count: 503, retail_price: 16850 },
  { id: 15, title: 'Rolex Daytona Cosmograph White Gold', brand: 'Rolex', category: 'Watches', location: 'Paris, France', description: 'The Rolex Cosmograph Daytona in 18-karat white gold with a meteorite dial.', daily_rate: 345, weekly_rate: 1898, monthly_rate: 6210, condition: 'Excellent', colour: 'White Gold/Meteorite', size: '40mm', image: 'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_3000,h_3000,g_auto/f_auto/q_auto/v1741156626/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/bcba581c6c5cf48714d461acdba1de0c?_a=BAVAfVDW0', owner_id: 20, featured: true, rating: 4.9, reviews: 38, wishlist_count: 671, retail_price: 52500 },
  { id: 16, title: 'Audemars Piguet Royal Oak 41mm Blue', brand: 'Audemars Piguet', category: 'Watches', location: 'Tokyo, Japan', description: 'The legendary Royal Oak in stainless steel, 41mm, with the iconic Grande Tapisserie blue dial.', daily_rate: 259, weekly_rate: 1424, monthly_rate: 4662, condition: 'Very Good', colour: 'Steel Blue', size: '41mm', image: 'https://img.chrono24.com/images/uhren/38363070-j9iuygz0p39berthgowhnlm7-ExtraLarge.jpg', owner_id: 7, featured: true, rating: 4.8, reviews: 31, wishlist_count: 378, retail_price: 28500 },
  { id: 17, title: 'Audemars Piguet Royal Oak Offshore Chronograph', brand: 'Audemars Piguet', category: 'Watches', location: 'Milan, Italy', description: 'The Royal Oak Offshore Chronograph in forged carbon and titanium, 44mm.', daily_rate: 299, weekly_rate: 1644, monthly_rate: 5382, condition: 'Excellent', colour: 'Carbon/Titanium', size: '44mm', image: 'https://i0.wp.com/diamondsourcenyc.com/wp-content/uploads/2025/09/Audemars-Piguet-Royal-Oak-Offshore-44_mm-Mens-Watch-26400AU.OO_.A002CA.01-1-2-scaled.jpg?fit=2560%2C2560&ssl=1', owner_id: 14, featured: false, rating: 4.7, reviews: 19, wishlist_count: 267, retail_price: 52000 },
  { id: 18, title: 'Audemars Piguet Royal Oak Perpetual Calendar', brand: 'Audemars Piguet', category: 'Watches', location: 'Geneva, Switzerland', description: 'The Royal Oak Perpetual Calendar in platinum — one of the most complicated watches AP produces.', daily_rate: 449, weekly_rate: 2470, monthly_rate: 8082, condition: 'Excellent', colour: 'Platinum/Blue', size: '41mm', image: 'https://revolutionwatch.com/wp-content/uploads/2024/09/Revolution-Magazine_Audemars-Piguet_Royal-Oak-Offshore-Chronograph-forged-carbon-concept-case-watch.jpg', owner_id: 15, featured: false, rating: 4.9, reviews: 14, wishlist_count: 298, retail_price: 145000 },
  { id: 19, title: 'Patek Philippe Nautilus 5711 Steel', brand: 'Patek Philippe', category: 'Watches', location: 'Geneva, Switzerland', description: 'The most sought-after sports watch in existence. Patek Philippe Nautilus ref. 5711 in stainless steel.', daily_rate: 495, weekly_rate: 2722, monthly_rate: 8910, condition: 'Excellent', colour: 'Steel/Olive Green', size: '40mm', image: 'https://oracleoftime.com/wp-content/uploads/2021/04/Patek-Philippe-Nautilus-5711-Olive-Green-Watch-Review-Featured.jpg', owner_id: 15, featured: true, rating: 5.0, reviews: 22, wishlist_count: 843, retail_price: 135000 },
  { id: 20, title: 'Patek Philippe Calatrava 6119 Rose Gold', brand: 'Patek Philippe', category: 'Watches', location: 'Paris, France', description: 'The Patek Philippe Calatrava ref. 6119 in 18-karat rose gold — the purest expression of the dress watch.', daily_rate: 385, weekly_rate: 2118, monthly_rate: 6930, condition: 'Excellent', colour: 'Rose Gold/White', size: '39mm', image: 'https://cdn.swisswatchexpo.com/productphotos/10/11/patek-philippe-calatrava-rose-gold-automatic-mens-watch-5127r-65252_8fb2d.jpg', owner_id: 20, featured: false, rating: 4.9, reviews: 18, wishlist_count: 356, retail_price: 38500 },
  { id: 21, title: 'Patek Philippe Aquanaut 5167 Steel', brand: 'Patek Philippe', category: 'Watches', location: 'London, UK', description: 'The Patek Philippe Aquanaut ref. 5167 — rounded octagonal case in stainless steel, tropical chocolate dial.', daily_rate: 415, weekly_rate: 2282, monthly_rate: 7470, condition: 'Very Good', colour: 'Steel/Chocolate', size: '40mm', image: 'https://luxurywatchesusa.com/wp-content/uploads/2021/11/Patek-Philippe-Aquanaut-5167-300R-010.jpg.webp', owner_id: 13, featured: false, rating: 4.8, reviews: 16, wishlist_count: 421, retail_price: 48000 },
  { id: 22, title: 'Patek Philippe Grand Complications Perpetual', brand: 'Patek Philippe', category: 'Watches', location: 'Geneva, Switzerland', description: 'Patek Philippe Grand Complications perpetual calendar chronograph in yellow gold.', daily_rate: 625, weekly_rate: 3438, monthly_rate: 11250, condition: 'Excellent', colour: 'Yellow Gold/Blue', size: '38mm', image: 'https://monochrome-watches.com/app/uploads/2020/07/2020-Patek-Philippe-5270J-001-Perpetual-Calendar-Chronograph-Yellow-Gold-5.jpg', owner_id: 15, featured: false, rating: 5.0, reviews: 9, wishlist_count: 512, retail_price: 285000 },
  { id: 23, title: 'Rolex Explorer II White Dial Steel', brand: 'Rolex', category: 'Watches', location: 'Sydney, Australia', description: 'The Rolex Explorer II in Oystersteel, 42mm, with a white dial and orange 24-hour hand.', daily_rate: 169, weekly_rate: 930, monthly_rate: 3042, condition: 'Very Good', colour: 'Steel/White', size: '42mm', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=85', owner_id: 18, featured: false, rating: 4.6, reviews: 31, wishlist_count: 187, retail_price: 9250 },
  { id: 24, title: 'Audemars Piguet Code 11.59 Selfwinding', brand: 'Audemars Piguet', category: 'Watches', location: 'São Paulo, Brazil', description: 'The AP Code 11.59 in pink gold, 41mm — AP\'s contemporary statement piece.', daily_rate: 279, weekly_rate: 1534, monthly_rate: 5022, condition: 'Excellent', colour: 'Pink Gold/Blue', size: '41mm', image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=85', owner_id: 19, featured: false, rating: 4.5, reviews: 12, wishlist_count: 143, retail_price: 36500 },
  { id: 25, title: 'Patek Philippe Twenty-4 Diamond Ladies', brand: 'Patek Philippe', category: 'Watches', location: 'Hong Kong', description: 'The Patek Philippe Twenty-4 Automatic in rose gold, set with 48 brilliant-cut diamonds on the bezel.', daily_rate: 325, weekly_rate: 1788, monthly_rate: 5850, condition: 'Excellent', colour: 'Rose Gold/Diamond', size: '36mm', image: 'https://cdn.swisswatchexpo.com/productphotos/12/5/patek-philippe-calatrava-rose-gold-white-dial-diamond-mens-watch-5108r-66594_8cd16.jpg', owner_id: 12, featured: false, rating: 4.8, reviews: 21, wishlist_count: 334, retail_price: 55000 },
];

function getOwner(id) { return owners.find(o => o.id === id) || owners[0]; }
function listingWithOwner(l) {
  const owner = getOwner(l.owner_id);
  return { ...l, owner_name: owner.name, owner_avatar: owner.avatar, owner_rating: owner.rating, owner_reviews: owner.reviews, owner_verified: owner.verified, owner_member_since: owner.member_since, owner_location: owner.location };
}

// ========================
// AUTH MIDDLEWARE
// ========================

async function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorised' });
  const token = auth.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: 'Invalid token' });
  req.user = user;
  next();
}

// ========================
// AUTH ROUTES
// ========================

// Sign up
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, full_name } = req.body;
  if (!email || !password || !full_name) return res.status(400).json({ error: 'Email, password and full name required' });
  const { data, error } = await supabase.auth.admin.createUser({
    email, password,
    user_metadata: { full_name },
    email_confirm: true,
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: { id: data.user.id, email: data.user.email, full_name } });
});

// Sign in
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json({
    access_token: data.session.access_token,
    user: {
      id: data.user.id,
      email: data.user.email,
      full_name: data.user.user_metadata?.full_name || '',
    }
  });
});

// Get current user profile
app.get('/api/auth/me', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', req.user.id)
    .single();
  if (error) return res.status(404).json({ error: 'Profile not found' });
  res.json({ ...data, email: req.user.email });
});

// ========================
// LISTINGS API (seed + Supabase merged)
// ========================

app.get('/api/listings', async (req, res) => {
  const { brand, category, sort, search, featured, limit } = req.query;

  // Fetch user-submitted listings from Supabase
  let userListings = [];
  try {
    const { data } = await supabase.from('listings').select('*').eq('is_active', true);
    if (data) {
      userListings = data.map(l => ({
        ...l,
        owner_name: 'Velier Member',
        owner_avatar: '??',
        owner_rating: 4.8,
        owner_reviews: 0,
        owner_verified: true,
        owner_member_since: new Date(l.created_at).getFullYear().toString(),
        owner_location: l.location || 'Unknown',
        user_listing: true,
      }));
    }
  } catch (e) { /* fallback to seed only */ }

  // Merge seed + user listings (user listings get IDs above 1000 to avoid collisions)
  let result = [
    ...seedListings.map(listingWithOwner),
    ...userListings.map(l => ({ ...l, id: l.id + 1000 })),
  ];

  if (brand) result = result.filter(l => l.brand === brand);
  if (category) result = result.filter(l => l.category === category);
  if (featured === 'true') result = result.filter(l => l.featured);
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(l => l.title.toLowerCase().includes(s) || l.brand.toLowerCase().includes(s) || (l.description||'').toLowerCase().includes(s));
  }
  if (sort === 'price_asc') result.sort((a, b) => a.daily_rate - b.daily_rate);
  else if (sort === 'price_desc') result.sort((a, b) => b.daily_rate - a.daily_rate);
  else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.wishlist_count - a.wishlist_count);
  if (limit) result = result.slice(0, parseInt(limit));
  res.json(result);
});

app.get('/api/listings/:id', (req, res) => {
  const listing = seedListings.find(l => l.id === parseInt(req.params.id));
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listingWithOwner(listing));
});

app.get('/api/brands', (req, res) => {
  const brands = [...new Set(seedListings.map(l => l.brand))].sort();
  res.json(brands);
});

app.get('/api/categories', (req, res) => {
  const counts = {};
  seedListings.forEach(l => { counts[l.category] = (counts[l.category] || 0) + 1; });
  res.json(Object.entries(counts).map(([category, count]) => ({ category, count })).sort((a, b) => b.count - a.count));
});

// ========================
// BOOKINGS
// ========================

app.post('/api/bookings', requireAuth, async (req, res) => {
  const { listing_id, start_date, end_date, total_price, insurance_tier, days } = req.body;
  if (!listing_id || !start_date || !end_date) return res.status(400).json({ error: 'Missing required fields' });

  // Find owner_id from listing
  const listing = seedListings.find(l => l.id === parseInt(listing_id));
  const owner_id = listing ? null : null; // seed listings have no real owner_id

  const { data, error } = await supabase.from('bookings').insert({
    listing_id: parseInt(listing_id),
    renter_id: req.user.id,
    owner_id,
    start_date, end_date,
    days: days || 1,
    total_price: total_price || 0,
    insurance_tier: insurance_tier || 'none',
    status: 'confirmed',
  }).select().single();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ id: data.id, status: 'confirmed' });
});

// ========================
// USER DASHBOARD
// ========================

// Get user's own listings
app.get('/api/dashboard/listings', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('owner_id', req.user.id)
    .order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data || []);
});

// Get user's bookings (as renter)
app.get('/api/dashboard/bookings', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('renter_id', req.user.id)
    .order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data || []);
});

// Get booking requests on user's listings (as owner)
app.get('/api/dashboard/requests', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('owner_id', req.user.id)
    .order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data || []);
});

// Submit a new listing (authenticated)
app.post('/api/submit-listing', requireAuth, async (req, res) => {
  const { title, brand, category, description, daily_rate, condition, colour, size, location, image } = req.body;
  if (!title || !brand) return res.status(400).json({ error: 'Missing required fields' });
  const weekly_rate = Math.round(parseFloat(daily_rate) * 5.5);
  const monthly_rate = Math.round(parseFloat(daily_rate) * 18);
  const { data, error } = await supabase.from('listings').insert({
    owner_id: req.user.id,
    title, brand, category, description,
    daily_rate: parseFloat(daily_rate),
    weekly_rate, monthly_rate,
    condition, colour, size, location,
    image: image || null,
    is_active: true,
  }).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ id: data.id, status: 'live' });
});

// Update listing
app.patch('/api/listings/:id', requireAuth, async (req, res) => {
  // Strip any fields that shouldn't be updated directly
  const { id, owner_id, created_at, ...allowed } = req.body;
  console.log('[PATCH listing]', req.params.id, 'user:', req.user.id, 'body:', allowed);
  const { data, error } = await supabase
    .from('listings')
    .update(allowed)
    .eq('id', req.params.id)
    .eq('owner_id', req.user.id)
    .select();
  console.log('[PATCH listing result]', data, error);
  if (error) return res.status(400).json({ error: error.message });
  if (!data || data.length === 0) return res.status(404).json({ error: 'Listing not found or not owned by you' });
  res.json(data[0]);
});

// Delete (deactivate) listing
app.delete('/api/listings/:id', requireAuth, async (req, res) => {
  const { error } = await supabase
    .from('listings')
    .update({ is_active: false })
    .eq('id', req.params.id)
    .eq('owner_id', req.user.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ status: 'removed' });
});

// Wishlist (keep in-memory for seed listings)
// Proxy photo upload to Supabase Storage using service role key (avoids user JWT expiry issues)
app.post('/api/upload', requireAuth, express.raw({ type: '*/*', limit: '20mb' }), async (req, res) => {
  try {
    const filename = req.headers['x-filename'] || `${Date.now()}.jpg`;
    const contentType = req.headers['x-content-type'] || req.headers['content-type'] || 'image/jpeg';
    const path = `${req.user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}-${filename}`;
    const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/listing-images/${path}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': contentType,
      },
      body: req.body,
    });
    if (!uploadRes.ok) {
      const err = await uploadRes.json().catch(() => ({}));
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/listing-images/${path}`;
    res.json({ url: publicUrl });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/listings/:id/wishlist', (req, res) => {
  const listing = seedListings.find(l => l.id === parseInt(req.params.id));
  if (!listing) return res.status(404).json({ error: 'Not found' });
  const { action } = req.body;
  listing.wishlist_count += action === 'remove' ? -1 : 1;
  res.json({ wishlist_count: listing.wishlist_count });
});

// ========================
// ADMIN API (service-role key required in header)
// ========================

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'velier-admin-2026';

function requireAdmin(req, res, next) {
  const secret = req.headers['x-admin-secret'];
  if (secret !== ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  next();
}

// Admin: get all listings (including inactive)
app.get('/api/admin/listings', requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('listings')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data || []);
});

// Admin: approve/suspend listing
app.patch('/api/admin/listings/:id', requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('listings')
    .update(req.body)
    .eq('id', req.params.id)
    .select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Admin: delete listing
app.delete('/api/admin/listings/:id', requireAdmin, async (req, res) => {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ status: 'deleted' });
});

// Admin: get all users
app.get('/api/admin/users', requireAdmin, async (req, res) => {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) return res.status(400).json({ error: error.message });
  // Merge with profiles
  const { data: profiles } = await supabase.from('profiles').select('*');
  const profileMap = {};
  (profiles || []).forEach(p => { profileMap[p.id] = p; });
  const users = (data.users || []).map(u => ({
    id: u.id,
    email: u.email,
    full_name: profileMap[u.id]?.full_name || u.user_metadata?.full_name || '',
    created_at: u.created_at,
    last_sign_in: u.last_sign_in_at,
    confirmed: !!u.confirmed_at,
  }));
  res.json(users);
});

// Admin: delete user
app.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
  const { error } = await supabase.auth.admin.deleteUser(req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ status: 'deleted' });
});

// Admin: get all bookings
app.get('/api/admin/bookings', requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data || []);
});

// Admin: update booking status
app.patch('/api/admin/bookings/:id', requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .update(req.body)
    .eq('id', req.params.id)
    .select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Velier server running on port ${PORT}`));
