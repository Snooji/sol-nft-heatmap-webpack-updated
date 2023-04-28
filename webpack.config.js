const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  mode: 'development', // Add this line to set the mode to 'development'
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: './dist',
    },
    open: true,
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.use(
        '/api',
        createProxyMiddleware({
          target: 'https://rest-api.hellomoon.io',
          changeOrigin: true,
          pathRewrite: { '^/api': '/v0' },
        })
      );
    },
  },
};
