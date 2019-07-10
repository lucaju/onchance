import videojs from 'video.js';
import {sendDialog} from './conversation';
import {getCurrentSubject} from '../memory';
import 'video.js/dist/video-js.css';

let player;

export const initiate = () => {

	player = videojs('local-player',{
		autoplay: false,
		fluid: true,
		preload: 'auto'
	});

	// player.muted(true);

};

export const stop = () => {
	player.pause();
};

export const play = video => {
	stop();
	player.src(`http://onchance.net/videos/${video.fileName}`);
	
	player.ready( () => {
		player.play()
			.then(() => {
				// console.log('yep');
			})
			.catch((e) => {
				console.log(e);
			});
	});

	
	//this should be part of the metadata 
	const tags = [
		{
			time: 5,
			tag: 'opa',
		}
	];

	//add triggers 
	tags.every(tag => tag.trigered = false);

	//events
	const eventTag = $.Event('video-tag', {
		video
	});

	const eventEnd = $.Event('video-ended', {
		video
	});
	

	player.on('timeupdate', () => {
		// console.log(player.currentTime(),player.duration());
		
		if (tags.length > 0) {
			for (const tag of tags) {
				if (tag.time == Math.floor(player.currentTime()) && !tag.trigered) {
					// console.log(tag.time, tag.tag);
					$('body').trigger(eventTag);
					tag.trigered = true;
				}
			}
		}
		
	});

	player.on('ended', () => {
		// player.muted(false);
		$('body').trigger(eventEnd);
		if (getCurrentSubject() != '') sendDialog(getCurrentSubject());
	});

};


export default {
	initiate,
	stop,
	play
};