import $ from 'jquery';
import Timer from 'tiny-timer';

import dialogFlow from './bot-dialogflow';
// import recastAI from './bot-recastai';

import ballonUserHBS from './ballon-user.hbs';
import ballonBotHBS from './ballon-bot.hbs';
import ballonAboutHBS from './ballon-about.hbs';
import botDialogflowIDebugHBS from './debug-dialogflow-dialog.hbs';
import {getCurrentSubject, setCurrentSubject} from '../memory';
// import botRecastaiDebugHBS from './debug-recastai-dialog.hbs';

//---------

let darkMode = false;
let debug = true;

let botService; // 'RecastAI' || DialogFlow
let bot = null;

let recastAI;
let botRecastaiDebugHBS;

//---------

export const initialize = () => {

	selectBot('DialogFlow'); // defaul
	addBotSelectorInteraction();

	// botFirstinteraction();
	
	// bot first interaction
	$('body').on('video-ended', (e) => {
		botFirstinteraction();
		$('body').off('video-ended');
	});

};

const addBotSelectorInteraction = () => {

	//choose bot
	$('#select-bot-dialogflow').click(() => {
		selectBot('DialogFlow');
	});

	//choose bot
	$('#select-bot-recastai').click(() => {
		selectBot('RecastAI');
	});

	//choose bot
	$('#about-button').click(() => {
		addAboutDialog();
	});
};

const selectBot = async botName => {
	botService = botName;

	//choose bootservice
	if (botService == 'RecastAI') {
		if(!recastAI) recastAI  = await import(/* webpackChunkName: "recastAI" */ './bot-recastai.js');
		bot = recastAI; 
	} else if (botService == 'DialogFlow') {
		bot = dialogFlow;
	}

	$('#current-bot-name').html(`Bot: ${botService}`);
};

const botFirstinteraction = () => {
	//first interaction - if the user don't speak first
	let timeFirstInteraction = Math.random(0.8, 1) * 3000;
	setTimeout(() => {
		sendDialog('hello');
	}, timeFirstInteraction);
};

export const userInput = msg => {
	// stop timer for first interaction if the user start to type
	// if (bot.firstInteraction) clearTimeout(firstInteraction);

	addUserDialog(msg);
	sendDialog(msg);

	return false;
};

export const setDarkMode = value => {
	darkMode = value;
};

const addAboutDialog = () => {

	const msg = "this is the about text";

	const icon = 'adb';
	let iconColor = 'md-dark';
	if (darkMode) iconColor = 'md-light ';

	const balloonData = {
		icon: icon,
		iconColor: iconColor,
		text: msg
	};

	const html = ballonAboutHBS(balloonData);
	$(html).appendTo($('#conversation'));

	autoScroll();

};

const addUserDialog = msg => {

	const icon = 'account_circle';
	let iconColor = 'md-dark';
	if (darkMode) iconColor = 'md-light ';

	const balloonData = {
		icon: icon,
		iconColor: iconColor,
		text: msg
	};

	const html = ballonUserHBS(balloonData);
	$(html).appendTo($('#conversation'));

	autoScroll();

	//save input
	saveLog('human', msg);

};

//Send and get data to/from recastAI
export const sendDialog = async msg => {

	const dialogData = await bot.sendDialog(msg);

	let messages;
	if (botService == 'RecastAI') {
		messages = dialogData.results.messages;
	} else if (botService == 'DialogFlow') {
		messages = dialogData.messages;
	}

	//if get any response message
	if (messages.length > 0) {

		let delay = 0; //delay, in case of more than one message
		let typing = 0; // let typingTimeTotal = 0; //500;

		//go through the messages
		for (const message of messages) {

			if (message.type == 'text') {
				typing += getBotTypingTime(message.content) + 500;
			} else {
				typing += 1000;
			}

			addBotDialog(dialogData, message, delay, typing);

			delay = typing;
		}

		const videoData = await getVideo(dialogData);
		if(videoData) dispatchVideo(videoData, typing);

	}

};

