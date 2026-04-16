const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new Database(path.join(__dirname, 'velier.db'));

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS owners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    avatar TEXT,
    rating REAL DEFAULT 5.0,
    reviews INTEGER DEFAULT 0,
    verified INTEGER DEFAULT 0,
    member_since TEXT,
    location TEXT
  );

  CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    daily_rate REAL NOT NULL,
    condition TEXT,
    colour TEXT,
    size TEXT,
    images TEXT,
    owner_id INTEGER,
    featured INTEGER DEFAULT 0,
    rating REAL DEFAULT 4.8,
    reviews INTEGER DEFAULT 0,
    wishlist_count INTEGER DEFAULT 0,
    FOREIGN KEY (owner_id) REFERENCES owners(id)
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    listing_id INTEGER NOT NULL,
    renter_name TEXT NOT NULL,
    renter_email TEXT NOT NULL,
    message TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
  );

  CREATE TABLE IF NOT EXISTS item_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    brand TEXT,
    category TEXT,
    description TEXT,
    daily_rate REAL,
    condition TEXT,
    colour TEXT,
    size TEXT,
    owner_name TEXT,
    owner_email TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// Seed data
const ownerCount = db.prepare('SELECT COUNT(*) as count FROM owners').get();
if (ownerCount.count === 0) {
  const insertOwner = db.prepare(`
    INSERT INTO owners (name, avatar, rating, reviews, verified, member_since, location)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const owners = [
    ['Isabelle Fontaine', 'IF', 4.9, 47, 1, '2021', 'Paris, France'],
    ['Sofia Marchetti', 'SM', 5.0, 63, 1, '2020', 'Milan, Italy'],
    ['Arabella Whitmore', 'AW', 4.8, 29, 1, '2022', 'London, UK'],
    ['Cleo Vandenberg', 'CV', 4.9, 38, 1, '2021', 'Amsterdam, Netherlands'],
    ['Margot Delacroix', 'MD', 5.0, 52, 1, '2019', 'Paris, France'],
    ['Natasha Ivanova', 'NI', 4.7, 21, 1, '2022', 'Monaco'],
    ['Yuki Tanaka', 'YT', 5.0, 41, 1, '2020', 'Tokyo, Japan'],
    ['Serena Villanueva', 'SV', 4.9, 33, 1, '2021', 'Madrid, Spain'],
    ['Elara Okafor', 'EO', 4.8, 18, 1, '2023', 'Lagos, Nigeria'],
    ['Petra Königsberg', 'PK', 5.0, 56, 1, '2019', 'Vienna, Austria'],
    ['Camille Rousseau', 'CR', 4.9, 44, 1, '2020', 'Geneva, Switzerland'],
    ['Audrey Chen', 'AC', 4.8, 27, 1, '2022', 'Hong Kong'],
  ];

  const ownerIds = [];
  for (const owner of owners) {
    const result = insertOwner.run(...owner);
    ownerIds.push(result.lastInsertRowid);
  }

  const insertListing = db.prepare(`
    INSERT INTO listings (title, brand, category, description, daily_rate, condition, colour, size, images, owner_id, featured, rating, reviews, wishlist_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const listings = [
    {
      title: 'Prada Re-Edition 2000 Mini Bag',
      brand: 'Prada',
      category: 'Bags',
      description: 'The iconic Prada Re-Edition 2000 Mini Bag in pristine nylon and saffiano leather. A defining piece of early-millennium luxury, reissued with the same impeccable craftsmanship. Features the signature Prada triangle logo and adjustable strap for effortless styling.',
      daily_rate: 85,
      condition: 'Excellent',
      colour: 'Black',
      size: 'Mini',
      images: JSON.stringify(['bag-prada-1', 'bag-prada-2', 'bag-prada-3']),
      owner_id: ownerIds[0],
      featured: 1,
      rating: 4.9,
      reviews: 34,
      wishlist_count: 127
    },
    {
      title: 'Gucci Dionysus GG Supreme Shoulder Bag',
      brand: 'Gucci',
      category: 'Bags',
      description: 'The Gucci Dionysus shoulder bag in GG Supreme canvas, featuring the distinctive tiger head closure inspired by Greek mythology. A modern icon that bridges Gucci\'s storied heritage with contemporary vision. Interior lined in suede with a central zip compartment.',
      daily_rate: 95,
      condition: 'Very Good',
      colour: 'Beige/Ebony',
      size: 'Medium',
      images: JSON.stringify(['bag-gucci-1', 'bag-gucci-2', 'bag-gucci-3']),
      owner_id: ownerIds[1],
      featured: 1,
      rating: 4.8,
      reviews: 28,
      wishlist_count: 98
    },
    {
      title: 'Chanel Classic Flap Bag',
      brand: 'Chanel',
      category: 'Bags',
      description: 'The most coveted bag in the world. This Chanel Classic Double Flap in lambskin with gold hardware is the ultimate statement of refined elegance. The interlocking CC lock, quilted stitching, and chain strap are timeless. An extraordinary piece for an extraordinary occasion.',
      daily_rate: 195,
      condition: 'Excellent',
      colour: 'Ivory',
      size: 'Medium',
      images: JSON.stringify(['bag-chanel-1', 'bag-chanel-2', 'bag-chanel-3']),
      owner_id: ownerIds[2],
      featured: 1,
      rating: 5.0,
      reviews: 41,
      wishlist_count: 312
    },
    {
      title: 'Bottega Veneta Jodie Bag',
      brand: 'Bottega Veneta',
      category: 'Bags',
      description: 'The Bottega Veneta Jodie in butter-soft intrecciato woven leather. Daniel Lee\'s defining shape for the house — a gathered, hobo-inspired silhouette that drapes beautifully. Understated luxury at its most pure, with no visible logo, only the unmistakable weave.',
      daily_rate: 115,
      condition: 'Like New',
      colour: 'Caramel',
      size: 'Small',
      images: JSON.stringify(['bag-bottega-1', 'bag-bottega-2', 'bag-bottega-3']),
      owner_id: ownerIds[3],
      featured: 1,
      rating: 4.9,
      reviews: 22,
      wishlist_count: 89
    },
    {
      title: 'Valentino Garavani VLogo Silk Dress',
      brand: 'Valentino',
      category: 'Dresses',
      description: 'A floor-length silk crépe gown from Valentino\'s recent archival collection, featuring the bold VLogo at the waist. Pierpaolo Piccioli\'s signature dreamlike romance. Deep fuchsia, draped with architectural precision. Perfect for a gala, dinner, or wherever you need to be unforgettable.',
      daily_rate: 145,
      condition: 'Excellent',
      colour: 'Fuchsia Pink',
      size: 'UK 10 / IT 42',
      images: JSON.stringify(['dress-valentino-1', 'dress-valentino-2', 'dress-valentino-3']),
      owner_id: ownerIds[4],
      featured: 1,
      rating: 5.0,
      reviews: 17,
      wishlist_count: 203
    },
    {
      title: 'Rolex Datejust 36 Oyster Perpetual',
      brand: 'Rolex',
      category: 'Watches',
      description: 'The Rolex Datejust in Oystersteel and Everose gold, 36mm case, with a silver dial and fluted bezel. Perpetual calibre movement with date function. A watch worn by titans of every industry, yet refined enough for any occasion. Includes original box and papers.',
      daily_rate: 250,
      condition: 'Excellent',
      colour: 'Silver/Everose Gold',
      size: '36mm',
      images: JSON.stringify(['watch-rolex-1', 'watch-rolex-2', 'watch-rolex-3']),
      owner_id: ownerIds[5],
      featured: 1,
      rating: 5.0,
      reviews: 53,
      wishlist_count: 445
    },
    {
      title: 'Audemars Piguet Royal Oak Selfwinding',
      brand: 'Audemars Piguet',
      category: 'Watches',
      description: 'The legendary Royal Oak in stainless steel, 41mm, with the iconic Grande Tapisserie dial and integrated bracelet. Gérald Genta\'s masterpiece from 1972 reinvented for the modern collector. Calibre 4302 selfwinding movement. An extraordinary horological statement.',
      daily_rate: 395,
      condition: 'Very Good',
      colour: 'Steel Blue',
      size: '41mm',
      images: JSON.stringify(['watch-ap-1', 'watch-ap-2', 'watch-ap-3']),
      owner_id: ownerIds[6],
      featured: 0,
      rating: 4.9,
      reviews: 31,
      wishlist_count: 378
    },
    {
      title: 'Cartier Love Bracelet',
      brand: 'Cartier',
      category: 'Jewellery',
      description: 'The quintessential Cartier Love Bracelet in 18-karat yellow gold. Designed by Aldo Cipullo in 1969, this iconic cuff fastens with a small screwdriver — a symbol of eternal love. Arrives with original gold screwdriver. One of the most recognised jewellery pieces in the world.',
      daily_rate: 175,
      condition: 'Excellent',
      colour: 'Yellow Gold',
      size: 'Size 17',
      images: JSON.stringify(['jewel-cartier-1', 'jewel-cartier-2', 'jewel-cartier-3']),
      owner_id: ownerIds[7],
      featured: 1,
      rating: 5.0,
      reviews: 44,
      wishlist_count: 521
    },
    {
      title: 'Hermès Birkin 30 Togo Leather',
      brand: 'Hermès',
      category: 'Bags',
      description: 'The bag that needs no introduction. This Hermès Birkin 30 in Togo calfskin with palladium hardware is among the most sought-after objects in the world. Structured and spacious, it carries a lifetime\'s worth of occasion. Colour: Biscuit. Originally purchased at the Hermès flagship, Paris.',
      daily_rate: 450,
      condition: 'Excellent',
      colour: 'Biscuit',
      size: '30cm',
      images: JSON.stringify(['bag-hermes-1', 'bag-hermes-2', 'bag-hermes-3']),
      owner_id: ownerIds[8],
      featured: 1,
      rating: 5.0,
      reviews: 38,
      wishlist_count: 612
    },
    {
      title: 'Saint Laurent Le 5 à 7 Hobo Bag',
      brand: 'Saint Laurent',
      category: 'Bags',
      description: 'The Saint Laurent Le 5 à 7 in supple smooth leather with an adjustable strap. Named for the quintessential French "cinq à sept" — the hours between work and dinner when anything is possible. Subtle YSL cassandre logo hardware. Effortless Parisian cool.',
      daily_rate: 90,
      condition: 'Very Good',
      colour: 'Noir',
      size: 'Large',
      images: JSON.stringify(['bag-syl-1', 'bag-syl-2', 'bag-syl-3']),
      owner_id: ownerIds[9],
      featured: 0,
      rating: 4.8,
      reviews: 26,
      wishlist_count: 143
    },
    {
      title: 'Christian Louboutin So Kate Pumps',
      brand: 'Louboutin',
      category: 'Shoes',
      description: 'The definitive Louboutin heel. The So Kate in patent leather, 120mm, with the iconic red lacquered sole that started a revolution. A sculpted 4.7" stiletto that elevates any look. Worn by the world\'s most photographed women on every red carpet.',
      daily_rate: 75,
      condition: 'Very Good',
      colour: 'Black Patent',
      size: 'EU 38',
      images: JSON.stringify(['shoe-loub-1', 'shoe-loub-2', 'shoe-loub-3']),
      owner_id: ownerIds[10],
      featured: 0,
      rating: 4.7,
      reviews: 19,
      wishlist_count: 167
    },
    {
      title: 'Alexander McQueen Skull Scarf Dress',
      brand: 'Alexander McQueen',
      category: 'Dresses',
      description: 'An archival Alexander McQueen skull-print chiffon dress in the signature skull scarf motif first introduced by Lee McQueen. Floaty, subversive, and unmistakably McQueen. A conversation piece for the theatrically inclined. Fully lined, with delicate flutter sleeves.',
      daily_rate: 125,
      condition: 'Excellent',
      colour: 'Ivory/Black',
      size: 'UK 12 / IT 44',
      images: JSON.stringify(['dress-mcqueen-1', 'dress-mcqueen-2', 'dress-mcqueen-3']),
      owner_id: ownerIds[11],
      featured: 0,
      rating: 4.9,
      reviews: 15,
      wishlist_count: 98
    }
  ];

  for (const l of listings) {
    insertListing.run(
      l.title, l.brand, l.category, l.description, l.daily_rate,
      l.condition, l.colour, l.size, l.images, l.owner_id,
      l.featured, l.rating, l.reviews, l.wishlist_count
    );
  }

  console.log('Database seeded with 12 luxury listings');
}

// ========================
// API ROUTES
// ========================

// Get all listings with optional filters
app.get('/api/listings', (req, res) => {
  const { brand, category, sort, search, featured, limit } = req.query;
  let query = `
    SELECT l.*, o.name as owner_name, o.avatar as owner_avatar, 
           o.rating as owner_rating, o.reviews as owner_reviews, 
           o.verified as owner_verified, o.location as owner_location
    FROM listings l
    JOIN owners o ON l.owner_id = o.id
    WHERE 1=1
  `;
  const params = [];

  if (brand) {
    query += ' AND l.brand = ?';
    params.push(brand);
  }
  if (category) {
    query += ' AND l.category = ?';
    params.push(category);
  }
  if (featured === 'true') {
    query += ' AND l.featured = 1';
  }
  if (search) {
    query += ' AND (l.title LIKE ? OR l.brand LIKE ? OR l.description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (sort === 'price_asc') query += ' ORDER BY l.daily_rate ASC';
  else if (sort === 'price_desc') query += ' ORDER BY l.daily_rate DESC';
  else if (sort === 'rating') query += ' ORDER BY l.rating DESC';
  else query += ' ORDER BY l.featured DESC, l.wishlist_count DESC';

  if (limit) query += ` LIMIT ${parseInt(limit)}`;

  const listings = db.prepare(query).all(...params);
  res.json(listings);
});

// Get single listing
app.get('/api/listings/:id', (req, res) => {
  const listing = db.prepare(`
    SELECT l.*, o.name as owner_name, o.avatar as owner_avatar, 
           o.rating as owner_rating, o.reviews as owner_reviews, 
           o.verified as owner_verified, o.member_since as owner_member_since,
           o.location as owner_location
    FROM listings l
    JOIN owners o ON l.owner_id = o.id
    WHERE l.id = ?
  `).get(req.params.id);

  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  listing.images = JSON.parse(listing.images);
  res.json(listing);
});

// Get brands
app.get('/api/brands', (req, res) => {
  const brands = db.prepare('SELECT DISTINCT brand FROM listings ORDER BY brand').all();
  res.json(brands.map(b => b.brand));
});

// Get categories
app.get('/api/categories', (req, res) => {
  const categories = db.prepare('SELECT DISTINCT category, COUNT(*) as count FROM listings GROUP BY category ORDER BY count DESC').all();
  res.json(categories);
});

// Create booking
app.post('/api/bookings', (req, res) => {
  const { listing_id, renter_name, renter_email, message, start_date, end_date, total_amount } = req.body;
  if (!listing_id || !renter_name || !renter_email || !start_date || !end_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const result = db.prepare(`
    INSERT INTO bookings (listing_id, renter_name, renter_email, message, start_date, end_date, total_amount)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(listing_id, renter_name, renter_email, message || '', start_date, end_date, total_amount);
  res.json({ id: result.lastInsertRowid, status: 'confirmed' });
});

// Submit listing
app.post('/api/submit-listing', (req, res) => {
  const { title, brand, category, description, daily_rate, condition, colour, size, owner_name, owner_email } = req.body;
  if (!title || !brand || !owner_email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const result = db.prepare(`
    INSERT INTO item_submissions (title, brand, category, description, daily_rate, condition, colour, size, owner_name, owner_email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, brand, category, description, daily_rate, condition, colour, size, owner_name, owner_email);
  res.json({ id: result.lastInsertRowid, status: 'submitted' });
});

// Toggle wishlist count (simple increment)
app.post('/api/listings/:id/wishlist', (req, res) => {
  const { action } = req.body; // 'add' or 'remove'
  const delta = action === 'remove' ? -1 : 1;
  db.prepare('UPDATE listings SET wishlist_count = wishlist_count + ? WHERE id = ?').run(delta, req.params.id);
  const listing = db.prepare('SELECT wishlist_count FROM listings WHERE id = ?').get(req.params.id);
  res.json({ wishlist_count: listing.wishlist_count });
});

// Serve index.html for all non-API routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Velier server running on port ${PORT}`);
});
