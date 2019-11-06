const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  entry: './src/index',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          /*
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              "plugins": ["@babel/plugin-transform-react-constant-elements",
                "@babel/plugin-transform-react-display-name",
                "@babel/plugin-transform-react-inline-elements",
                "@babel/plugin-transform-react-jsx",
                "@babel/plugin-transform-react-jsx-compat",
                "@babel/plugin-transform-react-jsx-self",
                "@babel/plugin-transform-react-jsx-source"
              ]
            }
          },*/
          {
            loader: 'awesome-typescript-loader',
            options: {
              plugins: [['babel-plugin-styled-components']],
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-react-constant-elements',
              '@babel/plugin-transform-react-display-name',
              '@babel/plugin-transform-react-inline-elements',
              '@babel/plugin-transform-react-jsx',
              '@babel/plugin-transform-react-jsx-compat',
              '@babel/plugin-transform-react-jsx-self',
              '@babel/plugin-transform-react-jsx-source',
            ],
          },
        },
      },
    ],
  },
  devtool: 'inline-source-map',

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
  },
};
