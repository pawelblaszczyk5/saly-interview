const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssNested = require('postcss-nested');

const isProdEnv = process.env.NODE_ENV !== 'development';

const config = {
	plugins: [
		postcssNested(),
		autoprefixer(),
		isProdEnv &&
			cssnano({
				preset: 'default',
			}),
	],
};

module.exports = config;
