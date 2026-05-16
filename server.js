require('dotenv').config();
const express = require('express');
const cors = require('cors');
const shopifyRoutes = require('./routes/shopify');
const jokesRoutes = require('./routes/jokes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Rockwell Shopify App is running' });
});

// API Routes
app.use('/api/shopify', shopifyRoutes);
app.use('/api/jokes', jokesRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Rockwell - Shopify App + Joke Generator',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      shopify: {
        shop: '/api/shopify/shop',
        products: '/api/shopify/products',
        orders: '/api/shopify/orders',
        customers: '/api/shopify/customers',
      },
      jokes: {
        random: '/api/jokes/random',
        programming: '/api/jokes/programming',
        knockKnock: '/api/jokes/knock-knock',
        general: '/api/jokes/general',
        ten: '/api/jokes/ten',
      },
      docs: {
        shopify: '/api/shopify/docs',
        jokes: '/api/jokes/docs',
      },
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString(),
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Rockwell App running on http://localhost:${PORT}`);
  console.log(`📊 Shopify endpoint: http://localhost:${PORT}/api/shopify/shop`);
  console.log(`😂 Jokes endpoint: http://localhost:${PORT}/api/jokes/random`);
});

module.exports = app;
