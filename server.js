require('dotenv').config();
const express = require('express');
const cors = require('cors');
const shopifyRoutes = require('./routes/shopify');

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

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Rockwell - Shopify App',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      shop: '/api/shopify/shop',
      products: '/api/shopify/products',
      orders: '/api/shopify/orders',
      customers: '/api/shopify/customers',
    },
    docs: '/api/shopify/docs',
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
  console.log(`🚀 Rockwell Shopify App running on http://localhost:${PORT}`);
  console.log(`📊 Shop endpoint: http://localhost:${PORT}/api/shopify/shop`);
  console.log(`📦 Products endpoint: http://localhost:${PORT}/api/shopify/products`);
});

module.exports = app;
