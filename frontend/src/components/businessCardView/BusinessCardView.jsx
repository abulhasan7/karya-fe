import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './BusinessCardView.css';

const bull = (
	<Box
		component="span"
		sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
	>
		•
	</Box>
);

export default function BusinessCardView() {
	return (
		<Card sx={{ minWidth: 275, maxWidth: 888, height: 200, margin: 10 }}>
			<CardContent>
				<div className="bv-card-container">
					<div className="bv-img">
						<img src="" alt="img goes here"></img>
					</div>
					<div>
						<Typography variant="h6" component="div">
							Dugarry Construction
						</Typography>
						<Typography
							sx={{ fontSize: 14 }}
							color="text.secondary"
							gutterBottom
						>
							Reviews
						</Typography>

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
