import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './JobCardView.css';
import { useNavigate } from 'react-router-dom';

export default function JobCardView({job}) {
	const navigate = useNavigate();
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
								{job.name}
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
									{job.proposals.length} active proposals
								</Typography>
							</div>

							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								{'estimatedBudget'+job.estimatedBudget+"estimatedHourlyBudget: "+job.estimatedHourlyBudget+"estimatedTime:"+job.estimatedTime}
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
					<div className="job-card-actions">
						<Button
							size="small"
							variant="contained"
							sx={{
								textTransform: 'unset',
								backgroundColor: '#385170',
							}}
							onClick={()=>navigate('/create-proposal',{state:job})}
						>
							Create Proposal
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
