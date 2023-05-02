/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider, useSelector } from 'react-redux';
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
import UserLogin from './pages/userLogin/UserLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));


// const theme = createTheme({
// 	palette: {
// 		mode: 'light',
// 		primary: {
// 			main: '#f77367',
// 			contrastText: '#fff',
// 		},
// 		secondary: {
// 			main: '#dfebed',
// 		},
// 	},
// });

// const loggedIn = useSelector((state) => state.login.loggedIn);
// let content;
// 	if (!loggedIn) content = <UserLogin theme={theme}></UserLogin>;

// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: content ? content :(
// 			<ThemeProvider theme={theme}>
// 				<JobOverview />
// 			</ThemeProvider>
// 		),
		
// 	},
// 	{
// 		path: '/home',
// 		element: content?content:(
// 			<ThemeProvider theme={theme}>
// 				<LandingPage />
// 			</ThemeProvider>
// 		),
// 	},
// 	{
// 		path: '/search',
// 		element: content?content:(
// 			<ThemeProvider theme={theme}>
// 				<SearchResults />
// 			</ThemeProvider>
// 		),
// 	},
// 	{
// 		path: '/chat',
// 		element: content?content:(
// 			<ThemeProvider theme={theme}>
// 				<Chat />
// 			</ThemeProvider>
// 		),
// 	},
// ]);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
