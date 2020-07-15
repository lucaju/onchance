import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import theme from './../theme';

import Home from './home/Home';
import Main from './main/Main';

const App = () => {
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<Switch>
						<Route path="/bot" component={Main} />
						<Route path="/" component={Home} />
						<Route component={Home} />
					</Switch>
				</Router>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default App;
