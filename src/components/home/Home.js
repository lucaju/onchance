import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Button,
	Container,
	Divider,
	Grid,
	IconButton,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import GitHubIcon from '@material-ui/icons/GitHub';


import Balloon from '../shared/Balloon';

const useStyles = makeStyles((theme) => ({
	main: {
		height: '100vh',
		textAlign: 'center',
		paddingTop: theme.spacing(20),
	},
	section: {
		paddingTop: theme.spacing(10),
		paddingBottom: theme.spacing(10),
	},
	title: {
		fontFamily: 'Share Tech Mono',
		fontSize: '7.8rem',
		color: yellow['A200'],
	},
	heading: {
		fontFamily: 'Share Tech Mono',
		paddingBottom: theme.spacing(5),
	},
	shareTechMonoFont: { fontFamily: 'Share Tech Mono' },
	balloon: { marginBottom: theme.spacing(5) },
	startButton: {
		marginTop: theme.spacing(10),
		color: yellow['A100'],
	},
	github: { fontSize: '3rem' },
	creativeCommons: {
		width: 75,
		opacity: 0.3,
		marginTop: theme.spacing(2),
	},
}));

const Home = () => {
	const classes = useStyles();

	return (
		<Container maxWidth="md">
			<div className={classes.main}>
				<Typography variant="h1" className={classes.title} gutterBottom>
					On Chance
				</Typography>

				<Balloon
					GridContainerProps={{
						classes: { root: classes.balloon },
					}}
					messages={['How randomness changes your life?']}
				/>

				<Typography ariant="body1" paragraph={true} className={classes.shareTechMonoFont}>
					From the uncertainty about the weather to the choices we make at the supermarket, chance is constantly affecting our lives. But if we could have more data and develop more precise models and algorithms, could we predict and control future events? On Chance is a documentary chatbot exploring the philosophy and science of randomness. Have a chat about how randomness affects our lives and explore the notion of chance through conversations, movie scenes, archive material and original interviews.
				</Typography>
				
				<Button
					className={classes.startButton}
					size="large"
					classes={{ label: classes.shareTechMonoFont }}
					component={RouterLink}
					to="/bot"
				>
					Click to start
				</Button>
			</div>

			<Divider />

			<div className={classes.section}>
				<Typography
					variant="h4"
					component="h2"
					align="center"
					className={classes.heading}
					gutterBottom
				>
					Who developed?
				</Typography>

				<Balloon
					GridContainerProps={{
						classes: { root: classes.balloon },
					}}
					messages={[
						'Julia Salles, PhD candidate in Communication Studies at Université du Québec à Montréal and a Lecturer at Université de Montréal.',
						'Luciano Frizzera PhD candidate in Communication Studies at Concordia University.',
					]}
				/>
			</div>

			<div className={classes.section}>
				<Typography
					variant="h4"
					component="h2"
					align="center"
					className={classes.heading}
					gutterBottom
				>
					Tell me more about the project
				</Typography>

				<Typography variant="body1" paragraph={true}>
					The development of digital technologies and access to vast amounts of data have revived the human ambition to plan and control the future. Using predictive models based on large collections of data, analysts claim to be able to reduce uncertainty and increase control over interactions with the world.
				</Typography>
				<Typography variant="body1" paragraph={true}>
					Nevertheless, since the end of the 19th century, non-deterministic scientific fields have emerged putting randomness at the center of various theories. The development of statistical physics, quantum mechanics, molecular biology, chaos and algorithmic complexity, contributed to the questioning of the deterministic paradigm according to which all events are pre-determined by the past. On Chance addresses the apparent conflict between determinism and randomness in contemporary culture.
				</Typography>
				<Typography variant="body1" paragraph={true}>
					On Chance is part of a research-creation thesis in communication studies aiming to explore how chatbots can be used as interactive tools for conversational documentary storytelling. A chatbot is a human-computer interaction interface that uses artificial intelligence (AI), especially in natural language processing. In On Chance, the chatbot is an interactive tool to explore the archive material and original content.
				</Typography>
			</div>

			<div className={classes.section}>
				<Typography
					variant="h4"
					component="h2"
					align="center"
					className={classes.heading}
					gutterBottom
				>
					Can I see the code?
				</Typography>

				<Grid container direction="column" justify="center" alignItems="center">
					<IconButton
						href="https://github.com/lucaju/onchance"
						target="_blank"
						rel="noreferrer"
						aria-label="Github"
					>
						<GitHubIcon className={classes.github} />
					</IconButton>

					<a
						href="https://creativecommons.org/licenses/by-nc/4.0/"
						target="_blank"
						rel="noreferrer"
					>
						<img
							className={classes.creativeCommons}
							src="assets/cc-by-nc.png"
							alt="Creative Commons"
						/>
					</a>
				</Grid>
			</div>

			<div className={classes.section}>
				<Typography
					variant="h4"
					component="h2"
					align="center"
					className={classes.heading}
					gutterBottom
				>
					Have it received any support?
				</Typography>

				<Grid container direction="row" justify="space-evenly" alignItems="center">
					<a href="https://capes.gov.br/" target="_blank" rel="noreferrer">
						<img width={80} src="assets/capes.png" alt="Capes" />
					</a>
					<a href="https://hexagram.ca/index.php/eng/" target="_blank" rel="noreferrer">
						<img width={100} src="assets/hexagram.png" alt="Hexagram" />
					</a>
				</Grid>
			</div>
		</Container>
	);
};

export default Home;
