import $ from 'jquery';
// import YTPlayer from './video-player-youtube';
// import localPlayer from './video-player-local';
import videoCollection from'../../videography/video-collection.json';

const playerService = 'localPlayer'; // 'youtube' || 'localPlayer'
let player;
let localPlayer;

export const initiate = async () => {

	if (playerService == 'youtube') {
		if(!YTPlayer) YTPlayer = await import(/* webpackChunkName: "YTPlayer" */ './video-player-youtube');
		player = YTPlayer;
		$('#local-player').hide();
		player.initiate();

	} else if (playerService == 'localPlayer') {
		if(!localPlayer) localPlayer  = await import(/* webpackChunkName: "localPlayer" */ './video-player-local');
		player = localPlayer;
		$('#player').hide();
		player.initiate();

		// selectRandomVideo();
	}


	$('body').on('botResponse', e => {
		changeVideo(e.videoData);
	});

};

const selectRandomVideo = async () => {

	//random pick
	const max = 5;
	const r = Math.floor(Math.random() * Math.floor(max));
	changeVideo(videoCollection[r]);
	
}

const changeVideo = videoData => {
	player.play(videoData);
};
