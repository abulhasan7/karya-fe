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
import './UserSignup.css';

export default function UserSignup() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
	};

	return (
		<div className="u-signup-container">
			<div className="u-signup-logo-container">
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
			<div className="u-signup-form-container">
				<Paper className="u-signup-form" elevation={12}>
					<Typography component="h1" variant="h6">
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									size="small"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									size="small"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									size="small"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									size="small"
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							size="small"
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</div>
		</div>
	);
}
