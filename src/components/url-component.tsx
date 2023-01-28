import Image from 'next/image'
import { TextField, Button, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// TODO: From github api check if the account is valid.
// TODO: Add logic for submit and Loading state
// TODO: Logic for url parsing should live here.

export default function URLComponent() {
	const theme = useTheme();

	const handleClick = () => {
		// Toggle palette mode
		theme.palette.mode = 'light';
		// theme.palette.mode = 'light'
		console.log('Button clicked');
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
	}

	return (
		<>
			<Image src="/public/images/CodeSandboxLogo.svg" alt="Code Sandbox" width={50} height={50} />
			<div className=''>
				<STypography variant="h1">Start by pasting the repository URL.</STypography>
				<TextField id="standard-basic" variant="standard" onChange={handleChange} />
				<SButton variant="contained" onClick={handleClick}>Submit</SButton>
			</div>
		</>
	)
}

const STypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.light,
}));

const SButton = styled(Button)(({ theme }) => ({
	// TODO: Add styles for button
}));

