/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const { nextui } = require("@nextui-org/react");

export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontFamily:{
				primary: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
				secondary: ["Josefin Sans Variable", "Josefin", ...defaultTheme.fontFamily.sans]
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		nextui()
	],
	darkMode: 'class',
}
