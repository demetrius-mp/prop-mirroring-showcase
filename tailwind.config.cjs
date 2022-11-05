const daisyui = require('daisyui');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	darkMode: ['class', '[data-theme="dark"]'],

	theme: {
		extend: {}
	},

	plugins: [daisyui]
};

module.exports = config;
