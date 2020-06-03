// var webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
//const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
	entry: "./dev-react-svg-world-map.js",
	output: {
        path: path.resolve(__dirname, 'dist'),
		filename: "react-svg-world-map.js",
        publicPath: "/wp-content/plugins/wp_LJ_CreatePagesByCategories/assets/js/"
	},
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
	module: {
		rules: [{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			}, {
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			}, {
				exclude: [/node_modules/, /\.s[ac]ss$/i],
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/react', {
							'plugins': ['@babel/plugin-proposal-class-properties']
						}
					]
				}
			}
		]
	}
};
