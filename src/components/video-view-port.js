import $ from 'jquery';
import * as videoScreen from './video-screen';

import videoHBS from './video-view-port.hbs';


export const render = () => {
	const html = videoHBS();
	$(html).appendTo($('#main'));

	videoScreen.initiate();

	//---- Resize video container
	$(window).resize(function () {
		// let newVideoHeight = $(window).height() - $('nav').height();
		let newVideoHeight = $(window).height();
		let divVideo = $('.video');
		divVideo.height(newVideoHeight);
	});

};

export default {
	render
};