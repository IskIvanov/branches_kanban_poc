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
		{ name: "Review", branches: [] },
		{ name: "Ready to Merge", branches: [] },
	]);

	const handleMove = (branch: string, from: string, to: string) => {
		// Map over the existing branches to create a new array with updated values
		const updatedBranches = localBranches.map((category) => {
			// If the current category is the "from" category, remove the branch from the branches array
			if (category.name === from) {
				return {
					...category,
					branches: category.branches.filter((branchName) => branchName !== branch),
				};
			}
			// If the current category is the "to" category, add the branch to the branches array
			if (category.name === to) {
				return {
					...category,
					branches: [...category.branches, branch],
				};
			}

			return category;
		});

		setLocalBranches(updatedBranches);
	};

	useEffect(() => {
		console.log(localBranches);
	}, [branches, localBranches]);

	return (
		<Box sx={{ margin: '4%' }}>
			<Grid container spacing={4} direction="row" justifyContent="center">
				<SandpackHeader />

				{/* In Progress */}
				<Grid item>
					<p>In Progress ({localBranches[0].branches.length})</p>
					{localBranches[0].branches.map((branch: any, i: number) => (
						<>
							<SItem key={i} elevation={0}>{branch.name}</SItem>
							<button onClick={() => handleMove('New-Index-Page', "In progress", "Review")}>Move</button>
						</>
					))}
				</Grid>

				{/* Review */}
				<Grid item>
					<p>Review ({localBranches[1].branches.length})</p>
					{localBranches[1].branches.map((branch: any, i: number) => (
						<>
							<SItem key={i} elevation={0}>{branch.name}</SItem>
							<button onClick={() => handleMove('New-Index-Page', "Review", "Ready to merge")}>Move</button>
						</>
					))}
				</Grid>

				{/* Ready to merge */}
				<Grid item>
					<p>Ready to merge ({localBranches[2].branches.length})</p>
					{localBranches[2].branches.map((branch: any, i: number) => (
						<>
							<SItem key={i} elevation={0}>{branch.name}</SItem>
							<button onClick={() => handleMove('New-Index-Page', "Review", "Ready to merge")}>Move</button>
						</>
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