const { ProvidePlugin } = require('webpack');
const { resolve } = require('path');
const { src } = require('../config/directories');
const { script_name } = require('../config/names');

module.exports = {
  mode: 'none',
  output:{ filename : script_name },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Plugin: ['@/core', 'default']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(`${src}/js/_init/`)
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
          ],
          cacheDirectory: true
        }
      }
    ]
  }
};