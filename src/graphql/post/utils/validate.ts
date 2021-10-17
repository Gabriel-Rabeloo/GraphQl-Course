import { ValidationError } from 'apollo-server-errors';
import { PostsApi } from '../dataSources';

export const userExist = async (userId: string, dataSource: PostsApi) => {
  try {
    await dataSource.context.dataSources.userApi.get(userId);
  } catch (e) {
    throw new ValidationError(`User ${userId} does not exist`);
  }
};
