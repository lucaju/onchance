import { Box, Stack } from '@mui/material';
import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useActions, useAppState } from '../../overmind';
import ConversationTurn from '../../components/ConversationTurn';
import { initialSpeech } from './speechCollection';

interface IConversation {
  userInputHeight: number;
  userLastMessage?: string;
}

const Conversation: FC<IConversation> = ({ userInputHeight }) => {
  const [botJustTyped, SetBotJustTyped] = useState(false);
  const { log } = useAppState().conversation;
  const { addBotInput, addNarratorInput } = useActions().conversation;

  let conversationNode: any;

  // bot first interaction
  useEffect(() => {
    addNarratorInput({ delay: 0, text: initialSpeech, type: 'text' });
    const timer = setTimeout(() => addBotInput('hello'), 1000);
    return () => clearTimeout(timer);
  }, []);

  const botIsTyping = (value?: number) => {
    SetBotJustTyped(!!value);
  };

  // update conversation
  useLayoutEffect(() => {
    // scroll
    conversationNode.scrollTop = conversationNode.scrollHeight;
  }, [log, botJustTyped]);

  return (
    <Box
      ref={(node) => (conversationNode = node)}
      sx={{
        p: 1,
        height: `calc(100vh - ${userInputHeight}px)`,
        overflowY: 'auto',
      }}
    >
      <Stack>
        {log.map(({ id, from, responses }) => (
          <ConversationTurn
            key={id}
            id={id}
            isTyping={botIsTyping}
            messages={responses}
            source={from}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Conversation;
