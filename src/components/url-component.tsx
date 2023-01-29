import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';
import { getBranches, getStars } from '../services/github-api';

// TODO: From github api check if the account is valid.
// TODO: Add logic for submit and Loading state
// TODO: Logic for url parsing should live here.
// TODO: Develop a loading state for the button.

/**
 * S stands for Styled Component
 */

export default function URLComponent() {
	const router = useRouter()
	const theme = useTheme();
	const [error, setError] = useState<string>('')
	const [url, setUrl] = useState<string>('')

	const handleClick = async () => {
		// Toggle palette mode
		// theme.palette.mode = 'light'
		// console.log(theme.palette.mode);
		// router.push('/sandpack');
		// Check if Owner and Repo are valid and then redirect to sandpack

		const owner = url.split('/')[3];
		const repo = url.split('/')[4];
		const branchesData = await getBranches(owner, repo);
		const starsData = await getStars(owner, repo);

		// console.log(branchesData);
		console.log(starsData);
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Check if the url is valid
		const url = event.target.value;
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
				</Grid>
				<Grid item xs={2}>
					<SButton variant="contained" onClick={handleClick}>Submit</SButton>
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