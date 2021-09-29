import { DataSources, Error } from '../../types/simpleTypes';
import { params } from '../../types/simpleTypes';
import { Post } from '../../types/simpleTypes';

const post = async (
  _: string,
  { id }: params,
  { dataSources }: DataSources,
): Promise<Post | Error> => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

const posts = async (
  _: string,
  { input }: params,
  { dataSources }: any,
): Promise<[Post]> => {
  const posts = dataSources.postApi.getPosts(input);
  return posts;
};

const user = async (
  { userId }: Post,
  _: undefined,
  { dataSources }: DataSources,
) => {
  return dataSources.userApi.batchLoadByUserId(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Post: { user },
};
