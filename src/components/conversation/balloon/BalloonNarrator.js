import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(({palette, spacing}) => ({
	msg: {
		padding: spacing(1, 2),
		marginBottom: 4,
		display: 'inline-block',
		wordBreak: 'break-word',
		// fontFamily: 'Share Tech Mono',
		fontSize: 14,
		color: palette.grey[200],
	},
}));

const Balloon = (({messages, GridContainerProps, delay}) => {
	const classes = useStyles();
	const [isLoading, setIsloading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setIsloading(false), delay);
		return () => clearTimeout(timer);
	}, [delay]);

	return (
		<Grid
			container
			spacing={2}
			justify='flex-start'
			alignItems="flex-end"
			{...GridContainerProps}
		>
			<Grid item>
				{isLoading && (
					<div>
						<Typography align={'left'} className={classes.msg}>
							...
						</Typography>
					</div>
				)}
				{!isLoading &&
					<Typography align={'left'} className={classes.msg}>
						{messages}
					</Typography>
				}
			</Grid>
		</Grid>
	);
});

Balloon.propTypes = {
	id: PropTypes.any,
	messages: PropTypes.array,
	GridContainerProps: PropTypes.shape({}),
	delay: PropTypes.number,
};

Balloon.defaultProps = {
	messages: [],
	GridContainerProps: {},
	delay: 0,
};

export default Balloon;
