/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Button from '@mui/material/Button';
import { Autocomplete, Input, InputAdornment, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import './JobCreator.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobCreator() {
	const [open, setOpen] = React.useState(false);
	const token = useSelector((state) => state.user.token);
	const profile = useSelector((state) => state.user.profile);
	const [title, setTitle] = React.useState('');
	const [service, setService] = useState('');
	const [services, setServices] = useState([]);
	const [description, setDescription] = useState('');
	const [hours, setHours] = useState('');
	const [hourlyBudget, setHourlyBudget] = useState('');
	const [overallBudget, setOverallBudget] = useState('');
	const [address, setAddress] = useState(profile.address);
	const navigate = useNavigate();
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleService = (e) => {
		console.log('handleservice is', e);
		setService(e.target.value);
	};
	useEffect(() => {
		axios
			.get(`${API_URL}/users/get-services`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				setServices(response.data.message);
			});
	}, []);

	const handleSubmit = () => {
		console.log('service is', service);
		console.log('title' + title + service + description + overallBudget);
		const s = services.find((s) => s.name == service);
		axios
			.post(
				`${API_URL}/users/post-job`,
				{
					name: title,
					description,
					estimatedTime: hours,
					estimatedBudget: overallBudget,
					estimatedHourlyBudget: hourlyBudget,
					service: s._id,
					address: address,
				},
				{
					headers: {
						Authorization: token,
					},
				},
			)
			.then((response) => {
				console.log('response is', response.data.message);
				if (response.data.message) {
					navigate(`/job-overview/${response.data.message}`);
				}
			});
	};

	return (
		<div>
			<Button
				sx={{
					bgcolor: '#dfebed',
					':hover': {
						color: 'black',
					},
					display: 'flex',
					flexDirection: 'column',
					textTransform: 'unset',
				}}
				onClick={handleClickOpen}
			>
				Create a Job
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					Lets get things done. A few steps before that.
				</DialogTitle>
				<DialogContent
					sx={{
						width: '500px',
					}}
				>
					<HorizontalLinearStepper
						setTitle={setTitle}
						setService={handleService}
						setDescription={setDescription}
						setHours={setHours}
						setHourlyBudget={setHourlyBudget}
						setOverallBudget={setOverallBudget}
						handleSubmit={handleSubmit}
						services={services}
						setAddress={setAddress}
						address={address}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}

const steps = ['Some details.', 'More details please.', 'Estimates.'];

export function HorizontalLinearStepper({
	setTitle,
	setService,
	setDescription,
	setHours,
	setHourlyBudget,
	setOverallBudget,
	handleSubmit,
	services,
	setAddress,
	address,
}) {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	const handleSubmit2 = () => {
		handleSubmit();
		// setActiveStep(0);
		// console.log(title+":"+service+":"+description+":"+hours)
	};

	const contentFormStepOne = (
		<TextField
			required
			sx={{
				width: '100%',
			}}
			size="small"
			id="outlined-required"
			label="Title"
			placeholder="Give your job a nice descriptive title."
			onChange={(e) => setTitle(e.target.value)}
		/>
	);

	const contentFormStepTwo = (
		<div>
			<Autocomplete
				// multiple
				id="tags-outlined"
				options={services}
				size="small"
				getOptionLabel={(option) => option.name}
				// defaultValue={[top100Films[3]]}
				filterSelectedOptions
				renderInput={(params) => (
					<TextField
						sx={{
							width: '100%',
						}}
						variant="standard"
						{...params}
						label="Category"
						placeholder="Select the category which applies to your job."
						onSelect={setService}
					/>
				)}
			/>

			<TextField
				size="small"
				id="standard-multiline-static"
				sx={{
					width: '100%',
					mb: '20px',
				}}
				label="Description"
				multiline
				rows={5}
				placeholder="Please provide as many details here are possible."
				variant="standard"
				onChange={(e) => setDescription(e.target.value)}
			/>

			<TextField
				size="small"
				id="standard-multiline-static"
				sx={{
					width: '100%',
					mb: '20px',
				}}
				defaultValue={address.street}
				label="Street Address"
				onChange={(e) =>
					setAddress({
						...address,
						street: e.target.value,
					})
				}
			/>

			<TextField
				size="small"
				id="standard-multiline-static"
				sx={{
					width: '100%',
					mb: '20px',
				}}
				label="City"
				defaultValue={address.city}
				onChange={(e) =>
					setAddress({
						...address,
						city: e.target.value,
					})
				}
			/>

			<TextField
				size="small"
				id="standard-multiline-static"
				sx={{
					width: '100%',
					mb: '20px',
				}}
				label="State"
				defaultValue={address.state}
				onChange={(e) =>
					setAddress({
						...address,
						state: e.target.value,
					})
				}
			/>

			<TextField
				size="small"
				id="standard-multiline-static"
				sx={{
					width: '100%',
					mb: '20px',
				}}
				label="Zip Code"
				defaultValue={address.zip}
				onChange={(e) =>
					setAddress({
						...address,
						zip: e.target.value,
					})
				}
			/>
		</div>
	);

	const contentFormStepThree = (
		<div>
			<TextField
				type="number"
				sx={{
					width: '100%',
				}}
				size="small"
				id="outlined-required"
				label="Estimated hours required."
				placeholder="How many hours do you think the job requires?"
				onChange={(e) => setHours(e.target.value)}
			/>
			<br />
			<br />
			<TextField
				type="number"
				sx={{
					width: '100%',
				}}
				size="small"
				id="outlined-required"
				label="Estimated hourly budget in $"
				placeholder="What's your hourly budget in $?"
				onChange={(e) => setHourlyBudget(e.target.value)}
			/>
			<br />
			<br />
			<TextField
				type="number"
				sx={{
					width: '100%',
				}}
				size="small"
				id="outlined-required"
				label="Overall budget if applicable."
				placeholder="What's your soft budget overall in $?"
				onChange={(e) => setOverallBudget(e.target.value)}
			/>
		</div>
	);

	return (
		<Box
			sx={{
				width: '100%',
			}}
		>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === steps.length ? (
				// eslint-disable-next-line react/jsx-fragments
				<React.Fragment>
					<Typography
						sx={{
							padding: '6%',
							fontFamily:
								"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
							fontWeight: 400,
							fontStyle: 'normal',
							fontSize: '18px',
							// letterSpacing: '.3rem',
						}}
					>
						Sit back and relax! Our service matching algorithm will
						find suitable pros near you that can handle all your
						needs in a jiffy. Service Providers will be able to see
						your posted job and reach out to you with their
						proposals. You might also want to keep an eye on your
						inbox for this new job.
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Box sx={{ flex: '1 1 auto' }} />
						<Button onClick={handleReset}>Reset</Button>
						<Button onClick={handleSubmit2}>Submit</Button>
					</Box>
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="form-container">
						{activeStep === 0 && contentFormStepOne}
						{activeStep === 1 && contentFormStepTwo}
						{activeStep === 2 && contentFormStepThree}
					</div>

					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Button
							color="inherit"
							disabled={activeStep === 0}
							onClick={handleBack}
							sx={{ mr: 1 }}
						>
							Back
						</Button>
						<Box sx={{ flex: '1 1 auto' }} />

						<Button onClick={handleNext}>
							{activeStep === steps.length - 1
								? 'Finish'
								: 'Next'}
						</Button>
					</Box>
				</React.Fragment>
			)}
		</Box>
	);
}
