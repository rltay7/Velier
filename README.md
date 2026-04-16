# Velier — Access everything. Own nothing.

Luxury peer-to-peer rental platform built with Express.js, SQLite, and React (via CDN).

## Stack

- **Backend**: Express.js + better-sqlite3
- **Frontend**: React 18 via CDN (no build step)
- **Database**: SQLite (auto-seeded with 12 luxury items on first start)

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Railway

1. Push to GitHub
2. Connect repo on [railway.app](https://railway.app)
3. Railway auto-detects Node.js and runs `npm start`
4. No build step required — React is loaded via CDN

## Pages

- `/` — Homepage with hero, featured listings, categories, brands
- `#/browse` — Browse with filters, sort, and category tabs
- `#/listing/:id` — Listing detail with gallery, pricing calculator
- `#/booking/:id` — Booking flow with confirmation
- `#/list` — 4-step wizard to list an item

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | Server port |

## Database

SQLite database (`velier.db`) is auto-created and seeded on first run with 12 luxury listings:
Prada, Gucci, Chanel, Bottega Veneta, Valentino, Rolex, Audemars Piguet, Cartier, Hermès, Saint Laurent, Louboutin, Alexander McQueen
