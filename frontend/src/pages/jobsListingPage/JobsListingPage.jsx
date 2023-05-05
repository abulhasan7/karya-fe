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

export default function JobsListingPage() {
	const token = useSelector((state) => state.user.token);
	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		axios
			.get(`${API_URL}/users/get-jobs?nostatus=COMPLETED`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log('response is', response.data.message);
				setJobs(response.data.message);
			});
	}, []);

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
							//fontFamily: 'National Bold',
							//fontWeight: 700,
							//fontStyle: 'normal',
							fontFamily:
								"Guardian-EgypTT, Charter, 'Charter Bitstream', Cambria",
							fontSize: '32px',
							fontWeight: '700',
							// letterSpacing: '.3rem',
							color: '#2b4450',
						}}
					>
						Jobs posted by you.
					</Typography>
					{jobs.map((j) => (
						<JobCardView job={j} />
					))}
				</div>
			</div>
		</div>
	);
}
