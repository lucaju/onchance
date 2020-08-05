import React from 'react';
import PropTypes from 'prop-types';
import clx from 'clsx';
import { Avatar, Grid, makeStyles } from '@material-ui/core';

import AdbIcon from '@material-ui/icons/Adb';
import Balloon from './balloons/Balloon';
import DebubButton from './debug/DebugButton';

import { useApp } from '../../app';

const useStyles = makeStyles(({ palette, spacing }) => ({
	avatar: {
		width: spacing(4),
		height: spacing(4),
		backgroundColor: palette.background.default,
		color: palette.action.active,
	},
}));

const ConversationTun = ({
	id,
	avatar,
	AvatarProps,
	GridContainerProps,
	GridItemProps,
	messages,
	side,
}) => {
	const classes = useStyles();
	const { state } = useApp();

	return (
		<Grid
			id={id}
			container
			spacing={2}
			justify={side === 'right' ? 'flex-end' : 'flex-start'}
			alignItems="flex-end"
			{...GridContainerProps}
		>
			{side === 'left' && (
				<Grid item {...GridItemProps}>
					{state.general.debug && <DebubButton id={id} />}
					<Avatar
						src={avatar}
						{...AvatarProps}
						className={clx(classes.avatar, AvatarProps)}
					>
						<AdbIcon />
					</Avatar>
				</Grid>
			)}
			<Grid
				item
				container
				xs={8}
				justify={side === 'right' ? 'flex-end' : 'flex-start'}
			>
				{messages.map((msg, i) => (
					<Balloon key={i} id={i} message={msg} side={side} />
				))}
			</Grid>
		</Grid>
	);
};

ConversationTun.propTypes = {
	id: PropTypes.any,
	avatar: PropTypes.string,
	AvatarProps: PropTypes.shape({}),
	GridContainerProps: PropTypes.shape({}),
	GridItemProps: PropTypes.shape({}),
	messages: PropTypes.arrayOf(PropTypes.object),
	side: PropTypes.oneOf(['left', 'right']),
};

ConversationTun.defaultProps = {
	avatar: '',
	AvatarProps: {},
	GridContainerProps: {},
	GridItemProps: {},
	messages: [],
	side: 'left',
};

export default ConversationTun;
