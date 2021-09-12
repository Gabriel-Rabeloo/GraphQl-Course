import { Error } from '../../types/errorType';
import { params } from '../../types/paramsType';
import { Post } from '../../types/postType';

const post = async (
  _: string,
  { id }: params,
  { getPosts }: any,
): Promise<Post | Error> => {
  const post = await getPosts('/' + id);

  if (Math.random() > 0.5) {
    return {
      statusCode: 500,
      message: 'Post timeout!',
      timeout: 123,
    };
  }
  if (!post) {
    return {
      statusCode: 404,
      message: 'Post not Found',
      postId: id,
    };
  }

  return post.data;
};

const posts = async (
  _: string,
  { input }: params,
  { getPosts }: any,
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
  PostResult: {
    __resolveType: (obj: any): string | null => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      if (typeof obj.id !== 'undefined') return 'Post';
      return null;
    },
  },
  PostError: {
    __resolveType: (obj: any): string | null => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      return null;
    },
  },
};
