import { useContext } from "react";
import { useTheme } from '@mui/material/styles';
import { Grid, Box, IconButton } from '@mui/material';
import SandpackHeader from '../components/sandpack-hreader';
import { ColorModeContext } from './_app';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SandpackKanbanBranches from '../components/sandpack-branches';

export default function SandpackPage() {
	const colorMode = useContext(ColorModeContext);
	const theme = useTheme();

	return (
		<Box sx={{ margin: '4%' }}>
			<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
				{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
			</IconButton>
			<Grid container spacing={4} direction="row" justifyContent="center">
				<SandpackHeader />
				<SandpackKanbanBranches />
			</Grid>
		</Box >
	)
}