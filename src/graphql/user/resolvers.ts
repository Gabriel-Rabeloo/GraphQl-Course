import { DataSources, params } from '../../types/simpleTypes';
import { User } from '../../types/simpleTypes';

const users = async (
  _: undefined,
  { input }: params,
  { getUsers }: any,
): Promise<[User]> => {
  const apiFiltersInput = new URLSearchParams(input);
  const users = await getUsers('/?' + apiFiltersInput);
  return users.data;
};

const user = async (
  _: undefined,
  { id }: params,
  { getUsers }: any,
): Promise<User> => {
  const user = await getUsers('/' + id);
  return user.data;
};

const posts = ({ id }: User, _: undefined, { dataSources }: DataSources) => {
  return dataSources.postApi.batchLoadByUserId(id);
};

export const userResolvers = {
  Query: { user, users },
  User: { posts },
};
