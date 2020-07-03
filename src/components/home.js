import homeHBS from './home.hbs';
import content from '../localization/en.json';

// let home = true;

//update interface
const render = () => {

	const pageData = content.home;
	const html = homeHBS(pageData);

	if ($('#app').empty()) {
		$('#app').append(html);
	}

	$('#start').on('click', () => {
		start();
	});

	$('#title').on('click', () => {
		start();
	});

	// $('body').keypress(e => {
	// 	if (e.which === 32 && home === true) {
	// 		event.preventDefault();
	// 		home = false;
	// 		start();
	// 	}
	// });

	const start = () => {
		$('#app').empty();
		const event = $.Event('start');
		$('body').trigger(event);
	};

};

export default {
	render
};