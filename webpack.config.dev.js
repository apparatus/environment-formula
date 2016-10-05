var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new webpack.HotModuleReplacementPlugin()
];

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }, {
      test: /\.scss$/,
      loader: 'style!css!postcss-loader!sass?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }, {
      test: /\.jpg$/,
      loader: 'file-loader'
    }, {
      test: /\.png$/,
      loader: 'file-loader?name=images/[name].[ext]'
    }]
  },

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'source-map',

  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080
  },

  plugins: plugins
};
