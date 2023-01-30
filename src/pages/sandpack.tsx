import { useContext, useEffect, useState } from "react";
import { GithubDataContext } from '../context/github-context';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Box } from '@mui/material';
import SandpackHeader from '../components/sandpack-hreader';

type BranchCategory = {
	name: string;
	branches: string[];
}

export default function SandpackPage() {
	const { branches } = useContext(GithubDataContext);

	// TODO: Abstract this into GithubDataContext.
	// Initial mocking strategy for moved branches.

	const [localBranches, setLocalBranches] = useState<BranchCategory[]>([
		{ name: "In progress", branches: [...branches] },
		{ name: "Review", branches: [...branches] },
		{ name: "Ready to Merge", branches: [...branches] },
	]);


	useEffect(() => {
		console.log(localBranches);
	}, [branches]);

	return (
		<Box sx={{ margin: '4%' }}>
			<Grid container spacing={4} direction="row" justifyContent="center">
				<SandpackHeader />

				{/* In Progress */}
				<Grid item>
					<p>In Progress ({localBranches[0].branches.length})</p>
					{localBranches[0].branches.map((branch: any, i: number) => (
						<SItem key={i} elevation={0}>{branch.name}</SItem>
					))}
				</Grid>

				{/* Review */}
				<Grid item>
					<p>Review ({localBranches[0].branches.length})</p>
					{localBranches[1].branches.map((branch: any, i: number) => (
						<SItem key={i} elevation={0}>{branch.name}</SItem>
					))}
				</Grid>

				{/* Ready to merge */}
				<Grid item>
					<p>Ready to merge ({localBranches[0].branches.length})</p>
					{localBranches[2].branches.map((branch: any, i: number) => (
						<SItem key={i} elevation={0}>{branch.name}</SItem>
					))}
				</Grid>
			</Grid>
		</Box>
	)
}

// Translate in rem 367px
const SItem = styled(Paper)(({ theme }) => ({
	...theme.typography.h3,
	margin: theme.spacing(1),
	width: 400,
	textAlign: 'center',
	backgroundColor: theme.palette.primary.main,
	height: 60,
	lineHeight: '60px',
}));