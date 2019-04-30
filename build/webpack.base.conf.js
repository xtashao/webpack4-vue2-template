'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [utils.resolve('src'), utils.resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const PUBLIC_PATH = process.env.NODE_ENV === 'production'
  ? config.build.assetsPublicPath
  : config.dev.assetsPublicPath

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: PUBLIC_PATH
  },
  resolve: {
    extensions: ['*', '.css', '.js', '.vue', '.json'],
    alias: {
      '@': utils.resolve('src'),
      '@components': utils.resolve('src/components'),
      '@styles': utils.resolve('src/styles'),
      '@assets': utils.resolve('src/assets'),
      '@vuex': utils.resolve('src/store')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          utils.resolve('src'),
          utils.resolve('test'),
          utils.resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [utils.resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [utils.resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: utils.resolve('src/static/images'),
      to: utils.resolve('dist/static/images'),
      toType: 'dir'
    }, {
      from: utils.resolve('src/static/fonts'),
      to: utils.resolve('dist/static/fonts'),
      toType: 'dir'
    }])
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
