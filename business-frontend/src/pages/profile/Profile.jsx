import React from 'react';
import { Avatar, IconButton, Select, MenuItem } from '@mui/material';
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
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useEffect } from 'react';
import { API_URL } from '../../constants';
// import BACKEND_URL from '../../config/configBackend';

import './Profile.css';
import MenuBar from '../../components/menubar/MenuBar';
import JobsList from '../../components/activeJobsList/JobsList';
import { updateBusiness } from '../../redux/slices/businessStateSlice';

export default function Profile() {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.business.profile);
	const token = useSelector((state) => state.business.token);

	const [openEditHours, setOpenEditHours] = React.useState(false);
	const [openEditServices, setOpenEditServices] = React.useState(false);
	const [workingHours, setWorkingHours] = React.useState(
		profile.workingHours,
	);
	const [filter, setFilter] = React.useState(null);

	const [allServices, setAllServices] = React.useState([]);
	useEffect(() => {
		axios
			.get(`${API_URL}/users/get-services`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				setAllServices(response.data.message);
			});
	}, []);

	const formattedServices = [];
	profile.services.forEach((service) => {
		formattedServices.push({
			service: service.service._id,
			name: service.service.name,
			rate: service.rate,
		});
	});

	const [newService, setNewService] = React.useState({});

	const [displayServices, setDisplayServices] =
		React.useState(formattedServices);

	console.log(JSON.stringify(displayServices) + 'display services');
	const handleEditHoursOpen = () => {
		setOpenEditHours(true);
	};

	const handleEditHoursClose = () => {
		setOpenEditHours(false);
	};

	const handleEditServicesOpen = () => {
		setOpenEditServices(true);
	};

	const handleEditServicesClose = () => {
		setOpenEditServices(false);
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

	const handleEditServicesSubmit = async function (e) {
		try {
			const userUpdateRequest = await fetch(
				`${API_URL}/business/users/add-service`,
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
					body: JSON.stringify(displayServices),
				},
			);
			const userUpdateResp = await userUpdateRequest.json();
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
						label="Status Filter"
						defaultValue="All"
						onChange={(e) => {
							setFilter(e.target.value);
						}}
					>
						<MenuItem value="All">All</MenuItem>
						<MenuItem value="Accepted">Accepted</MenuItem>
						<MenuItem value="In Progress">In Progress</MenuItem>
						<MenuItem value="Delayed">Delayed</MenuItem>
						<MenuItem value="Completed">Completed</MenuItem>
						<MenuItem value="Closed Complete">
							Closed Complete
						</MenuItem>
						<MenuItem value="Closed Incomplete">
							Closed Incomplete
						</MenuItem>
					</TextField>
					<JobsList filter={filter} />
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
							onClick={handleEditServicesOpen}
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
					<Dialog
						open={openEditServices}
						onClose={handleEditServicesClose}
					>
						<DialogTitle>Edit Services</DialogTitle>
						<DialogContent
							sx={{
								width: '500px',
							}}
						>
							<DialogContentText>
								These are the services offered that potential
								clients see on your public profile.
							</DialogContentText>
							<EditServicesForm
								services={displayServices}
								setServices={setDisplayServices}
								newService={newService}
								setNewService={setNewService}
								allServices={allServices}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleEditServicesClose}>
								Cancel
							</Button>
							<Button onClick={handleEditServicesSubmit}>
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

function EditServicesForm({
	services,
	setServices,
	newService,
	setNewService,
	allServices,
}) {
	console.log(services);
	const servicesDOM = [];
	services.forEach((service) => {
		servicesDOM.push(
			<div className="s-list-item">
				<TextField
					size="small"
					sx={{
						mt: '15px',
						mb: '15px',
						mr: '10px',
						width: '100%',
					}}
					label="Service"
					disabled
					variant="standard"
					defaultValue={service.name}
				/>
				<TextField
					type={'number'}
					size="small"
					id={service.name}
					sx={{
						mt: '15px',
						mb: '15px',
						ml: '5px',
						width: '100%',
					}}
					label="Rate ($)"
					//disabled
					variant="standard"
					defaultValue={service.rate}
					onChange={(e) => {
						const tempServices = [...services];
						for (let i = 0; i < tempServices.length; i++) {
							if (tempServices[i].name === e.target.id) {
								tempServices[i].rate = e.target.value;
							}
						}
						setServices(tempServices);
					}}
				/>
				<div></div>
			</div>,
		);
	});

	const getAllServicesDOM = () => {
		const allServicesDOMArr = [];
		allServices.forEach((service) => {
			allServicesDOMArr.push(
				<MenuItem value={service.name}>{service.name}</MenuItem>,
			);
		});
		return allServicesDOMArr;
	};
	return (
		<div>
			{servicesDOM}
			<br />
			<div className="s-list-item">
				<TextField
					size="small"
					variant="standard"
					select
					sx={{
						mt: '15px',
						mb: '15px',
						mr: '10px',
						width: '100%',
					}}
					label="Service"
					onChange={(e) => {
						console.log(e.target);
						const newServiceName = e.target.value;
						let newServiceId;
						allServices.forEach((service) => {
							if (service.name === newServiceName) {
								newServiceId = service._id;
							}
						});
						setNewService({
							...newService,
							name: newServiceName,
							service: newServiceId,
						});
					}}
				>
					{getAllServicesDOM()}
				</TextField>

				<TextField
					type={'number'}
					size="small"
					sx={{
						mt: '15px',
						mb: '15px',
						ml: '5px',
						width: '100%',
					}}
					label="Rate ($)"
					//disabled
					variant="standard"
					onChange={(e) => {
						setNewService({
							...newService,
							rate: e.target.value,
						});
					}}
				/>
				<IconButton
					sx={{
						marginLeft: '47%',
					}}
					onClick={() => {
						setServices([...services, newService]);
					}}
				>
					<AddCircleIcon fontSize="large" />
				</IconButton>
			</div>
		</div>
	);
}
