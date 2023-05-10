/* eslint-disable no-shadow */
import * as React from 'react';
import Typography from '@mui/material/Typography';

// import MenuBar from '../../components/menubar/MenuBar';
import JobCardView from '../../components/jobCardView/JobCardView';
import './JobsListingPage.css';
import MenuBar from '../../components/menubar/MenuBar';
import { API_URL } from '../../../../business-frontend/src/constants';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function JobsListingPage() {
	const token = useSelector((state) => state.business.token);
	const [profile, setProfile] = useState(
		useSelector((state) => state.business.profile),
	);
	console.log('profile is', JSON.stringify(profile));
	const [jobs, setJobs] = useState([]);
	const [trigger, setTrigger] = useState([]);
	useEffect(() => {
		axios
			.post(`${API_URL}/business/users/get-all-open-jobs`,{services:profile.services}, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				setJobs(response.data.message);
				// setJobs(response.data.message.filter(d=>!profile.includes(d._id)));
			});
	}, [trigger]);

	useEffect(() => {
		axios
			.get(`${API_URL}/business/users/get-profile`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log(
					'response of get profile is',
					response.data.message,
				);
				// setJobs(response.data.message)
				// setJobs(response.data.message.filter(d=>!profile.includes(d._id)));
				setProfile({
					...response.data.message.profile,
					avgReviews:response.data.message.avgReviews
				});
			});
	}, [trigger]);
	return (
		<div>
			<MenuBar />
			<div className="jl-main-container">
				<div></div>
				<div className="sr-result-cards">
					<Typography
						variant="h2"
						noWrap
						component="h2"
						sx={{
							display: { xs: 'none', md: 'flex' },
							fontFamily:
								"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
							fontWeight: 700,
							fontStyle: 'normal',
							fontSize: '28px',
							// letterSpacing: '.3rem',
							color: '#2b4450',
						}}
					>
						Relevant jobs near you.
					</Typography>
					{/*
					
						.filter(
							(j) =>
								profile.proposals &&
								!profile.proposals.includes(j._id),
						)
					*/}
					{jobs
						.map((j) => (
							<JobCardView job={j} trigger={setTrigger} />
						))}
					{/* <JobCardView /> */}
				</div>
			</div>
		</div>
	);
}
