import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { useLocation } from 'react-router-dom';
import { useActions } from './overmind';

import theme from './theme/theme';
const useQuery = () => new URLSearchParams(useLocation().search);

const App = () => {
	const routing = useRoutes(routes);
	const query = useQuery();
	const actions = useActions();
	if (query.get('debug') === 'true') actions.general.setDebug(true);
  return (
    <ThemeProvider theme={theme(true)}>
      <CssBaseline />
			{routing}
    </ThemeProvider>
  );
};

export default App;
