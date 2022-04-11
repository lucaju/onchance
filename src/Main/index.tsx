import React from 'react';
import { useAppState } from '../overmind';
import Debug from './Debug';
import Sidebar from './Sidebar';
import Stage from './Stage';
import Topbar from './Topbar';

const Main = () => {
  const sidebarWidth = 400;
  const debug = useAppState().general;

  return (
    <>
      <Topbar sidebarWidth={sidebarWidth} />
      <Sidebar sidebarWidth={sidebarWidth} />
      <Stage sidebarWidth={sidebarWidth} />
      {debug && <Debug />}
    </>
  );
};

export default Main;
