import { Drawer, Grid, TextField, useTheme } from '@mui/material';
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { useActions } from '../overmind';
import Conversation from './Conversation';

const userInputHeight = 64;

interface ISideBar {
  sidebarWidth: number;
}

const SideBar: FC<ISideBar> = ({ sidebarWidth }) => {
  const { palette } = useTheme();
  const { addUserInput, addBotInput } = useActions().conversation;
  const [userInputState, setUserInputState] = useState('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserInputState(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    // event.preventDefault();
    if (event.key === 'Enter') {
      addUserInput(userInputState);
      addBotInput(userInputState);
      setUserInputState('');
    }
  };

  // useLayoutEffect(() => {
  // 	userInputHeight = TextFieldNode.scrollHeight;
  // 	console.log(userInputHeight);
  // },[]);

  return (
    <Drawer anchor="right" PaperProps={{ sx: { width: sidebarWidth } }} variant="permanent">
      <Grid
        alignItems="stretch"
        container
        direction="column"
        justifyContent="space-between"
        // sx={{ height: '100vh' }}
      >
        <Conversation userInputHeight={userInputHeight} />
        <TextField
          autoComplete="off"
          placeholder="Type here"
          id="user-input"
          onChange={handleOnChange}
          onKeyPress={handleKeyPress}
          sx={{ p: 2, background: palette.grey[700] }}
          // multiline
          value={userInputState}
          variant="standard"
        />
      </Grid>
    </Drawer>
  );
};

export default SideBar;
