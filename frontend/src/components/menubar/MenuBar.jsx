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
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const open = Boolean(anchorElUser);
	const handleOpenUserMenu = (event) => {
		console.log(event.currentTarget);
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
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
					<Tooltip title="Open settings">
						<IconButton
							onClick={handleOpenUserMenu}
							aria-controls={open ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							sx={{ p: 0 }}
						>
							<Avatar
								alt="Remy Sharp"
								src="https://gravatar.com/avatar/c05211d69d1248a0909b96f08d16174f?s=200&d=retro&r=pg"
							/>
						</IconButton>
					</Tooltip>
					<Menu
						className=""
						anchorEl={anchorElUser}
						id="account-menu"
						open={open}
						keepMounted
						onClose={handleCloseUserMenu}
						onClick={handleCloseUserMenu}
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
						transformOrigin={{
							horizontal: 'right',
							vertical: 'top',
						}}
						anchorOrigin={{
							horizontal: 'right',
							vertical: 'bottom',
						}}
					>
						<MenuItem>
							<Button
								variant=""
								onClick=""
								sx={{
									textTransform: 'unset',
								}}
								// startIcon={<PersonTwoToneIcon />}
							>
								Profile
							</Button>
						</MenuItem>
						<MenuItem>
							<Button
								variant=""
								sx={{
									textTransform: 'unset',
								}}
								onClick=""
								// startIcon={<Logout />}
							>
								Logout
							</Button>
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</nav>
	);
}
