import * as React from 'react';
import Typography from '@mui/material/Typography';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import JoinLeftOutlinedIcon from '@mui/icons-material/JoinLeftOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import MenuBar from '../../components/menubar/MenuBar';
import LandingSearch from '../../components/landingSearch/LandingSearch';
import './LandingPage.css';

export default function LandingPage() {
	return (
		<div>
			<MenuBar></MenuBar>
			<LandingSearch></LandingSearch>
			<div className="hiw-main-container">
				<div>
					<Typography
						variant="h2"
						noWrap
						component="h2"
						sx={{
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'National Bold',
							fontWeight: 700,
							fontStyle: 'normal',
							fontSize: '32px',
							// letterSpacing: '.3rem',
							color: '#2b4450',
						}}
					>
						How it works
					</Typography>
				</div>
				<div className="hiw-info">
					<div className="hiw-step">
						<div>
							<MessageOutlinedIcon
								sx={{ height: '50px', width: '50px' }}
							/>
						</div>
						<div>
							<Typography
								variant="h2"
								noWrap
								component="h2"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'National Bold',
									fontWeight: 700,
									fontStyle: 'normal',
									fontSize: '18px',
									// letterSpacing: '.3rem',
									color: '#2b4450',
								}}
							>
								1. Tell us what your home needs
							</Typography>
						</div>

						<div>
							<Typography
								variant="p"
								component="p"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'National',
									fontWeight: 400,
									fontStyle: 'normal',
									fontSize: '16px',
									// letterSpacing: '.3rem',
									color: '#2b4450',
								}}
							>
								From routine maintenance and repairs to dream
								home renovations, we can help with any project —
								big or small.
							</Typography>
						</div>
					</div>
					<div className="hiw-step">
						<JoinLeftOutlinedIcon
							sx={{ height: '50px', width: '50px' }}
						/>
						<Typography
							variant="h2"
							noWrap
							component="h2"
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'National Bold',
								fontWeight: 700,
								fontStyle: 'normal',
								fontSize: '18px',
								// letterSpacing: '.3rem',
								color: '#2b4450',
							}}
						>
							2. Match you with personalized solutions
						</Typography>
						<div>
							<Typography
								variant="p"
								component="p"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'National',
									fontWeight: 400,
									fontStyle: 'normal',
									fontSize: '16px',
									// letterSpacing: '.3rem',
									color: '#2b4450',
								}}
							>
								See your price and book services in an instant.
								Or, request and compare quotes from highly rated
								pros near you.
							</Typography>
						</div>
					</div>
					<div className="hiw-step">
						<VerifiedOutlinedIcon
							sx={{ height: '50px', width: '50px' }}
						/>
						<Typography
							variant="h2"
							noWrap
							component="h2"
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'National Bold',
								fontWeight: 700,
								fontStyle: 'normal',
								fontSize: '18px',
								// letterSpacing: '.3rem',
								color: '#2b4450',
							}}
						>
							3. Start to finish, we have you covered
						</Typography>
						<div>
							<Typography
								variant="p"
								component="p"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'National',
									fontWeight: 400,
									fontStyle: 'normal',
									fontSize: '16px',
									// letterSpacing: '.3rem',
									color: '#2b4450',
								}}
							>
								When you book and pay with Angi, you’re covered
								by our Happiness Guarantee. We’ll cover your
								projects up to full purchase price, plus limited
								damage protection.
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
