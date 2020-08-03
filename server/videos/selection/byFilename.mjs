export const byFilename = ({ videoCollection, filename }) => {
	const selectedVideo = videoCollection.find(
		(video) => video.fileName.toLowerCase() === filename.toLowerCase()
	);
	if (!selectedVideo) return { error: 'No video found' };
	return selectedVideo;
};
