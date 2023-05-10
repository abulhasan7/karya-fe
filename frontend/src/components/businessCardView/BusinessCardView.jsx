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
import { useNavigate } from 'react-router-dom';

export default function BusinessCardView({ data }) {
	const navigate = useNavigate();
	return (
		<Card
			sx={{ minWidth: 275, maxWidth: 888, margin: 5 }}
			onClick={() => navigate('/business-overview', { state: data })}
		>
			<CardContent>
				<div className="bv-card-container">
					<div className="bv-img">
						<img
							src={data.primaryImage}
							alt="img goes here"
							height={150}
							width={150}
						></img>
					</div>
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
								fontSize: '20px',
								// letterSpacing: '.3rem',
							}}
						>
							{data.name}
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
								defaultValue={data.avgReview}
								readOnly
							/>
							<Typography
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									fontStyle: 'normal',
									fontSize: '12px',
									// letterSpaci
								}}
								color="text.secondary"
							>
								{data.reviews} reviews
							</Typography>
						</div>

						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							{data.address.street +
								', ' +
								data.address.city +
								', ' +
								data.address.state +
								', ' +
								data.address.zip}
						</Typography>
						<Typography
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontFamily:
									"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
								fontStyle: 'normal',
								fontSize: '16px',
								// letterSpaci
							}}
						>
							{data.about}
						</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
