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
		nextui({
			themes: {
			  light: {
				colors: {
				  background: "#FBFBFB",
				  foreground: "#1B1B1E",
				  container: "#E4E4E7",
				  primary: {
					50: '#ffeedd',
					100: '#ffd2b1',
					200: '#fcb483',
					300: '#f99753',
					400: '#f67a23',
					500: '#dc6009',
					600: '#ac4b05',
					700: '#7b3502',
					800: '#4b1f00',
					900: '#1e0800',
					DEFAULT: "#F56E0F"
				  },
				  secondary: {
					50: '#e0f8ff',
					100: '#bee6f2',
					200: '#99d4e5',
					300: '#73c3d9',
					400: '#4fb3cd',
					500: '#3699b3',
					600: '#26778c',
					700: '#175565',
					800: '#04343e',
					900: '#001319',
					DEFAULT: '#247084'
				  }
				},
			  },
			  dark: {
				colors: {
				  background: "#151419",
				  foreground: "#D4D4D6",
				  container: "#18181b",
				  primary: {
					50: '#ffeedd',
					100: '#ffd2b1',
					200: '#fcb483',
					300: '#f99753',
					400: '#f67a23',
					500: '#dc6009',
					600: '#ac4b05',
					700: '#7b3502',
					800: '#4b1f00',
					900: '#1e0800',
					DEFAULT: "#F56E0F"
				  },
				  secondary: {
					50: '#e0f8ff',
					100: '#bee6f2',
					200: '#99d4e5',
					300: '#73c3d9',
					400: '#4fb3cd',
					500: '#3699b3',
					600: '#26778c',
					700: '#175565',
					800: '#04343e',
					900: '#001319',
					DEFAULT: '#247084'
				  }
				},
			  }
			}
		  }
		)
	],
	darkMode: 'class',
}
