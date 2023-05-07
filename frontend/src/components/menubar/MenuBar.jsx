import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { List, ListItem } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import HubIcon from '@mui/icons-material/Hub';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import JobCreator from '../jobCreator/JobCreator';
import { logout } from '../../redux/slices/userStateSlice';
import './MenuBar.css';

export default function MenuBar() {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<nav>
			<AppBar position="static">
				<div className="menu-container">
					<div
						className="menu-title"
						role="button"
						onClick={() => {
							navigate(`/home`);
						}}
					>
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
					<div className="menubar-actions">
						<div className="job-creator-mc">
							<JobCreator />
						</div>

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
										onClick={handleLogout}
									>
										Logout
									</Button>
								</ListItem>
							</List>
						</Drawer>
					</div>
				</div>
			</AppBar>
		</nav>
	);
}
