import { Box, Typography, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { IDialogueResponse } from '../../types';

interface IBalloon {
  id: number;
  isTyping?: (id?: number) => void;
  message: IDialogueResponse;
  side: 'left' | 'right';
}

const Balloon: FC<IBalloon> = ({ id, isTyping, message, side = 'left' }) => {
  const { palette } = useTheme();
  const [show, setShow] = useState(false);
  const [botIsTyping, setBotIsTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), message.delay);
    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    const timer = setTimeout(() => setBotIsTyping(false), message.typingTime);
    return () => {
      if (isTyping) isTyping(id);
      clearTimeout(timer);
    };
  }, [botIsTyping]);

  return (
    <>
      {show && (
        <Box
          id={id.toString()}
          sx={{
            display: 'inline-block',
            mb: 0.5,
            py: 1,
            px: 2,
            borderRadius: 4,
            borderTopRightRadius: id === 0 ? 12 : side === 'left' ? 12 : 0,
            borderTopLeftRadius: id === 0 ? 12 : side === 'right' ? 12 : 0,
            borderBottomRightRadius: side === 'left' ? 12 : 0,
            borderBottomLeftRadius: side === 'right' ? 12 : 0,
            color: side === 'left' ? palette.grey[700] : palette.common.white,
            backgroundColor: side === 'left' ? palette.grey[100] : palette.primary.main,
            textAlign: side,
          }}
        >
          {botIsTyping ? (
            <ThreeDots color="#333333" height={12} width={12} />
          ) : (
            <Typography align="left" sx={{ fontSize: '.85rem', wordBreak: 'break-word' }}>
              {message.text}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default Balloon;
