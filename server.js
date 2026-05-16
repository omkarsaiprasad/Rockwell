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
  res.json({ status: 'OK', message: 'Rockwell App is running' });
});

// API Routes
app.use('/api/shopify', shopifyRoutes);
app.use('/api/jokes', jokesRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Rockwell - Multi-Feature App',
    version: '1.0.0',
    status: 'running',
    features: {
      shopify: {
        description: 'Shopify e-commerce integration',
        endpoints: {
          shop: '/api/shopify/shop',
          products: '/api/shopify/products',
          orders: '/api/shopify/orders',
          customers: '/api/shopify/customers',
          docs: '/api/shopify/docs',
        },
      },
      jokes: {
        description: 'Random joke generator',
        endpoints: {
          random: '/api/jokes/random',
          programming: '/api/jokes/programming',
          knockKnock: '/api/jokes/knock-knock',
          general: '/api/jokes/general',
          category: '/api/jokes/category/:category',
          ten: '/api/jokes/ten',
          docs: '/api/jokes/docs',
        },
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
    availableEndpoints: {
      shopify: '/api/shopify/docs',
      jokes: '/api/jokes/docs',
    },
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
  console.log(`\n📚 Available Features:`);
  console.log(`   🛍️  Shopify Integration: http://localhost:${PORT}/api/shopify/docs`);
  console.log(`   😂 Joke Generator: http://localhost:${PORT}/api/jokes/docs`);
  console.log(`\n📖 Full API: http://localhost:${PORT}`);
});

module.exports = app;
