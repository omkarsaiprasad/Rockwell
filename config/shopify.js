module.exports = {
  shopify: {
    apiVersion: '2024-01',
    scopes: [
      'write_products',
      'read_products',
      'write_orders',
      'read_orders',
      'write_customers',
      'read_customers',
      'read_webhooks',
      'write_webhooks',
    ],
  },
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
};
