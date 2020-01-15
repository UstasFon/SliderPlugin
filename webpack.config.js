var path = require('path');
var webpack = require('webpack');

module.exports = {
  devServer: {
    inline: true,
    contentBase: 'src',
    port: 9000,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader','scss-loader']
      }
    ]
  },
  output: {
    path: path.join(__dirname, "/public"),
    filename: "public/index.js"
  }
};
