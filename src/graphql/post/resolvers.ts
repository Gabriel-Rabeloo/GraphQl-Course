import { params } from '../../types/paramsType';
import { Post } from '../../types/postType';

const post = async (
  _: string,
  { id }: params,
  { getPosts }: string | any,
): Promise<Post> => {
  const response = await getPosts('/' + id);
  return response.data;
};

const posts = async (
  _: string,
  { input }: params,
  { getPosts }: string | any,
): Promise<[Post]> => {
  const apiFiltersInput = new URLSearchParams(input);
  const response = await getPosts('/?' + apiFiltersInput);
  return response.data;
};

export const postResolvers = {
  Query: { post, posts },
  Post: {
    unixTimestamp: ({ createdAt }: string | any): number => {
      const timestamp = new Date(createdAt).getTime() / 1000;
      return Math.floor(timestamp);
    },
  },
};
