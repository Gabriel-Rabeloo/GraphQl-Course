import DataLoader from 'dataloader';

import { User } from '../../types/simpleTypes';

export const makeUserDataLoader = (getUsers: any) => {
  return new DataLoader(async (ids: any): Promise<string> => {
    const urlQuery = ids.join('&id=');
    const users: [User] = await getUsers('?id=' + urlQuery);
    return ids.map((id: string) => users.find((user) => user.id === id));
  });
};
