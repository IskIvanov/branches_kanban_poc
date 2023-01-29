import { createContext } from 'react';
import { ReactNode } from 'react';

export const GithubDataContext = createContext<GithubProviderProps | null>(null);

type GithubProviderProps = {
	children: ReactNode;
};

export function GithubDataProvider({ children }: GithubProviderProps) {
	return (
		<GithubDataContext.Provider value={null}>
			{children}
		</GithubDataContext.Provider>
	);
}


