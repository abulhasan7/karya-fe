/* eslint-disable import/no-named-as-default */
import {
	configureStore,
} from '@reduxjs/toolkit';
import loginStateReducer from './slices/loginStateSlice';

const persistMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	sessionStorage.setItem('auth-token', store.getState().login.token);
	sessionStorage.setItem('global-state', JSON.stringify(store.getState()));
	return result;
};

const store = configureStore({
	reducer: {
		login: loginStateReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware),
});

export default store;