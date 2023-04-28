/* eslint-disable no-param-reassign */
import {
	createSlice,
} from '@reduxjs/toolkit';

export const loginStateSlice = createSlice({
	name: 'login',
	initialState: {
		loggedIn: !!sessionStorage.getItem('auth-token'),
		token: sessionStorage.getItem('auth-token') ? sessionStorage.getItem('auth-token') : '',
	},
	reducers: {
		login: (state, action) => {
			state.loggedIn = true;
			state.token = action.payload;
		},
		logout: (state) => {
			state.loggedIn = false;
			state.token = '';
		},
	},
});

export const {
	login,
	logout,
} = loginStateSlice.actions;

export default loginStateSlice.reducer;