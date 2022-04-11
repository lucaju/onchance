import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useActions, useAppState } from '../../overmind';

const Debug = () => {
  const { debugDialog } = useAppState().general;
  const actions = useActions();

  const handleClose = () => actions.general.setDebugDialog();

  return (
    <Dialog
      aria-describedby="dialog-dialogflow-debug-content"
      aria-labelledby="dialog-dialogflow-debug"
      onClose={handleClose}
      open={!!debugDialog}
    >
      <DialogTitle id="dialog-dialogflow-debug-title">DialogFlow Diagnostic info</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="dialog-dialogflow-debug-content"
          sx={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}
          variant="body2"
        >
          {debugDialog && actions.conversation.getInputById(debugDialog)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="primary" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Debug;
