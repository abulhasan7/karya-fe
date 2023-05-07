import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

import BusinessLogin from './pages/login/BusinessLogin';
import BusinessSignup from './pages/signup/BusinessSignup';
import Protected from './protected';
import './App.css';
import JobCardView from './components/jobCardView/JobCardView';
import JobsListingPage from './pages/jobsListingPage/JobsListingPage';
import MenuBar from './components/menubar/MenuBar';
import JobOverview from './pages/jobOverview/JobOverview';
import ProposalCreator from './components/proposalCreator/ProposalCreator';
import Profile from './pages/profile/Profile';
import Chat from './pages/chat/Chat';
import ProfileEdit from './pages/profileEdit/ProfileEdit';

function App() {
	const loggedIn = useSelector((state) => state.business.token);
	console.log(`loggedIn is${loggedIn}`);

	const theme = createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#385170',
				contrastText: '#ececec',
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
						<BusinessLogin />
					</ThemeProvider>
				</Protected>
			),
		},
		{
			path: '/home',
			element: (
				<Protected isLoggedIn={loggedIn}>
					<ThemeProvider theme={theme}>
						<JobsListingPage />
					</ThemeProvider>
				</Protected>
			),
		},
		{
			path: '/login',
			element: (
				<ThemeProvider theme={theme}>
					<BusinessLogin />
				</ThemeProvider>
			),
		},
		{
			path: '/chat/:id',
			element: (
				<ThemeProvider theme={theme}>
					<Chat />
				</ThemeProvider>
			),
		},
		{
			path: '/signup',
			element: (
				<ThemeProvider theme={theme}>
					<BusinessSignup />
				</ThemeProvider>
			),
		},
		{
			path: '/profile',
			element: (
				<ThemeProvider theme={theme}>
					<Profile />
				</ThemeProvider>
			),
		},
		{
			path: '/profile-edit',
			element: (
				<ThemeProvider theme={theme}>
					<ProfileEdit />
				</ThemeProvider>
			),
		},
		{
			path: '/create-proposal',
			element: (
				<ThemeProvider theme={theme}>
					<ProposalCreator />
				</ThemeProvider>
			),
		},
		{
			path: '/job-overview/:id',
			element: (
				<ThemeProvider theme={theme}>
					<JobOverview />
				</ThemeProvider>
			),
		},
	]);
	return <RouterProvider router={router} />;
	// return router;
}

export default App;
