import '../styles/globals.css'
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Inter } from '@next/font/google';

import type { AppProps } from 'next/app';

// light theme colors is a theme colors: #F2F2F2 , #B0B0B0, #222222, #151515, #E75B4F
// dark theme colors is a theme colors: #151515, #515151, #D1D1D1,#EEEEEE, #FFFFFF, #D62617

const inter = Inter({ subsets: ['latin'] });

const typography = {
	fontFamily: 'Inter',
	h1: {
		fontSize: '48px',
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: '-0.05em',
	},
	h3: {
		fontSize: '16px',
		fontWeight: 400,
		lineHeight: 1.4,
		letterSpacing: '-0.0125em',
	},
	h4: {
		fontSize: '12px',
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: '-0.0125em',
	},
	h5: {
		fontSize: '12px',
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: '-0.0125em',
	}
}

const ligthTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#EEEEEE',
			100: '#F2F2F2',
			200: '#B0B0B0',
			300: '#383838',
			400: '#222222',
			500: '#151515',
			50: '#E75B4F',
		},
	},
	typography: {
		...typography
	}

});


// TODO: Redevelop theme object
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#222222',
			100: '#151515',
			200: '#515151',
			300: '#D1D1D1',
			400: '#EEEEEE',
			500: '#FFFFFF',
			50: '#D62617',
		}
	},
	typography: {

		...typography
	}
});


export default function KanbanBranchesPOC({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider >
	)
}
