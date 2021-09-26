import DataLoader from 'dataloader';

import { Post } from '../../types/simpleTypes';

export const makeUserDataLoader = (getUsers: any) => {
  return new DataLoader(async (ids: any): Promise<string> => {
    const urlQuery = ids.join('&id=');
    const response = await getUsers('?id=' + urlQuery);
    const posts: [Post] = response.data;
    return ids.map((id: string) => posts.filter((post) => post.userId === id));
  });
};
