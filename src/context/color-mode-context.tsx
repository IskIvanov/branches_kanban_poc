import { createContext } from 'react';
import { ReactNode } from 'react';
import useTheme from '../hooks/use-theme';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });


type ColorModeProviderProps = {
	children: ReactNode;
};

export function ColorModeProvider({ children }: ColorModeProviderProps) {
	const { colorMode } = useTheme();
	return (
		<ColorModeContext.Provider value={colorMode}>
			{children}
		</ColorModeContext.Provider>
	);
}


