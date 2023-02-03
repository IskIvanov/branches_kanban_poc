import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { GithubDataContext } from '../context/github-context';
import { getBranches, getStars } from '../services/github-api';

export default function useUrlComponentLogic() {
	const router = useRouter();

	const [url, setUrl] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const { setBranches, setStars } = useContext(GithubDataContext);

	// Add a callback to handleClick the set loading state to true.
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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const url = event.target.value;
		setUrl(url);
	}

	return { url, loading, error, handleClick, handleChange };
}