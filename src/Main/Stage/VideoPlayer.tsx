import React, { FC, useEffect } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';

let player: VideoJsPlayer;

interface IVideoPlayer {
  muted: boolean;
  video: any;
  onEnded: () => void;
  onTimeUpdate: ({ currentTime, duration }: { currentTime: number; duration: number }) => void;
  videoState: string;
}

const VideoPlayer: FC<IVideoPlayer> = ({ muted, video, onEnded, onTimeUpdate, videoState }) => {
  let videoNode: Element | null;

  useEffect(() => {
    if (player) return;
    if (!videoNode) return;

    // instantiate Video.js
    player = videojs(videoNode, { muted }, () => {
      // console.log('onPlayerReady', player);
    });

    player.on('timeupdate', () => {
      onTimeUpdate({
        currentTime: player.currentTime(),
        duration: player.duration(),
      });
    });

    player.on('ended', () => onEnded());

    // return () => {
    //     console.log('Cleaned up');
    //     if (player) player.dispose();
    //     player = undefined;
    // };
  });

  useEffect(() => {
    if (videoState === 'play') player.play();
    if (videoState === 'stop') player.pause();
  }, [videoState]);

  useEffect(() => {
    if (!video) {
      player.reset();
    } else {
      // player.src(`https://onchance.net/videos/${video.source}`);
      player.src(`videos/${video.source}`);
      setTimeout(() => {
        player.play();
      }, video.delay);
    }
  }, [video]);

  useEffect(() => {
    player.muted(muted);
  }, [muted]);

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  return (
    <div data-vjs-player>
      <video ref={(node) => (videoNode = node)} className="video-js"></video>
    </div>
  );
};

export default VideoPlayer;
