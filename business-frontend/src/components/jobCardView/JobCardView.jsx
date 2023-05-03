import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './JobCardView.css';

export default function JobCardView() {
	return (
		<Card
			sx={{
				minWidth: 275,
				maxWidth: 888,
				height: 200,
				margin: 5,
				// backgroundColor: '#ececec',
			}}
		>
			<CardContent>
				<div className="job-card-container">
					<div>
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
								Construction Job Data Title
							</Typography>
							<div className="job-review">
								<Typography
									sx={{
										display: { xs: 'none', md: 'flex' },
										fontFamily: 'National',
										fontStyle: 'normal',
										fontSize: '14px',
										// letterSpaci
									}}
									color="text.secondary"
								>
									0 active proposals
								</Typography>
							</div>

							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								Address and then some service logos | Maybe
								Estimates
							</Typography>
							<Typography variant="body2">
								Job Description
							</Typography>
						</div>
					</div>
					<div className="job-card-actions">
						<Button
							size="small"
							variant="contained"
							sx={{
								textTransform: 'unset',
								backgroundColor: '#385170',
							}}
						>
							Create Proposal
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
