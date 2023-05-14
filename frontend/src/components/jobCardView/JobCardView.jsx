import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions, CardHeader, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Review from '../review/Review';
import './JobCardView.css';

export default function JobCardView({ job, trigger }) {
	const token = useSelector((state) => state.user.token);
	const [openReview, setOpenReview] = React.useState(false);
	const rev = job.review ? job.review.rating : undefined;
	const [rating, setRating] = React.useState(rev);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const update = (rating) => {
		console.log('rating is', rating);
		setRating(rating);
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
		if (status === 'Completed') return getMarkClosedCompleteButton();
		else if (status === 'Closed Complete' && !rating)
			return getReviewButton();
		else if (status === 'Closed Complete' && rating) return;
		else if (status === 'Closed Incomplete') return;
		return getMarkClosedIncompleteButton();
	};

	const getReviewButton = () => {
		return (
			<MenuItem onClick={() => setOpenReview(true)}>
				Post a Review
			</MenuItem>
		);
	};

	const getMarkClosedCompleteButton = () => {
		return (
			<MenuItem onClick={markClosedComplete}>
				Mark 'Closed Complete'
			</MenuItem>
		);
	};

	const getMarkClosedIncompleteButton = () => {
		return (
			<MenuItem onClick={markClosedIncomplete}>
				Mark 'Closed Incomplete'
			</MenuItem>
		);
	};

	const markClosedComplete = () => {
		updateStatus('Closed Complete');
	};
	const markClosedIncomplete = () => {
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
				trigger();
			});
	};

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
						<div>
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

							{job.status == 'Closed Complete' && (
								<Rating
									icon={
										<FavoriteIcon
											color="#f77367"
											sx={{ color: '#f77367' }}
										/>
									}
									emptyIcon={<FavoriteBorderIcon />}
									// defaultValue={rating}
									readOnly
									value={rating}
								/>
							)}
						</div>

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
								{'Estimated Budget($): ' +
									job.estimatedBudget +
									' || Estimated Hourly Budget($): ' +
									job.estimatedHourlyBudget +
									' || Estimated Time(hrs): ' +
									job.estimatedTime}
							</Typography>

							<Typography
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									fontSize: '16px',
									// letterSpacing: '.3rem',
								}}
							>
								{job.description}
							</Typography>
						</div>
					</div>
				</div>
			</CardContent>
			{!rating && (
				<Review
					openReview={openReview}
					setOpenReview={setOpenReview}
					serviceProvider={job.serviceProvider}
					job={job._id}
					update={update}
				></Review>
			)}
			{job && job.status !== 'Posted' && job.proposals.length > 0 && (
				<CardActions>
					<Button
						onClick={() => {
							navigate(`/chat/${job.acceptedProposal}`);
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
			)}
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
		</Card>
	);
}
