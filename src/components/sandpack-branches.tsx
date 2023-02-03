import Image from 'next/image';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMoveBranchesLogic } from '../hooks/use-move-branches';

export default function SandpackKanbanBranches() {
	const theme = useTheme();
	const { updatedBranches, moveForward, moveBack } = useMoveBranchesLogic();

	return (
		<Stack direction="row" width={'100%'} alignContent={'center'} justifyContent={'center'} >
			{updatedBranches.map((category, index) => (
				<SColumn key={index}>
					<p>{category.name} {category.branches.length}</p>
					{category.branches.map((branch: any, i: number) => (
						<Box key={i} sx={{ position: 'relative' }}>
							<SItem key={i} elevation={0}>{branch.name}</SItem>
							<SLeftIcon src={`/images/move-left${theme.palette.mode === 'light' ? `-lg` : ''}.svg`} alt="Left arrow" width={18} height={18} onClick={() => moveBack(branch)} />
							<SRightIcon src={`/images/move-right${theme.palette.mode === 'light' ? `-lg` : ''}.svg`} alt="Right arrow" width={18} height={18} onClick={() => moveForward(branch)} />
						</Box>
					))}
				</SColumn>
			))}
		</Stack>
	)
}

const SLeftIcon = styled(Image)(() => ({
	position: 'absolute',
	top: 22,
	left: 25,
}));

const SRightIcon = styled(Image)(() => ({
	position: 'absolute',
	top: 22,
	right: 30,
}));

const SItem = styled(Paper)(({ theme }) => ({
	...theme.typography.h3,
	margin: theme.spacing(2),
	width: '367',
	height: '70',
	textAlign: 'center',
	backgroundColor: theme.palette.primary.main,
	lineHeight: 4,
	'&:hover': {
		cursor: 'pointer',
		backgroundColor: theme.palette.secondary.main,
	}
}));

const SColumn = styled('div')(() => ({
	width: 500,
	height: 'fit-content',
}));