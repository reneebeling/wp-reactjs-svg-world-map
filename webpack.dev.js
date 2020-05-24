const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 80
  },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dist/index.html'
    })]
});