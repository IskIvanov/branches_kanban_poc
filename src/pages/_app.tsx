import 'typeface-inter';
import '../styles/global.css';
import useTheme from '../hooks/use-theme';
import { createContext } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { GithubDataProvider } from '../context/github-context';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });



export default function KanbanBranchesPOC({ Component, pageProps }: AppProps) {
	const { theme, colorMode } = useTheme();

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
