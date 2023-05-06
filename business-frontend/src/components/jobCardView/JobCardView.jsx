import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';
import { CardActionArea, CardHeader, Chip } from '@mui/material';
import './JobCardView.css';
import { useNavigate } from 'react-router-dom';
import ProposalCreator from '../proposalCreator/ProposalCreator';

export default function JobCardView({ job, trigger }) {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
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
		if (status === 'Closed - Complete')
			return (
				<Chip
					sx={{ bgcolor: '#2e7d32', color: 'white' }}
					label="Closed - Complete"
				/>
			);
		if (status === 'Closed - Incomplete')
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
		if (status === 'Accepted') return getMarkInProgressButton();
		if (status === 'In Progress') return getMarkCompletedButton();
		if (status === 'PROPOSAL-ACCEPTED') return getMarkCompletedButton();
	};

	const getMarkInProgressButton = () => {
		return <MenuItem onClick={markInProgress}>Mark 'In Progress'</MenuItem>;
	};

	const getMarkCompletedButton = () => {
		return <MenuItem onClick={markCompleted}>Mark 'Completed'</MenuItem>;
	};

	const markInProgress = () => {};
	const markCompleted = () => {};

	return (
		<Card
			onClick={() => navigate(`/job-overview/${job._id}`)}
			sx={{
				minWidth: 400,
				maxWidth: 700,
				height: 225,
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
			<CardContent>
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
