import {
	configureStore,
} from '@reduxjs/toolkit';
import businessStateSlice from './slices/businessStateSlice';

const persistMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	sessionStorage.setItem('token', store.getState().business.token);
	sessionStorage.setItem('profile', store.getState().business.profile);
	sessionStorage.setItem('global-state', JSON.stringify(store.getState()));
	return result;
};

const store = configureStore({
	reducer: {
		business: businessStateSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware),
});

export default store;