/* eslint-disable no-param-reassign */
import {
	createSlice,
} from '@reduxjs/toolkit';

export const businessStateSlice = createSlice({
	name: 'business',
	initialState: {
		profile: sessionStorage.getItem('profile'),
		token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
	},
	reducers: {
		updateBusiness: (state, action) => {
			state.profile = action.payload.profile;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.profile = '';
			state.token = '';
		},
	},
});

export const {
	updateBusiness,
	logout,
} = businessStateSlice.actions;

export default businessStateSlice.reducer;