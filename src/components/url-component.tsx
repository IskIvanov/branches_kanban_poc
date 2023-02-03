import Image from 'next/image'
import Grid from '@mui/material/Grid';
import { TextField, Button, Typography, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useUrlComponentLogic from '../hooks/use-url-component';
/**
 * S stands for Styled Component
 */

export default function URLComponent() {
	const theme = useTheme();
	const { loading, error, handleClick, handleChange } = useUrlComponentLogic();

	return (
		<SContainer>
			<SImageContainer>
				<SImage src={theme.palette.mode === 'dark' ? '/images/cslogodark.svg' : '/images/cslogolight.svg'} alt="Code Sandbox" width={150} height={50} />
			</SImageContainer>
			<Grid container spacing={2} width={480} >
				<Grid item xs={12}>
					<STypography variant="h1">Start by pasting the repository URL.</STypography>
				</Grid>
				<Grid item xs={10} >
					<TextField id="standard-basic" variant="standard" onChange={handleChange} fullWidth />
					<Typography variant="body2" sx={{ paddingTop: '1rem' }} color="error">{error ? 'Ops! Something went wrong. Try again.' : ''}</Typography>
				</Grid>
				<Grid item xs={2}>
					<SButton variant="contained" onClick={handleClick}>{loading ? 'Loading...' : 'Submit'}</SButton>
				</Grid>
			</Grid>
		</SContainer>
	)
}

const SContainer = styled(Grid)(({ }) => ({
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
	height: '100vh',
}));

const SImageContainer = styled(Box)(({ }) => ({
	position: 'relative',
}));

const SImage = styled(Image)(({ }) => ({
	position: 'absolute',
	bottom: '3rem',
}));

const STypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.primary,
}));

const SButton = styled(Button)(({ theme }) => ({
	letterSpacing: '-0.0125em',
	backgroundColor: theme.palette.primary.main,
	":hover": {
		backgroundColor: theme.palette.secondary.main,
		boxShadow: 'none',
	},
	boxShadow: 'none',
}));