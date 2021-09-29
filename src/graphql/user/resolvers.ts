import { DataSources, params } from '../../types/simpleTypes';
import { User } from '../../types/simpleTypes';

const users = async (
  _: undefined,
  { input }: params,
  { dataSources }: DataSources,
): Promise<[User]> => {
  const users = await dataSources.userApi.getUsers(input);
  return users;
};

const user = async (
  _: undefined,
  { id }: params,
  { dataSources }: DataSources,
): Promise<User> => {
  const user = await dataSources.userApi.getUser(id);
  return user;
};

const posts = ({ id }: User, _: undefined, { dataSources }: DataSources) => {
  return dataSources.postApi.batchLoadByUserId(id);
};

export const userResolvers = {
  Query: { user, users },
  User: { posts },
};
