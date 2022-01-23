import { AuthenticationError, ValidationError } from 'apollo-server-errors';
import { FetchError } from 'node-fetch';
import { InputPost, Post } from '../../../types/simpleTypes';
import { userExist } from './validate';

export const createPostFn = async (postData: InputPost, dataSource: any) => {
  const postInfo = await createPostInfo(postData, dataSource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError('You have to send title, body and userId');
  }

  return await dataSource.post('', { ...postInfo });
};

export const findPostOwner = async (postId: string, dataSource: any) => {
  const foundPost = (await dataSource.get(postId, undefined, {
    cacheOptions: { ttl: 0 },
  })) as Post | undefined;

  if (!foundPost) {
    throw new FetchError('Could not find the post you are looking for.', 'Not Found');
  }

  if (foundPost.userId !== dataSource.context.loggedUserId) {
    throw new AuthenticationError('You cannot update this post 😠!');
  }

  return foundPost;
};

export const updatePostFn = async (postId: string, postData: InputPost, dataSource: any) => {
  if (!postId) {
    throw new ValidationError('Missing postId');
  }

  const { userId } = await findPostOwner(postId, dataSource);
  const { title, body } = postData;

  if (typeof title !== 'undefined') {
    if (!title) {
      throw new ValidationError('Missing title');
    }
  }

  if (typeof body !== 'undefined') {
    if (!body) {
      throw new ValidationError('Missing body');
    }
  }

  if (typeof userId !== 'undefined') {
    if (!userId) {
      throw new ValidationError('Missing userId');
    }
    await userExist(userId, dataSource);
  }

  return dataSource.patch(postId, { ...postData });
};

export const deletePostFn = async (postId: string, dataSource: any) => {
  if (!postId) throw new ValidationError('Missing postId');
  await findPostOwner(postId, dataSource);

  const deleted = await dataSource.delete(postId);
  return !!deleted;
};

const createPostInfo = async (postData: InputPost, dataSource: any) => {
  const { title, body, userId } = postData;
  await userExist(userId, dataSource);

  const indexRefPost = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef: number = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toString(),
  };
};
