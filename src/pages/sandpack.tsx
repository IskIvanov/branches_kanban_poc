import Image from 'next/image';
import Stack from '@mui/material/Stack';
import { useContext, useState } from "react";
import { GithubDataContext } from '../context/github-context';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Box } from '@mui/material';
import SandpackHeader from '../components/sandpack-hreader';

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
		const newFromCategory = {
			...fromCategory,
			branches: fromCategory.branches.filter((b: any) => b.name !== branch.name),
		};
		const newToCategory = {
			...toCategory,
			branches: [...toCategory.branches, branch],
		};
		const newLocalBranches = localBranches.map((category) => {
			if (category.name === from) return newFromCategory;
			if (category.name === to) return newToCategory;
			return category;
		});
		setLocalBranches(newLocalBranches);
	};


	const moveForward = (branch: any) => {
		const from = localBranches.find((category) => category.branches.includes(branch));
		const to = localBranches[localBranches.indexOf(from) + 1];
		if (from.name === 'Ready to Merge') return;
		handleMove(branch, from.name, to.name);
	};

	const moveBack = (branch: any) => {
		const from = localBranches.find((category) => category.branches.includes(branch));
		const to = localBranches[localBranches.indexOf(from) - 1];
		if (from.name === 'In progress') return;
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
									<SLeftIcon src='/images/move-left.svg' alt="Left arrow" width={18} height={18} onClick={() => moveBack(branch)} />
									<SRightIcon src='/images/move-right.svg' alt="Right arrow" width={18} height={18} onClick={() => moveForward(branch)} />
								</Box>
							))}
						</div>
					))}
				</Stack>
			</Grid>
		</Box >
	)
}

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