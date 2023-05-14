import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from '@mui/material/Rating';
import ChatIcon from '@mui/icons-material/Chat';
import './JobProposalCard.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function JobProposalCard({
	proposal,
	isAccepted,
	trigger,
	name,
}) {
	console.log('proposal is', proposal);
	const [proposalState, setProposalState] = useState(proposal.status);
	const token = useSelector((state) => state.user.token);
	const navigate = useNavigate();

	const update = (status) => {
		axios
			.post(
				`${API_URL}/users/update-proposal`,
				{
					status: status,
					jobId: proposal.job,
					jobProposalId: proposal._id,
					serviceProviderId: proposal.serviceProvider._id,
					toNumber: proposal.serviceProvider.phone,
					name,
				},
				{
					headers: {
						Authorization: token,
					},
				},
			)
			.then((response) => {
				setProposalState(status);
				if (status == 'ACCEPTED') {
					trigger('m');
				}
			});
	};

	return (
		<Card sx={{ width: 750, maxWidth: 888, margin: 5 }}>
			<CardContent>
				<div className="jp-card-container">
					<div>
						<Typography
							variant="h3"
							noWrap
							component="h3"
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontFamily:
									"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
								fontWeight: 700,
								fontStyle: 'normal',
								fontSize: '18px',
								// letterSpacing: '.3rem',
							}}
						>
							Proposal made by {proposal.serviceProvider.name}
						</Typography>
						<div className="jp-review">
							<Rating
								icon={
									<FavoriteIcon
										color="#f77367"
										sx={{ color: '#f77367' }}
										fontSize="small"
									/>
								}
								emptyIcon={
									<FavoriteBorderIcon fontSize="small" />
								}
								defaultValue={3}
								readOnly
							/>
						</div>

						<Typography
							sx={{
								mb: 1.5,
								fontFamily:
									"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
							}}
							color="text.secondary"
						>
							{proposal.serviceProvider.address &&
								proposal.serviceProvider.address.street +
									', ' +
									proposal.serviceProvider.address.city +
									', ' +
									proposal.serviceProvider.address.state +
									', ' +
									proposal.serviceProvider.address.zip}
						</Typography>
						<Typography
							sx={{
								mb: 1.5,
								fontFamily:
									"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
							}}
							color="text.secondary"
						>
							{'Hours: ' +
								proposal.hours +
								' | ' +
								'Hourly Rate($): ' +
								proposal.hourlyRate +
								' | ' +
								'Total Price($): ' +
								proposal.price}
						</Typography>
						<Typography
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontFamily:
									"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
								fontWeight: 400,
								fontStyle: 'normal',
								fontSize: '16px',
								// letterSpacing: '.3rem',
							}}
							variant="body2"
						>
							{proposal.description}
						</Typography>
					</div>
					<div className="jp-card-actions">
						<Button
							size="small"
							variant="outlined"
							sx={{
								textTransform: 'unset',
							}}
							color="success"
							disabled={proposalState == 'ACCEPTED' || isAccepted}
							onClick={() => update('ACCEPTED')}
						>
							Accept
						</Button>
						<Button
							size="small"
							variant="outlined"
							sx={{
								textTransform: 'unset',
							}}
							color="error"
							disabled={proposalState == 'REJECTED' || isAccepted}
							onClick={() => update('REJECTED')}
						>
							Reject
						</Button>
					</div>
				</div>
			</CardContent>
			{proposal && (
				<CardActions>
					<Button
						onClick={() => {
							navigate(`/chat/${proposal._id}`);
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
		</Card>
	);
}
