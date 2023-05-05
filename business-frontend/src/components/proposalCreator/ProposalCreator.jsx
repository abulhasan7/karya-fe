import * as React from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import './ProposalCreator.css';

import axios from 'axios';
import { API_URL } from '../../constants';
import { useSelector } from 'react-redux';
export default function ProposalCreator({ job }) {
	const [open, setOpen] = React.useState(false);
	const [description, setDescription] = React.useState('');
	const [estimatedHours, setEstimatedHours] = React.useState('');
	const [estimatedHourlyRate, setEstimatedHourlyRate] = React.useState('');
	const [estimatedOverallRate, setEstimatedOverallRate] = React.useState('');
	const token = useSelector((state) => state.business.token);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = ()=>{
		axios
			.post(`${API_URL}/business/users/post-proposal`,{
				description,
				hours:estimatedHours,
				hourlyRate:estimatedHourlyRate,
				price:estimatedOverallRate,
				job:job._id
			}, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				// setJobs(response.data.message);
			});
	};
	return (
		<div>
			<Button
				size="small"
				variant="contained"
				sx={{
					textTransform: 'unset',
					backgroundColor: '#385170',
					width: '100%',
					mb: '10px',
				}}
				endIcon={<ReceiptIcon />}
				onClick={handleClickOpen}
			>
				Create Proposal
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create Proposal</DialogTitle>
				<DialogContent
					sx={{
						width: '550px',
					}}
				>
					<DialogContentText>
						To express interest in this job, please enter below
						details. We will send updates occasionally.
					</DialogContentText>
					<ProposalCreationForm
						setDescription={setDescription}
						setEstimatedHourlyRate={setEstimatedHourlyRate}
						setEstimatedHours={setEstimatedHours}
						setEstimatedOverallRate={setEstimatedOverallRate}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Create</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export function ProposalCreationForm({
	setDescription,
	setEstimatedHourlyRate,
	setEstimatedHours,
	setEstimatedOverallRate,
}) {
	return (
		<div className="prop-form">
			<div>
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
					helperText="User has estimated so and so"
					onChange={(e) => setEstimatedHours(e.target.value)}
				/>
			</div>
			<div>
				<TextField
					type="number"
					sx={{
						width: '100%',
					}}
					size="small"
					id="outlined-required"
					label="Estimated hourly rate in $"
					placeholder="What's your hourly rate in $?"
					helperText="User has estimated so and so"
					onChange={(e) => setEstimatedHourlyRate(e.target.value)}
				/>
			</div>
			<div>
				<TextField
					type="number"
					sx={{
						width: '100%',
					}}
					size="small"
					id="outlined-required"
					label="Overall rate if applicable."
					placeholder="What's your soft rate overall in $?"
					helperText="User has estimated so and so"
					onChange={(e) => setEstimatedOverallRate(e.target.value)}
				/>
			</div>
		</div>
	);
}
