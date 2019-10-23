const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: './client.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-transform-runtime"],
          }
        }
      }
    ],
  },
  devtool: 'inline-source-map',

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: './index.html'})
  ],
/*devServer: {
  contentBase: path.join(__dirname, 'dist'),
  compress: false,
  port: 9000
}*/
}
