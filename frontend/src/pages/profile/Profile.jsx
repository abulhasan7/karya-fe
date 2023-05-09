import React from 'react';
import { Avatar, IconButton, TextField, MenuItem } from '@mui/material';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import { useSelector } from 'react-redux';
// import BACKEND_URL from '../../config/configBackend';

import './Profile.css';
import MenuBar from '../../components/menubar/MenuBar';
import JobsListingPage from '../jobsListingPage/JobsListingPage';

export default function Profile() {
	const profile = useSelector((state) => state.user.profile);
	const token = useSelector((state) => state.user.token);
	const [filter, setFilter] = React.useState(null);
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
				<br />
				<TextField
					size="small"
					variant="standard"
					select
					sx={{
						mt: '15px',
						mb: '15px',
						mr: '10px',
						width: '200px',
					}}
					defaultValue="All"
					label="Status Filter"
					onChange={(e) => {
						setFilter(e.target.value);
					}}
				>
					<MenuItem value="All">All</MenuItem>
					<MenuItem value="Posted">Posted</MenuItem>
					<MenuItem value="Accepted">Accepted</MenuItem>
					<MenuItem value="In Progress">In Progress</MenuItem>
					<MenuItem value="Delayed">Delayed</MenuItem>
					<MenuItem value="Completed">Completed</MenuItem>
					<MenuItem value="Closed Complete">Closed Complete</MenuItem>
					<MenuItem value="Closed Incomplete">
						Closed Incomplete
					</MenuItem>
				</TextField>
				<JobsListingPage filter={filter} />
			</div>
		</div>
	);
}
