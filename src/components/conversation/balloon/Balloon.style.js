export default ({ palette, spacing }) => {
	const radius = spacing(1.5);
	const size = spacing(4);
	const rightBgColor = palette.primary.main;

	return {
		avatar: {
			width: size,
			height: size,
			backgroundColor: palette.background.default,
			color: palette.action.active,
		},
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
			backgroundColor: rightBgColor,
			color: palette.common.white,
		},
		leftFirst: { borderTopLeftRadius: radius },
		// leftLast: { borderBottomLeftRadius: radius },
		rightFirst: { borderTopRightRadius: radius },
		// rightLast: { borderBottomRightRadius: radius },
		text: {
			fontSize: 14,
			wordBreak: 'break-word',
			// fontFamily:
			// 	`-apple-system,
			// 	BlinkMacSystemFont,
			// 	"Segoe UI",
			// 	Roboto,
			// 	Helvetica,
			// 	Arial,
			// 	sans-serif,
			// 	"Apple Color Emoji",
			// 	"Segoe UI Emoji",
			// 	"Segoe UI Symbol"`,
		},
		loader: {
			paddingTop: 9,
			height: 20
		}
	};
};
