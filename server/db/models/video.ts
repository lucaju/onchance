import { model, Model, Schema } from 'mongoose';

export interface IVideo {
  id: string;
  source?: string;
  title?: string;
  author?: string;
  year?: number;
  duration?: string;
  genre?: string;
  language?: string;
  caption?: string;
  tags?: string[];
}

const videoSchema = new Schema<IVideo, Model<IVideo>>(
  {
    title: { type: String, required: true, trim: true },
    source: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    tags: [String],
    author: { type: String, trim: true },
    year: { type: Number },
    genre: { type: String, trim: true },
    language: { type: String, trim: true },
    caption: { type: String, trim: true },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const Video = model<IVideo, Model<IVideo>>('Video', videoSchema);

export default Video;
