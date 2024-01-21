const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = {
	mode: 'production',
	entry: {
		script: ['./src/js/index.js', './src/scss/index.scss'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Output Management',
		}),
		new MiniCssExtractPlugin({filename: 'style.css'}),
	],
	optimization: {
		minimizer: [new TerserPlugin({extractComments: false})],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(csv|tsv)$/i,
				use: ['csv-loader'],
			},
			{
				test: /\.xml$/i,
				use: ['xml-loader'],
			},
			{
				test: /\.toml$/i,
				type: 'json',
				parser: {
					parse: toml.parse,
				},
			},
			{
				test: /\.yaml$/i,
				type: 'json',
				parser: {
					parse: yaml.parse,
				},
			},
			{
				test: /\.json5$/i,
				type: 'json',
				parser: {
					parse: json5.parse,
				},
			},
		],
	},
};
