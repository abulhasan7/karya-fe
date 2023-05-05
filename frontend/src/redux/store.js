import {
	configureStore,
} from '@reduxjs/toolkit';
import userStateSlice from './slices/userStateSlice';

const persistMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	sessionStorage.setItem('token', store.getState().user.token);
	sessionStorage.setItem('profile', JSON.stringify(store.getState().user.profile));
	sessionStorage.setItem('global-state', JSON.stringify(store.getState()));
	return result;
};

const store = configureStore({
	reducer: {
		user: userStateSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware),
});

export default store;