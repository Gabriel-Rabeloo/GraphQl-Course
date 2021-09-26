import { Error } from '../../types/simpleTypes';
import { params } from '../../types/simpleTypes';
import { Post } from '../../types/simpleTypes';

const post = async (
  _: string,
  { id }: params,
  { getPosts }: any,
): Promise<Post | Error> => {
  const post = await getPosts('/' + id);
  return post.data;
};

const posts = async (
  _: string,
  { input }: params,
  { getPosts }: any,
): Promise<[Post]> => {
  const apiFiltersInput = new URLSearchParams(input);
  const posts = await getPosts('/?' + apiFiltersInput);
  return posts.data;
};

const user = async ({ userId }: Post, _: any, { userDataLoader }: any) => {
  return userDataLoader.load(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Post: { user },
};
