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
import { useState } from 'react';
import axios from 'axios';
import { Alert, AlertTitle } from '@mui/material';
import { API_URL } from '../../constants';
import { updateUser } from '../../redux/slices/userStateSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
    const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('email is', email);
		console.log('password is', password);
		if (email === '' || password === '') {
			const alertmessage = (
				<Alert severity="error" onClose={() => setMessage('')}>
					<AlertTitle>Error</AlertTitle>
					Either username or password is empty
				</Alert>
			);
			setMessage(alertmessage);
			setTimeout(() => {
				setMessage('');
			}, 3000);
		} else {
			const data = {
				email,
				password,
			};
			axios
				.post(`${API_URL}/users/login`, data)
				.then((response) => {
					console.log(response.data.error);
					if(response.data.error){
						const alertmessage = (
							<Alert severity="error" onClose={() => setMessage('')}>
								<AlertTitle>Error</AlertTitle>
								{response.data.error}
							</Alert>
						);
						setMessage(alertmessage);
						setTimeout(() => {
							setMessage('');
						}, 3000);
					}else{
						console.log('payload is',response.data.message);
						dispatch(updateUser(response.data.message));
						navigate('/home');
					}
				})
				.catch((error) => {
					console.error(error);
				}); // axios.
		}
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
						color: '#f77367',
					}}
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
					{message}
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
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2, backgroundColor: '#f77367' }}
							size="small"
							onClick={handleSubmit}
						>
							Sign In
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link
									href="/"
									variant="body2"
									sx={{
										color: '#f77367',
									}}
								>
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
