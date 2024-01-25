const path = require('path');
const { routers } = require('./atlat/routers'); 
const { ProvidePlugin } = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
  src,
  srcScript,
  srcStyle,
  buildPath,
  publicPath,
  buildScript,  
  buildStyle
} = require('./atlat/options');

module.exports = (env, argv) => {
  return {
    mode: 'none',
    entry: [
      'babel-polyfill',
      srcScript,
      srcStyle,
    ],
    output: {
      path: path.join(__dirname, buildPath),
      filename: buildScript,
      clean: true,
    },
    watch: true,
    devtool: argv.mode === 'development' ? 'eval' : false,
    module: {
      rules: [
        {
          test: /\.pug/,
          loader: 'pug-loader',
          options: {
            pretty: true,
          }
        },
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
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          type: 'asset/resource',
          generator: {
            filename: 'css/style.min.css'
          },
          use: [ 'sass-loader', 'sass-bulk-import-loader' ],
        },
      ]
    },
    devServer: {
      port: 3000,
      static: publicPath,
      open: true,
      watchFiles: src,
      client: {
        progress: true,
      },
    },
    plugins: [
      ...routers,

      new MiniCssExtractPlugin({
        filename: buildStyle
      }),

      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Plugin: ['../_init/core', 'default']
      }),

      new CopyWebpackPlugin({
        patterns: [
          { from: publicPath }
        ]
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
        }
      })],
    },
    performance: {
      hints: false,
      maxAssetSize: 100000,
      maxEntrypointSize: 50000,
    }
  };
}