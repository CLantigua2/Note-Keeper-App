import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	palette: {
		primary: deepPurple
	}
});

ReactDOM.render(
	<Router>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Router>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
