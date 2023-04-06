/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/react-in-jsx-scope */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuBar from './components/menubar/MenuBar';
import './App.css';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#ee2b57',
		},
		secondary: {
			main: '#f50057',
		},
	},
});
function App() {
	return (
		<ThemeProvider theme={theme}>
			<MenuBar />
		</ThemeProvider>
	);
}

export default App;
