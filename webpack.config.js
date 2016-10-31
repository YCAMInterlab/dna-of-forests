var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './source/script/main.js'
  },

  resolve: {
    root: __dirname + '/source/script',
    // extensions: ['','.js','.jsx'],

    // HTMLファイル内でVueの記法でを可能にする
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },

  output: {
    path: __dirname + '/.tmp/dist',
    filename: 'script/[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules|\.tmp|vendor/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ],
  },

  node: {
    console: true,
  },

  plugins: [
    new Clean(['.tmp']),
    // Declare Global variables
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery',
    //   Cookies: 'js-cookie',
    // }),
  ],
};
