/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';

import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GrassIcon from '@mui/icons-material/Grass';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import RoofingIcon from '@mui/icons-material/Roofing';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import './LandingSearch.css';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
// import { fontSize } from '@mui/system';
// import logo from '../../logo.png';

export default function LandingSearch() {
	const token = useSelector((state) => state.user.token);
	const [services, setServides] = useState([]);
	useEffect(() => {
		axios
		.get(`${API_URL}/users/get-services`,{
			headers:{
				'Authorization':token
			}
		})
		.then((response) => {
			console.log('response is',response.data.message);
			setServides(response.data.message);
		})
	}, []);
	return (
		<section className="ls-bg">
			<div>
				<Typography
					variant="h2"
					noWrap
					component="h2"
					sx={{
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'National Bold',
						fontWeight: 700,
						fontStyle: 'normal',
						fontSize: '56px',
						// letterSpacing: '.3rem',
						color: '#2b4450',
					}}
				>
					Karya - get things done.
				</Typography>
			</div>
			<div className="ls-search-container">
				<Autocomplete
					className="ls-search"
					freeSolo
					id="free-solo-2-demo"
					disableClearable
					size="small"
					options={services.map((option) => option.name)}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Find services popular near you."
							InputProps={{
								...params.InputProps,
								type: 'search',
							}}
						/>
					)}
				/>
				<Button
					variant="contained"
					sx={{
						textTransform: 'unset',
					}}
				>
					Search
				</Button>
			</div>
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
		</section>
	);
}
