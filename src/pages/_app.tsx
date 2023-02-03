import 'typeface-inter';
import useTheme from '../hooks/use-theme';
import { createContext } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { GithubDataProvider } from '../context/github-context';
import { ColorModeProvider } from '../context/color-mode-context';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });


export default function KanbanBranchesPOC({ Component, pageProps }: AppProps) {
	const { theme } = useTheme();

	return (
		<ColorModeProvider>
			<ThemeProvider theme={theme}>
				<GithubDataProvider>
					<CssBaseline />
					<Component {...pageProps} />
				</GithubDataProvider>
			</ThemeProvider >
		</ColorModeProvider>
	)
}
