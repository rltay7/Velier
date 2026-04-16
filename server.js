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
];

let listings = [
  { id: 1, title: 'Prada Re-Edition 2000 Mini Bag', brand: 'Prada', category: 'Bags', description: 'The iconic Prada Re-Edition 2000 Mini Bag in pristine nylon and saffiano leather. A defining piece of early-millennium luxury, reissued with the same impeccable craftsmanship. Features the signature Prada triangle logo and adjustable strap for effortless styling.', daily_rate: 85, condition: 'Excellent', colour: 'Black', size: 'Mini', images: ['bag-prada-1', 'bag-prada-2', 'bag-prada-3'], owner_id: 1, featured: true, rating: 4.9, reviews: 34, wishlist_count: 127 },
  { id: 2, title: 'Gucci Dionysus GG Supreme Shoulder Bag', brand: 'Gucci', category: 'Bags', description: 'The Gucci Dionysus shoulder bag in GG Supreme canvas, featuring the distinctive tiger head closure inspired by Greek mythology. A modern icon that bridges Gucci\'s storied heritage with contemporary vision.', daily_rate: 95, condition: 'Very Good', colour: 'Beige/Ebony', size: 'Medium', images: ['bag-gucci-1', 'bag-gucci-2', 'bag-gucci-3'], owner_id: 2, featured: true, rating: 4.8, reviews: 28, wishlist_count: 98 },
  { id: 3, title: 'Chanel Classic Flap Bag', brand: 'Chanel', category: 'Bags', description: 'The most coveted bag in the world. This Chanel Classic Double Flap in lambskin with gold hardware is the ultimate statement of refined elegance. The interlocking CC lock, quilted stitching, and chain strap are timeless.', daily_rate: 195, condition: 'Excellent', colour: 'Ivory', size: 'Medium', images: ['bag-chanel-1', 'bag-chanel-2', 'bag-chanel-3'], owner_id: 3, featured: true, rating: 5.0, reviews: 41, wishlist_count: 312 },
  { id: 4, title: 'Bottega Veneta Jodie Bag', brand: 'Bottega Veneta', category: 'Bags', description: 'The Bottega Veneta Jodie in butter-soft intrecciato woven leather. An understated hobo-inspired silhouette that drapes beautifully. No visible logo, only the unmistakable weave.', daily_rate: 115, condition: 'Like New', colour: 'Caramel', size: 'Small', images: ['bag-bottega-1', 'bag-bottega-2', 'bag-bottega-3'], owner_id: 4, featured: true, rating: 4.9, reviews: 22, wishlist_count: 89 },
  { id: 5, title: 'Valentino Garavani VLogo Silk Dress', brand: 'Valentino', category: 'Dresses', description: 'A floor-length silk crépe gown from Valentino\'s recent archival collection, featuring the bold VLogo at the waist. Deep fuchsia, draped with architectural precision. Perfect for a gala, dinner, or wherever you need to be unforgettable.', daily_rate: 145, condition: 'Excellent', colour: 'Fuchsia Pink', size: 'UK 10 / IT 42', images: ['dress-valentino-1', 'dress-valentino-2', 'dress-valentino-3'], owner_id: 5, featured: true, rating: 5.0, reviews: 17, wishlist_count: 203 },
  { id: 6, title: 'Rolex Datejust 36 Oyster Perpetual', brand: 'Rolex', category: 'Watches', description: 'The Rolex Datejust in Oystersteel and Everose gold, 36mm case, with a silver dial and fluted bezel. A watch worn by titans of every industry, yet refined enough for any occasion. Includes original box and papers.', daily_rate: 250, condition: 'Excellent', colour: 'Silver/Everose Gold', size: '36mm', images: ['watch-rolex-1', 'watch-rolex-2', 'watch-rolex-3'], owner_id: 6, featured: true, rating: 5.0, reviews: 53, wishlist_count: 445 },
  { id: 7, title: 'Audemars Piguet Royal Oak Selfwinding', brand: 'Audemars Piguet', category: 'Watches', description: 'The legendary Royal Oak in stainless steel, 41mm, with the iconic Grande Tapisserie dial and integrated bracelet. Calibre 4302 selfwinding movement. An extraordinary horological statement.', daily_rate: 395, condition: 'Very Good', colour: 'Steel Blue', size: '41mm', images: ['watch-ap-1', 'watch-ap-2', 'watch-ap-3'], owner_id: 7, featured: false, rating: 4.9, reviews: 31, wishlist_count: 378 },
  { id: 8, title: 'Cartier Love Bracelet', brand: 'Cartier', category: 'Jewellery', description: 'The quintessential Cartier Love Bracelet in 18-karat yellow gold. Designed by Aldo Cipullo in 1969, this iconic cuff fastens with a small screwdriver — a symbol of eternal love. Arrives with original gold screwdriver.', daily_rate: 175, condition: 'Excellent', colour: 'Yellow Gold', size: 'Size 17', images: ['jewel-cartier-1', 'jewel-cartier-2', 'jewel-cartier-3'], owner_id: 8, featured: true, rating: 5.0, reviews: 44, wishlist_count: 521 },
  { id: 9, title: 'Hermès Birkin 30 Togo Leather', brand: 'Hermès', category: 'Bags', description: 'The bag that needs no introduction. This Hermès Birkin 30 in Togo calfskin with palladium hardware. Structured and spacious. Colour: Biscuit. Originally purchased at the Hermès flagship, Paris.', daily_rate: 450, condition: 'Excellent', colour: 'Biscuit', size: '30cm', images: ['bag-hermes-1', 'bag-hermes-2', 'bag-hermes-3'], owner_id: 9, featured: true, rating: 5.0, reviews: 38, wishlist_count: 612 },
  { id: 10, title: 'Saint Laurent Le 5 à 7 Hobo Bag', brand: 'Saint Laurent', category: 'Bags', description: 'The Saint Laurent Le 5 à 7 in supple smooth leather with an adjustable strap. Named for the quintessential French cinq à sept. Subtle YSL cassandre logo hardware. Effortless Parisian cool.', daily_rate: 90, condition: 'Very Good', colour: 'Noir', size: 'Large', images: ['bag-syl-1', 'bag-syl-2', 'bag-syl-3'], owner_id: 10, featured: false, rating: 4.8, reviews: 26, wishlist_count: 143 },
  { id: 11, title: 'Christian Louboutin So Kate Pumps', brand: 'Louboutin', category: 'Shoes', description: 'The definitive Louboutin heel. The So Kate in patent leather, 120mm, with the iconic red lacquered sole. A sculpted 4.7" stiletto that elevates any look.', daily_rate: 75, condition: 'Very Good', colour: 'Black Patent', size: 'EU 38', images: ['shoe-loub-1', 'shoe-loub-2', 'shoe-loub-3'], owner_id: 11, featured: false, rating: 4.7, reviews: 19, wishlist_count: 167 },
  { id: 12, title: 'Alexander McQueen Skull Scarf Dress', brand: 'Alexander McQueen', category: 'Dresses', description: 'An archival Alexander McQueen skull-print chiffon dress in the signature skull scarf motif. Floaty, subversive, and unmistakably McQueen. Fully lined, with delicate flutter sleeves.', daily_rate: 125, condition: 'Excellent', colour: 'Ivory/Black', size: 'UK 12 / IT 44', images: ['dress-mcqueen-1', 'dress-mcqueen-2', 'dress-mcqueen-3'], owner_id: 12, featured: false, rating: 4.9, reviews: 15, wishlist_count: 98 },
];

const bookings = [];
const submissions = [];

function getOwner(id) {
  return owners.find(o => o.id === id);
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
