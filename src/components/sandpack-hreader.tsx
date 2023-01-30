import Image from 'next/image';
import { Paper, Grid, Typography, Box, styled } from '@mui/material';
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
				<Image src='/images/back-arrow.svg' alt='Star' width={25} height={25} className='testingStles relative bg-slate-400' onClick={handleBackButton} />
				<Typography variant="h1" margin={2}>sandpack</Typography>
				<span><Image src='/images/star.svg' alt='Star' width={20} height={20} className='testingStles relative bg-slate-400' /> {stars}</span>
			</SSandpackHeader>
			<Typography variant="h3" width={367} height={40}>
				A component toolkit for creating live-running code editing experiences, using the power of CodeSandbox.
			</Typography>
		</SSandpack>
	);
}

const SSandpack = styled(Grid)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}));
const SSandpackHeader = styled(Grid)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	padding: theme.spacing(5),
}));
