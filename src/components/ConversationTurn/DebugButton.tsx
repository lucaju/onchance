import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import React, { FC } from 'react';
import { useActions } from '../../overmind';

interface IDebugButton {
  id: number;
}

const DebugButton: FC<IDebugButton> = ({ id }) => {
  const { setDebugDialog } = useActions().general;

  const showDebugData = () => setDebugDialog(id.toString());

  return (
    <IconButton aria-label="debug" onClick={showDebugData} size="small" sx={{ ml: 0.5 }}>
      <InfoIcon fontSize="inherit" sx={{ opacity: 0.2 }} />
    </IconButton>
  );
};

export default DebugButton;
