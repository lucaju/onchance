import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';

import 'video.js/dist/video-js.css';

let player;

// export default class VideoPlayer extends React.Component {
const VideoPlayer = (props) => {
	const { muted, file, onEnded, onTimeUpdate, videoState } = props;
	let videoNode;

	useEffect(() => {
		if (player) return;

		// instantiate Video.js
		player = videojs(videoNode, props, () => {
			// console.log('onPlayerReady', player);
		});

		player.on('timeupdate', () => {
			onTimeUpdate({
				currentTime: player.currentTime(),
				duration: player.duration(),
			});
		});

		player.on('ended', () => onEnded());

		// return () => {
		//     console.log('Cleaned up');
		//     if (player) player.dispose();
		//     player = undefined;
		// };
	});

	useEffect(() => {
		if (videoState === 'play') player.play();
		if (videoState === 'stop') player.pause();
	}, [videoState]);

	useEffect(() => {
		if (file) player.src(`https://onchance.net/videos/${file}`);
		player.play();
	}, [file]);

	useEffect(() => {
		player.muted(muted);
	}, [muted]);

	// wrap the player in a div with a `data-vjs-player` attribute
	// so videojs won't create additional wrapper in the DOM
	// see https://github.com/videojs/video.js/pull/3856
	return (
		<div data-vjs-player>
			<video ref={(node) => (videoNode = node)} className="video-js"></video>
		</div>
	);
};

VideoPlayer.propTypes = {
	muted: PropTypes.bool,
	file: PropTypes.string,
	onEnded: PropTypes.func,
	onTimeUpdate: PropTypes.func,
	videoState: PropTypes.string,
};

export default VideoPlayer;
