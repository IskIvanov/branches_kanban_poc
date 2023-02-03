import { PaletteMode, createTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { lightPallety, darkPalette, typography } from '../types/constants';

export default function useTheme() {
	const [mode, setMode] = useState<PaletteMode>('light');

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

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return { mode, colorMode, theme };
}	