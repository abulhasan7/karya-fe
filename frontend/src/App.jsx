/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/react-in-jsx-scope */
import { useSelector } from 'react-redux';
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

function App() {
	const loggedIn = useSelector((state) => state.login.loggedIn);
	let content;
	if (!loggedIn) content = <UserLogin></UserLogin>;
	else content = <LandingPage></LandingPage>;
	return (
		<div className="App">
			<div>{content} </div>
		</div>
	);
}

export default App;
