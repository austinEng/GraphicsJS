
var webpack = require("webpack");
var path = require('path')

module.exports = {

  entry: {
    '/components/viewport': ['./src/components/viewport.jsx'],
    '/components/centralWindow': ['./src/components/central-window.jsx'],
    '/components/layout': ['./src/components/layout.jsx'],
    '/components/app': ['./src/components/app.jsx'],
    'index': './src/index.jsx',
  },
  output: {
    path: './CLIENT/js',
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
    includePaths: [path.resolve(__dirname, "./src/style")]
  },
  resolve: {
    extensions: ['.jsx', '.js', '']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
  ]

};