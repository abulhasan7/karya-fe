/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/react-in-jsx-scope */
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#f77367',
			contrastText: '#fff',
		},
		secondary: {
			main: '#f50057',
		},
	},
});
function App() {
	return (
		<ThemeProvider theme={theme}>
			<UserLogin />
		</ThemeProvider>
	);
}

export default App;
