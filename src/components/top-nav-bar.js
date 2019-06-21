import $ from 'jquery';
import 'materialize-css/dist/js/materialize.min.js';

import navHBS from './top-nav-bar.hbs';

export const render = () => {

	const data = {
		title: 'On Chance'
	};

	const html  = navHBS(data);
	$(html).appendTo($('#app'));

	$('.dropdown-trigger').dropdown();
};

export default {
	render
};