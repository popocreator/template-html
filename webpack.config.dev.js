const webpackConfig = require('./webpack.config.js');

module.exports = Object.assign(webpackConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},
	optimization: {
		runtimeChunk: 'single',
	},
});
