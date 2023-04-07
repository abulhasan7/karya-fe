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
// import { fontSize } from '@mui/system';
// import logo from '../../logo.png';

export default function LandingSearch() {
	const top100Films = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Godfather: Part II', year: 1974 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: '12 Angry Men', year: 1957 },
		{ title: "Schindler's List", year: 1993 },
		{ title: 'Pulp Fiction', year: 1994 },
	];
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
						color: 'primary',
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
					options={top100Films.map((option) => option.title)}
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
