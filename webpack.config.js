var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    main:   './source/dna-of-forests/script/main.js'
  },

  resolve: {
    // HTMLファイル内でVueの記法を可能にする
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },

  output: {
    path: __dirname + '/.tmp/dist',
    filename: './dna-of-forests/script/[name].js',
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules|vendor/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        exclude: /node_modules|vendor/,
        use: 'json-loader',
        type: 'javascript/auto'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.pug$/,
        use: 'pug-plain-loader'
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true
              }
            }
          }
        ]
      }
    ]
  },

  node: {
    console: true,
  },

  plugins: [
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: '.tmp/*'}),
    new VueLoaderPlugin()
    // Declare Global variables
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery',
    //   Cookies: 'js-cookie',
    // }),
  ],
};
