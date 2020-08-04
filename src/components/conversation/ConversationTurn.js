import React from 'react';
import PropTypes from 'prop-types';
import clx from 'clsx';
import { Avatar, Grid, makeStyles } from '@material-ui/core';

import AdbIcon from '@material-ui/icons/Adb';
import Balloon from './balloons/Balloon';
import DebubButton from './debug/DebugButton';

const useStyles = makeStyles(({ palette, spacing }) => ({
	avatar: {
		width: spacing(4),
		height: spacing(4),
		backgroundColor: palette.background.default,
		color: palette.action.active,
	},
}));

const ConversationTun = ((props) => {
	const {
		id,
		avatar,
		messages,
		side,
		GridContainerProps,
		GridItemProps,
		AvatarProps,
	} = props;

	const classes = useStyles();

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
					<DebubButton id={id} />
					<Avatar
						src={avatar}
						{...AvatarProps}
						className={clx(classes.avatar, AvatarProps)}
					>
						<AdbIcon />
					</Avatar>
				</Grid>
			)}
			<Grid item xs={side === 'right' ? 'auto' : 8} >
				{messages.map((msg, i) => (
					<Balloon key={i} id={i} message={msg} side={side}/>
				))}
			</Grid>
		</Grid>
	);
});

ConversationTun.propTypes = {
	id: PropTypes.any,
	avatar: PropTypes.string,
	messages: PropTypes.arrayOf(PropTypes.object),
	side: PropTypes.oneOf(['left', 'right']),
	GridContainerProps: PropTypes.shape({}),
	GridItemProps: PropTypes.shape({}),
	AvatarProps: PropTypes.shape({}),
};

ConversationTun.defaultProps = {
	avatar: '',
	messages: [],
	side: 'left',
	GridContainerProps: {},
	GridItemProps: {},
	AvatarProps: {},
};

export default ConversationTun;
