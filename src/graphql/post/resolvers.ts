import { Context, DataSources, Error } from '../../types/simpleTypes';
import { params } from '../../types/simpleTypes';
import { Post } from '../../types/simpleTypes';
import { checkIsLoggedIn } from '../login/utils/validate';

// Query resolvers
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
  { dataSources, loggedUserId }: Context,
): Promise<[Post]> => {
  checkIsLoggedIn(loggedUserId);
  const posts = dataSources.postApi.getPosts(input);
  return posts;
};
// Mutation resolvers
const createPost = async (
  _: undefined,
  { data }: any,
  { dataSources, loggedUserId }: Context,
) => {
  checkIsLoggedIn(loggedUserId);
  data.userId = loggedUserId;
  return dataSources.postApi.createPost(data);
};

const updatePost = async (
  _: undefined,
  { postId, data }: any,
  { dataSources, loggedUserId }: Context,
) => {
  checkIsLoggedIn(loggedUserId);
  return dataSources.postApi.updatePost(postId, data);
};

const deletePost = async (
  _: undefined,
  { id }: Post,
  { dataSources, loggedUserId }: Context,
) => {
  checkIsLoggedIn(loggedUserId);
  return dataSources.postApi.deletePost(id);
};

// Field resolvers
const user = async (
  { userId }: Post,
  _: undefined,
  { dataSources }: DataSources,
) => {
  return dataSources.userApi.batchLoadByUserId(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Mutation: { createPost, updatePost, deletePost },
  Post: { user },
};
