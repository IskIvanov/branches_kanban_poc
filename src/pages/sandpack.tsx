import Image from 'next/image';
import Stack from '@mui/material/Stack';
import { useContext, useState } from "react";
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
					branches: category.branches.filter((branchName: any) => branchName.name !== branch), //TODO: Type Data
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

	return (
		<Box sx={{ margin: '4%' }}>
			<Grid container spacing={4} direction="row" justifyContent="center">
				<SandpackHeader />

				{/* In Progress */}
				<Stack direction='row' justifyContent="space-between" spacing={2} width={'90%'} >
					<div>
						<p>In Progress ({localBranches[0].branches.length})</p>
						{localBranches[0].branches.map((branch: any, i: number) => (
							<Box key={i} sx={{ position: 'relative' }}>
								<SItem key={i} elevation={0}>{branch.name}</SItem>
								<SRightIcon src='/images/move-right.svg' alt="Right arrow" width={18} height={18} onClick={() => handleMove(branch.name, "In Progress", "Review")} />
							</Box>
						))}
					</div>

					{/* Review */}
					<div>
						<p>Review ({localBranches[1].branches.length})</p>
						{localBranches[1].branches.map((branch: any, i: number) => (
							// <Box key={i} sx={{
							// 	// position: 'relative'
							// }}>
							<SBox key={i}>
								<SItem elevation={0}>{branch}</SItem>
								<SLeftIcon src='/images/move-left.svg' alt="Left arrow" width={18} height={18} onClick={() => handleMove(branch.name, "Review", "In Progress")} />
								<SRightIcon src='/images/move-right.svg' alt="Right arrow" width={18} height={18} onClick={() => handleMove(branch.name, "Review", "In Progress")} />
							</SBox>
							// </Box>
						))}
					</div>

					{/* Ready to merge */}
					<div>
						<p>Ready to merge ({localBranches[2].branches.length})</p>
						{localBranches[2].branches.map((branch: any, i: number) => (
							<>
								<SItem key={i} elevation={0}>{branch.name}</SItem>
								{/* <button onClick={() => handleMove(branch.name, "Ready to merge", "In Progress")}>Move</button> */}
							</>
						))}
					</div>
				</Stack>
			</Grid>
		</Box >
	)
}


const SBox = styled(Box)(({ }) => ({
	position: 'relative',
}));

const SLeftIcon = styled(Image)(({ }) => ({
	position: 'absolute',
	top: 22,
	left: 25,
}));

const SRightIcon = styled(Image)(({ }) => ({
	position: 'absolute',
	top: 22,
	right: 30,
}));

const SItem = styled(Paper)(({ theme }) => ({
	...theme.typography.h3,
	margin: theme.spacing(2),
	width: 400,
	textAlign: 'center',
	backgroundColor: theme.palette.primary.main,
	height: 60,
	lineHeight: '60px',
	'&:hover': {
		cursor: 'pointer',
		backgroundColor: '#383838',
	}
}));