const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/node',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
  app.use(
    '/python',
    createProxyMiddleware({
      target: 'http://localhost:8001',
      changeOrigin: true,
    })
  );
  app.use(
    '/material',
    createProxyMiddleware({
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
    })
  );
  app.use(
    '/country',
    createProxyMiddleware({
        target: 'http://127.0.0.1:8001/country/png',
        changeOrigin: true,
    })
  );
  app.use(
    '/media',
    createProxyMiddleware({
        target: 'http://127.0.0.1:8001/media',
        changeOrigin: true,
    })
  );
  app.use(
    '/friday',
    createProxyMiddleware({
      target: 'http://127.0.0.1:1950',
      changeOrigin: true,
    })
  );
};