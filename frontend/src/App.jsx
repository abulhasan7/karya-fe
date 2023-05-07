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
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profileEdit/ProfileEdit';

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
				<Protected isLoggedIn={loggedIn}>
				<ThemeProvider theme={theme}>
					<LandingPage />
				</ThemeProvider>
				</Protected>
			),
		},
		{
			path: '/search',
			element: (
				<Protected isLoggedIn={loggedIn}>
				<ThemeProvider theme={theme}>
					<SearchResults />
				</ThemeProvider>
				</Protected>
			),
		},
		{
			path: '/chat/:id',
			element: (
				<Protected isLoggedIn={loggedIn}>
				<ThemeProvider theme={theme}>
					<Chat />
				</ThemeProvider>
				</Protected>
			),
		},
		{
			path: '/user-edit',
			element: (
				<Protected isLoggedIn={loggedIn}>
				<ThemeProvider theme={theme}>
					<ProfileEdit />
				</ThemeProvider>
				</Protected>
			),
		},
		{
			path: '/profile',
			element: (
				<Protected isLoggedIn={loggedIn}>
				<ThemeProvider theme={theme}>
					<Profile />
				</ThemeProvider>
				</Protected>
			),
		},

		{
			path: '/search-services',
			element: (
				<Protected isLoggedIn={loggedIn}>
				<ThemeProvider theme={theme}>
					<SearchResults />
				</ThemeProvider>
				</Protected>
			),
		},

		{
			path: '/business-overview',
			element: (
				<Protected isLoggedIn={loggedIn}>
				<ThemeProvider theme={theme}>
					<BusinessOverview />
				</ThemeProvider>
				</Protected>
			),
		},
		{
			path: '/create-job',
			element: (
				<Protected isLoggedIn={loggedIn}>
				<ThemeProvider theme={theme}>
					<JobCreator />
				</ThemeProvider>
				</Protected>
			),
		},
		{
			path: '/job-overview/:id',
			element: (
				<Protected isLoggedIn={loggedIn}>
				<ThemeProvider theme={theme}>
					<JobOverview />
				</ThemeProvider>
				</Protected>
			),
		},
		{
			path: '/jobs-listing',
			element: (
				<Protected isLoggedIn={loggedIn}>
				<ThemeProvider theme={theme}>
					<JobsListingPage />
				</ThemeProvider>
				</Protected>
			),
		},
	]);
	return <RouterProvider router={router} />;
	// return router;
}

export default App;
