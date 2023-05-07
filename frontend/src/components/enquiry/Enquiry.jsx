import * as React from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import './Enquiry.css';

import axios from 'axios';
import { API_URL } from '../../constants';
import { useSelector } from 'react-redux';
export default function Enquiry({businessData }) {
	const [open, setOpen] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const token = useSelector((state) => state.user.token);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = ()=>{
		axios
			.post(`${API_URL}/users/enquiry`,{
				message,
				serviceProvider: businessData._id,
				toNumber: businessData.phone
			}, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				// setJobs(response.data.message);
				handleClose();
				trigger();
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
				Create Enquiry
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create Enquiry</DialogTitle>
				<DialogContent
					sx={{
						width: '550px',
					}}
				>
					<DialogContentText>
						Please use the following form to send your enquiry to the Service Provider.
					</DialogContentText>
					<ProposalCreationForm
						setMessage={setMessage}
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
	setMessage
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
					onChange={(e) => setMessage(e.target.value)}
				/>
			</div>
		</div>
	);
}
