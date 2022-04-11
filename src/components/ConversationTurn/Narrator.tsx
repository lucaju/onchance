import { Box, Typography, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { IDialogueResponse } from '../../types';

interface INarrator {
  id: number;
  message: IDialogueResponse;
}

const Narrator: FC<INarrator> = ({ id, message }) => {
  const { palette } = useTheme();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), message.delay);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <>
      {show && (
        <Box id={id.toString()} sx={{ py: 1, px: 2, mb: 2 /* display: 'inline-block', */ }}>
          <Typography
            align="left"
            sx={{
              fontSize: '.75rem',
              lineHeight: '1.6rem',
              whiteSpace: 'pre-line',
              color: palette.grey[200],
            }}
            variant="overline"
          >
            {message.text}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Narrator;
