import Image from 'next/image'
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { getBranches, getStars } from '../services/github-api';
import { GithubDataContext } from '../context/github-context';


// TODO: Add logic for submit and Loading state
// TODO: Logic for url parsing should live here.
// TODO: Develop a loading state for the button.
// TODO: Add URL validation logic.

/**
 * S stands for Styled Component
 */

export default function URLComponent() {
	const router = useRouter();
	const theme = useTheme();
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

	return (
		<SContainer>
			<SImageContainer>
				<SImage src={theme.palette.mode === 'dark' ? '/images/cslogodark.svg' : '/images/cslogolight.svg'} alt="Code Sandbox" width={150} height={50} />
			</SImageContainer>
			<Grid container spacing={2} width={480} >
				<Grid item xs={12}>
					<STypography variant="h1">Start by pasting the repository URL.</STypography>
				</Grid>
				<Grid item xs={10} >
					<TextField id="standard-basic" variant="standard" onChange={handleChange} fullWidth />
					<Typography variant="body2" sx={{ paddingTop: '1rem' }} color="error">{error ? 'Ops! Something went wrong. Try again.' : ''}</Typography>
				</Grid>
				<Grid item xs={2}>
					<SButton variant="contained" onClick={handleClick}>{loading ? 'Loading...' : 'Submit'}</SButton>
				</Grid>
			</Grid>
		</SContainer>
	)
}

const SContainer = styled(Grid)(({ }) => ({
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
	height: '100vh',
}));

const SImageContainer = styled(Box)(({ }) => ({
	position: 'relative',
}));

const SImage = styled(Image)(({ }) => ({
	position: 'absolute',
	bottom: '3rem',
}));

const STypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.light,
}));

// TODO: Fix typography
const SButton = styled(Button)(({ theme }) => ({
	letterSpacing: '-0.0125em',
	backgroundColor: theme.palette.primary.main,
	":hover": {
		backgroundColor: theme.palette.primary.main,
	},
	boxShadow: 'none',
}));