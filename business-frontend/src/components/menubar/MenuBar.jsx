import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/icons-material/Menu';
import HubIcon from '@mui/icons-material/Hub';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

import './MenuBar.css';
// import logo from '../../logo.png';

export default function MenuBar() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<nav>
			<AppBar position="static">
				<div className="menu-container">
					<div className="menu-title">
						<HubIcon
							sx={{
								display: { xs: 'none', md: 'flex' },
								mr: 1,
							}}
							color=""
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
					</div>
					<div>
						<Tooltip title="Account settings">
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={() => setIsDrawerOpen(true)}
							>
								<MenuOpenIcon />
							</IconButton>
						</Tooltip>

						<Drawer
							open={isDrawerOpen}
							onClose={() => setIsDrawerOpen(false)}
							anchor="right"
						>
							<List>
								<ListItem>
									<Button
										variant="outlined"
										size="small"
										startIcon={<HomeIcon />}
										sx={{
											textTransform: 'unset',
										}}
										onClick={() => navigate(`/home`)}
									>
										Home
									</Button>
								</ListItem>

								<ListItem>
									<Button
										variant="outlined"
										size="small"
										startIcon={<AccountBoxIcon />}
										sx={{
											textTransform: 'unset',
										}}
										onClick={() => navigate(`/profile`)}
									>
										Profile
									</Button>
								</ListItem>

								<ListItem>
									<Button
										variant="outlined"
										size="small"
										color="error"
										startIcon={<LogoutIcon />}
										sx={{
											textTransform: 'unset',
										}}
									>
										Logout
									</Button>
								</ListItem>
							</List>
						</Drawer>
						{/* <MenuItem onClick={handleClose}>
							<Avatar /> Profile
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<Avatar /> My account
						</MenuItem>
						<Divider />
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<PersonAdd fontSize="small" />
							</ListItemIcon>
							Add another account
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<Settings fontSize="small" />
							</ListItemIcon>
							Settings
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem> */}
					</div>
				</div>
			</AppBar>
		</nav>
	);
}
