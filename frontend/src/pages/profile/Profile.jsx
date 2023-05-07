import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import { useSelector } from 'react-redux';
// import BACKEND_URL from '../../config/configBackend';

import './Profile.css';
import MenuBar from '../../components/menubar/MenuBar';
import JobsListingPage from '../jobsListingPage/JobsListingPage';

export default function Profile() {
	const profile = useSelector((state) => state.user.profile);
	const token = useSelector((state) => state.user.token);
	console.log('profile is',profile)
	return (
		<div>
			<MenuBar />
			<div className="user-profile-container">
				<div className="user-profile-header">
					<div className="user-profile-image">
						<Avatar
							src={profile.picture}
							sx={{
								width: 140,
								height: 140,
							}}
						/>
					</div>
					<div className="user-profile-name">
						<span>{profile.name}</span>
						<IconButton
							aria-label="edit"
							onClick={() => {
								window.location.assign(`/user-edit/`);
							}}
						>
							<ModeEditOutlineTwoToneIcon />
						</IconButton>
					</div>
				</div>
				<JobsListingPage />
			</div>
		</div>
	);
}
