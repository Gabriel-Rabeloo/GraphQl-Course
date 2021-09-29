import DataLoader from 'dataloader';

import { Post } from '../../types/simpleTypes';

export const makePostDataLoader = (getPosts: any) => {
  return new DataLoader(async (ids: any): Promise<string> => {
    const urlQuery = ids.join('&userId=');
    const posts: [Post] = await getPosts('?userId=' + urlQuery);
    return ids.map((id: string) => {
      return posts.filter((post) => post.userId === id);
    });
  });
};
