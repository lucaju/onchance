export const byKeyword = ({ videoCollection, keyword }) => {
	const keywordLowercase = keyword.toLowerCase();

	const videosAvailable = videoCollection.filter((video) => {
		if (video.keywords) {
			const videoKeywords = video.keywords.join(' ').toLowerCase();
			return videoKeywords.match(keywordLowercase);
		}
	});

	return videosAvailable;
};
