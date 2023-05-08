/* eslint-disable no-shadow */
import * as React from 'react';
import Typography from '@mui/material/Typography';

// import MenuBar from '../../components/menubar/MenuBar';
import JobCardView from '../../components/jobCardView/JobCardView';
import './JobsListingPage.css';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';

export default function JobsListingPage({ filter }) {
	const token = useSelector((state) => state.user.token);
	const [jobs, setJobs] = useState([]);
	const [trigger, setTrigger] = useState('');

	useEffect(() => {
		axios
			.get(`${API_URL}/users/get-jobs?status=All`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				setJobs(response.data.message);
			});
	}, [trigger]);

	return (
		<div>
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
							fontSize: '28px',
							fontWeight: '600',
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
