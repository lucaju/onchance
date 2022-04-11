import { AppBar, Link, Typography } from '@mui/material';
import React, { FC, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useActions } from '../overmind';

interface ITopbar {
  sidebarWidth: number;
}

const Topbar: FC<ITopbar> = ({ sidebarWidth }) => {
  const { reset } = useActions().general;

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    reset();
  };

  return (
    <AppBar color="transparent" elevation={1} sx={{ pr: `${sidebarWidth}px` }}>
      <Typography align="center" component="h1" sx={{ py: 1 }} onClick={handleClick} variant="h4">
        <Link color="inherit" component={RouterLink} to="/" underline="none">
          On Chance
        </Link>
      </Typography>
    </AppBar>
  );
};

export default Topbar;
