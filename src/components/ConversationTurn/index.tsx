import AdbIcon from '@mui/icons-material/Adb';
import { Avatar, Box, Grid, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { useAppState } from '../../overmind';
import { DialogueSource, IDialogueResponse } from '../../types';
import Balloon from './Balloon';
import Narrator from './Narrator';
import DebubButton from './DebugButton';

interface IConversationTun {
  avatar?: string;
  AvatarProps?: any;
  GridContainerProps?: any;
  GridItemProps?: any;
  id: number;
  isTyping?: (id?: number) => void;
  messages: IDialogueResponse[];
  source: DialogueSource;
}

const ConversationTun: FC<IConversationTun> = ({
  avatar,
  id,
  isTyping,
  messages = [],
  source = 'bot',
}) => {
  const { debug } = useAppState().general;
  const { palette } = useTheme();
  const side = source === 'user' ? 'right' : 'left';

  return (
    <Grid
      alignItems="flex-end"
      container
      id={id.toString()}
      justifyContent={side === 'right' ? 'flex-end' : 'flex-start'}
      spacing={2}
    >
      {side === 'left' && source !== 'narrator' && (
        <Grid item>
          {debug && <DebubButton id={id} />}
          <Avatar
            src={avatar}
            sx={{
              width: 32,
              height: 32,
              backgroundColor: palette.background.default,
              color: palette.action.active,
            }}
          >
            <AdbIcon />
          </Avatar>
        </Grid>
      )}
      <Grid
        container
        item
        justifyContent={side === 'right' ? 'flex-end' : 'flex-start'}
        xs={source === 'narrator' ? 12 : 8}
      >
        {messages.map((msg, i) => {
          if (msg.type === 'text') {
            return (
              <Box key={i}>
                {source === 'narrator' ? (
                  <Narrator id={i} message={msg} />
                ) : (
                  <Balloon id={i} isTyping={isTyping} message={msg} side={side} />
                )}
              </Box>
            );
          }
        })}
      </Grid>
    </Grid>
  );
};

export default ConversationTun;
