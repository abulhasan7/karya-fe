import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './JobCardView.css';
import { useNavigate } from 'react-router-dom';

export default function JobCardView({ job }) {
	const navigate = useNavigate();
	return (
		<Card
			onClick={() => navigate(`/job-overview/${job._id}`)}
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
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
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
										fontFamily:
											"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
										fontStyle: 'normal',
										fontSize: '14px',
										// letterSpaci
									}}
									color="text.secondary"
								>
									{job.proposals.length} active proposals
								</Typography>
							</div>

							<Typography
								sx={{
									fontFamily:
										"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
									mb: 1.5,
								}}
								color="text.secondary"
							>
								{'estimatedTime' +
									job.estimatedTime +
									'estimatedHourlyBudget' +
									job.estimatedHourlyBudget +
									'estimatedBudget' +
									job.estimatedBudget}
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
								{job.description}
							</Typography>
						</div>
					</div>
					<div className="job-card-actions">
						<Button
							size="small"
							// variant="contained"
							sx={{
								textTransform: 'unset',
								// backgroundColor: '#385170',
							}}
							color="error"
						>
							{job.status}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
