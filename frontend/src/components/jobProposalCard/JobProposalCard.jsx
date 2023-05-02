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
import './JobProposalCard.css';

export default function JobProposalCard() {
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
							Proposal made by Dugarry Construction
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
							Address and then some service logos
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
							Proposal Description
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
						>
							Reject
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
