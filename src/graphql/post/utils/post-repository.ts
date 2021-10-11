import { ValidationError } from 'apollo-server-errors';
import { InputPost } from '../../../types/simpleTypes';
import { PostsApi } from '../dataSources';

export const createPostFn = async (postData: InputPost, dataSource: any) => {
  const postInfo = await createPostInfo(postData, dataSource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError('You have to send title, body and userId');
  }

  return await dataSource.post('', { ...postInfo });
};

export const updatePostFn = async (
  postId: string,
  postData: InputPost,
  dataSource: any,
) => {
  if (!postId) {
    throw new ValidationError('Missing postId');
  }

  const { title, body, userId } = postData;

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
  }

  await userExist(userId, dataSource);

  return dataSource.patch(postId, { ...postData });
};

export const deletePostFn = async (postId: string, dataSource: any) => {
  if (!postId) throw new ValidationError('Missing postId');

  const deleted = await dataSource.delete(postId);
  return !!deleted;
};

const userExist = async (userId: string, dataSource: PostsApi) => {
  try {
    await dataSource.context.dataSources.userApi.get(userId);
  } catch (e) {
    throw new ValidationError(`User ${userId} does not exist`);
  }
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
