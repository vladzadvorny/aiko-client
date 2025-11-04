/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

const common = require('./webpack.common')

module.exports = merge(common, {
  entry: './src/client.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html'
    })
  ],
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true
  }
})
