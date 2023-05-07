/* eslint-disable no-shadow */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import JobCardView from '../jobCardView/JobCardView';
import './ActiveJobsList.css';
import { API_URL } from '../../../../business-frontend/src/constants';

export default function ActiveJobsList() {
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
							fontSize: '28px',
							fontWeight: '600',
							// letterSpacing: '.3rem',
							color: '#2b4450',
						}}
					>
						Your Jobs.
					</Typography>
					{jobs &&
						jobs
							.map((j) => (
								<JobCardView job={j} trigger={setTrigger} />
							))}
					{/* <JobCardView /> */}
				</div>
			</div>
		</div>
	);
}
