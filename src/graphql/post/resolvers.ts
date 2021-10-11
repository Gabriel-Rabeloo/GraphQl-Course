import { DataSources, Error } from '../../types/simpleTypes';
import { params } from '../../types/simpleTypes';
import { Post } from '../../types/simpleTypes';

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
  { dataSources }: DataSources,
): Promise<[Post]> => {
  const posts = dataSources.postApi.getPosts(input);
  return posts;
};
// Mutation resolvers
const createPost = async (
  _: undefined,
  { data }: any,
  { dataSources }: DataSources,
) => {
  return dataSources.postApi.createPost(data);
};

const updatePost = async (
  _: undefined,
  { postId, data }: any,
  { dataSources }: DataSources,
) => {
  return dataSources.postApi.updatePost(postId, data);
};

const deletePost = async (
  _: undefined,
  { id }: Post,
  { dataSources }: DataSources,
) => {
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
