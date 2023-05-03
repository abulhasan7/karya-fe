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
export default function ProposalCreator() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
					<ProposalCreationForm />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Create</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export function ProposalCreationForm() {
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
				/>
			</div>
		</div>
	);
}
