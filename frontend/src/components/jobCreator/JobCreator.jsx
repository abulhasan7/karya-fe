/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Button from '@mui/material/Button';
import { Autocomplete, Input, InputAdornment } from '@mui/material';
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
	const [title, setTitle] = React.useState('');
	const [service, setService] = useState('');
	const [services, setServices] = useState([]);
	const [description, setDescription] = useState('');
	const [hours, setHours] = useState('');
	const [hourlyBudget, setHourlyBudget] = useState('');
	const [overallBudget, setOverallBudget] = useState('');
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
					bgcolor: 'honeydew',
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
				<DialogContent>
					<HorizontalLinearStepper
						setTitle={setTitle}
						setService={handleService}
						setDescription={setDescription}
						setHours={setHours}
						setHourlyBudget={setHourlyBudget}
						setOverallBudget={setOverallBudget}
						handleSubmit={handleSubmit}
						services={services}
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
						{...params}
						label="Categories"
						placeholder="Select categories which apply to your job."
						onSelect={setService}
					/>
				)}
			/>
			<br />
			<TextField
				size="small"
				id="standard-multiline-static"
				sx={{
					width: '100%',
				}}
				label="Description"
				multiline
				rows={6}
				placeholder="Please provide as many details here are possible."
				variant="standard"
				onChange={(e) => setDescription(e.target.value)}
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
		<Box sx={{ width: '100%' }}>
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
					<Typography sx={{ mt: 2, mb: 1 }}>
						All steps completed - you&apos;re finished
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
