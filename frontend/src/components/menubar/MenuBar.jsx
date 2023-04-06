/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import './MenuBar.css';
import logo from '../../karya-logo.png';

export default function MenuBar() {
	return (
		<nav>
			<AppBar position="static">
				<Toolbar>
					<Link to="/">
						<img className="header__logo" src={logo} alt="Karya" />
					</Link>
				</Toolbar>
			</AppBar>
		</nav>
	);
}
