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
import './BusinessCardView.css';

export default function BusinessCardView() {
	return (
		<Card sx={{ minWidth: 275, maxWidth: 888, height: 200, margin: 5 }}>
			<CardContent>
				<div className="bv-card-container">
					<div className="bv-img">
						<img src="" alt="img goes here"></img>
					</div>
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
								fontSize: '20px',
								// letterSpacing: '.3rem',
							}}
						>
							Dugarry Construction
						</Typography>
						<div className="bv-review">
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
						<Typography variant="body2">
							Business Description
						</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
