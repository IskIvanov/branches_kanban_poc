import { createContext, useState } from 'react';
import { ReactNode } from 'react';

export const GithubDataContext = createContext({
	branches: [],
	setBranches: (branches: any) => { },
	stars: 0,
	setStars: (stars: number) => { }
});


type GithubProviderProps = {
	children: ReactNode;
};

export function GithubDataProvider({ children }: GithubProviderProps) {
	const [branches, setBranches] = useState([]);
	const [stars, setStars] = useState(0);

	return (
		<GithubDataContext.Provider value={{ branches, stars, setBranches, setStars }}>
			{children}
		</GithubDataContext.Provider>
	);
}