const getVideo = async dialogData => {

	if (dialogData.subjects.length == 0) return null;

	setCurrentSubject(dialogData.subjects[0]);

	// return new Promise((resolve, reject) => {

	// if (!dialogData) reject(new Error('No data'));

	const body = bot.getSimplifiedLastDialog(dialogData)

	const response = await fetch('/getVideo',{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

	const json = await response.json();

	return json;


	await fetch('/getVideo',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	}).then(res => {
		return res.json();
	}).then(data => {
		// console.log(data);
		return data;
	}).catch((err) => {
		console.log(err);
		// reject(err);
	});
	
	// });
};


//get bot typying time
const getBotTypingTime = text => {
	let initialDelay = Math.random(.1, 1) * 1000; //random between 300ms and 1 s
	let charDelay = text.length * 20; // number of characters * 20 ms
	return initialDelay + charDelay;
};


const addBotDialog = (data, message, delay, typingTime) => {

	//get previous height
	// let oldHeight = getConversationScrollHeight();

	let icon;
	if (botService == 'RecastAI') {
		icon = 'filter_tilt_shift';
	} else if (botService == 'DialogFlow') {
		icon = 'adb';
	}


	let iconColor = 'md-dark';
	if (darkMode) iconColor = 'md-light ';

	const balloonData = {
		icon: icon,
		iconColor: iconColor,
		debug: debug,
		text: ''
	};

	const dialogHTML = ballonBotHBS(balloonData);
	const dialog = $(dialogHTML).appendTo($('#conversation'));
	const balloon = $(dialog).find('.balloon');

	if (data != null) dialog.data(data);

	autoScroll();


	const timer = new Timer();
	// timer.on('tick', (ms) => {
	// console.log(ms);
	// });

	timer.on('done', () => {
		$('#spinner').remove();
		putBotmessage(balloon, message);
	});
	//start timer
	timer.start(typingTime, 1000); // run for 5 seconds


	//add bot response message 
	function putBotmessage(balloon, message) {
		$(`<span>${message.content}</span>`).appendTo(balloon);
		autoScroll();
	}

	// add debug button
	if (debug == true && data != null) {
		const debugButton = $(dialog).find('.debug-button');

		dialog.data().debug = false;
		debugButton.click(dialog, function (event) {
			debugButtonEvent(event, dialog);
		});
	}

	dialog.hide();
	dialog.delay(delay).toggle('slow');

	saveLog('bot', data);
};

const dispatchVideo = (data, delay) => {
	//dispatch message
	let e = $.Event('botResponse', {
		videoData:data
	});
	
	$('body').trigger(e);
};

const saveLog = (agent, data) => {

	let conversationModel = {};


	if (agent == 'human') {
		conversationModel.agent = agent;
		conversationModel.message = data;
	} else if (agent == 'bot') {
		conversationModel = bot.getLog(agent, data);
	}

	//save to omongo instead
	//Implement mongo

};

//debug to screen
const debugButtonEvent = async event => {

	const targetDialog = $(event.data);

	// open close accoridingly
	if (targetDialog.data().debug == true) {

		//close
		event.stopPropagation();
		targetDialog.data().debug = false;
		targetDialog.find('.debug').remove();

	} else {

		//open
		targetDialog.data().debug = true;

		const data = bot.getDebug(targetDialog.data());

		let debugHTML;

		if (botService == 'RecastAI') {
			if(!botRecastaiDebugHBS) {
				await import(/* webpackChunkName: "botRecastaiDebug" */ './debug-recastai-dialog.hbs')
					.then(({ default: botRecastaiDebug }) => {
						botRecastaiDebugHBS = botRecastaiDebug;
						debugHTML = botRecastaiDebugHBS(data);
					})
			} else {
				debugHTML = botRecastaiDebugHBS(data);
			}
			
		} else if (botService == 'DialogFlow') {
			debugHTML = botDialogflowIDebugHBS(data);
		}

		$(debugHTML).appendTo($(targetDialog));
	}

	autoScroll();
};

//---- Resize Conversation

const getConversationScrollHeight = () => {
	return $('#conversation')[0].scrollHeight;
};

const autoScroll = () => {
	let newHeight = getConversationScrollHeight();
	$('#conversation-wrapper').animate({
		scrollTop: newHeight
	}, 1000);
};

$(window).resize(function () {
	// var newConversationHeight = $(window).height() - $('nav').outerHeight() - $('#conversation-input').outerHeight();
	var newConversationHeight = $(window).height() - $('#conversation-input').outerHeight();
	var conversartionWrapper = $('#conversation-wrapper');
	conversartionWrapper.height(newConversationHeight);

	var oldHeight = getConversationScrollHeight();
	autoScroll(oldHeight);
});