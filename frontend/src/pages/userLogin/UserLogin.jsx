import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import HubIcon from '@mui/icons-material/Hub';
import './UserLogin.css';

export default function UserLogin() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
	};

	return (
		<div className="u-login-container">
			<div className="u-login-logo-container">
				<HubIcon
					sx={{
						height: 80,
						width: 80,
						display: { xs: 'none', md: 'flex' },
						mr: 1,
					}}
					color="primary"
				/>
				<Typography
					variant="h1"
					noWrap
					component="h1"
					sx={{
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'primary',
					}}
				>
					karya
				</Typography>
			</div>
			<div className="u-login-form-container">
				<Paper className="u-login-form" elevation={12}>
					<Typography component="h1" variant="h6">
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							size="small"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							size="small"
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							size="small"
						>
							Sign In
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/" variant="body2">
									New here? Sign Up
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</div>
		</div>
	);
}
