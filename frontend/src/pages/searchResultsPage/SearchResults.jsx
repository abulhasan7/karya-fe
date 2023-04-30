/* eslint-disable no-shadow */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import MenuBar from '../../components/menubar/MenuBar';
import BusinessCardView from '../../components/businessCardView/BusinessCardView';
import './SearchResults.css';

export default function SearchResults() {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyB18edUXRN-PEU4Dy_O7Qz_7Gr-5zgoA2E',
	});

	const center = {
		lat: 37.33548,
		lng: -121.893028,
	};

	const centers = [
		{
			lat: 37.337354274592336,
			lng: -121.88352480466776,
		},
		{
			lat: 37.335523903419435,
			lng: -121.88987243339844,
		},
		{
			lat: 37.33377773367742,
			lng: -121.88492147558694,
		},
	];

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback((map) => {
		// const bounds = new window.google.maps.LatLngBounds(center);
		// map.fitBounds(bounds);
		// setMap(map);
	}, []);

	const onUnmount = React.useCallback(() => {
		setMap(null);
	}, []);

	const containerStyle = {
		width: '100%',
		height: '100%',
	};

	return (
		<div>
			<MenuBar />
			<div className="sr-main-container">
				<div>Filters</div>
				<div className="sr-result-cards">
					<Typography
						variant="h2"
						noWrap
						component="h2"
						sx={{
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'National Bold',
							fontWeight: 700,
							fontStyle: 'normal',
							fontSize: '28px',
							// letterSpacing: '.3rem',
							color: '#2b4450',
						}}
					>
						Here are your matching service providers
					</Typography>
					<BusinessCardView />
					<BusinessCardView />
					<BusinessCardView />
				</div>
				<div>
					{isLoaded && (
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={center}
							zoom={14}
							onLoad={onLoad}
							onUnmount={onUnmount}
						>
							<Marker position={centers[0]} />
							<Marker position={centers[1]} />
							<Marker position={centers[2]} />
						</GoogleMap>
					)}
				</div>
			</div>
		</div>
	);
}