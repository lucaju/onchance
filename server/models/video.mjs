import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	source: {
		type: String,
		required: true,
		trim: true
	},
	duration: {
		type: String,
		required: true,
		trim: true
	},
	tags: [String],
	author: { type: String, trim: true },
	year: { type: Number },
	genre: { type: String, trim: true},
	language: { type: String, trim: true },
	caption: { type: String, trim: true },
}, {
	timestamps: true,
	strict: false
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
