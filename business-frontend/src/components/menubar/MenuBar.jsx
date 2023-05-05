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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/icons-material/Menu';
import HubIcon from '@mui/icons-material/Hub';
import Avatar from '@mui/material/Avatar';
import './MenuBar.css';
// import logo from '../../logo.png';

export default function MenuBar() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<nav>
			<AppBar position="static" color="transparent">
				<div className="menu-container">
					<div className="menu-title">
						<HubIcon
							sx={{
								display: { xs: 'none', md: 'flex' },
								mr: 1,
							}}
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
					</div>
					<div>
						<Tooltip title="Account settings">
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={() => setIsDrawerOpen(true)}
							>
								<MenuIcon />
							</IconButton>
						</Tooltip>

						<Drawer
							open={isDrawerOpen}
							onClose={() => setIsDrawerOpen(false)}
							anchor="right"
						>
							<List>
								<ListItem>
									<ListItemText primary="Home" />
								</ListItem>

								<ListItem>
									<ListItemText primary="About" />
								</ListItem>

								<ListItem>
									<ListItemText primary="Contact" />
								</ListItem>

								<ListItem>
									<ListItemText primary="Services" />
								</ListItem>
							</List>
						</Drawer>
					</div>
				</div>
			</AppBar>
		</nav>
	);
}
