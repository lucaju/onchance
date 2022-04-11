import Video, { IVideo } from '../db/models/video';
import { getSentiment } from '../nlp';

export interface IVideoRequest {
  select: string;
  source?: string;
  tags?: string[];
  text?: string;
}

let watchedCollection: IVideo[] = []; // Store watched videos

export const getVideo = async ({ select, source, tags, text }: IVideoRequest) => {
  let selectedVideo: IVideo | undefined;

  if (select === 'source' && source) selectedVideo = await bySourceFile(source);
  if (select === 'tags' && tags) selectedVideo = await byTags(tags);
  if (select === 'sentiment' && text) selectedVideo = await bySentiment(text);

  if (!selectedVideo) return;

  const hasBeenWatched = watchedCollection.includes(selectedVideo);
  if (!hasBeenWatched) watchedCollection = [...watchedCollection, selectedVideo];

  return selectedVideo;
};

const bySourceFile = async (source: string) => {
  return (await Video.findOne({ source }).catch(() => undefined)) as IVideo;
};

const byTags = async (tags: string[]) => {
  let videosAvailable = (await Video.find({ tags: { $all: tags } }).catch(
    () => undefined
  )) as IVideo[];
  if (!videosAvailable) return;
  videosAvailable = filterWatchedVideos(videosAvailable); // filter videos wathched
  return randonPick(videosAvailable); // randomly select video
};

const bySentiment = async (text: string) => {
  // TO DO
  const sentiment = getSentiment(text);
  let videosAvailable = (await Video.find({ sentiment }).catch(() => undefined)) as IVideo[];
  if (!videosAvailable) return;
  videosAvailable = filterWatchedVideos(videosAvailable); // filter videos wathched
  return randonPick(videosAvailable); // randomly select video
};

const filterWatchedVideos = (videosAvailable: IVideo[]) => {
  const unwatchedVideos = videosAvailable.filter((video) => !watchedCollection.includes(video));
  if (unwatchedVideos.length === 0) return videosAvailable; // if all videos were watched, send all available videos back
  return unwatchedVideos;
};

const randonPick = (videosAvailable: IVideo[]) => {
  const randomPick = getRandomIntInclusive(0, videosAvailable.length - 1);
  return videosAvailable[randomPick];
};

const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
};
