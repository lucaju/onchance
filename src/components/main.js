import nav from './top-nav-bar';
import sidebar from './sidebar';
import video from './video-view-port';


const render = () => {

	nav.render();
	$('<div id="main" class="row">').appendTo($('#app'));
	video.render();
	sidebar.render();
	$(window).resize();

	$('textarea').focus();
	// introFullScreen();
};

// const introFullScreen = () => {

// 	const videoSectionContainer = $('#video-section');
// 	const sidebarContainer = $('#side-bar');
	
// 	videoSectionContainer.removeClass('l9 m8');
// 	videoSectionContainer.addClass('l12 m12');
// 	sidebarContainer.css('display','none');

// 	$('body').on('video-ended', () => {
// 		videoSectionContainer.removeClass('l12 m12');
// 		videoSectionContainer.addClass('l9 m8');
		
// 		nav.render();
// 		$('<div id="main" class="row">').appendTo($('#app'));
// 		video.render();
// 		sidebar.render();
// 		$(window).resize();
	
// 		sidebarContainer.css('opacity',0);
// 		sidebarContainer.css('display','inline');
// 		sidebarContainer.animate({
// 			opacity: 1,
// 		}, 3000);

// 		$('body').off('video-ended');

// 		$('textarea').focus();
		
// 	});

// };

export default {
	render
};