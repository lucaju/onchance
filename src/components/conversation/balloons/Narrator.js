import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
	box: {
		padding: spacing(1, 2),
		marginBottom: 2,
		// display: 'inline-block',
	},
	text: {
		fontSize: '.75rem',
		lineHeight: '1.6rem',
		// wordBreak: 'break-word',
		// fontFamily:'Share Tech Mono',
		whiteSpace: 'pre-line',
		color: palette.grey[200],
	},
}));

const Narrator = ({ id, message }) => {
	const classes = useStyles();
	const [show, setShow] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShow(true), message.delay);
		return () => clearTimeout(timer);
	}, [show]);

	return (
		<div>
			{show && (
				<div id={id} className={classes.box}>
					<Typography align={'left'} variant="overline" className={classes.text}>
						{message.text}
					</Typography>
				</div>
			)}
		</div>
	);
};

Narrator.propTypes = {
	id: PropTypes.any,
	message: PropTypes.object,
};

Narrator.defaultProps = {
	message: {},
};

export default Narrator;
