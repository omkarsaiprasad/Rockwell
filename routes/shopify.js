const express = require('express');
const axios = require('axios');
const router = express.Router();

// Initialize Shopify API client
const shopifyAPI = axios.create({
  baseURL: `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-01`,
  headers: {
    'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
});

// Middleware to verify Shopify access token
const verifyShopifyToken = (req, res, next) => {
  if (!process.env.SHOPIFY_ACCESS_TOKEN) {
    return res.status(401).json({
      success: false,
      error: 'Shopify access token not configured',
    });
  }
  next();
};

// Apply token verification to all routes
router.use(verifyShopifyToken);

// GET /api/shopify/shop - Get shop information
router.get('/shop', async (req, res, next) => {
  try {
    const response = await shopifyAPI.get('/graphql.json', {
      data: {
        query: `
          {
            shop {
              name
              url
              email
              plan {
                displayName
              }
              myshopifyDomain
              currencyCode
            }
          }
        `,
      },
    });

    res.json({
      success: true,
      data: response.data.data.shop,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/shopify/products - List all products
router.get('/products', async (req, res, next) => {
  try {
    const limit = req.query.limit || 50;
    const response = await shopifyAPI.get(`/rest/products.json?limit=${limit}`);

    res.json({
      success: true,
      count: response.data.products.length,
      data: response.data.products,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/shopify/products/:id - Get product by ID
router.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await shopifyAPI.get(`/rest/products/${id}.json`);

    res.json({
      success: true,
      data: response.data.product,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/shopify/products - Create a new product
router.post('/products', async (req, res, next) => {
  try {
    const { title, description, price, vendor, tags } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Product title is required',
      });
    }

    const productData = {
      product: {
        title,
        body_html: description || '',
        vendor: vendor || 'Default Vendor',
        tags: tags || '',
        variants: [
          {
            price: price || 0,
          },
        ],
      },
    };

    const response = await shopifyAPI.post('/rest/products.json', productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: response.data.product,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/shopify/orders - List all orders
router.get('/orders', async (req, res, next) => {
  try {
    const limit = req.query.limit || 50;
    const status = req.query.status || 'any';
    const response = await shopifyAPI.get(
      `/rest/orders.json?limit=${limit}&status=${status}`
    );

    res.json({
      success: true,
      count: response.data.orders.length,
      data: response.data.orders,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/shopify/customers - List all customers
router.get('/customers', async (req, res, next) => {
  try {
    const limit = req.query.limit || 50;
    const response = await shopifyAPI.get(`/rest/customers.json?limit=${limit}`);

    res.json({
      success: true,
      count: response.data.customers.length,
      data: response.data.customers,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/shopify/webhook - Handle webhooks from Shopify
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const hmac = req.headers['x-shopify-hmac-sha256'];
    const body = req.body;

    // Verify webhook signature
    const crypto = require('crypto');
    const message = body;
    const computed = crypto
      .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
      .update(message, 'utf8')
      .digest('base64');

    if (computed === hmac) {
      const webhookData = JSON.parse(body);
      console.log('Webhook received:', webhookData);

      res.status(200).json({
        success: true,
        message: 'Webhook processed',
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Webhook signature verification failed',
      });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/shopify/docs - API documentation
router.get('/docs', (req, res) => {
  res.json({
    name: 'Rockwell Shopify API',
    version: '1.0.0',
    endpoints: {
      shop: {
        method: 'GET',
        path: '/api/shopify/shop',
        description: 'Get shop information',
      },
      products: {
        list: {
          method: 'GET',
          path: '/api/shopify/products?limit=50',
          description: 'List all products',
        },
        get: {
          method: 'GET',
          path: '/api/shopify/products/:id',
          description: 'Get product by ID',
        },
        create: {
          method: 'POST',
          path: '/api/shopify/products',
          description: 'Create a new product',
          body: {
            title: 'string (required)',
            description: 'string',
            price: 'number',
            vendor: 'string',
          },
        },
      },
      orders: {
        method: 'GET',
        path: '/api/shopify/orders?limit=50&status=any',
        description: 'List all orders',
      },
      customers: {
        method: 'GET',
        path: '/api/shopify/customers?limit=50',
        description: 'List all customers',
      },
      webhook: {
        method: 'POST',
        path: '/api/shopify/webhook',
        description: 'Receive webhooks from Shopify',
      },
    },
  });
});

module.exports = router;
