import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
// import BACKEND_URL from '../../config/configBackend';

import './Profile.css';
import MenuBar from '../../components/menubar/MenuBar';
import ActiveJobsList from '../../components/activeJobsList/ActiveJobsList';

export default function Profile() {
	const profile = useSelector((state) => state.business.profile);

	return (
		<div>
			<MenuBar />
			<div className="business-profile-container">
				<div>
					<div className="business-profile-header">
						<div className="business-profile-image">
							<Avatar
								src={profile.primaryImage}
								sx={{
									width: 140,
									height: 140,
								}}
							/>
						</div>
						<div className="business-profile-name">
							<span>{profile.name}</span>
							<IconButton
								aria-label="edit"
								onClick={() => {
									window.location.assign(`/profile-edit/`);
								}}
							>
								<ModeEditOutlineTwoToneIcon />
							</IconButton>
						</div>
					</div>
					<ActiveJobsList />
				</div>
				<div className="bo-side-card">
					<Paper
						sx={{
							width: '300px',
							padding: '15px',
						}}
					>
						<Button
							variant="contained"
							size="small"
							sx={{
								textTransform: 'unset',
								width: '100%',
								mb: '10px',
							}}
							endIcon={<AccessTimeIcon />}
						>
							Edit Hours
						</Button>
						<Divider />
						<Button
							variant="contained"
							size="small"
							sx={{
								textTransform: 'unset',
								width: '100%',
								mt: '10px',
							}}
							endIcon={<DesignServicesIcon />}
						>
							Edit Services
						</Button>
					</Paper>
				</div>
			</div>
		</div>
	);
}
