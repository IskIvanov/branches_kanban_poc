import Image from 'next/image';
import { useContext } from "react";
import { GithubDataContext } from '../context/github-context';
import { styled } from '@mui/material/styles';
import { Paper, Grid } from '@mui/material';

// TODO: Populate component with kanban branches

export default function Sandpack() {
	const { branches, stars, setBranches, setStars } = useContext(GithubDataContext);

	return (
		<Grid container spacing={2}>
			<Grid item>
				<span><Image src='/images/star.svg' alt='Star' width={20} height={20} className='testingStles relative bg-slate-400' /> {stars}</span>
			</Grid>
			<Grid item>
				{branches.map((branch: any, i: number) => (
					<SItem key={i} elevation={0}>{branch.name}</SItem>
				))}
			</Grid>
		</Grid>
	)
}

const SItem = styled(Paper)(({ theme }) => ({
	...theme.typography.h3,
	margin: theme.spacing(1),
	width: 400,
	textAlign: 'center',
	backgroundColor: theme.palette.primary.main,
	height: 60,
	lineHeight: '60px',
}));