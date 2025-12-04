# MiniShop - Static E-commerce Storefront

A fast, static e-commerce storefront built with Next.js that showcases products, allows adding items to a cart, and forwards orders to WhatsApp for payment and delivery arrangement.

## Features

- Static site generation (SSG) for fast loading
- Product listing and detail pages
- Shopping cart with localStorage persistence
- WhatsApp checkout integration
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set the WhatsApp number environment variable:
   Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_WHATSAPP_NUMBER=2348012345678
   ```
   Replace with your actual WhatsApp number in E.164 format.
   
   For local testing without a real number, you can use any 12-digit number, 
   and the app will show you the message that would be sent in an alert dialog.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to a GitHub repository
2. Log in to [Vercel](https://vercel.com)
3. Create a new project and import your GitHub repository
4. In the project settings, add the environment variable:
   - Key: `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - Value: Your WhatsApp number in E.164 format (e.g., 2348012345678)
5. Deploy the project

### Manual Build

To build the project for production:

```
npm run build
```

To start the production server:

```
npm start
```

## File Structure

```
.
├── data/
│   └── products.json          # Product catalog
├── public/
│   └── products/              # Product images
├── pages/
│   ├── index.js               # Product listing
│   ├── cart.js                # Cart page
│   └── products/
│       └── [slug].js          # Product detail pages
├── components/
│   ├── Layout.js              # Site layout
│   ├── ProductCard.js         # Product card component
│   ├── ProductGrid.js         # Product grid component
│   └── CartProvider.js        # Cart context provider
├── styles/
│   └── globals.css            # Global styles
└── README.md
```

## QA Checklist

### 1. Project Bootstrap
- [x] Next.js app created with npm
- [x] Package.json has build, dev, and start scripts
- [x] `npm run dev` starts dev server

### 2. Product Catalog
- [x] `data/products.json` created with sample products
- [x] Product images placed in `/public/products/` or using remote URLs

### 3. Layout & Global Styles
- [x] Layout component created with header/footer
- [x] Header includes logo/title and cart icon linking to /cart
- [x] CSS loaded globally

### 4. Product Listing Page
- [x] Uses `getStaticProps` to read `data/products.json`
- [x] Renders ProductGrid and ProductCard
- [x] Shows image, title, price, description, and links to product pages

### 5. Product Detail Pages
- [x] Uses `getStaticPaths` to generate pages for each product slug
- [x] Shows image gallery, description, price, quantity selector
- [x] Has "Add to Cart" CTA button
- [x] Includes meta tags for SEO

### 6. Cart Implementation
- [x] CartProvider (React context) implemented
- [x] Methods: addItem, removeItem, updateQty, clearCart, getTotal
- [x] Cart persisted in localStorage
- [x] `_app.js` wrapped with CartProvider
- [x] Cart page shows items, subtotal, total, and checkout button

### 7. Add to Cart Flow
- [x] Add to Cart adds product & qty to cart context
- [x] Small notification shown when item added
- [x] Cart icon in header shows item count

### 8. Checkout to WhatsApp
- [x] Checkout button composes WhatsApp message with cart summary
- [x] Message includes product names, qty, subtotals, and overall total
- [x] Opens `https://wa.me/${NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`

### 9. Accessibility & Responsiveness
- [x] Components are responsive (mobile-first)
- [x] Buttons have accessible labels
- [x] Images have alt text

### 10. Export / Build for Vercel
- [x] Next.js config allows image domains for remote images
- [x] README with deployment steps
- [x] `npm run build` succeeds and `npm start` serves site locally