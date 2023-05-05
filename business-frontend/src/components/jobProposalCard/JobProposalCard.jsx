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
		<Card sx={{ width: 750, maxWidth: 888, height: 200, margin: 5 }}>
			<CardContent>
				<div className="jp-card-container">
					<div>
						<Typography
							variant="h3"
							noWrap
							component="h3"
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'National Bold',
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
									fontFamily: 'National',
									fontStyle: 'normal',
									fontSize: '12px',
									// letterSpaci
								}}
								color="text.secondary"
							>
								200 Reviews
							</Typography>
						</div>

						<Typography sx={{ mb: 1.5 }} color="text.secondary">
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
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'National Bold',
								fontWeight: 400,
								fontStyle: 'normal',
								fontSize: '16px',
								// letterSpacing: '.3rem',
							}}
							variant="body2"
						>
							{proposal.description}
							{'hours: ' +
								proposal.hours +
								' :hourlyRate ' +
								proposal.hourlyRate +
								' hours ' +
								proposal.hours}
						</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
