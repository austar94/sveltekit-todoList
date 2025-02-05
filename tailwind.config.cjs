/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'fire' : '#E71515',
				'warning' : '#FF6C2E',
				'disconnection' : '#FEB821',
				'changing' : '#234B89',
			}
		}
	},

	plugins: [require('daisyui')],
};
