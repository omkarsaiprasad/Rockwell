# Rockwell - Shopify App Integration

A complete Shopify app integration built with Node.js, Express, and the Shopify API. Manage products, orders, and customers with ease.

## Features

- ✅ Shopify OAuth authentication
- ✅ Product management (create, read, update)
- ✅ Order management
- ✅ Customer management
- ✅ Webhook support
- ✅ Session management
- ✅ RESTful API endpoints

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- A Shopify Partner account
- A development store in Shopify

## Getting Started

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Create a Shopify App

1. Go to [Shopify Partner Dashboard](https://partners.shopify.com)
2. Create a new app with the following settings:
   - **App name**: Rockwell
   - **Admin API scopes**:
     - `write_products`
     - `read_products`
     - `write_orders`
     - `read_orders`
     - `write_customers`
     - `read_customers`

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your Shopify credentials:

```
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SHOPIFY_APP_URL=http://localhost:3000
SESSION_SECRET=your_session_secret_here
```

### 4. Run the App

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The app will be available at `http://localhost:3000`

## API Endpoints

### Shop Information
- `GET /api/shopify/shop` - Get shop details

### Products
- `GET /api/shopify/products` - List all products
- `GET /api/shopify/products/:id` - Get product by ID
- `POST /api/shopify/products` - Create a new product

**Create Product Example:**
```bash
curl -X POST http://localhost:3000/api/shopify/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Product",
    "description": "Product description",
    "price": 29.99
  }'
```

### Orders
- `GET /api/shopify/orders` - List all orders
- `GET /api/shopify/orders?status=any` - Filter by status
- `GET /api/shopify/orders?limit=20` - Pagination

### Customers
- `GET /api/shopify/customers` - List all customers
- `GET /api/shopify/customers?limit=20` - Pagination

### Webhooks
- `POST /api/shopify/webhook` - Webhook receiver

## Project Structure

```
rockwell-shopify-app/
├── server.js                 # Main Express server
├── routes/
│   └── shopify.js           # Shopify API routes
├── middleware/              # Custom middleware (optional)
├── config/                  # Configuration files
├── tests/                   # Test files
├── package.json
├── .env.example
├── README.md
└── .gitignore
```

## Authentication Flow

1. User clicks "Install App" in Shopify Admin
2. Redirected to OAuth authorization
3. User grants permissions
4. App receives access token and creates session
5. App can now make API calls on behalf of the store

## Webhook Setup

To receive webhooks:

1. Go to your Shopify App settings
2. Add webhook subscriptions in Admin API section
3. Set endpoint: `https://your-domain.com/api/shopify/webhook`
4. Select events: `products/create`, `orders/create`, `customers/create`, etc.

## Error Handling

The app includes centralized error handling:

```javascript
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});
```

## Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ HMAC verification for webhooks
- ✅ Session-based authentication
- ✅ CORS protection
- ✅ Request validation

## Deployment

### Deploy to Heroku

```bash
heroku create rockwell-app
heroku config:set SHOPIFY_API_KEY=your_key
heroku config:set SHOPIFY_API_SECRET=your_secret
heroku config:set SHOPIFY_APP_URL=https://rockwell-app.herokuapp.com
git push heroku main
```

### Deploy to Vercel

Add `vercel.json`:
```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

## Testing

Run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

- [Shopify API Documentation](https://shopify.dev/api)
- [Shopify App Framework](https://shopify.dev/apps/getting-started)
- [Shopify GraphQL API](https://shopify.dev/api/graphql-admin)
- [Express.js Documentation](https://expressjs.com)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- 📧 Create an issue in the repository
- 💬 Check existing documentation
- 🔗 Visit Shopify Developer Community

---

**Made with ❤️ by omkarsaiprasad**
