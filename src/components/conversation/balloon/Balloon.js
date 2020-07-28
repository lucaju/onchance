import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clx from 'clsx';
import { Avatar, Grid, Typography, withStyles } from '@material-ui/core';

import AdbIcon from '@material-ui/icons/Adb';
import balloonStyles from './Balloon.style';
import DebubButton from '../debug/DebugButton';

import { useApp } from '../../../app';

// let timer;

const Balloon = withStyles(balloonStyles, { name: 'ChatMsg' })((props) => {
	const {
		id,
		classes,
		avatar,
		messages,
		side,
		GridContainerProps,
		GridItemProps,
		AvatarProps,
		getTypographyProps,
		delay,
	} = props;

	const { state } = useApp();
	const [isLoading, setIsloading] = useState(true);

	

	const attachClass = (index) => {
		if (index === 0) return classes[`${side}First`];
		if (index === messages.length - 1) return classes[`${side}Last`];
		return '';
	};

	useEffect(() => {
		const timer = setTimeout(() => setIsloading(false), delay);
		return () => clearTimeout(timer);
	}, [delay]);

	return (
		<Grid
			container
			spacing={2}
			justify={side === 'right' ? 'flex-end' : 'flex-start'}
			alignItems="flex-end"
			{...GridContainerProps}
		>
			{side === 'left' && (
				<Grid item {...GridItemProps}>
					{!isLoading && state.general.debug && id && <DebubButton id={id} />}
					<Avatar
						src={avatar}
						{...AvatarProps}
						className={clx(classes.avatar, AvatarProps.className)}
					>
						<AdbIcon />
					</Avatar>
				</Grid>
			)}
			<Grid item xs={8}>
				{isLoading && (
					<div className={classes[`${side}Row`]}>
						<Typography align={'left'} className={clx(classes.msg, classes[side])}>
							. . .
						</Typography>
					</div>
				)}
				{!isLoading &&
					messages.map((msg, i) => {
						const TypographyProps = getTypographyProps(msg, i, props);
						return (
							<div key={msg.id || i} className={classes[`${side}Row`]}>
								<Typography
									align={'left'}
									{...TypographyProps}
									className={clx(
										classes.msg,
										classes[side],
										attachClass(i),
										TypographyProps.className
									)}
								>
									{msg}
								</Typography>
							</div>
						);
					})}
			</Grid>
		</Grid>
	);
});

Balloon.propTypes = {
	id: PropTypes.any,
	avatar: PropTypes.string,
	messages: PropTypes.arrayOf(PropTypes.string),
	side: PropTypes.oneOf(['left', 'right']),
	GridContainerProps: PropTypes.shape({}),
	GridItemProps: PropTypes.shape({}),
	AvatarProps: PropTypes.shape({}),
	getTypographyProps: PropTypes.func,
	delay: PropTypes.number,
};

Balloon.defaultProps = {
	avatar: '',
	messages: [],
	side: 'left',
	GridContainerProps: {},
	GridItemProps: {},
	AvatarProps: {},
	getTypographyProps: () => ({}),
	delay: 0,
};

export default Balloon;
