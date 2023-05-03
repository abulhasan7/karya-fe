import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

import MenuBar from './components/menubar/MenuBar';
import LandingSearch from './components/landingSearch/LandingSearch';
import LandingPage from './pages/landingPage/LandingPage';
import './App.css';
import Chat from './pages/chat/Chat';
import JobCreator from './components/jobCreator/JobCreator';
import BusinessCardView from './components/businessCardView/BusinessCardView';
import UserLogin from './pages/userLogin/UserLogin';
import UserSignup from './pages/userSignup/UserSignup';
import BusinessOverview from './pages/businessOverview/BusinessOverview';
import Protected from './protected';
import JobOverview from './pages/jobOverview/JobOverview';
import SearchResults from './pages/searchResultsPage/SearchResults';
import JobsListingPage from './pages/jobsListingPage/JobsListingPage';

function App() {
	const loggedIn = useSelector((state) => state.user.token);
	console.log(`loggedIn is${loggedIn}`);

	const theme = createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#f77367',
				contrastText: '#fff',
			},
			secondary: {
				main: '#dfebed',
			},
		},
	});

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<Protected isLoggedIn={loggedIn}>
					<ThemeProvider theme={theme}>
						<JobOverview />
					</ThemeProvider>
				</Protected>
			),
		},
		{
			path: '/login',
			element: (
				<ThemeProvider theme={theme}>
					<UserLogin />
				</ThemeProvider>
			),
		},
		{
			path: '/home',
			element: (
				<ThemeProvider theme={theme}>
					<LandingPage />
				</ThemeProvider>
			),
		},
		{
			path: '/search',
			element: (
				<ThemeProvider theme={theme}>
					<SearchResults />
				</ThemeProvider>
			),
		},
		{
			path: '/chat',
			element: (
				<ThemeProvider theme={theme}>
					<Chat />
				</ThemeProvider>
			),
		},
		{
			path: '/dev',
			element: (
				<ThemeProvider theme={theme}>
					<JobsListingPage />
				</ThemeProvider>
			),
		},

		{
			path: '/search-services',
			element: (
				<ThemeProvider theme={theme}>
					<SearchResults />
				</ThemeProvider>
			),
		},

		{
			path: '/business-overview',
			element: (
				<ThemeProvider theme={theme}>
					<BusinessOverview />
				</ThemeProvider>
			),
		},
	]);
	return <RouterProvider router={router} />;
	// return router;
}

export default App;
