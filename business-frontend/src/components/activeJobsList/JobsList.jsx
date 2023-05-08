/* eslint-disable no-shadow */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import JobCardView from '../jobCardView/JobCardView';
import './JobsList.css';
import { API_URL } from '../../constants';

export default function JobsList({ filter }) {
	const token = useSelector((state) => state.business.token);
	const [profile, setProfile] = useState(
		useSelector((state) => state.business.profile),
	);
	console.log('profile is', JSON.stringify(profile));
	const [jobs, setJobs] = useState([]);
	const [trigger, setTrigger] = useState([]);
	useEffect(() => {
		axios
			.get(`${API_URL}/business/users/get-jobs`, {
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
				setProfile(response.data.message);
			});
	}, [trigger]);
	return (
		<div>
			<div className="ajl-main-container">
				<div className="sr-result-cards">
					<Typography
						variant="h2"
						noWrap
						component="h2"
						sx={{
							display: { xs: 'none', md: 'flex' },
							fontFamily:
								"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
							fontSize: '28px',
							fontWeight: '600',
							// letterSpacing: '.3rem',
							color: '#2b4450',
						}}
					>
						{jobs &&
						jobs.filter((j) => {
							if (filter !== 'All') {
								return j.status === filter;
							}
							return true;
						}).length === 0
							? 'No jobs matching your criteria.'
							: 'Your Jobs.'}
					</Typography>
					{jobs &&
						jobs
							.filter((j) => {
								if (filter !== 'All') {
									return j.status === filter;
								}
								return true;
							})
							.map((j) => (
								<JobCardView job={j} trigger={setTrigger} />
							))}
				</div>
			</div>
		</div>
	);
}
