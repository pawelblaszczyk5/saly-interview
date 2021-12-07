const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const isProdEnv = process.env.NODE_ENV !== 'development';

const config = {
	plugins: [
		tailwindcss(),
		autoprefixer(),
		isProdEnv &&
			cssnano({
				preset: 'default',
			}),
	],
};

module.exports = config;
