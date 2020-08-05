import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clx from 'clsx';
import { Typography, makeStyles } from '@material-ui/core';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles(({ palette, spacing }) => {
	const radius = spacing(1.5);
	return {
		leftRow: { textAlign: 'left' },
		rightRow: { textAlign: 'right' },
		box: {
			padding: spacing(1, 2),
			borderRadius: 4,
			marginBottom: 4,
			display: 'inline-block',
		},
		left: {
			borderTopRightRadius: radius,
			borderBottomRightRadius: radius,
			color: palette.grey[700],
			backgroundColor: palette.grey[100],
		},
		right: {
			borderTopLeftRadius: radius,
			borderBottomLeftRadius: radius,
			backgroundColor: palette.primary.main,
			color: palette.common.white,
		},
		leftFirst: { borderTopLeftRadius: radius },
		// leftLast: { borderBottomLeftRadius: radius },
		rightFirst: { borderTopRightRadius: radius },
		// rightLast: { borderBottomRightRadius: radius },
		text: {
			fontSize: '.85rem',
			wordBreak: 'break-word',
			// fontFamily:'Share Tech Mono',
		},
		loader: {
			paddingTop: spacing(1),
			height: spacing(2),
		},
	};
});

const Balloon = (props) => {
	const { id, message, side, getTypographyProps, isTyping } = props;

	const classes = useStyles();

	const [show, setShow] = useState(false);
	const [botIsTyping, setBotIsTyping] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setShow(true), message.delay);
		return () => clearTimeout(timer);
	}, [show]);

	useEffect(() => {
		const timer = setTimeout(() => setBotIsTyping(false), message.typingTime);
		return () => {
			if (isTyping) isTyping(id);
			clearTimeout(timer);
		};
	}, [botIsTyping]);

	const attachClass = () => {
		if (id === 0) return classes[`${side}First`];
		return '';
	};

	const TypographyProps = getTypographyProps(message, id, props);

	return (
		<div>
			{show && (
				<div
					id={id}
					className={clx(
						classes[`${side}Row`],
						classes.box,
						classes[side],
						attachClass()
					)}
				>
					{botIsTyping ? (
						<Loader
							className={classes.loader}
							type="ThreeDots"
							color="#333333"
							height={12}
							width={12}
						/>
					) : (
						<Typography
							align={'left'}
							{...TypographyProps}
							className={clx(classes.text, TypographyProps.className)}
						>
							{message.text}
						</Typography>
					)}
				</div>
			)}
		</div>
	);
};

Balloon.propTypes = {
	id: PropTypes.any,
	message: PropTypes.object,
	getTypographyProps: PropTypes.func,
	side: PropTypes.oneOf(['left', 'right']),
	isTyping: PropTypes.func,
};

Balloon.defaultProps = {
	message: {},
	getTypographyProps: () => ({}),
	side: 'left',
};

export default Balloon;
