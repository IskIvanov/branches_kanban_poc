import Image from 'next/image';
import { Grid, Box, Typography, styled } from '@mui/material';
import router from 'next/router';
import { useContext } from 'react';
import { GithubDataContext } from '../context/github-context';


export default function SandpackHeader() {
	const { stars } = useContext(GithubDataContext);

	const handleBackButton = () => {
		router.back();
	}

	return (
		<SSandpack container item>
			<SSandpackHeader item display='flex'>
				<Image src='/images/back-arrow.svg' alt='Star' width={25} height={25} onClick={handleBackButton} />
				<Typography variant="h1" margin={2}>sandpack</Typography>
				<SStar><Image src='/images/star.svg' alt='Star' width={20} height={20} />{stars}</SStar>
			</SSandpackHeader>
			<SText variant="h3" width={405}>
				A component toolkit for creating live-running code editing experiences, using the power of CodeSandbox.
			</SText>
		</SSandpack>
	);
}

const SSandpack = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginBottom: '100px',
}));
const SSandpackHeader = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
}));

const SText = styled(Typography)(({ theme }) => ({
	height: 'fit-content',
	marginLeft: theme.spacing(24),
}));

const SStar = styled(Box)(() => ({
	width: '2.5rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
}));
