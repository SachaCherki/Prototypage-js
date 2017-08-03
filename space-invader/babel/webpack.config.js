var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry : './js/game.js',
	output : {
		path : path.resolve(__dirname, 'build'),
		filename : 'game.build.js'
	},
	module : {
		loaders : [
			{
				test : /\.js$/,
				loader : 'babel-loader',
				query : {
					presets : ['env']
				}
			}
		]
	}
};