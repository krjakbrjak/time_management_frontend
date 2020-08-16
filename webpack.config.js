const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
		contentBase: 'dist',
		port: 9000,
		inline: true,
		hot: true,
		proxy: {
			"/api": {
				logLevel: 'debug',
				target: 'http://localhost:8080',
				changeOrigin: true,
				onProxyReq: proxyReq => {
					// Browers may send Origin headers even with same-origin
					// requests. To prevent CORS issues, we have to change
					// the Origin to match the target URL.
					if (proxyReq.getHeader('origin')) {
						proxyReq.setHeader('origin', 'http://localhost:8080');
					}
				}
			}
		}
    },
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader", "eslint-loader"]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader?modules'],
			},
		]
	}
};
