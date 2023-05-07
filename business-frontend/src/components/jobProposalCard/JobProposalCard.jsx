import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from '@mui/material/Rating';
import './JobProposalCard.css';

export default function JobProposalCard({ proposal, isAccepted, trigger }) {
	return (
		<Card sx={{ width: 750, maxWidth: 888, height: 230, margin: 5 }}>
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
							<Typography
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									fontSize: '12px',
									// letterSpaci
								}}
								color="text.secondary"
							>
								200 Reviews
							</Typography>
						</div>

						<Typography
							sx={{
								mb: 1.5,
								fontFamily:
									"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
							}}
							color="text.secondary"
						>
							{proposal.serviceProvider.address.street +
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
								proposal.hourlyRate}
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
				</div>
			</CardContent>
		</Card>
	);
}
