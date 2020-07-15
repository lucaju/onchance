import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Fab, Grid, makeStyles } from '@material-ui/core';

import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import VideoPlayer from './VideoPlayer';
import { useApp } from '../../../app';

const useStyles = makeStyles((theme) => ({
	root: (sidebarWidth) => ({
		paddingRight: sidebarWidth,
		height: '100vh',
		backgroundColor: theme.palette.common.black,
	}),
	soundButton: {
		position: 'absolute',
		bottom: 0,
		left: theme.spacing(1),
		marginBottom: theme.spacing(1),
		backgroundColor: theme.palette.background.default,
	}
}));

const Stage = ({ sidebarWidth }) => {
	const classes = useStyles(sidebarWidth);
	const [videoState, setVideoState] = useState('initial');
	const [muted, setMuted] = useState(false);
	const { state } = useApp();

	const onTimeUpdate = ({ currentTime, duration }) => {
		// console.log(currentTime, duration);
	};

	const onEnded = () => {
		console.log('Video Ended');
	};

	const handleSound = () => setMuted(!muted);

	const videoJsOptions = {
		autoplay: false,
		controls: false,
		fluid: true,
		preload: 'auto',
		muted,
		// children: [
		//     // 'bigPlayButton',
		//     // 'controlBar'
		// ],
		// sources: [{
		//     src: state.videos.current,
		//     type: 'video/mp4',
		// }],
		onTimeUpdate: onTimeUpdate,
		onEnded: onEnded,
		videoState: videoState,
		file: state.videos.last?.fileName || null,
	};

	return (
		<Grid container direction="column" justify="center" className={classes.root}>
			<VideoPlayer {...videoJsOptions} />
			<Fab
				size="small"
				aria-label="sound"
				className={classes.soundButton}
				onClick={handleSound}
			>
				{ muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
			</Fab>
		</Grid>
	);
};

Stage.propTypes = {
	sidebarWidth: PropTypes.number,
};

export default Stage;
