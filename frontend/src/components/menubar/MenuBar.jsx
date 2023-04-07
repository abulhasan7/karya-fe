/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import HubIcon from '@mui/icons-material/Hub';
import './MenuBar.css';
// import logo from '../../logo.png';

export default function MenuBar() {
	return (
		<nav>
			<AppBar position="static" color="transparent">
				<Toolbar>
					<HubIcon
						sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
						color="primary"
					/>
					<Typography
						variant="h6"
						noWrap
						component="h6"
						href="/"
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
				</Toolbar>
			</AppBar>
		</nav>
	);
}
