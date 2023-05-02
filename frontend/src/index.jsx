/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import LandingPage from './pages/landingPage/LandingPage';
import SearchResults from './pages/searchResultsPage/SearchResults';
import Chat from './pages/chat/Chat';
import JobCreator from './components/jobCreator/JobCreator';
import BusinessOverview from './pages/businessOverview/BusinessOverview';
import JobOverview from './pages/jobOverview/JobOverview';
import JobProposalCard from './components/jobProposalCard/JobProposalCard';

const root = ReactDOM.createRoot(document.getElementById('root'));
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
			<ThemeProvider theme={theme}>
				<App />
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
				<JobOverview />
			</ThemeProvider>
		),
	},
]);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
