import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

// import MenuIcon from '@mui/icons-material/Menu';
import HubIcon from '@mui/icons-material/Hub';
import './BusinessOverview.css';

export default function BusinessOverview() {
	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));
	return (
		<div className="bso-main-container">
			<div className="bso-details">
				<div className="bso-details-header">
					<Avatar sx={{ height: '70px', width: '70px' }} />
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
									fontSize: '30px',
									// letterSpacing: '.3rem',
									color: 'primary',
								}}
							>
								Alon Design and Remodeling
							</Typography>
						</div>
						<div className="bso-review-con">
							<Rating name="read-only" value={2} readOnly />
						</div>
					</div>
				</div>
			</div>
			<div>
				<Paper>
					{' '}
					<Stack spacing={2}>
						<Item>Item 1</Item>
						<Item>Item 2</Item>
						<Item>Item 3</Item>
					</Stack>
				</Paper>
			</div>
		</div>
	);
}
