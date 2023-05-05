import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/icons-material/Menu';
import HubIcon from '@mui/icons-material/Hub';
import Avatar from '@mui/material/Avatar';
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
					<ProfileMenu />
				</Toolbar>
			</AppBar>
		</nav>
	);
}

function ProfileMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<div>
				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
					</IconButton>
				</Tooltip>
			</div>

			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={handleClose}>
					<Avatar /> Profile
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Avatar /> My account
				</MenuItem>
			</Menu>
		</div>
	);
}
