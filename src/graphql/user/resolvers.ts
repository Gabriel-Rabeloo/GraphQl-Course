import { Context, DataSources, params } from '../../interfaces/simpleTypes';
import { User } from '../../interfaces/simpleTypes';
import { checkOwner } from '../login/utils/validate';

const users = async (_: undefined, { input }: params, { dataSources }: DataSources): Promise<User[]> => {
  const users = await dataSources.userApi.getUsers(input);
  return users;
};

const user = async (_: undefined, { id }: params, { dataSources }: DataSources): Promise<User> => {
  const user = await dataSources.userApi.getUser(id);
  return user;
};

//Mutation Resolvers
const createUser = async (_: undefined, { data }: any, { dataSources }: DataSources) => {
  return dataSources.userApi.createUser(data);
};

const updateUser = async (_: undefined, { data, userId }: any, { dataSources, loggedUserId }: Context) => {
  checkOwner(userId, loggedUserId);
  return dataSources.userApi.updateUser(userId, data);
};

const deleteUser = async (_: undefined, { userId }: any, { dataSources, loggedUserId }: Context) => {
  checkOwner(userId, loggedUserId);
  return dataSources.userApi.deleteUser(userId);
};

// Field Resolvers
const posts = ({ id }: User, _: undefined, { dataSources }: DataSources) => {
  return dataSources.postApi.batchLoadByUserId(id);
};

export const userResolvers = {
  Query: { user, users },
  Mutation: { createUser, updateUser, deleteUser },
  User: { posts },
};
