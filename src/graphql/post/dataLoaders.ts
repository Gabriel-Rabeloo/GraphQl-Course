import DataLoader from 'dataloader';

import { Post } from '../../types/simpleTypes';

export const makePostDataLoader = (getPosts: any) => {
  return new DataLoader(async (ids: any): Promise<string> => {
    const urlQuery = ids.join('&userId=');
    const response = await getPosts('?userId=' + urlQuery);
    const posts: [Post] = response.data;
    return ids.map((id: string) => {
      return posts.filter((post) => post.userId === id);
    });
  });
};
