import $ from 'jquery';

import sidebarHBS from './sidebar.hbs';
import * as conversation from './conversation.js';


let darkMode = false;


export const render = () => {
	const html = sidebarHBS();
	$(html).appendTo($('#main'));

	conversation.initialize();

	addInteraction();
	toggleDarkMode();

	

};

const addInteraction = () => {

	$('#toggle-dark-mode').click(() => {
		toggleDarkMode();
	});

	$('#userinput').keypress(e => {
		//if hit enter
		if (e.which == 13) {
			event.preventDefault();
			const msg = $('#userinput').val(); // get input
			$('#userinput').val(''); // clear imput
			conversation.userInput(msg);
		}
	});


};

const toggleDarkMode = () => {

	let sideBar = $('#side-bar');
	let conversationWrapper = $('#conversation-wrapper');
	let conversationInput = $('#conversation-input');
	let materialIcons = $('.material-icons');
	let userinput = $('#userinput');

	if (darkMode) {

		darkMode = false;
		conversation.setDarkMode(darkMode);

		sideBar.removeClass('darken-4');
		conversationWrapper.removeClass('darken-4');
		conversationInput.removeClass('darken-3');
		materialIcons.removeClass('md-light');

		sideBar.addClass('lighten-5');
		conversationWrapper.addClass('lighten-5');
		conversationInput.addClass('lighten-5');
		materialIcons.addClass('md-dark');
		userinput.addClass('md-dark');

	} else {

		darkMode = true;
		conversation.setDarkMode(darkMode);

		sideBar.removeClass('lighten-5');
		conversationWrapper.removeClass('lighten-5');
		conversationInput.removeClass('lighten-5');
		materialIcons.removeClass('md-dark');
		userinput.removeClass('md-dark');

		sideBar.addClass('darken-4');
		conversationWrapper.addClass('darken-4');
		conversationInput.addClass('darken-3');
		materialIcons.addClass('md-light');
		userinput.addClass('md-light');

	}

};

export default {
	render
};