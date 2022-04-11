import { Context } from '../';
import { IVideo } from '../../types';

export const add = ({ state }: Context, video: IVideo) => {
  state.videos.log = [...state.videos.log, video];
};
