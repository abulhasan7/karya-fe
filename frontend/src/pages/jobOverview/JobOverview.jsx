/* eslint-disable function-paren-newline */
import * as React from 'react';
import { Divider, Typography, Paper, Chip } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import MenuBar from '../../components/menubar/MenuBar';

import './JobOverview.css';
import JobProposalCard from '../../components/jobProposalCard/JobProposalCard';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

export default function JobOverview() {
	let { id } = useParams();
	const navigate = useNavigate();
	const token = useSelector((state) => state.user.token);
	const [job, setJob] = useState('');
	const [trigger, setTrigger] = useState('');
	const [review,setReview] = useState(0);
	console.log('id is', id);

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
			return (
				<Chip
					size="small"
					sx={{ bgcolor: '#26c6da' }}
					label="Accepted"
				/>
			);
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
	};

	const getStatusActions = (status) => {
		if (status === 'Completed') return getMarkClosedCompleteButton();
		else if (status === 'Closed Complete' || status === 'Closed Incomplete')
			return;
		return getMarkClosedIncompleteButton();
	};

	const getMarkClosedCompleteButton = () => {
		return (
			<Button
				size="small"
				variant="contained"
				sx={{
					textTransform: 'unset',
					backgroundColor: '#385170',
					width: '100%',
					mb: '10px',
				}}
				endIcon={<DoneAllIcon />}
				onClick={handleMarkClosedComplete}
			>
				Mark 'Closed - Complete'
			</Button>
		);
	};

	const getMarkClosedIncompleteButton = () => {
		return (
			<Button
				size="small"
				variant="contained"
				sx={{
					textTransform: 'unset',
					backgroundColor: '#385170',
					width: '100%',
					mb: '10px',
				}}
				endIcon={<UnpublishedIcon />}
				onClick={handleMarkClosedIncomplete}
			>
				Mark 'Closed - Incomplete'
			</Button>
		);
	};

	const handleMarkClosedComplete = () => {
		updateStatus('Closed Complete');
	};
	const handleMarkClosedIncomplete = () => {
		updateStatus('Closed Incomplete');
	};

	const updateStatus = (status) => {
		const phone2 = job.serviceProvider ? job.serviceProvider.phone : null;
		axios
			.post(
				`${API_URL}/users/update-status`,
				{
					jobId: job._id,
					status,
					phone2: phone2,
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
				setTrigger('z');
			});
	};

	useEffect(() => {
		axios
			.get(`${API_URL}/users/get-job?jobId=${id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				setJob(response.data.message);
				setReview(response.data.message.review.rating);
			});
	}, [trigger]);
	function generate(element) {
		return [0, 1, 2].map((value) =>
			React.cloneElement(element, {
				key: value,
			}),
		);
	}
	return (
		<div>
			<MenuBar />
			<div className="jo-main-container">
				<div className="jo-details">
					<div>
						<div className="jo-name">
							<Typography
								variant="h2"
								noWrap
								component="h2"
								sx={{
									mr: 2,
									display: { xs: 'none', md: 'flex' },
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									fontWeight: 700,
									fontStyle: 'normal',
									fontSize: '32px',
									// letterSpacing: '.3rem',
									color: 'primary',
								}}
							>
								{job.name}
							</Typography>
							{getStatusChip(job.status)}
						</div>
						<Rating
									icon={
										<FavoriteIcon
											color="#f77367"
											sx={{ color: '#f77367' }}
										/>
									}
									emptyIcon={<FavoriteBorderIcon />}
									defaultValue={review}
									readOnly
									value={review}
								/> 
						
						<Typography
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontFamily:
									"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
								fontStyle: 'normal',
								fontSize: '14px',
							}}
							color="text.secondary"
						>
							{job.proposals ? job.proposals.length : 0} Active
							Proposals
						</Typography>
					</div>
					<Divider />
					<div className="bso-details-highlights">
						<div>
							<Typography
								variant="h4"
								noWrap
								component="h4"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									fontWeight: 600,
									fontStyle: 'normal',
									fontSize: '18px',
									// letterSpacing: '.3rem',
									color: 'primary',
								}}
							>
								Description
							</Typography>
						</div>
						<br />
						<div>
							<Typography
								variant="p"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									fontWeight: 400,
									fontStyle: 'normal',
									fontSize: '18px',
									// letterSpacing: '.3rem',
									color: 'text.secondary',
								}}
							>
								{job.description}
							</Typography>
						</div>
					</div>
					<Divider />
					<div className="bso-details-highlights">
						<div>
							<Typography
								variant="h4"
								noWrap
								component="h4"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									fontWeight: 600,
									fontStyle: 'normal',
									fontSize: '18px',
									// letterSpacing: '.3rem',
									color: 'primary',
								}}
							>
								Estimates and Budget
							</Typography>
						</div>
						<br />
						<div>
							<List dense>
								<ListItem>
									<ListItemText
										primaryTypographyProps={{
											sx: {
												fontFamily:
													"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
												fontWeight: 600,
												fontStyle: 'normal',
												fontSize: '15px',
											},
										}}
										secondaryTypographyProps={{
											sx: {
												fontFamily:
													"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
												fontWeight: 400,
												fontStyle: 'normal',
												color: 'text.secondary',
											},
										}}
										primary={'Estimated Time'}
										secondary={
											job.estimatedTime + ' hour(s)'
										}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primaryTypographyProps={{
											sx: {
												fontFamily:
													"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
												fontWeight: 600,
												fontStyle: 'normal',
												fontSize: '15px',
											},
										}}
										secondaryTypographyProps={{
											sx: {
												fontFamily:
													"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
												fontWeight: 400,
												fontStyle: 'normal',
												color: 'text.secondary',
											},
										}}
										primary={'Estimated Hourly Budget'}
										secondary={
											job.estimatedHourlyBudget + ' $'
										}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primaryTypographyProps={{
											sx: {
												fontFamily:
													"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
												fontWeight: 600,
												fontStyle: 'normal',
												fontSize: '15px',
											},
										}}
										secondaryTypographyProps={{
											sx: {
												fontFamily:
													"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
												fontWeight: 400,
												fontStyle: 'normal',
												color: 'text.secondary',
											},
										}}
										primary={'Estimated Budget'}
										secondary={job.estimatedBudget + ' $'}
									/>
								</ListItem>
							</List>
						</div>
					</div>
					<Divider />
					{job.acceptedProposal && (
						<div className="bso-details-highlights">
							<div>
								<Typography
									variant="h4"
									noWrap
									component="h4"
									sx={{
										display: { xs: 'none', md: 'flex' },
										fontFamily:
											"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
										fontWeight: 600,
										fontStyle: 'normal',
										fontSize: '18px',
										// letterSpacing: '.3rem',
										color: 'primary',
									}}
								>
									{'Accepted Proposal'}
								</Typography>
							</div>
							<JobProposalCard
								proposal={job.acceptedProposal}
								isAccepted={true}
							/>
						</div>
					)}
					{!job.acceptedProposal && (
						<div className="bso-details-highlights">
							<div>
								<Typography
									variant="h4"
									noWrap
									component="h4"
									sx={{
										display: { xs: 'none', md: 'flex' },
										fontFamily:
											"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
										fontWeight: 600,
										fontStyle: 'normal',
										fontSize: '18px',
										// letterSpacing: '.3rem',
										color: 'primary',
									}}
								>
									{'Proposals'}
								</Typography>
							</div>
							{job.proposals &&
								job.proposals.map((j) => (
									<JobProposalCard
										proposal={j}
										trigger={setTrigger}
										name={job.name}
									/>
								))}
						</div>
					)}
				</div>
				<div className="jo-side-card">
					<Paper
						sx={{
							width: '300px',
							padding: '15px',
						}}
					>
						{getStatusActions(job.status)}
						<Divider />
						{job && job.status !== 'Posted' && (
							<Button
								onClick={() => {
									navigate(`/chat/${job._id}`);
								}}
								size="small"
								variant="contained"
								endIcon={<ChatIcon />}
								sx={{
									mt: '15px',
									mb: '5px',
									width: '100%',
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									textTransform: 'unset',
								}}
							>
								Open Chat
							</Button>
						)}
					</Paper>
				</div>
			</div>
		</div>
	);
}
