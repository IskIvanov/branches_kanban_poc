import { PaletteMode, createTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { lightPallety, darkPalette, typography } from '../types/constants';

// The useTheme hook is used to create a theme and toggle between light and dark mode
export default function useTheme() {
	const [mode, setMode] = useState<PaletteMode>('dark');
	// use memo is used to prevent the toggleColorMode function from being recreated on every render
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode: PaletteMode) =>
					prevMode === 'light' ? 'dark' : 'light',
				);
			},
		}),
		[],
	);

	const getDesignTokens = (mode: PaletteMode) => {
		return {
			palette: { mode, ...(mode === 'light' ? lightPallety : darkPalette) },
			typography: typography
		}
	}
	// use memo is used to prevent the theme from being recreated on every render
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return { mode, colorMode, theme };
}	