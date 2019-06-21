import YouTubePlayer from 'youtube-player';

let player;

export const initiate = () => {

	player = YouTubePlayer('player', {
		width: '100%',
		height: '100%',
		playerVars: {
			autoplay: 1, //Auto play
			//cc_load_policy: 0,        //Close Captiuon
			// disablekb: 1,            //Keyboard Control
			enablejsapi: 1, //API Control
			fs: 0, //Full Screen
			iv_load_policy: 3, //Annotation
			loop: 1, //loop
			rel: 0, //List of related videos in the end
			modestbranding: 1, //detail
			showinfo: 0, //Video info
			start: 0 //Starting point in (s). We acna also define where it should end (using the 'end' parameter)
		},
		videoId: 'FeSCXQ5DaTM'
	});


	player.playVideo()
		.then(function () {
			console.log('video playing.');
		});
};

export const stop = () => {
	player.stopVideo();
};

export const play = ({youtubeID}) => {
	player.stopVideo();
	player.loadVideoById(youtubeID);
	player.playVideo().then(function () {
		// console.log('video playing.');
	});
};

export default {
	initiate,
	stop,
	play
};