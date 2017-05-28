const webpack = require('webpack');

module.exports = {
  entry: './src/glorious-cookie.js',
  output: {
    library: 'gcookie',
    libraryTarget: 'umd',
    filename: 'gcookie.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
