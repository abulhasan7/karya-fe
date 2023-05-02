/* eslint-disable function-paren-newline */
import * as React from 'react';
import { Divider, Typography, Paper } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

import MenuBar from '../../components/menubar/MenuBar';

import './JobOverview.css';
import JobProposalCard from '../../components/jobProposalCard/JobProposalCard';

export default function JobOverview() {
	function generate(element) {
		return [0, 1, 2].map((value) =>
			React.cloneElement(element, {
				key: value,
			}),
		);
	}
	return (
		<div>
			<MenuBar />
			<div className="jo-main-container">
				<div className="jo-details">
					<div className="bso-name">
						<Typography
							variant="h2"
							noWrap
							component="h2"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'National Bold',
								fontWeight: 900,
								fontStyle: 'normal',
								fontSize: '32px',
								// letterSpacing: '.3rem',
								color: 'primary',
							}}
						>
							Job Title will go here
						</Typography>

						<Typography
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'National',
								fontStyle: 'normal',
								fontSize: '14px',
							}}
							color="text.secondary"
						>
							Number of active job proposals will go here
						</Typography>
					</div>
					<Divider />
					<div className="bso-details-highlights">
						<div>
							<Typography
								variant="h4"
								noWrap
								component="h4"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'National Bold',
									fontWeight: 600,
									fontStyle: 'normal',
									fontSize: '18px',
									// letterSpacing: '.3rem',
									color: 'primary',
								}}
							>
								Description
							</Typography>
						</div>
						<br />
						<div>
							<Typography
								variant="p"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'National',
									fontWeight: 400,
									fontStyle: 'normal',
									fontSize: '18px',
									// letterSpacing: '.3rem',
									color: 'text.secondary',
								}}
							>
								Our craftsman services might be varied, but they
								all come with the same promise of quality,
								dedication and durability. Licensed and insured,
								SwiftVoltage, Inc. is an experienced contractor
								with trained professionals in residential and
								commercial standards. We offer a 5-year
								guarantee for all services rendered from the day
								of delivery.
							</Typography>
						</div>
					</div>
					<Divider />
					<div className="bso-details-highlights">
						<div>
							<Typography
								variant="h4"
								noWrap
								component="h4"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'National Bold',
									fontWeight: 600,
									fontStyle: 'normal',
									fontSize: '18px',
									// letterSpacing: '.3rem',
									color: 'primary',
								}}
							>
								Estimates and Budget
							</Typography>
						</div>
						<br />
						<div>
							<List dense>
								{generate(
									<ListItem>
										<ListItemText
											primaryTypographyProps={{
												sx: {
													fontFamily: 'National Bold',
													fontWeight: 600,
													fontStyle: 'normal',
													fontSize: '15px',
												},
											}}
											secondaryTypographyProps={{
												sx: {
													fontFamily: 'National Bold',
													fontWeight: 400,
													fontStyle: 'normal',
													color: 'text.secondary',
												},
											}}
											primary="Single-line item"
											secondary="Secondary text"
										/>
									</ListItem>,
								)}
							</List>
						</div>
					</div>
					<Divider />
					<div className="bso-details-highlights">
						<div>
							<Typography
								variant="h4"
								noWrap
								component="h4"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'National Bold',
									fontWeight: 600,
									fontStyle: 'normal',
									fontSize: '18px',
									// letterSpacing: '.3rem',
									color: 'primary',
								}}
							>
								Proposals
							</Typography>
						</div>
						<JobProposalCard />
						<JobProposalCard />
					</div>
				</div>
				<div className="jo-side-card">
					<Paper
						sx={{
							width: '300px',
							padding: '15px',
						}}
					>
						<Button
							variant="contained"
							size="small"
							sx={{
								textTransform: 'unset',
								width: '100%',
								mb: '10px',
							}}
							endIcon={<ReceiptIcon />}
						>
							Create Job Proposal
						</Button>
						<Divider />
					</Paper>
				</div>
			</div>
		</div>
	);
}
