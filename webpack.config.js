const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src'),
  tests: path.join(__dirname, 'tests'),
  css: path.join(__dirname, 'static', 'css'),
  build: path.join(__dirname, 'static', 'js'),
  fonts: path.join(__dirname, 'static', 'fonts'),
};

// value must be the same as defined in app.py
const ROOT_URL = '/banner-tool';


module.exports = {
  entry: path.join(PATHS.src, 'index.jsx'),
  output: {
    path: PATHS.build,
    filename: 'index.js',
    publicPath: '/static/js/',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: PATHS.src,
        exclude: /(node_modules|bower_components)/,
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [PATHS.src],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        include: [PATHS.css],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test   : /\.(ttf|eot|svg|woff2?|otf)(\?[a-z0-9=&.]+)?$/,
        loader : 'url-loader?limit=100000',
        include: [PATHS.fonts],
      }
    ],
  },

  devServer: {
    historyApiFallback: true,
    proxy: [
      {
        path: '/api/*',
        target: 'http://localhost:5000' + ROOT_URL,
      },
      {
        path: '/download',
        target: 'http://localhost:5000' + ROOT_URL,
      },
    ],
  },
};
