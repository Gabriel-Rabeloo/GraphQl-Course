import { params } from '../../types/simpleTypes';
import { User } from '../../types/simpleTypes';

const users = async (
  _: string,
  { input }: params,
  { getUsers }: any,
): Promise<[User]> => {
  const apiFiltersInput = new URLSearchParams(input);
  const users = await getUsers('/?' + apiFiltersInput);
  return users.data;
};

const user = async (
  _: string,
  { id }: params,
  { getUsers }: any,
): Promise<User> => {
  const user = await getUsers('/' + id);
  return user.data;
};

const posts = ({ id }: User, _: any, { postDataLoader }: any) => {
  return postDataLoader.load(id);
};

export const userResolvers = {
  Query: { user, users },
  User: { posts },
};
