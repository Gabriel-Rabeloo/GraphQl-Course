import DataLoader from 'dataloader';

import { Post } from '../../interfaces/simpleTypes';

// eslint-disable-next-line no-unused-vars
type GetPost = (query: string) => Promise<Post[]>;

export const makePostDataLoader = (getPosts: GetPost) => {
  return new DataLoader(async (ids: any): Promise<string> => {
    const urlQuery = ids.join('&userId=');
    const posts = await getPosts('?userId=' + urlQuery);
    return ids.map((id: string) => {
      return posts.filter((post) => post.userId === id);
    });
  });
};
