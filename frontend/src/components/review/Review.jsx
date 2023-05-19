import * as React from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import './Review.css';

import axios from 'axios';
import { API_URL } from '../../constants';
import { useSelector } from 'react-redux';
export default function Review({openReview,setOpenReview,job,serviceProvider,update }) {
	const [rating, setRating] = React.useState('');
	const [description, setDescription] = React.useState('');
	const token = useSelector((state) => state.user.token);
	const handleClickOpen = () => {
		setOpenReview(true);
	};

	const handleClose = () => {
		update(rating);
		setOpenReview(false);

	};

	const handleSubmit = ()=>{
		axios
			.post(`${API_URL}/users/review`,{
				rating,
				description,
				job,
				serviceProvider:serviceProvider._id,
			}, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				// setJobs(response.data.message);
				handleClose();
			});
	};
	return (
		<div>
			<Dialog open={openReview} onClose={handleClose}>
				<DialogTitle>Post a review</DialogTitle>
				<DialogContent
					sx={{
						width: '550px',
					}}
				>
					<DialogContentText>
						Please use the following form to review the service provided by your Service Provider.
					</DialogContentText>
					<ProposalCreationForm
						setRating={setRating}
						setDescription = {setDescription}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Submit Review</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export function ProposalCreationForm({
	setRating,setDescription
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
					label="Rating"
					rows={1}
					placeholder="Rating in Decimal e.g 4.0"
					variant="standard"
					onChange={(e) => setRating(e.target.value)}
				/>				
				<TextField
					size="small"
					id="standard-multiline-static"
					sx={{
						width: '100%',
					}}
					label="Description"
					multiline
					rows={6}
					placeholder="Provide a detailed review if possible"
					variant="standard"
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
		</div>
	);
}
