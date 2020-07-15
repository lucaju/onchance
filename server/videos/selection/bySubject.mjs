import { byKeyword } from './byKeyword.mjs';

export const bySubject = ({ videoCollection, subject, keyword }) => {
	const subjectLowercase = subject.toLowerCase();

	let videosAvailable = videoCollection.filter((video) => {
		const videoSubjects = video.subject.join(' ').toLowerCase();
		return videoSubjects.match(subjectLowercase);
	});

	if (videosAvailable.length == 0) return [];

	//if keywords
	if (keyword) {
		videosAvailable = byKeyword({
			videoCollection: videosAvailable,
			keyword,
		});
	}

	return videosAvailable;
};
