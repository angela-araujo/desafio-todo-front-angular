const PROXY_CONFIG = [
  {
    context: ['/apitodo'],
    target: 'http://localhost:3000/api/v1',
    secure: false,
    // pathRewrite: { '^/api': '' }
  }
];
module.exports = PROXY_CONFIG;