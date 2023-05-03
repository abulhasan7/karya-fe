/* eslint-disable react/destructuring-assignment */
/* eslint-disable function-paren-newline */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Carousel from 'react-material-ui-carousel';
import LaunchIcon from '@mui/icons-material/Launch';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// import MenuIcon from '@mui/icons-material/Menu';
import HubIcon from '@mui/icons-material/Hub';
import './BusinessOverview.css';
import MenuBar from '../../components/menubar/MenuBar';
import { useLocation } from 'react-router-dom';

export default function BusinessOverview() {
	const location = useLocation();
	const businessData = location.state;
	console.log("businessdata is", businessData);

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	const items = [
		{
			name: 'Random Name #1',
			description: 'Probably the most random thing you have ever seen!',
		},
		{
			name: 'Random Name #2',
			description: 'Hello World!',
		},
	];

	return (
		<div>
			<MenuBar />
			<div className="bso-main-container">
				<div className="bso-details">
					<div className="bso-details-header">
						<Avatar sx={{ height: '90px', width: '90px' }} src ={businessData.primaryImage}/>
						<div>
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
										fontSize: '48px',
										// letterSpacing: '.3rem',
										color: 'primary',
									}}
								>
									{businessData.name}
								</Typography>
							</div>
							<div className="bso-review-con">
								<Rating
									icon={
										<FavoriteIcon
											color="#f77367"
											sx={{ color: '#f77367' }}
										/>
									}
									emptyIcon={<FavoriteBorderIcon />}
									defaultValue={3}
									readOnly
								/>
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
									//TODO 200 Reviews
								</Typography>
							</div>
						</div>
					</div>
					<Divider />
					{/* <div className="bso-details-highlights">
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
								Highlights from the Business
							</Typography>
						</div>
						<div>
							<div className="ls-services">
								<Button
									size="large"
									startIcon={<BusinessCenterIcon />}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										textTransform: 'unset',
									}}
								>
									Handyperson
								</Button>
								<Button
									size="large"
									startIcon={<GrassIcon />}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										textTransform: 'unset',
									}}
								>
									Landscaping
								</Button>
								<Button
									size="large"
									startIcon={<PlumbingIcon />}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										textTransform: 'unset',
									}}
								>
									Plumbing
								</Button>
								<Button
									size="large"
									startIcon={<ElectricalServicesIcon />}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										textTransform: 'unset',
									}}
								>
									Electrical
								</Button>
								<Button
									size="large"
									startIcon={<RoofingIcon />}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										textTransform: 'unset',
									}}
								>
									Roofing
								</Button>
							</div>
						</div>
					</div> */}
					<Divider />
					<div className="bso-details-highlights">
						<div>
							<Typography
								variant="h4"
								noWrap
								component="h4"
								sx={{
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'National',
									fontWeight: 600,
									fontStyle: 'normal',
									fontSize: '18px',
									// letterSpacing: '.3rem',
									color: 'primary',
								}}
							>
								Services Offered
							</Typography>
						</div>

						<List dense>
							{
								businessData.services.map(i => (<ListItem>
									<ListItemText
										primary={i.service.name}
										secondary={i.rate+' $/hr'}
									/>
								</ListItem>))
							}
						</List>
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
								About the Business
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
							>{ businessData.about }
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
								Photos & Media
							</Typography>
						</div>
						<div className="bso-img-carousel">
							<Carousel>
								{businessData.secondaryImages.map((item, i) => (
									<ItemImage item={item} />
								))}
							</Carousel>
						</div>
					</div>
				</div>
				<div className="bso-side-card">
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
							endIcon={<LaunchIcon />}
						>
							Visit Website
						</Button>
						<Divider />

						<Button
							variant="contained"
							size="small"
							sx={{
								textTransform: 'unset',
								width: '100%',
								mt: '10px',
							}}
							endIcon={<ChatIcon />}
						>
							Connect over chat
						</Button>
					</Paper>
				</div>
			</div>
		</div>
	);
}

function ItemImage(props) {
	return (
		<Paper
			sx={{
				height: 500,
				width: 500
				
			}}
		>
		<img src={props.item} height={500} width={500}></img>
		</Paper>
	);
}
