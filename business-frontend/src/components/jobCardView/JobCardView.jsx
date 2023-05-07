import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import Button from '@mui/material/Button';
import { CardActions, CardHeader, Chip } from '@mui/material';
import './JobCardView.css';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import { ProposalCreationForm } from '../proposalCreator/ProposalCreator';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useSelector } from 'react-redux';

export default function JobCardView({ job, trigger }) {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [openCreateProposal, setOpenCreateProposal] = React.useState(false);
	const open = Boolean(anchorEl);
	const [description, setDescription] = React.useState('');
	const [estimatedHours, setEstimatedHours] = React.useState('');
	const [estimatedHourlyRate, setEstimatedHourlyRate] = React.useState('');
	const [estimatedOverallRate, setEstimatedOverallRate] = React.useState('');
	const token = useSelector((state) => state.business.token);

	const handleClickOpenCP = () => {
		setOpenCreateProposal(true);
	};

	const handleCloseCP = () => {
		setOpenCreateProposal(false);
	};

	const handleCreateProposalSubmit = () => {
		axios
			.post(
				`${API_URL}/business/users/post-proposal`,
				{
					description,
					hours: estimatedHours,
					hourlyRate: estimatedHourlyRate,
					price: estimatedOverallRate,
					job: job._id,
					toNumber: job.user.phone,
					name: job.name,
				},
				{
					headers: {
						Authorization: token,
					},
				},
			)
			.then((response) => {
				console.log('response is', response.data.message);
				// setJobs(response.data.message);
				handleCloseCP();
				trigger();
			});
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const getStatusChip = (status) => {
		console.log(job.status);
		if (status === 'Posted')
			return (
				<Chip
					sx={{ bgcolor: '#9575cd', color: 'white' }}
					label="Posted"
				/>
			);
		if (status === 'Accepted')
			return <Chip sx={{ bgcolor: '#26c6da' }} label="Accepted" />;
		if (status === 'In Progress')
			return <Chip sx={{ bgcolor: '#26a69a' }} label="In Progress" />;
		if (status === 'Delayed')
			return <Chip sx={{ bgcolor: '#ffe082' }} label="Delayed" />;
		if (status === 'Completed')
			return (
				<Chip
					sx={{ bgcolor: '#3f51b5', color: 'white' }}
					label="Completed"
				/>
			);
		if (status === 'Closed Complete')
			return (
				<Chip
					sx={{ bgcolor: '#2e7d32', color: 'white' }}
					label="Closed - Complete"
				/>
			);
		if (status === 'Closed Incomplete')
			return (
				<Chip
					sx={{ bgcolor: '#607d8b', color: 'white' }}
					label="Closed - Incomplete"
				/>
			);

		if (status === 'PROPOSAL-ACCEPTED')
			return (
				<Chip
					sx={{ bgcolor: '#607d8b', color: 'white' }}
					label="Closed - Incomplete"
				/>
			);
	};

	const getCardActions = (status) => {
		if (status === 'Posted') return getCreateProposalButton();
		if (status === 'Accepted') return getMarkInProgressButton();
		if (status === 'In Progress') return getMarkCompletedButton();
		if (status === 'PROPOSAL-ACCEPTED') return getMarkCompletedButton();
	};

	const getCreateProposalButton = () => {
		return <MenuItem onClick={createProposal}>Create a Proposal</MenuItem>;
	};

	const getMarkInProgressButton = () => {
		return <MenuItem onClick={markInProgress}>Mark 'In Progress'</MenuItem>;
	};

	const getMarkCompletedButton = () => {
		return <MenuItem onClick={markCompleted}>Mark 'Completed'</MenuItem>;
	};

	const markInProgress = () => {
		updateStatus('In Progress');
	};
	const markCompleted = () => {
		updateStatus('Completed');

	};
	const createProposal = () => {
		handleClickOpenCP();
	};

	const updateStatus = (status) =>{
		axios
			.post(
				`${API_URL}/business/users/update-status`,
				{
					jobId:job._id,
					status,
					phone1: job.user.phone
				},
				{
					headers: {
						Authorization: token,
					},
				},
			)
			.then((response) => {
				console.log('response is', response.data.message);
				// setJobs(response.data.message);
				trigger();
			});
	}
	return (
		<Card
			sx={{
				minWidth: 400,
				maxWidth: 700,
				// height: 230,
				margin: 5,
				// backgroundColor: '#ececec',
			}}
		>
			<CardHeader
				action={
					<IconButton
						aria-label="more"
						id="long-button"
						aria-controls={open ? 'long-menu' : undefined}
						aria-expanded={open ? 'true' : undefined}
						aria-haspopup="true"
						onClick={handleClick}
					>
						<MoreVertIcon />
					</IconButton>
				}
				title={
					<div className="job-title">
						<Typography
							variant="h3"
							noWrap
							component="h3"
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontFamily:
									"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
								fontWeight: 600,
								fontStyle: 'normal',
								fontSize: '22px',
								// letterSpacing: '.3rem',
							}}
						>
							{job.name}
						</Typography>
						{getStatusChip(job.status)}
					</div>
				}
				subheader={`${job.proposals.length} active proposals`}
			/>
			<CardContent onClick={() => navigate(`/job-overview/${job._id}`)}>
				<div className="job-card-container">
					<div>
						<div>
							<Typography
								sx={{
									mb: '7px',
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									fontSize: '14px',
									// letterSpacing: '.3rem',
								}}
								color="text.secondary"
							>
								{

									'Estimated Time(hrs): ' +
									job.estimatedTime + 
									'|| Estimated Hourly Budget($): ' +
									job.estimatedHourlyBudget +
									' || Estimated Budget($): ' +
									job.estimatedBudget 
									}
							</Typography>
							<Typography
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									// fontWeight: 400,
									fontSize: '16px',
									// letterSpacing: '.3rem',
								}}
							>
								{job.description}
							</Typography>
						</div>
					</div>
					{/* <div className="job-card-actions">
						<ProposalCreator job={job} trigger={trigger} />
					</div> */}
				</div>
			</CardContent>
			<CardActions>
				<Button
					onClick={() => {
						navigate(`/chat/${job._id}`);
					}}
					startIcon={<ChatIcon />}
					sx={{
						ml: '5px',
						fontFamily:
							"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
						textTransform: 'unset',
					}}
				>
					Open Chat
				</Button>
			</CardActions>
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{getCardActions(job.status)}
			</Menu>
			<Dialog open={openCreateProposal} onClose={handleClose}>
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
					<Button onClick={handleCloseCP}>Cancel</Button>
					<Button onClick={handleCreateProposalSubmit}>Create</Button>
				</DialogActions>
			</Dialog>
			{/* <Chip
				sx={{
					marginLeft: '20px',
					marginBottom: '20px',
				}}
				color="success"
				label="Status"
			/> */}
		</Card>
	);
}
