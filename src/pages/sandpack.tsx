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

	const [localBranches, setLocalBranches] = useState<any[]>([
		{ name: "In progress", branches: [...branches] },
		{ name: "Review", branches: [] },
		{ name: "Ready to Merge", branches: [] },
	]);

	const handleMove = (branch: any, from: string, to: string) => {
		const fromCategory = localBranches.find((category) => category.name === from);
		const toCategory = localBranches.find((category) => category.name === to);
		const fromIndex = localBranches.indexOf(fromCategory);
		const toIndex = localBranches.indexOf(toCategory);

		fromCategory.branches.splice(fromCategory.branches.indexOf(branch), 1);
		toCategory.branches.push(branch);

		setLocalBranches((oldLocalBranches) => {
			const updatedLocalBranches = [...oldLocalBranches];
			updatedLocalBranches[fromIndex] = fromCategory;
			updatedLocalBranches[toIndex] = toCategory;
			return updatedLocalBranches;
		});
	};


	const moveForward = (branch: any) => {
		const from = localBranches.find((category) => category.branches.includes(branch));
		const to = localBranches[localBranches.indexOf(from) - 1];
		console.log(from, to);
		handleMove(branch, from.name, to.name);
	};

	const moveBack = (branch: any) => {
		const from = localBranches.find((category) => category.branches.includes(branch));
		const to = localBranches[localBranches.indexOf(from) + 1];
		console.log(from, to);
		handleMove(branch, from.name, to.name);
	};

	return (
		<Box sx={{ margin: '4%' }}>
			<Grid container spacing={4} direction="row" justifyContent="center">
				<SandpackHeader />

				<Stack direction="row" width={'90%'} justifyContent="space-evenly">
					{localBranches.map((category, index) => (
						<div key={index}>
							<p>{category.name} {category.branches.length}</p>
							{category.branches.map((branch: any, i: number) => (
								<Box key={i} sx={{ position: 'relative' }}>
									<SItem key={i} elevation={0}>{branch.name}</SItem>
									<button onClick={() => moveForward(branch)}>left</button>
									<button onClick={() => moveBack(branch)}>right</button>
								</Box>
							))}
						</div>
					))}
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