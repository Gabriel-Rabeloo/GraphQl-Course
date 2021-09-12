import { Error } from '../../types/errorType';
import { params } from '../../types/paramsType';
import { Post } from '../../types/postType';

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

export const postResolvers = {
  Query: { post, posts },
};
