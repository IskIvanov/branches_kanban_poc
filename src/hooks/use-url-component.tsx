import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { GithubDataContext } from '../context/github-context';
import { getBranches, getStars } from '../services/github-api';

// Custom hook to handle the logic for the url component 
export default function useUrlComponentLogic() {
	const router = useRouter();

	const [url, setUrl] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const { setBranches, setStars } = useContext(GithubDataContext);

	// Function to handle the click event on the button
	const handleClick = async () => {
		if (!url) return;
		else {
			setLoading(true);
			setError(false);
			const owner = url.split('/')[3];
			const repo = url.split('/')[4];
			const branchesData = await getBranches(owner, repo);
			const starsData = await getStars(owner, repo);
			if (branchesData && starsData) {
				await setBranches(branchesData.data);
				await setStars(starsData);
			}
			if (branchesData && starsData) {
				router.push('/sandpack');
			} else {
				setError(true);
			}
			setLoading(false);
		}
	}
	// Function to handle the change event on the input, set the url state with the value of the input
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const url = event.target.value;
		setUrl(url);
	}

	return { url, loading, error, handleClick, handleChange };
}