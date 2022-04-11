import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Fab, Stack, useTheme } from '@mui/material';
import React, { FC, useState } from 'react';
import { useAppState } from '../../overmind';
import VideoPlayer from './VideoPlayer';

interface IStage {
  sidebarWidth: number;
}

const Stage: FC<IStage> = ({ sidebarWidth }) => {
  const { palette } = useTheme();
  const [videoState] = useState('initial');
  const [muted, setMuted] = useState(false);
  const { last } = useAppState().videos;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onTimeUpdate = ({ currentTime, duration }: { currentTime: number; duration: number }) => {
    // console.log(currentTime, duration);
  };

  const onEnded = () => console.log('Video Ended');
  const handleClick = () => setMuted(!muted);

  const videoJsOptions = {
    autoplay: false,
    controls: false,
    fluid: true,
    preload: 'auto',
    muted,
    onTimeUpdate: onTimeUpdate,
    onEnded: onEnded,
    videoState: videoState,
    video: last,
  };

  return (
    <Stack
      id="stage"
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        width: `calc(100vw - ${sidebarWidth}px)`,
        backgroundColor: palette.common.black,
      }}
    >
      <VideoPlayer {...videoJsOptions} />
      <Fab
        aria-label="sound"
        size="small"
        onClick={handleClick}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 8,
          mb: 1,
          backgroundColor: palette.background.default,
        }}
      >
        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </Fab>
    </Stack>
  );
};

export default Stage;
