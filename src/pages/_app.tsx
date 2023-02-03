import 'typeface-inter';
import '../styles/global.css';
import { useMemo, useState } from 'react';
import { createContext } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { GithubDataProvider } from '../context/github-context';

//TODO: Fix TailwindCSS import. 
// light theme colors is a theme colors: #F2F2F2 , #B0B0B0, #222222, #151515, #E75B4F
// dark theme colors is a theme colors: #151515, #515151, #D1D1D1,#EEEEEE, #FFFFFF, #D62617

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

type ThemeColors = {
	type: PaletteMode;
	background: {
		default: string;
	},
	primary: {
		main: string;
	},
	secondary: {
		main: string;
	},
	text: {
		primary: string;
		secondary: string;
		error: string;
	}
}

type Typography = {
	fontFamily: string;
	h1: {
		fontSize: string;
		fontWeight: number;
		lineHeight: number;
		letterSpacing: string;
	},
	h3: {
		fontSize: string;
		fontWeight: number;
		lineHeight: number;
		letterSpacing: string;
	},
	h4: {
		fontSize: string;
		fontWeight: number;
		lineHeight: number;
		letterSpacing: string;
	},
	h5: {
		fontSize: string;
		fontWeight: number;
		lineHeight: number;
		letterSpacing: string;
	}
}

const typography: Typography = {
	fontFamily: 'Inter, sans-serif',
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

const darkPalette: ThemeColors = {
	type: "dark",
	background: {
		default: "#151515",
	},
	primary: {
		main: "#222222"
	},
	secondary: {
		main: "#383838"
	},
	text: {
		primary: "#F2F2F2",
		secondary: "#B0B0B0",
		error: "#E75B4F"
	}
}

const lightPallety: ThemeColors = {
	type: "dark",
	background: {
		default: "#FFFFFF",
	},
	primary: {
		main: "#EEEEEE"
	},
	secondary: {
		main: "#D1D1D1"
	},
	text: {
		primary: "#151515",
		secondary: "#515151",
		error: "#D62617"
	}
}



export default function KanbanBranchesPOC({ Component, pageProps }: AppProps) {
	// TODO: Extract logic to a custom separate provider component
	const [mode, setMode] = useState<PaletteMode>('light');

	const colorMode = useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode((prevMode: PaletteMode) =>
					prevMode === 'light' ? 'dark' : 'light',
				);
			},
		}),
		[],
	);

	const getDesignTokens = (mode: PaletteMode) => {
		console.log(mode);
		return {
			palette: { mode, ...(mode === 'light' ? lightPallety : darkPalette) },
			typography: typography
		}
	}

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<GithubDataProvider>
					<CssBaseline />
					<Component {...pageProps} />
				</GithubDataProvider>
			</ThemeProvider >
		</ColorModeContext.Provider>
	)
}
