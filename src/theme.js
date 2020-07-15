import { createMuiTheme } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: blue,
		secondary: {
			main: orange[800],
		},
	},
});

export default theme;
