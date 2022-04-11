import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ConversationTurn from '../components/ConversationTurn';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Stack spacing={20}>
        <Box sx={{ height: '100vh', textAlign: 'center', pt: 20 }}>
          <Typography
            gutterBottom
            sx={{ fontFamily: 'Share Tech Mono', fontSize: '7.8rem', color: yellow['A200'] }}
            variant="h1"
          >
            On Chance
          </Typography>

          <ConversationTurn
            id={1}
            messages={[{ type: 'text', text: 'How predictive algorithms are changing your life?' }]}
            source="bot"
          />

          <Typography paragraph sx={{ mt: 5, fontFamily: 'Share Tech Mono' }} variant="body1">
            {`From the uncertainty about the weather to the people we meet, chance is constantly affecting our lives. But if we could have more data and develop more precise models and algorithms, could we predict and control future events?
					On Chance is a chatbot documentary exploring predictive algorithms. Have a chat with Jana and collaborate with her on a story about how predictive algorithms affect our lives.
					On Chance is best experienced on computer screens.`}
          </Typography>

          <Button
            component={RouterLink}
            size="large"
            sx={{ mt: 10, fontFamily: 'Share Tech Mono', color: yellow['A100'] }}
            to="/bot"
          >
            Click to start
          </Button>
        </Box>

        <Divider />

        <Box>
          <Typography
            align="center"
            component="h2"
            gutterBottom
            sx={{ pb: 5, fontFamily: 'Share Tech Mono' }}
            variant="h4"
          >
            Who developed?
          </Typography>

          <ConversationTurn
            id={2}
            messages={[
              {
                type: 'text',
                text: 'Julia Salles, PhD candidate in Communication Studies at Université du Québec à Montréal and a Lecturer at Université de Montréal.',
              },
              {
                type: 'text',
                text: 'Luciano Frizzera PhD candidate in Communication Studies at Concordia University.',
              },
            ]}
            source="bot"
          />
        </Box>

        <Box>
          <Typography
            align="center"
            component="h2"
            gutterBottom
            sx={{ pb: 5, fontFamily: 'Share Tech Mono' }}
            variant="h4"
          >
            Tell me more about the project
          </Typography>

          <Typography paragraph variant="body1">
            The development of digital technologies and access to vast amounts of data have revived
            the human ambition to plan and control the future. Using predictive models based on
            large collections of data, analysts claim to be able to reduce uncertainty and increase
            control over interactions with the world.
          </Typography>
          <Typography paragraph variant="body1">
            Nevertheless, since the end of the 19th century, non-deterministic scientific fields
            have emerged putting randomness at the center of various theories. The development of
            statistical physics, quantum mechanics, molecular biology, chaos and algorithmic
            complexity, contributed to the questioning of the deterministic paradigm according to
            which all events are pre-determined by the past. On Chance addresses the apparent
            conflict between determinism and randomness in contemporary culture.
          </Typography>
          <Typography paragraph variant="body1">
            On Chance is part of a research-creation thesis in communication studies aiming to
            explore how chatbots can be used as interactive tools for conversational documentary
            storytelling. A chatbot is a human-computer interaction interface that uses artificial
            intelligence (AI), especially in natural language processing. In On Chance, the chatbot
            is an interactive tool to explore the archive material and original content.
          </Typography>
        </Box>

        <Box>
          <Typography
            align="center"
            component="h2"
            gutterBottom
            sx={{ pb: 5, fontFamily: 'Share Tech Mono' }}
            variant="h4"
          >
            Can I see the code?
          </Typography>

          <Grid alignItems="center" container direction="column" justifyContent="center">
            <IconButton
              aria-label="Github"
              href="https://github.com/lucaju/onchance"
              rel="noreferrer"
              target="_blank"
            >
              <GitHubIcon sx={{ fontSize: '3rem' }} />
            </IconButton>

            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              rel="noreferrer"
              target="_blank"
            >
              <img
                src="assets/cc-by-nc.png"
                alt="Creative Commons"
                style={{ width: 75, marginTop: 16, opacity: 0.3 }}
              />
            </a>
          </Grid>
        </Box>

        <Box pb={10}>
          <Typography
            align="center"
            component="h2"
            gutterBottom
            sx={{ pb: 5, fontFamily: 'Share Tech Mono' }}
            variant="h4"
          >
            Have it received any support?
          </Typography>

          <Grid alignItems="center" container direction="row" justifyContent="space-evenly">
            <a href="https://capes.gov.br/" rel="noreferrer" target="_blank">
              <img alt="Capes" src="assets/capes.png" width={80} />
            </a>
            <a href="https://hexagram.ca/index.php/eng/" rel="noreferrer" target="_blank">
              <img alt="Hexagram" src="assets/hexagram.png" width={100} />
            </a>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
