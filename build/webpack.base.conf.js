'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      'views': path.join(__dirname, '../src/views'),
      'layouts': path.join(__dirname, '../src/views/layouts'),
      'components': path.join(__dirname, '../src/views/components'),
      'modals': path.join(__dirname, '../src/views/modals'),
      'css': path.join(__dirname, '../static/css'),
      'img': path.join(__dirname, '../static/img'),
      'api': path.join(__dirname, '../src/api'),
      'router': path.join(__dirname, '../src/router'),
      'store': path.join(__dirname, '../src/store'),
      'utils': path.join(__dirname, '../src/utils'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: [
          path.resolve(__dirname, '../static')
        ],
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules'),
        ],
        loader: 'vue-loader',
        options: vueLoaderConfig
      }, {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/,
        include: [path.resolve(__dirname, '../src')],
        loader: 'babel-loader?cacheDirectory'
      }, {
        test: /\.json$/,
        exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/,
        loader: 'json-loader'
      }, {
        test: /\.html$/,
        exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/,
        loader: 'vue-html-loader'
      }, {
        test: /\.s[a|c]ss$/,
        exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/,
        loader: 'style!css!sass'
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/,
        loader: 'url-loader',
        query: {
          limit: 5000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')	// fonts/[name].[hash:7].[ext]
        }
      }],
    noParse: /node_modules\/(jquey|moment|chart|iconfont\.js)/
  }
}
