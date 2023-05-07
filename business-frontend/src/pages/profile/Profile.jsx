import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { API_URL } from '../../constants';
// import BACKEND_URL from '../../config/configBackend';

import './Profile.css';
import MenuBar from '../../components/menubar/MenuBar';
import ActiveJobsList from '../../components/activeJobsList/ActiveJobsList';
import { updateBusiness } from '../../redux/slices/businessStateSlice';

export default function Profile() {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.business.profile);
	const token = useSelector((state) => state.business.token);
	const [openEditHours, setOpenEditHours] = React.useState(false);
	const [workingHours, setWorkingHours] = React.useState(
		profile.workingHours,
	);

	const handleEditHoursOpen = () => {
		setOpenEditHours(true);
	};

	const handleEditHoursClose = () => {
		setOpenEditHours(false);
	};

	const handleEditHoursSubmit = async function (e) {
		console.log(workingHours);
		const userBody = {
			...profile,
			workingHours,
		};
		try {
			const userUpdateRequest = await fetch(
				`${API_URL}/business/users/update-profile`,
				{
					method: 'POST',
					mode: 'cors',
					cache: 'no-cache',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
					redirect: 'follow',
					referrerPolicy: 'no-referrer',
					body: JSON.stringify(userBody),
				},
			);
			const userUpdateResp = await userUpdateRequest.json();
			dispatch(updateBusiness({ profile: userBody, token }));
			setTimeout(window.location.assign('/profile'), 100);
		} catch (err) {
			console.log(err);
		}
	};

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
							onClick={handleEditHoursOpen}
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
					<Dialog open={openEditHours} onClose={handleEditHoursClose}>
						<DialogTitle>Edit Working Hours</DialogTitle>
						<DialogContent
							sx={{
								width: '250px',
							}}
						>
							<DialogContentText>
								These are the working hours that potential
								clients see on your public profile.
							</DialogContentText>
							<EditHoursForm
								workingHours={workingHours}
								setWorkingHours={setWorkingHours}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleEditHoursClose}>
								Cancel
							</Button>
							<Button onClick={handleEditHoursSubmit}>
								Edit
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		</div>
	);
}

function EditHoursForm({ workingHours, setWorkingHours }) {
	return (
		<div className="wh-form">
			<TextField
				size="small"
				sx={{
					mt: '15px',
					mb: '15px',
					width: '100%',
				}}
				label="Monday"
				variant="standard"
				defaultValue={workingHours['Monday']}
				onChange={(e) =>
					setWorkingHours({
						...workingHours,
						Monday: e.target.value,
					})
				}
			/>
			<TextField
				size="small"
				sx={{
					mt: '15px',
					mb: '15px',
					width: '100%',
				}}
				label="Tuesday"
				variant="standard"
				defaultValue={workingHours['Tuesday']}
				onChange={(e) =>
					setWorkingHours({
						...workingHours,
						Tuesday: e.target.value,
					})
				}
			/>
			<TextField
				size="small"
				sx={{
					mt: '15px',
					mb: '15px',
					width: '100%',
				}}
				label="Wednesday"
				variant="standard"
				defaultValue={workingHours['Wednesday']}
				onChange={(e) =>
					setWorkingHours({
						...workingHours,
						Wednesday: e.target.value,
					})
				}
			/>
			<TextField
				size="small"
				sx={{
					mt: '15px',
					mb: '15px',
					width: '100%',
				}}
				label="Thursday"
				variant="standard"
				defaultValue={workingHours['Thursday']}
				onChange={(e) =>
					setWorkingHours({
						...workingHours,
						Thursday: e.target.value,
					})
				}
			/>
			<TextField
				size="small"
				sx={{
					mt: '15px',
					mb: '15px',
					width: '100%',
				}}
				label="Friday"
				variant="standard"
				defaultValue={workingHours['Friday']}
				onChange={(e) =>
					setWorkingHours({
						...workingHours,
						Friday: e.target.value,
					})
				}
			/>
			<TextField
				size="small"
				sx={{
					mt: '15px',
					mb: '15px',
					width: '100%',
				}}
				label="Saturday"
				variant="standard"
				defaultValue={workingHours['Saturday']}
				onChange={(e) =>
					setWorkingHours({
						...workingHours,
						Saturday: e.target.value,
					})
				}
			/>
			<TextField
				size="small"
				sx={{
					mt: '15px',
					mb: '15px',
					width: '100%',
				}}
				label="Sunday"
				variant="standard"
				defaultValue={workingHours['Sunday']}
				onChange={(e) =>
					setWorkingHours({
						...workingHours,
						Sunday: e.target.value,
					})
				}
			/>
		</div>
	);
}
