/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/react-in-jsx-scope */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonAppBar from './components/navbar/navbar';
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
			<ButtonAppBar />
		</ThemeProvider>
	);
}

export default App;
