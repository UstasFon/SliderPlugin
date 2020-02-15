var path = require('path');
var webpack = require('webpack');

module.exports = {
  devServer: {
    open: true,
    inline: true,
    contentBase: './dist',
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
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(jpeg|gif|ttf|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', { loader: 'sass-loader', options: {} }]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        },
      },
      {
        test: /\.(jpg)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "js/bundle.js",
    publicPath: '/'
  },
};
