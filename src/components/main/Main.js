import React from 'react';

import Topbar from './Topbar';
import Sidebar from './sidebar/Sidebar';
import Stage from './stage/Stage';
import Debug from './../dialogs/Debug';

import { useApp } from '../../app';

const Main = () => {
	const sidebarWidth = 400;
	const { state } = useApp();

	return (
		<div>
			<Topbar sidebarWidth={sidebarWidth} />
			<Sidebar sidebarWidth={sidebarWidth} />
			<Stage sidebarWidth={sidebarWidth} />
			{state.general.debug && <Debug />}
		</div>
	);
};

export default Main;
