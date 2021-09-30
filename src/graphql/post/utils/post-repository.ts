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
