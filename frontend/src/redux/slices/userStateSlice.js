/* eslint-disable no-param-reassign */
import {
	createSlice,
} from '@reduxjs/toolkit';

export const userStateSlice = createSlice({
	name: 'user',
	initialState: {
		profile: JSON.parse(sessionStorage.getItem('profile')),
		token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
	},
	reducers: {
		updateUser: (state, action) => {
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
	updateUser,
	logout,
} = userStateSlice.actions;

export default userStateSlice.reducer;