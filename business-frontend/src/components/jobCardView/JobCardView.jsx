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
	return (
		<Card
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
						<Chip sx={{}} color="success" label="Status" />
					</div>
				}
				subheader={`${job.proposals.length} active proposals`}
			/>
			<CardContent>
				<div className="job-card-container">
					<div>
						<div>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								{'estimatedBudget' +
									job.estimatedBudget +
									'estimatedHourlyBudget: ' +
									job.estimatedHourlyBudget +
									'estimatedTime:' +
									job.estimatedTime}
							</Typography>
							<Typography
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'National Bold',
									fontWeight: 400,
									fontStyle: 'normal',
									fontSize: '16px',
									// letterSpacing: '.3rem',
								}}
								variant="body2"
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
				<MenuItem> Create Proposal</MenuItem>
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
