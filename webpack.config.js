const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src'),
  tests: path.join(__dirname, 'tests'),
  build: path.join(__dirname, 'static', 'js')
}

module.exports = {
  entry: path.join(PATHS.src, 'index.jsx'),
  output: {path: PATHS.build, filename: 'index.js'},
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
        include: [PATHS.src],
        exclude: /(node_modules|bower_components)/
      }
    ],
  },
}