import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
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
				<div className="business-profile-header">
					<div className="business-profile-image">
						<Avatar
							src={''}
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
		</div>
	);
}
