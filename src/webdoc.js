/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

//modules
// import $ from 'jquery';

// import 'materialize-css/dist/css/materialize.min.css';
// import './style.css';

import * as nav from './components/top-nav-bar';
import * as video from './components/video-view-port';
import * as sidebar from './components/sidebar';

const initiate = () => {

	nav.addNav();
	$('<div id="main" class="row">').appendTo($('#app'));
	video.addVideoSection();
	sidebar.addSidebar();
	$(window).resize();

	introFullScreen();
};

const introFullScreen = () => {

	const videoSectionCOntainer = $('#video-section');
	const sidebarContainer = $('#side-bar');
	
	videoSectionCOntainer.removeClass('l9 m8');
	videoSectionCOntainer.addClass('l12 m12');
	sidebarContainer.css('display','none');

	$('body').on('video-ended', () => {
		videoSectionCOntainer.removeClass('l12 m12');
		videoSectionCOntainer.addClass('l9 m8');
		
		sidebarContainer.css('opacity',0);
		sidebarContainer.css('display','inline');
		sidebarContainer.animate({
			opacity: 1,
		}, 3000);

		$('body').off('video-ended');
	});

};

initiate();