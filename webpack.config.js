
var webpack = require("webpack");
var path = require('path')

module.exports = {

  entry: {
    '/components/viewport': ['./SERVER/src/components/viewport.jsx'],
    '/components/centralWindow': ['./SERVER/src/components/central-window.jsx'],
    '/components/layout': ['./SERVER/src/components/layout.jsx'],
    '/components/app': ['./SERVER/src/components/app.jsx'],
    'index': './SERVER/src/index.jsx'
  },
  output: {
    path: './SERVER/CLIENT/js',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { 
        test: /\.js(x)?$/, 
        exclude: /node_modules/, 
        loader: "babel"
      }, { 
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./SERVER/CLIENT/src/style")]
  },
  resolve: {
    extensions: ['.jsx', '.js', '']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
  ]

};