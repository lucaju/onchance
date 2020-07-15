export const byFilename = ({ videoCollection, fileName }) => {
	const selectedVideo = videoCollection.find(
		(video) => video.fileName.toLowerCase() === fileName.toLowerCase()
	);
	if (!selectedVideo) return { error: 'No video found' };
	return selectedVideo;
};
