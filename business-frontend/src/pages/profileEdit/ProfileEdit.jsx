import { Avatar, Box, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { updateBusiness } from '../../redux/slices/businessStateSlice';
import { API_URL } from '../../constants';
import MenuBar from '../../components/menubar/MenuBar';
import './ProfileEdit.css';

function ProfileEdit() {
	const dispatch = useDispatch();
	const userProfile = useSelector((state) => state.business.profile);
	const [user, setUser] = useState(userProfile);

	const [newPicture, setNewPicture] = useState('');
	const [newPictureURL, setNewPictureURL] = useState('');
	const token = useSelector((state) => state.business.token);

	const handleFormSubmit = async function (e) {
		e.preventDefault();
		let newURL = '';
		try {
			// if newProfilePicture is set skip this.
			if (newPictureURL) {
				const req = await fetch(`${API_URL}/users/get-signed-url`, {
					method: 'GET',
					mode: 'cors',
					cache: 'no-cache',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					redirect: 'follow',
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				});
				const resp = await req.json();
				console.log('resp is', resp);
				await fetch(resp.message, {
					method: 'PUT',
					headers: {
						'Content-Type': 'multipart/form-data',
					},
					body: newPicture,
				});
				[newURL] = resp.message.split('?');
			}
			let userBody = {};
			if (newURL.length > 0) {
				userBody = {
					...user,
					primaryImage: newURL,
				};
			} else {
				userBody = {
					...user,
				};
			}

			const userUpdateRequest = await fetch(
				`${API_URL}/business/users/update-profile`,
				{
					method: 'POST',
					mode: 'cors',
					cache: 'no-cache',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
					redirect: 'follow',
					referrerPolicy: 'no-referrer',
					body: JSON.stringify(userBody),
				},
			);
			const userUpdateResp = await userUpdateRequest.json();
			setNewPicture('');
			setNewPictureURL('');
			console.log(userBody);
			dispatch(updateBusiness({ profile: userBody, token }));
			setTimeout(window.location.assign('/profile'), 100);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<MenuBar />
			<Box className="profile-edit-box">
				<Container className="profile-edit-header">
					Your Public Profile
				</Container>
				<Container className="profile-edit-form">
					<form>
						<div className="input-group">
							<label className="label"> Profile Picture </label>
							<Avatar
								alt={user.name}
								src={newPictureURL || user.primaryImage}
								sx={{
									width: 140,
									height: 140,
								}}
							/>
							<input
								type="file"
								value=""
								onChange={(e) => {
									setNewPicture(e.target.files[0]);
									setNewPictureURL(
										URL.createObjectURL(e.target.files[0]),
									);
								}}
							/>
						</div>
						<hr />
						<div className="input-group">
							<label className="label"> Business Name </label>
							<TextField
								margin="normal"
								size="small"
								required
								sx={{
									width: '300px',
								}}
								value={user.name}
								onChange={(e) => {
									setUser({
										...user,
										name: e.target.value,
									});
								}}
							/>
						</div>
						<hr />
						<div className="input-group">
							<label className="label"> Phone Number </label>
							<TextField
								margin="normal"
								size="small"
								required
								value={user.phone}
								onChange={(e) => {
									setUser({
										...user,
										phone: e.target.value,
									});
								}}
							/>
						</div>
						<hr />
						<div className="input-group">
							<label className="label"> Street Address </label>
							<TextField
								margin="normal"
								size="small"
								sx={{
									width: '300px',
								}}
								required
								value={
									user.address && (user.address.street || '')
								}
								onChange={(e) => {
									const address = user.address || {};
									const newaddress = {};
									Object.assign(newaddress, address);
									newaddress.street = e.target.value;
									setUser({
										...user,
										address: newaddress,
									});
								}}
							/>
						</div>

						<div className="input-group">
							<label className="label"> City </label>
							<TextField
								margin="normal"
								size="small"
								required
								value={user.address && user.address.city}
								onChange={(e) => {
									const address = user.address || {};
									address.city = e.target.value;
									setUser({
										...user,
										address,
									});
								}}
							/>
						</div>

						<div className="input-group">
							<label className="label"> State </label>
							<TextField
								margin="normal"
								size="small"
								required
								value={user.address && user.address.state}
								onChange={(e) => {
									const address = user.address || {};
									address.state = e.target.value;
									setUser({
										...user,
										address,
									});
								}}
							/>
						</div>

						<div className="input-group">
							<label className="label"> Zip </label>
							<TextField
								margin="normal"
								size="small"
								required
								value={user.address && user.address.zip}
								onChange={(e) => {
									const address = user.address || {};
									address.zip = e.target.value;
									setUser({
										...user,
										address,
									});
								}}
							/>
						</div>
						<hr />
						<div className="input-group">
							<label className="label"> About </label>
							<TextField
								size="small"
								multiline
								rows={6}
								sx={{
									width: '400px',
								}}
								placeholder="Please provide as many details here are possible."
								variant="standard"
								id="about"
								value={user.about || ''}
								onChange={(e) => {
									setUser({
										...user,
										about: e.target.value,
									});
								}}
							/>
						</div>
						<hr />
						<Button
							variant="contained"
							sx={{ mt: 3, mb: 2, backgroundColor: '#385170' }}
							size="small"
							onClick={handleFormSubmit}
						>
							Save Changes
						</Button>
					</form>
				</Container>
			</Box>
		</div>
	);
}

export default ProfileEdit;
